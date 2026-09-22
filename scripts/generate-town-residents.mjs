#!/usr/bin/env node
// Generate src/live/residents.json from every Hermes profile in
// $HERMES_HOME/profiles (default ~/.hermes/profiles).
//
//   node scripts/generate-town-residents.mjs
//
// Each resident gets a `home` field pointing at one of the themed houses
// home-0..home-6 (see src/world/map.ts homeNames), matched by profile-name
// theme, with a stable hash fallback for the rest.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const home = process.env.HERMES_HOME ?? path.join(os.homedir(), '.hermes');
const profilesDir = path.join(home, 'profiles');
const outFile = path.join(root, 'src', 'live', 'residents.json');

// Themed houses, in the same order as homeNames in src/world/map.ts.
const HOME_IDS = ['home-0', 'home-1', 'home-2', 'home-3', 'home-4', 'home-5', 'home-6'];

// Profile-name prefixes -> themed house index (0..6).
const THEME_RULES = [
  [0, /^saude|^health|^promo$|^diario$/],                        // Casa Banca de Saúde
  [1, /^devsquad|^devex|^devsecops|^python|^java|^dotnet|^linux|^ubuntu|^aws|^iam|^sec-|^tech-pc|^hermes-town/], // Casa DevSquad
  [2, /^relacionamento|^relationship|^juris-|^hr-tech/],         // Casa Relacionamento
  [3, /^mecanico|^pickup|^casa-smart/],                          // Casa Carro
  [4, /^celular|^video-studio|^locaweb|^sindico/],               // Casa Celular
  [5, /^estiloso|^moda/],                                        // Casa Moda
  [6, /^perfumaria/],                                            // Casa Perfumaria
];

function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function prettyName(slug) {
  return slug
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

const slugs = fs.readdirSync(profilesDir, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

const residents = slugs.map((slug) => {
  let homeIndex = THEME_RULES.findIndex(([, re]) => re.test(slug));
  if (homeIndex < 0) homeIndex = hashString(slug) % HOME_IDS.length;
  return {
    id: slug,
    name: prettyName(slug),
    home: HOME_IDS[homeIndex],
    homeIndex,
  };
});

const counts = {};
for (const r of residents) counts[r.home] = (counts[r.home] ?? 0) + 1;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify({ generatedAt: new Date().toISOString(), source: profilesDir, residents }, null, 2) + '\n');
console.log(`residents.json: ${residents.length} residents -> ${outFile}`);
for (const homeId of HOME_IDS) console.log(`  ${homeId}: ${counts[homeId] ?? 0}`);
