import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';

import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { DiningPage } from './pages/DiningPage';
import { GalleryPage } from './pages/GalleryPage';
import { OffersPage } from './pages/OffersPage';
import { LocationAboutPage } from './pages/LocationAboutPage';

import {
  getRooms,
  getExperiences,
  getDiningItems,
  getGalleryItems,
  getOffers,
  getReviews,
  getResortSettings,
} from './services/resortService';

import {
  Room,
  Experience,
  DiningItem,
  GalleryItem,
  SpecialOffer,
  Review,
  ResortSettings,
} from './types/resort';
import { DEFAULT_SETTINGS } from './data/seedData';
import { auth, ADMIN_EMAIL } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { MessageCircle, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedRoomSlug, setSelectedRoomSlug] = useState<string | null>(null);

  // Modals
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedBookingRoomId, setSelectedBookingRoomId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Data
  const [settings, setSettings] = useState<ResortSettings>(DEFAULT_SETTINGS);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [diningItems, setDiningItems] = useState<DiningItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [
        loadedSettings,
        loadedRooms,
        loadedExp,
        loadedDining,
        loadedGallery,
        loadedOffers,
        loadedReviews,
      ] = await Promise.all([
        getResortSettings(),
        getRooms(),
        getExperiences(),
        getDiningItems(),
        getGalleryItems(),
        getOffers(),
        getReviews(),
      ]);

      setSettings(loadedSettings);
      setRooms(loadedRooms);
      setExperiences(loadedExp);
      setDiningItems(loadedDining);
      setGalleryItems(loadedGallery);
      setOffers(loadedOffers);
      setReviews(loadedReviews);
    } catch (err) {
      console.error('Error fetching resort data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const checkAdminState = () => {
      const hasSession = typeof window !== 'undefined' && sessionStorage.getItem('mykonos_admin_session') === 'true';
      if (hasSession) {
        setIsAdminLoggedIn(true);
      }
    };
    checkAdminState();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const hasSession = typeof window !== 'undefined' && sessionStorage.getItem('mykonos_admin_session') === 'true';
      setIsAdminLoggedIn(!!user || hasSession);
    });

    return () => unsubscribe();
  }, []);

  const handleNavigate = (tab: string, slug?: string) => {
    setActiveTab(tab);
    if (slug) {
      setSelectedRoomSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRoom = (slug: string) => {
    setSelectedRoomSlug(slug);
    setActiveTab('room-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (roomId?: string) => {
    setSelectedBookingRoomId(roomId);
    setIsBookingOpen(true);
  };

  const selectedRoom = rooms.find(
    (r) => r.slug === selectedRoomSlug || r.id === selectedRoomSlug
  );

  const cleanWhatsapp = settings.whatsapp.replace(/\D/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation Bar */}
      <Navbar
        settings={settings}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            settings={settings}
            rooms={rooms}
            experiences={experiences}
            diningItems={diningItems}
            offers={offers}
            reviews={reviews}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
            onSelectRoom={handleSelectRoom}
          />
        )}

        {activeTab === 'rooms' && (
          <RoomsPage
            rooms={rooms}
            onOpenBooking={handleOpenBooking}
            onSelectRoom={handleSelectRoom}
          />
        )}

        {activeTab === 'room-detail' && selectedRoom && (
          <RoomDetailPage
            room={selectedRoom}
            settings={settings}
            onBack={() => handleNavigate('rooms')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'experiences' && (
          <ExperiencesPage
            experiences={experiences}
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {activeTab === 'dining' && (
          <DiningPage diningItems={diningItems} settings={settings} />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage galleryItems={galleryItems} />
        )}

        {activeTab === 'offers' && (
          <OffersPage offers={offers} onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'location' && (
          <LocationAboutPage
            settings={settings}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        settings={settings}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Desktop Floating WhatsApp Quick Trigger */}
      <a
        href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Mykonos Cottage Tarkarli, I would like to enquire about room availability and packages.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="hidden sm:flex fixed bottom-6 right-6 z-30 w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 bg-[#0B1F33] text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          WhatsApp Concierge
        </span>
      </a>

      {/* Booking / Enquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        rooms={rooms}
        selectedRoomId={selectedBookingRoomId}
        settings={settings}
      />

      {/* Staff & Admin Panel Modal */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        settings={settings}
        onRefreshData={loadData}
      />
    </div>
  );
}
