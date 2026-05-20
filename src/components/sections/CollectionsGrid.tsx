import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { collections } from '@/data/products';
import { motion } from 'framer-motion';

export function CollectionsGrid() {
  return (
    <section className="bg-warm-white py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase"
          >
            SENSORY ANTHOLOGIES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-matte-black uppercase"
          >
            FEATURED COLLECTIONS
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={col.id}
              className="group relative aspect-[3/4] bg-zinc-100 overflow-hidden border-none"
            >
              {/* Collection Image */}
              <img
                src={col.image}
                alt={col.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />

              {/* Glassmorphic Scent Tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-warm-white/10 dark:bg-black/20 backdrop-blur-md border border-transparent p-5 flex flex-col justify-end transition-all duration-300 group-hover:border-gold-accent/40">
                <span className="font-mono text-[9px] tracking-widest text-gold-accent font-semibold uppercase mb-1">
                  {col.count} SCENTS & PRODUCTS
                </span>
                
                <h3 className="font-serif text-sm sm:text-base font-semibold tracking-wider text-warm-white uppercase mb-2">
                  {col.name}
                </h3>
                
                <p className="text-[10px] text-zinc-300 tracking-wide uppercase line-clamp-2 leading-relaxed mb-4">
                  {col.description}
                </p>

                <Link 
                  to={`/collections?cat=${col.slug}`} 
                  className="flex items-center gap-1.5 text-[10px] tracking-widest text-warm-white font-bold uppercase group/link hover:text-gold-accent transition-colors duration-200"
                >
                  <span>BROWSE COLLECTION</span>
                  <ChevronRight className="w-3.5 h-3.5 transform transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
