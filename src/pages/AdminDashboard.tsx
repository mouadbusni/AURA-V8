import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, DollarSign, Package, BarChart2, Settings, LogOut } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Mock data for dashboard
  const dashboardData = {
    totalOrders: 243,
    totalCustomers: 189,
    totalRevenue: 15280,
    recentOrders: [
      { id: 'ORD-7842', customer: 'John Smith', date: '2023-10-15', total: 127.95, status: 'delivered' },
      { id: 'ORD-7841', customer: 'Emma Davis', date: '2023-10-14', total: 89.99, status: 'processing' },
      { id: 'ORD-7840', customer: 'Michael Brown', date: '2023-10-14', total: 214.50, status: 'shipped' },
      { id: 'ORD-7839', customer: 'Sophia Wilson', date: '2023-10-13', total: 159.95, status: 'delivered' },
    ],
    topProducts: [
      { id: '1', name: 'Classic Black Tee', sold: 126, revenue: 6297 },
      { id: '2', name: 'Minimalist Logo Hoodie', sold: 98, revenue: 7839 },
      { id: '6', name: 'Luxe Pullover Hoodie', sold: 75, revenue: 6374 },
      { id: '3', name: 'Oversized Graphic Tee', sold: 67, revenue: 3684 },
    ]
  };
  
  // Dashboard card for stats
  const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode, title: string, value: string, color: string }) => (
    <motion.div 
      className="bg-white p-6 rounded shadow-sm border border-aura-gray-200"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <div className={`${color} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-aura-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-aura-gray-100 pt-24 pb-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 shrink-0 bg-aura-white shadow-sm mb-6 md:mb-0 md:mr-6">
              <div className="p-6 border-b border-aura-gray-200">
                <h2 className="font-bold text-lg">Admin Dashboard</h2>
                <p className="text-sm text-aura-gray-600">Manage your store</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  <li>
                    <a href="#dashboard" className="flex items-center p-3 bg-aura-gold bg-opacity-10 text-aura-black rounded">
                      <BarChart2 size={20} className="mr-3" />
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#orders" className="flex items-center p-3 text-aura-gray-700 hover:bg-aura-gray-100 rounded transition-colors">
                      <ShoppingBag size={20} className="mr-3" />
                      Orders
                    </a>
                  </li>
                  <li>
                    <a href="#products" className="flex items-center p-3 text-aura-gray-700 hover:bg-aura-gray-100 rounded transition-colors">
                      <Package size={20} className="mr-3" />
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="#customers" className="flex items-center p-3 text-aura-gray-700 hover:bg-aura-gray-100 rounded transition-colors">
                      <Users size={20} className="mr-3" />
                      Customers
                    </a>
                  </li>
                  <li>
                    <a href="#settings" className="flex items-center p-3 text-aura-gray-700 hover:bg-aura-gray-100 rounded transition-colors">
                      <Settings size={20} className="mr-3" />
                      Settings
                    </a>
                  </li>
                  <li className="pt-4 mt-4 border-t border-aura-gray-200">
                    <button 
                      onClick={logout}
                      className="flex items-center p-3 text-aura-gray-700 hover:bg-aura-gray-100 rounded transition-colors w-full text-left"
                    >
                      <LogOut size={20} className="mr-3" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-aura-gray-600">Welcome back, Admin</p>
              </div>
              
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  icon={<ShoppingBag size={24} className="text-white" />}
                  title="Total Orders"
                  value={dashboardData.totalOrders.toString()}
                  color="bg-blue-500"
                />
                <StatCard 
                  icon={<Users size={24} className="text-white" />}
                  title="Total Customers"
                  value={dashboardData.totalCustomers.toString()}
                  color="bg-green-500"
                />
                <StatCard 
                  icon={<DollarSign size={24} className="text-white" />}
                  title="Total Revenue"
                  value={`$${dashboardData.totalRevenue.toLocaleString()}`}
                  color="bg-purple-500"
                />
                <StatCard 
                  icon={<Package size={24} className="text-white" />}
                  title="Products Sold"
                  value="366"
                  color="bg-orange-500"
                />
              </div>
              
              {/* Recent Orders & Top Products */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-aura-white shadow-sm border border-aura-gray-200 rounded overflow-hidden">
                  <div className="p-6 border-b border-aura-gray-200">
                    <h2 className="font-bold text-xl">Recent Orders</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-aura-gray-100">
                        <tr>
                          <th className="text-left py-3 px-6 text-sm font-medium text-aura-gray-600">Order ID</th>
                          <th className="text-left py-3 px-6 text-sm font-medium text-aura-gray-600">Customer</th>
                          <th className="text-left py-3 px-6 text-sm font-medium text-aura-gray-600">Date</th>
                          <th className="text-right py-3 px-6 text-sm font-medium text-aura-gray-600">Total</th>
                          <th className="text-left py-3 px-6 text-sm font-medium text-aura-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-aura-gray-200 last:border-b-0">
                            <td className="py-3 px-6">{order.id}</td>
                            <td className="py-3 px-6">{order.customer}</td>
                            <td className="py-3 px-6">{order.date}</td>
                            <td className="py-3 px-6 text-right">${order.total.toFixed(2)}</td>
                            <td className="py-3 px-6">
                              <span 
                                className={`inline-block px-2 py-1 text-xs rounded ${
                                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center">
                    <a href="#all-orders" className="text-aura-gold hover:underline text-sm font-medium">
                      View All Orders
                    </a>
                  </div>
                </div>
                
                {/* Top Products */}
                <div className="bg-aura-white shadow-sm border border-aura-gray-200 rounded overflow-hidden">
                  <div className="p-6 border-b border-aura-gray-200">
                    <h2 className="font-bold text-xl">Top Selling Products</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-aura-gray-100">
                        <tr>
                          <th className="text-left py-3 px-6 text-sm font-medium text-aura-gray-600">Product</th>
                          <th className="text-right py-3 px-6 text-sm font-medium text-aura-gray-600">Sold</th>
                          <th className="text-right py-3 px-6 text-sm font-medium text-aura-gray-600">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboardData.topProducts.map((product) => (
                          <tr key={product.id} className="border-b border-aura-gray-200 last:border-b-0">
                            <td className="py-3 px-6">{product.name}</td>
                            <td className="py-3 px-6 text-right">{product.sold}</td>
                            <td className="py-3 px-6 text-right">${product.revenue.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 text-center">
                    <a href="#all-products" className="text-aura-gold hover:underline text-sm font-medium">
                      View All Products
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AdminDashboard;