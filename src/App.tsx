import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { FlightsPage } from './pages/FlightsPage';
import { HotelsPage } from './pages/HotelsPage';
import { CarsPage } from './pages/CarsPage';
import { ShopPage } from './pages/ShopPage';
import { CartPage } from './pages/CartPage';
import { ProfilePage } from './pages/ProfilePage';
import { CockpitPage } from './pages/CockpitPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { GroupBookingPage } from './pages/GroupBookingPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AddFlightPage } from './pages/admin/AddFlightPage';
import { AddHotelPage } from './pages/admin/AddHotelPage';
import { AddCarPage } from './pages/admin/AddCarPage';
import { AddProductPage } from './pages/admin/AddProductPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/cockpit" element={<CockpitPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/group-booking" element={<GroupBookingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/add-flight" element={<AddFlightPage />} />
              <Route path="/admin/add-hotel" element={<AddHotelPage />} />
              <Route path="/admin/add-car" element={<AddCarPage />} />
              <Route path="/admin/add-product" element={<AddProductPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;