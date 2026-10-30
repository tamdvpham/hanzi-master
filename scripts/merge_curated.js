import fs from 'fs';

// Load hsk1Data curated
import { pathToFileURL } from 'url';

const fullFile = fs.readFileSync('scripts/generate_full_3sentences.js', 'utf-8');
const hsk1DataCode = fullFile.match(/const hsk1Data = (\[[\s\S]*?\]);\s*console\.log/);

let curatedMap = new Map();
if (hsk1DataCode) {
  const parsed = eval(hsk1DataCode[1]);
  parsed.forEach(item => {
    const hanzi = item[0];
    const sentences = item[6].map(s => ({
      hz: s[0],
      py: s[1],
      vi: s[2]
    }));
    curatedMap.set(hanzi, sentences);
  });
  console.log(`Loaded ${curatedMap.size} curated word sentence sets.`);
}

// Read hskData.ts
const content = fs.readFileSync('src/data/hskData.ts', 'utf-8');
const match = content.match(/export const HSK_WORDS: HSKWord\[\] = (\[[\s\S]*?\]);\s*export const CATEGORIES/);
const words = JSON.parse(match[1]);

words.forEach(w => {
  if (curatedMap.has(w.hanzi)) {
    w.examples = curatedMap.get(w.hanzi);
  }
});

const newContent = `import { HSKWord } from '../types';

export const HSK_WORDS: HSKWord[] = ${JSON.stringify(words, null, 2)};

export const CATEGORIES = [
  "Tất cả",
  "Chào hỏi",
  "Giao tiếp",
  "Gia đình",
  "Số đếm",
  "Thời gian",
  "Ăn uống",
  "Học tập",
  "Địa điểm",
  "Giao thông",
  "Phương hướng",
  "Động vật",
  "Cảm xúc",
  "Thể thao",
  "Mua sắm",
  "Sức khỏe"
];
`;

fs.writeFileSync('src/data/hskData.ts', newContent, 'utf-8');
console.log('Successfully merged curated sentences into src/data/hskData.ts');
