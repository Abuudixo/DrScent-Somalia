import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sparkles, Shield, Compass, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const pillars = [
    {
      icon: Compass,
      title: 'Dubai Hospitality Heritage',
      description: 'We draw olfactory inspiration from the world\'s most luxurious five-star resorts in Dubai, crafting majestic spatial presence through wood, amber, rose, and rare oud.',
    },
    {
      icon: Sparkles,
      title: 'Cold-Air Engineering',
      description: 'Our waterless, high-pressure nebulizers disperse micro-fine aroma concentrates evenly, maintaining full organic composition without leaving synthetic moisture residues.',
    },
    {
      icon: Shield,
      title: 'Ethical Sensory Curation',
      description: 'Collaborating directly with master perfumers in Grasse and Dubai. Our aroma concentrates are 100% pure, toxin-free, and fully safe for children and pets.',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-20 bg-warm-white text-matte-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          
          {/* Header Section */}
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
              THE MANIFESTO
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-matte-black uppercase">
              OUR SCENT ATELIER
            </h1>
            <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
          </div>

          {/* Story Block 1: The Dubai Inspiration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-1.5 text-gold-accent">
                <Landmark className="w-4 h-4" />
                <span className="font-mono text-[9px] tracking-widest font-bold uppercase">HERITAGE ELEGANCE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest uppercase text-matte-black leading-tight">
                INSPIRED BY THE ARCHITECTURE OF SCENT
              </h2>
              <p className="text-zinc-500 text-xs tracking-wider uppercase leading-relaxed">
                Dr Scent Labs was founded on a singular premise: that the finest luxury spaces are defined not only by what we see, but by what we feel. Inspired by the majestic, immersive sensory branding of Dubai's ultra-premium hospitality houses, we set out to create bespoke olfactory architecture for private estates and luxury physical retail spaces.
              </p>
              <p className="text-zinc-500 text-xs tracking-wider uppercase leading-relaxed">
                By pairing classic French aroma blending techniques with next-generation waterless nebulizing engineering, we ensure that every breath taken in your space triggers a memory of pure, uncompromising elegance.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] bg-zinc-900 border border-border/60 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000"
                alt="Luxury design stone scent"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </div>

          {/* Story Block 2: Pillars */}
          <div className="py-16 border-t border-b border-border/60">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={pillar.title}
                  className="space-y-4 p-6 bg-secondary/15 border border-border/40 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary border border-border text-gold-accent flex items-center justify-center mx-auto">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-xs md:text-sm font-bold tracking-widest uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-500 text-[11px] leading-relaxed uppercase tracking-wider">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Story Block 3: Scent Science */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] md:order-first bg-zinc-900 border border-border/60 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000"
                alt="Premium atomisation scent diffuser"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-1.5 text-gold-accent">
                <Sparkles className="w-4 h-4" />
                <span className="font-mono text-[9px] tracking-widest font-bold uppercase">SCENT TECHNOLOGY</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest uppercase text-matte-black leading-tight">
                COLD-AIR ATOMIZATION
              </h2>
              <p className="text-zinc-500 text-xs tracking-wider uppercase leading-relaxed">
                Standard scent diffusers utilize water, ultrasonic waves, or heat. This changes the chemical molecular composition of raw fragrances, leaving sticky residues on luxury furniture and creating damp air conditions.
              </p>
              <p className="text-zinc-500 text-xs tracking-wider uppercase leading-relaxed">
                Dr Scent nebulizers utilize pressurized cold-air atomization, breaking concentrated botanical oils into micro-droplets under 1 micron in size. These float completely dry and dry-disperse evenly throughout spaces, remaining suspended in air currents for hours while fully retaining original scent integrity.
              </p>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
