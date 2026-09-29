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
} from 'lucide-react';
import { Room, ResortSettings } from '../types/resort';

interface RoomDetailPageProps {
  room: Room;
  settings: ResortSettings;
  onBack: () => void;
  onOpenBooking: (roomId: string) => void;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({
  room,
  settings,
  onBack,
  onOpenBooking,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');
  const allImages = [room.heroImage, ...room.gallery.filter((img) => img !== room.heroImage)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Button */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-stone-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Cottages</span>
        </button>
      </div>

      {/* Title & Micro Stats Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs uppercase tracking-widest text-[#C26343] font-bold">
              {room.category}
            </span>
            {room.badge && (
              <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded">
                {room.badge}
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F33]">
            {room.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {room.view} • {room.sizeSqFt} sq ft living space • {room.bedType}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-stone-400 block">Starting from</span>
            <span className="font-serif text-2xl font-bold text-[#0B1F33]">
              ₹{room.basePrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-stone-500"> / night</span>
          </div>

          <button
            onClick={() => onOpenBooking(room.id)}
            className="px-6 py-3 bg-[#C26343] hover:bg-[#ad5437] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-amber-200" />
            <span>Book This Cottage</span>
          </button>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="space-y-3">
        {/* Main Display Image */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-900 shadow-md">
          <img
            src={allImages[activeImageIndex] || room.heroImage}
            alt={room.name}
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>

        {/* Thumbnail selector */}
        {allImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#0B1F33] ring-2 ring-[#0B1F33]/30 scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${room.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-10">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Cottage Overview
            </h2>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
              {room.description}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white rounded-2xl border border-stone-200">
            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium">Guests</span>
              <p className="font-bold text-stone-900 text-sm">Up to {room.maxGuests} Guests</p>
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium">Bedding</span>
              <p className="font-bold text-stone-900 text-sm">{room.bedType}</p>
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium">Floor Area</span>
              <p className="font-bold text-stone-900 text-sm">{room.sizeSqFt} sq. ft.</p>
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-xs uppercase font-medium">View</span>
              <p className="font-bold text-stone-900 text-sm">{room.view}</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Amenities & In-Room Comforts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {room.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200/80 text-xs sm:text-sm text-stone-700"
                >
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Complimentary Inclusions
            </h2>
            <div className="p-5 bg-[#FAF4EC] rounded-2xl border border-[#E8DED0] space-y-2.5">
              {room.inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800">
                  <Sparkles className="w-4 h-4 text-[#C26343] flex-shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Policies & Timings */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h2 className="font-serif text-xl font-bold text-stone-900">
              Check-In & House Guidelines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800">Check-in: {settings.checkInTime}</span>
                <p>Government ID proof required for all adult guests at check-in.</p>
              </div>
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-bold text-stone-800">Check-out: {settings.checkOutTime}</span>
                <p>Late check-out available subject to prior reservation schedule.</p>
              </div>
            </div>
            <p className="text-xs text-stone-500 italic">
              Cancellation Policy: {settings.cancellationPolicy}
            </p>
          </div>
        </div>

        {/* Right 1 Col: Booking Card */}
        <div>
          <div className="sticky top-28 bg-white rounded-2xl border border-stone-200 p-6 shadow-md space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold block">
                Direct Best Tariff
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="font-serif text-3xl font-bold text-[#0B1F33]">
                  ₹{room.basePrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-500">/ weekday night</span>
              </div>
              <span className="text-xs text-stone-500 block mt-0.5">
                Weekend: ₹{room.weekendPrice.toLocaleString('en-IN')} / night
              </span>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Direct Booking Privileges</span>
              </p>
              <p className="text-[11px] text-emerald-700">
                Includes Malvani Breakfast Buffet & Welcome Drinks. Zero advance fees on enquiry.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onOpenBooking(room.id)}
                className="w-full py-3 bg-[#C26343] hover:bg-[#ad5437] text-white font-semibold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Cottage Dates</span>
              </button>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello Mykonos Cottage Tarkarli, I am interested in booking the ${room.name}. Please confirm availability and rates.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp</span>
              </a>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-stone-400">
                Need immediate assistance? Call <a href={`tel:${settings.phone}`} className="underline font-semibold text-stone-700">{settings.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
