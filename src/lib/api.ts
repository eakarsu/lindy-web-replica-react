const apiBase = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export type User = {
  id: string;
  email: string;
  role: "ADMIN" | "REP" | "AUDITOR";
};

export type DemoRequest = {
  id: string;
  reference: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: "NEW" | "QUALIFIED" | "CONTACTED" | "CLOSED" | "REJECTED";
  version: number;
  assignedTo: string | null;
  source: string;
  privacyConsentAt: string;
  createdAt: string;
  updatedAt: string;
};

export class ApiError extends Error {
  status: number;
  code: string;
  requestId?: string;

  constructor(status: number, code: string, message: string, requestId?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${apiBase}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        ...(init.body ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      },
    });
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "The service is unavailable. Please try again.");
  }

  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      response.status,
      payload?.error?.code ?? "REQUEST_FAILED",
      payload?.error?.message ?? "The request failed",
      payload?.error?.requestId,
    );
  }
  return payload as T;
}

export async function submitDemoRequest(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
  privacyConsent: boolean;
  website?: string;
}, idempotencyKey: string) {
  return apiFetch<{ request: { id: string; reference: string; status: string; createdAt: string } }>(
    "/api/public/demo-requests",
    {
      method: "POST",
      headers: { "Idempotency-Key": idempotencyKey },
      body: JSON.stringify(input),
    },
  );
}

export async function login(email: string, password: string) {
  return apiFetch<{ user: User; csrfToken: string; expiresInSeconds: number }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function loadDemoCredentials() {
  return apiFetch<{ email: string; password: string }>("/api/auth/demo-credentials");
}

export async function loadSession() {
  return apiFetch<{ user: User; csrfToken: string }>("/api/auth/me");
}

export async function logout(csrfToken: string) {
  return apiFetch<null>("/api/auth/logout", {
    method: "POST",
    headers: { "X-CSRF-Token": csrfToken },
  });
}

export async function listRequests() {
  return apiFetch<{ requests: DemoRequest[] }>("/api/admin/demo-requests?limit=100");
}

export async function transitionRequest(
  request: DemoRequest,
  status: DemoRequest["status"],
  csrfToken: string,
) {
  return apiFetch<{ request: DemoRequest }>(`/api/admin/demo-requests/${request.id}/transitions`, {
    method: "POST",
    headers: {
      "X-CSRF-Token": csrfToken,
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify({ status, expectedVersion: request.version }),
  });
}
