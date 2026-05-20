import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles, ChevronRight, Layers, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export function ShopBySpace() {
  const spaces = [
    {
      title: 'UP TO 500 SQFT',
      name: 'RESIDENTIAL HAVENS',
      description: 'Ideal for bedrooms, walk-in closets, study chambers, or executive office cabins.',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000',
      link: '/collections?cat=diffusers',
    },
    {
      title: 'UP TO 1500 SQFT',
      name: 'GRAND SALONS',
      description: 'Engineered for open-concept dining halls, retail suites, or wellness lounges.',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000',
      link: '/collections?cat=diffusers',
    },
    {
      title: 'UP TO 3000 SQFT',
      name: 'ESTATE RESIDENCES',
      description: 'Exceptional Nebulizing capacity for double-height entrances and expansive duplexes.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000',
      link: '/collections?cat=diffusers',
    },
    {
      title: 'CENTRAL HVAC',
      name: 'COMMERCIAL ARCHITECTURE',
      description: 'Discreet inline ducted integration for full-building luxury scent dispersion.',
      icon: Building,
      image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000',
      link: '/collections?cat=diffusers',
    },
  ];

  return (
    <section className="bg-warm-white py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase"
          >
            CUSTOM SCENT ARCHITECTURE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-matte-black uppercase"
          >
            SHOP BY SPACE SIZE
          </motion.h2>
          <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Space size cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {spaces.map((space, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              key={space.title}
              className="group relative aspect-[3/4] bg-zinc-900 overflow-hidden border border-border/40"
            >
              {/* Background Cover Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-45"
                style={{ backgroundImage: `url('${space.image}')` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent z-10" />

              {/* Content Panel */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-warm-white">
                
                {/* Space Capacity */}
                <div className="flex items-center gap-2 mb-2">
                  <space.icon className="w-4 h-4 text-gold-accent" />
                  <span className="font-mono text-[9px] tracking-widest text-gold-accent font-bold uppercase">
                    {space.title}
                  </span>
                </div>

                {/* Scent Class Name */}
                <h3 className="font-serif text-base font-bold tracking-wider uppercase mb-2">
                  {space.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-300 text-[10px] tracking-wide uppercase line-clamp-2 leading-relaxed mb-6">
                  {space.description}
                </p>

                {/* Secure consultation Link */}
                <Link 
                  to={space.link}
                  className="flex items-center gap-1 text-[9px] tracking-widest font-bold uppercase text-warm-white hover:text-gold-accent group/btn transition-colors duration-200"
                >
                  <span>EXPLORE OPTIONS</span>
                  <ChevronRight className="w-3.5 h-3.5 transform transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
