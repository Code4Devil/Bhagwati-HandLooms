// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faEye,
  faHeart,
  faCheck,
  faArrowRight,
  faLeaf,
  faTint,
  faRecycle,
  faSun,
  faStar,
  faCheckCircle,
  faTrophy,
  faMedal,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';
const App: React.FC = () => {
const [cartCount, setCartCount] = useState(0);
const handleAddToCart = () => {
setCartCount(prevCount => prevCount + 1);
};
const artisans = [
{
id: 1,
name: "Rajesh Kumar",
specialty: "Master Weaver",
experience: 25,
story: "Rajesh has been weaving since he was 12, learning the craft from his father and grandfather.",
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520an%2520elderly%2520Indian%2520artisan%2520man%2520with%2520weathered%2520hands%2520working%2520on%2520a%2520traditional%2520handloom%252C%2520warm%2520lighting%252C%2520authentic%2520setting%252C%2520detailed%2520facial%2520features%2520showing%2520years%2520of%2520experience%252C%2520professional%2520portrait%2520photography&width=300&height=300&seq=101&orientation=squarish"
},
{
id: 2,
name: "Lakshmi Devi",
specialty: "Pattern Designer",
experience: 18,
story: "Lakshmi specializes in creating intricate patterns that tell stories of her village's heritage.",
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520middle-aged%2520Indian%2520woman%2520artisan%2520with%2520traditional%2520jewelry%2520designing%2520patterns%2520for%2520handloom%2520textiles%252C%2520warm%2520lighting%252C%2520authentic%2520workshop%2520setting%252C%2520detailed%2520facial%2520features%2520showing%2520concentration%252C%2520professional%2520portrait%2520photography&width=300&height=300&seq=102&orientation=squarish"
},
{
id: 3,
name: "Anand Sharma",
specialty: "Dye Master",
experience: 20,
story: "Anand uses only natural dyes created from local plants, flowers, and minerals.",
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520an%2520Indian%2520man%2520artisan%2520working%2520with%2520natural%2520dyes%2520for%2520textiles%252C%2520surrounded%2520by%2520colorful%2520dye%2520pots%252C%2520warm%2520lighting%252C%2520authentic%2520workshop%2520setting%252C%2520detailed%2520facial%2520features%2520showing%2520expertise%252C%2520professional%2520portrait%2520photography&width=300&height=300&seq=103&orientation=squarish"
},
{
id: 4,
name: "Priya Patel",
specialty: "Finishing Expert",
experience: 15,
story: "Priya ensures every piece meets our quality standards before it leaves our workshop.",
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520young%2520Indian%2520woman%2520artisan%2520carefully%2520examining%2520and%2520finishing%2520handloom%2520textiles%252C%2520warm%2520lighting%252C%2520authentic%2520workshop%2520setting%252C%2520detailed%2520facial%2520features%2520showing%2520attention%2520to%2520detail%252C%2520professional%2520portrait%2520photography&width=300&height=300&seq=104&orientation=squarish"
}
];
const testimonials = [
{
id: 1,
name: "Sarah Johnson",
location: "New York, USA",
comment: "The bedsheets I ordered are absolutely stunning. The quality of the fabric and the intricate patterns exceed my expectations. It's like having a piece of art in my bedroom!",
rating: 5,
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520smiling%2520woman%2520in%2520her%2520thirties%2520with%2520shoulder%2520length%2520hair%2520against%2520a%2520neutral%2520background%252C%2520warm%2520lighting%252C%2520professional%2520headshot%2520style%252C%2520natural%2520expression%252C%2520high%2520quality%2520portrait%2520photography&width=80&height=80&seq=105&orientation=squarish"
},
{
id: 2,
name: "Michael Chen",
location: "Toronto, Canada",
comment: "I've been searching for authentic handloom curtains for my new home, and Bhagwati Handloom delivered perfection. The craftsmanship is exceptional, and they look even better in person.",
rating: 5,
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520smiling%2520Asian%2520man%2520in%2520his%2520forties%2520with%2520short%2520hair%2520against%2520a%2520neutral%2520background%252C%2520warm%2520lighting%252C%2520professional%2520headshot%2520style%252C%2520natural%2520expression%252C%2520high%2520quality%2520portrait%2520photography&width=80&height=80&seq=106&orientation=squarish"
},
{
id: 3,
name: "Emma Rodriguez",
location: "London, UK",
comment: "The table runners I purchased for my restaurant have received countless compliments from our guests. The quality is outstanding, and they've held up beautifully even with daily use.",
rating: 4,
image: "https://readdy.ai/api/search-image?query=portrait%2520of%2520a%2520smiling%2520Hispanic%2520woman%2520in%2520her%2520late%2520twenties%2520with%2520long%2520dark%2520hair%2520against%2520a%2520neutral%2520background%252C%2520warm%2520lighting%252C%2520professional%2520headshot%2520style%252C%2520natural%2520expression%252C%2520high%2520quality%2520portrait%2520photography&width=80&height=80&seq=107&orientation=squarish"
}
];
const techniques = [
{
id: 1,
name: "Ikat Weaving",
description: "A resist-dyeing technique where yarns are bound and dyed before weaving to create patterns.",
image: "https://readdy.ai/api/search-image?query=close%2520up%2520of%2520ikat%2520weaving%2520technique%2520on%2520a%2520traditional%2520handloom%252C%2520showing%2520the%2520intricate%2520process%2520and%2520pattern%2520formation%252C%2520detailed%2520view%2520of%2520hands%2520working%2520the%2520loom%252C%2520warm%2520lighting%252C%2520authentic%2520workshop%2520setting%252C%2520professional%2520craft%2520photography&width=400&height=300&seq=108&orientation=landscape"
},
{
id: 2,
name: "Jamdani",
description: "A fine muslin textile with geometric or floral patterns woven on the loom using a supplementary weft technique.",
image: "https://readdy.ai/api/search-image?query=close%2520up%2520of%2520jamdani%2520weaving%2520technique%2520on%2520a%2520traditional%2520handloom%252C%2520showing%2520the%2520intricate%2520floral%2520pattern%2520formation%252C%2520detailed%2520view%2520of%2520hands%2520working%2520the%2520loom%252C%2520warm%2520lighting%252C%2520authentic%2520workshop%2520setting%252C%2520professional%2520craft%2520photography&width=400&height=300&seq=109&orientation=landscape"
},
{
id: 3,
name: "Kantha Embroidery",
description: "A running stitch embroidery technique used to create elaborate patterns on fabric.",
image: "https://readdy.ai/api/search-image?query=close%2520up%2520of%2520kantha%2520embroidery%2520technique%2520being%2520applied%2520to%2520handloom%2520fabric%252C%2520showing%2520the%2520intricate%2520stitching%2520pattern%2520formation%252C%2520detailed%2520view%2520of%2520hands%2520working%2520with%2520needle%2520and%2520thread%252C%2520warm%2520lighting%252C%2520authentic%2520workshop%2520setting%252C%2520professional%2520craft%2520photography&width=400&height=300&seq=110&orientation=landscape"
}
];
const sustainability = [
{
id: 1,
title: "Natural Dyes",
description: "We use plant-based dyes sourced from flowers, roots, and minerals to minimize environmental impact.",
icon: "leaf"
},
{
id: 2,
title: "Water Conservation",
description: "Our dyeing process uses 50% less water than conventional methods through innovative recycling systems.",
icon: "tint"
},
{
id: 3,
title: "Zero Waste",
description: "Fabric scraps are repurposed into smaller products, ensuring nothing goes to waste.",
icon: "recycle"
},
{
id: 4,
title: "Solar Powered",
description: "Our workshops are powered by renewable solar energy, reducing our carbon footprint.",
icon: "sun"
}
];
const timeline = [
{
year: 1985,
title: "Humble Beginnings",
description: "Founded by Ramesh Bhagwati with just two handlooms in a small village workshop."
},
{
year: 1995,
title: "First Retail Store",
description: "Opened our first dedicated retail store in the heart of the textile district."
},
{
year: 2005,
title: "International Recognition",
description: "Received the prestigious Handloom Excellence Award for preserving traditional techniques."
},
{
year: 2015,
title: "Sustainability Initiative",
description: "Launched our eco-friendly production line using only natural dyes and sustainable materials."
},
{
year: 2025,
title: "Global Expansion",
description: "Now shipping to over 50 countries while maintaining our commitment to artisanal quality."
}
];
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}

<main>
{/* Hero Banner */}
<section className="relative h-[500px] overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent z-10"></div>
<img
src="https://readdy.ai/api/search-image?query=artisans%2520working%2520on%2520traditional%2520handlooms%2520in%2520a%2520well-lit%2520workshop%2520with%2520colorful%2520textiles%2520hanging%2520in%2520the%2520background%252C%2520showing%2520the%2520heritage%2520of%2520handloom%2520weaving%252C%2520warm%2520golden%2520light%2520streaming%2520through%2520windows%252C%2520authentic%2520craft%2520environment%252C%2520professional%2520photography&width=1440&height=500&seq=111&orientation=landscape"
alt="Our Heritage in Handloom"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 flex items-center z-20">
<div className="container mx-auto px-6 md:px-12">
<div className="max-w-lg">
<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Heritage in Handloom</h2>
<p className="text-xl text-white mb-8">Preserving traditions, crafting excellence, and weaving stories since 1985.</p>
<button className="bg-white text-indigo-800 px-8 py-3 rounded-lg font-medium hover:bg-indigo-100 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Our Story
</button>
</div>
</div>
</div>
</section>
{/* Company Story */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<div className="max-w-3xl mx-auto text-center mb-12">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
<p className="text-lg text-gray-600">From a small village workshop to an internationally recognized brand, our journey has been defined by a commitment to preserving traditional craftsmanship while embracing innovation.</p>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div>
<div className="space-y-8">
{timeline.map((item, index) => (
<div key={index} className="flex">
<div className="flex-shrink-0 w-24 text-right pr-6">
<span className="font-bold text-indigo-700 text-lg">{item.year}</span>
</div>
<div className="relative flex-grow pl-6 border-l-2 border-indigo-200 pb-8">
<div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600"></div>
<h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
<p className="text-gray-600">{item.description}</p>
</div>
</div>
))}
</div>
</div>
<div>
<div className="relative">
<img
src="https://readdy.ai/api/search-image?query=vintage%2520photograph%2520of%2520Indian%2520artisans%2520working%2520on%2520traditional%2520handlooms%2520in%2520the%25201980s%252C%2520sepia%2520toned%2520image%2520showing%2520the%2520founding%2520days%2520of%2520a%2520textile%2520workshop%252C%2520authentic%2520historical%2520setting%252C%2520professional%2520documentary%2520photography&width=600&height=700&seq=112&orientation=portrait"
alt="Founding story"
className="w-full h-auto rounded-lg shadow-lg"
/>
<div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs">
<p className="italic text-gray-700">"Our mission has always been to preserve the ancient art of handloom weaving while providing sustainable livelihoods for our artisan communities."</p>
<p className="mt-4 font-semibold text-gray-900">- Ramesh Bhagwati, Founder</p>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Mission & Values */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Mission & Values</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="bg-white p-8 rounded-lg shadow-md text-center">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-6">
<FontAwesomeIcon icon={faCompass} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-4 text-gray-800">Our Mission</h3>
<p className="text-gray-600">To preserve and promote the art of traditional handloom weaving while providing sustainable livelihoods for artisan communities and delivering exceptional quality products to our customers worldwide.</p>
</div>
<div className="bg-white p-8 rounded-lg shadow-md text-center">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-6">
<FontAwesomeIcon icon={faEye} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-4 text-gray-800">Our Vision</h3>
<p className="text-gray-600">To be the global leader in handcrafted textiles, recognized for our commitment to authenticity, sustainability, and innovation, while ensuring the ancient art of handloom weaving thrives for generations to come.</p>
</div>
<div className="bg-white p-8 rounded-lg shadow-md text-center">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 mb-6">
<FontAwesomeIcon icon={faHeart} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-4 text-gray-800">Our Values</h3>
<ul className="text-left text-gray-600 space-y-2">
<li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-indigo-600 mr-2" /> Authenticity in craftsmanship</li>
<li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-indigo-600 mr-2" /> Environmental sustainability</li>
<li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-indigo-600 mr-2" /> Fair trade practices</li>
<li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-indigo-600 mr-2" /> Community empowerment</li>
<li className="flex items-center"><FontAwesomeIcon icon={faCheck} className="text-indigo-600 mr-2" /> Innovation with tradition</li>
</ul>
</div>
</div>
</div>
</section>
{/* Traditional Techniques */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Traditional Techniques</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{techniques.map(technique => (
<div key={technique.id} className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
<div className="h-64 overflow-hidden">
<img
src={technique.image}
alt={technique.name}
className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
/>
</div>
<div className="p-6">
<h3 className="text-xl font-semibold text-gray-800 mb-3">{technique.name}</h3>
<p className="text-gray-600 mb-4">{technique.description}</p>
<button className="text-indigo-700 hover:text-indigo-900 font-medium flex items-center cursor-pointer">
Learn More <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
</button>
</div>
</div>
))}
</div>
</div>
</section>
{/* Sustainability Practices */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<div className="max-w-3xl mx-auto text-center mb-12">
<h2 className="text-3xl font-bold text-gray-800 mb-4">Sustainability Practices</h2>
<p className="text-lg text-gray-600">Our commitment to the environment guides every aspect of our production process, from sourcing raw materials to packaging our finished products.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{sustainability.map(item => (
<div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-100 text-green-600 mb-4">
<FontAwesomeIcon icon={item.icon === 'leaf' ? faLeaf : item.icon === 'tint' ? faTint : item.icon === 'recycle' ? faRecycle : item.icon === 'sun' ? faSun : null} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
<p className="text-gray-600">{item.description}</p>
</div>
))}
</div>
</div>
</section>
{/* Meet Our Artisans */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Artisans</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{artisans.map(artisan => (
<div key={artisan.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
<div className="h-72 overflow-hidden">
<img
src={artisan.image}
alt={artisan.name}
className="w-full h-full object-cover object-top"
/>
</div>
<div className="p-6">
<h3 className="text-xl font-semibold text-gray-800 mb-1">{artisan.name}</h3>
<p className="text-indigo-600 font-medium mb-2">{artisan.specialty}</p>
<p className="text-gray-500 text-sm mb-3">{artisan.experience} years of experience</p>
<p className="text-gray-600">{artisan.story}</p>
</div>
</div>
))}
</div>
</div>
</section>
{/* Customer Testimonials */}
<section className="py-16 bg-gray-50">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{testimonials.map(testimonial => (
<div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
<div className="flex items-center mb-6">
<img
src={testimonial.image}
alt={testimonial.name}
className="w-16 h-16 rounded-full object-cover mr-4"
/>
<div>
<h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
<p className="text-gray-500">{testimonial.location}</p>
</div>
</div>
<div className="flex text-yellow-400 mb-4">
{[...Array(5)].map((_, i) => (
<FontAwesomeIcon key={i} icon={faStar} className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
))}
</div>
<p className="text-gray-600 italic">{testimonial.comment}</p>
<div className="mt-4 flex items-center">
<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
<FontAwesomeIcon icon={faCheckCircle} className="mr-1" /> Verified Purchase
</span>
</div>
</div>
))}
</div>
</div>
</section>
{/* Awards & Recognition */}
<section className="py-16 bg-white">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Awards & Recognition</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4">
<FontAwesomeIcon icon={faTrophy} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Excellence in Craftsmanship</h3>
<p className="text-gray-600">National Handloom Award, 2020</p>
</div>
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4">
<FontAwesomeIcon icon={faMedal} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Sustainable Business</h3>
<p className="text-gray-600">Green Business Certification, 2022</p>
</div>
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4">
<FontAwesomeIcon icon={faCertificate} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Cultural Preservation</h3>
<p className="text-gray-600">Heritage Conservation Award, 2019</p>
</div>
<div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 mb-4">
<FontAwesomeIcon icon={faStar} className="text-2xl" />
</div>
<h3 className="text-xl font-semibold mb-3 text-gray-800">Customer Satisfaction</h3>
<p className="text-gray-600">E-commerce Excellence Award, 2023</p>
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
<i className="fab fa-facebook-f"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
<i className="fab fa-pinterest"></i>
</a>
</div>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
<ul className="space-y-2">
<li><a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/2bea63fb-d2fc-42a2-85a7-0c3a7738250f" data-readdy="true" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Home</a></li>
<li><a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/af8704b4-f307-4ecf-b2c2-7b24d73f6d18" data-readdy="true" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Products</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">About Us</a></li>
<li><a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/50624035-dda4-41e7-88de-0679c9e0ca73" data-readdy="true" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">FAQ</a></li>
</ul>
</div>
<div>
<h3 className="text-lg font-semibold mb-4">Contact Info</h3>
<ul className="space-y-3">
<li className="flex items-start">
<i className="fas fa-map-marker-alt mt-1 mr-3 text-indigo-400"></i>
<span className="text-gray-400">123 Handloom Street, Textile City, TC 12345</span>
</li>
<li className="flex items-center">
<i className="fas fa-phone-alt mr-3 text-indigo-400"></i>
<span className="text-gray-400">+1 (555) 123-4567</span>
</li>
<li className="flex items-center">
<i className="fas fa-envelope mr-3 text-indigo-400"></i>
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
className="flex-grow py-2 px-4 bg-gray-800 border-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
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
{/* Back to top button */}
<button
onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
className="fixed bottom-6 right-6 bg-indigo-700 text-white p-3 rounded-full shadow-lg hover:bg-indigo-800 transition-colors duration-300 !rounded-button cursor-pointer"
>
<i className="fas fa-arrow-up"></i>
</button>
</div>
);
};
export default App