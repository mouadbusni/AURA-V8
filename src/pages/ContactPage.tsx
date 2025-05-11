import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    
    // Reset form after success
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us
            </motion.h1>
            <motion.p 
              className="text-aura-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Have a question or need assistance? We're here to help. 
              Reach out to us through any of the following channels.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-aura-gold bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="text-aura-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-aura-gray-600 mb-2">
                      We'll respond within 24 hours
                    </p>
                    <a 
                      href="mailto:support@auraclothing.com"
                      className="text-aura-gold hover:underline"
                    >
                      support@auraclothing.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-aura-gold bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-aura-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-aura-gray-600 mb-2">
                      Mon-Fri from 9am to 6pm EST
                    </p>
                    <a 
                      href="tel:+1-800-AURA-123"
                      className="text-aura-gold hover:underline"
                    >
                      1-800-AURA-123
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-start"
                >
                  <div className="w-12 h-12 bg-aura-gold bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-aura-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-aura-gray-600">
                      123 Fashion Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2 bg-white p-8 border border-aura-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-green-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-aura-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center text-red-600 bg-red-50 p-4">
                      <AlertCircle size={20} className="mr-2" />
                      <span>An error occurred. Please try again.</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={status === 'loading'}
                    fullWidth
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;