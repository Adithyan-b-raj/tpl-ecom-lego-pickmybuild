// PickMyBuild PDP Controller
let currentProduct = null;
let currentVariants = [];
let selectedVariant = null;
let pdpQuantity = 1;

async function loadPDP() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || 'lamborghini-aventador-svj';

  try {
    const res = await fetch(`/api/products/${slug}`);
    if (res.ok) {
      const data = await res.json();
      currentProduct = data.product;
      currentVariants = data.variants || [];
    }
  } catch (err) {
    console.warn('API error, falling back to local dataset', err);
  }

  if (!currentProduct) {
    // Fallback product
    currentProduct = {
      id: 'prod_svj',
      title: 'Lamborghini Aventador SVJ',
      slug: 'lamborghini-aventador-svj',
      category: 'Hypercars',
      description: 'The flagship Aventador SVJ brick model features functional scissor doors, independent suspension, a working V12 engine with reciprocating pistons, and an active ALA 2.0 aerodynamic wing. Built from 1,698 precision clutch elements.',
      piece_count: 1698,
      scale: '1:14',
      difficulty: 'Advanced',
      dimensions: '36cm x 17cm x 10cm',
      price: 3499,
      mrp: 4299,
      image_url: '/img/products/lamborghini-aventador-svj.png',
      rating: 4.9,
      reviews_count: 68,
      features: [
        'Working scissor doors with pneumatic dampers',
        'Reciprocating V12 engine pistons coupled to differential',
        'Independent front and rear wishbone suspension',
        'Adjustable ALA 2.0 carbon-style rear wing',
        'Includes acrylic display stand with metallic laser-etched plaque'
      ]
    };
    currentVariants = [
      { sku: 'PMB-LAM-SVJ-STD', title: 'Standard Kit (1,698 pcs)', price: 3499, mrp: 4299 },
      { sku: 'PMB-LAM-SVJ-DSP', title: 'Display Bundle (+ Acrylic Plaque & LED)', price: 3999, mrp: 4999 }
    ];
  }

  selectedVariant = currentVariants[0] || {
    sku: currentProduct.id + '-STD',
    title: 'Standard Kit',
    price: currentProduct.price,
    mrp: currentProduct.mrp
  };

  renderPDP();
}

function renderPDP() {
  document.title = `${currentProduct.title} | PickMyBuild`;
  document.getElementById('pdp-breadcrumb').textContent = currentProduct.title;
  document.getElementById('pdp-title').textContent = currentProduct.title;
  document.getElementById('pdp-category').textContent = currentProduct.category;
  document.getElementById('pdp-desc').textContent = currentProduct.description;

  const imgEl = document.getElementById('pdp-image');
  imgEl.src = currentProduct.image_url;
  imgEl.alt = currentProduct.title;

  document.getElementById('pdp-spec-pieces').textContent = `${currentProduct.piece_count} Pieces`;
  document.getElementById('pdp-spec-scale').textContent = `${currentProduct.scale} Scale`;
  document.getElementById('pdp-spec-diff').textContent = currentProduct.difficulty;

  document.getElementById('pdp-rating').textContent = currentProduct.rating || 4.9;
  document.getElementById('pdp-reviews').textContent = `(${currentProduct.reviews_count || 50} verified builder reviews)`;

  updatePriceDisplay();
  renderVariants();

  // Features list
  const feats = currentProduct.features || [];
  const featsEl = document.getElementById('pdp-features');
  featsEl.innerHTML = feats.map(f => `<li>${f}</li>`).join('');

  // Specs table
  const specsEl = document.getElementById('pdp-specs-table');
  specsEl.innerHTML = `
    <div><strong>Total Pieces:</strong> ${currentProduct.piece_count} pcs</div>
    <div><strong>Scale:</strong> ${currentProduct.scale} Display</div>
    <div><strong>Dimensions:</strong> ${currentProduct.dimensions || '36cm x 17cm x 10cm'}</div>
    <div><strong>Difficulty:</strong> ${currentProduct.difficulty}</div>
    <div><strong>Material:</strong> 100% Virgin ABS Plastic</div>
    <div><strong>Assembly Time:</strong> 5 - 7 Hours</div>
  `;
}

function updatePriceDisplay() {
  const p = selectedVariant ? selectedVariant.price : currentProduct.price;
  const m = selectedVariant ? selectedVariant.mrp : currentProduct.mrp;
  const save = m - p;
  const pct = Math.round((save / m) * 100);

  document.getElementById('pdp-price').textContent = `₹${Number(p).toLocaleString('en-IN')}`;
  document.getElementById('pdp-mrp').textContent = `₹${Number(m).toLocaleString('en-IN')}`;
  document.getElementById('pdp-save').textContent = `Save ₹${Number(save).toLocaleString('en-IN')} (${pct}% OFF)`;
}

function renderVariants() {
  const container = document.getElementById('variant-options');
  if (!container) return;

  if (currentVariants.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = currentVariants.map((v, i) => `
    <div class="variant-card ${v.sku === selectedVariant.sku ? 'is-selected' : ''}" onclick="selectVariant('${v.sku}')">
      <div style="font-size: 1.35rem; font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">${v.title}</div>
      <div style="font-size: 1.5rem; font-weight: 900; color: #E11D48;">₹${Number(v.price).toLocaleString('en-IN')}</div>
    </div>
  `).join('');
}

function selectVariant(sku) {
  const v = currentVariants.find(item => item.sku === sku);
  if (v) {
    selectedVariant = v;
    renderVariants();
    updatePriceDisplay();
  }
}

function adjustPDPQty(delta) {
  pdpQuantity = Math.max(1, pdpQuantity + delta);
  document.getElementById('pdp-qty-display').textContent = pdpQuantity;
}

function addCurrentProductToCart() {
  PickMyBuild.addToCart(currentProduct, pdpQuantity, selectedVariant);
}

document.addEventListener('DOMContentLoaded', loadPDP);
