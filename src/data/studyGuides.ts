/**
 * Structured 5-Chapter Study Guide (20 Lessons).
 * Written for learners starting from zero prior knowledge: each lesson opens with a plain-English
 * overview ("The Big Picture"), followed by short, scannable exam takeaways, visual diagrams, and memory tips.
 */

import type { StudySection } from '../types/domain';

export const STUDY_SECTIONS: readonly StudySection[] = [
  // CHAPTER 1
  {
    id: 'sg-ch1-principles',
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    title: 'Fundamental Principles & Responsibilities of UK Life',
    summary:
      'Chapter 1 opens with the five shared values that hold British society together, plus the everyday responsibilities and legal protections that apply to everyone living in the UK.',
    keyFacts: [
      'The 5 fundamental principles of British life: Democracy, The rule of law, Individual liberty, Tolerance of those with different faiths and beliefs, and Participation in community life.',
      'Shared responsibilities of all UK residents: respect and obey the law, respect the rights and opinions of others, treat others with fairness, look after yourself and your family, and care for your local area and the environment.',
      'Freedoms offered in return: freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, and a right to join in electing a government.',
      'Zero-tolerance crimes: extremism, forced marriage (unlike arranged marriage with full consent), female genital mutilation (FGM, including taking someone abroad for it), and domestic violence are all serious criminal offences.',
    ],
    memoryHook:
      'Acronym "DR. LIT" for the 5 principles: Democracy, Rule of law, Liberty, Involvement in community, Tolerance. Exam trap: public services like free healthcare or owning a car are NOT among the 5 fundamental principles.',
  },
  {
    id: 'sg-ch1-citizenship',
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    title: 'Applying for Settlement (ILR) or Citizenship',
    summary:
      'To settle permanently or naturalise as a British citizen, applicants pass the 24-question Life in the UK Test, meet the B1 speaking and listening requirement, and attend a citizenship ceremony.',
    keyFacts: [
      'Exam format: 24 multiple-choice questions chosen from the official handbook, 45 minutes allowed, and 75% (18 out of 24) required to pass.',
      'English requirement: speaking and listening at CEFR level B1 (unless exempt, such as aged 65+, citizen of a majority English-speaking country, or holding a qualifying degree taught in English).',
      'Citizenship ceremony: new citizens swear (religious) or affirm (non-religious) an Oath of Allegiance to His Majesty King Charles III, His Heirs and Successors, and make a Pledge of loyalty to the UK.',
      'Crown Dependencies rule: applicants in the Channel Islands or Isle of Man take a version of the test that includes local island questions alongside UK questions.',
    ],
    memoryHook:
      '24 hours in a day = 24 questions; three-quarters (75% = 18) to pass in 45 minutes. Exam contrast: Oath = allegiance to the Monarch; Pledge = loyalty to democratic values and laws (P for People and Parliament).',
  },

  // CHAPTER 2
  {
    id: 'sg-ch2-nations',
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    title: 'The Four Nations: UK vs Great Britain',
    visualId: 'uk-map',
    summary:
      'One of the most common exam traps is confusing "Great Britain" (the main island of 3 nations) with the "United Kingdom" (all 4 nations including Northern Ireland).',
    keyFacts: [
      'Official country name: The United Kingdom of Great Britain and Northern Ireland (4 nations total).',
      'Great Britain vs UK: "Great Britain" means England, Scotland, and Wales ONLY. It does NOT include Northern Ireland.',
      'Four capital cities: England = London; Scotland = Edinburgh; Wales = Cardiff; Northern Ireland = Belfast.',
      'Major regional cities: England (Birmingham, Liverpool, Leeds, Manchester, Sheffield, Bristol, Newcastle, Plymouth, Southampton, Norwich); Scotland (Glasgow, Aberdeen, Dundee); Wales (Swansea, Newport); Northern Ireland (Derry/Londonderry, Lisburn).',
      'UK dimensions: about 870 miles (1,400 km) from John O’Groats (north coast of Scotland) to Land’s End (south-west tip of England), and about 300 miles across at the widest point.',
    ],
    memoryHook:
      'Exam trap: Great Britain = 3 nations on the main island (England, Scotland, Wales); United Kingdom = 4 (adds Northern Ireland). Top-to-toe length is a countdown: 8-7-0 (870 miles).',
  },
  {
    id: 'sg-ch2-symbols',
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    title: 'Union Flag, Patron Saints & National Flowers',
    visualId: 'union-jack',
    summary:
      'Each of the four UK nations has its own patron saint, feast date, and national flower, and three of their crosses combine to form the Union Flag.',
    keyFacts: [
      'Three crosses on the Union Flag: St George (England, red upright cross on white), St Andrew (Scotland, white diagonal cross on blue), and St Patrick (Ireland, red diagonal cross on white).',
      'Why no Welsh dragon on the Union Flag: Wales was already united with England when the first Union Flag was created in 1606.',
      'Patron Saint dates: St David (Wales) = 1 March; St Patrick (Northern Ireland) = 17 March; St George (England) = 23 April; St Andrew (Scotland) = 30 November.',
      'Bank holiday rule: ONLY Scotland (30 Nov) and Northern Ireland (17 Mar) have official bank holidays for their patron saint days.',
      'National flowers: England = Tudor Rose (red and white); Scotland = Thistle; Wales = Daffodil (and Leek); Northern Ireland = Shamrock.',
    ],
    memoryHook:
      'Calendar order runs spring to winter: 1 March (David, Wales), 17 March (Patrick, NI), 23 April (George, England), 30 November (Andrew, Scotland). Only the two northern nations (Scotland and NI) get an official bank holiday.',
  },
  {
    id: 'sg-ch2-territories',
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    title: 'Crown Dependencies, Overseas Territories & Currency',
    visualId: 'national-emblems',
    summary:
      'Several self-governing islands are closely linked to the Crown or the UK without actually being part of the four-nation United Kingdom.',
    keyFacts: [
      'Crown Dependencies (NOT part of the UK): the Channel Islands (Jersey and Guernsey) and the Isle of Man (whose parliament, Tynwald, is the oldest continuous parliament in the world).',
      'British Overseas Territories (also NOT part of the UK): Falkland Islands, Gibraltar, St Helena, Bermuda, Cayman Islands, British Virgin Islands, and Pitcairn.',
      'UK currency: Pound Sterling (£1 = 100p). Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2. Banknotes: £5, £10, £20, £50.',
      'Scottish & Northern Irish banknotes: valid across the UK, though shops outside those nations are not legally required to accept them.',
    ],
    memoryHook:
      'Nearby islands in British waters (Channel Islands, Isle of Man) = Crown Dependencies; distant territories across the sea (Falklands, Gibraltar, St Helena) = Overseas Territories. Neither group is part of the UK.',
  },

  // CHAPTER 3
  {
    id: 'sg-ch3-early-roman',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    title: 'Early Britain & Roman Britain (Stone Age to AD 410)',
    visualId: 'history-timeline',
    summary:
      'British history begins with Stone Age hunter-gatherers before Britain became an island, moves through Bronze and Iron Age settlements, and enters written history with nearly 400 years of Roman rule.',
    keyFacts: [
      'First inhabitants (Stone Age): hunter-gatherers who followed wild herds; Britain permanently separated from mainland Europe by the English Channel about 10,000 years ago.',
      'First farmers (~6,000 years ago): arrived from south-east Europe and built monuments including Stonehenge (Wiltshire) and Skara Brae (Orkney, best-preserved prehistoric village in northern Europe).',
      'Bronze Age (~4,000 years ago): people lived in roundhouses, made bronze tools and gold ornaments, and buried their dead in tombs called round barrows.',
      'Iron Age: people built defended hill forts (such as Maiden Castle in Dorset), spoke Celtic languages, and minted Britain’s first coins inscribed with Iron Age kings’ names.',
      'Roman invasions: Julius Caesar led failed invasions in 55 BC and 54 BC; nearly 100 years later in AD 43, Emperor Claudius led the successful Roman conquest.',
      'Boudicca’s revolt: Boudicca, Queen of the Iceni in eastern England, led a famous tribal uprising against Roman rule (her statue stands on Westminster Bridge in London).',
      'Hadrian’s Wall: Rome never conquered Scotland; Emperor Hadrian built Hadrian’s Wall (including Housesteads and Vindolanda forts) across northern England to keep out the Picts.',
      'End of Roman rule (AD 410): after ~400 years of building roads, public buildings, laws, and early Christian communities (3rd-4th centuries), Roman armies left in AD 410.',
    ],
    memoryHook:
      'Prehistory countdown: 10,000 yrs ago Channel cut Britain off (think No. 10), 6,000 first farmers, 4,000 Bronze Age (4 letters in GOLD ornaments). Roman contrast: Caesar failed in 55 BC; Claudius Conquered in AD 43 and Romans left in AD 410.',
  },
  {
    id: 'sg-ch3-anglo-norman',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    title: 'Anglo-Saxons, Vikings & 1066 Norman Conquest',
    visualId: 'history-timeline',
    summary:
      'After Rome left in AD 410, Anglo-Saxon kingdoms and Christian monasteries took root, fought off Viking raids under Alfred the Great, and fell in 1066 to William the Conqueror.',
    keyFacts: [
      'Anglo-Saxon settlement: Jutes, Angles, and Saxons from northern Europe established kingdoms in Britain by AD 600; a famous king was buried with treasure and a ship at Sutton Hoo (Suffolk).',
      'Early Christian missionaries: St Patrick (Ireland) and St Columba (Iona monastery off Scotland) spread Christianity in the north/west; St Augustine arrived from Rome in AD 597 as the FIRST Archbishop of Canterbury.',
      'Viking raids & Danelaw: Vikings from Denmark and Norway first raided in AD 789 and later settled in eastern and northern England (an area known as the Danelaw).',
      'Uniting the kingdoms: Anglo-Saxon kingdoms united under King Alfred the Great, who defeated the Vikings; in the north, Kenneth MacAlpin united Scotland against Viking threats.',
      '1066 Battle of Hastings: William, Duke of Normandy (William the Conqueror), defeated Saxon King Harold. Recorded on the Bayeux Tapestry, 1066 was the LAST successful foreign invasion of England.',
      'Domesday Book: ordered by William to record every town, village, landowner, and animal across England.',
    ],
    memoryHook:
      'A = St Augustine, first Archbishop of Canterbury (vs Columba on Iona off Scotland); sequential digits 7-8-9 (AD 789) = first Viking raids; 1066 = Hastings and the last successful foreign invasion of England.',
  },
  {
    id: 'sg-ch3-middle-ages',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    title: 'The Middle Ages (1066 to 1485)',
    visualId: 'history-timeline',
    summary:
      'Between 1066 and 1485, royal power was limited by the Magna Carta, early Parliaments emerged, Wales was annexed while Scotland stayed independent, and the Wars of the Roses brought the Tudors to power.',
    keyFacts: [
      '1215 Magna Carta ("Charter of Liberties"): King John was forced by noblemen to agree that even the king is subject to the law.',
      'Early Parliaments: England developed the House of Lords (nobles, landowners, bishops) and House of Commons (knights and wealthy town citizens); Scotland’s Parliament had three "Estates" (lords, clergy, towns).',
      'Wales & Scotland: Edward I annexed Wales (1284 Statute of Rhuddlan; Conwy and Caernarfon castles), whereas Scottish King Robert the Bruce defeated Edward II at Bannockburn in 1314 to keep Scotland independent.',
      '1348 Black Death: plague killed ONE THIRD of the population of England, Wales, and Scotland, causing labour shortages, higher wages, and the rise of English as the main language.',
      'Agincourt & literature: Henry V beat France at the Battle of Agincourt (1415). Geoffrey Chaucer wrote The Canterbury Tales, John Barbour wrote The Bruce, and William Caxton brought the first printing press to England.',
      'Wars of the Roses (1455-1485): House of Lancaster (Red Rose) vs House of York (White Rose). Ended at Bosworth Field (1485) when Henry Tudor beat Richard III, became Henry VII, and married Elizabeth of York (Tudor Rose).',
    ],
    memoryHook:
      '1215 Magna Carta = signed before 12:15 lunch; 1348 Black Death = starts with 13 and killed 1/3 of the population; 1415 Agincourt = 1+4 gives Henry V (5); Lancaster before York matches Red before White alphabetically.',
  },
  {
    id: 'sg-ch3-tudors-stuarts',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    title: 'Tudors, Stuarts, Civil War & Glorious Revolution (1485 to 1689)',
    visualId: 'history-timeline',
    summary:
      'Two dramatic centuries reshaped religion and monarchy: Henry VIII broke from Rome, Elizabeth I defeated the Spanish Armada, Civil War briefly turned Britain into a republic, and 1688 established constitutional monarchy.',
    keyFacts: [
      'Henry VIII & 6 wives: broke from Rome to divorce Catherine of Aragon and founded the Church of England (wives: Catherine of Aragon, Anne Boleyn, Jane Seymour, Anne of Cleves, Catherine Howard, Catherine Parr). Formally united Wales with England.',
      'Tudor religious swings: Edward VI (Protestant, Book of Common Prayer); Mary I ("Bloody Mary", Catholic, persecuted Protestants); Elizabeth I (Protestant settlement, defeated the Spanish Armada in 1588).',
      'William Shakespeare (1564-1616): born in Stratford-upon-Avon; wrote Hamlet, Macbeth, Romeo and Juliet, A Midsummer Night’s Dream, and sonnets performed at the Globe Theatre.',
      'Union of Crowns (1603) & Gunpowder Plot (1605): James VI of Scotland became James I of England (King James Bible); in Nov 1605 Catholic plotters led by Guy Fawkes failed to blow up Parliament.',
      'Civil War (1642) & Republic (1649-1660): Charles I (Cavaliers) fought Parliament (Roundheads: Marston Moor and Naseby). Charles I was executed in 1649; Oliver Cromwell ruled as Lord Protector.',
      'Restoration (1660) & Great Fire: Charles II returned to the throne; 1665 brought the Great Plague and 1666 the Great Fire of London (St Paul’s Cathedral rebuilt by Sir Christopher Wren).',
      'Law & Science: the 1679 Habeas Corpus Act guaranteed no unlawful imprisonment; the Royal Society promoted science and Sir Isaac Newton published his discoveries on gravity.',
      '1688 Glorious Revolution & 1689 Bill of Rights: Protestant William of Orange and Mary replaced Catholic James II without bloodshed, confirming Parliament’s power.',
    ],
    memoryHook:
      'Henry VIII’s 6 wives: "Divorced, Beheaded, Died, Divorced, Beheaded, Survived." Triple-6 (1666) = Great Fire of London. Double-8 naval pair 100 years apart: 1588 Spanish Armada defeated, 1688 William of Orange invited over.',
  },
  {
    id: 'sg-ch3-empire-industry',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    title: 'Act of Union, Industrial Revolution & Victorian Era (1707 to 1901)',
    visualId: 'history-timeline',
    summary:
      'Britain united politically in 1707 and 1801, pioneered steam power, factories, and railways in the Industrial Revolution, abolished slavery, defeated Napoleon, and expanded globally under Queen Victoria.',
    keyFacts: [
      '1707 Act of Union & First PM: England/Wales and Scotland united into the Kingdom of Great Britain. Sir Robert Walpole (1721-1742) was the FIRST Prime Minister; Bonnie Prince Charlie (Jacobites) lost at Culloden in 1746.',
      'Scottish Enlightenment & Steam: Adam Smith (economics), David Hume (philosophy), and James Watt (steam power) drove modern thinking and industry.',
      'Factories & Railways: Richard Arkwright pioneered textile factories and the carding machine; George & Robert Stephenson built the Rocket locomotive; Isambard Kingdom Brunel designed railways, bridges, and SS Great Britain.',
      'Abolition of slavery: Quakers and MP William Wilberforce campaigned; the 1807 Slave Trade Act banned slave trading on British ships, and the 1833 Emancipation Act abolished slavery across the British Empire.',
      '1801 Union & Napoleonic Wars: the 1800 Act of Union created the UK of Great Britain and Ireland (1801). Admiral Nelson won at Trafalgar (1805, HMS Victory); Duke of Wellington beat Napoleon at Waterloo (1815).',
      'Victorian Age (1837-1901): Queen Victoria reigned nearly 64 years; 1846 Corn Laws repealed; 1851 Great Exhibition at Crystal Palace; Crimean War (1853-56) saw the Victoria Cross created and Florence Nightingale pioneer modern nursing.',
      'Votes for women: Emmeline Pankhurst founded the WSPU in 1903 (Suffragettes). Women aged 30+ won the vote in 1918, and equal voting rights at age 21 with men in 1928.',
    ],
    memoryHook:
      'Walpole = "pole position" (1st PM). Slavery laws: 1807 stops the ships, 1833 rhymes with "free" across the Empire. Suffrage: 1918 gave women votes at 30+; add 10 years (1928) to match men at 21.',
  },
  {
    id: 'sg-ch3-world-wars',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    title: 'World War I (1914 to 1918) & World War II (1939 to 1945)',
    visualId: 'history-timeline',
    summary:
      'Twentieth-century Britain endured two global wars, saw Ireland partition into Northern Ireland and the Irish Free State, discovered penicillin, and stood against Nazi invasion under Winston Churchill.',
    keyFacts: [
      'First World War (1914-1918): sparked by Archduke Franz Ferdinand’s assassination; ~60,000 British casualties on Day 1 of the Battle of the Somme (1 July 1916); ended at 11:00 am on 11 November 1918.',
      'Partition of Ireland (1922): following the 1916 Easter Rising in Dublin and 1921 treaty, Ireland split in 1922 into Northern Ireland (6 counties in the UK) and the Irish Free State (republic in 1949).',
      'Interwar milestones: 1926 General Strike; 1928 Alexander Fleming discovered penicillin; 1930s Great Depression; 1936 BBC launched the world’s first regular TV service.',
      'WWII & Dunkirk (1939-1940): war began in 1939 when Hitler invaded Poland; Winston Churchill became PM in May 1940, and over 300,000 troops were rescued from Dunkirk beaches.',
      'Battle of Britain & Blitz (1940): RAF pilots flying Spitfires and Hurricanes won the aerial Battle of Britain in summer 1940, followed by the Blitz night-bombing of British cities.',
      '1944-1945 Allied victory: D-Day landings in Normandy on 6 June 1944; VE Day (Victory in Europe) in May 1945 and VJ Day (Japan) in August 1945.',
    ],
    memoryHook:
      '1916 Somme (ends in 6) = 60,000 British casualties on Day 1; 11am on 11/11/1918 = Armistice; 1922 ("22") = Ireland split into 2; 6/6/44 = D-Day; 1928 = both Penicillin and women’s equal vote at 21.',
  },
  {
    id: 'sg-ch3-modern-britain',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    title: 'Britain Since 1945 & Contemporary UK',
    visualId: 'history-timeline',
    summary:
      'Post-war Britain built the welfare state and NHS, welcomed Commonwealth workers, joined and later left the European Union, established devolved parliaments, and entered the reign of King Charles III.',
    keyFacts: [
      'Welfare State & NHS: 1942 Beveridge Report targeted "Five Giant Evils"; R.A. Butler’s 1944 Education Act created free secondary school; PM Clement Attlee and Aneurin ("Nye") Bevan launched the NHS in 1948.',
      'Commonwealth & Windrush: 1947 brought independence for India, Pakistan, and Sri Lanka; workers from the West Indies (HMT Empire Windrush, 1948) and South Asia helped rebuild Britain.',
      '1960s & 1970s: "Swinging Sixties" pop culture (Beatles, Rolling Stones, Mary Quant, Anglo-French Concorde) and social law reforms; the UK joined the EEC in 1973.',
      'Margaret Thatcher (1979-1990): Britain’s FIRST female Prime Minister; privatised national industries, curbed trade union powers, and led the UK during the 1982 Falklands War.',
      'Tony Blair & Devolution (1997-2007): the 1998 Good Friday Agreement brought Northern Ireland power-sharing, and 1999 established the Scottish Parliament and Welsh Assembly.',
      'Recent milestones: 2012 London Olympics; June 2016 EU Referendum voted to leave, and the UK left the EU on 31 January 2020; Queen Elizabeth II reigned 1952-2022, succeeded by King Charles III.',
    ],
    memoryHook:
      'Three 1940s "B" reformers: Beveridge = 1942 welfare report, Butler = 1944 free secondary education, Bevan = 1948 NHS. Brexit pair: June 2016 referendum vote, 31 January 2020 official exit.',
  },

  // CHAPTER 4
  {
    id: 'sg-ch4-religion-customs',
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    title: 'Religion, Festivals & British Traditions',
    summary:
      'The UK guarantees freedom of religion or non-belief while maintaining distinct church traditions across its four nations alongside major religious and seasonal holidays.',
    keyFacts: [
      'Church of England: England’s official established church (Anglican). King Charles III is Supreme Governor, the Archbishop of Canterbury is spiritual leader, and 26 bishops sit in the House of Lords.',
      'Scotland, Wales & Northern Ireland: Scotland’s national church is the Presbyterian Church of Scotland (governed by a General Assembly; the Monarch is NOT its head). Wales and Northern Ireland have NO established church.',
      'Christian festivals: Christmas (25 Dec), Boxing Day (26 Dec), Lent (40 days starting after Shrove Tuesday / Pancake Day), Good Friday, and Easter Sunday.',
      'Multi-faith festivals: Diwali (Hindu/Sikh Festival of Lights, Oct/Nov, famous in Leicester), Hanukkah (Jewish, 8 days), Eid al-Fitr & Eid ul Adha (Muslim), and Vaisakhi (Sikh, 14 April).',
      'Spring to Autumn traditions: Valentine’s Day (14 Feb), April Fool’s Day (jokes until noon on 1 April), Mothering Sunday (3 weeks before Easter), Halloween (31 Oct), and Bonfire Night (5 Nov, Guy Fawkes 1605).',
      'Remembrance & New Year: Remembrance Day (11 Nov, red poppies & 11am silence at the Cenotaph) and Hogmanay (31 Dec Scottish New Year; 2 Jan is also a Scottish bank holiday).',
    ],
    memoryHook:
      'Church trap: England = Anglican (Monarch is head); Scotland = Presbyterian (Monarch is NOT head); Wales and NI = no state church. April Fool’s jokes stop at 12:00 noon.',
  },
  {
    id: 'sg-ch4-sports',
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    title: 'Sports Events & Legendary UK Athletes',
    summary:
      'Modern rules for football, rugby, cricket, golf, tennis, and boxing developed in the UK, and the test frequently asks you to match famous British champions to their sport.',
    keyFacts: [
      'Sports codified in Britain: Football, Rugby (Rugby School; Union = 15 players, League = 13), Cricket, Golf (15th-century Scotland; St Andrews is the "home of golf"), Lawn Tennis, and Queensberry Boxing.',
      'Wimbledon, Golf & Rugby: Wimbledon is the oldest tennis tournament (grass courts); The Open is the only golf Major outside the US; Six Nations Rugby pits England, Scotland, Wales, Ireland, France, and Italy.',
      'Racing, Rowing & Sailing: Royal Ascot (5-day horse racing with the Royal Family), Grand National (Aintree steeplechase), FA Cup, Boat Race (Oxford vs Cambridge), Cowes Week (sailing), and Silverstone (F1).',
      'Football & Athletics icons: Bobby Moore (captained England’s 1966 World Cup win), Sir Roger Bannister (first sub-4-minute mile, 1954), Dame Kelly Holmes (2004 800m & 1500m golds), Sir Mo Farah (5,000m & 10,000m golds), and Dame Jessica Ennis-Hill (2012 heptathlon gold).',
      'Rowing & Cycling legends: Sir Steve Redgrave (5 Olympic rowing golds), Sir Chris Hoy (6 Olympic cycling golds), and Sir Bradley Wiggins (first Briton to win the Tour de France, 2012).',
      'Paralympics, F1, Skating, Sailing & Tennis: Baroness Tanni Grey-Thompson (11 Paralympic wheelchair golds), Sir Jackie Stewart (3x F1 champion), Torvill & Dean (1984 Bolero ice-dance), Dame Ellen MacArthur (solo sailing), and Sir Andy Murray (2013 Wimbledon).',
    ],
    memoryHook:
      'Bannister broke the 4-minute mile in 1954 (ends in 4). Gold-medal sum (5 + 6 = 11): Redgrave = 5 rowing golds, Hoy = 6 cycling golds, Tanni Grey-Thompson = 11 Paralympic golds.',
  },
  {
    id: 'sg-ch4-arts-culture',
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    title: 'Arts, Literature, Music, Architecture & British Inventions',
    summary:
      'Chapter 4 tests key British novelists, poets, painters, architects, composers, cultural prizes, and world-changing scientific inventions.',
    keyFacts: [
      'Classic novelists: Jane Austen (Pride and Prejudice), Charles Dickens (Oliver Twist, Great Expectations), Robert Louis Stevenson (Treasure Island, Jekyll and Hyde), Thomas Hardy, and Sir Arthur Conan Doyle (Sherlock Holmes).',
      'Modern fiction & poets: J.R.R. Tolkien (Lord of the Rings, voted best-loved novel in 2003), Ian Fleming (James Bond), J.K. Rowling (Harry Potter); poets Wilfred Owen (WWI), Dylan Thomas (Welsh, Under Milk Wood), and Robert Burns (Scottish Bard, 25 Jan).',
      'Painters & sculptors: Thomas Gainsborough (portraits), J.M.W. Turner & John Constable (landscapes), the Pre-Raphaelites, Henry Moore (bronze sculptures), and David Hockney (Pop art).',
      'Architects & gardens: Sir Christopher Wren (St Paul’s), Robert Adam, Barry & Pugin (Gothic Revival Houses of Parliament), Edwin Lutyens (Cenotaph), Norman Foster, Richard Rogers, Zaha Hadid, and garden designer Capability Brown.',
      'Music & festivals: composers Purcell, Handel (Messiah, Water Music), Holst (The Planets), Elgar, Vaughan Williams, and Britten; festivals include the BBC Proms (Royal Albert Hall), Glastonbury, Edinburgh Fringe, and Welsh National Eisteddfod.',
      'Theatre & cultural prizes: Gilbert & Sullivan and Andrew Lloyd Webber (musicals). Prizes: Man Booker (fiction), Turner (contemporary art), Mercury & BRITs (music), Laurence Olivier (theatre), and BAFTA (film/TV).',
      'Tech & transport inventions: Television (John Logie Baird), Radar (Sir Robert Watson-Watt), Jet engine (Sir Frank Whittle), Hovercraft (Sir Christopher Cockrell), Turing machine (Alan Turing), World Wide Web (Sir Tim Berners-Lee), and ATM (Goodfellow / Shepherd-Barron).',
      'Medical & biology breakthroughs: MRI scanner (Sir Peter Mansfield), DNA structure (Francis Crick with Watson, Wilkins & Franklin), IVF (Steptoe & Edwards, 1978), and Dolly the cloned sheep (Wilmut & Campbell, 1996).',
    ],
    memoryHook:
      'Turner was a painter, so the Turner Prize is for Art (Booker = Books, Mercury = Music, Olivier = Theatre). Inventor hooks: "What’s-on"-Watt = Radar; Whittle = whistles like a Jet engine.',
  },
  {
    id: 'sg-ch4-landmarks',
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    title: 'Iconic UK Landmarks & National Parks',
    visualId: 'uk-map',
    summary:
      'Know where Britain’s largest national parks and famous landmarks sit across England, Scotland, Wales, and Northern Ireland.',
    keyFacts: [
      '15 National Parks across England, Wales & Scotland: Lake District is England’s largest (Wastwater voted Britain’s favourite view); Snowdonia in North Wales (Snowdon is Wales’s highest peak); Loch Lomond and the Trossachs in Scotland.',
      'London landmarks: Houses of Parliament, Big Ben (strictly the great BELL inside Elizabeth Tower, renamed in 2012), London Eye (135m / 443ft on the South Bank), Tower of London (Beefeaters & Crown Jewels), St Paul’s, Buckingham Palace, and the O2.',
      'England & Wales highlights: Eden Project in Cornwall (giant plant biomes), Clifton Suspension Bridge (Bristol, Brunel), Angel of the North (Gateshead, Antony Gormley), and Conwy & Caernarfon Castles in Wales.',
      'Scotland & Northern Ireland icons: Edinburgh Castle overlooking Scotland’s capital, and the Giant’s Causeway on Northern Ireland’s north-east coast (natural volcanic basalt columns).',
      'Heritage charities: the National Trust (founded 1895 by Octavia Hill, Sir Robert Hunter, and Canon Hardwicke Rawnsley) and National Trust for Scotland preserve historic buildings and countryside.',
    ],
    memoryHook:
      'Exam trap: "Big Ben" is the great BELL inside the clock tower; the tower itself is named Elizabeth Tower. Alliteration: Lake District = Largest national park in England.',
  },

  // CHAPTER 5
  {
    id: 'sg-ch5-democracy-constitution',
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    title: 'Unwritten Constitution & Constitutional Monarchy',
    visualId: 'parliament-courts',
    summary:
      'Unlike most countries, the UK has no single written constitutional document, and King Charles III serves as ceremonial Head of State while the elected government governs.',
    keyFacts: [
      'Unwritten (uncodified) constitution: the UK’s constitutional rules, Acts of Parliament, common law, and conventions are NOT written down in one single formal document.',
      'Constitutional Monarchy: King Charles III is Head of State, meaning he reigns ceremonially but does NOT rule or decide government policy.',
      'Monarch’s official duties: appoints the majority party leader as Prime Minister, holds weekly audiences with the PM, opens Parliament with the King’s Speech (written by the government), and gives Royal Assent to bills.',
      'National Anthem: "God Save the King", sung at major royal and national occasions.',
    ],
    memoryHook:
      'Key rule: the King "reigns, does not rule." Even the King’s Speech at the State Opening of Parliament is written by the elected government, not by the Monarch.',
  },
  {
    id: 'sg-ch5-parliament-elections',
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    title: 'Westminster Parliament, Cabinet & Voting',
    visualId: 'parliament-courts',
    summary:
      'Laws at Westminster pass through two chambers: the elected, more powerful House of Commons (650 MPs) and the appointed revising chamber, the House of Lords.',
    keyFacts: [
      'House of Commons (elected, more powerful): 650 MPs elected via First Past the Post (1 MP per constituency). General elections happen at least every 5 years; a "by-election" fills a single seat if an MP dies or resigns.',
      'House of Lords (unelected): life peers (appointed by the Monarch on the PM’s advice), 26 senior Church of England bishops, and a small number of hereditary peers. Suggests amendments, though Commons can overrule it.',
      'Speaker & PMQs: the Speaker is a neutral MP elected by fellow MPs via secret ballot to chair debates; Prime Minister’s Questions (PMQs) happens every Wednesday when Parliament sits.',
      'Cabinet ministers: around 20 senior ministers form the Cabinet, including the Chancellor of the Exchequer (economy), Home Secretary (police, crime, immigration), and Foreign Secretary (foreign affairs).',
      'Opposition, Whips, Hansard & Civil Service: the second-largest party is the Official Opposition (Shadow Cabinet); "Whips" keep party discipline; "Hansard" is the official parliamentary transcript; Civil Servants stay politically neutral.',
      'Who can vote at 18+: UK citizens, qualifying Irish citizens, and qualifying Commonwealth citizens resident in the UK who are registered on the electoral register.',
    ],
    memoryHook:
      'Exam trap: fellow MPs elect the Speaker by secret ballot (not appointed by the PM or King). Chancellor = Cash/economy; Home Secretary = Home security (police, crime, borders).',
  },
  {
    id: 'sg-ch5-devolution',
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    title: 'Devolved Administrations & International Institutions',
    visualId: 'parliament-courts',
    summary:
      'Since 1998-1999, Scotland, Wales, and Northern Ireland have elected their own devolved legislatures for local matters like health and education, while Westminster handles UK-wide defence and foreign affairs.',
    keyFacts: [
      'Devolved voting system: Scotland, Wales, and Northern Ireland ALL elect their devolved legislatures using Proportional Representation (NOT First Past the Post).',
      'Scotland (Edinburgh / Holyrood, 1999): 129 MSPs; legislates on health, education, justice, planning, and some tax powers.',
      'Wales (Cardiff / Senedd Cymru, 1999): 60 MSs; covers education, health, agriculture, transport, and the Welsh language.',
      'Northern Ireland (Belfast / Stormont, 1998): 90 MLAs; power-sharing executive (can be suspended if agreement breaks down).',
      'Reserved Westminster powers: defence, foreign affairs, immigration, currency, and national taxation/social security stay controlled by the UK Parliament.',
      'Global bodies: The Commonwealth (56 voluntary member states, King Charles III as symbolic Head), United Nations (UK is 1 of 5 permanent Security Council members), and NATO (mutual military defence).',
      'Council of Europe (NOT the EU): the UK remains a member of the separate Council of Europe, which created the European Convention on Human Rights (incorporated via the Human Rights Act 1998).',
    ],
    memoryHook:
      'Devolved seat ladder (all Proportional Representation): Wales = 60, NI = 90 (+30), Scotland = 129. Classic trap: the UK left the EU, NOT the Council of Europe (human rights).',
  },
  {
    id: 'sg-ch5-courts-police-role',
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    title: 'Courts, Police, Legal Ages, Taxes & Community Role',
    visualId: 'parliament-courts',
    summary:
      'The final section covers everyday UK law: criminal vs civil courts (and how Scotland differs), police accountability, key age limits, taxes, and jury or community service.',
    keyFacts: [
      'Criminal courts: minor offences go to Magistrates’ Court (England, Wales, NI) or Justice of the Peace Court (Scotland). Serious crimes go to Crown Court (12 jurors) or Scotland’s Sheriff/High Court (15 jurors and 3 verdicts: Guilty, Not Guilty, "Not Proven").',
      'Youth & Civil courts: Youth Courts handle ages 10-17 (Children’s Hearings in Scotland). Civil disputes go to County/High Courts (Sheriff Court in Scotland); Small Claims covers up to £10,000 in England & Wales, and £5,000 in Scotland & NI.',
      'Supreme Court & Police: the UK Supreme Court is the highest appeal court. Police are operationally independent; England & Wales elect Police and Crime Commissioners (PCCs). Call 999 (or 112) for emergencies, 101 for non-emergencies.',
      'Age limits (alcohol, tobacco, lottery): you must be 18+ to buy alcohol, tobacco, or National Lottery tickets/scratchcards. 16-17s may drink beer, wine, or cider with a meal when accompanied by an adult.',
      'Driving & TV Licence: moped licence at 16, car at 17 (needs licence, insurance, road tax, and annual MOT once a car is 3 years old). A TV Licence is needed for live TV or BBC iPlayer (free only if 75+ on Pension Credit).',
      'Taxes & National Insurance: Income Tax (PAYE) and National Insurance (funds state pension & NHS; apply via DWP/Jobcentre Plus) come from wages; Council Tax funds local services.',
      'Jury service & volunteering: registered voters can be called for Jury Service; residents also volunteer as school governors, blood/organ donors (opt-out system), or in Neighbourhood Watch.',
    ],
    memoryHook:
      'Scotland has 3 verdicts (adds "Not Proven") and 12 + 3 = 15 jurors; Small Claims is £10k in England/Wales and halved to £5k in Scotland/NI; "MOT" has 3 letters = required once a car is 3 years old; Lottery = 18+.',
  },
];
