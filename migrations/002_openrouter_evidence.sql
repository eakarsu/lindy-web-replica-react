BEGIN;
CREATE TABLE IF NOT EXISTS runtime_ai_results (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  user_id uuid NOT NULL,
  feature text NOT NULL,
  input jsonb NOT NULL,
  provider_request_id text NOT NULL UNIQUE,
  provider_model text NOT NULL,
  result_text text NOT NULL,
  provider_receipt jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (user_id, organization_id) REFERENCES users(id, organization_id) ON DELETE RESTRICT
);
CREATE INDEX IF NOT EXISTS runtime_ai_results_feature_created_idx ON runtime_ai_results(feature, created_at DESC);
COMMIT;
