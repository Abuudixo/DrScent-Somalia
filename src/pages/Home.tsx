import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { Trust } from '@/components/sections/Trust';
import { CollectionsGrid } from '@/components/sections/CollectionsGrid';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ShopBySpace } from '@/components/sections/ShopBySpace';
import { Testimonials } from '@/components/sections/Testimonials';
import { Newsletter } from '@/components/sections/Newsletter';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-grow">
        <Hero />
        <Trust />
        <CollectionsGrid />
        <ProductShowcase />
        <WhyChooseUs />
        <ShopBySpace />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
}
