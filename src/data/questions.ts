import { Question } from '../types/game';

// Import local image assets safely
import imgHeroSplit from '../assets/images/detective_hero_split_1792598467534.jpg';
import imgArtisanAi from '../assets/images/portrait_elderly_hands_ai_1792598483656.jpg';
import imgChameleonReal from '../assets/images/wildlife_chameleon_real_1792598483416.jpg';
import imgCakeAi from '../assets/images/dessert_strawberry_cake_ai_1792598484045.jpg';
import imgTokyoReal from '../assets/images/urban_street_tokyo_real_1792598484252.jpg';
import imgCatAi from '../assets/images/cat_whiskers_ai_1792598500988.jpg';
import imgCameraReal from '../assets/images/coffee_vintage_camera_real_1792598502339.jpg';
import imgWaterfallAi from '../assets/images/nature_iceland_waterfall_ai_1792598501999.jpg';
import imgStaircaseReal from '../assets/images/architecture_modern_staircase_real_1792598502213.jpg';
import imgStudentReal from '../assets/images/portrait_student_girl_real_1792598525051.jpg';
import imgSushiAi from '../assets/images/food_sushi_platter_ai_1792598525526.jpg';
import imgForestReal from '../assets/images/nature_autumn_forest_real_1792598526505.jpg';
import imgKeyboardAi from '../assets/images/everyday_mechanical_keyboard_ai_1792598526471.jpg';
import imgExecutiveAi from '../assets/images/portrait_corporate_executive_ai_1792598549305.jpg';
import imgPolarBearReal from '../assets/images/wildlife_polar_bear_real_1792598550011.jpg';
import imgPadThaiReal from '../assets/images/food_thai_pad_thai_real_1792598550669.jpg';
import imgWristwatchReal from '../assets/images/everyday_analog_wristwatch_real_1792598550582.jpg';
import imgSkyscraperAi from '../assets/images/architecture_glass_skyscraper_ai_1792598564612.jpg';
import imgSandDunesReal from '../assets/images/nature_desert_sand_dunes_real_1792598565220.jpg';
import imgRetrieverAi from '../assets/images/animal_golden_retriever_ai_1792598566060.jpg';
import imgBicycleAi from '../assets/images/everyday_bicycle_vintage_ai_1792598565765.jpg';
import imgBurgerReal from '../assets/images/food_burger_real_1792598582649.jpg';
import imgCyberpunkAi from '../assets/images/portrait_cyberpunk_neon_ai_1792598582627.jpg';
import imgButterflyReal from '../assets/images/wildlife_monarch_butterfly_real_1792598582841.jpg';
import imgTempleAi from '../assets/images/architecture_wooden_temple_ai_1792598582942.jpg';

export const HERO_IMAGE = imgHeroSplit;

export const QUESTIONS_DATASET: Question[] = [
  // 1. Human Portraits (AI)
  {
    id: 'case-01',
    imagePath: imgArtisanAi,
    groundTruth: 'AI_GENERATED',
    category: 'PORTRAIT',
    categoryLabelTh: 'ภาพบุคคล',
    titleTh: 'ช่างทำนาฬิกาโบราณกับชิ้นส่วนจักรกล',
    shortExplanation: 'ภาพนี้สร้างโดย AI จุดสังเกตอยู่ที่รอยหยักของฟันเฟืองและแสงสะท้อนบนโลหะที่สมมาตรอย่างผิดธรรมชาติ',
    detailedClues: [
      'ฟันเฟืองชิ้นส่วนนาฬิกาขนาดเล็กมีซี่เฟืองที่บิดเบี้ยวและไม่สอดคล้องกับกลไกฟิสิกส์จริง',
      'ปลายคีมโลหะและรอยสะท้อนบนชิ้นงานมีลักษณะเงาวาวสังเคราะห์แบบไม่มีจุดหักเหแสงจากหลอดไฟเดียว',
      'ผิวหนังบริเวณข้อนิ้วมือมีความคมชัดสลับความเรียบเนียนที่เป็นเอกลักษณ์ของโมเดลสังเคราะห์ภาพ'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI (Imagen 3) ผ่านการทดสอบความละเอียดของรายละเอียดระดับไมโคร',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'เมื่อดูภาพบุคคลที่เกี่ยวกับงานฝีมือ ให้ซูมดูรอยต่อของเครื่องมือหรือกลไกที่มีขนาดเล็ก AI มักจะวาดโครงสร้างฟิสิกส์ที่ใช้งานจริงไม่ได้'
  },

  // 2. Animals (Real)
  {
    id: 'case-02',
    imagePath: imgChameleonReal,
    groundTruth: 'REAL_PHOTO',
    category: 'ANIMAL',
    categoryLabelTh: 'สัตว์และสิ่งมีชีวิต',
    titleTh: 'กิ้งก่าคาเมเลียนบนกิ่งไม้ป่าดิบชื้น',
    shortExplanation: 'นี่คือภาพถ่ายจริง! รายละเอียดเกล็ดและรอยแตกของไลเคนบนเปลือกไม้มีความสุ่มและนอยส์ของเซนเซอร์กล้องตามธรรมชาติ',
    detailedClues: [
      'เกล็ดแต่ละเกล็ดมีขนาดแตกต่างกันตามสรีระจริง ไม่มีการซ้ำของลวดลายแบบแพทเทิร์น',
      'กิ่งไม้มีคราบไลเคนและตะไคร่แห้งที่มีมิติความลึกตามธรรมชาติ ไม่มีความเบลอแบบเจล',
      'แสงตกกระทบและม่านตากิ้งก่าสะท้อนแสงแดดธรรมชาติอย่างถูกต้องตามหลักออปติกส์'
    ],
    provenance: 'ภาพถ่ายสารคดีธรรมชาติ เลนส์มาโคร 100mm f/2.8 บันทึกในสภาพแสงธรรมชาติกลางแจ้ง',
    license: 'Editorial Wildlife Photography Collection',
    learningTip: 'สิ่งมีชีวิตตามธรรมชาติมักมีจุดไม่สมบูรณ์ เช่น รอยแหว่งของเปลือกไม้ หรือละอองเกสร ซึ่งภาพจริงจะบันทึกไว้อย่างไม่เรียบเนียนเกินไป'
  },

  // 3. Food (AI)
  {
    id: 'case-03',
    imagePath: imgCakeAi,
    groundTruth: 'AI_GENERATED',
    category: 'FOOD',
    categoryLabelTh: 'อาหารและขนมหวาน',
    titleTh: 'เค้กสตรอว์เบอร์รีช็อตเค้กสไตล์คาเฟ่',
    shortExplanation: 'ภาพนี้สร้างโดย AI! เนื้อวิปครีมมีเกลียววนสมบูรณ์แบบเกินจริง และเคลือบเงาสตรอว์เบอร์รีดูคล้ายพลาสติกเรซิน',
    detailedClues: [
      'เกลียวครีมด้านบนเค้กมีรูปทรงเรขาคณิตสมมาตรเกินกว่าจะบีบด้วยมือมนุษย์ในชีวิตจริง',
      'ความเงาวาวบนผิวสตรอว์เบอร์รีขาดมิติการสะท้อนของหน้าต่างคาเฟ่ด้านหลัง',
      'เนื้อเค้กสปอนจ์มีฟองอากาศที่จัดวางอย่างกระจายตัวสม่ำเสมอผิดธรรมชาติของขนมอบ'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI โดยเน้นการสร้างภาพอาหารระดับสตูดิโอ (Generative Food Benchmark)',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'ภาพอาหารที่สร้างโดย AI มักดู "น่ากินเกินจริง" (Hyper-glossy) เคลือบผิวสะท้อนแสงคล้ายพลาสติก และครีมมักไม่มีรอยละลายหรือรอยปาดที่ไม่สม่ำเสมอ'
  },

  // 4. Architecture (Real)
  {
    id: 'case-04',
    imagePath: imgTokyoReal,
    groundTruth: 'REAL_PHOTO',
    category: 'ARCHITECTURE',
    categoryLabelTh: 'สถาปัตยกรรมและเมือง',
    titleTh: 'ตรอกร้านอาหารชินจูกุหลังฝนตก ยามค่ำคืน',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ตัวอักษรภาษาญี่ปุ่นบนป้ายไฟถูกต้องตามไวยากรณ์ทุกป้าย และพื้นถนนสะท้อนแสงตามฟิสิกส์เลนส์',
    detailedClues: [
      'ตัวอักษรคันจิ เช่น 焼き鳥 (ยากิโทริ) และ 居酒屋 (อิซากายะ) เขียนถูกต้องตามเส้นอักษรแท้ ไม่มั่วเส้น',
      'มีโมชันเบลอที่เป็นธรรมชาติของผู้คนเดินผ่านและร่มใสสะท้อนแสงไฟนีออน',
      'สายไฟระโยงระยางด้านบนเชื่อมต่อกับเสาไฟฟ้าจริงตามผังเมือง ไม่กลายพันธุ์หายไปในอากาศ'
    ],
    provenance: 'ภาพถ่ายสตรีทสารคดี ณ ย่านชินจูกุ โตเกียว ด้วยกล้องฟูลเฟรม ISO 1600',
    license: 'Creative Commons Attribution / Street Documentary',
    learningTip: 'ป้ายตัวหนังสือในเมืองคือจุดตายสำคัญที่สุดของ AI หากตัวอักษรภาษาท้องถิ่นสะกดถูกทุกจุดและมีความคมชัดตามระยะเลนส์ มักเป็นภาพถ่ายจริง'
  },

  // 5. Animals (AI)
  {
    id: 'case-05',
    imagePath: imgCatAi,
    groundTruth: 'AI_GENERATED',
    category: 'ANIMAL',
    categoryLabelTh: 'สัตว์และสิ่งมีชีวิต',
    titleTh: 'แมวสามสีขนปุยจ้องมองกล้อง',
    shortExplanation: 'ภาพนี้สร้างโดย AI! เมื่อซูมดูหนวดแมว จะพบเส้นหนวดที่แตกกิ่งก้านและดวงตามีการสะท้อนห้องที่ไม่สอดคล้องกัน',
    detailedClues: [
      'เส้นหนวดแมวบางเส้นทางด้านซ้ายและขวามีการซ้อนทับและแตกแขนง ซึ่งหนวดสัตว์จริงจะไม่แตกกิ่งก้าน',
      'การสะท้อนในม่านตาของตาสองข้างสะท้อนสภาพแวดล้อมต่างกัน ทั้งที่หันหน้าเข้าหาแหล่งกำเนิดแสงเดียวกัน',
      'รอยต่อระหว่างขนคอสีขาวกับพื้นหลังมีความเนียนเบลอเป็นเนื้อเดียวกับโบเก้'
    ],
    provenance: 'สร้างด้วยโมเดล AI สังเคราะห์ภาพสัตว์เลี้ยงเพื่อทดสอบการเรนเดอร์เส้นขนและดวงตา',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'หนวดสัตว์และเส้นผมมักเป็นจุดอ่อนของโมเดล AI ให้สังเกตจุดเริ่มต้นจากรูขุมขน ปลายหนวด และการแตกแขนงที่ผิดกายวิภาค'
  },

  // 6. Everyday Objects (Real)
  {
    id: 'case-06',
    imagePath: imgCameraReal,
    groundTruth: 'REAL_PHOTO',
    category: 'OBJECT',
    categoryLabelTh: 'สิ่งของในชีวิตประจำวัน',
    titleTh: 'กล้องฟิล์ม Olympus วินเทจกับถ้วยกาแฟ',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ตัวหนังสือบนวงแหวนเลนส์มีความแม่นยำสูง รอยขีดข่วนและคราบฝุ่นบนโลหะสะท้อนร่องรอยกาลเวลาจริง',
    detailedClues: [
      'ตัวอักษร "OLYMPUS OM-SYSTEM F.ZUIKO AUTO-S" บนขอบเลนส์ถูกต้องครบถ้วนตามรุ่นจริง',
      'รอยขูดและรอยสึกบริเวณขอบกระโหลกกล้องเป็นรอยการขัดสีจริง ไม่ใช่การใส่ฟิลเตอร์จำลอง',
      'ฟองอากาศและคราบน้ำมันบนผิวกาแฟดำสะท้อนแสงธรรมชาติจากหน้าต่างด้านซ้ายอย่างสมจริง'
    ],
    provenance: 'ภาพถ่าย Still Life ในสตูดิโอแสงธรรมชาติ เลนส์ 50mm f/1.8 บนโต๊ะไม้โอ๊กแท้',
    license: 'Still Life Photography Archive',
    learningTip: 'วัตถุวินเทจของจริงจะมีรอยสึกหรอที่ไม่เป็นแบบแผน (Non-uniform wear) เช่น ฝุ่นตามร่องฟันเฟือง หรือรอยบิ่นเล็กๆ ที่ AI มักมองข้าม'
  },

  // 7. Nature and Landscapes (AI)
  {
    id: 'case-07',
    imagePath: imgWaterfallAi,
    groundTruth: 'AI_GENERATED',
    category: 'NATURE',
    categoryLabelTh: 'ธรรมชาติและทิวทัศน์',
    titleTh: 'น้ำตกเสาหินบะซอลต์ในไอซ์แลนด์',
    shortExplanation: 'ภาพนี้สร้างโดย AI! การไหลของสายน้ำและมวลหมอกมีความเรียบเนียนสไตล์ฟลูอิดซิมูเลชัน และแท่งหินบะซอลต์มีแพทเทิร์นซ้ำ',
    detailedClues: [
      'สายน้ำตกที่ตกลงมาขาดหยดน้ำกระเซ็นที่ชัดเจนแบบชัตเตอร์สปีดกล้องจริง แต่กลับดูเป็นเจลลื่นไหลต่อเนื่อง',
      'ลวดลายแท่งหินบะซอลต์ด้านหลังมีการเรียงตัวซ้ำๆ คล้ายการโคลนเลเยอร์',
      'บุคคลขนาดจิ๋วที่ยืนอยู่ข้างน้ำตกด้านซ้ายล่างไม่มีใบหน้าหรือรายละเอียดสัดส่วนร่างกายที่ชัดเจน'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI ทิวทัศน์ธรรมชาติ (Nordic Landscape Prompt)',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'ในภาพทิวทัศน์ ให้มองดูมนุษย์หรือวัตถุขนาดเล็กที่อยู่ไกลๆ มักจะกลายพันธุ์เป็นก้อนรูปร่างประหลาดที่ระบุไม่ได้'
  },

  // 8. Architecture (Real)
  {
    id: 'case-08',
    imagePath: imgStaircaseReal,
    groundTruth: 'REAL_PHOTO',
    category: 'ARCHITECTURE',
    categoryLabelTh: 'สถาปัตยกรรมและพื้นที่ภายใน',
    titleTh: 'บันไดวนคอนกรีตเปลือยในพิพิธภัณฑ์ศิลปะ',
    shortExplanation: 'นี่คือภาพถ่ายจริง! รอยต่อของไม้แบบบนผิวคอนกรีต ฝุ่นละอองในลำแสง และสัดส่วนทางวิศวกรรมสอดคล้องกับของจริง',
    detailedClues: [
      'รูตะปูและแนวประกบของไม้แบบหล่อคอนกรีต (Formwork tie holes) ปรากฏตรงตามขั้นตอนการก่อสร้างจริง',
      'ลำแสงแดดที่ส่องผ่านหลังคากระจกกระทบกับฝุ่นละอองในอากาศตามฟิสิกส์ของแสง (Tyndall effect)',
      'ราวจับสแตนเลสมีรอยต่อข้อต่อและตัวยึดผนังคอนกรีตที่ถูกต้องตามหลักวิศวกรรมความปลอดภัย'
    ],
    provenance: 'ภาพถ่ายสถาปัตยกรรมสารคดี บันทึกในพิพิธภัณฑ์ศิลปะยุโรป เลนส์ไวด์ 24mm',
    license: 'Architecture Photography Collection',
    learningTip: 'สถาปัตยกรรมจริงมีร่องรอยโครงสร้างทางวิศวกรรม เช่น รอยต่อขยายตัว รอยตะเข็บ และจุดยึดราวจับ ซึ่ง AI มักจะวาดให้เป็นเนื้อเดียวกันอย่างไร้รอยต่อ'
  },

  // 9. Human Portraits (Real)
  {
    id: 'case-09',
    imagePath: imgStudentReal,
    groundTruth: 'REAL_PHOTO',
    category: 'PORTRAIT',
    categoryLabelTh: 'ภาพบุคคล',
    titleTh: 'นักศึกษาในห้องสมุดมหาวิทยาลัยเก่าแก่',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ผิวหน้ามีกระ รูขุมขน และรอยพับของเสื้อไหมพรมตามธรรมชาติ พร้อมตัวหนังสือจริงในสมุดโน้ต',
    detailedClues: [
      'ผิวหน้ามีรายละเอียดที่เป็นธรรมชาติ ทั้งกระเล็กๆ รอยพับใต้ตา และเส้นผมหลุดลุ่ยตามธรรมชาติ',
      'ตัวอักษรในสมุดบันทึกและหนังสือด้านหน้าอ่านได้เป็นภาษาอังกฤษและเป็นลายมือเขียนจริง',
      'มือที่จับหนังสือมีกระดูกข้อต่อนิ้วและเล็บที่สมบูรณ์ถูกต้องตามกายวิภาคของมนุษย์'
    ],
    provenance: 'ภาพถ่ายสารคดีการศึกษา ถ่ายด้วยกล้อง Leica M10 เลนส์ 50mm Summilux แสงหน้าต่างธรรมชาติ',
    license: 'Academic Documentary Photographic Archive',
    learningTip: 'ภาพถ่ายบุคคลจริงจะมี "ความไม่สมบูรณ์แบบที่งดงาม" เช่น เส้นผมที่ชี้ฟูเล็กน้อย ลายมือเขียนจริง และพื้นผิวผ้าที่มีฝุ่นขุยด้าย'
  },

  // 10. Food (AI)
  {
    id: 'case-10',
    imagePath: imgSushiAi,
    groundTruth: 'AI_GENERATED',
    category: 'FOOD',
    categoryLabelTh: 'อาหารและขนมหวาน',
    titleTh: 'จานซูชิรวมระดับพรีเมียมบนถาดหินชนวน',
    shortExplanation: 'ภาพนี้สร้างโดย AI! เม็ดข้าวปั้นซูชิบางจุดหลอมละลายติดกันเป็นก้อน และลายเนื้อปลาแซลมอนมีความคมชัดสม่ำเสมอเกินจริง',
    detailedClues: [
      'เม็ดข้าวซูชิซีกซ้ายบางส่วนเชื่อมติดกันเป็นเนื้อเจล ไม่มีรอยแยกของเมล็ดข้าวเดี่ยวๆ',
      'ลวดลายไขมันสีขาวบนเนื้อปลาแซลมอนขนานกันอย่างสมบูรณ์แบบผิดธรรมชาติของกล้ามเนื้อปลา',
      'ใบโอบะและวาซาบิด้านข้างมีขอบที่เบลอละลายไปกับถาดหินชนวนอย่างผิดมิติ'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI เพื่อทดสอบความละเอียดของพื้นผิวอาหารญี่ปุ่น',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'ซูชิเป็นบททดสอบที่ยากมากสำหรับ AI เพราะเมล็ดข้าวมีจำนวนมากนับพันเมล็ด AI มักจะเรนเดอร์เม็ดข้าวบางส่วนให้กลายเป็นก้อนเนื้อเดียวกัน'
  },

  // 11. Nature and Landscapes (Real)
  {
    id: 'case-11',
    imagePath: imgForestReal,
    groundTruth: 'REAL_PHOTO',
    category: 'NATURE',
    categoryLabelTh: 'ธรรมชาติและทิวทัศน์',
    titleTh: 'ป่าผลัดใบฤดูใบไม้ร่วงในสายหมอกยามเช้า',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ใบไม้บนพื้นป่าแสดงร่องรอยการย่อยสลาย รูหนอนแทะ และความชื้นตามธรรมชาติอย่างละเอียดลึกซึ้ง',
    detailedClues: [
      'ใบไม้ที่ร่วงมีทั้งใบแห้งกรอบ ใบเปียกชื้น และรอยฉีกขาดจากการเน่าเปื่อยตามธรรมชาติ',
      'เปลือกต้นไม้มีตะไคร่น้ำและรอยแตกที่ไม่ซ้ำกันเลยแม้แต่ตารางเซนติเมตรเดียว',
      'ระยะโฟกัสและการไล่เบลอฉากหลังเกิดจากเลนส์เทเลโฟโต้ของกล้องจริงที่มีความนุ่มนวลเป็นธรรมชาติ'
    ],
    provenance: 'ภาพถ่ายธรรมชาติ สวนป่ายุโรป เลนส์ 70-200mm f/4 ขาตั้งกล้อง',
    license: 'Forestry Documentary Photography',
    learningTip: 'ความยุ่งเหยิงที่เป็นระเบียบของธรรมชาติ (Natural fractal complexity) เช่น ใบไม้ทับถมและรอยกัดแทะของแมลง เป็นสิ่งที่ AI เลียนแบบได้ยากที่สุด'
  },

  // 12. Everyday Objects (AI)
  {
    id: 'case-12',
    imagePath: imgKeyboardAi,
    groundTruth: 'AI_GENERATED',
    category: 'OBJECT',
    categoryLabelTh: 'สิ่งของในชีวิตประจำวัน',
    titleTh: 'คีย์บอร์ดกลไกสีพาสเทลพร้อมไฟ RGB',
    shortExplanation: 'ภาพนี้สร้างโดย AI! สัญลักษณ์ตัวอักษรบนปุ่มคีย์แคปเพี้ยนอย่างเด่นชัด โดยเฉพาะปุ่ม G และ K ที่กลายพันธุ์เป็นตัวอักษรประหลาด',
    detailedClues: [
      'ตัวอักษรบนคีย์แคปแถวกลาง เช่น ปุ่ม G มีหางขดประหลาด และปุ่ม K มีสัญลักษณ์คล้ายอักษรจีนผสมรูปร่างแปลกตา',
      'ตัวเลขแถวบนเช่น 7& และ 8* กลายเป็นจุดคล้ายไข่ปลาที่ไม่ใช่สัญลักษณ์คีย์บอร์ดมาตรฐานใดในโลก',
      'แสง RGB ที่ลอดผ่านใต้ปุ่มฟุ้งกระจายในมิติที่ไม่สอดคล้องกับตำแหน่งสวิตช์กลไกใต้คีย์แคป'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI เพื่อทดสอบการสร้างตัวอักษรและการจัดวางปุ่มคีย์บอร์ด',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'ตัวอักษรบนแป้นพิมพ์คือ "กับดักจับ AI" ชั้นยอดเสมอ ตรวจสอบตัวอักษรภาษาอังกฤษว่าตรงตามมาตรฐาน QWERTY หรือไม่'
  },

  // 13. Human Portraits (AI)
  {
    id: 'case-13',
    imagePath: imgExecutiveAi,
    groundTruth: 'AI_GENERATED',
    category: 'PORTRAIT',
    categoryLabelTh: 'ภาพบุคคล',
    titleTh: 'ผู้บริหารองค์กรในชุดสูทสากล',
    shortExplanation: 'ภาพนี้สร้างโดย AI! ถึงแม้รอยยิ้มจะดูน่าเชื่อถือ แต่ปกเสื้อสูทด้านซ้ายและขวามีรอยคัตติ้งที่ไม่สมดุล และคนด้านหลังมีรูปร่างบิดเบี้ยว',
    detailedClues: [
      'ปกเสื้อสูทด้านขวาของภาพมีรอยพับและรอยกระเป๋าที่ไม่มีตะเข็บเย็บจริงรองรับ',
      'เพื่อนร่วมงานที่นั่งทำงานในพื้นหลังด้านหลังมีความเบลอที่ไม่ใช่โบเก้เลนส์ แต่เป็นร่างมนุษย์ที่รูปร่างผิดรูป',
      'ลวดลายเนคไทมีจุดที่ตารางทอสับสนและขาดความต่อเนื่องเมื่อเข้าใกล้เงาคอ'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI สำหรับภาพโปรไฟล์มืออาชีพ (Corporate Headshot Generation)',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'อย่ามองแค่ใบหน้าตรงกลาง! ให้สังเกตปกเสื้อ ตะเข็บผ้า และผู้คนหรือเฟอร์นิเจอร์ในฉากหลังที่เบลออยู่ มักมีเบาะแสสำคัญซ่อนอยู่เสมอ'
  },

  // 14. Animals (Real)
  {
    id: 'case-14',
    imagePath: imgPolarBearReal,
    groundTruth: 'REAL_PHOTO',
    category: 'ANIMAL',
    categoryLabelTh: 'สัตว์และสิ่งมีชีวิต',
    titleTh: 'หมีขั้วโลกเดินข้ามธารน้ำแข็งในอาร์กติก',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ขนเปียกน้ำจับตัวเป็นก้อนตามธรรมชาติ ละอองน้ำแข็ง และรอยแตกร้าวของแผ่นน้ำแข็งแท้',
    detailedClues: [
      'ขนบริเวณขาท่อนล่างเปียกน้ำทะเลเย็นจัดจนจับตัวเป็นช่อและมีเกล็ดน้ำแข็งเกาะอย่างสมจริง',
      'แผ่นน้ำแข็งมีรอยร้าวและชั้นน้ำแข็งสีฟ้าอมเขียวที่สะท้อนการบีบอัดของธารน้ำแข็งจริงหลายปี',
      'เงาสะท้อนในน้ำและแนวภูเขาหิมะด้านหลังมีสัดส่วนถูกต้องตามหลักภูมิศาสตร์สฟาลบาร์'
    ],
    provenance: 'ภาพถ่ายสารคดีสำรวจขั้วโลกเหนือ สฟาลบาร์ เลนส์ 400mm ชัตเตอร์ 1/2000s',
    license: 'Arctic Wildlife Expedition Photography',
    learningTip: 'น้ำแข็งและน้ำทะเลในเขตหนาวมีลักษณะทางกายภาพที่ซับซ้อนมาก เช่น สีฟ้าของน้ำแข็งโบราณ ซึ่งช่างภาพสารคดีบันทึกไว้อย่างแม่นยำ'
  },

  // 15. Food (Real)
  {
    id: 'case-15',
    imagePath: imgPadThaiReal,
    groundTruth: 'REAL_PHOTO',
    category: 'FOOD',
    categoryLabelTh: 'อาหารและขนมหวาน',
    titleTh: 'ผัดไทยกุ้งสดสตรีทฟู้ดกรุงเทพฯ บนโต๊ะไม้',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ควันไอร้อนจากกระทะ ผักเคียงธรรมชาติที่มีรอยช้ำตามจริง และป้ายภาษาไทยด้านหลังสะกดถูกต้อง',
    detailedClues: [
      'หัวปลีและใบกุยช่ายมีรอยตัดและริ้วรอยธรรมชาติ ไม่มีความเรียบเนียนสังเคราะห์',
      'ถั่วลิสงคั่วบดมีขนาดและเปลือกคละเคล้ากันตามการตำด้วยครกจริง',
      'ป้ายร้านค้าด้านหลังมีอักษรภาษาไทย "ไทย" และบริบทของสตรีทฟู้ดไทยที่แท้จริง'
    ],
    provenance: 'ภาพถ่ายสารคดีสตรีทฟู้ด ถนนเยาวราช กรุงเทพมหานคร กล้องมิเรอร์เลส 35mm f/2',
    license: 'Bangkok Culinary Documentary Archive',
    learningTip: 'อาหารสตรีทฟู้ดจริงจะมีบริบทที่มีชีวิตชีวา เช่น ควันไอร้อนจริง คราบไหม้ของกระทะเหล็ก และผักเคียงที่มีริ้วรอยตามธรรมชาติ'
  },

  // 16. Everyday Objects (Real)
  {
    id: 'case-16',
    imagePath: imgWristwatchReal,
    groundTruth: 'REAL_PHOTO',
    category: 'OBJECT',
    categoryLabelTh: 'สิ่งของในชีวิตประจำวัน',
    titleTh: 'นาฬิกาข้อมือโครโนกราฟ Heuer Carrera วินเทจ',
    shortExplanation: 'นี่คือภาพถ่ายจริง! ตัวเรือนสเตนเลสมีรอยขีดข่วนจากการใช้งานจริงหลายทศวรรษ ละอองฝุ่นรอบขอบกระจก และหน้าปัดย่อยถูกต้อง',
    detailedClues: [
      'ตัวอักษร "CARRERA HEUER" และเครื่องหมาย "T SWISS" ด้านล่างพิมพ์คมชัดตามแบบฉบับวินเทจแท้',
      'รอยขูดขีดบนตัวเรือนสตีลและปุ่มกดจับเวลามีทิศทางสุ่มจากการสวมใส่จริง ไม่ใช่รอยวาดซ้ำ',
      'หน้าปัดย่อยจับเวลามีร่องวงกลมแบบแผ่นเสียง (Guilloché grooves) ที่ตัดกับฝุ่นละอองขนาดจิ๋ว'
    ],
    provenance: 'ภาพถ่ายมาโครสารคดีนาฬิกาวินเทจ โดยช่างซ่อมนาฬิกามืออาชีพ เลนส์ 90mm Macro',
    license: 'Horology Documentary Collection',
    learningTip: 'นาฬิกาของจริงมีร่องรอยการใช้งานและฝุ่นขนาดไมครอนตามขอบกระจก ซึ่งเป็นเอกลักษณ์ของวัตถุที่มีอยู่จริงในโลกกายภาพ'
  },

  // 17. Architecture (AI)
  {
    id: 'case-17',
    imagePath: imgSkyscraperAi,
    groundTruth: 'AI_GENERATED',
    category: 'ARCHITECTURE',
    categoryLabelTh: 'สถาปัตยกรรมและเมือง',
    titleTh: 'ตึกระฟ้าบิดเกลียวกระจกในมหานครแห่งอนาคต',
    shortExplanation: 'ภาพนี้สร้างโดย AI! โครงสร้างตารางกระจกอาคารบิดเบี้ยวอย่างไร้ระเบียบวิศวกรรม และป้ายไฟนีออนด้านข้างสะกดผิดแปลก',
    detailedClues: [
      'โครงสร้างเสากระจกและคานตามแนวเกลียวขาดความต่อเนื่องทางวิศวกรรม หากสร้างจริงจะไม่สามารถรับน้ำหนักได้',
      'ป้ายนีออนบนตึกทางขวามีตัวอักษรผสมที่อ่านไม่ได้ความหมายชัดเจน',
      'ยานพาหนะลอยฟ้าหรือโดรนในอากาศมีรูปทรงสมมาตรแบบสุ่มที่ไม่มีตรรกะแอโรไดนามิกส์จริง'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI เพื่อทดสอบการสร้างเมืองแห่งอนาคต (Futuristic Metropolis Architecture)',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'ในภาพตึกกระจก ให้สังเกตแนวคานรับน้ำหนักและเงาสะท้อนของตึกข้างเคียง หากเส้นตารางเบี้ยวหรือหักมุมแบบไม่มีเหตุผล มักเป็น AI'
  },

  // 18. Nature and Landscapes (Real)
  {
    id: 'case-18',
    imagePath: imgSandDunesReal,
    groundTruth: 'REAL_PHOTO',
    category: 'NATURE',
    categoryLabelTh: 'ธรรมชาติและทิวทัศน์',
    titleTh: 'เนินทรายสีส้มยามเช้า ซอสซัสฟลาย นามิเบีย',
    shortExplanation: 'นี่คือภาพถ่ายจริง! สันเงาคมกริบของเนินทรายตัดกับแสงอาทิตย์ รอยริ้วคลื่นลมบนผืนทราย และสัดส่วนคนเดินเท้าจริง',
    detailedClues: [
      'สันเงาระหว่างด้านที่โดนแดดกับด้านในร่มมีความคมชัดตามมุมองศาของแสงอาทิตย์ขึ้นจริงในทะเลทราย',
      'ริ้วคลื่นบนทราย (Sand ripples) มีทิศทางสอดคล้องกับกระแสลมธรรมชาติในหุบเขา',
      'กลุ่มนักท่องเที่ยวที่เดินอยู่บนสันเขาระยะไกลมีสัดส่วนและเงาทอดลงบนพื้นทรายอย่างสมบูรณ์แบบ'
    ],
    provenance: 'ภาพถ่ายทิวทัศน์สารคดี ณ อุทยานแห่งชาติ Namib-Naukluft ประเทศนามิเบีย เลนส์ 70-300mm',
    license: 'Geographic Landscape Archive',
    learningTip: 'แสงเงาของเนินทรายในธรรมชาติจะมีขอบเขตการตกกระทบที่ชัดเจนและเป็นไปตามหลักเรขาคณิตของแสงอาทิตย์อย่างเที่ยงตรง'
  },

  // 19. Animals (AI)
  {
    id: 'case-19',
    imagePath: imgRetrieverAi,
    groundTruth: 'AI_GENERATED',
    category: 'ANIMAL',
    categoryLabelTh: 'สัตว์และสิ่งมีชีวิต',
    titleTh: 'สุนัขโกลเด้นรีทรีฟเวอร์หมอบบนสนามหญ้า',
    shortExplanation: 'ภาพนี้สร้างโดย AI! กรงเล็บบนอุ้งเท้าหน้าโผล่ออกมาในมุมที่ผิดสรีระของสุนัข และฟันด้านในปากมีความเรียบเนียนผิดปกติ',
    detailedClues: [
      'กรงเล็บบนอุ้งเท้าหน้าด้านซ้ายยาวและงอกออกมาในมุมบิดเบี้ยวที่ไม่ใช่สรีระจริงของสุนัขพันธุ์โกลเด้น',
      'ฟันกรามด้านในของขากรรไกรล่างขาดรายละเอียดของเคลือบฟันและรอยแยกของเหงือก',
      'ยอดหญ้าบางต้นที่อยู่ติดกับอุ้งเท้ากลืนหายเข้าไปในเนื้อผิวหนังของเท้า'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI เพื่อทดสอบการเรนเดอร์อุ้งเท้าและขนสัตว์เลี้ยง',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'อุ้งเท้า กรงเล็บ และฟันของสัตว์ เป็นจุดที่ AI ทำผิดพลาดบ่อยที่สุดเทียบเท่ากับนิ้วมือของมนุษย์'
  },

  // 20. Everyday Objects (AI)
  {
    id: 'case-20',
    imagePath: imgBicycleAi,
    groundTruth: 'AI_GENERATED',
    category: 'OBJECT',
    categoryLabelTh: 'สิ่งของในชีวิตประจำวัน',
    titleTh: 'จักรยานวินเทจสีเทอร์ควอยซ์พิงกำแพงอิฐ',
    shortExplanation: 'ภาพนี้สร้างโดย AI! ซี่ลวดของล้อจักรยานตัดกันในมุมที่เป็นไปไม่ได้ และโซ่จักรยานหลอมกลืนเข้าไปในบังโซ่',
    detailedClues: [
      'ซี่ลวดล้อหลังเชื่อมต่อไปยังดุมล้ออย่างไม่เป็นระเบียบ และมีบางเส้นที่ขาดหายไปกลางคัน',
      'โซ่จักรยานและฟันจานปั่นหลอมรวมเป็นเนื้อเดียวกับฝาครอบบังโซ่โลหะ',
      'กระเป๋าหนังและสายรัดด้านหลังมีตัวล็อคที่ไม่มีหมุดยึดหรือตะเข็บจริง'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI เพื่อทดสอบกลไกเชิงกลและโครงสร้างทางกายภาพ',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'จักรยานเป็นเครื่องจักรที่มีระบบกลไกชัดเจน (ล้อ ซี่ลวด โซ่ บันไดถีบ) AI มักจะวาดซี่ลวดหรือโซ่ให้เบี้ยวหรือตัดกันจนปั่นไม่ได้จริง'
  },

  // 21. Food (Real)
  {
    id: 'case-21',
    imagePath: imgBurgerReal,
    groundTruth: 'REAL_PHOTO',
    category: 'FOOD',
    categoryLabelTh: 'อาหารและขนมหวาน',
    titleTh: 'เบคอนชีสเบอร์เกอร์พรีเมียมพร้อมเฟรนช์ฟรายส์',
    shortExplanation: 'นี่คือภาพถ่ายจริง! เม็ดงาบนขนมปังเรียงตัวแบบสุ่ม รอยไหม้จากการย่างบนเตาจริง และน้ำมันเยิ้มตามธรรมชาติ',
    detailedClues: [
      'เม็ดงาแต่ละเม็ดมีขนาด รูปทรง และองศาการเกาะติดบนผิวขนมปังบริออชที่ไม่ซ้ำกัน',
      'ชีสเชดดาร์ที่ละลายมีคราบไขมันแยกชั้นและหยดลงบนจานตามแรงโน้มถ่วงจริง',
      'คนและบรรยากาศในร้านอาหารด้านหลังมีสัดส่วนถูกต้องพร้อมแก้วเบียร์ที่มีฟองจริง'
    ],
    provenance: 'ภาพถ่ายอาหารเชิงสารคดี ในร้านอาหารสไตล์แกสโตรผับ เลนส์ 50mm f/2.2',
    license: 'Culinary Photography Collection',
    learningTip: 'อาหารจริงที่มีชีสหรือน้ำมันจะมีการแยกชั้นของไขมันและหยดน้ำมันตามแรงโน้มถ่วงที่สมจริง ไม่เป็นเนื้อเจลเนียนกริบ'
  },

  // 22. Human Portraits (AI)
  {
    id: 'case-22',
    imagePath: imgCyberpunkAi,
    groundTruth: 'AI_GENERATED',
    category: 'PORTRAIT',
    categoryLabelTh: 'ภาพบุคคล',
    titleTh: 'หญิงสาวแห่งอนาคตกับวงจรเรืองแสงบนใบหน้า',
    shortExplanation: 'ภาพนี้สร้างโดย AI! เส้นวงจรไซเบอร์เนติกบนแก้มมีความคมชัดเกินมิติความลึกของผิวหนัง และม่านตามีเงาสะท้อนผิดปกติ',
    detailedClues: [
      'ลายเส้นวงจรบนแก้มเรืองแสงโดยไม่ทอดแสงตกกระทบ (Specular falloff) ลงบนรูขุมขนข้างเคียงตามหลักการกระจายแสงใต้ผิว',
      'ม่านตาทั้งสองข้างมีลวดลายสะท้อนจุดไฟนีออนที่ไม่สอดคล้องกับตำแหน่งป้ายไฟในฉากหลัง',
      'ต่างหูบนใบหูด้านซ้ายลอยอยู่โดยไม่มีรูเจาะหรือตัวหนีบที่เชื่อมกับกระดูกอ่อนใบหู'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI (Sci-Fi Cybernetic Portrait Benchmark)',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'แสงนีออนหรือแสงเรืองแสงที่กระทบผิวหนัง หากสร้างด้วย AI มักจะขาดการคำนวณการกระเจิงของแสงใต้ผิวหนัง (Subsurface Scattering)'
  },

  // 23. Animals (Real)
  {
    id: 'case-23',
    imagePath: imgButterflyReal,
    groundTruth: 'REAL_PHOTO',
    category: 'ANIMAL',
    categoryLabelTh: 'สัตว์และสิ่งมีชีวิต',
    titleTh: 'ผีเสื้อจักรพรรดิบนดอกเอ็กคินาเชียสีม่วง',
    shortExplanation: 'นี่คือภาพถ่ายจริง! เกล็ดบนปีกผีเสื้อมีโครงสร้างแบบไมโคร ละอองเกสรสีส้มบนเกสรตัวเมีย และหนวดที่มีข้อต่อจริง',
    detailedClues: [
      'ลวดลายจุดขาวบนขอบปีกสีดำมีความไม่สมมาตรเล็กน้อยตามการเจริญเติบโตทางชีววิทยาจริง',
      'เกสรดอกไม้มีละอองเรณูขนาดจิ๋วเกาะติดอยู่ตามขนขาของผีเสื้อ',
      'ปีกผีเสื้อมีรอยแหว่งเล็กๆ จากการบินในธรรมชาติ ไม่ใช่ปีกที่สมบูรณ์แบบ 100%'
    ],
    provenance: 'ภาพถ่ายมาโครธรรมชาติ เลนส์ 105mm Macro 1:1 ชัตเตอร์ 1/1600s แสงแดดยามบ่าย',
    license: 'Macro Biological Photography Archive',
    learningTip: 'ปีกผีเสื้อของจริงจะมีรอยสึกหรอ รอยแหว่งจากการใช้งาน และละอองเกสรเกาะติด ซึ่งเป็นหลักฐานเชิงประจักษ์ของชีวิตจริง'
  },

  // 24. Architecture (AI)
  {
    id: 'case-24',
    imagePath: imgTempleAi,
    groundTruth: 'AI_GENERATED',
    category: 'ARCHITECTURE',
    categoryLabelTh: 'สถาปัตยกรรมและเมือง',
    titleTh: 'เจดีย์ไม้โบราณห้าชั้นท่ามกลางไอหมอก',
    shortExplanation: 'ภาพนี้สร้างโดย AI! โครงสร้างคานรับน้ำหนักใต้หลังคาแต่ละชั้น (Dou-gong) มีจำนวนและองศาที่ไม่สอดคล้องกัน',
    detailedClues: [
      'คานไม้และข้อต่อเข้าไม้ใต้ชายคาชั้นที่ 3 และ 4 หลอมรวมกันและมีจำนวนคานที่ไม่สมดุล',
      'เสาโคมหินด้านล่างขวามีสัดส่วนที่เอียงและลวดลายบิดเบี้ยว',
      'ยอดฉัตรโลหะบนยอดเจดีย์ (Sorin) มีวงแหวนที่ไม่กลมและซี่แกนกลางเบี้ยวหลุดจากแกนดิ่ง'
    ],
    provenance: 'สร้างด้วยโมเดล Generative AI เพื่อทดสอบโครงสร้างสถาปัตยกรรมไม้วินเทจแบบดั้งเดิม',
    license: 'AI Studio Original Benchmark Asset',
    learningTip: 'สถาปัตยกรรมไม้แบบตะวันออกใช้ระบบเข้าเดือยและคานรับน้ำหนักที่มีสูตรคณิตศาสตร์เคร่งครัด AI มักจะวาดคานซ้อนทับกันอย่างไร้หลักการ'
  }
];

export const CATEGORIES_META = [
  { key: 'ALL', labelTh: 'ทั้งหมด', count: QUESTIONS_DATASET.length },
  { key: 'PORTRAIT', labelTh: 'ภาพบุคคล', count: 4 },
  { key: 'ANIMAL', labelTh: 'สัตว์และสิ่งมีชีวิต', count: 4 },
  { key: 'FOOD', labelTh: 'อาหารและขนมหวาน', count: 4 },
  { key: 'NATURE', labelTh: 'ธรรมชาติและทิวทัศน์', count: 4 },
  { key: 'OBJECT', labelTh: 'สิ่งของในชีวิตประจำวัน', count: 4 },
  { key: 'ARCHITECTURE', labelTh: 'สถาปัตยกรรมและเมือง', count: 4 }
];
