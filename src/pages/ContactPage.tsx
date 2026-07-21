import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ApiError, submitDemoRequest } from "@/lib/api";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
  privacyConsent: boolean;
  website: string;
};

const emptyForm: FormData = {
  name: "",
  email: "",
  company: "",
  message: "",
  privacyConsent: false,
  website: "",
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const idempotencyKey = useRef(crypto.randomUUID());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.value;
    setFormData((previous) => ({ ...previous, [target.name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const result = await submitDemoRequest(formData, idempotencyKey.current);
      setReference(result.request.reference);
      setFormData(emptyForm);
      idempotencyKey.current = crypto.randomUUID();
    } catch (requestError) {
      const suffix = requestError instanceof ApiError && requestError.requestId
        ? ` Support reference: ${requestError.requestId}`
        : "";
      setError(`${requestError instanceof Error ? requestError.message : "The request failed."}${suffix}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-lindy-light py-20">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-1 mb-6">
              Request a <span className="gradient-text">product conversation</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-lindy-gray">
              Tell our sales team what you want to evaluate. Your request receives a durable reference and remains
              visible to authorized reviewers until it is resolved.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="heading-3 mb-6">What happens next</h2>
              <ol className="space-y-6 text-lindy-gray">
                <li><strong className="text-lindy-secondary">1. Recorded.</strong> We validate and store the request once, even if your browser retries.</li>
                <li><strong className="text-lindy-secondary">2. Reviewed.</strong> An authorized sales representative qualifies the request in the review console.</li>
                <li><strong className="text-lindy-secondary">3. Tracked.</strong> Status changes are version-checked and written to an append-only audit chain.</li>
              </ol>
              <p className="mt-8 rounded-lg border border-lindy-primary/20 bg-lindy-light p-4 text-sm text-lindy-gray">
                This site supports request intake and review. Product capabilities described elsewhere on this replica
                require separate commercial and technical validation.
              </p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="heading-3 mb-6">Send a request</h2>

              {reference && (
                <div role="status" className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
                  <p className="font-semibold">Request received</p>
                  <p>Your reference is <span className="font-mono">{reference}</span>. Save it for follow-up.</p>
                </div>
              )}
              {error && (
                <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-lindy-secondary">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} autoComplete="name" maxLength={120} required />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-lindy-secondary">Work email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" maxLength={254} required />
                </div>
                <div>
                  <label htmlFor="company" className="mb-1 block text-sm font-medium text-lindy-secondary">Company <span className="font-normal text-lindy-gray">(optional)</span></label>
                  <Input id="company" name="company" value={formData.company} onChange={handleChange} autoComplete="organization" maxLength={160} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-lindy-secondary">What would you like to evaluate?</label>
                  <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} minLength={10} maxLength={4000} required />
                </div>

                <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Leave this field empty</label>
                  <Input id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                </div>

                <label className="flex items-start gap-3 text-sm text-lindy-gray">
                  <input
                    name="privacyConsent"
                    type="checkbox"
                    checked={formData.privacyConsent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4"
                    required
                  />
                  <span>I consent to this information being used to respond to my request, as described in the <Link className="text-lindy-primary underline" to="/privacy">privacy notice</Link>.</span>
                </label>

                <Button type="submit" className="btn-primary w-full" disabled={submitting}>
                  {submitting ? "Sending…" : "Send request"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
