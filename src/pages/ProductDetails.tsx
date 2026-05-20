import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart, ArrowLeft, Truck, Sparkles, RefreshCw, ShoppingBag, Plus, Minus } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/shared/ProductCard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const { addItem } = useCartStore();

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '120ml');
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4 px-6 mt-20">
          <h1 className="font-serif text-3xl tracking-widest uppercase">SCENT MEMORY NOT FOUND</h1>
          <p className="text-zinc-500 text-xs max-w-sm tracking-wider uppercase">
            The private blend or nebulizing equipment you requested does not exist in our current collection.
          </p>
          <Link to="/collections">
            <Button className="bg-gold-accent hover:bg-gold-accent/90 text-matte-black tracking-widest text-xs uppercase px-8 py-5 rounded-none">
              RETURN TO SHOP
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedSize, quantity);
  };

  // Find related products (same category or others, excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-20 bg-warm-white text-matte-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Back to Shop Link */}
          <Link 
            to="/collections"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold uppercase text-zinc-500 hover:text-gold-accent transition-colors duration-200 mb-8 md:mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO COLLECTIONS</span>
          </Link>

          {/* Product Gallery & Info Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left: Product Image Panel with Gallery */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/5] bg-zinc-100 border border-border/60 overflow-hidden"
              >
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out hover:scale-105"
                />
                <span className="absolute top-6 left-6 z-10 bg-matte-black/85 text-warm-white text-[9px] font-bold tracking-[0.2em] px-4 py-1.5 uppercase shadow-md">
                  {product.category}
                </span>
              </motion.div>

              {/* Thumbnail Gallery Grid */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
                  {product.images.map((img, i) => {
                    const isActive = activeImage === img;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImage(img)}
                        className={`aspect-[3/4] bg-zinc-100 border overflow-hidden transition-all duration-300 ${
                          isActive 
                            ? 'border-gold-accent ring-1 ring-gold-accent/40 shadow-sm' 
                            : 'border-border hover:border-zinc-500'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} gallery ${i + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Product Info details Panel */}
            <div className="space-y-6 md:space-y-8">
              
              {/* Product Header */}
              <div className="space-y-3">
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 text-gold-accent text-xs">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 fill-current ${i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-20'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-mono text-zinc-500 text-[10px] tracking-widest">
                    ({product.reviewsCount} CERTIFIED REVIEWS)
                  </span>
                </div>

                {/* Name */}
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest uppercase text-matte-black leading-tight">
                  {product.name}
                </h1>

                {/* Price */}
                <p className="font-mono text-xl sm:text-2xl font-bold text-gold-accent">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Minimalist Summary */}
              <p className="text-zinc-500 text-xs tracking-wider leading-relaxed uppercase">
                {product.description}
              </p>

              {/* Scent Sizing Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-border/60">
                  <span className="text-[10px] tracking-widest text-zinc-400 font-bold uppercase block">
                    SELECT SIZE / SPECIFICATION:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-3 text-[10px] tracking-widest font-bold uppercase border transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-gold-accent border-gold-accent text-matte-black'
                            : 'border-border hover:border-gold-accent text-matte-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                
                {/* Quantity Control */}
                <div className="flex items-center justify-between border border-border bg-white h-14 px-4 w-full sm:w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-zinc-400 hover:text-foreground transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-zinc-400 hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <Button
                  onClick={handleAddToCart}
                  className="flex-grow bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold h-14 rounded-none tracking-widest text-xs uppercase transition-all duration-300 shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> ADD TO SHOPPING BAG
                </Button>

                {/* Wishlist Button */}
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`h-14 w-14 rounded-none border-border p-0 flex items-center justify-center transition-colors ${
                    isWishlisted ? 'text-rose-500 bg-rose-50/5 border-rose-200' : 'text-zinc-400 hover:text-foreground'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </Button>
              </div>

              {/* Safe features checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-b border-border/60 my-6 text-[10px] tracking-widest text-zinc-400 uppercase">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-gold-accent" />
                  <span>FREE GLOBAL DELIVERY &gt;$200</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-gold-accent" />
                  <span>100% NON-TOXIC & PET SAFE</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-gold-accent" />
                  <span>PURE COLD-AIR NEBULIZING</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4 text-gold-accent" />
                  <span>30 DAY COMPLIMENTARY TRIAL</span>
                </div>
              </div>

              {/* Detailed Description benefits */}
              <div className="space-y-4 pt-2">
                <h3 className="font-serif text-sm font-bold tracking-widest uppercase">
                  THE SCENT PROFILE & DESIGN
                </h3>
                <p className="text-zinc-500 text-xs tracking-wider leading-relaxed uppercase">
                  {product.details}
                </p>
                <ul className="list-disc pl-4 text-zinc-500 text-xs tracking-wider uppercase space-y-2 pt-2">
                  {product.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="space-y-4 pt-6 border-t border-border/60">
                <h3 className="font-serif text-sm font-bold tracking-widest uppercase">
                  SPECIFICATIONS
                </h3>
                <div className="border border-border rounded-none overflow-hidden">
                  {product.specs.map((spec, i) => (
                    <div 
                      key={i} 
                      className="grid grid-cols-3 text-xs tracking-widest uppercase p-4 border-b border-border/60 last:border-0 even:bg-secondary/10"
                    >
                      <span className="font-bold text-zinc-500 col-span-1">{spec.label}</span>
                      <span className="text-matte-black col-span-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Related products Gallery */}
          <div className="mt-24 pt-16 border-t border-border/60 space-y-12">
            <div className="text-center space-y-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
                COMPLEMENTARY SCENTS
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-matte-black uppercase">
                COMPLETE YOUR OLFACTORY DESIGN
              </h2>
              <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
