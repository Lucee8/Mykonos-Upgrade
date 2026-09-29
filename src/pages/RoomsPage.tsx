import React, { useState } from 'react';
import {
  Bed,
  Users,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  Eye,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';
import { Room, RoomCategory } from '../types/resort';

interface RoomsPageProps {
  rooms: Room[];
  onOpenBooking: (roomId?: string) => void;
  onSelectRoom: (slug: string) => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({
  rooms,
  onOpenBooking,
  onSelectRoom,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Beachfront', 'Wooden Cottage', 'Garden View', 'Family Suite'];

  const filteredRooms =
    selectedCategory === 'All'
      ? rooms
      : rooms.filter((r) => r.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#C26343]">
          Coastal Living
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#0B1F33]">
          Cottages & Beachfront Villas
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-light">
          Immerse yourself in barefoot coastal luxury. Every cottage at Mykonos Cottage features handcrafted architecture, cooling sea breezes, private verandas, and is located within 25–40 meters of Tarkarli Beach.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
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

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
          >
            {/* Image Banner */}
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
              <img
                src={room.heroImage}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {room.badge && (
                <span className="absolute top-4 left-4 bg-[#0B1F33]/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-md backdrop-blur-xs">
                  {room.badge}
                </span>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-bold block">
                    {room.category}
                  </span>
                  <p className="text-xs text-stone-200">{room.view}</p>
                </div>
                <button
                  onClick={() => onSelectRoom(room.slug)}
                  className="px-2.5 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Gallery ({room.gallery.length})</span>
                </button>
              </div>
            </div>

            {/* Room Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#C26343] transition-colors">
                    {room.name}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {room.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-xs text-stone-700 bg-stone-50/60 p-2.5 rounded-xl">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Capacity</span>
                    <span className="font-semibold">Max {room.maxGuests} Guests</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Bedding</span>
                    <span className="font-semibold">{room.bedType}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-semibold">Cottage Area</span>
                    <span className="font-semibold">{room.sizeSqFt} sq ft</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1.5">
                    Complimentary Inclusions
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
                    {room.inclusions.map((inc, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{inc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-2xl font-bold text-[#0B1F33]">
                      ₹{room.basePrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-500">/ weekday night</span>
                  </div>
                  <span className="text-[11px] text-stone-400 block">
                    Weekend rate: ₹{room.weekendPrice.toLocaleString('en-IN')} (Taxes included)
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectRoom(room.slug)}
                    className="px-4 py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onOpenBooking(room.id)}
                    className="px-5 py-2.5 bg-[#C26343] hover:bg-[#ad5437] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-amber-200" />
                    <span>Enquire / Book</span>
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
