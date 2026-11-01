-- PickMyBuild Seed Data

-- Settings
INSERT INTO settings (key, value) VALUES
  ('store_name', 'PickMyBuild'),
  ('tagline', 'Precision Brick Supercars & Display-Grade Engineering Kits'),
  ('upi_id', 'pickmybuild@icici'),
  ('upi_merchant_name', 'PICKMYBUILD BRICKWORKS'),
  ('cod_fee', '49'),
  ('cod_cap', '5000'),
  ('free_shipping_threshold', '999'),
  ('admin_password', 'admin123'),
  ('contact_email', 'support@pickmybuild.in'),
  ('contact_phone', '+91 90619 02295'),
  ('support_hours', 'Mon - Sat: 9:00 AM - 8:00 PM IST');

-- Coupons
INSERT INTO coupons (id, code, discount_type, discount_value, min_cart, active) VALUES
  ('cpn_1', 'BRICK200', 'flat', 200, 1999, 1),
  ('cpn_2', 'FIRSTBUILD', 'percent', 10, 999, 1),
  ('cpn_3', 'SPEED500', 'flat', 500, 4999, 1);

-- Serviceable Pincodes (Major Metros & Hubs)
INSERT INTO serviceable_pincodes (pincode, city, state, cod_allowed, eta_days) VALUES
  ('110001', 'New Delhi', 'Delhi', 1, 2),
  ('400001', 'Mumbai', 'Maharashtra', 1, 2),
  ('560001', 'Bengaluru', 'Karnataka', 1, 2),
  ('600001', 'Chennai', 'Tamil Nadu', 1, 3),
  ('700001', 'Kolkata', 'West Bengal', 1, 3),
  ('500001', 'Hyderabad', 'Telangana', 1, 2),
  ('682001', 'Kochi', 'Kerala', 1, 2),
  ('380001', 'Ahmedabad', 'Gujarat', 1, 3),
  ('411001', 'Pune', 'Maharashtra', 1, 2),
  ('302001', 'Jaipur', 'Rajasthan', 1, 3),
  ('695001', 'Thiruvananthapuram', 'Kerala', 1, 2),
  ('673001', 'Kozhikode', 'Kerala', 1, 2),
  ('122001', 'Gurugram', 'Haryana', 1, 2),
  ('201301', 'Noida', 'Uttar Pradesh', 1, 2);

-- 11 Supercars Products
INSERT INTO products (id, title, slug, tagline, description, category, piece_count, scale, difficulty, dimensions, price, mrp, stock, image_url, gallery_json, features_json, badge, rating, reviews_count) VALUES
(
  'prod_svj',
  'Lamborghini Aventador SVJ',
  'lamborghini-aventador-svj',
  'V12 Naturally Aspirated Monster in Iconic Giallo Orion Yellow',
  'The flagship Aventador SVJ brick model features functional scissor doors, independent suspension, a working V12 engine with reciprocating pistons, and an active ALA 2.0 aerodynamic wing. Built from 1,698 precision clutch elements.',
  'Hypercars',
  1698,
  '1:14',
  'Advanced',
  '36cm x 17cm x 10cm',
  3499,
  4299,
  35,
  '/img/products/lamborghini-aventador-svj.png',
  '["/img/products/lamborghini-aventador-svj.png"]',
  '["Working scissor doors with pneumatic dampers", "Reciprocating V12 engine pistons coupled to differential", "Independent front and rear wishbone suspension", "Adjustable ALA 2.0 carbon-style rear wing", "Includes acrylic display stand with metallic laser-etched plaque"]',
  'Bestseller',
  4.9,
  68
),
(
  'prod_r34',
  'Nissan Skyline GT-R R34 V-Spec',
  'nissan-skyline-r34',
  'Godzilla JDM Icon with Working RB26DETT Twin-Turbo Engine',
  'The ultimate Japanese performance legend. Detailed RB26 twin-turbo inline-6 cylinder engine with spinning turbos, functioning steering wheel rack, quad round taillights, and detailed right-hand-drive cockpit interior.',
  'JDM Classics',
  1720,
  '1:14',
  'Advanced',
  '37cm x 16cm x 11cm',
  3699,
  4399,
  28,
  '/img/products/nissan-skyline-r34.png',
  '["/img/products/nissan-skyline-r34.png"]',
  '["Authentic RB26DETT engine bay with twin intake piping", "Rack-and-pinion front wheel steering linked to cockpit wheel", "Iconic quad round ceramic-red LED-ready taillights", "Removable hood and trunk with structural strut brace", "Custom BBS deep-dish chrome-rim wheels"]',
  'Trending',
  5.0,
  82
),
(
  'prod_m4_gt3',
  'BMW M4 GT3 Motorsport',
  'bmw-m4-gt3',
  'Championship-Winning Nürburgring 24h Endurance Racer',
  'Engineered for endurance track supremacy. Features widebody aero fenders, swan-neck carbon rear wing, FIA roll cage interior, side exhaust pipes, and the striking official M-Motorsport geometric tri-color livery.',
  'GT3 Racers',
  1580,
  '1:14',
  'Advanced',
  '36cm x 18cm x 10cm',
  3299,
  3999,
  40,
  '/img/products/bmw-m4-gt3.png',
  '["/img/products/bmw-m4-gt3.png"]',
  '["High-downforce swan-neck rear diffuser and front dive planes", "Authentic M tri-color racing graphics and sponsor decals", "Full competition-grade roll cage and racing bucket seat", "Twin-turbo straight-6 engine with top-mounted intake plenum", "Center-lock racing slicks with yellow brake calipers"]',
  'Staff Pick',
  4.9,
  45
),
(
  'prod_koenigsegg',
  'Koenigsegg One:1 Megacar',
  'koenigsegg-one-1',
  '1 Megawatt Power-to-Weight Aerodynamic Masterpiece',
  'The world-first 1:1 power-to-weight megacar. Features Koenigsegg dihedral synchro-helix actuation doors that pivot 90 degrees outward and up, active roof-mounted rear aero wing, and dual-clutch transmission model.',
  'Hypercars',
  1980,
  '1:12',
  'Master',
  '41cm x 19cm x 11cm',
  4299,
  5199,
  22,
  '/img/products/koenigsegg-one-1.png',
  '["/img/products/koenigsegg-one-1.png"]',
  '["Patented dihedral synchro-helix door opening mechanism", "Roof-mounted active aero flap with dual linkages", "Twin-turbocharged 5.0L V8 with visible gold-plated heat shielding", "Removable hardtop targa panel that stores in the frunk", "Detailed carbon-weave finish texture elements"]',
  'Collector Edition',
  5.0,
  39
),
(
  'prod_rx7',
  'Mazda RX-7 FD Spirit R',
  'mazda-rx7-fd',
  'Twin-Rotary 13B Legend with Pop-Up Headlights',
  'The quintessential Japanese sports car. Features functional pop-up headlights operated via an internal dashboard lever, a miniature spinning 13B twin-rotor Wankel engine block, and curved aerodynamic bodywork.',
  'JDM Classics',
  1380,
  '1:14',
  'Intermediate',
  '34cm x 15cm x 10cm',
  2899,
  3599,
  30,
  '/img/products/mazda-rx7-fd.png',
  '["/img/products/mazda-rx7-fd.png"]',
  '["Mechanical lever in cabin opens and closes pop-up headlights", "Unique 13B twin-rotor spinning Wankel engine assembly", "Rear ducktail aero wing and quad exhaust tips", "Authentic Recaro red interior bucket seats", "Ultra-low curb-weight sleek Japanese aerodynamic profile"]',
  'Popular',
  4.8,
  54
),
(
  'prod_dodge',
  'Dodge Challenger SRT Hellcat',
  'dodge-challenger',
  'Supercharged 6.2L HEMI V8 American Muscle',
  'Pure American muscle dominance. Features a dual-snorkel ram-air hood, supercharged HEMI V8 engine with spinning supercharger pulley, rear drag spoiler, and deep-dish widebody rear tires.',
  'Muscle Legends',
  1420,
  '1:14',
  'Intermediate',
  '35cm x 16cm x 11cm',
  2999,
  3699,
  35,
  '/img/products/dodge-challenger.png',
  '["/img/products/dodge-challenger.png"]',
  '["Supercharged 6.2L HEMI V8 engine with front drive belt", "Air-catcher intake headlights and dual-snorkel scooped hood", "Widebody fender flares housing extra-wide drag tires", "Opening doors, trunk, and hood with prop rod", "Dual black exhaust tips with rumbling underbody routing"]',
  'Muscle King',
  4.8,
  37
),
(
  'prod_audi_r8',
  'Audi R8 LMS GT3',
  'audi-r8-gt3',
  'V10 Mid-Engine Endurance GT3 Track Weapon',
  'Built to conquer Circuit de Spa and Bathurst. Features mid-engine 5.2L V10 architecture, aggressive roof snorkel intake, carbon louvers, GT3 spec giant rear wing, and rear diffuser fins.',
  'GT3 Racers',
  1620,
  '1:14',
  'Advanced',
  '36cm x 17cm x 10cm',
  3499,
  4199,
  25,
  '/img/products/audi-r8-gt3.png',
  '["/img/products/audi-r8-gt3.png"]',
  '["Mid-mounted high-revving 5.2L V10 engine display", "Roof scoop ram air induction and vented engine cover louvers", "Carbon-look GT3 aero package with front canards and rear wing", "Competition cockpit with steering-wheel shift indicators", "Removable body sections for quick pit-stop display"]',
  'Track Spec',
  4.9,
  31
),
(
  'prod_evo3',
  'Mitsubishi Lancer Evolution III',
  'mitsubishi-lancer-evo',
  'WRC Group A Rally Pioneer in Scotia White',
  'The legendary rally machine that dominated gravel and snow. Features full-time 4WD drivetrain with front, center, and rear differentials, rally spot lamps, oversized rear wing, and 4G63 turbo engine.',
  'JDM Classics',
  1350,
  '1:14',
  'Intermediate',
  '34cm x 15cm x 11cm',
  2799,
  3499,
  32,
  '/img/products/mitsubishi-lancer-evo.png',
  '["/img/products/mitsubishi-lancer-evo.png"]',
  '["Full-time 4WD mechanical drivetrain with triple differential gears", "Iconic high-rise WRC rally rear wing and front bumper intercooler", "Legendary 4G63 inline-4 turbocharged engine bay", "Rally mudflaps and white multi-spoke Enkei rally wheels", "Opening doors, detailed roll cage, and spare tire in boot"]',
  'Rally Legend',
  4.8,
  42
),
(
  'prod_bmw_m1',
  'BMW M1 Procar Classic',
  'bmw-m1',
  'Mid-Engine Wedge Supercar Pioneer by Paul Bracq',
  'The genesis of BMW M division. Features the classic wedge silhouette, pop-up headlamps, mid-mounted M88 3.5L straight-six engine, louvers on the rear engine cover, and iconic Campagnolo-style dished wheels.',
  'Supercars',
  1480,
  '1:14',
  'Advanced',
  '35cm x 16cm x 9.5cm',
  3199,
  3899,
  20,
  '/img/products/bmw-m1.png',
  '["/img/products/bmw-m1.png"]',
  '["Pure late-70s wedge styling with pop-up headlights", "Mid-mounted M88 24-valve 6-cylinder engine with 6 throttles", "Slatted rear window sunshade louvers", "Dual rear BMW roundel logos true to the original design", "Driver-oriented cockpit with classic manual gearstick"]',
  'Heritage',
  4.9,
  27
),
(
  'prod_fj_cruiser',
  'Toyota FJ Cruiser Dakar 4x4',
  'toyota-fj-cruiser',
  'Heavy-Duty Off-Road Overland Expedition Rig',
  'Tackle extreme terrain with this rugged overland build. Features suicide rear half-doors, triple windshield wipers, high-clearance ladder frame chassis with live rear axle, roof cargo rack, and working winch.',
  'Off-Road 4x4',
  1840,
  '1:12',
  'Advanced',
  '38cm x 18cm x 16cm',
  3799,
  4499,
  24,
  '/img/products/toyota-fj-cruiser.png',
  '["/img/products/toyota-fj-cruiser.png"]',
  '["Functional suicide rear access half-doors and opening tailgate", "Rugged ladder-frame chassis with high-travel coilover suspension", "Working front bumper recovery winch with synthetic line and hook", "Roof rack with overland storage cases, recovery boards and fuel cans", "Rear-mounted full-size spare tire with swing-away carrier"]',
  'Overland Rig',
  4.9,
  49
),
(
  'prod_n74',
  'Hyundai N Vision 74 Concept',
  'hyundai-n-vision-74',
  'Hydrogen-Electric Cyberpunk Retro Supercar',
  'The most acclaimed concept car of the decade. Combining 1974 Pony Coupe heritage with futuristic hydrogen fuel cell hypercar tech. Features pixel matrix lighting, huge rear box wing, and turbine aero wheels.',
  'Hypercars',
  1510,
  '1:14',
  'Advanced',
  '36cm x 16.5cm x 10.5cm',
  3399,
  3999,
  26,
  '/img/products/hyundai-n-vision-74.png',
  '["/img/products/hyundai-n-vision-74.png"]',
  '["Parametric pixel LED front light bar and taillight array", "Rear hydrogen fuel cell tank module with glowing cyan accents", "Futuristic aerodynamic dish wheel covers with cooling vents", "Massive functional rear wing and side air intakes", "Driver-focused cockpit with retro-futuristic digital cluster"]',
  'Futuristic',
  5.0,
  36
);

-- Variants for each product (Standard Kit & Display Stand + Acrylic Plaque Bundle)
INSERT INTO variants (id, product_id, sku, title, option_name, option_value, price, mrp, stock) VALUES
  ('var_svj_std', 'prod_svj', 'PMB-LAM-SVJ-STD', 'Lamborghini Aventador SVJ (Standard Kit)', 'Kit Option', 'Standard Kit (1,698 pcs)', 3499, 4299, 20),
  ('var_svj_dsp', 'prod_svj', 'PMB-LAM-SVJ-DSP', 'Lamborghini Aventador SVJ (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3999, 4999, 15),

  ('var_r34_std', 'prod_r34', 'PMB-NIS-R34-STD', 'Nissan Skyline R34 V-Spec (Standard Kit)', 'Kit Option', 'Standard Kit (1,720 pcs)', 3699, 4399, 18),
  ('var_r34_dsp', 'prod_r34', 'PMB-NIS-R34-DSP', 'Nissan Skyline R34 V-Spec (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 4199, 5099, 10),

  ('var_m4_std', 'prod_m4_gt3', 'PMB-BMW-M4G-STD', 'BMW M4 GT3 (Standard Kit)', 'Kit Option', 'Standard Kit (1,580 pcs)', 3299, 3999, 25),
  ('var_m4_dsp', 'prod_m4_gt3', 'PMB-BMW-M4G-DSP', 'BMW M4 GT3 (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3799, 4699, 15),

  ('var_koe_std', 'prod_koenigsegg', 'PMB-KOE-ONE-STD', 'Koenigsegg One:1 (Standard Kit)', 'Kit Option', 'Standard Kit (1,980 pcs)', 4299, 5199, 14),
  ('var_koe_dsp', 'prod_koenigsegg', 'PMB-KOE-ONE-DSP', 'Koenigsegg One:1 (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 4899, 5899, 8),

  ('var_rx7_std', 'prod_rx7', 'PMB-MAZ-RX7-STD', 'Mazda RX-7 FD (Standard Kit)', 'Kit Option', 'Standard Kit (1,380 pcs)', 2899, 3599, 20),
  ('var_rx7_dsp', 'prod_rx7', 'PMB-MAZ-RX7-DSP', 'Mazda RX-7 FD (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3399, 4199, 10),

  ('var_dod_std', 'prod_dodge', 'PMB-DOD-CHL-STD', 'Dodge Challenger SRT Hellcat (Standard Kit)', 'Kit Option', 'Standard Kit (1,420 pcs)', 2999, 3699, 22),
  ('var_dod_dsp', 'prod_dodge', 'PMB-DOD-CHL-DSP', 'Dodge Challenger SRT Hellcat (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3499, 4299, 13),

  ('var_r8_std', 'prod_audi_r8', 'PMB-AUD-R8G-STD', 'Audi R8 LMS GT3 (Standard Kit)', 'Kit Option', 'Standard Kit (1,620 pcs)', 3499, 4199, 16),
  ('var_r8_dsp', 'prod_audi_r8', 'PMB-AUD-R8G-DSP', 'Audi R8 LMS GT3 (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3999, 4899, 9),

  ('var_evo_std', 'prod_evo3', 'PMB-MIT-EVO-STD', 'Mitsubishi Lancer Evo III (Standard Kit)', 'Kit Option', 'Standard Kit (1,350 pcs)', 2799, 3499, 20),
  ('var_evo_dsp', 'prod_evo3', 'PMB-MIT-EVO-DSP', 'Mitsubishi Lancer Evo III (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3299, 4099, 12),

  ('var_m1_std', 'prod_bmw_m1', 'PMB-BMW-M1C-STD', 'BMW M1 Procar Classic (Standard Kit)', 'Kit Option', 'Standard Kit (1,480 pcs)', 3199, 3899, 12),
  ('var_m1_dsp', 'prod_bmw_m1', 'PMB-BMW-M1C-DSP', 'BMW M1 Procar Classic (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3699, 4499, 8),

  ('var_fjc_std', 'prod_fj_cruiser', 'PMB-TOY-FJC-STD', 'Toyota FJ Cruiser Dakar (Standard Kit)', 'Kit Option', 'Standard Kit (1,840 pcs)', 3799, 4499, 15),
  ('var_fjc_dsp', 'prod_fj_cruiser', 'PMB-TOY-FJC-DSP', 'Toyota FJ Cruiser Dakar (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 4299, 5199, 9),

  ('var_n74_std', 'prod_n74', 'PMB-HYU-N74-STD', 'Hyundai N Vision 74 (Standard Kit)', 'Kit Option', 'Standard Kit (1,510 pcs)', 3399, 3999, 17),
  ('var_n74_dsp', 'prod_n74', 'PMB-HYU-N74-DSP', 'Hyundai N Vision 74 (Display Bundle + Case)', 'Kit Option', 'Display Bundle (+ Acrylic Plaque & LED)', 3899, 4699, 9);

-- Stock Ledger Initial Audit Entries
INSERT INTO stock_ledger (id, product_id, sku, delta, balance, reason, reference_id) VALUES
  ('led_1', 'prod_svj', 'PMB-LAM-SVJ-STD', 20, 20, 'initial_seed', 'SEED-20261101'),
  ('led_2', 'prod_r34', 'PMB-NIS-R34-STD', 18, 18, 'initial_seed', 'SEED-20261101'),
  ('led_3', 'prod_m4_gt3', 'PMB-BMW-M4G-STD', 25, 25, 'initial_seed', 'SEED-20261101'),
  ('led_4', 'prod_koenigsegg', 'PMB-KOE-ONE-STD', 14, 14, 'initial_seed', 'SEED-20261101');

-- Seed demo order
INSERT INTO orders (
  id, order_number, customer_name, customer_email, customer_phone, shipping_address, city, state, pincode,
  subtotal, shipping_fee, cod_fee, discount, coupon_code, total, payment_method, payment_status, utr_number,
  order_status, tracking_awb, courier, items_json
) VALUES (
  'ord_demo_01',
  'PMB-2026-8819',
  'Adithyan Raj',
  'adithyan@pickmybuild.in',
  '+91 90619 02295',
  'Flat 4B, Skylark Enclave, Panampilly Nagar',
  'Kochi',
  'Kerala',
  '682001',
  3499,
  0,
  0,
  200,
  'BRICK200',
  3299,
  'upi',
  'verified',
  '431189920154',
  'shipped',
  'BD892019482IN',
  'BlueDart Express Air',
  '[{"id":"prod_svj","title":"Lamborghini Aventador SVJ","sku":"PMB-LAM-SVJ-STD","price":3499,"quantity":1,"image_url":"/img/products/lamborghini-aventador-svj.png"}]'
);

INSERT INTO order_items (id, order_id, product_id, product_title, variant_sku, unit_price, quantity, total_price) VALUES
  ('item_demo_1', 'ord_demo_01', 'prod_svj', 'Lamborghini Aventador SVJ', 'PMB-LAM-SVJ-STD', 3499, 1, 3499);

INSERT INTO order_events (id, order_id, status, note) VALUES
  ('evt_1', 'ord_demo_01', 'placed', 'Order placed via Dynamic UPI QR'),
  ('evt_2', 'ord_demo_01', 'confirmed', 'UPI UTR 431189920154 verified by merchant ops'),
  ('evt_3', 'ord_demo_01', 'packed', 'Sealed with tamper-evident foam and numbered build pouches'),
  ('evt_4', 'ord_demo_01', 'shipped', 'Handed over to BlueDart Air. AWB BD892019482IN');
