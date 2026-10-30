const fs = require('fs');

const content = fs.readFileSync('src/data/hskData.ts', 'utf8');

const startTag = 'export const HSK_WORDS: HSKWord[] = ';
const endTag = 'export const CATEGORIES =';

const startIdx = content.indexOf(startTag);
const endIdx = content.indexOf(endTag);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not locate startTag or endTag');
  process.exit(1);
}

const prefix = content.slice(0, startIdx + startTag.length);
const jsonPart = content.slice(startIdx + startTag.length, endIdx).trim().replace(/;$/, '');
const suffix = content.slice(endIdx);

const words = JSON.parse(jsonPart);
console.log('Read words:', words.length);

const hsk2 = require('../data_hsk2_sentences.cjs').hsk2Replacements;
const hsk4 = require('./data_hsk4_sentences.cjs');
const hsk3_1 = require('./data_hsk3_part1.cjs');
const hsk3_2 = require('./data_hsk3_part2.cjs');
const hsk3_3 = require('./data_hsk3_part3.cjs');
const hsk3 = Object.assign({}, hsk3_1, hsk3_2, hsk3_3);

let updatedHsk2 = 0;
let updatedHsk3 = 0;
let updatedHsk4 = 0;

for (const w of words) {
  let repl = null;
  if (w.level === 2 && hsk2[w.hanzi]) {
    repl = hsk2[w.hanzi];
    updatedHsk2++;
  } else if (w.level === 3 && hsk3[w.hanzi]) {
    repl = hsk3[w.hanzi];
    updatedHsk3++;
  } else if (w.level === 4 && hsk4[w.hanzi]) {
    repl = hsk4[w.hanzi];
    updatedHsk4++;
  }

  if (repl && repl.length >= 2) {
    // Keep sentence 1 unchanged, replace sentences 2 and 3
    w.examples = [
      w.examples[0],
      { hz: repl[0].hz, py: repl[0].py, vi: repl[0].vi },
      { hz: repl[1].hz, py: repl[1].py, vi: repl[1].vi }
    ];
  }
}

console.log(`Updated HSK 2: ${updatedHsk2}, HSK 3: ${updatedHsk3}, HSK 4: ${updatedHsk4}`);

const newFileContent = prefix + JSON.stringify(words, null, 2) + ';\n\n' + suffix;
fs.writeFileSync('src/data/hskData.ts', newFileContent, 'utf8');
console.log('Saved updated src/data/hskData.ts successfully!');
