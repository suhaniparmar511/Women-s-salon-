import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicesAPI, productsAPI, appointmentsAPI, staffAPI, ordersAPI } from '../services/api';

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  // Current logged in customer user
  const [user, setUser] = useState({
    _id: 'cust123',
    name: 'Alex Mercer',
    email: 'alex@example.com',
    phone: '+91 98765 43215',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    preferredBarber: 'Marcus Vance',
    preferredService: 'Premium Haircut',
  });

  const [services, setServices] = useState([
    { id: '1', name: 'Classic Haircut', category: 'Haircut', price: 20, duration: 30, description: 'Traditional haircut with scissor and clipper techniques', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
    { id: '2', name: 'Premium Haircut', category: 'Haircut', price: 35, duration: 45, description: 'Premium cut with wash, style, and finishing', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=80', rating: 4.9 },
    { id: '3', name: 'Beard Trim & Shape', category: 'Beard', price: 15, duration: 20, description: 'Basic beard trim, line-up, and hot towel finish', image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80', rating: 4.7 },
    { id: '4', name: 'Royal Shave', category: 'Beard', price: 30, duration: 35, description: 'Traditional straight razor shave with essential oils and hot towel', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80', rating: 5.0 },
    { id: '5', name: 'Full Hair Coloring', category: 'Hair Coloring', price: 60, duration: 90, description: 'Complete hair color transformation with organic dye', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80', rating: 4.6 },
    { id: '6', name: 'Deep Detox Facial', category: 'Facial', price: 65, duration: 60, description: 'Deep cleansing facial treatment for radiant skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80', rating: 4.9 },
    { id: '7', name: 'Scalp Massage & Spa', category: 'Spa', price: 40, duration: 45, description: 'Relaxing head massage with essential herbal oils', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
  ]);

  const [barbers, setBarbers] = useState([
    { id: 'b1', name: 'Marcus Vance', specialization: 'Haircut & Beard Specialist', rating: 4.9, experience: '8 Years', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', skills: ['Fades', 'Beard Sculpting', 'Scissor Cut'] },
    { id: 'b2', name: 'Sarah Chen', specialization: 'Modern Hairstyles & Coloring', rating: 4.8, experience: '5 Years', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80', skills: ['Hair Color', 'Styling', 'Facials'] },
    { id: 'b3', name: 'David Park', specialization: 'Classic Shave & Scalp Therapy', rating: 4.9, experience: '7 Years', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80', skills: ['Hot Towel Shave', 'Beard Trim', 'Head Massage'] },
  ]);

  const [products, setProducts] = useState([
    { id: 'p1', name: 'Premium Hair Wax', category: 'Styling', price: 499, rating: 4.8, stock: 45, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', description: 'Strong hold matte finish wax for classic styles.' },
    { id: 'p2', name: 'Sandalwood Beard Oil', category: 'Beard Care', price: 399, rating: 4.9, stock: 30, image: 'https://images.unsplash.com/photo-1608248597309-847250c60815?auto=format&fit=crop&w=600&q=80', description: 'Nourishing oil enriched with vitamin E and organic extracts.' },
    { id: 'p3', name: 'Hair Styling Clay', category: 'Styling', price: 549, rating: 4.7, stock: 20, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80', description: 'Flexible re-moldable clay with zero shine.' },
    { id: 'p4', name: 'Face Detox Cleanser', category: 'Skin Care', price: 299, rating: 4.6, stock: 50, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80', description: 'Deep pore charcoal cleanser for men.' },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 'RC-2026-00125',
      service: 'Premium Haircut',
      barber: 'Marcus Vance',
      barberAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      date: '2026-07-15',
      time: '02:30 PM',
      duration: '45 min',
      price: 35,
      status: 'Confirmed', // Confirmed, Pending, In Progress, Completed, Cancelled
      notes: 'Please keep sides low fade and top textured.',
    },
    {
      id: 'RC-2026-00118',
      service: 'Beard Trim & Shape',
      barber: 'David Park',
      barberAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      date: '2026-07-08',
      time: '11:00 AM',
      duration: '20 min',
      price: 15,
      status: 'Completed',
      notes: '',
    },
  ]);

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('rg_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('rg_favorites');
    return saved ? JSON.parse(saved) : { services: ['1', '3'], products: ['p1'] };
  });

  // Orders state
  const [orders, setOrders] = useState([
    {
      id: 'RC-ORD-1024',
      date: '2026-07-02',
      items: [
        { name: 'Premium Hair Wax', price: 499, quantity: 1, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=200&q=80' },
        { name: 'Sandalwood Beard Oil', price: 399, quantity: 1, image: 'https://images.unsplash.com/photo-1608248597309-847250c60815?auto=format&fit=crop&w=200&q=80' },
      ],
      subtotal: 898,
      delivery: 50,
      tax: 45,
      total: 993,
      status: 'Delivered', // Processing, Shipped, Delivered, Cancelled
    },
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Appointment Confirmed', message: 'Your Premium Haircut with Marcus Vance is confirmed for tomorrow at 2:30 PM.', time: '2h ago', read: false },
    { id: 2, title: 'Order Delivered', message: 'Your order RC-ORD-1024 has been delivered successfully.', time: '1d ago', read: false },
    { id: 3, title: 'Appointment Reminder', message: 'Your appointment starts in 2 hours.', time: '2d ago', read: true },
  ]);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('rg_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('rg_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch real data from backend on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [srvRes, prodRes, apptRes, staffRes] = await Promise.all([
          servicesAPI.getAll().catch(() => null),
          productsAPI.getAll().catch(() => null),
          appointmentsAPI.getAll().catch(() => null),
          staffAPI.getAll().catch(() => null),
        ]);

        if (srvRes?.data?.data && srvRes.data.data.length > 0) {
          setServices((prev) =>
            srvRes.data.data.map((s, idx) => ({
              id: s._id || String(idx + 1),
              name: s.name,
              category: s.category || 'Haircut',
              price: s.price,
              duration: s.duration,
              description: s.description || 'Professional grooming service',
              image: prev[idx % prev.length]?.image || 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
              rating: 4.8,
            }))
          );
        }

        if (prodRes?.data?.data && prodRes.data.data.length > 0) {
          setProducts((prev) =>
            prodRes.data.data.map((p, idx) => ({
              id: p._id || String(idx + 1),
              name: p.name,
              category: p.category || 'Styling',
              price: p.price,
              rating: p.rating || 4.5,
              stock: p.stockQuantity || 25,
              image: prev[idx % prev.length]?.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
              description: p.description,
            }))
          );
        }
      } catch (err) {
        console.log('Using initial structured dataset:', err.message);
      }
    };
    fetchBackendData();
  }, []);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    showToast(`Added "${product.name}" to cart`);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Favorites operations
  const toggleFavoriteService = (serviceId) => {
    setFavorites((prev) => {
      const exists = prev.services.includes(serviceId);
      const updated = exists
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];

      showToast(exists ? 'Removed from favorites' : 'Added to favorites');
      return { ...prev, services: updated };
    });
  };

  const toggleFavoriteProduct = (productId) => {
    setFavorites((prev) => {
      const exists = prev.products.includes(productId);
      const updated = exists
        ? prev.products.filter((id) => id !== productId)
        : [...prev.products, productId];

      showToast(exists ? 'Removed from favorites' : 'Added to favorites');
      return { ...prev, products: updated };
    });
  };

  // Booking operations
  const createAppointment = (newAppt) => {
    const apptId = `RC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const fullAppt = {
      id: apptId,
      status: 'Confirmed',
      ...newAppt,
    };
    setAppointments((prev) => [fullAppt, ...prev]);
    showToast('Appointment booked successfully!');
    return apptId;
  };

  const cancelAppointment = (id, reason) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled', cancelReason: reason } : a))
    );
    showToast('Appointment cancelled successfully', 'info');
  };

  const rescheduleAppointment = (id, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime, status: 'Confirmed' } : a))
    );
    showToast('Appointment rescheduled successfully!');
  };

  // Order checkout
  const createOrder = (orderData) => {
    const newOrder = {
      id: `RC-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      items: cart,
      subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      delivery: 50,
      tax: Math.round(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.05),
      status: 'Processing',
      ...orderData,
    };
    newOrder.total = newOrder.subtotal + newOrder.delivery + newOrder.tax;
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast('Order placed successfully!');
    return newOrder;
  };

  // Notification operations
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <CustomerContext.Provider
      value={{
        user,
        setUser,
        services,
        barbers,
        products,
        appointments,
        cart,
        favorites,
        orders,
        notifications,
        toast,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleFavoriteService,
        toggleFavoriteProduct,
        createAppointment,
        cancelAppointment,
        rescheduleAppointment,
        createOrder,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => useContext(CustomerContext);
