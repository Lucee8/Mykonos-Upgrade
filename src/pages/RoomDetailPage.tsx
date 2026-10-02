import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Users,
  Maximize2,
  Clock,
  ShieldCheck,
  MessageCircle,
  Sparkles,
  Bed,
  Coffee,
  Check,
  MapPin,
  Waves,
  Sun,
  Eye,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { Room, ResortSettings } from '../types/resort';

interface RoomDetailPageProps {
  room: Room;
  rooms?: Room[];
  settings: ResortSettings;
  onBack: () => void;
  onOpenBooking: (roomId: string) => void;
  onSelectRoom?: (slug: string) => void;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({
  room,
  rooms = [],
  settings,
  onBack,
  onOpenBooking,
  onSelectRoom,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');

  const allImages = [
    room.heroImage,
    ...room.gallery.filter((img) => img !== room.heroImage),
  ];

  const relatedRooms = rooms
    .filter((r) => r.id !== room.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. BACK BUTTON & BREADCRUMB */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-[#0B1F33] transition-colors cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-stone-200/90 shadow-2xs hover:shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Cottages</span>
        </button>

        <div className="text-xs text-stone-500 hidden sm:flex items-center gap-1.5">
          <span>Accommodations</span>
          <span>/</span>
          <span className="text-stone-800 font-medium">{room.name}</span>
        </div>
      </div>

      {/* 2. HEADER: TITLE, BADGE, AND TARIFF */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C26343] font-bold">
              {room.category}
            </span>
            {room.badge && (
              <span className="bg-amber-100 text-amber-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                {room.badge}
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F33] tracking-tight">
            {room.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-light flex items-center gap-2">
            <Waves className="w-4 h-4 text-[#C26343]" />
            <span>{room.view}</span>
            <span>•</span>
            <span>{room.sizeSqFt} sq ft living space</span>
            <span>•</span>
            <span>{room.bedType}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <span className="text-[11px] text-stone-400 block uppercase tracking-wider font-medium">
              Direct Starting Tariff
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
                ₹{room.basePrice.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-stone-500"> / weekday night</span>
            </div>
            <span className="text-[11px] text-stone-500 block">
              Weekend: ₹{room.weekendPrice.toLocaleString('en-IN')} / night
            </span>
          </div>

          <button
            onClick={() => onOpenBooking(room.id)}
            className="px-6 py-3 bg-[#C26343] hover:bg-[#A84E31] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2 shrink-0"
          >
            <Calendar className="w-4 h-4 text-amber-200" />
            <span>Reserve Cottage Dates</span>
          </button>
        </div>
      </div>

      {/* 3. PHOTO GALLERY WITH INTERACTIVE THUMBNAILS */}
      <div className="space-y-3.5">
        {/* Main Display Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden bg-stone-900 shadow-md">
          <img
            src={allImages[activeImageIndex] || room.heroImage}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white text-xs sm:text-sm bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg">
            <span>{room.name}</span> • <span>Photo {activeImageIndex + 1} of {allImages.length}</span>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 sm:w-28 h-16 sm:h-18 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#0B1F33] ring-2 ring-[#0B1F33]/30 scale-102 opacity-100 shadow-xs'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${room.name} Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. MAIN DETAILS & STICKY BOOKING CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column (8 Cols): Specs, Story, Amenities, Inclusions, Policies */}
        <div className="lg:col-span-8 space-y-10">
          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-stone-200/90 shadow-2xs">
            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C26343]" />
                <span>Guests</span>
              </span>
              <p className="font-bold text-stone-900 text-sm">
                Up to {room.maxGuests} Guests
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#C26343]" />
                <span>Bedding</span>
              </span>
              <p className="font-bold text-stone-900 text-sm">{room.bedType}</p>
            </div>

            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#C26343]" />
                <span>Floor Area</span>
              </span>
              <p className="font-bold text-stone-900 text-sm">{room.sizeSqFt} sq ft</p>
            </div>

            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5 text-[#C26343]" />
                <span>Orientation</span>
              </span>
              <p className="font-bold text-stone-900 text-sm truncate">{room.view}</p>
            </div>
          </div>

          {/* Cottage Overview */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Cottage Architecture & Experience
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Amenities & In-Room Comforts */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Amenities & In-Room Comforts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-stone-200/80 text-xs sm:text-sm text-stone-700 shadow-2xs font-light"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complimentary Inclusions */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Complimentary Inclusions
            </h2>
            <div className="p-6 bg-[#FAF4EC] rounded-2xl border border-[#E8DED0] space-y-3">
              {room.inclusions.map((inc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-xs sm:text-sm text-stone-800"
                >
                  <Sparkles className="w-4 h-4 text-[#C26343] shrink-0" />
                  <span className="font-medium">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies & Guidelines */}
          <div className="space-y-4 pt-6 border-t border-stone-200">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Check-In & House Guidelines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-stone-700">
              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">
                  Check-in: {settings.checkInTime}
                </span>
                <p className="text-xs text-stone-500 font-light">
                  Government ID proof required for all adult guests at check-in.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-900 block">
                  Check-out: {settings.checkOutTime}
                </span>
                <p className="text-xs text-stone-500 font-light">
                  Late check-out available subject to front-desk scheduling.
                </p>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <span className="font-semibold text-stone-800">Cancellation Policy:</span>
              <p className="leading-relaxed font-light">{settings.cancellationPolicy}</p>
            </div>
          </div>
        </div>

        {/* Right Column (4 Cols): Sticky Booking & Concierge Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-7 shadow-lg space-y-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                Direct Booking Tariff
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
                  ₹{room.basePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500">/ weekday night</span>
              </div>
              <span className="text-xs text-stone-500 block mt-1">
                Weekend rate: ₹{room.weekendPrice.toLocaleString('en-IN')} / night
              </span>
            </div>

            {/* Direct Privilege Highlight */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
              <p className="font-semibold flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Booking Privileges</span>
              </p>
              <p className="text-[11px] text-emerald-700 font-light leading-relaxed">
                Includes complimentary Malvani breakfast buffet, welcome drink, and direct assistance with scuba reservations. Zero portal booking fee.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => onOpenBooking(room.id)}
                className="w-full py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white font-semibold text-sm rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Cottage Dates</span>
              </button>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  `Hello Mykonos Cottage Tarkarli, I am interested in reserving the ${room.name}. Please confirm availability and rates.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            {/* Direct Concierge Contact */}
            <div className="pt-2 text-center border-t border-stone-100 space-y-1">
              <p className="text-[11px] text-stone-500">
                Questions about availability or groups?
              </p>
              <a
                href={`tel:${cleanPhone}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Reservations: {settings.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 5. RELATED COTTAGES */}
      {relatedRooms.length > 0 && (
        <section className="pt-10 border-t border-stone-200/80 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C26343] font-bold block mb-1">
                Explore More
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
                Other Handcrafted Cottages
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs sm:text-sm font-semibold text-[#0B1F33] hover:text-[#C26343] transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRooms.map((relRoom) => (
              <div
                key={relRoom.id}
                onClick={() => onSelectRoom ? onSelectRoom(relRoom.slug) : undefined}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={relRoom.heroImage}
                    alt={relRoom.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[11px] px-2 py-0.5 rounded">
                    {relRoom.view}
                  </span>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C26343] font-semibold block">
                      {relRoom.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-[#C26343] transition-colors">
                      {relRoom.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-light">
                      {relRoom.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-lg font-bold text-[#0B1F33]">
                        ₹{relRoom.basePrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-stone-500"> / night</span>
                    </div>
                    <span className="text-xs font-semibold text-[#0B1F33] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
