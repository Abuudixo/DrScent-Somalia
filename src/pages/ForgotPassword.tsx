import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Sparkles, Check } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige/30 text-matte-black flex flex-col justify-between p-6 md:p-12 transition-colors duration-300">
      
      {/* Top Navigation Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link 
          to="/login" 
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-zinc-500 hover:text-gold-accent transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO LOGIN</span>
        </Link>
        <img 
          src="/drscent-logo-removebg-preview.png" 
          alt="Dr Scent Logo" 
          className="h-10 w-auto object-contain" 
        />
      </div>

      {/* Main Centered Content Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-zinc-200/80 shadow-2xl p-8 md:p-10 space-y-8"
        >
          {/* Header Info */}
          <div className="space-y-2.5 text-center">
            <div className="flex items-center justify-center gap-1.5 text-gold-accent">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-[9px] tracking-widest font-bold uppercase">SECURITY VERIFICATION</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase">
              RECOVERY CHAMBER
            </h1>
            <p className="text-zinc-400 text-xs tracking-wider uppercase">
              Provide your registered email address to receive secure reset credentials.
            </p>
          </div>

          {!sent ? (
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">
                  E-MAIL ADDRESS
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-zinc-200 rounded-none h-12 text-xs tracking-widest focus:border-gold-accent transition-all uppercase placeholder-zinc-300 text-matte-black"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold py-6 rounded-none tracking-widest text-xs uppercase transition-all duration-300 mt-2"
              >
                DISPATCH RESET LINK
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center p-8 border border-gold-accent bg-gold-accent/5 text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-gold-accent/20 border border-gold-accent flex items-center justify-center text-gold-accent mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold tracking-widest uppercase text-gold-accent">
                INSTRUCTIONS DISPATCHED
              </h3>
              <p className="text-zinc-500 text-xs tracking-widest uppercase leading-relaxed">
                We have successfully generated and dispatched a recovery token. Please inspect your inbox shortly.
              </p>
              <Link to="/login" className="w-full">
                <Button className="w-full bg-transparent border border-zinc-200 text-matte-black hover:bg-secondary/40 font-semibold py-4 rounded-none tracking-widest text-[10px] uppercase transition-all duration-300 mt-2">
                  RETURN TO SECURE LOGIN
                </Button>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="max-w-md w-full mx-auto text-[10px] text-zinc-400 tracking-wider text-center">
        © {new Date().getFullYear()} DR. SCENT LABS. ALL TRANSACTIONS ARE SECURED.
      </div>
    </div>
  );
}
