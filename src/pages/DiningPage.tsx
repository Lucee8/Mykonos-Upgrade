import React, { useState } from 'react';
import {
  Utensils,
  Clock,
  MessageCircle,
  Sparkles,
  Heart,
  Coffee,
  CheckCircle,
} from 'lucide-react';
import { DiningItem, ResortSettings } from '../types/resort';

interface DiningPageProps {
  diningItems: DiningItem[];
  settings: ResortSettings;
}

export const DiningPage: React.FC<DiningPageProps> = ({
  diningItems,
  settings,
}) => {
  const [filterVeg, setFilterVeg] = useState<'all' | 'veg' | 'non-veg'>('all');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  const filteredItems = diningItems.filter((item) => {
    if (filterVeg === 'veg') return item.isVeg;
    if (filterVeg === 'non-veg') return !item.isVeg;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
          The Malvani Kitchen
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1F33]">
          Authentic Coastal Dining & Fresh Catch
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
          Prepared with fresh catches sourced every dawn from Malvan fishing jetty, organic stone-pressed coconut milk, dried purple kokum, and traditional wood-fire recipes passed down through generations.
        </p>
      </div>

      {/* Malvani Heritage Callout */}
      <div className="bg-[#FAF4EC] rounded-3xl p-6 sm:p-8 border border-[#E8DED0] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-700">
        <div className="space-y-1.5">
          <p className="font-serif font-bold text-stone-900 text-base">Fresh Morning Catch</p>
          <p className="text-stone-600">Surmai, Pomfret, Tiger Prawns, Mud Crabs & Bangda procured directly from local fisherfolk.</p>
        </div>
        <div className="space-y-1.5">
          <p className="font-serif font-bold text-stone-900 text-base">Pure Solkadhi Elixir</p>
          <p className="text-stone-600">Hand-pressed thick coconut milk infused with tangy kokum and green chillies to aid coastal digestion.</p>
        </div>
        <div className="space-y-1.5">
          <p className="font-serif font-bold text-stone-900 text-base">Dedicated Veg Kitchen</p>
          <p className="text-stone-600">Tender cashew usal, Malvani aloo wadi, hot modaks, and vegetarian coastal delicacies prepared separately.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setFilterVeg('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            filterVeg === 'all'
              ? 'bg-[#0B1F33] text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          All Specialties
        </button>
        <button
          onClick={() => setFilterVeg('non-veg')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            filterVeg === 'non-veg'
              ? 'bg-[#0B1F33] text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Fresh Catch Seafood & Non-Veg
        </button>
        <button
          onClick={() => setFilterVeg('veg')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            filterVeg === 'veg'
              ? 'bg-[#0B1F33] text-white shadow-xs'
              : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          Pure Coastal Vegetarian
        </button>
      </div>

      {/* Dining Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.isChefSpecial && (
                  <span className="absolute top-3 left-3 bg-[#C26343] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                    Chef's Signature
                  </span>
                )}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.isVeg
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}
                >
                  {item.isVeg ? '● Pure Veg' : '▲ Seafood / Meat'}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                    {item.category}
                  </span>
                  <span className="font-bold text-stone-900 text-sm text-[#C26343]">
                    {item.priceText}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900">
                  {item.name}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello Mykonos Cottage Kitchen, I would like to order or enquire about the ${item.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-stone-50 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 border border-stone-200 hover:border-emerald-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Enquire Dish on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dining Timings & Beach Candlelight Dinner */}
      <div className="bg-[#0B1F33] text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            Private Beach Experiences
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Candlelight Seafood Dinner by the Waves
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Celebrate romantic anniversaries or memorable family milestones. Our staff will arrange a private candlelit table on the beach under the stars with bespoke Malvani thalis and fresh catch cooked to your preference.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
          <div className="p-3 bg-white/10 rounded-xl">
            <span className="text-amber-300 block font-semibold">Breakfast</span>
            <p className="text-stone-300">8:00 AM – 10:30 AM</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <span className="text-amber-300 block font-semibold">Coastal Lunch</span>
            <p className="text-stone-300">12:30 PM – 3:30 PM</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <span className="text-amber-300 block font-semibold">Sunset Tea</span>
            <p className="text-stone-300">5:00 PM – 6:30 PM</p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <span className="text-amber-300 block font-semibold">Dinner</span>
            <p className="text-stone-300">7:30 PM – 10:30 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
