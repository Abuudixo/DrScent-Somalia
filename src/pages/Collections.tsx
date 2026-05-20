import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/shared/ProductCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('cat') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  const categories = [
    { name: 'ALL PRODUCTS', slug: 'all' },
    { name: 'AROMA DIFFUSERS', slug: 'diffusers' },
    { name: 'SIGNATURE OILS', slug: 'oils' },
    { name: 'CAR & PORTABLE', slug: 'portable' },
    { name: 'LUXURY BUNDLES', slug: 'bundles' },
  ];

  // Filter products by category
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="flex-grow bg-warm-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-20 text-foreground">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
              THE ATELIER ARCHIVES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-matte-black uppercase">
              OUR COLLECTIONS
            </h1>
            <p className="text-zinc-500 text-xs tracking-widest uppercase leading-relaxed max-w-sm mx-auto">
              Explore our range of premium waterless diffusion nebulizers and 100% pure organic aroma concentrate oils.
            </p>
            <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
          </div>

          {/* Category Tabs Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-3 text-[10px] tracking-[0.15em] font-bold uppercase transition-all duration-300 rounded-none border-none ${
                  activeCategory === cat.slug
                    ? 'bg-gold-accent text-matte-black'
                    : 'bg-warm-beige/50 text-zinc-500 hover:text-matte-black hover:bg-warm-beige/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Filtered Product Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-20 text-center space-y-4">
                  <p className="font-serif text-lg tracking-widest uppercase">NO SCENTS MATCHED</p>
                  <p className="text-zinc-500 text-xs tracking-wider uppercase">
                    We currently do not have any listings under this sensory category.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  );
}
