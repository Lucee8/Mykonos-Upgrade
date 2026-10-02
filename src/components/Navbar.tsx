import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Calendar,
  Compass,
  Utensils,
  Image as ImageIcon,
  Tag,
  MapPin,
  Shield,
  Home,
  Bed,
} from 'lucide-react';
import { ResortSettings } from '../types/resort';

interface NavbarProps {
  settings: ResortSettings;
  activeTab: string;
  onNavigate: (tab: string, slug?: string) => void;
  onOpenBooking: (roomId?: string) => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  activeTab,
  onNavigate,
  onOpenBooking,
  isAdminLoggedIn,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Cottages & Suites', icon: Bed },
    { id: 'experiences', label: 'Experiences & Scuba', icon: Compass },
    { id: 'dining', label: 'Malvani Dining', icon: Utensils },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'reviews', label: 'Reviews & FAQ', icon: Shield },
    { id: 'location', label: 'Location & About', icon: MapPin },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DED0]/60 shadow-xs">
      {/* Top micro bar for high-end concierge contacts */}
      <div className="bg-[#0B1F33] text-stone-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-stone-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Tarkarli Beach, Malvan • Maharashtra
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-400">
              Direct Booking Benefit: Complimentary Coastal Breakfast
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{settings.phone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage Tarkarli, I would like to enquire about room availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
            <button
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="flex items-center gap-1 text-stone-400 hover:text-amber-300 transition-colors ml-2 pl-2 border-l border-stone-700"
            >
              <Shield className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Admin Active' : 'Staff'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="text-left flex flex-col group cursor-pointer"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F33] group-hover:text-[#C26343] transition-colors">
                Mykonos Cottage
              </span>
              <span className="text-xs uppercase tracking-widest text-[#C26343] font-semibold">
                Tarkarli
              </span>
            </div>
            <span className="text-[11px] tracking-wider text-stone-500 hidden sm:block">
              Boutique Coastal Resort • Arabian Sea Shoreline
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#0B1F33] bg-[#E8DED0]/50 font-semibold shadow-2xs'
                      : 'text-stone-600 hover:text-[#0B1F33] hover:bg-[#F4EFE6]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden xl:flex items-center space-x-3">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage, I want to check rates for upcoming dates.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0B1F33] hover:bg-[#1A3B5C] active:bg-[#071321] rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Book Cottage</span>
            </button>
          </div>

          {/* Mobile and Tablet hamburger menu */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0B1F33] hover:bg-[#1A3B5C] rounded-lg transition-colors cursor-pointer"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile and Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DED0] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0B1F33] text-white'
                      : 'text-stone-700 hover:bg-[#F4EFE6]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage, I want to check rates.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-stone-600" />
              <span>Call Reservation: {settings.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 py-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Resort Staff Login</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
