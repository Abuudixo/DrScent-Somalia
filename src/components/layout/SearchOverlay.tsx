import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, Star, ArrowRight, CornerDownLeft } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus input when overlay opens
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setQuery(''); // Reset query on close
    }
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter products based on search term
  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((product) => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.details.toLowerCase().includes(searchTerm) ||
          product.specs.some(spec => spec.value.toLowerCase().includes(searchTerm))
        );
      });

  const suggestions = ['AURA ELITE', 'GRAND OASIS', 'CAR DIFFUSER', 'MYSTIC OUD', 'OILS'];
  
  // Showcase standard featured items (first 3 products) on empty search state
  const trendingProducts = products.slice(0, 3);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col justify-start overflow-hidden"
    >
      {/* Top Header section */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 py-6 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center space-x-2">
          <span className="font-serif text-sm tracking-[0.25em] font-semibold text-foreground">
            DR. SCENT
          </span>
          <span className="text-[10px] text-zinc-400 font-bold tracking-widest uppercase">
            | Search Showroom
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center text-zinc-600 hover:text-foreground"
          aria-label="Close search"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Main Search Panel */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-6 md:px-12 py-12 flex flex-col justify-start">
        {/* Input form */}
        <div className="relative border-b border-zinc-200 focus-within:border-gold-accent py-4 transition-colors duration-300 w-full flex items-center gap-4">
          <Search className="w-6 h-6 text-zinc-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="WHAT LUXURY SCENT EXPERIENCE ARE YOU SEEKING?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-lg md:text-2xl font-serif tracking-[0.08em] placeholder-zinc-300 bg-transparent outline-none border-none text-foreground uppercase"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:text-gold-accent text-zinc-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden md:flex items-center gap-1 text-[9px] text-zinc-400 font-bold tracking-wider bg-zinc-100 px-2 py-1 rounded-sm">
            <span>ESC TO CLOSE</span>
          </div>
        </div>

        {/* Dynamic Display */}
        <AnimatePresence mode="wait">
          {query.trim() === '' ? (
            /* Empty State: Suggestions & Trending */
            <motion.div
              key="suggestions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12 space-y-12"
            >
              {/* Popular Tag suggestions */}
              <div className="space-y-4">
                <h4 className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
                  POPULAR SUGGESTIONS
                </h4>
                <div className="flex flex-wrap gap-3">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 border border-border/80 text-zinc-600 hover:text-gold-accent hover:border-gold-accent text-[10px] font-bold tracking-widest uppercase transition-all duration-300 bg-warm-white"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Grid Showcase */}
              <div className="space-y-6">
                <h4 className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
                  TRENDING SCENTS & SYSTEMS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {trendingProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex gap-4 p-4 border border-border/40 hover:border-gold-accent/40 hover:shadow-xl transition-all duration-300 bg-warm-white"
                    >
                      <div className="w-16 h-20 bg-zinc-100 relative overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <span className="text-[8px] font-bold tracking-[0.15em] text-gold-accent uppercase">
                          {product.category}
                        </span>
                        <h5 className="font-serif text-xs font-semibold tracking-wider text-foreground uppercase line-clamp-1 mt-0.5">
                          {product.name}
                        </h5>
                        <span className="font-mono text-xs text-zinc-500 mt-1">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* Results State */
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="mt-12"
            >
              {filteredProducts.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-border/50 pb-3">
                    <h4 className="text-[10px] text-zinc-400 font-bold tracking-[0.2em] uppercase">
                      SEARCH RESULTS ({filteredProducts.length})
                    </h4>
                    <span className="text-[10px] text-gold-accent font-bold tracking-wider">
                      SHOWROOM DISCOVERIES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-h-[55vh] overflow-y-auto pr-2 scrollbar-thin">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex flex-col border border-border/60 hover:border-gold-accent/40 hover:shadow-2xl transition-all duration-300 bg-warm-white"
                      >
                        {/* Image aspect ratio */}
                        <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden w-full">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                          />
                          <span className="absolute top-3 left-3 bg-matte-black/85 text-warm-white text-[8px] font-bold tracking-widest px-2.5 py-0.5 uppercase">
                            {product.category}
                          </span>
                        </div>

                        {/* Text info */}
                        <div className="p-5 flex flex-col flex-1 space-y-2">
                          <div className="flex items-center gap-1 text-[9px] text-zinc-400 font-mono">
                            <Star className="w-3 h-3 fill-gold-accent text-gold-accent" />
                            <span>{product.rating} ({product.reviewsCount} reviews)</span>
                          </div>
                          <h5 className="font-serif text-xs md:text-sm font-semibold tracking-widest text-foreground group-hover:text-gold-accent transition-colors line-clamp-1 uppercase">
                            {product.name}
                          </h5>
                          <p className="text-zinc-500 text-[10px] leading-relaxed line-clamp-2 uppercase">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/30">
                            <span className="font-mono text-sm text-gold-accent font-semibold">
                              ${product.price.toFixed(2)}
                            </span>
                            <div className="text-[9px] font-bold tracking-wider text-zinc-400 group-hover:text-gold-accent flex items-center gap-1 transition-colors">
                              <span>VIEW</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                /* No Results State */
                <div className="text-center py-20 space-y-6 max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center border border-border mx-auto">
                    <Search className="w-6 h-6 text-zinc-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-serif tracking-widest text-sm uppercase">NO PRODUCTS FOUND</p>
                    <p className="text-zinc-500 text-xs leading-relaxed uppercase">
                      We couldn't find any products matching "{query}". Try checking your spelling or try search tags like "diffuser", "oil" or "oasis".
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-3.5 py-1.5 border border-border/80 text-zinc-500 hover:text-gold-accent hover:border-gold-accent text-[9px] font-bold tracking-widest uppercase transition-all duration-300 bg-warm-white"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
