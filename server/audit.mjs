import { createHash, randomUUID } from "node:crypto";

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

export function eventHash(event) {
  return createHash("sha256").update(canonicalJson(event)).digest("hex");
}

export async function appendRequestEvent(client, input) {
  await client.query("SELECT pg_advisory_xact_lock(hashtextextended($1, 0))", [input.organizationId]);
  const previous = await client.query(
    "SELECT row_hash FROM request_events WHERE organization_id = $1 ORDER BY sequence DESC LIMIT 1",
    [input.organizationId],
  );

  const event = {
    id: randomUUID(),
    organizationId: input.organizationId,
    demoRequestId: input.demoRequestId,
    actorUserId: input.actorUserId ?? null,
    actorKind: input.actorKind,
    eventType: input.eventType,
    fromStatus: input.fromStatus ?? null,
    toStatus: input.toStatus,
    payload: input.payload ?? {},
    previousHash: previous.rows[0]?.row_hash ?? null,
    createdAt: (input.createdAt ?? new Date()).toISOString(),
  };
  const rowHash = eventHash(event);

  await client.query(
    `INSERT INTO request_events
      (id, organization_id, demo_request_id, actor_user_id, actor_kind, event_type,
       from_status, to_status, payload, previous_hash, row_hash, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12)`,
    [
      event.id,
      event.organizationId,
      event.demoRequestId,
      event.actorUserId,
      event.actorKind,
      event.eventType,
      event.fromStatus,
      event.toStatus,
      JSON.stringify(event.payload),
      event.previousHash,
      rowHash,
      event.createdAt,
    ],
  );

  return { ...event, rowHash };
}

export async function verifyAuditChain(queryable, organizationId) {
  const result = await queryable.query(
    `SELECT id, organization_id, demo_request_id, actor_user_id, actor_kind, event_type,
            from_status, to_status, payload, previous_hash, row_hash, created_at
       FROM request_events
      WHERE organization_id = $1
      ORDER BY sequence`,
    [organizationId],
  );

  let previousHash = null;
  for (const row of result.rows) {
    const event = {
      id: row.id,
      organizationId: row.organization_id,
      demoRequestId: row.demo_request_id,
      actorUserId: row.actor_user_id,
      actorKind: row.actor_kind,
      eventType: row.event_type,
      fromStatus: row.from_status,
      toStatus: row.to_status,
      payload: row.payload,
      previousHash: row.previous_hash,
      createdAt: row.created_at.toISOString(),
    };
    if (row.previous_hash !== previousHash || eventHash(event) !== row.row_hash) {
      return { ok: false, checked: result.rowCount, failedEventId: row.id };
    }
    previousHash = row.row_hash;
  }

  return { ok: true, checked: result.rowCount, head: previousHash };
}
