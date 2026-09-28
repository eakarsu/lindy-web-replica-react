import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ApiError,
  DemoRequest,
  User,
  listRequests,
  loadDemoCredentials,
  loadSession,
  login,
  logout,
  transitionRequest,
} from "@/lib/api";

const nextStatuses: Record<DemoRequest["status"], DemoRequest["status"][]> = {
  NEW: ["QUALIFIED", "REJECTED"],
  QUALIFIED: ["CONTACTED", "REJECTED"],
  CONTACTED: ["CLOSED", "QUALIFIED"],
  CLOSED: [],
  REJECTED: [],
};

const AdminRequestsPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [csrfToken, setCsrfToken] = useState("");
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const result = await listRequests();
    setRequests(result.requests);
  }, []);

  useEffect(() => {
    let active = true;
    loadSession()
      .then(async (session) => {
        if (!active) return;
        setUser(session.user);
        setCsrfToken(session.csrfToken);
        const result = await listRequests();
        if (active) setRequests(result.requests);
      })
      .catch((sessionError) => {
        if (active && (!(sessionError instanceof ApiError) || sessionError.status !== 401)) {
          setError(sessionError instanceof Error ? sessionError.message : "Unable to load the session");
        }
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const session = await login(email, password);
      setUser(session.user);
      setCsrfToken(session.csrfToken);
      setPassword("");
      await refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = async () => {
    setError(null);
    setLoading(true);
    try {
      const credentials = await loadDemoCredentials();
      setEmail(credentials.email);
      setPassword(credentials.password);
    } catch (credentialError) {
      setError(credentialError instanceof Error ? credentialError.message : "Demo credentials are unavailable");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(csrfToken);
    } finally {
      setUser(null);
      setCsrfToken("");
      setRequests([]);
    }
  };

  const transition = async (request: DemoRequest, status: DemoRequest["status"]) => {
    setBusyId(request.id);
    setError(null);
    try {
      const result = await transitionRequest(request, status, csrfToken);
      setRequests((current) => current.map((item) => item.id === request.id ? result.request : item));
    } catch (transitionError) {
      setError(transitionError instanceof Error ? transitionError.message : "The status change failed");
      if (transitionError instanceof ApiError && transitionError.code === "VERSION_CONFLICT") await refresh();
    } finally {
      setBusyId(null);
    }
  };

  if (loading && !user) {
    return <main className="container-custom py-20"><p role="status">Loading…</p></main>;
  }

  if (!user) {
    return (
      <main className="container-custom py-20">
        <div className="mx-auto max-w-md rounded-xl border bg-white p-8 shadow-sm">
          <h1 className="heading-3 mb-2">Request review</h1>
          <p className="mb-6 text-lindy-gray">Authorized sales-team access only.</p>
          {error && <div role="alert" className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-900">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="review-email" className="mb-1 block text-sm font-medium">Email</label>
              <Input id="review-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
            </div>
            <div>
              <label htmlFor="review-password" className="mb-1 block text-sm font-medium">Password</label>
              <Input id="review-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
            </div>
            <Button className="w-full" type="button" variant="outline" disabled={loading} onClick={fillDemoCredentials}>Auto Fill Demo Credentials</Button>
            <Button className="btn-primary w-full" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="container-custom py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="heading-2">Authenticated Request Dashboard</h1>
          <p className="text-lindy-gray">Signed in as {user.email} ({user.role})</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refresh().catch((refreshError) => setError(refreshError.message))}>Refresh</Button>
          <Button variant="outline" onClick={handleLogout}>Sign out</Button>
        </div>
      </div>

      {error && <div role="alert" className="mb-6 rounded border border-red-200 bg-red-50 p-4 text-red-900">{error}</div>}
      {requests.length === 0 ? (
        <p className="rounded-xl border bg-white p-8 text-lindy-gray">No requests are waiting.</p>
      ) : (
        <div className="space-y-5">
          {requests.map((request) => (
            <article key={request.id} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-sm text-lindy-gray">{request.reference}</p>
                  <h2 className="text-xl font-semibold">{request.name}{request.company ? ` — ${request.company}` : ""}</h2>
                  <a className="text-lindy-primary underline" href={`mailto:${request.email}`}>{request.email}</a>
                </div>
                <span className="rounded-full bg-lindy-light px-3 py-1 text-sm font-semibold">{request.status}</span>
              </div>
              <p className="mt-4 whitespace-pre-wrap text-lindy-gray">{request.message}</p>
              <p className="mt-3 text-xs text-lindy-gray">Received {new Date(request.createdAt).toLocaleString()} · version {request.version}</p>
              {user.role !== "AUDITOR" && nextStatuses[request.status].length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2" aria-label={`Actions for ${request.reference}`}>
                  {nextStatuses[request.status].map((status) => (
                    <Button key={status} size="sm" variant="outline" disabled={busyId === request.id} onClick={() => transition(request, status)}>
                      Mark {status.toLowerCase()}
                    </Button>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default AdminRequestsPage;
