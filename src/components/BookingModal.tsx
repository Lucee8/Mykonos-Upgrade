import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  MessageCircle,
  Tag,
  ShieldCheck,
  Bed,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Room, ResortSettings } from '../types/resort';
import { submitEnquiry } from '../services/resortService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  rooms: Room[];
  selectedRoomId?: string;
  settings: ResortSettings;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  rooms,
  selectedRoomId,
  settings,
}) => {
  // Dates
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const getDayAfterTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  };

  const [roomId, setRoomId] = useState<string>(selectedRoomId || (rooms[0]?.id ?? ''));
  const [checkIn, setCheckIn] = useState<string>(getTomorrow());
  const [checkOut, setCheckOut] = useState<string>(getDayAfterTomorrow());
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [guestName, setGuestName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('MYKONOS10');
  const [promoApplied, setPromoApplied] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedResult, setSubmittedResult] = useState<{ id: string; whatsappUrl: string } | null>(null);

  useEffect(() => {
    if (selectedRoomId) {
      setRoomId(selectedRoomId);
    } else if (rooms.length > 0 && !roomId) {
      setRoomId(rooms[0].id);
    }
  }, [selectedRoomId, rooms]);

  if (!isOpen) return null;

  const currentRoom = rooms.find((r) => r.id === roomId) || rooms[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  const calculatedNights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const basePricePerNight = currentRoom ? currentRoom.basePrice : 5000;
  const rawSubtotal = basePricePerNight * calculatedNights;
  const discountRate = promoApplied ? 0.10 : 0;
  const discountAmount = Math.round(rawSubtotal * discountRate);
  const finalEstimatedTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'MYKONOS10' || promoCode.trim().toUpperCase() === 'DIRECT15') {
      setPromoApplied(true);
    } else {
      setPromoApplied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !phone.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitEnquiry({
        guestName,
        phone,
        email,
        checkIn,
        checkOut,
        roomId: currentRoom ? currentRoom.id : 'any',
        roomName: currentRoom ? currentRoom.name : 'Beachfront Cottage',
        adults,
        children,
        specialRequests: `${specialRequests} ${promoApplied ? `(Promo: ${promoCode})` : ''}`.trim(),
        estimatedNights: calculatedNights,
        estimatedTotal: finalEstimatedTotal,
        source: 'web_form',
      });

      setSubmittedResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const cleanNumber = settings.whatsapp.replace(/\D/g, '');
    const msg = `🌊 *Cottage Booking Enquiry - Mykonos Tarkarli*
---------------------------------------
👤 *Guest:* ${guestName || 'Guest'}
📞 *Phone:* ${phone || 'Pending'}
🏡 *Cottage:* ${currentRoom?.name || 'Beachfront Cottage'}
📅 *Check-In:* ${checkIn}
📅 *Check-Out:* ${checkOut} (${calculatedNights} nights)
👥 *Guests:* ${adults} Adults${children > 0 ? `, ${children} Children` : ''}
💰 *Estimated Rate:* ₹${finalEstimatedTotal.toLocaleString('en-IN')}${promoApplied ? ' (10% Direct Discount applied)' : ''}
💬 *Special Notes:* ${specialRequests || 'Standard booking enquiry'}
---------------------------------------
Please confirm cottage availability and final booking confirmation.`;

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E8DED0] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B1F33] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-amber-300" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold">
                {submittedResult ? 'Booking Request Received' : 'Reserve Your Cottage'}
              </h2>
              <p className="text-xs text-stone-300">
                {submittedResult ? 'Reference Generated' : 'Direct Booking Concierge • Guaranteed Best Rates'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation Screen */}
        {submittedResult ? (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#0B1F33]">
                Thank You, {guestName}!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Your cottage enquiry has been logged in our reservation system. To guarantee your dates immediately, click below to open your reservation on WhatsApp.
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left text-xs sm:text-sm space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-stone-500">Booking Reference:</span>
                <span className="font-mono font-bold text-[#0B1F33]">{submittedResult.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Cottage:</span>
                <span className="font-semibold text-stone-800">{currentRoom?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Dates:</span>
                <span className="font-medium text-stone-700">{checkIn} to {checkOut} ({calculatedNights} nights)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Total:</span>
                <span className="font-bold text-[#C26343]">₹{finalEstimatedTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={submittedResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Open in WhatsApp Concierge</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 border border-stone-300 text-stone-700 hover:bg-stone-100 rounded-xl font-medium text-sm transition-colors cursor-pointer"
              >
                Done / Back to Website
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
            {/* Room selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                Select Cottage / Villa
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {rooms.map((room) => {
                  const isSelected = room.id === roomId;
                  return (
                    <button
                      type="button"
                      key={room.id}
                      onClick={() => setRoomId(room.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex gap-3 items-center ${
                        isSelected
                          ? 'border-[#0B1F33] bg-[#E8DED0]/40 ring-1 ring-[#0B1F33]'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={room.heroImage}
                        alt={room.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-serif text-sm font-bold text-stone-900 truncate">
                            {room.name}
                          </p>
                        </div>
                        <p className="text-xs text-stone-500">{room.category} • Max {room.maxGuests} guests</p>
                        <p className="text-xs font-semibold text-[#C26343] mt-0.5">
                          ₹{room.basePrice.toLocaleString('en-IN')} <span className="text-[10px] text-stone-500 font-normal">/ night</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dates row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Check-In Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  />
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Check-Out Date ({calculatedNights} {calculatedNights === 1 ? 'Night' : 'Nights'})
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={checkIn}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  />
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Guests count */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Adults (12+ yrs)
                </label>
                <div className="relative">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Children (Below 12)
                </label>
                <select
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? 'No Children' : `${n} Child${n > 1 ? 'ren' : ''}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest contact info */}
            <div className="space-y-3 pt-1 border-t border-stone-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samiksha K."
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98234 56789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Special Requests / Arrival Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Early check-in requested, interested in Scuba diving session, seafood dietary preferences"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                />
              </div>
            </div>

            {/* Promo Code & Rate calculation */}
            <div className="bg-[#FAF4EC] border border-[#E8DED0] rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-stone-700">
                  <Tag className="w-3.5 h-3.5 text-[#C26343]" />
                  Promo Code:
                </span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-28 px-2 py-1 text-xs uppercase bg-white border border-stone-300 rounded font-mono font-semibold"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-2.5 py-1 text-xs bg-[#0B1F33] text-white rounded font-medium cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200/80 space-y-1 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>
                    ₹{basePricePerNight.toLocaleString('en-IN')} × {calculatedNights} night{calculatedNights > 1 ? 's' : ''}:
                  </span>
                  <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Direct Booking Discount (10%):
                    </span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-1 border-t border-stone-200 font-bold text-sm text-stone-900">
                  <span>Estimated Total (Taxes incl.):</span>
                  <span className="text-base text-[#C26343]">₹{finalEstimatedTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-start gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>No immediate payment required.</strong> Our reservation manager verifies date availability and locks in your cottage directly with zero booking fee.
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 bg-[#0B1F33] hover:bg-[#1A3B5C] active:bg-[#071321] text-white font-medium text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                )}
                <span>{isSubmitting ? 'Sending Request...' : 'Send Booking Enquiry'}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInstant}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
