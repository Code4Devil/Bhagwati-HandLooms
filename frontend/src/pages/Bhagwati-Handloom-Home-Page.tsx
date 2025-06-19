// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faStar,
  faShoppingCart,
  faHands,
  faShippingFast,
  faLock,
  faHeadset,
  faMapMarkerAlt,
  faPhoneAlt,
  faEnvelope,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest
} from '@fortawesome/free-brands-svg-icons';
const App: React.FC = () => {
const [currentSlide, setCurrentSlide] = useState(0);
const [cartCount, setCartCount] = useState(0);
const handleAddToCart = () => {
setCartCount(prevCount => prevCount + 1);
};
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
const categories = [
{
id: 1,
name: "Mats",
image: "https://readdy.ai/api/search-image?query=handloom%20floor%20mats%20with%20intricate%20patterns%20and%20rich%20colors%20displayed%20against%20a%20neutral%20background%2C%20high%20quality%20woven%20texture%20visible%2C%20professional%20product%20photography%20with%20soft%20lighting&width=300&height=300&seq=4&orientation=squarish"
},
{
id: 2,
name: "Bedsheets",
image: "https://readdy.ai/api/search-image?query=premium%20handloom%20bedsheets%20with%20delicate%20patterns%20folded%20neatly%2C%20rich%20fabric%20texture%20visible%2C%20neutral%20background%2C%20professional%20product%20photography%20with%20soft%20lighting%20highlighting%20the%20craftsmanship&width=300&height=300&seq=5&orientation=squarish"
},
{
id: 3,
name: "Table Linens",
image: "https://readdy.ai/api/search-image?query=elegant%20handloom%20table%20linens%20and%20napkins%20with%20subtle%20patterns%20arranged%20beautifully%2C%20rich%20fabric%20texture%20visible%2C%20neutral%20background%2C%20professional%20product%20photography%20with%20soft%20lighting&width=300&height=300&seq=6&orientation=squarish"
},
{
id: 4,
name: "Curtains",
image: "https://readdy.ai/api/search-image?query=flowing%20handloom%20curtains%20with%20elegant%20patterns%20hanging%20gracefully%2C%20rich%20fabric%20texture%20visible%2C%20neutral%20background%2C%20professional%20product%20photography%20with%20soft%20lighting%20highlighting%20the%20drape%20and%20quality&width=300&height=300&seq=7&orientation=squarish"
}
];
const bestSellers = [
{
id: 1,
name: "Handwoven Cotton Mat",
price: 29.99,
rating: 5,
image: "https://readdy.ai/api/search-image?query=handwoven%20cotton%20floor%20mat%20with%20geometric%20patterns%20in%20earthy%20tones%2C%20texture%20clearly%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20craftsmanship&width=250&height=250&seq=8&orientation=squarish"
},
{
id: 2,
name: "Organic Cotton Bedsheet Set",
price: 89.99,
rating: 4,
image: "https://readdy.ai/api/search-image?query=organic%20cotton%20bedsheet%20set%20with%20subtle%20patterns%20folded%20neatly%2C%20soft%20pastel%20colors%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20fabric%20quality&width=250&height=250&seq=9&orientation=squarish"
},
{
id: 3,
name: "Handcrafted Table Runner",
price: 39.99,
rating: 5,
image: "https://readdy.ai/api/search-image?query=handcrafted%20table%20runner%20with%20intricate%20border%20design%20in%20rich%20colors%2C%20elegant%20fabric%20texture%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20details&width=250&height=250&seq=10&orientation=squarish"
},
{
id: 4,
name: "Embroidered Curtain Pair",
price: 119.99,
rating: 4,
image: "https://readdy.ai/api/search-image?query=embroidered%20curtain%20pair%20with%20delicate%20floral%20patterns%2C%20elegant%20drape%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20embroidery%20details&width=250&height=250&seq=11&orientation=squarish"
},
{
id: 5,
name: "Handloom Throw Pillow Covers",
price: 24.99,
rating: 5,
image: "https://readdy.ai/api/search-image?query=handloom%20throw%20pillow%20covers%20with%20geometric%20patterns%20in%20complementary%20colors%2C%20texture%20clearly%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20craftsmanship&width=250&height=250&seq=12&orientation=squarish"
}
];
const newArrivals = [
{
id: 1,
name: "Artisan Jute Floor Mat",
price: 34.99,
rating: 4,
image: "https://readdy.ai/api/search-image?query=artisan%20jute%20floor%20mat%20with%20modern%20geometric%20patterns%20in%20natural%20colors%2C%20texture%20clearly%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20craftsmanship&width=250&height=250&seq=13&orientation=squarish"
},
{
id: 2,
name: "Premium Silk Bedsheet",
price: 129.99,
rating: 5,
image: "https://readdy.ai/api/search-image?query=premium%20silk%20bedsheet%20with%20subtle%20sheen%20and%20elegant%20border%20design%2C%20luxurious%20fabric%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20quality&width=250&height=250&seq=14&orientation=squarish"
},
{
id: 3,
name: "Handwoven Table Cloth",
price: 59.99,
rating: 4,
image: "https://readdy.ai/api/search-image?query=handwoven%20table%20cloth%20with%20intricate%20border%20pattern%20in%20rich%20colors%2C%20elegant%20fabric%20texture%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20details&width=250&height=250&seq=15&orientation=squarish"
},
{
id: 4,
name: "Sheer Linen Curtains",
price: 99.99,
rating: 5,
image: "https://readdy.ai/api/search-image?query=sheer%20linen%20curtains%20with%20subtle%20texture%2C%20elegant%20drape%20visible%2C%20professional%20product%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20fabric%20quality%20and%20translucency&width=250&height=250&seq=16&orientation=squarish"
}
];
const specialOffers = [
{
id: 1,
title: "Summer Sale",
description: "Up to 40% off on selected items",
buttonText: "Shop Now",
image: "https://readdy.ai/api/search-image?query=summer%20themed%20handloom%20products%20arranged%20beautifully%20with%20sale%20tag%2C%20bright%20and%20airy%20composition%2C%20professional%20marketing%20photography%20on%20light%20background%20with%20soft%20lighting%20and%20summer%20elements&width=400&height=200&seq=17&orientation=landscape"
},
{
id: 2,
title: "Bundle & Save",
description: "Buy any 3 items and get 15% off",
buttonText: "View Bundles",
image: "https://readdy.ai/api/search-image?query=multiple%20handloom%20products%20bundled%20together%20elegantly%20with%20discount%20tag%2C%20professional%20marketing%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20value%20proposition&width=400&height=200&seq=18&orientation=landscape"
},
{
id: 3,
title: "Free Shipping",
description: "On all orders above $100",
buttonText: "Learn More",
image: "https://readdy.ai/api/search-image?query=handloom%20product%20being%20packaged%20in%20elegant%20eco-friendly%20packaging%20with%20shipping%20label%2C%20professional%20marketing%20photography%20on%20neutral%20background%20with%20soft%20lighting%20highlighting%20the%20shipping%20concept&width=400&height=200&seq=19&orientation=landscape"
}
];
return (
<div className="min-h-screen bg-gray-50">
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
<button className="bg-white text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-indigo-100 !rounded-button whitespace-nowrap cursor-pointer">
View Collection
</button>
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
{bestSellers.map(product => (
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
<span className="text-lg font-bold text-gray-900">${product.price}</span>
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
<button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-md text-indigo-700 hover:text-indigo-900 cursor-pointer">
<FontAwesomeIcon icon={faChevronLeft} />
</button>
<button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-md text-indigo-700 hover:text-indigo-900 cursor-pointer">
<FontAwesomeIcon icon={faChevronRight} />
</button>
</div>
</div>
</section>
{/* Special Offers */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Special Offers</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{specialOffers.map(offer => (
<div key={offer.id} className="relative overflow-hidden rounded-lg shadow-md group">
<img
src={offer.image}
alt={offer.title}
className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-105"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
<h3 className="text-xl font-semibold text-white mb-1">{offer.title}</h3>
<p className="text-white text-sm mb-3">{offer.description}</p>
<button className="bg-white text-indigo-800 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-indigo-100 !rounded-button whitespace-nowrap cursor-pointer">
{offer.buttonText}
</button>
</div>
</div>
))}
</div>
</div>
</section>
{/* New Arrivals */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">New Arrivals</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{newArrivals.map(product => (
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
<span className="text-lg font-bold text-gray-900">${product.price}</span>
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
<button className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Load More
</button>
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
<p className="text-gray-600">Enjoy free shipping on all orders over $100 throughout the continental US.</p>
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
{/* Footer */}
<footer className="bg-gray-900 text-white pt-16 pb-8">
<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
<div>
<h3 className="text-xl font-bold mb-4">Bhagwati Handloom</h3>
<p className="text-gray-400 mb-4">Bringing traditional craftsmanship to modern homes since 1985.</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<FontAwesomeIcon icon={faFacebookF} />
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<FontAwesomeIcon icon={faInstagram} />
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<FontAwesomeIcon icon={faTwitter} />
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<FontAwesomeIcon icon={faPinterest} />
</a>
</div>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Home</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Products</a></li>
<li><a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/6684a2aa-be52-4c51-9037-69068e4b7b48" data-readdy="true" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">About Us</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">FAQ</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Contact Info</h3>
<ul className="space-y-3">
<li className="flex items-start">
<FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 mr-3 text-indigo-400" />
<span className="text-gray-400">123 Handloom Street, Textile City, TC 12345</span>
</li>
<li className="flex items-center">
<FontAwesomeIcon icon={faPhoneAlt} className="mr-3 text-indigo-400" />
<span className="text-gray-400">+1 (555) 123-4567</span>
</li>
<li className="flex items-center">
<FontAwesomeIcon icon={faEnvelope} className="mr-3 text-indigo-400" />
<span className="text-gray-400">info@bhagwatihandloom.com</span>
</li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Newsletter</h3>
<p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and new product announcements.</p>
<div className="flex">
<input
type="email"
placeholder="Your email address"
className="flex-grow py-2 px-4 bg-gray-800 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm border-none"
/>
<button className="bg-indigo-700 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-800 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Subscribe
</button>
</div>
</div>
</div>
<div className="border-t border-gray-800 pt-8">
<div className="flex flex-col md:flex-row justify-between items-center">
<p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Bhagwati Handloom. All rights reserved.</p>
<div className="flex space-x-4">
<i className="fab fa-cc-visa text-2xl text-gray-400"></i>
<i className="fab fa-cc-mastercard text-2xl text-gray-400"></i>
<i className="fab fa-cc-amex text-2xl text-gray-400"></i>
<i className="fab fa-cc-paypal text-2xl text-gray-400"></i>
</div>
</div>
</div>
</div>
</footer>
</div>
);
};
export default App