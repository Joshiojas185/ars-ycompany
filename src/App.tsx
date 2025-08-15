import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { BookingReminderManager } from './components/system/BookingReminderManager';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ToastContainer } from './components/system/ToastContainer';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.HomePage })));
const LoginPage = lazy(() => import('./pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage').then(module => ({ default: module.RegisterPage })));
const FlightsPage = lazy(() => import('./pages/FlightsPage').then(module => ({ default: module.FlightsPage })));
const HotelsPage = lazy(() => import('./pages/HotelsPage').then(module => ({ default: module.HotelsPage })));
const CarsPage = lazy(() => import('./pages/CarsPage').then(module => ({ default: module.CarsPage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(module => ({ default: module.ShopPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const CockpitPage = lazy(() => import('./pages/CockpitPage').then(module => ({ default: module.CockpitPage })));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage').then(module => ({ default: module.NotificationsPage })));
const GroupBookingPage = lazy(() => import('./pages/GroupBookingPage').then(module => ({ default: module.GroupBookingPage })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.AdminDashboard })));
const AddFlightPage = lazy(() => import('./pages/admin/AddFlightPage').then(module => ({ default: module.AddFlightPage })));
const AddHotelPage = lazy(() => import('./pages/admin/AddHotelPage').then(module => ({ default: module.AddHotelPage })));
const AddCarPage = lazy(() => import('./pages/admin/AddCarPage').then(module => ({ default: module.AddCarPage })));
const AddProductPage = lazy(() => import('./pages/admin/AddProductPage').then(module => ({ default: module.AddProductPage })));
const ContentAdminPage = lazy(() => import('./pages/admin/ContentAdminPage').then(module => ({ default: module.ContentAdminPage })));
const TenantDashboard = lazy(() => import('./pages/admin/TenantDashboard').then(module => ({ default: module.TenantDashboard })));

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <BookingReminderManager />
          <ToastContainer />
          <Header />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
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
                <Route path="/admin" element={<ProtectedRoute roles={["administrator"]}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/add-flight" element={<ProtectedRoute roles={["administrator"]}><AddFlightPage /></ProtectedRoute>} />
                <Route path="/admin/add-hotel" element={<ProtectedRoute roles={["administrator"]}><AddHotelPage /></ProtectedRoute>} />
                <Route path="/admin/add-car" element={<ProtectedRoute roles={["administrator"]}><AddCarPage /></ProtectedRoute>} />
                <Route path="/admin/add-product" element={<ProtectedRoute roles={["administrator"]}><AddProductPage /></ProtectedRoute>} />
                <Route path="/content" element={<ProtectedRoute roles={["content_administrator"]}><ContentAdminPage /></ProtectedRoute>} />
                <Route path="/tenant" element={<ProtectedRoute roles={["tenant_employee"]}><TenantDashboard /></ProtectedRoute>} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default React.memo(App);