'use client';

import React from 'react';
import { Globe, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Trust() {
  const items = [
    {
      icon: Globe,
      title: 'Global Delivery',
      value: '40+ COUNTRIES',
      description: 'Bringing five-star sensory elegance to luxury residences and premium spaces worldwide.',
    },
    {
      icon: Heart,
      title: 'Family & Pet Safe',
      value: '100% TOXIN FREE',
      description: 'Formulated with ultra-clean waterless technology. Safe for your loved ones and companions.',
    },
    {
      icon: ShieldCheck,
      title: 'Certified Quality',
      value: 'IFRA COMPLIANT',
      description: 'Manufactured under rigorous premium international standard certifications.',
    },
    {
      icon: Sparkles,
      title: 'Noble Fragrances',
      value: '100% PURE AROMA',
      description: 'Concentrated master oils without carrier fluids, additives, or synthetic water residues.',
    },
  ];

  return (
    <section className="bg-warm-white py-16 px-6 md:px-12 transition-colors duration-300 relative z-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Subtle top border decorative divider */}
        <div className="w-full h-[1px] bg-border mb-16" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              key={item.title}
              className="flex flex-col items-center text-center p-6 bg-secondary/20 border border-border/40 group hover:border-gold-accent/40 transition-all duration-300 hover:shadow-lg rounded-none"
            >
              {/* Luxury Icon Cover */}
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border text-gold-accent mb-6 group-hover:scale-105 transition-transform duration-300">
                <item.icon className="w-5 h-5" />
              </div>

              {/* Trust Metric Value */}
              <span className="font-mono text-[10px] tracking-[0.25em] text-gold-accent font-bold uppercase mb-2">
                {item.value}
              </span>

              {/* Trust Title */}
              <h3 className="font-serif text-sm tracking-wider font-semibold uppercase mb-3 text-foreground">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-500 text-[11px] leading-relaxed uppercase tracking-wider">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom border decorative divider */}
        <div className="w-full h-[1px] bg-border mt-16" />
      </div>
    </section>
  );
}
