import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'COLLECTIONS',
      links: [
        { name: 'Cold-Air Diffusers', href: '/collections?cat=diffusers' },
        { name: 'Pure Aroma Oils', href: '/collections?cat=oils' },
        { name: 'Car & Portable', href: '/collections?cat=portable' },
        { name: 'Curated Bundles', href: '/collections?cat=bundles' },
      ],
    },
    {
      title: 'THE BRAND',
      links: [
        { name: 'Our Story', href: '/about' },
        { name: 'The Technology', href: '/about#technology' },
        { name: 'Client Testimonials', href: '/#testimonials' },
      ],
    },
    {
      title: 'CLIENT SERVICES',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Scent Consultation', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[#202025] text-white pt-16 pb-8 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-6">
          <Link to="/" className="inline-block group">
            <img 
              src="/drscent-logo-removebg-preview.png" 
              alt="Dr Scent Logo" 
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] brightness-0 invert" 
            />
          </Link>
          <p className="text-zinc-400 text-xs tracking-wider leading-relaxed max-w-sm uppercase">
            Architecting premium scent experiences and cold-air nebulizers inspired by the luxury hospitality of Dubai's most exquisite five-star hotel lobbies. Engineered by Dr Scent.
          </p>
          {/* Socials */}
          <div className="flex items-center space-x-6 pt-2 text-[10px] tracking-[0.2em] font-semibold text-zinc-400">
            <a href="#" className="hover:text-gold-accent transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-gold-accent transition-colors">FACEBOOK</a>
            <a href="#" className="hover:text-gold-accent transition-colors">CONCIERGE</a>
          </div>
        </div>

        {/* Link Columns */}
        {footerLinks.map((column) => (
          <div key={column.title} className="space-y-4">
            <h4 className="font-serif text-xs tracking-[0.2em] font-semibold text-gold-accent uppercase">
              {column.title}
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              {column.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-zinc-400 hover:text-gold-accent transition-colors uppercase duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto border-t border-white/10 my-8" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-widest text-zinc-500 uppercase">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold-accent" />
          <span className="text-zinc-400">© {currentYear} DR. SCENT LABS. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-zinc-400 hover:text-gold-accent transition-colors">Privacy Policy</a>
          <a href="#" className="text-zinc-400 hover:text-gold-accent transition-colors">Terms of Service</a>
          <a href="#" className="text-zinc-400 hover:text-gold-accent transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
