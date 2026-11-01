// PickMyBuild Order Tracker & GST Invoice Controller
let loadedOrder = null;
let loadedEvents = [];

async function initTracker() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderNum = urlParams.get('order');
  if (orderNum) {
    document.getElementById('track-input').value = orderNum;
    fetchOrderDetails(orderNum);
  }
}

function handleLookup(event) {
  event.preventDefault();
  const num = document.getElementById('track-input').value.trim();
  if (num) {
    fetchOrderDetails(num);
  }
}

async function fetchOrderDetails(orderNum) {
  try {
    const res = await fetch(`/api/orders/${orderNum}`);
    if (res.ok) {
      const data = await res.json();
      loadedOrder = data.order;
      loadedEvents = data.events || [];
      renderOrderTracking();
      return;
    }
  } catch (e) {
    console.warn('API error, using demo fallback', e);
  }

  // Demo Fallback
  loadedOrder = {
    id: 'ord_demo_01',
    order_number: orderNum.startsWith('PMB') ? orderNum : 'PMB-2026-8819',
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
  loadedEvents = [
    { status: 'placed', note: 'Order placed via Dynamic UPI QR', created_at: '2026-11-01 10:30:00' },
    { status: 'confirmed', note: 'UPI UTR 431189920154 verified by merchant ops', created_at: '2026-11-01 10:45:00' },
    { status: 'packed', note: 'Sealed with tamper-evident foam and numbered build pouches', created_at: '2026-11-01 13:10:00' },
    { status: 'shipped', note: 'Handed over to BlueDart Air. AWB BD892019482IN', created_at: '2026-11-01 15:40:00' }
  ];

  renderOrderTracking();
}

function renderOrderTracking() {
  const card = document.getElementById('tracking-card');
  card.style.display = 'block';

  document.getElementById('track-order-num').textContent = loadedOrder.order_number;
  document.getElementById('track-date').textContent = new Date(loadedOrder.created_at || Date.now()).toLocaleDateString('en-IN', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
  document.getElementById('track-courier').textContent = loadedOrder.courier || 'BlueDart Express Air';

  const awbVal = loadedOrder.tracking_awb || 'Pending Allocation';
  document.getElementById('track-awb-val').textContent = awbVal;

  // Stepper updates
  const stages = ['placed', 'confirmed', 'packed', 'shipped', 'delivered'];
  const curIdx = stages.indexOf(loadedOrder.order_status);

  stages.forEach((stg, i) => {
    const node = document.getElementById(`step-node-${i + 1}`);
    if (!node) return;
    node.className = 'step-node';
    if (i < curIdx) {
      node.classList.add('is-completed');
      node.querySelector('.step-circle').textContent = '✓';
    } else if (i === curIdx) {
      node.classList.add('is-active');
      node.querySelector('.step-circle').textContent = (i === 3 ? '✈️' : (i + 1));
    } else {
      node.querySelector('.step-circle').textContent = (i + 1);
    }
  });

  // Items
  const itemsContainer = document.getElementById('track-items-list');
  const items = loadedOrder.items || [];
  itemsContainer.innerHTML = items.map(item => `
    <div style="display: flex; gap: 1.4rem; align-items: center; background: #F8FAFC; padding: 1.2rem 1.6rem; border-radius: 1rem; border: 1px solid var(--color-border);">
      <div style="width: 5rem; height: 5rem; border-radius: 0.6rem; background: #fff; padding: 0.4rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <img src="${item.image_url || '/img/products/lamborghini-aventador-svj.png'}" alt="${item.title}" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
      </div>
      <div style="flex: 1;">
        <div style="font-size: 1.45rem; font-weight: 800; color: #0F172A;">${item.title}</div>
        <div style="font-size: 1.25rem; color: #64748B;">Qty: ${item.quantity} • SKU: ${item.sku || 'PMB-KIT'}</div>
      </div>
      <div style="font-size: 1.5rem; font-weight: 800; color: #0F172A;">
        ₹${Number(item.price * item.quantity).toLocaleString('en-IN')}
      </div>
    </div>
  `).join('');

  // Events timeline
  const evtsContainer = document.getElementById('track-events-timeline');
  evtsContainer.innerHTML = loadedEvents.map(evt => `
    <div style="position: relative;">
      <div style="position: absolute; left: -2.6rem; top: 0.2rem; width: 1.2rem; height: 1.2rem; border-radius: 50%; background: #E50000; border: 2px solid #fff;"></div>
      <div style="font-size: 1.4rem; font-weight: 800; color: #0F172A; text-transform: uppercase;">${evt.status}</div>
      <div style="font-size: 1.35rem; color: #475569; margin: 0.2rem 0;">${evt.note}</div>
      <div style="font-size: 1.2rem; color: #94A3B8;">${evt.created_at}</div>
    </div>
  `).join('');
}

function printInvoice() {
  if (!loadedOrder) return;

  const total = loadedOrder.total || 3299;
  const taxable = Math.round(total / 1.18);
  const cgst = Math.round((total - taxable) / 2);
  const sgst = total - taxable - cgst;

  const invoiceHtml = `
    <div style="font-family: var(--font-sans); padding: 4rem; max-width: 80rem; margin: 0 auto; background: #fff; color: #0F172A;">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0F172A; padding-bottom: 2rem; margin-bottom: 2.4rem;">
        <div>
          <h1 style="font-size: 2.8rem; font-weight: 900; margin: 0; color: #E50000;">PickMyBuild Brickworks</h1>
          <p style="margin: 0.4rem 0; font-size: 1.3rem; color: #64748B;">Central Logistics Hub, Panampilly Nagar, Kochi, Kerala - 682001</p>
          <p style="margin: 0; font-size: 1.3rem; font-weight: 700;">GSTIN: 32AAACP9201P1Z8 (Toys & Scale Models)</p>
        </div>
        <div style="text-align: right;">
          <h2 style="font-size: 2rem; font-weight: 800; margin: 0;">TAX INVOICE</h2>
          <div style="font-size: 1.4rem; font-family: var(--font-mono); margin-top: 0.4rem;">${loadedOrder.order_number}</div>
          <div style="font-size: 1.3rem; color: #64748B;">Date: ${new Date().toLocaleDateString('en-IN')}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 2.4rem;">
        <div>
          <h4 style="font-size: 1.2rem; text-transform: uppercase; color: #64748B; margin: 0 0 0.6rem;">Billed To / Shipped To:</h4>
          <strong style="font-size: 1.5rem; display: block;">${loadedOrder.customer_name}</strong>
          <p style="margin: 0.4rem 0; font-size: 1.35rem; line-height: 1.5;">${loadedOrder.shipping_address}<br/>${loadedOrder.city}, ${loadedOrder.state} - ${loadedOrder.pincode}</p>
          <div style="font-size: 1.35rem; font-weight: 600;">Phone: ${loadedOrder.customer_phone}</div>
        </div>
        <div style="background: #F8FAFC; padding: 1.6rem; border-radius: 1rem;">
          <div style="font-size: 1.3rem;"><strong>Payment Method:</strong> ${loadedOrder.payment_method.toUpperCase()}</div>
          <div style="font-size: 1.3rem; margin: 0.4rem 0;"><strong>UTR / Txn Ref:</strong> ${loadedOrder.utr_number || 'COD Confirmed'}</div>
          <div style="font-size: 1.3rem;"><strong>Air Waybill:</strong> ${loadedOrder.tracking_awb || 'BD892019482IN'}</div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 2.4rem; font-size: 1.35rem;">
        <thead>
          <tr style="background: #F1F5F9; border-bottom: 1px solid #CBD5E1;">
            <th style="padding: 1rem; text-align: left;">Item Description</th>
            <th style="padding: 1rem; text-align: center;">HSN Code</th>
            <th style="padding: 1rem; text-align: center;">Qty</th>
            <th style="padding: 1rem; text-align: right;">Rate</th>
            <th style="padding: 1rem; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${(loadedOrder.items || []).map(item => `
            <tr style="border-bottom: 1px solid #E2E8F0;">
              <td style="padding: 1.2rem 1rem;"><strong>${item.title}</strong><br/><span style="font-size: 1.2rem; color: #64748B;">SKU: ${item.sku || 'PMB-STD'}</span></td>
              <td style="padding: 1.2rem 1rem; text-align: center; font-family: var(--font-mono);">950300</td>
              <td style="padding: 1.2rem 1rem; text-align: center;">${item.quantity}</td>
              <td style="padding: 1.2rem 1rem; text-align: right;">₹${item.price}</td>
              <td style="padding: 1.2rem 1rem; text-align: right; font-weight: 700;">₹${item.price * item.quantity}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="margin-left: auto; width: 34rem; display: flex; flex-direction: column; gap: 0.8rem; font-size: 1.35rem;">
        <div style="display: flex; justify-content: space-between;">
          <span>Taxable Value:</span>
          <span>₹${taxable.toLocaleString('en-IN')}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>CGST (9%):</span>
          <span>₹${cgst.toLocaleString('en-IN')}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>SGST (9%):</span>
          <span>₹${sgst.toLocaleString('en-IN')}</span>
        </div>
        ${loadedOrder.discount ? `
          <div style="display: flex; justify-content: space-between; color: #E50000;">
            <span>Coupon Discount (${loadedOrder.coupon_code}):</span>
            <span>-₹${loadedOrder.discount}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; border-top: 2px solid #0F172A; padding-top: 0.8rem; font-size: 1.8rem; font-weight: 900;">
          <span>Total (INR):</span>
          <span>₹${total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div style="border-top: 1px solid #E2E8F0; margin-top: 3rem; padding-top: 1.6rem; font-size: 1.2rem; color: #64748B; text-align: center;">
        This is a computer generated invoice authorized under Rule 48 of the CGST Rules, 2017. PickMyBuild Brickworks India.
      </div>
    </div>
  `;

  const printArea = document.getElementById('invoice-print-area');
  printArea.innerHTML = invoiceHtml;

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`<html><head><title>Invoice ${loadedOrder.order_number}</title><style>@page { size: auto; margin: 15mm; }</style></head><body>${invoiceHtml}</body></html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
}

document.addEventListener('DOMContentLoaded', initTracker);
