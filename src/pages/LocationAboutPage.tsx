import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Car,
  Plane,
  Train,
  ShieldCheck,
  Compass,
  ArrowUpRight,
  Sun,
  Waves,
  Anchor,
  Sparkles,
  Heart,
  Calendar,
  CheckCircle2,
  TreePine,
  Fish,
  Building,
} from 'lucide-react';
import { ResortSettings } from '../types/resort';

interface LocationAboutPageProps {
  settings: ResortSettings;
  onOpenBooking: () => void;
}

export const LocationAboutPage: React.FC<LocationAboutPageProps> = ({
  settings,
  onOpenBooking,
}) => {
  const cleanPhone = settings.phone.replace(/[^\d+]/g, '');
  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* 1. EDITORIAL STORY HERO */}
      <section className="relative bg-[#0B1F33] text-white py-20 lg:py-28 overflow-hidden">
        {/* Subtle background scrim texture */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(#D4A373_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-[0.2em] uppercase text-amber-300 mb-6">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Our Heritage & Ethos • Mykonos Cottage Tarkarli</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            A Barefoot Coastal Sanctuary on Tarkarli’s Golden Shore
          </h1>

          <p className="mt-6 text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed font-light">
            Where the calming rhythm of the Arabian Sea meets handcrafted Konkan timber architecture, whispering coconut groves, and genuine Malvani coastal hospitality.
          </p>

          {/* Quick Trust Highlights */}
          <div className="mt-12 pt-8 border-t border-white/15 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-stone-200">
            <div className="flex items-center justify-center gap-2">
              <Waves className="w-4 h-4 text-amber-400 shrink-0" />
              <span>25m to Arabian Surf</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <TreePine className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Handcrafted Timber Cottages</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Fish className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Local Malvani Heritage</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Direct Concierge Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE RESORT STORY & PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
              <span className="w-6 h-px bg-[#C26343]" />
              <span>The Sanctuary Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F33] leading-tight">
              Rooted in Nature, Designed for Unhurried Peace
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Founded with an uncompromising respect for the natural environment of Malvan, Mykonos Cottage was created as a peaceful antidote to crowded hotel chains. Here, you wake not to traffic or loudspeakers, but to the gentle rolling of morning waves and birdsong from the palm canopy.
            </p>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Our architecture honors Konkan traditions: seasoned teak and pine timber, sloping laterite-tiled roofs that deflect the summer sun, and expansive private verandas designed to catch the continuous sea breezes. Every cottage is equipped with silent inverter air-conditioning, premium cotton linen, and open-air tropical bathrooms.
            </p>

            {/* Core Values 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="space-y-1">
                <span className="font-serif font-bold text-stone-900 text-base flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-[#C26343]" />
                  <span>Barefoot Simplicity</span>
                </span>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Step straight from your private porch into the white sands without crossing roads or commercial stalls.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif font-bold text-stone-900 text-base flex items-center gap-1.5">
                  <Fish className="w-4 h-4 text-[#C26343]" />
                  <span>Soulful Malvani Food</span>
                </span>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Local home-style cooking prepared with morning catches from Malvan harbor and organic cold-pressed coconut oil.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif font-bold text-stone-900 text-base flex items-center gap-1.5">
                  <Anchor className="w-4 h-4 text-[#C26343]" />
                  <span>Curated Adventures</span>
                </span>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Partnerships with verified PADI divemasters, licensed dolphin boat operators, and local heritage guides.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-serif font-bold text-stone-900 text-base flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#C26343]" />
                  <span>Konkani Warmth</span>
                </span>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  Personal, attentive hospitality from native Malvani staff dedicated to making your holiday memorable.
                </p>
              </div>
            </div>
          </div>

          {/* Layered Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80"
                alt="Mykonos Cottage Wooden Architecture"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block">
                  Artisanal Architecture
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold">
                  Seasoned Timber & Konkan Laterite
                </p>
              </div>
            </div>

            {/* Overlapping Shoreline Card */}
            <div className="absolute -bottom-8 -left-6 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xl max-w-xs hidden sm:flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#C26343] flex items-center justify-center shrink-0">
                <Waves className="w-6 h-6" />
              </div>
              <div>
                <p className="font-serif font-bold text-stone-900 text-sm">25m to Shoreline</p>
                <p className="text-[11px] text-stone-500 font-light">Direct private path onto Tarkarli white sands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE TARKARLI STORY: JEWEL OF THE KONKAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF4EC] rounded-3xl p-8 sm:p-14 border border-[#E8DED0] space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block">
              Destination Spotlight
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F33] leading-tight">
              The Legend & Serenity of Tarkarli
            </h2>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Tucked away along the southern coast of Maharashtra in Sindhudurg district, Tarkarli has long captivated travelers seeking pure, uncommercialized coastal beauty. Here is what makes this corner of the Konkan coast truly singular:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-[#E8DED0]">
            {/* Story Card 1 */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Waves className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1F33]">
                Pristine White Sands & Coral Waters
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Unlike the muddy brown beaches found further north, Tarkarli boasts powdery white sand and emerald-clear water with underwater visibility reaching up to 20 feet during season. It remains Maharashtra’s premier scuba diving and snorkeling destination.
              </p>
            </div>

            {/* Story Card 2 */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1F33]">
                Sindhudurg Sea Fort (1664)
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Constructed by Chhatrapati Shivaji Maharaj on Kurte Island, this 48-acre naval citadel is an engineering triumph. Over 70,000 kg of molten lead holds its massive 3-kilometer perimeter sea wall against fierce Arabian tides, standing as an enduring symbol of Maratha maritime prowess.
              </p>
            </div>

            {/* Story Card 3 */}
            <div className="space-y-3 bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Fish className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#0B1F33]">
                Devbagh Sangam & Wild Dolphins
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Just 4 km south of our cottages lies Devbagh Sangam, where the serene Karli River embraces the Arabian Sea. Early morning boat rides through mangrove backwaters offer enchanting encounters with pods of wild Indo-Pacific humpback dolphins playing in the sunrise surf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NEARBY ATTRACTIONS GUIDE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
            Explore Sindhudurg
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1F33]">
            Curated Nearby Attractions
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-light">
            All key coastal sights, forts, and activities are conveniently located within minutes of Mykonos Cottage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C26343]">Direct Access</span>
              <span className="text-xs font-semibold text-stone-400">25 meters</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Tarkarli Beach Shoreline</h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Step directly from your cottage onto warm sand. Ideal for morning yoga, evening sunset walks, and safe swimming in calm waters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C26343]">Naval Heritage</span>
              <span className="text-xs font-semibold text-stone-400">6 km + Ferry</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Sindhudurg Fort (Kurte Island)</h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              17th-century fortress reachable by scenic ferry from Malvan jetty. Explore ancient bastions, freshwater wells, and hidden escape routes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C26343]">Watersports</span>
              <span className="text-xs font-semibold text-stone-400">4.5 km</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Devbagh Sangam & Tsunami Island</h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Where Karli river meets the sea. Hub for parasailing, jet skis, banana boats, and wild dolphin spotting cruises at dawn.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C26343]">Sunset Spot</span>
              <span className="text-xs font-semibold text-stone-400">7 km</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Rock Garden Malvan</h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Manicured floral garden overlooking dramatic granite rocks and crashing Arabian Sea surf near Arse Mahal. Spectacular sunset views.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C26343]">Culinary & Culture</span>
              <span className="text-xs font-semibold text-stone-400">6 km</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Malvan Harbor & Fish Jetty</h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Witness the energetic afternoon fish auction as colorful trawlers return with fresh Surmai, pomfret, and crabs. Authentic local street shops.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C26343]">Historic Backwaters</span>
              <span className="text-xs font-semibold text-stone-400">5.5 km</span>
            </div>
            <h3 className="font-serif font-bold text-lg text-stone-900">Padmagad & Sarjekot Port</h3>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Historic shipbuilding base of Shivaji Maharaj's navy, situated on an inlet between coconut groves and coastal estuarine streams.
            </p>
          </div>
        </div>
      </section>

      {/* 5. LOCATION, DIRECTIONS & GOOGLE MAPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Address & Travel Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343] block">
                Find Your Way
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0B1F33]">
                Resort Address & Directions
              </h2>
            </div>

            {/* Address Card */}
            <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C26343] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-stone-900 text-sm">{settings.resortName}</p>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {settings.address}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl transition-all shadow-xs inline-flex items-center gap-1.5"
                >
                  <span>Open Google Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`tel:${cleanPhone}`}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-all inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-600" />
                  <span>Call: {settings.phone}</span>
                </a>
              </div>
            </div>

            {/* Transit Options */}
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-stone-900 text-xs flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#C26343]" />
                  <span>Sindhudurg Chipi Airport (SDW) – 22 km</span>
                </span>
                <p className="text-xs text-stone-500 font-light pl-6">
                  Direct flights from Mumbai. Taxi travel time is approx 35 minutes to our front desk.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-stone-900 text-xs flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#C26343]" />
                  <span>Goa MOPA International Airport (GOX) – 85 km</span>
                </span>
                <p className="text-xs text-stone-500 font-light pl-6">
                  Approx 2 hours smooth drive via NH66 highway. Pre-arranged airport cabs available.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-stone-900 text-xs flex items-center gap-2">
                  <Train className="w-4 h-4 text-[#0B1F33]" />
                  <span>Kudal Railway Station (Konkan Railway) – 35 km</span>
                </span>
                <p className="text-xs text-stone-500 font-light pl-6">
                  Connected with direct Konkan Kanya, Tejas, and Jan Shatabdi expresses from Mumbai & Pune (~45 mins taxi).
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200/80 shadow-2xs space-y-1">
                <span className="font-bold text-stone-900 text-xs flex items-center gap-2">
                  <Car className="w-4 h-4 text-emerald-700" />
                  <span>By Road from Mumbai (~510 km) & Pune (~390 km)</span>
                </span>
                <p className="text-xs text-stone-500 font-light pl-6">
                  Via NH66 or Pune-Kolhapur-Gaganbawda/Phonda Ghat with scenic Western Ghats views.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps Container */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md h-[480px] relative bg-stone-100">
              <iframe
                title="Google Maps Location of Mykonos Cottage Tarkarli"
                src={settings.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESORT GUIDELINES & POLICIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-12 border border-stone-200/80 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C26343]">
              Guest Transparency
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1F33]">
              Check-In Guidelines & Policies
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              Clear, transparent guidelines to ensure a serene holiday for every traveler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-700">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2 shadow-2xs">
              <p className="font-bold text-stone-900 text-sm">Check-In & Check-Out Timings</p>
              <p className="text-stone-600 text-xs leading-relaxed font-light">
                Check-in is at <strong>{settings.checkInTime}</strong> and Check-out is at <strong>{settings.checkOutTime}</strong>. Early check-in or late check-out is subject to cottage availability and can be coordinated with the front desk.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2 shadow-2xs">
              <p className="font-bold text-stone-900 text-sm">Cancellation & Rescheduling</p>
              <p className="text-stone-600 text-xs leading-relaxed font-light">
                {settings.cancellationPolicy}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2 shadow-2xs">
              <p className="font-bold text-stone-900 text-sm">Identity Verification</p>
              <p className="text-stone-600 text-xs leading-relaxed font-light">
                In compliance with government regulations, all adult guests must present valid government photo identification (Aadhaar, Passport, or Driving License) upon check-in.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-2 shadow-2xs">
              <p className="font-bold text-stone-900 text-sm">Child & Extra Bedding Policy</p>
              <p className="text-stone-600 text-xs leading-relaxed font-light">
                Children up to 5 years stay complimentary sharing existing bed setup. Extra mattresses and linen for older children or third adults are arranged upon request.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CONCIERGE & BOOKING CTA */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0B1F33] via-[#122B45] to-[#1A3B5C] rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block">
              Direct Reservation Advantage
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
              Begin Your Tarkarli Journey Today
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-lg mx-auto font-light leading-relaxed">
              Have questions about dates, driving directions, or private scuba arrangements? Contact our on-property concierge for personalized assistance.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C26343] hover:bg-[#A84E31] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-200" />
                <span>Reserve Cottage Stay</span>
              </button>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
                  'Hello Mykonos Cottage, I would like to get directions and plan our stay in Tarkarli.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Front Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
