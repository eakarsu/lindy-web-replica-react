CREATE TABLE organizations (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE CHECK (slug = lower(slug) AND slug ~ '^[a-z0-9][a-z0-9-]{1,62}$'),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 160),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  email text NOT NULL CHECK (email = lower(email) AND char_length(email) <= 254),
  password_hash text NOT NULL,
  role text NOT NULL CHECK (role IN ('ADMIN', 'REP', 'AUDITOR')),
  active boolean NOT NULL DEFAULT true,
  auth_version integer NOT NULL DEFAULT 1 CHECK (auth_version > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, email),
  UNIQUE (id, organization_id)
);

CREATE TABLE demo_requests (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  reference text NOT NULL UNIQUE CHECK (reference ~ '^DEMO-[0-9]{8}-[A-Z0-9]{8}$'),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (email = lower(email) AND char_length(email) <= 254),
  company text CHECK (company IS NULL OR char_length(company) <= 160),
  message text NOT NULL CHECK (char_length(message) BETWEEN 10 AND 4000),
  privacy_consent_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'QUALIFIED', 'CONTACTED', 'CLOSED', 'REJECTED')),
  version integer NOT NULL DEFAULT 1 CHECK (version > 0),
  assigned_to uuid,
  source text NOT NULL DEFAULT 'website' CHECK (char_length(source) BETWEEN 1 AND 80),
  ip_hash text NOT NULL CHECK (char_length(ip_hash) = 64),
  idempotency_key_hash text NOT NULL CHECK (char_length(idempotency_key_hash) = 64),
  request_hash text NOT NULL CHECK (char_length(request_hash) = 64),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, idempotency_key_hash),
  UNIQUE (id, organization_id),
  FOREIGN KEY (assigned_to, organization_id) REFERENCES users(id, organization_id) ON DELETE RESTRICT
);

CREATE INDEX demo_requests_queue_idx
  ON demo_requests (organization_id, status, created_at DESC, id DESC);
CREATE INDEX demo_requests_email_idx
  ON demo_requests (organization_id, email, created_at DESC);

CREATE TABLE status_operations (
  id uuid PRIMARY KEY,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  actor_user_id uuid NOT NULL,
  demo_request_id uuid NOT NULL,
  idempotency_key_hash text NOT NULL CHECK (char_length(idempotency_key_hash) = 64),
  request_hash text NOT NULL CHECK (char_length(request_hash) = 64),
  response_body jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (organization_id, actor_user_id, idempotency_key_hash),
  FOREIGN KEY (actor_user_id, organization_id) REFERENCES users(id, organization_id) ON DELETE RESTRICT,
  FOREIGN KEY (demo_request_id, organization_id) REFERENCES demo_requests(id, organization_id) ON DELETE RESTRICT
);

CREATE TABLE intake_rate_limits (
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  subject_hash text NOT NULL CHECK (char_length(subject_hash) = 64),
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL CHECK (request_count > 0),
  PRIMARY KEY (organization_id, subject_hash, window_started_at)
);

CREATE INDEX intake_rate_limits_expiry_idx ON intake_rate_limits (window_started_at);

CREATE TABLE auth_rate_limits (
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  subject_hash text NOT NULL CHECK (char_length(subject_hash) = 64),
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL CHECK (request_count > 0),
  PRIMARY KEY (organization_id, subject_hash, window_started_at)
);

CREATE INDEX auth_rate_limits_expiry_idx ON auth_rate_limits (window_started_at);

CREATE TABLE request_events (
  sequence bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id uuid NOT NULL UNIQUE,
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE RESTRICT,
  demo_request_id uuid NOT NULL,
  actor_user_id uuid,
  actor_kind text NOT NULL CHECK (actor_kind IN ('PUBLIC', 'USER', 'SYSTEM')),
  event_type text NOT NULL CHECK (event_type IN ('REQUEST_CREATED', 'STATUS_CHANGED')),
  from_status text,
  to_status text NOT NULL CHECK (to_status IN ('NEW', 'QUALIFIED', 'CONTACTED', 'CLOSED', 'REJECTED')),
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  previous_hash text CHECK (previous_hash IS NULL OR char_length(previous_hash) = 64),
  row_hash text NOT NULL CHECK (char_length(row_hash) = 64),
  created_at timestamptz NOT NULL,
  FOREIGN KEY (demo_request_id, organization_id) REFERENCES demo_requests(id, organization_id) ON DELETE RESTRICT,
  FOREIGN KEY (actor_user_id, organization_id) REFERENCES users(id, organization_id) ON DELETE RESTRICT,
  CHECK ((actor_kind = 'USER' AND actor_user_id IS NOT NULL) OR (actor_kind <> 'USER' AND actor_user_id IS NULL))
);

CREATE INDEX request_events_chain_idx ON request_events (organization_id, sequence);
CREATE INDEX request_events_request_idx ON request_events (organization_id, demo_request_id, sequence);

CREATE OR REPLACE FUNCTION reject_request_event_mutation()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'request_events is append-only';
END;
$$;

CREATE TRIGGER request_events_no_update
  BEFORE UPDATE ON request_events
  FOR EACH ROW EXECUTE FUNCTION reject_request_event_mutation();

CREATE TRIGGER request_events_no_delete
  BEFORE DELETE ON request_events
  FOR EACH ROW EXECUTE FUNCTION reject_request_event_mutation();

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER demo_requests_updated_at
  BEFORE UPDATE ON demo_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
