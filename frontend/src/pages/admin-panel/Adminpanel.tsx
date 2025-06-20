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
  Trash2 
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
}



const mockStats: DashboardStats = {
  totalOrders: 0,
  totalRevenue: 0,
  totalProducts: 0,
  pendingOrders: 0
};

function Adminpanel() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<DashboardStats>(mockStats);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data as Product[]);
        setStats(prevStats => ({
           ...prevStats,
          totalProducts: data.length
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
        setStats(prevStats => ({
          ...prevStats,
          totalOrders: data.length,
          pendingOrders: data.filter(order => (order as any).status === 'pending').length,
          totalRevenue: data.reduce((sum, order) => sum + order.total_amount, 0)
        }));
      }
    };

    fetchProducts();
    fetchOrders();
  }, []);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productFormData, setProductFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    stock: '',
    quality: '',

    length: '',
    width: '',
  });

  const categories = ['Sarees', 'Kurtas', 'Dupattas', 'Bedsheets', 'Fabrics', 'Accessories'];

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

  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductFormData({
      ...productFormData,
      [name]: value
    });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productFormData.name || !productFormData.price || !productFormData.category || !productFormData.stock) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name: productFormData.name,
            description: productFormData.description,
            price: parseFloat(productFormData.price),
            category: productFormData.category,
            image_url: productFormData.image_url || 'https://images.pexels.com/photos/6069112/pexels-photo-6069112.jpeg?auto=compress&cs=tinysrgb&w=300',
            stock: parseInt(productFormData.stock),
            quality: productFormData.quality,

            length: parseFloat(productFormData.length),
            width: parseFloat(productFormData.width),
          },
        ])
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setProducts((prevProducts) => [...prevProducts, data[0]]);
        setStats((prevStats) => ({ ...prevStats, totalProducts: prevStats.totalProducts + 1 }));
      }

      setProductFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: '',
        stock: '',
        quality: '',
        length: '',
        width: '',
      });
      setIsAddProductModalOpen(false);
    } catch (error: any) {
      console.error('Error adding product:', error.message);
      alert('Failed to add product: ' + error.message);
    }
  };

  const statsCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
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
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Orders Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>

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
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">

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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                {products.filter(product => product.stock > 0).map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                        <span className="text-lg font-bold text-primary-600">₹{product.price.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                        <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                        <span>Stock: {product.stock}</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        <span className="no-underline-important">Added: {formatDate(new Date(product.created_at))}</span>
                      </div>
  
                    </div>
                  </div>
                ))}
              </div>
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
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productFormData.name}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-decoration-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={productFormData.description}
                  onChange={handleProductFormChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={productFormData.price}
                    onChange={handleProductFormChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={productFormData.stock}
                    onChange={handleProductFormChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={productFormData.category}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-1">
                  Quality
                </label>
                <input
                  type="text"
                  id="quality"
                  name="quality"
                  value={productFormData.quality}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">
                  Length (cm)
                </label>
                <input
                  type="number"
                  id="length"
                  name="length"
                  value={productFormData.length}
                  onChange={handleProductFormChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">
                  Width (cm)
                </label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={productFormData.width}
                  onChange={handleProductFormChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={productFormData.image}
                onChange={handleProductFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-decoration-none"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddProductModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    <AddProductForm/>

  </div>
);
};

export default Adminpanel;