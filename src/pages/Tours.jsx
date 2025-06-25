import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Tours() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'tours'));
        const tourData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTours(tourData);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="py-12 px-4 bg-[#f7f2e9] min-h-screen">
      <h1 className="text-3xl font-bold text-[#744d14] mb-10 text-center">Discover Our Tours</h1>

      {tours.length === 0 ? (
        <p className="text-center text-gray-500">No tours available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              className="bg-white rounded-xl shadow hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                src={tour.imageUrl || 'https://via.placeholder.com/400x200'}
                alt={tour.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h2 className="text-lg font-bold text-[#b88c3c] truncate">{tour.title}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">📍 {tour.location}</span>
                  <span className="text-sm font-bold text-[#744d14]">Rs. {tour.price}</span>
                </div>
              </div>
              <div className="p-4">
                <Link
                  to="/book"
                  className="block w-full bg-[#b88c3c] hover:bg-[#a6782e] text-white text-center py-2 rounded-md font-semibold transition"
                >
                  BOOK NOW
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tours;
