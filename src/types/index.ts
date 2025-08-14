export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  loyaltyMiles: number;
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  role: 'customer' | 'administrator' | 'content_administrator' | 'tenant_employee';
  companyId?: string; // For tenant employees
  preferences: UserPreferences;
}

export interface UserPreferences {
  seatPreference: 'Window' | 'Aisle' | 'Middle';
  mealPreference: 'Vegetarian' | 'Non-Vegetarian' | 'Vegan' | 'Kosher';
  language: 'en' | 'es' | 'fr' | 'de';
  currency: 'INR';
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface Company {
  id: string;
  name: string;
  type: 'airline' | 'hotel' | 'car_rental' | 'travel_agency';
  description: string;
  logo?: string;
  website?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContentConfiguration {
  id: string;
  key: string;
  value: string;
  description: string;
  category: 'labels' | 'messages' | 'ui_text';
  isActive: boolean;
  updatedBy: string;
  updatedAt: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  cabinClass: 'Economy' | 'Business' | 'First';
  stops: number;
  aircraft: string;
  availableSeats: number;
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  images: string[];
  checkIn: string;
  checkOut: string;
}

export interface CarRental {
  id: string;
  brand: string;
  model: string;
  type: string;
  pricePerDay: number;
  currency: string;
  features: string[];
  image: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'product';
  item: Flight | Hotel | CarRental | Product;
  quantity: number;
  selectedExtras?: any[];
}

export interface Booking {
  id: string;
  type: 'flight' | 'hotel' | 'car' | 'product';
  item: Flight | Hotel | CarRental | Product;
  bookingDate: string;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  passengers?: Passenger[];
  seatPreference?: 'Window' | 'Aisle' | 'Middle';
  selectedSeat?: string;
  // New fields for rebooking
  originalBookingId?: string;
  isRebooked?: boolean;
  rebookedFrom?: string;
  rebookedTo?: string;
}

export interface RebookingRequest {
  id: string;
  originalBookingId: string;
  newDate: string;
  status: 'pending' | 'confirmed' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  reason?: string;
}

export interface Passenger {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  seatPreference: string;
  mealPreference: string;
}

export interface SearchCriteria {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass: string;
  tripType: 'one-way' | 'round-trip';
}