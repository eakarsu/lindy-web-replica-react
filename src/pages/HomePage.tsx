import { ArrowRight, CheckCircle2, FileLock2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => (
  <div>
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-lindy-primary">Verified workflow boundary</p>
          <h1 className="heading-1 mb-6">Demo requests that do not disappear into a fake form</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-lindy-gray">
            Submit a product inquiry, receive a durable reference, and let an authorized sales team qualify, contact,
            and close it through an accountable workflow.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="btn-primary px-8 py-6 text-lg"><Link to="/contact">Send a request <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
            <Button asChild variant="outline" className="px-8 py-6 text-lg"><Link to="/security">Review the controls</Link></Button>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-lindy-light py-20">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4">One complete journey</h2>
          <p className="mx-auto max-w-2xl text-lg text-lindy-gray">The original broad AI marketing replica is not treated as a working product. This narrower journey is.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <RefreshCw className="mb-5 h-9 w-9 text-lindy-primary" />
            <h3 className="heading-3 mb-3">Safe submission</h3>
            <p className="text-lindy-gray">Strict validation, privacy consent, abuse controls, and idempotency make browser retries predictable.</p>
          </div>
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <CheckCircle2 className="mb-5 h-9 w-9 text-lindy-primary" />
            <h3 className="heading-3 mb-3">Governed follow-up</h3>
            <p className="text-lindy-gray">Tenant-scoped roles and explicit transitions move each request through a real PostgreSQL-backed queue.</p>
          </div>
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <FileLock2 className="mb-5 h-9 w-9 text-lindy-primary" />
            <h3 className="heading-3 mb-3">Verifiable history</h3>
            <p className="text-lindy-gray">Optimistic versions prevent lost updates; append-only hash-linked events preserve who changed what.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;
