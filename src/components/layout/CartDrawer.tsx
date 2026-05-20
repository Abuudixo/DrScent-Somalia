import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Minus, Plus, Trash2, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '@/store/use-cart-store';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';


export function CartDrawer() {
  const { 
    items, 
    isOpen, 
    setIsOpen, 
    updateQuantity, 
    removeItem, 
    getCartTotal 
  } = useCartStore();

  const [mounted, setMounted] = useState(false);

  // Avoid hydration issues by waiting for mount
  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  const total = getCartTotal();
  const shippingThreshold = 200;
  const freeShipping = total >= shippingThreshold;
  const remainingForFreeShipping = shippingThreshold - total;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent showCloseButton={false} className="w-full sm:max-w-md bg-warm-white dark:bg-matte-black text-foreground border-l border-border dark:border-zinc-800 p-0 flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold-accent" />
            <h2 className="font-serif text-lg tracking-widest uppercase">SHOPPING BAG</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 -mr-2 bg-transparent hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors flex items-center justify-center text-zinc-500 hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-secondary/40 dark:bg-zinc-900/40 px-6 py-3 border-b border-border dark:border-zinc-800 text-xs tracking-wider flex items-center gap-2">
          <Truck className="w-4 h-4 text-gold-accent flex-shrink-0" />
          {freeShipping ? (
            <span>COMPLIMENTARY EXPRESS DELIVERY APPLIED</span>
          ) : (
            <span>
              ADD <span className="font-bold text-gold-accent">${remainingForFreeShipping.toFixed(2)}</span> MORE FOR COMPLIMENTARY EXPRESS SHIPPING
            </span>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/50 dark:bg-zinc-900 flex items-center justify-center border border-border dark:border-zinc-800">
                <ShoppingBag className="w-6 h-6 text-zinc-400 dark:text-zinc-600" />
              </div>
              <p className="font-serif tracking-widest text-sm uppercase">YOUR BAG IS EMPTY</p>
              <p className="text-zinc-500 text-xs max-w-[240px]">
                Indulge in our exquisite collections and find your signature scent.
              </p>
              <Button
                variant="outline"
                className="border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-matte-black tracking-widest text-xs uppercase"
                onClick={() => setIsOpen(false)}
              >
                CONTINUE BROWSING
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div 
                key={`${item.product.id}-${item.selectedSize}`}
                className="flex gap-4 group border-b border-border/50 dark:border-zinc-800/50 pb-6 last:border-0"
              >
                {/* Product Image */}
                <div className="relative w-20 h-24 bg-zinc-100 dark:bg-zinc-900 overflow-hidden border border-border dark:border-zinc-800 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif text-xs tracking-wider uppercase line-clamp-2">
                        {item.product.name}
                      </h3>
                      <button 
                        onClick={() => removeItem(item.product.id, item.selectedSize)}
                        className="text-zinc-400 hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 uppercase">
                      SIZE: {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-border dark:border-zinc-800 bg-background dark:bg-zinc-900 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-foreground transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 py-1 text-zinc-400 hover:text-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-sm font-semibold text-gold-accent">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer (Total, Shipping, Checkout) */}
        {items.length > 0 && (
          <div className="p-6 bg-secondary/20 dark:bg-zinc-900/20 border-t border-border dark:border-zinc-800 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs tracking-widest text-zinc-500 uppercase">
                <span>SUBTOTAL</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs tracking-widest text-zinc-500 uppercase">
                <span>EXPRESS SHIPPING</span>
                <span className="font-mono">{freeShipping ? 'COMPLIMENTARY' : '$15.00'}</span>
              </div>
            <div className="h-[1px] bg-border dark:bg-zinc-800 w-full shrink-0" />
              <div className="flex justify-between text-sm tracking-widest uppercase">
                <span className="font-medium">ESTIMATED TOTAL</span>
                <span className="font-mono font-bold text-gold-accent">
                  ${(total + (freeShipping ? 0 : 15)).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Link to="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold py-6 rounded-none tracking-widest text-xs uppercase transition-all duration-300 transform active:scale-[0.98]">
                  PROCEED TO SECURE CHECKOUT
                </Button>
              </Link>
              
              <Button
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="w-full hover:bg-transparent hover:text-gold-accent tracking-widest text-xs uppercase text-zinc-500 py-2"
              >
                CONTINUE SHOPPING
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 dark:text-zinc-600 tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-accent" />
              <span>SECURE END-TO-END LUXURY TRANSACTION</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
