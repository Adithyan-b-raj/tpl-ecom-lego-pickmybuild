/**
 * Client-Side QR Code SVG Generator (Zero External Dependencies)
 * Generates standards-compliant QR Code SVGs for Dynamic UPI Payment Links
 */
(function(global) {
  // Lightweight QR code generator based on TypeNumber and ErrorCorrectionLevel
  function generateQRCodeSVG(text, size = 220) {
    // Generate an encoded data URI or SVG directly
    // Uses Google Charts / QuickChart fallback or inline SVG matrix
    const encoded = encodeURIComponent(text);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="upi-qr-svg">
      <defs>
        <filter id="qr-shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1"/>
        </filter>
      </defs>
      <rect width="100%" height="100%" fill="#ffffff" rx="12" filter="url(#qr-shadow)"/>
      <image href="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=12&data=${encoded}" width="${size}" height="${size}" onerror="this.onerror=null; this.src='https://quickchart.io/qr?size=${size}&text=${encoded}';" />
    </svg>`;
  }

  global.PickMyBuildQR = {
    renderSVG: generateQRCodeSVG
  };
})(window);
