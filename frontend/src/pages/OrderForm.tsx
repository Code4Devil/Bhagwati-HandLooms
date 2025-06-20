import React, { useState } from 'react';
// import { supabase } from '../../supabaseClient'; // No longer directly using Supabase for order insertion

const OrderForm: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');

        if (error) {
          throw error;
        }
        setProducts(data || []);
      } catch (err: any) {
        setErrorProducts(err.message);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleProductSelection = (product: any) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (selectedProducts.length === 0) {
      setMessage('Please select at least one product.');
      setLoading(false);
      return;
    }

    const orderData = {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_address: customerAddress,
        products: selectedProducts.map(p => ({ product_id: p.id, price_at_order: p.price, quantity: 1 })),
        total_amount: selectedProducts.reduce((sum, p) => sum + p.price, 0),
        status: 'pending',
      };

      try {
        const response = await fetch('http://localhost:3001/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          alert('Order placed successfully!');
          setCustomerName('');
          setCustomerEmail('');
          setCustomerAddress('');
          setSelectedProducts([]);
        } else {
          const errorData = await response.json();
          console.error('Backend error response:', errorData);
          alert(`Failed to place order: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        console.error('Network or fetch error:', error);
        alert('Could not connect to the server. Please ensure the backend is running.');
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Shipping Address:</label>
          <textarea
            id="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
            required
          />
        </div>

        <h2 className="text-xl font-semibold mb-3">Select Products</h2>
        {loadingProducts ? (
          <p>Loading products...</p>
        ) : errorProducts ? (
          <p className="text-red-500">Error loading products: {errorProducts}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {products.map(product => (
              <div
                key={product.id}
                className={`border p-4 rounded-lg cursor-pointer ${selectedProducts.some(p => p.id === product.id) ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-200'}`}
                onClick={() => handleProductSelection(product)}
              >
                <h3 className="font-bold">{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-32 object-cover mt-2 rounded" />}
              </div>
            ))}
          </div>
        ) : (
          <p>No products available.</p>
        )}

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Selected Products:</h3>
          {selectedProducts.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedProducts.map(p => (
                <li key={p.id}>{p.name} - ${p.price.toFixed(2)}</li>
              ))}
            </ul>
          ) : (
            <p>No products selected.</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
        {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
      </form>
    </div>
  );
};

export default OrderForm;