// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faStar,
  faShoppingCart,
  faHands,
  faShippingFast,
  faLock,
  faHeadset,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  colors: string[];
  image_url?: string;
  image?: string;
  dimensions?: string;
}

const App: React.FC<{ handleAddToCart: (product: Product) => void }> = ({ handleAddToCart }) => {
const [currentSlide, setCurrentSlide] = useState(0);
const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      // Shuffle products and take a subset for best sellers
      const shuffled = data.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 5)); // Displaying 5 random products as best sellers
    }
  };

  fetchProducts();
}, []);


const slides = [
{
id: 1,
image: "https://readdy.ai/api/search-image?query=luxury%20handloom%20textile%20product%20displayed%20elegantly%20against%20a%20soft%20neutral%20background%2C%20high%20quality%20fabric%20with%20intricate%20patterns%2C%20professional%20product%20photography%20with%20soft%20lighting%2C%20minimal%20styling&width=1200&height=500&seq=1&orientation=landscape",
title: "Handcrafted Excellence",
description: "Discover our premium collection of handwoven textiles",
buttonText: "Shop Now"
},
{
id: 2,
image: "https://readdy.ai/api/search-image?query=elegant%20bedroom%20setup%20with%20handloom%20bedsheets%20and%20pillows%20in%20earthy%20tones%2C%20soft%20morning%20light%20streaming%20through%20sheer%20curtains%2C%20minimalist%20decor%2C%20professional%20interior%20photography%20with%20warm%20tones&width=1200&height=500&seq=2&orientation=landscape",
title: "Summer Collection 2025",
description: "Refresh your home with our latest designs",
buttonText: "Explore"
},
{
id: 3,
image: "https://readdy.ai/api/search-image?query=beautifully%20arranged%20dining%20table%20with%20handloom%20table%20linens%20in%20rich%20colors%2C%20elegant%20place%20settings%2C%20soft%20ambient%20lighting%2C%20professional%20lifestyle%20photography%20with%20warm%20inviting%20atmosphere&width=1200&height=500&seq=3&orientation=landscape",
title: "Special Discount",
description: "Up to 30% off on selected items",
buttonText: "Shop Sale"
}
];
const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category, image_url')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        const uniqueCategories = {};
        data.forEach(product => {
          if (product.category && !uniqueCategories[product.category]) {
            uniqueCategories[product.category] = {
              id: product.category,
              name: product.category,
              image: product.image_url || '/src/assets/default-category-image.png' // Fallback image
            };
          }
        });
        setCategories(Object.values(uniqueCategories));
      }
    };

    fetchCategories();
  }, []);



return (
<div className="min-h-screen pt-20 bg-gray-50">
{/* Header */}

<main>
{/* Hero Banner */}
<section className="relative h-[500px] overflow-hidden">
{slides.map((slide, index) => (
<div
key={slide.id}
className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
>
<div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-transparent z-10"></div>
<img
src={slide.image}
alt={slide.title}
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 flex items-center z-20">
<div className="container mx-auto px-6 md:px-12">
<div className="max-w-lg">
<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
<p className="text-xl text-white mb-8">{slide.description}</p>
<button className="bg-white text-indigo-800 px-8 py-3 rounded-lg font-medium hover:bg-indigo-100 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
{slide.buttonText}
</button>
</div>
</div>
</div>
</div>
))}
{/* Slider Controls */}
<div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-30">
{slides.map((_, index) => (
<button
key={index}
onClick={() => setCurrentSlide(index)}
className={`w-3 h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
aria-label={`Go to slide ${index + 1}`}
></button>
))}
</div>
</section>
{/* Featured Categories */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Categories</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{categories.map(category => (
<div key={category.id} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
<div className="h-64 overflow-hidden">
<img
src={category.image}
alt={category.name}
className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
/>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
<h3 className="text-xl font-semibold text-white mb-3">{category.name}</h3>
<Link
to={`/products?category=${category.id}`}
className="bg-white text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-indigo-100 !rounded-button whitespace-nowrap cursor-pointer"
>
View Collection
</Link>
</div>
</div>
))}
</div>
</div>
</section>
{/* Best Sellers */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<div className="flex justify-between items-center mb-12">
<h2 className="text-3xl font-bold text-gray-800">Best Sellers</h2>
<button className="text-indigo-700 hover:text-indigo-900 font-medium flex items-center cursor-pointer">
View All <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
</button>
</div>
<div className="relative">
<div className="flex overflow-x-auto pb-6 space-x-6 scrollbar-hide">
{products.map(product => (
<div key={product.id} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md overflow-hidden">
<div className="h-64 overflow-hidden">
<img
src={product.image}
alt={product.name}
className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
/>
</div>
<div className="p-4">
<h3 className="text-lg font-medium text-gray-800 mb-2 h-14 line-clamp-2">{product.name}</h3>
<div className="flex text-yellow-400 mb-2">
{[...Array(5)].map((_, i) => (
<FontAwesomeIcon key={i} icon={faStar} className={`${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
))}
</div>
<div className="flex justify-between items-center">
<span className="text-lg font-bold text-gray-900">र{product.price}</span>
<button
onClick={() => handleAddToCart(product)}
className="bg-indigo-700 text-white p-2 rounded-full hover:bg-indigo-800 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer"
>
<FontAwesomeIcon icon={faShoppingCart} />
</button>
</div>
</div>
</div>
))}
</div>
<button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-md text-indigo-700 hover:text-indigo-900 cursor-pointer">
<FontAwesomeIcon icon={faChevronLeft} />
</button>
<button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-md text-indigo-700 hover:text-indigo-900 cursor-pointer">
<FontAwesomeIcon icon={faChevronRight} />
</button>
</div>
</div>
</section>

{/* New Arrivals */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">New Arrivals</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{products.map(product => (
<div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
<div className="h-64 overflow-hidden">
<img
src={product.image}
alt={product.name}
className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
/>
</div>
<div className="p-4">
<h3 className="text-lg font-medium text-gray-800 mb-2 h-14 line-clamp-2">{product.name}</h3>
<div className="flex text-yellow-400 mb-2">
{[...Array(5)].map((_, i) => (
<FontAwesomeIcon key={i} icon={faStar} className={`${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
))}
</div>
<div className="flex justify-between items-center">
<span className="text-lg font-bold text-gray-900">र{product.price}</span>
<button
onClick={handleAddToCart}
className="bg-indigo-700 text-white p-2 rounded-full hover:bg-indigo-800 transition-colors duration-300 !rounded-button whitespace-nowrap cursor-pointer"
>
<FontAwesomeIcon icon={faShoppingCart} />
</button>
</div>
</div>
</div>
))}
</div>
<div className="text-center mt-12">

</div>
</div>
</section>
{/* Why Choose Us */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-4">
<FontAwesomeIcon icon={faHands} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Handcrafted Quality</h3>
<p className="text-gray-600">Each product is meticulously crafted by skilled artisans using traditional techniques.</p>
</div>
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-4">
<FontAwesomeIcon icon={faShippingFast} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Free Shipping</h3>
<p className="text-gray-600">Enjoy free shipping on all orders over र10,000 throughout the continental India.</p>
</div>
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-4">
<FontAwesomeIcon icon={faLock} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Payment</h3>
<p className="text-gray-600">Shop with confidence with our encrypted and secure payment processing.</p>
</div>
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-4">
<FontAwesomeIcon icon={faHeadset} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">24/7 Support</h3>
<p className="text-gray-600">Our dedicated customer service team is available around the clock to assist you.</p>
</div>
</div>
</div>
</section>
</main>
<Footer />
</div>
);
};
export default App