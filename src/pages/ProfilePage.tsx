import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Settings, Package, MapPin, CreditCard, LogOut, Plus, Trash2, Edit, X } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { Address } from '../types';

const ProfilePage = () => {
  const { user, isAuthenticated, logout, updateProfile, isLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'USA',
    isDefault: false,
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const newAddressComplete: Address = {
        id: Math.random().toString(36).substr(2, 9),
        ...newAddress as Address
      };
      
      const updatedAddresses = [...(user.addresses || [])];
      if (newAddressComplete.isDefault) {
        updatedAddresses.forEach(addr => addr.isDefault = false);
      }
      updatedAddresses.push(newAddressComplete);

      try {
        await updateProfile({ addresses: updatedAddresses });
        setIsAddingAddress(false);
        setNewAddress({
          type: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'USA',
          isDefault: false,
        });
      } catch (error) {
        console.error('Failed to add address:', error);
      }
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    if (user) {
      const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
      try {
        await updateProfile({ addresses: updatedAddresses });
      } catch (error) {
        console.error('Failed to delete address:', error);
      }
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    if (user) {
      const updatedAddresses = user.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      try {
        await updateProfile({ addresses: updatedAddresses });
      } catch (error) {
        console.error('Failed to set default address:', error);
      }
    }
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="bg-white border border-aura-gray-200 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-aura-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-aura-gold rounded-full flex items-center justify-center">
                      <User className="text-aura-black" size={24} />
                    </div>
                    <div>
                      <h2 className="font-semibold">{user?.name}</h2>
                      <p className="text-sm text-aura-gray-600">{user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center p-3 text-left rounded transition-colors ${
                          activeTab === 'profile' 
                            ? 'bg-aura-gold bg-opacity-10' 
                            : 'text-aura-gray-700 hover:bg-aura-gray-100'
                        }`}
                      >
                        <User size={20} className="mr-3" />
                        Profile
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center p-3 text-left rounded transition-colors ${
                          activeTab === 'orders' 
                            ? 'bg-aura-gold bg-opacity-10' 
                            : 'text-aura-gray-700 hover:bg-aura-gray-100'
                        }`}
                      >
                        <Package size={20} className="mr-3" />
                        Orders
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('addresses')}
                        className={`w-full flex items-center p-3 text-left rounded transition-colors ${
                          activeTab === 'addresses' 
                            ? 'bg-aura-gold bg-opacity-10' 
                            : 'text-aura-gray-700 hover:bg-aura-gray-100'
                        }`}
                      >
                        <MapPin size={20} className="mr-3" />
                        Addresses
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('payment')}
                        className={`w-full flex items-center p-3 text-left rounded transition-colors ${
                          activeTab === 'payment' 
                            ? 'bg-aura-gold bg-opacity-10' 
                            : 'text-aura-gray-700 hover:bg-aura-gray-100'
                        }`}
                      >
                        <CreditCard size={20} className="mr-3" />
                        Payment Methods
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center p-3 text-left rounded transition-colors ${
                          activeTab === 'settings' 
                            ? 'bg-aura-gold bg-opacity-10' 
                            : 'text-aura-gray-700 hover:bg-aura-gray-100'
                        }`}
                      >
                        <Settings size={20} className="mr-3" />
                        Settings
                      </button>
                    </li>
                    <li className="pt-4 mt-4 border-t border-aura-gray-200">
                      <button 
                        onClick={logout}
                        className="w-full flex items-center p-3 text-left text-aura-error hover:bg-red-50 rounded transition-colors"
                      >
                        <LogOut size={20} className="mr-3" />
                        Log Out
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white border border-aura-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Personal Information</h3>
                    <Button
                      variant="secondary"
                      onClick={() => setIsEditing(!isEditing)}
                      icon={isEditing ? <X size={18} /> : <Edit size={18} />}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold disabled:bg-aura-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={!isEditing}
                          className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold disabled:bg-aura-gray-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold disabled:bg-aura-gray-100"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {isEditing && (
                      <Button 
                        type="submit" 
                        variant="primary"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    )}
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="bg-white border border-aura-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6">Order History</h3>
                  {user?.orders && user.orders.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-aura-gray-200">
                            <th className="text-left py-3 px-4">Order ID</th>
                            <th className="text-left py-3 px-4">Date</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-right py-3 px-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.orders.map((order) => (
                            <tr key={order.id} className="border-b border-aura-gray-200">
                              <td className="py-4 px-4">{order.id}</td>
                              <td className="py-4 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td className="py-4 px-4">
                                <span className={`inline-block px-2 py-1 text-xs rounded ${
                                  order.status === 'delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right">${order.total.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package size={48} className="mx-auto mb-4 text-aura-gray-400" />
                      <p className="text-aura-gray-600">No orders yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white border border-aura-gray-200 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Saved Addresses</h3>
                    <Button 
                      variant="secondary"
                      onClick={() => setIsAddingAddress(true)}
                      icon={<Plus size={18} />}
                    >
                      Add New Address
                    </Button>
                  </div>

                  {isAddingAddress ? (
                    <form onSubmit={handleAddAddress} className="border border-aura-gray-200 rounded-lg p-6 mb-6">
                      <h4 className="font-medium mb-4">Add New Address</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Address Type</label>
                          <input
                            type="text"
                            value={newAddress.type}
                            onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value })}
                            placeholder="Home, Office, etc."
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name</label>
                          <input
                            type="text"
                            value={newAddress.firstName}
                            onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name</label>
                          <input
                            type="text"
                            value={newAddress.lastName}
                            onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Street Address</label>
                          <input
                            type="text"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City</label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">State</label>
                          <input
                            type="text"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Postal Code</label>
                          <input
                            type="text"
                            value={newAddress.postalCode}
                            onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Country</label>
                          <select
                            value={newAddress.country}
                            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                            className="w-full border border-aura-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                            required
                          >
                            <option value="USA">United States</option>
                            <option value="CAN">Canada</option>
                            <option value="GBR">United Kingdom</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newAddress.isDefault}
                            onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-sm">Set as default address</span>
                        </label>
                      </div>
                      <div className="flex gap-4">
                        <Button type="submit" variant="primary" disabled={isLoading}>
                          {isLoading ? 'Adding...' : 'Add Address'}
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsAddingAddress(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : null}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {user?.addresses && user.addresses.map((address) => (
                      <div 
                        key={address.id}
                        className="border border-aura-gray-200 rounded-lg p-4 relative"
                      >
                        {address.isDefault && (
                          <span className="absolute top-4 right-4 text-xs bg-aura-gold text-aura-black px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                        <h4 className="font-medium mb-2">{address.type}</h4>
                        <p className="text-aura-gray-600">
                          {address.firstName} {address.lastName}<br />
                          {address.address}<br />
                          {address.city}, {address.state} {address.postalCode}<br />
                          {address.country}
                        </p>
                        <div className="mt-4 space-x-4">
                          {!address.isDefault && (
                            <button 
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-sm text-aura-gold hover:underline"
                            >
                              Set as Default
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-sm text-aura-error hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {(!user?.addresses || user.addresses.length === 0) && !isAddingAddress && (
                    <div className="text-center py-8">
                      <MapPin size={48} className="mx-auto mb-4 text-aura-gray-400" />
                      <p className="text-aura-gray-600 mb-4">No addresses saved yet</p>
                      <Button
                        variant="primary"
                        onClick={() => setIsAddingAddress(true)}
                        icon={<Plus size={18} />}
                      >
                        Add Your First Address
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payment' && (
                <div className="bg-white border border-aura-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
                  <div className="text-center py-8">
                    <CreditCard size={48} className="mx-auto mb-4 text-aura-gray-400" />
                    <p className="text-aura-gray-600 mb-4">No payment methods saved</p>
                    <Button variant="primary" icon={<Plus size={18} />}>
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white border border-aura-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Email Notifications</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Promotions and newsletters</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Privacy</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Share my purchase history</span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-aura-gray-200">
                      <Button variant="secondary" className="text-aura-error">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProfilePage;