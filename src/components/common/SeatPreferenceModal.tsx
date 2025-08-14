import React, { useState } from 'react';
import { X, Plane } from 'lucide-react';

interface SeatPreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (preference: 'Window' | 'Aisle' | 'Middle') => void;
  flightNumber: string;
}

export function SeatPreferenceModal({ isOpen, onClose, onConfirm, flightNumber }: SeatPreferenceModalProps) {
  const [selectedPreference, setSelectedPreference] = useState<'Window' | 'Aisle' | 'Middle'>('Window');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedPreference);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Plane className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Seat Preference</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Please select your seat preference for flight {flightNumber}:
          </p>

          <div className="space-y-3 mb-6">
            {(['Window', 'Aisle', 'Middle'] as const).map((preference) => (
              <label key={preference} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="seatPreference"
                  value={preference}
                  checked={selectedPreference === preference}
                  onChange={(e) => setSelectedPreference(e.target.value as 'Window' | 'Aisle' | 'Middle')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{preference} Seat</div>
                  <div className="text-sm text-gray-600">
                    {preference === 'Window' && 'Great views and privacy'}
                    {preference === 'Aisle' && 'Easy access to restroom and overhead bins'}
                    {preference === 'Middle' && 'Budget-friendly option'}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex space-x-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}