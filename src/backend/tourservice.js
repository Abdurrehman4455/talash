import { db } from '../firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

// Add a new tour to Firestore
export const addTour = async (tourData) => {
  try {
    await addDoc(collection(db, 'tours'), {
      ...tourData,
      createdAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding tour:', error);
    return { success: false, error };
  }
};

// Fetch all tours from Firestore
export const fetchTours = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'tours'));
    const tours = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, data: tours };
  } catch (error) {
    console.error('Error fetching tours:', error);
    return { success: false, error };
  }
};