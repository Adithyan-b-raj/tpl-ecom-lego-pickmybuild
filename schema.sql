-- PickMyBuild Supercar Brick Models Database Schema (Cloudflare D1 SQLite)

DROP TABLE IF EXISTS stock_ledger;
DROP TABLE IF EXISTS order_events;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS variants;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS serviceable_pincodes;
DROP TABLE IF EXISTS settings;

CREATE TABLE products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  piece_count INTEGER NOT NULL,
  scale TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  dimensions TEXT,
  price INTEGER NOT NULL,
  mrp INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 50,
  image_url TEXT NOT NULL,
  gallery_json TEXT NOT NULL DEFAULT '[]',
  features_json TEXT NOT NULL DEFAULT '[]',
  badge TEXT,
  rating REAL DEFAULT 4.9,
  reviews_count INTEGER DEFAULT 48,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  option_name TEXT DEFAULT 'Edition',
  option_value TEXT DEFAULT 'Standard Kit',
  price INTEGER NOT NULL,
  mrp INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 25,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  subtotal INTEGER NOT NULL,
  shipping_fee INTEGER NOT NULL DEFAULT 0,
  cod_fee INTEGER NOT NULL DEFAULT 0,
  discount INTEGER NOT NULL DEFAULT 0,
  coupon_code TEXT,
  total INTEGER NOT NULL,
  payment_method TEXT NOT NULL, -- 'cod' or 'upi'
  payment_status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'verified', 'failed'
  utr_number TEXT,
  order_status TEXT NOT NULL DEFAULT 'placed', -- 'placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled'
  tracking_awb TEXT,
  courier TEXT DEFAULT 'BlueDart Express Air',
  items_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  variant_sku TEXT,
  unit_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE order_events (
  id TEXT PRIMARY KEY,
  order_id TEXT NOT NULL,
  status TEXT NOT NULL,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE stock_ledger (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  sku TEXT NOT NULL,
  delta INTEGER NOT NULL,
  balance INTEGER NOT NULL,
  reason TEXT NOT NULL, -- 'initial_seed', 'customer_order', 'admin_adjustment', 'order_cancellation', 'restock'
  reference_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL, -- 'flat' or 'percent'
  discount_value INTEGER NOT NULL,
  min_cart INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1
);

CREATE TABLE serviceable_pincodes (
  pincode TEXT PRIMARY KEY,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  cod_allowed INTEGER DEFAULT 1,
  eta_days INTEGER DEFAULT 3
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
