import React, { useState } from 'react';
import { X, Calendar, AlertCircle } from 'lucide-react';
import { Booking } from '../../types';

interface RebookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onRebook: (originalId: string, newDate: string) => void;
}

export function RebookingModal({ isOpen, onClose, booking, onRebook }: RebookingModalProps) {
  const [newDate, setNewDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  if (!isOpen || !booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;

    setIsSubmitting(true);
    
    try {
      await onRebook(booking.id, newDate);
      onClose();
    } catch (error) {
      console.error('Rebooking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getItemTitle = () => {
    switch (booking.type) {
      case 'flight':
        return `Flight ${(booking.item as any).flightNumber}`;
      case 'hotel':
        return (booking.item as any).name;
      case 'car':
        return `${(booking.item as any).brand} ${(booking.item as any).model}`;
      case 'product':
        return (booking.item as any).name;
      default:
        return 'Booking';
    }
  };

  const getItemDescription = () => {
    switch (booking.type) {
      case 'flight':
        const flight = booking.item as any;
        return `${flight.origin?.code || 'N/A'} → ${flight.destination?.code || 'N/A'}`;
      case 'hotel':
        return (booking.item as any).location || 'N/A';
      case 'car':
        return (booking.item as any).pickupLocation || 'N/A';
      case 'product':
        return (booking.item as any).description || 'N/A';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Rebook Your Trip</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Booking Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Current Booking</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="font-medium">{getItemTitle()}</div>
              <div>{getItemDescription()}</div>
              <div>Current Date: {new Date(booking.bookingDate).toLocaleDateString()}</div>
              <div>Amount: Rs. {booking.totalAmount}</div>
            </div>
          </div>

          {/* Rebooking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={today}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Select a future date for your rebooking
              </p>
            </div>

            {/* Important Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Important Information</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Rebooking is subject to availability</li>
                    <li>• Price may vary based on new dates</li>
                    <li>• Original booking will be updated once confirmed</li>
                    <li>• Processing may take 24-48 hours</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newDate || isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Request Rebooking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
