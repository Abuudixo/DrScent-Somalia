'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play every 8 seconds for luxury brand gallery experience
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-warm-white py-20 px-6 md:px-12 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative blurred soft background circles */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gold-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
            THE OLFACTORY VERDICT
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-matte-black uppercase">
            ENDORSED BY LUXURY INSTITUTIONS
          </h2>
          <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Carousel Slider */}
        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="text-center space-y-6"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-gold-accent/30 mx-auto transform -rotate-180" />

              {/* Review Text */}
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-matte-black italic leading-relaxed max-w-2xl mx-auto">
                "{testimonials[activeIndex].review}"
              </p>

              {/* Star Rating */}
              <div className="flex justify-center items-center gap-1 text-gold-accent">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* User Bio */}
              <div>
                <h4 className="font-serif text-xs md:text-sm font-bold tracking-widest text-matte-black uppercase">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="font-mono text-[9px] tracking-widest text-gold-accent uppercase mt-1">
                  {testimonials[activeIndex].role} &mdash; {testimonials[activeIndex].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 border border-border hover:border-gold-accent rounded-full flex items-center justify-center text-matte-black hover:text-gold-accent transition-colors duration-300"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-gold-accent w-4' : 'bg-border'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-10 h-10 border border-border hover:border-gold-accent rounded-full flex items-center justify-center text-matte-black hover:text-gold-accent transition-colors duration-300"
            aria-label="Next Review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
