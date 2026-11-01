// PickMyBuild Automated Verification Test Suite
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n--- Running PickMyBuild Verification Suite ---');

// 1. Files & Directory Structure
console.log('\n[Group 1] Essential File Existence:');
const requiredFiles = [
  'package.json',
  'wrangler.toml',
  'schema.sql',
  'seed.sql',
  'public/index.html',
  'public/shop.html',
  'public/product.html',
  'public/checkout.html',
  'public/track.html',
  'public/admin.html',
  'public/css/pickle-sections.css',
  'public/css/style.css',
  'public/js/pickle.js',
  'public/js/common.js',
  'public/js/qr.js',
  'public/js/shop.js',
  'public/js/product.js',
  'public/js/checkout.js',
  'public/js/track.js',
  'public/js/admin.js',
  'functions/api/[[route]].js',
  'functions/_lib/mock-data.js'
];

for (const file of requiredFiles) {
  const filePath = path.join(root, file);
  assert(fs.existsSync(filePath), `File exists: ${file}`);
}

// 2. Product Assets (11 Supercars from C:\lego\png)
console.log('\n[Group 2] Supercar Product PNG Assets:');
const expectedModels = [
  'lamborghini-aventador-svj.png',
  'nissan-skyline-r34.png',
  'bmw-m4-gt3.png',
  'koenigsegg-one-1.png',
  'mazda-rx7-fd.png',
  'dodge-challenger.png',
  'audi-r8-gt3.png',
  'mitsubishi-lancer-evo.png',
  'bmw-m1.png',
  'toyota-fj-cruiser.png',
  'hyundai-n-vision-74.png'
];

for (const model of expectedModels) {
  const pPath = path.join(root, 'public/img/products', model);
  assert(fs.existsSync(pPath) && fs.statSync(pPath).size > 10000, `Product PNG exists and valid (>10KB): ${model}`);
}

// 3. 9:16 Vertical Video Reels Assets
console.log('\n[Group 3] Vertical 9:16 Video Reels (5 Reels):');
for (let i = 1; i <= 5; i++) {
  const rPath = path.join(root, 'public/media/reels', `reel-${i}.mp4`);
  assert(fs.existsSync(rPath) && fs.statSync(rPath).size > 100000, `Reel reel-${i}.mp4 exists and valid (>100KB)`);
}

// 4. Pickle Custom Components & Reels Mechanics
console.log('\n[Group 4] Pickle Custom Elements & Video Reels Markup:');
const pickleJs = fs.readFileSync(path.join(root, 'public/js/pickle.js'), 'utf-8');
assert(pickleJs.includes('pickle-slider') && pickleJs.includes('pickle-reel'), 'pickle.js defines <pickle-slider> and <pickle-reel>');
assert(pickleJs.includes('pickle-tabs') && pickleJs.includes('pickle-back-to-top'), 'pickle.js defines <pickle-tabs> and <pickle-back-to-top>');
assert(pickleJs.includes('IntersectionObserver'), 'pickle.js implements IntersectionObserver for autoplay/pause');
assert(pickleJs.includes('soundButton'), 'pickle.js implements per-video sound button logic');

const indexHtml = fs.readFileSync(path.join(root, 'public/index.html'), 'utf-8');
assert(indexHtml.includes('<pickle-slider class="pk-slider">'), 'index.html contains <pickle-slider>');
assert(indexHtml.includes('<pickle-reel class="pk-reel">'), 'index.html contains <pickle-reel>');
assert(indexHtml.includes('class="pk-reel__sound" data-sound'), 'index.html contains sound toggle button');
assert(indexHtml.includes('class="pk-reel__sound-on"') && indexHtml.includes('class="pk-reel__sound-off"'), 'index.html has sound-on and sound-off state icons');
assert(indexHtml.includes('class="pk-reel__caption"'), 'index.html contains reel customer captions');
assert(indexHtml.includes('class="pk-reel__product"'), 'index.html contains shoppable product overlay tags');
assert(indexHtml.includes('pk-steps'), 'index.html contains 4-step build guide');
assert(indexHtml.includes('pk-badges'), 'index.html contains 6 trust badges');
assert(indexHtml.includes('pk-faq'), 'index.html contains accordion FAQ');
assert(indexHtml.includes('cart-drawer'), 'index.html contains slide-out bag drawer');

// 5. Database Schema & Seed
console.log('\n[Group 5] Database Schema & Seed Data:');
const schemaSql = fs.readFileSync(path.join(root, 'schema.sql'), 'utf-8');
assert(schemaSql.includes('CREATE TABLE products') && schemaSql.includes('CREATE TABLE orders'), 'schema.sql defines products and orders tables');
assert(schemaSql.includes('CREATE TABLE stock_ledger'), 'schema.sql defines immutable stock_ledger table');

const seedSql = fs.readFileSync(path.join(root, 'seed.sql'), 'utf-8');
assert(seedSql.includes('Lamborghini Aventador SVJ') && seedSql.includes('Koenigsegg One:1'), 'seed.sql seeds flagship supercars');
assert(seedSql.includes('BRICK200') && seedSql.includes('FIRSTBUILD'), 'seed.sql seeds discount coupons');

// 6. Zero Placeholders
console.log('\n[Group 6] Zero Placeholder & Quality Checks:');
assert(!indexHtml.includes('Lorem ipsum'), 'index.html has no Lorem ipsum');
assert(!indexHtml.includes('TODO'), 'index.html has no unresolved TODOs');

console.log(`\n========================================`);
console.log(`Verification Complete: ${passedTests}/${totalTests} Passed (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
