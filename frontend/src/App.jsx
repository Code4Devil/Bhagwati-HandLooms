import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Bhagwati-Handloom-Home-Page';
import AboutUs from './pages/About-Us---Bhagwati-Handloom';
import Products from './pages/Bhagwati-Handloom-Products';
import ContactUs from './pages/Contact-Us---Bhagwati-Handloom';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;
