import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, CartItem, Booking, SearchCriteria, Company, ContentConfiguration, RebookingRequest, Flight } from '../types';
import { mockUsers } from '../data/mockUsers';
import { mockCompanies } from '../data/mockCompanies';
import { contentConfigurations } from '../data/contentConfig';

interface AppState {
  currentUser: User | null;
  cart: CartItem[];
  bookings: Booking[];
  searchCriteria: SearchCriteria | null;
  selectedAirline: string;
  notifications: Notification[];
  companies: Company[];
  contentConfig: ContentConfiguration[];
  rebookingRequests: RebookingRequest[];
  customFlights: Flight[];
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'CANCEL_BOOKING'; payload: string }
  | { type: 'REBOOK_BOOKING'; payload: { originalId: string; newBooking: Booking } }
  | { type: 'ADD_REBOOKING_REQUEST'; payload: RebookingRequest }
  | { type: 'UPDATE_REBOOKING_REQUEST'; payload: { id: string; status: string; processedAt?: string } }
  | { type: 'SET_SEARCH_CRITERIA'; payload: SearchCriteria }
  | { type: 'SET_AIRLINE'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'UPDATE_CONTENT_CONFIG'; payload: { key: string; value: string; updatedBy: string } }
  | { type: 'ADD_CONTENT_CONFIG'; payload: ContentConfiguration }
  | { type: 'REMOVE_CONTENT_CONFIG'; payload: string }
  | { type: 'UPDATE_COMPANY'; payload: Company }
  | { type: 'ADD_CUSTOM_FLIGHT'; payload: Flight }
  | { type: 'UPDATE_CUSTOM_FLIGHT'; payload: Flight }
  | { type: 'LOAD_STATE'; payload: Partial<AppState> };

const initialState: AppState = {
  currentUser: null,
  cart: [],
  bookings: [],
  searchCriteria: null,
  selectedAirline: 'YCompany',
  notifications: [],
  companies: mockCompanies,
  contentConfig: contentConfigurations,
  rebookingRequests: [],
  customFlights: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload),
      };
    case 'REBOOK_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.originalId ? action.payload.newBooking : booking
        ),
      };
    case 'ADD_REBOOKING_REQUEST':
      return { ...state, rebookingRequests: [...state.rebookingRequests, action.payload] };
    case 'UPDATE_REBOOKING_REQUEST':
      return {
        ...state,
        rebookingRequests: state.rebookingRequests.map(req =>
          req.id === action.payload.id ? { ...req, status: action.payload.status as 'pending' | 'confirmed' | 'rejected', processedAt: action.payload.processedAt } : req
        ),
      };
    case 'SET_SEARCH_CRITERIA':
      return { ...state, searchCriteria: action.payload };
    case 'SET_AIRLINE':
      return { ...state, selectedAirline: action.payload };
    case 'ADD_NOTIFICATION':
      const notification: Notification = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        ...action.payload,
        read: false,
      };
      return { ...state, notifications: [...state.notifications, notification] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(n =>
          n.id === action.payload ? { ...n, read: true } : n
        ),
      };
    case 'UPDATE_CONTENT_CONFIG':
      return {
        ...state,
        contentConfig: state.contentConfig.map(config =>
          config.key === action.payload.key ? { ...config, value: action.payload.value, updatedBy: action.payload.updatedBy, updatedAt: new Date().toISOString() } : config
        ),
      };
    case 'ADD_CONTENT_CONFIG':
      return { ...state, contentConfig: [...state.contentConfig, action.payload] };
    case 'REMOVE_CONTENT_CONFIG':
      return { ...state, contentConfig: state.contentConfig.filter(c => c.key !== action.payload) };
    case 'UPDATE_COMPANY':
      return {
        ...state,
        companies: state.companies.map(company =>
          company.id === action.payload.id ? action.payload : company
        ),
      };
    case 'ADD_CUSTOM_FLIGHT':
      return { ...state, customFlights: [action.payload, ...state.customFlights] };
    case 'UPDATE_CUSTOM_FLIGHT':
      return {
        ...state,
        customFlights: state.customFlights.map(f => f.id === action.payload.id ? action.payload : f)
      };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('ycompany-app-state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ycompany-app-state', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export function loginUser(email: string, password: string): User | null {
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password123') {
    return user;
  }
  return null;
}

export function registerUser(userData: Omit<User, 'id' | 'loyaltyMiles' | 'membershipTier'>): User {
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    loyaltyMiles: 0,
    membershipTier: 'Bronze',
    ...userData,
  };
  mockUsers.push(newUser);
  return newUser;
}