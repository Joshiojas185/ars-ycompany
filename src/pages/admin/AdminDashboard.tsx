import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Plane, Hotel, Car, ShoppingBag, Users, BarChart3 } from 'lucide-react';

export function AdminDashboard() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!state.currentUser || state.currentUser.role !== 'administrator') {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg shadow-lg text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-indigo-200">
                Manage flights, hotels, cars, and products for YCompany
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">Administrator</div>
              <div className="text-indigo-200">Full Access</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => navigate('/admin/add-flight')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold text-gray-900">Add Flight</div>
                <div className="text-sm text-gray-600">Create new flight</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/add-hotel')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Hotel className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold text-gray-900">Add Hotel</div>
                <div className="text-sm text-gray-600">Create new hotel</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/add-car')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold text-gray-900">Add Car</div>
                <div className="text-sm text-gray-600">Create new car rental</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/admin/add-product')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-lg font-semibold text-gray-900">Add Product</div>
                <div className="text-sm text-gray-600">Create new product</div>
              </div>
            </div>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">5,678</div>
              <div className="text-gray-600">Total Bookings</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">₹12,34,567</div>
              <div className="text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}