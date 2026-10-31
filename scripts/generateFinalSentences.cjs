const fs = require('fs');

const content = fs.readFileSync('src/data/hskData.ts', 'utf8');
const startIdx = content.indexOf('export const HSK_WORDS: HSKWord[] = [');
const endIdx = content.indexOf('];\r\n\r\nexport const CATEGORIES', startIdx);
const endIdxAlt = endIdx === -1 ? content.indexOf('];\n\nexport const CATEGORIES', startIdx) : endIdx;
const actualEnd = endIdxAlt === -1 ? content.lastIndexOf('];') : endIdxAlt;
const arrayStr = content.slice(startIdx + 'export const HSK_WORDS: HSKWord[] = '.length, actualEnd + 1);
const words = JSON.parse(arrayStr);

const extraLexicon = [
  '我们', '你们', '他们', '她们', '它们', '大家', '自己', '谁', '什么', '哪儿', '哪里', '怎么', '多少', '几',
  '因为', '所以', '虽然', '但是', '如果', '不仅', '而且', '或者', '还是',
  '非常', '特别', '已经', '正在', '一起', '一直', '经常', '马上', '可能', '一定', '其实', '当然',
  '为了', '关于', '根据', '除了', '通过', '经过',
  '一点儿', '一些', '一下', '一块儿',
  '在', '从', '到', '给', '对', '跟', '比', '把', '被', '向', '离', '往',
  '很', '太', '真', '最', '更', '都', '也', '还', '再', '就', '又', '才', '只',
  '不', '没', '别', '未',
  '了', '着', '过', '吗', '呢', '吧', '啊',
  '的', '得', '地',
  '这', '那', '哪', '个', '本', '件', '张', '位', '只', '条', '块', '支', '双', '杯', '碗', '瓶', '斤', '次', '遍', '天', '年', '月', '日', '点', '分'
];

const vocabSet = new Set();
words.forEach(w => vocabSet.add(w.hanzi));
extraLexicon.forEach(term => vocabSet.add(term));
const vocabList = Array.from(vocabSet).sort((a, b) => b.length - a.length);

function tokenize(text) {
  const tokens = [];
  let i = 0;
  while (i < text.length) {
    let matched = null;
    for (const word of vocabList) {
      if (text.startsWith(word, i)) {
        matched = word;
        break;
      }
    }
    if (matched) {
      tokens.push(matched);
      i += matched.length;
    } else {
      tokens.push(text[i]);
      i += 1;
    }
  }
  return tokens;
}

function makeSegments(tokens) {
  if (tokens.length <= 4) {
    return tokens;
  }
  
  const merged = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (merged.length === 0) {
      merged.push(t);
      continue;
    }
    
    const last = merged[merged.length - 1];
    
    if (['的', '得', '地', '了', '着', '过', '吗', '呢', '吧', '儿'].includes(t)) {
      merged[merged.length - 1] = last + t;
    } else if (['在', '去', '来', '从', '给', '跟', '比', '把', '被', '到', '离', '向'].includes(last) && last.length === 1 && (last + t).length <= 4) {
      merged[merged.length - 1] = last + t;
    } else if (['我', '你', '他', '她'].includes(last) && ['想', '要', '会', '能', '爱', '有', '是', '不', '很'].includes(t)) {
      merged[merged.length - 1] = last + t;
    } else if (['很', '太', '真', '最', '更', '都', '也', '不', '没'].includes(last) && last.length === 1 && (last + t).length <= 4) {
      merged[merged.length - 1] = last + t;
    } else if (merged.length >= 4 && i === tokens.length - 1) {
      merged[merged.length - 1] = last + t;
    } else {
      merged.push(t);
    }
  }
  
  while (merged.length > 5) {
    let minIdx = 0;
    for (let j = 1; j < merged.length; j++) {
      if (merged[j].length < merged[minIdx].length) {
        minIdx = j;
      }
    }
    if (minIdx > 0) {
      merged[minIdx - 1] = merged[minIdx - 1] + merged[minIdx];
      merged.splice(minIdx, 1);
    } else {
      merged[0] = merged[0] + merged[1];
      merged.splice(1, 1);
    }
  }
  
  return merged;
}

function findTargetWords(cleanHz, primaryWord, level) {
  const targets = [];
  if (primaryWord) {
    targets.push({
      hanzi: primaryWord.hanzi,
      pinyin: primaryWord.pinyin,
      meaning: primaryWord.meaning
    });
  }
  
  const levelWords = words.filter(w => w.level === level && (!primaryWord || w.hanzi !== primaryWord.hanzi));
  for (const w of levelWords) {
    if (cleanHz.includes(w.hanzi) && targets.length < 3) {
      if (!targets.some(t => t.hanzi.includes(w.hanzi) || w.hanzi.includes(t.hanzi))) {
        targets.push({
          hanzi: w.hanzi,
          pinyin: w.pinyin,
          meaning: w.meaning
        });
      }
    }
  }
  
  if (targets.length < 2) {
    for (const w of words) {
      if (w.hanzi !== primaryWord?.hanzi && cleanHz.includes(w.hanzi) && targets.length < 2) {
        if (!targets.some(t => t.hanzi.includes(w.hanzi) || w.hanzi.includes(t.hanzi))) {
          targets.push({
            hanzi: w.hanzi,
            pinyin: w.pinyin,
            meaning: w.meaning
          });
        }
      }
    }
  }
  
  return targets;
}

function generateGrammarTip(cleanHz) {
  if (cleanHz.includes('比')) return 'Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ';
  if (cleanHz.includes('把')) return 'Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác';
  if (cleanHz.includes('被')) return 'Câu bị động (被): Chủ ngữ + 被 + Tác nhân + Động từ + Thành phần khác';
  if (cleanHz.includes('是') && cleanHz.includes('的')) return 'Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)';
  if (cleanHz.includes('虽然') || cleanHz.includes('但是')) return 'Cặp liên từ nhượng bộ: 虽然 (Tuy rằng) ... 但是 (nhưng mà)';
  if (cleanHz.includes('因为') || cleanHz.includes('所以')) return 'Cặp liên từ nguyên nhân: 因为 (Bởi vì) ... 所以 (Cho nên)';
  if (cleanHz.includes('不仅') || cleanHz.includes('而且')) return 'Cấu trúc tăng tiến: 不仅 (Không những) ... 而且 (mà còn)';
  if (cleanHz.includes('如果') || cleanHz.includes('就')) return 'Cấu trúc câu điều kiện: 如果 (Nếu) ... 就 (thì)';
  if (cleanHz.includes('一边') || cleanHz.includes('一面')) return 'Diễn tả 2 hành động song song: 一边 (vừa) ... 一边 (vừa)';
  if (cleanHz.includes('得') && (cleanHz.includes('跑得') || cleanHz.includes('说得') || cleanHz.includes('做得') || cleanHz.includes('好') || cleanHz.includes('快'))) {
    return 'Bổ ngữ trạng thái: Động từ + 得 + Tính từ / Cụm miêu tả';
  }
  if (cleanHz.includes('在') && (cleanHz.includes('里') || cleanHz.includes('上') || cleanHz.includes('下') || cleanHz.includes('边') || cleanHz.includes('面'))) {
    return 'Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ';
  }
  if (cleanHz.includes('想') || cleanHz.includes('要') || cleanHz.includes('会') || cleanHz.includes('能') || cleanHz.includes('可以') || cleanHz.includes('应该')) {
    return 'Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính';
  }
  if (cleanHz.endsWith('吗')) return 'Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？';
  if (cleanHz.includes('怎么') || cleanHz.includes('什么') || cleanHz.includes('哪儿') || cleanHz.includes('谁')) {
    return 'Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi';
  }
  if (cleanHz.includes('了')) return 'Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh';
  if (cleanHz.includes('着')) return 'Trợ từ động thái 着: Biểu thị động tác hoặc trạng thái đang tiếp diễn';
  if (cleanHz.includes('过')) return 'Trợ từ động thái 过: Biểu thị kinh nghiệm từng trải qua trong quá khứ';
  return 'Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)';
}

const levels = [1, 2, 3, 4];
const allQuestions = [];

levels.forEach(lvl => {
  const lvlWords = words.filter(w => w.level === lvl);
  const selected = [];
  const seenSentences = new Set();
  
  // Pass 1: example 0
  for (const w of lvlWords) {
    if (selected.length >= 100) break;
    for (const ex of (w.examples || [])) {
      const clean = ex.hz.replace(/[。？！?!.,，]/g, '').trim();
      if (clean.length >= 4 && clean.length <= 18 && !seenSentences.has(clean)) {
        const tokens = tokenize(clean);
        const segments = makeSegments(tokens);
        if (segments.length >= 3 && segments.length <= 6 && segments.join('') === clean) {
          seenSentences.add(clean);
          selected.push({
            id: `scramble_hsk${lvl}_${selected.length + 1}`,
            level: lvl,
            targetSentence: ex.hz,
            cleanSentence: clean,
            pinyin: ex.py,
            translation: ex.vi,
            segments,
            targetWords: findTargetWords(clean, w, lvl),
            grammarTip: generateGrammarTip(clean)
          });
          break;
        }
      }
    }
  }
  
  // Pass 2: remaining examples
  if (selected.length < 100) {
    for (const w of lvlWords) {
      if (selected.length >= 100) break;
      for (const ex of (w.examples || [])) {
        if (selected.length >= 100) break;
        const clean = ex.hz.replace(/[。？！?!.,，]/g, '').trim();
        if (clean.length >= 4 && clean.length <= 22 && !seenSentences.has(clean)) {
          const tokens = tokenize(clean);
          const segments = makeSegments(tokens);
          if (segments.length >= 3 && segments.length <= 6 && segments.join('') === clean) {
            seenSentences.add(clean);
            selected.push({
              id: `scramble_hsk${lvl}_${selected.length + 1}`,
              level: lvl,
              targetSentence: ex.hz,
              cleanSentence: clean,
              pinyin: ex.py,
              translation: ex.vi,
              segments,
              targetWords: findTargetWords(clean, w, lvl),
              grammarTip: generateGrammarTip(clean)
            });
          }
        }
      }
    }
  }
  
  console.log(`Level ${lvl}: ${selected.length} items collected.`);
  allQuestions.push(...selected);
});

// Verification check
let errors = 0;
allQuestions.forEach(q => {
  if (q.segments.join('') !== q.cleanSentence) {
    console.error('Mismatch segments join:', q.id, q.segments.join(''), 'vs', q.cleanSentence);
    errors++;
  }
  if (!q.targetWords || q.targetWords.length === 0) {
    console.error('No target words:', q.id);
    errors++;
  }
  if (!q.grammarTip) {
    console.error('No grammar tip:', q.id);
    errors++;
  }
});

console.log('Total verified questions:', allQuestions.length, 'Errors:', errors);

// Generate src/data/sentenceData.ts
const tsContent = `// Bộ sưu tập 400 câu hỏi Sắp Xếp Câu HSK (100 câu mỗi cấp độ HSK 1, 2, 3, 4)
// Mỗi câu kèm 1, 2 hoặc 3 từ vựng trọng tâm và hướng dẫn ngữ pháp

import { SentenceScrambleQuestion } from '../types';

export const SENTENCE_SCRAMBLE_DATA: SentenceScrambleQuestion[] = ${JSON.stringify(allQuestions, null, 2)};
`;

fs.writeFileSync('src/data/sentenceData.ts', tsContent, 'utf8');
console.log('Successfully written to src/data/sentenceData.ts');
