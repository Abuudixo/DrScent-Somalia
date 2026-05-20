import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [message, setMessage] = useState('');

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-20 bg-warm-white text-matte-black transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold-accent font-semibold uppercase block">
              ATELIER INQUIRIES
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-matte-black uppercase">
              CONNECT WITH US
            </h1>
            <p className="text-zinc-500 text-xs tracking-widest uppercase leading-relaxed max-w-sm mx-auto">
              Schedule a bespoke spatial scent consultation or inquire about residential and corporate plans.
            </p>
            <div className="w-12 h-[1px] bg-gold-accent mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Info details Panel */}
            <div className="lg:col-span-1 space-y-8 p-8 bg-warm-beige/30 border border-border/40 rounded-none">
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-gold-accent">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-mono text-[9px] tracking-widest font-bold uppercase">DIRECT OFFICE</span>
                </div>
                <h3 className="font-serif text-lg font-bold tracking-widest uppercase text-matte-black">
                  DR. SCENT SHOWROOMS
                </h3>
              </div>

              <div className="space-y-6 text-xs tracking-widest uppercase">
                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-gold-accent flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold text-matte-black">ATELIER DESIGN LAB</p>
                    <p className="text-zinc-500 leading-relaxed">
                      TCC Tower, Shop Floor,<br />
                      Isgoyska-Taleex, Mogadishu, Somalia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-4 h-4 text-gold-accent flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold text-matte-black">TELEPHONE SUPPORT</p>
                    <p className="text-zinc-500 leading-relaxed">
                      +252 61 683 2200
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-gold-accent flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="font-bold text-matte-black">E-MAIL COMMUNICATIONS</p>
                    <p className="text-zinc-500 leading-relaxed">
                      somalia@dr-scent.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Concierge Panel */}
            <div className="lg:col-span-2 p-8 md:p-10 bg-warm-beige/30 border border-border/40 rounded-none relative overflow-hidden flex flex-col justify-between min-h-[450px]">
              
              {/* Online pulse tag */}
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[9px] tracking-[0.25em] text-emerald-500 font-bold uppercase">
                  CONCIERGE DESK ONLINE
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-widest uppercase text-matte-black">
                    LUXURY WHATSAPP ATELIER
                  </h3>
                  <p className="text-zinc-500 text-[11px] md:text-xs tracking-wider uppercase leading-relaxed max-w-xl">
                    Skip standard forms and connect immediately with our spatial scent specialists in Dubai and Canada. Discuss corporate installations, residential diffusers, or signature fragrance profiles.
                  </p>
                </div>

                {/* Pre-fill message box */}
                <div className="space-y-3">
                  <Label htmlFor="whatsapp-msg" className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 font-bold block">
                    OPTIONAL INQUIRY DETAIL (SENDS AUTOMATICALLY)
                  </Label>
                  <textarea
                    id="whatsapp-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="E.G. HELLO CONCIERGE, I'D LIKE TO SCHEDULE A BESPOKE RESIDENTIAL SCENT CONSULTATION FOR A 2,500 SQFT ENVIRONMENT..."
                    className="w-full bg-white border border-border rounded-none p-4 text-xs tracking-widest focus:border-gold-accent focus:outline-none uppercase placeholder-zinc-400 text-matte-black transition-colors duration-300"
                  />
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={() => {
                    const defaultMsg = "Hello Dr. Scent Somalia Concierge, I would like to inquire about bespoke scent design services.";
                    const textToSend = message.trim() ? message : defaultMsg;
                    const encodedText = encodeURIComponent(textToSend);
                    window.open(`https://wa.me/252616832200?text=${encodedText}`, '_blank');
                  }}
                  className="w-full md:w-auto px-8 py-7 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-none tracking-[0.25em] text-xs uppercase flex items-center justify-center gap-3.5 shadow-lg hover:shadow-emerald-500/10 transform hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.015 14.07 1.01 11.478 1.01c-5.44 0-9.866 4.372-9.87 9.802 0 1.714.475 3.39 1.374 4.869l-.997 3.642 3.734-.978zm11.567-7.61c-.302-.151-1.791-.884-2.073-.987-.282-.103-.487-.152-.693.152-.206.304-.796.987-.975 1.192-.179.205-.359.227-.661.076-.302-.151-1.274-.469-2.426-1.496-.896-.798-1.5-1.785-1.677-2.088-.178-.303-.019-.467.132-.617.136-.135.302-.353.454-.529.151-.177.202-.303.303-.505.101-.202.051-.379-.025-.53-.076-.151-.693-1.666-.95-2.285-.25-.6-.525-.515-.718-.525-.186-.01-.4-.01-.613-.01-.213 0-.559.08-.85.4-.291.32-1.111 1.087-1.111 2.65 0 1.563 1.139 3.075 1.299 3.29.16.213 2.24 3.42 5.426 4.79.758.326 1.35.521 1.812.667.76.242 1.452.208 2.001.126.613-.09 1.791-.73 2.043-1.436.253-.706.253-1.313.178-1.436-.076-.123-.282-.175-.584-.326z" />
                  </svg>
                  <span>START WHATSAPP CHAT</span>
                </Button>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
