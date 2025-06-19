import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Convert 'admin' to 'admin@example.com'
      const finalEmail = email.includes('@') ? email : `${email}@example.com`;

      // 🔐 Try Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(auth, finalEmail, password);
      const uid = userCredential.user.uid;

      // 🔎 Check if this UID exists in Firestore collection 'admins'
      const docRef = doc(db, 'admins', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // ✅ Log login time
        await setDoc(
  doc(db, 'adminLogins', uid),
  {
    email: finalEmail,
    loginTime: new Date().toISOString(),
  },
  { merge: true } // ✅ Prevents overwriting existing data
);

        setSuccess('✅ Successfully logged in to Admin Dashboard!');
        setTimeout(() => {
          onClose();
        navigate('/admin-dashboard', { replace: true });
        }, 10);
      } else {
        setError('Access denied: You are not an admin.');
      }
    } catch (err) {
      console.error('Firebase login error:', err.code, err.message);
      setError(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 text-sm"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email (e.g., admin)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password (admin)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#b88c3c] text-white py-2 rounded hover:bg-[#a6782e] transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
