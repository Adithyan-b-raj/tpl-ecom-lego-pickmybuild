# PickMyBuild - Precision Brick Supercars & Display Engineering Kits D2C Store

Production-grade Direct-to-Consumer (D2C) web application with exact 1:1 UI/UX parity to the `pickle shopify` architecture, featuring vertical 9:16 car video reels with sound toggle, custom web components (`<pickle-slider>`, `<pickle-reel>`, `<pickle-tabs>`, `<pickle-back-to-top>`), full Indian checkout (Cash on Delivery + Dynamic UPI with SVG QR & 12-digit UTR verification), live order tracking with printable GST tax invoices, and an authenticated store owner operations console with an immutable stock audit ledger.

---

## 🏎️ Core Architecture & Features

### 1. Storefront (1:1 Pickle UI/UX Fidelity)
1. **Continuous Marquee Announcement:** Real-time scrolling banner across Indian delivery, clutch guarantees, and payment assurances.
2. **Circular Category Navigator (`pk-cat-circle`):** Fast pill navigation across Hypercars, JDM Icons, GT3 Racers, Muscle Legends, Off-Road 4x4, and Megacars.
3. **Hero Slideshow Banner:** Dual-slide carousel with auto-rotation, slide dots, specs badges, and floating supercar glow layers.
4. **4-Step Build Guide (`pk-steps`):** 1. Numbered pouches; 2. Full-color 3D manual; 3. Working kinematics; 4. Museum display stand.
5. **Most Loved Builds Carousel (`<pickle-slider>`):** Scroll-snap product showcase with piece counts, scales, difficulty badges, and quick add-to-bag.
6. **Brand Engineering Story Banner (`pk-story-banner`):** 0.005mm clutch tolerance, 100% virgin ABS, 24h part dispatch.
7. **Builder Testimonials Carousel (`pk-testimonials`):** Verified customer reviews from major Indian cities.
8. **Multi-Car Display Bundles:** Dual-stand collector packs saving up to ₹1,000.
9. **Vertical Video Reels Section (`<pickle-reel>`):** 9:16 vertical short-form car videos with muted autoplay on visibility via `IntersectionObserver`, auto-pause off-screen, sound toggle button (unmutes selected reel, mutes others), captions, and floating shoppable product overlay.
10. **6 Trust Badges (`pk-trust-badges`):** Virgin ABS, Zero missing parts, 3D manual, Universal fit, Collector box, BlueDart Air Express.
11. **Partner Marketplaces Grid (`pk-marketplaces`):** Amazon, Flipkart, Blinkit, Zepto, Swiggy Instamart.
12. **Accordion FAQ (`pk-faq`):** Expandable answers for piece replacement, build duration, and COD terms.
13. **VIP Club Newsletter Banner (`pk-newsletter`):** ₹200 off first order coupon capture.
14. **Direct Builder Helpline (`pk-contact-details`):** WhatsApp VIP helpline & dispatch hub details.

---

### 2. Supercar Models Seeded (`C:\lego\png`)
1. **Lamborghini Aventador SVJ** — 1,698 pcs • 1:14 • Advanced • ₹3,499 (V12 pistons, ALA 2.0 aero wing, scissor doors)
2. **Nissan Skyline GT-R R34 V-Spec** — 1,720 pcs • 1:14 • Advanced • ₹3,699 (RB26DETT twin-turbo, steering rack)
3. **BMW M4 GT3 Motorsport** — 1,580 pcs • 1:14 • Advanced • ₹3,299 (Nürburgring 24h M livery, FIA roll cage)
4. **Koenigsegg One:1 Megacar** — 1,980 pcs • 1:12 • Master • ₹4,299 (Dihedral synchro-helix doors, active roof wing)
5. **Mazda RX-7 FD Spirit R** — 1,380 pcs • 1:14 • Intermediate • ₹2,899 (Pop-up headlights lever, 13B spinning rotor)
6. **Dodge Challenger SRT Hellcat** — 1,420 pcs • 1:14 • Intermediate • ₹2,999 (Supercharged 6.2L HEMI V8)
7. **Audi R8 LMS GT3** — 1,620 pcs • 1:14 • Advanced • ₹3,499 (Spa 24h spec, roof ram air scoop, 5.2L V10)
8. **Mitsubishi Lancer Evolution III** — 1,350 pcs • 1:14 • Intermediate • ₹2,799 (WRC Group A 4WD, triple diffs)
9. **BMW M1 Procar Classic** — 1,480 pcs • 1:14 • Advanced • ₹3,199 (Classic wedge, pop-up lamps, M88 straight-six)
10. **Toyota FJ Cruiser Dakar 4x4** — 1,840 pcs • 1:12 • Advanced • ₹3,799 (Suicide doors, ladder frame, working winch)
11. **Hyundai N Vision 74 Concept** — 1,510 pcs • 1:14 • Advanced • ₹3,399 (Hydrogen fuel cell, cyberpunk aero dish wheels)

---

### 3. Indian Payment & Checkout Engine
- **Serviceability:** Instant 6-digit Indian postal code check with live ETA days.
- **Cash on Delivery (COD):** ₹49 service fee, valid up to ₹5,000 threshold.
- **Dynamic UPI:** Dynamic SVG QR generation, 30-minute reservation timer, deep link for mobile UPI apps, and 12-digit UTR submission.
- **Live Order Tracking (`/track.html`):** 5-stage progress stepper (`placed` → `confirmed` → `packed` → `shipped` → `delivered`) with live AWB link and printable GST tax invoice (HSN 950300, 18% GST).

---

### 4. Store Owner Operations Console (`/admin.html`)
- **Protected Ops Gate:** Authenticated console with revenue, orders, and stock KPIs.
- **Order Lifecycle Transitions:** Confirm order, pack with numbered pouches, assign BlueDart AWB, mark delivered.
- **Inventory Matrix & Adjustments:** Live SKU stock matrix with "+ Adjust Stock" modal requiring audit reason codes (`restock`, `physical_audit`, `damaged_return`, `display_sample`).
- **Immutable Stock Ledger:** Every transaction logged with delta, balance, reason, and 1-click CSV export.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run Cloudflare Pages development server with local D1
npx wrangler pages dev public --d1=DB=pickmybuild-db
```
