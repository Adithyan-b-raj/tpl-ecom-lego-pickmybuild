// PickMyBuild Shop Page Controller
let allProducts = [];
let currentCategory = 'all';
let currentSort = 'featured';

async function fetchProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  if (categoryParam) {
    currentCategory = categoryParam;
    updatePillUI(categoryParam);
  }

  try {
    const res = await fetch('/api/products');
    const data = await res.json();
    allProducts = data.products || [];
  } catch (err) {
    console.warn('API error, using embedded fallback', err);
    // Embedded fallback handled gracefully
  }

  if (allProducts.length === 0) {
    // Client fallback
    allProducts = [
      { id: 'prod_svj', title: 'Lamborghini Aventador SVJ', slug: 'lamborghini-aventador-svj', category: 'Hypercars', piece_count: 1698, scale: '1:14', difficulty: 'Advanced', price: 3499, mrp: 4299, image_url: '/img/products/lamborghini-aventador-svj.png', rating: 4.9, reviews_count: 68, badge: 'Bestseller' },
      { id: 'prod_r34', title: 'Nissan Skyline GT-R R34 V-Spec', slug: 'nissan-skyline-r34', category: 'JDM Classics', piece_count: 1720, scale: '1:14', difficulty: 'Advanced', price: 3699, mrp: 4399, image_url: '/img/products/nissan-skyline-r34.png', rating: 5.0, reviews_count: 82, badge: 'Trending' },
      { id: 'prod_m4_gt3', title: 'BMW M4 GT3 Motorsport', slug: 'bmw-m4-gt3', category: 'GT3 Racers', piece_count: 1580, scale: '1:14', difficulty: 'Advanced', price: 3299, mrp: 3999, image_url: '/img/products/bmw-m4-gt3.png', rating: 4.9, reviews_count: 45, badge: 'Staff Pick' },
      { id: 'prod_koenigsegg', title: 'Koenigsegg One:1 Megacar', slug: 'koenigsegg-one-1', category: 'Hypercars', piece_count: 1980, scale: '1:12', difficulty: 'Master', price: 4299, mrp: 5199, image_url: '/img/products/koenigsegg-one-1.png', rating: 5.0, reviews_count: 39, badge: 'Collector' },
      { id: 'prod_rx7', title: 'Mazda RX-7 FD Spirit R', slug: 'mazda-rx7-fd', category: 'JDM Classics', piece_count: 1380, scale: '1:14', difficulty: 'Intermediate', price: 2899, mrp: 3599, image_url: '/img/products/mazda-rx7-fd.png', rating: 4.8, reviews_count: 54, badge: 'Popular' },
      { id: 'prod_dodge', title: 'Dodge Challenger SRT Hellcat', slug: 'dodge-challenger', category: 'Muscle Legends', piece_count: 1420, scale: '1:14', difficulty: 'Intermediate', price: 2999, mrp: 3699, image_url: '/img/products/dodge-challenger.png', rating: 4.8, reviews_count: 37, badge: 'Muscle King' },
      { id: 'prod_audi_r8', title: 'Audi R8 LMS GT3', slug: 'audi-r8-gt3', category: 'GT3 Racers', piece_count: 1620, scale: '1:14', difficulty: 'Advanced', price: 3499, mrp: 4199, image_url: '/img/products/audi-r8-gt3.png', rating: 4.9, reviews_count: 31, badge: 'Track Spec' },
      { id: 'prod_evo3', title: 'Mitsubishi Lancer Evolution III', slug: 'mitsubishi-lancer-evo', category: 'JDM Classics', piece_count: 1350, scale: '1:14', difficulty: 'Intermediate', price: 2799, mrp: 3499, image_url: '/img/products/mitsubishi-lancer-evo.png', rating: 4.8, reviews_count: 42, badge: 'Rally Legend' },
      { id: 'prod_bmw_m1', title: 'BMW M1 Procar Classic', slug: 'bmw-m1', category: 'Supercars', piece_count: 1480, scale: '1:14', difficulty: 'Advanced', price: 3199, mrp: 3899, image_url: '/img/products/bmw-m1.png', rating: 4.9, reviews_count: 27, badge: 'Heritage' },
      { id: 'prod_fj_cruiser', title: 'Toyota FJ Cruiser Dakar 4x4', slug: 'toyota-fj-cruiser', category: 'Off-Road 4x4', piece_count: 1840, scale: '1:12', difficulty: 'Advanced', price: 3799, mrp: 4499, image_url: '/img/products/toyota-fj-cruiser.png', rating: 4.9, reviews_count: 49, badge: 'Overland Rig' },
      { id: 'prod_n74', title: 'Hyundai N Vision 74 Concept', slug: 'hyundai-n-vision-74', category: 'Hypercars', piece_count: 1510, scale: '1:14', difficulty: 'Advanced', price: 3399, mrp: 3999, image_url: '/img/products/hyundai-n-vision-74.png', rating: 5.0, reviews_count: 36, badge: 'Futuristic' }
    ];
  }

  renderProducts();
}

function updatePillUI(cat) {
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.classList.toggle('is-active', pill.dataset.cat.toLowerCase() === cat.toLowerCase());
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  updatePillUI(cat);
  const heading = document.getElementById('page-heading');
  if (heading) {
    heading.textContent = cat === 'all' ? 'The Supercar Garage' : `${cat} Collection`;
  }
  renderProducts();
}

function applySort(val) {
  currentSort = val;
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let filtered = [...allProducts];
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
  }

  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'pieces-desc') {
    filtered.sort((a, b) => b.piece_count - a.piece_count);
  } else {
    filtered.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 6rem 0; color: #64748B;">
        <h3 style="font-size: 2rem; color: #0F172A; margin-bottom: 0.8rem;">No builds found in this category</h3>
        <p style="margin-bottom: 2rem;">Try selecting "All Builds" to see the full collection.</p>
        <button type="button" class="btn-primary" onclick="filterCategory('all')">Show All Builds</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div class="pk-card">
      <div class="pk-card__media-wrap">
        ${p.badge ? `<span class="pk-card__badge">${p.badge}</span>` : ''}
        <div class="pk-card__specs-row">
          <span class="pk-card__spec-pill">${p.piece_count} pcs</span>
          <span class="pk-card__spec-pill">${p.scale}</span>
          <span class="pk-card__spec-pill">${p.difficulty}</span>
        </div>
        <img src="${p.image_url}" alt="${p.title}" class="pk-card__img" loading="lazy" />
      </div>
      <div class="pk-card__body">
        <span class="pk-card__category">${p.category}</span>
        <h3 class="pk-card__title">
          <a href="/product.html?slug=${p.slug}">${p.title}</a>
        </h3>
        <div class="pk-card__rating">
          <span>★★★★★</span>
          <span class="pk-card__rating-count">${p.rating || 4.9} (${p.reviews_count || 40})</span>
        </div>
        <div class="pk-card__price-row">
          <span class="pk-card__price">₹${Number(p.price).toLocaleString('en-IN')}</span>
          <span class="pk-card__mrp">₹${Number(p.mrp).toLocaleString('en-IN')}</span>
          <span class="pk-card__save">Save ₹${(p.mrp - p.price).toLocaleString('en-IN')}</span>
        </div>
        <button type="button" class="pk-card__btn" onclick='PickMyBuild.addToCart(${JSON.stringify({
          id: p.id,
          sku: p.id + '-STD',
          title: p.title,
          price: p.price,
          mrp: p.mrp,
          image_url: p.image_url
        })})'>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', fetchProducts);
