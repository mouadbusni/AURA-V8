import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "What shipping methods do you offer?",
    answer: "We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Orders over $100 qualify for free standard shipping. International shipping is available to select countries.",
    category: "Shipping"
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unworn items in their original packaging. Returns are free for customers in the United States. Simply initiate a return through your account or contact our customer service team.",
    category: "Returns"
  },
  {
    question: "How do I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.",
    category: "Orders"
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.",
    category: "Payment"
  },
  {
    question: "How do I find my size?",
    answer: "Each product page includes a detailed size guide. For general guidance, our products follow standard US sizing. If you're between sizes, we recommend sizing up for a more comfortable fit.",
    category: "Sizing"
  },
  {
    question: "Are your products sustainable?",
    answer: "Yes! We use eco-friendly materials and ethical manufacturing processes. Our packaging is made from recycled materials, and we're constantly working to reduce our environmental impact.",
    category: "Product Info"
  },
  {
    question: "How do I care for my items?",
    answer: "Each item comes with specific care instructions on the label. Generally, we recommend washing in cold water and hanging to dry to maintain the quality and longevity of your garments.",
    category: "Product Care"
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Customs fees and import duties may apply.",
    category: "Shipping"
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "Orders can be modified or cancelled within 1 hour of placement. After this window, we begin processing orders for shipment and cannot make changes.",
    category: "Orders"
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes! You can add gift wrapping during checkout for a small fee. Include a personalized message, and we'll ensure your gift arrives beautifully wrapped.",
    category: "Orders"
  }
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setExpandedQuestions(prev =>
      prev.includes(question)
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
              Frequently Asked Questions
            </motion.h1>
            <motion.p 
              className="text-aura-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Find answers to common questions about our products, shipping, returns, and more.
            </motion.p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative mb-6">
              <Search 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-aura-gray-400" 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQs..."
                className="w-full pl-12 pr-4 py-3 border border-aura-gray-300 focus:outline-none focus:ring-2 focus:ring-aura-gold"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory('')}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === ''
                    ? 'bg-aura-black text-white'
                    : 'bg-aura-gray-100 hover:bg-aura-gray-200'
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    activeCategory === category
                      ? 'bg-aura-black text-white'
                      : 'bg-aura-gray-100 hover:bg-aura-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-aura-gray-600">
                  No FAQs found matching your search criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-aura-gray-200"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.question)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-aura-gray-50 transition-colors"
                    >
                      <span className="font-medium pr-8">{faq.question}</span>
                      {expandedQuestions.includes(faq.question) ? (
                        <ChevronUp size={20} className="text-aura-gray-500" />
                      ) : (
                        <ChevronDown size={20} className="text-aura-gray-500" />
                      )}
                    </button>
                    <AnimatePresence>
                      {expandedQuestions.includes(faq.question) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 text-aura-gray-600 bg-aura-gray-50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <motion.div 
            className="max-w-3xl mx-auto mt-12 p-8 bg-aura-gold bg-opacity-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-2">
              Still have questions?
            </h2>
            <p className="text-aura-gray-600 mb-4">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-aura-black text-white px-6 py-3 hover:bg-opacity-90 transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FAQPage;