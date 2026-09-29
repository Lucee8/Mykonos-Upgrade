import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { ResortSettings } from '../types/resort';

interface MobileStickyBarProps {
  settings: ResortSettings;
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  settings,
  onOpenBooking,
}) => {
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1F33] border-t border-[#1A3B5C] px-3 py-2.5 sm:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
      <div className="grid grid-cols-3 gap-2 items-center">
        {/* Call Action */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-stone-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-medium tracking-tight">Call Us</span>
        </a>

        {/* WhatsApp Action */}
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage Tarkarli, I am on your website and would like to enquire about cottage booking.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium transition-colors shadow-xs"
        >
          <MessageCircle className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* Book Action */}
        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-[#C26343] hover:bg-[#AD5437] active:bg-[#97452d] text-white font-medium transition-colors shadow-xs cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Book / Rates</span>
        </button>
      </div>
    </div>
  );
};
