import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plane, Calendar, MapPin, Plus, Minus, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { airports } from '../data/mockFlights';

export function GroupBookingPage() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [groupSize, setGroupSize] = useState(10);
  const [searchCriteria, setSearchCriteria] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    tripType: 'round-trip',
  });
  const [contactInfo, setContactInfo] = useState({
    groupName: '',
    contactPerson: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add notification for group booking request
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `Group booking request submitted for ${groupSize} passengers. Our team will contact you within 24 hours.`,
        type: 'success',
        read: false,
      },
    });

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Group Bookings</h1>
            <p className="text-xl text-indigo-200">
              Special rates and personalized service for groups of 10 or more passengers
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Group Booking Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Special Group Rates</h3>
              <p className="text-gray-600 text-sm">Exclusive discounts for groups of 10+ passengers</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Flexible Booking</h3>
              <p className="text-gray-600 text-sm">Easy modifications and cancellation policies</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dedicated Support</h3>
              <p className="text-gray-600 text-sm">Personal group coordinator for your booking</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Group Size */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Group Size</h3>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setGroupSize(Math.max(10, groupSize - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Minus className="h-5 w-5" />
              </button>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{groupSize}</div>
                <div className="text-sm text-gray-600">Passengers</div>
              </div>
              <button
                type="button"
                onClick={() => setGroupSize(groupSize + 1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Minimum group size is 10 passengers. Larger groups receive better rates.
            </p>
          </div>

          {/* Travel Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Travel Details</h3>
            
            <div className="mb-6">
              <div className="flex space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={searchCriteria.tripType === 'round-trip'}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, tripType: e.target.value })}
                    className="mr-2"
                  />
                  Round Trip
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={searchCriteria.tripType === 'one-way'}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, tripType: e.target.value })}
                    className="mr-2"
                  />
                  One Way
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchCriteria.origin}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, origin: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Origin</option>
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.code} - {airport.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select
                    value={searchCriteria.destination}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, destination: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Destination</option>
                    {airports.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.code} - {airport.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchCriteria.departureDate}
                    onChange={(e) => setSearchCriteria({ ...searchCriteria, departureDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {searchCriteria.tripType === 'round-trip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={searchCriteria.returnDate}
                      onChange={(e) => setSearchCriteria({ ...searchCriteria, returnDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Group Name</label>
                <input
                  type="text"
                  value={contactInfo.groupName}
                  onChange={(e) => setContactInfo({ ...contactInfo, groupName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., ABC Company Team Building"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  value={contactInfo.contactPerson}
                  onChange={(e) => setContactInfo({ ...contactInfo, contactPerson: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Full Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="contact@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
              <textarea
                value={contactInfo.specialRequests}
                onChange={(e) => setContactInfo({ ...contactInfo, specialRequests: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Any special requirements, dietary restrictions, or additional services needed..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
              >
                <Search className="h-5 w-5" />
                <span>Submit Group Booking Request</span>
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Our group booking specialists will contact you within 24 hours with a customized quote.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}