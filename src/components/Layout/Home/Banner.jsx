import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const slides = [
  { id: 1, image: '/banner.png', title: 'Winter Collection' },
  { id: 2, image: '/banner.png', title: 'New Arrivals' },
  { id: 3, image: '/banner.png', title: 'Exclusive Deals' },
  { id: 4, image: '/banner.png', title: 'Summer Sale' },
  { id: 5, image: '/banner.png', title: 'Limited Edition' },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Slider */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden relative group aspect-[16/9] lg:aspect-auto lg:h-full min-h-[200px] lg:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title} 
                className="w-full h-full object-contain lg:object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          {/* Slider Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index 
                    ? 'w-8 h-2 bg-[#00aaff]' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Side Banners */}
        <div className="hidden lg:flex flex-col gap-6">
          <div className="rounded-2xl overflow-hidden group relative">
            <img 
              src="/banner 2.png" 
              alt="Groceries" 
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden group relative">
            <img 
              src="/banner 3.png" 
              alt="Beauty" 
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
