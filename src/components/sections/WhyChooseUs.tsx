'use client';

import React from 'react';
import { Wind, Smartphone, Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhyChooseUs() {
  const features = [
    {
      icon: Wind,
      title: 'COLD-AIR DIFFUSION TECHNOLOGY',
      description: 'Unlike heat or water systems that dilute scent profiles and leave oily condensates, our high-pressure nebulizers break pure fragrance oil into micro-fine particles that disperse evenly, preserving therapeutic notes.',
    },
    {
      icon: Smartphone,
      title: 'INTELLIGENT SCENT MANAGEMENT',
      description: 'Program operations seamlessly. Elite models sync via Bluetooth, allowing custom scent schedules, duration bursts, and intensity calibration to match active residential or operational boutique hours.',
    },
    {
      icon: Sparkles,
      title: 'PREMIUM OIL CONCENTRATES',
      description: 'Crafted in collaboration with master perfumers in Grasse and Dubai. Our signature aroma oils contain pure, concentrated botanical extracts and organic resins, creating deep, sophisticated memories.',
    },
    {
      icon: Shield,
      title: 'SAFE FOR PETS & INTERIORS',
      description: 'Formulated completely without toxic solvents, alcohols, or water. There is zero moisture accumulation or residue, ensuring 100% safety for precious fabrics, fine wooden interiors, pets, and children.',
    },
  ];

  return (
    <section className="bg-warm-white py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
            THE ANATOMY OF ELEGANCE
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-matte-black uppercase">
            WHY SPECIFY DR. SCENT
          </h2>
          <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Features list cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={feat.title}
              className="flex gap-6 p-8 bg-secondary/25 border border-border/40 rounded-none group hover:border-gold-accent/40 transition-colors duration-300"
            >
              {/* Feature Icon */}
              <div className="w-12 h-12 rounded-full bg-secondary border border-border text-gold-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                <feat.icon className="w-5 h-5" />
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                 <h3 className="font-serif text-xs md:text-sm font-bold tracking-widest text-matte-black uppercase">
                  {feat.title}
                </h3>
                 <p className="text-zinc-500 text-xs tracking-wider uppercase leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
