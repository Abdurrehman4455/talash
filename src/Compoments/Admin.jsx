// Admin.jsx (responsive version)
import React, { useState, useEffect } from 'react';
import {
  FaPlusCircle,
  FaList,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

const CLOUD_NAME = 'dca9mcjte';
const UPLOAD_PRESET = 'react_upload';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [tours, setTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newTour, setNewTour] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewTour((prev) => ({ ...prev, image: files[0] }));
    } else {
      setNewTour((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchTours = async () => {
    const snap = await getDocs(collection(db, 'tours'));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setTours(list);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleAddTour = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    try {
      if (newTour.image) {
        const formData = new FormData();
        formData.append('file', newTour.image);
        formData.append('upload_preset', UPLOAD_PRESET);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!data.secure_url) throw new Error(data.error?.message || 'Image upload failed');
        imageUrl = data.secure_url;
      }

      const payload = {
        title: newTour.title,
        description: newTour.description,
        location: newTour.location,
        price: Number(newTour.price),
        imageUrl,
      };

      await addDoc(collection(db, 'tours'), payload);
      alert('Tour added successfully!');
      setNewTour({ title: '', description: '', location: '', price: '', image: null });
      setShowModal(false);
      fetchTours();
    } catch (err) {
      console.error(err);
      alert('Failed to upload image or save data. Please try again.');
    }
  };

  const Section = ({ id, children }) => (
    <section id={id} className={`py-6 px-4 sm:px-6 ${activeSection !== id ? 'hidden' : 'block'}`}>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-[#744d14] text-white w-full sm:w-64 flex-shrink-0 p-4 sm:p-6 ${mobileMenuOpen ? 'block' : 'hidden'} sm:block`}>
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button className="sm:hidden" onClick={() => setMobileMenuOpen(false)}><FaTimes /></button>
        </div>
        <nav className="space-y-4">
          <button onClick={() => setActiveSection('dashboard')} className="flex items-center space-x-2 hover:text-[#b88c3c]">
            <FaList /><span>Dashboard</span>
          </button>
          <button onClick={() => setActiveSection('addTour')} className="flex items-center space-x-2 hover:text-[#b88c3c]">
            <FaPlusCircle /><span>Add Tour</span>
          </button>
          <button onClick={() => setActiveSection('destinations')} className="flex items-center space-x-2 hover:text-[#b88c3c]">
            <FaMapMarkedAlt /><span>Destinations</span>
          </button>
          <button onClick={() => alert('Logging out...')} className="flex items-center space-x-2 text-red-300 hover:text-white">
            <FaSignOutAlt /><span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Toggle */}
      <div className="sm:hidden p-4 flex justify-between bg-[#744d14] text-white">
        <span className="font-bold text-lg">Admin Panel</span>
        <button onClick={() => setMobileMenuOpen(true)}><FaBars /></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <Section id="dashboard">
          <h1 className="text-3xl font-bold text-[#744d14] mb-6">Welcome to Admin Dashboard</h1>
        </Section>

        <Section id="addTour">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#744d14]">Tours</h2>
            <button onClick={() => setShowModal(true)} className="bg-[#b88c3c] text-white px-4 py-2 rounded hover:bg-[#a6782e] mt-2 sm:mt-0">
              Add Tour
            </button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tours.map((tour) => (
              <li key={tour.id} className="bg-white p-4 rounded shadow">
                {tour.imageUrl && <img src={tour.imageUrl} alt={tour.title} className="w-full h-48 object-cover rounded mb-2" />}
                <h3 className="font-bold text-lg">{tour.title}</h3>
                <p>{tour.description}</p>
                <p className="text-sm text-gray-600">{tour.location}</p>
                <p className="text-[#744d14] font-semibold">Rs. {tour.price}</p>
                <button
                  onClick={async () => {
                    await deleteDoc(doc(db, 'tours', tour.id));
                    fetchTours();
                  }}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="destinations">
          <h2 className="text-2xl font-semibold text-[#744d14] mb-4">Manage Destinations</h2>
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <input type="text" placeholder="Add New Destination" className="w-full border px-4 py-2 rounded" />
            <button className="bg-[#b88c3c] text-white px-6 py-2 rounded hover:bg-[#a6782e]">Add Destination</button>
          </div>
        </Section>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold text-[#744d14] mb-4">Add New Tour</h2>
            <form onSubmit={handleAddTour} className="space-y-4">
              <input name="title" type="text" placeholder="Tour Title" value={newTour.title} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
              <textarea name="description" placeholder="Description" value={newTour.description} onChange={handleChange} className="w-full border px-4 py-2 rounded" rows="4" required></textarea>
              <input name="location" type="text" placeholder="Location" value={newTour.location} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
              <input name="price" type="number" placeholder="Price" value={newTour.price} onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
              <input name="image" type="file" accept="image/*" onChange={handleChange} className="w-full border px-4 py-2 rounded" required />
              <div className="flex justify-end space-x-3">
                <button type="button" onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-[#b88c3c] text-white px-6 py-2 rounded hover:bg-[#a6782e]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
