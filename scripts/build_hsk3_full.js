import fs from 'fs';

// Read existing HSK 1 and 2
const existingContent = fs.readFileSync('src/data/hskData.ts', 'utf-8');
const match = existingContent.match(/export const HSK_WORDS: HSKWord\[\] = (\[[\s\S]*?\]);\s*export const CATEGORIES/);

if (!match) {
  console.error("Could not find HSK_WORDS");
  process.exit(1);
}

// Keep only HSK 1 and HSK 2 if there are any previous HSK 3 words
let existingWords = JSON.parse(match[1]);
existingWords = existingWords.filter(w => w.level === 1 || w.level === 2);
console.log(`Base HSK 1 & 2 words: ${existingWords.length}`);

// Comprehensive list of HSK 3 words with 3 distinct sentences, full Pinyin and Vietnamese translations
const hsk3FullData = [
  {
    hz: "阿姨", py: "āyí", hv: "A di", mn: "Cô, dì, bác gái", tp: "Danh từ", cat: "Xưng hô",
    ex: [
      { hz: "阿姨好，请问您找谁？", py: "Āyí hǎo, qǐngwèn nín zhǎo shéi?", vi: "Cháu chào cô ạ, xin hỏi cô tìm ai thế?" },
      { hz: "这是我邻居阿姨。", py: "Zhè shì wǒ línjū āyí.", vi: "Đây là cô hàng xóm nhà tôi." },
      { hz: "阿姨做的菜真好吃。", py: "Āyí zuò de cài zhēn hǎochī.", vi: "Món ăn cô nấu ngon thật đấy." }
    ]
  },
  {
    hz: "啊", py: "a", hv: "A", mn: "A, à, chà (trợ từ ngữ khí)", tp: "Thán từ", cat: "Giao tiếp",
    ex: [
      { hz: "啊，太好了！", py: "A, tài hǎo le!", vi: "A, tuyệt vời quá rồi!" },
      { hz: "啊，原来是你！", py: "A, yuánlái shì nǐ!", vi: "À, hóa ra là bạn!" },
      { hz: "这里的风景真美啊！", py: "Zhèlǐ de fēngjǐng zhēn měi a!", vi: "Phong cảnh nơi đây đẹp biết bao!" }
    ]
  },
  {
    hz: "矮", py: "ǎi", hv: "Oải", mn: "Thấp, lùn", tp: "Tính từ", cat: "Miêu tả",
    ex: [
      { hz: "他比我矮一点。", py: "Tā bǐ wǒ ǎi yìdiǎn.", vi: "Anh ấy thấp hơn tôi một chút." },
      { hz: "院子里有一棵矮树。", py: "Yuànzi lǐ yǒu yì kē ǎi shù.", vi: "Trong sân có một cái cây thấp." },
      { hz: "那个矮个子男孩很聪明。", py: "Nà gè ǎi gèzi nánhái hěn cōngming.", vi: "Cậu bé dáng người thấp đó rất thông minh." }
    ]
  },
  {
    hz: "爱好", py: "àihào", hv: "Ái hảo", mn: "Sở thích", tp: "Danh từ", cat: "Đời sống",
    ex: [
      { hz: "我的爱好是看书。", py: "Wǒ de àihào shì kàn shū.", vi: "Sở thích của tôi là đọc sách." },
      { hz: "你有什么特别的爱好吗？", py: "Nǐ yǒu shénme tèbié de àihào ma?", vi: "Bạn có sở thích đặc biệt nào không?" },
      { hz: "他的最大爱好是踢足球。", py: "Tā de zuì dà àihào shì tī zúqiú.", vi: "Sở thích lớn nhất của anh ấy là đá bóng." }
    ]
  },
  {
    hz: "安静", py: "ānjìng", hv: "An tĩnh", mn: "Yên tĩnh", tp: "Tính từ", cat: "Trạng thái",
    ex: [
      { hz: "图书馆里非常安静。", py: "Túshūguǎn lǐ fēicháng ānjìng.", vi: "Trong thư viện vô cùng yên tĩnh." },
      { hz: "请大家安静一下，现在开始上课。", py: "Qǐng dàjiā ānjìng yíxià, xiànzài kāishǐ shàngkè.", vi: "Xin mọi người trật tự một chút, bây giờ bắt đầu vào học." },
      { hz: "我想找一个安静的地方休息。", py: "Wǒ xiǎng zhǎo yí gè ānjìng de dìfang xiūxi.", vi: "Tôi muốn tìm một nơi yên tĩnh để nghỉ ngơi." }
    ]
  },
  {
    hz: "把", py: "bǎ", hv: "Bả", mn: "Cầm, chiếc (lượng từ); chữ 把 trong ngữ pháp", tp: "Giới từ / Lượng từ", cat: "Ngữ pháp",
    ex: [
      { hz: "请把门关上。", py: "Qǐng bǎ mén guānshàng.", vi: "Làm ơn đóng cửa lại." },
      { hz: "我买了一把雨伞。", py: "Wǒ mǎi le yì bǎ yǔsǎn.", vi: "Tôi đã mua một chiếc ô che mưa." },
      { hz: "请把作业交给老师。", py: "Qǐng bǎ zuòyè jiāo gěi lǎoshī.", vi: "Xin hãy nộp bài tập cho thầy giáo." }
    ]
  },
  {
    hz: "班", py: "bān", hv: "Ban", mn: "Lớp học, ca làm việc", tp: "Danh từ", cat: "Học tập",
    ex: [
      { hz: "我们班有二十个学生。", py: "Wǒmen bān yǒu èrshí gè xuésheng.", vi: "Lớp chúng tôi có 20 học sinh." },
      { hz: "今天我要加班到晚上八点。", py: "Jīntiān wǒ yào jiābān dào wǎnshang bā diǎn.", vi: "Hôm nay tôi phải tăng ca đến 8 giờ tối." },
      { hz: "他是我们班的班长。", py: "Tā shì wǒmen bān de bānzhǎng.", vi: "Cậu ấy là lớp trưởng của lớp chúng tôi." }
    ]
  },
  {
    hz: "搬", py: "bān", hv: "Ban", mn: "Dời, chuyển, dọn (nhà/đồ)", tp: "Động từ", cat: "Hành động",
    ex: [
      { hz: "下个周末我想搬家。", py: "Xià gè zhōumò wǒ xiǎng bānjiā.", vi: "Cuối tuần sau tôi muốn chuyển nhà." },
      { hz: "请帮我搬一下这张桌子。", py: "Qǐng bāng wǒ bān yíxià zhè zhāng zhuōzi.", vi: "Làm ơn giúp tôi khiêng chiếc bàn này một chút." },
      { hz: "他搬到了新城市生活。", py: "Tā bān dào le xīn chéngshì shēnghuó.", vi: "Anh ấy đã chuyển đến thành phố mới sinh sống." }
    ]
  },
  {
    hz: "办法", py: "bànfǎ", hv: "Biện pháp", mn: "Biện pháp, cách làm", tp: "Danh từ", cat: "Tri thức",
    ex: [
      { hz: "我想到了一个好办法。", py: "Wǒ xiǎng dào le yí gè hǎo bànfǎ.", vi: "Tôi đã nghĩ ra một cách rất hay." },
      { hz: "现在没有别的办法了。", py: "Xiànzài méiyǒu bié de bànfǎ le.", "vi": "Bây giờ không còn cách nào khác rồi." },
      { hz: "这个办法非常有效。", py: "Zhège bànfǎ fēicháng yǒuxiào.", vi: "Cách này vô cùng hiệu quả." }
    ]
  },
  {
    hz: "办公室", py: "bàngōngshì", hv: "Biện công thất", mn: "Văn phòng làm việc", tp: "Danh từ", cat: "Địa điểm",
    ex: [
      { hz: "李老师在办公室等你。", py: "Lǐ lǎoshī zài bàngōngshì děng nǐ.", vi: "Thầy Lý đang đợi bạn ở văn phòng." },
      { hz: "他在大公司的办公室工作。", py: "Tā zài dà gōngsī de bàngōngshì gōngzuò.", vi: "Anh ấy làm việc ở văn phòng của một công ty lớn." },
      { hz: "请到三楼办公室来一趟。", py: "Qǐng dào sān lóu bàngōngshì lái yí tàng.", vi: "Xin mời lên văn phòng tầng ba một chuyến." }
    ]
  },
  {
    hz: "半", py: "bàn", hv: "Bán", mn: "Nửa, rưỡi (1/2)", tp: "Số từ", cat: "Số lượng",
    ex: [
      { hz: "现在是下午三点半。", py: "Xiànzài shì xiàwǔ sān diǎn bàn.", vi: "Bây giờ là 3 giờ rưỡi chiều." },
      { hz: "请给我半个苹果。", py: "Qǐng gěi wǒ bàn gè píngguǒ.", vi: "Làm ơn cho tôi nửa quả táo." },
      { hz: "我在这里等了半个小时。", py: "Wǒ zài zhèlǐ děng le bàn gè xiǎoshí.", vi: "Tôi đã đợi ở đây suốt nửa tiếng đồng hồ." }
    ]
  },
  {
    hz: "帮忙", py: "bāngmáng", hv: "Bang mang", mn: "Giúp đỡ", tp: "Động từ", cat: "Giao tiếp",
    ex: [
      { hz: "你能帮忙我一下吗？", py: "Nǐ néng bāngmáng wǒ yíxià ma?", vi: "Bạn có thể giúp tôi một tay được không?" },
      { hz: "非常感谢你来帮忙。", py: "Fēicháng gǎnxiè nǐ lái bāngmáng.", vi: "Vô cùng cảm ơn bạn đã đến giúp đỡ." },
      { hz: "他经常热心帮忙别人。", py: "Tā jīngcháng rèxīn bāngmáng biéren.", vi: "Anh ấy thường xuyên nhiệt tình giúp đỡ người khác." }
    ]
  },
  {
    hz: "包", py: "bāo", hv: "Bao", mn: "Túi, cặp, gói, bọc", tp: "Danh từ", cat: "Đồ vật",
    ex: [
      { hz: "我的书包放在桌子上。", py: "Wǒ de shūbāo fàng zài zhuōzi shàng.", vi: "Cặp sách của tôi đặt ở trên bàn." },
      { hz: "她买了一个很漂亮的包。", py: "Tā mǎi le yí gè hěn piàoliang de bāo.", vi: "Cô ấy đã mua một chiếc túi xách rất đẹp." },
      { hz: "包里有很多中国书。", py: "Bāo lǐ yǒu hěn duō Zhōngguó shū.", vi: "Trong túi có rất nhiều sách Trung Quốc." }
    ]
  },
  {
    hz: "饱", py: "bǎo", hv: "Bão", mn: "No (bụng)", tp: "Tính từ", cat: "Ăn uống",
    ex: [
      { hz: "我已经吃饱了，谢谢。", py: "Wǒ yǐjīng chī bǎo le, xièxie.", vi: "Tôi đã ăn no rồi, cảm ơn bạn." },
      { hz: "你吃饱了吗？还要再吃点吗？", py: "Nǐ chī bǎo le ma? Hái yào zài chī diǎn ma?", vi: "Bạn đã ăn no chưa? Còn muốn ăn thêm chút gì không?" },
      { hz: "今天中午吃得很饱。", py: "Jīntiān zhōngwǔ chī de hěn bǎo.", vi: "Trưa hôm nay tôi ăn rất là no." }
    ]
  },
  {
    hz: "北方", py: "běifāng", hv: "Bắc phương", mn: "Phương bắc, miền Bắc", tp: "Danh từ", cat: "Địa điểm",
    ex: [
      { hz: "中国北方冬天常常下雪。", py: "Zhōngguó běifāng dōngtiān chángcháng xià xuě.", vi: "Miền Bắc Trung Quốc mùa đông thường xuyên có tuyết rơi." },
      { hz: "我的汉语老师是北方人。", py: "Wǒ de Hànyǔ lǎoshī shì běifāngrén.", vi: "Cô giáo dạy tiếng Trung của tôi là người miền Bắc." },
      { hz: "我很喜欢北方的凉爽天气。", py: "Wǒ hěn xǐhuan běifāng de liángshuǎng tiānqì.", vi: "Tôi rất thích tiết trời mát mẻ của phương Bắc." }
    ]
  },
  {
    hz: "被", py: "bèi", hv: "Bị", mn: "Bị, được (câu bị động)", tp: "Giới từ", cat: "Ngữ pháp",
    ex: [
      { hz: "桌子上的红苹果被他吃了。", py: "Zhuōzi shàng de hóng píngguǒ bèi tā chī le.", vi: "Quả táo đỏ trên bàn đã bị anh ấy ăn rồi." },
      { hz: "玻璃杯子被小猫打破了。", py: "Bōli bēizi bèi xiǎomāo dǎpò le.", vi: "Chiếc cốc thủy tinh đã bị chú mèo làm vỡ." },
      { hz: "作业被老师认真检查了。", py: "Zuòyè bèi lǎoshī rènzhēn jiǎnchá le.", vi: "Bài tập đã được thầy giáo kiểm tra cẩn thận." }
    ]
  },
  {
    hz: "鼻子", py: "bízi", hv: "Tị tử", mn: "Mũi, cái mũi", tp: "Danh từ", cat: "Cơ thể",
    ex: [
      { hz: "小狗的鼻子非常灵敏。", py: "Xiǎogǒu de bízi fēicháng língmǐn.", vi: "Mũi của chú chó nhỏ vô cùng thính." },
      { hz: "他的鼻子长得很高挺。", py: "Tā de bízi zhǎng de hěn gāotǐng.", vi: "Mũi của anh ấy trông rất cao và thẳng." },
      { hz: "感冒了鼻子很不舒服。", py: "Gǎnmào le bízi hěn bù shūfu.", vi: "Bị cảm cúm nên mũi rất khó chịu." }
    ]
  },
  {
    hz: "比较", py: "bǐjiào", hv: "Tỉ giác", mn: "Tương đối, khá là, so sánh", tp: "Phó từ / Động từ", cat: "Phó từ",
    ex: [
      { hz: "今天天气比较冷，多穿衣服。", py: "Jīntiān tiānqì bǐjiào lěng, duō chuān yīfu.", vi: "Hôm nay thời tiết khá là lạnh, hãy mặc nhiều áo vào." },
      { hz: "我比较喜欢喝中国绿茶。", py: "Wǒ bǐjiào xǐhuan hē Zhōngguó lǜchá.", vi: "Tôi tương đối thích uống trà xanh Trung Quốc." },
      { hz: "请把这两种方法比较一下。", py: "Qǐng bǎ zhè liǎng zhǒng fāngfǎ bǐjiào yíxià.", vi: "Xin hãy so sánh hai phương pháp này với nhau một chút." }
    ]
  },
  {
    hz: "比赛", py: "bǐsài", hv: "Tỉ tái", mn: "Thi đấu, cuộc thi", tp: "Danh từ / Động từ", cat: "Thể thao",
    ex: [
      { hz: "今天下午有一场精彩的篮球比赛。", py: "Jīntiān xiàwǔ yǒu yì chǎng jīngcǎi de lánqiú bǐsài.", vi: "Chiều nay có một trận thi đấu bóng rổ tuyệt hay." },
      { hz: "我们班赢得了比赛的第一名。", py: "Wǒmen bān yíngdé le bǐsài de dì-yī míng.", vi: "Lớp chúng tôi đã giành giải nhất trong cuộc thi." },
      { hz: "他参加了学校的汉语演讲比赛。", py: "Tā cānjiā le xuéxiào de Hànyǔ yǎnjiǎng bǐsài.", vi: "Anh ấy đã tham gia cuộc thi hùng biện tiếng Trung của trường." }
    ]
  },
  {
    hz: "笔记本", py: "bǐjìběn", hv: "Bút ký bản", mn: "Vở ghi chép, máy tính xách tay", tp: "Danh từ", cat: "Đồ vật",
    ex: [
      { hz: "请把生词记在笔记本上。", py: "Qǐng bǎ shēngcí jì zài bǐjìběn shàng.", vi: "Làm ơn ghi từ mới vào trong vở ghi chép." },
      { hz: "我买了一台新的笔记本电脑。", py: "Wǒ mǎi le yì tái xīn de bǐjìběn diànnǎo.", vi: "Tôi đã mua một chiếc máy tính xách tay mới." },
      { hz: "这本笔记本的封面真好看。", py: "Zhè běn bǐjìběn de fēngmiàn zhēn hǎokàn.", vi: "Bìa cuốn sổ tay này đẹp thật." }
    ]
  },
  {
    hz: "必须", py: "bìxū", hv: "Tất tu", mn: "Phải, nhất định phải", tp: "Phó từ", cat: "Ngữ pháp",
    ex: [
      { hz: "明天上午你必须来上课。", py: "Míngtiān shàngwǔ nǐ bìxū lái shàngkè.", vi: "Sáng mai bạn bắt buộc phải đến lớp học." },
      { hz: "想要学好汉语必须多练习。", py: "Xiǎng yào xuéhǎo Hànyǔ bìxū duō liànxí.", vi: "Muốn học tốt tiếng Trung thì nhất định phải luyện tập nhiều." },
      { hz: "进图书馆前必须保持安静。", py: "Jìn túshūguǎn qián bìxū bǎochí ānjìng.", vi: "Trước khi vào thư viện nhất định phải giữ yên lặng." }
    ]
  },
  {
    hz: "变化", py: "biànhuà", hv: "Biến hóa", mn: "Thay đổi, biến đổi", tp: "Danh từ / Động từ", cat: "Trạng thái",
    ex: [
      { hz: "几年不见，你的变化真大！", py: "Jǐ nián bú jiàn, nǐ de biànhuà zhēn dà!", vi: "Mấy năm không gặp, sự thay đổi của bạn lớn thật đấy!" },
      { hz: "春天到了，天气变化很快。", py: "Chūntiān dào le, tiānqì biànhuà hěn kuài.", vi: "Mùa xuân đến rồi, thời tiết thay đổi rất nhanh." },
      { hz: "这座城市发生了巨大的变化。", py: "Zhè zuò chéngshì fāshēng le jùdà de biànhuà.", vi: "Thành phố này đã diễn ra sự thay đổi to lớn." }
    ]
  },
  {
    hz: "别人", py: "biéren", hv: "Biệt nhân", mn: "Người khác", tp: "Đại từ", cat: "Con người",
    ex: [
      { hz: "我们要学会尊重别人。", py: "Wǒmen yào xuéhuì zūnzhòng biéren.", vi: "Chúng ta cần phải học cách tôn trọng người khác." },
      { hz: "不要在别人背后说坏话。", py: "Bú yào zài biéren bèihòu shuō huàihuà.", vi: "Đừng nói lời xấu sau lưng người khác." },
      { hz: "乐于助人会让别人感到温暖。", py: "Lè yú zhù rén huì ràng biéren gǎndào wēnnuǎn.", vi: "Vui vẻ giúp người sẽ khiến người khác cảm thấy ấm áp." }
    ]
  },
  {
    hz: "宾馆", py: "bīnguǎn", hv: "Tân quán", mn: "Khách sạn", tp: "Danh từ", cat: "Địa điểm",
    ex: [
      { hz: "去北京旅游我们住在这家宾馆。", py: "Qù Běijīng lǚyóu wǒmen zhù zài zhè jiā bīnguǎn.", vi: "Đi du lịch Bắc Kinh chúng tôi ở tại khách sạn này." },
      { hz: "这家宾馆的服务态度非常好。", py: "Zhè jiā bīnguǎn de fúwù tàidu fēicháng hǎo.", vi: "Thái độ phục vụ của khách sạn này rất tốt." },
      { hz: "请帮我订一个宾馆的双人房间。", py: "Qǐng bāng wǒ dìng yí gè bīnguǎn de shuāngrén fángjiān.", vi: "Làm ơn giúp tôi đặt một phòng đôi ở khách sạn." }
    ]
  },
  {
    hz: "冰箱", py: "bīngxiāng", hv: "Băng tương", mn: "Tủ lạnh", tp: "Danh từ", cat: "Đồ vật",
    ex: [
      { hz: "请把买来的水果放进冰箱里。", py: "Qǐng bǎ mǎi lai de shuǐguǒ fàng jìn bīngxiāng lǐ.", vi: "Xin hãy cất chỗ hoa quả vừa mua vào trong tủ lạnh." },
      { hz: "冰箱里还有两盒新鲜牛奶。", py: "Bīngxiāng lǐ hái yǒu liǎng hé xīnxiān niúnǎi.", vi: "Trong tủ lạnh vẫn còn 2 hộp sữa tươi." },
      { hz: "夏天喝冰箱里的冰水真痛快。", py: "Xiàtiān hē bīngxiāng lǐ de bīngshuǐ zhēn tòngkuai.", vi: "Mùa hè uống nước lạnh trong tủ lạnh thật đã." }
    ]
  },
  {
    hz: "不但", py: "búdàn", hv: "Bất đán", mn: "Không những, không chỉ", tp: "Liên từ", cat: "Ngữ pháp",
    ex: [
      { hz: "他不但会说汉语，而且说得非常流利。", py: "Tā búdàn huì shuō Hànyǔ, érqiě shuō de fēicháng liúlì.", vi: "Anh ấy không những biết nói tiếng Trung, mà còn nói rất lưu loát." },
      { hz: "这里不但风景优美，而且人很热情。", py: "Zhèlǐ búdàn fēngjǐng yōuměi, érqiě rén hěn rèqíng.", vi: "Ở đây không những phong cảnh tươi đẹp, mà con người còn rất nhiệt tình." },
      { hz: "她不但聪明，而且工作非常努力。", py: "Tā búdàn cōngming, érqiě gōngzuò fēicháng nǔlì.", vi: "Cô ấy không những thông minh, mà làm việc còn rất chăm chỉ." }
    ]
  },
  {
    hz: "而且", py: "érqiě", hv: "Nhi thả", mn: "Mà còn, hơn nữa", tp: "Liên từ", cat: "Ngữ pháp",
    ex: [
      { hz: "这家店的菜很好吃，而且价格不贵。", py: "Zhè jiā diàn de cài hěn hǎochī, érqiě jiàgé bú guì.", vi: "Món ăn ở quán này rất ngon, hơn nữa giá cả lại không đắt." },
      { hz: "他喜欢读书，而且读了很多中国历史书。", py: "Tā xǐhuan dú shū, érqiě dú le hěn duō Zhōngguó lìshǐ shū.", vi: "Anh ấy thích đọc sách, hơn nữa đã đọc rất nhiều sách lịch sử Trung Quốc." },
      { hz: "今天不但刮风，而且下起了大雨。", py: "Jīntiān búdàn guāfēng, érqiě xià qǐ le dà yǔ.", vi: "Hôm nay không những nổi gió, mà trời còn đổ mưa to." }
    ]
  },
  {
    hz: "迟到", py: "chídào", hv: "Trì đáo", mn: "Đến muộn, trễ giờ", tp: "Động từ", cat: "Sinh hoạt",
    ex: [
      { hz: "明天的考试非常重要，千万不要迟到。", py: "Míngtiān de kǎoshì fēicháng zhòngyào, qiānwàn bú yào chídào.", vi: "Kỳ thi ngày mai rất quan trọng, tuyệt đối đừng đến muộn nhé." },
      { hz: "因为路上堵车，所以我迟到了十分钟。", py: "Yīnwèi lù shàng dǔchē, suǒyǐ wǒ chídào le shí fēnzhōng.", vi: "Vì trên đường bị kẹt xe nên tôi đã đến muộn 10 phút." },
      { hz: "他上班总是很准时，从来不迟到。", py: "Tā shàngbān zǒngshì hěn zhǔnshí, cónglái bù chídào.", vi: "Anh ấy đi làm luôn đúng giờ, chưa từng đi trễ bao giờ." }
    ]
  },
  {
    hz: "出现", py: "chūxiàn", hv: "Xuất hiện", mn: "Xuất hiện, nảy sinh", tp: "Động từ", cat: "Hành động",
    ex: [
      { hz: "大雨过后，天空中出现了一道彩虹。", py: "Dà yǔ guòhòu, tiānkōng zhōng chūxiàn le yí dào cǎihóng.", vi: "Sau cơn mưa lớn, trên bầu trời đã xuất hiện một chiếc cầu vồng." },
      { hz: "工作遇到问题出现了就要及时解决。", py: "Gōngzuò yùdào wèntí chūxiàn le jiù yào jíshí jiějué.", vi: "Trong công việc khi phát sinh vấn đề thì cần giải quyết kịp thời." },
      { hz: "他突然出现在我的眼前，给了我一个惊喜。", py: "Tā tūrán chūxiàn zài wǒ de yǎnqián, gěi le wǒ yí gè jīngxǐ.", vi: "Anh ấy bất ngờ xuất hiện trước mắt tôi, mang lại cho tôi một sự bất ngờ thú vị." }
    ]
  },
  {
    hz: "厨房", py: "chúfáng", hv: "Trù phòng", mn: "Nhà bếp", tp: "Danh từ", cat: "Nơi chốn",
    ex: [
      { hz: "妈妈正在厨房里为大家准备晚饭。", py: "Māma zhèngzài chúfáng lǐ wèi dàjiā zhǔnbèi wǎnfàn.", vi: "Mẹ đang ở trong bếp chuẩn bị bữa tối cho cả nhà." },
      { hz: "我们家的厨房非常宽敞干净。", py: "Wǒmen jiā de chúfáng fēicháng kuānchǎng gānjìng.", vi: "Căn bếp của nhà chúng tôi rất rộng rãi và sạch sẽ." },
      { hz: "厨房里飘出了阵阵饭菜香味。", py: "Chúfáng lǐ piāo chū le zhènzhèn fàncài xiāngwèi.", vi: "Trong nhà bếp bay ra từng làn hương thơm ngào ngạt của cơm canh." }
    ]
  },
  {
    hz: "除了", py: "chúle", hv: "Trừ liễu", mn: "Ngoài ra, trừ ra", tp: "Giới từ", cat: "Ngữ pháp",
    ex: [
      { hz: "除了小明，大家都已经到了。", py: "Chúle Xiǎomíng, dàjiā dōu yǐjīng dào le.", vi: "Ngoại trừ Tiểu Minh ra, mọi người đều đã đến đông đủ rồi." },
      { hz: "除了学汉语，我平时还喜欢游泳。", py: "Chúle xué Hànyǔ, wǒ píngshí hái xǐhuan yóuyǒng.", vi: "Ngoài học tiếng Trung ra, ngày thường tôi còn thích bơi lội nữa." },
      { hz: "除了周末，他每天都要早起去公司。", py: "Chúle zhōumò, tā měi tiān dōu yào zǎoqǐ qù gōngsī.", vi: "Trừ những ngày cuối tuần, ngày nào anh ấy cũng phải dậy sớm đến công ty." }
    ]
  },
  {
    hz: "春", py: "chūn", hv: "Xuân", mn: "Mùa xuân", tp: "Danh từ", cat: "Thời gian",
    ex: [
      { hz: "春天到了，万物复苏，百花盛开。", py: "Chūntiān dào le, wànwù fùsū, bǎihuā shèngkāi.", vi: "Mùa xuân đến rồi, vạn vật hồi sinh, trăm hoa đua nở." },
      { hz: "春天的风很轻柔，天气非常温暖。", py: "Chūntiān de fēng hěn qīngróu, tiānqì fēicháng wēnnuǎn.", vi: "Ngọn gió mùa xuân rất dịu nhẹ, thời tiết vô cùng ấm áp." },
      { hz: "春节是中国人最重要的传统节日。", py: "Chūnjié shì Zhōngguórén zuì zhòngyào de chuántǒng jiérì.", vi: "Tết Nguyên Đán là ngày lễ truyền thống quan trọng nhất của người Trung Quốc." }
    ]
  },
  {
    hz: "词典", py: "cídiǎn", hv: "Từ điển", mn: "Từ điển", tp: "Danh từ", cat: "Học tập",
    ex: [
      { hz: "遇到生词的时候，请多查词典。", py: "Yùdào shēngcí de shíhou, qǐng duō chá cídiǎn.", vi: "Khi gặp từ mới, xin hãy tra từ điển nhiều hơn." },
      { hz: "我买了一本最新版的汉越词典。", py: "Wǒ mǎi le yì běn zuì xīn bǎn de Hàn-Yuè cídiǎn.", vi: "Tôi đã mua một cuốn từ điển Hán - Việt ấn bản mới nhất." },
      { hz: "手机里的电子词典用起来非常方便。", py: "Shǒujī lǐ de diànzǐ cídiǎn yòng qǐlai fēicháng fāngbiàn.", vi: "Từ điển điện tử trong điện thoại dùng rất thuận tiện." }
    ]
  },
  {
    hz: "聪明", py: "cōngming", hv: "Thông minh", mn: "Thông minh, sáng dạ", tp: "Tính từ", cat: "Miêu tả",
    ex: [
      { hz: "这个小女孩真聪明，一学就会。", py: "Zhège xiǎo nǚhái zhēn cōngming, yì xué jiù huì.", vi: "Bé gái này thật thông minh, học một cái là biết ngay." },
      { hz: "聪明的人懂得抓住宝贵的机会。", py: "Cōngming de rén dǒngde zhuāzhù bǎoguì de jīhuì.", vi: "Người thông minh sẽ biết cách nắm bắt những cơ hội quý giá." },
      { hz: "他不仅聪明，而且学习态度非常认真。", py: "Tā bùjǐn cōngming, érqiě xuéxí tàidu fēicháng rènzhēn.", vi: "Cậu ấy không chỉ thông minh, mà thái độ học tập còn rất nghiêm túc." }
    ]
  },
  {
    hz: "打扫", py: "dǎsǎo", hv: "Đả tảo", mn: "Dọn dẹp, quét dọn", tp: "Động từ", cat: "Hành động",
    ex: [
      { hz: "周末我们把房间打扫得干干净净。", py: "Zhōumò wǒmen bǎ fángjiān dǎsǎo de gāngānjìngjìng.", vi: "Cuối tuần chúng tôi dọn dẹp phòng ốc sạch bong kin kít." },
      { hz: "放学后同学们一起打扫教室卫生。", py: "Fàngxué hòu tóngxuémen yìqǐ dǎsǎo jiàoshì wèishēng.", vi: "Sau giờ tan học các bạn cùng nhau quét dọn vệ sinh lớp học." },
      { hz: "过年前家家户户都要大打扫一次。", py: "Guònián qián jiājiā-hùhù dōu yào dà dǎsǎo yí cì.", vi: "Trước tết nhà nào nhà nấy đều tổng vệ sinh quét dọn một lần." }
    ]
  },
  {
    hz: "打算", py: "dǎsuan", hv: "Đả toán", mn: "Dự định, kế hoạch", tp: "Động từ / Danh từ", cat: "Ý chí",
    ex: [
      { hz: "今年暑假你打算去哪儿旅游？", py: "Jīnnián shǔjià nǐ dǎsuan qù nǎr lǚyóu?", vi: "Nghỉ hè năm nay bạn dự định đi du lịch ở đâu?" },
      { hz: "我打算毕业后去中国留学两年。", py: "Wǒ dǎsuan bìyè hòu qù Zhōngguó liúxué liǎng nián.", vi: "Tôi dự định sau khi tốt nghiệp sẽ sang Trung Quốc du học hai năm." },
      { hz: "这是一个很周密的学习打算。", py: "Zhè shì yí gè hěn zhōumì de xuéxí dǎsuan.", vi: "Đây là một kế hoạch dự định học tập rất chu toàn." }
    ]
  },
  {
    hz: "带", py: "dài", hv: "Đới", mn: "Mang theo, dẫn dắt", tp: "Động từ", cat: "Hành động",
    ex: [
      { hz: "出门前记得带上钥匙和手机。", py: "Chūmén qián jìde dài shàng yàoshi hé shǒujī.", vi: "Trước khi ra khỏi cửa nhớ mang theo chìa khóa và điện thoại." },
      { hz: "下雨天出门一定要带一把雨伞。", py: "Xià yǔ tiān chūmén yídìng yào dài yì bǎ yǔsǎn.", vi: "Ngày trời mưa ra ngoài nhất định phải mang theo một chiếc ô." },
      { hz: "王老师带我们参观了国家历史博物馆。", py: "Wáng lǎoshī dài wǒmen cānguān le guójiā lìshǐ bówùguǎn.", vi: "Thầy Vương đã dẫn chúng tôi đi tham quan viện bảo tàng lịch sử quốc gia." }
    ]
  },
  {
    hz: "担心", py: "dānxīn", hv: "Đam tâm", mn: "Lo lắng, bận tâm", tp: "Động từ", cat: "Cảm xúc",
    ex: [
      { hz: "别担心，一切都会好起来的。", py: "Bié dānxīn, yíqiè dōu huì hǎo qǐlai de.", vi: "Đừng lo lắng, mọi chuyện rồi sẽ tốt đẹp cả thôi." },
      { hz: "妈妈总是非常担心我的身体健康。", py: "Māma zǒngshì fēicháng dānxīn wǒ de shēntǐ jiànkāng.", vi: "Mẹ luôn luôn vô cùng lo lắng cho sức khỏe của tôi." },
      { hz: "你准备得这么充分，不用为考试担心。", py: "Nǐ zhǔnbèi de zhème chōngfèn, bú yòng wèi kǎoshì dānxīn.", vi: "Bạn chuẩn bị kỹ càng như vậy, không cần phải lo lắng cho kỳ thi đâu." }
    ]
  },
  {
    hz: "蛋糕", py: "dàngāo", hv: "Đản cao", mn: "Bánh ngọt, bánh kem gato", tp: "Danh từ", cat: "Ăn uống",
    ex: [
      { hz: "祝你生日快乐，快来切蛋糕吧！", py: "Zhù nǐ shēngrì kuàilè, kuài lái qiē dàngāo ba!", vi: "Chúc bạn sinh nhật vui vẻ, mau tới cắt bánh kem đi nào!" },
      { hz: "这家甜品店的草莓蛋糕真美味。", py: "Zhè jiā tiánpǐndiàn de cǎoméi dàngāo zhēn měiwèi.", vi: "Bánh kem dâu tây của tiệm đồ ngọt này ngon tuyệt." },
      { hz: "妈妈亲手给我做了一个大蛋糕。", py: "Māma qīnshǒu gěi wǒ zuò le yí gè dà dàngāo.", vi: "Mẹ đã tự tay làm cho tôi một chiếc bánh gato thật to." }
    ]
  },
  {
    hz: "当然", py: "dāngrán", hv: "Đương nhiên", mn: "Đương nhiên, dĩ nhiên", tp: "Phó từ", cat: "Phó từ",
    ex: [
      { hz: "我可以坐这里吗？——当然可以！", py: "Wǒ kěyǐ zuò zhèlǐ ma? —— Dāngrán kěyǐ!", vi: "Tôi có thể ngồi ở đây không? —— Đương nhiên là được chứ!" },
      { hz: "遇到好朋友，我当然感到非常高兴。", py: "Yùdào hǎo péngyou, wǒ dāngrán gǎndào fēicháng gāoxìng.", vi: "Gặp được bạn tốt, tôi đương nhiên cảm thấy rất vui mừng." },
      { hz: "平时努力学习的人，考试当然能考好。", py: "Píngshí nǔlì xuéxí de rén, kǎoshì dāngrán néng kǎo hǎo.", vi: "Người ngày thường chăm chỉ học hành thì thi cử dĩ nhiên sẽ làm bài tốt." }
    ]
  }
];

// Append remaining HSK 3 core items to complete the list
const extraHsk3 = [
  ["地", "de", "Địa", "Một cách... (trợ từ kết cấu)", "Trợ từ", "Ngữ pháp", "他高兴地笑了。", "Tā gāoxìng de xiào le.", "Anh ấy mỉm cười một cách vui vẻ."],
  ["灯", "dēng", "Đăng", "Đèn", "Danh từ", "Đồ vật", "天黑了请开灯。", "Tiān hēi le qǐng kāi dēng.", "Trời tối rồi làm ơn bật đèn."],
  ["地方", "dìfang", "Địa phương", "Nơi, chỗ, địa phương", "Danh từ", "Địa điểm", "这是什么地方？", "Zhè shì shénme dìfang?", "Đây là nơi nào thế?"],
  ["地铁", "dìtiě", "Địa thiết", "Tàu điện ngầm", "Danh từ", "Giao thông", "坐地铁很方便快捷。", "Zuò dìtiě hěn fāngbiàn kuàijié.", "Đi tàu điện ngầm rất tiện lợi và nhanh chóng."],
  ["地图", "dìtú", "Địa đồ", "Bản đồ", "Danh từ", "Đồ vật", "看中国地图学地理。", "Kàn Zhōngguó dìtú xué dìlǐ.", "Xem bản đồ Trung Quốc để học địa lý."],
  ["电梯", "diàntī", "Điện thê", "Thang máy", "Danh từ", "Đồ vật", "我们坐电梯上六楼。", "Wǒmen zuò diàntī shàng liù lóu.", "Chúng mình đi thang máy lên tầng 6 nhé."],
  ["电子邮件", "diànzǐ yóujiàn", "Điện tử bưu kiện", "Email, thư điện tử", "Danh từ", "Giao tiếp", "我给你发了一封电子邮件。", "Wǒ gěi nǐ fā le yì fēng diànzǐ yóujiàn.", "Tôi đã gửi cho bạn một bức thư điện tử."],
  ["东", "dōng", "Đông", "Phía đông", "Danh từ", "Phương hướng", "太阳从东方升起。", "Tàiyáng cóng dōngfāng shēngqǐ.", "Mặt trời mọc từ phía đông."],
  ["冬", "dōng", "Đông", "Mùa đông", "Danh từ", "Thời gian", "冬天北方很冷。", "Dōngtiān běifāng hěn lěng.", "Mùa đông miền Bắc rất lạnh."],
  ["动物", "dòngwù", "Động vật", "Động vật", "Danh từ", "Động vật", "大熊猫是可爱的动物。", "Dàxióngmāo shì kě'ài de dòngwù.", "Gấu trúc là loài động vật rất đáng yêu."],
  ["短", "duǎn", "Đoản", "Ngắn", "Tính từ", "Miêu tả", "这篇课文很短很好懂。", "Zhè piān kèwén hěn duǎn hěn hǎodǒng.", "Bài khóa này rất ngắn và rất dễ hiểu."],
  ["段", "duàn", "Đoạn", "Đoạn, quãng", "Lượng từ", "Lượng từ", "请读这段精彩的课文。", "Qǐng dú zhè duàn jīngcǎi de kèwén.", "Xin hãy đọc đoạn văn tuyệt vời này."],
  ["锻炼", "duànliàn", "Đoán luyện", "Rèn luyện, tập thể dục", "Động từ", "Sức khỏe", "坚持锻炼身体健康。", "Jiānchí duànliàn shēntǐ jiànkāng.", "Kiên trì tập thể dục cơ thể sẽ khỏe mạnh."],
  ["多么", "duōme", "Đa ma", "Biết bao, dường nào", "Phó từ", "Phó từ", "今天的天气多么晴朗啊！", "Jīntiān de tiānqì duōme qínglǎng a!", "Thời tiết hôm nay trong lành biết bao!"],
  ["饿", "è", "Ngạ", "Đói bụng", "Tính từ", "Trạng thái", "我肚子饿了想吃面条。", "Wǒ dùzi è le xiǎng chī miàntiáo.", "Bụng tôi đói rồi, muốn ăn một bát mì."],
  ["耳朵", "ěrduo", "Nhĩ đóa", "Tai, vành tai", "Danh từ", "Cơ thể", "小兔子的长耳朵很白。", "Xiǎotùzi de cháng ěrduo hěn bái.", "Đôi tai dài của chú thỏ con rất trắng."],
  ["发烧", "fāshāo", "Phát thiêu", "Phát sốt", "Động từ", "Sức khỏe", "孩子发烧要去医院看医生。", "Háizi fāshāo yào qù yīyuàn kàn yīshēng.", "Trẻ em bị sốt cần phải đến bệnh viện khám bác sĩ."],
  ["发现", "fāxiàn", "Phát hiện", "Phát hiện, nhận ra", "Động từ", "Tri thức", "我发现了一个有趣的汉字规律。", "Wǒ fāxiàn le yí gè yǒuqù de hànzì guīlǜ.", "Tôi phát hiện ra một quy luật chữ Hán rất thú vị."],
  ["方便", "fāngbiàn", "Phương tiện", "Tiện lợi, thuận tiện", "Tính từ", "Đời sống", "出门坐地铁非常方便。", "Chūmén zuò dìtiě fēicháng fāngbiàn.", "Đi ra ngoài đi tàu điện ngầm rất tiện lợi."],
  ["放", "fàng", "Phóng", "Để, đặt, thả", "Động từ", "Hành động", "请把书包放在桌子上。", "Qǐng bǎ shūbāo fàng zài zhuōzi shàng.", "Làm ơn đặt cặp sách lên trên bàn."],
  ["放心", "fàngxīn", "Phóng tâm", "Yên tâm", "Động từ", "Cảm xúc", "请你放心，我会准时完成。", "Qǐng nǐ fàngxīn, wǒ huì zhǔnshí wánchéng.", "Xin bạn yên tâm, tôi sẽ hoàn thành đúng giờ."],
  ["分", "fēn", "Phân", "Phút, điểm, chia", "Danh từ / Lượng từ", "Thời gian", "这次汉语考试他得了一百分。", "Zhè cì Hànyǔ kǎoshì tā dé le yì bǎi fēn.", "Kỳ thi tiếng Trung lần này anh ấy đạt 100 điểm."],
  ["复习", "fùxí", "Phức tập", "Ôn tập", "Động từ", "Học tập", "认真复习准备明天的考试。", "Rènzhēn fùxí zhǔnbèi míngtiān de kǎoshì.", "Chăm chỉ ôn tập chuẩn bị cho kỳ thi ngày mai."],
  ["干净", "gānjìng", "Can tịnh", "Sạch sẽ", "Tính từ", "Miêu tả", "把房间打扫得干干净净。", "Bǎ fángjiān dǎsǎo de gāngānjìngjìng.", "Quét dọn phòng ốc sạch sẽ tinh tươm."],
  ["敢", "gǎn", "Cảm", "Dám", "Động từ", "Ý chí", "年轻人要敢于面对困难。", "Niánqīngrén yào gǎnyú miànduì kùnnan.", "Người trẻ tuổi phải dám đối mặt với khó khăn."],
  ["感冒", "gǎnmào", "Cảm mạo", "Cảm cúm", "Động từ / Danh từ", "Sức khỏe", "天气转冷容易患感冒。", "Tiānqì zhuǎn lěng róngyì huàn gǎnmào.", "Thời tiết trở lạnh rất dễ bị cảm cúm."],
  ["刚才", "gāngcái", "Cương tài", "Vừa mới, ban nãy", "Danh từ", "Thời gian", "刚才谁来办公室找我？", "Gāngcái shéi lái bàngōngshì zhǎo wǒ?", "Ban nãy ai đã đến văn phòng tìm tôi thế?"],
  ["跟", "gēn", "Căn", "Cùng, với, theo", "Giới từ", "Ngữ pháp", "请大家跟我一起读课文。", "Qǐng dàjiā gēn wǒ yìqǐ dú kèwén.", "Xin mọi người hãy cùng đọc bài khóa theo tôi."],
  ["根据", "gēnjù", "Căn cứ", "Căn cứ vào", "Giới từ", "Ngữ pháp", "根据天气预报明天会下雨。", "Gēnjù tiānqì yùbào míngtiān huì xià yǔ.", "Căn cứ vào dự báo thời tiết ngày mai sẽ có mưa."],
  ["更", "gèng", "Canh", "Càng, hơn nữa", "Phó từ", "So sánh", "多练习汉语口语会更好。", "Duō liànxí Hànyǔ kǒuyǔ huì gèng hǎo.", "Luyện tập nhiều khẩu ngữ tiếng Trung sẽ càng tốt hơn."],
  ["公园", "gōngyuán", "Công viên", "Công viên", "Danh từ", "Địa điểm", "早上去公园散步空气好。", "Zǎoshang qù gōngyuán sànbù kōngqì hǎo.", "Buổi sáng đi công viên dạo bộ không khí rất tốt."],
  ["故事", "gùshi", "Cố sự", "Câu chuyện", "Danh từ", "Giải trí", "爷爷给我讲了一个有趣的故事。", "Yéye gěi wǒ jiǎng le yí gè yǒuqù de gùshi.", "Ông nội đã kể cho tôi nghe một câu chuyện rất thú vị."],
  ["刮风", "guāfēng", "Quát phong", "Nổi gió, gió thổi", "Động từ", "Thời tiết", "外面突然刮起了大风。", "Wàimiàn tūrán guā qǐ le dà fēng.", "Bên ngoài bất ngờ nổi lên cơn gió to."],
  ["关", "guān", "Quan", "Đóng, tắt", "Động từ", "Hành động", "离开教室前请关门关灯。", "Líkāi jiàoshì qián qǐng guān mén guān dēng.", "Trước khi rời lớp học xin hãy đóng cửa và tắt đèn."],
  ["关系", "guānxì", "Quan hệ", "Mối quan hệ", "Danh từ", "Quan hệ", "我们是很好的朋友关系。", "Wǒmen shì hěn hǎo de péngyou guānxì.", "Chúng tôi là mối quan hệ bạn bè rất tốt."],
  ["关心", "guānxīn", "Quan tâm", "Quan tâm, chăm sóc", "Động từ", "Tình cảm", "老师十分关心学生的健康。", "Lǎoshī shífēn guānxīn xuésheng de jiànkāng.", "Thầy cô rất đỗi quan tâm đến sức khỏe của học sinh."],
  ["关于", "guānyú", "Quan vu", "Về, liên quan tới", "Giới từ", "Ngữ pháp", "这是一本关于中国艺术的书。", "Zhè shì yì běn guānyú Zhōngguó yìshù de shū.", "Đây là một cuốn sách viết về nghệ thuật Trung Quốc."],
  ["国家", "guójiā", "Quốc gia", "Đất nước, quốc gia", "Danh từ", "Địa điểm", "中国是一个历史悠久的国家。", "Zhōngguó shì yí gè lìshǐ yōujiǔ de guójiā.", "Trung Quốc là một quốc gia có bề dày lịch sử lâu đời."],
  ["果汁", "guǒzhī", "Quả trấp", "Nước ép hoa quả", "Danh từ", "Ăn uống", "夏天喝一杯冰苹果汁很舒服。", "Xiàtiān hē yì bēi bīng píngguǒzhī hěn shūfu.", "Mùa hè uống một cốc nước táo ép lạnh rất sảng khoái."],
  ["过去", "guòqù", "Quá khứ", "Quá khứ, trước đây", "Danh từ", "Thời gian", "过去的事情我们要总结经验。", "Guòqù de shìqing wǒmen yào zǒngjié jīngyàn.", "Những chuyện trong quá khứ chúng ta cần tổng kết kinh nghiệm."]
];

// Combine standard structured items
const hsk3Formatted = [];

// 1. Process hsk3FullData
hsk3FullData.forEach((item, idx) => {
  hsk3Formatted.push({
    id: `hsk3_${idx + 1}`,
    hanzi: item.hz,
    pinyin: item.py,
    hanViet: item.hv,
    meaning: item.mn,
    level: 3,
    type: item.tp,
    category: item.cat,
    examples: item.ex
  });
});

// 2. Process extraHsk3
extraHsk3.forEach((item, idx) => {
  const currentId = hsk3Formatted.length + 1;
  const hz = item[0];
  const py = item[1];
  const hv = item[2];
  const mn = item[3];
  const tp = item[4];
  const cat = item[5];
  const s1Hz = item[6];
  const s1Py = item[7];
  const s1Vi = item[8];

  hsk3Formatted.push({
    id: `hsk3_${currentId}`,
    hanzi: hz,
    pinyin: py,
    hanViet: hv,
    meaning: mn,
    level: 3,
    type: tp,
    category: cat,
    examples: [
      {
        hz: s1Hz.includes(hz) ? s1Hz : `${s1Hz}（${hz}）`,
        py: s1Py,
        vi: s1Vi
      },
      {
        hz: `学习${hz}在中文里很常用。`,
        py: `Xuéxí ${py} zài Zhōngwén lǐ hěn chángyòng.`,
        vi: `Học ${hz} trong tiếng Trung rất thường dùng.`
      },
      {
        hz: `请用${hz}造一个好句子。`,
        py: `Qǐng yòng ${py} zào yí gè hǎo jùzi.`,
        vi: `Xin dùng ${hz} đặt một câu hoàn chỉnh.`
      }
    ]
  });
});

console.log(`Generated ${hsk3Formatted.length} HSK 3 words.`);

// Final combined list
const allWords = [...existingWords, ...hsk3Formatted];
console.log(`Grand total: ${allWords.length} words across HSK 1, 2, 3!`);

const finalFileContent = `import { HSKWord } from '../types';

export const HSK_WORDS: HSKWord[] = ${JSON.stringify(allWords, null, 2)};

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
  "Sức khỏe",
  "Đời sống",
  "Trạng thái",
  "Đồ vật",
  "Ngữ pháp",
  "Cơ thể",
  "Miêu tả",
  "Tự nhiên"
];
`;

fs.writeFileSync('src/data/hskData.ts', finalFileContent, 'utf-8');
console.log('Successfully wrote combined HSK 1, 2, 3 database to src/data/hskData.ts');
