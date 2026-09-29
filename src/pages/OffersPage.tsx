import React, { useState } from 'react';
import {
  Tag,
  Sparkles,
  CheckCircle,
  Copy,
  Check,
  Calendar,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { SpecialOffer } from '../types/resort';

interface OffersPageProps {
  offers: SpecialOffer[];
  onOpenBooking: () => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  offers,
  onOpenBooking,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
          Direct Tariffs & Seasonal Deals
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1F33]">
          Special Offers & Packages
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
          Unlock exclusive seasonal savings, scuba adventure bundles, and direct booking perks when reserving directly through our official resort website or WhatsApp concierge.
        </p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl border border-[#E8DED0] p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-md">
                  {offer.badge}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {offer.discountPercent}% OFF
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900">
                {offer.title}
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                {offer.description}
              </p>

              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Validity: {offer.validity}</span>
              </div>

              {/* Promo Code Box */}
              <div className="p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">
                    Promo Code
                  </span>
                  <span className="font-mono font-bold text-stone-900 text-sm">
                    {offer.code}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(offer.code)}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-stone-400 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Apply Code & Book</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Direct Booking Privilege Manifesto */}
      <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8DED0] space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F33]">
          Why You Should Always Book Directly With Us
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-700">
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 block">Lowest Price Guarantee</span>
            <p className="text-stone-500 text-xs">No middleman commissions or hidden service fees.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 block">Complimentary Breakfast</span>
            <p className="text-stone-500 text-xs">Daily fresh Malvani breakfast buffet included on direct reservations.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 block">Early Check-In Priority</span>
            <p className="text-stone-500 text-xs">Priority room allocation and flexible arrival assistance.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-stone-200 space-y-1">
            <span className="font-bold text-stone-900 block">Personalized Concierge</span>
            <p className="text-stone-500 text-xs">Direct WhatsApp support with on-ground property management.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
