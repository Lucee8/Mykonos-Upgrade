import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Camera,
  Calendar,
  MessageCircle,
  Waves,
  Sun,
  Utensils,
  Anchor,
  Sparkles,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { GalleryItem, ResortSettings } from '../types/resort';
import { SEED_GALLERY } from '../data/seedData';

interface GalleryPageProps {
  galleryItems: GalleryItem[];
  settings?: ResortSettings;
  onOpenBooking?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  galleryItems,
  settings,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const cleanWhatsapp = settings?.whatsapp?.replace(/\D/g, '') || '919823456789';

  const rawItems = galleryItems && galleryItems.length > 0 ? galleryItems : SEED_GALLERY;

  const categories = [
    'All',
    'Resort',
    'Cottages',
    'Rooms',
    'Beach',
    'Dining',
    'Scuba',
    'Experiences',
    'Tarkarli',
  ];

  // Flexible category matcher that supports both modern and legacy categories seamlessly
  const matchesCategory = (item: GalleryItem, cat: string): boolean => {
    if (cat === 'All') return true;
    const itemCat = (item.category || '').toLowerCase();
    const itemTitle = (item.title || '').toLowerCase();
    const target = cat.toLowerCase();

    if (target === 'resort') {
      return itemCat.includes('resort') || itemCat.includes('stay') || itemTitle.includes('resort') || itemTitle.includes('cottage');
    }
    if (target === 'cottages') {
      return itemCat.includes('cottage') || itemTitle.includes('cottage') || itemTitle.includes('villa');
    }
    if (target === 'rooms') {
      return itemCat.includes('room') || itemTitle.includes('room') || itemTitle.includes('suite') || itemTitle.includes('bedroom');
    }
    if (target === 'beach') {
      return itemCat.includes('beach') || itemCat.includes('sunset') || itemTitle.includes('shoreline') || itemTitle.includes('beach') || itemTitle.includes('sunset');
    }
    if (target === 'dining') {
      return itemCat.includes('dining') || itemTitle.includes('thali') || itemTitle.includes('dinner') || itemTitle.includes('food');
    }
    if (target === 'scuba') {
      return itemCat.includes('scuba') || itemTitle.includes('scuba') || itemTitle.includes('diving') || itemTitle.includes('reef') || itemTitle.includes('coral');
    }
    if (target === 'experiences') {
      return itemCat.includes('adventure') || itemCat.includes('experience') || itemTitle.includes('parasailing') || itemTitle.includes('dolphin') || itemTitle.includes('safari');
    }
    if (target === 'tarkarli') {
      return itemCat.includes('tarkarli') || itemTitle.includes('tarkarli') || itemTitle.includes('sindhudurg') || itemTitle.includes('fort') || itemTitle.includes('malvan');
    }

    return itemCat === target;
  };

  const filteredItems = rawItems.filter((item) => matchesCategory(item, selectedCategory));

  // Lightbox Navigation
  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0));
    }
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : 0));
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* 1. EDITORIAL GALLERY HERO */}
      <section className="relative bg-[#0B1F33] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background scrim texture */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-6">
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Photography • Tarkarli Beach, Malvan</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Visual Moments of Shoreline Serenity
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            A visual journey into life at Mykonos Cottage. From sun-drenched wooden decks and turquoise scuba waters to candlelit seafood banquets by the Arabian Sea surf.
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center justify-center gap-2">
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Authentic Property Shots</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Waves className="w-4 h-4 text-amber-400 shrink-0" />
              <span>25m to Arabian Surf</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Anchor className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sindhudurg Reef Diving</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Utensils className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Beachfront Malvani Dining</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS & EDITORIAL MASONRY GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5">
          {categories.map((cat) => {
            const count = rawItems.filter((i) => matchesCategory(i, cat)).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0B1F33] text-white shadow-sm font-semibold'
                    : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                <span>{cat === 'All' ? 'All Photographs' : cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Count & Description */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-200/80 pb-3">
          <span>
            Showing <strong className="text-stone-900 font-semibold">{filteredItems.length}</strong> photograph{filteredItems.length === 1 ? '' : 's'}
          </span>
          <span className="hidden sm:inline text-stone-400">
            Click any image to view in high resolution
          </span>
        </div>

        {/* Masonry / Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            const isFeatured = item.featured && (idx === 0 || idx === 3);

            return (
              <div
                key={item.id || idx}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative rounded-3xl overflow-hidden bg-stone-100 shadow-xs hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2 aspect-[16/10]' : 'aspect-[4/3]'
                }`}
              >
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Scrim on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white" />

                {/* Top Category Badge */}
                <span className="absolute top-4 left-4 bg-[#0B1F33]/85 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-md opacity-90 group-hover:opacity-100 transition-opacity shadow-xs">
                  {item.category}
                </span>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-1">
                  <h3 className="font-serif font-bold text-lg sm:text-xl drop-shadow-sm">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click for fullscreen view</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL VIEWER */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={() => setLightboxIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar: Title & Controls */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl flex items-center justify-between text-white pb-3 border-b border-white/15 z-10"
          >
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                {filteredItems[lightboxIndex].category}
              </span>
              <h2 className="font-serif text-base sm:text-xl font-bold truncate max-w-md sm:max-w-xl">
                {filteredItems[lightboxIndex].title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-400 font-medium">
                {lightboxIndex + 1} of {filteredItems.length}
              </span>
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close fullscreen view"
                className="p-2.5 text-stone-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Image and Next/Prev Arrows */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden"
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous photograph"
              className="absolute left-2 sm:left-4 z-20 p-3 sm:p-4 text-white bg-black/50 hover:bg-black/80 rounded-full transition-all cursor-pointer backdrop-blur-xs border border-white/10 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Display Image */}
            <div className="max-h-[75vh] max-w-full flex items-center justify-center">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300 select-none"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next photograph"
              className="absolute right-2 sm:right-4 z-20 p-3 sm:p-4 text-white bg-black/50 hover:bg-black/80 rounded-full transition-all cursor-pointer backdrop-blur-xs border border-white/10 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Action CTAs */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto flex items-center justify-center gap-3 pt-2 z-10"
          >
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                `Hello Mykonos Cottage, I was looking at your gallery photo '${filteredItems[lightboxIndex].title}' and would like to enquire about visiting / booking.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>

            {onOpenBooking && (
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  onOpenBooking();
                }}
                className="px-5 py-2.5 bg-[#C26343] hover:bg-[#A84E31] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Stay</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. FINAL BOOKING & CONCIERGE CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0B1F33] via-[#122B45] to-[#1A3B5C] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
              Step Into The Picture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
              Experience Tarkarli's Golden Shore in Person
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto font-light leading-relaxed">
              Every photograph is a genuine glimpse of our beachfront cottages, serene coconut grove, and Arabian Sea sunsets. Reserve your dates directly for guaranteed best rates.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => (onOpenBooking ? onOpenBooking() : undefined)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Your Cottage</span>
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  'Hello Mykonos Cottage, I viewed your photo gallery and would like to check cottage availability and rates.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
