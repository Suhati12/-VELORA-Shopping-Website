const PRODUCTS = [
  {
    id: 'p1',
    name: 'Obsidian Silk Evening Gown',
    category: 'Dresses',
    price: 890,
    originalPrice: 1050,
    rating: 4.9,
    reviewsCount: 42,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0d0d0d' },
      { name: 'Champagne Gold', hex: '#c9a96e' },
      { name: 'Midnight Navy', hex: '#0a192f' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Crafted from pure mulberry silk, this floor-length evening gown features a graceful drape, plunging back, and subtle gold threading that captures ambient light effortlessly.',
    details: [
      '100% Pure Mulberry Silk',
      'Concealed invisible zip at side',
      'Floor-length fluid drape silhouette',
      'Dry clean only by specialist'
    ],
    materials: '100% Mulberry Silk, 100% Silk Habotai lining.',
    shipping: 'Complimentary white-glove express delivery in signature Velora garment case.'
  },
  {
    id: 'p2',
    name: 'Architectural Tailored Trench Coat',
    category: 'Shirts',
    price: 1250,
    originalPrice: 1400,
    rating: 4.9,
    reviewsCount: 29,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Noir', hex: '#1e1e1e' },
      { name: 'Taupe Beige', hex: '#8c8275' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'An iconic double-breasted trench rendered in water-repellent Italian gabardine with structured shoulders and a waist-cinching belt tipped with custom matte gold hardware.',
    details: [
      'Heavyweight Italian cotton gabardine',
      'Horn buttons with custom Velora engraving',
      'Storm flap and deep storm collar',
      'Made in Milan, Italy'
    ],
    materials: '100% Water-repellent Italian Gabardine Cotton.',
    shipping: 'Complimentary luxury courier delivery with insurance included.'
  },
  {
    id: 'p3',
    name: 'Champagne Gold Skeleton Watch',
    category: 'Watches',
    price: 1850,
    originalPrice: 2100,
    rating: 5.0,
    reviewsCount: 56,
    isNew: true,
    isTrending: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Brushed Gold', hex: '#c9a96e' },
      { name: 'Matte Onyx', hex: '#171717' }
    ],
    sizes: ['One Size (40mm)'],
    description: 'Precision mechanical engineering meets minimalist luxury. Featuring a sapphire crystal exhibition case back, 42-hour power reserve, and hand-finished champagne gold accents.',
    details: [
      'Automatic self-winding Swiss mechanical movement',
      'Scratch-resistant anti-reflective Sapphire crystal',
      '50m Water Resistance (5 ATM)',
      'Genuine Italian alligator embossed leather strap'
    ],
    materials: '316L Stainless Steel, 18k Gold PVD Coating, Sapphire Glass.',
    shipping: 'Ships in a velvet-lined wooden presentation box with certificate of authenticity.'
  },
  {
    id: 'p4',
    name: 'Monochrome Leather Structured Tote',
    category: 'Bags',
    price: 780,
    originalPrice: 850,
    rating: 4.8,
    reviewsCount: 38,
    isNew: false,
    isTrending: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Soft Cream', hex: '#e8e5de' }
    ],
    sizes: ['One Size'],
    description: 'Sculpted from full-grain calfskin leather, this geometric tote seamlessly bridges sharp business lines with effortless weekend refinement.',
    details: [
      '100% Full-Grain Italian Calfskin Leather',
      'Suede micro-fiber interior lining',
      'Internal zip pocket and laptop sleeve (fits 15")',
      'Reinforced rolled leather handles'
    ],
    materials: 'Full-Grain Calfskin Leather.',
    shipping: 'Complimentary shipping in dust bag and branded luxury box.'
  },
  {
    id: 'p5',
    name: 'Italian Calfskin Chelsea Boots',
    category: 'Shoes',
    price: 540,
    originalPrice: 620,
    rating: 4.9,
    reviewsCount: 64,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Nero Black', hex: '#0e0e0e' },
      { name: 'Deep Espresso', hex: '#2c1d11' }
    ],
    sizes: ['EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    description: 'Handcrafted in Tuscany using traditional Blake-stitch construction. Designed with an elongated chisel toe and elastic side gussets for a streamlined profile.',
    details: [
      'Smooth burnished Italian calf leather upper',
      'Hand-painted stacked leather sole with rubber heel insert',
      'Tonal elastic side panels',
      'Handcrafted in Tuscany, Italy'
    ],
    materials: 'Calf Leather Upper, Full Leather Sole.',
    shipping: 'Complimentary shipping with individual cotton boot bags included.'
  },
  {
    id: 'p6',
    name: 'Minimalist Heavyweight Cotton Tee',
    category: 'T-Shirts',
    price: 180,
    originalPrice: 180,
    rating: 4.7,
    reviewsCount: 88,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#121212' },
      { name: 'Pristine White', hex: '#ffffff' },
      { name: 'Slate Grey', hex: '#4a4e51' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'An elevated basic engineered from 280 GSM long-staple Suvin cotton. Cut in a boxy oversized fit with reinforced ribbed collar.',
    details: [
      '280 GSM 100% Suvin Cotton',
      'Pre-shrunk fabric treatment',
      'Blind stitched hem and sleeve cuffs',
      'Subtle tonal Velora embroidery on cuff'
    ],
    materials: '100% Long-Staple Suvin Cotton.',
    shipping: 'Complimentary standard shipping on orders over $150.'
  },
  {
    id: 'p7',
    name: 'Sculptural Gold Ear Cuffs',
    category: 'Accessories',
    price: 290,
    originalPrice: 340,
    rating: 4.8,
    reviewsCount: 19,
    isNew: true,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: '18K Yellow Gold', hex: '#dfb76c' },
      { name: 'Sterling Silver', hex: '#e0e0e0' }
    ],
    sizes: ['One Size'],
    description: 'Architectural fluid lines cast in recycled sterling silver and plated in thick 18-karat yellow gold. Requires no ear piercing.',
    details: [
      'Recycled Sterling Silver base',
      '3 Micron 18k Gold Vermeil plating',
      'Ergonomic comfortable tension clip',
      'Hypoallergenic & Nickel-free'
    ],
    materials: '18k Gold Plated Recycled Silver.',
    shipping: 'Encased in magnetic suede jewelry box.'
  },
  {
    id: 'p8',
    name: 'Raw Japanese Selvedge Slim Jeans',
    category: 'Jeans',
    price: 360,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 31,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Indigo', hex: '#162238' },
      { name: 'Pitch Black', hex: '#0f0f11' }
    ],
    sizes: ['28', '30', '32', '34', '36'],
    description: '14.5 oz raw Kurabo selvedge denim woven on vintage shuttle looms in Okayama. Develops unique personalized fading over time.',
    details: [
      '14.5oz Unwashed Japanese Selvedge Denim',
      'Custom gold-plated copper rivets',
      'Black debossed leather waistband patch',
      'Redline selvedge ID seam'
    ],
    materials: '100% Cotton Okayama Denim.',
    shipping: 'Includes raw denim care guide and tote bag.'
  },
  {
    id: 'p9',
    name: 'Satin Asymmetrical Midi Dress',
    category: 'Dresses',
    price: 650,
    originalPrice: 720,
    rating: 4.8,
    reviewsCount: 22,
    isNew: true,
    isTrending: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Emerald Noir', hex: '#0a2e22' },
      { name: 'Midnight Onyx', hex: '#141414' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'An alluring cocktail dress cut on the bias in lustrous satin. Highlights an architectural single-shoulder bodice and fluid angled hem.',
    details: [
      'Heavy weight stretch silk satin',
      'Bias cut for contouring fit',
      'Single shoulder architectural strap',
      'Hidden side zip closure'
    ],
    materials: '94% Silk, 6% Elastane.',
    shipping: 'Complimentary express shipping.'
  },
  {
    id: 'p10',
    name: 'Crisp Poplin Oversized Oxford Shirt',
    category: 'Shirts',
    price: 260,
    originalPrice: 300,
    rating: 4.7,
    reviewsCount: 45,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure White', hex: '#ffffff' },
      { name: 'Sky Blue Striped', hex: '#b3cbe5' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Impeccably tailored from crisp Egyptian cotton poplin. Features extended cuffs, mother-of-pearl buttons, and a clean curved shirttail.',
    details: [
      '100% Egyptian Giza Cotton Poplin',
      'Genuine Mother-of-Pearl buttons',
      'Relaxed dropped shoulder silhouette',
      'Machine wash gentle / Warm iron'
    ],
    materials: '100% Fine Egyptian Poplin Cotton.',
    shipping: 'Complimentary standard courier.'
  },
  {
    id: 'p11',
    name: 'Crocodile Embossed Leather Shoulder Bag',
    category: 'Bags',
    price: 940,
    originalPrice: 1100,
    rating: 4.9,
    reviewsCount: 51,
    isNew: true,
    isTrending: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Black Croc', hex: '#151515' },
      { name: 'Burgundy Croc', hex: '#4a1521' }
    ],
    sizes: ['One Size'],
    description: 'A compact luxury baguette handbag with deep crocodile heat embossing, polished gold curb chain strap, and suede interior flap.',
    details: [
      'Full grain embossed Italian calfskin',
      'Custom gold-finished V turn-lock closure',
      'Detachable chain strap and leather shoulder strap',
      'Card slot pocket inside'
    ],
    materials: 'Calfskin Leather, 18k Gold Plated Hardware.',
    shipping: 'Delivered in signature hard luxury box.'
  },
  {
    id: 'p12',
    name: 'Minimalist Monolith Platform Loafers',
    category: 'Shoes',
    price: 680,
    originalPrice: 750,
    rating: 4.9,
    reviewsCount: 37,
    isNew: true,
    isTrending: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Polished High-Shine Black', hex: '#0b0b0b' }
    ],
    sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
    description: 'Bold yet refined. Features high-shine spazzalato leather set atop an ultra-lightweight notched treaded platform sole.',
    details: [
      'Spazzalato polished calfskin leather',
      'Lightweight EVA lugged platform sole (45mm elevation)',
      'Enameled Velora coin ornament at vamp',
      'Padded leather footbed'
    ],
    materials: 'Calfskin, Lightweight Rubber Sole.',
    shipping: 'Complimentary shipping.'
  },
  {
    id: 'p13',
    name: 'Oversized Double-Faced Cashmere Sweater',
    category: 'T-Shirts',
    price: 520,
    originalPrice: 580,
    rating: 4.9,
    reviewsCount: 18,
    isNew: false,
    isTrending: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#d9d0c5' },
      { name: 'Charcoal Black', hex: '#222222' }
    ],
    sizes: ['S', 'M', 'L'],
    description: 'Spun from Grade-A Mongolian cashmere. Exceptionally soft, lightweight, and warm with relaxed drop shoulders and wide rib trims.',
    details: [
      '100% Grade-A 2-ply Mongolian Cashmere',
      'Seamless 3D knit construction',
      'Ribbed neckline, cuffs, and hem',
      'Hand wash cold or dry clean'
    ],
    materials: '100% Cashmere.',
    shipping: 'Includes cedar storage pouch.'
  },
  {
    id: 'p14',
    name: 'Dark Square Acetate Sunglasses',
    category: 'Accessories',
    price: 320,
    originalPrice: 380,
    rating: 4.8,
    reviewsCount: 41,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Glossy Black', hex: '#000000' },
      { name: 'Dark Tortoiseshell', hex: '#3d2514' }
    ],
    sizes: ['One Size (54-19-145)'],
    description: 'Sculpted thick acetate sunglasses with flat black Zeiss lenses offering 100% UV protection and subtle engraved gold wire core.',
    details: [
      'Hand-crafted Japanese Mazzucchelli acetate frame',
      'Category 3 Dark Tint Zeiss Lenses',
      '7-barrel custom gold hinges',
      '100% UVA/UVB Protection'
    ],
    materials: 'Japanese Acetate, Glass Lenses.',
    shipping: 'Includes leather folding case and cleaning cloth.'
  },
  {
    id: 'p15',
    name: 'Classic Black Ceramic Chronograph',
    category: 'Watches',
    price: 1450,
    originalPrice: 1600,
    rating: 5.0,
    reviewsCount: 27,
    isNew: false,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Matte Black Ceramic', hex: '#141414' }
    ],
    sizes: ['One Size (42mm)'],
    description: 'High-tech scratch-proof black ceramic casing with matte black dial, gold chronograph subdials, and integrated ceramic link bracelet.',
    details: [
      'High-Density Matte Black Ceramic',
      'Swiss Made Quartz Chronograph Movement',
      'Sapphire Crystal with Anti-Glare Coating',
      '100m Water Resistant'
    ],
    materials: 'Ceramic, Gold-plated Titanium Clasp.',
    shipping: 'Insured luxury delivery with 5-year international warranty.'
  },
  {
    id: 'p16',
    name: 'Wide Leg Tailored Wool Trousers',
    category: 'Jeans',
    price: 440,
    originalPrice: 490,
    rating: 4.7,
    reviewsCount: 33,
    isNew: true,
    isTrending: false,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a' },
      { name: 'Deep Camel', hex: '#9e7953' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Cut from high-twist tropical virgin wool with double front pleats, high waist rise, and full wide-leg flow.',
    details: [
      '100% Virgin Tropical Wool',
      'Double forward pleats',
      'Side waist adjusters with gold buckles',
      'Unfinished hems for custom tailoring length'
    ],
    materials: '100% Virgin Wool.',
    shipping: 'Complimentary shipping.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTS;
}
