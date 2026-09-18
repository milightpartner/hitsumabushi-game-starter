// Copies the installed @milightpartner/hitsumabushi-sdk's browser-ready source into
// ./vendor/hitsumabushi-sdk.js, a real static file the game's own index.html imports via a
// relative path. This is NOT the same thing as `npx hitsumabushi dev`'s import map convenience
// (`/__hitsumabushi_dev__/sdk.js`) - that path only exists while the dev harness process is
// running, and 404s on any real host (Firebase Hosting, GitHub Pages, ...). Vendoring the file
// for real means the exact same import works identically in the dev harness AND once deployed,
// with zero bundler required. Run automatically by `npm install` (see package.json postinstall)
// - re-run manually after upgrading the SDK version to refresh vendor/hitsumabushi-sdk.js.
import fs from 'node:fs';
import path from 'node:path';

const src = path.resolve('node_modules/@milightpartner/hitsumabushi-sdk/src/hitsumabushi-sdk.js');
const destDir = path.resolve('vendor');
const dest = path.join(destDir, 'hitsumabushi-sdk.js');

if (!fs.existsSync(src)) {
  console.error(`✘ Could not find ${src} - is @milightpartner/hitsumabushi-sdk installed?`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
console.log(`✔ Vendored Hitsumabushi SDK to ${path.relative(process.cwd(), dest)}`);
console.log('  This file must be committed to git - it is what actually ships to production,');
console.log('  not just a local dev convenience (unlike .claude/skills/).');
