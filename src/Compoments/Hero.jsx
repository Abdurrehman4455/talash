import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';
import heroBg from '../images/zzz.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.3 } },
        }}
        className="relative z-10 text-center text-white max-w-3xl mx-auto px-4 flex flex-col justify-center items-center h-full"
      >
        {/* Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0)' },
          }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 tracking-wide"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          DISCOVER THE WORLD WITH
          <TypeAnimation
            sequence={[
              ' TALASH',
              2000,
              ' ADVENTURE',
              2000,
              ' LUXURY TOURS',
              2000,
              ' TRUSTED GUIDES',
              2000,
            ]}
            wrapper="span"
            speed={50}
            className="block text-[#f3cb83]"
            repeat={Infinity}
          />
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(3px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0)' },
          }}
          transition={{ duration: 1 }}
          className="text-lg md:text-xl text-[#f0e7d2] mb-10 font-medium"
        >
          LUXURY TOURS &nbsp;|&nbsp; CUSTOM EXPERIENCES &nbsp;|&nbsp; TRUSTED GUIDES
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(184,140,60,0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/tours')}
            className="bg-[#b88c3c] hover:bg-[#a6782e] text-white py-3 px-6 rounded-full font-semibold transition-all shadow-xl"
          >
            EXPLORE TOURS
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(59,130,246,0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/book')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-full font-semibold transition-all shadow-xl"
          >
            BOOK NOW
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
