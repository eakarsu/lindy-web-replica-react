import { Link } from "react-router-dom";

const PrivacyPage = () => (
  <div>
    <section className="bg-lindy-light py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="heading-1 mb-6">Demo-request privacy notice</h1>
          <p className="text-xl text-lindy-gray">Technical notice updated July 20, 2026</p>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container-custom max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <p>
            This notice describes the implemented demo-request workflow in this repository. It is not a substitute for
            an owner-approved privacy policy or jurisdiction-specific legal advice.
          </p>

          <h2>Information the workflow records</h2>
          <p>
            When you submit the request form, it stores your name, email address, optional company, message, consent
            timestamp, request status, and timestamps. It stores a keyed hash of the network address for abuse control,
            rather than the raw address. It also records a reference, idempotency hash, and append-only status events.
          </p>

          <h2>Purpose and access</h2>
          <p>
            The information is used to review and respond to your product inquiry, prevent duplicate or abusive
            submissions, and preserve an accountable history. Only authenticated users in the configured sales
            organization can see request details. Their role determines whether they may change status or only review.
          </p>

          <h2>Sharing, security, and retention</h2>
          <p>
            This implementation does not send request data to an advertising, analytics, email, or AI provider. Runtime
            logs omit form bodies and contact details. The deployment owner controls the PostgreSQL service, backups,
            encryption, legal basis, retention period, deletion process, and any later integrations.
          </p>
          <p>
            Automatic deletion is intentionally not enabled until the owner approves a retention rule that also accounts
            for audit and legal obligations. Do not launch publicly until that rule and a rights-request contact channel
            are published.
          </p>

          <h2>Your choice</h2>
          <p>
            Submission is optional and requires explicit consent. For pre-launch testing, use synthetic information only.
            Once the owner publishes a verified rights channel, it must be used for access, correction, or deletion
            requests.
          </p>

          <p className="mt-12 text-center">
            Return to the <Link to="/contact" className="text-lindy-primary">demo-request form</Link>.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default PrivacyPage;
