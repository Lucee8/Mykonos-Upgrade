export type RoomCategory = 'Beachfront' | 'Wooden Cottage' | 'Garden View' | 'Family Suite';

export interface Room {
  id: string;
  name: string;
  slug: string;
  category: RoomCategory;
  shortDescription: string;
  description: string;
  basePrice: number; // INR
  weekendPrice: number; // INR
  maxGuests: number;
  bedType: string;
  sizeSqFt: number;
  view: string;
  amenities: string[];
  inclusions: string[];
  heroImage: string;
  gallery: string[];
  isFeatured: boolean;
  order: number;
  badge?: string;
}

export type EnquiryStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled';

export interface Enquiry {
  id?: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomId: string;
  roomName: string;
  adults: number;
  children: number;
  specialRequests?: string;
  estimatedNights: number;
  estimatedTotal: number;
  status: EnquiryStatus;
  source: 'web_form' | 'whatsapp_click';
  createdAt: string;
}

export type ExperienceCategory = 'Watersports' | 'Sightseeing' | 'Heritage' | 'Romance' | 'Nature';

export interface Experience {
  id: string;
  title: string;
  category: ExperienceCategory;
  summary: string;
  description: string;
  duration: string;
  priceText: string;
  highlights: string[];
  image: string;
  location: string;
  order: number;
}

export type DiningCategory = 'Malvani Seafood' | 'Coastal Vegetarian' | 'Breakfast & Beverages' | 'Signature Desserts';

export interface DiningItem {
  id: string;
  name: string;
  category: DiningCategory;
  description: string;
  isVeg: boolean;
  isChefSpecial: boolean;
  priceText: string;
  image: string;
  order: number;
}

export type GalleryCategory = 'All' | 'Cottages & Stay' | 'Beachfront & Sunset' | 'Malvani Dining' | 'Adventures & Water Sports';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cottages & Stay' | 'Beachfront & Sunset' | 'Malvani Dining' | 'Adventures & Water Sports';
  imageUrl: string;
  featured: boolean;
  order: number;
}

export interface SpecialOffer {
  id: string;
  title: string;
  code: string;
  discountPercent: number;
  description: string;
  validity: string;
  badge: string;
  active: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  stayDate: string;
  comment: string;
  roomStayed: string;
  source: 'Google' | 'TripAdvisor' | 'Direct';
  isFeatured: boolean;
}

export interface ResortSettings {
  resortName: string;
  tagline: string;
  phone: string;
  whatsapp: string; // international format e.g. 919876543210
  email: string;
  address: string;
  locationSummary: string;
  googleMapsUrl: string;
  googleMapsEmbed: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  heroHeadline: string;
  heroSubheadline: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Booking & Stay' | 'Activities & Scuba' | 'Food & Dining' | 'Location & Travel';
}
