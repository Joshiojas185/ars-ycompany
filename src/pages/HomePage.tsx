import React from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/common/SearchBar';
import { Plane, Hotel, Car, ShoppingBag, Star, Users, Globe } from 'lucide-react';

export function HomePage() {
  const handleSearch = () => {
    // Search functionality will be handled by individual pages
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg)',
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Journey Begins Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover amazing destinations, book flights, hotels, and cars all in one place
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/flights"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Plane className="h-5 w-5" />
              <span>Book Flights</span>
            </Link>
            <Link
              to="/hotels"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Hotel className="h-5 w-5" />
              <span>Find Hotels</span>
            </Link>
            <Link
              to="/cars"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Car className="h-5 w-5" />
              <span>Rent Cars</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 mb-20">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose YCompany?</h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium travel services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Premium Experience</h3>
              <p className="text-gray-600">
                Enjoy world-class service with our premium amenities and exclusive benefits for members.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Our dedicated support team is available around the clock to assist you with any needs.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Network</h3>
              <p className="text-gray-600">
                Access destinations worldwide with our extensive network of partners and locations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Your Travel Needs</h2>
            <p className="text-xl text-gray-600">One platform for everything travel-related</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/flights"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 p-6"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flights</h3>
              <p className="text-gray-600 text-sm">
                Search and book flights to destinations worldwide with competitive prices.
              </p>
            </Link>

            <Link
              to="/hotels"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 p-6"
            >
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Hotel className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hotels</h3>
              <p className="text-gray-600 text-sm">
                Find and book accommodations from budget-friendly to luxury options.
              </p>
            </Link>

            <Link
              to="/cars"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 p-6"
            >
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Car className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Car Rentals</h3>
              <p className="text-gray-600 text-sm">
                Rent vehicles for your journey with flexible pickup and drop-off options.
              </p>
            </Link>

            <Link
              to="/shop"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 p-6"
            >
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Travel Shop</h3>
              <p className="text-gray-600 text-sm">
                Shop for travel essentials, accessories, and exclusive merchandise.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}