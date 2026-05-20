import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/use-cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Truck, ArrowLeft, CheckCircle, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Settle hydration
  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  const total = getCartTotal();
  const shippingThreshold = 200;
  const freeShipping = total >= shippingThreshold;
  const shippingCost = freeShipping ? 0 : 15;
  const finalTotal = total + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate random luxury Order reference
    const ref = 'MLG-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(ref);
    setIsCompleted(true);
    clearCart();
  };

  if (!mounted) return null;

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-20 bg-warm-white text-matte-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="checkout-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
              >
                {/* Left Side: Forms (col-span 7) */}
                <div className="lg:col-span-7 space-y-8">
                  
                  {/* Back button */}
                  <Link 
                    to="/collections" 
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-bold uppercase text-zinc-500 hover:text-gold-accent transition-colors duration-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>RETURN TO SHOP</span>
                  </Link>

                  <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase text-matte-black">
                    SECURE CHECKOUT
                  </h1>

                  {items.length === 0 ? (
                    <div className="py-12 border border-border bg-white text-center space-y-4">
                      <p className="font-serif text-sm tracking-widest uppercase">YOUR BAG IS EMPTY</p>
                      <Link to="/collections">
                        <Button className="bg-gold-accent hover:bg-gold-accent/90 text-matte-black tracking-widest text-xs uppercase px-8 py-4 rounded-none">
                          BROWSE PRODUCTS
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <form onSubmit={handlePlaceOrder} className="space-y-6">
                      
                      {/* Section 1: Customer Info */}
                      <div className="space-y-4 p-6 bg-warm-beige/30 border border-border/40">
                        <h3 className="font-serif text-xs md:text-sm font-bold tracking-widest uppercase text-gold-accent border-b border-border/60 pb-3">
                          1. CONCIERGE INFORMATION
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">FULL NAME</Label>
                            <Input id="name" required className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 uppercase" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">E-MAIL ADDRESS</Label>
                            <Input id="email" type="email" required className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 uppercase" />
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Delivery Details */}
                      <div className="space-y-4 p-6 bg-warm-beige/30 border border-border/40">
                        <h3 className="font-serif text-xs md:text-sm font-bold tracking-widest uppercase text-gold-accent border-b border-border/60 pb-3">
                          2. PRIVATE DELIVERY DESTINATION
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">STREET ADDRESS</Label>
                            <Input id="address" required className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 uppercase" />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2 space-y-2">
                              <Label htmlFor="city" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">CITY</Label>
                              <Input id="city" required className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 uppercase" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="postal" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">ZIP CODE</Label>
                              <Input id="postal" required className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 uppercase" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Payment Card Details */}
                      <div className="space-y-4 p-6 bg-warm-beige/30 border border-border/40">
                        <h3 className="font-serif text-xs md:text-sm font-bold tracking-widest uppercase text-gold-accent border-b border-border/60 pb-3">
                          3. SECURE END-TO-END LUXURY TRANSACTION
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">CREDIT CARD NUMBER</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                              <Input id="card" required placeholder="0000 0000 0000 0000" className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 pl-12 font-mono" />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">EXPIRY DATE</Label>
                              <Input id="expiry" required placeholder="MM/YY" className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 font-mono" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">CVC / SECURITY CODE</Label>
                              <Input id="cvc" required placeholder="123" className="bg-white border-border text-matte-black text-xs tracking-widest rounded-none h-11 font-mono" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Checkout Submit */}
                      <Button
                        type="submit"
                        className="w-full bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold py-6 rounded-none tracking-widest text-xs uppercase transition-all duration-300"
                      >
                        PLACE SECURE ORDER OF ${finalTotal.toFixed(2)}
                      </Button>
                    </form>
                  )}
                </div>

                {/* Right Side: Cart Summary (col-span 5) */}
                <div className="lg:col-span-5 bg-warm-beige/30 border border-border/40 p-6 md:p-8 space-y-6">
                  <h3 className="font-serif text-sm font-bold tracking-widest uppercase">
                    ORDER SUMMARY
                  </h3>

                  {items.length === 0 ? (
                    <p className="text-zinc-500 text-xs tracking-widest uppercase">NO PRIVATE SELECTIONS LOGGED</p>
                  ) : (
                    <>
                      {/* Summary list */}
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {items.map((item) => (
                          <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-4 items-center">
                            <div className="relative w-12 h-14 bg-zinc-100 overflow-hidden border border-border flex-shrink-0">
                              <img src={item.product.image} alt={item.product.name} className="absolute inset-0 w-full h-full object-cover" />
                            </div>
                            <div className="flex-grow min-w-0 text-xs tracking-wider uppercase">
                              <h4 className="font-bold text-matte-black truncate">{item.product.name}</h4>
                              <p className="text-zinc-500 mt-0.5">SIZE: {item.selectedSize} | QUANTITY: {item.quantity}</p>
                            </div>
                            <span className="font-mono text-xs font-semibold text-gold-accent">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="h-[1px] bg-border w-full shrink-0" />

                      {/* Calculations details */}
                      <div className="space-y-2 text-xs tracking-widest uppercase">
                        <div className="flex justify-between text-zinc-500">
                          <span>CART SUBTOTAL</span>
                          <span className="font-mono text-matte-black">${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-500">
                          <span>EXPRESS SECURE DELIVERY</span>
                          <span className="font-mono text-matte-black">{freeShipping ? 'COMPLIMENTARY' : '$15.00'}</span>
                        </div>
                        <div className="h-[1px] bg-border/80 w-full shrink-0 my-4" />
                        <div className="flex justify-between text-sm tracking-widest text-matte-black font-bold">
                          <span>ESTIMATED ORDER TOTAL</span>
                          <span className="font-mono text-gold-accent">${finalTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="h-[1px] bg-border w-full shrink-0" />

                      {/* Protection Assurances */}
                      <div className="space-y-3.5 text-[9px] tracking-widest text-zinc-500 uppercase">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-gold-accent" />
                          <span>FULLY SECURED TRANSACTIONS ONLY</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-gold-accent" />
                          <span>PRIVATE DISPATCH & TRACKING LOGS</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="checkout-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto py-16 px-8 border border-gold-accent bg-gold-accent/5 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold-accent/20 border border-gold-accent flex items-center justify-center text-gold-accent mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-bold uppercase block">
                    TRANSACTION RESOLVED
                  </span>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase">
                    THANK YOU FOR YOUR SELECTION
                  </h1>
                </div>

                <p className="text-zinc-500 text-xs tracking-widest leading-relaxed uppercase">
                  Your spatial scent products and luxury nebulizing hardware are being privately curated. Dispatch details and tracking codes will be emailed within 12 hours.
                </p>

                <div className="p-4 bg-white border border-border rounded-none max-w-sm mx-auto text-xs tracking-widest uppercase space-y-1.5">
                  <p className="font-bold text-matte-black">ORDER REFERENCE ID</p>
                  <p className="font-mono text-gold-accent font-bold text-sm tracking-widest">{orderId}</p>
                </div>

                <div className="pt-4">
                  <Link to="/">
                    <Button className="bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold px-8 py-5 rounded-none tracking-widest text-xs uppercase transition-colors duration-300">
                      RETURN TO MAIN ATELIER
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
    </>
  );
}
