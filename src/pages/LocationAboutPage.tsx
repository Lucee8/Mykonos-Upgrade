import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Car,
  Plane,
  Train,
  ShieldCheck,
  Compass,
  ArrowUpRight,
} from 'lucide-react';
import { ResortSettings } from '../types/resort';

interface LocationAboutPageProps {
  settings: ResortSettings;
  onOpenBooking: () => void;
}

export const LocationAboutPage: React.FC<LocationAboutPageProps> = ({
  settings,
  onOpenBooking,
}) => {
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. About the Resort & Ethos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-5">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
            Our Coastal Story
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1F33] leading-tight">
            A Tranquil Haven by the Arabian Sea
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            Founded with a vision to preserve the idyllic coastal spirit of Malvan while offering modern boutique hospitality, Mykonos Cottage Tarkarli provides guests with an unpretentious sanctuary of natural timber, sea breezes, and genuine Konkani warmth.
          </p>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
            Situated just 25 meters from the golden shore, our property allows you to hear the soothing rhythm of waves while relaxing on your private porch. We partner closely with local fisherfolk, licensed boatmen, and certified scuba instructors to ensure your coastal holiday is authentic, sustainable, and unforgettable.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Plan Your Stay
            </button>
            <a
              href={`https://wa.me/${cleanWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Concierge</span>
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
            alt="Tarkarli Coast"
            className="rounded-3xl shadow-xl object-cover h-96 w-full"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-lg max-w-xs hidden sm:block">
            <p className="font-serif font-bold text-stone-900 text-sm">25m to Ocean Water</p>
            <p className="text-xs text-stone-500 mt-0.5">Private walkway directly onto pristine white sands.</p>
          </div>
        </div>
      </div>

      {/* 2. Location & Travel Guide */}
      <div className="space-y-8 pt-6 border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
            Getting Here
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0B1F33]">
            How to Reach Mykonos Cottage Tarkarli
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Conveniently situated in Malvan taluka, easily accessible from Mumbai, Pune, Kolhapur, and Goa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#C26343] flex items-center justify-center">
              <Plane className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">By Air</h3>
            <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <li>
                <strong>Sindhudurg Chipi Airport (SDW):</strong> 22 km away. Direct flights from Mumbai. Taxi travel time is approx 35 minutes.
              </li>
              <li>
                <strong>Goa MOPA Airport (GOX):</strong> 85 km away. Frequent domestic & international connections. Approx 2 hours drive via NH66.
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0B1F33] flex items-center justify-center">
              <Train className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">By Train</h3>
            <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <li>
                <strong>Kudal Railway Station (KR):</strong> 35 km away. Major Konkan Railway junction connected to Mumbai, Pune, Delhi, and Kerala.
              </li>
              <li>
                <strong>Kankavli Station:</strong> 48 km away. Taxis and private cab transfers can be pre-arranged by our front desk.
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-stone-900 text-base">By Road</h3>
            <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
              <li>
                <strong>From Mumbai:</strong> ~510 km via Mumbai-Goa Highway (NH66) or via Pune-Kolhapur-Gaganbawda Ghat.
              </li>
              <li>
                <strong>From Pune:</strong> ~390 km via Kolhapur – Radhanagari – Phonda Ghat – Malvan. Scenic Konkan ghat drive.
              </li>
            </ul>
          </div>
        </div>

        {/* Map Embed Container */}
        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md h-96 relative">
          <iframe
            title="Google Map Location Mykonos Cottage Tarkarli"
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

      {/* 3. Policies & Guest Guidelines */}
      <div className="bg-[#FAF4EC] rounded-3xl p-8 sm:p-10 border border-[#E8DED0] space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
            Peace of Mind
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
            Resort Policies & Booking Conditions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Clear, transparent policies to ensure a seamless holiday for all our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
            <p className="font-bold text-stone-900 text-sm">Cancellation & Refunds</p>
            <p className="text-stone-600 text-xs leading-relaxed">
              {settings.cancellationPolicy}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
            <p className="font-bold text-stone-900 text-sm">Check-in & Check-out</p>
            <p className="text-stone-600 text-xs leading-relaxed">
              Check-in time is {settings.checkInTime} and Check-out is {settings.checkOutTime}. Early check-in or late check-out is subject to prior cottage availability.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
            <p className="font-bold text-stone-900 text-sm">Identity Verification</p>
            <p className="text-stone-600 text-xs leading-relaxed">
              In accordance with government regulations, all adult guests must present valid government photo ID (Aadhaar, Passport, Driving License, or Voter ID) upon arrival.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
            <p className="font-bold text-stone-900 text-sm">Child & Extra Bedding Policy</p>
            <p className="text-stone-600 text-xs leading-relaxed">
              Children up to 5 years stay complimentary sharing existing bedding. Children aged 6–11 years are charged at nominal extra person tariff including breakfast.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
