import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const heroImages = [
  '/Dr scent Hero pics/DSC06417.webp',
  '/Dr scent Hero pics/Untitled_design_9_d49a9cd8-11d0-40b4-95b9-de3d34f10b41.webp',
  '/Dr scent Hero pics/download.webp'
];

export function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);
  const particles = Array.from({ length: 15 });

  const activeIndex = page % heroImages.length;
  // Handle wrapping for negative indices correctly
  const slideIndex = activeIndex < 0 ? heroImages.length + activeIndex : activeIndex;

  useEffect(() => {
    const timer = setInterval(() => {
      setPage([page + 1, 1]);
    }, 6000);
    return () => clearInterval(timer);
  }, [page]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1, // Max clear visibility!
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 }
      }
    })
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center">
      
      {/* Sliding Background Images */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={heroImages[slideIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Floating Golden Scent Particles */}
      <div className="absolute inset-0 z-15 overflow-hidden pointer-events-none select-none">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[radial-gradient(circle_at_center,#C5A059_0%,transparent_70%)] opacity-35"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, Math.random() * -120 - 50],
              x: [0, (Math.random() - 0.5) * 60],
              opacity: [0, 0.4, 0.7, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-8 select-text">
        
        {/* Fine hospitality subheader */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-2 text-gold-accent tracking-[0.35em] text-[10px] md:text-xs font-semibold uppercase"
        >
          <Sparkles className="w-4 h-4" />
          <span>FINE HOTELS & BOUTIQUE HOME SCENTING</span>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold tracking-widest text-matte-black uppercase leading-[1.15]"
        >
          Architecting <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-matte-black via-gold-accent to-matte-black bg-[size:200%] animate-pulse">
            Scent Memories
          </span>
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="text-zinc-600 text-xs sm:text-sm md:text-base font-light tracking-widest max-w-2xl mx-auto uppercase leading-relaxed"
        >
          Immersive scent delivery systems engineered with waterless cold-air nebulizers. Elevate your environment into an oasis of pure elegance.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link to="/collections">
            <Button className="bg-matte-black hover:bg-gold-accent hover:text-matte-black text-white font-semibold rounded-none tracking-widest text-xs uppercase px-8 py-6 shadow-xl transform transition-transform hover:scale-[1.03] active:scale-[0.98]">
              EXPLORE SCENTS
            </Button>
          </Link>
          
          <Link to="/collections?cat=diffusers">
            <Button 
              variant="outline"
              className="border-matte-black/20 text-matte-black hover:bg-matte-black hover:text-white font-semibold rounded-none tracking-widest text-xs uppercase px-8 py-6 backdrop-blur-md transform transition-all hover:scale-[1.03]"
            >
              SHOP DIFFUSERS <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2 border border-matte-black/10 hover:border-gold-accent hover:text-gold-accent transition-all duration-300 rounded-none bg-white/40 backdrop-blur-sm hidden md:block"
      >
        <ChevronLeft className="w-5 h-5 text-matte-black hover:text-gold-accent" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2 border border-matte-black/10 hover:border-gold-accent hover:text-gold-accent transition-all duration-300 rounded-none bg-white/40 backdrop-blur-sm hidden md:block"
      >
        <ChevronRightIcon className="w-5 h-5 text-matte-black hover:text-gold-accent" />
      </button>

      {/* Slide Page Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > slideIndex ? 1 : -1])}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              slideIndex === index ? "w-8 bg-gold-accent" : "w-2 bg-matte-black/20 hover:bg-matte-black/40"
            )}
          />
        ))}
      </div>

    </section>
  );
}
