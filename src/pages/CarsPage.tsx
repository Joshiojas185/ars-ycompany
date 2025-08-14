import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { mockCars } from '../data/mockCars';
import { SearchCriteria, CarRental, CartItem } from '../types';
import { useApp } from '../context/AppContext';
import { Car, MapPin, ShoppingCart, Users, Fuel, Settings } from 'lucide-react';

export function CarsPage() {
  const { dispatch } = useApp();
  const [searchResults, setSearchResults] = useState<CarRental[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    car: CarRental | null;
    action: 'cart' | 'buy';
  }>({ isOpen: false, car: null, action: 'cart' });

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For cars, we'll show all available cars
    setSearchResults(mockCars);
    setIsLoading(false);
  };

  const handleAddToCart = (car: CarRental) => {
    setConfirmDialog({
      isOpen: true,
      car,
      action: 'cart'
    });
  };

  const handleBuyNow = (car: CarRental) => {
    setConfirmDialog({
      isOpen: true,
      car,
      action: 'buy'
    });
  };

  const confirmAction = () => {
    if (confirmDialog.car) {
      if (confirmDialog.action === 'cart') {
        addToCart(confirmDialog.car);
      } else {
        buyNow(confirmDialog.car);
      }
    }
    setConfirmDialog({ isOpen: false, car: null, action: 'cart' });
  };

  const addToCart = (car: CarRental) => {
    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'car',
      item: car,
      quantity: 1,
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `${car.brand} ${car.model} added to cart`,
        type: 'success',
        read: false,
      },
    });
  };

  const buyNow = async (car: CarRental) => {
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'car' as const,
      item: car,
      bookingDate: new Date().toISOString(),
      totalAmount: car.pricePerDay,
      status: 'confirmed' as const,
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `${car.brand} ${car.model} booked successfully!`,
        type: 'success',
        read: false,
      },
    });
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'gps':
        return <MapPin className="h-4 w-4" />;
      case 'automatic':
        return <Settings className="h-4 w-4" />;
      case 'ac':
        return <Fuel className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-orange-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Rent the Perfect Car</h1>
            <p className="text-xl text-orange-200">
              Choose from our wide selection of vehicles for your journey
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SearchBar onSearch={handleSearch} type="cars" />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : hasSearched ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchResults.length} cars available
              </h2>
              <div className="flex space-x-4">
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option>Sort by Price</option>
                  <option>Sort by Type</option>
                  <option>Sort by Brand</option>
                </select>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((car) => (
                  <div key={car.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full">
                        <span className="text-sm font-medium text-orange-600">{car.type}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-1">
                            {car.brand} {car.model}
                          </h3>
                          <p className="text-gray-600 text-sm">{car.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">
                            ${car.pricePerDay}
                          </div>
                          <div className="text-sm text-gray-500">per day</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{car.pickupLocation}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Pickup: {car.pickupDate} | Drop-off: {car.dropoffDate}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {car.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                              {getFeatureIcon(feature)}
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-2">
                          <button
                            onClick={() => handleBuyNow(car)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                          >
                            <Car className="h-4 w-4" />
                            <span>Rent Now</span>
                          </button>
                          <button
                            onClick={() => handleAddToCart(car)}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or selecting different dates.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Car className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Car</h2>
            <p className="text-gray-600 text-lg">
              Use the search form above to find cars for your destination.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Rent Now'}
        message={
          confirmDialog.car
            ? `Are you sure you want to ${confirmDialog.action === 'cart' ? 'add' : 'rent'} ${confirmDialog.car.brand} ${confirmDialog.car.model} from ${confirmDialog.car.pickupLocation}?`
            : ''
        }
        confirmText={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Rent Now'}
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, car: null, action: 'cart' })}
        type={confirmDialog.action === 'cart' ? 'info' : 'success'}
      />
    </div>
  );
}