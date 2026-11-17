/**
 * Built-in SM-2 Flashcard Deck: Chapter 3 — A Long and Illustrious History
 * Atomic, high-yield SM-2 flashcards covering all 7 historical subtopics from the Stone Age to King Charles III.
 */

import type { Flashcard } from '../../types/domain';

export const FLASHCARDS_CH3: readonly Flashcard[] = [
  // ===========================================================================
  // 1. EARLY BRITAIN & THE ROMANS (ch3-early-roman)
  // ===========================================================================
  {
    id: 'fc-ch3-001',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'Who were the earliest inhabitants of Britain, and roughly when did Britain become permanently separated from mainland Europe by the Channel?',
    back: 'The first people in Britain were hunter-gatherers in the Stone Age; Britain only became permanently separated from the continent by the Channel about 10,000 years ago.',
    memoryHook:
      '🌊 "10,000 years ago = Goodbye land bridge, hello English Channel!"',
  },
  {
    id: 'fc-ch3-002',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    front: 'When did the first farmers arrive in Britain, and where did their ancestors probably come from?',
    back: 'Around 6,000 years ago, with ancestors originating from south-east Europe — they built houses, tombs, and monuments on the land.',
    memoryHook:
      '🌾 "10k Channel, 6k Crops!" — 6,000 years ago, south-east European farmers planted roots in Britain.',
  },
  {
    id: 'fc-ch3-003',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'What is Stonehenge, and in which English county does it stand?',
    back: 'A famous Stone Age (Neolithic) monument in Wiltshire that was probably a special gathering place for seasonal ceremonies.',
    memoryHook:
      '🪨 "Wiltshire’s Wonder!" — Stonehenge = Stone Age seasonal ceremony circle in Wiltshire.',
  },
  {
    id: 'fc-ch3-004',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'What is Skara Brae, and where is it located?',
    back: 'Located on Orkney, off the north coast of Scotland, Skara Brae is the best-preserved prehistoric village in northern Europe.',
    memoryHook:
      '🏠🏴󠁧󠁢󠁳󠁣󠁴󠁿 "Skara Brae = Scotland’s Stone Age Street!" — Orkney’s best-preserved prehistoric village.',
  },
  {
    id: 'fc-ch3-005',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    front: 'When did the Bronze Age begin in Britain, and how did Bronze Age people bury their dead?',
    back: 'Around 4,000 years ago, when people learned to make bronze; they lived in roundhouses, crafted bronze tools/weapons and gold ornaments, and buried their dead in tombs called "round barrows".',
    memoryHook:
      '🥉 "Bronze = Barrows!" — 4,000 years ago, roundhouses for living, round barrows for tombs!',
  },
  {
    id: 'fc-ch3-006',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    front: 'What characterised Iron Age Britain, and what is Maiden Castle?',
    back: 'People made iron weapons/tools, spoke a language of the Celtic family, minted the first coins in Britain (inscribed with the names of Iron Age kings!), and defended impressive hill forts such as Maiden Castle in Dorset.',
    memoryHook:
      '🛡️🪙 Iron Age = Celtic tongues + first British king coins + Maiden Castle hill fort in Dorset!',
  },
  {
    id: 'fc-ch3-007',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'When did Julius Caesar lead a Roman invasion of Britain, and did it succeed?',
    back: 'Julius Caesar led a Roman invasion in 55 BC (and returned briefly in 54 BC), which was unsuccessful — Britain remained separate from the Roman Empire for nearly 100 years.',
    memoryHook:
      '🏛️❌ "Caesar tried in 55 BC — came, saw, and went back across the sea!"',
  },
  {
    id: 'fc-ch3-008',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'Which Roman Emperor led the successful invasion of Britain in AD 43?',
    back: 'Emperor Claudius led the Roman army in a new invasion in AD 43, conquering almost all of Britain despite resistance from some British tribes.',
    memoryHook:
      '🦅✅ "Claudius Clapped in AD 43!" (55 BC Caesar failed → AD 43 Claudius conquered!).',
  },
  {
    id: 'fc-ch3-009',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    front: 'Who was Boudicca, which tribe did she lead against the Romans, and where is her famous statue today?',
    back: 'Boudicca was Queen of the Iceni tribe in what is now eastern England, one of the tribal leaders who fought fiercely against the Romans; her bronze statue stands on Westminster Bridge in London.',
    memoryHook:
      '🐎⚔️ Original Girl Power! Boudicca = Queen of the Iceni, charging on Westminster Bridge!',
  },
  {
    id: 'fc-ch3-010',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'Why did Emperor Hadrian build Hadrian’s Wall across northern England, and what are two famous Roman forts along it?',
    back: 'Areas of modern Scotland were never conquered by the Romans, so Emperor Hadrian built a wall in the north of England to keep out the Picts (ancestors of the Scottish people). Famous forts on the UNESCO World Heritage wall include Housesteads and Vindolanda.',
    memoryHook:
      '🧱 "Hadrian’s Wall held back the Picts!" — Forts = Housesteads & Vindolanda!',
  },
  {
    id: 'fc-ch3-011',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    visualId: 'history-timeline',
    front: 'How long did the Romans stay in Britain, when did the Roman army leave, and what did they leave behind?',
    back: 'The Romans remained for nearly 400 years until the Roman army left in AD 410 to defend other parts of the Roman Empire, never to return. They built roads, public buildings, a structure of law, introduced new plants/animals, and saw the first Christian communities appear in the 3rd and 4th centuries AD.',
    memoryHook:
      '🛣️ "AD 43 in, AD 410 gone!" — 400 years of straight Roman roads, laws & early 3rd/4th-century Christianity.',
  },

  // ===========================================================================
  // 2. ANGLO-SAXONS, VIKINGS & THE NORMAN CONQUEST (ch3-anglo-norman)
  // ===========================================================================
  {
    id: 'fc-ch3-012',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    visualId: 'history-timeline',
    front: 'Which three northern European tribes invaded Britain after the Romans left in AD 410, and which parts remained free of their rule?',
    back: 'The Jutes, the Angles, and the Saxons (whose languages are the basis of modern English). By about AD 600 Anglo-Saxon kingdoms were established across Britain, while parts of the west — including much of Wales and Scotland — remained free of Anglo-Saxon rule.',
    memoryHook:
      '⚔️ "Jutes, Angles & Saxons by AD 600!" — Wales & Scotland stayed Celtic in the west/north.',
  },
  {
    id: 'fc-ch3-013',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    front: 'What famous Anglo-Saxon archaeological treasure was discovered at Sutton Hoo in modern Suffolk?',
    back: 'The burial place of one of the Anglo-Saxon kings, buried with treasure and armour (including an iconic ornate helmet) all placed inside a ship covered by a mound of earth.',
    memoryHook:
      '⛵🪖 "Sutton Hoo in Suffolk = King’s Ship Burial & Helmet!"',
  },
  {
    id: 'fc-ch3-014',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    front: 'Who were St Patrick, St Columba, and St Augustine in spreading Christianity across Britain and Ireland?',
    back: '• St Patrick became patron saint of Ireland.\n• St Columba founded a monastery on the island of Iona, off the coast of Scotland.\n• St Augustine led missionaries from Rome to southern England and became the FIRST Archbishop of Canterbury!',
    memoryHook:
      '✝️ "Patrick = Ireland; Columba = Iona (Scotland); Augustine = Archbishop #1 at Canterbury!"',
  },
  {
    id: 'fc-ch3-015',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    visualId: 'history-timeline',
    front: 'Where did the Vikings come from, when did they first raid Britain, and what was the "Danelaw"?',
    back: 'The Vikings came from Denmark and Norway. They first visited Britain in AD 789 to raid coastal towns and take away goods and slaves, later staying to form their own communities in the east and north of England in an area known as the Danelaw.',
    memoryHook:
      '🛶 "7-8-9, Vikings cross the brine!" — Settled in the East & North = The Danelaw!',
  },
  {
    id: 'fc-ch3-016',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    visualId: 'history-timeline',
    front: 'Which ruler united the Anglo-Saxon kingdoms of England and defeated the Vikings?',
    back: 'King Alfred the Great — after his victory, many Viking invaders stayed peacefully in the Danelaw, mixed with local communities, and converted to Christianity.',
    memoryHook:
      '👑🛡️ Only ONE English king earned "the Great" — Alfred the Great united the Saxons and beat the Vikings!',
  },
  {
    id: 'fc-ch3-017',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    front: 'Which king united the peoples of Scotland under one ruler as Viking attacks encouraged unity in the north?',
    back: 'Kenneth MacAlpin — around the same era the term "Scotland" began to be used to describe that country.',
    memoryHook:
      '🏴󠁧󠁢󠁳󠁣󠁴󠁿👑 "Alfred united England; Kenneth MacAlpin united Scotland!"',
  },
  {
    id: 'fc-ch3-018',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    front: 'Who was Cnut (also called Canute)?',
    back: 'The first of a short line of Danish kings who briefly ruled England during the Anglo-Saxon era.',
    memoryHook:
      '🌊🇩🇰 Danish King Cnut briefly interrupted the Anglo-Saxon crown!',
  },
  {
    id: 'fc-ch3-019',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    visualId: 'history-timeline',
    front: 'What happened in 1066 at the Battle of Hastings, and why is 1066 unique in English history?',
    back: 'William, the Duke of Normandy (in northern France), defeated Harold, the Saxon king of England, who was killed in the battle. William became King of England ("William the Conqueror"), and the Norman Conquest of 1066 was the LAST successful foreign invasion of England!',
    memoryHook:
      '🏹👑 "1066 Hastings = William beat Harold — the LAST successful foreign invasion of England ever!"',
  },
  {
    id: 'fc-ch3-020',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    front: 'What is the Bayeux Tapestry?',
    back: 'A famous piece of embroidered linen nearly 70 metres (230 feet) long commemorating the 1066 Battle of Hastings, which can still be seen in France today.',
    memoryHook:
      '🧵 "70 metres of 1066 comic-strip embroidery!" = The Bayeux Tapestry.',
  },
  {
    id: 'fc-ch3-021',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    visualId: 'history-timeline',
    front: 'What was the Domesday Book, and who ordered it to be written?',
    back: 'Ordered by William the Conqueror, the Domesday Book listed all the towns and villages in England, who lived there, who owned the land, and what animals they owned — giving a picture of society just after the Norman Conquest that still exists today.',
    memoryHook:
      '📖🐄 William’s ultimate tax spreadsheet: every town, lord, villager & cow went into the Domesday Book!',
  },
  {
    id: 'fc-ch3-022',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    front: 'How did the Norman Conquest change England’s ruling class, language, and neighbouring nations?',
    back: 'Norman French became the language of the new ruling class (adding French words to the Anglo-Saxon language); the Normans initially conquered Wales (though the Welsh gradually won territory back) and fought on the Scottish border without invading Scotland.',
    memoryHook:
      '🥖🇬🇧 Anglo-Saxon "cow/pig" met Norman French "beef/pork" to cook up modern English!',
  },

  // ===========================================================================
  // 3. THE MIDDLE AGES (ch3-middle-ages)
  // ===========================================================================
  {
    id: 'fc-ch3-023',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'What happened in 1215 involving King John, and what core principle did the Magna Carta establish?',
    back: 'In 1215, King John was forced by his noblemen to agree to a number of demands in the Magna Carta ("Charter of Liberties") — establishing the idea that even the king is subject to the law, protecting nobility’s rights, and restricting the king’s power to collect taxes or make/change laws without consulting nobles.',
    memoryHook:
      '📜⚖️ "At 12:15 lunch (1215), King John learned NOBODY is above the law — Magna Carta!"',
  },
  {
    id: 'fc-ch3-024',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    front: 'How did the medieval English Parliament divide into two Houses, and how was the medieval Scottish Parliament structured?',
    back: '• In England: House of Lords (nobility, great landowners, and bishops) and House of Commons (knights who were smaller landowners, and wealthy people from towns and cities).\n• In Scotland: Parliament had THREE Houses called "Estates" — the lords, the clergy, and the towns.',
    memoryHook:
      '🏛️ Medieval England = 2 Houses (Lords + Commons); Medieval Scotland = 3 Estates (Lords + Clergy + Towns)!',
  },
  {
    id: 'fc-ch3-025',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    front: 'How did the development of English law differ from Scottish law during the Middle Ages?',
    back: 'In England, judges developed "common law" through a process of precedence (following previous decisions) and tradition. In Scotland, the legal system developed slightly differently and laws were "codified" (written down).',
    memoryHook:
      '⚖️ England = Common Law (precedent); Scotland = Codified Law (written down)!',
  },
  {
    id: 'fc-ch3-026',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'What did the Statute of Rhuddlan do in 1284, and which famous Welsh castles were built to maintain royal power?',
    back: 'In 1284, King Edward I of England introduced the Statute of Rhuddlan, which annexed Wales to the Crown of England. Huge castles — including Conwy and Caernarfon — were built to maintain this power (by the middle of the 15th century the last Welsh rebellions had been defeated).',
    memoryHook:
      '🏰🏴󠁧󠁢󠁷󠁬󠁳󠁿 "1284 Rhuddlan = Edward I annexed Wales & built giant Conwy + Caernarfon castles!"',
  },
  {
    id: 'fc-ch3-027',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'What happened in 1314 at the Battle of Bannockburn?',
    back: 'The Scottish, led by King Robert the Bruce, defeated the English army of Edward II at the Battle of Bannockburn in 1314 — ensuring Scotland remained unconquered by the English.',
    memoryHook:
      '🗡️🏴󠁧󠁢󠁳󠁣󠁴󠁿 "1314 Bannockburn = Bruce Beat Britain & kept Scotland independent!"',
  },
  {
    id: 'fc-ch3-028',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    front: 'What was "the Pale" in medieval Ireland, and what foreign wars did English kings fight abroad in the Middle Ages?',
    back: 'In the Middle Ages the English ruled an area around Dublin known as "the Pale" (having first gone to help the Irish king of Leinster in 1200, while English lords ruled elsewhere in Ireland). Abroad, medieval knights fought in the Crusades for Christianity in the Holy Land and in the Hundred Years War with France.',
    memoryHook:
      '☘️ "Beyond the Pale!" comes from the medieval English-ruled zone around Dublin!',
  },
  {
    id: 'fc-ch3-029',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'When did the Black Death strike Britain, what fraction of the population died, and how did it transform medieval society?',
    back: 'In 1348, the Black Death (a form of plague) killed ONE THIRD of the population in England and similar proportions in Scotland and Wales. Resulting labour shortages meant peasants could demand higher wages, weakening feudalism ("serfdom"), creating new social classes like the "gentry" (landowners), and drawing people into towns.',
    memoryHook:
      '🐀💀 "1348 = 1/3 met their fate!" — Fewer workers meant higher peasant pay, crumbling feudalism & rising gentry!',
  },
  {
    id: 'fc-ch3-030',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'How long did the Hundred Years War actually last, and who won the famous Battle of Agincourt in 1415?',
    back: 'The Hundred Years War with France actually lasted 116 years! One of its most famous battles was the Battle of Agincourt in 1415, where King Henry V’s vastly outnumbered English army defeated the French (the English mostly left France in the 1450s).',
    memoryHook:
      '🏹👑 "Hundred Years = 116 in disguise! Agincourt 1415 = Henry V (1+4 = 5!) beat giant odds!"',
  },
  {
    id: 'fc-ch3-031',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    front: 'By AD 1400, how had language changed in England, and what did Geoffrey Chaucer and John Barbour write?',
    back: 'By 1400, Norman French and Anglo-Saxon had merged into the English language used for official documents and the royal court. Geoffrey Chaucer wrote The Canterbury Tales (poems about pilgrims travelling to Canterbury), while in Scotland John Barbour wrote The Bruce (in Scots) about the Battle of Bannockburn.',
    memoryHook:
      '📖 Chaucer = Canterbury Tales (English pilgrims); Barbour = The Bruce (Scots Bannockburn epic)!',
  },
  {
    id: 'fc-ch3-032',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    front: 'Who was William Caxton, and which famous poems were among the first books he printed?',
    back: 'William Caxton was the first person in England to print books using a printing press — and Geoffrey Chaucer’s Canterbury Tales was one of the first books he printed!',
    memoryHook:
      '🖨️ "Caxton = Clack-clack First English Printing Press (+ printed Chaucer)!"',
  },
  {
    id: 'fc-ch3-033',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    front: 'Which medieval castles remain in royal/public use today, and which cathedral is famous for its medieval stained glass?',
    back: 'Windsor Castle and Edinburgh Castle were begun in the Middle Ages and are still in use today; great cathedrals like Lincoln Cathedral were built, and York Minster is famous for its medieval stained-glass windows.',
    memoryHook:
      '🏰🌈 Windsor & Edinburgh Castles still stand proud; York Minster shines with medieval stained glass!',
  },
  {
    id: 'fc-ch3-034',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'What were the Wars of the Roses (1455–1485), and which colour rose belonged to each rival royal house?',
    back: 'A 30-year civil war begun in 1455 to decide who should be king of England, fought between supporters of the House of Lancaster (symbol: a Red Rose) and the House of York (symbol: a White Rose).',
    memoryHook:
      '🌹🤍 "Lancaster = Red (R in LancasteR!); York = White!"',
  },
  {
    id: 'fc-ch3-035',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'How did the Wars of the Roses end in 1485 at the Battle of Bosworth Field, and how was the Tudor Rose created?',
    back: 'In 1485 at the Battle of Bosworth Field, King Richard III (House of York) was killed in battle, and Henry Tudor (leader of the House of Lancaster) became King Henry VII — the first Tudor king. Henry VII married Richard’s niece, Elizabeth of York, uniting the two families under the red-and-white Tudor Rose!',
    memoryHook:
      '🌹👑 "1485 Bosworth Field = Henry VII beat Richard III, married Elizabeth of York, and Red + White became 1 Tudor Rose!"',
  },

  // ===========================================================================
  // 4. TUDORS, STUARTS, CIVIL WAR & GLORIOUS REVOLUTION (ch3-tudors-stuarts)
  // ===========================================================================
  {
    id: 'fc-ch3-036',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'How did King Henry VII strengthen the English monarchy after winning the Wars of the Roses?',
    back: 'Henry VII wanted peace and stability after the civil wars: he deliberately reduced the power of the nobles, strengthened central administration, and built up the monarchy’s financial reserves.',
    memoryHook:
      '💰👑 Henry VII = Savvy accountant king who tamed the barons and filled the royal treasury!',
  },
  {
    id: 'fc-ch3-037',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'Why did King Henry VIII break away from the Church of Rome, and what church did he establish?',
    back: 'When the Pope refused to approve Henry VIII’s divorce from his first wife (Catherine of Aragon) so he could marry again in hopes of a male heir, Henry broke away from Rome, established the Church of England with the King — not the Pope — able to appoint bishops and decide worship, and closed monasteries as Protestantism spread.',
    memoryHook:
      '💔⛪ Pope said "No divorce!" → Henry VIII said "Fine, I’m Supreme Head of the Church of England!"',
  },
  {
    id: 'fc-ch3-038',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'Name King Henry VIII’s six wives in exact chronological order and what happened to each.',
    back: '1. Catherine of Aragon — Divorced (Spanish princess; mother of Mary I)\n2. Anne Boleyn — Executed at the Tower of London (English; mother of Elizabeth I)\n3. Jane Seymour — Died shortly after giving birth to son Edward VI\n4. Anne of Cleves — Divorced (German princess)\n5. Catherine Howard — Executed (cousin of Anne Boleyn)\n6. Catherine Parr — Survived (widow who outlived Henry)',
    memoryHook:
      '👑6️⃣ Classic rhyme: "Divorced, Beheaded, Died — Divorced, Beheaded, Survived!" (3 Catherines, 2 Annes, 1 Jane!).',
  },
  {
    id: 'fc-ch3-039',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'How was Wales formally united with England during the reign of Henry VIII?',
    back: 'Under the Act for the Government of Wales, Henry VIII united Wales formally with England: the Welsh sent representatives to the House of Commons in London, the Welsh legal system was reformed, and English became the official language of administration.',
    memoryHook:
      '🏴󠁧󠁢󠁷󠁬󠁳󠁿🤝🏴󠁧󠁢󠁥󠁮󠁧󠁿 Henry Tudor had Welsh roots — and his son Henry VIII formally united Wales with England in law & Parliament!',
  },
  {
    id: 'fc-ch3-040',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What religious book was written during the reign of Henry VIII’s Protestant son, King Edward VI?',
    back: 'Edward VI (who ruled briefly and died at age 15) was strongly Protestant; during his reign, the Book of Common Prayer was written to be used in the Church of England (a version is still used in some churches today).',
    memoryHook:
      '📕🙏 Young Protestant Edward VI = The Book of Common Prayer!',
  },
  {
    id: 'fc-ch3-041',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'Why was Queen Mary I known as "Bloody Mary"?',
    back: 'Mary I (daughter of Catherine of Aragon) was a devout Catholic who tried to restore Roman Catholicism in England and persecuted Protestants (burning nearly 300 at the stake) during her short reign.',
    memoryHook:
      '🩸👑 Mary I = Devout Catholic daughter of Catherine of Aragon → persecuted Protestants = "Bloody Mary"!',
  },
  {
    id: 'fc-ch3-042',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What happened in Scotland in 1560 during the Reformation, and what happened to Catholic Mary, Queen of Scots?',
    back: 'In 1560, the predominantly Protestant Scottish Parliament abolished the authority of the Pope in Scotland and outlawed Roman Catholic religious services (establishing a Protestant Church of Scotland, NOT a state church). Catholic Mary, Queen of Scots (only a week old when her father died!) fled to England, gave her throne to her Protestant son James VI, was imprisoned for 20 years on suspicion of plotting against her cousin Elizabeth I, and was executed in 1587.',
    memoryHook:
      '🏴󠁧󠁢󠁳󠁣󠁴󠁿⚔️ Don’t mix up the Marys! Mary I = Tudor Queen of England; Mary, Queen of Scots = Elizabeth I’s Catholic cousin executed after 20 years in prison!',
  },
  {
    id: 'fc-ch3-043',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'How did Queen Elizabeth I (1558–1603) handle religion, and what famous naval victory occurred in 1588?',
    back: 'Elizabeth I (Protestant daughter of Anne Boleyn) re-established the Church of England, requiring everyone to attend local churches while avoiding investigating people’s private inner beliefs. In 1588, the English fleet defeated the Spanish Armada — a large fleet of ships sent by Catholic Spain to conquer England and restore Catholicism.',
    memoryHook:
      '⛵🔥 "1588 — Elizabeth I & England sealed the Spanish Armada’s fate!"',
  },
  {
    id: 'fc-ch3-044',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'Who was Sir Francis Drake, and what was the name of his famous ship?',
    back: 'One of the commanders who fought against the Spanish Armada and a founder of England’s naval tradition; his ship, the Golden Hind, was one of the first to sail right around (circumnavigate) the world. During Elizabeth I’s era, English settlers also began to colonise the eastern coast of America.',
    memoryHook:
      '⛵🌍 Sir Francis Drake sailed the Golden Hind right around the globe!',
  },
  {
    id: 'fc-ch3-045',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'Where was William Shakespeare (1564–1616) born, which London theatre is linked to him, and name four of his famous plays.',
    back: 'Born in Stratford-upon-Avon in England; his plays were performed at the Globe Theatre in London (a modern copy stands near the original site). Famous plays include A Midsummer Night’s Dream, Hamlet, Macbeth, and Romeo and Juliet (plus famous sonnets).',
    memoryHook:
      '🎭🪶 Stratford-upon-Avon’s Bard at the Globe: Hamlet, Macbeth, Romeo & Juliet, Midsummer Night’s Dream!',
  },
  {
    id: 'fc-ch3-046',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'Who succeeded Elizabeth I in 1603 when she died unmarried and childless, and what major religious book did he commission?',
    back: 'Her cousin James VI of Scotland became King James I of England, Wales, and Ireland in 1603 (though Scotland remained a separate country with its own Parliament). One key achievement of his reign was a new translation of the Bible into English — the "King James Version" or "Authorised Version".',
    memoryHook:
      '👑📖 "1603 Union of the Crowns = James VI of Scotland became James I of England + commissioned the King James Bible!"',
  },
  {
    id: 'fc-ch3-047',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What was the "Plantation" of Ulster under Elizabeth I and James I?',
    back: 'After suppressing rebellions in Ireland, the English government encouraged Scottish and English Protestants to settle in Ulster (the northern province of Ireland), taking over land from Catholic landholders — settlements known as "plantations" with long-term consequences for Irish history.',
    memoryHook:
      '☘️🌱 Ulster Plantations = Protestant settlers from Scotland & England given land in northern Ireland under Elizabeth I & James I.',
  },
  {
    id: 'fc-ch3-048',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'What was the Gunpowder Plot of 5 November 1605?',
    back: 'A group of Roman Catholics led by Guy Fawkes plotted to blow up the Houses of Parliament and kill Protestant King James I with a bomb; the plot was uncovered and failed (still marked every 5 November on Bonfire Night).',
    memoryHook:
      '🧨🎆 "5 Nov 1605 = Guy Fawkes caught in the cellar under King James I’s Parliament!"',
  },
  {
    id: 'fc-ch3-049',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What was the "Divine Right of Kings", and why did King Charles I clash fiercely with Parliament and Scotland?',
    back: 'James I and his son Charles I believed in the "Divine Right of Kings" — that the king was directly appointed by God and could rule without Parliament’s approval. Charles I ruled for 11 years without recalling Parliament, raised taxes alone, tried to force a revised Prayer Book on the Presbyterian Church in Scotland (sparking a Scottish invasion), and entered the House of Commons to try to arrest 5 parliamentary leaders!',
    memoryHook:
      '👑⚡ Charles I thought God gave him solo power → 11 years no Parliament + stormed the Commons → sparked Civil War!',
  },
  {
    id: 'fc-ch3-050',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'When did the English Civil War begin, what were the two sides called, and which two battles sealed Parliament’s victory?',
    back: 'Civil war between the king and Parliament began in 1642: the king’s supporters were the Cavaliers, and Parliament’s supporters were the Roundheads. The Parliamentary army defeated Charles I at the Battles of Marston Moor and Naseby (by 1646 it was clear Parliament had won).',
    memoryHook:
      '⚔️🪖 "1642: Fancy-haired Cavaliers (King) vs Helmeted Roundheads (Parliament) — Roundheads won Marston Moor & Naseby!"',
  },
  {
    id: 'fc-ch3-051',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'What happened in 1649 after Charles I refused to reach an agreement with Parliament, and who ruled the Republic ("Commonwealth")?',
    back: 'Charles I was executed in 1649, and England declared itself a republic called the Commonwealth (with no monarch!). General Oliver Cromwell crushed revolts in Ireland and defeated the Scots/Charles II at Dunbar and Worcester (where Charles II famously hid in an oak tree before escaping to Europe). Cromwell was later given the title "Lord Protector" and ruled until his death in 1658.',
    memoryHook:
      '🪓🌳 "1649 Charles I lost his head; Charles II hid in an oak tree; Oliver Cromwell ruled the Republic as Lord Protector!"',
  },
  {
    id: 'fc-ch3-052',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'What was "The Restoration" of May 1660?',
    back: 'After Oliver Cromwell died in 1658 and his son Richard failed to provide clear leadership, Parliament invited Charles II back from exile in the Netherlands to be crowned King Charles II of England, Wales, Scotland, and Ireland in May 1660.',
    memoryHook:
      '🎉👑 "1660 = The Merry Monarch Charles II brought the Crown (and parties!) back to Britain!"',
  },
  {
    id: 'fc-ch3-053',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'Which two disasters struck London in 1665 and 1666, who chronicled them in a famous diary, and who designed the new St Paul’s Cathedral?',
    back: 'In 1665 London suffered a major outbreak of the Great Plague; in 1666 the Great Fire of London destroyed much of the city, including many churches and the old St Paul’s Cathedral. London was rebuilt with a famous new St Paul’s Cathedral designed by Sir Christopher Wren, and Samuel Pepys wrote about these events in his famous published diary.',
    memoryHook:
      '🐀🔥🏛️ "1665 Plague, 1666 Blazing Bricks — Pepys wrote the diary & Wren built St Paul’s dome!"',
  },
  {
    id: 'fc-ch3-054',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What important legal safeguard became law in 1679 under the Habeas Corpus Act?',
    back: 'The Habeas Corpus Act of 1679 (Latin for "you must present the person in court") guaranteed that no one could be held unlawfully as a prisoner — every prisoner has a right to a court hearing.',
    memoryHook:
      '⚖️🔓 "1679 Habeas Corpus = Show the body in court — no secret unlawful lock-ups!"',
  },
  {
    id: 'fc-ch3-055',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What is the Royal Society, and what were the famous discoveries of Edmund Halley and Sir Isaac Newton?',
    back: 'Founded during Charles II’s reign to promote "natural knowledge", the Royal Society is the oldest surviving scientific society in the world. Early members included Sir Edmund Halley (predicted the return of Halley’s Comet) and Sir Isaac Newton (born in Lincolnshire; published Principia Mathematica showing gravity applies across the whole universe, and discovered white light is made up of the colours of the rainbow).',
    memoryHook:
      '🍎🌈☄️ Royal Society superstars: Halley timed the comet; Newton nailed universal gravity & rainbow light!',
  },
  {
    id: 'fc-ch3-056',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'Why was the event of 1688 called the "Glorious Revolution", and who became joint monarchs?',
    back: 'Catholic King James II (Charles II’s brother) alarmed Protestants by favouring Catholics and arresting bishops. Leading Protestants invited William of Orange (Protestant ruler of the Netherlands, married to James II’s Protestant daughter Mary) to invade England in 1688. There was NO resistance in England — James II fled to France, and William III and Mary II ruled jointly in a bloodless "Glorious Revolution"!',
    memoryHook:
      '🍊👑 "1688 = William of Orange walked straight through the gate — zero English battle = Glorious Revolution!"',
  },
  {
    id: 'fc-ch3-057',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    visualId: 'history-timeline',
    front: 'What did the 1689 Bill of Rights establish, and what happened at the Battle of the Boyne in 1690?',
    back: 'The Bill of Rights (1689) confirmed the rights of Parliament and the limits of the king’s power (requiring free elections, frequent Parliaments, Parliamentary consent for taxes/laws, and that the monarch must be Protestant — laying the foundation of constitutional monarchy!). In 1690, William III defeated James II’s French-backed army at the Battle of the Boyne in Ireland (supporters of the Stuarts became known as "Jacobites").',
    memoryHook:
      '📜⚖️ "1688 Glorious Arrival → 1689 Bill of Rights (Parliament rules!) → 1690 Battle of the Boyne!"',
  },

  // ===========================================================================
  // 5. EMPIRE, INDUSTRIAL REVOLUTION & VICTORIAN ERA (ch3-empire-industry)
  // ===========================================================================
  {
    id: 'fc-ch3-058',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Who were the Huguenots who settled in Britain between 1680 and 1720, and when were newspapers freed from government licensing?',
    back: 'The Huguenots were Protestant refugees fleeing religious persecution in France who brought skills in science, banking, and weaving (following the earlier resettlement of Jews in London in 1656). Also, from 1695 newspapers were allowed to operate without a government licence.',
    memoryHook:
      '🧵📰 Huguenots = Skilled French Protestant refugees (1680–1720); 1695 = Free press without a royal licence!',
  },
  {
    id: 'fc-ch3-059',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'What did the Act of Union (Treaty of Union in Scotland) create in 1707, and under which monarch?',
    back: 'Passed in 1707 during the reign of Queen Anne, the Act of Union united England (with Wales) and Scotland into a single Kingdom of Great Britain with one Parliament in London — though Scotland kept its own legal and education systems and its Presbyterian Church.',
    memoryHook:
      '🏴󠁧󠁢󠁥󠁮󠁧󠁿🤝🏴󠁧󠁢󠁳󠁣󠁴󠁿 "1707 under Queen Anne = Scotland + England & Wales became ONE Kingdom of Great Britain!"',
  },
  {
    id: 'fc-ch3-060',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Why did German Hanoverian King George I rely heavily on his ministers, and who became Britain’s FIRST Prime Minister?',
    back: 'When Queen Anne died in 1714 with no surviving children, Parliament chose her nearest Protestant relative — George, Elector of Hanover — as King George I. Because he did not speak very good English, he relied more on his ministers; the most important minister in Parliament became known as the Prime Minister. The first man to be called this was Sir Robert Walpole, Prime Minister from 1721 to 1742!',
    memoryHook:
      '🎩🥇 "George I spoke little English → Sir Robert Walpole took the pole position as Britain’s FIRST Prime Minister (1721–1742)!"',
  },
  {
    id: 'fc-ch3-061',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'What happened in 1746 at the Battle of Culloden, and what were the "Highland Clearances"?',
    back: 'In 1745, Charles Edward Stuart ("Bonnie Prince Charlie", grandson of James II) landed in Scotland supported by Highland clansmen to reclaim the throne, but was defeated by George II’s army at the Battle of Culloden in 1746 (escaping back to Europe). Afterwards, clans lost power as Scottish landlords destroyed small individual farms ("crofts") to make space for sheep and cattle — evictions known as the Highland Clearances, sending many Scots to North America.',
    memoryHook:
      '⚔️🐑 "1746 Culloden crushed Bonnie Prince Charlie’s Jacobites → Highland Clearances swapped crofters for sheep!"',
  },
  {
    id: 'fc-ch3-062',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Who were the three standout thinkers/inventors of the 18th-century Scottish Enlightenment: Adam Smith, David Hume, and James Watt?',
    back: '• Adam Smith: developed modern ideas about economics still referred to today (The Wealth of Nations).\n• David Hume: influential philosopher whose ideas on human nature continue to shape philosophy.\n• James Watt: scientific discoveries and improvements on steam power helped drive the Industrial Revolution.',
    memoryHook:
      '💡🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish Enlightenment trio: "Adam Smith = Economics; David Hume = Human Philosophy; James Watt = Steam Power (Watts)!"',
  },
  {
    id: 'fc-ch3-063',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Who was Richard Arkwright (1732–1792), and what made him famous during the Industrial Revolution?',
    back: 'Originally a barber and wig-maker, Richard Arkwright improved the carding machine (preparing fibres for spinning into yarn and cloth), used horse and water power for mechanised textiles, and is remembered for running efficient, profitable factories.',
    memoryHook:
      '💈🏭 From wigs to textile wealth! Arkwright = Carding machine + modern factory boss!',
  },
  {
    id: 'fc-ch3-064',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'What was the Bessemer process, and how did canals and steam transform 18th- and 19th-century Britain?',
    back: 'Britain was the first country to industrialise on a large scale, fuelled by coal and iron deposits: the Bessemer process enabled the mass production of steel (for shipbuilding and railways), while a network of canals linked factories in the Midlands and north to ports.',
    memoryHook:
      '⚙️🚢 Bessemer = Mass-produced steel; Canals & Coal = Britain’s Industrial Revolution engine!',
  },
  {
    id: 'fc-ch3-065',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Who was Sake Dean Mahomed (1759–1851), and what two cultural firsts did he introduce to Britain?',
    back: 'Born in the Bengal region of India, he came to Britain in 1782, eloped with Irish girl Jane Daly, opened the Hindoostane Coffee House in George Street, London in 1810 (the FIRST curry house to open in Britain!), and with his wife introduced "shampooing" — the Indian art of head massage!',
    memoryHook:
      '🍛💆‍♂️ Literal "Spice Up Your UK" pioneer! Sake Dean Mahomed = First London curry house (1810) + brought "shampooing" to Britain!',
  },
  {
    id: 'fc-ch3-066',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Which religious group set up the first formal anti-slavery groups in Britain, and which MP led the campaign in Parliament?',
    back: 'The Quakers set up the first formal anti-slavery groups in the late 1700s, petitioning Parliament to ban the trade. William Wilberforce, an evangelical Christian and Member of Parliament, played a vital part in turning public opinion and changing the law.',
    memoryHook:
      '🕊️🗣️ Quakers organized the petitions; William Wilberforce led the voice inside Parliament!',
  },
  {
    id: 'fc-ch3-067',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Exam Favourite: Distinguish the 1807 Slave Trade Act from the 1833 Emancipation Act.',
    back: '• 1807: It became illegal to trade slaves in British ships or from British ports (and the Royal Navy patrolled to stop slave ships from other nations).\n• 1833: The Emancipation Act abolished slavery itself throughout the entire British Empire! (After 1833, 2 million Indian and Chinese workers were employed to replace freed slaves on plantations).',
    memoryHook:
      '⛓️🚫 "1807 = Stop the Ships (Trade banned); 1833 = Set Everyone Free (Slavery abolished across the Empire)!"',
  },
  {
    id: 'fc-ch3-068',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'What happened in 1776 in British North America?',
    back: 'After clashes with the British government over taxation without representation, 13 American colonies declared their independence in 1776 — defeating the British army in the War of Independence and having independence recognised by Britain in 1783.',
    memoryHook:
      '🦅📜 1776 = 13 American colonies declared independence over taxes; 1783 = Britain recognised the USA!',
  },
  {
    id: 'fc-ch3-069',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'What did the Act of Union of 1800 (taking effect in 1801) create?',
    back: 'It abolished the separate Irish Parliament and united Ireland with Great Britain, creating the United Kingdom of Great Britain and Ireland — and adding the red diagonal Cross of St Patrick to create the current official Union Flag!',
    memoryHook:
      '☘️🇬🇧 "1707 Scotland joined; 1801 Ireland made ONE United Kingdom (+ added St Patrick’s cross to the Union Jack)!"',
  },
  {
    id: 'fc-ch3-070',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Who won the Battle of Trafalgar in 1805, what was his flagship called, and where can you visit it today?',
    back: 'Admiral Horatio Nelson led Britain’s navy to defeat the combined French and Spanish fleets at the Battle of Trafalgar in 1805 (Nelson was killed in the battle). Nelson’s Column in Trafalgar Square, London honours him, and his ship, HMS Victory, can still be visited in Portsmouth!',
    memoryHook:
      '⚓🦁 "1805 Trafalgar = Admiral Nelson won & fell on HMS Victory (parked in Portsmouth today)!"',
  },
  {
    id: 'fc-ch3-071',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Who defeated French Emperor Napoleon in 1815 at the Battle of Waterloo?',
    back: 'The British army led by the Duke of Wellington ("the Iron Duke", who later became Prime Minister) defeated Emperor Napoleon at the Battle of Waterloo in 1815, ending the Napoleonic Wars.',
    memoryHook:
      '🥾⚔️ "1805 Sea = Nelson (Trafalgar); 1815 Land = Wellington (Waterloo)!"',
  },
  {
    id: 'fc-ch3-072',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'What did the Great Reform Act of 1832 do, and who were the "Chartists"?',
    back: 'The Reform Act of 1832 greatly increased the number of (male) voters, abolished old pocket and "rotten" boroughs with tiny electorates, and gave more parliamentary seats to growing industrial towns and cities. Working-class campaigners called Chartists then demanded universal male votes, annual elections, secret ballots, equal constituencies, and MPs’ salaries — initially failing, though most goals were adopted by 1918.',
    memoryHook:
      '🗳️🏙️ 1832 Reform Act swept out "rotten boroughs"; Chartists demanded a People’s Charter for working voters!',
  },
  {
    id: 'fc-ch3-073',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'During which years did Queen Victoria reign, and how large did the British Empire grow?',
    back: 'Queen Victoria became queen in 1837 at age 18 and reigned until 1901 — almost 64 years! During the Victorian Age, Britain led the world in trade and industry, and the British Empire grew to become the largest empire the world had ever seen (an estimated 400 million people).',
    memoryHook:
      '👑🌍 Queen Victoria = 1837 to 1901 (~64 years) presiding over an Empire of 400 million!',
  },
  {
    id: 'fc-ch3-074',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'What were the Corn Laws repealed in 1846, and what tragedy struck Ireland in the mid-19th century?',
    back: 'The Corn Laws had prevented the import of cheap grain; their repeal in 1846 promoted free trade and cheaper food/raw materials for factories. Around the same time in the mid-19th century, the potato crop failed in Ireland — a million people died from disease and starvation in the Irish Famine, and a million and a half emigrated (many to the US and English cities like Liverpool, London, Manchester, and Glasgow).',
    memoryHook:
      '🌾🥔 1846 = Corn Laws repealed for Free Trade; Mid-1840s = Devastating Irish Potato Famine.',
  },
  {
    id: 'fc-ch3-075',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Where was the Great Exhibition of 1851 held, and what building was constructed to house it?',
    back: 'Opened in 1851 in Hyde Park, London inside the Crystal Palace — a huge building made of iron and glass — exhibiting objects from all over the world, most of them made in Britain.',
    memoryHook:
      '🔮🏛️ "1851 Great Exhibition = Sparkling iron-and-glass Crystal Palace in Hyde Park!"',
  },
  {
    id: 'fc-ch3-076',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Compare Victorian railway and engineering pioneers George & Robert Stephenson and Isambard Kingdom Brunel.',
    back: '• George & Robert Stephenson: pioneered the railway engine — built the famous locomotive Rocket just before the first passenger railways opened in 1830.\n• Isambard Kingdom Brunel (born in Portsmouth): engineer who built tunnels, bridges, railway lines, and ships — including the Great Western Railway (Paddington to SW England/Wales), the Clifton Suspension Bridge over the Avon Gorge in Bristol, and the iron steamship SS Great Britain.',
    memoryHook:
      '🚂🌉 Stephensons = Rocket engine (1830); Brunel (tall stovepipe hat!) = Great Western Railway + Clifton Suspension Bridge!',
  },
  {
    id: 'fc-ch3-077',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Who fought in the Crimean War (1853–1856), why was its media coverage historic, and what medal did Queen Victoria create during it?',
    back: 'Britain fought alongside Turkey and France against Russia (1853–1856). It was the FIRST war to be extensively covered by the media through news stories and photographs! Queen Victoria also introduced the Victoria Cross medal during this war to honour acts of valour by soldiers.',
    memoryHook:
      '📸🎖️ Crimean War (1853–56 vs Russia) = First war in photos/news + birth of the Victoria Cross!',
  },
  {
    id: 'fc-ch3-078',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Where was Florence Nightingale (1820–1910) born, where did she nurse soldiers in the Crimean War, and what school did she open in 1860?',
    back: 'Born in Italy to English parents, Florence Nightingale trained as a nurse in Germany (age 31) and in 1854 went to Turkey to treat soldiers at the military hospital in Scutari — dramatically slashing mortality rates through hygiene. In 1860 she established the Nightingale Training School for nurses at St Thomas’ Hospital in London; she is regarded as the founder of modern nursing.',
    memoryHook:
      '🕯️🏥 Born in Florence (Italy!) → Saved soldiers in Scutari (Turkey) → Opened nursing school at St Thomas’ London (1860)!',
  },
  {
    id: 'fc-ch3-079',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'What did the Married Women’s Property Acts of 1870 and 1882 change, and who was Rudyard Kipling (1865–1936)?',
    back: '• Until 1870, when a woman married, her earnings and property automatically belonged to her husband; the Acts of 1870 and 1882 gave married women the right to keep their own earnings and property!\n• Rudyard Kipling (born in India; awarded the Nobel Prize in Literature in 1907) wrote books and poems set in India and the UK reflecting Empire confidence, including The Jungle Book, Just So Stories, and the poem "If".',
    memoryHook:
      '💍🐯 1870 & 1882 = Wives keep their own cash & property! Kipling (born in India, 1907 Nobel) = Jungle Book & "If"!',
  },
  {
    id: 'fc-ch3-080',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    visualId: 'history-timeline',
    front: 'Who was Emmeline Pankhurst (1858–1928), when did she found the WSPU ("Suffragettes"), and in which TWO years did women gain the vote?',
    back: 'Born in Manchester in 1858, Emmeline Pankhurst helped found the Women’s Social and Political Union (WSPU) in 1903, whose members — the "Suffragettes" — used civil disobedience (chaining themselves to railings, smashing windows, going on hunger strike) to win votes for women.\n• 1918: Women aged 30 and over gained the right to vote (recognising women’s WWI effort).\n• 1928: Women gained the vote at age 21, equal with men (shortly before Emmeline died)!',
    memoryHook:
      '💜✊ Ultimate Girl Power! 1903 = WSPU Suffragettes; 1918 = Vote at 30+; 1928 = Equal vote at 21! (Later lowered to 18 in 1969).',
  },

  // ===========================================================================
  // 6. THE 20TH CENTURY: WORLD WAR I & WORLD WAR II (ch3-world-wars)
  // ===========================================================================
  {
    id: 'fc-ch3-081',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    front: 'Who fought in the Boer War of 1899 to 1902, and how did it reshape thinking about the British Empire?',
    back: 'British forces went to war in South Africa with settlers from the Netherlands called the Boers (1899–1902). Because the Boers fought fiercely and sympathy grew for them, public debate began over whether the Empire could continue, shifting slowly toward greater self-government for Dominions like Australia, Canada, New Zealand, and South Africa.',
    memoryHook:
      '🇿🇦🧭 1899–1902 Boer War in South Africa sparked the gradual evolution from Empire toward Commonwealth!',
  },
  {
    id: 'fc-ch3-082',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'What event on 28 June 1914 triggered the First World War (1914–1918), and how many British casualties were suffered overall?',
    back: 'The assassination of Archduke Franz Ferdinand of Austria set off a chain of events leading to WWI (1914–1918), where Britain and the Allied Powers (including France, Russia, Japan, Belgium, Serbia, and later Italy & the US — plus over 1 million Indians and troops from across the Empire) fought the Central Powers (mainly Germany, the Austro-Hungarian Empire, the Ottoman Empire, and Bulgaria). There were more than 2 million British casualties.',
    memoryHook:
      '💥🪖 28 June 1914 = Franz Ferdinand assassinated → WWI (1914–18), 2M+ British casualties & 1M+ Indian soldiers!',
  },
  {
    id: 'fc-ch3-083',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'Exam Classic: What happened on 1 July 1916 during the Battle of the Somme?',
    back: 'The British attack at the Battle of the Somme in July 1916 resulted in about 60,000 British casualties (dead and wounded) on the FIRST DAY ALONE.',
    memoryHook:
      '🕯️ "1 July 1916 Somme = 60,000 British casualties on Day One alone."',
  },
  {
    id: 'fc-ch3-084',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'At what exact time and date did the First World War end?',
    back: 'At 11:00 am on 11 November 1918 — victory for Britain and its allies (commemorated as Armistice / Remembrance Day).',
    memoryHook:
      '🕚🌺 "11th hour, 11th day, 11th month of 1918!"',
  },
  {
    id: 'fc-ch3-085',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'Trace the key events in Ireland from the 1916 Easter Rising to the 1922 partition of Ireland.',
    back: 'In 1913 the British government promised "Home Rule" for Ireland (opposed by Protestants in the north), postponed due to WWI. In 1916, Irish Nationalists staged the Easter Rising against the British in Dublin, followed by guerrilla war. A 1921 peace treaty led in 1922 to Ireland splitting into two countries: the 6 mainly Protestant counties in the north remained in the UK as Northern Ireland, while the rest became the Irish Free State (which became a republic in 1949).',
    memoryHook:
      '☘️📅 "1916 Dublin Easter Rising → 1921 Peace Treaty → 1922 Two Irelands (NI in UK + Irish Free State, Republic in 1949)!"',
  },
  {
    id: 'fc-ch3-086',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    front: 'What happened in Britain during the 1926 General Strike and the 1930s Great Depression?',
    back: 'After high unemployment in the 1920s led to the 1926 General Strike, the world entered the "Great Depression" in 1929. Traditional heavy industries (such as shipbuilding in Scotland, north-east England, and Belfast, plus coal and steel) suffered badly, while new light industries — especially car manufacturing and aviation — developed alongside lower prices and a major 1930s house-building boom.',
    memoryHook:
      '⛏️🚗 1926 General Strike → 1930s Depression hit coal & shipyards hard, while cars, planes & new semi-detached suburbs boomed!',
  },
  {
    id: 'fc-ch3-087',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'Who discovered penicillin in 1928, and who turned it into a usable mass-produced drug?',
    back: 'Scottish doctor Alexander Fleming (researching influenza in London) discovered penicillin in 1928. It was further developed into a usable antibiotic drug by scientists Howard Florey and Ernst Chain by the 1940s; Fleming won the Nobel Prize in Medicine in 1945.',
    memoryHook:
      '🧫💊 "1928 = Fleming spotted the mould (Penicillin); Florey & Chain bottled the cure; 1945 Nobel Prize!"',
  },
  {
    id: 'fc-ch3-088',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'When did the BBC begin regular radio broadcasts, and when did it launch the world’s FIRST regular television service?',
    back: 'The BBC started regular radio broadcasts in 1922 and began the world’s first regular television service in 1936! (Also in the 1930s, writers like Graham Greene and Evelyn Waugh flourished, economist John Maynard Keynes published influential theories, and the Daily Mail had earlier pioneered mass popular journalism in 1896).',
    memoryHook:
      '📻📺 "1922 BBC Radio → 1936 World’s FIRST regular TV service!"',
  },
  {
    id: 'fc-ch3-089',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'What action by Adolf Hitler caused Britain and France to declare war in 1939, and which nations formed the "Axis" powers?',
    back: 'Adolf Hitler came to power in Germany in 1933; when Hitler invaded Poland in September 1939 (after occupying Austria and invading Czechoslovakia), Britain and France declared war to stop his aggression. The Axis powers were Fascist Germany and Italy plus the Empire of Japan.',
    memoryHook:
      '⚔️🇵🇱 "September 1939: Hitler invaded Poland → Britain & France declared WWII!"',
  },
  {
    id: 'fc-ch3-090',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'What was the evacuation of Dunkirk in 1940, and how many men were rescued?',
    back: 'After German forces defeated Allied troops and took control of France and Belgium in spring 1940, many civilian volunteers in small pleasure and fishing boats helped the Royal Navy rescue more than 300,000 British and French soldiers from the beaches around Dunkirk — giving rise to the phrase "the Dunkirk spirit".',
    memoryHook:
      '🚤🌊 "Dunkirk 1940 = Little boats + Royal Navy rescued 300,000+ troops!"',
  },
  {
    id: 'fc-ch3-091',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'When did Winston Churchill become Prime Minister, what poll did he win in 2002, and what are three of his most famous wartime speech lines?',
    back: 'Winston Churchill (Conservative MP, son of a politician, former journalist/soldier) became Prime Minister in May 1940, refusing to surrender to the Nazis (and was voted the greatest Briton of all time by the public in 2002!). Famous 1940 quotes:\n• "I have nothing to offer but blood, toil, tears and sweat"\n• "We shall fight on the beaches... we shall never surrender"\n• "Never in the field of human conflict was so much owed by so many to so few" (praising RAF pilots!)',
    memoryHook:
      '✌️🦁 May 1940 = Churchill takes the helm! Blood/toil/tears/sweat, Fight on the beaches, and "So few" (RAF)!',
  },
  {
    id: 'fc-ch3-092',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'What was the Battle of Britain (summer 1940), and which two British fighter planes were most important to the RAF’s victory?',
    back: 'From the end of June until October 1940, the Royal Air Force (RAF) won the crucial aerial battle against the Germans (the Battle of Britain), preventing Germany from invading Britain across the Channel. The two most important British planes used by the RAF were the Spitfire and the Hurricane (designed and built in Britain!).',
    memoryHook:
      '✈️🇬🇧 "Summer 1940 Skies = Spitfire & Hurricane saved Britain!"',
  },
  {
    id: 'fc-ch3-093',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    front: 'What was "The Blitz", and which English Midlands city was almost totally destroyed alongside heavy damage in London?',
    back: 'Despite losing the Battle of Britain, the German air force continued bombing London and other British cities at night — called the Blitz. Coventry was almost totally destroyed, and great damage was caused across London (especially in the East End), inspiring the resilient "Blitz spirit".',
    memoryHook:
      '💣🌃 Night bombing = The Blitz! London’s East End battered, and Coventry (plus its cathedral) almost flattened!',
  },
  {
    id: 'fc-ch3-094',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    front: 'How did the United States and the Soviet Union enter World War II in 1941?',
    back: 'Germany invaded the Soviet Union (where German forces were eventually pushed back with colossal losses on both sides), and the United States entered the war when the Japanese bombed its naval base at Pearl Harbor in December 1941 (around the same time Japan invaded Singapore and Burma).',
    memoryHook:
      '🌏⚓ 1941 = Hitler invaded the USSR + Japan bombed Pearl Harbor (Dec 1941) bringing the USA in!',
  },
  {
    id: 'fc-ch3-095',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    visualId: 'history-timeline',
    front: 'What happened on 6 June 1944 ("D-Day")?',
    back: 'On 6 June 1944, Allied forces landed in Normandy (northern France) in an event often referred to as "D-Day". Following victory on the Normandy beaches, Allied armies pressed on through France and eventually into Germany, comprehensively defeating Germany in May 1945.',
    memoryHook:
      '🏖️🪖 "6th day of the 6th month, 1944 (6 June 1944) = D-Day landings in Normandy!"',
  },
  {
    id: 'fc-ch3-096',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    front: 'How did the war against Japan end in August 1945, and which scientist working in Britain had earlier been the first to "split the atom"?',
    back: 'The war against Japan ended in August 1945 when the United States dropped atomic bombs on the Japanese cities of Hiroshima and Nagasaki. Earlier, scientists led by Ernest Rutherford (born in New Zealand), working at Manchester and then Cambridge University, were the FIRST to "split the atom" — and British scientists later took part in the Manhattan Project in the US.',
    memoryHook:
      '⚛️🔬 Ernest Rutherford (NZ-born, working at Manchester & Cambridge) = First team ever to split the atom!',
  },

  // ===========================================================================
  // 7. BRITAIN SINCE 1945 & MODERN ERA (ch3-modern-britain)
  // ===========================================================================
  {
    id: 'fc-ch3-097',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'Who won the 1945 General Election right after WWII in Europe ended, and what industries did his government nationalise?',
    back: 'Although Churchill was celebrated as a wartime leader, the British public elected a Labour government in 1945 led by Prime Minister Clement Attlee, promising to implement the Beveridge social reforms and taking coal mines, steel, railways, gas, electricity, and the Bank of England into public ownership (nationalisation).',
    memoryHook:
      '🗳️🌹 Surprise 1945 twist! Churchill won the war, Clement Attlee (Labour) won the peace & built the welfare state!',
  },
  {
    id: 'fc-ch3-098',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'What was the 1942 Beveridge Report, who wrote it, and what were the "Five Giant Evils" it aimed to fight?',
    back: 'Economist William Beveridge produced the 1942 report Social Insurance and Allied Services (the "Beveridge Report"), commissioned by the wartime government in 1941. It recommended that the government fight the five "Giant Evils" of Want, Disease, Ignorance, Squalor, and Idleness and provide a basic welfare state for all citizens.',
    memoryHook:
      '📋🛡️ 1942 Beveridge Report = Blueprint to slay 5 Giants: Want, Disease, Ignorance, Squalor & Idleness!',
  },
  {
    id: 'fc-ch3-099',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'What did R.A. ("Rab") Butler’s Education Act of 1944 ("The Butler Act") introduce?',
    back: 'Introduced in 1944 by Conservative minister R.A. Butler during the wartime coalition, the Butler Act introduced FREE secondary education in England and Wales and created a clear division between primary and secondary schools.',
    memoryHook:
      '🎓📚 "1944 Butler Act = Free secondary schooling for all in England & Wales!"',
  },
  {
    id: 'fc-ch3-100',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'When was the National Health Service (NHS) established, and which Minister of Health led its creation?',
    back: 'In 1948, Aneurin ("Nye") Bevan, the Labour Minister of Health (under PM Clement Attlee), led the establishment of the National Health Service (NHS), guaranteeing a minimum standard of healthcare for all, free at the point of use! (A national system of "social security" was also introduced).',
    memoryHook:
      '🏥💙 "1948 = Nye Bevan birthed the NHS!" (Don’t confuse Beveridge 1942 report with Bevan 1948 NHS!).',
  },
  {
    id: 'fc-ch3-101',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'Which three South Asian nations gained independence from Britain in 1947, and which Prime Minister gave the "Wind of Change" speech?',
    back: 'In 1947, independence was granted to 9 countries, including India, Pakistan, and Ceylon (now Sri Lanka), starting a mostly peaceful 20-year transition from Empire to Commonwealth. Conservative PM Harold Macmillan (1957–1963) gave the famous "Wind of Change" speech about decolonisation and independence in Africa.',
    memoryHook:
      '🕊️🌍 1947 = India, Pakistan & Ceylon (Sri Lanka) independent; Harold Macmillan = "Wind of Change" speech!',
  },
  {
    id: 'fc-ch3-102',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'Why were workers invited from the West Indies and South Asia to rebuild Britain after WWII, and what happened in 1948 aboard HMT Empire Windrush?',
    back: 'Facing severe post-war labour shortages to rebuild Britain, the government encouraged workers from Ireland, European refugee camps, and the Commonwealth to come and work. In 1948, people from the West Indies were invited to come and work (famously arriving on HMT Empire Windrush), and in the 1950s centres in the West Indies and India/Pakistan (and later Bangladesh) recruited bus drivers, NHS staff, and textile/engineering workers for 25 years.',
    memoryHook:
      '🚢🩺🚌 1948 Empire Windrush = Caribbean & Commonwealth pioneers who helped build the new NHS, buses & factories!',
  },
  {
    id: 'fc-ch3-103',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'What defined Britain’s "Swinging Sixties" in music, fashion, and social laws?',
    back: 'The 1960s ("Swinging Sixties") brought surging pop music (The Beatles from Liverpool and The Rolling Stones), fashion innovations (Mary Quant popularised the miniskirt!), rising wealth (cars & consumer goods), and major liberalised social laws — reforming divorce and abortion laws (in England, Wales & Scotland), improving women’s workplace position, and abolishing capital punishment (the death penalty) for murder in 1965/1969.',
    memoryHook:
      '🎸👗✌️ Swinging Sixties = Beatles, Stones, Mary Quant’s miniskirt, liberal divorce/abortion laws & ending the death penalty!',
  },
  {
    id: 'fc-ch3-104',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'What was Concorde, which country partnered with Britain to build it, and when did it fly?',
    back: 'Britain and France jointly developed Concorde, the world’s ONLY supersonic passenger airliner! It first flew in 1969, began carrying passengers in 1976, and retired from service in 2003 (alongside other 1960s British aviation triumphs like the Harrier jump jet).',
    memoryHook:
      '✈️🇬🇧🇫🇷 UK + France "2 Become 1" in the sky: Concorde = World’s only supersonic airliner (first flew 1969, retired 2003)!',
  },
  {
    id: 'fc-ch3-105',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'In what year did the UK join the European Economic Community (EEC), and what troubles occurred in the 1970s?',
    back: 'The UK joined the European Economic Community (EEC — precursor to the EU) in 1973 (alongside Ireland and Denmark, under Conservative PM Edward Heath). The late 1970s were marked by economic instability, balance-of-payments problems, strikes, and serious unrest ("the Troubles") in Northern Ireland, where the NI Parliament was suspended in 1972 and around 3,000 people lost their lives over ensuing decades.',
    memoryHook:
      '🇪🇺📅 "1973 = UK stepped INTO the EEC!" (1972 = NI Parliament suspended amid the Troubles).',
  },
  {
    id: 'fc-ch3-106',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'Who became the UK’s FIRST female Prime Minister in 1979, and what major economic changes did her government make?',
    back: 'Margaret Thatcher, leader of the Conservative Party, was elected in 1979 as the UK’s FIRST woman Prime Minister (and longest continuously serving PM of the 20th century, serving until 1990). Her government privatised nationalised industries, imposed legal controls on trade union powers, deregulated financial markets ( sparking huge growth in the City of London), and benefited from North Sea oil and gas revenues.',
    memoryHook:
      '👜👩‍💼 "1979 = Margaret Thatcher became Britain’s FIRST female PM!" — Privatisation + City deregulation + North Sea oil.',
  },
  {
    id: 'fc-ch3-107',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'What caused the Falklands War in 1982, and what was the outcome?',
    back: 'In 1982, Argentina invaded the Falkland Islands — a British Overseas Territory in the South Atlantic. A naval taskforce was sent from the UK under Margaret Thatcher’s government, and military action led to the recovery of the islands.',
    memoryHook:
      '🚢🏝️ "1982 = Argentina invaded the Falklands → British taskforce sailed south & recovered them!"',
  },
  {
    id: 'fc-ch3-108',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'Who was children’s author Roald Dahl (1916–1990), and who succeeded Margaret Thatcher as Prime Minister in 1990?',
    back: '• Roald Dahl was born in Wales to Norwegian parents, served in the RAF during WWII, and wrote some of the best-selling children’s books ever published, including Charlie and the Chocolate Factory and George’s Marvellous Medicine.\n• John Major succeeded Thatcher as Conservative Prime Minister after her resignation in 1990 and helped establish the Northern Ireland peace process.',
    memoryHook:
      '🍫🎩 Welsh-born RAF pilot Roald Dahl = Wonka’s Chocolate Factory; 1990 = John Major took over at No. 10 & started NI peace talks!',
  },
  {
    id: 'fc-ch3-109',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'Who led Labour to victory in 1997, and what landmark peace deal was signed in Northern Ireland in 1998?',
    back: 'Tony Blair led the Labour Party elected in 1997. Building on the peace process, the Good Friday Agreement (also called the Belfast Agreement) was signed in 1998, leading to the election of the power-sharing Northern Ireland Assembly in 1999 (and decommissioning of paramilitary groups by 2007).',
    memoryHook:
      '🕊️☘️ "1997 Tony Blair elected → 1998 Good Friday Agreement brought peace & power-sharing to Northern Ireland!"',
  },
  {
    id: 'fc-ch3-110',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'What major constitutional change ("Devolution") did the Labour government introduce in Scotland and Wales in 1999?',
    back: 'Following referendums, the government introduced a Scottish Parliament (with substantial powers to legislate) and a Welsh Assembly (with fewer initial legislative powers, but considerable control over public services — now Senedd Cymru / Welsh Parliament), both opening in 1999!',
    memoryHook:
      '🏛️🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿 "1999 = Devolution Party like it’s 1999!" — Scottish Parliament & Welsh Assembly opened their doors!',
  },
  {
    id: 'fc-ch3-111',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'Who became Prime Minister in 2007, and why was the May 2010 UK General Election historically unusual?',
    back: 'Gordon Brown took over from Tony Blair as Labour PM in 2007. In May 2010, for the first time in the UK since 1974, NO political party won an overall majority — resulting in the Conservative and Liberal Democrat parties forming a coalition government with David Cameron as Prime Minister.',
    memoryHook:
      '🤝🗳️ 2007 = Gordon Brown; May 2010 = Hung Parliament → Cameron Conservative + LibDem Coalition!',
  },
  {
    id: 'fc-ch3-112',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'What global sporting celebration did London host in 2012, and where was the main Olympic Park built?',
    back: 'In 2012, the UK hosted the London 2012 Olympic and Paralympic Games (making London the first city to host the modern Summer Olympics three times — 1908, 1948, and 2012!), with the main Olympic site regenerating Stratford in East London and Team GB finishing 3rd in the Olympic medal table.',
    memoryHook:
      '🥇🔥 London 2012 in Stratford = Britain’s golden summer of Olympics & Paralympics!',
  },
  {
    id: 'fc-ch3-113',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'When did the UK vote in a referendum to leave the European Union, and on what exact date did the UK officially leave the EU ("Brexit")?',
    back: 'In a public referendum held on 23 June 2016, the UK voted (51.9% to 48.1%) to leave the European Union. The UK officially left the EU on 31 January 2020.',
    memoryHook:
      '🗳️🚪 "1973 Joined EEC → June 2016 Voted Leave → 31 January 2020 Officially Left the EU!"',
  },
  {
    id: 'fc-ch3-114',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    visualId: 'history-timeline',
    front: 'What historic reign record did Queen Elizabeth II achieve before her death in 2022, and who succeeded her as monarch?',
    back: 'Queen Elizabeth II reigned for 70 years from 1952 to September 2022 — celebrating her Platinum Jubilee in 2022 and surpassing Queen Victoria to become Britain’s longest-reigning monarch in history! She was succeeded upon her death by her eldest son, His Majesty King Charles III.',
    memoryHook:
      '👑💜 Viva Forever! Elizabeth II = 70 years (1952–2022, longest reign ever + Platinum Jubilee) → Succeeded by King Charles III!',
  },
  {
    id: 'fc-ch3-115',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'Which English composer wrote church and theatre music during the late 17th-century Stuart courts of Charles II, James II, and William & Mary?',
    back: 'Henry Purcell (1659–1695), organist at Westminster Abbey who wrote church music, operas (such as Dido and Aeneas), and theatre music that influenced British composers for centuries.',
    memoryHook:
      '🎹👑 Henry Purcell = Westminster Abbey’s 17th-century Restoration music maestro!',
  },
  {
    id: 'fc-ch3-116',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    front: 'What caused the Massacre of Glencoe in Scotland after the 1688 Glorious Revolution?',
    back: 'When a Scottish clan (the MacDonalds of Glencoe) was late in taking the oath of loyalty to King William III due to bad weather, they were killed in the Massacre of Glencoe — causing deep distrust of the new government among Scottish Jacobites.',
    memoryHook:
      '🏔️❄️ Late oath in the snow → Tragic Massacre of Glencoe → fuelled Scottish Jacobite anger!',
  },
  {
    id: 'fc-ch3-117',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Who was Robert Burns (1759–1796), and what song did he write that is sung across the world at New Year?',
    back: 'Known in Scotland as "The Bard", Scottish poet Robert Burns wrote in the Scots language, English with Scottish words, and standard English — revising old folk songs and writing "Auld Lang Syne", sung when celebrating the New Year (31 December / Hogmanay).',
    memoryHook:
      '🎶🥃 Scotland’s Bard Robert Burns = "Should auld acquaintance be forgot..." (Auld Lang Syne)!',
  },
  {
    id: 'fc-ch3-118',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    front: 'Who was Lord Shaftesbury, and what social causes did Victorian reformers champion?',
    back: 'During the 19th century, factory and workhouse conditions were harsh (long hours, child labour). Reformers like Lord Shaftesbury campaigned to improve working conditions, restrict child labour, and expand schooling for poor children.',
    memoryHook:
      '🧒🏭 Lord Shaftesbury = Victorian champion protecting children from dark mines & mills!',
  },
  {
    id: 'fc-ch3-119',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    front: 'Who were Wilfred Owen and Siegfried Sassoon?',
    back: 'British soldiers and "War Poets" who fought in the trenches of the First World War (1914–1918) and wrote powerful poems describing the harsh human reality and tragedy of war.',
    memoryHook:
      '🪶🪖 Trench poets Wilfred Owen & Siegfried Sassoon turned WWI mud and sorrow into unforgettable verse.',
  },
  {
    id: 'fc-ch3-120',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'What international peacekeeping and coalition operations did British armed forces take part in during the 1990s and 2000s?',
    back: 'Since 1945 British armed forces served in NATO and UN missions: in the 1990s Britain played a leading role in the coalition that liberated Kuwait after Iraq’s invasion (1990–91 Gulf War) and intervened in former Yugoslavia (Bosnia and Kosovo); in the 2000s UK forces fought in Afghanistan and Iraq (leaving combat operations in Iraq in 2009).',
    memoryHook:
      '🪖🌐 1990s = Kuwait liberation + Bosnia/Kosovo peacekeeping; 2000s = Afghanistan & Iraq.',
  },
  {
    id: 'fc-ch3-121',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    front: 'What terror attacks struck London on 7 July 2005 ("7/7")?',
    back: 'On 7 July 2005, four coordinated suicide bombings hit London’s public transport system (three Underground trains and a bus in morning rush hour), killing 52 commuters and injuring hundreds.',
    memoryHook:
      '🚇🕯️ 7/7 (7 July 2005) = London stood resilient together after the morning Tube & bus bombings.',
  },
  {
    id: 'fc-ch3-122',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    visualId: 'history-timeline',
    front: 'Quick Timeline Check (Medieval Big 5): Match 1215, 1284, 1314, 1348, and 1415 to their landmark events!',
    back: '• 1215: Magna Carta (King John)\n• 1284: Statute of Rhuddlan (Edward I annexes Wales)\n• 1314: Battle of Bannockburn (Robert the Bruce wins for Scotland)\n• 1348: The Black Death arrives in Britain (1/3 die)\n• 1415: Battle of Agincourt (Henry V defeats French)',
    memoryHook:
      '⏳🌶️ Medieval Spice Ladder: 1215 Law → 1284 Wales → 1314 Bruce → 1348 Plague → 1415 Henry V (then 1485 Bosworth)!',
  },
];
