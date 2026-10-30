// Comprehensive HSK 1 & HSK 2 generator with 3 distinct example sentences per word
import fs from 'fs';

// Helper to sanitize and normalize Chinese text
const clean = (s) => s.trim().replace(/[。？！]/g, '');

// Predefined 3 examples dictionary for all key HSK 1 & 2 words
// Format: [word, pinyin, hanViet, meaning, type, category, [ [hz1, py1, vi1], [hz2, py2, vi2], [hz3, py3, vi3] ]]

const hsk1Data = [
  [
    "爱", "ài", "Ái", "Yêu, thích", "Động từ", "Cảm xúc",
    [
      ["我爱你。", "Wǒ ài nǐ.", "Tôi yêu bạn."],
      ["她很爱吃中国菜。", "Tā hěn ài chī Zhōngguó cài.", "Cô ấy rất thích ăn món Trung Quốc."],
      ["爸爸妈妈爱我们。", "Bàba māma ài wǒmen.", "Bố mẹ rất yêu chúng tôi."]
    ]
  ],
  [
    "八", "bā", "Bát", "Số 8", "Số từ", "Số đếm",
    [
      ["他有八本书。", "Tā yǒu bā běn shū.", "Anh ấy có 8 quyển sách."],
      ["八点半上课。", "Bā diǎn bàn shàngkè.", "8 giờ rưỡi vào học."],
      ["我八岁了。", "Wǒ bā suì le.", "Tôi 8 tuổi rồi."]
    ]
  ],
  [
    "爸爸", "bàba", "Ba ba", "Bố, cha", "Danh từ", "Gia đình",
    [
      ["我爸爸是医生。", "Wǒ bàba shì yīshēng.", "Bố tôi là bác sĩ."],
      ["爸爸喜欢喝茶。", "Bàba xǐhuan hē chá.", "Bố thích uống trà."],
      ["这是我爸爸的车。", "Zhè shì wǒ bàba de chē.", "Đây là xe của bố tôi."]
    ]
  ],
  [
    "杯子", "bēizi", "Bôi tử", "Cái cốc, ly", "Danh từ", "Đồ vật",
    [
      ["杯子里有水。", "Bēizi lǐ yǒu shuǐ.", "Trong cốc có nước."],
      ["这个杯子很漂亮。", "Zhège bēizi hěn piàoliang.", "Chiếc cốc này rất đẹp."],
      ["我想买一个新的杯子。", "Wǒ xiǎng mǎi yí gè xīn de bēizi.", "Tôi muốn mua một chiếc cốc mới."]
    ]
  ],
  [
    "北京", "Běijīng", "Bắc Kinh", "Bắc Kinh", "Danh từ", "Địa điểm",
    [
      ["我想去北京。", "Wǒ xiǎng qù Běijīng.", "Tôi muốn đi Bắc Kinh."],
      ["北京的天气很冷。", "Běijīng de tiānqì hěn lěng.", "Thời tiết Bắc Kinh rất lạnh."],
      ["他在北京大学学习。", "Tā zài Běijīng Dàxué xuéxí.", "Anh ấy học ở Đại học Bắc Kinh."]
    ]
  ],
  [
    "本", "běn", "Bản", "Cuốn, quyển (sách)", "Lượng từ", "Lượng từ",
    [
      ["这是一本书。", "Zhè shì yì běn shū.", "Đây là một cuốn sách."],
      ["我买了三本汉语书。", "Wǒ mǎi le sān běn Hànyǔ shū.", "Tôi đã mua ba quyển sách tiếng Trung."],
      ["那本书是谁的？", "Nà běn shū shì shéi de?", "Quyển sách đó là của ai vậy?"]
    ]
  ],
  [
    "不客气", "bú kèqi", "Bất khách khí", "Không có gì, đừng khách sáo", "Cụm từ", "Giao tiếp",
    [
      ["谢谢你！——不客气。", "Xièxie nǐ! —— Bú kèqi.", "Cảm ơn bạn! —— Không có gì."],
      ["请坐，别不客气。", "Qǐng zuò, bié bú kèqi.", "Mời ngồi, đừng khách sáo nhé."],
      ["不用谢，太不客气了。", "Bú yòng xiè, tài bú kèqi le.", "Không cần cảm ơn, khách sáo quá rồi."]
    ]
  ],
  [
    "不", "bù", "Bất", "Không, chẳng", "Phó từ", "Phủ định",
    [
      ["我不是老师。", "Wǒ bú shì lǎoshī.", "Tôi không phải là giáo viên."],
      ["他今天不去学校。", "Tā jīntiān bú qù xuéxiào.", "Hôm nay anh ấy không đến trường."],
      ["这个菜不好吃。", "Zhège cài bù hǎochī.", "Món ăn này không ngon."]
    ]
  ],
  [
    "菜", "cài", "Thái", "Món ăn, rau", "Danh từ", "Ăn uống",
    [
      ["中国菜很好吃。", "Zhōngguó cài hěn hǎochī.", "Món ăn Trung Quốc rất ngon."],
      ["妈妈做菜做得很好。", "Māma zuò cài zuò de hěn hǎo.", "Mẹ nấu món ăn rất ngon."],
      ["今天买了很多新鲜菜。", "Jīntiān mǎi le hěn duō xīnxiān cài.", "Hôm nay đã mua rất nhiều rau tươi."]
    ]
  ],
  [
    "茶", "chá", "Trà", "Trà, chè", "Danh từ", "Ăn uống",
    [
      ["请喝茶。", "Qǐng hē chá.", "Mời uống trà."],
      ["中国人喜欢喝热茶。", "Zhōngguórén xǐhuan hē rè chá.", "Người Trung Quốc thích uống trà nóng."],
      ["这杯茶很香。", "Zhè bēi chá hěn xiāng.", "Tách trà này rất thơm."]
    ]
  ],
  [
    "吃", "chī", "Ngật", "Ăn", "Động từ", "Ăn uống",
    [
      ["你想吃什么？", "Nǐ xiǎng chī shénme?", "Bạn muốn ăn gì?"],
      ["我们去吃米饭吧。", "Wǒmen qù chī mǐfàn ba.", "Chúng ta đi ăn cơm nhé."],
      ["他不吃苹果。", "Tā bù chī píngguǒ.", "Anh ấy không ăn táo."]
    ]
  ],
  [
    "出租车", "chūzūchē", "Xuất tô xa", "Xe taxi", "Danh từ", "Giao thông",
    [
      ["我们坐出租车去。", "Wǒmen zuò chūzūchē qù.", "Chúng ta đi bằng xe taxi nhé."],
      ["外面有一辆出租车。", "Wàimiàn yǒu yí liàng chūzūchē.", "Bên ngoài có một chiếc taxi."],
      ["开出租车的师傅很热情。", "Kāi chūzūchē de shīfu hěn rèqíng.", "Bác tài xế lái taxi rất nhiệt tình."]
    ]
  ],
  [
    "打电话", "dǎ diànhuà", "Đả điện thoại", "Gọi điện thoại", "Cụm động từ", "Giao tiếp",
    [
      ["他在给妈妈打电话。", "Tā zài gěi māma dǎ diànhuà.", "Anh ấy đang gọi điện thoại cho mẹ."],
      ["有空给我打电话。", "Yǒu kòng gěi wǒ dǎ diànhuà.", "Rảnh rỗi gọi điện thoại cho tôi nhé."],
      ["他正在打电话，请等一下。", "Tā zhèngzài dǎ diànhuà, qǐng děng yíxià.", "Anh ấy đang gọi điện, xin đợi một chút."]
    ]
  ],
  [
    "大", "dà", "Đại", "To, lớn", "Tính từ", "Miêu tả",
    [
      ["这个苹果很大。", "Zhège píngguǒ hěn dà.", "Quả táo này rất to."],
      ["学校的图书馆很大。", "Xuéxiào de túshūguǎn hěn dà.", "Thư viện của trường rất lớn."],
      ["外面下大雨了。", "Wàimiàn xià dà yǔ le.", "Bên ngoài trời mưa to rồi."]
    ]
  ],
  [
    "的", "de", "Đích", "Của (sở hữu)", "Trợ từ", "Ngữ pháp",
    [
      ["这是我的书。", "Zhè shì wǒ de shū.", "Đây là sách của tôi."],
      ["红色的衣服真好看。", "Hóngsè de yīfu zhēn hǎokàn.", "Bộ quần áo màu đỏ thật đẹp."],
      ["今天来的人是我的同学。", "Jīntiān lái de rén shì wǒ de tóngxué.", "Người đến hôm nay là bạn học của tôi."]
    ]
  ],
  [
    "点", "diǎn", "Điểm", "Giờ, chút ít", "Danh từ", "Thời gian",
    [
      ["现在三点。", "Xiànzài sān diǎn.", "Bây giờ là 3 giờ."],
      ["我想吃一点儿米饭。", "Wǒ xiǎng chī yìdiǎnr mǐfàn.", "Tôi muốn ăn một chút cơm."],
      ["明天早上七点见。", "Míngtiān zǎoshang qī diǎn jiàn.", "Sáng mai 7 giờ gặp nhé."]
    ]
  ],
  [
    "电脑", "diànnǎo", "Điện não", "Máy tính", "Danh từ", "Đồ vật",
    [
      ["他在用电脑工作。", "Tā zài yòng diànnǎo gōngzuò.", "Anh ấy đang dùng máy tính để làm việc."],
      ["我想买一台新电脑。", "Wǒ xiǎng mǎi yì tái xīn diànnǎo.", "Tôi muốn mua một chiếc máy tính mới."],
      ["电脑桌上有一本书。", "Diànnǎo zhuō shàng yǒu yì běn shū.", "Trên bàn máy tính có một cuốn sách."]
    ]
  ],
  [
    "电视", "diànshì", "Điện thị", "Tivi, truyền hình", "Danh từ", "Đồ vật",
    [
      ["我看电视。", "Wǒ kàn diànshì.", "Tôi xem tivi."],
      ["晚上我们一起看电视。", "Wǎnshang wǒmen yìqǐ kàn diànshì.", "Buổi tối chúng tôi cùng nhau xem tivi."],
      ["这台电视很好用。", "Zhè tái diànshì hěn hǎoyòng.", "Chiếc tivi này dùng rất tốt."]
    ]
  ],
  [
    "电影", "diànyǐng", "Điện ảnh", "Phim, điện ảnh", "Danh từ", "Giải trí",
    [
      ["这部电影真好。", "Zhè bù diànyǐng zhēn hǎo.", "Bộ phim này rất hay."],
      ["明天我们去电影院看电影。", "Míngtiān wǒmen qù diànyǐngyuàn kàn diànyǐng.", "Ngày mai chúng mình đi rạp xem phim nhé."],
      ["你想看什么电影？", "Nǐ xiǎng kàn shénme diànyǐng?", "Bạn muốn xem bộ phim nào?"]
    ]
  ],
  [
    "东西", "dōngxi", "Đông tây", "Đồ vật, thứ", "Danh từ", "Đồ vật",
    [
      ["你去买东西吗？", "Nǐ qù mǎi dōngxi ma?", "Bạn đi mua đồ à?"],
      ["桌子上的东西是谁的？", "Zhuōzi shàng de dōngxi shì shéi de?", "Đồ vật trên bàn là của ai thế?"],
      ["这里的中国东西很多。", "Zhèlǐ de Zhōngguó dōngxi hěn duō.", "Đồ dùng Trung Quốc ở đây rất nhiều."]
    ]
  ],
  [
    "都", "dōu", "Đô", "Đều, tất cả", "Phó từ", "Phó từ",
    [
      ["我们都是学生。", "Wǒmen dōu shì xuésheng.", "Chúng tôi đều là học sinh."],
      ["他们都喜欢学汉语。", "Tāmen dōu xǐhuan xué Hànyǔ.", "Họ đều thích học tiếng Trung."],
      ["这些书都是我的。", "Zhèxiē shū dōu shì wǒ de.", "Những cuốn sách này đều là của tôi."]
    ]
  ],
  [
    "读", "dú", "Độc", "Đọc", "Động từ", "Học tập",
    [
      ["请跟我读。", "Qǐng gēn wǒ dú.", "Xin mời đọc theo tôi."],
      ["每天早上我都读课文。", "Měi tiān zǎoshang wǒ dōu dú kèwén.", "Mỗi sáng tôi đều đọc bài khóa."],
      ["这个汉字怎么读？", "Zhège hànzì zěnme dú?", "Chữ Hán này đọc như thế nào?"]
    ]
  ],
  [
    "对不起", "duìbuqǐ", "Đối bất khởi", "Xin lỗi", "Cụm từ", "Giao tiếp",
    [
      ["对不起，我迟到了。", "Duìbuqǐ, wǒ chídào le.", "Xin lỗi, tôi đến muộn."],
      ["对不起，请问洗手间在哪儿？", "Duìbuqǐ, qǐngwèn xǐshǒujiān zài nǎr?", "Xin lỗi, cho hỏi nhà vệ sinh ở đâu ạ?"],
      ["对不起，我不是故意的。", "Duìbuqǐ, wǒ bú shì gùyì de.", "Xin lỗi, tôi không cố ý đâu."]
    ]
  ],
  [
    "多", "duō", "Đa", "Nhiều, bao nhiêu", "Tính từ", "Số lượng",
    [
      ["这里人很多。", "Zhèlǐ rén hěn duō.", "Ở đây rất đông người."],
      ["你多吃一点儿水果。", "Nǐ duō chī yìdiǎnr shuǐguǒ.", "Bạn ăn nhiều trái cây một chút nhé."],
      ["学校里有很多学生。", "Xuéxiào lǐ yǒu hěn duō xuésheng.", "Trong trường học có rất nhiều học sinh."]
    ]
  ],
  [
    "多少", "duōshao", "Đa thiếu", "Bao nhiêu", "Đại từ", "Hỏi",
    [
      ["这个多少钱？", "Zhège duōshao qián?", "Cái này bao nhiêu tiền?"],
      ["你们学校有多少个学生？", "Nǐmen xuéxiào yǒu duōshao gè xuésheng?", "Trường của bạn có bao nhiêu học sinh?"],
      ["你身上有多少现金？", "Nǐ shēnshang yǒu duōshao xiànjīn?", "Trên người bạn có bao nhiêu tiền mặt?"]
    ]
  ],
  [
    "儿子", "érzi", "Nhi tử", "Con trai", "Danh từ", "Gia đình",
    [
      ["他儿子五岁了。", "Tā érzi wǔ suì le.", "Con trai anh ấy 5 tuổi rồi."],
      ["我儿子很喜欢看书。", "Wǒ érzi hěn xǐhuan kàn shū.", "Con trai tôi rất thích đọc sách."],
      ["那是李老师的儿子。", "Nà shì Lǐ lǎoshī de érzi.", "Kia là con trai của thầy Lý."]
    ]
  ],
  [
    "二", "èr", "Nhị", "Số 2", "Số từ", "Số đếm",
    [
      ["二月天气冷。", "Èr yuè tiānqì lěng.", "Tháng 2 thời tiết lạnh."],
      ["我有两个苹果，他有二号房间。", "Wǒ yǒu liǎng gè píngguǒ, tā yǒu èr hào fángjiān.", "Tôi có hai quả táo, anh ấy ở phòng số 2."],
      ["星期二我们去上课。", "Xīngqī'èr wǒmen qù shàngkè.", "Thứ ba chúng tôi đi học."]
    ]
  ],
  [
    "饭店", "fàndiàn", "Phạn điếm", "Nhà hàng, quán ăn", "Danh từ", "Địa điểm",
    [
      ["我们在饭店见面。", "Wǒmen zài fàndiàn jiànmiàn.", "Chúng ta gặp nhau ở quán ăn."],
      ["那家饭店的菜很好吃。", "Nà jiā fàndiàn de cài hěn hǎochī.", "Món ăn ở nhà hàng đó rất ngon."],
      ["今天中午去饭店吃饭吧。", "Jīntiān zhōngwǔ qù fàndiàn chīfàn ba.", "Trưa nay đi nhà hàng ăn cơm nhé."]
    ]
  ],
  [
    "飞机", "fēijī", "Phi cơ", "Máy bay", "Danh từ", "Giao thông",
    [
      ["飞机起飞了。", "Fēijī qǐfēi le.", "Máy bay cất cánh rồi."],
      ["我坐飞机去北京。", "Wǒ zuò fēijī qù Běijīng.", "Tôi đi máy bay đến Bắc Kinh."],
      ["飞机上有很多外国人。", "Fēijī shàng yǒu hěn duō wàiguórén.", "Trên máy bay có rất nhiều người nước ngoài."]
    ]
  ],
  [
    "分钟", "fēnzhōng", "Phân chung", "Phút", "Danh từ", "Thời gian",
    [
      ["等我十分钟。", "Děng wǒ shí fēnzhōng.", "Đợi tôi 10 phút nhé."],
      ["还有五分钟上课。", "Hái yǒu wǔ fēnzhōng shàngkè.", "Còn 5 phút nữa là vào lớp."],
      ["走回家只要二十分钟。", "Zǒu huí jiā zhǐ yào èrshí fēnzhōng.", "Đi bộ về nhà chỉ mất hai mươi phút."]
    ]
  ],
  [
    "高兴", "gāoxìng", "Cao hứng", "Vui mừng, phấn khởi", "Tính từ", "Cảm xúc",
    [
      ["今天我很高兴。", "Jīntiān wǒ hěn gāoxìng.", "Hôm nay tôi rất vui mừng."],
      ["认识你很高兴。", "Rènshi nǐ hěn gāoxìng.", "Rất vui được quen biết bạn."],
      ["看到你高兴，我也开心。", "Kàndào nǐ gāoxìng, wǒ yě kāixīn.", "Thấy bạn vui tôi cũng vui lòng."]
    ]
  ],
  [
    "个", "gè", "Cá", "Cái, con, người (lượng từ)", "Lượng từ", "Lượng từ",
    [
      ["我有一个问题。", "Wǒ yǒu yí gè wèntí.", "Tôi có một câu hỏi."],
      ["他是一个好人。", "Tā shì yí gè hǎo rén.", "Anh ấy là một người tốt."],
      ["桌上有三个苹果。", "Zhuō shàng yǒu sān gè píngguǒ.", "Trên bàn có 3 quả táo."]
    ]
  ],
  [
    "工作", "gōngzuò", "Công tác", "Công việc, làm việc", "Danh từ / Động từ", "Nghề nghiệp",
    [
      ["我喜欢我的工作。", "Wǒ xǐhuan wǒ de gōngzuò.", "Tôi yêu công việc của mình."],
      ["爸爸每天努力工作。", "Bàba měi tiān nǔlì gōngzuò.", "Bố mỗi ngày đều nỗ lực làm việc."],
      ["你在哪儿工作？", "Nǐ zài nǎr gōngzuò?", "Bạn làm việc ở đâu?"]
    ]
  ],
  [
    "狗", "gǒu", "Cẩu", "Con chó", "Danh từ", "Động vật",
    [
      ["我家有一只狗。", "Wǒ jiā yǒu yì zhī gǒu.", "Nhà tôi có một con chó."],
      ["那只小狗真可爱。", "Nà zhī xiǎogǒu zhēn kě'ài.", "Chú chó con kia thật đáng yêu."],
      ["他很喜欢小狗。", "Tā hěn xǐhuan xiǎogǒu.", "Anh ấy rất thích chó con."]
    ]
  ],
  [
    "汉语", "Hànyǔ", "Hán ngữ", "Tiếng Trung, tiếng Hán", "Danh từ", "Ngôn ngữ",
    [
      ["我想学汉语。", "Wǒ xiǎng xué Hànyǔ.", "Tôi muốn học tiếng Trung."],
      ["汉语虽然难，但是很有趣。", "Hànyǔ suīrán nán, dànshì hěn yǒuqù.", "Tiếng Hán tuy khó nhưng rất thú vị."],
      ["李老师教我们汉语。", "Lǐ lǎoshī jiāo wǒmen Hànyǔ.", "Thầy Lý dạy chúng tôi tiếng Trung."]
    ]
  ],
  [
    "好", "hǎo", "Hảo", "Tốt, đẹp, khỏe, được", "Tính từ", "Miêu tả",
    [
      ["你好！", "Nǐ hǎo!", "Chào bạn!"],
      ["今天天气很好。", "Jīntiān tiānqì hěn hǎo.", "Thời tiết hôm nay rất đẹp."],
      ["这是一本好书。", "Zhè shì yì běn hǎo shū.", "Đây là một cuốn sách hay."]
    ]
  ],
  [
    "号", "hào", "Hào", "Ngày, số", "Danh từ", "Thời gian",
    [
      ["今天十号。", "Jīntiān shí hào.", "Hôm nay ngày 10."],
      ["你的手机号是多少？", "Nǐ de shǒujī hào shì duōshao?", "Số điện thoại của bạn là bao nhiêu?"],
      ["明天是五月一号。", "Míngtiān shì wǔ yuè yī hào.", "Ngày mai là ngày 1 tháng 5."]
    ]
  ],
  [
    "喝", "hē", "Hát", "Uống", "Động từ", "Ăn uống",
    [
      ["请喝水。", "Qǐng hē shuǐ.", "Xin mời uống nước."],
      ["你想喝茶还是喝咖啡？", "Nǐ xiǎng hē chá háishì hē kāfēi?", "Bạn muốn uống trà hay uống cà phê?"],
      ["他不常喝牛奶。", "Tā bù cháng hē niúnǎi.", "Anh ấy không thường xuyên uống sữa."]
    ]
  ],
  [
    "和", "hé", "Hòa", "Và, cùng với", "Liên từ", "Ngữ pháp",
    [
      ["我和你。", "Wǒ hé nǐ.", "Tôi và bạn."],
      ["爸爸和妈妈在做饭。", "Bàba hé māma zài zuò fàn.", "Bố và mẹ đang nấu cơm."],
      ["我和朋友一起去商店。", "Wǒ hé péngyou yìqǐ qù shāngdiàn.", "Tôi cùng bạn bè đi đến cửa hàng."]
    ]
  ],
  [
    "很", "hěn", "Khẩn", "Rất", "Phó từ", "Phó từ",
    [
      ["他很好。", "Tā hěn hǎo.", "Anh ấy rất tốt."],
      ["今天天气很冷。", "Jīntiān tiānqì hěn lěng.", "Hôm nay thời tiết rất lạnh."],
      ["汉语汉字很有意思。", "Hànyǔ hànzì hěn yǒu yìsi.", "Chữ Hán tiếng Trung rất thú vị."]
    ]
  ],
  [
    "后面", "hòumian", "Hậu diện", "Phía sau, đằng sau", "Danh từ", "Phương hướng",
    [
      ["学校在后面。", "Xuéxiào zài hòumian.", "Trường học ở phía sau."],
      ["商店在医院后面。", "Shāngdiàn zài yīyuàn hòumian.", "Cửa hàng ở phía sau bệnh viện."],
      ["他坐在我后面。", "Tā zuò zài wǒ hòumian.", "Cậu ấy ngồi ở phía sau tôi."]
    ]
  ],
  [
    "回", "huí", "Hồi", "Về, quay lại", "Động từ", "Hành động",
    [
      ["我回中国了。", "Wǒ huí Zhōngguó le.", "Tôi về Trung Quốc rồi."],
      ["你什么时候回家？", "Nǐ shénme shíhou huí jiā?", "Khi nào bạn về nhà?"],
      ["请回答这个问题。", "Qǐng huídá zhège wèntí.", "Xin hãy trả lời câu hỏi này."]
    ]
  ],
  [
    "会", "huì", "Hội", "Biết (qua học), sẽ", "Động từ", "Kỹ năng",
    [
      ["我会说汉语。", "Wǒ huì shuō Hànyǔ.", "Tôi biết nói tiếng Trung."],
      ["明天会下雨吗？", "Míngtiān huì xià yǔ ma?", "Ngày mai trời sẽ mưa chứ?"],
      ["他会写很多汉字。", "Tā huì xiě hěn duō hànzì.", "Anh ấy biết viết rất nhiều chữ Hán."]
    ]
  ],
  [
    "几", "jǐ", "Kỷ", "Mấy, vài", "Đại từ", "Hỏi",
    [
      ["几点了？", "Jǐ diǎn le?", "Mấy giờ rồi?"],
      ["你家有几口人？", "Nǐ jiā yǒu jǐ kǒu rén?", "Nhà bạn có mấy người?"],
      ["桌上有几本书。", "Zhuō shàng yǒu jǐ běn shū.", "Trên bàn có vài quyển sách."]
    ]
  ],
  [
    "家", "jiā", "Gia", "Nhà, gia đình", "Danh từ", "Gia đình",
    [
      ["这是我的家。", "Zhè shì wǒ de jiā.", "Đây là nhà của tôi."],
      ["我家有四口人。", "Wǒ jiā yǒu sì kǒu rén.", "Nhà tôi có 4 người."],
      ["欢迎你来我家玩。", "Huānyíng nǐ lái wǒ jiā wán.", "Hoan nghênh bạn đến nhà tôi chơi."]
    ]
  ],
  [
    "叫", "jiào", "Khiếu", "Tên là, gọi", "Động từ", "Giao tiếp",
    [
      ["我叫王明。", "Wǒ jiào Wáng Míng.", "Tôi tên là Vương Minh."],
      ["你叫什么名字？", "Nǐ jiào shénme míngzi?", "Bạn tên là gì?"],
      ["妈妈在叫你吃饭呢。", "Māma zài jiào nǐ chīfàn ne.", "Mẹ đang gọi bạn ăn cơm kìa."]
    ]
  ],
  [
    "今天", "jīntiān", "Kim thiên", "Hôm nay", "Danh từ", "Thời gian",
    [
      ["今天天气真好。", "Jīntiān tiānqì zhēn hǎo.", "Hôm nay thời tiết thật đẹp."],
      ["今天星期五。", "Jīntiān xīngqīwǔ.", "Hôm nay là thứ sáu."],
      ["你今天忙不忙？", "Nǐ jīntiān máng bù máng?", "Hôm nay bạn có bận không?"]
    ]
  ],
  [
    "九", "jiǔ", "Cửu", "Số 9", "Số từ", "Số đếm",
    [
      ["九个人。", "Jiǔ gè rén.", "Chín người."],
      ["现在是九点整。", "Xiànzài shì jiǔ diǎn zhěng.", "Bây giờ là 9 giờ đúng."],
      ["九月学校开学。", "Jiǔ yuè xuéxiào kāixué.", "Tháng 9 trường học khai giảng."]
    ]
  ],
  [
    "开", "kāi", "Khai", "Mở, lái (xe)", "Động từ", "Hành động",
    [
      ["请开门。", "Qǐng kāi mén.", "Làm ơn mở cửa."],
      ["他会开车。", "Tā huì kāichē.", "Anh ấy biết lái xe hơi."],
      ["商店八点开门。", "Shāngdiàn bā diǎn kāimén.", "Cửa hàng mở cửa lúc 8 giờ."]
    ]
  ],
  [
    "看", "kàn", "Khán", "Xem, nhìn, ngắm, đọc", "Động từ", "Hành động",
    [
      ["我看书。", "Wǒ kàn shū.", "Tôi đọc sách."],
      ["你在看什么？", "Nǐ zài kàn shénme?", "Bạn đang xem cái gì vậy?"],
      ["明天我们去看电影。", "Míngtiān wǒmen qù kàn diànyǐng.", "Ngày mai chúng mình đi xem phim."]
    ]
  ],
  [
    "看见", "kànjiàn", "Khán kiến", "Nhìn thấy, trông thấy", "Động từ", "Tri giác",
    [
      ["我看见他了。", "Wǒ kànjiàn tā le.", "Tôi nhìn thấy anh ấy rồi."],
      ["你看见我的手机了吗？", "Nǐ kànjiàn wǒ de shǒujī le ma?", "Bạn có nhìn thấy điện thoại của tôi không?"],
      ["在学校里我看见了李老师。", "Zài xuéxiào lǐ wǒ kànjiàn le Lǐ lǎoshī.", "Ở trường tôi đã nhìn thấy thầy Lý."]
    ]
  ],
  [
    "块", "kuài", "Khối", "Đồng (tệ), miếng", "Lượng từ", "Tiền tệ",
    [
      ["五块钱。", "Wǔ kuài qián.", "Năm đồng (tệ)."],
      ["这本书三十块。", "Zhè běn shū sānshí kuài.", "Cuốn sách này 30 tệ."],
      ["请给我一块西瓜。", "Qǐng gěi wǒ yí kuài xīguā.", "Làm ơn cho tôi một miếng dưa hấu."]
    ]
  ],
  [
    "来", "lái", "Lai", "Đến, tới", "Động từ", "Hành động",
    [
      ["你什么时候来？", "Nǐ shénme shíhou lái?", "Khi nào bạn đến?"],
      ["欢迎来中国。", "Huānyíng lái Zhōngguó.", "Chào mừng đến Trung Quốc."],
      ["今天来我家吃饭吧。", "Jīntiān lái wǒ jiā chīfàn ba.", "Hôm nay đến nhà tôi ăn cơm nhé."]
    ]
  ],
  [
    "老师", "lǎoshī", "Lão sư", "Thầy cô giáo", "Danh từ", "Nghề nghiệp",
    [
      ["李老师很好。", "Lǐ lǎoshī hěn hǎo.", "Thầy Lý rất tốt."],
      ["老师正在讲课。", "Lǎoshī zhèngzài jiǎngkè.", "Giáo viên đang giảng bài."],
      ["王老师是我的汉语老师。", "Wáng lǎoshī shì wǒ de Hànyǔ lǎoshī.", "Cô Vương là cô giáo dạy tiếng Trung của tôi."]
    ]
  ],
  [
    "了", "le", "Liễu", "Rồi (hoàn thành/thay đổi)", "Trợ từ", "Ngữ pháp",
    [
      ["吃饭了。", "Chīfàn le.", "Ăn cơm rồi."],
      ["下雨了，带伞吧。", "Xià yǔ le, dài sǎn ba.", "Mưa rồi, mang ô đi nhé."],
      ["我已经做完作业了。", "Wǒ yǐjīng zuò wán zuòyè le.", "Tôi đã làm xong bài tập rồi."]
    ]
  ],
  [
    "冷", "lěng", "Lãnh", "Lạnh", "Tính từ", "Thời tiết",
    [
      ["今天真冷。", "Jīntiān zhēn lěng.", "Hôm nay thật lạnh."],
      ["冬天天气很冷。", "Dōngtiān tiānqì hěn lěng.", "Mùa đông thời tiết rất lạnh."],
      ["天气冷了，多穿衣服。", "Tiānqì lěng le, duō chuān yīfu.", "Trời lạnh rồi, mặc nhiều quần áo vào."]
    ]
  ],
  [
    "里", "lǐ", "Lý", "Trong, bên trong", "Danh từ", "Phương hướng",
    [
      ["家里面。", "Jiā lǐmian.", "Trong nhà."],
      ["书在书包里。", "Shū zài shūbāo lǐ.", "Sách ở trong cặp."],
      ["学校里有很多树。", "Xuéxiào lǐ yǒu hěn duō shù.", "Trong trường học có rất nhiều cây."]
    ]
  ],
  [
    "六", "liù", "Lục", "Số 6", "Số từ", "Số đếm",
    [
      ["六本书。", "Liù běn shū.", "Sáu quyển sách."],
      ["六点钟起床。", "Liù diǎn zhōng qǐchuáng.", "Thức dậy lúc sáu giờ."],
      ["星期六我们去公园。", "Xīngqīliù wǒmen qù gōngyuán.", "Thứ bảy chúng tôi đi công viên."]
    ]
  ],
  [
    "妈妈", "māma", "Ma ma", "Mẹ", "Danh từ", "Gia đình",
    [
      ["妈妈做饭。", "Māma zuò fàn.", "Mẹ nấu cơm."],
      ["我爱妈妈。", "Wǒ ài māma.", "Con yêu mẹ."],
      ["妈妈今天很高兴。", "Māma jīntiān hěn gāoxìng.", "Hôm nay mẹ rất vui."]
    ]
  ],
  [
    "吗", "ma", "Ma", "Không, à (nghi vấn)", "Trợ từ", "Hỏi",
    [
      ["你好吗？", "Nǐ hǎo ma?", "Bạn khỏe không?"],
      ["你是中国学生吗？", "Nǐ shì Zhōngguó xuésheng ma?", "Bạn là học sinh Trung Quốc phải không?"],
      ["这个苹果甜吗？", "Zhège píngguǒ tián ma?", "Quả táo này ngọt không?"]
    ]
  ],
  [
    "买", "mǎi", "Mãi", "Mua", "Động từ", "Mua sắm",
    [
      ["买苹果。", "Mǎi píngguǒ.", "Mua táo."],
      ["我想买一件新衣服。", "Wǒ xiǎng mǎi yí jiàn xīn yīfu.", "Tôi muốn mua một bộ đồ mới."],
      ["你去商店买什么？", "Nǐ qù shāngdiàn mǎi shénme?", "Bạn đến cửa hàng mua cái gì?"]
    ]
  ],
  [
    "猫", "māo", "Miêu", "Con mèo", "Danh từ", "Động vật",
    [
      ["小猫睡觉了。", "Xiǎomāo shuìjiào le.", "Mèo con ngủ rồi."],
      ["我家有一只白猫。", "Wǒ jiā yǒu yì zhī bái māo.", "Nhà tôi có một con mèo trắng."],
      ["这只小猫非常可爱。", "Zhè zhī xiǎomāo fēicháng kě'ài.", "Chú mèo con này vô cùng đáng yêu."]
    ]
  ],
  [
    "没关系", "méi guānxi", "Một quan hệ", "Không sao, không việc gì", "Cụm từ", "Giao tiếp",
    [
      ["对不起！没关系。", "Duìbuqǐ! Méi guānxi.", "Xin lỗi! Không sao đâu."],
      ["没关系，别放在心上。", "Méi guānxi, bié fàng zài xīn shàng.", "Không sao, đừng để bụng nhé."],
      ["迟到一点没关系。", "Chídào yìdiǎn méi guānxi.", "Muộn một chút không sao cả."]
    ]
  ],
  [
    "没有", "méiyǒu", "Một hữu", "Không có, chưa", "Phó từ / Động từ", "Phủ định",
    [
      ["我没有书。", "Wǒ méiyǒu shū.", "Tôi không có sách."],
      ["他今天没有来上课。", "Tā jīntiān méiyǒu lái shàngkè.", "Hôm nay anh ấy chưa đến lớp học."],
      ["我身上没有现金。", "Wǒ shēnshang méiyǒu xiànjīn.", "Trên người tôi không có tiền mặt."]
    ]
  ],
  [
    "米饭", "mǐfàn", "Mễ phạn", "Cơm", "Danh từ", "Ăn uống",
    [
      ["我想吃米饭。", "Wǒ xiǎng chī mǐfàn.", "Tôi muốn ăn cơm."],
      ["中国人喜欢吃米饭。", "Zhōngguórén xǐhuan chī mǐfàn.", "Người Trung Quốc thích ăn cơm."],
      ["一碗热米饭。", "Yì wǎn rè mǐfàn.", "Một bát cơm nóng."]
    ]
  ],
  [
    "名字", "míngzi", "Danh tự", "Tên", "Danh từ", "Danh từ",
    [
      ["你的名字是什么？", "Nǐ de míngzi shì shénme?", "Tên của bạn là gì?"],
      ["我的中文名字叫大卫。", "Wǒ de Zhōngwén míngzi jiào Dàwèi.", "Tên tiếng Trung của tôi là Đại Vệ."],
      ["请在纸上写你的名字。", "Qǐng zài zhǐ shàng xiě nǐ de míngzi.", "Xin hãy viết tên bạn lên giấy."]
    ]
  ],
  [
    "明天", "míngtiān", "Minh thiên", "Ngày mai", "Danh từ", "Thời gian",
    [
      ["明天见。", "Míngtiān jiàn.", "Ngày mai gặp."],
      ["明天星期六，不用上课。", "Míngtiān xīngqīliù, bú yòng shàngkè.", "Ngày mai thứ bảy, không cần đi học."],
      ["明天我们去北京旅游。", "Míngtiān wǒmen qù Běijīng lǚyóu.", "Ngày mai chúng mình đi Bắc Kinh du lịch."]
    ]
  ],
  [
    "哪", "nǎ", "Nả", "Nào", "Đại từ", "Hỏi",
    [
      ["你是哪国人？", "Nǐ shì nǎ guó rén?", "Bạn là người nước nào?"],
      ["哪本书是你的？", "Nǎ běn shū shì nǐ de?", "Quyển sách nào là của bạn?"],
      ["你想去哪个饭店？", "Nǐ xiǎng qù nǎ gè fàndiàn?", "Bạn muốn đến nhà hàng nào?"]
    ]
  ],
  [
    "哪儿", "nǎr", "Nả nhi", "Ở đâu", "Đại từ", "Hỏi",
    [
      ["你在哪儿？", "Nǐ zài nǎr?", "Bạn ở đâu?"],
      ["你想去哪儿玩？", "Nǐ xiǎng qù nǎr wán?", "Bạn muốn đi chơi ở đâu?"],
      ["洗手间在哪儿？", "Xǐshǒujiān zài nǎr?", "Nhà vệ sinh ở đâu vậy?"]
    ]
  ],
  [
    "那", "nà", "Na", "Đó, kia", "Đại từ", "Chỉ định",
    [
      ["那是我的电脑。", "Nà shì wǒ de diànnǎo.", "Đó là máy tính của tôi."],
      ["那个女孩真漂亮。", "Nà gè nǚhái zhēn piàoliang.", "Cô gái kia thật xinh đẹp."],
      ["那个汉字我认识。", "Nà gè hànzì wǒ rènshi.", "Chữ Hán đó tôi nhận biết được."]
    ]
  ],
  [
    "那儿", "nàr", "Na nhi", "Nơi đó, đằng kia", "Đại từ", "Chỉ định",
    [
      ["书在那儿。", "Shū zài nàr.", "Sách ở đằng kia."],
      ["我们去那儿坐坐吧。", "Wǒmen qù nàr zuòzuò ba.", "Chúng ta qua đằng kia ngồi đi."],
      ["那儿有很多好吃的菜。", "Nàr yǒu hěn duō hǎochī de cài.", "Đằng kia có rất nhiều món ăn ngon."]
    ]
  ],
  [
    "呢", "ne", "Ni", "Thế, còn... thì sao?", "Trợ từ", "Hỏi",
    [
      ["你呢？", "Nǐ ne?", "Còn bạn thì sao?"],
      ["我的书呢？", "Wǒ de shū ne?", "Sách của tôi đâu rồi thế?"],
      ["爸爸妈妈都在家呢。", "Bàba māma dōu zài jiā ne.", "Bố mẹ đều đang ở nhà đấy."]
    ]
  ],
  [
    "能", "néng", "Năng", "Có thể, có khả năng", "Động từ", "Khả năng",
    [
      ["我能帮你吗？", "Wǒ néng bāng nǐ ma?", "Tôi có thể giúp bạn không?"],
      ["你能说慢一点吗？", "Nǐ néng shuō màn yìdiǎn ma?", "Bạn có thể nói chậm một chút được không?"],
      ["今天我能准时到。", "Jīntiān wǒ néng zhǔnshí dào.", "Hôm nay tôi có thể đến đúng giờ."]
    ]
  ],
  [
    "你", "nǐ", "Nhĩ", "Bạn, cậu, anh, chị", "Đại từ", "Đại từ",
    [
      ["你吃了吗？", "Nǐ chī le ma?", "Bạn ăn cơm chưa?"],
      ["很高兴认识你。", "Hěn gāoxìng rènshi nǐ.", "Rất vui được làm quen với bạn."],
      ["你要喝水吗？", "Nǐ yào hē shuǐ ma?", "Bạn có muốn uống nước không?"]
    ]
  ],
  [
    "年", "nián", "Niên", "Năm", "Danh từ", "Thời gian",
    [
      ["一年。", "Yì nián.", "Một năm."],
      ["我学汉语学了一年。", "Wǒ xué Hànyǔ xué le yì nián.", "Tôi học tiếng Trung được một năm rồi."],
      ["新的一年祝你快乐！", "Xīn de yì nián zhù nǐ kuàilè!", "Chúc bạn một năm mới vui vẻ!"]
    ]
  ],
  [
    "女儿", "nǚ'ér", "Nữ nhi", "Con gái", "Danh từ", "Gia đình",
    [
      ["她女儿很漂亮。", "Tā nǚ'ér hěn piàoliang.", "Con gái cô ấy rất xinh đẹp."],
      ["我有一个可爱的女儿。", "Wǒ yǒu yí gè kě'ài de nǚ'ér.", "Tôi có một đứa con gái đáng yêu."],
      ["他女儿今年上大学了。", "Tā nǚ'ér jīnnián shàng dàxué le.", "Con gái anh ấy năm nay lên đại học rồi."]
    ]
  ],
  [
    "朋友", "péngyou", "Bằng hữu", "Bạn bè", "Danh từ", "Quan hệ",
    [
      ["他是我的好朋友。", "Tā shì wǒ de hǎo péngyou.", "Anh ấy là bạn thân của tôi."],
      ["我们是好朋友。", "Wǒmen shì hǎo péngyou.", "Chúng tôi là bạn bè tốt."],
      ["今天朋友来我家玩。", "Jīntiān péngyou lái wǒ jiā wán.", "Hôm nay bạn bè đến nhà tôi chơi."]
    ]
  ],
  [
    "漂亮", "piàoliang", "Phiêu lượng", "Xinh đẹp, đẹp", "Tính từ", "Miêu tả",
    [
      ["你今天很漂亮。", "Nǐ jīntiān hěn piàoliang.", "Hôm nay bạn rất xinh đẹp."],
      ["这件衣服很漂亮。", "Zhè jiàn yīfu hěn piàoliang.", "Bộ quần áo này rất đẹp."],
      ["这里的风景真漂亮。", "Zhèlǐ de fēngjǐng zhēn piàoliang.", "Phong cảnh ở đây thật là đẹp."]
    ]
  ],
  [
    "苹果", "píngguǒ", "Bình quả", "Quả táo", "Danh từ", "Ăn uống",
    [
      ["吃苹果。", "Chī píngguǒ.", "Ăn táo."],
      ["红红的苹果真甜。", "Hónghóng de píngguǒ zhēn tián.", "Quả táo đỏ mọng thật ngọt."],
      ["我想买两斤苹果。", "Wǒ xiǎng mǎi liǎng jīn píngguǒ.", "Tôi muốn mua hai cân táo."]
    ]
  ],
  [
    "七", "qī", "Thất", "Số 7", "Số từ", "Số đếm",
    [
      ["七天。", "Qī tiān.", "Bảy ngày."],
      ["早上七点起床。", "Zǎoshang qī diǎn qǐchuáng.", "Thức dậy lúc 7 giờ sáng."],
      ["他有七支笔。", "Tā yǒu qī zhī bǐ.", "Anh ấy có 7 chiếc bút."]
    ]
  ],
  [
    "钱", "qián", "Tiền", "Tiền", "Danh từ", "Kinh tế",
    [
      ["我有钱。", "Wǒ yǒu qián.", "Tôi có tiền."],
      ["这个要多少钱？", "Zhège yào duōshao qián?", "Cái này cần bao nhiêu tiền?"],
      ["身上没有带钱。", "Shēnshang méiyǒu dài qián.", "Trên người không mang theo tiền."]
    ]
  ],
  [
    "前面", "qiánmian", "Tiền diện", "Phía trước", "Danh từ", "Phương hướng",
    [
      ["车在前面。", "Chē zài qiánmian.", "Xe ở phía trước."],
      ["学校前面有一家书店。", "Xuéxiào qiánmian yǒu yì jiā shūdiàn.", "Phía trước trường học có một tiệm sách."],
      ["请往前面前进。", "Qǐng wǎng qiánmian qiánjìn.", "Xin mời tiến về phía trước."]
    ]
  ],
  [
    "请", "qǐng", "Thỉnh", "Mời, xin, làm ơn", "Động từ", "Lịch sự",
    [
      ["请进。", "Qǐng jìn.", "Mời vào."],
      ["请喝茶，请坐。", "Qǐng hē chá, qǐng zuò.", "Mời uống trà, mời ngồi."],
      ["请问李老师在吗？", "Qǐngwèn Lǐ lǎoshī zài ma?", "Xin hỏi thầy Lý có ở đây không ạ?"]
    ]
  ],
  [
    "去", "qù", "Khứ", "Đi", "Động từ", "Hành động",
    [
      ["去学校。", "Qù xuéxiào.", "Đi đến trường."],
      ["你想去哪儿？", "Nǐ xiǎng qù nǎr?", "Bạn muốn đi đâu?"],
      ["明天我们去北京。", "Míngtiān wǒmen qù Běijīng.", "Ngày mai chúng tôi đi Bắc Kinh."]
    ]
  ],
  [
    "热", "rè", "Nhiệt", "Nóng", "Tính từ", "Thời tiết",
    [
      ["天太热了。", "Tiān tài rè le.", "Trời nóng quá rồi."],
      ["请喝热茶。", "Qǐng hē rè chá.", "Mời uống trà nóng."],
      ["夏天天气很热。", "Xiàtiān tiānqì hěn rè.", "Mùa hè thời tiết rất nóng."]
    ]
  ],
  [
    "人", "rén", "Nhân", "Người", "Danh từ", "Con người",
    [
      ["好人。", "Hǎo rén.", "Người tốt."],
      ["他是中国人，我是越南人。", "Tā shì Zhōngguórén, wǒ shì Yuènánrén.", "Anh ấy là người Trung Quốc, tôi là người Việt Nam."],
      ["今天来的人很多。", "Jīntiān lái de rén hěn duō.", "Hôm nay số người đến rất đông."]
    ]
  ],
  [
    "认识", "rènshi", "Nhận thức", "Quen biết", "Động từ", "Giao tiếp",
    [
      ["认识你真好。", "Rènshi nǐ zhēn hǎo.", "Quen biết bạn thật tuyệt."],
      ["你认识王老师吗？", "Nǐ rènshi Wáng lǎoshī ma?", "Bạn có quen biết thầy Vương không?"],
      ["很高兴认识大家。", "Hěn gāoxìng rènshi dàjiā.", "Rất vui được làm quen với mọi người."]
    ]
  ],
  [
    "三", "sān", "Tam", "Số 3", "Số từ", "Số đếm",
    [
      ["三人行。", "Sān rén xíng.", "Ba người cùng đi."],
      ["现在三点半。", "Xiànzài sān diǎn bàn.", "Bây giờ là 3 giờ rưỡi."],
      ["他买了三本书。", "Tā mǎi le sān běn shū.", "Anh ấy đã mua ba quyển sách."]
    ]
  ],
  [
    "商店", "shāngdiàn", "Thương điếm", "Cửa hàng", "Danh từ", "Địa điểm",
    [
      ["商店开门了。", "Shāngdiàn kāimén le.", "Cửa hàng mở cửa rồi."],
      ["我去商店买东西。", "Wǒ qù shāngdiàn mǎi dōngxi.", "Tôi đến cửa hàng mua đồ."],
      ["那家商店卖很多水果。", "Nà jiā shāngdiàn mài hěn duō shuǐguǒ.", "Cửa hàng đó bán rất nhiều hoa quả."]
    ]
  ],
  [
    "上", "shàng", "Thượng", "Trên, lên", "Danh từ / Động từ", "Phương hướng",
    [
      ["桌子上有一本书。", "Zhuōzi shàng yǒu yì běn shū.", "Trên bàn có một cuốn sách."],
      ["上车吧，我们要走了。", "Shàng chē ba, wǒmen yào zǒu le.", "Lên xe đi, chúng ta sắp đi rồi."],
      ["我们八点去上课。", "Wǒmen bā diǎn qù shàngkè.", "Chúng tôi 8 giờ đi lên lớp."]
    ]
  ],
  [
    "上午", "shàngwǔ", "Thượng ngọ", "Buổi sáng", "Danh từ", "Thời gian",
    [
      ["上午好。", "Shàngwǔ hǎo.", "Chào buổi sáng."],
      ["上午我有两节汉语课。", "Shàngwǔ wǒ yǒu liǎng jié Hànyǔ kè.", "Buổi sáng tôi có hai tiết tiếng Trung."],
      ["今天上午他在家看书。", "Jīntiān shàngwǔ tā zài jiā kàn shū.", "Sáng hôm nay anh ấy ở nhà đọc sách."]
    ]
  ],
  [
    "少", "shǎo", "Thiếu", "Ít", "Tính từ", "Số lượng",
    [
      ["话很少。", "Huà hěn shǎo.", "Nói rất ít."],
      ["今天来的人很少。", "Jīntiān lái de rén hěn shǎo.", "Hôm nay người đến rất ít."],
      ["请少放一点盐。", "Qǐng shǎo fàng yìdiǎn yán.", "Xin hãy cho ít muối một chút."]
    ]
  ],
  [
    "谁", "shéi", "Thùy", "Ai", "Đại từ", "Hỏi",
    [
      ["你是谁？", "Nǐ shì shéi?", "Bạn là ai?"],
      ["他是谁的朋友？", "Tā shì shéi de péngyou?", "Anh ấy là bạn của ai thế?"],
      ["谁想和我一起去？", "Shéi xiǎng hé wǒ yìqǐ qù?", "Ai muốn đi cùng tôi nào?"]
    ]
  ],
  [
    "什么", "shénme", "Thập ma", "Cái gì", "Đại từ", "Hỏi",
    [
      ["这是什么？", "Zhè shì shénme?", "Đây là cái gì?"],
      ["你在说什么？", "Nǐ zài shuō shénme?", "Bạn đang nói cái gì vậy?"],
      ["你想吃什么菜？", "Nǐ xiǎng chī shénme cài?", "Bạn muốn ăn món gì?"]
    ]
  ],
  [
    "十", "shí", "Thập", "Số 10", "Số từ", "Số đếm",
    [
      ["十个人。", "Shí gè rén.", "Mười người."],
      ["十全十美。", "Shí quán shí měi.", "Mười phân vẹn mười."],
      ["现在十点了，睡觉吧。", "Xiànzài shí diǎn le, shuìjiào ba.", "Bây giờ 10 giờ rồi, đi ngủ thôi."]
    ]
  ],
  [
    "时候", "shíhou", "Thời hậu", "Lúc, khi", "Danh từ", "Thời gian",
    [
      ["什么时候？", "Shénme shíhou?", "Khi nào?"],
      ["你什么时候回家？", "Nǐ shénme shíhou huí jiā?", "Khi nào thì bạn về nhà?"],
      ["我小的时候喜欢看动画片。", "Wǒ xiǎo de shíhou xǐhuan kàn dònghuàpiàn.", "Lúc tôi còn nhỏ rất thích xem phim hoạt hình."]
    ]
  ],
  [
    "是", "shì", "Thị", "Là, phải, đúng", "Động từ", "Động từ",
    [
      ["我是学生。", "Wǒ shì xuésheng.", "Tôi là học sinh."],
      ["他是我的好朋友。", "Tā shì wǒ de hǎo péngyou.", "Anh ấy là bạn tốt của tôi."],
      ["这是汉语书。", "Zhè shì Hànyǔ shū.", "Đây là sách tiếng Hán."]
    ]
  ],
  [
    "书", "shū", "Thư", "Sách", "Danh từ", "Đồ vật",
    [
      ["看书。", "Kàn shū.", "Đọc sách."],
      ["桌上有一本中文书。", "Zhuō shàng yǒu yì běn Zhōngwén shū.", "Trên bàn có một cuốn sách tiếng Trung."],
      ["我很喜欢看书。", "Wǒ hěn xǐhuan kàn shū.", "Tôi rất thích đọc sách."]
    ]
  ],
  [
    "水", "shuǐ", "Thủy", "Nước", "Danh từ", "Ăn uống",
    [
      ["喝水。", "Hē shuǐ.", "Uống nước."],
      ["请给我一杯温水。", "Qǐng gěi wǒ yì bēi wēn shuǐ.", "Làm ơn cho tôi một cốc nước ấm."],
      ["多喝水对身体好。", "Duō hē shuǐ duì shēntǐ hǎo.", "Uống nhiều nước rất tốt cho cơ thể."]
    ]
  ],
  [
    "水果", "shuǐguǒ", "Thủy quả", "Trái cây, hoa quả", "Danh từ", "Ăn uống",
    [
      ["新鲜水果。", "Xīnxiān shuǐguǒ.", "Trái cây tươi ngon."],
      ["今天我买了苹果和水果。", "Jīntiān wǒ mǎi le píngguǒ hé shuǐguǒ.", "Hôm nay tôi đã mua táo và hoa quả."],
      ["多吃水果身体健康。", "Duō chī shuǐguǒ shēntǐ jiànkāng.", "Ăn nhiều hoa quả cơ thể khỏe mạnh."]
    ]
  ],
  [
    "睡觉", "shuìjiào", "Thụy giác", "Ngủ", "Động từ", "Sinh hoạt",
    [
      ["去睡觉。", "Qù shuìjiào.", "Đi ngủ."],
      ["昨天晚上我十点睡觉。", "Zuótiān wǎnshang wǒ shí diǎn shuìjiào.", "Tối hôm qua 10 giờ tôi đã đi ngủ."],
      ["小猫在桌子下面睡觉。", "Xiǎomāo zài zhuōzi xiàmiàn shuìjiào.", "Mèo con đang ngủ ở dưới gầm bàn."]
    ]
  ],
  [
    "说", "shuō", "Thuyết", "Nói", "Động từ", "Giao tiếp",
    [
      ["你说吧。", "Nǐ shuō ba.", "Bạn nói đi."],
      ["请说慢一点。", "Qǐng shuō màn yìdiǎn.", "Xin hãy nói chậm lại một chút."],
      ["他会说一点儿汉语。", "Tā huì shuō yìdiǎnr Hànyǔ.", "Anh ấy biết nói một chút tiếng Trung."]
    ]
  ],
  [
    "说话", "shuōhuà", "Thuyết thoại", "Nói chuyện", "Động từ", "Giao tiếp",
    [
      ["不要说话。", "Bú yào shuōhuà.", "Đừng nói chuyện."],
      ["他们在用汉语说话。", "Tāmen zài yòng Hànyǔ shuōhuà.", "Họ đang nói chuyện bằng tiếng Trung."],
      ["请小声说话，不要吵。", "Qǐng xiǎoshēng shuōhuà, bú yào chǎo.", "Xin nói nhỏ tiếng, đừng ồn ào."]
    ]
  ],
  [
    "四", "sì", "Tứ", "Số 4", "Số từ", "Số đếm",
    [
      ["四点钟。", "Sì diǎn zhōng.", "Bốn giờ."],
      ["一年有四季。", "Yì nián yǒu sì jì.", "Một năm có 4 mùa."],
      ["我家有四口人。", "Wǒ jiā yǒu sì kǒu rén.", "Nhà tôi có 4 người."]
    ]
  ],
  [
    "岁", "suì", "Tuế", "Tuổi", "Lượng từ", "Thời gian",
    [
      ["我二十岁。", "Wǒ èrshí suì.", "Tôi 20 tuổi."],
      ["他儿子今年六岁了。", "Tā érzi jīnnián liù suì le.", "Con trai anh ấy năm nay 6 tuổi rồi."],
      ["请问您多大岁数？", "Qǐngwèn nín duō dà suìshu?", "Xin hỏi ngài bao nhiêu tuổi rồi ạ?"]
    ]
  ],
  [
    "他", "tā", "Tha", "Anh ấy, cậu ấy", "Đại từ", "Đại từ",
    [
      ["他在家。", "Tā zài jiā.", "Anh ấy ở nhà."],
      ["他是我的大学同学。", "Tā shì wǒ de dàxué tóngxué.", "Cậu ấy là bạn đại học của tôi."],
      ["他非常喜欢学中国字。", "Tā fēicháng xǐhuan xué Zhōngguó zì.", "Anh ấy vô cùng thích học chữ Hán."]
    ]
  ],
  [
    "她", "tā", "Tha", "Cô ấy, chị ấy", "Đại từ", "Đại từ",
    [
      ["她是老师。", "Tā shì lǎoshī.", "Cô ấy là giáo viên."],
      ["她长得很漂亮。", "Tā zhǎng de hěn piàoliang.", "Cô ấy trông rất xinh xắn."],
      ["她每天早上都去跑步。", "Tā měi tiān zǎoshang dōu qù pǎobù.", "Mỗi buổi sáng cô ấy đều đi chạy bộ."]
    ]
  ],
  [
    "太", "tài", "Thái", "Quá, lắm", "Phó từ", "Phó từ",
    [
      ["太好了！", "Tài hǎo le!", "Tuyệt vời quá!"],
      ["今天天气太热了。", "Jīntiān tiānqì tài rè le.", "Thời tiết hôm nay nóng quá."],
      ["这个苹果太甜了。", "Zhège píngguǒ tài tián le.", "Quả táo này ngọt quá chừng."]
    ]
  ],
  [
    "天气", "tiānqì", "Thiên khí", "Thời tiết", "Danh từ", "Thời tiết",
    [
      ["天气晴朗。", "Tiānqì qínglǎng.", "Thời tiết trong lành."],
      ["今天天气怎么样？", "Jīntiān tiānqì zěnmeyàng?", "Hôm nay thời tiết thế nào?"],
      ["北京明天的天气很冷。", "Běijīng míngtiān de tiānqì hěn lěng.", "Thời tiết Bắc Kinh ngày mai rất lạnh."]
    ]
  ],
  [
    "听", "tīng", "Thính", "Nghe", "Động từ", "Hành động",
    [
      ["你在听吗？", "Nǐ zài tīng ma?", "Bạn có đang nghe không?"],
      ["我喜欢听音乐。", "Wǒ xǐhuan tīng yīnyuè.", "Tôi thích nghe âm nhạc."],
      ["请仔细听老师读。", "Qǐng zǐxì tīng lǎoshī dú.", "Xin hãy lắng nghe kỹ cô giáo đọc."]
    ]
  ],
  [
    "同学", "tóngxué", "Đồng học", "Bạn cùng học", "Danh từ", "Quan hệ",
    [
      ["老同学。", "Lǎo tóngxué.", "Bạn học cũ."],
      ["他是我的新同学。", "Tā shì wǒ de xīn tóngxué.", "Cậu ấy là bạn học mới của tôi."],
      ["同学们都在教室里学习。", "Tóngxuémen dōu zài jiàoshì lǐ xuéxí.", "Các bạn học đều đang ở trong lớp học."]
    ]
  ],
  [
    "喂", "wèi", "Uy", "A lô (điện thoại)", "Thán từ", "Giao tiếp",
    [
      ["喂，你好！", "Wèi, nǐ hǎo!", "A lô, xin chào!"],
      ["喂，请问李老师在吗？", "Wèi, qǐngwèn Lǐ lǎoshī zài ma?", "A lô, xin hỏi cô Lý có ở đó không ạ?"],
      ["喂，你现在在哪儿？", "Wèi, nǐ xiànzài zài nǎr?", "A lô, hiện tại bạn đang ở đâu thế?"]
    ]
  ],
  [
    "我", "wǒ", "Ngã", "Tôi, tao, mình", "Đại từ", "Đại từ",
    [
      ["我很开心。", "Wǒ hěn kāixīn.", "Tôi rất vui lòng."],
      ["我是越南人。", "Wǒ shì Yuènánrén.", "Tôi là người Việt Nam."],
      ["我想去中国学汉语。", "Wǒ xiǎng qù Zhōngguó xué Hànyǔ.", "Tôi muốn đến Trung Quốc học tiếng Hán."]
    ]
  ],
  [
    "我们", "wǒmen", "Ngã môn", "Chúng tôi, chúng ta", "Đại từ", "Đại từ",
    [
      ["我们一起去。", "Wǒmen yìqǐ qù.", "Chúng ta cùng đi."],
      ["我们都是好朋友。", "Wǒmen dōu shì hǎo péngyou.", "Chúng tôi đều là những người bạn tốt."],
      ["我们明天去图书馆看书。", "Wǒmen míngtiān qù túshūguǎn kàn shū.", "Ngày mai chúng mình đến thư viện đọc sách nhé."]
    ]
  ],
  [
    "五", "wǔ", "Ngũ", "Số 5", "Số từ", "Số đếm",
    [
      ["五个人。", "Wǔ gè rén.", "Năm người."],
      ["现在五点半。", "Xiànzài wǔ diǎn bàn.", "Bây giờ là 5 giờ rưỡi."],
      ["我家有五口人。", "Wǒ jiā yǒu wǔ kǒu rén.", "Nhà tôi có năm người."]
    ]
  ],
  [
    "喜欢", "xǐhuan", "Hỷ hoan", "Thích, yêu mến", "Động từ", "Cảm xúc",
    [
      ["我喜欢你。", "Wǒ xǐhuan nǐ.", "Tôi thích bạn."],
      ["她很喜欢吃苹果。", "Tā hěn xǐhuan chī píngguǒ.", "Cô ấy rất thích ăn táo."],
      ["我喜欢写毛笔字。", "Wǒ xǐhuan xiě máobǐzì.", "Tôi thích tập viết chữ thư pháp."]
    ]
  ],
  [
    "下", "xià", "Hạ", "Dưới, xuống", "Danh từ / Động từ", "Phương hướng",
    [
      ["下雨了。", "Xià yǔ le.", "Trời mưa rồi."],
      ["小狗在椅子下面。", "Xiǎogǒu zài yǐzi xiàmiàn.", "Chú cún đang ở dưới chân ghế."],
      ["下车的时候请注意安全。", "Xià chē de shíhou qǐng zhùyì ānquán.", "Khi xuống xe xin hãy chú ý an toàn."]
    ]
  ],
  [
    "下午", "xiàwǔ", "Hạ ngọ", "Buổi chiều", "Danh từ", "Thời gian",
    [
      ["下午见。", "Xiàwǔ jiàn.", "Chiều gặp nhé."],
      ["今天下午我有考试。", "Jīntiān xiàwǔ wǒ yǒu kǎoshì.", "Chiều nay tôi có bài kiểm tra."],
      ["下午三点我们去喝咖啡。", "Xiàwǔ sān diǎn wǒmen qù hē kāfēi.", "3 giờ chiều chúng mình đi uống cà phê nhé."]
    ]
  ],
  [
    "下雨", "xià yǔ", "Hạ vũ", "Trời mưa", "Động từ", "Thời tiết",
    [
      ["下大雨了。", "Xià dà yǔ le.", "Mưa to rồi."],
      ["外面下雨，不要出去。", "Wàimiàn xià yǔ, bú yào chūqu.", "Bên ngoài đang mưa, đừng ra ngoài."],
      ["明天如果下雨我们就在家。", "Míngtiān rúguǒ xià yǔ wǒmen jiù zài jiā.", "Ngày mai nếu trời mưa thì chúng mình ở nhà."]
    ]
  ],
  [
    "先生", "xiānsheng", "Tiên sinh", "Ông, ngài, thầy", "Danh từ", "Xưng hô",
    [
      ["王先生你好。", "Wáng xiānsheng nǐ hǎo.", "Chào ông Vương."],
      ["李先生是这家公司的经理。", "Lǐ xiānsheng shì zhè jiā gōngsī de jīnglǐ.", "Ông Lý là giám đốc của công ty này."],
      ["那位先生很有礼貌。", "Nà wèi xiānsheng hěn yǒu lǐmào.", "Vị tiên sinh kia rất lịch sự."]
    ]
  ],
  [
    "现在", "xiànzài", "Hiện tại", "Bây giờ", "Danh từ", "Thời gian",
    [
      ["现在走吧。", "Xiànzài zǒu ba.", "Bây giờ đi thôi."],
      ["现在几点了？", "Xiànzài jǐ diǎn le?", "Bây giờ là mấy giờ rồi?"],
      ["我现在正在学汉语。", "Wǒ xiànzài zhèngzài xué Hànyǔ.", "Bây giờ tôi đang học tiếng Trung."]
    ]
  ],
  [
    "想", "xiǎng", "Tưởng", "Muốn, nhớ, nghĩ", "Động từ", "Cảm xúc",
    [
      ["我想喝茶。", "Wǒ xiǎng hē chá.", "Tôi muốn uống trà."],
      ["我很想妈妈。", "Wǒ hěn xiǎng māma.", "Tôi rất nhớ mẹ."],
      ["让我想一想这个问题。", "Ràng wǒ xiǎng yì xiǎng zhège wèntí.", "Để tôi nghĩ một lát về câu hỏi này."]
    ]
  ],
  [
    "小", "xiǎo", "Tiểu", "Nhỏ, bé", "Tính từ", "Miêu tả",
    [
      ["小鸟。", "Xiǎoniǎo.", "Chim non."],
      ["这只小猫真可爱。", "Zhè zhī xiǎomāo zhēn kě'ài.", "Con mèo nhỏ này thật đáng yêu."],
      ["这个苹果太小了。", "Zhège píngguǒ tài xiǎo le.", "Quả táo này bé quá."]
    ]
  ],
  [
    "小姐", "xiǎojiě", "Tiểu thư", "Cô gái, cô", "Danh từ", "Xưng hô",
    [
      ["李小姐。", "Lǐ xiǎojiě.", "Cô Lý."],
      ["这位小姐想买什么？", "Zhè wèi xiǎojiě xiǎng mǎi shénme?", "Vị cô nương này muốn mua gì ạ?"],
      ["王小姐教我们英语。", "Wáng xiǎojiě jiāo wǒmen Yīngyǔ.", "Cô Vương dạy chúng tôi tiếng Anh."]
    ]
  ],
  [
    "些", "xiē", "Ta", "Một vài, một số", "Lượng từ", "Số lượng",
    [
      ["这些人。", "Zhèxiē rén.", "Những người này."],
      ["这些苹果都很好吃。", "Zhèxiē píngguǒ dōu hěn hǎochī.", "Những quả táo này đều rất ngon."],
      ["买一些水果回家吧。", "Mǎi yìxiē shuǐguǒ huí jiā ba.", "Mua một ít hoa quả về nhà đi."]
    ]
  ],
  [
    "写", "xiě", "Tả", "Viết", "Động từ", "Học tập",
    [
      ["写汉字。", "Xiě hànzì.", "Viết chữ Hán."],
      ["你每天写多少个字？", "Nǐ měi tiān xiě duōshao gè zì?", "Mỗi ngày bạn viết bao nhiêu chữ?"],
      ["他在本子上写下名字。", "Tā zài běnzi shàng xiě xià míngzi.", "Anh ấy viết tên mình vào trong vở."]
    ]
  ],
  [
    "谢谢", "xièxie", "Tạ tạ", "Cảm ơn", "Động từ", "Giao tiếp",
    [
      ["谢谢老师。", "Xièxie lǎoshī.", "Cảm ơn thầy cô."],
      ["非常谢谢你的帮助。", "Fēicháng xièxie nǐ de bāngzhù.", "Vô cùng cảm ơn sự giúp đỡ của bạn."],
      ["谢谢大家来参加。", "Xièxie dàjiā lái cānjiā.", "Cảm ơn mọi người đã đến tham gia."]
    ]
  ],
  [
    "星期", "xīngqī", "Tinh kỳ", "Tuần, thứ", "Danh từ", "Thời gian",
    [
      ["下个星期。", "Xià gè xīngqī.", "Tuần sau."],
      ["一个星期有七天。", "Yí gè xīngqī yǒu qī tiān.", "Một tuần có 7 ngày."],
      ["这个星期我很忙。", "Zhège xīngqī wǒ hěn máng.", "Tuần này tôi rất là bận rộn."]
    ]
  ],
  [
    "学生", "xuésheng", "Học sinh", "Học sinh, sinh viên", "Danh từ", "Nghề nghiệp",
    [
      ["好学生。", "Hǎo xuésheng.", "Học sinh ngoan."],
      ["我们学校有很多留学生。", "Wǒmen xuéxiào yǒu hěn duō liúxuéshēng.", "Trường chúng tôi có rất nhiều du học sinh."],
      ["他是大学二年级的学生。", "Tā shì dàxué èr niánjí de xuésheng.", "Cậu ấy là sinh viên năm thứ hai đại học."]
    ]
  ],
  [
    "学习", "xuéxí", "Học tập", "Học tập", "Động từ", "Học tập",
    [
      ["学习中文。", "Xuéxí Zhōngwén.", "Học tiếng Trung."],
      ["努力学习天天向上。", "Nǔlì xuéxí tiāntiān xiàngshàng.", "Chăm chỉ học tập ngày ngày tiến bộ."],
      ["我们在学校认真学习。", "Wǒmen zài xuéxiào rènzhēn xuéxí.", "Chúng tôi chăm chú học tập ở trường."]
    ]
  ],
  [
    "学校", "xuéxiào", "Học hiệu", "Trường học", "Danh từ", "Địa điểm",
    [
      ["到学校去。", "Dào xuéxiào qù.", "Đến trường học."],
      ["我们的学校很漂亮。", "Wǒmen de xuéxiào hěn piàoliang.", "Ngôi trường của chúng tôi rất đẹp."],
      ["学校离我家不远。", "Xuéxiào lí wǒ jiā bù yuǎn.", "Trường học cách nhà tôi không xa."]
    ]
  ],
  [
    "一", "yī", "Nhất", "Số 1", "Số từ", "Số đếm",
    [
      ["第一名。", "Dì yī míng.", "Hạng nhất."],
      ["请给我一杯水。", "Qǐng gěi wǒ yì bēi shuǐ.", "Làm ơn cho tôi một cốc nước."],
      ["我们一起去吃饭。", "Wǒmen yìqǐ qù chīfàn.", "Chúng ta cùng nhau đi ăn cơm."]
    ]
  ],
  [
    "衣服", "yīfu", "Y phục", "Quần áo", "Danh từ", "Trang phục",
    [
      ["买衣服。", "Mǎi yīfu.", "Mua quần áo."],
      ["这件衣服真漂亮。", "Zhè jiàn yīfu zhēn piàoliang.", "Bộ quần áo này đẹp quá."],
      ["妈妈在洗衣服。", "Māma zài xǐ yīfu.", "Mẹ đang giặt quần áo."]
    ]
  ],
  [
    "医生", "yīshēng", "Y sinh", "Bác sĩ", "Danh từ", "Nghề nghiệp",
    [
      ["看医生。", "Kàn yīshēng.", "Khám bác sĩ."],
      ["我爸爸是大医院的医生。", "Wǒ bàba shì dà yīyuàn de yīshēng.", "Bố tôi là bác sĩ ở bệnh viện lớn."],
      ["医生说你要多喝水。", "Yīshēng shuō nǐ yào duō hē shuǐ.", "Bác sĩ bảo bạn phải uống nhiều nước."]
    ]
  ],
  [
    "医院", "yīyuàn", "Y viện", "Bệnh viện", "Danh từ", "Địa điểm",
    [
      ["在医院。", "Zài yīyuàn.", "Ở bệnh viện."],
      ["他生病了，要去医院。", "Tā shēngbìng le, yào qù yīyuàn.", "Anh ấy bị ốm rồi, cần phải đi bệnh viện."],
      ["这家医院很大很干净。", "Zhè jiā yīyuàn hěn dà hěn gānjìng.", "Bệnh viện này rất to và sạch sẽ."]
    ]
  ],
  [
    "椅子", "yǐzi", "Y tử", "Cái ghế", "Danh từ", "Đồ vật",
    [
      ["木椅子。", "Mù yǐzi.", "Ghế gỗ."],
      ["请坐在椅子上。", "Qǐng zuò zài yǐzi shàng.", "Xin mời ngồi lên ghế."],
      ["房间里有两把椅子。", "Fángjiān lǐ yǒu liǎng bǎ yǐzi.", "Trong phòng có hai chiếc ghế."]
    ]
  ],
  [
    "有", "yǒu", "Hữu", "Có", "Động từ", "Động từ",
    [
      ["有人吗？", "Yǒu rén ma?", "Có ai không?"],
      ["我有一本汉语字典。", "Wǒ yǒu yì běn Hànyǔ zìdiǎn.", "Tôi có một cuốn từ điển tiếng Trung."],
      ["桌子上有几个苹果。", "Zhuōzi shàng yǒu jǐ gè píngguǒ.", "Trên bàn có mấy quả táo."]
    ]
  ],
  [
    "月", "yuè", "Nguyệt", "Tháng, mặt trăng", "Danh từ", "Thời gian",
    [
      ["五月。", "Wǔ yuè.", "Tháng năm."],
      ["今晚的月亮很圆。", "Jīnwǎn de yuèliang hěn yuán.", "Mặt trăng tối nay rất tròn."],
      ["下个月我要去中国。", "Xià gè yuè wǒ yào qù Zhōngguó.", "Tháng sau tôi sẽ đi Trung Quốc."]
    ]
  ],
  [
    "再见", "zàijiàn", "Tái kiến", "Tạm biệt", "Cụm từ", "Giao tiếp",
    [
      ["明天再见。", "Míngtiān zàijiàn.", "Ngày mai gặp lại."],
      ["老师再见！", "Lǎoshī zàijiàn!", "Em chào thầy/cô, tạm biệt ạ!"],
      ["祝你一路顺风，再见！", "Zhù nǐ yí lù shùnfēng, zàijiàn!", "Chúc bạn thuận buồm xuôi gió, tạm biệt!"]
    ]
  ],
  [
    "在", "zài", "Tại", "Ở, đang", "Giới từ", "Phương hướng",
    [
      ["我在家。", "Wǒ zài jiā.", "Tôi ở nhà."],
      ["他在房间里看书。", "Tā zài fángjiān lǐ kàn shū.", "Anh ấy đang đọc sách trong phòng."],
      ["你在哪儿工作？", "Nǐ zài nǎr gōngzuò?", "Bạn làm việc ở đâu vậy?"]
    ]
  ],
  [
    "怎么", "zěnme", "Chẩm ma", "Làm sao, như thế nào", "Đại từ", "Hỏi",
    [
      ["怎么走？", "Zěnme zǒu?", "Đi như thế nào?"],
      ["这个字怎么读？", "Zhège zì zěnme dú?", "Chữ này đọc như thế nào?"],
      ["你怎么不高兴？", "Nǐ zěnme bù gāoxìng?", "Sao bạn lại không vui thế?"]
    ]
  ],
  [
    "怎么样", "zěnmeyàng", "Chẩm ma dạng", "Thế nào, ra sao", "Đại từ", "Hỏi",
    [
      ["你觉得怎么样？", "Nǐ juéde zěnmeyàng?", "Bạn cảm thấy thế nào?"],
      ["今天天气怎么样？", "Jīntiān tiānqì zěnmeyàng?", "Hôm nay thời tiết thế nào?"],
      ["这件衣服怎么样？好看吗？", "Zhè jiàn yīfu zěnmeyàng? Hǎokàn ma?", "Bộ quần áo này thế nào? Đẹp không?"]
    ]
  ],
  [
    "这", "zhè", "Giá", "Đây, này", "Đại từ", "Chỉ định",
    [
      ["这是什么？", "Zhè shì shénme?", "Đây là cái gì?"],
      ["这是我的朋友。", "Zhè shì wǒ de péngyou.", "Đây là bạn của tôi."],
      ["这本书很有意思。", "Zhè běn shū hěn yǒu yìsi.", "Cuốn sách này rất hay."]
    ]
  ],
  [
    "这儿", "zhèr", "Giá nhi", "Ở đây", "Đại từ", "Chỉ định",
    [
      ["来这儿。", "Lái zhèr.", "Đến đây."],
      ["请坐在这儿。", "Qǐng zuò zài zhèr.", "Làm ơn ngồi ở đây."],
      ["这儿的天气非常好。", "Zhèr de tiānqì fēicháng hǎo.", "Thời tiết ở đây vô cùng tốt."]
    ]
  ],
  [
    "中国", "Zhōngguó", "Trung Quốc", "Trung Quốc", "Danh từ", "Địa điểm",
    [
      ["我爱中国。", "Wǒ ài Zhōngguó.", "Tôi yêu Trung Quốc."],
      ["中国有很多大城市。", "Zhōngguó yǒu hěn duō dà chéngshì.", "Trung Quốc có rất nhiều thành phố lớn."],
      ["我想去中国旅游。", "Wǒ xiǎng qù Zhōngguó lǚyóu.", "Tôi muốn đi du lịch Trung Quốc."]
    ]
  ],
  [
    "中午", "zhōngwǔ", "Trung ngọ", "Buổi trưa", "Danh từ", "Thời gian",
    [
      ["中午吃饭。", "Zhōngwǔ chīfàn.", "Buổi trưa ăn cơm."],
      ["中午十二点我们休息。", "Zhōngwǔ shí'èr diǎn wǒmen xiūxi.", "12 giờ trưa chúng tôi nghỉ ngơi."],
      ["今天中午你想吃什么？", "Jīntiān zhōngwǔ nǐ xiǎng chī shénme?", "Trưa nay bạn muốn ăn món gì?"]
    ]
  ],
  [
    "住", "zhù", "Trụ", "Ở, cư trú", "Động từ", "Hành động",
    [
      ["住在河内。", "Zhù zài Hénèi.", "Sống ở Hà Nội."],
      ["你住在哪个房间？", "Nǐ zhù zài nǎ gè fángjiān?", "Bạn ở phòng số mấy?"],
      ["他在北京住了三年。", "Tā zài Běijīng zhù le sān nián.", "Anh ấy đã sống ở Bắc Kinh được ba năm."]
    ]
  ],
  [
    "桌子", "zhuōzi", "Trác tử", "Cái bàn", "Danh từ", "Đồ vật",
    [
      ["大桌子。", "Dà zhuōzi.", "Cái bàn to."],
      ["桌子上有一台电脑。", "Zhuōzi shàng yǒu yì tái diànnǎo.", "Trên bàn có một chiếc máy vi tính."],
      ["请把书放在桌子上。", "Qǐng bǎ shū fàng zài zhuōzi shàng.", "Xin hãy đặt sách lên trên bàn."]
    ]
  ],
  [
    "字", "zì", "Tự", "Chữ, từ", "Danh từ", "Học tập",
    [
      ["认汉字。", "Rèn hànzì.", "Nhận biết chữ Hán."],
      ["这个字怎么写？", "Zhège zì zěnme xiě?", "Chữ này viết như thế nào?"],
      ["他写的字非常好看。", "Tā xiě de zì fēicháng hǎokàn.", "Chữ anh ấy viết vô cùng đẹp mắt."]
    ]
  ],
  [
    "昨天", "zuótiān", "Tạc thiên", "Hôm qua", "Danh từ", "Thời gian",
    [
      ["昨天晚上。", "Zuótiān wǎnshang.", "Tối hôm qua."],
      ["昨天天气很冷。", "Zuótiān tiānqì hěn lěng.", "Hôm qua thời tiết rất lạnh."],
      ["昨天我去书店买了三本书。", "Zuótiān wǒ qù shūdiàn mǎi le sān běn shū.", "Hôm qua tôi đến hiệu sách mua ba quyển sách."]
    ]
  ],
  [
    "坐", "zuò", "Tọa", "Ngồi, đi (xe)", "Động từ", "Hành động",
    [
      ["请坐下来。", "Qǐng zuò xiàlai.", "Xin mời ngồi xuống."],
      ["我们坐出租车去学校吧。", "Wǒmen zuò chūzūchē qù xuéxiào ba.", "Chúng mình đi taxi đến trường nhé."],
      ["他坐在我前面。", "Tā zuò zài wǒ qiánmian.", "Anh ấy ngồi ở phía trước tôi."]
    ]
  ],
  [
    "做", "zuò", "Tác", "Làm, nấu", "Động từ", "Hành động",
    [
      ["做作业。", "Zuò zuòyè.", "Làm bài tập."],
      ["妈妈做菜非常好吃。", "Māma zuò cài fēicháng hǎochī.", "Mẹ nấu ăn ngon vô cùng."],
      ["你周末想做什么？", "Nǐ zhōumò xiǎng zuò shénme?", "Cuối tuần bạn muốn làm gì?"]
    ]
  ],
  [
    "文", "wén", "Văn", "Văn hóa, chữ viết", "Danh từ", "Học tập",
    [
      ["学中文。", "Xué Zhōngwén.", "Học tiếng Trung."],
      ["中国文化很有名。", "Zhōngguó wénhuà hěn yǒumíng.", "Văn hóa Trung Quốc rất nổi tiếng."],
      ["这篇文章写得很好。", "Zhè piān wénzhāng xiě de hěn hǎo.", "Bài văn này viết rất hay."]
    ]
  ],
  [
    "车", "chē", "Xa", "Xe cộ", "Danh từ", "Giao thông",
    [
      ["上车。", "Shàng chē.", "Lên xe."],
      ["这是谁的车？", "Zhè shì shéi de chē?", "Đây là xe của ai?"],
      ["路上有很多车。", "Lù shàng yǒu hěn duō chē.", "Trên đường có rất nhiều xe cộ."]
    ]
  ],
  [
    "门", "mén", "Môn", "Cửa", "Danh từ", "Đồ vật",
    [
      ["开门。", "Kāi mén.", "Mở cửa."],
      ["请关上门。", "Qǐng guānshàng mén.", "Làm ơn đóng cửa lại."],
      ["学校大门口有很多人。", "Xuéxiào dàmén kǒu yǒu hěn duō rén.", "Cổng lớn trường học có rất đông người."]
    ]
  ],
  [
    "日", "rì", "Nhật", "Ngày, mặt trời", "Danh từ", "Thời gian",
    [
      ["生日快乐。", "Shēngrì kuàilè.", "Sinh nhật vui vẻ."],
      ["十月一日是国庆节。", "Shí yuè yī rì shì Guóqìngjié.", "Ngày 1 tháng 10 là ngày Quốc khánh."],
      ["日出东方。", "Rì chū dōngfāng.", "Mặt trời mọc từ phương đông."]
    ]
  ],
  [
    "天", "tiān", "Thiên", "Trời, ngày", "Danh từ", "Thời gian",
    [
      ["每一天。", "Měi yì tiān.", "Mỗi một ngày."],
      ["今天天气晴朗。", "Jīntiān tiānqì qínglǎng.", "Hôm nay trời nắng ráo."],
      ["春天来了，天变暖了。", "Chūntiān lái le, tiān biàn nuǎn le.", "Mùa xuân đến rồi, trời trở nên ấm áp."]
    ]
  ]
];

console.log('HSK 1 base count:', hsk1Data.length);
