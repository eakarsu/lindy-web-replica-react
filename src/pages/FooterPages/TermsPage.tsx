
import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="py-20 bg-lindy-light">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">Terms of Service</h1>
            <p className="text-xl text-lindy-gray mb-8 max-w-2xl mx-auto">
              Last updated: May 1, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Lindy.ai. By accessing our website at https://lindy.ai, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
            <p>
              If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Lindy.ai's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose;</li>
              <li>Attempt to decompile or reverse engineer any software contained on Lindy.ai's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            <p>
              This license shall automatically terminate if you violate any of these restrictions and may be terminated by Lindy.ai at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on Lindy.ai's website are provided on an 'as is' basis. Lindy.ai makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, Lindy.ai does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>

            <h2>4. Limitations</h2>
            <p>
              In no event shall Lindy.ai or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Lindy.ai's website, even if Lindy.ai or a Lindy.ai authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            <p>
              Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>

            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Lindy.ai's website could include technical, typographical, or photographic errors. Lindy.ai does not warrant that any of the materials on its website are accurate, complete, or current. Lindy.ai may make changes to the materials contained on its website at any time without notice. However, Lindy.ai does not make any commitment to update the materials.
            </p>

            <h2>6. Links</h2>
            <p>
              Lindy.ai has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Lindy.ai of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2>7. Modifications</h2>
            <p>
              Lindy.ai may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <div className="mt-12 text-center">
              <p>
                If you have any questions about our Terms of Service, please <Link to="/contact" className="text-lindy-primary">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
