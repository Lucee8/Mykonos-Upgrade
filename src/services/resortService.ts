import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import {
  Room,
  Enquiry,
  Experience,
  DiningItem,
  GalleryItem,
  SpecialOffer,
  Review,
  ResortSettings,
} from '../types/resort';
import {
  SEED_ROOMS,
  SEED_EXPERIENCES,
  SEED_DINING,
  SEED_GALLERY,
  SEED_OFFERS,
  SEED_REVIEWS,
  DEFAULT_SETTINGS,
} from '../data/seedData';

// Fetch Rooms
export async function getRooms(): Promise<Room[]> {
  try {
    const colRef = collection(db, 'rooms');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Room));
    }
  } catch (err) {
    console.warn('Firestore getRooms failed or empty, using seed data:', err);
  }
  return SEED_ROOMS;
}

// Fetch Room by Slug or ID
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const rooms = await getRooms();
  return rooms.find((r) => r.slug === slug || r.id === slug) || null;
}

// Fetch Experiences
export async function getExperiences(): Promise<Experience[]> {
  try {
    const colRef = collection(db, 'experiences');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Experience));
    }
  } catch (err) {
    console.warn('Firestore getExperiences failed or empty, using seed data:', err);
  }
  return SEED_EXPERIENCES;
}

// Fetch Dining
export async function getDiningItems(): Promise<DiningItem[]> {
  try {
    const colRef = collection(db, 'dining');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as DiningItem));
    }
  } catch (err) {
    console.warn('Firestore getDiningItems failed or empty, using seed data:', err);
  }
  return SEED_DINING;
}

// Fetch Gallery
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const colRef = collection(db, 'gallery');
    const q = query(colRef, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryItem));
    }
  } catch (err) {
    console.warn('Firestore getGalleryItems failed or empty, using seed data:', err);
  }
  return SEED_GALLERY;
}

// Fetch Offers
export async function getOffers(): Promise<SpecialOffer[]> {
  try {
    const colRef = collection(db, 'offers');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as SpecialOffer));
    }
  } catch (err) {
    console.warn('Firestore getOffers failed or empty, using seed data:', err);
  }
  return SEED_OFFERS;
}

// Fetch Reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const colRef = collection(db, 'reviews');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Review));
    }
  } catch (err) {
    console.warn('Firestore getReviews failed or empty, using seed data:', err);
  }
  return SEED_REVIEWS;
}

// Fetch Settings
export async function getResortSettings(): Promise<ResortSettings> {
  try {
    const docRef = doc(db, 'settings', 'general');
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as ResortSettings;
    }
  } catch (err) {
    console.warn('Firestore getResortSettings failed or empty, using default settings:', err);
  }
  return DEFAULT_SETTINGS;
}

// Submit Enquiry
export async function submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Promise<{ id: string; whatsappUrl: string }> {
  const newEnquiry: Enquiry = {
    ...enquiry,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  let savedId = `ENQ-${Date.now()}`;
  try {
    const docRef = await addDoc(collection(db, 'enquiries'), newEnquiry);
    savedId = docRef.id;
  } catch (err) {
    console.error('Firestore enquiry creation failed, continuing with WhatsApp generation:', err);
  }

  // Generate WhatsApp message
  const nights = enquiry.estimatedNights || 1;
  const message = `🌊 *New Booking Enquiry - Mykonos Cottage Tarkarli*
---------------------------------------
👤 *Guest:* ${enquiry.guestName}
📞 *Phone:* ${enquiry.phone}
✉️ *Email:* ${enquiry.email || 'Not provided'}
🏡 *Cottage:* ${enquiry.roomName}
📅 *Dates:* ${enquiry.checkIn} to ${enquiry.checkOut} (${nights} night${nights > 1 ? 's' : ''})
👥 *Guests:* ${enquiry.adults} Adults${enquiry.children ? `, ${enquiry.children} Children` : ''}
💰 *Estimated Total:* ₹${enquiry.estimatedTotal.toLocaleString('en-IN')}
📝 *Notes:* ${enquiry.specialRequests || 'None'}
---------------------------------------
Please confirm cottage availability and final quote.`;

  const phone = DEFAULT_SETTINGS.whatsapp.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return { id: savedId, whatsappUrl };
}

// Admin: Get all enquiries
export async function getAllEnquiries(): Promise<Enquiry[]> {
  try {
    const colRef = collection(db, 'enquiries');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Enquiry));
  } catch (err) {
    console.error('Failed to get enquiries:', err);
    return [];
  }
}

// Admin: Update enquiry status
export async function updateEnquiryStatus(enquiryId: string, status: Enquiry['status']): Promise<void> {
  const docRef = doc(db, 'enquiries', enquiryId);
  await updateDoc(docRef, { status });
}

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

// Upload media file to Firebase Storage
export async function uploadMediaFile(file: File, folder = 'media'): Promise<string> {
  try {
    const filename = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `${folder}/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (err) {
    console.error('Firebase storage upload failed, falling back to local object URL or error:', err);
    // Return a base64 or object URL fallback if storage is restricted
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

// Admin: Save or update room
export async function saveRoom(room: Room): Promise<void> {
  const docRef = doc(db, 'rooms', room.id);
  await setDoc(docRef, { ...room, updatedAt: new Date().toISOString() }, { merge: true });
}

// Admin: Delete room
export async function deleteRoom(roomId: string): Promise<void> {
  const docRef = doc(db, 'rooms', roomId);
  await deleteDoc(docRef);
}

// Admin: Save or update Gallery item
export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  const docRef = doc(db, 'gallery', item.id);
  await setDoc(docRef, item, { merge: true });
}

// Admin: Delete Gallery item
export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
}

// Admin: Save or update Experience
export async function saveExperience(item: Experience): Promise<void> {
  const docRef = doc(db, 'experiences', item.id);
  await setDoc(docRef, item, { merge: true });
}

// Admin: Delete Experience
export async function deleteExperience(id: string): Promise<void> {
  const docRef = doc(db, 'experiences', id);
  await deleteDoc(docRef);
}

// Admin: Save or update Dining item
export async function saveDiningItem(item: DiningItem): Promise<void> {
  const docRef = doc(db, 'dining', item.id);
  await setDoc(docRef, item, { merge: true });
}

// Admin: Delete Dining item
export async function deleteDiningItem(id: string): Promise<void> {
  const docRef = doc(db, 'dining', id);
  await deleteDoc(docRef);
}

// Admin: Save or update Offer
export async function saveOffer(item: SpecialOffer): Promise<void> {
  const docRef = doc(db, 'offers', item.id);
  await setDoc(docRef, item, { merge: true });
}

// Admin: Delete Offer
export async function deleteOffer(id: string): Promise<void> {
  const docRef = doc(db, 'offers', id);
  await deleteDoc(docRef);
}

// Admin: Save or update Review
export async function saveReview(review: Review): Promise<void> {
  const docRef = doc(db, 'reviews', review.id);
  await setDoc(docRef, review, { merge: true });
}

// Admin: Delete Review
export async function deleteReview(id: string): Promise<void> {
  const docRef = doc(db, 'reviews', id);
  await deleteDoc(docRef);
}

// Admin: Delete enquiry
export async function deleteEnquiry(enquiryId: string): Promise<void> {
  const docRef = doc(db, 'enquiries', enquiryId);
  await deleteDoc(docRef);
}

// Admin: Save Resort Settings (Homepage content, hero, phone, address)
export async function saveResortSettings(settings: ResortSettings): Promise<void> {
  const docRef = doc(db, 'settings', 'general');
  await setDoc(docRef, settings, { merge: true });
}

// Admin: Seed entire database with authentic Tarkarli data
export async function seedFirestoreDatabase(): Promise<{ success: boolean; count: number }> {
  let count = 0;
  try {
    // Rooms
    for (const room of SEED_ROOMS) {
      await setDoc(doc(db, 'rooms', room.id), room, { merge: true });
      count++;
    }
    // Experiences
    for (const exp of SEED_EXPERIENCES) {
      await setDoc(doc(db, 'experiences', exp.id), exp, { merge: true });
      count++;
    }
    // Dining
    for (const dish of SEED_DINING) {
      await setDoc(doc(db, 'dining', dish.id), dish, { merge: true });
      count++;
    }
    // Gallery
    for (const item of SEED_GALLERY) {
      await setDoc(doc(db, 'gallery', item.id), item, { merge: true });
      count++;
    }
    // Offers
    for (const offer of SEED_OFFERS) {
      await setDoc(doc(db, 'offers', offer.id), offer, { merge: true });
      count++;
    }
    // Reviews
    for (const review of SEED_REVIEWS) {
      await setDoc(doc(db, 'reviews', review.id), review, { merge: true });
      count++;
    }
    // Settings
    await setDoc(doc(db, 'settings', 'general'), DEFAULT_SETTINGS, { merge: true });
    count++;

    return { success: true, count };
  } catch (err) {
    console.error('Seeding firestore database failed:', err);
    throw err;
  }
}
