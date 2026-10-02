import React, { useState } from 'react';
import {
  Utensils,
  Clock,
  MessageCircle,
  Sparkles,
  Coffee,
  CheckCircle,
  Fish,
  Sun,
  Flame,
  Waves,
  Heart,
  Calendar,
  Check,
  Phone,
  ShieldCheck,
  Moon,
} from 'lucide-react';
import { DiningItem, ResortSettings } from '../types/resort';
import { SEED_DINING } from '../data/seedData';

interface DiningPageProps {
  diningItems: DiningItem[];
  settings: ResortSettings;
  onOpenBooking?: () => void;
}

export const DiningPage: React.FC<DiningPageProps> = ({
  diningItems,
  settings,
  onOpenBooking,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'seafood' | 'veg' | 'specials'>('all');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');

  const items = diningItems && diningItems.length > 0 ? diningItems : SEED_DINING;

  const filteredItems = items.filter((item) => {
    if (selectedFilter === 'seafood') return !item.isVeg && item.category.toLowerCase().includes('seafood');
    if (selectedFilter === 'veg') return item.isVeg;
    if (selectedFilter === 'specials') return item.isChefSpecial;
    return true;
  });

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* 1. PREMIUM DINING HERO */}
      <section className="relative bg-[#0B1F33] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background scrim texture */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-6">
            <Utensils className="w-3.5 h-3.5 text-amber-300" />
            <span>Coastal Gastronomy • Tarkarli Beach</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Authentic Malvani Cuisine & Fresh Catch by the Sea
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            Savor the legendary coastal culinary traditions of the Konkan shoreline. Prepared with dawn-fresh catches from Malvan harbor, cold-pressed coconut milk, stone-ground local spices, and wild purple kokum.
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center justify-center gap-2">
              <Fish className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Daily Harbor Catch</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Traditional Stone Masalas</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Dedicated Veg Kitchen</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Moon className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Candlelight Beach Tables</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTHENTIC MALVANI CUISINE INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4EC] rounded-3xl p-8 sm:p-12 border border-[#E8DED0] space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block">
              The Konkan Culinary Soul
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#0B1F33] leading-tight">
              Where Every Dish Tells a Coastal Story
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
              Malvani food is distinct from neighboring coastal cuisines: bold, deeply aromatic, yet naturally balanced by the soothing touch of fresh coconut milk and digestive wild kokum. Our cooks are native to Malvan and prepare every curry with stone-ground masalas and recipes passed down through generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-[#E8DED0]">
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-1.5">
                <Fish className="w-4 h-4 text-[#C26343]" />
                <span>Morning Harbor Catch</span>
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Surmai (Kingfish), Pomfret (Paplet), Mud Crabs, Tiger Prawns, and Bangda procured fresh every dawn from Malvan jetty.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C26343]" />
                <span>Pure Solkadhi Nectar</span>
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                First-extract hand-pressed coconut milk, steeped with wild purple kokum, crushed green chillies, and garlic to soothe the palate.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C26343]" />
                <span>Fluffy Malvani Vade</span>
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Fermented multigrain dough of rice, chana dal, urad dal, and fenugreek, fried to golden puffed perfection.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-[#C26343]" />
                <span>Separate Vegetarian Range</span>
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Tender Cashew Usal, stuffed Ukadiche Modak, Aluwadi, and seasonal Konkani greens prepared in a dedicated cookware setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENU CATEGORIES & DISH CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-1">
              Curated Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              Specialties from Our Coastal Kitchen
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl font-light">
              Every dish is made to order using fresh local ingredients. Enquire on WhatsApp for customized spice levels or catch availability.
            </p>
          </div>

          {/* Filter Segmented Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { id: 'all', label: 'All Specialties' },
              { id: 'seafood', label: 'Seafood & Thalis' },
              { id: 'veg', label: 'Pure Vegetarian' },
              { id: 'specials', label: "Chef's Signatures" },
            ].map((f) => {
              const isSelected = selectedFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFilter(f.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1F33] text-white shadow-xs font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Dish Photography */}
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {item.isChefSpecial && (
                    <span className="absolute top-3 left-3 bg-[#C26343] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                      Chef's Signature
                    </span>
                  )}

                  <span
                    className={`absolute bottom-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-md backdrop-blur-md ${
                      item.isVeg
                        ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950/70 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.isVeg ? '● Pure Vegetarian' : '▲ Fresh Seafood / Poultry'}
                  </span>
                </div>

                {/* Dish Information */}
                <div className="p-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#C26343] font-semibold">
                      {item.category}
                    </span>
                    <span className="font-serif font-bold text-base sm:text-lg text-[#0B1F33]">
                      {item.priceText}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#C26343] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                    `Hello Mykonos Cottage Kitchen, I would like to enquire about ordering the ${item.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-stone-50 hover:bg-emerald-50 active:bg-emerald-100 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Order / Enquire Dish on WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DINING AMBIENCE & PRIVATE BEACH TABLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1F33] text-white rounded-3xl p-8 sm:p-14 space-y-10 relative overflow-hidden">
          <div className="max-w-2xl space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">
              Shoreline Atmosphere
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
              Candlelight Seafood Dining Under the Stars
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Celebrate romantic anniversaries or memorable family gatherings right on Tarkarli Beach. Our team sets up private tables in the soft white sand with glowing lanterns, freshly grilled seafood, and the gentle sound of the Arabian Sea tides.
            </p>
          </div>

          {/* Kitchen Hours Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-4 border-t border-white/15 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl space-y-1 border border-white/10">
              <span className="text-amber-300 block font-semibold text-sm">Coastal Breakfast</span>
              <p className="text-stone-300 font-light">8:00 AM – 10:30 AM</p>
              <p className="text-[11px] text-stone-400">Complimentary for guests</p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl space-y-1 border border-white/10">
              <span className="text-amber-300 block font-semibold text-sm">Traditional Lunch</span>
              <p className="text-stone-300 font-light">12:30 PM – 3:30 PM</p>
              <p className="text-[11px] text-stone-400">Fresh thalis & catch</p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl space-y-1 border border-white/10">
              <span className="text-amber-300 block font-semibold text-sm">Sunset High Tea</span>
              <p className="text-stone-300 font-light">5:00 PM – 6:30 PM</p>
              <p className="text-[11px] text-stone-400">Masala chai & coastal bites</p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl space-y-1 border border-white/10">
              <span className="text-amber-300 block font-semibold text-sm">Beachside Dinner</span>
              <p className="text-stone-300 font-light">7:30 PM – 10:30 PM</p>
              <p className="text-[11px] text-stone-400">Candlelight setups by tide</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCAL INGREDIENTS & AUTHENTIC PREPARATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
              Farm & Ocean Sourced
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
              The Four Pillars of Malvani Flavor
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              We never use artificial food colors, preservatives, or packaged powders. Every dish relies on nature's finest coastal harvest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs sm:text-sm text-stone-700">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                1. Cold-Pressed Coconut Oil
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                Extracted from mature Konkan coconuts, giving our fish frys and curries their authentic nutty aroma and light texture.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                2. Sun-Dried Wild Kokum
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                Sourced from the Sahyadri foothills, sun-dried kokum rinds provide natural fruity sourness without harsh vinegar or artificial tamarind.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                3. Malvani 16-Spice Masala
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                Dry roasted in iron pans: Bedgi chillies, Tirphal, star anise, dagad phool, and whole coriander ground slowly to preserve essential oils.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                4. Hand-Pounded Rice Flour
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                Fragrant local Indrayani rice ground fresh for our delicate steamed Ukadiche Modak, light Ghavane crepes, and crispy bhakris.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL "PLAN YOUR STAY" & MEAL CONCIERGE CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0B1F33] via-[#122B45] to-[#1A3B5C] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
              Wake Up to Free Coastal Breakfast
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
              Ready to Feast on Authentic Konkani Cooking?
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto font-light leading-relaxed">
              Every cottage booking at Mykonos Cottage includes complimentary coastal breakfast. Contact our kitchen staff for private seafood beach setups or group menus.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => (onOpenBooking ? onOpenBooking() : undefined)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Cottage Stay</span>
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  'Hello Mykonos Cottage Kitchen, I would like to arrange special seafood dining / meal plan for our stay.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Kitchen on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
