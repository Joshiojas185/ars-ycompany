import React, { useState } from 'react';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { mockProducts } from '../data/mockProducts';
import { Product, CartItem } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star, ShoppingCart, Search, Filter } from 'lucide-react';

export function ShopPage() {
  const { dispatch } = useApp();
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    product: Product | null;
    action: 'cart' | 'buy';
  }>({ isOpen: false, product: null, action: 'cart' });

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (term: string, category: string) => {
    let filtered = products;

    if (category !== 'All') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (term) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
    setConfirmDialog({
      isOpen: true,
      product,
      action: 'cart'
    });
  };

  const handleBuyNow = (product: Product) => {
    setConfirmDialog({
      isOpen: true,
      product,
      action: 'buy'
    });
  };

  const confirmAction = () => {
    if (confirmDialog.product) {
      if (confirmDialog.action === 'cart') {
        addToCart(confirmDialog.product);
      } else {
        buyNow(confirmDialog.product);
      }
    }
    setConfirmDialog({ isOpen: false, product: null, action: 'cart' });
  };

  const addToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'product',
      item: product,
      quantity: 1,
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `${product.name} added to cart`,
        type: 'success',
        read: false,
      },
    });
  };

  const buyNow = async (product: Product) => {
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'product' as const,
      item: product,
      bookingDate: new Date().toISOString(),
      totalAmount: product.price,
      status: 'confirmed' as const,
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `${product.name} purchased successfully!`,
        type: 'success',
        read: false,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">YCompany Travel Shop</h1>
            <p className="text-xl text-purple-200">
              Discover premium travel essentials and exclusive merchandise
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {filteredProducts.length} products found
          </h2>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full">
                    <span className="text-sm font-medium text-purple-600">{product.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-purple-600">
                      Rs. {product.price}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors text-sm"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg font-semibold transition-colors flex items-center space-x-1"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse different categories.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Buy Now'}
        message={
          confirmDialog.product
            ? `Are you sure you want to ${confirmDialog.action === 'cart' ? 'add' : 'purchase'} ${confirmDialog.product.name}?`
            : ''
        }
        confirmText={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Buy Now'}
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, product: null, action: 'cart' })}
        type={confirmDialog.action === 'cart' ? 'info' : 'success'}
      />
    </div>
  );
}