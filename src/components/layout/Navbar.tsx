import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Activity, ChevronDown } from 'lucide-react';
import { useScroll } from '@/hooks/use-scroll';
import { useCartStore } from '@/store/use-cart-store';
import { CartDrawer } from './CartDrawer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const isScrolled = useScroll(50);
  const { pathname } = useLocation();
  const { setIsOpen: setCartOpen, getCartItemsCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Avoid hydration issues
  const itemsCount = getCartItemsCount();
  useEffect(() => {
    setCartCount(itemsCount);
  }, [itemsCount]);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { 
      name: 'COLLECTIONS', 
      href: '/collections',
      subLinks: [
        { name: 'AROMA DIFFUSERS', href: '/collections?cat=diffusers' },
        { name: 'SIGNATURE OILS', href: '/collections?cat=oils' },
        { name: 'CAR & PORTABLE', href: '/collections?cat=portable' },
        { name: 'LUXURY BUNDLES', href: '/collections?cat=bundles' },
      ]
    },
    { name: 'OUR STORY', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out border-b bg-white border-border/40 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]',
          isScrolled ? 'py-3 md:py-4 shadow-md' : 'py-4 md:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1.5 -ml-1.5 text-matte-black hover:text-gold-accent transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/drscent-logo-removebg-preview.png" 
              alt="Dr Scent Logo" 
              className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-10 text-xs tracking-[0.2em] font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.name} className="relative group py-4">
                  <Link
                    to={link.href}
                    className={cn(
                      'relative py-1 hover:text-gold-accent transition-colors duration-300 flex items-center gap-1',
                      isActive ? 'text-gold-accent' : 'text-matte-black/80'
                    )}
                  >
                    {link.name}
                    {link.subLinks && <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />}
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator" 
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-accent"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                  {link.subLinks && (
                    <div className="absolute top-full left-0 mt-0 w-52 bg-white border border-border/40 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex flex-col py-2 z-50">
                      {link.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className="px-5 py-3 text-[10px] text-matte-black/70 hover:text-gold-accent hover:bg-zinc-50 transition-colors uppercase tracking-widest font-semibold"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Profile (Auth link) */}
            <Link to="/login" className="p-2 text-matte-black hover:text-gold-accent transition-colors duration-300">
              <User className="w-[18px] h-[18px] md:w-5 md:h-5" />
            </Link>


            {/* Shopping Bag / Cart */}
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 text-matte-black hover:text-gold-accent transition-colors duration-300 relative flex items-center"
            >
              <ShoppingBag className="w-[18px] h-[18px] md:w-5 md:h-5" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gold-accent text-matte-black font-mono text-[9px] font-bold rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-warm-white text-matte-black z-50 md:hidden flex flex-col p-6 shadow-2xl border-r border-border"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif text-lg font-bold tracking-[0.2em] text-matte-black">DR. SCENT</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-matte-black hover:text-gold-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <nav className="flex flex-col space-y-6 text-sm tracking-widest font-medium">
                {navLinks.map((link, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={link.name}
                    className="flex flex-col"
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'py-1 hover:text-gold-accent transition-colors flex items-center justify-between pr-4',
                        pathname === link.href ? 'text-gold-accent' : 'text-matte-black'
                      )}
                    >
                      <span>{link.name}</span>
                      {link.subLinks && <ChevronDown className="w-4 h-4 text-zinc-400" />}
                    </Link>
                    {link.subLinks && (
                      <div className="flex flex-col ml-4 mt-4 border-l border-border pl-4 space-y-4">
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="text-xs tracking-widest text-zinc-500 hover:text-gold-accent transition-colors uppercase"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Bottom Utilities */}
              <div className="mt-auto pt-6 border-t border-border space-y-4 flex flex-col gap-3">
                <Link to="/login" className="flex items-center space-x-3 text-xs tracking-wider font-semibold text-zinc-500 hover:text-gold-accent">
                  <User className="w-4 h-4" />
                  <span>MY ACCOUNT</span>
                </Link>
                <Link to="/admin" className="flex items-center space-x-3 text-xs tracking-wider font-semibold text-gold-accent hover:text-gold-accent-hover">
                  <Activity className="w-4 h-4 text-gold-accent" />
                  <span>ADMIN PORTAL</span>
                </Link>
                <div className="text-[10px] text-zinc-400 tracking-wider pt-2 border-t border-border/40">
                  © {new Date().getFullYear()} DR. SCENT LABS
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
