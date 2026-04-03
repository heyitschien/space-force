/**
 * Push exported on-device test attempts into Neon (public.test_attempts).
 *
 * In the app: Test History → "Download JSON for Neon CLI", then run:
 *   npx tsx scripts/sync-local-results-to-neon.ts ~/Downloads/asvab-test-attempts-export-*.json
 *
 * Requires DATABASE_URL in .env.local or environment.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { testAttempts } from '../db/schema';

const __dirname = dirname(fileURLToPath(import.meta.url));

type ExportShape = Record<string, Array<Record<string, unknown>>>;

function loadEnvLocal(): void {
  const p = resolve(__dirname, '../.env.local');
  if (!existsSync(p)) return;
  const raw = readFileSync(p, 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq);
    let val = trimmed.slice(eq + 1);
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

function readExportFile(path: string): ExportShape {
  const abs = resolve(process.cwd(), path);
  const raw = readFileSync(abs, 'utf8');
  return JSON.parse(raw) as ExportShape;
}

async function syncToNeon(data: ExportShape): Promise<{ attempted: number; skipped: number }> {
  const url = process.env.DATABASE_URL;
  if (!url?.trim()) {
    console.error('DATABASE_URL is not set (.env.local or env).');
    process.exit(1);
  }

  const db = drizzle(neon(url));
  let attempted = 0;
  let skipped = 0;

  for (const [testKind, rows] of Object.entries(data)) {
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      const id = row.id;
      if (typeof id !== 'string') {
        skipped += 1;
        continue;
      }
      attempted += 1;
      const payload = { testKind, ...row } as Record<string, unknown>;
      await db
        .insert(testAttempts)
        .values({
          testKind,
          clientAttemptId: id,
          payload,
        })
        .onConflictDoNothing({ target: [testAttempts.testKind, testAttempts.clientAttemptId] });
    }
  }

  return { attempted, skipped };
}

function countAttempts(data: ExportShape): number {
  let n = 0;
  for (const rows of Object.values(data)) {
    if (Array.isArray(rows)) n += rows.length;
  }
  return n;
}

async function main(): Promise<void> {
  loadEnvLocal();

  const filePath = process.argv[2];
  if (!filePath) {
    console.error(
      'Usage: npx tsx scripts/sync-local-results-to-neon.ts <export.json>\n' +
        'Export JSON from the app: Test History → Download JSON for Neon CLI.'
    );
    process.exit(1);
  }

  const data = readExportFile(filePath);
  const total = countAttempts(data);
  if (total === 0) {
    console.log('No attempts in file. Nothing to sync.');
    process.exit(0);
  }

  console.log(`Syncing ${total} attempt row(s) to Neon…`);
  const { attempted, skipped } = await syncToNeon(data);
  console.log(`Done. Rows processed: ${attempted}, skipped (bad id): ${skipped}.`);
  console.log('Duplicates (same test_kind + client id) are skipped on the server.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
