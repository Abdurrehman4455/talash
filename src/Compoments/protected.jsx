// src/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAllowed(false);
        return;
      }

      try {
        const docRef = doc(db, 'admins', user.uid);
        const docSnap = await getDoc(docRef);

        setIsAllowed(docSnap.exists());
      } catch (err) {
        console.error('Permission check failed:', err);
        setIsAllowed(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAllowed === null) return null; // no flash / wait silently
  if (!isAllowed) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
