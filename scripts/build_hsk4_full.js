import fs from 'fs';

// Read existing data
const content = fs.readFileSync('src/data/hskData.ts', 'utf-8');
const match = content.match(/export const HSK_WORDS: HSKWord\[\] = (\[[\s\S]*?\]);\s*export const CATEGORIES/);
const existingWords = JSON.parse(match[1]);

// Retain HSK 1, 2, 3
const baseWords = existingWords.filter(w => w.level === 1 || w.level === 2 || w.level === 3);
console.log(`Base words (HSK 1-3): ${baseWords.length}`);

// Standard official HSK 4 vocabulary list
const hsk4Data = [
  ["爱情", "àiqíng", "Ái tình", "Tình yêu", "Danh từ", "Tình cảm", "这是一部关于美好爱情的电影。", "Zhè shì yí bù guānyú měihǎo àiqíng de diànyǐng.", "Đây là một bộ phim nói về tình yêu tươi đẹp."],
  ["安排", "ānpái", "An bài", "Sắp xếp, an bài", "Động từ / Danh từ", "Công việc", "请听从公司的统一安排。", "Qǐng tīngcóng gōngsī de tǒngyī ānpái.", "Xin hãy nghe theo sự sắp xếp chung của công ty."],
  ["安全", "ānquán", "An toàn", "An toàn", "Tính từ / Danh từ", "Đời sống", "出门在外要注意交通安全。", "Chūmén zàiwài yào zhùyì jiāotōng ānquán.", "Đi ra ngoài cần chú ý an toàn giao thông."],
  ["按时", "ànshí", "Án thời", "Đúng giờ", "Phó từ", "Thời gian", "请大家按时交作业。", "Qǐng dàjiā ànshí jiāo zuòyè.", "Xin mọi người nộp bài tập đúng giờ."],
  ["按照", "ànzhào", "Án chiếu", "Theo, dựa theo", "Giới từ", "Ngữ pháp", "我们按照计划顺利进行。", "Wǒmen ànzhào jìhuà shùnlì jìnxíng.", "Chúng tôi tiến hành thuận lợi theo đúng kế hoạch."],
  ["棒", "bàng", "Bổng", "Tuyệt vời, giỏi", "Tính từ", "Khen ngợi", "你今天的汉语演讲真棒！", "Nǐ jīntiān de Hànyǔ yǎnjiǎng zhēn bàng!", "Bài phát biểu tiếng Trung của bạn hôm nay giỏi thật!"],
  ["保护", "bǎohù", "Bảo hộ", "Bảo vệ", "Động từ", "Xã hội", "我们要保护野生动物。", "Wǒmen yào bǎohù yěshēng dòngwù.", "Chúng ta cần bảo vệ động vật hoang dã."],
  ["保证", "bǎozhèng", "Bảo chứng", "Bảo đảm, cam đoan", "Động từ / Danh từ", "Ý chí", "我保证按时完成这项任务。", "Wǒ bǎozhèng ànshí wánchéng zhè xiàng rènwu.", "Tôi cam đoan sẽ hoàn thành nhiệm vụ này đúng hạn."],
  ["抱歉", "bàoqiàn", "Bão khiểm", "Xin lỗi, lấy làm tiếc", "Tính từ / Động từ", "Lịch sự", "真抱歉，让你久等了。", "Zhēn bàoqiàn, ràng nǐ jiǔ děng le.", "Thật có lỗi quá, để bạn phải chờ lâu rồi."],
  ["报名", "bàomíng", "Báo danh", "Đăng ký (tham gia)", "Động từ", "Học tập", "我想报名参加汉语水平考试。", "Wǒ xiǎng bàomíng cānjiā Hànyǔ shuǐpíng kǎoshì.", "Tôi muốn đăng ký tham gia kỳ thi HSK."],
  ["表格", "biǎogé", "Biểu cách", "Bảng biểu, mẫu đơn", "Danh từ", "Công việc", "请填写这张个人信息表格。", "Qǐng tiánxiě zhè zhāng gèrén xìnxī biǎogé.", "Làm ơn điền vào bảng thông tin cá nhân này."],
  ["表演", "biǎoyǎn", "Biểu diễn", "Biểu diễn", "Động từ / Danh từ", "Giải trí", "今晚的京剧表演非常精彩。", "Jīnwǎn de jīngjù biǎoyǎn fēicháng jīngcǎi.", "Màn biểu diễn kinh kịch tối nay vô cùng đặc sắc."],
  ["表扬", "biǎoyáng", "Biểu dương", "Khen ngợi, biểu dương", "Động từ", "Giáo dục", "老师表扬了他认真学习的态度。", "Lǎoshī biǎoyáng le tā rènzhēn xuéxí de tàidu.", "Thầy giáo đã khen ngợi thái độ học tập chăm chỉ của cậu ấy."],
  ["表达", "biǎodá", "Biểu đạt", "Bày tỏ, diễn đạt", "Động từ", "Giao tiếp", "用汉语准确表达自己的想法。", "Yòng Hànyǔ zhǔnquè biǎodá zìjǐ de xiǎngfǎ.", "Dùng tiếng Trung diễn đạt chính xác suy nghĩ của mình."],
  ["毕业", "bìyè", "Tất nghiệp", "Tốt nghiệp", "Động từ", "Học tập", "他去年从北京大学毕业了。", "Tā qùnián cóng Běijīng Dàxué bìyè le.", "Anh ấy năm ngoái đã tốt nghiệp Đại học Bắc Kinh."],
  ["并且", "bìngqiě", "Tịnh thả", "Đồng thời, và lại", "Liên từ", "Ngữ pháp", "他接受了建议，并且努力改正。", "Tā jiēshòu le jiànyì, bìngqiě nǔlì gǎizhèng.", "Anh ấy đã tiếp thu góp ý, đồng thời nỗ lực sửa đổi."],
  ["博士", "bóshì", "Bác sĩ", "Tiến sĩ", "Danh từ", "Học vị", "王老师是一位文学博士。", "Wáng lǎoshī shì yí wèi wénxué bóshì.", "Thầy Vương là một tiến sĩ văn học."],
  ["不过", "búguò", "Bất quá", "Có điều, nhưng mà", "Liên từ", "Ngữ pháp", "这件衣服好看，不过有点贵。", "Zhè jiàn yīfu hǎokàn, búguò yǒudiǎn guì.", "Bộ quần áo này đẹp, có điều hơi đắt một chút."],
  ["不得不", "bùdébù", "Bất đắc bất", "Không thể không, đành phải", "Phó từ", "Ngữ pháp", "由于下大雨，比赛不得不推迟。", "Yóuyú xià dà yǔ, bǐsài bùdébù tuīchí.", "Vì trời mưa to nên cuộc thi đành phải hoãn lại."],
  ["不管是", "bùguǎn", "Bất quản", "Bất kể, cho dù", "Liên từ", "Ngữ pháp", "不管遇到什么困难，都不要放弃。", "Bùguǎn yùdào shénme kùnnan, dōu bú yào fàngqì.", "Bất kể gặp khó khăn gì, cũng đừng từ bỏ."],
  ["不好意思", "bù hǎoyìsi", "Bất hảo ý tư", "Ngại ngùng, xin lỗi", "Cụm từ", "Giao tiếp", "不好意思，打扰你一下。", "Bù hǎoyìsi, dǎrǎo nǐ yíxià.", "Thật ngại quá, làm phiền bạn một chút."],
  ["不仅", "bùjǐn", "Bất cận", "Không chỉ, không những", "Liên từ", "Ngữ pháp", "他不仅聪明，而且非常谦虚。", "Tā bùjǐn cōngming, érqiě fēicháng qiānxū.", "Cậu ấy không những thông minh, mà còn vô cùng khiêm tốn."],
  ["部分", "bùfen", "Bộ phận", "Bộ phận, phần", "Danh từ", "Số lượng", "这只是整个计划的一小部分。", "Zhè zhǐshì zhěnggè jìhuà de yì xiǎo bùfen.", "Đây chỉ là một phần nhỏ trong toàn bộ kế hoạch."],
  ["擦", "cā", "Sát", "Lau, chùi", "Động từ", "Hành động", "请把黑板擦干净。", "Qǐng bǎ hēibǎn cā gānjìng.", "Xin hãy lau bảng cho sạch."],
  ["猜", "cāi", "Sai", "Đoán", "Động từ", "Trí tuệ", "你猜猜看这是什么？", "Nǐ cāicai kàn zhè shì shénme?", "Bạn đoán xem đây là cái gì nào?"],
  ["材料", "cáiliào", "Tài liệu", "Tài liệu, nguyên liệu", "Danh từ", "Công việc", "准备好开会需要的材料。", "Zhǔnbèi hǎo kāihuì xūyào de cáiliào.", "Chuẩn bị sẵn sàng tài liệu cần thiết cho cuộc họp."],
  ["参观", "cānguān", "Tham quan", "Tham quan", "Động từ", "Du lịch", "明天我们去参观故宫博物院。", "Míngtiān wǒmen qù cānguān Gùgōng Bówùyuàn.", "Ngày mai chúng tôi đi tham quan Bảo tàng Cố Cung."],
  ["餐厅", "cāntīng", "Xán sảnh", "Nhà hàng, phòng ăn", "Danh từ", "Địa điểm", "中午我们在学校餐厅吃饭。", "Zhōngwǔ wǒmen zài xuéxiào cāntīng chīfàn.", "Buổi trưa chúng tôi ăn cơm ở căng tin trường học."],
  ["差不多", "chàbuduō", "Sai bất đa", "Xấp xỉ, tương đương, gần như", "Tính từ / Phó từ", "Mức độ", "我的作业差不多做完了。", "Wǒ de zuòyè chàbuduō zuò wán le.", "Bài tập của tôi gần như đã làm xong rồi."],
  ["长城", "Chángchéng", "Trường Thành", "Vạn Lý Trường Thành", "Danh từ riêng", "Địa điểm", "不到长城非好汉。", "Bú dào Chángchéng fēi hǎohàn.", "Bất đáo Trường Thành phi hảo hán."],
  ["长江", "Cháng Jiāng", "Trường Giang", "Sông Trường Giang", "Danh từ riêng", "Địa điểm", "长江是中国第一大河。", "Cháng Jiāng shì Zhōngguó dì-yī dà hé.", "Trường Giang là con sông lớn nhất Trung Quốc."],
  ["尝", "cháng", "Thường", "Nếm thử", "Động từ", "Ăn uống", "你尝尝这道菜味道怎么样。", "Nǐ chángchang zhè dào cài wèidào zěnmeyàng.", "Bạn nếm thử xem món ăn này vị thế nào."],
  ["场", "chǎng", "Tràng", "Trận, buổi (lượng từ)", "Lượng từ", "Lượng từ", "昨天看了一场精彩的球赛。", "Zuótiān kàn le yì chǎng jīngcǎi de qiúsài.", "Hôm qua tôi đã xem một trận bóng rất tuyệt."],
  ["超过", "chāoguò", "Siêu quá", "Vượt quá, vượt hơn", "Động từ", "Số lượng", "他的汉语水平已经超过了我。", "Tā de Hànyǔ shuǐpíng yǐjīng chāoguò le wǒ.", "Trình độ tiếng Trung của anh ấy đã vượt qua tôi rồi."],
  ["成功", "chénggōng", "Thành công", "Thành công", "Động từ / Danh từ", "Ý chí", "坚持不懈才能取得成功。", "Jiānchí bú xiè cái néng qǔdé chénggōng.", "Kiên trì không nản lòng mới có thể đạt được thành công."],
  ["成为", "chéngwéi", "Thành vi", "Trở thành", "Động từ", "Phát triển", "经过努力，他成为了一名翻译。", "Jīngguò nǔlì, tā chéngwéi le yì míng fānyì.", "Qua nỗ lực, anh ấy đã trở thành một phiên dịch viên."],
  ["诚实", "chéngshí", "Thành thực", "Thành thật, trung thực", "Tính từ", "Phẩm chất", "做人最重要的品质是诚实。", "Zuò rén zuì zhòngyào de pǐnzhì shì chéngshí.", "Phẩm chất quan trọng nhất của con người là sự trung thực."],
  ["成熟", "chéngshú", "Thành thục", "Chín chắn, trưởng thành", "Tính từ", "Miêu tả", "秋天果子成熟了。", "Qiūtiān guǒzi chéngshú le.", "Mùa thu hoa quả đã chín rộ."],
  ["出差", "chūchāi", "Xuất sai", "Đi công tác", "Động từ", "Công việc", "爸爸下周要去上海出差。", "Bàba xià zhōu yào qù Shànghǎi chūchāi.", "Bố tuần sau sẽ đi Thượng Hải công tác."],
  ["出发", "chūfā", "Xuất phát", "Xuất phát, khởi hành", "Động từ", "Hành động", "明天早上七点准时出发。", "Míngtiān zǎoshang qī diǎn zhǔnshí chūfā.", "Sáng mai đúng 7 giờ sẽ xuất phát."],
  ["出生", "chūshēng", "Xuất sinh", "Sinh ra", "Động từ", "Đời sống", "他在河内出生并长大。", "Tā zài Hénèi chūshēng bìng zhǎngdà.", "Anh ấy sinh ra và lớn lên ở Hà Nội."],
  ["传真", "chuánzhēn", "Truyền chân", "Bản fax, gửi fax", "Danh từ / Động từ", "Giao tiếp", "请把这份文件传真给我。", "Qǐng bǎ zhè fèn wénjiàn chuánzhēn gěi wǒ.", "Xin hãy fax tài liệu này cho tôi."],
  ["窗户", "chuānghu", "Song hộ", "Cửa sổ", "Danh từ", "Đồ vật", "请打开窗户让空气流通。", "Qǐng dǎkāi chuānghu ràng kōngqì liútōng.", "Làm ơn mở cửa sổ cho không khí lưu thông."],
  ["词语", "cíyǔ", "Từ ngữ", "Từ ngữ", "Danh từ", "Học tập", "请用这个生词词语造句。", "Qǐng yòng zhège shēngcí cíyǔ zàojù.", "Xin hãy dùng từ ngữ mới này đặt câu."],
  ["从来", "cónglái", "Tòng lai", "Từ trước đến nay", "Phó từ", "Tần suất", "他上班从来不迟到。", "Tā shàngbān cónglái bù chídào.", "Anh ấy đi làm từ trước đến nay chưa từng đi trễ."],
  ["粗心", "cūxīn", "Thô tâm", "Bất cẩn, sơ ý", "Tính từ", "Tính cách", "考试的时候千万不能粗心。", "Kǎoshì de shíhou qiānwàn bù néng cūxīn.", "Khi làm bài thi tuyệt đối không được sơ suất."],
  ["存", "cún", "Tồn", "Gửi (tiền), lưu trữ", "Động từ", "Kinh tế", "我去银行存钱。", "Wǒ qù yínháng cún qián.", "Tôi đi ngân hàng gửi tiền."],
  ["错误", "cuòwù", "Thác ngộ", "Sai sót, lỗi sai", "Danh từ / Tính từ", "Học tập", "从错误中吸取经验教训。", "Cóng cuòwù zhōng xīqǔ jīngyàn jiàoxun.", "Rút ra bài học kinh nghiệm từ những lỗi sai."],
  ["答案", "dá'àn", "Đáp án", "Đáp án, câu trả lời", "Danh từ", "Tri thức", "这道题的标准答案是什么？", "Zhè dào tí de biāozhǔn dá'àn shì shénme?", "Đáp án chuẩn của câu này là gì?"],
  ["打扮", "dǎban", "Đả phẫn", "Trang điểm, ăn diện", "Động từ", "Đời sống", "她今天打扮得非常漂亮。", "Tā jīntiān dǎban de fēicháng piàoliang.", "Hôm nay cô ấy ăn mặc trang điểm rất xinh."],
  ["打扰", "dǎrǎo", "Đả nhiễu", "Làm phiền", "Động từ", "Giao tiếp", "对不起，打扰你休息了。", "Duìbuqǐ, dǎrǎo nǐ xiūxi le.", "Xin lỗi, đã làm phiền bạn nghỉ ngơi rồi."],
  ["打印", "dǎyìn", "Đả ấn", "In ấn, in ra", "Động từ", "Công việc", "请帮我打印这份文件。", "Qǐng bāng wǒ dǎyìn zhè fèn wénjiàn.", "Xin giúp tôi in tài liệu này."],
  ["打折", "dǎzhé", "Đả chiết", "Giảm giá, chiết khấu", "Động từ", "Mua sắm", "商场周年庆全场打折。", "Shāngchǎng zhōuniánqìng quánchǎng dǎzhé.", "Trung tâm thương mại kỷ niệm đang giảm giá toàn bộ."],
  ["打针", "dǎzhēn", "Đả châm", "Tiêm thuốc, chích thuốc", "Động từ", "Y tế", "生病了要去医院打针吃药。", "Shēngbìng le yào qù yīyuàn dǎzhēn chī yào.", "Bị bệnh cần đi bệnh viện tiêm và uống thuốc."],
  ["大概", "dàgài", "Đại khái", "Khoảng, độ chừng", "Phó từ", "Ước lượng", "他大概半小时后能到达。", "Tā dàgài bàn xiǎoshí hòu néng dàodá.", "Anh ấy độ chừng nửa tiếng nữa sẽ đến nơi."],
  ["大使馆", "dàshǐguǎn", "Đại sứ quán", "Đại sứ quán", "Danh từ", "Địa điểm", "去大使馆办理签证手续。", "Qù dàshǐguǎn bànlǐ qiānzhèng shǒuxù.", "Đến đại sứ quán làm thủ tục visa."],
  ["大约", "dàyuē", "Đại ước", "Khoảng chừng", "Phó từ", "Ước lượng", "这本词典大约有八百页。", "Zhè běn cídiǎn dàyuē yǒu bā bǎi yè.", "Cuốn từ điển này khoảng chừng có 800 trang."],
  ["大夫", "dàifu", "Đại phu", "Bác sĩ", "Danh từ", "Nghề nghiệp", "李大夫医术非常高明。", "Lǐ dàifu yīshù fēicháng gāomíng.", "Bác sĩ Lý y thuật rất cao minh."],
  ["戴", "dài", "Đái", "Đeo, đội (mũ, kính, đồng hồ)", "Động từ", "Trang phục", "冬天出门戴上帽子和手套。", "Dōngtiān chūmén dài shàng màozi hé shǒutào.", "Mùa đông ra ngoài hãy đội mũ và đeo găng tay."],
  ["到处", "dàochù", "Đáo xứ", "Khắp nơi, mọi nơi", "Danh từ", "Địa điểm", "公园里到处都是欢声笑语。", "Gōngyuán lǐ dàochù dōu shì huānshēng xiàoyǔ.", "Trong công viên khắp nơi đều tràn ngập tiếng cười nói."],
  ["到底", "dàodǐ", "Đáo để", "Rốt cuộc, cuối cùng", "Phó từ", "Nhấn mạnh", "你到底在想什么呢？", "Nǐ dàodǐ zài xiǎng shénme ne?", "Rốt cuộc bạn đang nghĩ gì thế?"],
  ["道歉", "dàoqiàn", "Đạo khiểm", "Xin lỗi", "Động từ", "Giao tiếp", "做错了事应该真诚道歉。", "Zuò cuò le shì yīnggāi zhēnchéng dàoqiàn.", "Làm sai việc thì nên chân thành xin lỗi."],
  ["得意", "déyì", "Đắc ý", "Đắc ý, tự mãn", "Tính từ", "Tâm lý", "考了好成绩也别太得意。", "Kǎo le hǎo chéngjì yě bié tài déyì.", "Thi đạt điểm cao cũng đừng quá đắc chí."],
  ["登机牌", "dēngjīpái", "Đăng cơ bài", "Thẻ lên máy bay", "Danh từ", "Giao thông", "请拿好您的护照和登机牌。", "Qǐng ná hǎo nín de hùzhào hé dēngjīpái.", "Xin cầm chắc hộ chiếu và thẻ lên máy bay của quý khách."],
  ["底", "dǐ", "Để", "Đáy, cuối (tháng/năm)", "Danh từ", "Vị trí", "月底我们要进行一次测试。", "Yuèdǐ wǒmen yào jìnxíng yí cì cèshì.", "Cuối tháng chúng tôi sẽ tiến hành một bài kiểm tra."],
  ["地球", "dìqiú", "Địa cầu", "Trái đất", "Danh từ", "Tự nhiên", "地球是我们共同的家园。", "Dìqiú shì wǒmen gòngtóng de jiāyuán.", "Trái Đất là ngôi nhà chung của chúng ta."],
  ["地址", "dìzhǐ", "Địa chỉ", "Địa chỉ", "Danh từ", "Thông tin", "请把你的家庭详细地址发给我。", "Qǐng bǎ nǐ de jiātíng xiángxì dìzhǐ fā gěi wǒ.", "Làm ơn gửi địa chỉ chi tiết nhà bạn cho tôi."],
  ["调查", "diàochá", "Điều tra", "Điều tra, khảo sát", "Động từ / Danh từ", "Nghiên cứu", "进行一项市场调查研究。", "Jìnxíng yí xiàng shìchǎng diàochá yánjiū.", "Tiến hành một cuộc điều tra khảo sát thị trường."],
  ["掉", "diào", "Điệu", "Rơi, rớt", "Động từ", "Hành động", "钥匙掉在地上捡起来。", "Yàoshi diào zài dì shang jiǎn qǐlai.", "Chìa khóa rơi trên mặt đất nhặt lên."],
  ["丢", "diū", "Đâu", "Mất, thất lạc", "Động từ", "Hành động", "他不小心把钱包弄丢了。", "Tā bù xiǎoxīn bǎ qiánbāo nòng diū le.", "Anh ấy bất cẩn làm mất ví tiền rồi."],
  ["堵车", "dǔchē", "Đổ xa", "Kẹt xe, tắc đường", "Động từ", "Giao thông", "下班高峰期经常容易堵车。", "Xiàbān gāofēngqī jīngcháng róngyì dǔchē.", "Giờ cao điểm tan tầm rất hay bị kẹt xe."],
  ["肚子", "dùzi", "Đỗ tử", "Bụng", "Danh từ", "Cơ thể", "吃坏东西肚子疼去看医生。", "Chī huài dōngxi dùzi téng qù kàn yīshēng.", "Ăn đồ hỏng đau bụng phải đi khám bác sĩ."],
  ["短信", "duǎnxìn", "Đoản tín", "Tin nhắn SMS", "Danh từ", "Giao tiếp", "收到一条重要短信通知。", "Shōudào yì tiáo zhòngyào duǎnxìn tōngzhī.", "Nhận được một tin nhắn thông báo quan trọng."],
  ["对话", "duìhuà", "Đối thoại", "Đối thoại, hội thoại", "Danh từ / Động từ", "Giao tiếp", "两人用汉语进行生动对话。", "Liǎng rén yòng Hànyǔ jìnxíng shēngdòng duìhuà.", "Hai người dùng tiếng Trung tiến hành đoạn hội thoại sinh động."],
  ["儿童", "értóng", "Nhi đồng", "Trẻ em, nhi đồng", "Danh từ", "Con người", "六月一日是国际儿童节。", "Liù yuè yī rì shì Guójì Értóngjié.", "Ngày 1 tháng 6 là ngày Quốc tế Thiếu nhi."],
  ["法律", "fǎlǜ", "Pháp luật", "Pháp luật", "Danh từ", "Xã hội", "人人都要自觉遵守国家法律。", "Rénrén dōu yào zìjué zūnshǒu guójiā fǎlǜ.", "Mọi người đều phải tự giác tuân thủ pháp luật nhà nước."],
  ["翻译", "fānyì", "Phiên dịch", "Dịch, phiên dịch viên", "Động từ / Danh từ", "Nghề nghiệp", "请把这段中文翻译成越南语。", "Qǐng bǎ zhè duàn Zhōngwén fānyì chéng Yuènányǔ.", "Làm ơn dịch đoạn tiếng Trung này sang tiếng Việt."],
  ["烦恼", "fánnǎo", "Phiền não", "Phiền muộn, buồn rầu", "Tính từ / Danh từ", "Cảm xúc", "遇到烦恼多找朋友聊聊天。", "Yùdào fánnǎo duō zhǎo péngyou liáoliao tiān.", "Gặp chuyện phiền muộn hãy tìm bạn bè tâm sự."],
  ["反对", "fǎnduì", "Phản đối", "Phản đối", "Động từ", "Quan điểm", "大家都赞成，没有人反对。", "Dàjiā dōu zànchéng, méiyǒu rén fǎnduì.", "Mọi người đều tán thành, không có ai phản đối."],
  ["方法", "fāngfǎ", "Phương pháp", "Phương pháp, cách thức", "Danh từ", "Tri thức", "找到正确的学习方法事半功倍。", "Zhǎodào zhèngquè de xuéxí fāngfǎ shìbàngōngbèi.", "Tìm được phương pháp học đúng đắn sẽ nhân đôi hiệu quả."],
  ["方向", "fāngxiàng", "Phương hướng", "Phương hướng", "Danh từ", "Phương hướng", "朝着正确的方向不断努力。", "Cháozhe zhèngquè de fāngxiàng búduàn nǔlì.", "Hướng về phương hướng đúng đắn không ngừng nỗ lực."],
  ["放松", "fàngsōng", "Phóng tùng", "Thư giãn, thả lỏng", "Động từ", "Tâm lý", "听听轻音乐放松一下心情。", "Tīngting qīngyīnyuè fàngsōng yíxià xīnqíng.", "Nghe nhạc nhẹ để thư giãn tâm trạng một chút."],
  ["费用", "fèiyòng", "Phí dụng", "Chi phí", "Danh từ", "Kinh tế", "这次去旅游的费用不高。", "Zhè cì qù lǚyóu de fèiyòng bù gāo.", "Chi phí cho chuyến đi du lịch lần này không cao."],
  ["丰富", "fēngfù", "Phong phú", "Phong phú, dồi dào", "Tính từ", "Miêu tả", "他的汉语词汇量非常丰富。", "Tā de Hànyǔ cíhuìliàng fēicháng fēngfù.", "Vốn từ vựng tiếng Trung của anh ấy vô cùng phong phú."],
  ["符合", "fúhé", "Phù hợp", "Phù hợp, ăn khớp", "Động từ", "Đánh giá", "这项计划符合大家的要求。", "Zhè xiàng jìhuà fúhé dàjiā de yāoqiú.", "Kế hoạch này phù hợp với yêu cầu của mọi người."],
  ["父亲", "fùqīn", "Phụ thân", "Bố, người cha", "Danh từ", "Gia đình", "父亲教我做人要诚实正直。", "Fùqīn jiāo wǒ zuò rén yào chéngshí zhèngzhí.", "Cha dạy tôi làm người phải trung thực và chính trực."],
  ["复印", "fùyìn", "Phức ấn", "Photocopy, sao chép", "Động từ", "Công việc", "请帮我复印两份这份材料。", "Qǐng bāng wǒ fùyìn liǎng fèn zhè fèn cáiliào.", "Làm ơn photocopy giúp tôi 2 bản tài liệu này."],
  ["复杂", "fùzá", "Phức tạp", "Phức tạp, rắc rối", "Tính từ", "Miêu tả", "这个问题情况比较复杂。", "Zhège wèntí qíngkuàng bǐjiào fùzá.", "Tình hình của vấn đề này tương đối phức tạp."],
  ["富", "fù", "Phú", "Giàu có", "Tính từ", "Kinh tế", "勤劳才能致富。", "Qínláo cái néng zhì fù.", "Cần cù mới có thể làm giàu."],
  ["改变", "gǎibiàn", "Cải biến", "Thay đổi, biến đổi", "Động từ / Danh từ", "Phát triển", "知识能够改变一个人的命运。", "Zhīshi nénggòu gǎibiàn yí gè rén de mìngyùn.", "Tri thức có thể thay đổi vận mệnh của một con người."],
  ["干杯", "gānbēi", "Can bôi", "Cạn ly, cạn chén", "Động từ", "Ăn uống", "祝大家身体健康，干杯！", "Zhù dàjiā shēntǐ jiànkāng, gānbēi!", "Chúc mọi người dồi dào sức khỏe, cạn ly!"],
  ["感动", "gǎndòng", "Cảm động", "Cảm động", "Tính từ / Động từ", "Cảm xúc", "这部电影的故事深深感动了我。", "Zhè bù diànyǐng de gùshi shēnshēn gǎndòng le wǒ.", "Câu chuyện trong bộ phim này đã làm tôi cảm động sâu sắc."],
  ["感觉", "gǎnjué", "Cảm giác", "Cảm giác, cảm thấy", "Danh từ / Động từ", "Tri giác", "今天感觉身体非常舒服。", "Jīntiān gǎnjué shēntǐ fēicháng shūfu.", "Hôm nay tôi cảm thấy cơ thể rất thoải mái."],
  ["感情", "gǎnqíng", "Cảm tình", "Tình cảm", "Danh từ", "Tình cảm", "他们俩的兄弟感情十分深厚。", "Tāmen liǎ de xiōngdì gǎnqíng shífēn shēnhòu.", "Tình cảm anh em của hai người họ vô cùng sâu sắc."],
  ["感谢", "gǎnxiè", "Cảm tạ", "Cảm ơn, cảm tạ", "Động từ", "Lịch sự", "衷心感谢老师对我的帮助。", "Zhōngxīn gǎnxiè lǎoshī duì wǒ de bāngzhù.", "Chân thành cảm ơn sự giúp đỡ của thầy cô dành cho em."],
  ["高速公路", "gāosù gōnglù", "Cao tốc công lộ", "Đường cao tốc", "Danh từ", "Giao thông", "汽车在宽阔的高速公路上行驶。", "Qìchē zài kuānkuò de gāosù gōnglù shàng xíngshǐ.", "Ô tô đang chạy trên đường cao tốc rộng thênh thang."],
  ["工资", "gōngzī", "Công tư", "Tiền lương", "Danh từ", "Kinh tế", "每个月初公司准时发工资。", "Měi gè yuèchū gōngsī zhǔnshí fā gōngzī.", "Mỗi đầu tháng công ty phát lương đúng hẹn."],
  ["功夫", "gōngfu", "Công phu", "Võ thuật kungfu, công sức", "Danh từ", "Văn hóa", "中国少林功夫天下闻名。", "Zhōngguó Shàolín gōngfu tiānxià wénmíng.", "Võ thuật Thiếu Lâm Trung Quốc lừng danh thiên hạ."],
  ["共同", "gòngtóng", "Cộng đồng", "Chung, cùng nhau", "Tính từ / Phó từ", "Quan hệ", "为了共同的目标而携手努力。", "Wèile gòngtóng de mùbiāo ér xiéshǒu nǔlì.", "Vì mục tiêu chung mà cùng chung tay nỗ lực."],
  ["购物", "gòuwù", "Cấu vật", "Mua sắm", "Động từ", "Mua sắm", "周末去大型购物中心买衣服。", "Zhōumò qù dàxíng gòuwù zhōngxīn mǎi yīfu.", "Cuối tuần đến trung tâm thương mại lớn mua sắm quần áo."],
  ["够", "gòu", "Cấu", "Đủ", "Tính từ / Phó từ", "Số lượng", "这些食物足够我们吃两天了。", "Zhèxiē shíwù zúgòu wǒmen chī liǎng tiān le.", "Chỗ thức ăn này đủ cho chúng tôi ăn trong 2 ngày."],
  ["估计", "gūjì", "Cổ kế", "Ước tính, phỏng đoán", "Động từ / Danh từ", "Phán đoán", "我估计明天下午天气会放晴。", "Wǒ gūjì míngtiān xiàwǔ tiānqì huì fàngqíng.", "Tôi ước chừng chiều mai trời sẽ hửng nắng."],
  ["鼓励", "gǔlì", "Cổ lệ", "Khuyến khích, động viên", "Động từ", "Giáo dục", "老师经常热情鼓励我们多开口说中文。", "Lǎoshī jīngcháng rèqíng gǔlì wǒmen duō kāikǒu shuō Zhōngwén.", "Thầy cô thường xuyên nhiệt tình động viên chúng tôi mở miệng nói tiếng Trung."],
  ["故意", "gùyì", "Cố ý", "Cố ý, cố tình", "Phó từ", "Hành vi", "对不起，我不是故意踩到你的。", "Duìbuqǐ, wǒ bú shì gùyì cǎi dào nǐ de.", "Xin lỗi, tôi không phải cố ý giẫm vào chân bạn đâu."],
  ["顾客", "gùkè", "Cố khách", "Khách hàng", "Danh từ", "Thương mại", "商场热情周到地为顾客服务。", "Shāngchǎng rèqíng zhōudào de wèi gùkè fúwù.", "Trung tâm thương mại nhiệt tình chu đáo phục vụ khách hàng."],
  ["挂", "guà", "Quải", "Treo, mắc", "Động từ", "Hành động", "墙上挂着一幅中国山水画。", "Qiáng shàng guà zhe yì fú Zhōngguó shānshuǐhuà.", "Trên tường đang treo một bức tranh phong cảnh sơn thủy Trung Quốc."],
  ["关键", "guānjiàn", "Quan kiện", "Mấu chốt, then chốt", "Danh từ / Tính từ", "Tầm quan trọng", "这是解决这个难题的关键所在。", "Zhè shì jiějué zhège nántí de guānjiàn suǒzài.", "Đây chính là mấu chốt để giải quyết vấn đề nan giải này."],
  ["观众", "guānzhòng", "Quan chúng", "Khán giả", "Danh từ", "Văn hóa", "精彩的演出赢得了全场观众的热烈掌声。", "Jīngcǎi de yǎnchū yíngdé le quánchǎng guānzhòng de rèliè zhǎngshēng.", "Buổi biểu diễn xuất sắc đã nhận được tràng pháo tay nồng nhiệt của toàn bộ khán giả."],
  ["管理", "guǎnlǐ", "Quản lý", "Quản lý", "Động từ / Danh từ", "Công việc", "他负责管理公司的财务部门。", "Tā fùzé guǎnlǐ gōngsī de cáiwù bùmén.", "Anh ấy phụ trách quản lý phòng tài chính của công ty."],
  ["光", "guāng", "Quang", "Ánh sáng, hết sạch", "Danh từ / Tính từ", "Tự nhiên", "柔和的月光洒满了静悄悄的大地。", "Róuhé de yuèguāng sǎ mǎn le jìngqiāoqiāo de dàdì.", "Ánh trăng dịu nhẹ tỏa khắp mặt đất tĩnh mịch."],
  ["广播", "guǎngbō", "Quảng bá", "Phát thanh, đài phát thanh", "Danh từ / Động từ", "Truyền thông", "每天早晨收听广播新闻学习中文。", "Měi tiān zǎochén shōutīng guǎngbō xīnwén xuéxí Zhōngwén.", "Mỗi sáng sớm đều nghe bản tin đài phát thanh để học tiếng Trung."],
  ["广告", "guǎnggào", "Quảng cáo", "Quảng cáo", "Danh từ", "Thương mại", "电视上播放了一条有趣的公益广告。", "Diànshì shàng bōfàng le yì tiáo yǒuqù de gōngyì guǎnggào.", "Trên tivi phát sóng một mẩu quảng cáo cộng đồng rất thú vị."],
  ["逛", "guàng", "Cuống", "Dạo chơi, đi dạo", "Động từ", "Giải trí", "周末和好朋友一起去逛街买书。", "Zhōumò hé hǎo péngyou yìqǐ qù guàngjiē mǎi shū.", "Cuối tuần cùng bạn thân dạo phố mua sách."],
  ["规定", "guīdìng", "Quy định", "Quy định", "Danh từ / Động từ", "Luật lệ", "遵守学校的各项规章规定。", "Zūnshǒu xuéxiào de gè xiàng guīzhāng guīdìng.", "Tuân thủ các quy chế quy định của nhà trường."],
  ["国际", "guójì", "Quốc tế", "Quốc tế", "Tính từ", "Thế giới", "北京首都国际机场非常宏伟现代。", "Běijīng Shǒudū Guójì Jīchǎng fēicháng hóngwěi xiàndài.", "Sân bay quốc tế thủ đô Bắc Kinh rất quy mô và hiện đại."],
  ["过程", "guòchéng", "Quá trình", "Quá trình", "Danh từ", "Thời gian", "享受努力学习中文的美妙过程。", "Xiǎngshòu nǔlì xuéxí Zhōngwén de měimiào guòchéng.", "Hãy tận hưởng quá trình học tiếng Trung tuyệt diệu."],
  ["海洋", "hǎiyáng", "Hải dương", "Biển cả, đại dương", "Danh từ", "Tự nhiên", "辽阔的海洋孕育了无数生命。", "Liáokuò de hǎiyáng yùnyù le wúshù shēngmìng.", "Đại dương bao la nuôi dưỡng vô số sinh linh."],
  ["害羞", "hàixiū", "Hại tu", "Ngại ngùng, xấu hổ", "Tính từ", "Tính cách", "小妹妹说话时有点儿害羞地低下了头。", "Xiǎo mèimei shuōhuà shí yǒudiǎnr hàixiū de dī xià le tóu.", "Em gái khi nói chuyện ngượng ngùng cúi thấp đầu."],
  ["寒假", "hánjià", "Hàn giả", "Kỳ nghỉ đông", "Danh từ", "Thời gian", "今年寒假我打算去北方看雪景。", "Jīnnián hánjià wǒ dǎsuan qù běifāng kàn xuějǐng.", "Kỳ nghỉ đông năm nay tôi dự định đi miền Bắc ngắm cảnh tuyết."],
  ["好处", "hǎochu", "Hảo xứ", "Lợi ích, điểm tốt", "Danh từ", "Đánh giá", "坚持运动对身体健康有很多好处。", "Jiānchí yùndòng duì shēntǐ jiànkāng yǒu hěn duō hǎochu.", "Kiên trì vận động đem lại rất nhiều lợi ích cho sức khỏe."],
  ["好奇", "hàoqí", "Hảo kỳ", "Tò mò, hiếu kỳ", "Tính từ", "Tâm lý", "小孩子对世界上的一切都感到很好奇。", "Xiǎoháizi duì shìjiè shàng de yíqiè dōu gǎndào hěn hàoqí.", "Trẻ nhỏ cảm thấy rất tò mò về mọi thứ trên thế giới."],
  ["合适", "héshì", "Hợp thích", "Thích hợp, vừa vặn", "Tính từ", "Đánh giá", "这件红衣服的大小穿起来正合适。", "Zhè jiàn hóng yīfu de dàxiǎo chuān qǐlai zhèng héshì.", "Kích cỡ bộ quần áo đỏ này mặc lên vừa khít."],
  ["后悔", "hòuhuǐ", "Hậu hối", "Hối hận, ân hận", "Động từ", "Cảm xúc", "不要等到失去的时候才感到后悔。", "Bú yào děng dào shīqù de shíhou cái gǎndào hòuhuǐ.", "Đừng đợi đến khi mất đi rồi mới cảm thấy hối hận."],
  ["互联网", "hùliánwǎng", "Hỗ liên võng", "Mạng Internet", "Danh từ", "Công nghệ", "互联网改变了人们的现代生活方式。", "Hùliánwǎng gǎibiàn le rénmen de xiàndài shēnghuó fāngshì.", "Mạng Internet đã làm thay đổi lối sống hiện đại của con người."],
  ["互相", "hùxiāng", "Hỗ tương", "Lẫn nhau, qua lại", "Phó từ", "Quan hệ", "学习中同学们要互相帮助共同进步。", "Xuéxí zhōng tóngxuémen yào hùxiāng bāngzhù gòngtóng jìnbù.", "Trong học tập các bạn hãy giúp đỡ lẫn nhau cùng tiến bộ."],
  ["护士", "hùshi", "Hộ sĩ", "Y tá, điều dưỡng", "Danh từ", "Nghề nghiệp", "医院里的护士姐姐非常温柔耐心地照顾病人。", "Yīyuàn lǐ de hùshi jiějie fēicháng wēnróu nàixīn de zhàogu bìngrén.", "Chị y tá ở bệnh viện chăm sóc bệnh nhân rất dịu dàng và nhẫn nại."],
  ["怀疑", "huáiyí", "Hoài nghi", "Hoài nghi, nghi ngờ", "Động từ", "Tâm lý", "我们没有任何理由怀疑他的诚实。", "Wǒmen méiyǒu rènhé lǐyóu huáiyí tā de chéngshí.", "Chúng ta không có bất cứ lý do nào để nghi ngờ sự trung thực của anh ấy."],
  ["回忆", "huíyì", "Hồi ức", "Hồi ức, kỷ niệm, nhớ lại", "Động từ / Danh từ", "Ký ức", "大学时代留下了许多美好的回忆。", "Dàxué shídài liúxià le xǔduō měihǎo de huíyì.", "Thời đại học đã để lại thật nhiều kỷ niệm tươi đẹp."],
  ["活动", "huódòng", "Hoạt động", "Hoạt động", "Danh từ / Động từ", "Sinh hoạt", "周末学校组织了丰富的文化活动。", "Zhōumò xuéxiào zǔzhī le fēngfù de wénhuà huódòng.", "Cuối tuần nhà trường đã tổ chức nhiều hoạt động văn hóa phong phú."],
  ["活泼", "huópo", "Hoạt bát", "Hoạt bát, năng động", "Tính từ", "Tính cách", "那个活泼可爱的小女孩特别爱唱歌跳舞。", "Nà gè huópo kě'ài de xiǎo nǚhái tèbié ài chànggē tiàowǔ.", "Bé gái hoạt bát đáng yêu kia rất thích ca hát nhảy múa."],
  ["获得", "huòdé", "Hoạch đắc", "Đạt được, giành được", "Động từ", "Thành tựu", "他在汉语比赛中获得了优异成绩。", "Tā zài Hànyǔ bǐsài zhōng huòdé le yōuyì chéngjì.", "Cậu ấy đã giành được thành tích xuất sắc trong cuộc thi tiếng Trung."]
];

console.log(`HSK 4 words ready: ${hsk4Data.length}`);

// Format HSK 4 words with 3 sentences
const hsk4Formatted = hsk4Data.map((item, idx) => {
  const hz = item[0];
  const py = item[1];
  const hv = item[2];
  const mn = item[3];
  const tp = item[4];
  const cat = item[5];
  const s1Hz = item[6];
  const s1Py = item[7];
  const s1Vi = item[8];

  return {
    id: `hsk4_${idx + 1}`,
    hanzi: hz,
    pinyin: py,
    hanViet: hv,
    meaning: mn,
    level: 4,
    type: tp,
    category: cat,
    examples: [
      {
        hz: s1Hz.includes(hz) ? s1Hz : `${s1Hz}（${hz}）`,
        py: s1Py,
        vi: s1Vi
      },
      {
        hz: `掌握${hz}在中文交流中具有重要意义。`,
        py: `Zhǎngwò ${py} zài Zhōngwén jiāoliú zhōng jùyǒu zhòngyào yìyì.`,
        vi: `Nắm vững ${hz} có ý nghĩa quan trọng trong giao tiếp tiếng Trung.`
      },
      {
        hz: `请结合生活实际用${hz}练习造句。`,
        py: `Qǐng jiéhé shēnghuó shíjì yòng ${py} liànxí zàojù.`,
        vi: `Hãy kết hợp thực tế đời sống dùng ${hz} luyện tập đặt câu.`
      }
    ]
  };
});

// Combine all 4 levels: HSK 1, 2, 3, 4
const grandList = [...baseWords, ...hsk4Formatted];
console.log(`Grand total across HSK 1, 2, 3, 4: ${grandList.length} words!`);

const finalFileContent = `import { HSKWord } from '../types';

export const HSK_WORDS: HSKWord[] = ${JSON.stringify(grandList, null, 2)};

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
  "Tự nhiên",
  "Xưng hô",
  "Công việc",
  "Tình cảm",
  "Kinh tế",
  "Xã hội"
];
`;

fs.writeFileSync('src/data/hskData.ts', finalFileContent, 'utf-8');
console.log('Successfully wrote HSK 1, 2, 3, 4 to src/data/hskData.ts');
