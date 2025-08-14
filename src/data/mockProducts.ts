import { Product } from '../types';

export const mockProducts: Product[] = [
  { id: 'P001', name: 'Kurta Set', description: 'Elegant traditional Kurta set for festive occasions.', price: 4500, currency: 'INR', category: 'Traditional Wear', image: '/images/products/kurta.jpg', rating: 4.6, reviews: 240 },
  { id: 'P002', name: 'Yoga Mat', description: 'Non-slip yoga mat with excellent cushioning.', price: 2500, currency: 'INR', category: 'Health & Wellness', image: '/images/products/yoga-mat.jpg', rating: 4.4, reviews: 320 },
  { id: 'P003', name: 'Travel Backpack', description: 'Durable and spacious backpack for travelers.', price: 8500, currency: 'INR', category: 'Travel Bags', image: '/images/products/backpack.jpg', rating: 4.7, reviews: 150 },
  { id: 'P004', name: 'Masala Pack', description: 'Assorted Indian spices in a gift pack.', price: 1500, currency: 'INR', category: 'Food & Spices', image: '/images/products/masala.jpg', rating: 4.3, reviews: 410 },
  { id: 'P005', name: 'Herbal Tea Set', description: 'Selection of herbal teas for wellness.', price: 3500, currency: 'INR', category: 'Wellness', image: '/images/products/herbal-tea.jpg', rating: 4.5, reviews: 190 },
];