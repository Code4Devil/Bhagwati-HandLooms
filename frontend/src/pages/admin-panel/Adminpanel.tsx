import React from 'react';
import {
  Store,
  User,
  ShoppingBag,
  DollarSign,
  Package,
  Clock,
  Eye,
  Phone,
  Mail,
  X,
  MapPin,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  Users,
  CheckCircle,
  AlertCircle,
  Minus,
  Save,
  AlertTriangle
} from 'lucide-react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import AddProductForm from '../../components/AddProductForm';


// Types
interface Order {
  id: string;
  created_at: string;
  user_name: string;
  user_phone: string;
  shipping_address: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
}

interface OrderItem {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  image_url?: string;
  quality?: string;
  length?: number;
  width?: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
  created_at: string;
  length: number;
  width: number;
  quality: string;

}

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  pendingOrders: number;
  completedOrders: number;
  lowStockProducts: number;
  totalCustomers: number;
  monthlyRevenue: number;
  weeklyOrders: number;
  averageOrderValue: number;
}

interface AnalyticsData {
  revenueGrowth: number;
  orderGrowth: number;
  topSellingProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  categoryDistribution: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  recentActivity: Array<{
    type: 'order' | 'product' | 'customer';
    message: string;
    timestamp: string;
  }>;
}



const mockStats: DashboardStats = {
  totalOrders: 0,
  totalRevenue: 0,
  totalProducts: 0,
  pendingOrders: 0,
  completedOrders: 0,
  lowStockProducts: 0,
  totalCustomers: 0,
  monthlyRevenue: 0,
  weeklyOrders: 0,
  averageOrderValue: 0
};

const mockAnalytics: AnalyticsData = {
  revenueGrowth: 0,
  orderGrowth: 0,
  topSellingProducts: [],
  categoryDistribution: [],
  recentActivity: []
};

function Adminpanel() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [analytics, setAnalytics] = useState<AnalyticsData>(mockAnalytics);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editProductData, setEditProductData] = useState<Partial<Product>>({});
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateProductData, setDuplicateProductData] = useState<any>(null);
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data as Product[]);
        const lowStockCount = data.filter(product => product.stock <= 5).length;
        setStats(prevStats => ({
           ...prevStats,
          totalProducts: data.length,
          lowStockProducts: lowStockCount
        }));
      }
    };

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          created_at,
          user_name,
          user_phone,
          shipping_address,
          total_amount,
          status,
          items:order_items(
            product_id,
            quantity,
            price,
            products(name, image_url, quality, length, width)
          )
        `);

      if (error) {
        console.error('Error fetching orders:', error);
      } else {
        const formattedOrders = data.map((order: any) => ({
          ...order,
          items: order.items.map((item: any) => ({
            product_id: item.product_id,
            name: item.products.name,
            quantity: item.quantity,
            price: item.price,
            image_url: item.products.image_url,
            quality: item.products.quality,
            length: item.products.length,
            width: item.products.width,
          })),
        }));
        setOrders(formattedOrders as Order[]);

        // Enhanced analytics calculations
        const totalRevenue = data.reduce((sum, order) => sum + order.total_amount, 0);
        const pendingCount = data.filter(order => order.status === 'pending').length;
        const completedCount = data.filter(order => order.status === 'completed').length;
        const averageOrderValue = data.length > 0 ? totalRevenue / data.length : 0;

        // Calculate monthly and weekly stats
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const monthlyOrders = data.filter(order => new Date(order.created_at) >= monthStart);
        const weeklyOrders = data.filter(order => new Date(order.created_at) >= weekStart);

        const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.total_amount, 0);

        setStats(prevStats => ({
          ...prevStats,
          totalOrders: data.length,
          pendingOrders: pendingCount,
          completedOrders: completedCount,
          totalRevenue,
          monthlyRevenue,
          weeklyOrders: weeklyOrders.length,
          averageOrderValue
        }));
      }
    };

    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('users').select('id');
      if (error) {
        console.error('Error fetching customers:', error);
      } else {
        setStats(prevStats => ({
          ...prevStats,
          totalCustomers: data.length
        }));
      }
    };

    const calculateAnalytics = async () => {
      // Fetch order items with product details for analytics
      const { data: orderItems, error } = await supabase
        .from('order_items')
        .select(`
          quantity,
          price,
          products(name, category)
        `);

      if (!error && orderItems) {
        // Calculate top selling products
        const productSales: { [key: string]: { sales: number; revenue: number } } = {};
        orderItems.forEach((item: any) => {
          const productName = item.products.name;
          if (!productSales[productName]) {
            productSales[productName] = { sales: 0, revenue: 0 };
          }
          productSales[productName].sales += item.quantity;
          productSales[productName].revenue += item.quantity * item.price;
        });

        const topSellingProducts = Object.entries(productSales)
          .map(([name, data]) => ({ name, ...data }))
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);

        // Calculate category distribution
        const categoryCount: { [key: string]: number } = {};
        orderItems.forEach((item: any) => {
          const category = item.products.category;
          categoryCount[category] = (categoryCount[category] || 0) + item.quantity;
        });

        const totalItems = Object.values(categoryCount).reduce((sum, count) => sum + count, 0);
        const categoryDistribution = Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count,
          percentage: totalItems > 0 ? (count / totalItems) * 100 : 0
        }));

        setAnalytics(prevAnalytics => ({
          ...prevAnalytics,
          topSellingProducts,
          categoryDistribution,
          revenueGrowth: 12.5, // Mock data - you can calculate actual growth
          orderGrowth: 8.3 // Mock data - you can calculate actual growth
        }));
      }
    };

    fetchProducts();
    fetchOrders();
    fetchCustomers();
    calculateAnalytics();
  }, []);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrder(null);
  };

  const handleProductAdded = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setStats((prevStats) => ({
      ...prevStats,
      totalProducts: prevStats.totalProducts + 1,
      lowStockProducts: newProduct.stock <= 5 ? prevStats.lowStockProducts + 1 : prevStats.lowStockProducts
    }));
    setIsAddProductModalOpen(false);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );

    // Recalculate low stock count
    const updatedProducts = products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    const lowStockCount = updatedProducts.filter(product => product.stock <= 5).length;

    setStats((prevStats) => ({
      ...prevStats,
      lowStockProducts: lowStockCount
    }));
    setIsAddProductModalOpen(false);
  };





  const handleEditProduct = (product: Product) => {
    setEditingProduct(product.id);
    setEditProductData(product);
  };

  const handleSaveProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .update(editProductData)
      .eq('id', productId);

    if (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    } else {
      setProducts(prevProducts =>
        prevProducts.map(p =>
          p.id === productId ? { ...p, ...editProductData } : p
        )
      );
      setEditingProduct(null);
      setEditProductData({});
      alert('Product updated successfully!');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    } else {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      setStats(prevStats => ({ ...prevStats, totalProducts: prevStats.totalProducts - 1 }));
      alert('Product deleted successfully!');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    } else {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Update stats
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      const pendingCount = updatedOrders.filter(order => order.status === 'pending').length;
      const completedCount = updatedOrders.filter(order => order.status === 'completed').length;

      setStats(prevStats => ({
        ...prevStats,
        pendingOrders: pendingCount,
        completedOrders: completedCount
      }));
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = async () => {
    if (!orderToDelete) return;

    try {
      // First delete order items
      const { error: itemsError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderToDelete);

      if (itemsError) {
        throw itemsError;
      }

      // Then delete the order
      const { error: orderError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderToDelete);

      if (orderError) {
        throw orderError;
      }

      // Update local state
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderToDelete));

      // Update stats
      const remainingOrders = orders.filter(order => order.id !== orderToDelete);
      const pendingCount = remainingOrders.filter(order => order.status === 'pending').length;
      const completedCount = remainingOrders.filter(order => order.status === 'completed').length;
      const totalRevenue = remainingOrders.reduce((sum, order) => sum + order.total_amount, 0);
      const averageOrderValue = remainingOrders.length > 0 ? totalRevenue / remainingOrders.length : 0;

      setStats(prevStats => ({
        ...prevStats,
        totalOrders: prevStats.totalOrders - 1,
        pendingOrders: pendingCount,
        completedOrders: completedCount,
        totalRevenue,
        averageOrderValue
      }));

      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order: ' + (error as Error).message);
    } finally {
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDeleteOrders = async () => {
    if (selectedOrders.length === 0) {
      alert('Please select orders to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedOrders.length} order(s)? This action cannot be undone.`)) {
      return;
    }

    try {
      // Delete order items for all selected orders
      const { error: itemsError } = await supabase
        .from('order_items')
        .delete()
        .in('order_id', selectedOrders);

      if (itemsError) {
        throw itemsError;
      }

      // Delete all selected orders
      const { error: ordersError } = await supabase
        .from('orders')
        .delete()
        .in('id', selectedOrders);

      if (ordersError) {
        throw ordersError;
      }

      // Calculate total revenue of deleted orders
      const deletedOrders = orders.filter(order => selectedOrders.includes(order.id));
      const deletedRevenue = deletedOrders.reduce((sum, order) => sum + order.total_amount, 0);

      // Update local state
      setOrders(prevOrders => prevOrders.filter(order => !selectedOrders.includes(order.id)));

      // Update stats
      const remainingOrders = orders.filter(order => !selectedOrders.includes(order.id));
      const pendingCount = remainingOrders.filter(order => order.status === 'pending').length;
      const completedCount = remainingOrders.filter(order => order.status === 'completed').length;
      const totalRevenue = remainingOrders.reduce((sum, order) => sum + order.total_amount, 0);
      const averageOrderValue = remainingOrders.length > 0 ? totalRevenue / remainingOrders.length : 0;

      setStats(prevStats => ({
        ...prevStats,
        totalOrders: prevStats.totalOrders - selectedOrders.length,
        pendingOrders: pendingCount,
        completedOrders: completedCount,
        totalRevenue,
        averageOrderValue
      }));

      // Reset selection
      setSelectedOrders([]);
      setSelectAll(false);

      alert(`${selectedOrders.length} order(s) deleted successfully!`);
    } catch (error) {
      console.error('Error deleting orders:', error);
      alert('Error deleting orders: ' + (error as Error).message);
    }
  };

  // Filter orders based on selected filter
  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    return order.status === orderFilter;
  });

  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      growth: analytics.orderGrowth,
      subtitle: `${stats.weeklyOrders} this week`
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      growth: analytics.revenueGrowth,
      subtitle: `₹${stats.monthlyRevenue.toLocaleString()} this month`
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      subtitle: `${stats.lowStockProducts} low stock`
    },
    {
      title: 'Active Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      subtitle: 'Registered users'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      subtitle: 'Awaiting processing'
    },
    {
      title: 'Completed Orders',
      value: stats.completedOrders,
      icon: CheckCircle,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      subtitle: 'Successfully delivered'
    },
    {
      title: 'Average Order Value',
      value: `₹${stats.averageOrderValue.toLocaleString()}`,
      icon: TrendingUp,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-600',
      subtitle: 'Per order'
    },
    {
      title: 'Low Stock Alert',
      value: stats.lowStockProducts,
      icon: AlertCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      subtitle: 'Products ≤ 5 items'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-500 p-2 rounded-lg">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
           
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.fullName || 'Admin User'}</p>
                <p className="text-xs text-gray-600">{user?.primaryEmailAddress?.emailAddress || 'admin@bhagwatihandlooms.com'}</p>
              </div>
              <div className="bg-gray-100  rounded-full">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    {card.subtitle && (
                      <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
                    )}
                    {card.growth && (
                      <div className="flex items-center mt-2">
                        {card.growth > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs font-medium ${card.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {card.growth > 0 ? '+' : ''}{card.growth}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Top Selling Products */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Top Selling Products
              </h3>
              <div className="space-y-3">
                {analytics.topSellingProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                    <p className="font-semibold text-green-600">₹{product.revenue.toLocaleString()}</p>
                  </div>
                ))}
                {analytics.topSellingProducts.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No sales data available</p>
                )}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Category Distribution
              </h3>
              <div className="space-y-3">
                {analytics.categoryDistribution.map((category, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 bg-${['blue', 'green', 'purple', 'orange', 'pink'][index % 5]}-500`}></div>
                      <span className="text-gray-900">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{category.count}</p>
                      <p className="text-xs text-gray-500">{category.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
                {analytics.categoryDistribution.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No category data available</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Order Management
                  </h2>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Orders ({orders.length})</option>
                    <option value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</option>
                    <option value="processing">Processing ({orders.filter(o => o.status === 'processing').length})</option>
                    <option value="shipped">Shipped ({orders.filter(o => o.status === 'shipped').length})</option>
                    <option value="completed">Completed ({orders.filter(o => o.status === 'completed').length})</option>
                    <option value="cancelled">Cancelled ({orders.filter(o => o.status === 'cancelled').length})</option>
                  </select>
                </div>
                {selectedOrders.length > 0 && (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      {selectedOrders.length} order(s) selected
                    </span>
                    <button
                      onClick={handleBulkDeleteOrders}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Selected</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.user_phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{order.total_amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleViewOrder(order)}
                            className="text-indigo-600 hover:text-indigo-900 flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {orderFilter === 'all' ? 'No orders found' : `No ${orderFilter} orders found`}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Products Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </button>
          </div>
          
          {/* Products Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Products
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className={`border rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                    product.stock <= 5 ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="relative">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      {product.stock <= 5 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Low Stock
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {editingProduct === product.id ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={editProductData.name || ''}
                            onChange={(e) => setEditProductData({...editProductData, name: e.target.value})}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                            placeholder="Product name"
                          />
                          <input
                            type="number"
                            value={editProductData.price || ''}
                            onChange={(e) => setEditProductData({...editProductData, price: parseFloat(e.target.value)})}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                            placeholder="Price"
                          />
                          <input
                            type="number"
                            value={editProductData.stock || ''}
                            onChange={(e) => setEditProductData({...editProductData, stock: parseInt(e.target.value)})}
                            className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                            placeholder="Stock"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleSaveProduct(product.id)}
                              className="flex-1 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 flex items-center justify-center"
                            >
                              <Save className="h-3 w-3 mr-1" />
                              Save
                            </button>
                            <button
                              onClick={() => {setEditingProduct(null); setEditProductData({});}}
                              className="flex-1 bg-gray-600 text-white text-xs px-3 py-1 rounded hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                            <span className="text-lg font-bold text-indigo-600">₹{product.price.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                            <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                            <span className={`font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
                              Stock: {product.stock}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            <div className="grid grid-cols-2 gap-2">
                              <span>Quality: {product.quality}</span>
                              <span>Size: {product.length}×{product.width}</span>
                            </div>
                            <span className="no-underline-important">Added: {formatDate(new Date(product.created_at))}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="flex-1 bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 flex items-center justify-center"
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex-1 bg-red-600 text-white text-xs px-3 py-1 rounded hover:bg-red-700 flex items-center justify-center"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {products.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No products found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Order Modal */}
      {isOrderModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <button
                onClick={handleCloseOrderModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedOrder.user_name}</p>
                    <p><span className="font-medium">Phone:</span> {selectedOrder.user_phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.created_at)}</p>
                    <p><span className="font-medium">Total:</span> ₹{selectedOrder.total_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedOrder.shipping_address}</p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      {item.image_url && (
                        <img src={item.image_url} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">Price: ₹{item.price.toLocaleString()}</p>
                        {item.quality && <p className="text-sm text-gray-600">Quality: {item.quality}</p>}
                        {item.length && <p className="text-sm text-gray-600">Length: {item.length}</p>}
                        {item.width && <p className="text-sm text-gray-600">Width: {item.width}</p>}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <AddProductForm
                onClose={() => setIsAddProductModalOpen(false)}
                onProductAdded={handleProductAdded}
                onProductUpdated={handleProductUpdated}
              />
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Product Modal */}
      {showDuplicateModal && existingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
                Product Already Exists
              </h2>
              <button
                onClick={() => setShowDuplicateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-4">
                A product with the name "<strong>{existingProduct.name}</strong>" already exists.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Existing Product:</h4>
                <p className="text-sm text-gray-600">Stock: {existingProduct.stock} units</p>
                <p className="text-sm text-gray-600">Price: ₹{existingProduct.price.toLocaleString()}</p>
              </div>
              <p className="text-gray-600 mb-6">
                Would you like to update the existing product's quantity by adding {duplicateProductData?.stock} units,
                or add this as a new product with a different name?
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleDuplicateConfirm(true)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Quantity
                </button>
                <button
                  onClick={() => handleDuplicateConfirm(false)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add as New
                </button>
                <button
                  onClick={() => setShowDuplicateModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                Confirm Delete
              </h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this order? This action cannot be undone and will permanently remove the order and all its associated data.
              </p>

              <div className="flex space-x-3">
                <button
                  onClick={confirmDeleteOrder}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Order
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

  </div>
);
};

export default Adminpanel;