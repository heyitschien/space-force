import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { testAttempts } from '../db/schema';

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
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

  const sql = neon(url);
  const db = drizzle(sql);

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
