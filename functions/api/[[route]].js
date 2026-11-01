import { FALLBACK_PRODUCTS, FALLBACK_VARIANTS } from '../_lib/mock-data.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, '');
  const method = request.method;

  if (method === 'OPTIONS') {
    return json({ ok: true });
  }

  try {
    // 1. Store Config
    if (path === '/config' && method === 'GET') {
      let storeName = 'PickMyBuild';
      let upiId = 'pickmybuild@icici';
      let merchantName = 'PICKMYBUILD BRICKWORKS';
      let codFee = 49;
      let codCap = 5000;
      let freeShippingThreshold = 999;

      if (env.DB) {
        try {
          const settings = await env.DB.prepare('SELECT key, value FROM settings').all();
          const map = {};
          settings.results?.forEach(r => map[r.key] = r.value);
          if (map.store_name) storeName = map.store_name;
          if (map.upi_id) upiId = map.upi_id;
          if (map.upi_merchant_name) merchantName = map.upi_merchant_name;
          if (map.cod_fee) codFee = parseInt(map.cod_fee, 10);
          if (map.cod_cap) codCap = parseInt(map.cod_cap, 10);
          if (map.free_shipping_threshold) freeShippingThreshold = parseInt(map.free_shipping_threshold, 10);
        } catch (e) {
          console.warn('D1 settings fetch failed, using defaults', e);
        }
      }

      return json({
        store_name: storeName,
        upi_id: upiId,
        upi_merchant_name: merchantName,
        cod_fee: codFee,
        cod_cap: codCap,
        free_shipping_threshold: freeShippingThreshold,
        currency: 'INR',
        currency_symbol: '₹'
      });
    }

    // 2. Catalog - All Products
    if (path === '/products' && method === 'GET') {
      const category = url.searchParams.get('category');
      const sort = url.searchParams.get('sort');

      let products = [];
      if (env.DB) {
        try {
          let query = 'SELECT * FROM products';
          let params = [];
          if (category && category !== 'all') {
            query += ' WHERE category = ?';
            params.push(category);
          }
          if (sort === 'price-asc') query += ' ORDER BY price ASC';
          else if (sort === 'price-desc') query += ' ORDER BY price DESC';
          else if (sort === 'pieces-desc') query += ' ORDER BY piece_count DESC';
          else query += ' ORDER BY rating DESC, price DESC';

          const rows = await env.DB.prepare(query).bind(...params).all();
          products = rows.results.map(p => ({
            ...p,
            gallery: JSON.parse(p.gallery_json || '[]'),
            features: JSON.parse(p.features_json || '[]')
          }));
        } catch (e) {
          console.warn('D1 products query failed, using fallback', e);
          products = FALLBACK_PRODUCTS;
        }
      } else {
        products = FALLBACK_PRODUCTS;
        if (category && category !== 'all') {
          products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
      }

      return json({ products });
    }

    // 3. Product Single by Slug or ID
    if (path.startsWith('/products/') && method === 'GET') {
      const slugOrId = path.replace('/products/', '');
      let product = null;
      let variants = [];

      if (env.DB) {
        try {
          const row = await env.DB.prepare('SELECT * FROM products WHERE slug = ? OR id = ?').bind(slugOrId, slugOrId).first();
          if (row) {
            product = {
              ...row,
              gallery: JSON.parse(row.gallery_json || '[]'),
              features: JSON.parse(row.features_json || '[]')
            };
            const vRows = await env.DB.prepare('SELECT * FROM variants WHERE product_id = ?').bind(row.id).all();
            variants = vRows.results || [];
          }
        } catch (e) {
          console.warn('D1 single product query failed, using fallback', e);
        }
      }

      if (!product) {
        product = FALLBACK_PRODUCTS.find(p => p.slug === slugOrId || p.id === slugOrId);
        if (product) {
          variants = FALLBACK_VARIANTS[product.id] || [];
        }
      }

      if (!product) {
        return json({ error: 'Product not found' }, 404);
      }

      return json({ product, variants });
    }

    // 4. Indian Pincode Validator
    if (path.startsWith('/pincode/') && method === 'GET') {
      const pincode = path.replace('/pincode/', '').trim();
      if (!/^\d{6}$/.test(pincode)) {
        return json({ error: 'Invalid 6-digit Indian pincode' }, 400);
      }

      let res = {
        pincode,
        city: 'Metro Hub',
        state: 'India',
        cod_allowed: true,
        eta_days: 3,
        courier: 'BlueDart Express Air'
      };

      if (env.DB) {
        try {
          const pin = await env.DB.prepare('SELECT * FROM serviceable_pincodes WHERE pincode = ?').bind(pincode).first();
          if (pin) {
            res.city = pin.city;
            res.state = pin.state;
            res.cod_allowed = Boolean(pin.cod_allowed);
            res.eta_days = pin.eta_days;
          }
        } catch (e) {
          console.warn('D1 pincode check error', e);
        }
      }

      return json({ serviceable: true, ...res });
    }

    // 5. Checkout Quote
    if (path === '/quote' && method === 'POST') {
      const body = await request.json();
      const items = body.items || [];
      const paymentMethod = body.payment_method || 'upi';
      const couponCode = (body.coupon_code || '').trim().toUpperCase();

      let subtotal = 0;
      items.forEach(item => {
        subtotal += (item.price || 0) * (item.quantity || 1);
      });

      const freeShippingThreshold = 999;
      const shippingFee = subtotal >= freeShippingThreshold ? 0 : 99;
      const codFee = paymentMethod === 'cod' ? 49 : 0;

      let discount = 0;
      if (couponCode === 'BRICK200' && subtotal >= 1999) discount = 200;
      else if (couponCode === 'FIRSTBUILD' && subtotal >= 999) discount = Math.round(subtotal * 0.1);
      else if (couponCode === 'SPEED500' && subtotal >= 4999) discount = 500;

      const total = Math.max(0, subtotal + shippingFee + codFee - discount);

      return json({
        subtotal,
        shipping_fee: shippingFee,
        cod_fee: codFee,
        discount,
        coupon_code: couponCode || null,
        total
      });
    }

    // 6. Create Order
    if (path === '/orders' && method === 'POST') {
      const body = await request.json();
      const {
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        city,
        state,
        pincode,
        payment_method,
        items,
        coupon_code
      } = body;

      if (!customer_name || !customer_phone || !shipping_address || !pincode || !items || items.length === 0) {
        return json({ error: 'Missing required customer or delivery details' }, 400);
      }

      let subtotal = 0;
      items.forEach(i => subtotal += (i.price * i.quantity));
      const shipping_fee = subtotal >= 999 ? 0 : 99;
      const cod_fee = payment_method === 'cod' ? 49 : 0;
      let discount = 0;
      if (coupon_code === 'BRICK200' && subtotal >= 1999) discount = 200;
      else if (coupon_code === 'FIRSTBUILD' && subtotal >= 999) discount = Math.round(subtotal * 0.1);
      else if (coupon_code === 'SPEED500' && subtotal >= 4999) discount = 500;

      const total = Math.max(0, subtotal + shipping_fee + cod_fee - discount);

      const orderId = 'ord_' + Math.random().toString(36).substring(2, 9);
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `PMB-2026-${randNum}`;

      const upiId = 'pickmybuild@icici';
      const merchantName = 'PICKMYBUILD BRICKWORKS';
      const upiIntentUri = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${total}&cu=INR&tn=${encodeURIComponent('Order ' + orderNumber)}`;

      if (env.DB) {
        try {
          await env.DB.prepare(`
            INSERT INTO orders (
              id, order_number, customer_name, customer_email, customer_phone,
              shipping_address, city, state, pincode, subtotal, shipping_fee,
              cod_fee, discount, coupon_code, total, payment_method, payment_status,
              order_status, tracking_awb, courier, items_json
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `).bind(
            orderId, orderNumber, customer_name, customer_email || '', customer_phone,
            shipping_address, city, state, pincode, subtotal, shipping_fee,
            cod_fee, discount, coupon_code || '', total, payment_method,
            payment_method === 'cod' ? 'cod_pending' : 'pending',
            'placed', '', 'BlueDart Express Air', JSON.stringify(items)
          ).run();

          // Insert order event
          await env.DB.prepare(`
            INSERT INTO order_events (id, order_id, status, note)
            VALUES (?, ?, ?, ?)
          `).bind(
            'evt_' + Math.random().toString(36).substring(2, 9),
            orderId,
            'placed',
            `Order created with ${payment_method.toUpperCase()} payment.`
          ).run();

          // Decrement stock in DB
          for (const item of items) {
            await env.DB.prepare('UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?')
              .bind(item.quantity, item.id).run();
            if (item.sku) {
              await env.DB.prepare('UPDATE variants SET stock = MAX(0, stock - ?) WHERE sku = ?')
                .bind(item.quantity, item.sku).run();
            }
            await env.DB.prepare(`
              INSERT INTO stock_ledger (id, product_id, sku, delta, balance, reason, reference_id)
              VALUES (?, ?, ?, ?, 0, 'customer_order', ?)
            `).bind(
              'led_' + Math.random().toString(36).substring(2, 9),
              item.id,
              item.sku || item.id,
              -item.quantity,
              orderNumber
            ).run();
          }
        } catch (e) {
          console.error('D1 Order insert error', e);
        }
      }

      return json({
        success: true,
        order_id: orderId,
        order_number: orderNumber,
        total,
        payment_method,
        upi_intent_uri: payment_method === 'upi' ? upiIntentUri : null,
        upi_id: upiId,
        merchant_name: merchantName
      });
    }

    // 7. Submit UTR for UPI Order
    if (path.match(/^\/orders\/[^\/]+\/utr$/) && method === 'POST') {
      const orderRef = path.split('/')[2];
      const body = await request.json();
      const utr = (body.utr || '').trim();

      if (!/^\d{12}$/.test(utr)) {
        return json({ error: 'UTR must be a valid 12-digit numeric reference' }, 400);
      }

      if (env.DB) {
        try {
          await env.DB.prepare(`
            UPDATE orders SET utr_number = ?, payment_status = 'pending_verification'
            WHERE id = ? OR order_number = ?
          `).bind(utr, orderRef, orderRef).run();

          await env.DB.prepare(`
            INSERT INTO order_events (id, order_id, status, note)
            VALUES (?, ?, 'utr_submitted', ?)
          `).bind('evt_' + Math.random().toString(36).substring(2, 9), orderRef, `Customer submitted 12-digit UTR: ${utr}`).run();
        } catch (e) {
          console.error('D1 UTR update error', e);
        }
      }

      return json({ success: true, message: 'UTR submitted successfully. Verification takes 10-15 minutes.' });
    }

    // 8. Order Tracking & Invoice
    if (path.startsWith('/orders/') && method === 'GET') {
      const orderRef = path.replace('/orders/', '').trim();
      let order = null;
      let events = [];

      if (env.DB) {
        try {
          order = await env.DB.prepare('SELECT * FROM orders WHERE order_number = ? OR id = ?').bind(orderRef, orderRef).first();
          if (order) {
            order.items = JSON.parse(order.items_json || '[]');
            const evts = await env.DB.prepare('SELECT * FROM order_events WHERE order_id = ? ORDER BY created_at ASC').bind(order.id).all();
            events = evts.results || [];
          }
        } catch (e) {
          console.error('D1 order track query error', e);
        }
      }

      if (!order) {
        // Fallback demo order lookup
        if (orderRef === 'PMB-2026-8819' || orderRef === 'demo') {
          order = {
            id: 'ord_demo_01',
            order_number: 'PMB-2026-8819',
            customer_name: 'Adithyan Raj',
            customer_email: 'adithyan@pickmybuild.in',
            customer_phone: '+91 90619 02295',
            shipping_address: 'Flat 4B, Skylark Enclave, Panampilly Nagar',
            city: 'Kochi',
            state: 'Kerala',
            pincode: '682001',
            subtotal: 3499,
            shipping_fee: 0,
            cod_fee: 0,
            discount: 200,
            coupon_code: 'BRICK200',
            total: 3299,
            payment_method: 'upi',
            payment_status: 'verified',
            utr_number: '431189920154',
            order_status: 'shipped',
            tracking_awb: 'BD892019482IN',
            courier: 'BlueDart Express Air',
            items: [
              {
                id: 'prod_svj',
                title: 'Lamborghini Aventador SVJ',
                sku: 'PMB-LAM-SVJ-STD',
                price: 3499,
                quantity: 1,
                image_url: '/img/products/lamborghini-aventador-svj.png'
              }
            ],
            created_at: '2026-11-01 10:30:00'
          };
          events = [
            { status: 'placed', note: 'Order placed via Dynamic UPI QR', created_at: '2026-11-01 10:30:00' },
            { status: 'confirmed', note: 'UPI UTR 431189920154 verified by merchant ops', created_at: '2026-11-01 10:45:00' },
            { status: 'packed', note: 'Sealed with tamper-evident foam and numbered build pouches', created_at: '2026-11-01 13:10:00' },
            { status: 'shipped', note: 'Handed over to BlueDart Air. AWB BD892019482IN', created_at: '2026-11-01 15:40:00' }
          ];
        }
      }

      if (!order) {
        return json({ error: 'Order not found' }, 404);
      }

      return json({ order, events });
    }

    // 9. Admin - Orders List
    if (path === '/admin/orders' && method === 'GET') {
      let orders = [];
      if (env.DB) {
        try {
          const rows = await env.DB.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT 50').all();
          orders = rows.results.map(o => ({
            ...o,
            items: JSON.parse(o.items_json || '[]')
          }));
        } catch (e) {
          console.error('D1 admin orders query error', e);
        }
      }

      if (orders.length === 0) {
        orders = [
          {
            id: 'ord_demo_01',
            order_number: 'PMB-2026-8819',
            customer_name: 'Adithyan Raj',
            customer_phone: '+91 90619 02295',
            city: 'Kochi',
            total: 3299,
            payment_method: 'upi',
            payment_status: 'verified',
            utr_number: '431189920154',
            order_status: 'shipped',
            tracking_awb: 'BD892019482IN',
            created_at: '2026-11-01 10:30:00',
            items: [{ title: 'Lamborghini Aventador SVJ', quantity: 1, price: 3499 }]
          }
        ];
      }

      return json({ orders });
    }

    // 10. Admin - Update Order Status
    if (path.match(/^\/admin\/orders\/[^\/]+\/status$/) && method === 'POST') {
      const orderId = path.split('/')[3];
      const body = await request.json();
      const { status, tracking_awb, courier, note } = body;

      if (env.DB) {
        try {
          let q = 'UPDATE orders SET order_status = ?';
          let params = [status];
          if (tracking_awb) {
            q += ', tracking_awb = ?';
            params.push(tracking_awb);
          }
          if (courier) {
            q += ', courier = ?';
            params.push(courier);
          }
          q += ' WHERE id = ?';
          params.push(orderId);

          await env.DB.prepare(q).bind(...params).run();

          await env.DB.prepare(`
            INSERT INTO order_events (id, order_id, status, note)
            VALUES (?, ?, ?, ?)
          `).bind(
            'evt_' + Math.random().toString(36).substring(2, 9),
            orderId,
            status,
            note || `Order status updated to ${status}${tracking_awb ? ' (AWB: ' + tracking_awb + ')' : ''}`
          ).run();
        } catch (e) {
          console.error('D1 update status error', e);
        }
      }

      return json({ success: true, message: `Status updated to ${status}` });
    }

    // 11. Admin - Inventory Matrix
    if (path === '/admin/inventory' && method === 'GET') {
      let items = [];
      if (env.DB) {
        try {
          const prods = await env.DB.prepare('SELECT id, title, slug, price, stock, category FROM products ORDER BY title ASC').all();
          items = prods.results || [];
        } catch (e) {
          console.error('D1 inventory query error', e);
        }
      }

      if (items.length === 0) {
        items = FALLBACK_PRODUCTS.map(p => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          price: p.price,
          stock: p.stock,
          category: p.category
        }));
      }

      return json({ inventory: items });
    }

    // 12. Admin - Adjust Stock
    if (path === '/admin/inventory/adjust' && method === 'POST') {
      const body = await request.json();
      const { product_id, delta, reason, reference_id } = body;

      if (!product_id || delta === undefined) {
        return json({ error: 'Missing product_id or delta' }, 400);
      }

      if (env.DB) {
        try {
          await env.DB.prepare('UPDATE products SET stock = MAX(0, stock + ?) WHERE id = ?')
            .bind(delta, product_id).run();

          const prod = await env.DB.prepare('SELECT stock FROM products WHERE id = ?').bind(product_id).first();
          const balance = prod ? prod.stock : 0;

          await env.DB.prepare(`
            INSERT INTO stock_ledger (id, product_id, sku, delta, balance, reason, reference_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `).bind(
            'led_' + Math.random().toString(36).substring(2, 9),
            product_id,
            product_id,
            delta,
            balance,
            reason || 'admin_adjustment',
            reference_id || 'MANUAL-ADJ'
          ).run();
        } catch (e) {
          console.error('D1 adjust stock error', e);
        }
      }

      return json({ success: true, message: 'Stock adjusted successfully' });
    }

    // 13. Admin - Stock Ledger
    if (path === '/admin/ledger' && method === 'GET') {
      let ledger = [];
      if (env.DB) {
        try {
          const rows = await env.DB.prepare('SELECT * FROM stock_ledger ORDER BY created_at DESC LIMIT 100').all();
          ledger = rows.results || [];
        } catch (e) {
          console.error('D1 ledger query error', e);
        }
      }

      return json({ ledger });
    }

    return json({ error: 'Endpoint not found', path }, 404);
  } catch (err) {
    console.error('API execution error', err);
    return json({ error: 'Internal Server Error', message: err.message }, 500);
  }
}
