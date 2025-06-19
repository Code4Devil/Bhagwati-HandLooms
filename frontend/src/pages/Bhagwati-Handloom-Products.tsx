// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThLarge,
  faBed,
  faColumns,
  faTable,
  faCouch,
  faBorderAll,
  faUtensils,
  faTshirt,
  faImage,
  faChevronRight,
  faSlidersH,
  faTimesCircle,
  faChevronDown,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
const App: React.FC = () => {
const [cartCount, setCartCount] = useState(0);
const [isCartOpen, setIsCartOpen] = useState(false);
const [activeCategory, setActiveCategory] = useState('all');

useEffect(() => {
  const cartIcon = document.getElementById('cartIcon');
  const cartDropdown = document.getElementById('cartDropdown');

  const handleCartClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsCartOpen(!isCartOpen);
    if (cartDropdown) {
      cartDropdown.classList.toggle('hidden');
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (cartIcon && cartDropdown && !cartIcon.contains(e.target as Node)) {
      setIsCartOpen(false);
      cartDropdown.classList.add('hidden');
    }
  };

  if (cartIcon) {
    cartIcon.addEventListener('click', handleCartClick);
  }
  document.addEventListener('click', handleClickOutside);

  return () => {
    if (cartIcon) {
      cartIcon.removeEventListener('click', handleCartClick);
    }
    document.removeEventListener('click', handleClickOutside);
  };
}, [isCartOpen]);
const [priceRange, setPriceRange] = useState([0, 500]);
const [selectedColors, setSelectedColors] = useState<string[]>([]);
const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
const [sortOption, setSortOption] = useState('featured');
const [currentPage, setCurrentPage] = useState(1);
const [showFilters, setShowFilters] = useState(false);
const [isLoading, setIsLoading] = useState(true);
// Product data
const products = [
{
id: 1,
name: "Ikat Bedsheet Set",
category: "bedsheets",
price: 129.99,
discountPrice: 99.99,
colors: ["blue", "red", "green"],
technique: "Ikat",
material: "100% Organic Cotton",
dimensions: "Queen Size (90\" x 100\")",
description: "Luxurious handwoven bedsheet set featuring traditional Ikat patterns. Each piece is meticulously crafted by our master artisans.",
image: "https://readdy.ai/api/search-image?query=luxurious%2520handwoven%2520bedsheet%2520with%2520traditional%2520blue%2520ikat%2520patterns%2520on%2520a%2520white%2520background%252C%2520professionally%2520styled%2520on%2520a%2520bed%2520with%2520matching%2520pillowcases%252C%2520soft%2520natural%2520lighting%252C%2520high-end%2520product%2520photography%2520with%2520clean%2520background%2520and%2520detailed%2520textile%2520texture%2520visible&width=400&height=500&seq=201&orientation=portrait"
},
{
id: 2,
name: "Jamdani Cotton Curtains",
category: "curtains",
price: 149.99,
discountPrice: null,
colors: ["white", "beige", "gray"],
technique: "Jamdani",
material: "Fine Cotton",
dimensions: "84\" x 54\" (Pair)",
description: "Elegant Jamdani curtains with intricate floral motifs. These sheer curtains add a touch of sophistication to any room.",
image: "https://readdy.ai/api/search-image?query=elegant%2520white%2520jamdani%2520curtains%2520with%2520intricate%2520floral%2520motifs%2520hanging%2520by%2520a%2520window%2520with%2520natural%2520light%2520streaming%2520through%252C%2520showing%2520the%2520delicate%2520sheer%2520texture%2520and%2520detailed%2520handwoven%2520patterns%252C%2520professional%2520interior%2520photography%2520with%2520soft%2520lighting%2520and%2520clean%2520background&width=400&height=500&seq=202&orientation=portrait"
},
{
id: 3,
name: "Kantha Table Runner",
category: "table-runners",
price: 59.99,
discountPrice: 49.99,
colors: ["multicolor", "blue", "red"],
technique: "Kantha",
material: "Recycled Silk",
dimensions: "72\" x 16\"",
description: "Vibrant table runner featuring traditional Kantha embroidery. Each piece tells a unique story through its intricate stitching patterns.",
image: "https://readdy.ai/api/search-image?query=vibrant%2520multicolored%2520kantha%2520table%2520runner%2520with%2520intricate%2520traditional%2520embroidery%2520displayed%2520on%2520a%2520wooden%2520dining%2520table%252C%2520professionally%2520styled%2520with%2520minimal%2520tableware%252C%2520soft%2520natural%2520lighting%2520highlighting%2520the%2520detailed%2520stitching%2520patterns%252C%2520high-end%2520product%2520photography%2520with%2520clean%2520background&width=400&height=500&seq=203&orientation=portrait"
},
{
id: 4,
name: "Block Print Throw Pillows",
category: "cushions",
price: 39.99,
discountPrice: null,
colors: ["indigo", "mustard", "teal"],
technique: "Block Print",
material: "Cotton Canvas",
dimensions: "18\" x 18\" (Set of 2)",
description: "Hand block printed throw pillows featuring traditional motifs. Perfect accent pieces for your living room or bedroom.",
image: "https://readdy.ai/api/search-image?query=set%2520of%2520indigo%2520and%2520mustard%2520hand%2520block%2520printed%2520throw%2520pillows%2520with%2520traditional%2520motifs%2520arranged%2520on%2520a%2520neutral%2520sofa%252C%2520professionally%2520styled%2520in%2520a%2520contemporary%2520living%2520room%2520setting%252C%2520soft%2520natural%2520lighting%252C%2520high-end%2520interior%2520photography%2520with%2520clean%2520background&width=400&height=500&seq=204&orientation=portrait"
},
{
id: 5,
name: "Handwoven Wool Rug",
category: "rugs",
price: 299.99,
discountPrice: 249.99,
colors: ["burgundy", "navy", "cream"],
technique: "Traditional Loom",
material: "100% New Zealand Wool",
dimensions: "6' x 9'",
description: "Luxurious handwoven wool rug featuring geometric patterns inspired by ancient textile traditions. Adds warmth and character to any space.",
image: "https://readdy.ai/api/search-image?query=luxurious%2520handwoven%2520wool%2520rug%2520with%2520burgundy%2520and%2520cream%2520geometric%2520patterns%2520displayed%2520in%2520a%2520contemporary%2520living%2520room%2520setting%252C%2520showing%2520the%2520detailed%2520texture%2520and%2520craftsmanship%252C%2520professional%2520interior%2520photography%2520with%2520soft%2520natural%2520lighting%2520and%2520clean%2520background&width=400&height=500&seq=205&orientation=portrait"
},
{
id: 6,
name: "Batik Print Tablecloth",
category: "table-linens",
price: 79.99,
discountPrice: null,
colors: ["blue", "white", "teal"],
technique: "Batik",
material: "Cotton",
dimensions: "60\" Round",
description: "Elegant batik print tablecloth featuring traditional indigo patterns. Perfect for special occasions or everyday dining.",
image: "https://readdy.ai/api/search-image?query=elegant%2520round%2520blue%2520and%2520white%2520batik%2520print%2520tablecloth%2520displayed%2520on%2520a%2520dining%2520table%2520with%2520minimal%2520table%2520setting%252C%2520showing%2520the%2520detailed%2520traditional%2520indigo%2520patterns%252C%2520professional%2520product%2520photography%2520with%2520soft%2520natural%2520lighting%2520and%2520clean%2520background&width=400&height=500&seq=206&orientation=portrait"
},
{
id: 7,
name: "Handloom Cotton Saree",
category: "apparel",
price: 189.99,
discountPrice: 159.99,
colors: ["maroon", "gold", "green"],
technique: "Traditional Handloom",
material: "Pure Cotton",
dimensions: "5.5 meters",
description: "Exquisite handloom cotton saree with traditional border designs. Each piece is a testament to our artisans' skill and dedication.",
image: "https://readdy.ai/api/search-image?query=exquisite%2520maroon%2520and%2520gold%2520handloom%2520cotton%2520saree%2520with%2520traditional%2520border%2520designs%2520elegantly%2520draped%2520on%2520a%2520mannequin%252C%2520showing%2520the%2520detailed%2520weaving%2520patterns%2520and%2520texture%252C%2520professional%2520fashion%2520photography%2520with%2520soft%2520lighting%2520and%2520clean%2520background&width=400&height=500&seq=207&orientation=portrait"
},
{
id: 8,
name: "Hand-Embroidered Wall Hanging",
category: "wall-decor",
price: 149.99,
discountPrice: 129.99,
colors: ["multicolor", "earthy", "vibrant"],
technique: "Hand Embroidery",
material: "Cotton Canvas",
dimensions: "36\" x 48\"",
description: "Stunning hand-embroidered wall hanging depicting traditional village scenes. A true conversation piece for your home.",
image: "https://readdy.ai/api/search-image?query=stunning%2520multicolored%2520hand-embroidered%2520wall%2520hanging%2520depicting%2520traditional%2520village%2520scenes%2520displayed%2520on%2520a%2520neutral%2520wall%252C%2520showing%2520the%2520intricate%2520needlework%2520and%2520vibrant%2520colors%252C%2520professional%2520interior%2520photography%2520with%2520soft%2520lighting%2520highlighting%2520the%2520detailed%2520craftsmanship&width=400&height=500&seq=208&orientation=portrait"
}
];
const categories = [
{ id: 'all', name: 'All Products', icon: faThLarge },
{ id: 'bedsheets', name: 'Bedsheets', icon: faBed },
{ id: 'curtains', name: 'Curtains', icon: faColumns },
{ id: 'table-runners', name: 'Table Runners', icon: faTable },
{ id: 'cushions', name: 'Cushions', icon: faCouch },
{ id: 'rugs', name: 'Rugs', icon: faBorderAll },
{ id: 'table-linens', name: 'Table Linens', icon: faUtensils },
{ id: 'apparel', name: 'Apparel', icon: faTshirt },
{ id: 'wall-decor', name: 'Wall Decor', icon: faImage }
];
const colorOptions = [
{ id: 'blue', name: 'Blue', hex: '#1e40af' },
{ id: 'red', name: 'Red', hex: '#dc2626' },
{ id: 'green', name: 'Green', hex: '#15803d' },
{ id: 'white', name: 'White', hex: '#f9fafb' },
{ id: 'beige', name: 'Beige', hex: '#e5e0d5' },
{ id: 'gray', name: 'Gray', hex: '#6b7280' },
{ id: 'indigo', name: 'Indigo', hex: '#4f46e5' },
{ id: 'mustard', name: 'Mustard', hex: '#d97706' },
{ id: 'teal', name: 'Teal', hex: '#0d9488' },
{ id: 'burgundy', name: 'Burgundy', hex: '#9f1239' },
{ id: 'navy', name: 'Navy', hex: '#1e3a8a' },
{ id: 'cream', name: 'Cream', hex: '#fef3c7' },
{ id: 'maroon', name: 'Maroon', hex: '#7f1d1d' },
{ id: 'gold', name: 'Gold', hex: '#b45309' },
{ id: 'multicolor', name: 'Multicolor', hex: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' }
];
const techniqueOptions = [
{ id: 'Ikat', name: 'Ikat' },
{ id: 'Jamdani', name: 'Jamdani' },
{ id: 'Kantha', name: 'Kantha' },
{ id: 'Block Print', name: 'Block Print' },
{ id: 'Traditional Loom', name: 'Traditional Loom' },
{ id: 'Batik', name: 'Batik' },
{ id: 'Hand Embroidery', name: 'Hand Embroidery' }
];
const sortOptions = [
{ id: 'featured', name: 'Featured' },
{ id: 'price-low', name: 'Price: Low to High' },
{ id: 'price-high', name: 'Price: High to Low' },
{ id: 'newest', name: 'Newest' }
];
useEffect(() => {
// Simulate loading
const timer = setTimeout(() => {
setIsLoading(false);
}, 1000);
return () => clearTimeout(timer);
}, []);
const handleAddToCart = () => {
setCartCount(prevCount => prevCount + 1);
};
const toggleColorSelection = (colorId: string) => {
setSelectedColors(prev =>
prev.includes(colorId)
? prev.filter(id => id !== colorId)
: [...prev, colorId]
);
};
const toggleTechniqueSelection = (techniqueId: string) => {
setSelectedTechniques(prev =>
prev.includes(techniqueId)
? prev.filter(id => id !== techniqueId)
: [...prev, techniqueId]
);
};
const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const value = parseInt(e.target.value);
const index = parseInt(e.target.dataset.index || "0");
setPriceRange(prev => {
const newRange = [...prev];
newRange[index] = value;
return newRange;
});
};
const clearAllFilters = () => {
setActiveCategory('all');
setPriceRange([0, 500]);
setSelectedColors([]);
setSelectedTechniques([]);
setSortOption('featured');
};
// Filter products based on selected filters
const filteredProducts = products.filter(product => {
// Filter by category
if (activeCategory !== 'all' && product.category !== activeCategory) {
return false;
}
// Filter by price range
if (product.price < priceRange[0] || product.price > priceRange[1]) {
return false;
}
// Filter by color
if (selectedColors.length > 0 && !product.colors.some(color => selectedColors.includes(color))) {
return false;
}
// Filter by technique
if (selectedTechniques.length > 0 && !selectedTechniques.includes(product.technique)) {
return false;
}
return true;
});
// Sort products
const sortedProducts = [...filteredProducts].sort((a, b) => {
switch (sortOption) {
case 'price-low':
return (a.discountPrice || a.price) - (b.discountPrice || b.price);
case 'price-high':
return (b.discountPrice || b.price) - (a.discountPrice || a.price);
case 'newest':
return b.id - a.id;
default:
return 0;
}
});
// Pagination
const productsPerPage = 8;
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
const paginate = (pageNumber: number) => {
setCurrentPage(pageNumber);
window.scrollTo({ top: 0, behavior: 'smooth' });
};
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}

<main>
{/* Hero Banner */}
<section className="relative h-[400px] overflow-hidden">
<div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent z-10"></div>
<img
src="https://readdy.ai/api/search-image?query=beautiful%2520display%2520of%2520various%2520colorful%2520handloom%2520textiles%2520including%2520bedsheets%2520curtains%2520and%2520table%2520runners%2520arranged%2520in%2520an%2520elegant%2520showroom%2520setting%2520with%2520soft%2520natural%2520lighting%2520highlighting%2520the%2520intricate%2520patterns%2520and%2520textures%2520professional%2520interior%2520photography%2520with%2520warm%2520tones&width=1440&height=400&seq=200&orientation=landscape"
alt="Our Collections"
className="w-full h-full object-cover object-top"
/>
<div className="absolute inset-0 flex items-center z-20">
<div className="container mx-auto px-6 md:px-12">
<div className="max-w-lg">
<h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Collections</h2>
<p className="text-xl text-white mb-8">Discover our handcrafted textiles, each piece telling a unique story of tradition and artistry.</p>
<div className="flex flex-wrap gap-2">
{categories.slice(1, 5).map(category => (
<button
key={category.id}
onClick={() => setActiveCategory(category.id)}
className="bg-white/90 text-indigo-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition duration-300 flex items-center !rounded-button whitespace-nowrap cursor-pointer"
>
<FontAwesomeIcon icon={category.icon} className="mr-2" />
{category.name}
</button>
))}
</div>
</div>
</div>
</div>
</section>
{/* Breadcrumbs */}
<div className="bg-white border-b">
<div className="container mx-auto px-4 py-3">
<div className="flex items-center text-sm text-gray-600">
<a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/2bea63fb-d2fc-42a2-85a7-0c3a7738250f" data-readdy="true" className="hover:text-indigo-600 cursor-pointer">Home</a>
<FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs text-gray-400" />
<span className="text-indigo-600 font-medium">Products</span>
</div>
</div>
</div>
{/* Quick Filter Bar - Sticky on scroll */}
<div className="sticky top-0 z-30 bg-white shadow-md border-b">
<div className="container mx-auto px-4 py-3">
<div className="flex items-center justify-between">
<div className="flex items-center space-x-4">
<button
onClick={() => setShowFilters(!showFilters)}
className="flex items-center text-gray-700 hover:text-indigo-600 !rounded-button whitespace-nowrap cursor-pointer"
>
<FontAwesomeIcon icon={faSlidersH} className="mr-2" />
<span className="font-medium">Filters</span>
</button>
<div className="hidden md:flex items-center space-x-2">
{selectedColors.length > 0 && (
<div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
<span className="text-xs text-indigo-700 mr-2">Colors: {selectedColors.length}</span>
<button
onClick={() => setSelectedColors([])}
className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
>
<FontAwesomeIcon icon={faTimesCircle} />
</button>
</div>
)}
{selectedTechniques.length > 0 && (
<div className="flex items-center bg-indigo-50 px-3 py-1 rounded-full">
<span className="text-xs text-indigo-700 mr-2">Techniques: {selectedTechniques.length}</span>
<button
onClick={() => setSelectedTechniques([])}
className="text-indigo-500 hover:text-indigo-700 cursor-pointer"
>
<FontAwesomeIcon icon={faTimesCircle} />
</button>
</div>
)}
{(activeCategory !== 'all' || priceRange[0] > 0 || priceRange[1] < 500 || selectedColors.length > 0 || selectedTechniques.length > 0) && (
<button
onClick={clearAllFilters}
className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
>
Clear All
</button>
)}
</div>
</div>
<div className="flex items-center space-x-2">
<span className="text-sm text-gray-500 hidden md:inline">Sort by:</span>
<div className="relative">
<button
className="flex items-center space-x-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:border-indigo-500 !rounded-button whitespace-nowrap cursor-pointer"
onClick={() => document.getElementById('sortDropdown')?.classList.toggle('hidden')}
>
<span>{sortOptions.find(option => option.id === sortOption)?.name}</span>
<FontAwesomeIcon icon={faChevronDown} className="text-xs" />
</button>
<div id="sortDropdown" className="hidden absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
{sortOptions.map(option => (
<button
key={option.id}
onClick={() => {
setSortOption(option.id);
document.getElementById('sortDropdown')?.classList.add('hidden');
}}
className={`block w-full text-left px-4 py-2 text-sm ${sortOption === option.id ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer`}
>
{option.name}
</button>
))}
</div>
</div>
<div className="text-sm text-gray-500">
<span className="hidden md:inline">{filteredProducts.length} products</span>
</div>
</div>
</div>
</div>
</div>
<div className="container mx-auto px-4 py-8">
<div className="flex flex-col md:flex-row gap-8">
{/* Filters Sidebar */}
<aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
<div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-semibold text-gray-800">Filters</h3>
<button
onClick={() => setShowFilters(false)}
className="md:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
>
<FontAwesomeIcon icon={faTimes} />
</button>
</div>
{/* Categories */}
<div className="mb-6">
<h4 className="text-sm font-semibold text-gray-700 mb-3">Categories</h4>
<ul className="space-y-2">
{categories.map(category => (
<li key={category.id}>
<button
onClick={() => setActiveCategory(category.id)}
className={`flex items-center w-full text-left px-2 py-1.5 rounded-md text-sm ${activeCategory === category.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer`}
>
<FontAwesomeIcon icon={category.icon} className={`w-5 text-center mr-3 ${activeCategory === category.id ? 'text-indigo-600' : 'text-gray-500'}`} />
<span>{category.name}</span>
</button>
</li>
))}
</ul>
</div>
{/* Price Range */}
<div className="mb-6">
<h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h4>
<div className="space-y-4">
<div className="flex items-center justify-between">
<div className="bg-gray-100 rounded-md px-3 py-1.5">
<span className="text-gray-500 text-xs">$</span>
<span className="text-gray-800 font-medium">{priceRange[0]}</span>
</div>
<span className="text-gray-400">to</span>
<div className="bg-gray-100 rounded-md px-3 py-1.5">
<span className="text-gray-500 text-xs">$</span>
<span className="text-gray-800 font-medium">{priceRange[1]}</span>
</div>
</div>
<div className="relative pt-1">
<input
type="range"
min="0"
max="500"
step="10"
value={priceRange[0]}
data-index="0"
onChange={handlePriceChange}
className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
/>
<input
type="range"
min="0"
max="500"
step="10"
value={priceRange[1]}
data-index="1"
onChange={handlePriceChange}
className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
/>
</div>
</div>
</div>
{/* Colors */}
<div className="mb-6">
<h4 className="text-sm font-semibold text-gray-700 mb-3">Colors</h4>
<div className="flex flex-wrap gap-2">
{colorOptions.map(color => (
<button
key={color.id}
onClick={() => toggleColorSelection(color.id)}
className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${selectedColors.includes(color.id) ? 'border-indigo-500' : 'border-transparent hover:border-gray-300'} cursor-pointer`}
style={{
background: color.id === 'multicolor' ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' : color.hex,
boxShadow: color.id === 'white' || color.id === 'cream' || color.id === 'beige' ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none'
}}
title={color.name}
>
{selectedColors.includes(color.id) && (
<i className={`fas fa-check text-xs ${['white', 'cream', 'beige'].includes(color.id) ? 'text-gray-800' : 'text-white'}`}></i>
)}
</button>
))}
</div>
</div>
{/* Techniques */}
<div className="mb-6">
<h4 className="text-sm font-semibold text-gray-700 mb-3">Techniques</h4>
<div className="space-y-2">
{techniqueOptions.map(technique => (
<div key={technique.id} className="flex items-center">
<button
onClick={() => toggleTechniqueSelection(technique.id)}
className={`w-5 h-5 rounded flex items-center justify-center ${selectedTechniques.includes(technique.id) ? 'bg-indigo-600 text-white' : 'border border-gray-300 text-transparent'} cursor-pointer`}
>
<i className="fas fa-check text-xs"></i>
</button>
<span className="ml-3 text-sm text-gray-700">{technique.name}</span>
</div>
))}
</div>
</div>
<button
onClick={clearAllFilters}
className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-medium py-2 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
>
Clear All Filters
</button>
</div>
</aside>
{/* Product Grid */}
<div className="flex-grow">
{isLoading ? (
// Skeleton Loading
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{[...Array(8)].map((_, index) => (
<div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
<div className="h-64 bg-gray-200"></div>
<div className="p-4 space-y-3">
<div className="h-4 bg-gray-200 rounded w-3/4"></div>
<div className="h-4 bg-gray-200 rounded w-1/2"></div>
<div className="h-4 bg-gray-200 rounded w-5/6"></div>
<div className="h-8 bg-gray-200 rounded w-1/3"></div>
</div>
</div>
))}
</div>
) : sortedProducts.length > 0 ? (
<>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
{currentProducts.map(product => (
<div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300">
<div className="relative h-64 overflow-hidden">
<img
src={product.image}
alt={product.name}
className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
/>
{product.discountPrice && (
<div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
SALE
</div>
)}
<div className="absolute top-3 right-3 flex flex-col space-y-2">
<button className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:text-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 !rounded-button cursor-pointer">
<i className="fas fa-heart"></i>
</button>
<button className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-gray-700 hover:text-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 !rounded-button cursor-pointer">
<i className="fas fa-eye"></i>
</button>
</div>
<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
<button
onClick={handleAddToCart}
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-300 flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
>
<i className="fas fa-shopping-cart mr-2"></i>
Add to Cart
</button>
</div>
</div>
<div className="p-4">
<div className="flex items-center mb-2">
<span className="text-xs font-medium text-gray-500 uppercase">{product.category.replace('-', ' ')}</span>
<span className="ml-auto px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">{product.technique}</span>
</div>
<h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
<div className="flex items-center mb-3">
{product.discountPrice ? (
<>
<span className="text-lg font-bold text-indigo-600">${product.discountPrice.toFixed(2)}</span>
<span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
</>
) : (
<span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
)}
</div>
<p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
<div className="flex items-center justify-between">
<div className="flex items-center">
<span className="text-xs text-gray-500 mr-2">Colors:</span>
<div className="flex space-x-1">
{product.colors.slice(0, 3).map(colorId => {
const colorInfo = colorOptions.find(c => c.id === colorId);
return (
<div
key={colorId}
className="w-4 h-4 rounded-full border border-gray-300"
style={{
background: colorId === 'multicolor' ? 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' : colorInfo?.hex,
boxShadow: colorId === 'white' || colorId === 'cream' || colorId === 'beige' ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none'
}}
title={colorInfo?.name}
></div>
);
})}
{product.colors.length > 3 && (
<span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
)}
</div>
</div>
<div className="text-xs text-gray-500">
<i className="fas fa-ruler-combined mr-1"></i>
{product.dimensions}
</div>
</div>
</div>
</div>
))}
</div>
{/* Pagination */}
{totalPages > 1 && (
<div className="mt-12 flex justify-center">
<div className="flex items-center space-x-1">
<button
onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
disabled={currentPage === 1}
className={`px-3 py-1.5 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'} !rounded-button whitespace-nowrap`}
>
<i className="fas fa-chevron-left text-xs"></i>
</button>
{[...Array(totalPages)].map((_, index) => {
const pageNumber = index + 1;
return (
<button
key={pageNumber}
onClick={() => paginate(pageNumber)}
className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === pageNumber ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'} !rounded-button cursor-pointer`}
>
{pageNumber}
</button>
);
})}
<button
onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
disabled={currentPage === totalPages}
className={`px-3 py-1.5 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100 cursor-pointer'} !rounded-button whitespace-nowrap`}
>
<i className="fas fa-chevron-right text-xs"></i>
</button>
</div>
</div>
)}
</>
) : (
<div className="bg-white rounded-lg shadow-md p-8 text-center">
<div className="text-5xl text-gray-300 mb-4">
<i className="fas fa-search"></i>
</div>
<h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
<p className="text-gray-600 mb-6">We couldn't find any products matching your current filters.</p>
<button
onClick={clearAllFilters}
className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
>
Clear All Filters
</button>
</div>
)}
</div>
</div>
</div>
{/* Featured Collections */}
<section className="bg-gray-50 py-16">
<div className="container mx-auto px-4">
<h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Featured Collections</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<div className="relative h-80 rounded-lg overflow-hidden group shadow-md">
<img
src="https://readdy.ai/api/search-image?query=beautiful%2520bedroom%2520setting%2520with%2520elegant%2520handloom%2520bedsheets%2520and%2520matching%2520pillowcases%2520in%2520soft%2520natural%2520colors%2520with%2520intricate%2520traditional%2520patterns%2520warm%2520lighting%2520creating%2520a%2520cozy%2520atmosphere%2520professional%2520interior%2520photography%2520with%2520clean%2520styling&width=400&height=500&seq=209&orientation=portrait"
alt="Bedroom Collection"
className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
<div className="absolute inset-0 flex flex-col justify-end p-6">
<h3 className="text-xl font-bold text-white mb-2">Bedroom Collection</h3>
<p className="text-gray-200 mb-4">Transform your bedroom with our luxurious handloom bedsheets and pillowcases.</p>
<button className="bg-white text-indigo-800 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition duration-300 w-fit !rounded-button whitespace-nowrap cursor-pointer">
Explore Collection
</button>
</div>
</div>
<div className="relative h-80 rounded-lg overflow-hidden group shadow-md">
<img
src="https://readdy.ai/api/search-image?query=elegant%2520dining%2520table%2520setting%2520with%2520handloom%2520table%2520runner%2520and%2520matching%2520napkins%2520in%2520rich%2520colors%2520with%2520traditional%2520patterns%2520beautifully%2520arranged%2520with%2520dinnerware%2520and%2520subtle%2520decorations%2520warm%2520lighting%2520creating%2520an%2520inviting%2520atmosphere%2520professional%2520interior%2520photography&width=400&height=500&seq=210&orientation=portrait"
alt="Dining Collection"
className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
<div className="absolute inset-0 flex flex-col justify-end p-6">
<h3 className="text-xl font-bold text-white mb-2">Dining Collection</h3>
<p className="text-gray-200 mb-4">Elevate your dining experience with our handcrafted table linens and runners.</p>
<button className="bg-white text-indigo-800 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition duration-300 w-fit !rounded-button whitespace-nowrap cursor-pointer">
Explore Collection
</button>
</div>
</div>
<div className="relative h-80 rounded-lg overflow-hidden group shadow-md">
<img
src="https://readdy.ai/api/search-image?query=stylish%2520living%2520room%2520with%2520handloom%2520curtains%2520and%2520matching%2520cushions%2520in%2520coordinated%2520colors%2520and%2520patterns%2520natural%2520light%2520streaming%2520through%2520the%2520textiles%2520highlighting%2520their%2520intricate%2520designs%2520elegant%2520contemporary%2520furniture%2520arrangement%2520professional%2520interior%2520photography&width=400&height=500&seq=211&orientation=portrait"
alt="Living Room Collection"
className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
<div className="absolute inset-0 flex flex-col justify-end p-6">
<h3 className="text-xl font-bold text-white mb-2">Living Room Collection</h3>
<p className="text-gray-200 mb-4">Create a warm and inviting living space with our handloom curtains and cushions.</p>
<button className="bg-white text-indigo-800 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition duration-300 w-fit !rounded-button whitespace-nowrap cursor-pointer">
Explore Collection
</button>
</div>
</div>
</div>
</div>
</section>
{/* Newsletter */}
<section className="bg-indigo-100 py-16">
<div className="container mx-auto px-4">
<div className="max-w-3xl mx-auto text-center">
<h2 className="text-3xl font-bold text-indigo-900 mb-4">Stay Updated</h2>
<p className="text-indigo-700 mb-8">Subscribe to our newsletter for exclusive offers, new product announcements, and traditional craft insights.</p>
<div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
<input
type="email"
placeholder="Your email address"
className="flex-grow py-3 px-4 rounded-lg border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
/>
<button className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-300 !rounded-button whitespace-nowrap cursor-pointer">
Subscribe
</button>
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
<li><a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/6684a2aa-be52-4c51-9037-69068e4b7b48" data-readdy="true" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Products</a></li>
<li><a href="https://readdy.ai/home/ae78edcc-0d6f-40b7-b76a-56c35c3eb727/6684a2aa-be52-4c51-9037-69068e4b7b48" data-readdy="true" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">About Us</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">Contact</a></li>
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