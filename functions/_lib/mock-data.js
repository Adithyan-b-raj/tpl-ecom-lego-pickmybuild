// Fallback in-memory catalog and store state for Cloudflare Pages when DB is absent or local
export const FALLBACK_PRODUCTS = [
  {
    id: 'prod_svj',
    title: 'Lamborghini Aventador SVJ',
    slug: 'lamborghini-aventador-svj',
    tagline: 'V12 Naturally Aspirated Monster in Iconic Giallo Orion Yellow',
    description: 'The flagship Aventador SVJ brick model features functional scissor doors, independent suspension, a working V12 engine with reciprocating pistons, and an active ALA 2.0 aerodynamic wing. Built from 1,698 precision clutch elements.',
    category: 'Hypercars',
    piece_count: 1698,
    scale: '1:14',
    difficulty: 'Advanced',
    dimensions: '36cm x 17cm x 10cm',
    price: 3499,
    mrp: 4299,
    stock: 35,
    image_url: '/img/products/lamborghini-aventador-svj.png',
    gallery: ['/img/products/lamborghini-aventador-svj.png'],
    features: [
      'Working scissor doors with pneumatic dampers',
      'Reciprocating V12 engine pistons coupled to differential',
      'Independent front and rear wishbone suspension',
      'Adjustable ALA 2.0 carbon-style rear wing',
      'Includes acrylic display stand with metallic laser-etched plaque'
    ],
    badge: 'Bestseller',
    rating: 4.9,
    reviews_count: 68
  },
  {
    id: 'prod_r34',
    title: 'Nissan Skyline GT-R R34 V-Spec',
    slug: 'nissan-skyline-r34',
    tagline: 'Godzilla JDM Icon with Working RB26DETT Twin-Turbo Engine',
    description: 'The ultimate Japanese performance legend. Detailed RB26 twin-turbo inline-6 cylinder engine with spinning turbos, functioning steering wheel rack, quad round taillights, and detailed right-hand-drive cockpit interior.',
    category: 'JDM Classics',
    piece_count: 1720,
    scale: '1:14',
    difficulty: 'Advanced',
    dimensions: '37cm x 16cm x 11cm',
    price: 3699,
    mrp: 4399,
    stock: 28,
    image_url: '/img/products/nissan-skyline-r34.png',
    gallery: ['/img/products/nissan-skyline-r34.png'],
    features: [
      'Authentic RB26DETT engine bay with twin intake piping',
      'Rack-and-pinion front wheel steering linked to cockpit wheel',
      'Iconic quad round ceramic-red LED-ready taillights',
      'Removable hood and trunk with structural strut brace',
      'Custom BBS deep-dish chrome-rim wheels'
    ],
    badge: 'Trending',
    rating: 5.0,
    reviews_count: 82
  },
  {
    id: 'prod_m4_gt3',
    title: 'BMW M4 GT3 Motorsport',
    slug: 'bmw-m4-gt3',
    tagline: 'Championship-Winning Nürburgring 24h Endurance Racer',
    description: 'Engineered for endurance track supremacy. Features widebody aero fenders, swan-neck carbon rear wing, FIA roll cage interior, side exhaust pipes, and the striking official M-Motorsport geometric tri-color livery.',
    category: 'GT3 Racers',
    piece_count: 1580,
    scale: '1:14',
    difficulty: 'Advanced',
    dimensions: '36cm x 18cm x 10cm',
    price: 3299,
    mrp: 3999,
    stock: 40,
    image_url: '/img/products/bmw-m4-gt3.png',
    gallery: ['/img/products/bmw-m4-gt3.png'],
    features: [
      'High-downforce swan-neck rear diffuser and front dive planes',
      'Authentic M tri-color racing graphics and sponsor decals',
      'Full competition-grade roll cage and racing bucket seat',
      'Twin-turbo straight-6 engine with top-mounted intake plenum',
      'Center-lock racing slicks with yellow brake calipers'
    ],
    badge: 'Staff Pick',
    rating: 4.9,
    reviews_count: 45
  },
  {
    id: 'prod_koenigsegg',
    title: 'Koenigsegg One:1 Megacar',
    slug: 'koenigsegg-one-1',
    tagline: '1 Megawatt Power-to-Weight Aerodynamic Masterpiece',
    description: 'The world-first 1:1 power-to-weight megacar. Features Koenigsegg dihedral synchro-helix actuation doors that pivot 90 degrees outward and up, active roof-mounted rear aero wing, and dual-clutch transmission model.',
    category: 'Hypercars',
    piece_count: 1980,
    scale: '1:12',
    difficulty: 'Master',
    dimensions: '41cm x 19cm x 11cm',
    price: 4299,
    mrp: 5199,
    stock: 22,
    image_url: '/img/products/koenigsegg-one-1.png',
    gallery: ['/img/products/koenigsegg-one-1.png'],
    features: [
      'Patented dihedral synchro-helix door opening mechanism',
      'Roof-mounted active aero flap with dual linkages',
      'Twin-turbocharged 5.0L V8 with visible gold-plated heat shielding',
      'Removable hardtop targa panel that stores in the frunk',
      'Detailed carbon-weave finish texture elements'
    ],
    badge: 'Collector Edition',
    rating: 5.0,
    reviews_count: 39
  },
  {
    id: 'prod_rx7',
    title: 'Mazda RX-7 FD Spirit R',
    slug: 'mazda-rx7-fd',
    tagline: 'Twin-Rotary 13B Legend with Pop-Up Headlights',
    description: 'The quintessential Japanese sports car. Features functional pop-up headlights operated via an internal dashboard lever, a miniature spinning 13B twin-rotor Wankel engine block, and curved aerodynamic bodywork.',
    category: 'JDM Classics',
    piece_count: 1380,
    scale: '1:14',
    difficulty: 'Intermediate',
    dimensions: '34cm x 15cm x 10cm',
    price: 2899,
    mrp: 3599,
    stock: 30,
    image_url: '/img/products/mazda-rx7-fd.png',
    gallery: ['/img/products/mazda-rx7-fd.png'],
    features: [
      'Mechanical lever in cabin opens and closes pop-up headlights',
      'Unique 13B twin-rotor spinning Wankel engine assembly',
      'Rear ducktail aero wing and quad exhaust tips',
      'Authentic Recaro red interior bucket seats',
      'Ultra-low curb-weight sleek Japanese aerodynamic profile'
    ],
    badge: 'Popular',
    rating: 4.8,
    reviews_count: 54
  },
  {
    id: 'prod_dodge',
    title: 'Dodge Challenger SRT Hellcat',
    slug: 'dodge-challenger',
    tagline: 'Supercharged 6.2L HEMI V8 American Muscle',
    description: 'Pure American muscle dominance. Features a dual-snorkel ram-air hood, supercharged HEMI V8 engine with spinning supercharger pulley, rear drag spoiler, and deep-dish widebody rear tires.',
    category: 'Muscle Legends',
    piece_count: 1420,
    scale: '1:14',
    difficulty: 'Intermediate',
    dimensions: '35cm x 16cm x 11cm',
    price: 2999,
    mrp: 3699,
    stock: 35,
    image_url: '/img/products/dodge-challenger.png',
    gallery: ['/img/products/dodge-challenger.png'],
    features: [
      'Supercharged 6.2L HEMI V8 engine with front drive belt',
      'Air-catcher intake headlights and dual-snorkel scooped hood',
      'Widebody fender flares housing extra-wide drag tires',
      'Opening doors, trunk, and hood with prop rod',
      'Dual black exhaust tips with rumbling underbody routing'
    ],
    badge: 'Muscle King',
    rating: 4.8,
    reviews_count: 37
  },
  {
    id: 'prod_audi_r8',
    title: 'Audi R8 LMS GT3',
    slug: 'audi-r8-gt3',
    tagline: 'V10 Mid-Engine Endurance GT3 Track Weapon',
    description: 'Built to conquer Circuit de Spa and Bathurst. Features mid-engine 5.2L V10 architecture, aggressive roof snorkel intake, carbon louvers, GT3 spec giant rear wing, and rear diffuser fins.',
    category: 'GT3 Racers',
    piece_count: 1620,
    scale: '1:14',
    difficulty: 'Advanced',
    dimensions: '36cm x 17cm x 10cm',
    price: 3499,
    mrp: 4199,
    stock: 25,
    image_url: '/img/products/audi-r8-gt3.png',
    gallery: ['/img/products/audi-r8-gt3.png'],
    features: [
      'Mid-mounted high-revving 5.2L V10 engine display',
      'Roof scoop ram air induction and vented engine cover louvers',
      'Carbon-look GT3 aero package with front canards and rear wing',
      'Competition cockpit with steering-wheel shift indicators',
      'Removable body sections for quick pit-stop display'
    ],
    badge: 'Track Spec',
    rating: 4.9,
    reviews_count: 31
  },
  {
    id: 'prod_evo3',
    title: 'Mitsubishi Lancer Evolution III',
    slug: 'mitsubishi-lancer-evo',
    tagline: 'WRC Group A Rally Pioneer in Scotia White',
    description: 'The legendary rally machine that dominated gravel and snow. Features full-time 4WD drivetrain with front, center, and rear differentials, rally spot lamps, oversized rear wing, and 4G63 turbo engine.',
    category: 'JDM Classics',
    piece_count: 1350,
    scale: '1:14',
    difficulty: 'Intermediate',
    dimensions: '34cm x 15cm x 11cm',
    price: 2799,
    mrp: 3499,
    stock: 32,
    image_url: '/img/products/mitsubishi-lancer-evo.png',
    gallery: ['/img/products/mitsubishi-lancer-evo.png'],
    features: [
      'Full-time 4WD mechanical drivetrain with triple differential gears',
      'Iconic high-rise WRC rally rear wing and front bumper intercooler',
      'Legendary 4G63 inline-4 turbocharged engine bay',
      'Rally mudflaps and white multi-spoke Enkei rally wheels',
      'Opening doors, detailed roll cage, and spare tire in boot'
    ],
    badge: 'Rally Legend',
    rating: 4.8,
    reviews_count: 42
  },
  {
    id: 'prod_bmw_m1',
    title: 'BMW M1 Procar Classic',
    slug: 'bmw-m1',
    tagline: 'Mid-Engine Wedge Supercar Pioneer by Paul Bracq',
    description: 'The genesis of BMW M division. Features the classic wedge silhouette, pop-up headlamps, mid-mounted M88 3.5L straight-six engine, louvers on the rear engine cover, and iconic Campagnolo-style dished wheels.',
    category: 'Supercars',
    piece_count: 1480,
    scale: '1:14',
    difficulty: 'Advanced',
    dimensions: '35cm x 16cm x 9.5cm',
    price: 3199,
    mrp: 3899,
    stock: 20,
    image_url: '/img/products/bmw-m1.png',
    gallery: ['/img/products/bmw-m1.png'],
    features: [
      'Pure late-70s wedge styling with pop-up headlights',
      'Mid-mounted M88 24-valve 6-cylinder engine with 6 throttles',
      'Slatted rear window sunshade louvers',
      'Dual rear BMW roundel logos true to the original design',
      'Driver-oriented cockpit with classic manual gearstick'
    ],
    badge: 'Heritage',
    rating: 4.9,
    reviews_count: 27
  },
  {
    id: 'prod_fj_cruiser',
    title: 'Toyota FJ Cruiser Dakar 4x4',
    slug: 'toyota-fj-cruiser',
    tagline: 'Heavy-Duty Off-Road Overland Expedition Rig',
    description: 'Tackle extreme terrain with this rugged overland build. Features suicide rear half-doors, triple windshield wipers, high-clearance ladder frame chassis with live rear axle, roof cargo rack, and working winch.',
    category: 'Off-Road 4x4',
    piece_count: 1840,
    scale: '1:12',
    difficulty: 'Advanced',
    dimensions: '38cm x 18cm x 16cm',
    price: 3799,
    mrp: 4499,
    stock: 24,
    image_url: '/img/products/toyota-fj-cruiser.png',
    gallery: ['/img/products/toyota-fj-cruiser.png'],
    features: [
      'Functional suicide rear access half-doors and opening tailgate',
      'Rugged ladder-frame chassis with high-travel coilover suspension',
      'Working front bumper recovery winch with synthetic line and hook',
      'Roof rack with overland storage cases, recovery boards and fuel cans',
      'Rear-mounted full-size spare tire with swing-away carrier'
    ],
    badge: 'Overland Rig',
    rating: 4.9,
    reviews_count: 49
  },
  {
    id: 'prod_n74',
    title: 'Hyundai N Vision 74 Concept',
    slug: 'hyundai-n-vision-74',
    tagline: 'Hydrogen-Electric Cyberpunk Retro Supercar',
    description: 'The most acclaimed concept car of the decade. Combining 1974 Pony Coupe heritage with futuristic hydrogen fuel cell hypercar tech. Features pixel matrix lighting, huge rear box wing, and turbine aero wheels.',
    category: 'Hypercars',
    piece_count: 1510,
    scale: '1:14',
    difficulty: 'Advanced',
    dimensions: '36cm x 16.5cm x 10.5cm',
    price: 3399,
    mrp: 3999,
    stock: 26,
    image_url: '/img/products/hyundai-n-vision-74.png',
    gallery: ['/img/products/hyundai-n-vision-74.png'],
    features: [
      'Parametric pixel LED front light bar and taillight array',
      'Rear hydrogen fuel cell tank module with glowing cyan accents',
      'Futuristic aerodynamic dish wheel covers with cooling vents',
      'Massive functional rear wing and side air intakes',
      'Driver-focused cockpit with retro-futuristic digital cluster'
    ],
    badge: 'Futuristic',
    rating: 5.0,
    reviews_count: 36
  }
];

export const FALLBACK_VARIANTS = {
  prod_svj: [
    { sku: 'PMB-LAM-SVJ-STD', title: 'Standard Kit (1,698 pcs)', price: 3499, mrp: 4299, stock: 20 },
    { sku: 'PMB-LAM-SVJ-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3999, mrp: 4999, stock: 15 }
  ],
  prod_r34: [
    { sku: 'PMB-NIS-R34-STD', title: 'Standard Kit (1,720 pcs)', price: 3699, mrp: 4399, stock: 18 },
    { sku: 'PMB-NIS-R34-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 4199, mrp: 5099, stock: 10 }
  ],
  prod_m4_gt3: [
    { sku: 'PMB-BMW-M4G-STD', title: 'Standard Kit (1,580 pcs)', price: 3299, mrp: 3999, stock: 25 },
    { sku: 'PMB-BMW-M4G-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3799, mrp: 4699, stock: 15 }
  ],
  prod_koenigsegg: [
    { sku: 'PMB-KOE-ONE-STD', title: 'Standard Kit (1,980 pcs)', price: 4299, mrp: 5199, stock: 14 },
    { sku: 'PMB-KOE-ONE-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 4899, mrp: 5899, stock: 8 }
  ],
  prod_rx7: [
    { sku: 'PMB-MAZ-RX7-STD', title: 'Standard Kit (1,380 pcs)', price: 2899, mrp: 3599, stock: 20 },
    { sku: 'PMB-MAZ-RX7-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3399, mrp: 4199, stock: 10 }
  ],
  prod_dodge: [
    { sku: 'PMB-DOD-CHL-STD', title: 'Standard Kit (1,420 pcs)', price: 2999, mrp: 3699, stock: 22 },
    { sku: 'PMB-DOD-CHL-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3499, mrp: 4299, stock: 13 }
  ],
  prod_audi_r8: [
    { sku: 'PMB-AUD-R8G-STD', title: 'Standard Kit (1,620 pcs)', price: 3499, mrp: 4199, stock: 16 },
    { sku: 'PMB-AUD-R8G-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3999, mrp: 4899, stock: 9 }
  ],
  prod_evo3: [
    { sku: 'PMB-MIT-EVO-STD', title: 'Standard Kit (1,350 pcs)', price: 2799, mrp: 3499, stock: 20 },
    { sku: 'PMB-MIT-EVO-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3299, mrp: 4099, stock: 12 }
  ],
  prod_bmw_m1: [
    { sku: 'PMB-BMW-M1C-STD', title: 'Standard Kit (1,480 pcs)', price: 3199, mrp: 3899, stock: 12 },
    { sku: 'PMB-BMW-M1C-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3699, mrp: 4499, stock: 8 }
  ],
  prod_fj_cruiser: [
    { sku: 'PMB-TOY-FJC-STD', title: 'Standard Kit (1,840 pcs)', price: 3799, mrp: 4499, stock: 15 },
    { sku: 'PMB-TOY-FJC-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 4299, mrp: 5199, stock: 9 }
  ],
  prod_n74: [
    { sku: 'PMB-HYU-N74-STD', title: 'Standard Kit (1,510 pcs)', price: 3399, mrp: 3999, stock: 17 },
    { sku: 'PMB-HYU-N74-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3899, mrp: 4699, stock: 9 }
  ]
};
