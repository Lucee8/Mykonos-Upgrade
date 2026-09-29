import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Compass,
  Utensils,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  ChevronDown,
  ShieldCheck,
  Waves,
  Coffee,
  Wifi,
  Sun,
  Camera,
  MessageCircle,
} from 'lucide-react';
import {
  Room,
  Experience,
  DiningItem,
  SpecialOffer,
  Review,
  ResortSettings,
  FAQItem,
} from '../types/resort';
import { SEED_FAQS } from '../data/seedData';

interface HomePageProps {
  settings: ResortSettings;
  rooms: Room[];
  experiences: Experience[];
  diningItems: DiningItem[];
  offers: SpecialOffer[];
  reviews: Review[];
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
  onOpenBooking,
  onNavigate,
  onSelectRoom,
}) => {
  // Quick availability widget state
  const [quickCheckIn, setQuickCheckIn] = useState('');
  const [quickGuests, setQuickGuests] = useState('2');
  const [quickCategory, setQuickCategory] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  const featuredRooms = rooms.slice(0, 3);
  const featuredExperiences = experiences.slice(0, 3);
  const featuredDining = diningItems.slice(0, 3);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking();
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-900">
        {/* Background Image with warm coastal overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Mykonos Cottage Tarkarli Beach"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[8000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33] via-[#0B1F33]/60 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide text-amber-300 mb-6">
            <Waves className="w-4 h-4" />
            <span>Direct Beach Access • 25m to Tarkarli Shoreline</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white">
            {settings.heroHeadline}
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            {settings.heroSubheadline}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#ad5437] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-200" />
              <span>Reserve Your Cottage</span>
            </button>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage Tarkarli, I am looking to plan a coastal getaway. Please share available dates and rates.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              onClick={() => onNavigate('rooms')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 font-medium rounded-xl transition-all cursor-pointer"
            >
              View Cottages
            </button>
          </div>

          {/* Key Value Badges */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-300">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Private Oceanfront Decks</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Authentic Malvani Dining</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>PADI Scuba Diving Desk</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Zero Booking Fees Direct</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING QUICK AVAILABILITY SEARCH WIDGET */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <form
          onSubmit={handleQuickSearch}
          className="bg-white rounded-2xl shadow-xl border border-stone-200/80 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
              Preferred Dates
            </label>
            <div className="relative">
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={quickCheckIn}
                onChange={(e) => setQuickCheckIn(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
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
              className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
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
                className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests (Couple)</option>
                <option value="3">3 - 4 Guests (Small Family)</option>
                <option value="5">5+ Guests (Large Group)</option>
              </select>
              <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#0B1F33] hover:bg-[#1A3B5C] active:bg-[#071321] text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer h-[42px]"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Check Rates & Availability</span>
            </button>
          </div>
        </form>
      </section>

      {/* 3. RESORT PHILOSOPHY / ESSENCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#C26343]">
              <span>About Mykonos Cottage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33] leading-tight">
              Where Malvani Coastal Warmth Meets Greek Island Serenity
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              Tarkarli’s shoreline is renowned for its crystalline waters, powdery white sand, and historic maritime legacy. Mykonos Cottage was born to offer travelers a peaceful sanctuary away from crowded commercial hotels.
            </p>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              Whether you are savoring morning Solkadhi on your shaded veranda, diving into vibrant coral gardens near Sindhudurg Fort, or taking sunset walks along the tide line, our boutique property invites you to slow down and reconnect.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <p className="font-serif text-2xl font-bold text-[#0B1F33]">25 Meters</p>
                <p className="text-xs text-stone-500 mt-1">Walk to the white sand beach</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs">
                <p className="font-serif text-2xl font-bold text-[#C26343]">100% Fresh</p>
                <p className="text-xs text-stone-500 mt-1">Daily catch Malvani seafood</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
              alt="Beachfront Cottage Veranda"
              className="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80"
              alt="Wooden Cottage Architecture"
              className="rounded-2xl object-cover h-64 sm:h-80 w-full shadow-md mt-6"
            />
          </div>
        </div>
      </section>

      {/* 4. FEATURED COTTAGES & SUITES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C26343] block mb-1">
              Handcrafted Accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              Cottages & Beachfront Villas
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              Each cottage is designed with private verandas, quiet inverter air-conditioning, artisanal furnishings, and direct beach pathways.
            </p>
          </div>

          <button
            onClick={() => onNavigate('rooms')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors cursor-pointer group"
          >
            <span>View All Cottages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              {/* Image & Badge */}
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {room.badge && (
                  <span className="absolute top-3 left-3 bg-[#0B1F33]/90 backdrop-blur-xs text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-md">
                    {room.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-xs font-medium px-2 py-0.5 rounded shadow-xs">
                  {room.view}
                </span>
              </div>

              {/* Room Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                      {room.category}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      Max {room.maxGuests} Guests • {room.sizeSqFt} sq ft
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#C26343] transition-colors">
                    {room.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {room.shortDescription}
                  </p>

                  {/* Amenity Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {room.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded"
                      >
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 3 && (
                      <span className="text-[11px] bg-stone-50 text-stone-500 px-1.5 py-0.5 rounded">
                        +{room.amenities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">From</span>
                    <span className="font-serif text-xl font-bold text-[#0B1F33]">
                      ₹{room.basePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-500"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectRoom(room.slug)}
                      className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#C26343] hover:bg-[#ad5437] rounded-lg transition-colors shadow-xs cursor-pointer"
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

      {/* 5. TARKARLI EXPERIENCES & SCUBA */}
      <section className="bg-[#0B1F33] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Explore Sindhudurg Coast
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Coastal Adventures & Scuba
              </h2>
              <p className="text-stone-300 text-sm mt-1 max-w-xl">
                Certified underwater diving, island fortress explorations, and peaceful river backwater cruises arranged directly by our front desk.
              </p>
            </div>

            <button
              onClick={() => onNavigate('experiences')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer group"
            >
              <span>All Experiences</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredExperiences.map((exp) => (
              <div
                key={exp.id}
                className="bg-[#122B45] rounded-2xl overflow-hidden border border-[#1A3B5C] hover:border-amber-400/40 transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B1F33]/90 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded">
                    {exp.category}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded">
                    {exp.duration}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                      {exp.summary}
                    </p>
                    <p className="text-xs text-amber-400 font-semibold pt-1">
                      {exp.priceText}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello Mykonos Cottage, I want to book the ${exp.title} experience during my stay.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 text-center text-xs font-semibold text-stone-200 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AUTHENTIC MALVANI DINING TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4EC] rounded-3xl p-6 sm:p-10 border border-[#E8DED0]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C26343] block">
                The Coastal Kitchen
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
                Malvani Flavors & Fresh Catch Seafood
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Prepared with cold-pressed coconut oil, stone-ground Malvani spices, and fish bought fresh every morning from Malvan’s bustling fishing port. Relish fragrant Solkadhi, crispy Surmai fry, soft Malvani vade, and sweet Ukadiche Modak.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('dining')}
                  className="px-5 py-2.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  View Dining Menu
                </button>
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello, I would like to enquire about meal arrangements and Malvani Thali at Mykonos Cottage.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order / Enquire Menu</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {featuredDining.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-[4/3] rounded-xl object-cover"
                  />
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 mt-2 truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#C26343] font-bold mt-0.5">{item.priceText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SPECIAL OFFERS & DIRECT ADVANTAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
            Exclusive Perks
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0B1F33] mt-1">
            Direct Booking Advantages
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Booking directly with our property concierge guarantees the lowest tariff, zero service fees, and tailored Malvani hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white border border-[#E8DED0] rounded-2xl p-6 relative overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs font-bold rounded-md">
                  {offer.badge}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {offer.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {offer.description}
                </p>
                <div className="p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">Use Promo Code:</span>
                  <span className="font-mono font-bold text-xs text-[#0B1F33] bg-stone-200 px-2 py-1 rounded">
                    {offer.code}
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenBooking()}
                  className="w-full py-2.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Claim Offer & Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VERIFIED GUEST REVIEWS */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0B1F33]">
              Loved by Travelers across Maharashtra & Beyond
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              4.8+ rating based on genuine Google and TripAdvisor guest feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-2xs space-y-4 flex flex-col justify-between"
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

                  <p className="text-xs text-stone-600 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-stone-900">{rev.author}</p>
                    <p className="text-stone-500 text-[11px]">{rev.roomStayed}</p>
                  </div>
                  <span className="text-stone-400 font-medium">via {rev.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. LOCATION & GETTING HERE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C26343] block">
              Getting Here
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0B1F33]">
              Nestled on Tarkarli Beach Road
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              Located peacefully in Malvan taluka, Sindhudurg district. Easily accessible by road, rail, and flights via Chipi Sindhudurg Airport and Goa MOPA Airport.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <MapPin className="w-4 h-4 text-[#C26343] flex-shrink-0" />
                <div>
                  <strong>Sindhudurg Chipi Airport (SDW):</strong> 22 km (~35 mins drive)
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <MapPin className="w-4 h-4 text-[#C26343] flex-shrink-0" />
                <div>
                  <strong>Kudal Railway Station (Konkan Railway):</strong> 35 km (~45 mins)
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200">
                <MapPin className="w-4 h-4 text-[#C26343] flex-shrink-0" />
                <div>
                  <strong>Goa MOPA International Airport:</strong> 85 km (~2 hours drive)
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-colors"
              >
                <span>Open in Google Maps Navigation</span>
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md h-80 sm:h-96">
            <iframe
              title="Mykonos Cottage Tarkarli Location"
              src={settings.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Everything you need to know about cottage bookings, activities, and dining.
          </p>
        </div>

        <div className="space-y-3">
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
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm text-stone-900 cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform ${
                      isOpen ? 'rotate-180 text-[#C26343]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed bg-[#FAF7F2]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. BOTTOM CONCIERGE CTA BANNER */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#0B1F33] to-[#1A3B5C] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto">
            Ready to Experience Tarkarli’s Coastal Haven?
          </h2>
          <p className="text-sm text-stone-300 max-w-lg mx-auto font-light">
            Contact our on-property concierge for personalized dates, group cottages, and tailored Malvani seafood dining.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3 bg-[#C26343] hover:bg-[#ad5437] text-white text-sm font-semibold rounded-xl transition-colors shadow-md cursor-pointer"
            >
              Book Cottage Direct
            </button>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage, I want to book a cottage for my vacation.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
