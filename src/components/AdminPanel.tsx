import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Database,
  CheckCircle,
  AlertCircle,
  Calendar,
  MessageCircle,
  Phone,
  Bed,
  RefreshCw,
  LogOut,
  Sliders,
  DollarSign,
  Tag,
  Check,
  User,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Image as ImageIcon,
  Compass,
  Utensils,
  Percent,
  Settings,
  Sparkles,
  ExternalLink,
  LayoutDashboard,
  Star,
  Search,
  Eye,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, ADMIN_EMAIL, ADMIN_DEFAULT_PASSWORD } from '../firebase/config';
import {
  seedFirestoreDatabase,
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  getRooms,
  saveRoom,
  deleteRoom,
  getGalleryItems,
  saveGalleryItem,
  deleteGalleryItem,
  getExperiences,
  saveExperience,
  deleteExperience,
  getDiningItems,
  saveDiningItem,
  deleteDiningItem,
  getOffers,
  saveOffer,
  deleteOffer,
  getReviews,
  saveReview,
  deleteReview,
  getResortSettings,
  saveResortSettings,
  uploadMediaFile,
} from '../services/resortService';
import {
  Enquiry,
  Room,
  GalleryItem,
  Experience,
  DiningItem,
  SpecialOffer,
  Review,
  ResortSettings,
  RoomCategory,
  DiningCategory,
  ExperienceCategory,
} from '../types/resort';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ResortSettings;
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  settings: initialSettings,
  onRefreshData,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [emailInput, setEmailInput] = useState<string>(ADMIN_EMAIL);
  const [passwordInput, setPasswordInput] = useState<string>(ADMIN_DEFAULT_PASSWORD);
  const [authError, setAuthError] = useState<string>('');
  const [authSuccess, setAuthSuccess] = useState<string>('');
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');

  const isAuthorizedAdmin = (user: FirebaseUser | null): boolean => {
    if (!user || !user.email) return false;
    const email = user.email.toLowerCase();
    return email === ADMIN_EMAIL.toLowerCase() || email === 'samikshakoyande5@gmail.com';
  };

  const isUserLoggedIn = isAuthorizedAdmin(currentUser);

  // Admin tabs
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'enquiries' | 'rooms' | 'gallery' | 'experiences' | 'dining' | 'reviews' | 'offers' | 'homepage' | 'database'
  >('dashboard');

  // Data states
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [dining, setDining] = useState<DiningItem[]>([]);
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [settingsForm, setSettingsForm] = useState<ResortSettings>(initialSettings);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [enquirySearchQuery, setEnquirySearchQuery] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  // Editing Modals / Forms
  const [editingRoom, setEditingRoom] = useState<Partial<Room> | null>(null);
  const [editingGallery, setEditingGallery] = useState<Partial<GalleryItem> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [editingDish, setEditingDish] = useState<Partial<DiningItem> | null>(null);
  const [editingOffer, setEditingOffer] = useState<Partial<SpecialOffer> | null>(null);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);

  // Uploading state
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (isAuthorizedAdmin(user)) {
        loadAllData();
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && isAuthorizedAdmin(auth.currentUser)) {
      loadAllData();
    }
  }, [isOpen]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [enqs, rms, gal, exp, din, off, sett, revs] = await Promise.all([
        getAllEnquiries(),
        getRooms(),
        getGalleryItems(),
        getExperiences(),
        getDiningItems(),
        getOffers(),
        getResortSettings(),
        getReviews(),
      ]);
      setEnquiries(enqs);
      setRooms(rms);
      setGallery(gal);
      setExperiences(exp);
      setDining(din);
      setOffers(off);
      setSettingsForm(sett);
      setReviews(revs);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    setAuthSuccess('');

    const trimmedEmail = emailInput.trim();

    try {
      let credential;
      if (authMode === 'signin') {
        credential = await signInWithEmailAndPassword(auth, trimmedEmail, passwordInput);
        setAuthSuccess('Authenticated successfully with Firebase Authentication');
      } else {
        credential = await createUserWithEmailAndPassword(auth, trimmedEmail, passwordInput);
        setAuthSuccess('Admin account created in Firebase Authentication!');
      }

      if (!isAuthorizedAdmin(credential.user)) {
        await signOut(auth);
        setCurrentUser(null);
        setAuthError(`Access denied: ${credential.user.email} is not in the list of authorized resort administrators.`);
        return;
      }

      setCurrentUser(credential.user);
      showTempMessage('Signed in as Admin');
      await loadAllData();
      onRefreshData();
    } catch (err: any) {
      console.warn('Firebase Auth error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setAuthError(
          'Email/Password sign-in is disabled in your Firebase console. Go to Firebase Console → Authentication → Sign-in method, select Email/Password, and switch it to "Enabled".'
        );
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setAuthError(
          'Invalid credentials or user does not exist in Firebase. If this account is not registered yet, switch to "Create Admin Account" below.'
        );
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthError('This email is already registered in Firebase. Switch to "Sign In" mode below.');
      } else if (err.code === 'auth/wrong-password') {
        setAuthError('Incorrect password. Please verify your credentials.');
      } else if (err.code === 'auth/weak-password') {
        setAuthError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/too-many-requests') {
        setAuthError('Access temporarily disabled due to many failed login attempts. Please reset password or try again later.');
      } else {
        setAuthError(err.message || 'Authentication error.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
    setCurrentUser(null);
  };

  const showTempMessage = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  // --- ENQUIRIES HANDLERS ---
  const handleStatusChange = async (enquiryId: string | undefined, newStatus: Enquiry['status']) => {
    if (!enquiryId) return;
    try {
      await updateEnquiryStatus(enquiryId, newStatus);
      setEnquiries((prev) =>
        prev.map((item) => (item.id === enquiryId ? { ...item, status: newStatus } : item))
      );
      showTempMessage('Enquiry status updated');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEnquiry = async (id: string | undefined) => {
    if (!id || !confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      showTempMessage('Enquiry removed');
    } catch (err) {
      console.error(err);
    }
  };

  // --- ROOMS CRUD ---
  const handleSaveRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRoom || !editingRoom.name) return;
    const roomToSave: Room = {
      id: editingRoom.id || `room-${Date.now()}`,
      name: editingRoom.name,
      slug: editingRoom.slug || editingRoom.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: (editingRoom.category as RoomCategory) || 'Beachfront',
      shortDescription: editingRoom.shortDescription || '',
      description: editingRoom.description || '',
      basePrice: Number(editingRoom.basePrice) || 3500,
      weekendPrice: Number(editingRoom.weekendPrice) || 4500,
      maxGuests: Number(editingRoom.maxGuests) || 2,
      bedType: editingRoom.bedType || 'King Bed',
      sizeSqFt: Number(editingRoom.sizeSqFt) || 300,
      view: editingRoom.view || 'Arabian Sea View',
      amenities: Array.isArray(editingRoom.amenities)
        ? editingRoom.amenities
        : (editingRoom.amenities as any || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      inclusions: Array.isArray(editingRoom.inclusions)
        ? editingRoom.inclusions
        : (editingRoom.inclusions as any || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      heroImage: editingRoom.heroImage || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
      gallery: editingRoom.gallery || [editingRoom.heroImage || ''],
      isFeatured: !!editingRoom.isFeatured,
      order: Number(editingRoom.order) || 1,
      badge: editingRoom.badge || '',
    };

    try {
      await saveRoom(roomToSave);
      setRooms((prev) => {
        const idx = prev.findIndex((r) => r.id === roomToSave.id);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = roomToSave;
          return updated;
        }
        return [...prev, roomToSave];
      });
      setEditingRoom(null);
      showTempMessage('Cottage saved successfully!');
      onRefreshData();
    } catch (err: any) {
      alert(`Error saving room: ${err.message}`);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to permanently delete this room?')) return;
    try {
      await deleteRoom(roomId);
      setRooms((prev) => prev.filter((r) => r.id !== roomId));
      showTempMessage('Room deleted from Firestore.');
      onRefreshData();
    } catch (err: any) {
      alert(`Error deleting room: ${err.message}`);
    }
  };

  // --- GALLERY CRUD ---
  const handleSaveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery || !editingGallery.title || !editingGallery.imageUrl) return;
    const itemToSave: GalleryItem = {
      id: editingGallery.id || `gal-${Date.now()}`,
      title: editingGallery.title,
      category: (editingGallery.category as any) || 'Beachfront & Sunset',
      imageUrl: editingGallery.imageUrl,
      featured: !!editingGallery.featured,
      order: Number(editingGallery.order) || 1,
    };
    try {
      await saveGalleryItem(itemToSave);
      setGallery((prev) => {
        const idx = prev.findIndex((g) => g.id === itemToSave.id);
        if (idx >= 0) {
          const cp = [...prev];
          cp[idx] = itemToSave;
          return cp;
        }
        return [...prev, itemToSave];
      });
      setEditingGallery(null);
      showTempMessage('Gallery photo saved!');
      onRefreshData();
    } catch (err: any) {
      alert(`Error saving gallery item: ${err.message}`);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('Delete this photo from gallery?')) return;
    try {
      await deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
      showTempMessage('Photo deleted.');
      onRefreshData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  // --- EXPERIENCES CRUD ---
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp || !editingExp.title) return;
    const itemToSave: Experience = {
      id: editingExp.id || `exp-${Date.now()}`,
      title: editingExp.title,
      category: (editingExp.category as ExperienceCategory) || 'Watersports',
      summary: editingExp.summary || '',
      description: editingExp.description || '',
      duration: editingExp.duration || '2-3 Hours',
      priceText: editingExp.priceText || '₹1,500 / person',
      highlights: Array.isArray(editingExp.highlights)
        ? editingExp.highlights
        : (editingExp.highlights as any || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      image: editingExp.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      location: editingExp.location || 'Tarkarli Beach & Sindhudurg',
      order: Number(editingExp.order) || 1,
    };
    try {
      await saveExperience(itemToSave);
      setExperiences((prev) => {
        const idx = prev.findIndex((x) => x.id === itemToSave.id);
        if (idx >= 0) {
          const cp = [...prev];
          cp[idx] = itemToSave;
          return cp;
        }
        return [...prev, itemToSave];
      });
      setEditingExp(null);
      showTempMessage('Experience saved!');
      onRefreshData();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm('Delete this experience?')) return;
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((x) => x.id !== id));
      showTempMessage('Experience deleted.');
      onRefreshData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // --- DINING CRUD ---
  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDish || !editingDish.name) return;
    const dishToSave: DiningItem = {
      id: editingDish.id || `dish-${Date.now()}`,
      name: editingDish.name,
      category: (editingDish.category as DiningCategory) || 'Malvani Seafood',
      description: editingDish.description || '',
      isVeg: !!editingDish.isVeg,
      isChefSpecial: !!editingDish.isChefSpecial,
      priceText: editingDish.priceText || 'Seasonal Tariff',
      image: editingDish.image || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      order: Number(editingDish.order) || 1,
    };
    try {
      await saveDiningItem(dishToSave);
      setDining((prev) => {
        const idx = prev.findIndex((d) => d.id === dishToSave.id);
        if (idx >= 0) {
          const cp = [...prev];
          cp[idx] = dishToSave;
          return cp;
        }
        return [...prev, dishToSave];
      });
      setEditingDish(null);
      showTempMessage('Malvani dish saved!');
      onRefreshData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteDish = async (id: string) => {
    if (!confirm('Delete this dish?')) return;
    try {
      await deleteDiningItem(id);
      setDining((prev) => prev.filter((d) => d.id !== id));
      showTempMessage('Dish removed.');
      onRefreshData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // --- OFFERS CRUD ---
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOffer || !editingOffer.title || !editingOffer.code) return;
    const offerToSave: SpecialOffer = {
      id: editingOffer.id || `off-${Date.now()}`,
      title: editingOffer.title,
      code: editingOffer.code.toUpperCase(),
      discountPercent: Number(editingOffer.discountPercent) || 10,
      description: editingOffer.description || '',
      validity: editingOffer.validity || 'Valid all season',
      badge: editingOffer.badge || 'PROMO',
      active: editingOffer.active !== false,
    };
    try {
      await saveOffer(offerToSave);
      setOffers((prev) => {
        const idx = prev.findIndex((o) => o.id === offerToSave.id);
        if (idx >= 0) {
          const cp = [...prev];
          cp[idx] = offerToSave;
          return cp;
        }
        return [...prev, offerToSave];
      });
      setEditingOffer(null);
      showTempMessage('Offer saved!');
      onRefreshData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    setConfirmModal({
      title: 'Delete Special Offer',
      message: 'Are you sure you want to remove this promotional offer? It will no longer appear on the website.',
      onConfirm: async () => {
        try {
          await deleteOffer(id);
          setOffers((prev) => prev.filter((o) => o.id !== id));
          showTempMessage('Offer deleted.');
          onRefreshData();
        } catch (err: any) {
          alert(err.message);
        }
      },
    });
  };

  // --- REVIEWS CRUD ---
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview || !editingReview.author || !editingReview.comment) return;
    setIsSaving(true);
    const reviewToSave: Review = {
      id: editingReview.id || `rev-${Date.now()}`,
      author: editingReview.author,
      rating: Number(editingReview.rating) || 5,
      stayDate: editingReview.stayDate || 'Recent Guest',
      comment: editingReview.comment,
      roomStayed: editingReview.roomStayed || 'Aegean Beachfront Villa',
      source: (editingReview.source as any) || 'Google',
      isFeatured: !!editingReview.isFeatured,
    };
    try {
      await saveReview(reviewToSave);
      setReviews((prev) => {
        const idx = prev.findIndex((r) => r.id === reviewToSave.id);
        if (idx >= 0) {
          const cp = [...prev];
          cp[idx] = reviewToSave;
          return cp;
        }
        return [...prev, reviewToSave];
      });
      setEditingReview(null);
      showTempMessage('Guest review saved!');
      onRefreshData();
    } catch (err: any) {
      alert(`Error saving review: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteReview = (id: string) => {
    setConfirmModal({
      title: 'Delete Guest Review',
      message: 'Are you sure you want to delete this guest testimonial? This cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteReview(id);
          setReviews((prev) => prev.filter((r) => r.id !== id));
          showTempMessage('Review deleted.');
          onRefreshData();
        } catch (err: any) {
          alert(`Error: ${err.message}`);
        }
      },
    });
  };

  // --- HOMEPAGE & SETTINGS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveResortSettings(settingsForm);
      showTempMessage('Resort settings & homepage content updated in Firestore!');
      onRefreshData();
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    }
  };

  // --- DATABASE RE-SEED ---
  const handleSeedDatabase = async () => {
    if (!confirm('This will seed/restore authentic Tarkarli rooms, experiences, dining, and gallery into Firestore. Proceed?')) return;
    setIsLoading(true);
    try {
      const res = await seedFirestoreDatabase();
      showTempMessage(`Successfully initialized ${res.count} documents in Firestore!`);
      await loadAllData();
      onRefreshData();
    } catch (err: any) {
      alert(`Database error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for file upload to Firebase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadMediaFile(file);
      callback(url);
      showTempMessage('Media uploaded successfully to Firebase Storage!');
    } catch (err: any) {
      alert(`Media upload error: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const q = enquirySearchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      e.guestName.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      e.roomName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="px-5 py-4 bg-[#0B1F33] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-lg">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                Mykonos Cottage Resort CMS
              </h2>
              <p className="text-xs text-stone-300">
                Authorized Admin & Firestore Content Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isUserLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs text-stone-200 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Toast Notification */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white text-xs font-medium py-2 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{statusMessage}</span>
            </div>
            <button onClick={() => setStatusMessage('')}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Not Logged In View */}
        {!isUserLoggedIn ? (
          <div className="p-6 sm:p-10 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-5">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto text-[#0B1F33] shadow-inner">
                  <User className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0B1F33]">
                  Resort Admin Portal
                </h3>
                <p className="text-xs text-stone-500">
                  Manage rooms, reservations, gallery, and rates
                </p>
              </div>

              {/* Default Admin Credentials Card */}
              <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold flex items-center gap-1.5 text-amber-900">
                    <Shield className="w-4 h-4 text-amber-600" />
                    Default Admin Credentials
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailInput(ADMIN_EMAIL);
                      setPasswordInput(ADMIN_DEFAULT_PASSWORD);
                    }}
                    className="text-[11px] font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer"
                  >
                    1-Click Auto Fill
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px] bg-white/70 p-2 rounded-lg border border-amber-200/60">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Email:</span>
                    <span className="font-semibold text-stone-900 break-all">{ADMIN_EMAIL}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Password:</span>
                    <span className="font-semibold text-stone-900">{ADMIN_DEFAULT_PASSWORD}</span>
                  </div>
                </div>
              </div>

              {authError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl space-y-2 text-xs text-red-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <span className="font-semibold leading-relaxed">{authError}</span>
                  </div>
                  {authError.includes('Firebase console') && (
                    <div className="pl-6 pt-1 text-[11px] text-red-700 space-y-1 border-t border-red-200/60 leading-normal">
                      <p className="font-bold text-red-900">Step-by-step fix in Firebase Console:</p>
                      <ol className="list-decimal pl-4 space-y-0.5">
                        <li>Open <a href="https://console.firebase.google.com/project/mykonos-7cace/authentication/providers" target="_blank" rel="noopener noreferrer" className="underline font-bold text-blue-800">Firebase Console</a></li>
                        <li>Click <strong>Authentication</strong> → <strong>Sign-in method</strong></li>
                        <li>Click <strong>Email/Password</strong> provider</li>
                        <li>Toggle <strong>Enable</strong> (leave Email link disabled) and click <strong>Save</strong></li>
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {authSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{authSuccess}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter management password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B1F33]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-3 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white rounded-xl font-medium text-sm transition-colors shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>
                    {isAuthenticating
                      ? 'Authenticating with Firebase...'
                      : authMode === 'signin'
                      ? 'Sign In with Firebase Auth'
                      : 'Create Admin Account in Firebase'}
                  </span>
                </button>
              </form>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === 'signin' ? 'register' : 'signin');
                    setAuthError('');
                    setAuthSuccess('');
                  }}
                  className="text-xs text-amber-800 hover:text-amber-950 font-medium underline cursor-pointer"
                >
                  {authMode === 'signin'
                    ? "First time initializing this admin in Firebase? Click to create account"
                    : 'Already registered in Firebase Authentication? Switch to Sign In'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Admin View */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Navigation Tabs Bar */}
            <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 bg-stone-100 border-b border-stone-200 overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'enquiries'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Enquiries ({enquiries.length})</span>
                {enquiries.filter((e) => e.status === 'new').length > 0 && (
                  <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {enquiries.filter((e) => e.status === 'new').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('rooms')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'rooms'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Bed className="w-3.5 h-3.5" />
                <span>Cottages & Rooms ({rooms.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'gallery'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Gallery & Media ({gallery.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('experiences')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'experiences'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Experiences ({experiences.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('dining')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'dining'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Malvani Dining ({dining.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Star className="w-3.5 h-3.5" />
                <span>Reviews ({reviews.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('offers')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'offers'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>Offers ({offers.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('homepage')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'homepage'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Homepage & Details</span>
              </button>

              <button
                onClick={() => setActiveTab('database')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'database'
                    ? 'bg-white text-[#0B1F33] shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Firestore Sync</span>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
              {/* TAB 0: RESORT MANAGEMENT DASHBOARD */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Greeting & Quick Summary */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#C26343]">
                        Resort Management Overview
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B1F33]">
                        Welcome back, Resort Admin
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Mykonos Cottage Tarkarli • Live inventory, bookings, and guest requests
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={loadAllData}
                        disabled={isLoading}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Reload latest data from Firestore"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                        <span>Refresh Data</span>
                      </button>
                      <button
                        onClick={onClose}
                        className="px-3.5 py-1.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Live Site</span>
                      </button>
                    </div>
                  </div>

                  {/* 6 Key Performance Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                    <div
                      onClick={() => {
                        setFilterStatus('new');
                        setActiveTab('enquiries');
                      }}
                      className="bg-white p-4 rounded-2xl border border-blue-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">
                        New Enquiries
                      </span>
                      <p className="font-serif text-2xl font-bold text-blue-900 mt-1">
                        {enquiries.filter((e) => e.status === 'new').length}
                      </p>
                      <span className="text-[10px] text-stone-400 mt-1 block">Awaiting response</span>
                    </div>

                    <div
                      onClick={() => {
                        setFilterStatus('contacted');
                        setActiveTab('enquiries');
                      }}
                      className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] uppercase font-bold text-amber-600 block">
                        Pending / Contacted
                      </span>
                      <p className="font-serif text-2xl font-bold text-amber-900 mt-1">
                        {enquiries.filter((e) => e.status === 'contacted').length}
                      </p>
                      <span className="text-[10px] text-stone-400 mt-1 block">In conversation</span>
                    </div>

                    <div
                      onClick={() => {
                        setFilterStatus('confirmed');
                        setActiveTab('enquiries');
                      }}
                      className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                        Confirmed Bookings
                      </span>
                      <p className="font-serif text-2xl font-bold text-emerald-900 mt-1">
                        {enquiries.filter((e) => e.status === 'confirmed').length}
                      </p>
                      <span className="text-[10px] text-stone-400 mt-1 block">Reserved dates</span>
                    </div>

                    <div
                      onClick={() => setActiveTab('rooms')}
                      className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] uppercase font-bold text-[#0B1F33] block">
                        Cottage Inventory
                      </span>
                      <p className="font-serif text-2xl font-bold text-stone-900 mt-1">
                        {rooms.length}
                      </p>
                      <span className="text-[10px] text-stone-400 mt-1 block">Active cottages</span>
                    </div>

                    <div
                      onClick={() => setActiveTab('offers')}
                      className="bg-white p-4 rounded-2xl border border-purple-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] uppercase font-bold text-purple-600 block">
                        Active Offers
                      </span>
                      <p className="font-serif text-2xl font-bold text-purple-900 mt-1">
                        {offers.filter((o) => o.active).length}
                      </p>
                      <span className="text-[10px] text-stone-400 mt-1 block">Special packages</span>
                    </div>

                    <div
                      onClick={() => setActiveTab('reviews')}
                      className="bg-white p-4 rounded-2xl border border-amber-100 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                    >
                      <span className="text-[10px] uppercase font-bold text-amber-700 block">
                        Guest Reviews
                      </span>
                      <p className="font-serif text-2xl font-bold text-amber-900 mt-1">
                        {reviews.length}
                      </p>
                      <span className="text-[10px] text-stone-400 mt-1 block">4.9★ Average</span>
                    </div>
                  </div>

                  {/* Quick Actions Panel */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Quick Content & Resort Actions
                    </h4>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveTab('rooms');
                          setEditingRoom({
                            name: '',
                            category: 'Beachfront',
                            basePrice: 3500,
                            weekendPrice: 4500,
                            maxGuests: 2,
                            bedType: 'King Bed',
                            sizeSqFt: 320,
                            view: 'Arabian Sea View',
                            amenities: ['Air Conditioning', 'King Bed', 'Private Verandah', 'Free Wi-Fi'],
                            inclusions: ['Complimentary Malvani Breakfast', 'Welcome Coconut Drink'],
                            heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
                            gallery: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85'],
                            shortDescription: 'Steps away from the Tarkarli shoreline.',
                            description: 'Experience tranquil coastal luxury in our handcrafted cottage.',
                            isFeatured: true,
                            order: rooms.length + 1,
                          });
                        }}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-[#0B1F33] hover:text-white text-stone-700 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#C26343]" />
                        <span>Add Cottage</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('gallery');
                          setEditingGallery({
                            title: '',
                            category: 'Beach',
                            imageUrl: '',
                            featured: true,
                            order: gallery.length + 1,
                          });
                        }}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-[#0B1F33] hover:text-white text-stone-700 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5 text-blue-600" />
                        <span>Upload Photo</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('dining');
                          setEditingDish({
                            name: '',
                            category: 'Malvani Seafood',
                            description: '',
                            isVeg: false,
                            isChefSpecial: true,
                            priceText: 'Seasonal Tariff',
                            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
                            order: dining.length + 1,
                          });
                        }}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-[#0B1F33] hover:text-white text-stone-700 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Utensils className="w-3.5 h-3.5 text-amber-600" />
                        <span>Add Malvani Dish</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('reviews');
                          setEditingReview({
                            author: '',
                            rating: 5,
                            stayDate: 'Recent Guest',
                            comment: '',
                            roomStayed: 'Aegean Beachfront Villa',
                            source: 'Google',
                            isFeatured: true,
                          });
                        }}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-[#0B1F33] hover:text-white text-stone-700 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>Add Guest Review</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('offers');
                          setEditingOffer({
                            title: '',
                            code: 'SPECIAL10',
                            discountPercent: 10,
                            description: '',
                            validity: 'Valid all season',
                            badge: 'PROMO',
                            active: true,
                          });
                        }}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-[#0B1F33] hover:text-white text-stone-700 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Tag className="w-3.5 h-3.5 text-purple-600" />
                        <span>Create Special Offer</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('database')}
                        className="px-3.5 py-2 bg-stone-100 hover:bg-amber-600 hover:text-white text-stone-700 text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <Database className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Firestore Sync</span>
                      </button>
                    </div>
                  </div>

                  {/* Recent Enquiries Feed */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div>
                        <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                          Latest Reservation Enquiries
                        </h4>
                        <p className="text-xs text-stone-500">
                          Direct guest submissions waiting for reply
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setFilterStatus('all');
                          setEnquirySearchQuery('');
                          setActiveTab('enquiries');
                        }}
                        className="text-xs font-bold text-[#C26343] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>View All ({enquiries.length})</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {enquiries.length === 0 ? (
                      <div className="text-center py-8 text-stone-500 text-xs">
                        No enquiries received yet. Direct bookings will appear here instantly.
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {enquiries.slice(0, 4).map((enq) => {
                          const guestPhone = enq.phone.replace(/\D/g, '');
                          const waReplyMessage = `Hello ${enq.guestName}, greetings from Mykonos Cottage Tarkarli! We received your booking enquiry for ${enq.roomName} (${enq.checkIn} to ${enq.checkOut}). We'd be delighted to host you!`;
                          const waUrl = `https://wa.me/${guestPhone}?text=${encodeURIComponent(waReplyMessage)}`;

                          return (
                            <div
                              key={enq.id}
                              className="p-3.5 bg-stone-50/70 hover:bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-serif font-bold text-sm text-[#0B1F33]">
                                    {enq.guestName}
                                  </span>
                                  <span
                                    className={`px-2 py-0.2 text-[9px] uppercase font-bold tracking-wider rounded-full ${
                                      enq.status === 'new'
                                        ? 'bg-blue-100 text-blue-800'
                                        : enq.status === 'contacted'
                                        ? 'bg-amber-100 text-amber-800'
                                        : enq.status === 'confirmed'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-stone-100 text-stone-600'
                                    }`}
                                  >
                                    {enq.status}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-600">
                                  {enq.roomName} • {enq.checkIn} → {enq.checkOut} ({enq.estimatedNights}N)
                                </p>
                                <span className="text-[11px] text-stone-400">
                                  📞 {enq.phone} • Quote: ₹{enq.estimatedTotal.toLocaleString('en-IN')}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>WhatsApp Reply</span>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 1: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Guest Reservation Enquiries
                      </h3>
                      <p className="text-xs text-stone-500">
                        Direct guest requests submitted via website form or WhatsApp concierge
                      </p>
                    </div>

                    {/* Filter and Search Container */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search guest or room..."
                          value={enquirySearchQuery}
                          onChange={(e) => setEnquirySearchQuery(e.target.value)}
                          className="pl-8 pr-7 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-lg w-full sm:w-48 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#0B1F33]"
                        />
                        <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2 pointer-events-none" />
                        {enquirySearchQuery && (
                          <button
                            onClick={() => setEnquirySearchQuery('')}
                            className="absolute right-2 top-1.5 text-xs text-stone-400 hover:text-stone-700"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      {/* Filter buttons */}
                      <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs overflow-x-auto">
                        {['all', 'new', 'contacted', 'confirmed', 'cancelled'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setFilterStatus(st)}
                            className={`px-2.5 py-1 rounded-md capitalize font-medium cursor-pointer transition-colors ${
                              filterStatus === st
                                ? 'bg-white text-[#0B1F33] shadow-xs'
                                : 'text-stone-600 hover:text-stone-900'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {filteredEnquiries.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-6">
                      <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-2" />
                      <p className="text-sm font-medium text-stone-600">No enquiries matching filter.</p>
                      <p className="text-xs text-stone-400 mt-1">
                        When guests submit booking inquiries on the site, they will appear here in real-time.
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {filteredEnquiries.map((enq) => {
                        const guestPhone = enq.phone.replace(/\D/g, '');
                        const waReplyMessage = `Hello ${enq.guestName}, greetings from Mykonos Cottage Tarkarli! We received your booking enquiry for ${enq.roomName} (${enq.checkIn} to ${enq.checkOut}). We'd be delighted to host you!`;
                        const waUrl = `https://wa.me/${guestPhone}?text=${encodeURIComponent(waReplyMessage)}`;

                        return (
                          <div
                            key={enq.id}
                            className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs hover:border-stone-300 transition-all space-y-3"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-stone-100 pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                                    {enq.guestName}
                                  </h4>
                                  <span
                                    className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                                      enq.status === 'new'
                                        ? 'bg-blue-100 text-blue-800'
                                        : enq.status === 'contacted'
                                        ? 'bg-amber-100 text-amber-800'
                                        : enq.status === 'confirmed'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-stone-100 text-stone-600'
                                    }`}
                                  >
                                    {enq.status}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-500 mt-0.5">
                                  Stay: <strong className="text-stone-800">{enq.roomName}</strong> |{' '}
                                  {enq.checkIn} → {enq.checkOut} ({enq.estimatedNights} night{enq.estimatedNights > 1 ? 's' : ''})
                                </p>
                              </div>

                              <div className="text-right">
                                <span className="text-xs text-stone-400 block">Estimated Quote</span>
                                <span className="font-serif font-bold text-base text-amber-700">
                                  ₹{enq.estimatedTotal.toLocaleString('en-IN')}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600">
                              <div>
                                <span className="text-stone-400 block">Contact Info</span>
                                <p className="font-medium text-stone-800">
                                  📞 {enq.phone}
                                </p>
                                {enq.email && <p className="text-stone-500">{enq.email}</p>}
                              </div>

                              <div>
                                <span className="text-stone-400 block">Occupancy</span>
                                <p className="text-stone-800">
                                  {enq.adults} Adults{enq.children ? `, ${enq.children} Children` : ''}
                                </p>
                                <span className="text-[10px] text-stone-400">
                                  Received: {new Date(enq.createdAt).toLocaleDateString()}
                                </span>
                              </div>

                              <div>
                                <span className="text-stone-400 block">Special Requests</span>
                                <p className="italic text-stone-700">
                                  {enq.specialRequests || 'No special requests'}
                                </p>
                              </div>
                            </div>

                            {/* Actions & WhatsApp reply */}
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-stone-500">Status:</span>
                                <select
                                  value={enq.status}
                                  onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
                                  className="text-xs px-2 py-1 bg-stone-50 border border-stone-200 rounded-md font-medium text-stone-700 cursor-pointer"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>

                              <div className="flex items-center gap-2">
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                  <span>Reply on WhatsApp</span>
                                </a>

                                <button
                                  onClick={() => handleDeleteEnquiry(enq.id)}
                                  className="p-1.5 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                                  title="Delete Enquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: ROOMS CRUD */}
              {activeTab === 'rooms' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Cottage & Suite Inventory
                      </h3>
                      <p className="text-xs text-stone-500">
                        Manage room pricing, photography, categories, and amenities
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingRoom({
                          name: '',
                          category: 'Beachfront',
                          basePrice: 3500,
                          weekendPrice: 4500,
                          maxGuests: 2,
                          bedType: 'King Bed',
                          sizeSqFt: 320,
                          view: 'Arabian Sea View',
                          amenities: ['Air Conditioning', 'King Bed', 'Private Verandah', 'Free Wi-Fi'],
                          inclusions: ['Complimentary Malvani Breakfast', 'Welcome Coconut Drink'],
                          heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
                          gallery: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85'],
                          shortDescription: 'Steps away from the Tarkarli shoreline.',
                          description: 'Experience tranquil coastal luxury in our handcrafted cottage.',
                          isFeatured: true,
                          order: rooms.length + 1,
                        })
                      }
                      className="px-3.5 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Cottage</span>
                    </button>
                  </div>

                  {/* Room Edit/Create Form Modal */}
                  {editingRoom && (
                    <div className="bg-white p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                        <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                          {editingRoom.id ? 'Edit Cottage' : 'Add New Cottage'}
                        </h4>
                        <button
                          onClick={() => setEditingRoom(null)}
                          className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveRoom} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Cottage Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingRoom.name || ''}
                              onChange={(e) =>
                                setEditingRoom({ ...editingRoom, name: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Category
                            </label>
                            <select
                              value={editingRoom.category || 'Beachfront'}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  category: e.target.value as RoomCategory,
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            >
                              <option value="Beachfront">Beachfront</option>
                              <option value="Wooden Cottage">Wooden Cottage</option>
                              <option value="Garden View">Garden View</option>
                              <option value="Family Suite">Family Suite</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Base Price (Weekday ₹) *
                            </label>
                            <input
                              type="number"
                              required
                              value={editingRoom.basePrice || 0}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  basePrice: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Weekend Price (Fri-Sun ₹) *
                            </label>
                            <input
                              type="number"
                              required
                              value={editingRoom.weekendPrice || 0}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  weekendPrice: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Max Guests
                            </label>
                            <input
                              type="number"
                              value={editingRoom.maxGuests || 2}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  maxGuests: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Bed Type & Size (Sq Ft)
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="King Bed"
                                value={editingRoom.bedType || ''}
                                onChange={(e) =>
                                  setEditingRoom({ ...editingRoom, bedType: e.target.value })
                                }
                                className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                              />
                              <input
                                type="number"
                                placeholder="350"
                                value={editingRoom.sizeSqFt || 0}
                                onChange={(e) =>
                                  setEditingRoom({
                                    ...editingRoom,
                                    sizeSqFt: Number(e.target.value),
                                  })
                                }
                                className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Hero Image (URL or Firebase Storage Upload)
                          </label>
                          <div className="flex gap-2 items-center">
                            <input
                              type="url"
                              value={editingRoom.heroImage || ''}
                              onChange={(e) =>
                                setEditingRoom({ ...editingRoom, heroImage: e.target.value })
                              }
                              placeholder="https://..."
                              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                            <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) =>
                                    setEditingRoom({ ...editingRoom, heroImage: url })
                                  )
                                }
                              />
                            </label>
                          </div>
                          {editingRoom.heroImage && (
                            <img
                              src={editingRoom.heroImage}
                              alt="preview"
                              className="mt-2 h-20 w-36 object-cover rounded-lg border border-stone-200"
                            />
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Short Summary
                          </label>
                          <input
                            type="text"
                            value={editingRoom.shortDescription || ''}
                            onChange={(e) =>
                              setEditingRoom({ ...editingRoom, shortDescription: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Full Room Description
                          </label>
                          <textarea
                            rows={3}
                            value={editingRoom.description || ''}
                            onChange={(e) =>
                              setEditingRoom({ ...editingRoom, description: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Amenities (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={
                                Array.isArray(editingRoom.amenities)
                                  ? editingRoom.amenities.join(', ')
                                  : editingRoom.amenities || ''
                              }
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  amenities: e.target.value as any,
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                              placeholder="Air Conditioning, King Bed, Verandah, Wi-Fi"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Complimentary Inclusions (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={
                                Array.isArray(editingRoom.inclusions)
                                  ? editingRoom.inclusions.join(', ')
                                  : editingRoom.inclusions || ''
                              }
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  inclusions: e.target.value as any,
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                              placeholder="Complimentary Breakfast, Welcome Coconut Drink"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingRoom.isFeatured}
                              onChange={(e) =>
                                setEditingRoom({ ...editingRoom, isFeatured: e.target.checked })
                              }
                            />
                            <span>Featured on Homepage</span>
                          </label>

                          <div className="flex items-center gap-2">
                            <span>Badge text:</span>
                            <input
                              type="text"
                              placeholder="e.g. Most Popular"
                              value={editingRoom.badge || ''}
                              onChange={(e) =>
                                setEditingRoom({ ...editingRoom, badge: e.target.value })
                              }
                              className="px-2 py-1 bg-stone-50 border border-stone-300 rounded text-xs w-32"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                          <button
                            type="button"
                            onClick={() => setEditingRoom(null)}
                            className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white rounded-lg text-xs font-medium cursor-pointer shadow-xs"
                          >
                            Save Cottage to Firestore
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Rooms List */}
                  <div className="grid gap-3">
                    {rooms.map((room) => (
                      <div
                        key={room.id}
                        className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={room.heroImage}
                            alt={room.name}
                            className="w-16 h-16 rounded-lg object-cover border border-stone-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                                {room.name}
                              </h4>
                              <span className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] font-medium rounded-full">
                                {room.category}
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 mt-0.5">
                              Weekday: <strong>₹{room.basePrice.toLocaleString('en-IN')}</strong> | Weekend: <strong>₹{room.weekendPrice.toLocaleString('en-IN')}</strong> | Max {room.maxGuests} Guests
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setEditingRoom(room)}
                            className="p-2 text-stone-600 hover:text-[#0B1F33] hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Room"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteRoom(room.id)}
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Room"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GALLERY CRUD */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Resort Photo Gallery
                      </h3>
                      <p className="text-xs text-stone-500">
                        Upload photography to Firebase Storage or link high-res coastal imagery
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingGallery({
                          title: '',
                          category: 'Beachfront & Sunset',
                          imageUrl: '',
                          featured: true,
                          order: gallery.length + 1,
                        })
                      }
                      className="px-3.5 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Photo</span>
                    </button>
                  </div>

                  {editingGallery && (
                    <div className="bg-white p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4">
                      <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                        {editingGallery.id ? 'Edit Photo' : 'Upload / Add Photo'}
                      </h4>
                      <form onSubmit={handleSaveGallery} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Caption / Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingGallery.title || ''}
                              onChange={(e) =>
                                setEditingGallery({ ...editingGallery, title: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Category
                            </label>
                            <select
                              value={editingGallery.category || 'Beach'}
                              onChange={(e) =>
                                setEditingGallery({
                                  ...editingGallery,
                                  category: e.target.value as any,
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            >
                              <option value="Resort">Resort & Grounds</option>
                              <option value="Cottages">Cottages & Verandahs</option>
                              <option value="Rooms">Rooms & Suites</option>
                              <option value="Beach">Beach & Shoreline</option>
                              <option value="Dining">Malvani Dining</option>
                              <option value="Scuba">Scuba & Coral Reef</option>
                              <option value="Experiences">Adventures & Dolphin Safari</option>
                              <option value="Tarkarli">Tarkarli & Sindhudurg Fort</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Image URL or Storage Upload *
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              required
                              value={editingGallery.imageUrl || ''}
                              onChange={(e) =>
                                setEditingGallery({ ...editingGallery, imageUrl: e.target.value })
                              }
                              placeholder="https://..."
                              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                            <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) =>
                                    setEditingGallery({ ...editingGallery, imageUrl: url })
                                  )
                                }
                              />
                            </label>
                          </div>
                          {editingGallery.imageUrl && (
                            <img
                              src={editingGallery.imageUrl}
                              alt="preview"
                              className="mt-2 h-24 object-cover rounded-lg border border-stone-200"
                            />
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingGallery.featured}
                              onChange={(e) =>
                                setEditingGallery({ ...editingGallery, featured: e.target.checked })
                              }
                            />
                            <span className="font-medium text-stone-700">
                              Highlight as Featured Photography (Large 2-column view)
                            </span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                          <button
                            type="button"
                            onClick={() => setEditingGallery(null)}
                            className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-100 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Save Photo to Gallery
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {gallery.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs relative group"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2.5">
                          <p className="font-medium text-xs text-stone-800 truncate">{item.title}</p>
                          <span className="text-[10px] text-stone-400 block">{item.category}</span>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-1 rounded-lg">
                          <button
                            onClick={() => setEditingGallery(item)}
                            className="p-1 text-white hover:text-amber-300 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteGallery(item.id)}
                            className="p-1 text-white hover:text-red-400 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: EXPERIENCES CRUD */}
              {activeTab === 'experiences' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Tarkarli Coastal Experiences & Scuba
                      </h3>
                      <p className="text-xs text-stone-500">
                        Manage Scuba diving, dolphin safaris, and Sindhudurg excursions
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingExp({
                          title: '',
                          category: 'Watersports',
                          duration: '2-3 Hours',
                          priceText: '₹1,500 / person',
                          summary: '',
                          description: '',
                          highlights: ['Certified Instructor', 'Underwater Video Included'],
                          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
                          location: 'Tarkarli Shore & Sindhudurg Fort',
                          order: experiences.length + 1,
                        })
                      }
                      className="px-3.5 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  {editingExp && (
                    <div className="bg-white p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4">
                      <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                        {editingExp.id ? 'Edit Experience' : 'Add Experience'}
                      </h4>
                      <form onSubmit={handleSaveExp} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingExp.title || ''}
                              onChange={(e) =>
                                setEditingExp({ ...editingExp, title: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Duration & Tariff
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="3 Hours"
                                value={editingExp.duration || ''}
                                onChange={(e) =>
                                  setEditingExp({ ...editingExp, duration: e.target.value })
                                }
                                className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                              />
                              <input
                                type="text"
                                placeholder="₹2,000 / person"
                                value={editingExp.priceText || ''}
                                onChange={(e) =>
                                  setEditingExp({ ...editingExp, priceText: e.target.value })
                                }
                                className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Image URL or Storage Upload
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={editingExp.image || ''}
                              onChange={(e) =>
                                setEditingExp({ ...editingExp, image: e.target.value })
                              }
                              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                            <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) =>
                                    setEditingExp({ ...editingExp, image: url })
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Summary
                          </label>
                          <input
                            type="text"
                            value={editingExp.summary || ''}
                            onChange={(e) =>
                              setEditingExp({ ...editingExp, summary: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Highlights (comma-separated)
                          </label>
                          <input
                            type="text"
                            value={
                              Array.isArray(editingExp.highlights)
                                ? editingExp.highlights.join(', ')
                                : editingExp.highlights || ''
                            }
                            onChange={(e) =>
                              setEditingExp({ ...editingExp, highlights: e.target.value as any })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            placeholder="PADI Certified, Video Included, Boat Ride"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                          <button
                            type="button"
                            onClick={() => setEditingExp(null)}
                            className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#0B1F33] text-white rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Save Experience
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {experiences.map((exp) => (
                      <div
                        key={exp.id}
                        className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={exp.image}
                            alt={exp.title}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-serif font-bold text-sm text-[#0B1F33]">
                              {exp.title}
                            </h4>
                            <p className="text-xs text-stone-500">
                              {exp.duration} • {exp.priceText}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingExp(exp)}
                            className="p-1.5 text-stone-600 hover:text-[#0B1F33] cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExp(exp.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DINING CRUD */}
              {activeTab === 'dining' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Malvani Kitchen Menu
                      </h3>
                      <p className="text-xs text-stone-500">
                        Manage authentic seafood thalis, Solkadhi, and beachside dining options
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingDish({
                          name: '',
                          category: 'Malvani Seafood',
                          description: '',
                          isVeg: false,
                          isChefSpecial: true,
                          priceText: '₹450 / Thali',
                          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
                          order: dining.length + 1,
                        })
                      }
                      className="px-3.5 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Menu Item</span>
                    </button>
                  </div>

                  {editingDish && (
                    <div className="bg-white p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4">
                      <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                        {editingDish.id ? 'Edit Dish' : 'Add Dish'}
                      </h4>
                      <form onSubmit={handleSaveDish} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Dish Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingDish.name || ''}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, name: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Price Text
                            </label>
                            <input
                              type="text"
                              value={editingDish.priceText || ''}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, priceText: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Image URL or Upload
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={editingDish.image || ''}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, image: e.target.value })
                              }
                              className="flex-1 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                            <label className="px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg text-xs font-medium flex items-center gap-1.5 cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (url) =>
                                    setEditingDish({ ...editingDish, image: url })
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={editingDish.description || ''}
                            onChange={(e) =>
                              setEditingDish({ ...editingDish, description: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingDish.isVeg}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, isVeg: e.target.checked })
                              }
                            />
                            <span>Vegetarian Dish</span>
                          </label>

                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingDish.isChefSpecial}
                              onChange={(e) =>
                                setEditingDish({ ...editingDish, isChefSpecial: e.target.checked })
                              }
                            />
                            <span>Chef's Signature Special</span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                          <button
                            type="button"
                            onClick={() => setEditingDish(null)}
                            className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#0B1F33] text-white rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Save Dish
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {dining.map((dish) => (
                      <div
                        key={dish.id}
                        className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-serif font-bold text-sm text-[#0B1F33]">
                                {dish.name}
                              </h4>
                              {dish.isChefSpecial && (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full">
                                  Chef Special
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500">
                              {dish.category} • {dish.priceText}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingDish(dish)}
                            className="p-1.5 text-stone-600 hover:text-[#0B1F33] cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDish(dish.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: REVIEWS CRUD */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Guest Testimonials & Reviews
                      </h3>
                      <p className="text-xs text-stone-500">
                        Manage genuine Google, TripAdvisor, and direct guest feedback displayed on the website
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingReview({
                          author: '',
                          rating: 5,
                          stayDate: 'Recent Stay',
                          comment: '',
                          roomStayed: 'Aegean Beachfront Villa',
                          source: 'Google',
                          isFeatured: false,
                        })
                      }
                      className="px-3.5 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Review</span>
                    </button>
                  </div>

                  {/* Review Edit / Create Modal Form */}
                  {editingReview && (
                    <div className="bg-white p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                        <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                          {editingReview.id ? 'Edit Guest Review' : 'Add New Guest Review'}
                        </h4>
                        <button
                          onClick={() => setEditingReview(null)}
                          className="p-1 text-stone-400 hover:text-stone-700 rounded-md"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveReview} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Guest Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingReview.author || ''}
                              onChange={(e) =>
                                setEditingReview({ ...editingReview, author: e.target.value })
                              }
                              placeholder="e.g. Rohan & Neha Deshmukh"
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Rating (1 - 5 Stars) *
                            </label>
                            <select
                              value={editingReview.rating || 5}
                              onChange={(e) =>
                                setEditingReview({
                                  ...editingReview,
                                  rating: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            >
                              <option value="5">★★★★★ (5 Stars)</option>
                              <option value="4">★★★★☆ (4 Stars)</option>
                              <option value="3">★★★☆☆ (3 Stars)</option>
                              <option value="2">★★☆☆☆ (2 Stars)</option>
                              <option value="1">★☆☆☆☆ (1 Star)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Review Source
                            </label>
                            <select
                              value={editingReview.source || 'Google'}
                              onChange={(e) =>
                                setEditingReview({
                                  ...editingReview,
                                  source: e.target.value as any,
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            >
                              <option value="Google">Google Reviews</option>
                              <option value="TripAdvisor">TripAdvisor</option>
                              <option value="Direct">Direct Guest Stay</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Stay Date / Period
                            </label>
                            <input
                              type="text"
                              value={editingReview.stayDate || ''}
                              onChange={(e) =>
                                setEditingReview({ ...editingReview, stayDate: e.target.value })
                              }
                              placeholder="e.g. February 2026"
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Room / Cottage Reference
                            </label>
                            <input
                              type="text"
                              value={editingReview.roomStayed || ''}
                              onChange={(e) =>
                                setEditingReview({ ...editingReview, roomStayed: e.target.value })
                              }
                              placeholder="e.g. Aegean Beachfront Villa"
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Review Comment *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={editingReview.comment || ''}
                            onChange={(e) =>
                              setEditingReview({ ...editingReview, comment: e.target.value })
                            }
                            placeholder="Write the full guest feedback..."
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs leading-relaxed"
                          />
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={!!editingReview.isFeatured}
                              onChange={(e) =>
                                setEditingReview({ ...editingReview, isFeatured: e.target.checked })
                              }
                            />
                            <span className="font-medium text-stone-700">
                              Feature this review in website spotlight section
                            </span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                          <button
                            type="button"
                            onClick={() => setEditingReview(null)}
                            className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white rounded-lg text-xs font-medium cursor-pointer shadow-xs disabled:opacity-50"
                          >
                            {isSaving ? 'Saving...' : 'Save Review'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Reviews List */}
                  {reviews.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl border border-stone-200 text-stone-500 text-xs">
                      No reviews found. Click "Add Review" to add verified guest testimonials.
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-sm text-[#0B1F33]">
                                {rev.author}
                              </span>
                              <div className="flex text-amber-400">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                              </div>
                              <span className="text-[10px] text-stone-500 bg-stone-100 px-2 py-0.2 rounded">
                                {rev.source}
                              </span>
                              {rev.isFeatured && (
                                <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.2 rounded border border-amber-200">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-600 line-clamp-2 italic">
                              "{rev.comment}"
                            </p>
                            <span className="text-[11px] text-stone-400 block">
                              {rev.roomStayed} • {rev.stayDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => setEditingReview(rev)}
                              className="p-1.5 text-stone-600 hover:text-[#0B1F33] cursor-pointer"
                              title="Edit Review"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteReview(rev.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                              title="Delete Review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: OFFERS CRUD */}
              {activeTab === 'offers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Promotions & Direct Booking Offers
                      </h3>
                      <p className="text-xs text-stone-500">
                        Manage coupon codes, seasonal discounts, and perks
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingOffer({
                          title: '',
                          code: 'MYKONOS',
                          discountPercent: 10,
                          description: '',
                          validity: 'Valid through 2026',
                          badge: 'DIRECT DEAL',
                          active: true,
                        })
                      }
                      className="px-3.5 py-2 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Offer</span>
                    </button>
                  </div>

                  {editingOffer && (
                    <div className="bg-white p-5 rounded-xl border-2 border-amber-400 shadow-md space-y-4">
                      <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                        {editingOffer.id ? 'Edit Offer' : 'Add Offer'}
                      </h4>
                      <form onSubmit={handleSaveOffer} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Offer Title *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingOffer.title || ''}
                              onChange={(e) =>
                                setEditingOffer({ ...editingOffer, title: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Coupon Code *
                            </label>
                            <input
                              type="text"
                              required
                              value={editingOffer.code || ''}
                              onChange={(e) =>
                                setEditingOffer({ ...editingOffer, code: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs uppercase"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Discount %
                            </label>
                            <input
                              type="number"
                              value={editingOffer.discountPercent || 10}
                              onChange={(e) =>
                                setEditingOffer({
                                  ...editingOffer,
                                  discountPercent: Number(e.target.value),
                                })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              Validity Text
                            </label>
                            <input
                              type="text"
                              value={editingOffer.validity || ''}
                              onChange={(e) =>
                                setEditingOffer({ ...editingOffer, validity: e.target.value })
                              }
                              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={editingOffer.description || ''}
                            onChange={(e) =>
                              setEditingOffer({ ...editingOffer, description: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                          <button
                            type="button"
                            onClick={() => setEditingOffer(null)}
                            className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#0B1F33] text-white rounded-lg text-xs font-medium cursor-pointer"
                          >
                            Save Offer
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid gap-3">
                    {offers.map((off) => (
                      <div
                        key={off.id}
                        className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-mono font-bold text-xs rounded">
                              {off.code}
                            </span>
                            <h4 className="font-serif font-bold text-sm text-[#0B1F33]">
                              {off.title} ({off.discountPercent}% OFF)
                            </h4>
                          </div>
                          <p className="text-xs text-stone-500 mt-1">{off.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingOffer(off)}
                            className="p-1.5 text-stone-600 hover:text-[#0B1F33] cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteOffer(off.id)}
                            className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: HOMEPAGE CONTENT & SETTINGS */}
              {activeTab === 'homepage' && (
                <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                      Homepage Copy & Contact Information
                    </h3>
                    <p className="text-xs text-stone-500">
                      Changes here directly update the public website, WhatsApp routing, and hero headlines
                    </p>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Resort Brand Name
                        </label>
                        <input
                          type="text"
                          value={settingsForm.resortName}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, resortName: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={settingsForm.tagline}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, tagline: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Primary Calling Number
                        </label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          WhatsApp Number (with country code e.g. +91 98765 43210)
                        </label>
                        <input
                          type="text"
                          value={settingsForm.whatsapp}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, whatsapp: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Official Contact Email
                        </label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, email: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1">
                          Check-In / Check-Out Hours
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={settingsForm.checkInTime}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, checkInTime: e.target.value })
                            }
                            className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={settingsForm.checkOutTime}
                            onChange={(e) =>
                              setSettingsForm({ ...settingsForm, checkOutTime: e.target.value })
                            }
                            className="w-1/2 px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Hero Banner Headline
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroHeadline}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, heroHeadline: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Hero Banner Subheadline
                      </label>
                      <textarea
                        rows={2}
                        value={settingsForm.heroSubheadline}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, heroSubheadline: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Resort Physical Address
                      </label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, address: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Cancellation Policy Summary
                      </label>
                      <input
                        type="text"
                        value={settingsForm.cancellationPolicy}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, cancellationPolicy: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="flex justify-end pt-3 border-t border-stone-200">
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-[#0B1F33] hover:bg-[#1A3B5C] text-white rounded-lg text-xs font-medium cursor-pointer shadow-xs"
                      >
                        Save Settings to Firestore
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 8: DATABASE SEED & RESTORE */}
              {activeTab === 'database' && (
                <div className="bg-white p-6 rounded-xl border border-stone-200 space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-50 text-blue-800 rounded-xl">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#0B1F33]">
                        Firestore Content Synchronization
                      </h3>
                      <p className="text-xs text-stone-500 mt-1">
                        Connected database:{' '}
                        <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-700">
                          ai-studio-mykonostarkarlip-b053b0ef-c1af-4330-ad99-0ea89887955b
                        </code>
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                      Database Seeder Tool
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Use this button to populate or reset Firestore with authentic Tarkarli coastal data
                      including 4 handcrafted cottages (Beachfront, Wooden, Garden View, Family Suite),
                      Malvani dining delicacies, scuba diving & dolphin safari experiences, and high-res
                      coastal gallery photos.
                    </p>
                    <button
                      onClick={handleSeedDatabase}
                      disabled={isLoading}
                      className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                      <span>{isLoading ? 'Syncing with Firestore...' : 'Sync / Restore Authentic Data'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Confirmation Modal for Destructive Actions */}
        {confirmModal && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#0B1F33]">
                    {confirmModal.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">
                    {confirmModal.message}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setConfirmModal(null)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const action = confirmModal.onConfirm;
                    setConfirmModal(null);
                    action();
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
