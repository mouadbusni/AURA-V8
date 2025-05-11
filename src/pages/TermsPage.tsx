import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';

const TermsPage = () => {
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
              Terms and Conditions
            </h1>

            <div className="prose max-w-none">
              <p className="text-lg text-aura-gray-600 mb-8">
                Last updated: March 15, 2024
              </p>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to AURA ("we," "our," or "us"). By accessing and using our website, 
                  you agree to be bound by these Terms and Conditions ("Terms"). Please read 
                  these Terms carefully before using our services.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">2. Use of Our Services</h2>
                <p className="mb-4">
                  You must be at least 18 years old to use our services. By using our services, 
                  you represent and warrant that you are at least 18 years old and have the legal 
                  capacity to enter into these Terms.
                </p>
                <p className="mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide accurate and complete information when creating an account</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Use our services in compliance with applicable laws and regulations</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">3. Products and Orders</h2>
                <p className="mb-4">
                  All product descriptions, prices, and availability are subject to change 
                  without notice. We reserve the right to limit quantities of any products.
                </p>
                <p className="mb-4">
                  When you place an order:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>You agree to provide accurate shipping and billing information</li>
                  <li>Your order is subject to our acceptance</li>
                  <li>We reserve the right to refuse or cancel any order</li>
                  <li>Prices are in USD unless otherwise specified</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">4. Shipping and Delivery</h2>
                <p className="mb-4">
                  We aim to process and ship orders within 1-2 business days. Delivery times 
                  vary based on shipping method and destination. We are not responsible for 
                  delays caused by customs or other factors beyond our control.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">5. Returns and Refunds</h2>
                <p className="mb-4">
                  We accept returns within 30 days of delivery for unworn items in original 
                  condition with tags attached. Refunds will be issued to the original payment 
                  method.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="mb-4">
                  All content on our website, including text, graphics, logos, and images, 
                  is our property and protected by copyright and other intellectual property laws.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">7. Privacy</h2>
                <p className="mb-4">
                  Your privacy is important to us. Please review our Privacy Policy to understand 
                  how we collect, use, and protect your personal information.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
                <p className="mb-4">
                  We are not liable for any indirect, incidental, special, or consequential 
                  damages arising from your use of our services or products.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify these Terms at any time. Changes will be 
                  effective immediately upon posting to our website.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p>
                  Email: legal@auraclothing.com<br />
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

export default TermsPage;