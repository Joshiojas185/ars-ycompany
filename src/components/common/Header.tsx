import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Plane, ShoppingCart, User, Bell, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function Header() {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hotelsLabel = useMemo(() => state.contentConfig.find(c => c.key === 'hotels_label')?.value || 'Hotels', [state.contentConfig]);
  const carsLabel = useMemo(() => state.contentConfig.find(c => c.key === 'cars_label')?.value || 'Car Rentals', [state.contentConfig]);

  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    navigate('/');
  };

  const unreadNotifications = state.notifications.filter(n => !n.read).length;
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-300" />
            <span className="text-2xl font-bold">YCompany</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/flights"
              className={`hover:text-blue-300 transition-colors ${isActive('/flights') ? 'text-blue-300' : ''}`}
            >
              Flights
            </Link>
            <Link
              to="/hotels"
              className={`hover:text-blue-300 transition-colors ${isActive('/hotels') ? 'text-blue-300' : ''}`}
            >
              {hotelsLabel}
            </Link>
            <Link
              to="/cars"
              className={`hover:text-blue-300 transition-colors ${isActive('/cars') ? 'text-blue-300' : ''}`}
            >
              {carsLabel}
            </Link>
            <Link
              to="/shop"
              className={`hover:text-blue-300 transition-colors ${isActive('/shop') ? 'text-blue-300' : ''}`}
            >
              Shop
            </Link>
            <Link
              to="/group-booking"
              className={`hover:text-blue-300 transition-colors ${isActive('/group-booking') ? 'text-blue-300' : ''}`}
            >
              Group Booking
            </Link>
            {state.currentUser?.role === 'administrator' && (
              <Link
                to="/admin"
                className={`hover:text-blue-300 transition-colors ${isActive('/admin') ? 'text-blue-300' : ''}`}
              >
                Admin
              </Link>
            )}
            {state.currentUser?.role === 'content_administrator' && (
              <Link
                to="/content"
                className={`hover:text-blue-300 transition-colors ${isActive('/content') ? 'text-blue-300' : ''}`}
              >
                Content
              </Link>
            )}
            {state.currentUser?.role === 'tenant_employee' && (
              <Link
                to="/tenant"
                className={`hover:text-blue-300 transition-colors ${isActive('/tenant') ? 'text-blue-300' : ''}`}
              >
                Tenant
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {state.currentUser ? (
              <div className="relative">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 p-2 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  <User className="h-6 w-6" />
                  <span className="hidden sm:block">{state.currentUser.firstName}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-blue-800 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800">
            <nav className="flex flex-col space-y-2">
              <Link to="/flights" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Flights</Link>
              <Link to="/hotels" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>{hotelsLabel}</Link>
              <Link to="/cars" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>{carsLabel}</Link>
              <Link to="/shop" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link to="/group-booking" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Group Booking</Link>
              {state.currentUser?.role === 'administrator' && (
                <Link to="/admin" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
              )}
              {state.currentUser?.role === 'content_administrator' && (
                <Link to="/content" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Content</Link>
              )}
              {state.currentUser?.role === 'tenant_employee' && (
                <Link to="/tenant" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Tenant</Link>
              )}
              {state.currentUser && (
                <Link to="/cockpit" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>My Cockpit</Link>
              )}
              {state.currentUser ? (
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="text-left py-2 px-4 hover:bg-blue-800 rounded transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" className="py-2 px-4 hover:bg-blue-800 rounded transition-colors" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}