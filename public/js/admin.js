// PickMyBuild Admin Ops Console Controller
let adminAuthed = false;
let currentOrders = [];
let currentInventory = [];
let currentLedger = [];
let activeAdjustProductId = null;

function handleAdminLogin(event) {
  event.preventDefault();
  const pass = document.getElementById('admin-pass-input').value.trim();
  if (pass === 'admin123' || pass === 'admin') {
    adminAuthed = true;
    document.getElementById('admin-login-gate').style.display = 'none';
    document.getElementById('admin-main').style.display = 'block';
    loadAdminOrders();
    loadAdminInventory();
    loadAdminLedger();
  } else {
    alert('Invalid admin credentials.');
  }
}

function switchAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => {
    t.classList.toggle('is-active', t.dataset.tab === tab);
  });
  document.getElementById('tab-orders').style.display = tab === 'orders' ? 'block' : 'none';
  document.getElementById('tab-inventory').style.display = tab === 'inventory' ? 'block' : 'none';
  document.getElementById('tab-ledger').style.display = tab === 'ledger' ? 'block' : 'none';
}

async function loadAdminOrders() {
  try {
    const res = await fetch('/api/admin/orders');
    if (res.ok) {
      const data = await res.json();
      currentOrders = data.orders || [];
    }
  } catch (e) {
    console.warn('Admin orders error, fallback', e);
  }

  if (currentOrders.length === 0) {
    currentOrders = [
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
        items: [{ title: 'Lamborghini Aventador SVJ', quantity: 1, price: 3499 }]
      }
    ];
  }

  // Update KPIs
  const gross = currentOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  document.getElementById('kpi-revenue').textContent = `₹${gross.toLocaleString('en-IN')}`;
  document.getElementById('kpi-orders').textContent = currentOrders.length;
  const pendingUtrs = currentOrders.filter(o => o.payment_status === 'pending_verification').length;
  document.getElementById('kpi-utr-pending').textContent = pendingUtrs;

  renderOrdersTable();
}

function renderOrdersTable() {
  const tbody = document.getElementById('admin-orders-tbody');
  tbody.innerHTML = currentOrders.map(o => `
    <tr style="border-bottom: 1px solid #334155;">
      <td style="padding: 1.4rem 2rem; font-family: var(--font-mono); font-weight: 700; color: #fff;">
        <a href="/track.html?order=${o.order_number}" target="_blank" style="color: #60A5FA; text-decoration: underline;">${o.order_number}</a>
      </td>
      <td style="padding: 1.4rem 2rem;">
        <div style="font-weight: 700; color: #fff;">${o.customer_name}</div>
        <div style="font-size: 1.25rem; color: #94A3B8;">${o.customer_phone} • ${o.city}</div>
      </td>
      <td style="padding: 1.4rem 2rem; font-size: 1.3rem;">
        ${(o.items || []).map(i => `${i.title} (x${i.quantity})`).join(', ')}
      </td>
      <td style="padding: 1.4rem 2rem; font-weight: 800; color: #fff;">
        ₹${Number(o.total || 0).toLocaleString('en-IN')}
      </td>
      <td style="padding: 1.4rem 2rem;">
        <span style="font-size: 1.2rem; font-weight: 800; padding: 0.3rem 0.8rem; border-radius: 0.4rem; background: ${o.payment_method === 'upi' ? '#1E3A8A' : '#78350F'}; color: #fff;">
          ${o.payment_method.toUpperCase()}
        </span>
        ${o.utr_number ? `<div style="font-size: 1.15rem; color: #94A3B8; font-family: var(--font-mono); margin-top: 0.3rem;">UTR: ${o.utr_number}</div>` : ''}
      </td>
      <td style="padding: 1.4rem 2rem;">
        <span style="font-size: 1.2rem; font-weight: 800; padding: 0.3rem 0.8rem; border-radius: 0.4rem; background: ${getStatusBadgeBg(o.order_status)}; color: #fff;">
          ${o.order_status.toUpperCase()}
        </span>
      </td>
      <td style="padding: 1.4rem 2rem; text-align: right;">
        <div style="display: flex; gap: 0.6rem; justify-content: flex-end;">
          ${o.order_status === 'placed' ? `
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 1.2rem;" onclick="updateOrderStatus('${o.id}', 'confirmed')">Confirm</button>
          ` : ''}
          ${o.order_status === 'confirmed' ? `
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 1.2rem; background: #2563EB;" onclick="updateOrderStatus('${o.id}', 'packed')">Pack Box</button>
          ` : ''}
          ${o.order_status === 'packed' ? `
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 1.2rem; background: #7C3AED;" onclick="promptDispatchAWB('${o.id}')">Ship AWB</button>
          ` : ''}
          ${o.order_status === 'shipped' ? `
            <button class="btn-primary" style="padding: 0.5rem 1rem; font-size: 1.2rem; background: #059669;" onclick="updateOrderStatus('${o.id}', 'delivered')">Delivered</button>
          ` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

function getStatusBadgeBg(status) {
  switch (status) {
    case 'placed': return '#475569';
    case 'confirmed': return '#2563EB';
    case 'packed': return '#D97706';
    case 'shipped': return '#7C3AED';
    case 'delivered': return '#059669';
    case 'cancelled': return '#DC2626';
    default: return '#475569';
  }
}

async function updateOrderStatus(orderId, status, trackingAwb = null) {
  try {
    await fetch(`/api/admin/orders/${orderId}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        tracking_awb: trackingAwb,
        courier: 'BlueDart Express Air'
      })
    });
  } catch (e) {
    console.warn('Update status error', e);
  }

  // Update local
  const ord = currentOrders.find(o => o.id === orderId);
  if (ord) {
    ord.order_status = status;
    if (trackingAwb) ord.tracking_awb = trackingAwb;
  }
  renderOrdersTable();
}

function promptDispatchAWB(orderId) {
  const randAwb = 'BD' + Math.floor(100000000 + Math.random() * 900000000) + 'IN';
  const awb = prompt('Enter BlueDart Air Waybill (AWB):', randAwb);
  if (awb) {
    updateOrderStatus(orderId, 'shipped', awb.trim());
  }
}

async function loadAdminInventory() {
  try {
    const res = await fetch('/api/admin/inventory');
    if (res.ok) {
      const data = await res.json();
      currentInventory = data.inventory || [];
    }
  } catch (e) {
    console.warn('Admin inventory fetch error', e);
  }

  if (currentInventory.length === 0) {
    currentInventory = [
      { id: 'prod_svj', title: 'Lamborghini Aventador SVJ', category: 'Hypercars', price: 3499, stock: 35 },
      { id: 'prod_r34', title: 'Nissan Skyline GT-R R34 V-Spec', category: 'JDM Classics', price: 3699, stock: 28 },
      { id: 'prod_m4_gt3', title: 'BMW M4 GT3 Motorsport', category: 'GT3 Racers', price: 3299, stock: 40 },
      { id: 'prod_koenigsegg', title: 'Koenigsegg One:1 Megacar', category: 'Hypercars', price: 4299, stock: 22 },
      { id: 'prod_rx7', title: 'Mazda RX-7 FD Spirit R', category: 'JDM Classics', price: 2899, stock: 30 },
      { id: 'prod_dodge', title: 'Dodge Challenger SRT Hellcat', category: 'Muscle Legends', price: 2999, stock: 35 },
      { id: 'prod_audi_r8', title: 'Audi R8 LMS GT3', category: 'GT3 Racers', price: 3499, stock: 25 },
      { id: 'prod_evo3', title: 'Mitsubishi Lancer Evolution III', category: 'JDM Classics', price: 2799, stock: 32 },
      { id: 'prod_bmw_m1', title: 'BMW M1 Procar Classic', category: 'Supercars', price: 3199, stock: 20 },
      { id: 'prod_fj_cruiser', title: 'Toyota FJ Cruiser Dakar 4x4', category: 'Off-Road 4x4', price: 3799, stock: 24 },
      { id: 'prod_n74', title: 'Hyundai N Vision 74 Concept', category: 'Hypercars', price: 3399, stock: 26 }
    ];
  }

  const totalUnits = currentInventory.reduce((sum, p) => sum + (p.stock || 0), 0);
  document.getElementById('kpi-stock').textContent = totalUnits;

  const tbody = document.getElementById('admin-inventory-tbody');
  tbody.innerHTML = currentInventory.map(item => `
    <tr style="border-bottom: 1px solid #334155;">
      <td style="padding: 1.4rem 2rem; font-weight: 700; color: #fff;">${item.title}</td>
      <td style="padding: 1.4rem 2rem; color: #FDA4AF;">${item.category}</td>
      <td style="padding: 1.4rem 2rem; color: #fff;">₹${Number(item.price).toLocaleString('en-IN')}</td>
      <td style="padding: 1.4rem 2rem;">
        <span style="font-size: 1.5rem; font-weight: 800; color: ${item.stock < 10 ? '#EF4444' : '#10B981'};">
          ${item.stock} kits
        </span>
      </td>
      <td style="padding: 1.4rem 2rem; text-align: right;">
        <button type="button" class="btn-secondary" onclick="openStockModal('${item.id}', '${item.title.replace(/'/g, "\\'")}')" style="padding: 0.6rem 1.2rem; font-size: 1.25rem;">
          ± Adjust Stock
        </button>
      </td>
    </tr>
  `).join('');
}

function openStockModal(productId, productTitle) {
  activeAdjustProductId = productId;
  document.getElementById('modal-product-title').textContent = productTitle;
  document.getElementById('modal-delta-input').value = '';
  const modal = document.getElementById('stock-modal');
  modal.style.display = 'flex';
}

function closeStockModal() {
  document.getElementById('stock-modal').style.display = 'none';
  activeAdjustProductId = null;
}

async function submitStockAdjustment() {
  const delta = parseInt(document.getElementById('modal-delta-input').value, 10);
  const reason = document.getElementById('modal-reason-select').value;

  if (isNaN(delta) || delta === 0) {
    alert('Please enter a non-zero adjustment delta.');
    return;
  }

  try {
    await fetch('/api/admin/inventory/adjust', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: activeAdjustProductId,
        delta,
        reason,
        reference_id: 'ADJ-' + Date.now().toString().slice(-6)
      })
    });
  } catch (e) {
    console.warn('Adjust error', e);
  }

  // Update local
  const prod = currentInventory.find(p => p.id === activeAdjustProductId);
  if (prod) {
    prod.stock = Math.max(0, prod.stock + delta);
  }

  closeStockModal();
  loadAdminInventory();
  loadAdminLedger();
}

async function loadAdminLedger() {
  try {
    const res = await fetch('/api/admin/ledger');
    if (res.ok) {
      const data = await res.json();
      currentLedger = data.ledger || [];
    }
  } catch (e) {
    console.warn('Ledger error', e);
  }

  if (currentLedger.length === 0) {
    currentLedger = [
      { created_at: '2026-11-01 10:00:00', sku: 'PMB-LAM-SVJ-STD', delta: 20, reason: 'initial_seed', reference_id: 'SEED-20261101' },
      { created_at: '2026-11-01 10:00:00', sku: 'PMB-NIS-R34-STD', delta: 18, reason: 'initial_seed', reference_id: 'SEED-20261101' },
      { created_at: '2026-11-01 10:30:00', sku: 'PMB-LAM-SVJ-STD', delta: -1, reason: 'customer_order', reference_id: 'PMB-2026-8819' }
    ];
  }

  const tbody = document.getElementById('admin-ledger-tbody');
  tbody.innerHTML = currentLedger.map(l => `
    <tr style="border-bottom: 1px solid #334155;">
      <td style="padding: 1.2rem 2rem; color: #94A3B8; font-size: 1.3rem;">${l.created_at}</td>
      <td style="padding: 1.2rem 2rem; font-weight: 700; color: #fff; font-family: var(--font-mono);">${l.sku || l.product_id}</td>
      <td style="padding: 1.2rem 2rem; font-weight: 800; color: ${l.delta > 0 ? '#10B981' : '#EF4444'};">
        ${l.delta > 0 ? '+' + l.delta : l.delta}
      </td>
      <td style="padding: 1.2rem 2rem; color: #CBD5E1;">${l.reason}</td>
      <td style="padding: 1.2rem 2rem; font-family: var(--font-mono); color: #94A3B8;">${l.reference_id || '-'}</td>
    </tr>
  `).join('');
}

function exportLedgerCSV() {
  if (currentLedger.length === 0) return;
  const headers = ['Timestamp', 'SKU/Product', 'Delta', 'Reason', 'Reference ID'];
  const rows = currentLedger.map(l => [
    `"${l.created_at}"`,
    `"${l.sku || l.product_id}"`,
    l.delta,
    `"${l.reason}"`,
    `"${l.reference_id || ''}"`
  ]);
  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pickmybuild_stock_ledger_${Date.now()}.csv`;
  a.click();
}
