import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Bhagwati-Handloom-Home-Page';
import AboutUs from './pages/About-Us---Bhagwati-Handloom';
import Products from './pages/Bhagwati-Handloom-Products';
import ContactUs from './pages/Contact-Us---Bhagwati-Handloom';
import Adminpanel from './pages/admin-panel/Adminpanel';
import CartPage from './pages/CartPage.tsx';
import CheckoutPage from './pages/CheckoutPage';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LoginPopup from './components/LoginPopup';
import ScrollToTop from './components/ScrollToTop';
import { useUser } from '@clerk/clerk-react';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const handleAddToCart = (product) => {
    if (!user?.id) {
      setIsLoginPopupOpen(true);
      return;
    }
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setCartCount((prevCount) => prevCount + 1);
  };

  const { user } = useUser();




  useEffect(() => {

    const saveUserToSupabase = async () => {
      if (user) {
        const { id, emailAddresses, fullName, imageUrl } = user;
        const email = emailAddresses[0]?.emailAddress;

        if (!email) {
          console.warn('User has no email address, skipping Supabase sync.');
          return;
        }

        try {
          // Check if user already exists
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('clerk_user_id', id)
            .single();

          if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
            throw fetchError;
          }

          if (existingUser) {
            // User exists, update their profile if necessary
            const { error: updateError } = await supabase
              .from('users')
              .update({
                email: email,
                full_name: fullName,
                image_url: imageUrl,
                last_sign_in_at: new Date().toISOString()
              })
              .eq('clerk_user_id', id);

            if (updateError) throw updateError;
            console.log('User profile updated in Supabase:', fullName);
          } else {
            // User does not exist, insert new user
            const { error: insertError } = await supabase
              .from('users')
              .insert({
                clerk_user_id: id,
                email: email,
                full_name: fullName,
                image_url: imageUrl,
                created_at: new Date().toISOString(),
                last_sign_in_at: new Date().toISOString()
              });

            if (insertError) throw insertError;
            console.log('New user inserted into Supabase:', fullName);
          }
        } catch (error) {
          console.error('Error saving user to Supabase:', error.message);
        }
      }
    };

    saveUserToSupabase();
  }, [user?.id]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent
        cartCount={cartCount}
        isCartOpen={isCartOpen}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        handleAddToCart={handleAddToCart}
        isLoginPopupOpen={isLoginPopupOpen}
        setIsLoginPopupOpen={setIsLoginPopupOpen}
        cart={cart}
      />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} />
    </BrowserRouter>
  );
}

function AppContent({ cartCount, isCartOpen, toggleCart, handleAddToCart, isLoginPopupOpen, setIsLoginPopupOpen, cart }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const isAdminRoute = location.pathname === '/admin';

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userRole = user.publicMetadata?.role;

        if (userRole === 'admin' && location.pathname !== '/admin') {
          navigate('/admin');
        }
      }
    };
    checkAdminStatus();
  }, [user, location.pathname, navigate]);

  return (
    <>
      {!isAdminRoute && <Navbar cartCount={cartCount} isCartOpen={isCartOpen} toggleCart={toggleCart} />}
      <Routes>
        <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products handleAddToCart={handleAddToCart} />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Adminpanel />
            </ProtectedRoute>
          }
        />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
        </Routes>
      </>
    );
  }
export default App;
