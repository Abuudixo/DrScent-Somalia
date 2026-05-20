import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Logged in successfully! (Prototype Session)');
  };

  return (
    <div className="min-h-screen bg-warm-beige/30 text-matte-black flex flex-col justify-between p-6 md:p-12 transition-colors duration-300">
      
      {/* Top Navigation Header */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-zinc-500 hover:text-gold-accent transition-colors duration-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ATELIER</span>
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
              <span className="font-mono text-[9px] tracking-widest font-bold uppercase">SECURE PORTAL</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest uppercase">
              WELCOME BACK
            </h1>
            <p className="text-zinc-400 text-xs tracking-wider uppercase">
              Access your luxury scent preferences and private orders.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
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

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">
                  PASSWORD
                </Label>
                <Link 
                  to="/forgot-password" 
                  className="text-[9px] tracking-widest uppercase text-gold-accent hover:underline"
                >
                  FORGOT PASSWORD?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-zinc-200 rounded-none h-12 text-xs tracking-widest focus:border-gold-accent transition-all text-matte-black"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gold-accent hover:bg-gold-accent/90 text-matte-black font-semibold py-6 rounded-none tracking-widest text-xs uppercase transition-all duration-300 mt-2"
            >
              SIGN IN
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-200"></div>
            <span className="flex-shrink mx-4 text-[9px] tracking-widest text-zinc-400 font-bold uppercase">
              OR SIGN IN WITH
            </span>
            <div className="flex-grow border-t border-zinc-200"></div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="border-zinc-200 bg-white rounded-none h-12 text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors text-matte-black"
            >
              GOOGLE
            </Button>
            <Button
              variant="outline"
              className="border-zinc-200 bg-white rounded-none h-12 text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-zinc-50 transition-colors text-matte-black"
            >
              APPLE ID
            </Button>
          </div>

          {/* Register Link */}
          <div className="text-center text-xs tracking-wider text-zinc-400 uppercase pt-4">
            NEW TO THE SOCIETY?{' '}
            <Link to="/register" className="text-gold-accent font-bold hover:underline">
              CREATE AN ACCOUNT
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="max-w-md w-full mx-auto text-[10px] text-zinc-400 tracking-wider text-center">
        © {new Date().getFullYear()} DR. SCENT LABS. ALL TRANSACTIONS ARE SECURED.
      </div>
    </div>
  );
}
