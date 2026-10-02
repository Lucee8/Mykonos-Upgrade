import React, { useState } from 'react';
import {
  Bed,
  Users,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  Eye,
  ShieldCheck,
  Maximize2,
  Waves,
  Sun,
  Coffee,
  Wind,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { Room, RoomCategory } from '../types/resort';

interface RoomsPageProps {
  rooms: Room[];
  onOpenBooking: (roomId?: string) => void;
  onSelectRoom: (slug: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  rooms,
  onOpenBooking,
  onSelectRoom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Beachfront',
    'Wooden Cottage',
    'Garden View',
    'Family Suite',
  ];

  const filteredRooms =
    selectedCategory === 'All'
      ? rooms
      : rooms.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-16 pb-24">
      {/* 1. PREMIUM PAGE HERO */}
      <section className="relative bg-[#0B1F33] text-white py-20 lg:py-24 overflow-hidden">
        {/* Subtle background scrim texture */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-5">
            <Waves className="w-3.5 h-3.5 text-amber-300" />
            <span>Coastal Accommodations • Tarkarli Beach</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Handcrafted Cottages & Beachfront Villas
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-light">
            Designed for unhurried privacy and barefoot tranquility. Every cottage features seasoned timber architecture, shaded private verandas, quiet inverter air-conditioning, and is situated just 25–40 meters from the Arabian Sea tide line.
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-10 pt-6 border-t border-white/15 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span>25m to Shoreline</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Wind className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Private Verandas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Coffee className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Free Malvani Breakfast</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Direct Best Rate Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & ROOMS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Filter Navigation */}
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? rooms.length
                : rooms.filter((r) => r.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0B1F33] text-white shadow-sm font-semibold'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat === 'All' ? 'All Cottages' : cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cottages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div
                onClick={() => onSelectRoom(room.slug)}
                className="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer"
              >
                <img
                  src={room.heroImage}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Top Badge */}
                {room.badge && (
                  <span className="absolute top-4 left-4 bg-[#0B1F33]/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-md shadow-xs">
                    {room.badge}
                  </span>
                )}

                {/* Bottom View & Quick Details Button */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block">
                      {room.category}
                    </span>
                    <p className="text-xs text-stone-200 font-light">{room.view}</p>
                  </div>
                  <button
                    onClick={() => onSelectRoom(room.slug)}
                    className="px-3 py-1.5 bg-white/25 hover:bg-white/35 backdrop-blur-md rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Gallery</span>
                  </button>
                </div>
              </div>

              {/* Room Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Name & Short Description */}
                  <div>
                    <h2
                      onClick={() => onSelectRoom(room.slug)}
                      className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 group-hover:text-[#C26343] transition-colors cursor-pointer"
                    >
                      {room.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-2 leading-relaxed font-light">
                      {room.shortDescription}
                    </p>
                  </div>

                  {/* Clean Spec Row (No Pills) */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-stone-500 py-2 border-y border-stone-100 font-medium">
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <Users className="w-3.5 h-3.5 text-[#C26343]" />
                      <span>Max {room.maxGuests} Guests</span>
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <Bed className="w-3.5 h-3.5 text-[#C26343]" />
                      <span>{room.bedType}</span>
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="flex items-center gap-1.5 text-stone-700">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C26343]" />
                      <span>{room.sizeSqFt} sq ft</span>
                    </span>
                  </div>

                  {/* Amenities Highlights */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                      Featured Amenities
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-stone-600 font-light truncate"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions Banner */}
                  <div className="bg-[#FAF4EC] rounded-xl p-3 border border-[#E8DED0]/80 flex items-center gap-2.5 text-xs text-stone-800">
                    <Sparkles className="w-4 h-4 text-[#C26343] shrink-0" />
                    <span className="font-medium">
                      Complimentary Malvani Breakfast Buffet & Welcome Drinks
                    </span>
                  </div>
                </div>

                {/* Tariff & Actions */}
                <div className="pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-stone-400 block uppercase tracking-wider font-medium">
                      Direct Starting Tariff
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
                        ₹{room.basePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-500">/ weekday night</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      Weekend: ₹{room.weekendPrice.toLocaleString('en-IN')} / night
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onSelectRoom(room.slug)}
                      className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenBooking(room.id)}
                      className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#C26343] hover:bg-[#A84E31] rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-amber-200" />
                      <span>Book Cottage</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DIRECT RESERVATION GUARANTEE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-stone-200/80 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1F33] flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Best Direct Rate</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              No middleman commission or hidden portal charges. Booking directly guarantees the lowest available tariff.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1F33] flex items-center justify-center md:justify-start gap-2">
              <Coffee className="w-5 h-5 text-amber-600" />
              <span>Complimentary Breakfast</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Wake up to fresh Malvani poha, coastal eggs, freshly brewed filter coffee, and tropical seasonal fruits included with all cottages.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1F33] flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#C26343]" />
              <span>Concierge Assistance</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Front desk assistance for PADI scuba diving slots, sunrise dolphin cruises, airport transfers, and private beach dinners.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
