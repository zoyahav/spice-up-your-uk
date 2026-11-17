/**
 * Mock Exams 1–6 (144 unique official-format questions: 6 exams × 24 questions).
 * Partition Focus: Foundational British values & test rules (Ch1), UK nations, flags & emblems (Ch2),
 * Early Britain, Romans, Anglo-Saxons, Vikings, 1066 & Middle Ages to 1485 (Ch3),
 * Established Churches, pioneering sporting legends & classic British literature (Ch4),
 * and Constitutional Monarchy (King Charles III), Westminster Parliament, Cabinet, voting & core law (Ch5).
 */

import type { PracticeQuestion } from '../../types/domain';

export const QUESTIONS_EXAMS_01_06: readonly PracticeQuestion[] = [
  // ============================================================================
  // MOCK EXAM 1 (q-ex01-01 .. q-ex01-24)
  // ============================================================================
  {
    id: 'q-ex01-01',
    examNumber: 1,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'multiple',
    prompt: 'Which TWO of the following are fundamental principles of British life? (Choose TWO)',
    options: [
      'Democracy',
      'Guaranteed free car ownership',
      'The rule of law',
      'Compulsory membership of a trade union',
    ],
    correctIndices: [0, 2],
    explanation:
      'The five fundamental principles of British life are democracy, the rule of law, individual liberty, tolerance of those with different faiths and beliefs, and participation in community life.',
    memoryHook:
      '🌶️ Spice Hook: Remember "DR. LIT", Democracy, Rule of law, Liberty, Inclusion in community, Tolerance! ("Stop right now" at free car traps!)',
  },
  {
    id: 'q-ex01-02',
    examNumber: 1,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt: 'How many questions are there in the official Life in the UK Test?',
    options: ['18', '20', '24', '30'],
    correctIndices: [2],
    explanation:
      'The official Life in the UK Test consists of 24 questions based on the official handbook, Life in the United Kingdom: A Guide for New Residents.',
    memoryHook:
      '🌶️ Spice Hook: "24 hours in a day, 24 questions along the way!" (And you need 18 right to pass!)',
  },
  {
    id: 'q-ex01-03',
    examNumber: 1,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'During a UK citizenship ceremony, to whom do new citizens swear or affirm the Oath of Allegiance?',
    options: [
      'His Majesty King Charles III, His Heirs and Successors',
      'The Prime Minister and Cabinet',
      'The Speaker of the House of Commons',
      'The Archbishop of Canterbury',
    ],
    correctIndices: [0],
    explanation:
      'At a citizenship ceremony, new British citizens swear or affirm allegiance to the reigning Monarch: His Majesty King Charles III, His Heirs and Successors, according to law.',
    memoryHook:
      '🌶️ Spice Hook: Oath = Crown! You swear allegiance to King Charles III (never to politicians who come and go!).',
  },
  {
    id: 'q-ex01-04',
    examNumber: 1,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt: 'Which countries make up Great Britain?',
    options: [
      'England, Scotland, Wales, and Northern Ireland',
      'England, Scotland, and Wales only',
      'England, Wales, and the Republic of Ireland',
      'England and Scotland only',
    ],
    correctIndices: [1],
    explanation:
      '"Great Britain" refers only to the island comprising England, Scotland, and Wales. Adding Northern Ireland forms the United Kingdom of Great Britain and Northern Ireland.',
    memoryHook:
      '🌶️ Spice Hook: "GB = 3 on the big island (England, Scotland, Wales); UK = 4 (+ Northern Ireland)!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex01-05',
    examNumber: 1,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt: 'What is the national flower of England?',
    options: ['The Thistle', 'The Daffodil', 'The Shamrock', 'The Tudor Rose'],
    correctIndices: [3],
    explanation:
      'The national flower of England is the Rose (specifically the red-and-white Tudor Rose). Scotland has the thistle, Wales has the daffodil, and Northern Ireland has the shamrock.',
    memoryHook:
      '🌶️ Spice Hook: "English Rose!" Think red + white Tudor Rose blooming since 1485!',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex01-06',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt: 'How did the very first people who lived in Britain during the Stone Age survive?',
    options: [
      'They were industrial ironworkers',
      'They imported grain from the Roman Empire',
      'They lived in walled stone castles',
      'They were hunter-gatherers who followed herds of deer and horses',
    ],
    correctIndices: [3],
    explanation:
      'The first people to live in Britain during the Stone Age were hunter-gatherers who hunted wild animals such as deer and horses and gathered seasonal food.',
    memoryHook:
      '🌶️ Spice Hook: Stone Age = Spears & Berries! Hunter-gatherers came first, farmers arrived later (~6,000 years ago).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-07',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Where is Skara Brae, the best-preserved prehistoric village in northern Europe, located?',
    options: [
      'Wiltshire, in south-west England',
      'Orkney, off the north coast of Scotland',
      'Snowdonia, in north Wales',
      'County Antrim, in Northern Ireland',
    ],
    correctIndices: [1],
    explanation:
      'Skara Brae on Orkney, off the north coast of Scotland, is the best-preserved prehistoric Stone Age village in northern Europe, helping archaeologists understand how people lived near the end of the Stone Age.',
    memoryHook:
      '🌶️ Spice Hook: "Skara Brae = Scottish Bay!" (Brae is a Scots word, straight up to Orkney off north Scotland!).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-08',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt: 'In AD 43, which Roman Emperor led a successful invasion of Britain?',
    options: ['Julius Caesar', 'Emperor Hadrian', 'Emperor Augustus', 'Emperor Claudius'],
    correctIndices: [3],
    explanation:
      'After Julius Caesar’s failed invasion in 55 BC, Emperor Claudius led the Roman army in a successful invasion in AD 43, beginning nearly 400 years of Roman rule in Britain.',
    memoryHook:
      '🌶️ Spice Hook: "Caesar crashed in 55 BC; Claudius conquered in AD 43!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-09',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'Who led missionaries from Rome to spread Christianity in southern Britain and became the first Archbishop of Canterbury?',
    options: ['St Columba', 'St Patrick', 'St Augustine', 'St Andrew'],
    correctIndices: [2],
    explanation:
      'St Augustine led missionaries from Rome who spread Christianity in the south of Britain and became the very first Archbishop of Canterbury.',
    memoryHook:
      '🌶️ Spice Hook: "A for Augustine = Archbishop #1 in Canterbury!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-10',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'boolean',
    prompt:
      'True or False: The Norman Conquest of 1066 was the last successful foreign invasion of England.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'William, Duke of Normandy, defeated the Saxon King Harold at the Battle of Hastings in 1066. It remains the last successful foreign military invasion of England.',
    memoryHook:
      '🌶️ Spice Hook: "1066, Nobody’s invaded England since William’s Norman tricks!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-11',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt: 'In what year was King John forced by his noblemen to agree to the Magna Carta?',
    options: ['1066', '1215', '1314', '1415'],
    correctIndices: [1],
    explanation:
      'In 1215, King John was forced by his noblemen to agree to a number of demands in the Magna Carta (meaning the Great Charter), limiting the monarch’s unchecked power.',
    memoryHook:
      '🌶️ Spice Hook: "At 12:15 lunch (1215), King John signed the Magna Carta crunch!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-12',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'Which Scottish king defeated the English army led by Edward II at the Battle of Bannockburn in 1314?',
    options: ['Kenneth MacAlpin', 'William Wallace', 'Robert the Bruce', 'James I'],
    correctIndices: [2],
    explanation:
      'In 1314, the Scottish led by King Robert the Bruce defeated the English at the Battle of Bannockburn, ensuring that Scotland remained unconquered by England.',
    memoryHook:
      '🌶️ Spice Hook: "Bannockburn 1314 = Bruce Beats Britain!" (Both start with B!).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex01-13',
    examNumber: 1,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'Who wrote The Canterbury Tales, a collection of poems in English about a group of pilgrims?',
    options: ['Geoffrey Chaucer', 'John Barbour', 'William Caxton', 'Thomas Hardy'],
    correctIndices: [0],
    explanation:
      'Geoffrey Chaucer wrote The Canterbury Tales, a series of poems in English about pilgrims travelling to Canterbury, and it became one of the first books printed in England by William Caxton.',
    memoryHook:
      '🌶️ Spice Hook: "Chaucer Chatted on the road to Canterbury!" (C + C!).',
  },
  {
    id: 'q-ex01-14',
    examNumber: 1,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'Who is the Supreme Governor (formal head) of the Church of England?',
    options: [
      'The Prime Minister',
      'The Pope',
      'The Monarch (King Charles III)',
      'The Moderator of the General Assembly',
    ],
    correctIndices: [2],
    explanation:
      'In England, the Church of England (Anglican Church) is the official established state church, and the reigning Monarch: King Charles III, is its Supreme Governor, while the Archbishop of Canterbury is its spiritual leader.',
    memoryHook:
      '🌶️ Spice Hook: Ever since Henry VIII, the Crown wears the Church of England hat, King Charles III is Supreme Governor!',
  },
  {
    id: 'q-ex01-15',
    examNumber: 1,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'Who captained the England football team that won the FIFA World Cup in 1966?',
    options: ['Bobby Moore', 'Sir Roger Bannister', 'Gary Lineker', 'David Beckham'],
    correctIndices: [0],
    explanation:
      'Bobby Moore captained the England football team when England hosted and won the World Cup in 1966.',
    memoryHook:
      '🌶️ Spice Hook: Sporty Spice salutes "Bobby Moore, ’66 World Cup Score!"',
  },
  {
    id: 'q-ex01-16',
    examNumber: 1,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Which Scottish town is famously known around the world as the "home of golf"?',
    options: ['Aberdeen', 'St Andrews', 'Dundee', 'Inverness'],
    correctIndices: [1],
    explanation:
      'The modern game of golf can be traced back to 15th-century Scotland, and St Andrews in Fife is universally known as the home of golf.',
    memoryHook:
      '🌶️ Spice Hook: "St Andrew is Scotland’s saint, and St Andrews is Scotland’s home of golf!"',
  },
  {
    id: 'q-ex01-17',
    examNumber: 1,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt: 'Which TWO of the following classic novels were written by Jane Austen? (Choose TWO)',
    options: [
      'Pride and Prejudice',
      'Sense and Sensibility',
      'Great Expectations',
      'Treasure Island',
    ],
    correctIndices: [0, 1],
    explanation:
      'Jane Austen (1775–1817) is one of England’s finest novelists; her famous works concerning marriage and family relationships include Pride and Prejudice and Sense and Sensibility.',
    memoryHook:
      '🌶️ Spice Hook: Posh Spice loves manners & romance, Jane Austen wrote "Pride & Sense" (Pride and Prejudice + Sense and Sensibility)!',
  },
  {
    id: 'q-ex01-18',
    examNumber: 1,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt: 'In which English town was playwright and poet William Shakespeare born in 1564?',
    options: ['Canterbury', 'Winchester', 'Bath', 'Stratford-upon-Avon'],
    correctIndices: [3],
    explanation:
      'William Shakespeare (1564–1616) was born in Stratford-upon-Avon, England, and worked in London as an actor and playwright.',
    memoryHook:
      '🌶️ Spice Hook: "Shakespeare started in Stratford-upon-Avon!" (S + S!).',
  },
  {
    id: 'q-ex01-19',
    examNumber: 1,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'boolean',
    prompt:
      'Does the United Kingdom have a single formal written document that contains its entire constitution?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'Unlike the United States or France, the UK constitution is described as "unwritten" because it has never been codified into one single formal document; instead, it consists of Acts of Parliament, common law, and historic conventions.',
    memoryHook:
      '🌶️ Spice Hook: "UK Constitution = Unwritten!" It’s too iconic to fit in just one binder!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex01-20',
    examNumber: 1,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt: 'What is the title of the National Anthem of the United Kingdom?',
    options: [
      'God Save the King',
      'Rule, Britannia!',
      'Land of Hope and Glory',
      'Jerusalem',
    ],
    correctIndices: [0],
    explanation:
      'With His Majesty King Charles III as the reigning Monarch, the UK National Anthem is "God Save the King", sung at major national occasions and sporting events.',
    memoryHook:
      '🌶️ Spice Hook: 2026 check, King Charles III wears the Crown, so we sing "God Save the King"!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex01-21',
    examNumber: 1,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'How many Members of Parliament (MPs) are elected to sit in the House of Commons?',
    options: ['500', '600', '650', '750'],
    correctIndices: [2],
    explanation:
      'There are 650 MPs in the UK House of Commons, with each MP representing one parliamentary constituency across the UK.',
    memoryHook:
      '🌶️ Spice Hook: "6-5-0 MPs in Westminster!" (650 green-bench seats of power!).',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex01-22',
    examNumber: 1,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'Which senior Cabinet minister is responsible for the economy and preparing the annual Budget?',
    options: [
      'The Home Secretary',
      'The Foreign Secretary',
      'The Chancellor of the Exchequer',
      'The Speaker',
    ],
    correctIndices: [2],
    explanation:
      'The Chancellor of the Exchequer is the senior Cabinet minister responsible for the economy, public spending, and taxation.',
    memoryHook:
      '🌶️ Spice Hook: "Chancellor = Cheques & Cash!" (Exchequer sounds like Cheque!).',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex01-23',
    examNumber: 1,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'multiple',
    prompt:
      'Alongside UK citizens, which TWO other groups of UK residents aged 18 or over are eligible to register to vote in all UK Parliamentary General Elections? (Choose TWO)',
    options: [
      'Tourists on visitor visas',
      'Qualifying Commonwealth citizens',
      'All United States citizens',
      'Irish citizens',
    ],
    correctIndices: [1, 3],
    explanation:
      'Adult (18+) UK citizens, together with qualifying Commonwealth citizens and Irish citizens who are resident in the UK and on the electoral register, can vote in all UK public elections.',
    memoryHook:
      '🌶️ Spice Hook: "UK + Irish + Commonwealth = Ballot Box Trio at 18+!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex01-24',
    examNumber: 1,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'What is the minimum legal age to play the National Lottery (including Lotto and scratchcards) in the UK?',
    options: ['16', '17', '18', '21'],
    correctIndices: [2],
    explanation:
      'People under 18 are not allowed to participate in the National Lottery (the minimum age was raised from 16 to 18 in 2021).',
    memoryHook:
      '🌶️ Spice Hook: Watch out for outdated study books! National Lottery = 18+ ONLY ("18 to vote, 18 to Lotto!").',
  },

  // ============================================================================
  // MOCK EXAM 2 (q-ex02-01 .. q-ex02-24)
  // ============================================================================
  {
    id: 'q-ex02-01',
    examNumber: 2,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt: 'What score is required to pass the official 24-question Life in the UK Test?',
    options: [
      '50% (12 out of 24)',
      '65% (16 out of 24)',
      '75% (18 out of 24)',
      '85% (21 out of 24)',
    ],
    correctIndices: [2],
    explanation:
      'Candidates must answer at least 18 out of 24 questions correctly: a pass mark of 75%, within 45 minutes.',
    memoryHook:
      '🌶️ Spice Hook: "Three quarters of the pie, 75% (18/24) makes your citizenship fly!"',
  },
  {
    id: 'q-ex02-02',
    examNumber: 2,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'multiple',
    prompt:
      'Which TWO of the following are shared responsibilities of everyone living in the UK? (Choose TWO)',
    options: [
      'Vote for the governing political party',
      'Respect and obey the law',
      'Look after the area in which you live and the environment',
      'Attend church services every Sunday',
    ],
    correctIndices: [1, 2],
    explanation:
      'If you wish to be a permanent resident or citizen of the UK, you should: respect and obey the law, respect the rights of others (including their opinions), treat others with fairness, look after yourself and your family, and look after the area in which you live and the environment.',
    memoryHook:
      '🌶️ Spice Hook: "Obey the law, treat folks fair, care for family & clean local air!"',
  },
  {
    id: 'q-ex02-03',
    examNumber: 2,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt: 'What is the capital city of Wales?',
    options: ['Swansea', 'Newport', 'Cardiff', 'Wrexham'],
    correctIndices: [2],
    explanation:
      'Cardiff is the capital city of Wales (and home to the Senedd Cymru / Welsh Parliament). Swansea and Newport are other major Welsh cities.',
    memoryHook:
      '🌶️ Spice Hook: "Cardiff carries the Crown of Wales!" (London, Edinburgh, Cardiff, Belfast!).',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex02-04',
    examNumber: 2,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'multiple',
    prompt:
      'Alongside the Cross of St George (England), which TWO other patron saints’ crosses are combined to make the Union Flag? (Choose TWO)',
    options: ['St Andrew', 'St David', 'St Patrick', 'St Columba'],
    correctIndices: [0, 2],
    explanation:
      'The Union Flag (Union Jack) combines three crosses: St George (England), St Andrew (Scotland), and St Patrick (Ireland). St David’s cross is not part of the flag.',
    memoryHook:
      '🌶️ Spice Hook: Geri’s Union Jack dress rocks GAP, George, Andrew, Patrick (no David)!',
    visualId: 'union-jack',
  },
  {
    id: 'q-ex02-05',
    examNumber: 2,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt: 'On what date is St David’s Day, the patron saint’s day of Wales, celebrated each year?',
    options: ['1 March', '17 March', '23 April', '30 November'],
    correctIndices: [0],
    explanation:
      'St David’s Day (Wales) is celebrated on 1 March. St Patrick’s Day is 17 March, St George’s Day is 23 April, and St Andrew’s Day is 30 November.',
    memoryHook:
      '🌶️ Spice Hook: Yellow Welsh daffodils bloom FIRST in spring, 1 March = St David’s Day!',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex02-06',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Approximately how many years ago did Britain become permanently separated from mainland Europe by the English Channel?',
    options: ['2,000 years ago', '4,000 years ago', '10,000 years ago', '50,000 years ago'],
    correctIndices: [2],
    explanation:
      'For much of the Stone Age, Britain was connected to the continent by a land bridge. It only became permanently separated from the continent by the Channel about 10,000 years ago.',
    memoryHook:
      '🌶️ Spice Hook: "10,000 years ago, the Channel started to flow!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-07',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt: 'In which English county does the prehistoric monument of Stonehenge stand?',
    options: ['Wiltshire', 'Dorset', 'Suffolk', 'Kent'],
    correctIndices: [0],
    explanation:
      'Stonehenge still stands in what is now the English county of Wiltshire and was probably a special gathering place for seasonal ceremonies.',
    memoryHook:
      '🌶️ Spice Hook: "Stonehenge Will Never Wilt, it’s in Wiltshire!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-08',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt: 'Who led a Roman invasion of Britain in 55 BC that was unsuccessful?',
    options: ['Emperor Claudius', 'Julius Caesar', 'Emperor Hadrian', 'Mark Antony'],
    correctIndices: [1],
    explanation:
      'Julius Caesar led a Roman invasion of Britain in 55 BC. This was unsuccessful, and for nearly 100 years Britain remained separate from the Roman Empire until Claudius invaded in AD 43.',
    memoryHook:
      '🌶️ Spice Hook: "55 BC = Caesar’s Slip-up; AD 43 = Claudius’s Crown!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-09',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Why did the Roman Emperor Hadrian build a wall in the north of England?',
    options: [
      'To mark the border between England and Wales',
      'To stop Viking longships sailing up the Thames',
      'To divide Anglo-Saxon kingdoms from the Danelaw',
      'To keep out the Picts (ancestors of the Scottish people)',
    ],
    correctIndices: [3],
    explanation:
      'Areas of what is now Scotland were never conquered by the Romans, and Emperor Hadrian built Hadrian’s Wall in the north of England to keep out the Picts.',
    memoryHook:
      '🌶️ Spice Hook: "Hadrian’s Wall kept out the Picts once and for all!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-10',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'Where in Suffolk was a famous Anglo-Saxon king buried with treasure and armour inside a ship under a mound of earth?',
    options: ['Maiden Castle', 'Sutton Hoo', 'Skara Brae', 'Vindolanda'],
    correctIndices: [1],
    explanation:
      'The burial place of one of the early Anglo-Saxon kings was found at Sutton Hoo in modern Suffolk; he was buried with treasure and armour, all placed in a ship covered by a mound of earth.',
    memoryHook:
      '🌶️ Spice Hook: "Sutton Hoo in Suffolk = Saxon Ship & Shiny Helmet!" (S + S + S!).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-11',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt: 'Which king united the Anglo-Saxon kingdoms in England and defeated the Vikings?',
    options: [
      'King Alfred the Great',
      'King Harold',
      'King Kenneth MacAlpin',
      'King John',
    ],
    correctIndices: [0],
    explanation:
      'The Anglo-Saxon kingdoms in England united under King Alfred the Great, who defeated the Vikings while permitting many Danes to live peacefully in the Danelaw.',
    memoryHook:
      '🌶️ Spice Hook: Why is Alfred "the Great"? Because he united Anglo-Saxons and beat the Vikings!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-12',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'In 1348, the Black Death (a form of plague) came to Britain. Roughly what fraction of the population of England, Wales, and Scotland died?',
    options: ['One tenth', 'One quarter', 'One third', 'Three quarters'],
    correctIndices: [2],
    explanation:
      'In 1348, the Black Death killed one third of the population in England, with similar proportions in Wales and Scotland: one of the worst disasters ever to strike Britain.',
    memoryHook:
      '🌶️ Spice Hook: "1348 starts with 1-3 → 1/3 (one third) of Britain perished in the Black Death!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex02-13',
    examNumber: 2,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt: 'Who was the first person in England to print books using a printing press?',
    options: ['Geoffrey Chaucer', 'John Barbour', 'William Shakespeare', 'William Caxton'],
    correctIndices: [3],
    explanation:
      'In the years leading up to 1485, William Caxton became the first person in England to print books using a printing press, including Geoffrey Chaucer’s Canterbury Tales.',
    memoryHook:
      '🌶️ Spice Hook: "Caxton Clicked the first printing press in England!"',
  },
  {
    id: 'q-ex02-14',
    examNumber: 2,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'boolean',
    prompt: 'Is the British Monarch the head of the national Church of Scotland?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No! Unlike the Church of England, the national Church of Scotland is a Presbyterian church governed by ministers and elders (its leadership is the Moderator of the General Assembly), and the British Monarch is NOT its head.',
    memoryHook:
      '🌶️ Spice Hook: Classic exam trap! "Scotland’s Kirk has NO King as head!"',
  },
  {
    id: 'q-ex02-15',
    examNumber: 2,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Who became the first man in the world to run a mile in under four minutes in 1954?',
    options: ['Sir Mo Farah', 'Sir Roger Bannister', 'Seb Coe', 'Sir Chris Hoy'],
    correctIndices: [1],
    explanation:
      'In 1954, Sir Roger Bannister (1929–2018) became the first man in the world to run a mile in under four minutes, at Oxford.',
    memoryHook:
      '🌶️ Spice Hook: "Bannister Broke the 4-minute barrier in ’54!" (4 mins in ’54!).',
  },
  {
    id: 'q-ex02-16',
    examNumber: 2,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Which famous event held in London each summer is the oldest tennis tournament in the world and the only "Grand Slam" played on grass?',
    options: [
      'The Wimbledon Championships',
      'Queen’s Club Championships',
      'Royal Ascot',
      'The Open Championship',
    ],
    correctIndices: [0],
    explanation:
      'The Wimbledon Championships, held every year at the All England Croquet and Lawn Tennis Club, is the oldest tennis tournament in the world and the only Grand Slam event played on grass.',
    memoryHook:
      '🌶️ Spice Hook: Strawberries, cream, and green grass, Wimbledon is #1 oldest tennis slam!',
  },
  {
    id: 'q-ex02-17',
    examNumber: 2,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which Scottish doctor and writer created the world-famous fictional detective Sherlock Holmes in 1887?',
    options: [
      'Robert Louis Stevenson',
      'Ian Fleming',
      'Charles Dickens',
      'Sir Arthur Conan Doyle',
    ],
    correctIndices: [3],
    explanation:
      'Sir Arthur Conan Doyle (1859–1930) was a Scottish doctor and writer best known for his stories about Sherlock Holmes, who was one of the first fictional detectives.',
    memoryHook:
      '🌶️ Spice Hook: Elementary, my dear Spice Girl! "Conan Doyle = Detective Sherlock!"',
  },
  {
    id: 'q-ex02-18',
    examNumber: 2,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt: 'Which TWO of the following famous novels were written by Charles Dickens? (Choose TWO)',
    options: [
      'Pride and Prejudice',
      'Far from the Madding Crowd',
      'Oliver Twist',
      'Great Expectations',
    ],
    correctIndices: [2, 3],
    explanation:
      'Charles Dickens (1812–1870) wrote celebrated Victorian novels including Oliver Twist and Great Expectations, creating characters like Scrooge and Mr Micawber that are still referenced in everyday English.',
    memoryHook:
      '🌶️ Spice Hook: "Please sir, I want Great Expectations!", Oliver Twist + Great Expectations = Dickens!',
  },
  {
    id: 'q-ex02-19',
    examNumber: 2,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt: 'Who is the Head of State of the United Kingdom?',
    options: [
      'The Prime Minister',
      'The Monarch (His Majesty King Charles III)',
      'The Lord Speaker',
      'The Chief Justice of the Supreme Court',
    ],
    correctIndices: [1],
    explanation:
      'The UK has a constitutional monarchy: His Majesty King Charles III is the Head of State, while the Prime Minister is the leader of the elected government.',
    memoryHook:
      '🌶️ Spice Hook: Don’t mix them up! "Head of State = King Charles III; Head of Government = Prime Minister!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex02-20',
    examNumber: 2,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'What voting system is used to elect MPs to the House of Commons in a UK General Election?',
    options: [
      'First Past the Post',
      'Proportional Representation',
      'Single Transferable Vote',
      'Additional Member System',
    ],
    correctIndices: [0],
    explanation:
      'MPs are elected to the House of Commons through the "First Past the Post" system: in each constituency, the candidate who receives the most votes wins the seat.',
    memoryHook:
      '🌶️ Spice Hook: Like a horse race to the finish post, Westminster MPs win by "First Past the Post"!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex02-21',
    examNumber: 2,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'Who chairs debates in the House of Commons and ensures that MPs follow parliamentary rules while remaining politically neutral?',
    options: ['The Prime Minister', 'The Chief Whip', 'The Speaker', 'The Chancellor'],
    correctIndices: [2],
    explanation:
      'Debates in the House of Commons are chaired by the Speaker, who is the chief officer of the House of Commons, remains politically neutral, and keeps order during debates.',
    memoryHook:
      '🌶️ Spice Hook: "Order! Order!", The Speaker runs the Commons mic and stays 100% neutral!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex02-22',
    examNumber: 2,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'boolean',
    prompt:
      'Can the House of Commons overrule the House of Lords if the Lords reject a proposed law?',
    options: ['Yes', 'No'],
    correctIndices: [0],
    explanation:
      'Yes. While the House of Lords checks and suggests amendments to laws passed by the Commons, the democratically elected House of Commons is the more powerful chamber and can legally overrule the Lords.',
    memoryHook:
      '🌶️ Spice Hook: Voters elect the Commons, so "Commons Calls the Final Shot" over the unelected Lords!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex02-23',
    examNumber: 2,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'Which senior Cabinet minister is responsible for crime, policing, and immigration?',
    options: [
      'The Chancellor of the Exchequer',
      'The Foreign Secretary',
      'The Defence Secretary',
      'The Home Secretary',
    ],
    correctIndices: [3],
    explanation:
      'The Home Secretary is the Cabinet minister responsible for crime, policing, national security, and immigration.',
    memoryHook:
      '🌶️ Spice Hook: "Home Secretary = Keeping Home Safe" (Police, crime & borders at home!).',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex02-24',
    examNumber: 2,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'True or False: In the UK, the judiciary (judges) are independent of the government, so politicians cannot interfere in court cases.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Judges in the UK are strictly independent of the government and Parliament; ministers cannot tell judges how to decide legal cases, and judges can even rule that government actions are unlawful.',
    memoryHook:
      '🌶️ Spice Hook: Judicial wigs answer to the Law, NEVER to politicians!',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 3 (q-ex03-01 .. q-ex03-24)
  // ============================================================================
  {
    id: 'q-ex03-01',
    examNumber: 3,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt: 'How much time are you allowed to complete the official Life in the UK Test?',
    options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'],
    correctIndices: [1],
    explanation:
      'Candidates have 45 minutes to answer the 24 multiple-choice questions in the official Life in the UK Test.',
    memoryHook:
      '🌶️ Spice Hook: Like a classic 45 RPM Spice Girls single, you get 45 minutes on the clock!',
  },
  {
    id: 'q-ex03-02',
    examNumber: 3,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'single',
    prompt: 'Which of the following is NOT a fundamental principle of British life?',
    options: [
      'Individual liberty',
      'Tolerance of those with different faiths and beliefs',
      'Belonging to the established state church',
      'Participation in community life',
    ],
    correctIndices: [2],
    explanation:
      'Freedom of religion (including having no religion) and tolerance of different faiths and beliefs are core British principles; nobody is required to belong to a state church.',
    memoryHook:
      '🌶️ Spice Hook: Britain champions freedom of belief, compulsory church membership is NEVER required!',
  },
  {
    id: 'q-ex03-03',
    examNumber: 3,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'boolean',
    prompt:
      'True or False: At a UK citizenship ceremony, people who do not wish to swear a religious oath can choose to make a non-religious Affirmation of Allegiance instead.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Those who do not wish to swear a religious Oath ("I swear by Almighty God...") can make a solemn non-religious Affirmation of Allegiance ("I do solemnly, sincerely and truly declare and affirm...") to King Charles III.',
    memoryHook:
      '🌶️ Spice Hook: Religious = Oath; Non-religious = Affirmation, everyone is welcome under the Union Jack!',
  },
  {
    id: 'q-ex03-04',
    examNumber: 3,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt: 'What is the capital city of Northern Ireland?',
    options: ['Dublin', 'Derry / Londonderry', 'Belfast', 'Lisburn'],
    correctIndices: [2],
    explanation:
      'Belfast is the capital city of Northern Ireland (note that Dublin is the capital of the Republic of Ireland, an independent country).',
    memoryHook:
      '🌶️ Spice Hook: Don’t fall for the Dublin trap! Northern Ireland’s capital is BELFAST!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex03-05',
    examNumber: 3,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt: 'Why does the red Welsh dragon NOT appear on the Union Flag?',
    options: [
      'The Principality of Wales was already united with England when the first Union Flag was created in 1606',
      'Wales chose to keep its flag completely secret',
      'Wales only joined the United Kingdom in 1922',
      'Red ink was reserved exclusively for St Patrick’s cross',
    ],
    correctIndices: [0],
    explanation:
      'The Welsh dragon does not appear on the Union Flag because, when the first Union Flag was created in 1606 from the flags of Scotland and England, the Principality of Wales was already united with England.',
    memoryHook:
      '🌶️ Spice Hook: By 1606, Wales & England were already legally hitched, so Wales was represented inside England’s flag!',
    visualId: 'union-jack',
  },
  {
    id: 'q-ex03-06',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Around 4,000 years ago, people learned to make bronze. What structures did Bronze Age people build to bury their dead alongside bronze tools and gold ornaments?',
    options: ['Hill forts', 'Roman amphitheatres', 'Norman motte-and-baileys', 'Round barrows'],
    correctIndices: [3],
    explanation:
      'During the Bronze Age, people lived in roundhouses and buried their dead in tombs called round barrows, crafting metal objects in bronze and gold.',
    memoryHook:
      '🌶️ Spice Hook: "Bronze Age = Roundhouses & Round Barrows!" (B + R = Bronze Round!).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-07',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Which tribal leader of the Iceni in what is now eastern England fought against the Romans and is remembered by a statue on Westminster Bridge?',
    options: ['Boudicca', 'Cartimandua', 'Elizabeth I', 'Matilda'],
    correctIndices: [0],
    explanation:
      'One of the tribal leaders who fought against the Romans was Boudicca, the queen of the Iceni in what is now eastern England. Her statue stands on Westminster Bridge in London.',
    memoryHook:
      '🌶️ Spice Hook: Original Girl Power! Queen Boudicca battled Rome and still rides her chariot by Big Ben!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-08',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'After nearly 400 years in Britain, in what year did the Roman army leave Britain to defend other parts of the Roman Empire?',
    options: ['AD 122', 'AD 310', 'AD 410', 'AD 597'],
    correctIndices: [2],
    explanation:
      'The Romans remained in Britain for nearly 400 years (from AD 43) until the Roman army left in AD 410 to defend other parts of the Roman Empire, never to return.',
    memoryHook:
      '🌶️ Spice Hook: "In AD 43 they marched right in; in AD 410 Rome left Britain again!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-09',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'Which early Christian missionary founded a monastery on the island of Iona, off the coast of what is now Scotland?',
    options: ['St Augustine', 'St Columba', 'St George', 'St David'],
    correctIndices: [1],
    explanation:
      'Missionaries from Ireland spread Christianity in the north, notably St Columba, who founded a monastery on the island of Iona, off the coast of what is now Scotland.',
    memoryHook:
      '🌶️ Spice Hook: "Columba sailed to Scottish Iona; Augustine went south to Canterbury!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-10',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt: 'Who defeated the Saxon King Harold at the Battle of Hastings in 1066?',
    options: [
      'King Cnut of Denmark',
      'Robert the Bruce',
      'King Edward I',
      'William, Duke of Normandy',
    ],
    correctIndices: [3],
    explanation:
      'In 1066, an invasion led by William, the Duke of Normandy (in northern France), defeated Harold, the Saxon king of England, at the Battle of Hastings. Harold was killed, and William became known as William the Conqueror.',
    memoryHook:
      '🌶️ Spice Hook: "1066 Hastings = William the Conqueror takes the English throne!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-11',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt: 'What was the Domesday Book, compiled on the orders of William the Conqueror?',
    options: [
      'A record of all the towns, villages, people, land, and animals in England',
      'A book of prayers used in Canterbury Cathedral',
      'A collection of medieval poems written in Norman French',
      'A peace treaty between England and Scotland',
    ],
    correctIndices: [0],
    explanation:
      'William the Conqueror sent people all over England to draw up lists of all the towns and villages, the people who lived there, who owned the land, and what animals they owned. This was called the Domesday Book and still exists today.',
    memoryHook:
      '🌶️ Spice Hook: Domesday Book = The ultimate 11th-century spreadsheet counting every village, landowner & pig!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-12',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'Which English king defeated a vastly larger French army at the Battle of Agincourt in 1415 during the Hundred Years War?',
    options: ['King Edward I', 'King Henry V', 'King Richard III', 'King Henry VII'],
    correctIndices: [1],
    explanation:
      'One of the most famous battles of the Hundred Years War was the Battle of Agincourt in 1415, where King Henry V’s vastly outnumbered English army defeated the French.',
    memoryHook:
      '🌶️ Spice Hook: Look at 1415: "1 + 4 = 5 (and ends in 5) → Henry V won Agincourt in 1415!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-13',
    examNumber: 3,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'Which battle in 1485 ended the Wars of the Roses when Henry Tudor defeated King Richard III?',
    options: [
      'The Battle of Hastings',
      'The Battle of Bannockburn',
      'The Battle of Bosworth Field',
      'The Battle of Agincourt',
    ],
    correctIndices: [2],
    explanation:
      'The Wars of the Roses ended with the Battle of Bosworth Field in 1485. King Richard III of the House of York was killed, and Henry Tudor of the House of Lancaster became King Henry VII.',
    memoryHook:
      '🌶️ Spice Hook: "Bosworth 1485 = Bye-bye Richard III, hello Tudor dynasty!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex03-14',
    examNumber: 3,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'What type of church is the national Church of Scotland?',
    options: [
      'An Anglican church',
      'A Roman Catholic church',
      'A Presbyterian church',
      'A Quaker meeting',
    ],
    correctIndices: [2],
    explanation:
      'In Scotland, the national Church is the Church of Scotland, which is a Presbyterian church governed by ministers and elders.',
    memoryHook:
      '🌶️ Spice Hook: "England = Anglican; Scotland = Presbyterian!"',
  },
  {
    id: 'q-ex03-15',
    examNumber: 3,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'Which Scottish former racing driver won the Formula 1 World Championship three times?',
    options: [
      'Sir Jackie Stewart',
      'Damon Hill',
      'Sir Bradley Wiggins',
      'Sir Roger Bannister',
    ],
    correctIndices: [0],
    explanation:
      'Sir Jackie Stewart (born 1939) is a Scottish former racing driver who won the Formula 1 World Championship three times.',
    memoryHook:
      '🌶️ Spice Hook: "Tartan Turbo, Scottish Jackie Stewart won 3 F1 crowns!"',
  },
  {
    id: 'q-ex03-16',
    examNumber: 3,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'multiple',
    prompt:
      'Which TWO universities compete against each other in the famous annual Boat Race along the River Thames in London? (Choose TWO)',
    options: ['University of Oxford', 'University of Cambridge', 'University of Edinburgh', 'Durham University'],
    correctIndices: [0, 1],
    explanation:
      'The Boat Race is a famous annual rowing race on the River Thames in London between crews from the Universities of Oxford and Cambridge.',
    memoryHook:
      '🌶️ Spice Hook: Dark Blue vs Light Blue on the Thames = Oxford & Cambridge!',
  },
  {
    id: 'q-ex03-17',
    examNumber: 3,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO of the following famous adventure and mystery stories were written by Robert Louis Stevenson? (Choose TWO)',
    options: [
      'Oliver Twist',
      'Treasure Island',
      'The Strange Case of Dr Jekyll and Mr Hyde',
      'Sense and Sensibility',
    ],
    correctIndices: [1, 2],
    explanation:
      'Robert Louis Stevenson (1850–1894) wrote books that are still read by adults and children today, most famously Treasure Island, Kidnapped, and The Strange Case of Dr Jekyll and Mr Hyde.',
    memoryHook:
      '🌶️ Spice Hook: "Two sides of Stevenson (2-Become-1!): Pirates on Treasure Island + Jekyll & Hyde!"',
  },
  {
    id: 'q-ex03-18',
    examNumber: 3,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'In which famous London theatre were many of William Shakespeare’s plays originally performed (with a modern replica standing near the site today)?',
    options: [
      'The Royal Albert Hall',
      'The London Palladium',
      'The Old Bailey',
      'The Globe Theatre',
    ],
    correctIndices: [3],
    explanation:
      'Many of Shakespeare’s plays, such as Hamlet, Macbeth, and A Midsummer Night’s Dream, were performed in the Globe Theatre in London; a modern replica stands on the south bank of the Thames today.',
    memoryHook:
      '🌶️ Spice Hook: "All the world’s a stage" → Shakespeare’s stage was The GLOBE!',
  },
  {
    id: 'q-ex03-19',
    examNumber: 3,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt: 'What happens during the King’s Speech at the State Opening of Parliament?',
    options: [
      'King Charles III outlines the UK government’s policies and proposed new laws for the session',
      'King Charles III announces his own personal political manifesto',
      'MPs vote by show of hands to elect a new Prime Minister',
      'Judges of the Supreme Court swear in local councillors',
    ],
    correctIndices: [0],
    explanation:
      'King Charles III opens each new parliamentary session with the King’s Speech (written by the elected government), setting out the government’s policies and the Bills to be introduced to Parliament.',
    memoryHook:
      '🌶️ Spice Hook: King Charles III reads the speech from the throne, but the elected PM’s government writes the script!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex03-20',
    examNumber: 3,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'At least how often must a UK Parliamentary General Election be held?',
    options: [
      'At least every 3 years',
      'At least every 4 years',
      'At least every 5 years',
      'At least every 7 years',
    ],
    correctIndices: [2],
    explanation:
      'MPs are elected at a General Election, which must be held at least every five years (though an election can be called earlier).',
    memoryHook:
      '🌶️ Spice Hook: Five Spice Girls = max 5 years between UK General Elections!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex03-21',
    examNumber: 3,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'How often does Prime Minister’s Questions (PMQs) take place when Parliament is sitting?',
    options: ['Every day', 'Once a week', 'Once a month', 'Twice a year'],
    correctIndices: [1],
    explanation:
      'The Opposition and MPs question the Prime Minister in the House of Commons every week (on Wednesdays) during Prime Minister’s Questions (PMQs) while Parliament is sitting.',
    memoryHook:
      '🌶️ Spice Hook: Every Wednesday at noon, the PM faces the music, PMQs is ONCE A WEEK!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex03-22',
    examNumber: 3,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'What is Hansard?',
    options: [
      'The ceremonial mace carried into the House of Commons',
      'The country residence of the Prime Minister',
      'The committee that sets interest rates at the Bank of England',
      'The official verbatim published report of everything said in Parliamentary proceedings',
    ],
    correctIndices: [3],
    explanation:
      'Proceedings in Parliament are broadcast on television and published in official reports known as Hansard, which are freely available in large libraries and online.',
    memoryHook:
      '🌶️ Spice Hook: "Hansard heard every word!", Parliament’s official word-for-word transcript!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex03-23',
    examNumber: 3,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Which TWO of the following are examples of Civil Law disputes rather than Criminal Law offences? (Choose TWO)',
    options: [
      'Carrying an illegal weapon in public',
      'Shoplifting from a supermarket',
      'Housing disputes between landlords and tenants',
      'Employment disputes such as unfair dismissal',
    ],
    correctIndices: [2, 3],
    explanation:
      'Civil law settles disputes between individuals or groups: including housing law (landlord/tenant), consumer rights, employment law (unfair dismissal/discrimination), and debt: whereas weapons offences and theft are criminal offences.',
    memoryHook:
      '🌶️ Spice Hook: Civil = Citizen-vs-Citizen disputes (rent, work, contracts, debt); Criminal = Crime & Police!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex03-24',
    examNumber: 3,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'boolean',
    prompt:
      'True or False: UK civil servants are politically neutral and continue to serve whichever political party is elected to form the government.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Civil servants support the government in developing and implementing policies and delivering public services. Unlike ministers, they are politically neutral (bound by integrity, honesty, objectivity, and impartiality) and are not replaced when governments change.',
    memoryHook:
      '🌶️ Spice Hook: Ministers wear party colours; Civil Servants stay strictly neutral!',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 4 (q-ex04-01 .. q-ex04-24)
  // ============================================================================
  {
    id: 'q-ex04-01',
    examNumber: 4,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'Unless exempt, what minimum level of English speaking and listening skill is required when applying for settlement or UK citizenship?',
    options: [
      'CEFR level A1',
      'CEFR level A2',
      'CEFR level B1',
      'University doctorate level (C2)',
    ],
    correctIndices: [2],
    explanation:
      'Along with passing the Life in the UK Test, applicants usually need to demonstrate English speaking and listening skills at Common European Framework of Reference (CEFR) level B1 (intermediate) or higher.',
    memoryHook:
      '🌶️ Spice Hook: "Wanna B1 with the UK? You need English level B1!"',
  },
  {
    id: 'q-ex04-02',
    examNumber: 4,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'multiple',
    prompt:
      'Which TWO of the following freedoms and rights does the UK offer to its residents and citizens in return for respecting its laws and values? (Choose TWO)',
    options: [
      'Freedom of speech',
      'Exemption from paying local taxes',
      'A right to a fair trial',
      'Guaranteed election to Parliament',
    ],
    correctIndices: [0, 2],
    explanation:
      'In return for fulfilling civic responsibilities, the UK offers: freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, and a right to join in the election of a government.',
    memoryHook:
      '🌶️ Spice Hook: "Tell me what you want!", Free speech + Fair trial + Free belief + Fair vote!',
  },
  {
    id: 'q-ex04-03',
    examNumber: 4,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'boolean',
    prompt:
      'Are the Channel Islands and the Isle of Man officially part of the United Kingdom?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No. The Channel Islands and the Isle of Man are "Crown Dependencies": they are closely linked to the Crown and British Isles, have their own governments, and are NOT part of the UK.',
    memoryHook:
      '🌶️ Spice Hook: Huge exam favourite! Channel Islands + Isle of Man = Crown Dependencies (NOT part of the UK)!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex04-04',
    examNumber: 4,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt: 'What is the national flower of Scotland?',
    options: ['The Thistle', 'The Daffodil', 'The Shamrock', 'The Rose'],
    correctIndices: [0],
    explanation:
      'The national flower of Scotland is the Thistle: a prickly-leaved purple flower originally used as a defensive symbol.',
    memoryHook:
      '🌶️ Spice Hook: "Prickly purple power in the Highlands = Scottish Thistle!"',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex04-05',
    examNumber: 4,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'multiple',
    prompt:
      'Which TWO nations of the UK have an official bank holiday for their patron saint’s day? (Choose TWO)',
    options: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    correctIndices: [1, 3],
    explanation:
      'Although all four nations celebrate their patron saints’ days, only Scotland (St Andrew’s Day, 30 November) and Northern Ireland (St Patrick’s Day, 17 March) have official public holidays for them.',
    memoryHook:
      '🌶️ Spice Hook: "North & North-West get the day off!", Only Scotland & Northern Ireland have patron saint bank holidays!',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex04-06',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Which impressive Iron Age hill fort can still be seen today in the English county of Dorset?',
    options: ['Sutton Hoo', 'Skara Brae', 'Vindolanda', 'Maiden Castle'],
    correctIndices: [3],
    explanation:
      'During the Iron Age, people often defended sites called hill forts. A very impressive hill fort can still be seen today at Maiden Castle, in the English county of Dorset.',
    memoryHook:
      '🌶️ Spice Hook: Iron Age Girl Power, "Maiden Castle stands tall on a Dorset hill!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-07',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'multiple',
    prompt:
      'Which TWO Roman forts along Hadrian’s Wall can still be visited today as part of a UNESCO World Heritage Site? (Choose TWO)',
    options: ['Maiden Castle', 'Housesteads', 'Conwy', 'Vindolanda'],
    correctIndices: [1, 3],
    explanation:
      'Parts of Hadrian’s Wall: including the Roman forts of Housesteads and Vindolanda, can still be seen today and are a popular walking area and UNESCO World Heritage Site.',
    memoryHook:
      '🌶️ Spice Hook: "Roman soldiers lived in Houses (Housesteads) and drank Vino (Vindolanda) on Hadrian’s Wall!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-08',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'multiple',
    prompt:
      'Where did the Vikings come from when they first visited Britain in AD 789 to raid coastal towns? (Choose TWO)',
    options: ['Denmark', 'Italy', 'Spain', 'Norway'],
    correctIndices: [0, 3],
    explanation:
      'The Vikings came from Denmark and Norway. They first raided coastal towns and monasteries in AD 789 before staying to form their own communities in eastern England and Scotland.',
    memoryHook:
      '🌶️ Spice Hook: "Scandi Raiders = Denmark & Norway in AD 7-8-9 (count 7, 8, 9)!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-09',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'What name was given to the region of eastern and northern England where Danish Viking settlers lived after uniting peaceably alongside Anglo-Saxons?',
    options: ['The Pale', 'The Danelaw', 'Wessex', 'Caledonia'],
    correctIndices: [1],
    explanation:
      'Many Viking invaders stayed in Britain: especially in the east and north of England, in an area known as the Danelaw (giving rise to place names like Grimsby and Scunthorpe).',
    memoryHook:
      '🌶️ Spice Hook: "Danes + Law = The Danelaw" (east & north England)!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-10',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'Which famous linen embroidery, nearly 70 metres (230 feet) long, commemorates the 1066 Battle of Hastings?',
    options: [
      'The Magna Carta',
      'The Domesday Book',
      'The Lindisfarne Gospels',
      'The Bayeux Tapestry',
    ],
    correctIndices: [3],
    explanation:
      'The Battle of Hastings is commemorated in a great piece of embroidery known as the Bayeux Tapestry, which is nearly 70 metres (230 feet) long and can still be seen in France today.',
    memoryHook:
      '🌶️ Spice Hook: Posh couture of 1066, 70 metres of battle stitches on the Bayeux Tapestry!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-11',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt: 'What fundamental constitutional principle was established by the Magna Carta in 1215?',
    options: [
      'Every adult man and woman had the right to vote',
      'England and Scotland were united under one Parliament',
      'Even the king was subject to the law',
      'The Prime Minister could dismiss the Monarch',
    ],
    correctIndices: [2],
    explanation:
      'The Magna Carta ("Charter of Liberties") established the idea that even the king was subject to the law. It protected the rights of the nobility and restricted the king’s power to collect taxes or make/change laws without consulting his nobles.',
    memoryHook:
      '🌶️ Spice Hook: Magna Carta = "Nobody, not even the King, is above the law!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-12',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'What did King Edward I of England introduce in 1284 to annex Wales to the Crown of England?',
    options: [
      'The Statute of Rhuddlan',
      'The Magna Carta',
      'The Domesday Book',
      'The Treaty of Dover',
    ],
    correctIndices: [0],
    explanation:
      'In 1284, King Edward I of England introduced the Statute of Rhuddlan, which annexed Wales to the Crown of England and was backed up by massive castles such as Conwy and Caernarfon.',
    memoryHook:
      '🌶️ Spice Hook: "Rhuddlan sounds Welsh (double-d!) → 1284 Statute of Rhuddlan annexed Wales!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex04-13',
    examNumber: 4,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'Who wrote The Bruce, a medieval poem in the Scots language celebrating Robert the Bruce’s victory at Bannockburn?',
    options: ['John Barbour', 'Geoffrey Chaucer', 'Robert Burns', 'William Caxton'],
    correctIndices: [0],
    explanation:
      'In Scotland, many people continued to speak Gaelic and the Scots language also developed; the poet and chronicler John Barbour wrote The Bruce about the Battle of Bannockburn.',
    memoryHook:
      '🌶️ Spice Hook: "Barbour wrote The Bruce about Bannockburn!" (B + B + B!).',
  },
  {
    id: 'q-ex04-14',
    examNumber: 4,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'Who is the spiritual leader of the Church of England?',
    options: [
      'The Archbishop of Canterbury',
      'The Moderator of the General Assembly',
      'The Lord Chancellor',
      'The Cardinal of Westminster',
    ],
    correctIndices: [0],
    explanation:
      'While the Monarch (King Charles III) is the Supreme Governor of the Church of England, the Archbishop of Canterbury is the spiritual leader of the Church of England (and the worldwide Anglican Communion).',
    memoryHook:
      '🌶️ Spice Hook: Monarch = Formal Head (Governor); Archbishop of Canterbury = Spiritual Leader!',
  },
  {
    id: 'q-ex04-15',
    examNumber: 4,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Jayne Torvill and Christopher Dean won a legendary gold medal at the 1984 Winter Olympics in which sport?',
    options: ['Ski jumping', 'Curling', 'Bobsleigh', 'Ice dancing'],
    correctIndices: [3],
    explanation:
      'Jayne Torvill and Christopher Dean won gold medals for ice dancing at the Olympic Games in 1984 (skating to Ravel’s Bolero) and in four consecutive world championships.',
    memoryHook:
      '🌶️ Spice Hook: "2 Become 1 on Ice!", Torvill & Dean danced to 1984 Olympic ice-dancing gold!',
  },
  {
    id: 'q-ex04-16',
    examNumber: 4,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'Where is the famous Grand National horse race held every year?',
    options: [
      'Ascot in Berkshire',
      'Epsom in Surrey',
      'Aintree near Liverpool',
      'Newmarket in Suffolk',
    ],
    correctIndices: [2],
    explanation:
      'Famous horse-racing events in the UK include Royal Ascot, the Scottish Grand National, and the Grand National at Aintree near Liverpool.',
    memoryHook:
      '🌶️ Spice Hook: "Aintree near Liverpool = Grade-A jumps at the Grand National!"',
  },
  {
    id: 'q-ex04-17',
    examNumber: 4,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which author wrote novels focused on rural society in south-west England, including Far from the Madding Crowd and Jude the Obscure?',
    options: [
      'Charles Dickens',
      'Sir Arthur Conan Doyle',
      'Robert Louis Stevenson',
      'Thomas Hardy',
    ],
    correctIndices: [3],
    explanation:
      'Thomas Hardy (1840–1928) was an author and poet whose best-known novels focus on rural society in south-west England, including Far from the Madding Crowd and Jude the Obscure.',
    memoryHook:
      '🌶️ Spice Hook: "Country life is Hard(y)!", Thomas Hardy wrote rural classics Far from the Madding Crowd & Jude the Obscure!',
  },
  {
    id: 'q-ex04-18',
    examNumber: 4,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'boolean',
    prompt:
      'True or False: The Tower of London was first built by William the Conqueror after he became king in 1066, and visitors can see the Crown Jewels there today.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'The Tower of London was first built by William the Conqueror after he became king in 1066. Today visitors can tour the fortress, meet Yeoman Warders ("Beefeaters"), and view the Crown Jewels.',
    memoryHook:
      '🌶️ Spice Hook: 1066 Conqueror built the White Tower, and today it guards the Crown’s bling!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex04-19',
    examNumber: 4,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt:
      'Once a Bill has been passed by both the House of Commons and the House of Lords, what must King Charles III formally grant for it to become an Act of Parliament (law)?',
    options: [
      'A Privy Seal',
      'A Speaker’s Warrant',
      'A Referendum',
      'Royal Assent',
    ],
    correctIndices: [3],
    explanation:
      'In the UK’s constitutional monarchy, once both Houses of Parliament pass a Bill, the Monarch formally agrees to make it an Act of Parliament by granting Royal Assent.',
    memoryHook:
      '🌶️ Spice Hook: "Say You’ll Be Law!", Crown sign-off on a Bill is called Royal Assent!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex04-20',
    examNumber: 4,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'What happens if an MP dies or resigns between UK General Elections?',
    options: [
      'The Prime Minister personally picks a friend to take the seat',
      'The seat remains empty for up to five years',
      'A fresh election called a by-election is held in that MP’s constituency',
      'A member of the House of Lords automatically takes the seat',
    ],
    correctIndices: [2],
    explanation:
      'If an MP dies or resigns, there will be a fresh election, called a by-election, in his or her constituency alone.',
    memoryHook:
      '🌶️ Spice Hook: When an MP waves "bye-bye", their constituency holds a "by-election"!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex04-21',
    examNumber: 4,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'How is the Speaker of the House of Commons chosen?',
    options: [
      'Elected by fellow MPs in a secret ballot',
      'Appointed personally by the Prime Minister',
      'Inherited from the oldest peer in the House of Lords',
      'Chosen at random from the public electoral register',
    ],
    correctIndices: [0],
    explanation:
      'The Speaker is an MP elected by other MPs in a secret ballot to chair debates impartially in the House of Commons.',
    memoryHook:
      '🌶️ Spice Hook: MPs pick their own referee, Speaker is chosen by MPs via SECRET BALLOT!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex04-22',
    examNumber: 4,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'Which senior Cabinet minister is responsible for managing the UK’s relationships with foreign countries?',
    options: [
      'The Home Secretary',
      'The Chancellor of the Exchequer',
      'The Leader of the House',
      'The Foreign Secretary',
    ],
    correctIndices: [3],
    explanation:
      'The Foreign Secretary (Secretary of State for Foreign, Commonwealth and Development Affairs) is responsible for managing relationships with foreign countries and British diplomacy abroad.',
    memoryHook:
      '🌶️ Spice Hook: "Spice Up Your World!", Foreign affairs = Foreign Secretary!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex04-23',
    examNumber: 4,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'boolean',
    prompt: 'Can a 17-year-old vote in a UK Parliamentary General Election?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No. To vote in a UK Parliamentary General Election (Westminster), you must be aged 18 or over and registered on the electoral register.',
    memoryHook:
      '🌶️ Spice Hook: Car driving starts at 17, but Westminster General Election voting = 18+!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex04-24',
    examNumber: 4,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Which branch of law relates to offences against society, usually investigated by the police and prosecuted on behalf of the state?',
    options: [
      'Criminal law',
      'Civil law',
      'Employment tribunal law',
      'Small claims procedure',
    ],
    correctIndices: [0],
    explanation:
      'Laws in the UK are divided into criminal law and civil law. Criminal law relates to crimes against society, which are investigated by the police or another authority and punished by the courts.',
    memoryHook:
      '🌶️ Spice Hook: Police + Prosecution = Criminal Law; Private Citizen Disputes = Civil Law!',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 5 (q-ex05-01 .. q-ex05-24)
  // ============================================================================
  {
    id: 'q-ex05-01',
    examNumber: 5,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'From what age are applicants automatically exempt from both the Life in the UK Test and the English language requirement when applying for settlement or citizenship?',
    options: ['55 or over', '60 or over', '65 or over', '70 or over'],
    correctIndices: [2],
    explanation:
      'Applicants aged 65 or over (as well as those under 18, or with certain permanent physical or mental conditions) are exempt from taking the Life in the UK Test and proving B1 English.',
    memoryHook:
      '🌶️ Spice Hook: "At 65, relax & thrive, no test required!"',
  },
  {
    id: 'q-ex05-02',
    examNumber: 5,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'boolean',
    prompt:
      'True or False: Forced marriage and female genital mutilation (FGM) are illegal criminal offences in the United Kingdom.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Forced marriage (forcing someone to marry against their will), FGM (including taking a girl abroad for FGM), and domestic violence are serious criminal offences in the UK.',
    memoryHook:
      '🌶️ Spice Hook: Individual liberty & safety are non-negotiable, forced marriage & FGM are strictly ILLEGAL crimes!',
  },
  {
    id: 'q-ex05-03',
    examNumber: 5,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'Alongside the Oath or Affirmation of Allegiance to the King, what do new citizens promise in the Citizenship Pledge?',
    options: [
      'To never travel outside the United Kingdom for five years',
      'To join a British political party within six months',
      'To give loyalty to the UK, respect its rights and freedoms, uphold its democratic values, and observe its laws',
      'To purchase property in England, Scotland, Wales, or Northern Ireland',
    ],
    correctIndices: [2],
    explanation:
      'In the Citizenship Pledge, new citizens promise: "I will give my loyalty to the United Kingdom and respect its rights and freedoms. I will uphold its democratic values. I will observe its laws faithfully and fulfil my duties and obligations as a British citizen."',
    memoryHook:
      '🌶️ Spice Hook: Oath = King Charles III; Pledge = Loyalty, Rights, Democracy & Laws!',
  },
  {
    id: 'q-ex05-04',
    examNumber: 5,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt:
      'What is the approximate distance from John O’Groats on the north coast of Scotland to Land’s End in the south-west corner of England?',
    options: [
      'About 300 miles (480 km)',
      'About 550 miles (885 km)',
      'About 870 miles (1,400 km)',
      'About 1,500 miles (2,400 km)',
    ],
    correctIndices: [2],
    explanation:
      'The longest distance on the mainland, from John O’Groats on the north coast of Scotland to Land’s End in the south-west corner of England, is about 870 miles (approximately 1,400 km). Britain is about 300 miles across at its widest point.',
    memoryHook:
      '🌶️ Spice Hook: "8-7-0 from top to toe!" (870 miles tall, 300 miles wide!).',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex05-05',
    examNumber: 5,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt: 'On what date is St George’s Day, the patron saint’s day of England, celebrated?',
    options: ['1 March', '17 March', '23 April', '30 November'],
    correctIndices: [2],
    explanation:
      'St George is the patron saint of England, and St George’s Day is celebrated on 23 April (traditionally also remembered as William Shakespeare’s birthday and death date!).',
    memoryHook:
      '🌶️ Spice Hook: "23 April = St George slays dragons & Shakespeare writes plays!"',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex05-06',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'People in Iron Age Britain made the first coins to be minted in Britain. What was inscribed on some of these coins?',
    options: [
      'Portraits of the Archbishop of Canterbury',
      'Quotes from the Magna Carta in Latin',
      'Drawings of Stonehenge',
      'The names of Iron Age kings',
    ],
    correctIndices: [3],
    explanation:
      'During the Iron Age, people made the first coins to be minted in Britain, some inscribed with the names of Iron Age kings: marking the beginnings of British history.',
    memoryHook:
      '🌶️ Spice Hook: Iron Age bling, first British coins stamped with Iron Age KINGS’ names!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-07',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'boolean',
    prompt: 'Did the Roman Empire ever conquer the whole of Scotland?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No. Although the Romans occupied almost all of Britain after AD 43, areas of what is now Scotland were never conquered by the Romans: which is why Emperor Hadrian built Hadrian’s Wall.',
    memoryHook:
      '🌶️ Spice Hook: Highland fierce! Rome NEVER conquered Scotland!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-08',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'multiple',
    prompt:
      'Alongside the Jutes, which TWO other tribes from northern Europe invaded and settled in Britain after the Romans left in AD 410? (Choose TWO)',
    options: ['The Angles', 'The Picts', 'The Normans', 'The Saxons'],
    correctIndices: [0, 3],
    explanation:
      'After the Roman army left in AD 410, Britain was invaded by tribes from northern Europe: the Jutes, the Angles, and the Saxons. Their languages formed the basis of modern English, and kingdoms were established by about AD 600.',
    memoryHook:
      '🌶️ Spice Hook: It’s literally in the name "Anglo-Saxon", Angles + Saxons (+ Jutes)!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-09',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'In the north of Britain, the threat of Viking attack encouraged people to unite under one king, and the term "Scotland" began to be used. Who was that king?',
    options: [
      'Kenneth MacAlpin',
      'Alfred the Great',
      'Robert the Bruce',
      'Harold Godwinson',
    ],
    correctIndices: [0],
    explanation:
      'In the north, the threat of attack by Vikings encouraged the people to unite under one king, Kenneth MacAlpin, and the term Scotland began to be used to describe that country.',
    memoryHook:
      '🌶️ Spice Hook: "MacAlpin = Making Alba/Scotland one kingdom against the Vikings!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-10',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'multiple',
    prompt:
      'Which TWO huge Welsh castles were built by King Edward I to maintain his power after annexing Wales in 1284? (Choose TWO)',
    options: ['Edinburgh Castle', 'Conwy Castle', 'Caernarfon Castle', 'Windsor Castle'],
    correctIndices: [1, 2],
    explanation:
      'After introducing the Statute of Rhuddlan in 1284, Edward I built huge castles to maintain his power in Wales, including Conwy and Caernarfon, many of which are still standing today.',
    memoryHook:
      '🌶️ Spice Hook: Double-C in North Wales = Conwy & Caernarfon Castles built by Edward I!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-11',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'During the Middle Ages in England, Parliament developed into two Houses. Who sat in the early House of Commons?',
    options: [
      'Great landowners and senior bishops',
      'Knights and wealthy people from towns and cities',
      'Every adult man and woman in England',
      'Judges appointed by the Pope in Rome',
    ],
    correctIndices: [1],
    explanation:
      'In medieval England, the nobility, great landowners, and bishops sat in the House of Lords, while knights (usually smaller landowners) and wealthy people from towns and cities were elected to sit in the House of Commons.',
    memoryHook:
      '🌶️ Spice Hook: Medieval Lords = Big Landowners & Bishops; Medieval Commons = Knights & Town Burghers!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-12',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'By AD 1400, after centuries in which monarchs and nobles spoke Norman French and official documents used Latin, which language became the preferred language of the royal court and Parliament in England?',
    options: ['Gaelic', 'Norman French', 'Latin', 'English'],
    correctIndices: [3],
    explanation:
      'By 1400, Norman French and Anglo-Saxon words had blended into Middle English, and official documents were being written in English, which had become the preferred language of the royal court and Parliament.',
    memoryHook:
      '🌶️ Spice Hook: "2 Become 1!" French + Anglo-Saxon merged, and by 1400 ENGLISH ruled the court!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-13',
    examNumber: 5,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'multiple',
    prompt:
      'In 1455, a civil war called the Wars of the Roses began to decide who should be king of England. Which TWO royal houses fought against each other? (Choose TWO)',
    options: [
      'The House of Lancaster',
      'The House of Stuart',
      'The House of Windsor',
      'The House of York',
    ],
    correctIndices: [0, 3],
    explanation:
      'The Wars of the Roses (1455–1485) was fought between the supporters of two families: the House of Lancaster (symbolised by a red rose) and the House of York (symbolised by a white rose).',
    memoryHook:
      '🌶️ Spice Hook: "Lancaster Red vs York White, 30 years of Rose-war fight!" (Remember: L-R = Lancaster Red!).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex05-14',
    examNumber: 5,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'boolean',
    prompt: 'Is there an official established state church in Wales or Northern Ireland?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No. There is no established church in Wales or Northern Ireland (unlike England with the Church of England, and Scotland with its national Presbyterian Church of Scotland).',
    memoryHook:
      '🌶️ Spice Hook: Wales & Northern Ireland are solo stars, ZERO established state church!',
  },
  {
    id: 'q-ex05-15',
    examNumber: 5,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'multiple',
    prompt:
      'Alongside England, Scotland, Wales, and Ireland, which TWO other European countries compete in the annual Six Nations Rugby Championship? (Choose TWO)',
    options: ['Spain', 'France', 'Germany', 'Italy'],
    correctIndices: [1, 3],
    explanation:
      'The most famous rugby union competition is the Six Nations Championship between England, Ireland, Scotland, Wales, France, and Italy.',
    memoryHook:
      '🌶️ Spice Hook: Home Nations (4) + Croissants & Pasta (France + Italy) = Six Nations Rugby!',
  },
  {
    id: 'q-ex05-16',
    examNumber: 5,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Which prestigious golf tournament hosted in the UK is the only "Major" championship held outside the United States?',
    options: [
      'The Masters',
      'The Ryder Cup',
      'The Open Championship',
      'The PGA Championship',
    ],
    correctIndices: [2],
    explanation:
      'The Open Championship is the only golf "Major" tournament held outside the United States and is hosted by a different British golf course every year.',
    memoryHook:
      '🌶️ Spice Hook: Only ONE golf Major lives outside the USA, Britain’s "The Open Championship"!',
  },
  {
    id: 'q-ex05-17',
    examNumber: 5,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO of the following famous stage plays were written by William Shakespeare? (Choose TWO)',
    options: [
      'A Midsummer Night’s Dream',
      'The Mousetrap',
      'Macbeth',
      'Pygmalion',
    ],
    correctIndices: [0, 2],
    explanation:
      'Shakespeare’s most famous plays include A Midsummer Night’s Dream, Hamlet, Macbeth, and Romeo and Juliet (whereas Agatha Christie wrote The Mousetrap and George Bernard Shaw wrote Pygmalion).',
    memoryHook:
      '🌶️ Spice Hook: Fairies & Scottish Kings, Midsummer Night’s Dream + Macbeth = Pure Shakespeare!',
  },
  {
    id: 'q-ex05-18',
    examNumber: 5,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which Scottish poet, known in Scotland as "The Bard", wrote Auld Lang Syne and is celebrated with haggis and poetry on 25 January?',
    options: ['John Barbour', 'Thomas Hardy', 'Robert Louis Stevenson', 'Robert Burns'],
    correctIndices: [3],
    explanation:
      'Robert Burns (1759–1796), known in Scotland as "The Bard", wrote in Scots and English; his best-known work is Auld Lang Syne (sung at New Year), and Scots celebrate Burns Night every 25 January.',
    memoryHook:
      '🌶️ Spice Hook: Raise a glass on 25 Jan (Burns Night), Robert Burns wrote Auld Lang Syne!',
  },
  {
    id: 'q-ex05-19',
    examNumber: 5,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt:
      'After a UK General Election, whom does King Charles III invite to become Prime Minister and form His Majesty’s Government?',
    options: [
      'The MP who won the largest personal vote in a single town',
      'The Speaker of the House of Commons',
      'The leader of the political party with a majority of MPs in the House of Commons',
      'The longest-serving peer in the House of Lords',
    ],
    correctIndices: [2],
    explanation:
      'The Monarch appoints as Prime Minister the leader of the political party that wins a majority of seats in the House of Commons at a General Election (or can command a majority through a coalition).',
    memoryHook:
      '🌶️ Spice Hook: Majority of the 650 MPs → Party Leader meets the King at Buckingham Palace to become PM!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex05-20',
    examNumber: 5,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'What does each of the 650 MPs in the House of Commons represent?',
    options: [
      'One parliamentary constituency',
      'An entire historic county',
      'Only the people who voted for their political party',
      'A trade union or business guild',
    ],
    correctIndices: [0],
    explanation:
      'Each MP represents a parliamentary constituency (a small geographical area of the country) and has a duty to represent EVERYONE in their constituency: whether they voted for that MP or not!',
    memoryHook:
      '🌶️ Spice Hook: 650 MPs = 650 constituencies, and your MP represents ALL residents in your postcode!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex05-21',
    examNumber: 5,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'multiple',
    prompt:
      'Members of the House of Lords (known as peers) are not elected by the public. Which TWO of the following groups sit in the House of Lords? (Choose TWO)',
    options: [
      'Life peers appointed by the Monarch on the Prime Minister’s advice',
      'Local Police and Crime Commissioners',
      '26 senior bishops of the Church of England',
      'Members of the Scottish Youth Parliament',
    ],
    correctIndices: [0, 2],
    explanation:
      'The House of Lords comprises life peers (appointed for their lifetime for achievements and expertise), 26 senior bishops of the Church of England, and a small number of hereditary peers.',
    memoryHook:
      '🌶️ Spice Hook: Red benches of the Lords = Life Peers + 26 C of E Bishops (+ remaining hereditary peers)!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex05-22',
    examNumber: 5,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'What is the role of party "Whips" in the UK Parliament?',
    options: [
      'To guard the entrances to the Palace of Westminster',
      'To write the official Hansard transcripts of speeches',
      'To maintain party discipline and ensure MPs attend and vote as their party leadership wishes',
      'To count ballot papers at local polling stations',
    ],
    correctIndices: [2],
    explanation:
      'Both the government and opposition parties appoint MPs and peers called "Whips" to maintain discipline within their party and ensure members attend key parliamentary votes.',
    memoryHook:
      '🌶️ Spice Hook: "Whip the party into line!", Whips make sure MPs show up and vote on cue!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex05-23',
    examNumber: 5,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'Who appoints the "Shadow Cabinet" and what is its purpose?',
    options: [
      'The Monarch appoints it to manage Royal Palaces',
      'The Leader of the Opposition appoints senior opposition MPs to challenge government ministers and put forward alternative policies',
      'The Speaker appoints it to chair select committees secretly',
      'The Supreme Court appoints it to review criminal sentences',
    ],
    correctIndices: [1],
    explanation:
      'The second-largest party in the House of Commons is called the Opposition. The Leader of the Opposition leads the party, points out what they see as the government’s failures, and appoints senior opposition MPs to the "Shadow Cabinet".',
    memoryHook:
      '🌶️ Spice Hook: Shadow Cabinet "shadows" the real Cabinet, ready to step into power after the next election!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex05-24',
    examNumber: 5,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Which TWO of the following are Criminal offences in the UK rather than Civil disputes? (Choose TWO)',
    options: [
      'Carrying a weapon in public',
      'A disagreement over money owed to a builder',
      'Faulty goods bought online from a shop',
      'Selling tobacco to anyone under the age of 18',
    ],
    correctIndices: [0, 3],
    explanation:
      'Carrying a weapon, selling tobacco or alcohol to someone under 18, smoking in enclosed public places, and drinking and driving are criminal offences. Debt and faulty consumer goods are civil law matters.',
    memoryHook:
      '🌶️ Spice Hook: Weapons & underage tobacco sales = Criminal Court; builder bills & faulty toasters = Civil Court!',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 6 (q-ex06-01 .. q-ex06-24)
  // ============================================================================
  {
    id: 'q-ex06-01',
    examNumber: 6,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'boolean',
    prompt:
      'True or False: Under UK law, women and men have equal rights to work, own property, marry, divorce, and protection from unfair discrimination.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! UK law protects equal rights for men and women and prohibits unfair discrimination based on sex, age, race, religion, disability, marital status, or sexual orientation.',
    memoryHook:
      '🌶️ Spice Hook: 100% Girl Power & Equal Rights, equality under the law is a bedrock of modern Britain!',
  },
  {
    id: 'q-ex06-02',
    examNumber: 6,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'multiple',
    prompt:
      'If you apply to settle in either of these TWO Crown Dependencies, your Life in the UK Test will include local island-specific questions alongside UK questions. Which TWO are they? (Choose TWO)',
    options: [
      'The Channel Islands',
      'The Isle of Wight',
      'Anglesey',
      'The Isle of Man',
    ],
    correctIndices: [0, 3],
    explanation:
      'In the Channel Islands (Jersey and Guernsey) and the Isle of Man, local questions supplement the UK Life in the UK Test. (Note: the Isle of Wight and Anglesey are ordinary parts of England and Wales!).',
    memoryHook:
      '🌶️ Spice Hook: Don’t confuse Isle of Man with Isle of Wight! Channel Islands + Isle of Man = Crown Dependencies!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex06-03',
    examNumber: 6,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'multiple',
    prompt: 'Which TWO of the following are major cities in Scotland? (Choose TWO)',
    options: ['Swansea', 'Glasgow', 'Bristol', 'Aberdeen'],
    correctIndices: [1, 3],
    explanation:
      'Major cities in Scotland include Edinburgh (the capital), Glasgow, Aberdeen, and Dundee. Swansea is in Wales, and Bristol is in south-west England.',
    memoryHook:
      '🌶️ Spice Hook: "Edin, Glas, Aber, Dun", Edinburgh, Glasgow, Aberdeen, Dundee are Scotland’s fab four!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex06-04',
    examNumber: 6,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt:
      'Which cross on the Union Flag represents St Andrew, the patron saint of Scotland?',
    options: [
      'A diagonal white cross on a blue ground',
      'An upright red cross on a white ground',
      'A diagonal red cross on a white ground',
      'A yellow cross on a black ground',
    ],
    correctIndices: [0],
    explanation:
      'The Saltire: the cross of St Andrew, patron saint of Scotland, is a diagonal white cross on a blue ground. (St George is an upright red cross on white; St Patrick is a diagonal red cross on white).',
    memoryHook:
      '🌶️ Spice Hook: Picture snowy Scottish mountains against a blue sky → White diagonal X on Blue = St Andrew!',
    visualId: 'union-jack',
  },
  {
    id: 'q-ex06-05',
    examNumber: 6,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt:
      'Which plant is the national emblem of Northern Ireland, traditionally worn on St Patrick’s Day (17 March)?',
    options: ['The Leek', 'The Thistle', 'The Tudor Rose', 'The Shamrock'],
    correctIndices: [3],
    explanation:
      'The Shamrock (a three-leaved plant) is the national flower/emblem associated with Northern Ireland and Ireland, worn on St Patrick’s Day on 17 March.',
    memoryHook:
      '🌶️ Spice Hook: Three green leaves on 17 March = Shamrock for St Patrick!',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex06-06',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt:
      'Around 6,000 years ago, the first farmers arrived in Britain, building houses, tombs, and monuments. Where did the ancestors of these first farmers probably come from?',
    options: [
      'South-east Europe',
      'Northern Scandinavia',
      'North America',
      'Southern Africa',
    ],
    correctIndices: [0],
    explanation:
      'The first farmers arrived in Britain around 6,000 years ago. The ancestors of these first farmers probably came from south-east Europe, bringing farming and Neolithic monument-building to Britain.',
    memoryHook:
      '🌶️ Spice Hook: "6,000 years ago, sunny South-East Europe brought seeds to sow!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-07',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    type: 'single',
    prompt: 'When did the first Christian communities begin to appear in Britain?',
    options: [
      'During the Bronze Age (around 2000 BC)',
      'During Julius Caesar’s invasion in 55 BC',
      'During the 3rd and 4th centuries AD under Roman rule',
      'Only after the Norman Conquest in AD 1066',
    ],
    correctIndices: [2],
    explanation:
      'It was during the 3rd and 4th centuries AD: while Britain was part of the Roman Empire, that the first Christian communities began to appear in Britain.',
    memoryHook:
      '🌶️ Spice Hook: Before Rome left in 410, first British Christians appeared in the 3rd & 4th centuries AD!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-08',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'Which famous Anglo-Saxon poem tells of its hero’s battles against monsters and is still translated into modern English today?',
    options: ['The Canterbury Tales', 'The Bruce', 'Paradise Lost', 'Beowulf'],
    correctIndices: [3],
    explanation:
      'The famous Anglo-Saxon poem Beowulf tells of its hero’s battles against monsters (such as Grendel) and is still translated into modern English.',
    memoryHook:
      '🌶️ Spice Hook: Anglo-Saxon monster-slayer = BEOWULF!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-09',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    type: 'single',
    prompt:
      'After the Norman Conquest of 1066, what language did the new ruling class speak, influencing the development of the English language?',
    options: ['Norman French', 'High German', 'Classical Greek', 'Old Norse'],
    correctIndices: [0],
    explanation:
      'Following 1066, Normandy’s ruling noblemen spoke Norman French while peasants continued speaking Anglo-Saxon. Over time the two languages combined into Middle and Modern English (for instance, "park", "beauty", and "cow/beef").',
    memoryHook:
      '🌶️ Spice Hook: William came from Normandy in France → ruling nobles spoke Norman French!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-10',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'In medieval Scotland, the Parliament had three Houses known as the "Estates". What were those three Estates?',
    options: [
      'The knights, the farmers, and the sailors',
      'The lords, the clergy, and the towns',
      'The King, the Cabinet, and the Supreme Court',
      'The Highland clans, the Vikings, and the Normans',
    ],
    correctIndices: [1],
    explanation:
      'While England’s Parliament split into Lords and Commons, in medieval Scotland the Parliament had three Houses called Estates: the lords, the clergy, and the towns.',
    memoryHook:
      '🌶️ Spice Hook: Scottish 3 Estates = "Nobles pray in town" → Lords, Clergy, Towns!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-11',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'multiple',
    prompt:
      'Which TWO major social changes occurred in Britain following the Black Death of 1348? (Choose TWO)',
    options: [
      'Severe labour shortages allowed peasants to demand higher wages',
      'The feudal system became much stricter and wages fell to zero',
      'New social classes appeared, including owners of large areas of land called the gentry',
      'Everyone abandoned towns permanently and returned to hunter-gathering',
    ],
    correctIndices: [0, 2],
    explanation:
      'After one third of the population died in 1348, the smaller population meant less need to grow cereal crops and severe labour shortages: peasants could demand higher wages, feudalism declined, people moved to towns, and new classes like the gentry emerged.',
    memoryHook:
      '🌶️ Spice Hook: Fewer workers after 1348 = Higher peasant wages + Rise of the Gentry!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-12',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'During the Middle Ages in Ireland, what was the name of the area around Dublin that was directly controlled by the English king?',
    options: ['The Danelaw', 'The Marches', 'The Pale', 'Wessex'],
    correctIndices: [2],
    explanation:
      'In the Middle Ages, the English first went to Ireland as troops to help the Irish king and remained to build settlements; by 1200, the English ruled an area around Dublin known as the Pale (giving us the phrase "beyond the pale"!).',
    memoryHook:
      '🌶️ Spice Hook: Ever said "that’s beyond the pale"? Medieval English rule around Dublin = The Pale!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex06-13',
    examNumber: 6,
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    type: 'single',
    prompt:
      'How was the red-and-white Tudor rose symbol created after the Battle of Bosworth Field in 1485?',
    options: [
      'King Henry VII of Lancaster married King Richard III’s niece, Elizabeth of York, uniting the two families',
      'Geoffrey Chaucer painted it on the cover of The Canterbury Tales',
      'Edward I combined the Welsh leek with the Scottish thistle',
      'The Pope sent a red-and-white banner to Canterbury',
    ],
    correctIndices: [0],
    explanation:
      'After defeating Richard III in 1485, Henry Tudor (House of Lancaster: red rose) became King Henry VII and married Elizabeth of York (House of York: white rose), uniting the two families under the red-and-white Tudor rose.',
    memoryHook:
      '🌶️ Spice Hook: Ultimate "2 Become 1"! Lancaster Red + York White = Tudor Rose wedding of 1485!',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex06-14',
    examNumber: 6,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'boolean',
    prompt:
      'True or False: Although the UK is historically a Christian country, everyone has the legal right to choose their own religion or to choose not to practise any religion.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True. While the UK is historically Christian, people of many faiths (Muslim, Hindu, Sikh, Jewish, Buddhist, and others) and non-religious people live freely in the UK, and everyone has the legal right to follow any religion or none.',
    memoryHook:
      '🌶️ Spice Hook: Freedom of belief (or no belief!) is protected for everyone in Britain!',
  },
  {
    id: 'q-ex06-15',
    examNumber: 6,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Where did the game of rugby originate in England in the early 19th century?',
    options: ['Eton College', 'Harrow School', 'Rugby School', 'St Andrews'],
    correctIndices: [2],
    explanation:
      'Rugby originated in England in the early 19th century at Rugby School (in Warwickshire) and is very popular throughout the UK today in two codes with different rules: Rugby Union and Rugby League.',
    memoryHook:
      '🌶️ Spice Hook: Easiest giveaway ever, Rugby started at RUGBY School!',
  },
  {
    id: 'q-ex06-16',
    examNumber: 6,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Which famous five-day horse-racing event in Berkshire is attended by King Charles III and members of the Royal Family?',
    options: [
      'The Grand National',
      'Cowes Week',
      'Silverstone Grand Prix',
      'Royal Ascot',
    ],
    correctIndices: [3],
    explanation:
      'Royal Ascot is a prestigious five-day horse-racing meeting in Berkshire attended by members of the Royal Family, famous for both top-class flat racing and spectacular hats.',
    memoryHook:
      '🌶️ Spice Hook: Posh hats + Royal carriages in Berkshire = ROYAL ASCOT!',
  },
  {
    id: 'q-ex06-17',
    examNumber: 6,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt:
      'Who chairs the General Assembly of the Church of Scotland and serves as its leader for one year only?',
    options: [
      'The Archbishop of York',
      'The Moderator of the General Assembly',
      'The First Minister of Scotland',
      'The Sovereign of the United Kingdom',
    ],
    correctIndices: [1],
    explanation:
      'The chairperson of the General Assembly of the Church of Scotland is the Moderator, who is appointed for one year only and often speaks on behalf of that Church.',
    memoryHook:
      '🌶️ Spice Hook: Scotland’s Kirk = Moderator for 1 year (never a Monarch or Archbishop)!',
  },
  {
    id: 'q-ex06-18',
    examNumber: 6,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Several medieval British cathedrals: such as York Minster, are famous for intricate windows made with which craft to tell stories about the Bible and Christian saints?',
    options: [
      'Stained glass',
      'Bronze sculpture',
      'Pop art silkscreens',
      'Watercolour frescoes',
    ],
    correctIndices: [0],
    explanation:
      'During the Middle Ages, cathedrals such as Lincoln and York Minster were built, and several had windows of stained glass telling stories about the Bible and Christian saints: the glass in York Minster is a famous example.',
    memoryHook:
      '🌶️ Spice Hook: Medieval York Minster glows with colourful Biblical STAINED GLASS!',
  },
  {
    id: 'q-ex06-19',
    examNumber: 6,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'boolean',
    prompt:
      'As a constitutional Monarch, does King Charles III campaign for political parties or take partisan sides in elections?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No. King Charles III has important ceremonial and constitutional roles, represents the UK internationally, and serves as a focus for national identity and unity, remaining strictly politically neutral above party politics.',
    memoryHook:
      '🌶️ Spice Hook: Crown stays above the fray, the Monarch NEVER campaigns in party politics!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex06-20',
    examNumber: 6,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt:
      'How often does the Prime Minister normally meet privately with King Charles III to discuss government business while Parliament is in session?',
    options: ['Every morning', 'Once a week', 'Once every six months', 'Only after a General Election'],
    correctIndices: [1],
    explanation:
      'The Monarch has regular meetings with the Prime Minister: normally once a week, and can advise, warn, and encourage the government in strict confidence while all policy decisions are made by the PM and Cabinet.',
    memoryHook:
      '🌶️ Spice Hook: Weekly tea at the Palace! PM + King Charles III meet ONCE A WEEK!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex06-21',
    examNumber: 6,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'What is the official London residence and office of the UK Prime Minister?',
    options: [
      'Buckingham Palace',
      'Clarence House',
      'Windsor Castle',
      '10 Downing Street',
    ],
    correctIndices: [3],
    explanation:
      'The official London home and office of the Prime Minister is 10 Downing Street in Westminster (near the Houses of Parliament), while Chequers is the PM’s country house.',
    memoryHook:
      '🌶️ Spice Hook: Famous shiny black door #10 = 10 Downing Street!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex06-22',
    examNumber: 6,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'To be able to vote in a parliamentary or local election in the UK, what must your name be on?',
    options: [
      'The Domesday Book',
      'The electoral register',
      'Hansard',
      'A jury summons list only',
    ],
    correctIndices: [1],
    explanation:
      'To be able to vote in a parliamentary, devolved, or local election, you must have your name on the electoral register (maintained by your local council electoral registration office and updated every autumn).',
    memoryHook:
      '🌶️ Spice Hook: "No register, no ballot!", Get on the Electoral Register to make your voice heard!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex06-23',
    examNumber: 6,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'boolean',
    prompt:
      'In the UK, does your employer, spouse, or any official have the legal right to force you to reveal how you voted in an election?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No! Voting in the UK is strictly by secret ballot in a private polling booth; no one has the right to know or force you to say how you voted, and you must cast your own vote personally (unless you have arranged a postal or proxy vote).',
    memoryHook:
      '🌶️ Spice Hook: Behind the curtain, your X is your secret, UK elections = 100% Secret Ballot!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex06-24',
    examNumber: 6,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt: 'What is the primary purpose of Civil Law in the United Kingdom?',
    options: [
      'To prosecute murder, armed robbery, and treason on behalf of the Crown',
      'To command police patrols at football matches',
      'To settle disputes between individuals or groups, such as housing, consumer rights, debt, or family matters',
      'To elect Members of Parliament to Westminster',
    ],
    correctIndices: [2],
    explanation:
      'Civil law is used to settle disputes between individuals or groups: covering housing law, consumer rights, employment law, family law, and debt claims.',
    memoryHook:
      '🌶️ Spice Hook: Keep it civil! Disputes between people or companies = Civil Law!',
    visualId: 'parliament-courts',
  },
];
