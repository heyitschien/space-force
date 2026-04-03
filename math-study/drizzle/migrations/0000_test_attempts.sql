CREATE TABLE IF NOT EXISTS "test_attempts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "test_kind" text NOT NULL,
  "client_attempt_id" text NOT NULL,
  "recorded_at" timestamptz DEFAULT now() NOT NULL,
  "payload" jsonb NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "test_attempts_kind_client_uidx" ON "test_attempts" ("test_kind", "client_attempt_id");
