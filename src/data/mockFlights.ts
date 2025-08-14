import { Flight, Airport } from '../types';

const airports: Airport[] = [
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
  { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India' },
  { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India' },
  { code: 'CCU', name: 'Netaji Subhas Chandra Bose International Airport', city: 'Kolkata', country: 'India' },
  { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India' },
  { code: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', country: 'India' },
  { code: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
];

export const mockFlights: Flight[] = [
  {
    id: '1',
    airline: 'YCompany',
    flightNumber: 'YC101',
    origin: airports[0], // DEL
    destination: airports[1], // BOM
    departureTime: '2024-02-15T06:00:00Z',
    arrivalTime: '2024-02-15T08:15:00Z',
    duration: '2h 15m',
    price: 4500,
    currency: 'USD',
    cabinClass: 'Economy',
    stops: 0,
    aircraft: 'Airbus A320',
    availableSeats: 45,
  },
  {
    id: '2',
    airline: 'YCompany',
    flightNumber: 'YC102',
    origin: airports[0], // DEL
    destination: airports[2], // BLR
    departureTime: '2024-02-15T14:00:00Z',
    arrivalTime: '2024-02-15T16:45:00Z',
    duration: '2h 45m',
    price: 5200,
    currency: 'USD',
    cabinClass: 'Economy',
    stops: 0,
    aircraft: 'Boeing 737-800',
    availableSeats: 32,
  },
  {
    id: '3',
    airline: 'YCompany',
    flightNumber: 'YC201',
    origin: airports[1], // BOM
    destination: airports[3], // MAA
    departureTime: '2024-02-16T09:00:00Z',
    arrivalTime: '2024-02-16T11:30:00Z',
    duration: '2h 30m',
    price: 8500,
    currency: 'USD',
    cabinClass: 'Business',
    stops: 0,
    aircraft: 'Airbus A321',
    availableSeats: 18,
  },
  {
    id: '4',
    airline: 'YCompany',
    flightNumber: 'YC301',
    origin: airports[0], // DEL
    destination: airports[8], // DXB
    departureTime: '2024-02-17T02:00:00Z',
    arrivalTime: '2024-02-17T05:15:00Z',
    duration: '3h 15m',
    price: 15000,
    currency: 'USD',
    cabinClass: 'First',
    stops: 0,
    aircraft: 'Boeing 777-300ER',
    availableSeats: 8,
  },
  {
    id: '5',
    airline: 'YCompany',
    flightNumber: 'YC401',
    origin: airports[4], // CCU
    destination: airports[9], // SIN
    departureTime: '2024-02-18T23:30:00Z',
    arrivalTime: '2024-02-19T06:45:00Z',
    duration: '7h 15m',
    price: 12000,
    currency: 'USD',
    cabinClass: 'Business',
    stops: 0,
    aircraft: 'Airbus A350-900',
    availableSeats: 24,
  },
];

export { airports };