import fs from 'fs';

// Read the existing words from hskData.ts
const content = fs.readFileSync('src/data/hskData.ts', 'utf-8');
const match = content.match(/export const HSK_WORDS: HSKWord\[\] = (\[[\s\S]*?\]);\s*export const CATEGORIES/);

if (!match) {
  console.error("Could not parse HSK_WORDS from hskData.ts");
  process.exit(1);
}

const existingWords = JSON.parse(match[1]);
console.log(`Found ${existingWords.length} existing words.`);

// Template generator function to ensure 3 diverse, contextual sentences for any Chinese word
function generate3Sentences(word) {
  const hz = word.hanzi;
  const py = word.pinyin;
  const vi = word.meaning;

  // If word has existing example, keep it as sentence 1
  const s1 = word.example
    ? { hz: word.example.hz, py: word.example.py, vi: word.example.vi }
    : { hz: `我喜欢${hz}。`, py: `Wǒ xǐhuan ${py}.`, vi: `Tôi thích ${vi}.` };

  // Generate sentence 2 and sentence 3 based on word category and type
  let s2, s3;

  switch (word.category) {
    case 'Ăn uống':
      s2 = {
        hz: `这个${hz}非常好吃。`,
        py: `Zhège ${py} fēicháng hǎochī.`,
        vi: `Cái ${hz} này ăn rất ngon.`
      };
      s3 = {
        hz: `你想吃点儿${hz}吗？`,
        py: `Nǐ xiǎng chī diǎnr ${py} ma?`,
        vi: `Bạn muốn ăn một chút ${vi} không?`
      };
      break;

    case 'Gia đình':
      s2 = {
        hz: `我的${hz}工作很忙。`,
        py: `Wǒ de ${py} gōngzuò hěn máng.`,
        vi: `${vi} của tôi công việc rất bận rộn.`
      };
      s3 = {
        hz: `我很爱我的${hz}。`,
        py: `Wǒ hěn ài wǒ de ${py}.`,
        vi: `Tôi rất yêu ${vi} của tôi.`
      };
      break;

    case 'Thời gian':
      s2 = {
        hz: `${hz}我们一起去公园吧。`,
        py: `${py} wǒmen yìqǐ qù gōngyuán ba.`,
        vi: `${vi} chúng ta cùng nhau đi công viên nhé.`
      };
      s3 = {
        hz: `到了${hz}就要认真做事。`,
        py: `Dào le ${py} jiù yào rènzhēn zuòshì.`,
        vi: `Đến ${vi} rồi thì phải nghiêm túc làm việc.`
      };
      break;

    case 'Giao thông':
      s2 = {
        hz: `坐${hz}去学校很方便。`,
        py: `Zuò ${py} qù xuéxiào hěn fāngbiàn.`,
        vi: `Đi ${vi} đến trường rất thuận tiện.`
      };
      s3 = {
        hz: `前面的${hz}开得很快。`,
        py: `Qiánmian de ${py} kāi de hěn kuài.`,
        vi: `${vi} ở phía trước đi rất nhanh.`
      };
      break;

    case 'Địa điểm':
      s2 = {
        hz: `我们要去${hz}看朋友。`,
        py: `Wǒmen yào qù ${py} kàn péngyou.`,
        vi: `Chúng tôi sẽ đến ${vi} thăm bạn.`
      };
      s3 = {
        hz: `那个${hz}非常漂亮。`,
        py: `Nà gè ${py} fēicháng piàoliang.`,
        vi: `${vi} kia vô cùng xinh đẹp.`
      };
      break;

    case 'Đồ vật':
      s2 = {
        hz: `这个${hz}是昨天买的。`,
        py: `Zhège ${py} shì zuótiān mǎi de.`,
        vi: `Cái ${hz} này là mua từ hôm qua.`
      };
      s3 = {
        hz: `桌子上的${hz}是谁的？`,
        py: `Zhuōzi shàng de ${py} shì shéi de?`,
        vi: `${vi} ở trên bàn là của ai thế?`
      };
      break;

    case 'Số đếm':
      s2 = {
        hz: `我买了${hz}个红苹果。`,
        py: `Wǒ mǎi le ${py} gè hóng píngguǒ.`,
        vi: `Tôi đã mua ${vi} quả táo đỏ.`
      };
      s3 = {
        hz: `这里有${hz}本中文书。`,
        py: `Zhèlǐ yǒu ${py} běn Zhōngwén shū.`,
        vi: `Ở đây có ${vi} quyển sách tiếng Trung.`
      };
      break;

    case 'Học tập':
      s2 = {
        hz: `老师教我们怎么${hz}。`,
        py: `Lǎoshī jiāo wǒmen zěnme ${py}.`,
        vi: `Thầy giáo dạy chúng tôi cách ${vi}.`
      };
      s3 = {
        hz: `认真${hz}会有好成绩。`,
        py: `Rènzhēn ${py} huì yǒu hǎo chéngjì.`,
        vi: `Chăm chỉ ${vi} sẽ có kết quả tốt.`
      };
      break;

    case 'Cảm xúc':
      s2 = {
        hz: `见到你我心里真${hz}。`,
        py: `Jiàndào nǐ wǒ xīnlǐ zhēn ${py}.`,
        vi: `Gặp được bạn trong lòng tôi thật ${vi}.`
      };
      s3 = {
        hz: `他总是让我们感到${hz}。`,
        py: `Tā zǒngshì ràng wǒmen gǎndào ${py}.`,
        vi: `Anh ấy luôn khiến chúng tôi cảm thấy ${vi}.`
      };
      break;

    case 'Thể thao':
      s2 = {
        hz: `周末去${hz}对身体很好。`,
        py: `Zhōumò qù ${py} duì shēntǐ hěn hǎo.`,
        vi: `Cuối tuần đi ${vi} rất tốt cho sức khỏe.`
      };
      s3 = {
        hz: `我们一起去${hz}吧。`,
        py: `Wǒmen yìqǐ qù ${py} ba.`,
        vi: `Chúng mình cùng nhau đi ${vi} nhé.`
      };
      break;

    default:
      if (word.type?.includes('Động từ')) {
        s2 = {
          hz: `请不要${hz}，大家都在休息。`,
          py: `Qǐng bú yào ${py}, dàjiā dōu zài xiūxi.`,
          vi: `Xin đừng ${vi}, mọi người đều đang nghỉ ngơi.`
        };
        s3 = {
          hz: `他很想${hz}，但是没有时间。`,
          py: `Tā hěn xiǎng ${py}, dànshì méiyǒu shíjiān.`,
          vi: `Anh ấy rất muốn ${vi}, nhưng không có thời gian.`
        };
      } else if (word.type?.includes('Tính từ')) {
        s2 = {
          hz: `今天的天气非常${hz}。`,
          py: `Jīntiān de tiānqì fēicháng ${py}.`,
          vi: `Thời tiết hôm nay vô cùng ${vi}.`
        };
        s3 = {
          hz: `这个东西一点儿也不${hz}。`,
          py: `Zhège dōngxi yìdiǎnr yě bù ${py}.`,
          vi: `Thứ này một chút cũng không ${vi}.`
        };
      } else {
        s2 = {
          hz: `我知道这个${hz}的意思。`,
          py: `Wǒ zhīdào zhège ${py} de yìsi.`,
          vi: `Tôi biết ý nghĩa của ${vi} này.`
        };
        s3 = {
          hz: `请把${hz}写在本子上。`,
          py: `Qǐng bǎ ${py} xiě zài běnzi shàng.`,
          vi: `Làm ơn viết ${hz} vào trong vở.`
        };
      }
      break;
  }

  // Ensure target word `hz` is in each sentence
  [s1, s2, s3].forEach(s => {
    if (!s.hz.includes(hz)) {
      s.hz = `${s.hz}（${hz}）`;
    }
  });

  return [s1, s2, s3];
}

// Convert all words
const updatedWords = existingWords.map(word => {
  const examples = generate3Sentences(word);
  const { example, ...rest } = word;
  return {
    ...rest,
    examples: examples
  };
});

console.log(`Generated 3 examples for all ${updatedWords.length} words!`);
console.log('Sample word with 3 sentences:');
console.log(JSON.stringify(updatedWords[0], null, 2));

const newFileContent = `import { HSKWord } from '../types';

export const HSK_WORDS: HSKWord[] = ${JSON.stringify(updatedWords, null, 2)};

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

fs.writeFileSync('src/data/hskData.ts', newFileContent, 'utf-8');
console.log('Successfully updated src/data/hskData.ts');
