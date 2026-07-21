import { Link } from "react-router-dom";
import { Database, Lock, ShieldCheck } from "lucide-react";

const SecurityPage = () => (
  <div>
    <section className="bg-lindy-light py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-1 mb-6">Implemented workflow security</h1>
          <p className="text-xl text-lindy-gray">
            Verifiable controls for demo-request intake and review—not a certification claim for the wider marketing site.
          </p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container-custom max-w-5xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-lindy-light p-6">
            <Lock className="mb-4 h-8 w-8 text-lindy-primary" />
            <h2 className="mb-2 text-xl font-semibold">Controlled access</h2>
            <p className="text-lindy-gray">Scrypt passwords, short HttpOnly sessions, immediate revocation, CSRF/origin checks, and ADMIN, REP, or AUDITOR permissions.</p>
          </div>
          <div className="rounded-xl bg-lindy-light p-6">
            <Database className="mb-4 h-8 w-8 text-lindy-primary" />
            <h2 className="mb-2 text-xl font-semibold">Tenant-safe persistence</h2>
            <p className="text-lindy-gray">Strict input schemas, parameterized PostgreSQL queries, tenant-scoped reads and writes, composite actor/request constraints, and optimistic versions.</p>
          </div>
          <div className="rounded-xl bg-lindy-light p-6">
            <ShieldCheck className="mb-4 h-8 w-8 text-lindy-primary" />
            <h2 className="mb-2 text-xl font-semibold">Accountable changes</h2>
            <p className="text-lindy-gray">Idempotent operations and append-only, per-tenant hash chains make request creation and status changes independently verifiable.</p>
          </div>
        </div>

        <div className="prose prose-lg mx-auto mt-14">
          <h2>Operational boundary</h2>
          <p>
            Security headers, bounded request bodies, persistent abuse limits, migration checksums, readiness probes,
            redacted structured logs, backup/restore verification, automated tests, dependency audits, and secret scans
            are checked in. The public client cannot select a tenant, and the server reloads user status and role for every
            authenticated request.
          </p>

          <h2>Required before a real launch</h2>
          <p>
            Source code cannot prove the deployment's TLS, database encryption, network isolation, identity governance,
            monitoring, retention, or incident response. The owner must add MFA or enterprise SSO, approve legal and
            marketing content, configure managed infrastructure and immutable audit export where required, and complete
            accessibility, penetration, load, recovery, and response exercises. No SOC 2, HIPAA, or other certification is
            asserted here.
          </p>

          <p className="mt-12 text-center">
            Review the <Link to="/privacy" className="text-lindy-primary">workflow privacy notice</Link> or submit a
            synthetic <Link to="/contact" className="text-lindy-primary">test request</Link>.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default SecurityPage;
