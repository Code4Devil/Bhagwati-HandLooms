import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const OrderConfirmationPage = ({ cart, setCart, setCartCount }) => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingFormData, setShippingFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [showShippingForm, setShowShippingForm] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (location.state && location.state.shippingAddress) {
      setShippingAddress(location.state.shippingAddress);
      setShowShippingForm(false);
    } else {
      setShowShippingForm(true);
    }
  }, [location.state]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    // In a real application, you would send this data to your backend
    console.log('Order Details:', {
      user: {
        id: user?.id,
        fullName: user?.fullName,
        email: user?.emailAddresses[0]?.emailAddress,
      },
      shippingAddress,
      cart,
      totalAmount: calculateTotal(),
      paymentMethod,
    });

    alert('Order placed successfully! Thank you for your purchase.');
    setCart([]); // Clear cart
    setCartCount(0);
    navigate('/'); // Redirect to home or a thank you page
  };

  const handleShippingFormChange = (e) => {
    const { name, value } = e.target;
    setShippingFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleShippingFormSubmit = (e) => {
    e.preventDefault();
    setShippingAddress(shippingFormData);
    setShowShippingForm(false);
  };

  if (!user) {
    return <div className="container mx-auto p-4">Loading user information...</div>;
  }

  if (showShippingForm) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Enter Shipping Information</h1>
        <form onSubmit={handleShippingFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={shippingFormData.fullName}
              onChange={handleShippingFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingFormData.address}
              onChange={handleShippingFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingFormData.city}
              onChange={handleShippingFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingFormData.postalCode}
              onChange={handleShippingFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={shippingFormData.country}
              onChange={handleShippingFormChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Continue to Order Review
          </button>
        </form>
      </div>
    );
  }

  // If shippingAddress is set (either from location.state or submitted form), render confirmation
  return (

    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Section 1: Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</p>
          {/* Add more personal details from Clerk if needed */}
        </div>

        {/* Section 2: Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.address}</p>
          <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
          <p>{shippingAddress.country}</p>
        </div>

        {/* Section 3: Product and Payment Review */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">Order Summary & Payment</h2>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center font-bold text-lg">
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Payment Method</h3>
            <div className="flex items-center mb-2">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              <label htmlFor="cod">Cash on Delivery (COD)</label>
            </div>
            {/* You can add more payment options here */}
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 text-lg font-semibold"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};


export default OrderConfirmationPage;