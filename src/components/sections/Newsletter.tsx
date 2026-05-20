'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-warm-white py-20 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#1C1C1C] to-[#0F0F0F] text-warm-white p-8 md:p-16 border border-zinc-800 relative overflow-hidden">
        
        {/* Abstract luxury fluid background mesh */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-accent/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-zinc-800/20 rounded-full blur-[100px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Text Info */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] tracking-widest text-gold-accent font-bold uppercase block">
              DR. SCENT EXCLUSIVE CIRCLE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest uppercase leading-tight">
              JOIN THE SCENT SOCIETY
            </h2>
            <p className="text-zinc-400 text-xs tracking-wider uppercase leading-relaxed max-w-md">
              Receive complimentary access to luxury fragrance launches, bespoke sensory design curation articles, and early private salon invitations.
            </p>
          </div>

          {/* Form panel */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              {!subscribed ? (
                <motion.form
                  key="subscribe-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <div className="relative flex-grow">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER YOUR E-MAIL ADDRESS"
                      className="bg-black/40 border-zinc-800 text-warm-white placeholder-zinc-500 rounded-none h-14 pl-12 text-xs tracking-widest focus:border-gold-accent transition-all duration-300 w-full"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold rounded-none tracking-widest text-xs h-14 px-8 uppercase transition-colors duration-300 w-full sm:w-auto"
                  >
                    SUBSCRIBE
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="subscribe-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-6 border border-gold-accent bg-gold-accent/5 text-center gap-2"
                >
                  <div className="w-10 h-10 rounded-full bg-gold-accent/20 border border-gold-accent flex items-center justify-center text-gold-accent mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-sm font-bold tracking-widest uppercase text-gold-accent">
                    WELCOME TO THE SOCIETY
                  </h3>
                  <p className="text-zinc-400 text-[10px] tracking-widest uppercase">
                    Your invitation has been dispatched. Welcome to sensory luxury.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
