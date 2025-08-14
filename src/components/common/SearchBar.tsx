import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Hotel, Car } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SearchCriteria } from '../../types';
import { airports } from '../../data/mockFlights';

interface SearchBarProps {
  onSearch: (criteria: SearchCriteria) => void;
  type?: 'flights' | 'hotels' | 'cars';
}

export function SearchBar({ onSearch, type = 'flights' }: SearchBarProps) {
  const { dispatch } = useApp();
  
  const today = new Date().toISOString().split('T')[0];
  
  const [criteria, setCriteria] = useState<SearchCriteria>({
    origin: '',
    destination: type === 'flights' ? '' : 'Any Location',
    departureDate: type === 'flights' ? '' : today,
    returnDate: '',
    passengers: 1,
    cabinClass: 'Economy',
    tripType: 'round-trip',
  });

  const minReturnDate = useMemo(() => {
    return criteria.departureDate || today;
  }, [criteria.departureDate, today]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'flights') {
      if (criteria.origin && criteria.destination && criteria.departureDate) {
        dispatch({ type: 'SET_SEARCH_CRITERIA', payload: criteria });
        onSearch(criteria);
      }
    } else {
      if (criteria.origin && criteria.departureDate) {
        dispatch({ type: 'SET_SEARCH_CRITERIA', payload: criteria });
        onSearch(criteria);
      }
    }
  };

  const getSearchIcon = () => {
    switch (type) {
      case 'hotels':
        return <Hotel className="h-5 w-5" />;
      case 'cars':
        return <Car className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
    }
  };

  const getLocationLabel = () => {
    switch (type) {
      case 'hotels':
        return 'Destination';
      case 'cars':
        return 'Pickup Location';
      default:
        return 'From';
    }
  };

  const getDateLabel = () => {
    switch (type) {
      case 'hotels':
        return 'Check-in Date';
      case 'cars':
        return 'Pickup Date';
      default:
        return 'Departure';
    }
  };

  const getReturnDateLabel = () => {
    switch (type) {
      case 'hotels':
        return 'Check-out Date';
      case 'cars':
        return 'Return Date';
      default:
        return 'Return';
    }
  };

  const getLocationOptions = () => {
    if (type === 'flights') {
      return airports.map((airport) => (
        <option key={airport.code} value={airport.code}>
          {airport.code} - {airport.city}
        </option>
      ));
    } else {
      const locations = [
        'Delhi','Mumbai','Bangalore','Chennai','Kolkata','Hyderabad','Pune','Ahmedabad','Jaipur','Goa','Kerala','Agra','Varanasi','Rishikesh','Manali'
      ];
      
      return locations.map((location) => (
        <option key={location} value={location}>
          {location}
        </option>
      ));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {type === 'flights' && (
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
      )}

      <form onSubmit={handleSubmit}>
        <div className={`grid gap-4 mb-6 ${
          type === 'flights' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        }`}>
          {/* Location Field */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getLocationLabel()}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={criteria.origin}
                onChange={(e) => setCriteria({ ...criteria, origin: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select {getLocationLabel()}</option>
                {getLocationOptions()}
              </select>
            </div>
          </div>

          {/* Destination Field (Only for flights) */}
          {type === 'flights' && (
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
                  {getLocationOptions()}
                </select>
              </div>
            </div>
          )}

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getDateLabel()}
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={criteria.departureDate}
                min={today}
                onChange={(e) => {
                  const nextDeparture = e.target.value;
                  setCriteria((prev) => ({
                    ...prev,
                    departureDate: nextDeparture,
                    returnDate: prev.returnDate && prev.returnDate < nextDeparture ? nextDeparture : prev.returnDate,
                  }));
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Return Date (For round-trip flights or hotels/cars) */}
          {((type === 'flights' && criteria.tripType === 'round-trip') || type !== 'flights') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getReturnDateLabel()}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={criteria.returnDate}
                  min={minReturnDate}
                  onChange={(e) => setCriteria({ ...criteria, returnDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Passengers & Class (Only for flights) */}
          {type === 'flights' && (
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
          )}

          {/* Guests (For hotels and cars) */}
          {type !== 'flights' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {type === 'hotels' ? 'Guests' : 'Passengers'}
              </label>
              <div className="relative">
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
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 text-white ${
            type === 'hotels' 
              ? 'bg-green-600 hover:bg-green-700' 
              : type === 'cars'
              ? 'bg-orange-600 hover:bg-orange-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {getSearchIcon()}
          <span>Search {type === 'flights' ? 'Flights' : type === 'hotels' ? 'Hotels' : 'Cars'}</span>
        </button>
      </form>
    </div>
  );
}