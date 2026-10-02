import React, { useState, useMemo } from 'react';
import {
  Star,
  MessageCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Search,
  Sparkles,
  Users,
  Wifi,
  Car,
  Flame,
  Waves,
  Coffee,
  HelpCircle,
  Quote,
} from 'lucide-react';
import { Review, ResortSettings, FAQItem } from '../types/resort';
import { SEED_REVIEWS, SEED_FAQS } from '../data/seedData';

interface ReviewsFaqPageProps {
  reviews: Review[];
  settings: ResortSettings;
  onOpenBooking: () => void;
}

export const ReviewsFaqPage: React.FC<ReviewsFaqPageProps> = ({
  reviews: propReviews,
  settings,
  onOpenBooking,
}) => {
  const reviews = propReviews && propReviews.length > 0 ? propReviews : SEED_REVIEWS;
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  // Reviews state
  const [selectedReviewSource, setSelectedReviewSource] = useState<'All' | 'Google' | 'TripAdvisor' | 'Direct'>('All');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  // FAQ state
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    if (selectedReviewSource === 'All') return reviews;
    return reviews.filter((r) => r.source === selectedReviewSource);
  }, [reviews, selectedReviewSource]);

  const featuredReview = reviews.find((r) => r.isFeatured) || reviews[0];

  // Carousel handlers
  const handlePrevReview = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : filteredReviews.length - 1));
  };

  const handleNextReview = () => {
    setCarouselIndex((prev) => (prev < filteredReviews.length - 1 ? prev + 1 : 0));
  };

  const toggleReviewExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // FAQ filtering
  const faqCategories = [
    'All',
    'Booking & Stay',
    'Cottages & Amenities',
    'Location & Travel',
    'Food & Dining',
    'Activities & Scuba',
    'Policies & Guidelines',
  ];

  const filteredFaqs = useMemo(() => {
    return SEED_FAQS.filter((faq) => {
      const matchesCategory =
        selectedFaqCategory === 'All' || faq.category === selectedFaqCategory;
      const matchesSearch =
        faqSearchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedFaqCategory, faqSearchQuery]);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0B1F33] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background scrim texture */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Verified Reviews & Resort Helpdesk • Tarkarli Beach</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Guest Reflections & Comprehensive FAQ
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            Genuine experiences from travelers who made Mykonos Cottage their beachfront home in Malvan. Browse unvarnished reviews and find answers to all your stay and planning questions.
          </p>

          {/* Quick Rating Summary */}
          <div className="mt-10 pt-8 border-t border-white/15 max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-stone-200 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white text-base">4.9 / 5</span>
              <span className="text-stone-400">Average Rating</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Verified Stays</span>
            </div>

            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-amber-400 shrink-0" />
              <span>25m to Shoreline</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED GUEST REVIEW SPOTLIGHT */}
      {featuredReview && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF4EC] rounded-3xl p-8 sm:p-14 border border-[#E8DED0] relative overflow-hidden shadow-xs">
            <Quote className="w-20 h-20 text-[#E8DED0] absolute top-6 right-6 pointer-events-none -scale-x-100" />

            <div className="relative z-10 max-w-3xl space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#C26343] font-bold">
                  Featured Guest Story
                </span>
                <span className="text-stone-300">•</span>
                <span className="text-xs text-stone-500 font-medium">
                  {featuredReview.source} Review
                </span>
              </div>

              <div className="flex text-amber-500">
                {[...Array(featuredReview.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              <p className="font-serif text-lg sm:text-2xl text-[#0B1F33] italic leading-relaxed">
                "{featuredReview.comment}"
              </p>

              <div className="pt-2 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0B1F33] text-amber-300 font-serif font-bold text-lg flex items-center justify-center shrink-0">
                  {featuredReview.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    {featuredReview.author}
                  </h3>
                  <p className="text-xs text-stone-500 font-light">
                    Stayed at <strong className="font-semibold text-stone-700">{featuredReview.roomStayed}</strong> • {featuredReview.stayDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. REVIEWS GRID & SOURCE FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block mb-1">
              Guest Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
              What Our Visitors Love
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
              Feedback from couples, families, and adventure seekers who vacationed with us.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {(['All', 'Google', 'TripAdvisor', 'Direct'] as const).map((source) => (
              <button
                key={source}
                onClick={() => setSelectedReviewSource(source)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  selectedReviewSource === source
                    ? 'bg-[#0B1F33] text-white shadow-xs font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {source === 'All' ? 'All Reviews' : `${source}`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredReviews.map((rev) => {
            const isLong = rev.comment.length > 180;
            const isExpanded = expandedReviews[rev.id];
            const displayComment =
              isLong && !isExpanded
                ? `${rev.comment.slice(0, 180)}...`
                : rev.comment;

            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-stone-400 bg-stone-50 px-2.5 py-0.5 rounded-md border border-stone-100">
                      via {rev.source}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 italic leading-relaxed font-light">
                    "{displayComment}"
                  </p>

                  {isLong && (
                    <button
                      onClick={() => toggleReviewExpand(rev.id)}
                      className="text-xs font-semibold text-[#C26343] hover:underline cursor-pointer"
                    >
                      {isExpanded ? 'Show Less' : 'Read Full Review'}
                    </button>
                  )}
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-[#C26343] font-bold text-sm flex items-center justify-center shrink-0">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-xs sm:text-sm">
                      {rev.author}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-light">
                      {rev.roomStayed} • {rev.stayDate}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. COMPREHENSIVE FAQ EXPERIENCE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
            <HelpCircle className="w-4 h-4 text-[#C26343]" />
            <span>Instant Assistance</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
            Frequently Asked Questions
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Everything you need to know about cottage bookings, amenities, dining arrangements, scuba diving, and resort policies.
          </p>

          {/* FAQ Search Bar */}
          <div className="pt-4 max-w-lg mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search topics (e.g. Wi-Fi, Scuba, Parking, Breakfast)..."
                value={faqSearchQuery}
                onChange={(e) => setFaqSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-2xl text-xs sm:text-sm text-stone-900 shadow-2xs focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33] transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5 pointer-events-none" />
              {faqSearchQuery && (
                <button
                  onClick={() => setFaqSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="pt-3 flex items-center justify-center flex-wrap gap-2">
            {faqCategories.map((cat) => {
              const isSelected = selectedFaqCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0B1F33] text-white shadow-xs font-semibold'
                      : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expandable Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 space-y-2">
              <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="font-serif font-bold text-stone-800">No matching questions found</p>
              <p className="text-xs text-stone-500 font-light">
                Try searching for something else or contact our front desk directly.
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-stone-900 cursor-pointer hover:bg-stone-50/80 transition-colors"
                  >
                    <span className="flex-1">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#C26343]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed bg-[#FAF7F2]/40 font-light animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 5. FINAL BOOKING & CONCIERGE CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0B1F33] via-[#122B45] to-[#1A3B5C] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
              Direct Reservation Advantage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
              Have Questions? We are Always Here to Help
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto font-light leading-relaxed">
              Book directly with our on-property team for guaranteed best tariffs, complimentary Malvani breakfast, and personalized adventure planning.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Cottage Dates</span>
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  'Hello Mykonos Cottage, I have a question regarding cottage stay and activities.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
