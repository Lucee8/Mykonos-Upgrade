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
} from 'lucide-react';
import { Experience, ResortSettings } from '../types/resort';

interface ExperiencesPageProps {
  experiences: Experience[];
  settings: ResortSettings;
  onOpenBooking: () => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({
  experiences,
  settings,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  const categories = ['All', 'Watersports', 'Heritage', 'Nature'];

  const filteredExperiences =
    selectedCategory === 'All'
      ? experiences
      : experiences.filter((e) => e.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
          Adventures in Sindhudurg
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1F33]">
          Scuba Diving & Coastal Experiences
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
          From exploring marine coral beds under the historic walls of Sindhudurg Fort to spotting wild dolphins at Devbagh Sangam, our concierge arranges verified, safe, and licensed coastal activities with zero hassle.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0B1F33] text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Experiences List */}
      <div className="space-y-8">
        {filteredExperiences.map((exp, idx) => (
          <div
            key={exp.id}
            className={`bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 gap-0 ${
              idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
          >
            {/* Image Column */}
            <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-900">
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-[#0B1F33]/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-xs">
                {exp.category}
              </span>
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{exp.location}</span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
                    {exp.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-400 block mb-2">
                    Key Highlights
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Meta & Booking */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 text-xs text-stone-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div className="font-bold text-stone-900 text-sm sm:text-base text-[#C26343]">
                    {exp.priceText}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(`Hello Mykonos Cottage, I would like to book the ${exp.title} experience.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={onOpenBooking}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Book Stay & Scuba
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
