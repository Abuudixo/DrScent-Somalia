import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Plus } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.sizes[0] || '120ml');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col h-full bg-white border border-zinc-200/60 rounded-none overflow-hidden transition-all duration-300 hover:shadow-[0_10px_20px_rgba(0,0,0,0.03)] transform hover:-translate-y-[1px]"
    >
      {/* Product Image Container */}
      <Link to={`/product/${product.slug}`} className="relative block w-full aspect-square bg-transparent overflow-hidden">
        
        {/* Floating Category Badge */}
        <span className="absolute top-2 left-2 z-10 bg-matte-black/85 text-warm-white text-[7px] font-bold tracking-[0.12em] px-1.5 py-0.5 uppercase shadow-sm">
          {product.category}
        </span>

        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-3 space-y-1.5 bg-transparent">
        
        {/* Scent rating and review counts */}
        <div className="flex items-center gap-1 text-[#C5A059] text-[8.5px] tracking-wider">
          <div className="flex items-center text-gold-accent">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-2 h-2 fill-current ${i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-20'}`} 
              />
            ))}
          </div>
          <span className="font-mono text-zinc-500">({product.reviewsCount})</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.slug}`} className="block group/title">
          <h3 className="font-serif text-[10px] md:text-[11px] font-semibold tracking-wider text-matte-black group-hover/title:text-gold-accent transition-colors duration-300 uppercase line-clamp-1 leading-normal min-h-0">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-zinc-500 text-[8.5px] leading-snug line-clamp-1 uppercase tracking-wider">
          {product.description}
        </p>

        {/* Sizes Display */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="text-[7.5px] tracking-wider text-zinc-400 font-semibold uppercase flex items-center gap-1 pt-0">
            <span>SIZES:</span>
            <span className="text-zinc-500 font-normal">
              {product.sizes.join(' / ')}
            </span>
          </div>
        )}

        {/* Price & Cart Actions */}
        <div className="flex items-center justify-between pt-1.5 mt-auto">
          <span className="font-mono text-[11px] md:text-xs font-semibold text-gold-accent">
            ${product.price.toFixed(2)}
          </span>

          <Button
            onClick={handleAddToCart}
            variant="ghost"
            className="h-6 w-6 rounded-full bg-zinc-100 hover:bg-gold-accent hover:text-matte-black text-matte-black flex items-center justify-center p-0 transition-all duration-300 border-none cursor-pointer"
            title="Add to Bag"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
