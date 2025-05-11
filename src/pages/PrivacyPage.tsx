import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const PrivacyPage = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-8">
              Privacy Policy
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-aura-gray-600 mb-8">
                Last updated: March 15, 2024
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  At AURA, we take your privacy seriously. This Privacy Policy explains how 
                  we collect, use, disclose, and safeguard your information when you visit 
                  our website or make a purchase.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <p className="mb-4">We may collect:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Name and contact information</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3">Usage Information</h3>
                <p className="mb-4">We automatically collect:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device information</li>
                  <li>Pages visited</li>
                  <li>Time spent on pages</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use your information to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Process and fulfill your orders</li>
                  <li>Communicate with you about orders and updates</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Prevent fraud and enhance security</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
                <p className="mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Service providers (payment processors, shipping companies)</li>
                  <li>Business partners (with your consent)</li>
                  <li>Law enforcement (when required by law)</li>
                </ul>
                <p className="mb-4">
                  We do not sell your personal information to third parties.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect 
                  your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure storage systems</li>
                  <li>Regular security assessments</li>
                  <li>Employee training on data protection</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to certain processing activities</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">7. Cookies</h2>
                <p className="mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Remember your preferences</li>
                  <li>Analyze website usage</li>
                  <li>Personalize your experience</li>
                  <li>Provide targeted advertising</li>
                </ul>
                <p className="mb-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not intended for children under 13. We do not knowingly 
                  collect information from children under 13.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy periodically. We will notify you of any 
                  material changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="mb-4">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p>
                  Email: privacy@auraclothing.com<br />
                  Address: 123 Fashion Avenue, New York, NY 10001
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPage;