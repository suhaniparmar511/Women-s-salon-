import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Landing Page Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Statistics } from './components/Statistics';
import { About } from './components/About';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { AuthModal } from './components/AuthModal';

// Context & Protected Route
import { CustomerProvider, useCustomer } from './context/CustomerContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Customer Portal Components & Pages
import { CustomerLayout } from './components/customer/CustomerLayout';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { ServicesPage } from './pages/customer/ServicesPage';
import { ServiceDetailsPage } from './pages/customer/ServiceDetailsPage';
import { BookingWizardPage } from './pages/customer/BookingWizardPage';
import { AppointmentsPage } from './pages/customer/AppointmentsPage';
import { AppointmentDetailsPage } from './pages/customer/AppointmentDetailsPage';
import { ShopPage } from './pages/customer/ShopPage';
import { ProductDetailsPage } from './pages/customer/ProductDetailsPage';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrdersPage } from './pages/customer/OrdersPage';
import { OrderDetailsPage } from './pages/customer/OrderDetailsPage';
import { FavoritesPage } from './pages/customer/FavoritesPage';
import { ProfilePage } from './pages/customer/ProfilePage';

// Barber Portal Components & Pages
import { BarberLayout } from './components/barber/BarberLayout';
import { BarberDashboard } from './pages/barber/BarberDashboard';
import { BarberAppointments } from './pages/barber/BarberAppointments';
import { BarberSchedule } from './pages/barber/BarberSchedule';
import { BarberAvailability } from './pages/barber/BarberAvailability';
import { BarberEarnings } from './pages/barber/BarberEarnings';

// Receptionist Portal Components & Pages
import { ReceptionistLayout } from './components/receptionist/ReceptionistLayout';
import { ReceptionistDashboard } from './pages/receptionist/ReceptionistDashboard';
import { ReceptionistAppointments } from './pages/receptionist/ReceptionistAppointments';
import { ReceptionistCalendar } from './pages/receptionist/ReceptionistCalendar';
import { ReceptionistCustomers } from './pages/receptionist/ReceptionistCustomers';
import { ReceptionistStylists } from './pages/receptionist/ReceptionistStylists';

// Admin Portal Components & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStaff } from './pages/admin/AdminStaff';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminWages } from './pages/admin/AdminWages';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';

function LandingPageContent() {
  const navigate = useNavigate();
  const { user, setUser } = useCustomer();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('login');

  const isLoggedIn = !!user;

  const handleBookingTrigger = () => {
    if (!user) {
      setAuthInitialView('login');
      setIsAuthOpen(true);
    } else {
      if (user.role === 'Barber') navigate('/barber/dashboard');
      else if (user.role === 'Receptionist') navigate('/receptionist/dashboard');
      else if (user.role === 'Admin') navigate('/admin/dashboard');
      else navigate('/customer/dashboard');
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);

    // Redirect to actual role dashboard
    const role = userData.role;
    if (role === 'Barber') navigate('/barber/dashboard');
    else if (role === 'Receptionist') navigate('/receptionist/dashboard');
    else if (role === 'Admin') navigate('/admin/dashboard');
    else navigate('/customer/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Navbar
        onBookClick={handleBookingTrigger}
        onLogoutClick={handleLogout}
        user={user}
        isLoggedIn={isLoggedIn}
      />

      <main>
        <Hero onBookClick={handleBookingTrigger} onWatchVideoClick={() => setIsVideoOpen(true)} />
        <Services onBookService={handleBookingTrigger} />
        <Statistics />
        <About onBookClick={handleBookingTrigger} />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <CTA onBookClick={handleBookingTrigger} />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialView={authInitialView}
        onAuthSuccess={handleAuthSuccess}
      />

      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CustomerProvider>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPageContent />} />

          {/* 1. Customer Portal */}
          <Route element={<ProtectedRoute allowedRoles={['Customer']} />}>
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<Navigate to="/customer/dashboard" replace />} />
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:id" element={<ServiceDetailsPage />} />
              <Route path="booking" element={<BookingWizardPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="appointments/:id" element={<AppointmentDetailsPage />} />
              <Route path="shop" element={<ShopPage />} />
              <Route path="shop/:id" element={<ProductDetailsPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrderDetailsPage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* 2. Barber / Stylist Portal */}
          <Route element={<ProtectedRoute allowedRoles={['Barber', 'Stylist']} />}>
            <Route path="/barber" element={<BarberLayout />}>
              <Route index element={<Navigate to="/barber/dashboard" replace />} />
              <Route path="dashboard" element={<BarberDashboard />} />
              <Route path="appointments" element={<BarberAppointments />} />
              <Route path="schedule" element={<BarberSchedule />} />
              <Route path="availability" element={<BarberAvailability />} />
              <Route path="earnings" element={<BarberEarnings />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* 3. Receptionist Portal */}
          <Route element={<ProtectedRoute allowedRoles={['Receptionist']} />}>
            <Route path="/receptionist" element={<ReceptionistLayout />}>
              <Route index element={<Navigate to="/receptionist/dashboard" replace />} />
              <Route path="dashboard" element={<ReceptionistDashboard />} />
              <Route path="appointments" element={<ReceptionistAppointments />} />
              <Route path="calendar" element={<ReceptionistCalendar />} />
              <Route path="customers" element={<ReceptionistCustomers />} />
              <Route path="stylists" element={<ReceptionistStylists />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* 4. Admin Portal */}
          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="staff" element={<AdminStaff />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="wages" element={<AdminWages />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CustomerProvider>
  );
}

export default App;
