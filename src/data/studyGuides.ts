/**
 * Comprehensive 5-Chapter Study Guides with Key Facts, Visual Aid Links, and Fun Memory Hooks!
 * 100% bundled inside the repo for instant offline Tube studying.
 */

import type { StudySection } from '../types/domain';

export const STUDY_SECTIONS: readonly StudySection[] = [
  // CHAPTER 1
  {
    id: 'sg-ch1-principles',
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    title: 'Fundamental Principles & Responsibilities of UK Life',
    keyFacts: [
      'The 5 core British values/principles are: Democracy, The Rule of Law, Individual Liberty, Tolerance of those with different faiths and beliefs, and Participation in community life.',
      'Responsibilities of all UK residents: respect and obey the law, respect the rights of others (including their opinions), treat others with fairness, look after yourself and your family, and look after the area in which you live and the environment.',
      'In return, the UK offers: freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, and a right to join in the election of a government.',
      'Extremism, forced marriage, female genital mutilation (FGM), and domestic violence are completely unacceptable and illegal in the UK.',
    ],
    memoryHook:
      '🌶️ Spice Hook: Think "DR. LIT" for the 5 principles — Democracy, Rule of law, Liberty, Inclusion/Community participation, Tolerance! ("Stop right now" if an exam option says "free healthcare" or "driving a car" is a fundamental constitutional principle—those are services, not the 5 principles!)',
  },
  {
    id: 'sg-ch1-citizenship',
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    title: 'Applying for Settlement (ILR) or Citizenship',
    keyFacts: [
      'The Life in the UK Test consists of 24 questions chosen from the official handbook, lasts 45 minutes, and requires 75% (18 out of 24) to pass.',
      'You normally also need English language proficiency at CEFR level B1 (speaking and listening) unless exempt (e.g. citizen of a majority English-speaking country or holding a qualifying degree taught in English, or aged 65+).',
      'At the Citizenship Ceremony, new citizens swear (religious) or affirm (non-religious) an Oath of Allegiance to His Majesty King Charles III, His Heirs and Successors, and make a Pledge of loyalty to the UK.',
      'In the Channel Islands and Isle of Man, the test uses local island-specific questions alongside UK questions.',
    ],
    memoryHook:
      '🌶️ Spice Hook: "24 hours in a day → 24 questions; 45 RPM vinyl single → 45 minutes; 3 quarters (75% = 18) to pass!" And remember: Oath = Monarch (King Charles III), Pledge = Democracy & Laws!',
  },

  // CHAPTER 2
  {
    id: 'sg-ch2-nations',
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    title: 'The Four Nations: UK vs Great Britain',
    visualId: 'uk-map',
    keyFacts: [
      'The official name of the country is the United Kingdom of Great Britain and Northern Ireland.',
      '"Great Britain" refers ONLY to England, Scotland, and Wales — it does NOT include Northern Ireland!',
      'Capitals: England → London; Scotland → Edinburgh; Wales → Cardiff; Northern Ireland → Belfast.',
      'Major UK cities: England (Birmingham, Liverpool, Leeds, Manchester, Sheffield, Bristol, Newcastle, Plymouth, Southampton, Norwich); Scotland (Glasgow, Aberdeen, Dundee); Wales (Swansea, Newport); Northern Ireland (Derry/Londonderry, Lisburn).',
      'Distance from John O’Groats (north coast of Scotland) to Land’s End (south-west tip of England) is about 870 miles (1,400 km); widest east-to-west is about 300 miles.',
    ],
    memoryHook:
      '🌶️ Spice Hook: "GB = 3 (England + Scotland + Wales), UK = 4 (+ Northern Ireland)!" John O’Groats to Land’s End = 870 miles ("8-7-0, top to toe!").',
  },
  {
    id: 'sg-ch2-symbols',
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    title: 'Union Flag, Patron Saints & National Flowers',
    visualId: 'union-jack',
    keyFacts: [
      'The Union Flag (Union Jack) combines THREE crosses: St George (England — red upright cross on white), St Andrew (Scotland — white diagonal cross on blue), and St Patrick (Ireland — red diagonal cross on white).',
      'Why is there no Welsh dragon on the Union Flag? Because the Principality of Wales was already united with England when the first Union Flag was created in 1606!',
      'Patron Saint Days: St David (Wales) = 1 March; St Patrick (Northern Ireland) = 17 March; St George (England) = 23 April; St Andrew (Scotland) = 30 November. Only Scotland and Northern Ireland have official bank holidays for their patron saint days!',
      'National Flowers: England = Tudor Rose; Scotland = Thistle; Wales = Daffodil (also Leek worn); Northern Ireland = Shamrock.',
    ],
    memoryHook:
      '🌶️ Spice Hook: Geri’s iconic Union Jack dress has 3 crosses! Saint dates in calendar order = "Wales, Ireland, England, Scotland" → "1 Mar (Daffodils burst!), 17 Mar (Shamrock green!), 23 Apr (Shakespeare & St George!), 30 Nov (Winter Scots Andrew!)".',
  },
  {
    id: 'sg-ch2-territories',
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    title: 'Crown Dependencies, Overseas Territories & Currency',
    visualId: 'national-emblems',
    keyFacts: [
      'Crown Dependencies: The Channel Islands (Jersey & Guernsey) and the Isle of Man. They are closely linked to the Crown, have their own governments (e.g., Tynwald in the Isle of Man — oldest continuous parliament in the world!), and are NOT part of the UK.',
      'British Overseas Territories (also linked to the UK, NOT part of it): Falkland Islands, Gibraltar, St Helena, Bermuda, Cayman Islands, British Virgin Islands, Pitcairn, etc.',
      'UK Currency is Pound Sterling (£ = 100p). Coins: 1p, 2p, 5p, 10p, 20p, 50p, £1, £2. Banknotes: £5, £10, £20, £50. Scotland and Northern Ireland have their own banknotes which are valid across the UK (though shops aren’t legally forced to take them).',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Channel + Man = Crown Dependencies (next door in British waters); Gibraltar + Falklands + St Helena = Overseas Territories (far away)! Both are friends of the Crown, NOT inside the UK!"',
  },

  // CHAPTER 3
  {
    id: 'sg-ch3-early-roman',
    chapterId: 'ch3',
    subtopicId: 'ch3-early-roman',
    title: 'Early Britain & Roman Britain (Stone Age to AD 410)',
    visualId: 'history-timeline',
    keyFacts: [
      'First hunter-gatherers lived in Britain in the Stone Age; Britain became permanently separated from mainland Europe by the English Channel around 10,000 years ago.',
      'Neolithic landmarks: Stonehenge (Wiltshire — ceremonial site) and Skara Brae (Orkney, off north coast of Scotland — best-preserved prehistoric village in northern Europe).',
      'Bronze Age (~4,000 years ago): round barrows, bronze tools & gold ornaments. Iron Age: hill forts (like Maiden Castle in Dorset), Celtic language, first coins minted in Britain inscribed with Iron Age kings’ names.',
      'Julius Caesar led failed Roman invasions in 55 BC and 54 BC. Nearly 100 years later in AD 43, Emperor Claudius led the successful Roman invasion!',
      'Boudicca, Queen of the Iceni in eastern England, fought the Romans (statue stands on Westminster Bridge). Scotland was never conquered by Rome — Emperor Hadrian built Hadrian’s Wall (forts include Housesteads and Vindolanda) to keep out the Picts.',
      'Romans stayed nearly 400 years (left in AD 410), building roads, public buildings, law structure, and introducing new plants/animals; first Christian communities appeared in the 3rd–4th centuries AD.',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Caesar tried in 55 (BC), Claudius conquered in 43 (AD)!" Think "Claudius Clapped in 43, Romans Ran in 410!" Skara Brae = Scotland’s Orkney village; Stonehenge = Wiltshire stones!',
  },
  {
    id: 'sg-ch3-anglo-norman',
    chapterId: 'ch3',
    subtopicId: 'ch3-anglo-norman',
    title: 'Anglo-Saxons, Vikings & 1066 Norman Conquest',
    visualId: 'history-timeline',
    keyFacts: [
      'After the Romans left in AD 410, Jutes, Angles, and Saxons from northern Europe settled in Britain (Anglo-Saxon kingdoms by AD 600; famous ship burial of a king with helmet & treasure at Sutton Hoo in Suffolk).',
      'Missionaries spread Christianity: St Patrick (Ireland) & St Columba (founded monastery on Iona off Scotland) in the north/west; St Augustine came from Rome (AD 597) to the south and became the FIRST Archbishop of Canterbury!',
      'Vikings from Denmark and Norway raided first in AD 789, later settling in the east/north (" the Danelaw "). Anglo-Saxon Kingdoms united under King Alfred the Great, who defeated the Vikings.',
      'Scotland united under Kenneth MacAlpin.',
      'In 1066, William, Duke of Normandy (William the Conqueror), defeated Saxon King Harold at the Battle of Hastings — commemorated on the 70-metre embroidered Bayeux Tapestry! 1066 was the LAST successful foreign invasion of England.',
      'William ordered the Domesday Book: a complete record of all towns, villages, people, land, and animals in England.',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Augustine = Archbishop #1 (Canterbury); Columba = Iona Island!" And "10-66, Norman tricks — William conquered Harold, stitched it on the Bayeux Tapestry, and counted every cow in the Domesday Book!"',
  },
  {
    id: 'sg-ch3-middle-ages',
    chapterId: 'ch3',
    subtopicId: 'ch3-middle-ages',
    title: 'The Middle Ages (1066–1485)',
    keyFacts: [
      'In 1215, King John was forced by his noblemen to agree to the Magna Carta ("Charter of Liberties") at Runnymede — establishing that EVEN THE KING IS SUBJECT TO THE LAW!',
      'Parliaments developed so the king could consult nobles and raise taxes: House of Lords (nobles, great landowners, bishops) and House of Commons (knights and wealthy town citizens). In Scotland, Parliament had three "Estates" (lords, clergy, towns).',
      'Edward I annexed Wales (Statute of Rhuddlan, 1284; built Conwy & Caernarfon castles). In Scotland, Robert the Bruce defeated Edward II at the Battle of Bannockburn in 1314 — keeping Scotland independent!',
      '1348 Black Death (plague) killed ONE THIRD of the population of England, Wales, and Scotland — leading to labour shortages, higher wages, new social classes (gentry), and growth of the English language!',
      'Hundred Years War with France (actually lasted 116 years); Henry V won the famous Battle of Agincourt in 1415 despite being vastly outnumbered.',
      'Literature & Printing: Geoffrey Chaucer wrote The Canterbury Tales (in English); John Barbour wrote The Bruce (in Scots); William Caxton was the first person in England to print books using a printing press!',
      'Wars of the Roses (1455–1485): civil war between House of Lancaster (Red Rose) and House of York (White Rose). Ended in 1485 at the Battle of Bosworth Field when Henry Tudor (Lancaster) defeated King Richard III (York), became King Henry VII, and married Elizabeth of York — creating the Tudor Rose (red + white)!',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Magna Carta at 12:15 lunch (1215) = King John obeys the law!" "Bannockburn 1314 = Bruce Beats Britain!" "Black Death 1348 = 1/3 gone!" "Agincourt 1415 = Henry V (4+1=5)!" "Bosworth 1485 = Red + White = Tudor Rose!"',
  },
  {
    id: 'sg-ch3-tudors-stuarts',
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    title: 'Tudors, Stuarts, Civil War & Glorious Revolution (1485–1689)',
    keyFacts: [
      'Henry VIII broke away from Rome when the Pope refused his divorce from Catherine of Aragon, establishing the Church of England with the King as head. His 6 wives: Catherine of Aragon (divorced), Anne Boleyn (beheaded — mother of Elizabeth I), Jane Seymour (died — mother of Edward VI), Anne of Cleves (divorced), Catherine Howard (beheaded), Catherine Parr (survived). Wales was formally united with England under Henry VIII’s Acts of Union.',
      'Edward VI (devout Protestant — Book of Common Prayer); Mary I ("Bloody Mary" — devout Catholic, persecuted Protestants); Elizabeth I (Protestant — restored Church of England, defeated the Catholic Spanish Armada in 1588!).',
      'William Shakespeare (1564–1616, born in Stratford-upon-Avon): wrote A Midsummer Night’s Dream, Hamlet, Macbeth, Romeo and Juliet, and sonnets; Globe Theatre in London.',
      'When Elizabeth I died childless in 1603, her cousin James VI of Scotland became King James I of England, Wales & Ireland (Union of the Crowns — countries remained separate!). Commissioned the King James Bible. In 1605, Guy Fawkes and Catholic plotters failed in the Gunpowder Plot to blow up Parliament & the King (celebrated Nov 5!).',
      'English Civil War began in 1642 between Charles I ("Cavaliers") and Parliament ("Roundheads" — victories at Marston Moor & Naseby). Charles I was executed in 1649; England became a republic ("the Commonwealth") led by Oliver Cromwell as Lord Protector.',
      '1660 Restoration: Charles II returned from exile! 1665 Great Plague; 1666 Great Fire of London (rebuilt with St Paul’s Cathedral designed by Sir Christopher Wren). Habeas Corpus Act (1679 — no unlawful imprisonment). Isaac Newton (gravity, Principia Mathematica) & Royal Society.',
      '1688 Glorious Revolution: Protestant William of Orange (married to James II’s daughter Mary) was invited to invade; Catholic James II fled without fighting! 1689 Bill of Rights confirmed Parliament’s power and banned Catholic monarchs.',
    ],
    memoryHook:
      '🌶️ Spice Hook: Henry VIII’s 6 wives = "Divorced, Beheaded, Died, Divorced, Beheaded, Survived!" Armada = "1588, Spanish fleet sealed its fate!" Fire of London = "1666, six-six-six blazing bricks (Wren built St Paul’s)!" Glorious Revolution = "1688, William walked straight through the gate (bloodless)!"',
  },
  {
    id: 'sg-ch3-empire-industry',
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    title: 'Act of Union, Industrial Revolution & Victorian Era (1707–1901)',
    keyFacts: [
      '1707 Treaty/Act of Union: England (+Wales) and Scotland united into the Kingdom of Great Britain under Queen Anne. Sir Robert Walpole (1721–1742) became the FIRST Prime Minister! In 1746, Bonnie Prince Charlie (Jacobites) was defeated at the Battle of Culloden.',
      'Scottish Enlightenment: Adam Smith (economics — Wealth of Nations), David Hume (philosophy), James Watt (steam power). Industrial pioneers: Richard Arkwright (textile factories & carding machine), George & Robert Stephenson (Rocket railway engine), Isambard Kingdom Brunel (Great Western Railway, Clifton Suspension Bridge, SS Great Britain).',
      'Abolition of Slavery: Quakers formed first anti-slavery groups; William Wilberforce campaigned in Parliament. 1807 Slave Trade Act made trading slaves illegal on British ships; 1833 Emancipation Act abolished slavery throughout the British Empire!',
      '1800 Act of Union (effective 1801) united Ireland with Great Britain, creating the UK of Great Britain and Ireland.',
      'Napoleonic Wars: Admiral Nelson won the Battle of Trafalgar (1805 — killed in battle; HMS Victory in Portsmouth, Nelson’s Column in Trafalgar Square). Duke of Wellington defeated Napoleon at the Battle of Waterloo (1815)!',
      'Queen Victoria reigned nearly 64 years (1837–1901). 1846 repeal of Corn Laws; 1851 Great Exhibition in the Crystal Palace (Hyde Park). Crimean War (1853–56): first war extensively covered by media/photography; Victoria Cross introduced; Florence Nightingale (founder of modern nursing, born in Italy, worked at Scutari hospital).',
      'Literature & Suffrage: Charles Dickens, Robert Louis Stevenson, Thomas Hardy, Rudyard Kipling (born in India — Jungle Book, "If"). Emmeline Pankhurst (born in Manchester, 1858) founded the WSPU in 1903 ("Suffragettes" — civil disobedience). Women aged 30+ got the vote in 1918; equal voting age of 21 with men in 1928!',
    ],
    memoryHook:
      '🌶️ Spice Hook: "1707 = Scotland joins heaven; 1801 = Ireland makes one!" "Walpole = First PM at the pole!" "1805 Nelson’s Dive (Trafalgar), 1815 Wellington’s Win (Waterloo)!" "1807 stop the ships, 1833 set everyone free!" And Ultimate Girl Power: Emmeline Pankhurst → 1918 (30+), 1928 (21 = equal)!',
  },
  {
    id: 'sg-ch3-world-wars',
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    title: 'World War I (1914–1918) & World War II (1939–1945)',
    keyFacts: [
      'WWI triggered in 1914 after assassination of Archduke Franz Ferdinand of Austria. Over 2 million British casualties; on 1 July 1916 alone (Battle of the Somme), ~60,000 British casualties on the first day! Ended at 11:00 am on 11 November 1918 (Armistice Day).',
      'Ireland: 1916 Easter Rising in Dublin against British rule; guerrilla war followed. 1921 Peace Treaty led in 1922 to Ireland splitting into two: Northern Ireland (6 mainly Protestant counties remaining in the UK) and the Irish Free State (later Republic of Ireland in 1949).',
      'Interwar years: 1926 General Strike; 1930s Great Depression (heavy industry/shipbuilding hit hard, while car/aviation industries grew). Alexander Fleming (Scottish doctor) discovered penicillin in 1928! BBC began world’s first regular TV service in 1936.',
      'WWII began in 1939 when Hitler invaded Poland. Winston Churchill became PM in May 1940 ("I have nothing to offer but blood, toil, tears and sweat"; "We shall fight on the beaches"; "Never in the field of human conflict was so much owed by so many to so few").',
      '1940 Evacuation of Dunkirk ("Dunkirk spirit" — over 300,000 men rescued by navy & small civilian boats). Summer 1940 Battle of Britain: RAF (Spitfire & Hurricane planes!) defeated German Luftwaffe in aerial combat, followed by the Blitz (night bombing of London, Coventry, etc.).',
      '6 June 1944 D-Day: Allied forces landed on Normandy beaches. May 1945 VE Day (defeat of Germany); August 1945 VJ Day after atomic bombs on Hiroshima & Nagasaki (British scientists led by Ernest Rutherford had earlier been first to "split the atom").',
    ],
    memoryHook:
      '🌶️ Spice Hook: "1 July 1916 Somme = 60,000 casualties on Day 1; 11am 11/11 1918 = silence!" "1928 = Fleming’s Penicillin + Equal Women’s Vote!" "1940 = Churchill + Dunkirk boats + RAF Spitfires/Hurricanes; 6 June 1944 = D-Day Normandy!"',
  },
  {
    id: 'sg-ch3-modern-britain',
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    title: 'Britain Since 1945 & Contemporary UK',
    keyFacts: [
      '1945 Labour landslide elected Clement Attlee as PM! Based on the 1942 Beveridge Report (William Beveridge — fighting the "Five Giant Evils": Want, Disease, Ignorance, Squalor, Idleness), Health Minister Aneurin ("Nye") Bevan established the National Health Service (NHS) in 1948! R.A. Butler’s 1944 Education Act introduced free secondary education.',
      'Decolonisation & Rebuilding: 1947 independence for India, Pakistan & Ceylon (Sri Lanka). Workers invited from the West Indies (HMT Empire Windrush, 1948), India, Pakistan, and Bangladesh to rebuild Britain.',
      '1950s–1960s ("Swinging Sixties"): Harold Macmillan ("wind of change" speech), Beatles & Rolling Stones, Mary Quant (miniskirt), Concorde supersonic airliner (joint UK-French project), liberalization of laws on divorce, abortion, and abolition of the death penalty (1965/1969).',
      '1973 UK joined the EEC (European Economic Community). Margaret Thatcher (Conservative, 1979–1990) was the UK’s FIRST female Prime Minister (privatization, deregulation, 1982 Falklands War after Argentina invaded). John Major followed (helped start Northern Ireland peace process).',
      'Tony Blair (Labour, 1997–2007): 1998 Good Friday (Belfast) Agreement brought peace/power-sharing in Northern Ireland; 1999 Devolution created the Scottish Parliament & Welsh Assembly! Gordon Brown followed, then David Cameron (2010 Conservative-LibDem coalition), Theresa May, Boris Johnson, Liz Truss, Rishi Sunak, Keir Starmer.',
      '2012 London Olympics & Paralympics; June 2016 EU Referendum voted to leave (UK officially left the EU on 31 January 2020). Queen Elizabeth II became Britain’s longest-reigning monarch (1952–2022, Platinum Jubilee 2022), succeeded by His Majesty King Charles III!',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Beveridge wrote the 1942 blueprint, Attlee won 1945, Nye Bevan birthed the NHS in 1948!" "Thatcher = First female PM (1979)!" "1973 In (EEC), 2016 Vote, Jan 2020 Out (Brexit)!" "1998 Good Friday Peace!"',
  },

  // CHAPTER 4
  {
    id: 'sg-ch4-religion-customs',
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    title: 'Religion, Festivals & British Traditions',
    keyFacts: [
      'The UK is historically Christian with full freedom of religion (Muslim, Hindu, Sikh, Jewish, Buddhist, and non-religious populations). Everyone has the legal right to choose any religion or no religion.',
      'In England, the official state ("established") church is the Church of England (Anglican — King Charles III is Supreme Governor; Archbishop of Canterbury is spiritual leader; senior bishops sit in the House of Lords). In Scotland, the national church is the Church of Scotland (Presbyterian — governed by a General Assembly, Moderator serves 1 year, Monarch is NOT head!). Wales and Northern Ireland have NO established state church.',
      'Religious Festivals: Christmas (25 Dec), Boxing Day (26 Dec), Easter (Good Friday & Easter Monday; Lent = 40 days before Easter, preceded by Shrove Tuesday / Pancake Day), Diwali (Hindu & Sikh "Festival of Lights", Oct/Nov, famously celebrated in Leicester), Hanukkah (Jewish, 8 days), Eid al-Fitr (end of Ramadan fasting) & Eid ul Adha, Vaisakhi (Sikh founding of the Khalsa, 14 April).',
      'Traditions: Valentine’s Day (14 Feb), April Fool’s Day (jokes until 12:00 noon on 1 April!), Mothering Sunday (3 weeks before Easter), Father’s Day (3rd Sunday in June), Halloween (31 Oct), Bonfire Night (5 Nov — Guy Fawkes, 1605), Remembrance Day (11 Nov — wearing red poppies, 2-minute silence at 11am at the Cenotaph in Whitehall), Hogmanay (31 Dec Scottish New Year; 2 Jan is also a bank holiday in Scotland!).',
    ],
    memoryHook:
      '🌶️ Spice Hook: "England = Anglican (King is Governor); Scotland = Presbyterian Kirk (Kirk has NO King as head!); Wales & NI = Free Agents (no state church)!" And April Fool’s jokes STOP at 12 noon sharp ("Stop right now at midday!").',
  },
  {
    id: 'sg-ch4-sports',
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    title: 'Sports Events & Legendary UK Athletes',
    keyFacts: [
      'Modern rules codified in the UK: Football, Rugby (originated at Rugby School; Union = 15 players, League = 13), Cricket, Golf (15th-century Scotland — St Andrews is the "home of golf"), Lawn Tennis, Boxing (Queensberry rules), Modern Olympics inspiration (Much Wenlock).',
      'Major UK Sporting Events: Wimbledon (oldest tennis tournament in the world, grass courts), The Open Championship (only golf "Major" held outside the US), Six Nations Rugby (England, Scotland, Wales, Ireland, France, Italy), Royal Ascot (5-day horse racing attended by the Royal Family), Scottish Grand National & Aintree Grand National (near Liverpool), FA Cup, London Marathon, The Boat Race (Oxford vs Cambridge on the Thames), Cowes Week (sailing off Isle of Wight), Silverstone (British F1 Grand Prix).',
      'Must-Know Heroes: Bobby Moore (captained England to 1966 World Cup victory), Sir Roger Bannister (first man to run a mile in under 4 minutes, 1954), Sir Jackie Stewart (Scottish 3x F1 champion), Jayne Torvill & Christopher Dean (1984 Olympic ice-dancing gold to Bolero), Sir Steve Redgrave (5 consecutive Olympic rowing golds), Dame Kelly Holmes (2004 800m & 1500m golds), Baroness Tanni Grey-Thompson (11 Paralympic wheelchair golds), Dame Ellen MacArthur (fastest solo round-the-world yachtswoman, 2004), Sir Chris Hoy (6 Olympic cycling golds), Sir Bradley Wiggins (first Briton to win Tour de France, 2012), Sir Mo Farah (first Briton to win Olympic 5,000m & 10,000m golds), Dame Jessica Ennis-Hill (2012 heptathlon gold), Sir Andy Murray (first British man to win Wimbledon singles since 1936!).',
    ],
    memoryHook:
      '🌶️ Spice Hook: Sporty Spice Cheat Code — "Bannister broke 4 mins in ’54; Bobby Moore lifted ’66; Redgrave rowed 5 golds; Hoy pedalled 6; Tanni rolled 11 Paralympic golds; Wiggins won the Tour in 2012!"',
  },
  {
    id: 'sg-ch4-arts-culture',
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    title: 'Arts, Literature, Music, Architecture & British Inventions',
    keyFacts: [
      'Writers & Poets: Jane Austen (Pride and Prejudice, Sense and Sensibility), Charles Dickens (Oliver Twist, Great Expectations), Robert Louis Stevenson (Treasure Island, Jekyll and Hyde), Thomas Hardy (Far from the Madding Crowd), Sir Arthur Conan Doyle (Sherlock Holmes), Evelyn Waugh (Brideshead Revisited), Kingsley Amis, Graham Greene, J.R.R. Tolkien (Lord of the Rings — voted country’s best-loved novel in 2003!), Ian Fleming (James Bond), J.K. Rowling (Harry Potter). Poets: William Blake, Lord Byron, Wilfred Owen (WWI), Siegfried Sassoon, Dylan Thomas (Welsh — Under Milk Wood), Robert Burns ("The Bard" of Scotland — Auld Lang Syne, Burns Night 25 Jan with haggis!).',
      'Visual Artists: Hans Holbein, Anthony van Dyck, Thomas Gainsborough (portraits), David Allan ("Scottish Hogarth"), Joseph Turner (modernist landscapes), John Constable (Dedham Vale / Hay Wain), Pre-Raphaelites (Rossetti, Millais, Hunt), Henry Moore (abstract bronze sculptures), John Petts (Welsh engraver), David Hockney (Pop art), Lucian Freud.',
      'Architecture: Tower of London (William the Conqueror), Wren (St Paul’s), Robert Adam (Dumfries House), Gothic Revival — Charles Barry & Augustus Pugin (Houses of Parliament), Sir Edwin Lutyens (Cenotaph in Whitehall & New Delhi), Norman Foster & Richard Rogers & Zaha Hadid (modern). Garden designers: Lancelot "Capability" Brown, Gertrude Jekyll.',
      'Music, Theatre & Awards: Henry Purcell, Handel (German-born Briton — Messiah, Water Music), Gustav Holst (The Planets), Edward Elgar (Pomp and Circumstance / Land of Hope and Glory), Ralph Vaughan Williams, Benjamin Britten. BBC Proms (8 weeks at Royal Albert Hall), Glastonbury, Edinburgh Fringe, National Eisteddfod of Wales. Musicals: Gilbert & Sullivan (HMS Pinafore, Pirates of Penzance), Andrew Lloyd Webber (Phantom, Cats, Evita). Awards: Booker Prize (fiction), Turner Prize (contemporary art at Tate Britain), BRIT Awards & Mercury Prize (music), Laurence Olivier Awards (theatre), BAFTAs (film/TV — classic directors: Hitchcock, Lean, Powell, Ridley Scott).',
      'Key British Inventions: Jet engine (Sir Frank Whittle), Radar (Sir Robert Watson-Watt), TV (John Logie Baird, 1920s), Hovercraft (Sir Christopher Cockrell), ATM cash machine (James Goodfellow & John Shepherd-Barron), World Wide Web (Sir Tim Berners-Lee), Turing Machine (Alan Turing), MRI scanner (Sir Peter Mansfield), Structure of DNA (Francis Crick with Watson, Wilkins & Rosalind Franklin), Cloning mammal Dolly the Sheep (Sir Ian Wilmut & Keith Campbell, 1996), IVF "test-tube baby" (Patrick Steptoe & Robert Edwards, 1978), Insulin co-discovery (John Macleod).',
    ],
    memoryHook:
      '🌶️ Spice Hook: Prize Match = "Booker → Books, Turner → Art, Mercury/BRITs → Music (Spice Girls won 5!), Olivier → West End Theatre, BAFTA → Film!" Inventions = "Whittle Jet, Watson-Watt Radar, Baird TV, Berners-Lee WWW, Wilmut cloned Dolly!"',
  },
  {
    id: 'sg-ch4-landmarks',
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    title: 'Iconic UK Landmarks & National Parks',
    visualId: 'uk-map',
    keyFacts: [
      '15 National Parks across England, Wales, and Scotland! Lake District is England’s largest national park (Lakeermere/Wastwater — Wastwater voted Britain’s favourite view in 2007!). Snowdonia is in North Wales (Snowdon is Wales’s highest mountain). Loch Lomond and the Trossachs is in west-central Scotland.',
      'London Landmarks: Houses of Parliament, Big Ben (nickname for the great bell inside Elizabeth Tower — renamed for Queen Elizabeth II’s Diamond Jubilee in 2012!), London Eye (443 feet / 135m tall on the South Bank), Tower of London (Crown Jewels & Yeoman Warders / "Beefeaters"), St Paul’s Cathedral, Buckingham Palace, O2 Arena.',
      'Regional Gems: Eden Project in Cornwall (giant biomes housing plants from around the world), Giant’s Causeway on the north-east coast of Northern Ireland (volcanic basalt columns ~50 million years old), Edinburgh Castle (dominates Edinburgh skyline), Conwy & Caernarfon Castles (Wales), Angel of the North (Gateshead — Antony Gormley), Clifton Suspension Bridge (Bristol — Brunel).',
      'Crown Jewels, National Trust & National Trust for Scotland (founded 1895 by 3 volunteers — Octavia Hill, Sir Robert Hunter, Canon Hardwicke Rawnsley — to preserve heritage & countryside).',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Big Ben is the BELL inside Elizabeth Tower!" "Eden = Cornwall Biomes; Giant’s Causeway = NI Basalt Columns; Lake District = Largest in England (Wastwater view); Snowdonia = North Wales!"',
  },

  // CHAPTER 5
  {
    id: 'sg-ch5-democracy-constitution',
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    title: 'Unwritten Constitution & Constitutional Monarchy',
    visualId: 'parliament-courts',
    keyFacts: [
      'The UK has an "unwritten" (uncodified) constitution — meaning its rules, laws, and conventions are NOT contained in one single formal document!',
      'King Charles III is the Head of State in a constitutional monarchy: he reigns, while the elected government rules. The Monarch appoints the leader of the majority party in the House of Commons as Prime Minister, meets weekly with the PM, opens each new parliamentary session (King’s Speech outlining the government’s laws), and grants Royal Assent to Acts of Parliament.',
      'The National Anthem is "God Save the King"!',
    ],
    memoryHook:
      '🌶️ Spice Hook: "UK Constitution = Unwritten (never in 1 binder)!" "King = Head of State (ceremonial Crown); PM = Head of Government (10 Downing Street)!"',
  },
  {
    id: 'sg-ch5-parliament-elections',
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    title: 'Westminster Parliament, Cabinet & Voting',
    visualId: 'parliament-courts',
    keyFacts: [
      'House of Commons (elected chamber, MORE powerful): 650 MPs, each representing one parliamentary constituency elected via First Past the Post (candidate with the most votes wins). General Elections must be held AT LEAST every 5 years; if an MP dies or resigns, a "by-election" is held in that constituency.',
      'House of Lords (unelected second chamber): life peers (appointed by the Monarch on PM’s advice), 26 senior Church of England bishops, and a small number of hereditary peers. Checks/amends laws passed by Commons; Commons can ultimately overrule Lords!',
      'The Speaker of the House of Commons is a neutral MP elected by fellow MPs by secret ballot to keep order in debates. Prime Minister’s Questions (PMQs) happens every week on Wednesdays when Parliament sits.',
      'The Cabinet (~20 senior ministers: Chancellor of the Exchequer = economy, Home Secretary = crime/police/immigration, Foreign Secretary = foreign affairs) meets weekly. The second-largest party forms the Official Opposition (Leader of the Opposition appoints the Shadow Cabinet). "Whips" maintain party discipline; "Hansard" is the official verbatim report of Parliament; the civil service is politically neutral.',
      'Who can vote in UK General Elections? UK citizens, qualifying Irish citizens, and qualifying Commonwealth citizens resident in the UK aged 18 or over on the electoral register (updated annually each autumn). Anyone aged 18+ who is a UK/Irish/qualifying Commonwealth citizen can stand as an MP (except armed forces, civil servants, people convicted of certain offences).',
    ],
    memoryHook:
      '🌶️ Spice Hook: "650 MPs in the Commons (First Past the Post, max 5 years); Speaker sits neutral via secret ballot; Hansard = Parliament’s diary; Chancellor = Cash, Home Sec = Borders & Bobbies!"',
  },
  {
    id: 'sg-ch5-devolution',
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    title: 'Devolved Administrations & International Institutions',
    visualId: 'parliament-courts',
    keyFacts: [
      'Devolved administrations since 1998/1999 (all elected via forms of Proportional Representation, NOT First Past the Post!):',
      '1. Scottish Parliament (Edinburgh / Holyrood): 129 MSPs — can pass laws on health, education, justice, planning, and some tax powers.',
      '2. Senedd Cymru / Welsh Parliament (Cardiff): 60 MSs — education, health, agriculture, transport, Welsh language.',
      '3. Northern Ireland Assembly (Stormont, Belfast): 90 MLAs — power-sharing executive; can be suspended by UK government if agreement breaks down.',
      'Westminster retains "reserved" UK-wide powers: defence, foreign affairs, immigration, taxation/social security, and currency.',
      'International Bodies: The Commonwealth (56 mostly former Empire independent states; King Charles III is symbolic Head; voluntary association promoting democracy & good government — cannot suspend/punish by force, though it can suspend membership). United Nations (founded post-WWII, 190+ countries; UK is one of 5 permanent members of the 15-member UN Security Council). NATO (mutual military defence alliance). Council of Europe (46+ European countries, completely separate from the EU — drafted the European Convention on Human Rights, incorporated into UK law via the Human Rights Act 1998!).',
    ],
    memoryHook:
      '🌶️ Spice Hook: Devolved numbers = "Wales 60 (Cardiff), NI 90 (Stormont), Scotland 129 (Holyrood) — all use Proportional Representation!" And huge exam trap: "Council of Europe ≠ EU (UK is STILL in the Council of Europe, NATO, Commonwealth & UN Security Council Top 5)!"',
  },
  {
    id: 'sg-ch5-courts-police-role',
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    title: 'Courts, Police, Legal Ages, Taxes & Community Role',
    visualId: 'parliament-courts',
    keyFacts: [
      'Judiciary is strictly independent of government! Two branches of law: Criminal Law (offences against society — Crown Prosecution Service / Procurator Fiscal in Scotland) and Civil Law (disputes between individuals/groups: housing, consumer rights, debt, employment, family).',
      'Criminal Courts: Minor offences → Magistrates’ Court (England, Wales, NI; unpaid JP volunteers or District Judges) or Justice of the Peace Court (Scotland). Serious offences → Crown Court (judge + 12-person jury in England, Wales, NI) or Sheriff Court / High Court with a 15-person jury in Scotland!Note: Scottish juries have 3 verdicts: Guilty, Not Guilty, and "Not Proven"!',
      'Youth Courts (ages 10–17 in England, Wales & NI; Children’s Hearings System in Scotland). Highest court in the UK for appeals is the UK Supreme Court.',
      'Small Claims Procedure (informal civil claims): up to £10,000 in England & Wales, and up to £5,000 in Scotland & Northern Ireland!',
      'Police & PCCs: Police are operationally independent; citizens in England & Wales elect Police and Crime Commissioners (PCCs) to set local priorities. Dial 999 (or 112) for emergencies, 101 for non-emergencies. Complaints go to the IOPC (England/Wales), PIRC (Scotland), or Police Ombudsman (NI).',
      'Key Legal Ages & Rules: National Lottery & scratchcards = 18+ (updated from 16 in 2021!); Buying alcohol/tobacco = 18+ (16–17s may drink wine/beer/cider with a meal accompanied by an adult in a hotel/restaurant); Moped = 16, Car = 17 (must have valid driving licence, insurance, road tax, and MOT for cars over 3 years old!); TV Licence required for watching live TV on any device or BBC iPlayer (free only for 75+ on Pension Credit).',
      'Taxes & Community: Income Tax (PAYE) + National Insurance (NI number — apply at DWP/Jobcentre Plus; funds state pension & NHS). Council Tax funds local services (rubbish, libraries, local roads). Citizens on the electoral register aged 18–75 (18–65 in Scotland; 18–70 in NI) can be randomly summoned for Jury Service. Ways to volunteer: school governors/parent councils, blood/organ donation (opt-out in UK), Neighbourhood Watch, National Trust.',
    ],
    memoryHook:
      '🌶️ Spice Hook: "Jury = 12 in England/Wales/NI, 15 in Scotland (+ Not Proven verdict)!" "Small Claims = £10k E&W, £5k Scot/NI!" "MOT at age 3, Lottery at 18, Voting at 18!"',
  },
];
