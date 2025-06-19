import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
    <div className="py-10 px-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#744d14] mb-8 text-center">Available Tours</h1>

      {tours.length === 0 ? (
        <p className="text-center text-gray-500">No tours available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map(tour => (
            <div key={tour.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <img
                src={tour.imageUrl || 'https://via.placeholder.com/400x250'}
                alt={tour.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-[#b88c3c] mb-1">{tour.title}</h2>
                <p className="text-sm text-gray-600 mb-2 line-clamp-3">{tour.description}</p>
                <p className="text-sm text-gray-500 mb-1">📍 {tour.location}</p>
                <p className="text-lg font-bold text-[#744d14]">PKR {tour.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tours;
