import React from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Compass,
  Utensils,
  Shield,
  ArrowUpRight,
  Heart,
} from 'lucide-react';
import { ResortSettings } from '../types/resort';

interface FooterProps {
  settings: ResortSettings;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  return (
    <footer className="bg-[#0B1F33] text-stone-300 pt-16 pb-24 sm:pb-12 border-t border-[#1A3B5C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Introduction */}
          <div className="space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Mykonos Cottage
              </span>
              <span className="block text-xs uppercase tracking-widest text-amber-400 font-semibold mt-0.5">
                Tarkarli Beach, Malvan
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Boutique coastal retreat offering handcrafted wooden and beachfront cottages steps from the Arabian Sea. Experience Malvani heritage, crystal-clear scuba diving, and tranquil Konkan sunsets.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${cleanPhone}`}
                className="w-9 h-9 rounded-full bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
                title="Call Reservations"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="w-9 h-9 rounded-full bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Direct Navigation */}
          <div>
            <h3 className="font-serif text-white font-semibold text-base mb-4 tracking-wide">
              Explore The Resort
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Cottages & Beach Villas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experiences')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>Scuba Diving & Fort Safari</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dining')}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5 text-amber-400" />
                  <span>Authentic Malvani Dining</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Photo & Video Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Special Offers & Direct Perks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location')}
                  className="hover:text-amber-300 transition-colors cursor-pointer"
                >
                  Location, Route & FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Timings & Policies */}
          <div>
            <h3 className="font-serif text-white font-semibold text-base mb-4 tracking-wide">
              Stay & Concierge
            </h3>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Check-In / Out</p>
                  <p className="text-xs">Check-in: {settings.checkInTime}</p>
                  <p className="text-xs">Check-out: {settings.checkOutTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Nearby Attractions</p>
                  <p className="text-xs">Tarkarli Beach (30 meters)</p>
                  <p className="text-xs">Sindhudurg Fort (10 mins boat)</p>
                  <p className="text-xs">Devbagh Sangam (4 km)</p>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2 px-3 text-xs font-semibold bg-[#C26343] hover:bg-[#ad5437] text-white rounded-lg transition-colors text-center cursor-pointer"
                >
                  Check Cottage Availability
                </button>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div>
            <h3 className="font-serif text-white font-semibold text-base mb-4 tracking-wide">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${cleanWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: +{cleanWhatsapp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom micro copyright & admin portal */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {settings.resortName}. Handcrafted coastal retreat in Sindhudurg.</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('location')}
              className="hover:text-stone-400 transition-colors cursor-pointer"
            >
              Policies & FAQs
            </button>
            <span className="text-stone-700">•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Resort Management Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
