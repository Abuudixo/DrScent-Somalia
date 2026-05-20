import React, { useState } from 'react';
import { Star, X, Check, ShoppingBag, ShieldCheck, HelpCircle } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/shared/ProductCard';
import { Product } from '@/types';
import { useCartStore } from '@/store/use-cart-store';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const { addItem } = useCartStore();

  const handleOpenQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0] || '120ml');
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem(selectedProduct, selectedSize);
      handleCloseQuickView();
    }
  };

  // Showcase only top 4 premium signature products
  const showcaseProducts = products.slice(0, 4);

  return (
    <section className="bg-warm-white py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
              MASTER BLENDED COLLECTION
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-matte-black uppercase">
              SIGNATURE OLFACTORY MASTERPIECES
            </h2>
            <div className="w-12 h-[1px] bg-gold-accent mt-4" />
          </div>
          <p className="text-zinc-500 text-xs tracking-widest leading-relaxed max-w-sm uppercase">
            Curated selection of our best-selling waterless nebulizing diffusers and 100% pure aroma oil extracts.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {showcaseProducts.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              
              {/* Quick View Button overlaid on hover */}
              <button
                onClick={(e) => handleOpenQuickView(product, e)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-matte-black/90 dark:bg-warm-white/95 text-warm-white dark:text-matte-black text-[10px] font-bold tracking-[0.25em] px-5 py-3.5 uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 hover:bg-gold-accent dark:hover:bg-gold-accent hover:text-matte-black z-20 shadow-2xl"
              >
                QUICK SPEC PREVIEW
              </button>
            </div>
          ))}
        </div>

        {/* Quick View Dialog Modal */}
        <Dialog open={selectedProduct !== null} onOpenChange={(open) => !open && handleCloseQuickView()}>
          {selectedProduct && (
            <DialogContent className="max-w-3xl bg-warm-white text-matte-black border-border p-0 overflow-hidden rounded-none shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Product Image Panel */}
                <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-zinc-100 min-h-[300px]">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 z-10 bg-matte-black/85 text-warm-white text-[9px] font-bold tracking-[0.2em] px-3 py-1 uppercase">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Info details Panel */}
                <div className="p-8 flex flex-col h-full justify-between overflow-y-auto max-h-[90vh]">
                  
                  {/* Header Title */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-gold-accent text-xs">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 fill-current ${i < Math.floor(selectedProduct.rating) ? 'opacity-100' : 'opacity-20'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-mono text-zinc-500 text-[10px]">({selectedProduct.reviewsCount} REVIEWS)</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold tracking-widest uppercase">
                      {selectedProduct.name}
                    </h3>

                    <p className="font-mono text-lg font-semibold text-gold-accent">
                      ${selectedProduct.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-zinc-500 text-[11px] leading-relaxed uppercase tracking-wider py-4 border-t border-b border-border/50 my-4">
                    {selectedProduct.description}
                  </p>

                  {/* Scent Size Selectors */}
                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <span className="text-[10px] tracking-widest text-zinc-400 font-semibold uppercase block">
                        SELECT SIZE / FINISH:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-3 py-2 text-[10px] tracking-widest font-bold uppercase transition-all duration-200 border ${
                              selectedSize === size
                                ? 'bg-gold-accent border-gold-accent text-matte-black'
                                : 'border-border hover:border-gold-accent'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add To Cart */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold py-6 rounded-none tracking-widest text-xs uppercase transition-all duration-300 mb-4"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO BAG
                  </Button>

                  {/* Safe assurance */}
                  <div className="flex items-center gap-2 text-[9px] text-zinc-400 tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-gold-accent" />
                    <span>CERTIFIED PREMIUM QUALITY | WATERLESS DISPERSION</span>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
}
