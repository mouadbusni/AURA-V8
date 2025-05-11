import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { items, itemCount, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'USA',
  });
  
  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  
  // Calculate totals
  const shipping = total >= 100 ? 0 : 10;
  const grandTotal = total + shipping;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
      window.scrollTo(0, 0);
    }, 1500);
  };
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };
  
  // If cart is empty and not showing order confirmation, redirect to cart
  if (items.length === 0 && !orderComplete) {
    return (
      <PageTransition>
        <div className="pt-32 pb-20 text-center">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
            <p className="mb-8">Add some products to your cart before proceeding to checkout.</p>
            <Button href="/products" variant="primary">
              Browse Products
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  // Order confirmation screen
  if (orderComplete) {
    const orderNumber = `AURA-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    
    return (
      <PageTransition>
        <div className="pt-32 pb-20">
          <div className="container-custom max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-aura-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-aura-gray-600 mb-2">
                Thank you for your purchase. Your order has been placed successfully.
              </p>
              <p className="text-lg font-medium">Order #{orderNumber}</p>
            </motion.div>
            
            <div className="bg-aura-gray-100 p-8 mb-8">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-aura-gray-600">Items</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-aura-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-aura-gray-300 pt-3 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="bg-aura-white p-4 mb-2">
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <p>
                  {shippingInfo.firstName} {shippingInfo.lastName}<br />
                  {shippingInfo.address}<br />
                  {shippingInfo.city}, {shippingInfo.postalCode}<br />
                  {shippingInfo.country}
                </p>
              </div>
              
              <div className="bg-aura-white p-4">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <p className="flex items-center">
                  <CreditCard size={20} className="mr-2" />
                  Credit Card (**** **** **** {paymentInfo.cardNumber.slice(-4) || '1234'})
                </p>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-aura-gray-600">
                We've sent a confirmation email to {shippingInfo.email || 'your email address'}.
              </p>
              <Button href="/" variant="primary">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }
  
  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
          
          {/* Checkout steps */}
          <div className="flex items-center justify-center mb-12">
            <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-aura-black' : 'text-aura-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 1 ? 'bg-aura-gold' : 'bg-aura-gray-200'
              }`}>
                1
              </div>
              <span className="text-sm">Shipping</span>
            </div>
            <div className={`w-20 h-1 mx-2 ${currentStep >= 2 ? 'bg-aura-gold' : 'bg-aura-gray-200'}`} />
            <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-aura-black' : 'text-aura-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 2 ? 'bg-aura-gold' : 'bg-aura-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm">Payment</span>
            </div>
            <div className={`w-20 h-1 mx-2 ${currentStep >= 3 ? 'bg-aura-gold' : 'bg-aura-gray-200'}`} />
            <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-aura-black' : 'text-aura-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= 3 ? 'bg-aura-gold' : 'bg-aura-gray-200'
              }`}>
                3
              </div>
              <span className="text-sm">Confirmation</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main checkout form */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block mb-2 font-medium">
                          First Name <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block mb-2 font-medium">
                          Last Name <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="email" className="block mb-2 font-medium">
                          Email <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block mb-2 font-medium">
                          Phone Number <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block mb-2 font-medium">
                        Address <span className="text-aura-error">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleShippingChange}
                        required
                        className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                      <div>
                        <label htmlFor="city" className="block mb-2 font-medium">
                          City <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block mb-2 font-medium">
                          Postal Code <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block mb-2 font-medium">
                          Country <span className="text-aura-error">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={shippingInfo.country}
                          onChange={handleShippingChange}
                          required
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        >
                          <option value="USA">United States</option>
                          <option value="CAN">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AUS">Australia</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button href="/cart" variant="secondary">
                        Back to Cart
                      </Button>
                      <Button type="submit" variant="primary">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
              
              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                  <div className="bg-aura-gray-100 p-4 mb-6 flex items-center">
                    <Lock size={20} className="mr-2 text-aura-gray-600" />
                    <span className="text-sm text-aura-gray-600">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <label htmlFor="cardName" className="block mb-2 font-medium">
                        Name on Card <span className="text-aura-error">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        required
                        className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="cardNumber" className="block mb-2 font-medium">
                        Card Number <span className="text-aura-error">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={handlePaymentChange}
                          placeholder="xxxx xxxx xxxx xxxx"
                          required
                          maxLength={19}
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CreditCard size={20} className="text-aura-gray-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div>
                        <label htmlFor="expiryDate" className="block mb-2 font-medium">
                          Expiry Date <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          required
                          maxLength={5}
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block mb-2 font-medium">
                          CVV <span className="text-aura-error">*</span>
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="xxx"
                          required
                          maxLength={4}
                          className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="secondary" onClick={() => setCurrentStep(1)}>
                        Back to Shipping
                      </Button>
                      <Button type="submit" variant="primary">
                        Place Order
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-aura-gray-100 p-6 sticky top-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start py-3 border-b border-aura-gray-200 last:border-b-0">
                      <div className="w-16 h-20 bg-aura-gray-200 mr-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-xs text-aura-gray-600 mb-1">
                          Size: {item.size} / Qty: {item.quantity}
                        </p>
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-aura-gray-600">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-aura-gray-600">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="border-t border-aura-gray-300 pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CheckoutPage;