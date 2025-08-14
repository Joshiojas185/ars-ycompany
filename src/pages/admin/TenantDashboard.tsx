import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building, Plane } from 'lucide-react';

export function TenantDashboard() {
  const { state, dispatch } = useApp();
  const company = useMemo(() => state.companies.find(c => c.id === state.currentUser?.companyId) || null, [state]);
  const [form, setForm] = useState(() => ({
    name: company?.name || '',
    description: company?.description || '',
    website: company?.website || '',
    contactEmail: company?.contactEmail || '',
    contactPhone: company?.contactPhone || '',
    address: company?.address || '',
  }));

  const [flightForm, setFlightForm] = useState({
    flightNumber: '',
    originCode: '',
    destinationCode: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    price: '',
    cabinClass: 'Economy',
    stops: 0,
    aircraft: '',
    availableSeats: 100,
  });

  const nowMin = new Date().toISOString().slice(0,16);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p>No company assigned.</p>
        </div>
      </div>
    );
  }

  const handleSaveCompany = () => {
    const updated = { ...company, ...form, updatedAt: new Date().toISOString() };
    dispatch({ type: 'UPDATE_COMPANY', payload: updated });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'Company updated successfully', type: 'success', read: false } });
  };

  const handleAddFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (company.type !== 'airline') return;

    const newFlight = {
      id: Math.random().toString(36).substr(2, 9),
      airline: company.name,
      flightNumber: flightForm.flightNumber,
      origin: { code: flightForm.originCode, name: flightForm.originCode, city: flightForm.originCode, country: 'IN' },
      destination: { code: flightForm.destinationCode, name: flightForm.destinationCode, city: flightForm.destinationCode, country: 'IN' },
      departureTime: new Date(flightForm.departureTime).toISOString(),
      arrivalTime: new Date(flightForm.arrivalTime).toISOString(),
      duration: flightForm.duration,
      price: Number(flightForm.price),
      currency: 'INR',
      cabinClass: flightForm.cabinClass as 'Economy' | 'Business' | 'First',
      stops: Number(flightForm.stops),
      aircraft: flightForm.aircraft,
      availableSeats: Number(flightForm.availableSeats),
    };

    dispatch({ type: 'ADD_CUSTOM_FLIGHT', payload: newFlight });
    dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `Flight ${newFlight.flightNumber} added for ${company.name}`, type: 'success', read: false } });
    setFlightForm({ flightNumber: '', originCode: '', destinationCode: '', departureTime: '', arrivalTime: '', duration: '', price: '', cabinClass: 'Economy', stops: 0, aircraft: '', availableSeats: 100 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-6">
          <Building className="h-8 w-8 text-teal-600" />
          <h1 className="text-2xl font-bold text-gray-900">Tenant Company Management</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4 mb-8">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{key}</label>
              <input type="text" value={value as string} onChange={(e) => setForm(prev => ({ ...prev, [key]: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
            </div>
          ))}

          <div className="flex justify-end">
            <button onClick={handleSaveCompany} className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg">Save Changes</button>
          </div>
        </div>

        {company.type === 'airline' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Plane className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Add Flight for {company.name}</h2>
            </div>
            <form onSubmit={handleAddFlight} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Flight Number" value={flightForm.flightNumber} onChange={(e) => setFlightForm({ ...flightForm, flightNumber: e.target.value })} className="px-3 py-2 border rounded" required />
              <input placeholder="Origin Code (e.g., DEL)" value={flightForm.originCode} onChange={(e) => setFlightForm({ ...flightForm, originCode: e.target.value.toUpperCase() })} className="px-3 py-2 border rounded" required />
              <input placeholder="Destination Code (e.g., BOM)" value={flightForm.destinationCode} onChange={(e) => setFlightForm({ ...flightForm, destinationCode: e.target.value.toUpperCase() })} className="px-3 py-2 border rounded" required />
              <input type="datetime-local" min={nowMin} placeholder="Departure Time" value={flightForm.departureTime} onChange={(e) => setFlightForm({ ...flightForm, departureTime: e.target.value })} className="px-3 py-2 border rounded" required />
              <input type="datetime-local" min={flightForm.departureTime || nowMin} placeholder="Arrival Time" value={flightForm.arrivalTime} onChange={(e) => setFlightForm({ ...flightForm, arrivalTime: e.target.value })} className="px-3 py-2 border rounded" required />
              <input placeholder="Duration (e.g., 2h 30m)" value={flightForm.duration} onChange={(e) => setFlightForm({ ...flightForm, duration: e.target.value })} className="px-3 py-2 border rounded" required />
              <input type="number" placeholder="Price" value={flightForm.price} onChange={(e) => setFlightForm({ ...flightForm, price: e.target.value })} className="px-3 py-2 border rounded" required />
              <select value={flightForm.cabinClass} onChange={(e) => setFlightForm({ ...flightForm, cabinClass: e.target.value })} className="px-3 py-2 border rounded">
                <option>Economy</option>
                <option>Business</option>
                <option>First</option>
              </select>
              <input type="number" placeholder="Stops" value={flightForm.stops} onChange={(e) => setFlightForm({ ...flightForm, stops: Number(e.target.value) })} className="px-3 py-2 border rounded" />
              <input placeholder="Aircraft" value={flightForm.aircraft} onChange={(e) => setFlightForm({ ...flightForm, aircraft: e.target.value })} className="px-3 py-2 border rounded" />
              <input type="number" placeholder="Available Seats" value={flightForm.availableSeats} onChange={(e) => setFlightForm({ ...flightForm, availableSeats: Number(e.target.value) })} className="px-3 py-2 border rounded" />
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Add Flight</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
