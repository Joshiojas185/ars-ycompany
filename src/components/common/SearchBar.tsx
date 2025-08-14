import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SearchCriteria } from '../../types';
import { airports } from '../../data/mockFlights';

interface SearchBarProps {
  onSearch: (criteria: SearchCriteria) => void;
  type?: 'flights' | 'hotels' | 'cars';
}

export function SearchBar({ onSearch, type = 'flights' }: SearchBarProps) {
  const { dispatch } = useApp();
  const [criteria, setCriteria] = useState<SearchCriteria>({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    cabinClass: 'Economy',
    tripType: 'round-trip',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (criteria.origin && criteria.destination && criteria.departureDate) {
      dispatch({ type: 'SET_SEARCH_CRITERIA', payload: criteria });
      onSearch(criteria);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={criteria.tripType === 'round-trip'}
              onChange={(e) => setCriteria({ ...criteria, tripType: e.target.value as 'one-way' | 'round-trip' })}
              className="mr-2"
            />
            Round Trip
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={criteria.tripType === 'one-way'}
              onChange={(e) => setCriteria({ ...criteria, tripType: e.target.value as 'one-way' | 'round-trip' })}
              className="mr-2"
            />
            One Way
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {/* From */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={criteria.origin}
                onChange={(e) => setCriteria({ ...criteria, origin: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* To */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={criteria.destination}
                onChange={(e) => setCriteria({ ...criteria, destination: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

          {/* Departure Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={criteria.departureDate}
                onChange={(e) => setCriteria({ ...criteria, departureDate: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Return Date */}
          {criteria.tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={criteria.returnDate}
                  onChange={(e) => setCriteria({ ...criteria, returnDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Passengers & Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="9"
                  value={criteria.passengers}
                  onChange={(e) => setCriteria({ ...criteria, passengers: parseInt(e.target.value) })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={criteria.cabinClass}
                onChange={(e) => setCriteria({ ...criteria, cabinClass: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search {type === 'flights' ? 'Flights' : type === 'hotels' ? 'Hotels' : 'Cars'}</span>
        </button>
      </form>
    </div>
  );
}