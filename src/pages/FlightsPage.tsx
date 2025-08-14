import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { SeatPreferenceModal } from '../components/common/SeatPreferenceModal';
import { mockFlights } from '../data/mockFlights';
import { SearchCriteria, Flight, CartItem } from '../types';
import { useApp } from '../context/AppContext';
import { Plane, Clock, Users, ShoppingCart, Star } from 'lucide-react';
import { format } from 'date-fns';

export function FlightsPage() {
  const { dispatch } = useApp();
  const [searchResults, setSearchResults] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    flight: Flight | null;
    action: 'cart' | 'buy';
  }>({ isOpen: false, flight: null, action: 'cart' });
  const [seatModal, setSeatModal] = useState<{
    isOpen: boolean;
    flight: Flight | null;
    action: 'cart' | 'buy';
  }>({ isOpen: false, flight: null, action: 'cart' });

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Filter flights based on search criteria
    const filteredFlights = mockFlights.filter(flight => {
      return (
        flight.origin.code === criteria.origin &&
        flight.destination.code === criteria.destination &&
        flight.cabinClass === criteria.cabinClass
      );
    });

    setSearchResults(filteredFlights);
    setIsLoading(false);
  };

  const handleAddToCart = (flight: Flight) => {
    setConfirmDialog({
      isOpen: true,
      flight,
      action: 'cart'
    });
  };

  const handleBuyNow = (flight: Flight) => {
    setConfirmDialog({
      isOpen: true,
      flight,
      action: 'buy'
    });
  };

  const confirmAction = () => {
    if (confirmDialog.flight) {
      setSeatModal({
        isOpen: true,
        flight: confirmDialog.flight,
        action: confirmDialog.action
      });
    }
    setConfirmDialog({ isOpen: false, flight: null, action: 'cart' });
  };

  const handleSeatSelection = (preference: 'Window' | 'Aisle' | 'Middle') => {
    if (!seatModal.flight) return;

    if (seatModal.action === 'cart') {
      addToCart(seatModal.flight, preference);
    } else {
      buyNow(seatModal.flight, preference);
    }
  };

  const addToCart = (flight: Flight, seatPreference: 'Window' | 'Aisle' | 'Middle') => {
    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'flight',
      item: flight,
      quantity: 1,
      selectedExtras: [{ seatPreference }],
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `Flight ${flight.flightNumber} with ${seatPreference} seat preference added to cart`,
        type: 'success',
        read: false,
      },
    });
  };

  const buyNow = async (flight: Flight, seatPreference: 'Window' | 'Aisle' | 'Middle') => {
    // Create booking directly
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'flight' as const,
      item: flight,
      bookingDate: new Date().toISOString(),
      totalAmount: flight.price,
      status: 'confirmed' as const,
      seatPreference,
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `Flight ${flight.flightNumber} booked successfully with ${seatPreference} seat preference!`,
        type: 'success',
        read: false,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Flight</h1>
            <p className="text-xl text-blue-200">
              Search hundreds of flights to find the best deals for your journey
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SearchBar onSearch={handleSearch} type="flights" />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : hasSearched ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchResults.length} flights found
              </h2>
              <div className="flex space-x-4">
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sort by Price</option>
                  <option>Sort by Duration</option>
                  <option>Sort by Departure Time</option>
                </select>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Plane className="h-6 w-6 text-blue-600" />
                                <span className="font-semibold text-lg">{flight.flightNumber}</span>
                              </div>
                              <span className="text-gray-500">{flight.airline}</span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">4.5</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-blue-600">
                                ${flight.price}
                              </div>
                              <div className="text-sm text-gray-500">per person</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-500">From</div>
                              <div className="font-semibold">{flight.origin.code}</div>
                              <div className="text-sm text-gray-600">{flight.origin.city}</div>
                              <div className="text-lg font-mono">
                                {format(new Date(flight.departureTime), 'HH:mm')}
                              </div>
                            </div>

                            <div className="text-center">
                              <div className="text-sm text-gray-500 mb-2">Duration</div>
                              <div className="flex items-center justify-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{flight.duration}</span>
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop(s)`}
                              </div>
                            </div>

                            <div className="text-right md:text-left">
                              <div className="text-sm text-gray-500">To</div>
                              <div className="font-semibold">{flight.destination.code}</div>
                              <div className="text-sm text-gray-600">{flight.destination.city}</div>
                              <div className="text-lg font-mono">
                                {format(new Date(flight.arrivalTime), 'HH:mm')}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{flight.availableSeats} seats available</span>
                            </div>
                            <div>Aircraft: {flight.aircraft}</div>
                            <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {flight.cabinClass}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 lg:mt-0 lg:ml-6">
                          <div className="space-y-2">
                            <button
                              onClick={() => handleBuyNow(flight)}
                              className="w-full lg:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                            >
                              <Plane className="h-5 w-5" />
                              <span>Buy Now</span>
                            </button>
                            <button
                              onClick={() => handleAddToCart(flight)}
                              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                            >
                              <ShoppingCart className="h-5 w-5" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No flights found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or selecting different dates.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Plane className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to fly?</h2>
            <p className="text-gray-600 text-lg">
              Use the search form above to find flights to your destination.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Buy Now'}
        message={
          confirmDialog.flight
            ? `Are you sure you want to ${confirmDialog.action === 'cart' ? 'add' : 'book'} flight ${confirmDialog.flight.flightNumber} from ${confirmDialog.flight.origin.code} to ${confirmDialog.flight.destination.code}?`
            : ''
        }
        confirmText={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Book Now'}
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, flight: null, action: 'cart' })}
        type={confirmDialog.action === 'cart' ? 'info' : 'success'}
      />

      <SeatPreferenceModal
        isOpen={seatModal.isOpen}
        onClose={() => setSeatModal({ isOpen: false, flight: null, action: 'cart' })}
        onConfirm={handleSeatSelection}
        flightNumber={seatModal.flight?.flightNumber || ''}
      />
    </div>
  );
}