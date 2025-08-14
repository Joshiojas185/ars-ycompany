import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Plane, Hotel, Car, Package, Calendar, CreditCard, MapPin, Clock, Star, Award } from 'lucide-react';
import { format } from 'date-fns';

export function CockpitPage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!state.currentUser) {
    navigate('/login');
    return null;
  }

  const getBookingIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'hotel': return <Hotel className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      case 'product': return <Package className="h-5 w-5" />;
      default: return <Package className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalSpent = state.bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const upcomingTrips = state.bookings.filter(b => b.type === 'flight' && b.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {state.currentUser.firstName}!
              </h1>
              <p className="text-blue-200">
                Manage your bookings, view your travel history, and track your loyalty status
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getTierColor(state.currentUser.membershipTier)} bg-white`}>
                <Award className="h-4 w-4 mr-2" />
                {state.currentUser.membershipTier} Member
              </div>
              <div className="mt-2 text-2xl font-bold">
                {state.currentUser.loyaltyMiles.toLocaleString()} Miles
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{upcomingTrips}</div>
                <div className="text-sm text-gray-600">Upcoming Trips</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(0)}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{state.currentUser.loyaltyMiles.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Loyalty Miles</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{state.bookings.length}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'bookings', label: 'My Bookings' },
                { id: 'history', label: 'Travel History' },
                { id: 'loyalty', label: 'Loyalty Program' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  {state.bookings.length > 0 ? (
                    <div className="space-y-4">
                      {state.bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                            {getBookingIcon(booking.type)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {booking.type === 'flight' && `Flight ${booking.item.flightNumber}`}
                              {booking.type === 'hotel' && booking.item.name}
                              {booking.type === 'car' && `${booking.item.brand} ${booking.item.model}`}
                              {booking.type === 'product' && booking.item.name}
                            </div>
                            <div className="text-sm text-gray-600">
                              Booked on {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">${booking.totalAmount}</div>
                            <div className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No recent activity</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">All Bookings</h3>
                {state.bookings.length > 0 ? (
                  <div className="space-y-4">
                    {state.bookings.map((booking) => (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                              {getBookingIcon(booking.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {booking.type === 'flight' && `Flight ${booking.item.flightNumber}`}
                                {booking.type === 'hotel' && booking.item.name}
                                {booking.type === 'car' && `${booking.item.brand} ${booking.item.model}`}
                                {booking.type === 'product' && booking.item.name}
                              </h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                {booking.type === 'flight' && (
                                  <>
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="h-4 w-4" />
                                      <span>{booking.item.origin.code} → {booking.item.destination.code}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Clock className="h-4 w-4" />
                                      <span>{format(new Date(booking.item.departureTime), 'MMM dd, yyyy HH:mm')}</span>
                                    </div>
                                  </>
                                )}
                                {booking.type === 'hotel' && (
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{booking.item.location}</span>
                                  </div>
                                )}
                                <div>Booking ID: {booking.id}</div>
                                <div>Booked: {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}</div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-900 mb-2">
                              ${booking.totalAmount}
                            </div>
                            <div className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Start planning your next adventure!</p>
                    <button
                      onClick={() => navigate('/flights')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book a Flight
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel History</h3>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Travel History</h3>
                  <p className="text-gray-600">Your completed trips will appear here</p>
                </div>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Loyalty Program</h3>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTierColor(state.currentUser.membershipTier)} bg-white`}>
                        <Award className="h-4 w-4 mr-2" />
                        {state.currentUser.membershipTier} Member
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        {state.currentUser.loyaltyMiles.toLocaleString()}
                      </div>
                      <div className="text-purple-200">Miles Available</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Tier Benefits</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Priority check-in</li>
                      <li>• Extra baggage allowance</li>
                      <li>• Lounge access</li>
                      <li>• Seat upgrades</li>
                      <li>• Bonus miles earning</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Miles Activity</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Miles Earned This Year</span>
                        <span className="font-medium">+{state.currentUser.loyaltyMiles}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Miles Redeemed</span>
                        <span className="font-medium">-0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Miles Expiring Soon</span>
                        <span className="font-medium">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}