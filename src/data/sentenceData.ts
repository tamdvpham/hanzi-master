// Bộ sưu tập 400 câu hỏi Sắp Xếp Câu HSK (100 câu mỗi cấp độ HSK 1, 2, 3, 4)
// Mỗi câu kèm 1, 2 hoặc 3 từ vựng trọng tâm và hướng dẫn ngữ pháp

import { SentenceScrambleQuestion } from '../types';

export const SENTENCE_SCRAMBLE_DATA: SentenceScrambleQuestion[] = [
  {
    "id": "scramble_hsk1_1",
    "level": 1,
    "targetSentence": "她很爱吃中国菜。",
    "cleanSentence": "她很爱吃中国菜",
    "pinyin": "Tā hěn ài chī Zhōngguó cài.",
    "translation": "Cô ấy rất thích ăn món Trung Quốc.",
    "segments": [
      "她很",
      "爱",
      "吃",
      "中国菜"
    ],
    "targetWords": [
      {
        "hanzi": "爱",
        "pinyin": "ài",
        "meaning": "Yêu, thích"
      },
      {
        "hanzi": "菜",
        "pinyin": "cài",
        "meaning": "Món ăn, rau"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_2",
    "level": 1,
    "targetSentence": "他有八本书。",
    "cleanSentence": "他有八本书",
    "pinyin": "Tā yǒu bā běn shū.",
    "translation": "Anh ấy có 8 quyển sách.",
    "segments": [
      "他有",
      "八",
      "本",
      "书"
    ],
    "targetWords": [
      {
        "hanzi": "八",
        "pinyin": "bā",
        "meaning": "Số 8"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_3",
    "level": 1,
    "targetSentence": "我爸爸是医生。",
    "cleanSentence": "我爸爸是医生",
    "pinyin": "Wǒ bàba shì yīshēng.",
    "translation": "Bố tôi là bác sĩ.",
    "segments": [
      "我",
      "爸爸",
      "是",
      "医生"
    ],
    "targetWords": [
      {
        "hanzi": "爸爸",
        "pinyin": "bàba",
        "meaning": "Bố, cha"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_4",
    "level": 1,
    "targetSentence": "杯子里有水。",
    "cleanSentence": "杯子里有水",
    "pinyin": "Bēizi lǐ yǒu shuǐ.",
    "translation": "Trong cốc có nước.",
    "segments": [
      "杯子",
      "里",
      "有",
      "水"
    ],
    "targetWords": [
      {
        "hanzi": "杯子",
        "pinyin": "bēizi",
        "meaning": "Cái cốc, ly"
      },
      {
        "hanzi": "里",
        "pinyin": "lǐ",
        "meaning": "Trong, bên trong"
      },
      {
        "hanzi": "水",
        "pinyin": "shuǐ",
        "meaning": "Nước"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_5",
    "level": 1,
    "targetSentence": "我想去北京。",
    "cleanSentence": "我想去北京",
    "pinyin": "Wǒ xiǎng qù Běijīng.",
    "translation": "Tôi muốn đi Bắc Kinh.",
    "segments": [
      "我",
      "想",
      "去",
      "北京"
    ],
    "targetWords": [
      {
        "hanzi": "北京",
        "pinyin": "Běijīng",
        "meaning": "Bắc Kinh"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_6",
    "level": 1,
    "targetSentence": "这是一本书。",
    "cleanSentence": "这是一本书",
    "pinyin": "Zhè shì yì běn shū.",
    "translation": "Đây là một cuốn sách.",
    "segments": [
      "这",
      "是",
      "一",
      "本书"
    ],
    "targetWords": [
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_7",
    "level": 1,
    "targetSentence": "谢谢你！——不客气。",
    "cleanSentence": "谢谢你——不客气",
    "pinyin": "Xièxie nǐ! —— Bú kèqi.",
    "translation": "Cảm ơn bạn! —— Không có gì.",
    "segments": [
      "谢谢",
      "你",
      "—",
      "—不客气"
    ],
    "targetWords": [
      {
        "hanzi": "不客气",
        "pinyin": "bú kèqi",
        "meaning": "Không có gì, đừng khách sáo"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "谢谢",
        "pinyin": "xièxie",
        "meaning": "Cảm ơn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_8",
    "level": 1,
    "targetSentence": "我不是老师。",
    "cleanSentence": "我不是老师",
    "pinyin": "Wǒ bú shì lǎoshī.",
    "translation": "Tôi không phải là giáo viên.",
    "segments": [
      "我",
      "不",
      "是",
      "老师"
    ],
    "targetWords": [
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      },
      {
        "hanzi": "老师",
        "pinyin": "lǎoshī",
        "meaning": "Thầy cô giáo"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_9",
    "level": 1,
    "targetSentence": "中国菜很好吃。",
    "cleanSentence": "中国菜很好吃",
    "pinyin": "Zhōngguó cài hěn hǎochī.",
    "translation": "Món ăn Trung Quốc rất ngon.",
    "segments": [
      "中国",
      "菜",
      "很",
      "好吃"
    ],
    "targetWords": [
      {
        "hanzi": "菜",
        "pinyin": "cài",
        "meaning": "Món ăn, rau"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_10",
    "level": 1,
    "targetSentence": "中国人喜欢喝热茶。",
    "cleanSentence": "中国人喜欢喝热茶",
    "pinyin": "Zhōngguórén xǐhuan hē rè chá.",
    "translation": "Người Trung Quốc thích uống trà nóng.",
    "segments": [
      "中国",
      "人",
      "喜欢",
      "喝",
      "热茶"
    ],
    "targetWords": [
      {
        "hanzi": "茶",
        "pinyin": "chá",
        "meaning": "Trà, chè"
      },
      {
        "hanzi": "喝",
        "pinyin": "hē",
        "meaning": "Uống"
      },
      {
        "hanzi": "热",
        "pinyin": "rè",
        "meaning": "Nóng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_11",
    "level": 1,
    "targetSentence": "你想吃什么？",
    "cleanSentence": "你想吃什么",
    "pinyin": "Nǐ xiǎng chī shénme?",
    "translation": "Bạn muốn ăn gì?",
    "segments": [
      "你",
      "想",
      "吃",
      "什么"
    ],
    "targetWords": [
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "什么",
        "pinyin": "shénme",
        "meaning": "Cái gì"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_12",
    "level": 1,
    "targetSentence": "我们坐出租车去。",
    "cleanSentence": "我们坐出租车去",
    "pinyin": "Wǒmen zuò chūzūchē qù.",
    "translation": "Chúng ta đi bằng xe taxi nhé.",
    "segments": [
      "我们",
      "坐",
      "出租车",
      "去"
    ],
    "targetWords": [
      {
        "hanzi": "出租车",
        "pinyin": "chūzūchē",
        "meaning": "Xe taxi"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_13",
    "level": 1,
    "targetSentence": "他在给妈妈打电话。",
    "cleanSentence": "他在给妈妈打电话",
    "pinyin": "Tā zài gěi māma dǎ diànhuà.",
    "translation": "Anh ấy đang gọi điện thoại cho mẹ.",
    "segments": [
      "他",
      "在给",
      "妈妈",
      "打电话"
    ],
    "targetWords": [
      {
        "hanzi": "打电话",
        "pinyin": "dǎ diànhuà",
        "meaning": "Gọi điện thoại"
      },
      {
        "hanzi": "妈妈",
        "pinyin": "māma",
        "meaning": "Mẹ"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_14",
    "level": 1,
    "targetSentence": "这个苹果很大。",
    "cleanSentence": "这个苹果很大",
    "pinyin": "Zhège píngguǒ hěn dà.",
    "translation": "Quả táo này rất to.",
    "segments": [
      "这",
      "个",
      "苹果",
      "很大"
    ],
    "targetWords": [
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_15",
    "level": 1,
    "targetSentence": "这是我的书。",
    "cleanSentence": "这是我的书",
    "pinyin": "Zhè shì wǒ de shū.",
    "translation": "Đây là sách của tôi.",
    "segments": [
      "这",
      "是",
      "我的",
      "书"
    ],
    "targetWords": [
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk1_16",
    "level": 1,
    "targetSentence": "现在三点。",
    "cleanSentence": "现在三点",
    "pinyin": "Xiànzài sān diǎn.",
    "translation": "Bây giờ là 3 giờ.",
    "segments": [
      "现在",
      "三",
      "点"
    ],
    "targetWords": [
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      },
      {
        "hanzi": "三",
        "pinyin": "sān",
        "meaning": "Số 3"
      },
      {
        "hanzi": "现在",
        "pinyin": "xiànzài",
        "meaning": "Bây giờ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_17",
    "level": 1,
    "targetSentence": "他在用电脑工作。",
    "cleanSentence": "他在用电脑工作",
    "pinyin": "Tā zài yòng diànnǎo gōngzuò.",
    "translation": "Anh ấy đang dùng máy tính để làm việc.",
    "segments": [
      "他",
      "在用",
      "电脑",
      "工作"
    ],
    "targetWords": [
      {
        "hanzi": "电脑",
        "pinyin": "diànnǎo",
        "meaning": "Máy tính"
      },
      {
        "hanzi": "工作",
        "pinyin": "gōngzuò",
        "meaning": "Công việc, làm việc"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_18",
    "level": 1,
    "targetSentence": "我看电视。",
    "cleanSentence": "我看电视",
    "pinyin": "Wǒ kàn diànshì.",
    "translation": "Tôi xem tivi.",
    "segments": [
      "我",
      "看",
      "电视"
    ],
    "targetWords": [
      {
        "hanzi": "电视",
        "pinyin": "diànshì",
        "meaning": "Tivi, truyền hình"
      },
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_19",
    "level": 1,
    "targetSentence": "这部电影真好。",
    "cleanSentence": "这部电影真好",
    "pinyin": "Zhè bù diànyǐng zhēn hǎo.",
    "translation": "Bộ phim này rất hay.",
    "segments": [
      "这",
      "部",
      "电影",
      "真好"
    ],
    "targetWords": [
      {
        "hanzi": "电影",
        "pinyin": "diànyǐng",
        "meaning": "Phim, điện ảnh"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      },
      {
        "hanzi": "这",
        "pinyin": "zhè",
        "meaning": "Đây, này"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_20",
    "level": 1,
    "targetSentence": "你去买东西吗？",
    "cleanSentence": "你去买东西吗",
    "pinyin": "Nǐ qù mǎi dōngxi ma?",
    "translation": "Bạn đi mua đồ à?",
    "segments": [
      "你",
      "去买",
      "东西吗"
    ],
    "targetWords": [
      {
        "hanzi": "东西",
        "pinyin": "dōngxi",
        "meaning": "Đồ vật, thứ"
      },
      {
        "hanzi": "吗",
        "pinyin": "ma",
        "meaning": "Không, à (nghi vấn)"
      },
      {
        "hanzi": "买",
        "pinyin": "mǎi",
        "meaning": "Mua"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk1_21",
    "level": 1,
    "targetSentence": "我们都是学生。",
    "cleanSentence": "我们都是学生",
    "pinyin": "Wǒmen dōu shì xuésheng.",
    "translation": "Chúng tôi đều là học sinh.",
    "segments": [
      "我们",
      "都",
      "是",
      "学生"
    ],
    "targetWords": [
      {
        "hanzi": "都",
        "pinyin": "dōu",
        "meaning": "Đều, tất cả"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_22",
    "level": 1,
    "targetSentence": "请跟我读。",
    "cleanSentence": "请跟我读",
    "pinyin": "Qǐng gēn wǒ dú.",
    "translation": "Xin mời đọc theo tôi.",
    "segments": [
      "请",
      "跟",
      "我",
      "读"
    ],
    "targetWords": [
      {
        "hanzi": "读",
        "pinyin": "dú",
        "meaning": "Đọc"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_23",
    "level": 1,
    "targetSentence": "对不起，我迟到了。",
    "cleanSentence": "对不起我迟到了",
    "pinyin": "Duìbuqǐ, wǒ chídào le.",
    "translation": "Xin lỗi, tôi đến muộn.",
    "segments": [
      "对不起",
      "我",
      "迟到",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "对不起",
        "pinyin": "duìbuqǐ",
        "meaning": "Xin lỗi"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_24",
    "level": 1,
    "targetSentence": "这里人很多。",
    "cleanSentence": "这里人很多",
    "pinyin": "Zhèlǐ rén hěn duō.",
    "translation": "Ở đây rất đông người.",
    "segments": [
      "这",
      "里",
      "人",
      "很多"
    ],
    "targetWords": [
      {
        "hanzi": "多",
        "pinyin": "duō",
        "meaning": "Nhiều, bao nhiêu"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      },
      {
        "hanzi": "里",
        "pinyin": "lǐ",
        "meaning": "Trong, bên trong"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_25",
    "level": 1,
    "targetSentence": "这个多少钱？",
    "cleanSentence": "这个多少钱",
    "pinyin": "Zhège duōshao qián?",
    "translation": "Cái này bao nhiêu tiền?",
    "segments": [
      "这",
      "个",
      "多少",
      "钱"
    ],
    "targetWords": [
      {
        "hanzi": "多少",
        "pinyin": "duōshao",
        "meaning": "Bao nhiêu"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      },
      {
        "hanzi": "钱",
        "pinyin": "qián",
        "meaning": "Tiền"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_26",
    "level": 1,
    "targetSentence": "他儿子五岁了。",
    "cleanSentence": "他儿子五岁了",
    "pinyin": "Tā érzi wǔ suì le.",
    "translation": "Con trai anh ấy 5 tuổi rồi.",
    "segments": [
      "他",
      "儿子",
      "五",
      "岁了"
    ],
    "targetWords": [
      {
        "hanzi": "儿子",
        "pinyin": "érzi",
        "meaning": "Con trai"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "岁",
        "pinyin": "suì",
        "meaning": "Tuổi"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_27",
    "level": 1,
    "targetSentence": "二月天气冷。",
    "cleanSentence": "二月天气冷",
    "pinyin": "Èr yuè tiānqì lěng.",
    "translation": "Tháng 2 thời tiết lạnh.",
    "segments": [
      "二",
      "月",
      "天气",
      "冷"
    ],
    "targetWords": [
      {
        "hanzi": "二",
        "pinyin": "èr",
        "meaning": "Số 2"
      },
      {
        "hanzi": "冷",
        "pinyin": "lěng",
        "meaning": "Lạnh"
      },
      {
        "hanzi": "天气",
        "pinyin": "tiānqì",
        "meaning": "Thời tiết"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_28",
    "level": 1,
    "targetSentence": "我们在饭店见面。",
    "cleanSentence": "我们在饭店见面",
    "pinyin": "Wǒmen zài fàndiàn jiànmiàn.",
    "translation": "Chúng ta gặp nhau ở quán ăn.",
    "segments": [
      "我们",
      "在",
      "饭店",
      "见面"
    ],
    "targetWords": [
      {
        "hanzi": "饭店",
        "pinyin": "fàndiàn",
        "meaning": "Nhà hàng, quán ăn"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk1_29",
    "level": 1,
    "targetSentence": "飞机起飞了。",
    "cleanSentence": "飞机起飞了",
    "pinyin": "Fēijī qǐfēi le.",
    "translation": "Máy bay cất cánh rồi.",
    "segments": [
      "飞机",
      "起飞",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "飞机",
        "pinyin": "fēijī",
        "meaning": "Máy bay"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_30",
    "level": 1,
    "targetSentence": "等我十分钟。",
    "cleanSentence": "等我十分钟",
    "pinyin": "Děng wǒ shí fēnzhōng.",
    "translation": "Đợi tôi 10 phút nhé.",
    "segments": [
      "等",
      "我",
      "十",
      "分钟"
    ],
    "targetWords": [
      {
        "hanzi": "分钟",
        "pinyin": "fēnzhōng",
        "meaning": "Phút"
      },
      {
        "hanzi": "十",
        "pinyin": "shí",
        "meaning": "Số 10"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_31",
    "level": 1,
    "targetSentence": "今天我很高兴。",
    "cleanSentence": "今天我很高兴",
    "pinyin": "Jīntiān wǒ hěn gāoxìng.",
    "translation": "Hôm nay tôi rất vui mừng.",
    "segments": [
      "今天",
      "我",
      "很",
      "高兴"
    ],
    "targetWords": [
      {
        "hanzi": "高兴",
        "pinyin": "gāoxìng",
        "meaning": "Vui mừng, hạnh phúc"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_32",
    "level": 1,
    "targetSentence": "我有一个问题。",
    "cleanSentence": "我有一个问题",
    "pinyin": "Wǒ yǒu yí gè wèntí.",
    "translation": "Tôi có một câu hỏi.",
    "segments": [
      "我有",
      "一",
      "个",
      "问题"
    ],
    "targetWords": [
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      },
      {
        "hanzi": "一",
        "pinyin": "yī",
        "meaning": "Số 1"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_33",
    "level": 1,
    "targetSentence": "我喜欢我的工作。",
    "cleanSentence": "我喜欢我的工作",
    "pinyin": "Wǒ xǐhuan wǒ de gōngzuò.",
    "translation": "Tôi yêu công việc của mình.",
    "segments": [
      "我",
      "喜欢",
      "我的",
      "工作"
    ],
    "targetWords": [
      {
        "hanzi": "工作",
        "pinyin": "gōngzuò",
        "meaning": "Công việc, làm việc"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_34",
    "level": 1,
    "targetSentence": "我家有一只狗。",
    "cleanSentence": "我家有一只狗",
    "pinyin": "Wǒ jiā yǒu yì zhī gǒu.",
    "translation": "Nhà tôi có một con chó.",
    "segments": [
      "我",
      "家",
      "有",
      "一",
      "只狗"
    ],
    "targetWords": [
      {
        "hanzi": "狗",
        "pinyin": "gǒu",
        "meaning": "Con chó"
      },
      {
        "hanzi": "家",
        "pinyin": "jiā",
        "meaning": "Nhà, gia đình"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_35",
    "level": 1,
    "targetSentence": "我想学汉语。",
    "cleanSentence": "我想学汉语",
    "pinyin": "Wǒ xiǎng xué Hànyǔ.",
    "translation": "Tôi muốn học tiếng Trung.",
    "segments": [
      "我",
      "想",
      "学",
      "汉语"
    ],
    "targetWords": [
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      },
      {
        "hanzi": "想",
        "pinyin": "xiǎng",
        "meaning": "Muốn, nhớ, nghĩ"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_36",
    "level": 1,
    "targetSentence": "今天天气很好。",
    "cleanSentence": "今天天气很好",
    "pinyin": "Jīntiān tiānqì hěn hǎo.",
    "translation": "Thời tiết hôm nay rất đẹp.",
    "segments": [
      "今天",
      "天气",
      "很",
      "好"
    ],
    "targetWords": [
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_37",
    "level": 1,
    "targetSentence": "今天十号。",
    "cleanSentence": "今天十号",
    "pinyin": "Jīntiān shí hào.",
    "translation": "Hôm nay ngày 10.",
    "segments": [
      "今天",
      "十",
      "号"
    ],
    "targetWords": [
      {
        "hanzi": "号",
        "pinyin": "hào",
        "meaning": "Ngày, số"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      },
      {
        "hanzi": "十",
        "pinyin": "shí",
        "meaning": "Số 10"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_38",
    "level": 1,
    "targetSentence": "你想喝茶还是喝咖啡？",
    "cleanSentence": "你想喝茶还是喝咖啡",
    "pinyin": "Nǐ xiǎng hē chá háishì hē kāfēi?",
    "translation": "Bạn muốn uống trà hay uống cà phê?",
    "segments": [
      "你想",
      "喝",
      "茶",
      "还是",
      "喝咖啡"
    ],
    "targetWords": [
      {
        "hanzi": "喝",
        "pinyin": "hē",
        "meaning": "Uống"
      },
      {
        "hanzi": "茶",
        "pinyin": "chá",
        "meaning": "Trà, chè"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_39",
    "level": 1,
    "targetSentence": "爸爸和妈妈在做饭。",
    "cleanSentence": "爸爸和妈妈在做饭",
    "pinyin": "Bàba hé māma zài zuò fàn.",
    "translation": "Bố và mẹ đang nấu cơm.",
    "segments": [
      "爸爸",
      "和",
      "妈妈",
      "在做饭"
    ],
    "targetWords": [
      {
        "hanzi": "和",
        "pinyin": "hé",
        "meaning": "Và, cùng với"
      },
      {
        "hanzi": "爸爸",
        "pinyin": "bàba",
        "meaning": "Bố, cha"
      },
      {
        "hanzi": "妈妈",
        "pinyin": "māma",
        "meaning": "Mẹ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_40",
    "level": 1,
    "targetSentence": "今天天气很冷。",
    "cleanSentence": "今天天气很冷",
    "pinyin": "Jīntiān tiānqì hěn lěng.",
    "translation": "Hôm nay thời tiết rất lạnh.",
    "segments": [
      "今天",
      "天气",
      "很",
      "冷"
    ],
    "targetWords": [
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      },
      {
        "hanzi": "冷",
        "pinyin": "lěng",
        "meaning": "Lạnh"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_41",
    "level": 1,
    "targetSentence": "学校在后面。",
    "cleanSentence": "学校在后面",
    "pinyin": "Xuéxiào zài hòumian.",
    "translation": "Trường học ở phía sau.",
    "segments": [
      "学校",
      "在",
      "后面"
    ],
    "targetWords": [
      {
        "hanzi": "后面",
        "pinyin": "hòumian",
        "meaning": "Phía sau, đằng sau"
      },
      {
        "hanzi": "学校",
        "pinyin": "xuéxiào",
        "meaning": "Trường học"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk1_42",
    "level": 1,
    "targetSentence": "我回中国了。",
    "cleanSentence": "我回中国了",
    "pinyin": "Wǒ huí Zhōngguó le.",
    "translation": "Tôi về Trung Quốc rồi.",
    "segments": [
      "我",
      "回",
      "中国",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "回",
        "pinyin": "huí",
        "meaning": "Về, quay lại"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_43",
    "level": 1,
    "targetSentence": "我会说汉语。",
    "cleanSentence": "我会说汉语",
    "pinyin": "Wǒ huì shuō Hànyǔ.",
    "translation": "Tôi biết nói tiếng Trung.",
    "segments": [
      "我",
      "会",
      "说",
      "汉语"
    ],
    "targetWords": [
      {
        "hanzi": "会",
        "pinyin": "huì",
        "meaning": "Biết (qua học), sẽ"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      },
      {
        "hanzi": "说",
        "pinyin": "shuō",
        "meaning": "Nói"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_44",
    "level": 1,
    "targetSentence": "你家有几口人？",
    "cleanSentence": "你家有几口人",
    "pinyin": "Nǐ jiā yǒu jǐ kǒu rén?",
    "translation": "Nhà bạn có mấy người?",
    "segments": [
      "你",
      "家",
      "有",
      "几",
      "口人"
    ],
    "targetWords": [
      {
        "hanzi": "几",
        "pinyin": "jǐ",
        "meaning": "Mấy, vài"
      },
      {
        "hanzi": "家",
        "pinyin": "jiā",
        "meaning": "Nhà, gia đình"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_45",
    "level": 1,
    "targetSentence": "这是我的家。",
    "cleanSentence": "这是我的家",
    "pinyin": "Zhè shì wǒ de jiā.",
    "translation": "Đây là nhà của tôi.",
    "segments": [
      "这",
      "是",
      "我的",
      "家"
    ],
    "targetWords": [
      {
        "hanzi": "家",
        "pinyin": "jiā",
        "meaning": "Nhà, gia đình"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk1_46",
    "level": 1,
    "targetSentence": "我叫王明。",
    "cleanSentence": "我叫王明",
    "pinyin": "Wǒ jiào Wáng Míng.",
    "translation": "Tôi tên là Vương Minh.",
    "segments": [
      "我",
      "叫",
      "王",
      "明"
    ],
    "targetWords": [
      {
        "hanzi": "叫",
        "pinyin": "jiào",
        "meaning": "Tên là, gọi"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_47",
    "level": 1,
    "targetSentence": "今天天气真好。",
    "cleanSentence": "今天天气真好",
    "pinyin": "Jīntiān tiānqì zhēn hǎo.",
    "translation": "Hôm nay thời tiết thật đẹp.",
    "segments": [
      "今天",
      "天气",
      "真",
      "好"
    ],
    "targetWords": [
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      },
      {
        "hanzi": "天气",
        "pinyin": "tiānqì",
        "meaning": "Thời tiết"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_48",
    "level": 1,
    "targetSentence": "现在是九点整。",
    "cleanSentence": "现在是九点整",
    "pinyin": "Xiànzài shì jiǔ diǎn zhěng.",
    "translation": "Bây giờ là 9 giờ đúng.",
    "segments": [
      "现在",
      "是",
      "九",
      "点整"
    ],
    "targetWords": [
      {
        "hanzi": "九",
        "pinyin": "jiǔ",
        "meaning": "Số 9"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_49",
    "level": 1,
    "targetSentence": "他会开车。",
    "cleanSentence": "他会开车",
    "pinyin": "Tā huì kāichē.",
    "translation": "Anh ấy biết lái xe hơi.",
    "segments": [
      "他",
      "会",
      "开",
      "车"
    ],
    "targetWords": [
      {
        "hanzi": "开",
        "pinyin": "kāi",
        "meaning": "Mở, lái (xe)"
      },
      {
        "hanzi": "会",
        "pinyin": "huì",
        "meaning": "Biết (qua học), sẽ"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_50",
    "level": 1,
    "targetSentence": "你在看什么？",
    "cleanSentence": "你在看什么",
    "pinyin": "Nǐ zài kàn shénme?",
    "translation": "Bạn đang xem cái gì vậy?",
    "segments": [
      "你",
      "在",
      "看",
      "什么"
    ],
    "targetWords": [
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "什么",
        "pinyin": "shénme",
        "meaning": "Cái gì"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk1_51",
    "level": 1,
    "targetSentence": "我看见他了。",
    "cleanSentence": "我看见他了",
    "pinyin": "Wǒ kànjiàn tā le.",
    "translation": "Tôi nhìn thấy anh ấy rồi.",
    "segments": [
      "我",
      "看见",
      "他",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "看见",
        "pinyin": "kànjiàn",
        "meaning": "Nhìn thấy, trông thấy"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_52",
    "level": 1,
    "targetSentence": "这本书三十块。",
    "cleanSentence": "这本书三十块",
    "pinyin": "Zhè běn shū sānshí kuài.",
    "translation": "Cuốn sách này 30 tệ.",
    "segments": [
      "这",
      "本",
      "书",
      "三",
      "十块"
    ],
    "targetWords": [
      {
        "hanzi": "块",
        "pinyin": "kuài",
        "meaning": "Đồng (tệ), miếng"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      },
      {
        "hanzi": "三",
        "pinyin": "sān",
        "meaning": "Số 3"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_53",
    "level": 1,
    "targetSentence": "你什么时候来？",
    "cleanSentence": "你什么时候来",
    "pinyin": "Nǐ shénme shíhou lái?",
    "translation": "Khi nào bạn đến?",
    "segments": [
      "你",
      "什么",
      "时候",
      "来"
    ],
    "targetWords": [
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "什么",
        "pinyin": "shénme",
        "meaning": "Cái gì"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk1_54",
    "level": 1,
    "targetSentence": "李老师很好。",
    "cleanSentence": "李老师很好",
    "pinyin": "Lǐ lǎoshī hěn hǎo.",
    "translation": "Thầy Lý rất tốt.",
    "segments": [
      "李",
      "老师",
      "很",
      "好"
    ],
    "targetWords": [
      {
        "hanzi": "老师",
        "pinyin": "lǎoshī",
        "meaning": "Thầy cô giáo"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_55",
    "level": 1,
    "targetSentence": "下雨了，带伞吧。",
    "cleanSentence": "下雨了带伞吧",
    "pinyin": "Xià yǔ le, dài sǎn ba.",
    "translation": "Mưa rồi, mang ô đi nhé.",
    "segments": [
      "下雨了",
      "带",
      "伞吧"
    ],
    "targetWords": [
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "下",
        "pinyin": "xià",
        "meaning": "Dưới, xuống"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_56",
    "level": 1,
    "targetSentence": "今天真冷。",
    "cleanSentence": "今天真冷",
    "pinyin": "Jīntiān zhēn lěng.",
    "translation": "Hôm nay thật lạnh.",
    "segments": [
      "今天",
      "真",
      "冷"
    ],
    "targetWords": [
      {
        "hanzi": "冷",
        "pinyin": "lěng",
        "meaning": "Lạnh"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_57",
    "level": 1,
    "targetSentence": "书在书包里。",
    "cleanSentence": "书在书包里",
    "pinyin": "Shū zài shūbāo lǐ.",
    "translation": "Sách ở trong cặp.",
    "segments": [
      "书",
      "在书",
      "包",
      "里"
    ],
    "targetWords": [
      {
        "hanzi": "里",
        "pinyin": "lǐ",
        "meaning": "Trong, bên trong"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk1_58",
    "level": 1,
    "targetSentence": "六点钟起床。",
    "cleanSentence": "六点钟起床",
    "pinyin": "Liù diǎn zhōng qǐchuáng.",
    "translation": "Thức dậy lúc sáu giờ.",
    "segments": [
      "六",
      "点",
      "钟",
      "起床"
    ],
    "targetWords": [
      {
        "hanzi": "六",
        "pinyin": "liù",
        "meaning": "Số 6"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_59",
    "level": 1,
    "targetSentence": "妈妈做饭。",
    "cleanSentence": "妈妈做饭",
    "pinyin": "Māma zuò fàn.",
    "translation": "Mẹ nấu cơm.",
    "segments": [
      "妈妈",
      "做",
      "饭"
    ],
    "targetWords": [
      {
        "hanzi": "妈妈",
        "pinyin": "māma",
        "meaning": "Mẹ"
      },
      {
        "hanzi": "做",
        "pinyin": "zuò",
        "meaning": "Làm, nấu"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_60",
    "level": 1,
    "targetSentence": "你是中国学生吗？",
    "cleanSentence": "你是中国学生吗",
    "pinyin": "Nǐ shì Zhōngguó xuésheng ma?",
    "translation": "Bạn là học sinh Trung Quốc phải không?",
    "segments": [
      "你是",
      "中国",
      "学生吗"
    ],
    "targetWords": [
      {
        "hanzi": "吗",
        "pinyin": "ma",
        "meaning": "Không, à (nghi vấn)"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk1_61",
    "level": 1,
    "targetSentence": "我想买一件新衣服。",
    "cleanSentence": "我想买一件新衣服",
    "pinyin": "Wǒ xiǎng mǎi yí jiàn xīn yīfu.",
    "translation": "Tôi muốn mua một bộ đồ mới.",
    "segments": [
      "我想",
      "买",
      "一",
      "件",
      "新衣服"
    ],
    "targetWords": [
      {
        "hanzi": "买",
        "pinyin": "mǎi",
        "meaning": "Mua"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      },
      {
        "hanzi": "想",
        "pinyin": "xiǎng",
        "meaning": "Muốn, nhớ, nghĩ"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_62",
    "level": 1,
    "targetSentence": "小猫睡觉了。",
    "cleanSentence": "小猫睡觉了",
    "pinyin": "Xiǎomāo shuìjiào le.",
    "translation": "Mèo con ngủ rồi.",
    "segments": [
      "小",
      "猫",
      "睡觉",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "猫",
        "pinyin": "māo",
        "meaning": "Con mèo"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "睡觉",
        "pinyin": "shuìjiào",
        "meaning": "Ngủ"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_63",
    "level": 1,
    "targetSentence": "没关系，别放在心上。",
    "cleanSentence": "没关系别放在心上",
    "pinyin": "Méi guānxi, bié fàng zài xīn shàng.",
    "translation": "Không sao, đừng để bụng nhé.",
    "segments": [
      "没关系",
      "别",
      "放",
      "在心上"
    ],
    "targetWords": [
      {
        "hanzi": "没关系",
        "pinyin": "méi guānxi",
        "meaning": "Không sao, không việc gì"
      },
      {
        "hanzi": "上",
        "pinyin": "shàng",
        "meaning": "Trên, lên"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk1_64",
    "level": 1,
    "targetSentence": "我没有书。",
    "cleanSentence": "我没有书",
    "pinyin": "Wǒ méiyǒu shū.",
    "translation": "Tôi không có sách.",
    "segments": [
      "我",
      "没有",
      "书"
    ],
    "targetWords": [
      {
        "hanzi": "没有",
        "pinyin": "méiyǒu",
        "meaning": "Không có, chưa"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_65",
    "level": 1,
    "targetSentence": "我想吃米饭。",
    "cleanSentence": "我想吃米饭",
    "pinyin": "Wǒ xiǎng chī mǐfàn.",
    "translation": "Tôi muốn ăn cơm.",
    "segments": [
      "我",
      "想",
      "吃",
      "米饭"
    ],
    "targetWords": [
      {
        "hanzi": "米饭",
        "pinyin": "mǐfàn",
        "meaning": "Cơm"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_66",
    "level": 1,
    "targetSentence": "你的名字是什么？",
    "cleanSentence": "你的名字是什么",
    "pinyin": "Nǐ de míngzi shì shénme?",
    "translation": "Tên của bạn là gì?",
    "segments": [
      "你的",
      "名字",
      "是",
      "什么"
    ],
    "targetWords": [
      {
        "hanzi": "名字",
        "pinyin": "míngzi",
        "meaning": "Tên"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk1_67",
    "level": 1,
    "targetSentence": "明天星期六，不用上课。",
    "cleanSentence": "明天星期六不用上课",
    "pinyin": "Míngtiān xīngqīliù, bú yòng shàngkè.",
    "translation": "Ngày mai thứ bảy, không cần đi học.",
    "segments": [
      "明天",
      "星期",
      "六",
      "不用",
      "上课"
    ],
    "targetWords": [
      {
        "hanzi": "明天",
        "pinyin": "míngtiān",
        "meaning": "Ngày mai"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      },
      {
        "hanzi": "六",
        "pinyin": "liù",
        "meaning": "Số 6"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_68",
    "level": 1,
    "targetSentence": "你是哪国人？",
    "cleanSentence": "你是哪国人",
    "pinyin": "Nǐ shì nǎ guó rén?",
    "translation": "Bạn là người nước nào?",
    "segments": [
      "你是",
      "哪",
      "国",
      "人"
    ],
    "targetWords": [
      {
        "hanzi": "哪",
        "pinyin": "nǎ",
        "meaning": "Nào"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "人",
        "pinyin": "rén",
        "meaning": "Người"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_69",
    "level": 1,
    "targetSentence": "你在哪儿？",
    "cleanSentence": "你在哪儿",
    "pinyin": "Nǐ zài nǎr?",
    "translation": "Bạn ở đâu?",
    "segments": [
      "你",
      "在",
      "哪儿"
    ],
    "targetWords": [
      {
        "hanzi": "哪儿",
        "pinyin": "nǎr",
        "meaning": "Ở đâu"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk1_70",
    "level": 1,
    "targetSentence": "那是我的电脑。",
    "cleanSentence": "那是我的电脑",
    "pinyin": "Nà shì wǒ de diànnǎo.",
    "translation": "Đó là máy tính của tôi.",
    "segments": [
      "那",
      "是",
      "我的",
      "电脑"
    ],
    "targetWords": [
      {
        "hanzi": "那",
        "pinyin": "nà",
        "meaning": "Đó, kia"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "电脑",
        "pinyin": "diànnǎo",
        "meaning": "Máy tính"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk1_71",
    "level": 1,
    "targetSentence": "书在那儿。",
    "cleanSentence": "书在那儿",
    "pinyin": "Shū zài nàr.",
    "translation": "Sách ở đằng kia.",
    "segments": [
      "书",
      "在",
      "那儿"
    ],
    "targetWords": [
      {
        "hanzi": "那儿",
        "pinyin": "nàr",
        "meaning": "Nơi đó, đằng kia"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_72",
    "level": 1,
    "targetSentence": "我的书呢？",
    "cleanSentence": "我的书呢",
    "pinyin": "Wǒ de shū ne?",
    "translation": "Sách của tôi đâu rồi thế?",
    "segments": [
      "我",
      "的",
      "书",
      "呢"
    ],
    "targetWords": [
      {
        "hanzi": "呢",
        "pinyin": "ne",
        "meaning": "Thế, còn... thì sao?"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_73",
    "level": 1,
    "targetSentence": "我能帮你吗？",
    "cleanSentence": "我能帮你吗",
    "pinyin": "Wǒ néng bāng nǐ ma?",
    "translation": "Tôi có thể giúp bạn không?",
    "segments": [
      "我能",
      "帮",
      "你吗"
    ],
    "targetWords": [
      {
        "hanzi": "能",
        "pinyin": "néng",
        "meaning": "Có thể, có khả năng"
      },
      {
        "hanzi": "吗",
        "pinyin": "ma",
        "meaning": "Không, à (nghi vấn)"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_74",
    "level": 1,
    "targetSentence": "你吃了吗？",
    "cleanSentence": "你吃了吗",
    "pinyin": "Nǐ chī le ma?",
    "translation": "Bạn ăn cơm chưa?",
    "segments": [
      "你",
      "吃",
      "了",
      "吗"
    ],
    "targetWords": [
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk1_75",
    "level": 1,
    "targetSentence": "我学汉语学了一年。",
    "cleanSentence": "我学汉语学了一年",
    "pinyin": "Wǒ xué Hànyǔ xué le yì nián.",
    "translation": "Tôi học tiếng Trung được một năm rồi.",
    "segments": [
      "我",
      "学",
      "汉语",
      "学了",
      "一年"
    ],
    "targetWords": [
      {
        "hanzi": "年",
        "pinyin": "nián",
        "meaning": "Năm"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_76",
    "level": 1,
    "targetSentence": "她女儿很漂亮。",
    "cleanSentence": "她女儿很漂亮",
    "pinyin": "Tā nǚ'ér hěn piàoliang.",
    "translation": "Con gái cô ấy rất xinh đẹp.",
    "segments": [
      "她",
      "女儿",
      "很",
      "漂亮"
    ],
    "targetWords": [
      {
        "hanzi": "女儿",
        "pinyin": "nǚ'ér",
        "meaning": "Con gái"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      },
      {
        "hanzi": "漂亮",
        "pinyin": "piàoliang",
        "meaning": "Xinh đẹp, đẹp"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_77",
    "level": 1,
    "targetSentence": "他是我的好朋友。",
    "cleanSentence": "他是我的好朋友",
    "pinyin": "Tā shì wǒ de hǎo péngyou.",
    "translation": "Anh ấy là bạn thân của tôi.",
    "segments": [
      "他是",
      "我的",
      "好",
      "朋友"
    ],
    "targetWords": [
      {
        "hanzi": "朋友",
        "pinyin": "péngyou",
        "meaning": "Bạn bè"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk1_78",
    "level": 1,
    "targetSentence": "你今天很漂亮。",
    "cleanSentence": "你今天很漂亮",
    "pinyin": "Nǐ jīntiān hěn piàoliang.",
    "translation": "Hôm nay bạn rất xinh đẹp.",
    "segments": [
      "你",
      "今天",
      "很",
      "漂亮"
    ],
    "targetWords": [
      {
        "hanzi": "漂亮",
        "pinyin": "piàoliang",
        "meaning": "Xinh đẹp, đẹp"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_79",
    "level": 1,
    "targetSentence": "红红的苹果真甜。",
    "cleanSentence": "红红的苹果真甜",
    "pinyin": "Hónghóng de píngguǒ zhēn tián.",
    "translation": "Quả táo đỏ mọng thật ngọt.",
    "segments": [
      "红",
      "红的",
      "苹果",
      "真甜"
    ],
    "targetWords": [
      {
        "hanzi": "苹果",
        "pinyin": "píngguǒ",
        "meaning": "Quả táo"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_80",
    "level": 1,
    "targetSentence": "早上七点起床。",
    "cleanSentence": "早上七点起床",
    "pinyin": "Zǎoshang qī diǎn qǐchuáng.",
    "translation": "Thức dậy lúc 7 giờ sáng.",
    "segments": [
      "早上",
      "七",
      "点",
      "起床"
    ],
    "targetWords": [
      {
        "hanzi": "七",
        "pinyin": "qī",
        "meaning": "Số 7"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      },
      {
        "hanzi": "上",
        "pinyin": "shàng",
        "meaning": "Trên, lên"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_81",
    "level": 1,
    "targetSentence": "这个要多少钱？",
    "cleanSentence": "这个要多少钱",
    "pinyin": "Zhège yào duōshao qián?",
    "translation": "Cái này cần bao nhiêu tiền?",
    "segments": [
      "这",
      "个",
      "要",
      "多少钱"
    ],
    "targetWords": [
      {
        "hanzi": "钱",
        "pinyin": "qián",
        "meaning": "Tiền"
      },
      {
        "hanzi": "多",
        "pinyin": "duō",
        "meaning": "Nhiều, bao nhiêu"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_82",
    "level": 1,
    "targetSentence": "车在前面。",
    "cleanSentence": "车在前面",
    "pinyin": "Chē zài qiánmian.",
    "translation": "Xe ở phía trước.",
    "segments": [
      "车",
      "在",
      "前面"
    ],
    "targetWords": [
      {
        "hanzi": "前面",
        "pinyin": "qiánmian",
        "meaning": "Phía trước"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      },
      {
        "hanzi": "车",
        "pinyin": "chē",
        "meaning": "Xe cộ"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk1_83",
    "level": 1,
    "targetSentence": "请喝茶，请坐。",
    "cleanSentence": "请喝茶请坐",
    "pinyin": "Qǐng hē chá, qǐng zuò.",
    "translation": "Mời uống trà, mời ngồi.",
    "segments": [
      "请",
      "喝",
      "茶",
      "请坐"
    ],
    "targetWords": [
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      },
      {
        "hanzi": "茶",
        "pinyin": "chá",
        "meaning": "Trà, chè"
      },
      {
        "hanzi": "喝",
        "pinyin": "hē",
        "meaning": "Uống"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_84",
    "level": 1,
    "targetSentence": "你想去哪儿？",
    "cleanSentence": "你想去哪儿",
    "pinyin": "Nǐ xiǎng qù nǎr?",
    "translation": "Bạn muốn đi đâu?",
    "segments": [
      "你",
      "想",
      "去",
      "哪儿"
    ],
    "targetWords": [
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      },
      {
        "hanzi": "哪",
        "pinyin": "nǎ",
        "meaning": "Nào"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk1_85",
    "level": 1,
    "targetSentence": "天太热了。",
    "cleanSentence": "天太热了",
    "pinyin": "Tiān tài rè le.",
    "translation": "Trời nóng quá rồi.",
    "segments": [
      "天",
      "太",
      "热",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "热",
        "pinyin": "rè",
        "meaning": "Nóng"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      },
      {
        "hanzi": "太",
        "pinyin": "tài",
        "meaning": "Quá, lắm"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_86",
    "level": 1,
    "targetSentence": "他是中国人，我是越南人。",
    "cleanSentence": "他是中国人我是越南人",
    "pinyin": "Tā shì Zhōngguórén, wǒ shì Yuènánrén.",
    "translation": "Anh ấy là người Trung Quốc, tôi là người Việt Nam.",
    "segments": [
      "他是",
      "中国人",
      "我是",
      "越",
      "南人"
    ],
    "targetWords": [
      {
        "hanzi": "人",
        "pinyin": "rén",
        "meaning": "Người"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_87",
    "level": 1,
    "targetSentence": "认识你真好。",
    "cleanSentence": "认识你真好",
    "pinyin": "Rènshi nǐ zhēn hǎo.",
    "translation": "Quen biết bạn thật tuyệt.",
    "segments": [
      "认识",
      "你",
      "真",
      "好"
    ],
    "targetWords": [
      {
        "hanzi": "认识",
        "pinyin": "rènshi",
        "meaning": "Quen biết"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      },
      {
        "hanzi": "你",
        "pinyin": "nǐ",
        "meaning": "Bạn, cậu, anh, chị"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_88",
    "level": 1,
    "targetSentence": "现在三点半。",
    "cleanSentence": "现在三点半",
    "pinyin": "Xiànzài sān diǎn bàn.",
    "translation": "Bây giờ là 3 giờ rưỡi.",
    "segments": [
      "现在",
      "三",
      "点",
      "半"
    ],
    "targetWords": [
      {
        "hanzi": "三",
        "pinyin": "sān",
        "meaning": "Số 3"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      },
      {
        "hanzi": "现在",
        "pinyin": "xiànzài",
        "meaning": "Bây giờ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_89",
    "level": 1,
    "targetSentence": "商店开门了。",
    "cleanSentence": "商店开门了",
    "pinyin": "Shāngdiàn kāimén le.",
    "translation": "Cửa hàng mở cửa rồi.",
    "segments": [
      "商店",
      "开",
      "门",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "商店",
        "pinyin": "shāngdiàn",
        "meaning": "Cửa hàng"
      },
      {
        "hanzi": "开",
        "pinyin": "kāi",
        "meaning": "Mở, lái (xe)"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk1_90",
    "level": 1,
    "targetSentence": "桌子上有一本书。",
    "cleanSentence": "桌子上有一本书",
    "pinyin": "Zhuōzi shàng yǒu yì běn shū.",
    "translation": "Trên bàn có một cuốn sách.",
    "segments": [
      "桌子",
      "上",
      "有",
      "一",
      "本书"
    ],
    "targetWords": [
      {
        "hanzi": "上",
        "pinyin": "shàng",
        "meaning": "Trên, lên"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      },
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_91",
    "level": 1,
    "targetSentence": "上午我有两节汉语课。",
    "cleanSentence": "上午我有两节汉语课",
    "pinyin": "Shàngwǔ wǒ yǒu liǎng jié Hànyǔ kè.",
    "translation": "Buổi sáng tôi có hai tiết tiếng Trung.",
    "segments": [
      "上午",
      "我有",
      "两",
      "节",
      "汉语课"
    ],
    "targetWords": [
      {
        "hanzi": "上午",
        "pinyin": "shàngwǔ",
        "meaning": "Buổi sáng"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_92",
    "level": 1,
    "targetSentence": "今天来的人很少。",
    "cleanSentence": "今天来的人很少",
    "pinyin": "Jīntiān lái de rén hěn shǎo.",
    "translation": "Hôm nay người đến rất ít.",
    "segments": [
      "今天",
      "来的",
      "人",
      "很少"
    ],
    "targetWords": [
      {
        "hanzi": "少",
        "pinyin": "shǎo",
        "meaning": "Ít"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_93",
    "level": 1,
    "targetSentence": "他是谁的朋友？",
    "cleanSentence": "他是谁的朋友",
    "pinyin": "Tā shì shéi de péngyou?",
    "translation": "Anh ấy là bạn của ai thế?",
    "segments": [
      "他是",
      "谁的",
      "朋友"
    ],
    "targetWords": [
      {
        "hanzi": "谁",
        "pinyin": "shéi",
        "meaning": "Ai"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      },
      {
        "hanzi": "朋友",
        "pinyin": "péngyou",
        "meaning": "Bạn bè"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk1_94",
    "level": 1,
    "targetSentence": "这是什么？",
    "cleanSentence": "这是什么",
    "pinyin": "Zhè shì shénme?",
    "translation": "Đây là cái gì?",
    "segments": [
      "这",
      "是",
      "什么"
    ],
    "targetWords": [
      {
        "hanzi": "什么",
        "pinyin": "shénme",
        "meaning": "Cái gì"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "这",
        "pinyin": "zhè",
        "meaning": "Đây, này"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk1_95",
    "level": 1,
    "targetSentence": "十全十美。",
    "cleanSentence": "十全十美",
    "pinyin": "Shí quán shí měi.",
    "translation": "Mười phân vẹn mười.",
    "segments": [
      "十",
      "全",
      "十",
      "美"
    ],
    "targetWords": [
      {
        "hanzi": "十",
        "pinyin": "shí",
        "meaning": "Số 10"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_96",
    "level": 1,
    "targetSentence": "你什么时候回家？",
    "cleanSentence": "你什么时候回家",
    "pinyin": "Nǐ shénme shíhou huí jiā?",
    "translation": "Khi nào thì bạn về nhà?",
    "segments": [
      "你",
      "什么",
      "时候",
      "回家"
    ],
    "targetWords": [
      {
        "hanzi": "时候",
        "pinyin": "shíhou",
        "meaning": "Lúc, khi"
      },
      {
        "hanzi": "回",
        "pinyin": "huí",
        "meaning": "Về, quay lại"
      },
      {
        "hanzi": "家",
        "pinyin": "jiā",
        "meaning": "Nhà, gia đình"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk1_97",
    "level": 1,
    "targetSentence": "我是学生。",
    "cleanSentence": "我是学生",
    "pinyin": "Wǒ shì xuésheng.",
    "translation": "Tôi là học sinh.",
    "segments": [
      "我",
      "是",
      "学生"
    ],
    "targetWords": [
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      },
      {
        "hanzi": "学生",
        "pinyin": "xuésheng",
        "meaning": "Học sinh, sinh viên"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_98",
    "level": 1,
    "targetSentence": "桌上有一本中文书。",
    "cleanSentence": "桌上有一本中文书",
    "pinyin": "Zhuō shàng yǒu yì běn Zhōngwén shū.",
    "translation": "Trên bàn có một cuốn sách tiếng Trung.",
    "segments": [
      "桌上",
      "有",
      "一",
      "本",
      "中文书"
    ],
    "targetWords": [
      {
        "hanzi": "书",
        "pinyin": "shū",
        "meaning": "Sách"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      },
      {
        "hanzi": "上",
        "pinyin": "shàng",
        "meaning": "Trên, lên"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_99",
    "level": 1,
    "targetSentence": "请给我一杯温水。",
    "cleanSentence": "请给我一杯温水",
    "pinyin": "Qǐng gěi wǒ yì bēi wēn shuǐ.",
    "translation": "Làm ơn cho tôi một cốc nước ấm.",
    "segments": [
      "请",
      "给我",
      "一",
      "杯",
      "温水"
    ],
    "targetWords": [
      {
        "hanzi": "水",
        "pinyin": "shuǐ",
        "meaning": "Nước"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk1_100",
    "level": 1,
    "targetSentence": "今天我买了苹果和水果。",
    "cleanSentence": "今天我买了苹果和水果",
    "pinyin": "Jīntiān wǒ mǎi le píngguǒ hé shuǐguǒ.",
    "translation": "Hôm nay tôi đã mua táo và hoa quả.",
    "segments": [
      "今天",
      "我",
      "买了",
      "苹果",
      "和水果"
    ],
    "targetWords": [
      {
        "hanzi": "水果",
        "pinyin": "shuǐguǒ",
        "meaning": "Trái cây, hoa quả"
      },
      {
        "hanzi": "和",
        "pinyin": "hé",
        "meaning": "Và, cùng với"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_1",
    "level": 2,
    "targetSentence": "我们走吧。",
    "cleanSentence": "我们走吧",
    "pinyin": "Wǒmen zǒu ba.",
    "translation": "Chúng ta đi thôi nhé.",
    "segments": [
      "我们",
      "走",
      "吧"
    ],
    "targetWords": [
      {
        "hanzi": "吧",
        "pinyin": "ba",
        "meaning": "Đi, nhé (trợ từ ngữ khí)"
      },
      {
        "hanzi": "走",
        "pinyin": "zǒu",
        "meaning": "Đi bộ, rời đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_2",
    "level": 2,
    "targetSentence": "我喜欢白色的猫。",
    "cleanSentence": "我喜欢白色的猫",
    "pinyin": "Wǒ xǐhuan báisè de māo.",
    "translation": "Tôi thích con mèo màu trắng.",
    "segments": [
      "我",
      "喜欢",
      "白",
      "色的猫"
    ],
    "targetWords": [
      {
        "hanzi": "白",
        "pinyin": "bái",
        "meaning": "Màu trắng"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_3",
    "level": 2,
    "targetSentence": "一百块钱。",
    "cleanSentence": "一百块钱",
    "pinyin": "Yì bǎi kuài qián.",
    "translation": "Một trăm tệ.",
    "segments": [
      "一",
      "百",
      "块",
      "钱"
    ],
    "targetWords": [
      {
        "hanzi": "百",
        "pinyin": "bǎi",
        "meaning": "Trăm (100)"
      },
      {
        "hanzi": "块",
        "pinyin": "kuài",
        "meaning": "Đồng (tệ), miếng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_4",
    "level": 2,
    "targetSentence": "谢谢你的帮助。",
    "cleanSentence": "谢谢你的帮助",
    "pinyin": "Xièxie nǐ de bāngzhù.",
    "translation": "Cảm ơn sự giúp đỡ của bạn.",
    "segments": [
      "谢谢",
      "你",
      "的",
      "帮助"
    ],
    "targetWords": [
      {
        "hanzi": "帮助",
        "pinyin": "bāngzhù",
        "meaning": "Giúp đỡ"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_5",
    "level": 2,
    "targetSentence": "我爸爸喜欢看报纸。",
    "cleanSentence": "我爸爸喜欢看报纸",
    "pinyin": "Wǒ bàba xǐhuan kàn bàozhǐ.",
    "translation": "Bố tôi thích đọc báo.",
    "segments": [
      "我",
      "爸爸",
      "喜欢",
      "看报纸"
    ],
    "targetWords": [
      {
        "hanzi": "报纸",
        "pinyin": "bàozhǐ",
        "meaning": "Báo, tờ báo"
      },
      {
        "hanzi": "爸爸",
        "pinyin": "bàba",
        "meaning": "Bố, cha"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_6",
    "level": 2,
    "targetSentence": "今天比昨天冷。",
    "cleanSentence": "今天比昨天冷",
    "pinyin": "Jīntiān bǐ zuótiān lěng.",
    "translation": "Hôm nay lạnh hơn hôm qua.",
    "segments": [
      "今天",
      "比",
      "昨天",
      "冷"
    ],
    "targetWords": [
      {
        "hanzi": "比",
        "pinyin": "bǐ",
        "meaning": "So với (so sánh)"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk2_7",
    "level": 2,
    "targetSentence": "别担心，一切都会好起来的。",
    "cleanSentence": "别担心一切都会好起来的",
    "pinyin": "Bié dānxīn, yíqiè dōu huì hǎo qǐlai de.",
    "translation": "Đừng lo lắng, mọi chuyện rồi sẽ ổn thôi.",
    "segments": [
      "别担心一切",
      "都会",
      "好",
      "起",
      "来的"
    ],
    "targetWords": [
      {
        "hanzi": "别",
        "pinyin": "bié",
        "meaning": "Đừng, chớ"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_8",
    "level": 2,
    "targetSentence": "她的头发很长。",
    "cleanSentence": "她的头发很长",
    "pinyin": "Tā de tóufa hěn cháng.",
    "translation": "Tóc của cô ấy rất dài.",
    "segments": [
      "她的",
      "头发",
      "很长"
    ],
    "targetWords": [
      {
        "hanzi": "长",
        "pinyin": "cháng",
        "meaning": "Dài"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_9",
    "level": 2,
    "targetSentence": "她唱歌很好听。",
    "cleanSentence": "她唱歌很好听",
    "pinyin": "Tā chànggē hěn hǎotīng.",
    "translation": "Cô ấy hát rất hay.",
    "segments": [
      "她",
      "唱歌",
      "很好",
      "听"
    ],
    "targetWords": [
      {
        "hanzi": "唱歌",
        "pinyin": "chànggē",
        "meaning": "Hát, ca hát"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_10",
    "level": 2,
    "targetSentence": "请走出去。",
    "cleanSentence": "请走出去",
    "pinyin": "Qǐng zǒu chūqu.",
    "translation": "Xin hãy bước ra ngoài.",
    "segments": [
      "请",
      "走",
      "出",
      "去"
    ],
    "targetWords": [
      {
        "hanzi": "出",
        "pinyin": "chū",
        "meaning": "Ra, xuất hiện"
      },
      {
        "hanzi": "走",
        "pinyin": "zǒu",
        "meaning": "Đi bộ, rời đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_11",
    "level": 2,
    "targetSentence": "今天穿新衣服。",
    "cleanSentence": "今天穿新衣服",
    "pinyin": "Jīntiān chuān xīn yīfu.",
    "translation": "Hôm nay mặc quần áo mới.",
    "segments": [
      "今天",
      "穿",
      "新",
      "衣服"
    ],
    "targetWords": [
      {
        "hanzi": "穿",
        "pinyin": "chuān",
        "meaning": "Mặc, đeo (quần áo, giày)"
      },
      {
        "hanzi": "新",
        "pinyin": "xīn",
        "meaning": "Mới"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_12",
    "level": 2,
    "targetSentence": "我去过一次北京。",
    "cleanSentence": "我去过一次北京",
    "pinyin": "Wǒ qù guo yí cì Běijīng.",
    "translation": "Tôi từng đi Bắc Kinh một lần.",
    "segments": [
      "我",
      "去过",
      "一",
      "次北京"
    ],
    "targetWords": [
      {
        "hanzi": "次",
        "pinyin": "cì",
        "meaning": "Lần (lượng từ số lần)"
      },
      {
        "hanzi": "过",
        "pinyin": "guo",
        "meaning": "Từng (trợ từ quá khứ); qua"
      }
    ],
    "grammarTip": "Trợ từ động thái 过: Biểu thị kinh nghiệm từng trải qua trong quá khứ"
  },
  {
    "id": "scramble_hsk2_13",
    "level": 2,
    "targetSentence": "从北京到上海。",
    "cleanSentence": "从北京到上海",
    "pinyin": "Cóng Běijīng dào Shànghǎi.",
    "translation": "Từ Bắc Kinh đến Thượng Hải.",
    "segments": [
      "从北京",
      "到上",
      "海"
    ],
    "targetWords": [
      {
        "hanzi": "从",
        "pinyin": "cóng",
        "meaning": "Từ (nơi chốn/thời gian)"
      },
      {
        "hanzi": "到",
        "pinyin": "dào",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_14",
    "level": 2,
    "targetSentence": "你说错了。",
    "cleanSentence": "你说错了",
    "pinyin": "Nǐ shuō cuò le.",
    "translation": "Bạn nói sai rồi.",
    "segments": [
      "你",
      "说",
      "错",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "错",
        "pinyin": "cuò",
        "meaning": "Sai, nhầm"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_15",
    "level": 2,
    "targetSentence": "下午我们去打篮球。",
    "cleanSentence": "下午我们去打篮球",
    "pinyin": "Xiàwǔ wǒmen qù dǎ lánqiú.",
    "translation": "Chiều nay chúng mình đi chơi bóng rổ nhé.",
    "segments": [
      "下午",
      "我们",
      "去",
      "打篮球"
    ],
    "targetWords": [
      {
        "hanzi": "打篮球",
        "pinyin": "dǎ lánqiú",
        "meaning": "Chơi bóng rổ"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_16",
    "level": 2,
    "targetSentence": "请大家安静，现在开始开会。",
    "cleanSentence": "请大家安静现在开始开会",
    "pinyin": "Qǐng dàjiā ānjìng, xiànzài kāishǐ kāihuì.",
    "translation": "Xin mọi người trật tự, bây giờ bắt đầu cuộc họp.",
    "segments": [
      "请大家",
      "安静",
      "现在",
      "开始",
      "开会"
    ],
    "targetWords": [
      {
        "hanzi": "大家",
        "pinyin": "dàjiā",
        "meaning": "Mọi người"
      },
      {
        "hanzi": "开始",
        "pinyin": "kāishǐ",
        "meaning": "Bắt đầu"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_17",
    "level": 2,
    "targetSentence": "我到了学校。",
    "cleanSentence": "我到了学校",
    "pinyin": "Wǒ dào le xuéxiào.",
    "translation": "Tôi đã đến trường rồi.",
    "segments": [
      "我",
      "到",
      "了",
      "学校"
    ],
    "targetWords": [
      {
        "hanzi": "到",
        "pinyin": "dào",
        "meaning": "Đến, tới"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_18",
    "level": 2,
    "targetSentence": "他跑得很快。",
    "cleanSentence": "他跑得很快",
    "pinyin": "Tā pǎo de hěn kuài.",
    "translation": "Anh ấy chạy rất nhanh.",
    "segments": [
      "他",
      "跑得",
      "很快"
    ],
    "targetWords": [
      {
        "hanzi": "得",
        "pinyin": "de",
        "meaning": "Được (trợ từ trạng thái)"
      },
      {
        "hanzi": "快",
        "pinyin": "kuài",
        "meaning": "Nhanh; sắp"
      }
    ],
    "grammarTip": "Bổ ngữ trạng thái: Động từ + 得 + Tính từ / Cụm miêu tả"
  },
  {
    "id": "scramble_hsk2_19",
    "level": 2,
    "targetSentence": "请等一下。",
    "cleanSentence": "请等一下",
    "pinyin": "Qǐng děng yíxià.",
    "translation": "Xin đợi một lát.",
    "segments": [
      "请",
      "等",
      "一下"
    ],
    "targetWords": [
      {
        "hanzi": "等",
        "pinyin": "děng",
        "meaning": "Đợi, chờ"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_20",
    "level": 2,
    "targetSentence": "我有两个弟弟。",
    "cleanSentence": "我有两个弟弟",
    "pinyin": "Wǒ yǒu liǎng gè dìdi.",
    "translation": "Tôi có hai người em trai.",
    "segments": [
      "我有",
      "两",
      "个",
      "弟弟"
    ],
    "targetWords": [
      {
        "hanzi": "弟弟",
        "pinyin": "dìdi",
        "meaning": "Em trai"
      },
      {
        "hanzi": "两",
        "pinyin": "liǎng",
        "meaning": "Hai (dùng trước lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_21",
    "level": 2,
    "targetSentence": "他是第一名。",
    "cleanSentence": "他是第一名",
    "pinyin": "Tā shì dì-yī míng.",
    "translation": "Anh ấy là người đứng thứ nhất.",
    "segments": [
      "他",
      "是",
      "第一",
      "名"
    ],
    "targetWords": [
      {
        "hanzi": "第一",
        "pinyin": "dì-yī",
        "meaning": "Thứ nhất, đầu tiên"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_22",
    "level": 2,
    "targetSentence": "你听懂了吗？",
    "cleanSentence": "你听懂了吗",
    "pinyin": "Nǐ tīng dǒng le ma?",
    "translation": "Bạn nghe có hiểu không?",
    "segments": [
      "你",
      "听",
      "懂了吗"
    ],
    "targetWords": [
      {
        "hanzi": "懂",
        "pinyin": "dǒng",
        "meaning": "Hiểu, nắm rõ"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk2_23",
    "level": 2,
    "targetSentence": "你说的对。",
    "cleanSentence": "你说的对",
    "pinyin": "Nǐ shuō de duì.",
    "translation": "Bạn nói đúng rồi.",
    "segments": [
      "你",
      "说",
      "的",
      "对"
    ],
    "targetWords": [
      {
        "hanzi": "对",
        "pinyin": "duì",
        "meaning": "Đúng; đối với"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_24",
    "level": 2,
    "targetSentence": "房间很干净。",
    "cleanSentence": "房间很干净",
    "pinyin": "Fángjiān hěn gānjìng.",
    "translation": "Phòng ốc rất sạch sẽ.",
    "segments": [
      "房间",
      "很",
      "干净"
    ],
    "targetWords": [
      {
        "hanzi": "房间",
        "pinyin": "fángjiān",
        "meaning": "Phòng, căn phòng"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_25",
    "level": 2,
    "targetSentence": "我非常喜欢这儿。",
    "cleanSentence": "我非常喜欢这儿",
    "pinyin": "Wǒ fēicháng xǐhuan zhèr.",
    "translation": "Tôi vô cùng thích nơi này.",
    "segments": [
      "我",
      "非常",
      "喜欢",
      "这儿"
    ],
    "targetWords": [
      {
        "hanzi": "非常",
        "pinyin": "fēicháng",
        "meaning": "Rất, vô cùng"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_26",
    "level": 2,
    "targetSentence": "服务员，买单！",
    "cleanSentence": "服务员买单",
    "pinyin": "Fúwùyuán, mǎidān!",
    "translation": "Phục vụ ơi, tính tiền!",
    "segments": [
      "服务员",
      "买",
      "单"
    ],
    "targetWords": [
      {
        "hanzi": "服务员",
        "pinyin": "fúwùyuán",
        "meaning": "Nhân viên phục vụ"
      },
      {
        "hanzi": "买",
        "pinyin": "mǎi",
        "meaning": "Mua"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_27",
    "level": 2,
    "targetSentence": "他比我高。",
    "cleanSentence": "他比我高",
    "pinyin": "Tā bǐ wǒ gāo.",
    "translation": "Anh ấy cao hơn tôi.",
    "segments": [
      "他",
      "比",
      "我",
      "高"
    ],
    "targetWords": [
      {
        "hanzi": "高",
        "pinyin": "gāo",
        "meaning": "Cao"
      },
      {
        "hanzi": "比",
        "pinyin": "bǐ",
        "meaning": "So với (so sánh)"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk2_28",
    "level": 2,
    "targetSentence": "请告诉我。",
    "cleanSentence": "请告诉我",
    "pinyin": "Qǐng gàosu wǒ.",
    "translation": "Xin hãy nói cho tôi biết.",
    "segments": [
      "请",
      "告诉",
      "我"
    ],
    "targetWords": [
      {
        "hanzi": "告诉",
        "pinyin": "gàosu",
        "meaning": "Bảo, nói cho biết"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_29",
    "level": 2,
    "targetSentence": "我哥哥在工作。",
    "cleanSentence": "我哥哥在工作",
    "pinyin": "Wǒ gēge zài gōngzuò.",
    "translation": "Anh trai tôi đang đi làm.",
    "segments": [
      "我",
      "哥哥",
      "在",
      "工作"
    ],
    "targetWords": [
      {
        "hanzi": "哥哥",
        "pinyin": "gēge",
        "meaning": "Anh trai"
      },
      {
        "hanzi": "工作",
        "pinyin": "gōngzuò",
        "meaning": "Công việc, làm việc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_30",
    "level": 2,
    "targetSentence": "给你一本书。",
    "cleanSentence": "给你一本书",
    "pinyin": "Gěi nǐ yì běn shū.",
    "translation": "Cho bạn cuốn sách này.",
    "segments": [
      "给你",
      "一",
      "本",
      "书"
    ],
    "targetWords": [
      {
        "hanzi": "给",
        "pinyin": "gěi",
        "meaning": "Cho, tặng; cho ai đó"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_31",
    "level": 2,
    "targetSentence": "我坐公共汽车去学校。",
    "cleanSentence": "我坐公共汽车去学校",
    "pinyin": "Wǒ zuò gōnggòng qìchē qù xuéxiào.",
    "translation": "Tôi đi xe buýt đến trường.",
    "segments": [
      "我",
      "坐",
      "公共汽车",
      "去学校"
    ],
    "targetWords": [
      {
        "hanzi": "公共汽车",
        "pinyin": "gōnggòng qìchē",
        "meaning": "Xe buýt"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_32",
    "level": 2,
    "targetSentence": "他在一家大公司工作。",
    "cleanSentence": "他在一家大公司工作",
    "pinyin": "Tā zài yì jiā dà gōngsī gōngzuò.",
    "translation": "Anh ấy làm việc ở một công ty lớn.",
    "segments": [
      "他",
      "在一",
      "家",
      "大",
      "公司工作"
    ],
    "targetWords": [
      {
        "hanzi": "公司",
        "pinyin": "gōngsī",
        "meaning": "Công ty"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_33",
    "level": 2,
    "targetSentence": "太贵了，便宜点吧。",
    "cleanSentence": "太贵了便宜点吧",
    "pinyin": "Tài guì le, piányi diǎn ba.",
    "translation": "Đắt quá, rẻ một chút đi.",
    "segments": [
      "太贵了",
      "便宜",
      "点吧"
    ],
    "targetWords": [
      {
        "hanzi": "贵",
        "pinyin": "guì",
        "meaning": "Đắt; quý phái"
      },
      {
        "hanzi": "吧",
        "pinyin": "ba",
        "meaning": "Đi, nhé (trợ từ ngữ khí)"
      },
      {
        "hanzi": "便宜",
        "pinyin": "piányi",
        "meaning": "Rẻ, giá rẻ"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_34",
    "level": 2,
    "targetSentence": "我看过这本书。",
    "cleanSentence": "我看过这本书",
    "pinyin": "Wǒ kàn guo zhè běn shū.",
    "translation": "Tôi từng đọc cuốn sách này rồi.",
    "segments": [
      "我",
      "看过",
      "这",
      "本书"
    ],
    "targetWords": [
      {
        "hanzi": "过",
        "pinyin": "guo",
        "meaning": "Từng (trợ từ quá khứ); qua"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      }
    ],
    "grammarTip": "Trợ từ động thái 过: Biểu thị kinh nghiệm từng trải qua trong quá khứ"
  },
  {
    "id": "scramble_hsk2_35",
    "level": 2,
    "targetSentence": "我还要一个苹果。",
    "cleanSentence": "我还要一个苹果",
    "pinyin": "Wǒ hái yào yí gè píngguǒ.",
    "translation": "Tôi còn muốn thêm một quả táo nữa.",
    "segments": [
      "我",
      "还",
      "要",
      "一",
      "个苹果"
    ],
    "targetWords": [
      {
        "hanzi": "还",
        "pinyin": "hái",
        "meaning": "Còn, vẫn còn"
      },
      {
        "hanzi": "要",
        "pinyin": "yào",
        "meaning": "Muốn, cần, sắp"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_36",
    "level": 2,
    "targetSentence": "孩子们在玩游戏。",
    "cleanSentence": "孩子们在玩游戏",
    "pinyin": "Háizimen zài wán yóuxì.",
    "translation": "Bọn trẻ đang chơi trò chơi.",
    "segments": [
      "孩子",
      "们",
      "在玩",
      "游戏"
    ],
    "targetWords": [
      {
        "hanzi": "孩子",
        "pinyin": "háizi",
        "meaning": "Trẻ con, con cái"
      },
      {
        "hanzi": "玩",
        "pinyin": "wán",
        "meaning": "Chơi, giải trí"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_37",
    "level": 2,
    "targetSentence": "这道菜很好吃。",
    "cleanSentence": "这道菜很好吃",
    "pinyin": "Zhè dào cài hěn hǎochī.",
    "translation": "Món ăn này rất ngon.",
    "segments": [
      "这",
      "道",
      "菜",
      "很好吃"
    ],
    "targetWords": [
      {
        "hanzi": "好吃",
        "pinyin": "hǎochī",
        "meaning": "Ngon (đồ ăn)"
      },
      {
        "hanzi": "菜",
        "pinyin": "cài",
        "meaning": "Món ăn, rau"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_38",
    "level": 2,
    "targetSentence": "黑色的鞋子。",
    "cleanSentence": "黑色的鞋子",
    "pinyin": "Hēisè de xiézi.",
    "translation": "Đôi giày màu đen.",
    "segments": [
      "黑",
      "色的",
      "鞋",
      "子"
    ],
    "targetWords": [
      {
        "hanzi": "黑",
        "pinyin": "hēi",
        "meaning": "Màu đen, tối"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_39",
    "level": 2,
    "targetSentence": "红苹果很甜。",
    "cleanSentence": "红苹果很甜",
    "pinyin": "Hóng píngguǒ hěn tián.",
    "translation": "Táo đỏ rất ngọt.",
    "segments": [
      "红",
      "苹果",
      "很",
      "甜"
    ],
    "targetWords": [
      {
        "hanzi": "红",
        "pinyin": "hóng",
        "meaning": "Màu đỏ"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_40",
    "level": 2,
    "targetSentence": "欢迎光临！",
    "cleanSentence": "欢迎光临",
    "pinyin": "Huānyíng guānglín!",
    "translation": "Chào mừng quý khách ghé thăm!",
    "segments": [
      "欢迎",
      "光",
      "临"
    ],
    "targetWords": [
      {
        "hanzi": "欢迎",
        "pinyin": "huānyíng",
        "meaning": "Hoan nghênh, chào đón"
      },
      {
        "hanzi": "光",
        "pinyin": "guāng",
        "meaning": "Ánh sáng, hết sạch"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_41",
    "level": 2,
    "targetSentence": "请回答我的问题。",
    "cleanSentence": "请回答我的问题",
    "pinyin": "Qǐng huídá wǒ de wèntí.",
    "translation": "Xin hãy trả lời câu hỏi của tôi.",
    "segments": [
      "请",
      "回答",
      "我的",
      "问题"
    ],
    "targetWords": [
      {
        "hanzi": "回答",
        "pinyin": "huídá",
        "meaning": "Trả lời"
      },
      {
        "hanzi": "题",
        "pinyin": "tí",
        "meaning": "Đề bài, câu hỏi"
      },
      {
        "hanzi": "问",
        "pinyin": "wèn",
        "meaning": "Hỏi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_42",
    "level": 2,
    "targetSentence": "我去机场接朋友。",
    "cleanSentence": "我去机场接朋友",
    "pinyin": "Wǒ qù jīchǎng jiē péngyou.",
    "translation": "Tôi đi sân bay đón bạn.",
    "segments": [
      "我",
      "去机场",
      "接",
      "朋友"
    ],
    "targetWords": [
      {
        "hanzi": "机场",
        "pinyin": "jīchǎng",
        "meaning": "Sân bay"
      },
      {
        "hanzi": "朋友",
        "pinyin": "péngyou",
        "meaning": "Bạn bè"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_43",
    "level": 2,
    "targetSentence": "我想吃鸡蛋。",
    "cleanSentence": "我想吃鸡蛋",
    "pinyin": "Wǒ xiǎng chī jīdàn.",
    "translation": "Tôi muốn ăn trứng gà.",
    "segments": [
      "我",
      "想",
      "吃",
      "鸡蛋"
    ],
    "targetWords": [
      {
        "hanzi": "鸡蛋",
        "pinyin": "jīdàn",
        "meaning": "Trứng gà"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_44",
    "level": 2,
    "targetSentence": "这件衣服好看。",
    "cleanSentence": "这件衣服好看",
    "pinyin": "Zhè jiàn yīfu hǎokàn.",
    "translation": "Bộ quần áo này đẹp.",
    "segments": [
      "这",
      "件",
      "衣服",
      "好看"
    ],
    "targetWords": [
      {
        "hanzi": "件",
        "pinyin": "jiàn",
        "meaning": "Chiếc, cái (áo, việc)"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_45",
    "level": 2,
    "targetSentence": "教室里有很多人。",
    "cleanSentence": "教室里有很多人",
    "pinyin": "Jiàoshì lǐ yǒu hěn duō rén.",
    "translation": "Trong phòng học có rất nhiều người.",
    "segments": [
      "教室",
      "里",
      "有",
      "很多人"
    ],
    "targetWords": [
      {
        "hanzi": "教室",
        "pinyin": "jiàoshì",
        "meaning": "Phòng học, lớp học"
      },
      {
        "hanzi": "多",
        "pinyin": "duō",
        "meaning": "Nhiều, bao nhiêu"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_46",
    "level": 2,
    "targetSentence": "我姐姐是护士。",
    "cleanSentence": "我姐姐是护士",
    "pinyin": "Wǒ jiějie shì hùshi.",
    "translation": "Chị gái tôi là y tá.",
    "segments": [
      "我",
      "姐姐",
      "是",
      "护士"
    ],
    "targetWords": [
      {
        "hanzi": "姐姐",
        "pinyin": "jiějie",
        "meaning": "Chị gái"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_47",
    "level": 2,
    "targetSentence": "我来介绍一下。",
    "cleanSentence": "我来介绍一下",
    "pinyin": "Wǒ lái jièshào yíxià.",
    "translation": "Để tôi giới thiệu một chút.",
    "segments": [
      "我",
      "来",
      "介绍",
      "一下"
    ],
    "targetWords": [
      {
        "hanzi": "介绍",
        "pinyin": "jièshào",
        "meaning": "Giới thiệu"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_48",
    "level": 2,
    "targetSentence": "请进来看。",
    "cleanSentence": "请进来看",
    "pinyin": "Qǐng jìn lai kàn.",
    "translation": "Xin mời vào trong xem.",
    "segments": [
      "请",
      "进",
      "来",
      "看"
    ],
    "targetWords": [
      {
        "hanzi": "进",
        "pinyin": "jìn",
        "meaning": "Vào, tiến vào"
      },
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_49",
    "level": 2,
    "targetSentence": "学校离我家很近。",
    "cleanSentence": "学校离我家很近",
    "pinyin": "Xuéxiào lí wǒ jiā hěn jìn.",
    "translation": "Trường học cách nhà tôi rất gần.",
    "segments": [
      "学校",
      "离我",
      "家",
      "很近"
    ],
    "targetWords": [
      {
        "hanzi": "近",
        "pinyin": "jìn",
        "meaning": "Gần"
      },
      {
        "hanzi": "离",
        "pinyin": "lí",
        "meaning": "Cách, xa"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_50",
    "level": 2,
    "targetSentence": "我马上就来。",
    "cleanSentence": "我马上就来",
    "pinyin": "Wǒ mǎshàng jiù lái.",
    "translation": "Tôi đến ngay đây.",
    "segments": [
      "我",
      "马上",
      "就",
      "来"
    ],
    "targetWords": [
      {
        "hanzi": "就",
        "pinyin": "jiù",
        "meaning": "Thì, liền, ngay"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Cấu trúc câu điều kiện: 如果 (Nếu) ... 就 (thì)"
  },
  {
    "id": "scramble_hsk2_51",
    "level": 2,
    "targetSentence": "我觉得汉语很有趣。",
    "cleanSentence": "我觉得汉语很有趣",
    "pinyin": "Wǒ juéde Hànyǔ hěn yǒuqù.",
    "translation": "Tôi cảm thấy tiếng Trung rất thú vị.",
    "segments": [
      "我",
      "觉得",
      "汉语",
      "很有趣"
    ],
    "targetWords": [
      {
        "hanzi": "觉得",
        "pinyin": "juéde",
        "meaning": "Cảm thấy, thấy rằng"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_52",
    "level": 2,
    "targetSentence": "你想喝咖啡吗？",
    "cleanSentence": "你想喝咖啡吗",
    "pinyin": "Nǐ xiǎng hē kāfēi ma?",
    "translation": "Bạn muốn uống cà phê không?",
    "segments": [
      "你想",
      "喝",
      "咖啡吗"
    ],
    "targetWords": [
      {
        "hanzi": "咖啡",
        "pinyin": "kāfēi",
        "meaning": "Cà phê"
      },
      {
        "hanzi": "喝",
        "pinyin": "hē",
        "meaning": "Uống"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_53",
    "level": 2,
    "targetSentence": "现在开始上课。",
    "cleanSentence": "现在开始上课",
    "pinyin": "Xiànzài kāishǐ shàngkè.",
    "translation": "Bây giờ bắt đầu vào lớp.",
    "segments": [
      "现在",
      "开始",
      "上",
      "课"
    ],
    "targetWords": [
      {
        "hanzi": "开始",
        "pinyin": "kāishǐ",
        "meaning": "Bắt đầu"
      },
      {
        "hanzi": "上",
        "pinyin": "shàng",
        "meaning": "Trên, lên"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk2_54",
    "level": 2,
    "targetSentence": "明天我有汉语考试。",
    "cleanSentence": "明天我有汉语考试",
    "pinyin": "Míngtiān wǒ yǒu Hànyǔ kǎoshì.",
    "translation": "Ngày mai tôi có bài thi tiếng Trung.",
    "segments": [
      "明天",
      "我有",
      "汉语",
      "考试"
    ],
    "targetWords": [
      {
        "hanzi": "考试",
        "pinyin": "kǎoshì",
        "meaning": "Thi cử, bài thi"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_55",
    "level": 2,
    "targetSentence": "明天可能会下雨。",
    "cleanSentence": "明天可能会下雨",
    "pinyin": "Míngtiān kěnéng huì xià yǔ.",
    "translation": "Ngày mai có thể sẽ mưa.",
    "segments": [
      "明天",
      "可能",
      "会",
      "下雨"
    ],
    "targetWords": [
      {
        "hanzi": "可能",
        "pinyin": "kěnéng",
        "meaning": "Có thể, có lẽ"
      },
      {
        "hanzi": "会",
        "pinyin": "huì",
        "meaning": "Biết (qua học), sẽ"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_56",
    "level": 2,
    "targetSentence": "我可以坐这里吗？",
    "cleanSentence": "我可以坐这里吗",
    "pinyin": "Wǒ kěyǐ zuò zhèlǐ ma?",
    "translation": "Tôi có thể ngồi đây được không?",
    "segments": [
      "我",
      "可以",
      "坐",
      "这",
      "里吗"
    ],
    "targetWords": [
      {
        "hanzi": "可以",
        "pinyin": "kěyǐ",
        "meaning": "Có thể, được phép"
      },
      {
        "hanzi": "里",
        "pinyin": "lǐ",
        "meaning": "Trong, bên trong"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_57",
    "level": 2,
    "targetSentence": "今天的天气非常快。",
    "cleanSentence": "今天的天气非常快",
    "pinyin": "Jīntiān de tiānqì fēicháng kuài.",
    "translation": "Thời tiết hôm nay vô cùng Nhanh; sắp.",
    "segments": [
      "今天的",
      "天气",
      "非常",
      "快"
    ],
    "targetWords": [
      {
        "hanzi": "快",
        "pinyin": "kuài",
        "meaning": "Nhanh; sắp"
      },
      {
        "hanzi": "非常",
        "pinyin": "fēicháng",
        "meaning": "Rất, vô cùng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_58",
    "level": 2,
    "targetSentence": "祝你生日快乐！",
    "cleanSentence": "祝你生日快乐",
    "pinyin": "Zhù nǐ shēngrì kuàilè!",
    "translation": "Chúc bạn sinh nhật vui vẻ!",
    "segments": [
      "祝",
      "你",
      "生日",
      "快乐"
    ],
    "targetWords": [
      {
        "hanzi": "快乐",
        "pinyin": "kuàilè",
        "meaning": "Vui vẻ, hạnh phúc"
      },
      {
        "hanzi": "生日",
        "pinyin": "shēngrì",
        "meaning": "Sinh nhật"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_59",
    "level": 2,
    "targetSentence": "今天工作很累。",
    "cleanSentence": "今天工作很累",
    "pinyin": "Jīntiān gōngzuò hěn lèi.",
    "translation": "Hôm nay làm việc rất mệt.",
    "segments": [
      "今天",
      "工作",
      "很",
      "累"
    ],
    "targetWords": [
      {
        "hanzi": "累",
        "pinyin": "lèi",
        "meaning": "Mệt mỏi"
      },
      {
        "hanzi": "工作",
        "pinyin": "gōngzuò",
        "meaning": "Công việc, làm việc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_60",
    "level": 2,
    "targetSentence": "我家离超市不远。",
    "cleanSentence": "我家离超市不远",
    "pinyin": "Wǒ jiā lí chāoshì bù yuǎn.",
    "translation": "Nhà tôi cách siêu thị không xa.",
    "segments": [
      "我",
      "家",
      "离超",
      "市",
      "不远"
    ],
    "targetWords": [
      {
        "hanzi": "离",
        "pinyin": "lí",
        "meaning": "Cách, xa"
      },
      {
        "hanzi": "远",
        "pinyin": "yuǎn",
        "meaning": "Xa"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_61",
    "level": 2,
    "targetSentence": "我有两本书。",
    "cleanSentence": "我有两本书",
    "pinyin": "Wǒ yǒu liǎng běn shū.",
    "translation": "Tôi có hai quyển sách.",
    "segments": [
      "我有",
      "两",
      "本",
      "书"
    ],
    "targetWords": [
      {
        "hanzi": "两",
        "pinyin": "liǎng",
        "meaning": "Hai (dùng trước lượng từ)"
      },
      {
        "hanzi": "本",
        "pinyin": "běn",
        "meaning": "Cuốn, quyển (sách)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_62",
    "level": 2,
    "targetSentence": "今天零度。",
    "cleanSentence": "今天零度",
    "pinyin": "Jīntiān líng dù.",
    "translation": "Hôm nay 0 độ.",
    "segments": [
      "今天",
      "零",
      "度"
    ],
    "targetWords": [
      {
        "hanzi": "零",
        "pinyin": "líng",
        "meaning": "Số 0"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_63",
    "level": 2,
    "targetSentence": "这条路很宽。",
    "cleanSentence": "这条路很宽",
    "pinyin": "Zhè tiáo lù hěn kuān.",
    "translation": "Con đường này rất rộng.",
    "segments": [
      "这",
      "条",
      "路",
      "很宽"
    ],
    "targetWords": [
      {
        "hanzi": "路",
        "pinyin": "lù",
        "meaning": "Đường đi, tuyến đường"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_64",
    "level": 2,
    "targetSentence": "我喜欢去旅游。",
    "cleanSentence": "我喜欢去旅游",
    "pinyin": "Wǒ xǐhuan qù lǚyóu.",
    "translation": "Tôi thích đi du lịch.",
    "segments": [
      "我",
      "喜欢",
      "去",
      "旅游"
    ],
    "targetWords": [
      {
        "hanzi": "旅游",
        "pinyin": "lǚyóu",
        "meaning": "Du lịch"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_65",
    "level": 2,
    "targetSentence": "这里卖水果吗？",
    "cleanSentence": "这里卖水果吗",
    "pinyin": "Zhèlǐ mài shuǐguǒ ma?",
    "translation": "Ở đây có bán trái cây không?",
    "segments": [
      "这",
      "里",
      "卖",
      "水果吗"
    ],
    "targetWords": [
      {
        "hanzi": "卖",
        "pinyin": "mài",
        "meaning": "Bán"
      },
      {
        "hanzi": "里",
        "pinyin": "lǐ",
        "meaning": "Trong, bên trong"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk2_66",
    "level": 2,
    "targetSentence": "请说慢一点。",
    "cleanSentence": "请说慢一点",
    "pinyin": "Qǐng shuō màn yìdiǎn.",
    "translation": "Xin hãy nói chậm một chút.",
    "segments": [
      "请",
      "说",
      "慢",
      "一点"
    ],
    "targetWords": [
      {
        "hanzi": "慢",
        "pinyin": "màn",
        "meaning": "Chậm"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_67",
    "level": 2,
    "targetSentence": "你最近忙吗？",
    "cleanSentence": "你最近忙吗",
    "pinyin": "Nǐ zuìjìn máng ma?",
    "translation": "Dạo này bạn có bận không?",
    "segments": [
      "你",
      "最近",
      "忙吗"
    ],
    "targetWords": [
      {
        "hanzi": "忙",
        "pinyin": "máng",
        "meaning": "Bận rộn"
      },
      {
        "hanzi": "近",
        "pinyin": "jìn",
        "meaning": "Gần"
      },
      {
        "hanzi": "最",
        "pinyin": "zuì",
        "meaning": "Nhất (so sánh nhất)"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk2_68",
    "level": 2,
    "targetSentence": "每天我都学汉语。",
    "cleanSentence": "每天我都学汉语",
    "pinyin": "Měi tiān wǒ dōu xué Hànyǔ.",
    "translation": "Mỗi ngày tôi đều học tiếng Trung.",
    "segments": [
      "每",
      "天",
      "我",
      "都学汉语"
    ],
    "targetWords": [
      {
        "hanzi": "每",
        "pinyin": "měi",
        "meaning": "Mỗi, từng"
      },
      {
        "hanzi": "都",
        "pinyin": "dōu",
        "meaning": "Đều, tất cả"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_69",
    "level": 2,
    "targetSentence": "我妹妹很可爱。",
    "cleanSentence": "我妹妹很可爱",
    "pinyin": "Wǒ mèimei hěn kě'ài.",
    "translation": "Em gái tôi rất đáng yêu.",
    "segments": [
      "我",
      "妹妹",
      "很可",
      "爱"
    ],
    "targetWords": [
      {
        "hanzi": "妹妹",
        "pinyin": "mèimei",
        "meaning": "Em gái"
      },
      {
        "hanzi": "爱",
        "pinyin": "ài",
        "meaning": "Yêu, thích"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_70",
    "level": 2,
    "targetSentence": "中午我想吃面条。",
    "cleanSentence": "中午我想吃面条",
    "pinyin": "Zhōngwǔ wǒ xiǎng chī miàntiáo.",
    "translation": "Buổi trưa tôi muốn ăn mì.",
    "segments": [
      "中午",
      "我想",
      "吃",
      "面条"
    ],
    "targetWords": [
      {
        "hanzi": "面条",
        "pinyin": "miàntiáo",
        "meaning": "Mì, mì sợi"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_71",
    "level": 2,
    "targetSentence": "那个男孩子是谁？",
    "cleanSentence": "那个男孩子是谁",
    "pinyin": "Nà gè nán háizi shì shéi?",
    "translation": "Cậu bé nam kia là ai?",
    "segments": [
      "那",
      "个",
      "男",
      "孩子",
      "是谁"
    ],
    "targetWords": [
      {
        "hanzi": "男",
        "pinyin": "nán",
        "meaning": "Nam giới, đàn ông"
      },
      {
        "hanzi": "孩子",
        "pinyin": "háizi",
        "meaning": "Trẻ con, con cái"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk2_72",
    "level": 2,
    "targetSentence": "老师，您好！",
    "cleanSentence": "老师您好",
    "pinyin": "Lǎoshī, nín hǎo!",
    "translation": "Kính chào thầy cô!",
    "segments": [
      "老师",
      "您",
      "好"
    ],
    "targetWords": [
      {
        "hanzi": "您",
        "pinyin": "nín",
        "meaning": "Ngài, ông, bà (kính trọng)"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_73",
    "level": 2,
    "targetSentence": "早上喝一杯牛奶。",
    "cleanSentence": "早上喝一杯牛奶",
    "pinyin": "Zǎoshang hē yì bēi niúnǎi.",
    "translation": "Buổi sáng uống một cốc sữa bò.",
    "segments": [
      "早上",
      "喝",
      "一",
      "杯牛奶"
    ],
    "targetWords": [
      {
        "hanzi": "牛奶",
        "pinyin": "niúnǎi",
        "meaning": "Sữa bò"
      },
      {
        "hanzi": "早上",
        "pinyin": "zǎoshang",
        "meaning": "Buổi sáng sớm"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_74",
    "level": 2,
    "targetSentence": "她是女医生。",
    "cleanSentence": "她是女医生",
    "pinyin": "Tā shì nǚ yīshēng.",
    "translation": "Cô ấy là bác sĩ nữ.",
    "segments": [
      "她",
      "是",
      "女",
      "医生"
    ],
    "targetWords": [
      {
        "hanzi": "女",
        "pinyin": "nǚ",
        "meaning": "Nữ giới, phụ nữ"
      },
      {
        "hanzi": "是",
        "pinyin": "shì",
        "meaning": "Là, phải, đúng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_75",
    "level": 2,
    "targetSentence": "他坐在我旁边。",
    "cleanSentence": "他坐在我旁边",
    "pinyin": "Tā zuò zài wǒ pángbiān.",
    "translation": "Anh ấy ngồi bên cạnh tôi.",
    "segments": [
      "他",
      "坐",
      "在我",
      "旁边"
    ],
    "targetWords": [
      {
        "hanzi": "旁边",
        "pinyin": "pángbiān",
        "meaning": "Bên cạnh"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk2_76",
    "level": 2,
    "targetSentence": "我每天早上跑步。",
    "cleanSentence": "我每天早上跑步",
    "pinyin": "Wǒ měi tiān zǎoshang pǎobù.",
    "translation": "Mỗi sáng tôi đều chạy bộ.",
    "segments": [
      "我",
      "每",
      "天",
      "早上跑步"
    ],
    "targetWords": [
      {
        "hanzi": "跑步",
        "pinyin": "pǎobù",
        "meaning": "Chạy bộ"
      },
      {
        "hanzi": "每",
        "pinyin": "měi",
        "meaning": "Mỗi, từng"
      },
      {
        "hanzi": "早上",
        "pinyin": "zǎoshang",
        "meaning": "Buổi sáng sớm"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_77",
    "level": 2,
    "targetSentence": "这件衣服真便宜。",
    "cleanSentence": "这件衣服真便宜",
    "pinyin": "Zhè jiàn yīfu zhēn piányi.",
    "translation": "Bộ quần áo này rẻ thật.",
    "segments": [
      "这",
      "件",
      "衣服",
      "真便宜"
    ],
    "targetWords": [
      {
        "hanzi": "便宜",
        "pinyin": "piányi",
        "meaning": "Rẻ, giá rẻ"
      },
      {
        "hanzi": "件",
        "pinyin": "jiàn",
        "meaning": "Chiếc, cái (áo, việc)"
      },
      {
        "hanzi": "真",
        "pinyin": "zhēn",
        "meaning": "Thật, thật là"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_78",
    "level": 2,
    "targetSentence": "我买了两张电影票。",
    "cleanSentence": "我买了两张电影票",
    "pinyin": "Wǒ mǎi le liǎng zhāng diànyǐng piào.",
    "translation": "Tôi đã mua hai vé xem phim.",
    "segments": [
      "我",
      "买了",
      "两",
      "张",
      "电影票"
    ],
    "targetWords": [
      {
        "hanzi": "票",
        "pinyin": "piào",
        "meaning": "Vé (tàu, xe, xem phim)"
      },
      {
        "hanzi": "两",
        "pinyin": "liǎng",
        "meaning": "Hai (dùng trước lượng từ)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_79",
    "level": 2,
    "targetSentence": "他的妻子是老师。",
    "cleanSentence": "他的妻子是老师",
    "pinyin": "Tā de qīzi shì lǎoshī.",
    "translation": "Vợ của anh ấy là giáo viên.",
    "segments": [
      "他的",
      "妻子",
      "是",
      "老师"
    ],
    "targetWords": [
      {
        "hanzi": "妻子",
        "pinyin": "qīzi",
        "meaning": "Vợ"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk2_80",
    "level": 2,
    "targetSentence": "我早上六点起床。",
    "cleanSentence": "我早上六点起床",
    "pinyin": "Wǒ zǎoshang liù diǎn qǐchuáng.",
    "translation": "Tôi thức dậy lúc 6 giờ sáng.",
    "segments": [
      "我",
      "早上",
      "六",
      "点起床"
    ],
    "targetWords": [
      {
        "hanzi": "起床",
        "pinyin": "qǐchuáng",
        "meaning": "Thức dậy"
      },
      {
        "hanzi": "早上",
        "pinyin": "zǎoshang",
        "meaning": "Buổi sáng sớm"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_81",
    "level": 2,
    "targetSentence": "一千块钱。",
    "cleanSentence": "一千块钱",
    "pinyin": "Yì qiān kuài qián.",
    "translation": "Một nghìn tệ.",
    "segments": [
      "一",
      "千",
      "块",
      "钱"
    ],
    "targetWords": [
      {
        "hanzi": "千",
        "pinyin": "qiān",
        "meaning": "Nghìn, ngàn (1000)"
      },
      {
        "hanzi": "块",
        "pinyin": "kuài",
        "meaning": "Đồng (tệ), miếng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_82",
    "level": 2,
    "targetSentence": "借我一支铅笔。",
    "cleanSentence": "借我一支铅笔",
    "pinyin": "Jiè wǒ yì zhī qiānbǐ.",
    "translation": "Cho tôi mượn cây bút chì.",
    "segments": [
      "借",
      "我",
      "一",
      "支铅笔"
    ],
    "targetWords": [
      {
        "hanzi": "铅笔",
        "pinyin": "qiānbǐ",
        "meaning": "Bút chì"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_83",
    "level": 2,
    "targetSentence": "今天天气晴朗。",
    "cleanSentence": "今天天气晴朗",
    "pinyin": "Jīntiān tiānqì qínglǎng.",
    "translation": "Hôm nay trời nắng đẹp.",
    "segments": [
      "今天",
      "天气",
      "晴",
      "朗"
    ],
    "targetWords": [
      {
        "hanzi": "晴",
        "pinyin": "qíng",
        "meaning": "Trời nắng, tạnh ráo"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_84",
    "level": 2,
    "targetSentence": "我去年来中国的。",
    "cleanSentence": "我去年来中国的",
    "pinyin": "Wǒ qùnián lái Zhōngguó de.",
    "translation": "Tôi đến Trung Quốc vào năm ngoái.",
    "segments": [
      "我",
      "去年",
      "来中国的"
    ],
    "targetWords": [
      {
        "hanzi": "去年",
        "pinyin": "qùnián",
        "meaning": "Năm ngoái"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_85",
    "level": 2,
    "targetSentence": "让我看看。",
    "cleanSentence": "让我看看",
    "pinyin": "Ràng wǒ kànkan.",
    "translation": "Để tôi xem nào.",
    "segments": [
      "让",
      "我",
      "看",
      "看"
    ],
    "targetWords": [
      {
        "hanzi": "让",
        "pinyin": "ràng",
        "meaning": "Để cho, bảo, nhường"
      },
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_86",
    "level": 2,
    "targetSentence": "他生病了没来。",
    "cleanSentence": "他生病了没来",
    "pinyin": "Tā shēngbìng le méi lái.",
    "translation": "Anh ấy bị ốm nên không đến.",
    "segments": [
      "他",
      "生病了",
      "没来"
    ],
    "targetWords": [
      {
        "hanzi": "生病",
        "pinyin": "shēngbìng",
        "meaning": "Bị ốm, mắc bệnh"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_87",
    "level": 2,
    "targetSentence": "生日我们一起去公园吧。",
    "cleanSentence": "生日我们一起去公园吧",
    "pinyin": "shēngrì wǒmen yìqǐ qù gōngyuán ba.",
    "translation": "Sinh nhật chúng ta cùng nhau đi công viên nhé.",
    "segments": [
      "生日",
      "我们",
      "一起",
      "去公园吧"
    ],
    "targetWords": [
      {
        "hanzi": "生日",
        "pinyin": "shēngrì",
        "meaning": "Sinh nhật"
      },
      {
        "hanzi": "吧",
        "pinyin": "ba",
        "meaning": "Đi, nhé (trợ từ ngữ khí)"
      },
      {
        "hanzi": "一起",
        "pinyin": "yìqǐ",
        "meaning": "Cùng nhau"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_88",
    "level": 2,
    "targetSentence": "你身体好吗？",
    "cleanSentence": "你身体好吗",
    "pinyin": "Nǐ shēntǐ hǎo ma?",
    "translation": "Sức khỏe bạn có tốt không?",
    "segments": [
      "你",
      "身体",
      "好",
      "吗"
    ],
    "targetWords": [
      {
        "hanzi": "身体",
        "pinyin": "shēntǐ",
        "meaning": "Sức khỏe, cơ thể"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk2_89",
    "level": 2,
    "targetSentence": "这件事情很重要。",
    "cleanSentence": "这件事情很重要",
    "pinyin": "Zhè jiàn shìqing hěn zhòngyào.",
    "translation": "Việc này rất quan trọng.",
    "segments": [
      "这",
      "件",
      "事情",
      "很重要"
    ],
    "targetWords": [
      {
        "hanzi": "事情",
        "pinyin": "shìqing",
        "meaning": "Sự việc, việc"
      },
      {
        "hanzi": "件",
        "pinyin": "jiàn",
        "meaning": "Chiếc, cái (áo, việc)"
      },
      {
        "hanzi": "要",
        "pinyin": "yào",
        "meaning": "Muốn, cần, sắp"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk2_90",
    "level": 2,
    "targetSentence": "这块手表很漂亮。",
    "cleanSentence": "这块手表很漂亮",
    "pinyin": "Zhè kuài shǒubiǎo hěn piàoliang.",
    "translation": "Chiếc đồng hồ này rất đẹp.",
    "segments": [
      "这",
      "块",
      "手表",
      "很漂亮"
    ],
    "targetWords": [
      {
        "hanzi": "手表",
        "pinyin": "shǒubiǎo",
        "meaning": "Đồng hồ đeo tay"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_91",
    "level": 2,
    "targetSentence": "我的手机没电了。",
    "cleanSentence": "我的手机没电了",
    "pinyin": "Wǒ de shǒujī méi diàn le.",
    "translation": "Điện thoại của tôi hết pin rồi.",
    "segments": [
      "我的",
      "手机",
      "没电了"
    ],
    "targetWords": [
      {
        "hanzi": "手机",
        "pinyin": "shǒujī",
        "meaning": "Điện thoại di động"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk2_92",
    "level": 2,
    "targetSentence": "我送你回家。",
    "cleanSentence": "我送你回家",
    "pinyin": "Wǒ sòng nǐ huí jiā.",
    "translation": "Tôi đưa bạn về nhà nhé.",
    "segments": [
      "我",
      "送",
      "你",
      "回家"
    ],
    "targetWords": [
      {
        "hanzi": "送",
        "pinyin": "sòng",
        "meaning": "Tặng; tiễn đưa"
      },
      {
        "hanzi": "回",
        "pinyin": "huí",
        "meaning": "Về, quay lại"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_93",
    "level": 2,
    "targetSentence": "虽然冷，但我很高兴。",
    "cleanSentence": "虽然冷但我很高兴",
    "pinyin": "Suīrán lěng, dàn wǒ hěn gāoxìng.",
    "translation": "Mặc dù lạnh, nhưng tôi rất vui.",
    "segments": [
      "虽然",
      "冷",
      "但",
      "我很高兴"
    ],
    "targetWords": [
      {
        "hanzi": "虽然",
        "pinyin": "suīrán",
        "meaning": "Tuy rằng, mặc dù"
      },
      {
        "hanzi": "高",
        "pinyin": "gāo",
        "meaning": "Cao"
      }
    ],
    "grammarTip": "Cặp liên từ nhượng bộ: 虽然 (Tuy rằng) ... 但是 (nhưng mà)"
  },
  {
    "id": "scramble_hsk2_94",
    "level": 2,
    "targetSentence": "书很贵，但是很好。",
    "cleanSentence": "书很贵但是很好",
    "pinyin": "Shū hěn guì, dànshì hěn hǎo.",
    "translation": "Sách đắt, nhưng rất hay.",
    "segments": [
      "书",
      "很贵",
      "但是",
      "很好"
    ],
    "targetWords": [
      {
        "hanzi": "但是",
        "pinyin": "dànshì",
        "meaning": "Nhưng, nhưng mà"
      },
      {
        "hanzi": "贵",
        "pinyin": "guì",
        "meaning": "Đắt; quý phái"
      }
    ],
    "grammarTip": "Cặp liên từ nhượng bộ: 虽然 (Tuy rằng) ... 但是 (nhưng mà)"
  },
  {
    "id": "scramble_hsk2_95",
    "level": 2,
    "targetSentence": "它是一只小猫。",
    "cleanSentence": "它是一只小猫",
    "pinyin": "Tā shì yì zhī xiǎomāo.",
    "translation": "Nó là một con mèo con.",
    "segments": [
      "它",
      "是",
      "一",
      "只",
      "小猫"
    ],
    "targetWords": [
      {
        "hanzi": "它",
        "pinyin": "tā",
        "meaning": "Nó (chỉ con vật/đồ vật)"
      },
      {
        "hanzi": "猫",
        "pinyin": "māo",
        "meaning": "Con mèo"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_96",
    "level": 2,
    "targetSentence": "我们一起去踢足球吧。",
    "cleanSentence": "我们一起去踢足球吧",
    "pinyin": "Wǒmen yìqǐ qù tī zúqiú ba.",
    "translation": "Chúng mình cùng đi đá bóng đi.",
    "segments": [
      "我们",
      "一起",
      "去踢足球吧"
    ],
    "targetWords": [
      {
        "hanzi": "踢足球",
        "pinyin": "tī zúqiú",
        "meaning": "Đá bóng"
      },
      {
        "hanzi": "吧",
        "pinyin": "ba",
        "meaning": "Đi, nhé (trợ từ ngữ khí)"
      },
      {
        "hanzi": "一起",
        "pinyin": "yìqǐ",
        "meaning": "Cùng nhau"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_97",
    "level": 2,
    "targetSentence": "这道题很难。",
    "cleanSentence": "这道题很难",
    "pinyin": "Zhè dào tí hěn nán.",
    "translation": "Câu này rất khó.",
    "segments": [
      "这",
      "道",
      "题",
      "很难"
    ],
    "targetWords": [
      {
        "hanzi": "题",
        "pinyin": "tí",
        "meaning": "Đề bài, câu hỏi"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_98",
    "level": 2,
    "targetSentence": "她喜欢跳舞。",
    "cleanSentence": "她喜欢跳舞",
    "pinyin": "Tā xǐhuan tiàowǔ.",
    "translation": "Cô ấy thích khiêu vũ.",
    "segments": [
      "她",
      "喜欢",
      "跳舞"
    ],
    "targetWords": [
      {
        "hanzi": "跳舞",
        "pinyin": "tiàowǔ",
        "meaning": "Nhảy múa, khiêu vũ"
      },
      {
        "hanzi": "她",
        "pinyin": "tā",
        "meaning": "Cô ấy, chị ấy"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_99",
    "level": 2,
    "targetSentence": "窗户外有很多花。",
    "cleanSentence": "窗户外有很多花",
    "pinyin": "Chuānghu wài yǒu hěn duō huā.",
    "translation": "Bên ngoài cửa sổ có rất nhiều hoa.",
    "segments": [
      "窗户",
      "外",
      "有",
      "很多花"
    ],
    "targetWords": [
      {
        "hanzi": "外",
        "pinyin": "wài",
        "meaning": "Bên ngoài"
      },
      {
        "hanzi": "多",
        "pinyin": "duō",
        "meaning": "Nhiều, bao nhiêu"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk2_100",
    "level": 2,
    "targetSentence": "我做完作业了。",
    "cleanSentence": "我做完作业了",
    "pinyin": "Wǒ zuò wán zuòyè le.",
    "translation": "Tôi đã làm xong bài tập rồi.",
    "segments": [
      "我",
      "做",
      "完",
      "作业了"
    ],
    "targetWords": [
      {
        "hanzi": "完",
        "pinyin": "wán",
        "meaning": "Xong, hết"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_1",
    "level": 3,
    "targetSentence": "阿姨好，请问您找谁？",
    "cleanSentence": "阿姨好请问您找谁",
    "pinyin": "Āyí hǎo, qǐngwèn nín zhǎo shéi?",
    "translation": "Cháu chào cô ạ, xin hỏi cô tìm ai thế?",
    "segments": [
      "阿姨好",
      "请",
      "问",
      "您",
      "找谁"
    ],
    "targetWords": [
      {
        "hanzi": "阿姨",
        "pinyin": "āyí",
        "meaning": "Cô, dì, bác gái"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk3_2",
    "level": 3,
    "targetSentence": "啊，太好了！",
    "cleanSentence": "啊太好了",
    "pinyin": "A, tài hǎo le!",
    "translation": "A, tuyệt vời quá rồi!",
    "segments": [
      "啊",
      "太",
      "好",
      "了"
    ],
    "targetWords": [
      {
        "hanzi": "啊",
        "pinyin": "a",
        "meaning": "A, à, chà (trợ từ ngữ khí)"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_3",
    "level": 3,
    "targetSentence": "他比我矮一点。",
    "cleanSentence": "他比我矮一点",
    "pinyin": "Tā bǐ wǒ ǎi yìdiǎn.",
    "translation": "Anh ấy thấp hơn tôi một chút.",
    "segments": [
      "他",
      "比我",
      "矮",
      "一点"
    ],
    "targetWords": [
      {
        "hanzi": "矮",
        "pinyin": "ǎi",
        "meaning": "Thấp, lùn"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk3_4",
    "level": 3,
    "targetSentence": "我的爱好是看书。",
    "cleanSentence": "我的爱好是看书",
    "pinyin": "Wǒ de àihào shì kàn shū.",
    "translation": "Sở thích của tôi là đọc sách.",
    "segments": [
      "我的",
      "爱好",
      "是",
      "看书"
    ],
    "targetWords": [
      {
        "hanzi": "爱好",
        "pinyin": "àihào",
        "meaning": "Sở thích"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk3_5",
    "level": 3,
    "targetSentence": "图书馆里非常安静。",
    "cleanSentence": "图书馆里非常安静",
    "pinyin": "Túshūguǎn lǐ fēicháng ānjìng.",
    "translation": "Trong thư viện vô cùng yên tĩnh.",
    "segments": [
      "图书馆",
      "里",
      "非常",
      "安静"
    ],
    "targetWords": [
      {
        "hanzi": "安静",
        "pinyin": "ānjìng",
        "meaning": "Yên tĩnh"
      },
      {
        "hanzi": "图书馆",
        "pinyin": "túshūguǎn",
        "meaning": "Thư viện"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_6",
    "level": 3,
    "targetSentence": "请把门关上。",
    "cleanSentence": "请把门关上",
    "pinyin": "Qǐng bǎ mén guānshàng.",
    "translation": "Làm ơn đóng cửa lại.",
    "segments": [
      "请",
      "把门",
      "关",
      "上"
    ],
    "targetWords": [
      {
        "hanzi": "把",
        "pinyin": "bǎ",
        "meaning": "Cầm, chiếc; câu chữ 把"
      },
      {
        "hanzi": "关",
        "pinyin": "guān",
        "meaning": "Đóng, tắt"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk3_7",
    "level": 3,
    "targetSentence": "我们班有二十个学生。",
    "cleanSentence": "我们班有二十个学生",
    "pinyin": "Wǒmen bān yǒu èrshí gè xuésheng.",
    "translation": "Lớp chúng tôi có 20 học sinh.",
    "segments": [
      "我们班",
      "有",
      "二",
      "十",
      "个学生"
    ],
    "targetWords": [
      {
        "hanzi": "班",
        "pinyin": "bān",
        "meaning": "Lớp học, ca làm"
      },
      {
        "hanzi": "二",
        "pinyin": "èr",
        "meaning": "Số 2"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_8",
    "level": 3,
    "targetSentence": "下个周末我想搬家。",
    "cleanSentence": "下个周末我想搬家",
    "pinyin": "Xià gè zhōumò wǒ xiǎng bānjiā.",
    "translation": "Cuối tuần sau tôi muốn chuyển nhà.",
    "segments": [
      "下",
      "个",
      "周末",
      "我想",
      "搬家"
    ],
    "targetWords": [
      {
        "hanzi": "搬",
        "pinyin": "bān",
        "meaning": "Dời, chuyển, dọn"
      },
      {
        "hanzi": "周末",
        "pinyin": "zhōumò",
        "meaning": "Cuối tuần"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_9",
    "level": 3,
    "targetSentence": "我想到了一个好办法。",
    "cleanSentence": "我想到了一个好办法",
    "pinyin": "Wǒ xiǎng dào le yí gè hǎo bànfǎ.",
    "translation": "Tôi đã nghĩ ra một cách rất hay.",
    "segments": [
      "我想",
      "到了",
      "一",
      "个",
      "好办法"
    ],
    "targetWords": [
      {
        "hanzi": "办法",
        "pinyin": "bànfǎ",
        "meaning": "Cách, biện pháp"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_10",
    "level": 3,
    "targetSentence": "李老师在办公室等你。",
    "cleanSentence": "李老师在办公室等你",
    "pinyin": "Lǐ lǎoshī zài bàngōngshì děng nǐ.",
    "translation": "Thầy Lý đang đợi bạn ở văn phòng.",
    "segments": [
      "李",
      "老师",
      "在办公室",
      "等你"
    ],
    "targetWords": [
      {
        "hanzi": "办公室",
        "pinyin": "bàngōngshì",
        "meaning": "Văn phòng làm việc"
      },
      {
        "hanzi": "老",
        "pinyin": "lǎo",
        "meaning": "Già, cũ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_11",
    "level": 3,
    "targetSentence": "现在是下午三点半。",
    "cleanSentence": "现在是下午三点半",
    "pinyin": "Xiànzài shì xiàwǔ sān diǎn bàn.",
    "translation": "Bây giờ là 3 giờ rưỡi chiều.",
    "segments": [
      "现在",
      "是",
      "下午",
      "三",
      "点半"
    ],
    "targetWords": [
      {
        "hanzi": "半",
        "pinyin": "bàn",
        "meaning": "Nửa, rưỡi"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk3_12",
    "level": 3,
    "targetSentence": "你能帮忙我一下吗？",
    "cleanSentence": "你能帮忙我一下吗",
    "pinyin": "Nǐ néng bāngmáng wǒ yíxià ma?",
    "translation": "Bạn có thể giúp tôi một tay được không?",
    "segments": [
      "你能",
      "帮忙",
      "我",
      "一下吗"
    ],
    "targetWords": [
      {
        "hanzi": "帮忙",
        "pinyin": "bāngmáng",
        "meaning": "Giúp đỡ"
      },
      {
        "hanzi": "吗",
        "pinyin": "ma",
        "meaning": "Không, à (nghi vấn)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_13",
    "level": 3,
    "targetSentence": "我的书包放在桌子上。",
    "cleanSentence": "我的书包放在桌子上",
    "pinyin": "Wǒ de shūbāo fàng zài zhuōzi shàng.",
    "translation": "Cặp sách của tôi đặt ở trên bàn.",
    "segments": [
      "我的",
      "书",
      "包",
      "放",
      "在桌子上"
    ],
    "targetWords": [
      {
        "hanzi": "包",
        "pinyin": "bāo",
        "meaning": "Túi, bao, bọc"
      },
      {
        "hanzi": "放",
        "pinyin": "fàng",
        "meaning": "Để, đặt, thả"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk3_14",
    "level": 3,
    "targetSentence": "我已经吃饱了，谢谢。",
    "cleanSentence": "我已经吃饱了谢谢",
    "pinyin": "Wǒ yǐjīng chī bǎo le, xièxie.",
    "translation": "Tôi đã ăn no rồi, cảm ơn bạn.",
    "segments": [
      "我",
      "已经",
      "吃",
      "饱了谢谢"
    ],
    "targetWords": [
      {
        "hanzi": "饱",
        "pinyin": "bǎo",
        "meaning": "No (bụng)"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_15",
    "level": 3,
    "targetSentence": "中国北方冬天常常下雪。",
    "cleanSentence": "中国北方冬天常常下雪",
    "pinyin": "Zhōngguó běifāng dōngtiān chángcháng xià xuě.",
    "translation": "Miền Bắc Trung Quốc mùa đông thường xuyên có tuyết rơi.",
    "segments": [
      "中国",
      "北方冬天",
      "常",
      "常",
      "下雪"
    ],
    "targetWords": [
      {
        "hanzi": "北方",
        "pinyin": "běifāng",
        "meaning": "Phương bắc, miền Bắc"
      },
      {
        "hanzi": "冬",
        "pinyin": "dōng",
        "meaning": "Mùa đông"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_16",
    "level": 3,
    "targetSentence": "桌上的苹果被他吃了。",
    "cleanSentence": "桌上的苹果被他吃了",
    "pinyin": "Zhuō shàng de píngguǒ bèi tā chī le.",
    "translation": "Quả táo trên bàn đã bị anh ấy ăn rồi.",
    "segments": [
      "桌",
      "上的",
      "苹果",
      "被他",
      "吃了"
    ],
    "targetWords": [
      {
        "hanzi": "被",
        "pinyin": "bèi",
        "meaning": "Bị, được (bị động)"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Câu bị động (被): Chủ ngữ + 被 + Tác nhân + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk3_17",
    "level": 3,
    "targetSentence": "小狗的鼻子非常灵敏。",
    "cleanSentence": "小狗的鼻子非常灵敏",
    "pinyin": "Xiǎogǒu de bízi fēicháng língmǐn.",
    "translation": "Mũi của chú chó nhỏ vô cùng thính.",
    "segments": [
      "小",
      "狗的",
      "鼻子",
      "非常",
      "灵敏"
    ],
    "targetWords": [
      {
        "hanzi": "鼻子",
        "pinyin": "bízi",
        "meaning": "Mũi"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_18",
    "level": 3,
    "targetSentence": "今天天气比较冷。",
    "cleanSentence": "今天天气比较冷",
    "pinyin": "Jīntiān tiānqì bǐjiào lěng.",
    "translation": "Hôm nay thời tiết khá là lạnh.",
    "segments": [
      "今天",
      "天气",
      "比较",
      "冷"
    ],
    "targetWords": [
      {
        "hanzi": "比较",
        "pinyin": "bǐjiào",
        "meaning": "Khá là, so sánh"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk3_19",
    "level": 3,
    "targetSentence": "今天有一场精彩的比赛。",
    "cleanSentence": "今天有一场精彩的比赛",
    "pinyin": "Jīntiān yǒu yì chǎng jīngcǎi de bǐsài.",
    "translation": "Hôm nay có một cuộc thi rất gay cấn.",
    "segments": [
      "今天有",
      "一",
      "场",
      "精",
      "彩的比赛"
    ],
    "targetWords": [
      {
        "hanzi": "比赛",
        "pinyin": "bǐsài",
        "meaning": "Thi đấu, cuộc thi"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk3_20",
    "level": 3,
    "targetSentence": "请记在笔记本上。",
    "cleanSentence": "请记在笔记本上",
    "pinyin": "Qǐng jì zài bǐjìběn shàng.",
    "translation": "Làm ơn ghi vào trong vở ghi chép.",
    "segments": [
      "请",
      "记",
      "在笔记本",
      "上"
    ],
    "targetWords": [
      {
        "hanzi": "笔记本",
        "pinyin": "bǐjìběn",
        "meaning": "Vở ghi, máy tính laptop"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk3_21",
    "level": 3,
    "targetSentence": "明天你必须来上课。",
    "cleanSentence": "明天你必须来上课",
    "pinyin": "Míngtiān nǐ bìxū lái shàngkè.",
    "translation": "Ngày mai bạn bắt buộc phải đến lớp.",
    "segments": [
      "明天",
      "你",
      "必须",
      "来上课"
    ],
    "targetWords": [
      {
        "hanzi": "必须",
        "pinyin": "bìxū",
        "meaning": "Phải, nhất định phải"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_22",
    "level": 3,
    "targetSentence": "几年不见变化真大！",
    "cleanSentence": "几年不见变化真大",
    "pinyin": "Jǐ nián bú jiàn biànhuà zhēn dà!",
    "translation": "Mấy năm không gặp thay đổi lớn quá!",
    "segments": [
      "几",
      "年",
      "不见",
      "变化",
      "真大"
    ],
    "targetWords": [
      {
        "hanzi": "变化",
        "pinyin": "biànhuà",
        "meaning": "Thay đổi, biến đổi"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_23",
    "level": 3,
    "targetSentence": "我们要学会尊重别人。",
    "cleanSentence": "我们要学会尊重别人",
    "pinyin": "Wǒmen yào xuéhuì zūnzhòng biéren.",
    "translation": "Chúng ta cần phải học cách tôn trọng người khác.",
    "segments": [
      "我们要",
      "学",
      "会",
      "尊",
      "重别人"
    ],
    "targetWords": [
      {
        "hanzi": "别人",
        "pinyin": "biéren",
        "meaning": "Người khác"
      },
      {
        "hanzi": "会",
        "pinyin": "huì",
        "meaning": "Biết (qua học), sẽ"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_24",
    "level": 3,
    "targetSentence": "我们住在这家宾馆。",
    "cleanSentence": "我们住在这家宾馆",
    "pinyin": "Wǒmen zhù zài zhè jiā bīnguǎn.",
    "translation": "Chúng tôi ở tại khách sạn này.",
    "segments": [
      "我们",
      "住",
      "在这",
      "家宾馆"
    ],
    "targetWords": [
      {
        "hanzi": "宾馆",
        "pinyin": "bīnguǎn",
        "meaning": "Khách sạn"
      },
      {
        "hanzi": "家",
        "pinyin": "jiā",
        "meaning": "Nhà, gia đình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_25",
    "level": 3,
    "targetSentence": "把水果放进冰箱里。",
    "cleanSentence": "把水果放进冰箱里",
    "pinyin": "Bǎ shuǐguǒ fàng jìn bīngxiāng lǐ.",
    "translation": "Cho hoa quả vào trong tủ lạnh.",
    "segments": [
      "把水果",
      "放",
      "进",
      "冰箱里"
    ],
    "targetWords": [
      {
        "hanzi": "冰箱",
        "pinyin": "bīngxiāng",
        "meaning": "Tủ lạnh"
      },
      {
        "hanzi": "把",
        "pinyin": "bǎ",
        "meaning": "Cầm, chiếc; câu chữ 把"
      },
      {
        "hanzi": "放",
        "pinyin": "fàng",
        "meaning": "Để, đặt, thả"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk3_26",
    "level": 3,
    "targetSentence": "他不但会说中文，而且说得好。",
    "cleanSentence": "他不但会说中文而且说得好",
    "pinyin": "Tā búdàn huì shuō Zhōngwén, érqiě shuō de hǎo.",
    "translation": "Anh ấy không những biết nói tiếng Trung mà còn nói rất tốt.",
    "segments": [
      "他不但会",
      "说",
      "中文",
      "而且",
      "说得好"
    ],
    "targetWords": [
      {
        "hanzi": "不但",
        "pinyin": "búdàn",
        "meaning": "Không những"
      },
      {
        "hanzi": "而且",
        "pinyin": "érqiě",
        "meaning": "Hơn nữa, mà còn"
      },
      {
        "hanzi": "中文",
        "pinyin": "Zhōngwén",
        "meaning": "Tiếng Trung, chữ Hán"
      }
    ],
    "grammarTip": "Cấu trúc tăng tiến: 不仅 (Không những) ... 而且 (mà còn)"
  },
  {
    "id": "scramble_hsk3_27",
    "level": 3,
    "targetSentence": "这道菜好吃，而且不贵。",
    "cleanSentence": "这道菜好吃而且不贵",
    "pinyin": "Zhè dào cài hǎochī, érqiě bú guì.",
    "translation": "Món này ngon, hơn nữa lại không đắt.",
    "segments": [
      "这道",
      "菜",
      "好吃",
      "而且",
      "不贵"
    ],
    "targetWords": [
      {
        "hanzi": "而且",
        "pinyin": "érqiě",
        "meaning": "Hơn nữa, mà còn"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Cấu trúc tăng tiến: 不仅 (Không những) ... 而且 (mà còn)"
  },
  {
    "id": "scramble_hsk3_28",
    "level": 3,
    "targetSentence": "上课千万不要迟到。",
    "cleanSentence": "上课千万不要迟到",
    "pinyin": "Shàngkè qiānwàn bú yào chídào.",
    "translation": "Đi học tuyệt đối đừng đến muộn.",
    "segments": [
      "上",
      "课",
      "千",
      "万",
      "不要迟到"
    ],
    "targetWords": [
      {
        "hanzi": "迟到",
        "pinyin": "chídào",
        "meaning": "Đến muộn, trễ giờ"
      },
      {
        "hanzi": "万",
        "pinyin": "wàn",
        "meaning": "Mười nghìn (10.000)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_29",
    "level": 3,
    "targetSentence": "天空中出现了一道彩虹。",
    "cleanSentence": "天空中出现了一道彩虹",
    "pinyin": "Tiānkōng zhōng chūxiàn le yí dào cǎihóng.",
    "translation": "Trên bầu trời xuất hiện một dải cầu vồng.",
    "segments": [
      "天空中",
      "出现了",
      "一",
      "道",
      "彩虹"
    ],
    "targetWords": [
      {
        "hanzi": "出现",
        "pinyin": "chūxiàn",
        "meaning": "Xuất hiện"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_30",
    "level": 3,
    "targetSentence": "妈妈在厨房做晚饭。",
    "cleanSentence": "妈妈在厨房做晚饭",
    "pinyin": "Māma zài chúfáng zuò wǎnfàn.",
    "translation": "Mẹ đang ở nhà bếp nấu bữa tối.",
    "segments": [
      "妈妈",
      "在厨房",
      "做",
      "晚饭"
    ],
    "targetWords": [
      {
        "hanzi": "厨房",
        "pinyin": "chúfáng",
        "meaning": "Nhà bếp"
      },
      {
        "hanzi": "妈妈",
        "pinyin": "māma",
        "meaning": "Mẹ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_31",
    "level": 3,
    "targetSentence": "除了他，大家都到了。",
    "cleanSentence": "除了他大家都到了",
    "pinyin": "Chúle tā, dàjiā dōu dào le.",
    "translation": "Ngoại trừ anh ấy, mọi người đều đã đến.",
    "segments": [
      "除了",
      "他",
      "大家",
      "都到了"
    ],
    "targetWords": [
      {
        "hanzi": "除了",
        "pinyin": "chúle",
        "meaning": "Ngoài ra, trừ ra"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_32",
    "level": 3,
    "targetSentence": "春天到了，百花盛开。",
    "cleanSentence": "春天到了百花盛开",
    "pinyin": "Chūntiān dào le, bǎihuā shèngkāi.",
    "translation": "Mùa xuân đến rồi, trăm hoa đua nở.",
    "segments": [
      "春天",
      "到了",
      "百",
      "花",
      "盛开"
    ],
    "targetWords": [
      {
        "hanzi": "春",
        "pinyin": "chūn",
        "meaning": "Mùa xuân"
      },
      {
        "hanzi": "花",
        "pinyin": "huā",
        "meaning": "Bông hoa; tiêu (tiền)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_33",
    "level": 3,
    "targetSentence": "查词典找生词意思。",
    "cleanSentence": "查词典找生词意思",
    "pinyin": "Chá cídiǎn zhǎo shēngcí yìsi.",
    "translation": "Tra từ điển để tìm nghĩa của từ mới.",
    "segments": [
      "查",
      "词典",
      "找",
      "生",
      "词意思"
    ],
    "targetWords": [
      {
        "hanzi": "词典",
        "pinyin": "cídiǎn",
        "meaning": "Từ điển"
      },
      {
        "hanzi": "意思",
        "pinyin": "yìsi",
        "meaning": "Ý nghĩa, thú vị"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_34",
    "level": 3,
    "targetSentence": "这个孩子真聪明。",
    "cleanSentence": "这个孩子真聪明",
    "pinyin": "Zhège háizi zhēn cōngming.",
    "translation": "Đứa trẻ này thật là thông minh.",
    "segments": [
      "这",
      "个",
      "孩子",
      "真聪明"
    ],
    "targetWords": [
      {
        "hanzi": "聪明",
        "pinyin": "cōngming",
        "meaning": "Thông minh"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_35",
    "level": 3,
    "targetSentence": "周末打扫房间。",
    "cleanSentence": "周末打扫房间",
    "pinyin": "Zhōumò dǎsǎo fángjiān.",
    "translation": "Cuối tuần dọn dẹp phòng ốc.",
    "segments": [
      "周末",
      "打扫",
      "房间"
    ],
    "targetWords": [
      {
        "hanzi": "打扫",
        "pinyin": "dǎsǎo",
        "meaning": "Dọn dẹp, quét dọn"
      },
      {
        "hanzi": "周末",
        "pinyin": "zhōumò",
        "meaning": "Cuối tuần"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_36",
    "level": 3,
    "targetSentence": "暑假你打算去哪儿？",
    "cleanSentence": "暑假你打算去哪儿",
    "pinyin": "Shǔjià nǐ dǎsuan qù nǎr?",
    "translation": "Nghỉ hè bạn dự định đi đâu?",
    "segments": [
      "暑",
      "假",
      "你",
      "打算",
      "去哪儿"
    ],
    "targetWords": [
      {
        "hanzi": "打算",
        "pinyin": "dǎsuan",
        "meaning": "Dự định, kế hoạch"
      },
      {
        "hanzi": "哪",
        "pinyin": "nǎ",
        "meaning": "Nào"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk3_37",
    "level": 3,
    "targetSentence": "出门记得带钥匙。",
    "cleanSentence": "出门记得带钥匙",
    "pinyin": "Chūmén jìde dài yàoshi.",
    "translation": "Ra ngoài nhớ mang theo chìa khóa.",
    "segments": [
      "出",
      "门",
      "记得",
      "带",
      "钥匙"
    ],
    "targetWords": [
      {
        "hanzi": "带",
        "pinyin": "dài",
        "meaning": "Mang theo, dẫn dắt"
      },
      {
        "hanzi": "记得",
        "pinyin": "jìde",
        "meaning": "Nhớ, còn nhớ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_38",
    "level": 3,
    "targetSentence": "别担心，一切都会好。",
    "cleanSentence": "别担心一切都会好",
    "pinyin": "Bié dānxīn, yíqiè dōu huì hǎo.",
    "translation": "Đừng lo, mọi chuyện sẽ ổn thôi.",
    "segments": [
      "别",
      "担心",
      "一",
      "切",
      "都会好"
    ],
    "targetWords": [
      {
        "hanzi": "担心",
        "pinyin": "dānxīn",
        "meaning": "Lo lắng"
      },
      {
        "hanzi": "都",
        "pinyin": "dōu",
        "meaning": "Đều, tất cả"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_39",
    "level": 3,
    "targetSentence": "吃生日蛋糕。",
    "cleanSentence": "吃生日蛋糕",
    "pinyin": "Chī shēngrì dàngāo.",
    "translation": "Ăn bánh sinh nhật.",
    "segments": [
      "吃",
      "生日",
      "蛋糕"
    ],
    "targetWords": [
      {
        "hanzi": "蛋糕",
        "pinyin": "dàngāo",
        "meaning": "Bánh ngọt, bánh kem"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_40",
    "level": 3,
    "targetSentence": "他高兴地笑了。",
    "cleanSentence": "他高兴地笑了",
    "pinyin": "Tā gāoxìng de xiào le.",
    "translation": "Anh ấy mỉm cười một cách vui vẻ.",
    "segments": [
      "他",
      "高兴地",
      "笑了"
    ],
    "targetWords": [
      {
        "hanzi": "地",
        "pinyin": "de",
        "meaning": "Một cách... (trợ từ)"
      },
      {
        "hanzi": "高兴",
        "pinyin": "gāoxìng",
        "meaning": "Vui mừng, hạnh phúc"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_41",
    "level": 3,
    "targetSentence": "天黑了开灯吧。",
    "cleanSentence": "天黑了开灯吧",
    "pinyin": "Tiān hēi le kāi dēng ba.",
    "translation": "Trời tối rồi bật đèn lên đi.",
    "segments": [
      "天",
      "黑了",
      "开",
      "灯吧"
    ],
    "targetWords": [
      {
        "hanzi": "灯",
        "pinyin": "dēng",
        "meaning": "Đèn"
      },
      {
        "hanzi": "开",
        "pinyin": "kāi",
        "meaning": "Mở, lái (xe)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_42",
    "level": 3,
    "targetSentence": "这是什么地方？",
    "cleanSentence": "这是什么地方",
    "pinyin": "Zhè shì shénme dìfang?",
    "translation": "Đây là nơi nào thế?",
    "segments": [
      "这",
      "是",
      "什么",
      "地方"
    ],
    "targetWords": [
      {
        "hanzi": "地方",
        "pinyin": "dìfang",
        "meaning": "Nơi, chỗ, địa điểm"
      },
      {
        "hanzi": "什么",
        "pinyin": "shénme",
        "meaning": "Cái gì"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk3_43",
    "level": 3,
    "targetSentence": "坐地铁很方便快捷。",
    "cleanSentence": "坐地铁很方便快捷",
    "pinyin": "Zuò dìtiě hěn fāngbiàn kuàijié.",
    "translation": "Đi tàu điện ngầm rất tiện lợi và nhanh chóng.",
    "segments": [
      "坐",
      "地铁",
      "很方便",
      "快捷"
    ],
    "targetWords": [
      {
        "hanzi": "地铁",
        "pinyin": "dìtiě",
        "meaning": "Tàu điện ngầm"
      },
      {
        "hanzi": "方便",
        "pinyin": "fāngbiàn",
        "meaning": "Thuận tiện, tiện lợi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_44",
    "level": 3,
    "targetSentence": "看地图学地理。",
    "cleanSentence": "看地图学地理",
    "pinyin": "Kàn dìtú xué dìlǐ.",
    "translation": "Xem bản đồ để học địa lý.",
    "segments": [
      "看",
      "地图",
      "学地",
      "理"
    ],
    "targetWords": [
      {
        "hanzi": "地图",
        "pinyin": "dìtú",
        "meaning": "Bản đồ"
      },
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_45",
    "level": 3,
    "targetSentence": "坐电梯上楼。",
    "cleanSentence": "坐电梯上楼",
    "pinyin": "Zuò diàntī shàng lóu.",
    "translation": "Đi thang máy lên lầu.",
    "segments": [
      "坐",
      "电梯",
      "上",
      "楼"
    ],
    "targetWords": [
      {
        "hanzi": "电梯",
        "pinyin": "diàntī",
        "meaning": "Thang máy"
      },
      {
        "hanzi": "楼",
        "pinyin": "lóu",
        "meaning": "Tầng, tòa nhà"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_46",
    "level": 3,
    "targetSentence": "我给你发了电子邮件。",
    "cleanSentence": "我给你发了电子邮件",
    "pinyin": "Wǒ gěi nǐ fā le diànzǐ yóujiàn.",
    "translation": "Tôi đã gửi email cho bạn rồi.",
    "segments": [
      "我",
      "给你",
      "发了",
      "电子邮件"
    ],
    "targetWords": [
      {
        "hanzi": "电子邮件",
        "pinyin": "diànzǐ yóujiàn",
        "meaning": "Email, thư điện tử"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_47",
    "level": 3,
    "targetSentence": "太阳从东方升起。",
    "cleanSentence": "太阳从东方升起",
    "pinyin": "Tàiyáng cóng dōngfāng shēngqǐ.",
    "translation": "Mặt trời mọc từ phía đông.",
    "segments": [
      "太阳",
      "从东",
      "方",
      "升起"
    ],
    "targetWords": [
      {
        "hanzi": "东",
        "pinyin": "dōng",
        "meaning": "Phía đông"
      },
      {
        "hanzi": "太阳",
        "pinyin": "tàiyáng",
        "meaning": "Mặt trời"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_48",
    "level": 3,
    "targetSentence": "冬天北方很冷。",
    "cleanSentence": "冬天北方很冷",
    "pinyin": "Dōngtiān běifāng hěn lěng.",
    "translation": "Mùa đông miền Bắc rất lạnh.",
    "segments": [
      "冬",
      "天",
      "北方",
      "很冷"
    ],
    "targetWords": [
      {
        "hanzi": "冬",
        "pinyin": "dōng",
        "meaning": "Mùa đông"
      },
      {
        "hanzi": "北方",
        "pinyin": "běifāng",
        "meaning": "Phương bắc, miền Bắc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_49",
    "level": 3,
    "targetSentence": "我很喜欢可爱动物。",
    "cleanSentence": "我很喜欢可爱动物",
    "pinyin": "Wǒ hěn xǐhuan kě'ài dòngwù.",
    "translation": "Tôi rất thích động vật đáng yêu.",
    "segments": [
      "我很",
      "喜欢",
      "可",
      "爱动物"
    ],
    "targetWords": [
      {
        "hanzi": "动物",
        "pinyin": "dòngwù",
        "meaning": "Động vật"
      },
      {
        "hanzi": "爱",
        "pinyin": "ài",
        "meaning": "Yêu, thích"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_50",
    "level": 3,
    "targetSentence": "这篇课文很短。",
    "cleanSentence": "这篇课文很短",
    "pinyin": "Zhè piān kèwén hěn duǎn.",
    "translation": "Bài khóa này rất ngắn.",
    "segments": [
      "这",
      "篇",
      "课",
      "文",
      "很短"
    ],
    "targetWords": [
      {
        "hanzi": "短",
        "pinyin": "duǎn",
        "meaning": "Ngắn"
      },
      {
        "hanzi": "很",
        "pinyin": "hěn",
        "meaning": "Rất"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_51",
    "level": 3,
    "targetSentence": "请读这段课文。",
    "cleanSentence": "请读这段课文",
    "pinyin": "Qǐng dú zhè duàn jīngcǎi de kèwén.",
    "translation": "Xin hãy đọc đoạn bài này.",
    "segments": [
      "请",
      "读",
      "这",
      "段",
      "课文"
    ],
    "targetWords": [
      {
        "hanzi": "段",
        "pinyin": "duàn",
        "meaning": "Đoạn, quãng"
      },
      {
        "hanzi": "读",
        "pinyin": "dú",
        "meaning": "Đọc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_52",
    "level": 3,
    "targetSentence": "坚持锻炼身体好。",
    "cleanSentence": "坚持锻炼身体好",
    "pinyin": "Jiānchí duànliàn shēntǐ hǎo.",
    "translation": "Kiên trì rèn luyện rất tốt cho sức khỏe.",
    "segments": [
      "坚",
      "持",
      "锻炼",
      "身体好"
    ],
    "targetWords": [
      {
        "hanzi": "锻炼",
        "pinyin": "duànliàn",
        "meaning": "Rèn luyện, tập thể dục"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_53",
    "level": 3,
    "targetSentence": "天气多么晴朗啊！",
    "cleanSentence": "天气多么晴朗啊",
    "pinyin": "Tiānqì duōme qínglǎng a!",
    "translation": "Thời tiết trong lành biết bao!",
    "segments": [
      "天气",
      "多么",
      "晴",
      "朗啊"
    ],
    "targetWords": [
      {
        "hanzi": "多么",
        "pinyin": "duōme",
        "meaning": "Biết bao, dường nào"
      },
      {
        "hanzi": "啊",
        "pinyin": "a",
        "meaning": "A, à, chà (trợ từ ngữ khí)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_54",
    "level": 3,
    "targetSentence": "我肚子饿了想吃面条。",
    "cleanSentence": "我肚子饿了想吃面条",
    "pinyin": "Wǒ dùzi è le xiǎng chī miàntiáo.",
    "translation": "Bụng tôi đói rồi muốn ăn mì.",
    "segments": [
      "我",
      "肚子",
      "饿了",
      "想",
      "吃面条"
    ],
    "targetWords": [
      {
        "hanzi": "饿",
        "pinyin": "è",
        "meaning": "Đói bụng"
      },
      {
        "hanzi": "条",
        "pinyin": "tiáo",
        "meaning": "Chiếc, con (dài)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_55",
    "level": 3,
    "targetSentence": "小兔子的长耳朵。",
    "cleanSentence": "小兔子的长耳朵",
    "pinyin": "Xiǎotùzi de cháng ěrduo.",
    "translation": "Đôi tai dài của chú thỏ.",
    "segments": [
      "小",
      "兔",
      "子的",
      "长耳朵"
    ],
    "targetWords": [
      {
        "hanzi": "耳朵",
        "pinyin": "ěrduo",
        "meaning": "Tai"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_56",
    "level": 3,
    "targetSentence": "孩子发烧要去医院看医生。",
    "cleanSentence": "孩子发烧要去医院看医生",
    "pinyin": "Háizi fāshāo yào qù yīyuàn kàn yīshēng.",
    "translation": "Trẻ em bị sốt phải đi bệnh viện khám.",
    "segments": [
      "孩子",
      "发烧",
      "要",
      "去医院",
      "看医生"
    ],
    "targetWords": [
      {
        "hanzi": "发烧",
        "pinyin": "fāshāo",
        "meaning": "Phát sốt"
      },
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_57",
    "level": 3,
    "targetSentence": "我发现了一个汉字规律。",
    "cleanSentence": "我发现了一个汉字规律",
    "pinyin": "Wǒ fāxiàn le yí gè hànzì guīlǜ.",
    "translation": "Tôi phát hiện ra một quy luật chữ Hán.",
    "segments": [
      "我发现了一",
      "个",
      "汉",
      "字",
      "规律"
    ],
    "targetWords": [
      {
        "hanzi": "发现",
        "pinyin": "fāxiàn",
        "meaning": "Phát hiện, nhận ra"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_58",
    "level": 3,
    "targetSentence": "坐地铁出门很方便。",
    "cleanSentence": "坐地铁出门很方便",
    "pinyin": "Zuò dìtiě chūmén hěn fāngbiàn.",
    "translation": "Đi tàu điện ngầm ra ngoài rất thuận tiện.",
    "segments": [
      "坐",
      "地铁",
      "出",
      "门",
      "很方便"
    ],
    "targetWords": [
      {
        "hanzi": "方便",
        "pinyin": "fāngbiàn",
        "meaning": "Thuận tiện, tiện lợi"
      },
      {
        "hanzi": "地",
        "pinyin": "de",
        "meaning": "Một cách... (trợ từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_59",
    "level": 3,
    "targetSentence": "把书包放在桌子上。",
    "cleanSentence": "把书包放在桌子上",
    "pinyin": "Bǎ shūbāo fàng zài zhuōzi shàng.",
    "translation": "Đặt cặp sách lên trên bàn.",
    "segments": [
      "把书",
      "包",
      "放",
      "在桌子上"
    ],
    "targetWords": [
      {
        "hanzi": "放",
        "pinyin": "fàng",
        "meaning": "Để, đặt, thả"
      },
      {
        "hanzi": "把",
        "pinyin": "bǎ",
        "meaning": "Cầm, chiếc; câu chữ 把"
      },
      {
        "hanzi": "包",
        "pinyin": "bāo",
        "meaning": "Túi, bao, bọc"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk3_60",
    "level": 3,
    "targetSentence": "请你放心，我会做好的。",
    "cleanSentence": "请你放心我会做好的",
    "pinyin": "Qǐng nǐ fàngxīn, wǒ huì zuòhǎo de.",
    "translation": "Xin bạn yên tâm, tôi sẽ làm tốt.",
    "segments": [
      "请你",
      "放心",
      "我会",
      "做",
      "好的"
    ],
    "targetWords": [
      {
        "hanzi": "放心",
        "pinyin": "fàngxīn",
        "meaning": "Yên tâm"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_61",
    "level": 3,
    "targetSentence": "这次他考了一百分。",
    "cleanSentence": "这次他考了一百分",
    "pinyin": "Zhè cì tā kǎo le yì bǎi fēn.",
    "translation": "Lần này anh ấy thi được 100 điểm.",
    "segments": [
      "这次",
      "他",
      "考了",
      "一",
      "百分"
    ],
    "targetWords": [
      {
        "hanzi": "分",
        "pinyin": "fēn",
        "meaning": "Phút, điểm, chia"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_62",
    "level": 3,
    "targetSentence": "认真复习准备考试。",
    "cleanSentence": "认真复习准备考试",
    "pinyin": "Rènzhēn fùxí zhǔnbèi kǎoshì.",
    "translation": "Chăm chỉ ôn tập chuẩn bị thi.",
    "segments": [
      "认真",
      "复习",
      "准备",
      "考试"
    ],
    "targetWords": [
      {
        "hanzi": "复习",
        "pinyin": "fùxí",
        "meaning": "Ôn tập"
      },
      {
        "hanzi": "认真",
        "pinyin": "rènzhēn",
        "meaning": "Chăm chỉ, nghiêm túc"
      },
      {
        "hanzi": "试",
        "pinyin": "shì",
        "meaning": "Thử"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_63",
    "level": 3,
    "targetSentence": "房间打扫得很干净。",
    "cleanSentence": "房间打扫得很干净",
    "pinyin": "Fángjiān dǎsǎo de hěn gānjìng.",
    "translation": "Phòng ốc dọn dẹp rất sạch sẽ.",
    "segments": [
      "房间",
      "打扫得",
      "很干净"
    ],
    "targetWords": [
      {
        "hanzi": "干净",
        "pinyin": "gānjìng",
        "meaning": "Sạch sẽ"
      },
      {
        "hanzi": "打扫",
        "pinyin": "dǎsǎo",
        "meaning": "Dọn dẹp, quét dọn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_64",
    "level": 3,
    "targetSentence": "要敢于面对困难。",
    "cleanSentence": "要敢于面对困难",
    "pinyin": "Yào gǎnyú miànduì kùnnan.",
    "translation": "Phải dám đối mặt với khó khăn.",
    "segments": [
      "要敢",
      "于",
      "面",
      "对",
      "困难"
    ],
    "targetWords": [
      {
        "hanzi": "敢",
        "pinyin": "gǎn",
        "meaning": "Dám"
      },
      {
        "hanzi": "难",
        "pinyin": "nán",
        "meaning": "Khó khăn"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_65",
    "level": 3,
    "targetSentence": "天气冷容易患感冒。",
    "cleanSentence": "天气冷容易患感冒",
    "pinyin": "Tiānqì lěng róngyì huàn gǎnmào.",
    "translation": "Trời lạnh rất dễ bị cảm cúm.",
    "segments": [
      "天气",
      "冷",
      "容易",
      "患感冒"
    ],
    "targetWords": [
      {
        "hanzi": "感冒",
        "pinyin": "gǎnmào",
        "meaning": "Cảm cúm"
      },
      {
        "hanzi": "容易",
        "pinyin": "róngyì",
        "meaning": "Dễ dàng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_66",
    "level": 3,
    "targetSentence": "刚才谁来找我？",
    "cleanSentence": "刚才谁来找我",
    "pinyin": "Gāngcái shéi lái zhǎo wǒ?",
    "translation": "Ban nãy ai đến tìm tôi vậy?",
    "segments": [
      "刚才",
      "谁",
      "来找",
      "我"
    ],
    "targetWords": [
      {
        "hanzi": "刚才",
        "pinyin": "gāngcái",
        "meaning": "Vừa mới, ban nãy"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk3_67",
    "level": 3,
    "targetSentence": "请跟我一起读。",
    "cleanSentence": "请跟我一起读",
    "pinyin": "Qǐng gēn wǒ yìqǐ dú.",
    "translation": "Xin hãy cùng đọc theo tôi.",
    "segments": [
      "请",
      "跟我",
      "一起",
      "读"
    ],
    "targetWords": [
      {
        "hanzi": "跟",
        "pinyin": "gēn",
        "meaning": "Cùng, với, theo"
      },
      {
        "hanzi": "读",
        "pinyin": "dú",
        "meaning": "Đọc"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_68",
    "level": 3,
    "targetSentence": "根据天气预报明天晴天。",
    "cleanSentence": "根据天气预报明天晴天",
    "pinyin": "Gēnjù tiānqì yùbào míngtiān qíngtiān.",
    "translation": "Theo dự báo thời tiết mai trời nắng.",
    "segments": [
      "根据",
      "天气预",
      "报",
      "明天",
      "晴天"
    ],
    "targetWords": [
      {
        "hanzi": "根据",
        "pinyin": "gēnjù",
        "meaning": "Căn cứ vào"
      },
      {
        "hanzi": "明天",
        "pinyin": "míngtiān",
        "meaning": "Ngày mai"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_69",
    "level": 3,
    "targetSentence": "多练习会更好。",
    "cleanSentence": "多练习会更好",
    "pinyin": "Duō liànxí huì gèng hǎo.",
    "translation": "Luyện tập nhiều sẽ càng tốt hơn.",
    "segments": [
      "多",
      "练",
      "习",
      "会",
      "更好"
    ],
    "targetWords": [
      {
        "hanzi": "更",
        "pinyin": "gèng",
        "meaning": "Càng, hơn nữa"
      },
      {
        "hanzi": "多",
        "pinyin": "duō",
        "meaning": "Nhiều, bao nhiêu"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_70",
    "level": 3,
    "targetSentence": "去公园散步。",
    "cleanSentence": "去公园散步",
    "pinyin": "Qù gōngyuán sànbù.",
    "translation": "Đi công viên dạo bộ.",
    "segments": [
      "去",
      "公园",
      "散",
      "步"
    ],
    "targetWords": [
      {
        "hanzi": "公园",
        "pinyin": "gōngyuán",
        "meaning": "Công viên"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_71",
    "level": 3,
    "targetSentence": "讲一个有趣的中国故事。",
    "cleanSentence": "讲一个有趣的中国故事",
    "pinyin": "Jiǎng yí gè yǒuqù de Zhōngguó gùshi.",
    "translation": "Kể một câu chuyện Trung Quốc thú vị.",
    "segments": [
      "讲一",
      "个",
      "有",
      "趣的",
      "中国故事"
    ],
    "targetWords": [
      {
        "hanzi": "故事",
        "pinyin": "gùshi",
        "meaning": "Câu chuyện"
      },
      {
        "hanzi": "讲",
        "pinyin": "jiǎng",
        "meaning": "Giảng, kể, nói"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_72",
    "level": 3,
    "targetSentence": "外面突然刮起了风。（刮风）",
    "cleanSentence": "外面突然刮起了风（刮风）",
    "pinyin": "Wàimiàn tūrán guā qǐ le fēng.",
    "translation": "Bên ngoài bất chợt nổi gió.",
    "segments": [
      "外面",
      "突然刮",
      "起了风",
      "（",
      "刮风）"
    ],
    "targetWords": [
      {
        "hanzi": "刮风",
        "pinyin": "guāfēng",
        "meaning": "Nổi gió"
      },
      {
        "hanzi": "突然",
        "pinyin": "tūrán",
        "meaning": "Đột nhiên"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_73",
    "level": 3,
    "targetSentence": "出门前请关门关灯。",
    "cleanSentence": "出门前请关门关灯",
    "pinyin": "Chūmén qián qǐng guān mén guān dēng.",
    "translation": "Trước khi ra ngoài hãy đóng cửa tắt đèn.",
    "segments": [
      "出门前",
      "请",
      "关",
      "门",
      "关灯"
    ],
    "targetWords": [
      {
        "hanzi": "关",
        "pinyin": "guān",
        "meaning": "Đóng, tắt"
      },
      {
        "hanzi": "灯",
        "pinyin": "dēng",
        "meaning": "Đèn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_74",
    "level": 3,
    "targetSentence": "好朋友关系。",
    "cleanSentence": "好朋友关系",
    "pinyin": "Hǎo péngyou guānxì.",
    "translation": "Mối quan hệ bạn bè tốt.",
    "segments": [
      "好",
      "朋友",
      "关系"
    ],
    "targetWords": [
      {
        "hanzi": "关系",
        "pinyin": "guānxì",
        "meaning": "Mối quan hệ"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_75",
    "level": 3,
    "targetSentence": "我们要关心父母。",
    "cleanSentence": "我们要关心父母",
    "pinyin": "Wǒmen yào guānxīn fùmǔ.",
    "translation": "Chúng ta cần quan tâm bố mẹ.",
    "segments": [
      "我们",
      "要",
      "关心",
      "父母"
    ],
    "targetWords": [
      {
        "hanzi": "关心",
        "pinyin": "guānxīn",
        "meaning": "Quan tâm, chăm sóc"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_76",
    "level": 3,
    "targetSentence": "一本关于中国历史的书。",
    "cleanSentence": "一本关于中国历史的书",
    "pinyin": "Yì běn guānyú Zhōngguó lìshǐ de shū.",
    "translation": "Một cuốn sách viết về lịch sử Trung Quốc.",
    "segments": [
      "一",
      "本",
      "关于",
      "中国",
      "历史的书"
    ],
    "targetWords": [
      {
        "hanzi": "关于",
        "pinyin": "guānyú",
        "meaning": "Về, liên quan tới"
      },
      {
        "hanzi": "历史",
        "pinyin": "lìshǐ",
        "meaning": "Lịch sử"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_77",
    "level": 3,
    "targetSentence": "中国是一个历史悠久的国家。",
    "cleanSentence": "中国是一个历史悠久的国家",
    "pinyin": "Zhōngguó shì yí gè lìshǐ yōujiǔ de guójiā.",
    "translation": "Trung Quốc là một quốc gia có lịch sử lâu đời.",
    "segments": [
      "中国是一",
      "个",
      "历史",
      "悠",
      "久的国家"
    ],
    "targetWords": [
      {
        "hanzi": "国家",
        "pinyin": "guójiā",
        "meaning": "Đất nước"
      },
      {
        "hanzi": "久",
        "pinyin": "jiǔ",
        "meaning": "Lâu, dài"
      },
      {
        "hanzi": "历史",
        "pinyin": "lìshǐ",
        "meaning": "Lịch sử"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk3_78",
    "level": 3,
    "targetSentence": "喝一杯冰苹果汁。",
    "cleanSentence": "喝一杯冰苹果汁",
    "pinyin": "Hē yì bēi bīng píngguǒzhī.",
    "translation": "Uống một cốc nước ép táo lạnh.",
    "segments": [
      "喝",
      "一",
      "杯",
      "冰",
      "苹果汁"
    ],
    "targetWords": [
      {
        "hanzi": "果汁",
        "pinyin": "guǒzhī",
        "meaning": "Nước ép hoa quả"
      },
      {
        "hanzi": "喝",
        "pinyin": "hē",
        "meaning": "Uống"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_79",
    "level": 3,
    "targetSentence": "总结过去，展望未来。",
    "cleanSentence": "总结过去展望未来",
    "pinyin": "Zǒngjié guòqù, zhǎnwàng wèilái.",
    "translation": "Tổng kết quá khứ, hướng tới tương lai.",
    "segments": [
      "总结",
      "过去",
      "展",
      "望",
      "未来"
    ],
    "targetWords": [
      {
        "hanzi": "过去",
        "pinyin": "guòqù",
        "meaning": "Quá khứ, trước đây"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Trợ từ động thái 过: Biểu thị kinh nghiệm từng trải qua trong quá khứ"
  },
  {
    "id": "scramble_hsk3_80",
    "level": 3,
    "targetSentence": "不要害怕，勇敢一点。",
    "cleanSentence": "不要害怕勇敢一点",
    "pinyin": "Bú yào hàipà, yǒnggǎn yìdiǎn.",
    "translation": "Đừng sợ hãi, hãy dũng cảm lên.",
    "segments": [
      "不要",
      "害怕",
      "勇",
      "敢",
      "一点"
    ],
    "targetWords": [
      {
        "hanzi": "害怕",
        "pinyin": "hàipà",
        "meaning": "Sợ hãi, sợ"
      },
      {
        "hanzi": "敢",
        "pinyin": "gǎn",
        "meaning": "Dám"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_81",
    "level": 3,
    "targetSentence": "查询去北京的航班。",
    "cleanSentence": "查询去北京的航班",
    "pinyin": "Cháxún qù Běijīng de hángbān.",
    "translation": "Tra cứu chuyến bay đi Bắc Kinh.",
    "segments": [
      "查",
      "询",
      "去北京的",
      "航班"
    ],
    "targetWords": [
      {
        "hanzi": "航班",
        "pinyin": "hángbān",
        "meaning": "Chuyến bay"
      },
      {
        "hanzi": "北京",
        "pinyin": "Běijīng",
        "meaning": "Bắc Kinh"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_82",
    "level": 3,
    "targetSentence": "请看黑板上的汉字。",
    "cleanSentence": "请看黑板上的汉字",
    "pinyin": "Qǐng kàn hēibǎn shàng de hànzì.",
    "translation": "Xin hãy nhìn chữ Hán trên bảng.",
    "segments": [
      "请",
      "看",
      "黑板",
      "上的",
      "汉字"
    ],
    "targetWords": [
      {
        "hanzi": "黑板",
        "pinyin": "hēibǎn",
        "meaning": "Bảng đen"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_83",
    "level": 3,
    "targetSentence": "后来他去中国留学了。",
    "cleanSentence": "后来他去中国留学了",
    "pinyin": "Hòulái tā qù Zhōngguó liúxué le.",
    "translation": "Sau đó anh ấy đã sang Trung Quốc du học.",
    "segments": [
      "后来",
      "他",
      "去中国",
      "留学了"
    ],
    "targetWords": [
      {
        "hanzi": "后来",
        "pinyin": "hòulái",
        "meaning": "Về sau, sau này"
      },
      {
        "hanzi": "留学",
        "pinyin": "liúxué",
        "meaning": "Du học"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_84",
    "level": 3,
    "targetSentence": "出国旅游要带好护照。",
    "cleanSentence": "出国旅游要带好护照",
    "pinyin": "Chūguó lǚyóu yào dài hǎo hùzhào.",
    "translation": "Đi du lịch nước ngoài cần mang theo hộ chiếu.",
    "segments": [
      "出国",
      "旅游",
      "要",
      "带",
      "好护照"
    ],
    "targetWords": [
      {
        "hanzi": "护照",
        "pinyin": "hùzhào",
        "meaning": "Hộ chiếu"
      },
      {
        "hanzi": "带",
        "pinyin": "dài",
        "meaning": "Mang theo, dẫn dắt"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_85",
    "level": 3,
    "targetSentence": "公园里的花开了。",
    "cleanSentence": "公园里的花开了",
    "pinyin": "Gōngyuán lǐ de huā kāi le.",
    "translation": "Hoa trong công viên nở rồi.",
    "segments": [
      "公园",
      "里的",
      "花",
      "开了"
    ],
    "targetWords": [
      {
        "hanzi": "花",
        "pinyin": "huā",
        "meaning": "Bông hoa; tiêu (tiền)"
      },
      {
        "hanzi": "公园",
        "pinyin": "gōngyuán",
        "meaning": "Công viên"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_86",
    "level": 3,
    "targetSentence": "他喜欢画中国画。",
    "cleanSentence": "他喜欢画中国画",
    "pinyin": "Tā xǐhuan huà Zhōngguó huà.",
    "translation": "Anh ấy thích vẽ tranh Trung Quốc.",
    "segments": [
      "他",
      "喜欢",
      "画",
      "中国画"
    ],
    "targetWords": [
      {
        "hanzi": "画",
        "pinyin": "huà",
        "meaning": "Vẽ tranh, bức tranh"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_87",
    "level": 3,
    "targetSentence": "电脑坏了需要修理。",
    "cleanSentence": "电脑坏了需要修理",
    "pinyin": "Diànnǎo huài le xūyào xiūlǐ.",
    "translation": "Máy tính bị hỏng cần phải sửa.",
    "segments": [
      "电脑",
      "坏了",
      "需要",
      "修理"
    ],
    "targetWords": [
      {
        "hanzi": "坏",
        "pinyin": "huài",
        "meaning": "Hỏng, xấu, tệ"
      },
      {
        "hanzi": "需要",
        "pinyin": "xūyào",
        "meaning": "Cần thiết, cần"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_88",
    "level": 3,
    "targetSentence": "这里的学习环境真好。",
    "cleanSentence": "这里的学习环境真好",
    "pinyin": "Zhèlǐ de xuéxí huánjìng zhēn hǎo.",
    "translation": "Môi trường học tập ở đây rất tốt.",
    "segments": [
      "这",
      "里的",
      "学习",
      "环境",
      "真好"
    ],
    "targetWords": [
      {
        "hanzi": "环境",
        "pinyin": "huánjìng",
        "meaning": "Môi trường"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_89",
    "level": 3,
    "targetSentence": "我想在银行换钱。",
    "cleanSentence": "我想在银行换钱",
    "pinyin": "Wǒ xiǎng zài yínháng huàn qián.",
    "translation": "Tôi muốn đổi tiền ở ngân hàng.",
    "segments": [
      "我想",
      "在银行",
      "换",
      "钱"
    ],
    "targetWords": [
      {
        "hanzi": "换",
        "pinyin": "huàn",
        "meaning": "Đổi, thay"
      },
      {
        "hanzi": "银行",
        "pinyin": "yínháng",
        "meaning": "Ngân hàng"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_90",
    "level": 3,
    "targetSentence": "黄河水奔流不息。",
    "cleanSentence": "黄河水奔流不息",
    "pinyin": "Huáng Hé shuǐ bēnliú bù xī.",
    "translation": "Dòng nước Hoàng Hà cuồn cuộn chảy.",
    "segments": [
      "黄河",
      "水",
      "奔",
      "流",
      "不息"
    ],
    "targetWords": [
      {
        "hanzi": "黄河",
        "pinyin": "Huáng Hé",
        "meaning": "Sông Hoàng Hà"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_91",
    "level": 3,
    "targetSentence": "下午参加重要会议。",
    "cleanSentence": "下午参加重要会议",
    "pinyin": "Xiàwǔ cānjiā zhòngyào huìyì.",
    "translation": "Buổi chiều tham gia cuộc họp quan trọng.",
    "segments": [
      "下午",
      "参",
      "加",
      "重要会议"
    ],
    "targetWords": [
      {
        "hanzi": "会议",
        "pinyin": "huìyì",
        "meaning": "Cuộc họp, hội nghị"
      },
      {
        "hanzi": "重要",
        "pinyin": "zhòngyào",
        "meaning": "Quan trọng"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_92",
    "level": 3,
    "targetSentence": "喝茶或者咖啡都可以。",
    "cleanSentence": "喝茶或者咖啡都可以",
    "pinyin": "Hē chá huòzhě kāfēi dōu kěyǐ.",
    "translation": "Uống trà hay cà phê đều được cả.",
    "segments": [
      "喝",
      "茶",
      "或者",
      "咖啡",
      "都可以"
    ],
    "targetWords": [
      {
        "hanzi": "或者",
        "pinyin": "huòzhě",
        "meaning": "Hoặc là (khẳng định)"
      },
      {
        "hanzi": "茶",
        "pinyin": "chá",
        "meaning": "Trà, chè"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk3_93",
    "level": 3,
    "targetSentence": "我几乎天天都在学中文。",
    "cleanSentence": "我几乎天天都在学中文",
    "pinyin": "Wǒ jīhū tiāntiān dōu zài xué Zhōngwén.",
    "translation": "Tôi hầu như ngày nào cũng học tiếng Trung.",
    "segments": [
      "我几乎",
      "天",
      "天",
      "都在",
      "学中文"
    ],
    "targetWords": [
      {
        "hanzi": "几乎",
        "pinyin": "jīhū",
        "meaning": "Hầu như, suýt nữa"
      },
      {
        "hanzi": "中文",
        "pinyin": "Zhōngwén",
        "meaning": "Tiếng Trung, chữ Hán"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_94",
    "level": 3,
    "targetSentence": "这是一个极好的机会。",
    "cleanSentence": "这是一个极好的机会",
    "pinyin": "Zhè shì yí gè jí hǎo de jīhuì.",
    "translation": "Đây là một cơ hội cực kỳ tốt.",
    "segments": [
      "这是",
      "一",
      "个",
      "极",
      "好的机会"
    ],
    "targetWords": [
      {
        "hanzi": "机会",
        "pinyin": "jīhuì",
        "meaning": "Cơ hội, thời cơ"
      },
      {
        "hanzi": "极",
        "pinyin": "jí",
        "meaning": "Cực kỳ, hết sức"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk3_95",
    "level": 3,
    "targetSentence": "今天天气好极了！",
    "cleanSentence": "今天天气好极了",
    "pinyin": "Jīntiān tiānqì hǎo jí le!",
    "translation": "Thời tiết hôm nay đẹp tuyệt vời!",
    "segments": [
      "今天",
      "天气",
      "好",
      "极了"
    ],
    "targetWords": [
      {
        "hanzi": "极",
        "pinyin": "jí",
        "meaning": "Cực kỳ, hết sức"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk3_96",
    "level": 3,
    "targetSentence": "你还记得李老师吗？",
    "cleanSentence": "你还记得李老师吗",
    "pinyin": "Nǐ hái jìde Lǐ lǎoshī ma?",
    "translation": "Bạn còn nhớ thầy Lý không?",
    "segments": [
      "你",
      "还",
      "记得",
      "李",
      "老师吗"
    ],
    "targetWords": [
      {
        "hanzi": "记得",
        "pinyin": "jìde",
        "meaning": "Nhớ, còn nhớ"
      },
      {
        "hanzi": "老",
        "pinyin": "lǎo",
        "meaning": "Già, cũ"
      }
    ],
    "grammarTip": "Câu hỏi nghi vấn Có/Không: Mệnh đề khẳng định + 吗？"
  },
  {
    "id": "scramble_hsk3_97",
    "level": 3,
    "targetSentence": "一年有四个季节。",
    "cleanSentence": "一年有四个季节",
    "pinyin": "Yì nián yǒu sì gè jìjié.",
    "translation": "Một năm có bốn mùa.",
    "segments": [
      "一",
      "年",
      "有",
      "四",
      "个季节"
    ],
    "targetWords": [
      {
        "hanzi": "季节",
        "pinyin": "jìjié",
        "meaning": "Mùa trong năm"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_98",
    "level": 3,
    "targetSentence": "认真检查作业。",
    "cleanSentence": "认真检查作业",
    "pinyin": "Rènzhēn jiǎnchá zuòyè.",
    "translation": "Kiểm tra bài tập cẩn thận.",
    "segments": [
      "认真",
      "检查",
      "作业"
    ],
    "targetWords": [
      {
        "hanzi": "检查",
        "pinyin": "jiǎnchá",
        "meaning": "Kiểm tra"
      },
      {
        "hanzi": "认真",
        "pinyin": "rènzhēn",
        "meaning": "Chăm chỉ, nghiêm túc"
      },
      {
        "hanzi": "作业",
        "pinyin": "zuòyè",
        "meaning": "Bài tập"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_99",
    "level": 3,
    "targetSentence": "这个问题很简单。",
    "cleanSentence": "这个问题很简单",
    "pinyin": "Zhège wèntí hěn jiǎndān.",
    "translation": "Câu hỏi này rất đơn giản.",
    "segments": [
      "这",
      "个",
      "问题",
      "很简单"
    ],
    "targetWords": [
      {
        "hanzi": "简单",
        "pinyin": "jiǎndān",
        "meaning": "Đơn giản"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk3_100",
    "level": 3,
    "targetSentence": "明天在学校门口见面。",
    "cleanSentence": "明天在学校门口见面",
    "pinyin": "Míngtiān zài xuéxiào ménkǒu jiànmiàn.",
    "translation": "Ngày mai gặp nhau ở cổng trường nhé.",
    "segments": [
      "明天",
      "在学校",
      "门",
      "口见面"
    ],
    "targetWords": [
      {
        "hanzi": "见面",
        "pinyin": "jiànmiàn",
        "meaning": "Gặp mặt, gặp gỡ"
      },
      {
        "hanzi": "口",
        "pinyin": "kǒu",
        "meaning": "Miệng, ngụm"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk4_1",
    "level": 4,
    "targetSentence": "这是一部关于美好爱情的电影。",
    "cleanSentence": "这是一部关于美好爱情的电影",
    "pinyin": "Zhè shì yí bù guānyú měihǎo àiqíng de diànyǐng.",
    "translation": "Đây là một bộ phim nói về tình yêu tươi đẹp.",
    "segments": [
      "这是一部",
      "关于",
      "美",
      "好",
      "爱情的电影"
    ],
    "targetWords": [
      {
        "hanzi": "爱情",
        "pinyin": "àiqíng",
        "meaning": "Tình yêu"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk4_2",
    "level": 4,
    "targetSentence": "请听从公司的统一安排。",
    "cleanSentence": "请听从公司的统一安排",
    "pinyin": "Qǐng tīngcóng gōngsī de tǒngyī ānpái.",
    "translation": "Xin hãy nghe theo sự sắp xếp chung của công ty.",
    "segments": [
      "请",
      "听",
      "从公司的",
      "统",
      "一安排"
    ],
    "targetWords": [
      {
        "hanzi": "安排",
        "pinyin": "ānpái",
        "meaning": "Sắp xếp, an bài"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_3",
    "level": 4,
    "targetSentence": "出门在外要注意交通安全。",
    "cleanSentence": "出门在外要注意交通安全",
    "pinyin": "Chūmén zàiwài yào zhùyì jiāotōng ānquán.",
    "translation": "Đi ra ngoài cần chú ý an toàn giao thông.",
    "segments": [
      "出门",
      "在外要",
      "注意",
      "交",
      "通安全"
    ],
    "targetWords": [
      {
        "hanzi": "安全",
        "pinyin": "ānquán",
        "meaning": "An toàn"
      },
      {
        "hanzi": "在",
        "pinyin": "zài",
        "meaning": "Ở, đang"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_4",
    "level": 4,
    "targetSentence": "请大家按时交作业。",
    "cleanSentence": "请大家按时交作业",
    "pinyin": "Qǐng dàjiā ànshí jiāo zuòyè.",
    "translation": "Xin mọi người nộp bài tập đúng giờ.",
    "segments": [
      "请",
      "大家",
      "按时",
      "交作业"
    ],
    "targetWords": [
      {
        "hanzi": "按时",
        "pinyin": "ànshí",
        "meaning": "Đúng giờ"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_5",
    "level": 4,
    "targetSentence": "我们按照计划顺利进行。",
    "cleanSentence": "我们按照计划顺利进行",
    "pinyin": "Wǒmen ànzhào jìhuà shùnlì jìnxíng.",
    "translation": "Chúng tôi tiến hành thuận lợi theo đúng kế hoạch.",
    "segments": [
      "我们",
      "按照计划",
      "顺",
      "利",
      "进行"
    ],
    "targetWords": [
      {
        "hanzi": "按照",
        "pinyin": "ànzhào",
        "meaning": "Theo, dựa theo"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_6",
    "level": 4,
    "targetSentence": "你今天的汉语演讲真棒！",
    "cleanSentence": "你今天的汉语演讲真棒",
    "pinyin": "Nǐ jīntiān de Hànyǔ yǎnjiǎng zhēn bàng!",
    "translation": "Bài phát biểu tiếng Trung của bạn hôm nay giỏi thật!",
    "segments": [
      "你今天的",
      "汉语",
      "演",
      "讲",
      "真棒"
    ],
    "targetWords": [
      {
        "hanzi": "棒",
        "pinyin": "bàng",
        "meaning": "Tuyệt vời, giỏi"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_7",
    "level": 4,
    "targetSentence": "我们要保护野生动物。",
    "cleanSentence": "我们要保护野生动物",
    "pinyin": "Wǒmen yào bǎohù yěshēng dòngwù.",
    "translation": "Chúng ta cần bảo vệ động vật hoang dã.",
    "segments": [
      "我们",
      "要",
      "保护",
      "野",
      "生动物"
    ],
    "targetWords": [
      {
        "hanzi": "保护",
        "pinyin": "bǎohù",
        "meaning": "Bảo vệ"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_8",
    "level": 4,
    "targetSentence": "我保证按时完成这项任务。",
    "cleanSentence": "我保证按时完成这项任务",
    "pinyin": "Wǒ bǎozhèng ànshí wánchéng zhè xiàng rènwu.",
    "translation": "Tôi cam đoan sẽ hoàn thành nhiệm vụ này đúng hạn.",
    "segments": [
      "我保证",
      "按时",
      "完成这",
      "项",
      "任务"
    ],
    "targetWords": [
      {
        "hanzi": "保证",
        "pinyin": "bǎozhèng",
        "meaning": "Bảo đảm, cam đoan"
      },
      {
        "hanzi": "按时",
        "pinyin": "ànshí",
        "meaning": "Đúng giờ"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_9",
    "level": 4,
    "targetSentence": "真抱歉，让你久等了。",
    "cleanSentence": "真抱歉让你久等了",
    "pinyin": "Zhēn bàoqiàn, ràng nǐ jiǔ děng le.",
    "translation": "Thật có lỗi quá, để bạn phải chờ lâu rồi.",
    "segments": [
      "真抱歉",
      "让",
      "你",
      "久",
      "等了"
    ],
    "targetWords": [
      {
        "hanzi": "抱歉",
        "pinyin": "bàoqiàn",
        "meaning": "Xin lỗi, lấy làm tiếc"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_10",
    "level": 4,
    "targetSentence": "我想报名参加汉语水平考试。",
    "cleanSentence": "我想报名参加汉语水平考试",
    "pinyin": "Wǒ xiǎng bàomíng cānjiā Hànyǔ shuǐpíng kǎoshì.",
    "translation": "Tôi muốn đăng ký tham gia kỳ thi HSK.",
    "segments": [
      "我想",
      "报名参",
      "加",
      "汉语",
      "水平考试"
    ],
    "targetWords": [
      {
        "hanzi": "报名",
        "pinyin": "bàomíng",
        "meaning": "Đăng ký (tham gia)"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_11",
    "level": 4,
    "targetSentence": "请填写这张个人信息表格。",
    "cleanSentence": "请填写这张个人信息表格",
    "pinyin": "Qǐng tiánxiě zhè zhāng gèrén xìnxī biǎogé.",
    "translation": "Làm ơn điền vào bảng thông tin cá nhân này.",
    "segments": [
      "请填写这张",
      "个",
      "人",
      "信",
      "息表格"
    ],
    "targetWords": [
      {
        "hanzi": "表格",
        "pinyin": "biǎogé",
        "meaning": "Bảng biểu, mẫu đơn"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_12",
    "level": 4,
    "targetSentence": "今晚的京剧表演非常精彩。",
    "cleanSentence": "今晚的京剧表演非常精彩",
    "pinyin": "Jīnwǎn de jīngjù biǎoyǎn fēicháng jīngcǎi.",
    "translation": "Màn biểu diễn kinh kịch tối nay vô cùng đặc sắc.",
    "segments": [
      "今晚的京",
      "剧",
      "表演",
      "非常",
      "精彩"
    ],
    "targetWords": [
      {
        "hanzi": "表演",
        "pinyin": "biǎoyǎn",
        "meaning": "Biểu diễn"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_13",
    "level": 4,
    "targetSentence": "老师表扬了他认真学习的态度。",
    "cleanSentence": "老师表扬了他认真学习的态度",
    "pinyin": "Lǎoshī biǎoyáng le tā rènzhēn xuéxí de tàidu.",
    "translation": "Thầy giáo đã khen ngợi thái độ học tập chăm chỉ của cậu ấy.",
    "segments": [
      "老师",
      "表扬了他",
      "认真",
      "学习的",
      "态度"
    ],
    "targetWords": [
      {
        "hanzi": "表扬",
        "pinyin": "biǎoyáng",
        "meaning": "Khen ngợi, biểu dương"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_14",
    "level": 4,
    "targetSentence": "用汉语准确表达自己的想法。",
    "cleanSentence": "用汉语准确表达自己的想法",
    "pinyin": "Yòng Hànyǔ zhǔnquè biǎodá zìjǐ de xiǎngfǎ.",
    "translation": "Dùng tiếng Trung diễn đạt chính xác suy nghĩ của mình.",
    "segments": [
      "用汉语准",
      "确",
      "表达",
      "自己的",
      "想法"
    ],
    "targetWords": [
      {
        "hanzi": "表达",
        "pinyin": "biǎodá",
        "meaning": "Bày tỏ, diễn đạt"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_15",
    "level": 4,
    "targetSentence": "他去年从北京大学毕业了。",
    "cleanSentence": "他去年从北京大学毕业了",
    "pinyin": "Tā qùnián cóng Běijīng Dàxué bìyè le.",
    "translation": "Anh ấy năm ngoái đã tốt nghiệp Đại học Bắc Kinh.",
    "segments": [
      "他去年",
      "从北京",
      "大",
      "学",
      "毕业了"
    ],
    "targetWords": [
      {
        "hanzi": "毕业",
        "pinyin": "bìyè",
        "meaning": "Tốt nghiệp"
      },
      {
        "hanzi": "北京",
        "pinyin": "Běijīng",
        "meaning": "Bắc Kinh"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_16",
    "level": 4,
    "targetSentence": "他接受了建议，并且努力改正。",
    "cleanSentence": "他接受了建议并且努力改正",
    "pinyin": "Tā jiēshòu le jiànyì, bìngqiě nǔlì gǎizhèng.",
    "translation": "Anh ấy đã tiếp thu góp ý, đồng thời nỗ lực sửa đổi.",
    "segments": [
      "他接",
      "受了建议",
      "并且",
      "努力",
      "改正"
    ],
    "targetWords": [
      {
        "hanzi": "并且",
        "pinyin": "bìngqiě",
        "meaning": "Đồng thời, và lại"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_17",
    "level": 4,
    "targetSentence": "王老师是一位文学博士。",
    "cleanSentence": "王老师是一位文学博士",
    "pinyin": "Wáng lǎoshī shì yí wèi wénxué bóshì.",
    "translation": "Thầy Vương là một tiến sĩ văn học.",
    "segments": [
      "王老师是",
      "一",
      "位",
      "文",
      "学博士"
    ],
    "targetWords": [
      {
        "hanzi": "博士",
        "pinyin": "bóshì",
        "meaning": "Tiến sĩ"
      },
      {
        "hanzi": "老师",
        "pinyin": "lǎoshī",
        "meaning": "Thầy cô giáo"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_18",
    "level": 4,
    "targetSentence": "这件衣服好看，不过有点贵。",
    "cleanSentence": "这件衣服好看不过有点贵",
    "pinyin": "Zhè jiàn yīfu hǎokàn, búguò yǒudiǎn guì.",
    "translation": "Bộ quần áo này đẹp, có điều hơi đắt một chút.",
    "segments": [
      "这件",
      "衣服好看",
      "不过",
      "有",
      "点贵"
    ],
    "targetWords": [
      {
        "hanzi": "不过",
        "pinyin": "búguò",
        "meaning": "Có điều, nhưng mà"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      }
    ],
    "grammarTip": "Trợ từ động thái 过: Biểu thị kinh nghiệm từng trải qua trong quá khứ"
  },
  {
    "id": "scramble_hsk4_19",
    "level": 4,
    "targetSentence": "由于下大雨，比赛不得不推迟。",
    "cleanSentence": "由于下大雨比赛不得不推迟",
    "pinyin": "Yóuyú xià dà yǔ, bǐsài bùdébù tuīchí.",
    "translation": "Vì trời mưa to nên cuộc thi đành phải hoãn lại.",
    "segments": [
      "由于下大",
      "雨",
      "比赛",
      "不得不",
      "推迟"
    ],
    "targetWords": [
      {
        "hanzi": "不得不",
        "pinyin": "bùdébù",
        "meaning": "Không thể không, đành phải"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk4_20",
    "level": 4,
    "targetSentence": "不管遇到什么困难，都不要放弃。（不管是）",
    "cleanSentence": "不管遇到什么困难都不要放弃（不管是）",
    "pinyin": "Bùguǎn yùdào shénme kùnnan, dōu bú yào fàngqì.",
    "translation": "Bất kể gặp khó khăn gì, cũng đừng từ bỏ.",
    "segments": [
      "不管",
      "遇到",
      "什么困难",
      "都不要放弃（",
      "不管是）"
    ],
    "targetWords": [
      {
        "hanzi": "不管是",
        "pinyin": "bùguǎn",
        "meaning": "Bất kể, cho dù"
      },
      {
        "hanzi": "都",
        "pinyin": "dōu",
        "meaning": "Đều, tất cả"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_21",
    "level": 4,
    "targetSentence": "不好意思，打扰你一下。",
    "cleanSentence": "不好意思打扰你一下",
    "pinyin": "Bù hǎoyìsi, dǎrǎo nǐ yíxià.",
    "translation": "Thật ngại quá, làm phiền bạn một chút.",
    "segments": [
      "不好意思",
      "打扰",
      "你",
      "一下"
    ],
    "targetWords": [
      {
        "hanzi": "不好意思",
        "pinyin": "bù hǎoyìsi",
        "meaning": "Ngại ngùng, xin lỗi"
      },
      {
        "hanzi": "打扰",
        "pinyin": "dǎrǎo",
        "meaning": "Làm phiền"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_22",
    "level": 4,
    "targetSentence": "他不仅聪明，而且非常谦虚。",
    "cleanSentence": "他不仅聪明而且非常谦虚",
    "pinyin": "Tā bùjǐn cōngming, érqiě fēicháng qiānxū.",
    "translation": "Cậu ấy không những thông minh, mà còn vô cùng khiêm tốn.",
    "segments": [
      "他不仅",
      "聪明",
      "而且",
      "非常",
      "谦虚"
    ],
    "targetWords": [
      {
        "hanzi": "不仅",
        "pinyin": "bùjǐn",
        "meaning": "Không chỉ, không những"
      },
      {
        "hanzi": "他",
        "pinyin": "tā",
        "meaning": "Anh ấy, cậu ấy"
      }
    ],
    "grammarTip": "Cấu trúc tăng tiến: 不仅 (Không những) ... 而且 (mà còn)"
  },
  {
    "id": "scramble_hsk4_23",
    "level": 4,
    "targetSentence": "这只是整个计划的一小部分。",
    "cleanSentence": "这只是整个计划的一小部分",
    "pinyin": "Zhè zhǐshì zhěnggè jìhuà de yì xiǎo bùfen.",
    "translation": "Đây chỉ là một phần nhỏ trong toàn bộ kế hoạch.",
    "segments": [
      "这只是整个",
      "计",
      "划的",
      "一",
      "小部分"
    ],
    "targetWords": [
      {
        "hanzi": "部分",
        "pinyin": "bùfen",
        "meaning": "Bộ phận, phần"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk4_24",
    "level": 4,
    "targetSentence": "请把黑板擦干净。",
    "cleanSentence": "请把黑板擦干净",
    "pinyin": "Qǐng bǎ hēibǎn cā gānjìng.",
    "translation": "Xin hãy lau bảng cho sạch.",
    "segments": [
      "请",
      "把黑板",
      "擦",
      "干净"
    ],
    "targetWords": [
      {
        "hanzi": "擦",
        "pinyin": "cā",
        "meaning": "Lau, chùi"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk4_25",
    "level": 4,
    "targetSentence": "你猜猜看这是什么？",
    "cleanSentence": "你猜猜看这是什么",
    "pinyin": "Nǐ cāicai kàn zhè shì shénme?",
    "translation": "Bạn đoán xem đây là cái gì nào?",
    "segments": [
      "你猜",
      "猜",
      "看",
      "这",
      "是什么"
    ],
    "targetWords": [
      {
        "hanzi": "猜",
        "pinyin": "cāi",
        "meaning": "Đoán"
      },
      {
        "hanzi": "看",
        "pinyin": "kàn",
        "meaning": "Xem, nhìn, ngắm, đọc"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk4_26",
    "level": 4,
    "targetSentence": "准备好开会需要的材料。",
    "cleanSentence": "准备好开会需要的材料",
    "pinyin": "Zhǔnbèi hǎo kāihuì xūyào de cáiliào.",
    "translation": "Chuẩn bị sẵn sàng tài liệu cần thiết cho cuộc họp.",
    "segments": [
      "准备",
      "好",
      "开",
      "会",
      "需要的材料"
    ],
    "targetWords": [
      {
        "hanzi": "材料",
        "pinyin": "cáiliào",
        "meaning": "Tài liệu, nguyên liệu"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_27",
    "level": 4,
    "targetSentence": "明天我们去参观故宫博物院。",
    "cleanSentence": "明天我们去参观故宫博物院",
    "pinyin": "Míngtiān wǒmen qù cānguān Gùgōng Bówùyuàn.",
    "translation": "Ngày mai chúng tôi đi tham quan Bảo tàng Cố Cung.",
    "segments": [
      "明天",
      "我们",
      "去参观故宫",
      "博",
      "物院"
    ],
    "targetWords": [
      {
        "hanzi": "参观",
        "pinyin": "cānguān",
        "meaning": "Tham quan"
      },
      {
        "hanzi": "明天",
        "pinyin": "míngtiān",
        "meaning": "Ngày mai"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_28",
    "level": 4,
    "targetSentence": "中午我们在学校餐厅吃饭。",
    "cleanSentence": "中午我们在学校餐厅吃饭",
    "pinyin": "Zhōngwǔ wǒmen zài xuéxiào cāntīng chīfàn.",
    "translation": "Buổi trưa chúng tôi ăn cơm ở căng tin trường học.",
    "segments": [
      "中午",
      "我们",
      "在学校",
      "餐厅",
      "吃饭"
    ],
    "targetWords": [
      {
        "hanzi": "餐厅",
        "pinyin": "cāntīng",
        "meaning": "Nhà hàng, phòng ăn"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_29",
    "level": 4,
    "targetSentence": "我的作业差不多做完了。",
    "cleanSentence": "我的作业差不多做完了",
    "pinyin": "Wǒ de zuòyè chàbuduō zuò wán le.",
    "translation": "Bài tập của tôi gần như đã làm xong rồi.",
    "segments": [
      "我的",
      "作业",
      "差不多",
      "做",
      "完了"
    ],
    "targetWords": [
      {
        "hanzi": "差不多",
        "pinyin": "chàbuduō",
        "meaning": "Xấp xỉ, tương đương, gần như"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_30",
    "level": 4,
    "targetSentence": "不到长城非好汉。",
    "cleanSentence": "不到长城非好汉",
    "pinyin": "Bú dào Chángchéng fēi hǎohàn.",
    "translation": "Bất đáo Trường Thành phi hảo hán.",
    "segments": [
      "不到",
      "长城",
      "非",
      "好汉"
    ],
    "targetWords": [
      {
        "hanzi": "长城",
        "pinyin": "Chángchéng",
        "meaning": "Vạn Lý Trường Thành"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_31",
    "level": 4,
    "targetSentence": "长江是中国第一大河。",
    "cleanSentence": "长江是中国第一大河",
    "pinyin": "Cháng Jiāng shì Zhōngguó dì-yī dà hé.",
    "translation": "Trường Giang là con sông lớn nhất Trung Quốc.",
    "segments": [
      "长江",
      "是",
      "中国",
      "第一",
      "大河"
    ],
    "targetWords": [
      {
        "hanzi": "长江",
        "pinyin": "Cháng Jiāng",
        "meaning": "Sông Trường Giang"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_32",
    "level": 4,
    "targetSentence": "你尝尝这道菜味道怎么样。",
    "cleanSentence": "你尝尝这道菜味道怎么样",
    "pinyin": "Nǐ chángchang zhè dào cài wèidào zěnmeyàng.",
    "translation": "Bạn nếm thử xem món ăn này vị thế nào.",
    "segments": [
      "你尝尝这",
      "道",
      "菜",
      "味",
      "道怎么样"
    ],
    "targetWords": [
      {
        "hanzi": "尝",
        "pinyin": "cháng",
        "meaning": "Nếm thử"
      },
      {
        "hanzi": "菜",
        "pinyin": "cài",
        "meaning": "Món ăn, rau"
      }
    ],
    "grammarTip": "Đại từ nghi vấn (什么/谁/哪儿/怎么) đứng tại vị trí của thành phần cần hỏi"
  },
  {
    "id": "scramble_hsk4_33",
    "level": 4,
    "targetSentence": "昨天看了一场精彩的球赛。",
    "cleanSentence": "昨天看了一场精彩的球赛",
    "pinyin": "Zuótiān kàn le yì chǎng jīngcǎi de qiúsài.",
    "translation": "Hôm qua tôi đã xem một trận bóng rất tuyệt.",
    "segments": [
      "昨天",
      "看了一场",
      "精",
      "彩的",
      "球赛"
    ],
    "targetWords": [
      {
        "hanzi": "场",
        "pinyin": "chǎng",
        "meaning": "Trận, buổi (lượng từ)"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_34",
    "level": 4,
    "targetSentence": "他的汉语水平已经超过了我。",
    "cleanSentence": "他的汉语水平已经超过了我",
    "pinyin": "Tā de Hànyǔ shuǐpíng yǐjīng chāoguò le wǒ.",
    "translation": "Trình độ tiếng Trung của anh ấy đã vượt qua tôi rồi.",
    "segments": [
      "他的",
      "汉语",
      "水平",
      "已经",
      "超过了我"
    ],
    "targetWords": [
      {
        "hanzi": "超过",
        "pinyin": "chāoguò",
        "meaning": "Vượt quá, vượt hơn"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_35",
    "level": 4,
    "targetSentence": "坚持不懈才能取得成功。",
    "cleanSentence": "坚持不懈才能取得成功",
    "pinyin": "Jiānchí bú xiè cái néng qǔdé chénggōng.",
    "translation": "Kiên trì không nản lòng mới có thể đạt được thành công.",
    "segments": [
      "坚持",
      "不懈",
      "才",
      "能",
      "取得成功"
    ],
    "targetWords": [
      {
        "hanzi": "成功",
        "pinyin": "chénggōng",
        "meaning": "Thành công"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_36",
    "level": 4,
    "targetSentence": "经过努力，他成为了一名翻译。",
    "cleanSentence": "经过努力他成为了一名翻译",
    "pinyin": "Jīngguò nǔlì, tā chéngwéi le yì míng fānyì.",
    "translation": "Qua nỗ lực, anh ấy đã trở thành một phiên dịch viên.",
    "segments": [
      "经过",
      "努力他",
      "成为了",
      "一",
      "名翻译"
    ],
    "targetWords": [
      {
        "hanzi": "成为",
        "pinyin": "chéngwéi",
        "meaning": "Trở thành"
      },
      {
        "hanzi": "翻译",
        "pinyin": "fānyì",
        "meaning": "Dịch, phiên dịch viên"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_37",
    "level": 4,
    "targetSentence": "做人最重要的品质是诚实。",
    "cleanSentence": "做人最重要的品质是诚实",
    "pinyin": "Zuò rén zuì zhòngyào de pǐnzhì shì chéngshí.",
    "translation": "Phẩm chất quan trọng nhất của con người là sự trung thực.",
    "segments": [
      "做人",
      "最重要的",
      "品",
      "质",
      "是诚实"
    ],
    "targetWords": [
      {
        "hanzi": "诚实",
        "pinyin": "chéngshí",
        "meaning": "Thành thật, trung thực"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk4_38",
    "level": 4,
    "targetSentence": "秋天果子成熟了。",
    "cleanSentence": "秋天果子成熟了",
    "pinyin": "Qiūtiān guǒzi chéngshú le.",
    "translation": "Mùa thu hoa quả đã chín rộ.",
    "segments": [
      "秋",
      "天",
      "果",
      "子",
      "成熟了"
    ],
    "targetWords": [
      {
        "hanzi": "成熟",
        "pinyin": "chéngshú",
        "meaning": "Chín chắn, trưởng thành"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_39",
    "level": 4,
    "targetSentence": "爸爸下周要去上海出差。",
    "cleanSentence": "爸爸下周要去上海出差",
    "pinyin": "Bàba xià zhōu yào qù Shànghǎi chūchāi.",
    "translation": "Bố tuần sau sẽ đi Thượng Hải công tác.",
    "segments": [
      "爸爸下",
      "周",
      "要",
      "去上",
      "海出差"
    ],
    "targetWords": [
      {
        "hanzi": "出差",
        "pinyin": "chūchāi",
        "meaning": "Đi công tác"
      },
      {
        "hanzi": "爸爸",
        "pinyin": "bàba",
        "meaning": "Bố, cha"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_40",
    "level": 4,
    "targetSentence": "明天早上七点准时出发。",
    "cleanSentence": "明天早上七点准时出发",
    "pinyin": "Míngtiān zǎoshang qī diǎn zhǔnshí chūfā.",
    "translation": "Sáng mai đúng 7 giờ sẽ xuất phát.",
    "segments": [
      "明天",
      "早上七",
      "点",
      "准",
      "时出发"
    ],
    "targetWords": [
      {
        "hanzi": "出发",
        "pinyin": "chūfā",
        "meaning": "Xuất phát, khởi hành"
      },
      {
        "hanzi": "点",
        "pinyin": "diǎn",
        "meaning": "Giờ, chút ít"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_41",
    "level": 4,
    "targetSentence": "他在河内出生并长大。",
    "cleanSentence": "他在河内出生并长大",
    "pinyin": "Tā zài Hénèi chūshēng bìng zhǎngdà.",
    "translation": "Anh ấy sinh ra và lớn lên ở Hà Nội.",
    "segments": [
      "他在河",
      "内",
      "出生",
      "并",
      "长大"
    ],
    "targetWords": [
      {
        "hanzi": "出生",
        "pinyin": "chūshēng",
        "meaning": "Sinh ra"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_42",
    "level": 4,
    "targetSentence": "请把这份文件传真给我。",
    "cleanSentence": "请把这份文件传真给我",
    "pinyin": "Qǐng bǎ zhè fèn wénjiàn chuánzhēn gěi wǒ.",
    "translation": "Xin hãy fax tài liệu này cho tôi.",
    "segments": [
      "请把这份",
      "文",
      "件",
      "传真",
      "给我"
    ],
    "targetWords": [
      {
        "hanzi": "传真",
        "pinyin": "chuánzhēn",
        "meaning": "Bản fax, gửi fax"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk4_43",
    "level": 4,
    "targetSentence": "请打开窗户让空气流通。",
    "cleanSentence": "请打开窗户让空气流通",
    "pinyin": "Qǐng dǎkāi chuānghu ràng kōngqì liútōng.",
    "translation": "Làm ơn mở cửa sổ cho không khí lưu thông.",
    "segments": [
      "请打开",
      "窗户让",
      "空",
      "气",
      "流通"
    ],
    "targetWords": [
      {
        "hanzi": "窗户",
        "pinyin": "chuānghu",
        "meaning": "Cửa sổ"
      },
      {
        "hanzi": "开",
        "pinyin": "kāi",
        "meaning": "Mở, lái (xe)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_44",
    "level": 4,
    "targetSentence": "请用这个生词词语造句。",
    "cleanSentence": "请用这个生词词语造句",
    "pinyin": "Qǐng yòng zhège shēngcí cíyǔ zàojù.",
    "translation": "Xin hãy dùng từ ngữ mới này đặt câu.",
    "segments": [
      "请用这个",
      "生",
      "词",
      "词语",
      "造句"
    ],
    "targetWords": [
      {
        "hanzi": "词语",
        "pinyin": "cíyǔ",
        "meaning": "Từ ngữ"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_45",
    "level": 4,
    "targetSentence": "他上班从来不迟到。",
    "cleanSentence": "他上班从来不迟到",
    "pinyin": "Tā shàngbān cónglái bù chídào.",
    "translation": "Anh ấy đi làm từ trước đến nay chưa từng đi trễ.",
    "segments": [
      "他",
      "上",
      "班",
      "从来",
      "不迟到"
    ],
    "targetWords": [
      {
        "hanzi": "从来",
        "pinyin": "cónglái",
        "meaning": "Từ trước đến nay"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_46",
    "level": 4,
    "targetSentence": "考试的时候千万不能粗心。",
    "cleanSentence": "考试的时候千万不能粗心",
    "pinyin": "Kǎoshì de shíhou qiānwàn bù néng cūxīn.",
    "translation": "Khi làm bài thi tuyệt đối không được sơ suất.",
    "segments": [
      "考试的",
      "时候",
      "千",
      "万",
      "不能粗心"
    ],
    "targetWords": [
      {
        "hanzi": "粗心",
        "pinyin": "cūxīn",
        "meaning": "Bất cẩn, sơ ý"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_47",
    "level": 4,
    "targetSentence": "我去银行存钱。",
    "cleanSentence": "我去银行存钱",
    "pinyin": "Wǒ qù yínháng cún qián.",
    "translation": "Tôi đi ngân hàng gửi tiền.",
    "segments": [
      "我",
      "去银行",
      "存",
      "钱"
    ],
    "targetWords": [
      {
        "hanzi": "存",
        "pinyin": "cún",
        "meaning": "Gửi (tiền), lưu trữ"
      },
      {
        "hanzi": "钱",
        "pinyin": "qián",
        "meaning": "Tiền"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_48",
    "level": 4,
    "targetSentence": "从错误中吸取经验教训。",
    "cleanSentence": "从错误中吸取经验教训",
    "pinyin": "Cóng cuòwù zhōng xīqǔ jīngyàn jiàoxun.",
    "translation": "Rút ra bài học kinh nghiệm từ những lỗi sai.",
    "segments": [
      "从错误中吸",
      "取",
      "经",
      "验",
      "教训"
    ],
    "targetWords": [
      {
        "hanzi": "错误",
        "pinyin": "cuòwù",
        "meaning": "Sai sót, lỗi sai"
      },
      {
        "hanzi": "从",
        "pinyin": "cóng",
        "meaning": "Từ (nơi chốn/thời gian)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_49",
    "level": 4,
    "targetSentence": "这道题的标准答案是什么？",
    "cleanSentence": "这道题的标准答案是什么",
    "pinyin": "Zhè dào tí de biāozhǔn dá'àn shì shénme?",
    "translation": "Đáp án chuẩn của câu này là gì?",
    "segments": [
      "这道",
      "题的标",
      "准",
      "答案",
      "是什么"
    ],
    "targetWords": [
      {
        "hanzi": "答案",
        "pinyin": "dá'àn",
        "meaning": "Đáp án, câu trả lời"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk4_50",
    "level": 4,
    "targetSentence": "她今天打扮得非常漂亮。",
    "cleanSentence": "她今天打扮得非常漂亮",
    "pinyin": "Tā jīntiān dǎban de fēicháng piàoliang.",
    "translation": "Hôm nay cô ấy ăn mặc trang điểm rất xinh.",
    "segments": [
      "她",
      "今天",
      "打扮得",
      "非常漂亮"
    ],
    "targetWords": [
      {
        "hanzi": "打扮",
        "pinyin": "dǎban",
        "meaning": "Trang điểm, ăn diện"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_51",
    "level": 4,
    "targetSentence": "对不起，打扰你休息了。",
    "cleanSentence": "对不起打扰你休息了",
    "pinyin": "Duìbuqǐ, dǎrǎo nǐ xiūxi le.",
    "translation": "Xin lỗi, đã làm phiền bạn nghỉ ngơi rồi.",
    "segments": [
      "对不起",
      "打扰",
      "你",
      "休息了"
    ],
    "targetWords": [
      {
        "hanzi": "打扰",
        "pinyin": "dǎrǎo",
        "meaning": "Làm phiền"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_52",
    "level": 4,
    "targetSentence": "请帮我打印这份文件。",
    "cleanSentence": "请帮我打印这份文件",
    "pinyin": "Qǐng bāng wǒ dǎyìn zhè fèn wénjiàn.",
    "translation": "Xin giúp tôi in tài liệu này.",
    "segments": [
      "请帮我",
      "打印",
      "这",
      "份",
      "文件"
    ],
    "targetWords": [
      {
        "hanzi": "打印",
        "pinyin": "dǎyìn",
        "meaning": "In ấn, in ra"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_53",
    "level": 4,
    "targetSentence": "商场周年庆全场打折。",
    "cleanSentence": "商场周年庆全场打折",
    "pinyin": "Shāngchǎng zhōuniánqìng quánchǎng dǎzhé.",
    "translation": "Trung tâm thương mại kỷ niệm đang giảm giá toàn bộ.",
    "segments": [
      "商场周",
      "年",
      "庆",
      "全",
      "场打折"
    ],
    "targetWords": [
      {
        "hanzi": "打折",
        "pinyin": "dǎzhé",
        "meaning": "Giảm giá, chiết khấu"
      },
      {
        "hanzi": "场",
        "pinyin": "chǎng",
        "meaning": "Trận, buổi (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_54",
    "level": 4,
    "targetSentence": "生病了要去医院打针吃药。",
    "cleanSentence": "生病了要去医院打针吃药",
    "pinyin": "Shēngbìng le yào qù yīyuàn dǎzhēn chī yào.",
    "translation": "Bị bệnh cần đi bệnh viện tiêm và uống thuốc.",
    "segments": [
      "生病了",
      "要",
      "去医院",
      "打针",
      "吃药"
    ],
    "targetWords": [
      {
        "hanzi": "打针",
        "pinyin": "dǎzhēn",
        "meaning": "Tiêm thuốc, chích thuốc"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_55",
    "level": 4,
    "targetSentence": "他大概半小时后能到达。",
    "cleanSentence": "他大概半小时后能到达",
    "pinyin": "Tā dàgài bàn xiǎoshí hòu néng dàodá.",
    "translation": "Anh ấy độ chừng nửa tiếng nữa sẽ đến nơi.",
    "segments": [
      "他大概半",
      "小时",
      "后",
      "能",
      "到达"
    ],
    "targetWords": [
      {
        "hanzi": "大概",
        "pinyin": "dàgài",
        "meaning": "Khoảng, độ chừng"
      },
      {
        "hanzi": "能",
        "pinyin": "néng",
        "meaning": "Có thể, có khả năng"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_56",
    "level": 4,
    "targetSentence": "去大使馆办理签证手续。",
    "cleanSentence": "去大使馆办理签证手续",
    "pinyin": "Qù dàshǐguǎn bànlǐ qiānzhèng shǒuxù.",
    "translation": "Đến đại sứ quán làm thủ tục visa.",
    "segments": [
      "去大使馆办",
      "理",
      "签",
      "证",
      "手续"
    ],
    "targetWords": [
      {
        "hanzi": "大使馆",
        "pinyin": "dàshǐguǎn",
        "meaning": "Đại sứ quán"
      },
      {
        "hanzi": "去",
        "pinyin": "qù",
        "meaning": "Đi"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_57",
    "level": 4,
    "targetSentence": "这本词典大约有八百页。",
    "cleanSentence": "这本词典大约有八百页",
    "pinyin": "Zhè běn cídiǎn dàyuē yǒu bā bǎi yè.",
    "translation": "Cuốn từ điển này khoảng chừng có 800 trang.",
    "segments": [
      "这本",
      "词典",
      "大约有",
      "八",
      "百页"
    ],
    "targetWords": [
      {
        "hanzi": "大约",
        "pinyin": "dàyuē",
        "meaning": "Khoảng chừng"
      },
      {
        "hanzi": "八",
        "pinyin": "bā",
        "meaning": "Số 8"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_58",
    "level": 4,
    "targetSentence": "李大夫医术非常高明。",
    "cleanSentence": "李大夫医术非常高明",
    "pinyin": "Lǐ dàifu yīshù fēicháng gāomíng.",
    "translation": "Bác sĩ Lý y thuật rất cao minh.",
    "segments": [
      "李大夫",
      "医",
      "术",
      "非常",
      "高明"
    ],
    "targetWords": [
      {
        "hanzi": "大夫",
        "pinyin": "dàifu",
        "meaning": "Bác sĩ"
      },
      {
        "hanzi": "非常",
        "pinyin": "fēicháng",
        "meaning": "Rất, vô cùng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_59",
    "level": 4,
    "targetSentence": "冬天出门戴上帽子和手套。",
    "cleanSentence": "冬天出门戴上帽子和手套",
    "pinyin": "Dōngtiān chūmén dài shàng màozi hé shǒutào.",
    "translation": "Mùa đông ra ngoài hãy đội mũ và đeo găng tay.",
    "segments": [
      "冬天出门戴",
      "上",
      "帽子",
      "和",
      "手套"
    ],
    "targetWords": [
      {
        "hanzi": "戴",
        "pinyin": "dài",
        "meaning": "Đeo, đội (mũ, kính, đồng hồ)"
      },
      {
        "hanzi": "和",
        "pinyin": "hé",
        "meaning": "Và, cùng với"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_60",
    "level": 4,
    "targetSentence": "公园里到处都是欢声笑语。",
    "cleanSentence": "公园里到处都是欢声笑语",
    "pinyin": "Gōngyuán lǐ dàochù dōu shì huānshēng xiàoyǔ.",
    "translation": "Trong công viên khắp nơi đều tràn ngập tiếng cười nói.",
    "segments": [
      "公园里",
      "到处",
      "都是欢",
      "声",
      "笑语"
    ],
    "targetWords": [
      {
        "hanzi": "到处",
        "pinyin": "dàochù",
        "meaning": "Khắp nơi, mọi nơi"
      },
      {
        "hanzi": "都",
        "pinyin": "dōu",
        "meaning": "Đều, tất cả"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_61",
    "level": 4,
    "targetSentence": "你到底在想什么呢？",
    "cleanSentence": "你到底在想什么呢",
    "pinyin": "Nǐ dàodǐ zài xiǎng shénme ne?",
    "translation": "Rốt cuộc bạn đang nghĩ gì thế?",
    "segments": [
      "你",
      "到底",
      "在想",
      "什么呢"
    ],
    "targetWords": [
      {
        "hanzi": "到底",
        "pinyin": "dàodǐ",
        "meaning": "Rốt cuộc, cuối cùng"
      },
      {
        "hanzi": "呢",
        "pinyin": "ne",
        "meaning": "Thế, còn... thì sao?"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_62",
    "level": 4,
    "targetSentence": "做错了事应该真诚道歉。",
    "cleanSentence": "做错了事应该真诚道歉",
    "pinyin": "Zuò cuò le shì yīnggāi zhēnchéng dàoqiàn.",
    "translation": "Làm sai việc thì nên chân thành xin lỗi.",
    "segments": [
      "做",
      "错了",
      "事",
      "应该",
      "真诚道歉"
    ],
    "targetWords": [
      {
        "hanzi": "道歉",
        "pinyin": "dàoqiàn",
        "meaning": "Xin lỗi"
      },
      {
        "hanzi": "了",
        "pinyin": "le",
        "meaning": "Rồi (hoàn thành/thay đổi)"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_63",
    "level": 4,
    "targetSentence": "考了好成绩也别太得意。",
    "cleanSentence": "考了好成绩也别太得意",
    "pinyin": "Kǎo le hǎo chéngjì yě bié tài déyì.",
    "translation": "Thi đạt điểm cao cũng đừng quá đắc chí.",
    "segments": [
      "考了好",
      "成",
      "绩",
      "也别",
      "太得意"
    ],
    "targetWords": [
      {
        "hanzi": "得意",
        "pinyin": "déyì",
        "meaning": "Đắc ý, tự mãn"
      },
      {
        "hanzi": "好",
        "pinyin": "hǎo",
        "meaning": "Tốt, đẹp, khỏe, được"
      }
    ],
    "grammarTip": "Bổ ngữ trạng thái: Động từ + 得 + Tính từ / Cụm miêu tả"
  },
  {
    "id": "scramble_hsk4_64",
    "level": 4,
    "targetSentence": "请拿好您的护照和登机牌。",
    "cleanSentence": "请拿好您的护照和登机牌",
    "pinyin": "Qǐng ná hǎo nín de hùzhào hé dēngjīpái.",
    "translation": "Xin cầm chắc hộ chiếu và thẻ lên máy bay của quý khách.",
    "segments": [
      "请拿",
      "好",
      "您的",
      "护照",
      "和登机牌"
    ],
    "targetWords": [
      {
        "hanzi": "登机牌",
        "pinyin": "dēngjīpái",
        "meaning": "Thẻ lên máy bay"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_65",
    "level": 4,
    "targetSentence": "月底我们要进行一次测试。",
    "cleanSentence": "月底我们要进行一次测试",
    "pinyin": "Yuèdǐ wǒmen yào jìnxíng yí cì cèshì.",
    "translation": "Cuối tháng chúng tôi sẽ tiến hành một bài kiểm tra.",
    "segments": [
      "月底",
      "我们要进行",
      "一",
      "次",
      "测试"
    ],
    "targetWords": [
      {
        "hanzi": "底",
        "pinyin": "dǐ",
        "meaning": "Đáy, cuối (tháng/năm)"
      },
      {
        "hanzi": "我",
        "pinyin": "wǒ",
        "meaning": "Tôi, tao, mình"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_66",
    "level": 4,
    "targetSentence": "地球是我们共同的家园。",
    "cleanSentence": "地球是我们共同的家园",
    "pinyin": "Dìqiú shì wǒmen gòngtóng de jiāyuán.",
    "translation": "Trái Đất là ngôi nhà chung của chúng ta.",
    "segments": [
      "地球",
      "是",
      "我们",
      "共同的",
      "家园"
    ],
    "targetWords": [
      {
        "hanzi": "地球",
        "pinyin": "dìqiú",
        "meaning": "Trái đất"
      },
      {
        "hanzi": "共同",
        "pinyin": "gòngtóng",
        "meaning": "Chung, cùng nhau"
      }
    ],
    "grammarTip": "Cấu trúc nhấn mạnh: 是 ... 的 (nhấn mạnh thời gian, địa điểm, cách thức)"
  },
  {
    "id": "scramble_hsk4_67",
    "level": 4,
    "targetSentence": "请把你的家庭详细地址发给我。",
    "cleanSentence": "请把你的家庭详细地址发给我",
    "pinyin": "Qǐng bǎ nǐ de jiātíng xiángxì dìzhǐ fā gěi wǒ.",
    "translation": "Làm ơn gửi địa chỉ chi tiết nhà bạn cho tôi.",
    "segments": [
      "请把你的家庭详",
      "细",
      "地址",
      "发",
      "给我"
    ],
    "targetWords": [
      {
        "hanzi": "地址",
        "pinyin": "dìzhǐ",
        "meaning": "Địa chỉ"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk4_68",
    "level": 4,
    "targetSentence": "进行一项市场调查研究。",
    "cleanSentence": "进行一项市场调查研究",
    "pinyin": "Jìnxíng yí xiàng shìchǎng diàochá yánjiū.",
    "translation": "Tiến hành một cuộc điều tra khảo sát thị trường.",
    "segments": [
      "进行一项",
      "市",
      "场",
      "调查",
      "研究"
    ],
    "targetWords": [
      {
        "hanzi": "调查",
        "pinyin": "diàochá",
        "meaning": "Điều tra, khảo sát"
      },
      {
        "hanzi": "场",
        "pinyin": "chǎng",
        "meaning": "Trận, buổi (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_69",
    "level": 4,
    "targetSentence": "钥匙掉在地上捡起来。",
    "cleanSentence": "钥匙掉在地上捡起来",
    "pinyin": "Yàoshi diào zài dì shang jiǎn qǐlai.",
    "translation": "Chìa khóa rơi trên mặt đất nhặt lên.",
    "segments": [
      "钥匙掉",
      "在地",
      "上",
      "捡",
      "起来"
    ],
    "targetWords": [
      {
        "hanzi": "掉",
        "pinyin": "diào",
        "meaning": "Rơi, rớt"
      },
      {
        "hanzi": "来",
        "pinyin": "lái",
        "meaning": "Đến, tới"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk4_70",
    "level": 4,
    "targetSentence": "他不小心把钱包弄丢了。",
    "cleanSentence": "他不小心把钱包弄丢了",
    "pinyin": "Tā bù xiǎoxīn bǎ qiánbāo nòng diū le.",
    "translation": "Anh ấy bất cẩn làm mất ví tiền rồi.",
    "segments": [
      "他不",
      "小心",
      "把钱包",
      "弄",
      "丢了"
    ],
    "targetWords": [
      {
        "hanzi": "丢",
        "pinyin": "diū",
        "meaning": "Mất, thất lạc"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk4_71",
    "level": 4,
    "targetSentence": "下班高峰期经常容易堵车。",
    "cleanSentence": "下班高峰期经常容易堵车",
    "pinyin": "Xiàbān gāofēngqī jīngcháng róngyì dǔchē.",
    "translation": "Giờ cao điểm tan tầm rất hay bị kẹt xe.",
    "segments": [
      "下班高",
      "峰",
      "期",
      "经常",
      "容易堵车"
    ],
    "targetWords": [
      {
        "hanzi": "堵车",
        "pinyin": "dǔchē",
        "meaning": "Kẹt xe, tắc đường"
      },
      {
        "hanzi": "下",
        "pinyin": "xià",
        "meaning": "Dưới, xuống"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_72",
    "level": 4,
    "targetSentence": "吃坏东西肚子疼去看医生。",
    "cleanSentence": "吃坏东西肚子疼去看医生",
    "pinyin": "Chī huài dōngxi dùzi téng qù kàn yīshēng.",
    "translation": "Ăn đồ hỏng đau bụng phải đi khám bác sĩ.",
    "segments": [
      "吃坏",
      "东西",
      "肚子",
      "疼",
      "去看医生"
    ],
    "targetWords": [
      {
        "hanzi": "肚子",
        "pinyin": "dùzi",
        "meaning": "Bụng"
      },
      {
        "hanzi": "吃",
        "pinyin": "chī",
        "meaning": "Ăn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_73",
    "level": 4,
    "targetSentence": "收到一条重要短信通知。",
    "cleanSentence": "收到一条重要短信通知",
    "pinyin": "Shōudào yì tiáo zhòngyào duǎnxìn tōngzhī.",
    "translation": "Nhận được một tin nhắn thông báo quan trọng.",
    "segments": [
      "收到一",
      "条",
      "重要",
      "短信",
      "通知"
    ],
    "targetWords": [
      {
        "hanzi": "短信",
        "pinyin": "duǎnxìn",
        "meaning": "Tin nhắn SMS"
      },
      {
        "hanzi": "一",
        "pinyin": "yī",
        "meaning": "Số 1"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_74",
    "level": 4,
    "targetSentence": "两人用汉语进行生动对话。",
    "cleanSentence": "两人用汉语进行生动对话",
    "pinyin": "Liǎng rén yòng Hànyǔ jìnxíng shēngdòng duìhuà.",
    "translation": "Hai người dùng tiếng Trung tiến hành đoạn hội thoại sinh động.",
    "segments": [
      "两人用",
      "汉语进",
      "行",
      "生",
      "动对话"
    ],
    "targetWords": [
      {
        "hanzi": "对话",
        "pinyin": "duìhuà",
        "meaning": "Đối thoại, hội thoại"
      },
      {
        "hanzi": "汉语",
        "pinyin": "Hànyǔ",
        "meaning": "Tiếng Trung, tiếng Hán"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_75",
    "level": 4,
    "targetSentence": "六月一日是国际儿童节。",
    "cleanSentence": "六月一日是国际儿童节",
    "pinyin": "Liù yuè yī rì shì Guójì Értóngjié.",
    "translation": "Ngày 1 tháng 6 là ngày Quốc tế Thiếu nhi.",
    "segments": [
      "六月一",
      "日",
      "是",
      "国际",
      "儿童节"
    ],
    "targetWords": [
      {
        "hanzi": "儿童",
        "pinyin": "értóng",
        "meaning": "Trẻ em, nhi đồng"
      },
      {
        "hanzi": "国际",
        "pinyin": "guójì",
        "meaning": "Quốc tế"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_76",
    "level": 4,
    "targetSentence": "人人都要自觉遵守国家法律。",
    "cleanSentence": "人人都要自觉遵守国家法律",
    "pinyin": "Rénrén dōu yào zìjué zūnshǒu guójiā fǎlǜ.",
    "translation": "Mọi người đều phải tự giác tuân thủ pháp luật nhà nước.",
    "segments": [
      "人人",
      "都要自觉",
      "遵",
      "守",
      "国家法律"
    ],
    "targetWords": [
      {
        "hanzi": "法律",
        "pinyin": "fǎlǜ",
        "meaning": "Pháp luật"
      },
      {
        "hanzi": "都",
        "pinyin": "dōu",
        "meaning": "Đều, tất cả"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_77",
    "level": 4,
    "targetSentence": "请把这段中文翻译成越南语。",
    "cleanSentence": "请把这段中文翻译成越南语",
    "pinyin": "Qǐng bǎ zhè duàn Zhōngwén fānyì chéng Yuènányǔ.",
    "translation": "Làm ơn dịch đoạn tiếng Trung này sang tiếng Việt.",
    "segments": [
      "请把这段",
      "中文",
      "翻译成",
      "越",
      "南语"
    ],
    "targetWords": [
      {
        "hanzi": "翻译",
        "pinyin": "fānyì",
        "meaning": "Dịch, phiên dịch viên"
      },
      {
        "hanzi": "请",
        "pinyin": "qǐng",
        "meaning": "Mời, xin, làm ơn"
      }
    ],
    "grammarTip": "Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác"
  },
  {
    "id": "scramble_hsk4_78",
    "level": 4,
    "targetSentence": "遇到烦恼多找朋友聊聊天。",
    "cleanSentence": "遇到烦恼多找朋友聊聊天",
    "pinyin": "Yùdào fánnǎo duō zhǎo péngyou liáoliao tiān.",
    "translation": "Gặp chuyện phiền muộn hãy tìm bạn bè tâm sự.",
    "segments": [
      "遇到",
      "烦恼多",
      "找",
      "朋友",
      "聊聊天"
    ],
    "targetWords": [
      {
        "hanzi": "烦恼",
        "pinyin": "fánnǎo",
        "meaning": "Phiền muộn, buồn rầu"
      },
      {
        "hanzi": "多",
        "pinyin": "duō",
        "meaning": "Nhiều, bao nhiêu"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_79",
    "level": 4,
    "targetSentence": "大家都赞成，没有人反对。",
    "cleanSentence": "大家都赞成没有人反对",
    "pinyin": "Dàjiā dōu zànchéng, méiyǒu rén fǎnduì.",
    "translation": "Mọi người đều tán thành, không có ai phản đối.",
    "segments": [
      "大家",
      "都赞",
      "成",
      "没有",
      "人反对"
    ],
    "targetWords": [
      {
        "hanzi": "反对",
        "pinyin": "fǎnduì",
        "meaning": "Phản đối"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_80",
    "level": 4,
    "targetSentence": "找到正确的学习方法事半功倍。",
    "cleanSentence": "找到正确的学习方法事半功倍",
    "pinyin": "Zhǎodào zhèngquè de xuéxí fāngfǎ shìbàngōngbèi.",
    "translation": "Tìm được phương pháp học đúng đắn sẽ nhân đôi hiệu quả.",
    "segments": [
      "找到正",
      "确的",
      "学习",
      "方法事半",
      "功倍"
    ],
    "targetWords": [
      {
        "hanzi": "方法",
        "pinyin": "fāngfǎ",
        "meaning": "Phương pháp, cách thức"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_81",
    "level": 4,
    "targetSentence": "朝着正确的方向不断努力。",
    "cleanSentence": "朝着正确的方向不断努力",
    "pinyin": "Cháozhe zhèngquè de fāngxiàng búduàn nǔlì.",
    "translation": "Hướng về phương hướng đúng đắn không ngừng nỗ lực.",
    "segments": [
      "朝着",
      "正",
      "确的",
      "方向",
      "不断努力"
    ],
    "targetWords": [
      {
        "hanzi": "方向",
        "pinyin": "fāngxiàng",
        "meaning": "Phương hướng"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trợ từ động thái 着: Biểu thị động tác hoặc trạng thái đang tiếp diễn"
  },
  {
    "id": "scramble_hsk4_82",
    "level": 4,
    "targetSentence": "听听轻音乐放松一下心情。",
    "cleanSentence": "听听轻音乐放松一下心情",
    "pinyin": "Tīngting qīngyīnyuè fàngsōng yíxià xīnqíng.",
    "translation": "Nghe nhạc nhẹ để thư giãn tâm trạng một chút.",
    "segments": [
      "听听轻音",
      "乐",
      "放松",
      "一下",
      "心情"
    ],
    "targetWords": [
      {
        "hanzi": "放松",
        "pinyin": "fàngsōng",
        "meaning": "Thư giãn, thả lỏng"
      },
      {
        "hanzi": "听",
        "pinyin": "tīng",
        "meaning": "Nghe"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_83",
    "level": 4,
    "targetSentence": "这次去旅游的费用不高。",
    "cleanSentence": "这次去旅游的费用不高",
    "pinyin": "Zhè cì qù lǚyóu de fèiyòng bù gāo.",
    "translation": "Chi phí cho chuyến đi du lịch lần này không cao.",
    "segments": [
      "这",
      "次",
      "去旅游的",
      "费用",
      "不高"
    ],
    "targetWords": [
      {
        "hanzi": "费用",
        "pinyin": "fèiyòng",
        "meaning": "Chi phí"
      },
      {
        "hanzi": "不",
        "pinyin": "bù",
        "meaning": "Không, chẳng"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_84",
    "level": 4,
    "targetSentence": "他的汉语词汇量非常丰富。",
    "cleanSentence": "他的汉语词汇量非常丰富",
    "pinyin": "Tā de Hànyǔ cíhuìliàng fēicháng fēngfù.",
    "translation": "Vốn từ vựng tiếng Trung của anh ấy vô cùng phong phú.",
    "segments": [
      "他的",
      "汉语词",
      "汇",
      "量",
      "非常丰富"
    ],
    "targetWords": [
      {
        "hanzi": "丰富",
        "pinyin": "fēngfù",
        "meaning": "Phong phú, dồi dào"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_85",
    "level": 4,
    "targetSentence": "这项计划符合大家的要求。",
    "cleanSentence": "这项计划符合大家的要求",
    "pinyin": "Zhè xiàng jìhuà fúhé dàjiā de yāoqiú.",
    "translation": "Kế hoạch này phù hợp với yêu cầu của mọi người.",
    "segments": [
      "这项",
      "计",
      "划",
      "符合",
      "大家的要求"
    ],
    "targetWords": [
      {
        "hanzi": "符合",
        "pinyin": "fúhé",
        "meaning": "Phù hợp, ăn khớp"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_86",
    "level": 4,
    "targetSentence": "父亲教我做人要诚实正直。",
    "cleanSentence": "父亲教我做人要诚实正直",
    "pinyin": "Fùqīn jiāo wǒ zuò rén yào chéngshí zhèngzhí.",
    "translation": "Cha dạy tôi làm người phải trung thực và chính trực.",
    "segments": [
      "父亲教我做",
      "人",
      "要",
      "诚实",
      "正直"
    ],
    "targetWords": [
      {
        "hanzi": "父亲",
        "pinyin": "fùqīn",
        "meaning": "Bố, người cha"
      },
      {
        "hanzi": "诚实",
        "pinyin": "chéngshí",
        "meaning": "Thành thật, trung thực"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_87",
    "level": 4,
    "targetSentence": "请帮我复印两份这份材料。",
    "cleanSentence": "请帮我复印两份这份材料",
    "pinyin": "Qǐng bāng wǒ fùyìn liǎng fèn zhè fèn cáiliào.",
    "translation": "Làm ơn photocopy giúp tôi 2 bản tài liệu này.",
    "segments": [
      "请帮我",
      "复印两",
      "份",
      "这",
      "份材料"
    ],
    "targetWords": [
      {
        "hanzi": "复印",
        "pinyin": "fùyìn",
        "meaning": "Photocopy, sao chép"
      },
      {
        "hanzi": "材料",
        "pinyin": "cáiliào",
        "meaning": "Tài liệu, nguyên liệu"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_88",
    "level": 4,
    "targetSentence": "这个问题情况比较复杂。",
    "cleanSentence": "这个问题情况比较复杂",
    "pinyin": "Zhège wèntí qíngkuàng bǐjiào fùzá.",
    "translation": "Tình hình của vấn đề này tương đối phức tạp.",
    "segments": [
      "这个",
      "问题",
      "情",
      "况",
      "比较复杂"
    ],
    "targetWords": [
      {
        "hanzi": "复杂",
        "pinyin": "fùzá",
        "meaning": "Phức tạp, rắc rối"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Cấu trúc so sánh hơn: A + 比 + B + Tính từ / Cụm vị ngữ"
  },
  {
    "id": "scramble_hsk4_89",
    "level": 4,
    "targetSentence": "勤劳才能致富。",
    "cleanSentence": "勤劳才能致富",
    "pinyin": "Qínláo cái néng zhì fù.",
    "translation": "Cần cù mới có thể làm giàu.",
    "segments": [
      "勤",
      "劳",
      "才",
      "能",
      "致富"
    ],
    "targetWords": [
      {
        "hanzi": "富",
        "pinyin": "fù",
        "meaning": "Giàu có"
      },
      {
        "hanzi": "能",
        "pinyin": "néng",
        "meaning": "Có thể, có khả năng"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_90",
    "level": 4,
    "targetSentence": "知识能够改变一个人的命运。",
    "cleanSentence": "知识能够改变一个人的命运",
    "pinyin": "Zhīshi nénggòu gǎibiàn yí gè rén de mìngyùn.",
    "translation": "Tri thức có thể thay đổi vận mệnh của một con người.",
    "segments": [
      "知识能够",
      "改变一",
      "个",
      "人的",
      "命运"
    ],
    "targetWords": [
      {
        "hanzi": "改变",
        "pinyin": "gǎibiàn",
        "meaning": "Thay đổi, biến đổi"
      },
      {
        "hanzi": "够",
        "pinyin": "gòu",
        "meaning": "Đủ"
      }
    ],
    "grammarTip": "Động từ năng nguyện (想/要/会/能/可以) đứng trước động từ chính"
  },
  {
    "id": "scramble_hsk4_91",
    "level": 4,
    "targetSentence": "祝大家身体健康，干杯！",
    "cleanSentence": "祝大家身体健康干杯",
    "pinyin": "Zhù dàjiā shēntǐ jiànkāng, gānbēi!",
    "translation": "Chúc mọi người dồi dào sức khỏe, cạn ly!",
    "segments": [
      "祝",
      "大家",
      "身体",
      "健康干杯"
    ],
    "targetWords": [
      {
        "hanzi": "干杯",
        "pinyin": "gānbēi",
        "meaning": "Cạn ly, cạn chén"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_92",
    "level": 4,
    "targetSentence": "这部电影的故事深深感动了我。",
    "cleanSentence": "这部电影的故事深深感动了我",
    "pinyin": "Zhè bù diànyǐng de gùshi shēnshēn gǎndòng le wǒ.",
    "translation": "Câu chuyện trong bộ phim này đã làm tôi cảm động sâu sắc.",
    "segments": [
      "这部",
      "电影的",
      "故事深",
      "深",
      "感动了我"
    ],
    "targetWords": [
      {
        "hanzi": "感动",
        "pinyin": "gǎndòng",
        "meaning": "Cảm động"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_93",
    "level": 4,
    "targetSentence": "今天感觉身体非常舒服。",
    "cleanSentence": "今天感觉身体非常舒服",
    "pinyin": "Jīntiān gǎnjué shēntǐ fēicháng shūfu.",
    "translation": "Hôm nay tôi cảm thấy cơ thể rất thoải mái.",
    "segments": [
      "今天",
      "感觉",
      "身体",
      "非常舒服"
    ],
    "targetWords": [
      {
        "hanzi": "感觉",
        "pinyin": "gǎnjué",
        "meaning": "Cảm giác, cảm thấy"
      },
      {
        "hanzi": "今天",
        "pinyin": "jīntiān",
        "meaning": "Hôm nay"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_94",
    "level": 4,
    "targetSentence": "他们俩的兄弟感情十分深厚。",
    "cleanSentence": "他们俩的兄弟感情十分深厚",
    "pinyin": "Tāmen liǎ de xiōngdì gǎnqíng shífēn shēnhòu.",
    "translation": "Tình cảm anh em của hai người họ vô cùng sâu sắc.",
    "segments": [
      "他们",
      "俩的兄弟",
      "感情十",
      "分",
      "深厚"
    ],
    "targetWords": [
      {
        "hanzi": "感情",
        "pinyin": "gǎnqíng",
        "meaning": "Tình cảm"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_95",
    "level": 4,
    "targetSentence": "衷心感谢老师对我的帮助。",
    "cleanSentence": "衷心感谢老师对我的帮助",
    "pinyin": "Zhōngxīn gǎnxiè lǎoshī duì wǒ de bāngzhù.",
    "translation": "Chân thành cảm ơn sự giúp đỡ của thầy cô dành cho em.",
    "segments": [
      "衷心",
      "感谢",
      "老师",
      "对",
      "我的帮助"
    ],
    "targetWords": [
      {
        "hanzi": "感谢",
        "pinyin": "gǎnxiè",
        "meaning": "Cảm ơn, cảm tạ"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_96",
    "level": 4,
    "targetSentence": "汽车在宽阔的高速公路上行驶。",
    "cleanSentence": "汽车在宽阔的高速公路上行驶",
    "pinyin": "Qìchē zài kuānkuò de gāosù gōnglù shàng xíngshǐ.",
    "translation": "Ô tô đang chạy trên đường cao tốc rộng thênh thang.",
    "segments": [
      "汽车",
      "在宽",
      "阔的",
      "高速公路上",
      "行驶"
    ],
    "targetWords": [
      {
        "hanzi": "高速公路",
        "pinyin": "gāosù gōnglù",
        "meaning": "Đường cao tốc"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trạng ngữ nơi chốn: 在 + Địa điểm/Phương vị + Động từ"
  },
  {
    "id": "scramble_hsk4_97",
    "level": 4,
    "targetSentence": "每个月初公司准时发工资。",
    "cleanSentence": "每个月初公司准时发工资",
    "pinyin": "Měi gè yuèchū gōngsī zhǔnshí fā gōngzī.",
    "translation": "Mỗi đầu tháng công ty phát lương đúng hẹn.",
    "segments": [
      "每个月初",
      "公司",
      "准",
      "时",
      "发工资"
    ],
    "targetWords": [
      {
        "hanzi": "工资",
        "pinyin": "gōngzī",
        "meaning": "Tiền lương"
      },
      {
        "hanzi": "个",
        "pinyin": "gè",
        "meaning": "Cái, con, người (lượng từ)"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_98",
    "level": 4,
    "targetSentence": "中国少林功夫天下闻名。",
    "cleanSentence": "中国少林功夫天下闻名",
    "pinyin": "Zhōngguó Shàolín gōngfu tiānxià wénmíng.",
    "translation": "Võ thuật Thiếu Lâm Trung Quốc lừng danh thiên hạ.",
    "segments": [
      "中国少林",
      "功夫",
      "天",
      "下",
      "闻名"
    ],
    "targetWords": [
      {
        "hanzi": "功夫",
        "pinyin": "gōngfu",
        "meaning": "Võ thuật kungfu, công sức"
      },
      {
        "hanzi": "少",
        "pinyin": "shǎo",
        "meaning": "Ít"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  },
  {
    "id": "scramble_hsk4_99",
    "level": 4,
    "targetSentence": "为了共同的目标而携手努力。",
    "cleanSentence": "为了共同的目标而携手努力",
    "pinyin": "Wèile gòngtóng de mùbiāo ér xiéshǒu nǔlì.",
    "translation": "Vì mục tiêu chung mà cùng chung tay nỗ lực.",
    "segments": [
      "为了",
      "共同的目标",
      "而",
      "携",
      "手努力"
    ],
    "targetWords": [
      {
        "hanzi": "共同",
        "pinyin": "gòngtóng",
        "meaning": "Chung, cùng nhau"
      },
      {
        "hanzi": "的",
        "pinyin": "de",
        "meaning": "Của (sở hữu)"
      }
    ],
    "grammarTip": "Trợ từ ngữ khí 了: Biểu thị động tác đã hoàn thành hoặc trạng thái mới phát sinh"
  },
  {
    "id": "scramble_hsk4_100",
    "level": 4,
    "targetSentence": "周末去大型购物中心买衣服。",
    "cleanSentence": "周末去大型购物中心买衣服",
    "pinyin": "Zhōumò qù dàxíng gòuwù zhōngxīn mǎi yīfu.",
    "translation": "Cuối tuần đến trung tâm thương mại lớn mua sắm quần áo.",
    "segments": [
      "周末",
      "去大型",
      "购物中",
      "心",
      "买衣服"
    ],
    "targetWords": [
      {
        "hanzi": "购物",
        "pinyin": "gòuwù",
        "meaning": "Mua sắm"
      },
      {
        "hanzi": "大",
        "pinyin": "dà",
        "meaning": "To, lớn"
      }
    ],
    "grammarTip": "Trật tự câu cơ bản: Chủ ngữ (S) + Trạng ngữ (Thời gian/Địa điểm) + Động từ (V) + Tân ngữ (O)"
  }
];
