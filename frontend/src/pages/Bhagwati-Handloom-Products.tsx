// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTag,
  faThLarge,
  faChevronRight,
  faSlidersH,
  faChevronDown,
  faTimes,
  faHeart,
  faEye,
  faShoppingCart,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';

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
  stock: number;
}

const App: React.FC<{ handleAddToCart: (product: Product) => void }> = ({ handleAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortOption = searchParams.get('sort') || 'featured';
  const [sortOption, setSortOption] = useState(initialSortOption);
  const [categories, setCategories] = useState<{ id: string; name: string; icon: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const sortFromUrl = searchParams.get('sort');
    if (sortFromUrl && sortFromUrl !== sortOption) {
      setSortOption(sortFromUrl);
    }
  }, [searchParams, sortOption]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching all categories:', error);
      } else {
        const uniqueCategories = Array.from(new Set(data.map(item => item.category).filter(Boolean)));
        const formattedCategories = uniqueCategories.map(category => ({
          id: category.toLowerCase().replace(/ /g, '-'),
          name: category,
          icon: 'tag'
        }));
        setCategories([{ id: 'all', name: 'All Products', icon: 'th-large' }, ...formattedCategories]);
      }
    };
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const categoryFromUrl = searchParams.get('category') || 'all';

      // Fetch products
      let query = supabase
        .from('products')
        .select('*')
        .gt('stock', 0);

      if (categoryFromUrl !== 'all') {
        query = query.ilike('category', categoryFromUrl.replace(/-/g, ' '));
      }

      const { data: productsData, error: productsError } = await query;

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        const productsWithImages = productsData.map((product: any) => {
          return {
            ...product,
            image: product.image_url ? product.image_url : '/src/assets/default-product-image.png'
          };
        });
        setProducts(productsWithImages);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'newest', name: 'Newest' }
  ];

  const clearAllFilters = () => {
    setSortOption('featured');
    setSearchParams(prev => {
      prev.set('category', 'all');
      prev.set('sort', 'featured');
      return prev;
    });
  };

  // Filter products based on selected filters
  const filteredProducts: Product[] = products;
  
  // Sort products
  const sortedProducts: Product[] = [...filteredProducts].sort((a: Product, b: Product) => {
    switch (sortOption) {
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
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
    <div className="min-h-screen pt-20 bg-gray-50">
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
                      onClick={() => {
                        setSearchParams(prev => {
                          prev.set('category', category.id);
                          return prev;
                        });

                      }}
                      className="bg-white/90 text-indigo-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition duration-300 flex items-center !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <FontAwesomeIcon icon={category.icon === 'tag' ? faTag : faThLarge} className="mr-2" />
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
              <a href="/" className="hover:text-indigo-600 cursor-pointer">Home</a>
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
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                  >
                    Clear All
                  </button>
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
                    <FontAwesomeIcon icon={faChevronDown} className="text-xs"/>
                  </button>
                  <div id="sortDropdown" className="hidden absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                    {sortOptions.map(option => (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSortOption(option.id);
                          const newSearchParams = new URLSearchParams(searchParams.toString());
                          newSearchParams.set('sort', option.id);
                          setSearchParams(newSearchParams);
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
                          onClick={() => {
                           
                            const newSearchParams = new URLSearchParams(searchParams.toString());
                            newSearchParams.set('category', category.id);
                            setSearchParams(newSearchParams);

                          }}
                          className={`flex items-center w-full text-left px-2 py-1.5 rounded-md text-sm ${searchParams.get('category') === category.id ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                        >
                          <i className={`fas fa-${category.icon} w-5 text-center mr-3 ${searchParams.get('category') === category.id ? 'text-indigo-600' : 'text-gray-500'}`}></i>
                          <span>{category.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
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

                        </div>
                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <span className="text-xs font-medium text-gray-500 uppercase">{product.category ? product.category.replace('-', ' ') : 'Uncategorized'}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
                          <div className="flex items-center mb-3">
                            {product.discountPrice ? (
                              <>
                                <span className="text-lg font-bold text-indigo-600">${product.discountPrice.toFixed(2)}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-indigo-600">र{product.price.toFixed(2)}</span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                          {product.dimensions && <p className="text-sm text-gray-600 mb-3">Dimensions: {product.dimensions}</p>}
                          {product.stock > 0 ? (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center mt-4"
                            >
                              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                              Add to Cart
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center mt-4"
                            >
                              Out of Stock
                            </button>
                          )}
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
                          <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
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
                          <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
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
      

        {/* Newsletter */}
       
      </main>



      <Footer />

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

export default App;