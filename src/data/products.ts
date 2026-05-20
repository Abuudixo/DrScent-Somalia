import { Product, Collection, Testimonial } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'AURA ELITE COLD-AIR DIFFUSER',
    slug: 'aura-elite-diffuser',
    description: 'Our flagship smart cold-air diffuser designed for premium spaces up to 3,000 sqft. Engineered with waterless nebulizing technology.',
    price: 450,
    rating: 4.9,
    reviewsCount: 148,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000',
    category: 'diffusers',
    details: 'The Aura Elite is a masterpiece of design and technology, utilizing high-pressure cold-air nebulization to disperse micro-fine particles of essential oils. This preserves the therapeutic properties of the oils without heat or water dilution. Perfect for large residential spaces, luxury boutiques, or five-star lobbies.',
    benefits: [
      'Covers up to 3,000 sqft efficiently',
      'Waterless cold-air nebulizing technology',
      'Whisper-quiet operation (<28dB)',
      'Smart iOS/Android Bluetooth app scheduling',
      'Sleek solid aluminum matte black shell'
    ],
    specs: [
      { label: 'Coverage Area', value: 'Up to 3,000 sqft' },
      { label: 'Dimensions', value: 'W 140mm x D 140mm x H 310mm' },
      { label: 'Weight', value: '3.4 kg' },
      { label: 'Bottle Capacity', value: '500ml' },
      { label: 'Power', value: '12V DC (AC adapter included)' }
    ],
    sizes: ['Standard Elite']
  },
  {
    id: '2',
    name: 'GRAND OASIS SIGNATURE OIL',
    slug: 'grand-oasis-oil',
    description: 'Inspired by Dubai\'s 7-star hotel lobbies. A luxurious, warm, and sophisticated blend of amber, dry wood, sweet oud, and rich leather.',
    price: 85,
    rating: 5.0,
    reviewsCount: 312,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000',
    category: 'oils',
    details: 'Grand Oasis is our most coveted fragrance, embodying the essence of pure luxury. This multi-layered scent opens with refreshing light cardamom, moving into a deep, mesmerizing heart of dry wood and leather, before settling into a warm base of sweet oud, sandalwood, and soft amber.',
    benefits: [
      '100% Pure Aroma Oil concentrate',
      'Safe for children and pets',
      'Zero synthetic parabens or phthalates',
      'IFRA certified high-end aromatherapy formulation',
      'Long-lasting formulation (lasts up to 60 days)'
    ],
    specs: [
      { label: 'Bottle Size', value: '120ml / 500ml' },
      { label: 'Scent Family', value: 'Woody, Amber, Oriental' },
      { label: 'Key Notes', value: 'Cardamom, Dry Wood, Leather, Oud, Amber' },
      { label: 'Duration', value: 'Approx. 45-60 days (average settings)' }
    ],
    sizes: ['120ml', '500ml']
  },
  {
    id: '3',
    name: 'PORTABLE CAR DIFFUSER PRO',
    slug: 'portable-car-diffuser-pro',
    description: 'Take luxury on the road. Rechargeable battery-powered scent companion fitting perfectly in cup holders with intelligent motion sensing.',
    price: 125,
    rating: 4.7,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000',
    category: 'portable',
    details: 'Bring the signature luxury scent experience to your vehicle or home office. The Car Diffuser Pro features smart vibration/motion sensing, turning on when you drive and off when stationary to preserve battery and oil. Powered by a lithium-ion rechargeable battery, providing up to 60 hours of unplugged luxury.',
    benefits: [
      'Smart vibration sensor auto-start/stop',
      'Fits standard cup holders perfectly',
      'Waterless and completely portable',
      'Rechargeable USB-C lithium-ion battery',
      'Premium dark anodized aluminum design'
    ],
    specs: [
      { label: 'Coverage Area', value: 'Up to 150 sqft' },
      { label: 'Battery Life', value: 'Up to 60 hours' },
      { label: 'Dimensions', value: 'Diameter 68mm x Height 135mm' },
      { label: 'Oil Capacity', value: '20ml' }
    ],
    sizes: ['Carbon Black', 'Champagne Gold']
  },
  {
    id: '4',
    name: 'ROYAL VELVET AROMA OIL',
    slug: 'royal-velvet-oil',
    description: 'An elegant, sensual combination of deep Bulgarian rose, smoky patchouli, warm vanilla, and sophisticated dry cedarwood.',
    price: 78,
    rating: 4.8,
    reviewsCount: 96,
    image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1000',
    category: 'oils',
    details: 'Royal Velvet is a tribute to European and Middle Eastern royalty. It blends precious damask rose with deep earthy patchouli, wrapping the senses in the warm sweetness of Madagascar vanilla and structured dry cedarwood. Designed for spaces of relaxation, fine dining, or premium guest rooms.',
    benefits: [
      '100% therapeutic grade aroma oil',
      'Safe for waterless and ultrasonic systems',
      'Eco-friendly, cruelty-free extraction',
      'Rich base-heavy formula for maximum diffusion duration'
    ],
    specs: [
      { label: 'Bottle Size', value: '120ml' },
      { label: 'Scent Family', value: 'Floral, Woody, Sweet' },
      { label: 'Key Notes', value: 'Damask Rose, Patchouli, Vanilla, Cedarwood' }
    ],
    sizes: ['120ml']
  },
  {
    id: '5',
    name: 'MYSTIC OUD PREMIUM FRAGRANCE',
    slug: 'mystic-oud-fragrance',
    description: 'Deep, mysterious, and captivating. A modern interpretation of classic Arabian Oud with warm incense, leather, saffron, and amber.',
    price: 95,
    rating: 4.9,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000',
    category: 'oils',
    details: 'Mystic Oud captures the true exotic elegance of high-end Arabian perfumery. Saffron and light incense create an immediate warm opening, leading to a deep heart of luxury oud and leather. Warm amber and dark woods ensure a lingering, high-class scent footprint that leaves a memorable impression.',
    benefits: [
      'Deep calming properties',
      'Excellent for neutralising strong odors',
      'Rich, complex notes perfect for colder seasons',
      'Cruelty-free, vegan formulation'
    ],
    specs: [
      { label: 'Bottle Size', value: '120ml / 500ml' },
      { label: 'Scent Family', value: 'Spicy, Smokey, Woody' },
      { label: 'Key Notes', value: 'Saffron, Incense, Oud, Leather, Amber' }
    ],
    sizes: ['120ml', '500ml']
  },
  {
    id: '6',
    name: 'LOBBY SIGNATURE BUNDLE',
    slug: 'lobby-signature-bundle',
    description: 'The ultimate luxury home scent upgrade. Includes the Aura Elite Diffuser and three 120ml bottles of our best-selling signature oils.',
    price: 595,
    rating: 4.95,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000',
    category: 'bundles',
    details: 'Recreate the magnificent olfactory ambiance of a 5-star Dubai resort in your own home. This curated collection packages the powerful Aura Elite Diffuser together with three 120ml signature aroma oil blends: Grand Oasis, Mystic Oud, and Royal Velvet.',
    benefits: [
      'Complete home fragrance setup',
      'Over $140 in combined value savings',
      'Enables scent-matching different rooms',
      'Perfect luxury corporate or wedding gift'
    ],
    specs: [
      { label: 'Included Device', value: 'Aura Elite Diffuser (Matte Black)' },
      { label: 'Included Oils', value: 'Grand Oasis (120ml), Mystic Oud (120ml), Royal Velvet (120ml)' }
    ],
    sizes: ['Complete Set']
  }
];

export const collections: Collection[] = [
  {
    id: 'col-1',
    name: 'AROMA DIFFUSERS',
    slug: 'diffusers',
    description: 'Waterless cold-air nebulizers designed for architectural-level scent dispersion.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000',
    count: 3
  },
  {
    id: 'col-2',
    name: 'SIGNATURE OILS',
    slug: 'oils',
    description: 'Pure, concentrated fragrance compounds formulated for optimal diffusion and elegance.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1000',
    count: 8
  },
  {
    id: 'col-3',
    name: 'CAR & PORTABLE',
    slug: 'portable',
    description: 'Intelligent, battery-powered systems designed for mobile luxury and small spaces.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000',
    count: 2
  },
  {
    id: 'col-4',
    name: 'LUXURY BUNDLES',
    slug: 'bundles',
    description: 'Curated pairings of our nebulizing hardware and masterfully blended aroma concentrates.',
    image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1000',
    count: 3
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sarah Al-Mansoori',
    role: 'General Manager',
    company: 'The Royal Crescent Palace, Dubai',
    review: 'Dr Scent transformed our guest lobbies. The scent delivery is absolutely flawless, consistent, and smells extremely high-end. Guests ask us constantly about our signature fragrance.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Marcus Sterling',
    role: 'Creative Director',
    company: 'Sterling & Co. Boutiques',
    review: 'Visual retail design is only half the equation. Dr Scent gave our physical stores an olfactory identity. The cold-air technology is incredible - no residues, just pure, elegant scent.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Elena Rostova',
    role: 'Interior Architect',
    company: 'Rostova Design Group',
    review: 'I specify Dr Scent diffusers for all my high-end residential clients. The matte black hardware fits seamlessly into luxury minimalist aesthetics, and the scents are divine.',
    rating: 5
  }
];
