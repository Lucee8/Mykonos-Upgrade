import React, { useState } from 'react';
import {
  Compass,
  Clock,
  MapPin,
  CheckCircle,
  MessageCircle,
  Sparkles,
  Waves,
  ShieldCheck,
  Calendar,
  Anchor,
  Sun,
  Camera,
  Check,
  ArrowRight,
  Phone,
  HelpCircle,
  Info,
  ChevronRight,
} from 'lucide-react';
import { Experience, ResortSettings } from '../types/resort';

interface ExperiencesPageProps {
  experiences: Experience[];
  settings: ResortSettings;
  onOpenBooking: (roomId?: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  experiences,
  settings,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');

  const categories = ['All', 'Watersports', 'Heritage', 'Nature'];

  const filteredExperiences =
    selectedCategory === 'All'
      ? experiences
      : experiences.filter((e) => e.category === selectedCategory);

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B1F33] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background scrim texture */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-6">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Coastal Expeditions • Sindhudurg & Tarkarli</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Pristine Scuba Diving, Sea Fortresses & Dolphin Safaris
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            Immerse yourself in the jewel of Maharashtra’s Konkan coastline. Our front-desk concierge coordinates licensed PADI-certified scuba diving, 17th-century island fortress explorations, wild dolphin cruises, and thrilling water sports with verified local divemasters.
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center justify-center gap-2">
              <Anchor className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Certified Dive Instructors</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Camera className="w-4 h-4 text-amber-400 shrink-0" />
              <span>HD Underwater Video Included</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Resort Transfer Assistance</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Zero Booking Markup</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED SCUBA DIVING SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Image Spotlight */}
            <div className="lg:col-span-6 relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-stone-900">
              <img
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85"
                alt="Scuba Diving in Tarkarli Coral Reefs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F33]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                  Underwater Maharashtra
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold">
                  Sindhudurg Fort Outer Reefs
                </p>
                <p className="text-xs text-stone-200 font-light">
                  Water clarity up to 20 feet • Colorful brain corals & tropical fish
                </p>
              </div>
            </div>

            {/* Right Information & Certification Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
                  <Waves className="w-4 h-4 text-[#C26343]" />
                  <span>The Scuba Capital of Konkan</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1F33] leading-tight">
                  Tarkarli Certified Scuba Diving
                </h2>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                  Tarkarli is celebrated as Maharashtra’s only coastal destination with coral gardens and crystal-clear underwater visibility. Even if you have never swum or dived before, our tandem introductory dives pair you one-on-one with certified PADI divemasters.
                </p>

                {/* Scuba Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">No Swimming Required</strong>
                      <span className="text-stone-500 font-light text-[11px]">Tandem 1:1 instructor accompaniment</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">HD Underwater Video</strong>
                      <span className="text-stone-500 font-light text-[11px]">GoPro footage delivered to your phone</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Sanitized Modern Gear</strong>
                      <span className="text-stone-500 font-light text-[11px]">O2 cylinders, regulators, wetsuits</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-900 block font-semibold">Shallow Water Briefing</strong>
                      <span className="text-stone-500 font-light text-[11px]">Breathing practice before boat launch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scuba CTAs */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                    'Hello Mykonos Cottage, I want to book Scuba Diving in Tarkarli. Please share rates, video details, and slot timings.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Reserve Scuba on WhatsApp</span>
                </a>

                <button
                  onClick={() => onOpenBooking()}
                  className="px-6 py-3 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-300" />
                  <span>Book Stay + Scuba Combo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTERS & FULL EXPERIENCES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-1">
              Curated Itineraries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              All Coastal Adventures & Safaris
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl font-light">
              Choose from marine sports, historic naval sea forts, dolphin cruises, and serene Karli river backwater lagoons.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1F33] text-white shadow-xs font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {cat === 'All' ? 'All Adventures' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Cards Stack */}
        <div className="space-y-10">
          {filteredExperiences.map((exp, idx) => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 group"
            >
              {/* Image Banner */}
              <div
                className={`lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900 ${
                  idx % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <span className="absolute top-4 left-4 bg-[#0B1F33]/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-md">
                  {exp.category}
                </span>

                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Content Column */}
              <div
                className={`lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 ${
                  idx % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-[#C26343] font-semibold block">
                      {exp.category} Expedition
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33] group-hover:text-[#C26343] transition-colors">
                      {exp.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {exp.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-stone-400 block">
                      What to Expect & Inclusions
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      {exp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-light">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Meta & Direct Action */}
                <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-stone-800">{exp.duration}</span>
                    </div>
                    <span className="text-stone-300">|</span>
                    <div className="font-serif font-bold text-base sm:text-lg text-[#0B1F33]">
                      {exp.priceText}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                        `Hello Mykonos Cottage, I would like to book the ${exp.title} during my visit. Please confirm timings and pricing.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onOpenBooking()}
                      className="px-4 py-2.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SINDHUDURG FORT & DOLPHIN SAFARI HERITAGE STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Sindhudurg Fort Maritime History */}
          <div className="bg-[#FAF4EC] rounded-3xl p-8 sm:p-10 border border-[#E8DED0] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block">
                17th-Century Maritime Citadel
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F33]">
                The Legend of Sindhudurg Sea Fort
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                Commissioned by Chhatrapati Shivaji Maharaj in 1664, Sindhudurg Fort spans 48 acres across rocky Kurte Island. Over 70,000 kilograms of molten lead was poured into its foundation to withstand crashing Arabian Sea monsoons. Explore hidden sea gates, ancient sweet water wells surrounded by ocean waves, and panoramic ramparts overlooking the horizon.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0B1F33]">
              <MapPin className="w-4 h-4 text-[#C26343]" />
              <span>10-minute boat ride from Malvan jetty</span>
            </div>
          </div>

          {/* Card 2: Devbagh Sangam & Wild Dolphins */}
          <div className="bg-[#FAF4EC] rounded-3xl p-8 sm:p-10 border border-[#E8DED0] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block">
                Karli River & Arabian Confluence
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#0B1F33]">
                Devbagh Sangam Wild Dolphin Spotting
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
                At Devbagh, the emerald waters of Karli River merge into the azure Arabian Sea. Take an early morning 7:00 AM wooden fishing boat safari through mangrove corridors. Watch pods of wild Indo-Pacific humpback dolphins gracefully roll and leap in the sunrise tide, untouched by commercial sea crowds.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0B1F33]">
              <Clock className="w-4 h-4 text-[#C26343]" />
              <span>Best sighting window: 6:45 AM – 8:30 AM</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GUEST ADVICE & PREPARATION GUIDELINES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
              Guest Travel Advice
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
              Tips for Your Coastal Adventures
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              Simple preparation guidelines to make your scuba, boating, and island tours seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-700">
            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Best Diving Season</span>
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                Water visibility in Tarkarli is at its best from <strong>October through May</strong>, with calm sea conditions and tropical underwater clarity.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>What to Wear & Bring</span>
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                Carry comfortable swimwear, quick-dry shorts, reef-safe sunscreen, sunglasses, and an extra change of clothes. Beach towels are provided by the resort.
              </p>
            </div>

            <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200/70 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#0B1F33] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C26343]" />
                <span>Advance Front-Desk Slots</span>
              </h4>
              <p className="text-stone-600 font-light leading-relaxed">
                During peak holiday weekends, scuba slots fill up quickly. Inform our front-desk concierge a day in advance to lock in preferred morning dive slots.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CONVERSION CTA BANNER */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0B1F33] via-[#122B45] to-[#1A3B5C] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
              Direct Adventure Concierge
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
              Ready to Explore the Wonders of Tarkarli?
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto font-light leading-relaxed">
              Combine your stay at Mykonos Cottage with certified scuba diving, dolphin cruises, and island tours for an unforgettable Konkan escape.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Cottage Stay</span>
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  'Hello Mykonos Cottage, I want to plan our Tarkarli holiday with scuba diving and dolphin safari. Please guide me.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Plan Itinerary on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
