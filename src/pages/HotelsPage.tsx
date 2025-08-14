// import React, { useState } from 'react';
// import { SearchBar } from '../components/common/SearchBar';
// import { LoadingSpinner } from '../components/common/LoadingSpinner';
// import { ConfirmDialog } from '../components/common/ConfirmDialog';
// import { mockHotels } from '../data/mockHotels';
// import { SearchCriteria, Hotel, CartItem } from '../types';
// import { useApp } from '../context/AppContext';
// import { Hotel as HotelIcon, Star, MapPin, ShoppingCart, Wifi, Car, Utensils, Waves } from 'lucide-react';

// export function HotelsPage() {
//   const { dispatch } = useApp();
//   const [searchResults, setSearchResults] = useState<Hotel[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false);
//   const [confirmDialog, setConfirmDialog] = useState<{
//     isOpen: boolean;
//     hotel: Hotel | null;
//     action: 'cart' | 'buy';
//   }>({ isOpen: false, hotel: null, action: 'cart' });

//   const handleSearch = async (criteria: SearchCriteria) => {
//     setIsLoading(true);
//     setHasSearched(true);

//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     // For hotels, we'll show all available hotels
//     setSearchResults(mockHotels);
//     setIsLoading(false);
//   };

//   const handleAddToCart = (hotel: Hotel) => {
//     setConfirmDialog({
//       isOpen: true,
//       hotel,
//       action: 'cart'
//     });
//   };

//   const handleBuyNow = (hotel: Hotel) => {
//     setConfirmDialog({
//       isOpen: true,
//       hotel,
//       action: 'buy'
//     });
//   };

//   const confirmAction = () => {
//     if (confirmDialog.hotel) {
//       if (confirmDialog.action === 'cart') {
//         addToCart(confirmDialog.hotel);
//       } else {
//         buyNow(confirmDialog.hotel);
//       }
//     }
//     setConfirmDialog({ isOpen: false, hotel: null, action: 'cart' });
//   };

//   const addToCart = (hotel: Hotel) => {
//     const cartItem: CartItem = {
//       id: Math.random().toString(36).substr(2, 9),
//       type: 'hotel',
//       item: hotel,
//       quantity: 1,
//     };

//     dispatch({ type: 'ADD_TO_CART', payload: cartItem });
//     dispatch({
//       type: 'ADD_NOTIFICATION',
//       payload: {
//         message: `${hotel.name} added to cart`,
//         type: 'success',
//         read: false,
//       },
//     });
//   };

//   const buyNow = async (hotel: Hotel) => {
//     const booking = {
//       id: Math.random().toString(36).substr(2, 9),
//       type: 'hotel' as const,
//       item: hotel,
//       bookingDate: new Date().toISOString(),
//       totalAmount: hotel.pricePerNight,
//       status: 'confirmed' as const,
//     };

//     dispatch({ type: 'ADD_BOOKING', payload: booking });
//     dispatch({
//       type: 'ADD_NOTIFICATION',
//       payload: {
//         message: `${hotel.name} booked successfully!`,
//         type: 'success',
//         read: false,
//       },
//     });
//   };

//   const getAmenityIcon = (amenity: string) => {
//     switch (amenity.toLowerCase()) {
//       case 'free wifi':
//         return <Wifi className="h-4 w-4" />;
//       case 'pool':
//         return <Waves className="h-4 w-4" />;
//       case 'restaurant':
//         return <Utensils className="h-4 w-4" />;
//       case 'gym':
//         return <Car className="h-4 w-4" />;
//       default:
//         return <Star className="h-4 w-4" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-green-900 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-8">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
//             <p className="text-xl text-green-200">
//               Discover amazing hotels worldwide with the best prices and amenities
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Search Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
//         <SearchBar onSearch={handleSearch} type="hotels" />
//       </div>

//       {/* Results Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {isLoading ? (
//           <LoadingSpinner />
//         ) : hasSearched ? (
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {searchResults.length} hotels found
//               </h2>
//               <div className="flex space-x-4">
//                 <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
//                   <option>Sort by Price</option>
//                   <option>Sort by Rating</option>
//                   <option>Sort by Distance</option>
//                 </select>
//               </div>
//             </div>

//             {searchResults.length > 0 ? (
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {searchResults.map((hotel) => (
//                   <div key={hotel.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
//                     <div className="relative">
//                       <img
//                         src={hotel.images[0]}
//                         alt={hotel.name}
//                         className="w-full h-48 object-cover"
//                       />
//                       <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
//                         <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                         <span className="text-sm font-medium">{hotel.rating}</span>
//                       </div>
//                     </div>

//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                             {hotel.name}
//                           </h3>
//                           <div className="flex items-center text-gray-600 mb-2">
//                             <MapPin className="h-4 w-4 mr-1" />
//                             <span>{hotel.location}</span>
//                           </div>
//                           <div className="flex items-center space-x-1 mb-3">
//                             {[...Array(hotel.rating)].map((_, i) => (
//                               <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
//                             ))}
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-2xl font-bold text-green-600">
//                             ${hotel.pricePerNight}
//                           </div>
//                           <div className="text-sm text-gray-500">per night</div>
//                         </div>
//                       </div>

//                       <div className="mb-4">
//                         <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {hotel.amenities.slice(0, 4).map((amenity, index) => (
//                             <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
//                               {getAmenityIcon(amenity)}
//                               <span>{amenity}</span>
//                             </div>
//                           ))}
//                           {hotel.amenities.length > 4 && (
//                             <div className="bg-gray-100 px-2 py-1 rounded-full text-xs">
//                               +{hotel.amenities.length - 4} more
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
//                         <div>Check-in: {hotel.checkIn}</div>
//                         <div>Check-out: {hotel.checkOut}</div>
//                       </div>

//                       <div className="flex space-x-3">
//                         <div className="flex-1 space-y-2">
//                           <button
//                             onClick={() => handleBuyNow(hotel)}
//                             className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
//                           >
//                             <HotelIcon className="h-4 w-4" />
//                             <span>Book Now</span>
//                           </button>
//                           <button
//                             onClick={() => handleAddToCart(hotel)}
//                             className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
//                           >
//                             <ShoppingCart className="h-4 w-4" />
//                             <span>Add to Cart</span>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <HotelIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-xl font-medium text-gray-900 mb-2">No hotels found</h3>
//                 <p className="text-gray-600">
//                   Try adjusting your search criteria or selecting different dates.
//                 </p>
//               </div>
//             )}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <HotelIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Hotel</h2>
//             <p className="text-gray-600 text-lg">
//               Use the search form above to find hotels for your destination.
//             </p>
//           </div>
//         )}
//       </div>

//       <ConfirmDialog
//         isOpen={confirmDialog.isOpen}
//         title={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Book Now'}
//         message={
//           confirmDialog.hotel
//             ? `Are you sure you want to ${confirmDialog.action === 'cart' ? 'add' : 'book'} ${confirmDialog.hotel.name} in ${confirmDialog.hotel.location}?`
//             : ''
//         }
//         confirmText={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Book Now'}
//         onConfirm={confirmAction}
//         onCancel={() => setConfirmDialog({ isOpen: false, hotel: null, action: 'cart' })}
//         type={confirmDialog.action === 'cart' ? 'info' : 'success'}
//       />
//     </div>
//   );
// }















import React, { useState } from 'react';
import { SearchBar } from '../components/common/SearchBar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { mockHotels } from '../data/mockHotels';
import { SearchCriteria, Hotel, CartItem } from '../types';
import { useApp } from '../context/AppContext';
import { Hotel as HotelIcon, Star, MapPin, ShoppingCart, Wifi, Car, Utensils, Waves } from 'lucide-react';

export function HotelsPage() {
  const { dispatch } = useApp();
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    hotel: Hotel | null;
    action: 'cart' | 'buy';
  }>({ isOpen: false, hotel: null, action: 'cart' });

  const handleSearch = async (criteria: SearchCriteria) => {
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Filter hotels based on search location
    const filteredHotels = mockHotels.filter(hotel => {
      const searchLocation = criteria.origin.toLowerCase();
      const hotelLocation = hotel.location.toLowerCase();
      
      // Check if the hotel location contains the search term
      return hotelLocation.includes(searchLocation) || 
             hotelLocation.includes(searchLocation.replace(/\s+/g, ''));
    });
    
    setSearchResults(filteredHotels);
    setIsLoading(false);
  };

  const handleAddToCart = (hotel: Hotel) => {
    setConfirmDialog({
      isOpen: true,
      hotel,
      action: 'cart'
    });
  };

  const handleBuyNow = (hotel: Hotel) => {
    setConfirmDialog({
      isOpen: true,
      hotel,
      action: 'buy'
    });
  };

  const confirmAction = () => {
    if (confirmDialog.hotel) {
      if (confirmDialog.action === 'cart') {
        addToCart(confirmDialog.hotel);
      } else {
        buyNow(confirmDialog.hotel);
      }
    }
    setConfirmDialog({ isOpen: false, hotel: null, action: 'cart' });
  };

  const addToCart = (hotel: Hotel) => {
    const cartItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'hotel',
      item: hotel,
      quantity: 1,
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `${hotel.name} added to cart`,
        type: 'success',
        read: false,
      },
    });
  };

  const buyNow = async (hotel: Hotel) => {
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'hotel' as const,
      item: hotel,
      bookingDate: new Date().toISOString(),
      totalAmount: hotel.pricePerNight,
      status: 'confirmed' as const,
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `${hotel.name} booked successfully!`,
        type: 'success',
        read: false,
      },
    });
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <Wifi className="h-4 w-4" />;
      case 'pool':
        return <Waves className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'gym':
        return <Car className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
            <p className="text-xl text-green-200">
              Discover amazing hotels worldwide with the best prices and amenities
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <SearchBar onSearch={handleSearch} type="hotels" />
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <LoadingSpinner />
        ) : hasSearched ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchResults.length} hotels found
              </h2>
              <div className="flex space-x-4">
                <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option>Sort by Price</option>
                  <option>Sort by Rating</option>
                  <option>Sort by Distance</option>
                </select>
              </div>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {searchResults.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {hotel.name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{hotel.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-3">
                            {[...Array(hotel.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            Rs. {hotel.pricePerNight}
                          </div>
                          <div className="text-sm text-gray-500">per night</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity, index) => (
                            <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                              {getAmenityIcon(amenity)}
                              <span>{amenity}</span>
                            </div>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <div className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                              +{hotel.amenities.length - 4} more
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div>Check-in: {hotel.checkIn}</div>
                        <div>Check-out: {hotel.checkOut}</div>
                      </div>

                      <div className="flex space-x-3">
                        <div className="flex-1 space-y-2">
                          <button
                            onClick={() => handleBuyNow(hotel)}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                          >
                            <HotelIcon className="h-4 w-4" />
                            <span>Book Now</span>
                          </button>
                          <button
                            onClick={() => handleAddToCart(hotel)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
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
                <HotelIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or selecting different dates.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <HotelIcon className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Perfect Hotel</h2>
            <p className="text-gray-600 text-lg">
              Use the search form above to find hotels for your destination.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Book Now'}
        message={
          confirmDialog.hotel
            ? `Are you sure you want to ${confirmDialog.action === 'cart' ? 'add' : 'book'} ${confirmDialog.hotel.name} in ${confirmDialog.hotel.location}?`
            : ''
        }
        confirmText={confirmDialog.action === 'cart' ? 'Add to Cart' : 'Book Now'}
        onConfirm={confirmAction}
        onCancel={() => setConfirmDialog({ isOpen: false, hotel: null, action: 'cart' })}
        type={confirmDialog.action === 'cart' ? 'info' : 'success'}
      />
    </div>
  );
}