import { jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

/** Server-side mirror of client test attempts (Neon). Full JSON preserves all fields. */
export const testAttempts = pgTable(
  'test_attempts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    testKind: text('test_kind').notNull(),
    clientAttemptId: text('client_attempt_id').notNull(),
    recordedAt: timestamp('recorded_at', { withTimezone: true }).defaultNow().notNull(),
    payload: jsonb('payload').$type<Record<string, unknown>>().notNull(),
  },
  (table) => [uniqueIndex('test_attempts_kind_client_uidx').on(table.testKind, table.clientAttemptId)]
);

export type TestAttemptRow = typeof testAttempts.$inferSelect;
export type TestAttemptInsert = typeof testAttempts.$inferInsert;
