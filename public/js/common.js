/**
 * PickMyBuild - Common Storefront Logic
 * Cart drawer, localStorage persistence, toast notifications, and UI chrome
 */

(function() {
  const CART_KEY = 'pmb_cart_items';
  const FREE_SHIPPING_MIN = 999;

  // --- Cart Helpers ---
  function getCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartBadge();
      renderCartDrawer();
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart } }));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }

  function formatINR(num) {
    return '₹' + Number(num || 0).toLocaleString('en-IN');
  }

  function addToCart(product, quantity = 1, variant = null) {
    const cart = getCart();
    const sku = variant ? variant.sku : (product.sku || product.id);
    const existing = cart.find(item => item.sku === sku);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        sku: sku,
        title: product.title,
        price: variant ? variant.price : product.price,
        mrp: variant ? variant.mrp : product.mrp,
        image_url: product.image_url,
        quantity: quantity,
        variant_title: variant ? variant.title : 'Standard Kit'
      });
    }

    saveCart(cart);
    showToast(`Added ${product.title} to bag!`);
    openCart();
  }

  function updateQuantity(sku, delta) {
    let cart = getCart();
    const item = cart.find(i => i.sku === sku);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.sku !== sku);
    }
    saveCart(cart);
  }

  function removeFromCart(sku) {
    let cart = getCart().filter(i => i.sku !== sku);
    saveCart(cart);
    showToast('Item removed from bag');
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartSubtotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  function updateCartBadge() {
    const badges = document.querySelectorAll('[data-cart-count]');
    const totalCount = getCart().reduce((sum, item) => sum + item.quantity, 0);
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'inline-flex' : 'none';
    });
  }

  // --- Cart Drawer UI ---
  function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function renderCartDrawer() {
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('cart-drawer-subtotal');
    const freeBarEl = document.getElementById('cart-free-shipping-text');
    const freeFillEl = document.getElementById('cart-free-shipping-fill');
    if (!container) return;

    const cart = getCart();
    const subtotal = getCartSubtotal();

    if (subtotalEl) {
      subtotalEl.textContent = formatINR(subtotal);
    }

    if (freeBarEl && freeFillEl) {
      if (subtotal >= FREE_SHIPPING_MIN) {
        freeBarEl.innerHTML = `🎉 <strong>Free Express Shipping</strong> unlocked!`;
        freeFillEl.style.width = '100%';
      } else {
        const diff = FREE_SHIPPING_MIN - subtotal;
        const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_MIN) * 100));
        freeBarEl.innerHTML = `Add <strong>${formatINR(diff)}</strong> more for <strong>FREE Express Shipping</strong>`;
        freeFillEl.style.width = `${pct}%`;
      }
    }

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: #64748B;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1.5rem; opacity: 0.6;">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <p style="font-size: 1.6rem; font-weight: 700; margin: 0 0 0.5rem; color: #0F172A;">Your building bag is empty</p>
          <p style="font-size: 1.35rem; margin: 0 0 2rem;">Pick a supercar from our collection and start building.</p>
          <a href="/shop.html" class="btn-primary" style="padding: 1rem 2rem; font-size: 1.35rem; display: inline-flex;" onclick="PickMyBuild.closeCart()">Browse Supercars</a>
        </div>
      `;
      const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      return;
    }

    const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');
    if (checkoutBtn) checkoutBtn.style.display = 'flex';

    container.innerHTML = cart.map(item => `
      <div class="cart-item" data-sku="${item.sku}">
        <div class="cart-item__thumb">
          <img src="${item.image_url}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="cart-item__info">
          <h4 class="cart-item__title">${item.title}</h4>
          <span style="font-size: 1.2rem; color: #64748B; margin-bottom: 0.4rem;">${item.variant_title || 'Standard Kit'}</span>
          <div class="cart-item__price">${formatINR(item.price)}</div>
          <div class="cart-item__actions">
            <div class="qty-control">
              <button type="button" onclick="PickMyBuild.updateQuantity('${item.sku}', -1)">-</button>
              <span>${item.quantity}</span>
              <button type="button" onclick="PickMyBuild.updateQuantity('${item.sku}', 1)">+</button>
            </div>
            <button type="button" class="cart-item__remove" onclick="PickMyBuild.removeFromCart('${item.sku}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Toast ---
  let toastTimer = null;
  function showToast(message) {
    let toast = document.getElementById('pmb-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pmb-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-active');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-active');
    }, 2800);
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCartDrawer();

    // Backdrop click
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeCart);

    // Cart trigger buttons
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });

    document.querySelectorAll('[data-close-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCart();
      });
    });
  });

  window.PickMyBuild = {
    getCart,
    saveCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartSubtotal,
    openCart,
    closeCart,
    renderCartDrawer,
    showToast,
    formatINR
  };
})();
