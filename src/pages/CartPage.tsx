import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Plane, Hotel, Car, Package } from 'lucide-react';
import { Flight, Hotel as HotelType, CarRental, Product } from '../types';

export function CartPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
    }
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: 'Item removed from cart',
        type: 'info',
        read: false,
      },
    });
  };

  const getItemPrice = (item: any) => {
    switch (item.type) {
      case 'flight':
        return (item.item as Flight).price;
      case 'hotel':
        return (item.item as HotelType).pricePerNight;
      case 'car':
        return (item.item as CarRental).pricePerDay;
      case 'product':
        return (item.item as Product).price;
      default:
        return 0;
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'flight':
        return <Plane className="h-6 w-6" />;
      case 'hotel':
        return <Hotel className="h-6 w-6" />;
      case 'car':
        return <Car className="h-6 w-6" />;
      case 'product':
        return <Package className="h-6 w-6" />;
      default:
        return <Package className="h-6 w-6" />;
    }
  };

  const getItemTitle = (item: any) => {
    switch (item.type) {
      case 'flight':
        return `${(item.item as Flight).flightNumber} - ${(item.item as Flight).origin.code} to ${(item.item as Flight).destination.code}`;
      case 'hotel':
        return (item.item as HotelType).name;
      case 'car':
        return `${(item.item as CarRental).brand} ${(item.item as CarRental).model}`;
      case 'product':
        return (item.item as Product).name;
      default:
        return 'Unknown Item';
    }
  };

  const getItemDescription = (item: any) => {
    switch (item.type) {
      case 'flight':
        const flight = item.item as Flight;
        return `${flight.airline} - ${flight.cabinClass} - ${flight.duration}`;
      case 'hotel':
        const hotel = item.item as HotelType;
        return `${hotel.location} - ${hotel.rating} stars`;
      case 'car':
        const car = item.item as CarRental;
        return `${car.type} - ${car.pickupLocation}`;
      case 'product':
        const product = item.item as Product;
        return product.description;
      default:
        return '';
    }
  };

  const subtotal = state.cart.reduce((sum, item) => {
    return sum + (getItemPrice(item) * item.quantity);
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (!state.currentUser) {
      navigate('/login');
      return;
    }

    setIsCheckingOut(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create bookings for cart items
    state.cart.forEach(cartItem => {
      const booking = {
        id: Math.random().toString(36).substr(2, 9),
        type: cartItem.type,
        item: cartItem.item,
        bookingDate: new Date().toISOString(),
        totalAmount: getItemPrice(cartItem) * cartItem.quantity,
        status: 'confirmed' as const,
      };
      dispatch({ type: 'ADD_BOOKING', payload: booking });
    });

    // Clear cart
    dispatch({ type: 'CLEAR_CART' });

    // Add success notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: 'Payment successful! Your bookings have been confirmed.',
        type: 'success',
        read: false,
      },
    });

    setIsCheckingOut(false);
    navigate('/cockpit');
  };

  const handleExpressCheckout = async () => {
    if (!state.currentUser) {
      navigate('/login');
      return;
    }

    // Express checkout - skip payment form
    await handleCheckout();
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 text-lg mb-8">
              Start planning your trip by adding flights, hotels, or other travel essentials.
            </p>
            <button
              onClick={() => navigate('/flights')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Flights
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <ShoppingCart className="h-8 w-8" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-gray-600 mt-2">{state.cart.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg text-blue-600">
                    {getItemIcon(item.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getItemTitle(item)}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {getItemDescription(item)}
                        </p>
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">
                            {item.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          Rs. {getItemPrice(item) * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          Rs. {getItemPrice(item)} each
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 bg-gray-100 rounded text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors flex items-center space-x-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-medium">Rs. {tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold text-gray-900 mb-6">
              <span>Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              {state.currentUser && (
                <button
                  onClick={handleExpressCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CreditCard className="h-5 w-5" />
                  <span>Express Checkout</span>
                </button>
              )}

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
              </button>
            </div>

            {!state.currentUser && (
              <p className="text-sm text-gray-600 mt-3 text-center">
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Sign in
                </button>{' '}
                to access Express Checkout
              </p>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600">
                Contact our support team 24/7 for assistance with your booking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}