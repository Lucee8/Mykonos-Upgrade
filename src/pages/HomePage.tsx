import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Compass,
  Utensils,
  Sparkles,
  ArrowRight,
  Star,
  MapPin,
  ChevronDown,
  Waves,
  Sun,
  Camera,
  MessageCircle,
  Clock,
  Shield,
  CheckCircle2,
  Anchor,
  Wind,
  Phone,
} from 'lucide-react';
import {
  Room,
  Experience,
  DiningItem,
  SpecialOffer,
  Review,
  ResortSettings,
  GalleryItem,
} from '../types/resort';
import { SEED_FAQS, SEED_GALLERY } from '../data/seedData';

interface HomePageProps {
  settings: ResortSettings;
  rooms: Room[];
  experiences: Experience[];
  diningItems: DiningItem[];
  offers: SpecialOffer[];
  reviews: Review[];
  galleryItems?: GalleryItem[];
  onOpenBooking: (roomId?: string) => void;
  onNavigate: (tab: string, slug?: string) => void;
  onSelectRoom: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  rooms,
  experiences,
  diningItems,
  offers,
  reviews,
  galleryItems,
  onOpenBooking,
  onNavigate,
  onSelectRoom,
}) => {
  // Quick availability widget state
  const [quickCheckIn, setQuickCheckIn] = useState('');
  const [quickCheckOut, setQuickCheckOut] = useState('');
  const [quickCategory, setQuickCategory] = useState('all');
  const [quickGuests, setQuickGuests] = useState('2');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  const featuredRooms = rooms.slice(0, 3);
  const featuredExperiences = experiences.slice(0, 3);
  const featuredDining = diningItems.slice(0, 4);
  const displayGallery = (galleryItems && galleryItems.length > 0 ? galleryItems : SEED_GALLERY).slice(0, 6);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const matchingRoom = quickCategory !== 'all' 
      ? rooms.find(r => r.category === quickCategory) 
      : undefined;
    onOpenBooking(matchingRoom?.id);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#071321]">
        {/* Coastal Background Image with cinematic overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=88"
            alt="Mykonos Cottage Tarkarli Beach Shoreline"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
          />
          {/* Multi-layered cinematic gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/65 to-black/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B1F33]/30 to-[#0B1F33]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24 pb-32">
          {/* Eyebrow Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-300 mb-6">
            <Waves className="w-3.5 h-3.5 text-amber-300" />
            <span>Boutique Shoreline Retreat • Tarkarli Beach, Malvan</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12] text-white max-w-4xl mx-auto drop-shadow-sm">
            {settings.heroHeadline || 'Where Grecian Calm Meets Konkan Coastal Splendor'}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            {settings.heroSubheadline ||
              'Handcrafted beach cottages tucked between whisper-quiet coconut groves and the warm turquoise waves of the Arabian Sea. Wake to the rhythm of gentle surf and authentic Malvani coastal hospitality.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-4 bg-[#C26343] hover:bg-[#A84E31] active:bg-[#8F3E24] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Reserve Your Cottage</span>
            </button>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                'Hello Mykonos Cottage Tarkarli, I am looking to plan a coastal getaway. Please share available dates and rates.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              onClick={() => onNavigate('rooms')}
              className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-md text-white border border-white/25 font-medium rounded-xl transition-all cursor-pointer text-sm sm:text-base"
            >
              Explore Cottages
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span>25m Direct Beach Stroll</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Authentic Malvani Kitchen</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Anchor className="w-4 h-4 text-amber-400 shrink-0" />
              <span>PADI Scuba Diving Desk</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Best Rate Guaranteed Direct</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING QUICK AVAILABILITY CHECK WIDGET */}
      <section className="max-w-6xl mx-auto px-4 -mt-20 sm:-mt-24 relative z-20">
        <form
          onSubmit={handleQuickSearch}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200/90 p-5 sm:p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Check-In Date
            </label>
            <div className="relative">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33] transition-colors"
              />
              <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Cottage Type
            </label>
            <select
              value={quickCategory}
              onChange={(e) => setQuickCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33] transition-colors"
            >
              <option value="all">Any Available Cottage</option>
              <option value="Beachfront">Beachfront Villas</option>
              <option value="Wooden Cottage">Eco Wooden Cottages</option>
              <option value="Garden View">Garden Heritage Suites</option>
              <option value="Family Suite">Grand Family Cottages</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Guests
            </label>
            <div className="relative">
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33] transition-colors"
              >
                <option value="1">1 Guest (Solo Traveler)</option>
                <option value="2">2 Guests (Couple)</option>
                <option value="3">3 - 4 Guests (Family)</option>
                <option value="5">5+ Guests (Group)</option>
              </select>
              <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#0B1F33] hover:bg-[#1A3B5C] active:bg-[#071321] text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Check Rates & Availability</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. RESORT INTRODUCTION ("THE SANCTUARY") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
              <span className="w-6 h-px bg-[#C26343]" />
              <span>The Sanctuary</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F33] leading-tight">
              An Unhurried Coastal Escape on Malvan's Pristine Shore
            </h2>

            <p className="text-stone-600 leading-relaxed text-sm sm:text-base font-light">
              Tarkarli’s shoreline is renowned across the Konkan coast for its crystalline waters, powdery white sands, and swaying palm canopy. Mykonos Cottage was born to offer travelers a peaceful sanctuary away from noisy commercial hotels.
            </p>

            <p className="text-stone-600 leading-relaxed text-sm sm:text-base font-light">
              Whether you are savoring morning Solkadhi on your shaded veranda, diving into vibrant coral gardens near Sindhudurg Fort, or taking sunset strolls along the tide line, our boutique property invites you to slow down, breathe, and reconnect with nature.
            </p>

            {/* Editorial Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-200">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">25m</p>
                <p className="text-xs text-stone-500 mt-0.5">To shoreline</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C26343]">100%</p>
                <p className="text-xs text-stone-500 mt-0.5">Daily sea catch</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">12+</p>
                <p className="text-xs text-stone-500 mt-0.5">Konkan recipes</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-600">4.9★</p>
                <p className="text-xs text-stone-500 mt-0.5">Guest rating</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('location')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors cursor-pointer group"
              >
                <span>Read our story & location</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Layered Photography Collage */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                    alt="Beachfront Cottage Veranda"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80"
                    alt="Fresh Coconut Solkadhi"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
                    alt="Artisanal Timber Cottage"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-md aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=80"
                    alt="Tarkarli Palm Grove"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Overlay Stamp */}
            <div className="absolute -bottom-6 -left-6 bg-[#0B1F33] text-white p-4 sm:p-5 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-[#1A3B5C]">
              <Sun className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <p className="font-serif text-sm font-bold text-white">Direct Beach Footpath</p>
                <p className="text-[11px] text-stone-300">Just 30 footsteps to the surf</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY MYKONOS COTTAGE (CORE PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-2">
            The Mykonos Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
            Why Travelers Choose Mykonos Cottage
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2 font-light">
            Designed for those who crave pristine sea views, unhurried privacy, and soulful Konkani hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Waves className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B1F33]">
              Barefoot Shoreline Proximity
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Located only 25 meters from Tarkarli's white sands. Step out of your cottage directly onto the warm sand without crossing busy roads.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C26343] flex items-center justify-center">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B1F33]">
              Artisanal Wooden Craftsmanship
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Built with natural seasoned timber, terracotta tiles, and breezy open verandas equipped with silent inverter air-conditioning and plush beds.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B1F33]">
              Authentic Malvani Flavors
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Fresh morning harbor catch, stone-ground coconut curries, crisp fried fish, fluffy Malvani Vade, and refreshing homemade Solkadhi.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Anchor className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0B1F33]">
              Curated Scuba & Safaris
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              Direct assistance with certified PADI scuba diving at Sindhudurg Fort, dolphin boat cruises, and Karli backwater water sports.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FEATURED COTTAGES & SUITES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-1">
              Handcrafted Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              Cottages & Beachfront Villas
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-1 max-w-xl font-light">
              Each cottage is designed with private verandas, quiet inverter air-conditioning, artisanal furnishings, and direct beach pathways.
            </p>
          </div>

          <button
            onClick={() => onNavigate('rooms')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors cursor-pointer group"
          >
            <span>View All Cottages & Suites</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all flex flex-col group"
            >
              {/* Image & Subtle View Label */}
              <div
                onClick={() => onSelectRoom(room.slug)}
                className="relative aspect-[16/11] overflow-hidden bg-stone-100 cursor-pointer"
              >
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-md">
                  {room.view}
                </span>
              </div>

              {/* Room Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-wider text-[#C26343] font-semibold">
                    {room.category}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-[#C26343] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed font-light">
                    {room.shortDescription}
                  </p>

                  {/* Clean unboxed metadata separator */}
                  <div className="text-xs text-stone-500 pt-2 flex items-center gap-2">
                    <span>Max {room.maxGuests} Guests</span>
                    <span>•</span>
                    <span>{room.bedType}</span>
                    <span>•</span>
                    <span>{room.sizeSqFt} sq ft</span>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block uppercase tracking-wider">Tariff From</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F33]">
                      ₹{room.basePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectRoom(room.slug)}
                      className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-[#C26343] hover:bg-[#A84E31] rounded-lg transition-colors shadow-xs cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TARKARLI EXPERIENCES & SCUBA */}
      <section className="bg-[#0B1F33] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block mb-1">
                Explore Sindhudurg Coast
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Coastal Adventures & Scuba
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-1 max-w-xl font-light">
                Certified underwater scuba diving, historic maritime fortress explorations, and peaceful river backwater cruises arranged directly by our front desk.
              </p>
            </div>

            <button
              onClick={() => onNavigate('experiences')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer group"
            >
              <span>Explore All Experiences</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#122B45] rounded-2xl overflow-hidden border border-[#1A3B5C] hover:border-amber-400/40 transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md">
                    {exp.duration}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-amber-300/90 font-semibold block">
                      {exp.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 leading-relaxed font-light">
                      {exp.summary}
                    </p>
                    <p className="text-xs font-semibold text-amber-400 pt-1">
                      {exp.priceText}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                      `Hello Mykonos Cottage, I would like to book the ${exp.title} experience during my stay.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 text-center text-xs font-semibold text-stone-100 bg-white/10 hover:bg-white/20 active:bg-white/25 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. AUTHENTIC MALVANI DINING TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4EC] rounded-3xl p-6 sm:p-12 border border-[#E8DED0]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block">
                The Coastal Kitchen
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33] leading-tight">
                Authentic Malvani Flavors & Fresh Catch Seafood
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
                Prepared with cold-pressed coconut oil, stone-ground Malvani spices, and fish bought fresh every morning from Malvan’s bustling fishing port. Relish fragrant Solkadhi, crispy Surmai fry, soft Malvani Vade, and sweet Ukadiche Modak.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('dining')}
                  className="px-6 py-3 bg-[#0B1F33] hover:bg-[#1A3B5C] active:bg-[#071321] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  View Dining Menu
                </button>
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                    'Hello, I would like to enquire about meal arrangements and Malvani Thali at Mykonos Cottage.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all inline-flex items-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire / Order Thali</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {featuredDining.map((item) => (
                <div key={item.id} className="bg-white p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs group">
                  <div className="overflow-hidden rounded-xl aspect-[4/3] bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 mt-2.5 truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5">
                    <span>{item.category}</span>
                    <span className="text-[#C26343] font-bold">{item.priceText}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. PHOTO GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-1">
              Visual Moments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              Glimpses of Shoreline Life
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl font-light">
              From golden hour over the Arabian Sea to cozy handcrafted timber interiors and candlelight dining.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors cursor-pointer group"
          >
            <span>View Full Photo Gallery ({displayGallery.length}+)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {displayGallery.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => onNavigate('gallery')}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xs cursor-pointer group bg-stone-100"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-medium text-white drop-shadow-sm truncate">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. VERIFIED GUEST REVIEWS */}
      <section className="bg-[#FAF7F2] py-20 border-y border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
              ))}
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              Loved by Travelers across Maharashtra & Beyond
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 font-light">
              4.9+ rating based on genuine Google and TripAdvisor guest feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-7 border border-stone-200/80 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.stayDate}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed font-light">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{rev.author}</p>
                    <p className="text-stone-500 text-[11px]">{rev.roomStayed}</p>
                  </div>
                  <span className="text-stone-400 font-medium">via {rev.source}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors cursor-pointer group"
            >
              <span>Explore All Verified Guest Reviews & Complete FAQ</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-1">
            Need Help?
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 font-light">
            Everything you need to know about cottage bookings, activities, and dining.
          </p>
        </div>

        <div className="space-y-3.5">
          {SEED_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-stone-900 cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C26343]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed bg-[#FAF7F2]/40 font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL CONVERSION BOOKING CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0B1F33] via-[#122B45] to-[#1A3B5C] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
              Direct Reservation Advantage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
              Ready to Experience Tarkarli’s Coastal Haven?
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto font-light leading-relaxed">
              Book directly with our on-property concierge for guaranteed best rates, flexible cancellation, and complimentary coastal breakfast.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Book Cottage Direct</span>
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  'Hello Mykonos Cottage, I want to book a cottage for my vacation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
