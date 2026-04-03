import { neon } from '@neondatabase/serverless';
import { eq, desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-http';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { testAttempts } from '../db/schema';

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const secret = process.env.TEST_HISTORY_API_KEY;
  if (secret) {
    const auth = req.headers.authorization;
    if (auth !== `Bearer ${secret}`) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    res.status(503).json({ error: 'DATABASE_URL is not configured' });
    return;
  }

  const sql = neon(url);
  const db = drizzle(sql);

  if (req.method === 'GET') {
    try {
      const rawKind = req.query?.testKind;
      const testKind = typeof rawKind === 'string' && rawKind.length > 0 ? rawKind : undefined;
      const rows = testKind
        ? await db
            .select()
            .from(testAttempts)
            .where(eq(testAttempts.testKind, testKind))
            .orderBy(desc(testAttempts.recordedAt))
            .limit(120)
        : await db
            .select()
            .from(testAttempts)
            .orderBy(desc(testAttempts.recordedAt))
            .limit(400);
      const attempts = rows.map((r) => r.payload);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ attempts });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Query failed' });
    }
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body =
    typeof req.body === 'string'
      ? (JSON.parse(req.body) as Record<string, unknown>)
      : (req.body as Record<string, unknown> | undefined);

  if (!body || typeof body !== 'object') {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  const testKind = body.testKind;
  const clientAttemptId = body.id;
  if (typeof testKind !== 'string' || typeof clientAttemptId !== 'string') {
    res.status(400).json({ error: 'Missing testKind or id' });
    return;
  }

  try {
    await db
      .insert(testAttempts)
      .values({
        testKind,
        clientAttemptId,
        payload: body,
      })
      .onConflictDoNothing({ target: [testAttempts.testKind, testAttempts.clientAttemptId] });

    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Insert failed' });
  }
}
