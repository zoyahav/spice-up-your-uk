/**
 * Structured Mock Exams 7–12 (144 unique practice questions: 24 per exam).
 * Focus partition: Resident scenarios & citizenship rules, Crown Dependencies & Overseas Territories,
 * Tudors, Stuarts, Civil War, Restoration, Glorious Revolution, Enlightenment & Industrial Era,
 * UK religious/cultural festivals, modern Olympic/Paralympic legends, poets & 20th-century writers,
 * Devolved administrations, parliamentary mechanics, electoral registration & international bodies.
 * Updated for 2026 facts (His Majesty King Charles III, National Lottery minimum age 18).
 */

import type { PracticeQuestion } from '../../types/domain';

export const QUESTIONS_EXAMS_07_12: readonly PracticeQuestion[] = [
  // ============================================================================
  // MOCK EXAM 7 (q-ex07-01 .. q-ex07-24)
  // ============================================================================
  {
    id: 'q-ex07-01',
    examNumber: 7,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'single',
    prompt:
      'You move into a UK street where your neighbours hold very different religious and political views from yours. Which action best reflects the responsibilities of living in the UK?',
    options: [
      'Insisting that neighbours adopt the majority belief on the street',
      'Respecting their rights and opinions and treating everyone with fairness',
      'Reporting neighbours to the local council for holding different political views',
      'Avoiding all shared community spaces until everyone agrees',
    ],
    correctIndices: [1],
    explanation:
      'Everyone living in the UK shares the responsibility to respect the rights of others, including their opinions and faiths, and to treat fellow residents with fairness to maintain community harmony.',
  },
  {
    id: 'q-ex07-02',
    examNumber: 7,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'multiple',
    prompt:
      'Which TWO of the following may exempt an applicant for UK citizenship or settlement from taking a separate B1 English language speaking and listening test? (Choose TWO)',
    options: [
      'Holding a qualifying academic degree that was taught or researched in English',
      'Having visited London as a tourist at least three times',
      'Being aged 65 or over at the time of application',
      'Owning a motor vehicle registered in Great Britain',
    ],
    correctIndices: [0, 2],
    explanation:
      'Applicants are normally required to prove English at CEFR level B1, unless exempt, for example, citizens of majority English-speaking countries, holders of a qualifying degree taught or researched in English, or applicants aged 65 or over (or with a qualifying long-term physical or mental condition).',
  },
  {
    id: 'q-ex07-03',
    examNumber: 7,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'single',
    prompt: 'What is Tynwald, the parliament of the Isle of Man, famous for being?',
    options: [
      'The largest parliament building in the European Union',
      'A sub-committee of the Scottish Parliament in Edinburgh',
      'The oldest continuous parliamentary assembly in the world',
      'A court reserved exclusively for maritime piracy trials',
    ],
    correctIndices: [2],
    explanation:
      'The Isle of Man is a Crown Dependency with its own government called Tynwald, which has operated for over a thousand years and is the oldest continuous parliamentary assembly in the world.',
    memoryHook:
      'Phonetic link: "Tynwald" sounds like "time-old", matching the world’s oldest continuous parliament.',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex07-04',
    examNumber: 7,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt:
      'Approximately how far is the longest mainland distance in Great Britain, from John O’Groats on the north coast of Scotland to Land’s End in south-west England?',
    options: [
      'About 300 miles (480 km)',
      'About 540 miles (870 km)',
      'About 1,250 miles (2,010 km)',
      'About 870 miles (1,400 km)',
    ],
    correctIndices: [3],
    explanation:
      'The longest distance on the mainland of Great Britain, stretching from John O’Groats in northern Scotland to Land’s End in Cornwall, is about 870 miles (approximately 1,400 km).',
    memoryHook:
      'Digit pattern: 8-7-0 counts downward from top to bottom (870 miles from John O’Groats down to Land’s End).',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex07-05',
    examNumber: 7,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'multiple',
    prompt:
      'Which TWO of the following are Crown Dependencies closely linked to the Crown, with their own governments, rather than being part of the United Kingdom? (Choose TWO)',
    options: [
      'The Channel Islands (such as Jersey and Guernsey)',
      'Orkney and Shetland',
      'The Isle of Wight',
      'The Isle of Man',
    ],
    correctIndices: [0, 3],
    explanation:
      'The Channel Islands and the Isle of Man are Crown Dependencies closely linked to the Crown with their own legislatures and tax systems; unlike the Isle of Wight or Orkney, they are not part of the UK.',
    memoryHook:
      'Think "A Man in the Channel": only the Isle of Man and the Channel Islands are Crown Dependencies (Wight and Orkney are part of the UK).',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex07-06',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'Why did King Henry VIII break away from the Church of Rome and establish the Church of England?',
    options: [
      'The Pope refused to grant him a divorce from his first wife, Catherine of Aragon',
      'He wanted to abolish the monarchy and create a Protestant republic',
      'Spain invaded Kent and forced England to adopt a new Bible',
      'Parliament voted to merge the English Church with the Kirk of Scotland',
    ],
    correctIndices: [0],
    explanation:
      'To secure a male heir, Henry VIII wanted to divorce Catherine of Aragon and marry Anne Boleyn. When the Pope refused, Henry broke away from Rome and established the Church of England with the monarch as head.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex07-07',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'Which of King Henry VIII’s six wives was his last wife and survived him?',
    options: [
      'Jane Seymour',
      'Anne of Cleves',
      'Catherine Parr',
      'Catherine Howard',
    ],
    correctIndices: [2],
    explanation:
      'Catherine Parr was a widow who married Henry VIII late in his life; Henry died before her, making her the "survived" in the famous rhyme of his six wives.',
    memoryHook:
      'Six-wives rhyme: "Divorced, Beheaded, Died, Divorced, Beheaded, Survived." Wife #6, Catherine Parr, beat the par and outlived Henry.',
  },
  {
    id: 'q-ex07-08',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'What major naval victory occurred in 1588 during the reign of Queen Elizabeth I?',
    options: [
      'Admiral Nelson defeated France at the Battle of Trafalgar',
      'The English fleet defeated the Spanish Armada sent to conquer England',
      'Francis Drake captured New York from the Dutch fleet',
      'Henry V sank the French navy before the Battle of Agincourt',
    ],
    correctIndices: [1],
    explanation:
      'In 1588, Protestant England under Elizabeth I defeated the Spanish Armada, a large fleet of ships sent by Catholic Spain to invade England and restore Catholicism.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex07-09',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'boolean',
    prompt:
      'When King James VI of Scotland became King James I of England in 1603, Scotland and England immediately merged into one single country with one shared Parliament.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      '1603 was the "Union of the Crowns": one monarch ruled both realms, but Scotland and England remained separate countries with their own parliaments for another 104 years until the 1707 Act of Union.',
  },
  {
    id: 'q-ex07-10',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Under which monarch was the Act of Union in 1707 agreed, uniting England (with Wales) and Scotland into the Kingdom of Great Britain?',
    options: [
      'Queen Elizabeth I',
      'Queen Victoria',
      'King George III',
      'Queen Anne',
    ],
    correctIndices: [3],
    explanation:
      'Queen Anne had no surviving children, creating uncertainty over the succession in Scotland and England. During her reign, the Act of Union in 1707 created the Kingdom of Great Britain.',
    memoryHook:
      'Rhyme: "In 1707, Queen Anne had a plan to unite Scot and Englishman."',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex07-11',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt: 'Who served from 1721 to 1742 and is regarded as the first Prime Minister in British history?',
    options: [
      'Sir Robert Walpole',
      'Oliver Cromwell',
      'William Wilberforce',
      'The Duke of Wellington',
    ],
    correctIndices: [0],
    explanation:
      'Because the Hanoverian King George I spoke very little English, he relied heavily on his ministers; the most important minister in Parliament became known as the Prime Minister, beginning with Sir Robert Walpole (1721–1742).',
    memoryHook:
      'Wal-POLE took pole position as #1 Prime Minister, and his dates double neatly: 1721 to 1742 (21 x 2 = 42).',
  },
  {
    id: 'q-ex07-12',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'During the 18th-century Scottish Enlightenment, what field did Adam Smith famously develop ideas about?',
    options: [
      'Steam locomotive engineering',
      'Modern nursing and hospital hygiene',
      'Economics',
      'Pre-Raphaelite landscape painting',
    ],
    correctIndices: [2],
    explanation:
      'Adam Smith was a leading thinker of the Scottish Enlightenment who developed influential ideas about economics (such as in The Wealth of Nations) that are still referred to today.',
    memoryHook:
      'Scottish Enlightenment trio: Adam Smith = Economics (wealth), David Hume = Human nature (philosophy), James Watt = Steam power (watts).',
  },
  {
    id: 'q-ex07-13',
    examNumber: 7,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'What landmark business did Bengal-born Sake Dean Mahomed open on George Street in London in 1810?',
    options: [
      'Britain’s first mechanized cotton spinning mill',
      'The Hindoostane Coffee House, the first curry house to open in Britain',
      'The first daily newspaper printing office on Fleet Street',
      'The first maritime insurance exchange for steamships',
    ],
    correctIndices: [1],
    explanation:
      'Sake Dean Mahomed came to Britain in 1782 and in 1810 opened the Hindoostane Coffee House on George Street, London, the very first curry house in Britain.',
  },
  {
    id: 'q-ex07-14',
    examNumber: 7,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt:
      'Diwali, the Hindu and Sikh "Festival of Lights", is celebrated across the UK in October or November. Which English city is especially famous for its huge Diwali celebrations?',
    options: [
      'Norwich',
      'Plymouth',
      'Leicester',
      'Carlisle',
    ],
    correctIndices: [2],
    explanation:
      'Diwali normally falls in October or November and lasts for five days; there is a famous celebration in Leicester that is one of the largest outside India.',
    memoryHook:
      'Alliteration: Festival of Lights = Leicester (both start with L).',
  },
  {
    id: 'q-ex07-15',
    examNumber: 7,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'boolean',
    prompt:
      'On April Fool’s Day (1 April), people in the UK traditionally play jokes on one another only until 12:00 noon.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'In the UK, April Fool’s Day jokes and misleading media stories are traditionally played only until midday (12:00 noon) on 1 April.',
  },
  {
    id: 'q-ex07-16',
    examNumber: 7,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Which British athlete won gold medals in rowing in five consecutive Olympic Games and is considered one of Britain’s greatest Olympians?',
    options: [
      'Sir Steve Redgrave',
      'Sir Roger Bannister',
      'Sir Jackie Stewart',
      'Christopher Dean',
    ],
    correctIndices: [0],
    explanation:
      'Sir Steve Redgrave won gold medals in rowing at five consecutive Olympic Games (from 1984 to 2000) and is celebrated as one of Britain’s greatest Olympic athletes.',
    memoryHook:
      'Alliteration: R for Redgrave = R for Rowing (gold at 5 straight Olympics).',
  },
  {
    id: 'q-ex07-17',
    examNumber: 7,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'What sporting achievement made Dame Ellen MacArthur famous in 2004?',
    options: [
      'Winning double gold in the 800m and 1500m Olympic track finals',
      'Becoming the fastest person to sail around the world single-handed',
      'Captaining the British Olympic ice-dancing team',
      'Winning six Paralympic wheelchair marathons in London',
    ],
    correctIndices: [1],
    explanation:
      'Dame Ellen MacArthur is a British yachtswoman who in 2004 became the fastest person to sail around the world single-handed (solo).',
    memoryHook:
      'Solo-sailing trio trap: Francis Chichester = first with one stop (1967); Robin Knox-Johnston = first non-stop (1969); Ellen MacArthur = fastest (2004).',
  },
  {
    id: 'q-ex07-18',
    examNumber: 7,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO British poets were inspired by their experiences in the First World War to write moving poems about the realities of war? (Choose TWO)',
    options: [
      'Wilfred Owen',
      'Lord Byron',
      'William Blake',
      'Siegfried Sassoon',
    ],
    correctIndices: [0, 3],
    explanation:
      'Wilfred Owen (who wrote Anthem for Doomed Youth) and Siegfried Sassoon were both First World War soldiers whose poetry vividly portrayed the human cost of the trenches, whereas Blake and Byron lived a century earlier.',
    memoryHook:
      'Rhyme: "Owen and Sassoon in the WWI platoon" (Blake and Byron were Romantic poets a century earlier).',
  },
  {
    id: 'q-ex07-19',
    examNumber: 7,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'How many elected Members of the Scottish Parliament (MSPs) sit in the Scottish Parliament in Edinburgh?',
    options: [
      '60 MSPs',
      '90 MSPs',
      '129 MSPs',
      '650 MSPs',
    ],
    correctIndices: [2],
    explanation:
      'The Scottish Parliament sits at Holyrood in Edinburgh and has 129 Members of the Scottish Parliament (MSPs), elected by a form of proportional representation.',
    memoryHook:
      'Climb north up the map as seats grow: Cardiff (south) = 60, Belfast (mid) = 90, Edinburgh (north) = 129.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex07-20',
    examNumber: 7,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'multiple',
    prompt:
      'Which TWO policy areas remain "reserved" under the control of the central UK Parliament in Westminster rather than devolved administrations? (Choose TWO)',
    options: [
      'Defence',
      'Primary and secondary school curricula',
      'Local hospital management',
      'Foreign affairs',
    ],
    correctIndices: [0, 3],
    explanation:
      'Policy and laws governing defence, foreign affairs, immigration, taxation, and social security remain under central UK Parliament control, whereas education and health are devolved.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex07-21',
    examNumber: 7,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'What is the role of the "Shadow Cabinet" in the UK Parliament?',
    options: [
      'Senior civil servants who draft tax budgets in secret before election day',
      'Senior opposition MPs appointed by the Leader of the Opposition to challenge the government and propose alternative policies',
      'Judges of the UK Supreme Court who review bills before Royal Assent',
      'Backbench MPs from the governing party who count votes in Commons lobbies',
    ],
    correctIndices: [1],
    explanation:
      'The Leader of the Opposition (head of the second-largest party in the House of Commons) appoints senior opposition MPs to the Shadow Cabinet to scrutinise Cabinet ministers and put forward alternative policies.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex07-22',
    examNumber: 7,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'boolean',
    prompt:
      'Proceedings in Parliament are published in official reports called Hansard, which the public can read for free online and in large libraries.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Parliamentary debates in both Houses are broadcast on television and published verbatim in official reports known as Hansard, available free online and in reference libraries.',
    memoryHook:
      'Sound link: "Hansard" sounds like "hands hard" writing down every word spoken in Parliament.',
  },
  {
    id: 'q-ex07-23',
    examNumber: 7,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'Who is the ceremonial Head of the 56-member Commonwealth of Nations?',
    options: [
      'The Secretary-General of the United Nations',
      'The UK Prime Minister',
      'His Majesty King Charles III',
      'The Speaker of the House of Commons',
    ],
    correctIndices: [2],
    explanation:
      'The Commonwealth is a voluntary association of 56 independent states (mostly former territories of the British Empire), and His Majesty King Charles III serves as its ceremonial Head.',
  },
  {
    id: 'q-ex07-24',
    examNumber: 7,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'In the UK, people aged 16 and 17 are legally permitted to buy National Lottery tickets and scratchcards.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'You must be aged 18 or over to participate in the National Lottery (including Lotto tickets and scratchcards) in the UK; those under 18 are barred from gambling products.',
    memoryHook:
      'Outdated-notes trap: Older study guides say 16, but the National Lottery minimum age was raised to 18 (matching voting age).',
  },

  // ============================================================================
  // MOCK EXAM 8 (q-ex08-01 .. q-ex08-24)
  // ============================================================================
  {
    id: 'q-ex08-01',
    examNumber: 8,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'multiple',
    prompt:
      'Which TWO of the following practices are serious criminal offences in the UK, even if someone claims they are part of a cultural tradition? (Choose TWO)',
    options: [
      'Forced marriage',
      'Having an arranged marriage where both adults freely consent',
      'Female genital mutilation (FGM)',
      'Choosing to affirm rather than swear in court',
    ],
    correctIndices: [0, 2],
    explanation:
      'Forced marriage (where one or both parties do not or cannot consent) and female genital mutilation (FGM, including taking a girl abroad for FGM) are completely unacceptable and are criminal offences in the UK.',
  },
  {
    id: 'q-ex08-02',
    examNumber: 8,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'Samir does not hold any religious beliefs and is attending his British citizenship ceremony. What can he choose to make instead of swearing a religious Oath of Allegiance?',
    options: [
      'A written petition to the Privy Council',
      'An Affirmation of Allegiance',
      'A statutory tax declaration',
      'A silent bow before the local Mayor without speaking',
    ],
    correctIndices: [1],
    explanation:
      'At a citizenship ceremony, those who do not wish to swear a religious oath ("I swear by Almighty God...") may make a non-religious Affirmation of Allegiance ("I do solemnly, sincerely and truly declare and affirm...") before speaking the Pledge.',
    memoryHook:
      'A for Affirmation = Atheist/Agnostic option (non-religious declaration, whereas the Oath swears by Almighty God).',
  },
  {
    id: 'q-ex08-03',
    examNumber: 8,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'boolean',
    prompt:
      'Northern Ireland and Scotland have their own banknotes which are valid everywhere in the UK, although shops are not legally obliged to accept them.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Certain banks in Scotland and Northern Ireland issue their own Pound Sterling banknotes. They are valid currency across the UK, even though shops and businesses do not have a strict legal obligation to accept them.',
  },
  {
    id: 'q-ex08-04',
    examNumber: 8,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'multiple',
    prompt: 'Which TWO of the following UK cities are located in Scotland? (Choose TWO)',
    options: [
      'Swansea',
      'Aberdeen',
      'Dundee',
      'Lisburn',
    ],
    correctIndices: [1, 2],
    explanation:
      'Edinburgh (the capital), Glasgow, Aberdeen, and Dundee are major cities in Scotland. Swansea is in Wales, and Lisburn is in Northern Ireland.',
    memoryHook:
      'Acronym AGED for Scotland’s four handbook cities: Aberdeen, Glasgow, Edinburgh, Dundee.',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex08-05',
    examNumber: 8,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'single',
    prompt:
      'Which of the following is a British Overseas Territory located in the South Atlantic Ocean rather than being part of the United Kingdom itself?',
    options: [
      'Guernsey',
      'Anglesey',
      'The Hebrides',
      'The Falkland Islands',
    ],
    correctIndices: [3],
    explanation:
      'The Falkland Islands (like Gibraltar and St Helena) are a British Overseas Territory linked to the UK, not part of it. Anglesey is in Wales, the Hebrides are in Scotland, and Guernsey is a Crown Dependency.',
    memoryHook:
      'Geography rule: Distant ocean territories (Falklands, St Helena, Gibraltar) are Overseas Territories ("over the seas"); islands right beside Britain (Channel Islands, Isle of Man) are Crown Dependencies.',
  },
  {
    id: 'q-ex08-06',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'multiple',
    prompt: 'Which TWO of King Henry VIII’s six wives were executed? (Choose TWO)',
    options: [
      'Catherine of Aragon',
      'Anne Boleyn',
      'Anne of Cleves',
      'Catherine Howard',
    ],
    correctIndices: [1, 3],
    explanation:
      'Henry VIII’s second wife, Anne Boleyn (mother of Elizabeth I), and his fifth wife, Catherine Howard (Anne Boleyn’s cousin), were both accused of treasonous adultery and executed.',
    memoryHook:
      'Six-wives rhyme: "Divorced, Beheaded (#2), Died, Divorced, Beheaded (#5), Survived" points to #2 Anne Boleyn and #5 Catherine Howard (cousins).',
  },
  {
    id: 'q-ex08-07',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'During the reign of which Tudor monarch was Wales formally united with England under the Acts for the Government of Wales?',
    options: [
      'Henry VIII',
      'Mary I',
      'Richard III',
      'James I',
    ],
    correctIndices: [0],
    explanation:
      'During Henry VIII’s reign, Wales became formally united with England under the Acts for the Government of Wales; the Welsh sent representatives to the House of Commons and the Welsh legal system was reformed.',
    memoryHook:
      'Exam trap: Edward I annexed Wales militarily in 1284 (Statute of Rhuddlan), whereas Henry VIII formally united Wales with England in Parliament.',
  },
  {
    id: 'q-ex08-08',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'Sir Francis Drake, one of the commanders who fought the Spanish Armada, is also famous because his ship, the Golden Hind, achieved what feat?',
    options: [
      'It carried the first steam engine across the Atlantic to New York',
      'It was one of the first ships to sail right around (circumnavigate) the world',
      'It rescued King Charles II during the Restoration of 1660',
      'It transported the stones of Stonehenge up the River Thames',
    ],
    correctIndices: [1],
    explanation:
      'Elizabethan sailor Sir Francis Drake helped defeat the Spanish Armada and sailed the Golden Hind, one of the first ships to sail completely around the world.',
  },
  {
    id: 'q-ex08-09',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'What was the Gunpowder Plot of November 1605?',
    options: [
      'A Viking raid that burned down Westminster Abbey',
      'A plan by Oliver Cromwell to abolish Christmas celebrations',
      'A failed plot by a group of Catholics led by Guy Fawkes to blow up the King in Parliament',
      'An uprising by Scottish Jacobites at the Battle of Culloden',
    ],
    correctIndices: [2],
    explanation:
      'In 1605, a group of Catholics led by Guy Fawkes failed in their secret plan to blow up the Protestant King James I and the Houses of Parliament with barrels of gunpowder.',
    memoryHook:
      'Digit anchor: 5 November 1605 has a 5 in the date and a 5 at the end of the year ("Remember, remember the 5th of November").',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex08-10',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'At which 1746 battle was Charles Edward Stuart ("Bonnie Prince Charlie"), supported by Scottish clansmen, defeated by King George II’s army?',
    options: [
      'The Battle of Bannockburn',
      'The Battle of Bosworth Field',
      'The Battle of Marston Moor',
      'The Battle of Culloden',
    ],
    correctIndices: [3],
    explanation:
      'In 1745 there was another attempt to put a Stuart king back on the throne; Charles Edward Stuart (Bonnie Prince Charlie) was defeated by George II’s army at the Battle of Culloden in 1746 and fled to Europe.',
    memoryHook:
      'Alliteration C-C-C: Bonnie Prince Charlie and his Clansmen were defeated at Culloden (1746), unlike Bruce at Bannockburn (1314).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex08-11',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Which Scottish pioneer of the Enlightenment and Industrial Revolution made crucial improvements to steam power that helped drive factory machinery and railways?',
    options: [
      'James Watt',
      'Sir Alexander Fleming',
      'John Logie Baird',
      'Robert Adam',
    ],
    correctIndices: [0],
    explanation:
      'James Watt’s work on steam power during the 18th-century Scottish Enlightenment accelerated the Industrial Revolution by providing reliable power for factories, mines, and later transport.',
    memoryHook:
      'Think of the unit of power named after him, the "watt": James Watt supercharged steam power.',
  },
  {
    id: 'q-ex08-12',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt: 'What did the Slave Trade Act of 1807 make illegal?',
    options: [
      'Owning enslaved people anywhere in North or South America',
      'Trading enslaved people in British ships or from British ports',
      'Importing sugar or cotton from outside the Commonwealth',
      'Employing children under 18 in Yorkshire coal mines',
    ],
    correctIndices: [1],
    explanation:
      'In 1807, it became illegal to trade slaves in British ships or from British ports. Slavery itself throughout the British Empire was later abolished completely by the Emancipation Act of 1833.',
    memoryHook:
      'Two-date trap: 1807 banned the slave TRADE (ships and ports); 1833 abolished SLAVERY itself across the Empire ("three-three set them free").',
  },
  {
    id: 'q-ex08-13',
    examNumber: 8,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'boolean',
    prompt:
      'Alongside opening Britain’s first curry house, Sake Dean Mahomed and his Irish wife Jane Daly introduced "shampooing": the Indian art of head massage, to Britain.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Sake Dean Mahomed eloped with Irishwoman Jane Daly in 1786, returned to England, opened the Hindoostane Coffee House in 1810, and also introduced "shampooing" (Indian therapeutic head massage) to Britain.',
  },
  {
    id: 'q-ex08-14',
    examNumber: 8,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'What does the Muslim festival of Eid al-Fitr celebrate?',
    options: [
      'The prophet Ibrahim’s willingness to sacrifice his son',
      'The end of Ramadan, when Muslims have fasted for a month',
      'An eight-day winter festival of candle lighting',
      'The spring harvest on 14 April',
    ],
    correctIndices: [1],
    explanation:
      'Eid al-Fitr celebrates the end of Ramadan, when Muslims have fasted for a month and thank Allah for giving them the strength to complete the fast.',
    memoryHook:
      'Letter link for the two Eids: F in Fitr = Fasting Finishes (end of Ramadan); A in Adha = Abraham/Ibrahim’s willingness to sacrifice.',
  },
  {
    id: 'q-ex08-15',
    examNumber: 8,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt:
      'Which Sikh festival is celebrated on 14 April each year with parades, dancing, and singing to mark the founding of the Sikh community known as the Khalsa?',
    options: [
      'Hanukkah',
      'Hogmanay',
      'Vaisakhi',
      'Ash Wednesday',
    ],
    correctIndices: [2],
    explanation:
      'Vaisakhi is a Sikh festival that celebrates the founding of the Sikh community known as the Khalsa and is celebrated on 14 April each year.',
    memoryHook:
      'Spelling link: Vai-S-a-KH-i contains the consonants S-K-H right inside it, matching the Sikh festival on 14 April.',
  },
  {
    id: 'q-ex08-16',
    examNumber: 8,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'What Olympic triumph did Dame Kelly Holmes achieve at the 2004 Games?',
    options: [
      'Winning gold in the women’s heptathlon in London',
      'Winning five consecutive rowing gold medals',
      'Winning two gold medals for running (800m and 1500m)',
      'Winning mixed doubles lawn tennis gold at Wimbledon',
    ],
    correctIndices: [2],
    explanation:
      'Dame Kelly Holmes won two Olympic gold medals for middle-distance running, in both the 800 metres and 1,500 metres, at the 2004 Athens Olympic Games.',
    memoryHook:
      'H is the 8th letter of the alphabet: Holmes won the 800m (and 1,500m) middle-distance double, whereas Mo "Far-ah" won the far 5,000m and 10,000m.',
  },
  {
    id: 'q-ex08-17',
    examNumber: 8,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'In 2012, Sir Bradley Wiggins became the first Briton to win which prestigious sporting event?',
    options: [
      'The Formula 1 World Championship',
      'The Men’s Singles title at Wimbledon',
      'The Open Golf Championship at St Andrews',
      'The Tour de France',
    ],
    correctIndices: [3],
    explanation:
      'In 2012, cyclist Sir Bradley Wiggins became the very first Briton to win the gruelling Tour de France road race, as well as winning Olympic time-trial gold at London 2012.',
    memoryHook:
      'British cycling split: Bradley Wiggins = first Briton to win the road Tour de France (2012); Chris Hoy = 6 Olympic golds on the indoor track.',
  },
  {
    id: 'q-ex08-18',
    examNumber: 8,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which Welsh poet and writer is best known for his play Under Milk Wood and the poem Do Not Go Gentle into That Good Night?',
    options: [
      'Dylan Thomas',
      'Robert Burns',
      'John Barbour',
      'Thomas Hardy',
    ],
    correctIndices: [0],
    explanation:
      'Swansea-born Welsh poet Dylan Thomas (1914–1953) often read and performed his work in public; among his most famous works are Under Milk Wood (first performed after his death in 1954) and Do Not Go Gentle into That Good Night.',
  },
  {
    id: 'q-ex08-19',
    examNumber: 8,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'How many elected Members of the Senedd (MSs) sit in Senedd Cymru (the Welsh Parliament) in Cardiff?',
    options: [
      '60 members',
      '90 members',
      '129 members',
      '200 members',
    ],
    correctIndices: [0],
    explanation:
      'Senedd Cymru (the Welsh Parliament), based in Cardiff, has 60 elected members (MSs) and exercises devolved legislative powers over matters such as education, health, agriculture, and the Welsh language.',
    memoryHook:
      'Climb north up the map as seats grow: Cardiff Senedd = 60, Belfast Stormont = 90, Edinburgh Holyrood = 129.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex08-20',
    examNumber: 8,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'boolean',
    prompt:
      'Members of the Scottish Parliament, the Senedd in Wales, and the Northern Ireland Assembly are all elected using forms of proportional representation rather than First Past the Post.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'While UK General Elections to the Westminster House of Commons use First Past the Post, the devolved legislatures in Edinburgh, Cardiff, and Belfast all use forms of proportional representation so seats closely reflect party vote shares.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex08-21',
    examNumber: 8,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'In the UK Parliament, what is the role of party "Whips"?',
    options: [
      'Ceremonial guards who lock the gates of the Tower of London each night',
      'MPs or peers appointed by party leaders to maintain party discipline and ensure attendance for parliamentary votes',
      'Independent election officials who count ballot papers at local town halls',
      'Clerks who read bills aloud to the Monarch before Royal Assent',
    ],
    correctIndices: [1],
    explanation:
      'Each major political party appoints "Whips" in the House of Commons and House of Lords to organise party business, ensure MPs or peers attend key votes, and encourage them to vote along party lines.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex08-22',
    examNumber: 8,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'After a General Election, a different political party wins a majority and forms a new UK Government. What happens to career civil servants working in government ministries?',
    options: [
      'They are all dismissed and replaced by members of the winning political party',
      'They must stand for confirmation in local council by-elections',
      'They remain in post and serve the new elected government impartially, as civil servants are politically neutral',
      'They transfer automatically to the Shadow Cabinet',
    ],
    correctIndices: [2],
    explanation:
      'Civil servants in the UK are appointed on merit, are politically neutral, and are bound by core values of integrity, honesty, objectivity, and impartiality, continuing to carry out government policy regardless of which party is elected.',
  },
  {
    id: 'q-ex08-23',
    examNumber: 8,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'boolean',
    prompt:
      'When the United Kingdom left the European Union in January 2020, it also ceased to be a member of the Council of Europe.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'The Council of Europe is completely separate from the European Union. The UK remains a founding and active member of the Council of Europe, which drafted the European Convention on Human Rights.',
  },
  {
    id: 'q-ex08-24',
    examNumber: 8,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'multiple',
    prompt:
      'The UK is one of five permanent members of the 15-member United Nations Security Council. Alongside Russia and China, which TWO other countries are permanent members? (Choose TWO)',
    options: [
      'Germany',
      'The United States',
      'Japan',
      'France',
    ],
    correctIndices: [1, 3],
    explanation:
      'The UN Security Council recommends action during international crises and crises threatening peace. There are 15 members in total, including five permanent members: the UK, the USA, France, Russia, and China.',
    memoryHook:
      'Think WWII Allied victors: the 5 permanent seats belong to the UK, USA, France, Russia, and China (never WWII Axis powers Germany or Japan).',
  },

  // ============================================================================
  // MOCK EXAM 9 (q-ex09-01 .. q-ex09-24)
  // ============================================================================
  {
    id: 'q-ex09-01',
    examNumber: 9,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'single',
    prompt: 'Which of the following is NOT one of the shared responsibilities of everyone living in the UK?',
    options: [
      'Respecting and obeying the law',
      'Looking after yourself and your family',
      'Joining a registered political party',
      'Looking after the area in which you live and the environment',
    ],
    correctIndices: [2],
    explanation:
      'Residents are expected to obey the law, respect others’ rights, treat others fairly, care for themselves and their families, and look after their local area and environment. Joining a political party is completely voluntary.',
  },
  {
    id: 'q-ex09-02',
    examNumber: 9,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'boolean',
    prompt:
      'If you apply for settlement or citizenship in the Channel Islands or the Isle of Man, the Knowledge of Life in the UK test includes local island-specific questions.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Because Jersey, Guernsey, and the Isle of Man are self-governing Crown Dependencies with their own institutions and history, applicants there sit a version of the test that includes local island-specific questions.',
  },
  {
    id: 'q-ex09-03',
    examNumber: 9,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'boolean',
    prompt:
      'In Wales, many people speak Welsh, a completely different Celtic language from English, which is taught in schools and universities and appears alongside English on road signs and official documents.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Welsh is an ancient Celtic language distinct from English; in Wales, public signs and official documents are bilingual in Welsh and English, and Welsh is widely taught in schools and universities.',
  },
  {
    id: 'q-ex09-04',
    examNumber: 9,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'single',
    prompt: 'Which of the following coin denominations is NOT part of UK Pound Sterling (£) currency?',
    options: [
      '20p',
      '25p',
      '50p',
      '£2',
    ],
    correctIndices: [1],
    explanation:
      'Official UK circulating coins are 1p, 2p, 5p, 10p, 20p, 50p, £1, and £2. Unlike US/Canadian "quarters", there is no standard circulating 25p coin.',
    memoryHook:
      '1-2-5 pattern: Every standard UK coin and banknote begins with 1, 2, or 5 (1p, 2p, 5p; 10p, 20p, 50p; £1, £2; £5, £10, £20, £50), never 25!',
  },
  {
    id: 'q-ex09-05',
    examNumber: 9,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'multiple',
    prompt: 'Alongside its capital Cardiff, which TWO of the following cities are in Wales? (Choose TWO)',
    options: [
      'Swansea',
      'Dundee',
      'Newport',
      'Southampton',
    ],
    correctIndices: [0, 2],
    explanation:
      'Cardiff, Swansea, and Newport are key cities in south Wales. Dundee is in Scotland, and Southampton is on the south coast of England.',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex09-06',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'During the reign of Henry VIII’s strongly Protestant son, King Edward VI, what famous text was written to be used in the Church of England?',
    options: [
      'The Domesday Book',
      'The Book of Common Prayer',
      'The Canterbury Tales',
      'Magna Carta',
    ],
    correctIndices: [1],
    explanation:
      'Edward VI was strongly Protestant; during his short reign, Archbishop Thomas Cranmer wrote the Book of Common Prayer to be used in English church services, a version of which is still used in some churches today.',
    memoryHook:
      'Royal church-text trap: Edward VI = Book of Common Prayer; James I = King James Version of the Bible.',
  },
  {
    id: 'q-ex09-07',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'Why did Tudor monarch Queen Mary I become known as "Bloody Mary"?',
    options: [
      'She led English troops personally at the Battle of Bosworth Field',
      'She introduced gruesome surgical theatres to London hospitals',
      'She was a devout Catholic who persecuted Protestants during her reign',
      'She executed her cousin Mary, Queen of Scots, at Fotheringhay',
    ],
    correctIndices: [2],
    explanation:
      'Queen Mary I (daughter of Henry VIII and Catherine of Aragon) was a devout Catholic who sought to reverse the Protestant Reformation and persecuted Protestants, earning her the nickname "Bloody Mary".',
    memoryHook:
      'Tudor faith pendulum: Edward VI (Protestant) -> Mary I (Catholic, persecuted Protestants = "Bloody Mary") -> Elizabeth I (Protestant).',
  },
  {
    id: 'q-ex09-08',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'multiple',
    prompt: 'Which TWO of the following famous plays were written by William Shakespeare? (Choose TWO)',
    options: [
      'A Midsummer Night’s Dream',
      'The Hound of the Baskervilles',
      'Macbeth',
      'Pride and Prejudice',
    ],
    correctIndices: [0, 2],
    explanation:
      'Playwright and poet William Shakespeare (1564–1616) wrote A Midsummer Night’s Dream, Macbeth, Hamlet, and Romeo and Juliet. Pride and Prejudice is by Jane Austen, and The Hound of the Baskervilles is by Sir Arthur Conan Doyle.',
  },
  {
    id: 'q-ex09-09',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'When civil war broke out between King Charles I and Parliament in 1642, what were the two opposing sides called?',
    options: [
      'Lancastrians and Yorkists',
      'Suffragists and Chartists',
      'Jacobites and Hanoverians',
      'Cavaliers (supporting the King) and Roundheads (supporting Parliament)',
    ],
    correctIndices: [3],
    explanation:
      'The English Civil War began in 1642 and split the country into those who supported King Charles I (the Cavaliers) and those who supported Parliament (the Roundheads).',
    memoryHook:
      'Alliteration C-C-C: Cavaliers fought for Charles and the Crown; Roundheads (short-cropped hair) fought for Parliament.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex09-10',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'What area of thought was Scottish Enlightenment figure David Hume especially famous for?',
    options: [
      'Philosophy, particularly ideas about human nature',
      'Designing suspension bridges and ocean steamships',
      'Discovering penicillin mould in London',
      'Writing operas for King George I on the River Thames',
    ],
    correctIndices: [0],
    explanation:
      'David Hume was a major thinker of the 18th-century Scottish Enlightenment whose philosophical ideas about human nature continue to influence philosophers around the world.',
    memoryHook:
      'Name link: David HUME = HUMAN nature (Scottish Enlightenment philosophy).',
  },
  {
    id: 'q-ex09-11',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Originally trained as a barber and wig-maker, how did Richard Arkwright transform British industry in the late 18th century?',
    options: [
      'He invented the jet engine for high-altitude flight',
      'He improved the carding machine, ran efficient spinning mills, and pioneered modern factory management',
      'He built the Channel Tunnel between Kent and France',
      'He discovered the structure of the DNA molecule',
    ],
    correctIndices: [1],
    explanation:
      'Richard Arkwright began working in textiles when wigs went out of fashion; he improved the carding machine (preparing fibres for spinning), used horse and then steam power in mills, and is remembered for efficient, profitable factory management.',
  },
  {
    id: 'q-ex09-12',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt: 'In which year did the Emancipation Act abolish slavery throughout the British Empire?',
    options: [
      '1776',
      '1801',
      '1833',
      '1885',
    ],
    correctIndices: [2],
    explanation:
      'Following decades of campaigning by Quakers and William Wilberforce, the Emancipation Act of 1833 abolished slavery throughout the British Empire, and the Royal Navy patrolled the seas to stop slave ships from other nations.',
    memoryHook:
      'Date rhyme: "1833, three-three sets the Empire free" (whereas 1807 only banned the slave trade on British ships).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex09-13',
    examNumber: 9,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'What did the Act of Union of 1800 (which took effect in 1801) create?',
    options: [
      'The European Economic Community',
      'The Commonwealth of Nations',
      'The Principality of Wales',
      'The United Kingdom of Great Britain and Ireland',
    ],
    correctIndices: [3],
    explanation:
      'In 1801, Ireland became unified with England, Scotland, and Wales under the Act of Union of 1800, creating the United Kingdom of Great Britain and Ireland.',
    memoryHook:
      'Union timeline: 1603 = Union of Crowns; 1707 = Kingdom of Great Britain (+ Scotland); 1801 = United Kingdom of Great Britain and Ireland (+ Ireland).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex09-14',
    examNumber: 9,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt:
      'For how many days is the Jewish festival of Hanukkah celebrated, with a candle lit on a stand called a menorah on each day?',
    options: [
      'Five days',
      'Eight days',
      'Twelve days',
      'Forty days',
    ],
    correctIndices: [1],
    explanation:
      'Hanukkah is in November or December and is celebrated for eight days to remember the Jews’ struggle for religious freedom; on each of the eight days a candle is lit on a menorah.',
    memoryHook:
      'Count the letters: H-A-N-U-K-K-A-H has 8 letters for 8 days and 8 candles (Diwali = 5 days, Lent = 40 days).',
  },
  {
    id: 'q-ex09-15',
    examNumber: 9,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'boolean',
    prompt:
      'Lent is the 40-day period of preparation before Easter, and the day before Lent starts is called Shrove Tuesday (or Pancake Day).',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Lent begins on Ash Wednesday and lasts 40 days before Easter. The day before Lent begins is Shrove Tuesday (Pancake Day), when people traditionally ate pancakes to use up eggs, fat, and milk before fasting.',
  },
  {
    id: 'q-ex09-16',
    examNumber: 9,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Baroness Tanni Grey-Thompson is one of Britain’s most celebrated Paralympians. What sport did she compete in to win 16 Paralympic medals (including 11 golds)?',
    options: [
      'Solo round-the-world yacht racing',
      'Wheelchair racing on the athletics track',
      'Figure skating and ice dancing',
      'Equestrian showjumping',
    ],
    correctIndices: [1],
    explanation:
      'Baroness Tanni Grey-Thompson is an athlete who uses a wheelchair; she won 16 Paralympic medals, including 11 gold medals, in wheelchair racing across five Paralympic Games and won the London Marathon six times.',
  },
  {
    id: 'q-ex09-17',
    examNumber: 9,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Which British distance runner, born in Somalia, became the first Briton to win Olympic gold medals in both the 5,000 metres and 10,000 metres at the 2012 London Olympics?',
    options: [
      'Sir Mo Farah',
      'Sir Chris Hoy',
      'David Weir',
      'Sir Roger Bannister',
    ],
    correctIndices: [0],
    explanation:
      'Sir Mo Farah is a British distance runner born in Somalia who won gold in both the 5,000m and 10,000m at the 2012 London Olympics, the first Briton ever to win Olympic gold in those events.',
    memoryHook:
      'Surname pun: Mo "FAR-ah" ran the FAR distances (5,000m and 10,000m golds, vs Kelly Holmes in the shorter 800m and 1,500m).',
  },
  {
    id: 'q-ex09-18',
    examNumber: 9,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Who wrote The Lord of the Rings, which was voted the country’s best-loved novel in 2003?',
    options: [
      'Ian Fleming',
      'Graham Greene',
      'J.R.R. Tolkien',
      'Evelyn Waugh',
    ],
    correctIndices: [2],
    explanation:
      'J.R.R. Tolkien wrote The Lord of the Rings, which topped the BBC’s nationwide poll in 2003 as the country’s best-loved novel.',
  },
  {
    id: 'q-ex09-19',
    examNumber: 9,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt:
      'Where does the Northern Ireland Assembly meet, and how many elected Members of the Legislative Assembly (MLAs) does it have?',
    options: [
      'Cardiff Bay, with 60 MLAs',
      'Holyrood in Edinburgh, with 129 MLAs',
      'Stormont in Belfast, with 90 MLAs',
      'Guildhall in Derry/Londonderry, with 150 MLAs',
    ],
    correctIndices: [2],
    explanation:
      'The Northern Ireland Assembly meets in the Parliament Buildings at Stormont in Belfast and has 90 elected Members of the Legislative Assembly (MLAs).',
    memoryHook:
      'Climb north up the map as seats grow: Cardiff (Senedd) = 60 MSs; Belfast (Stormont) = 90 MLAs; Edinburgh (Holyrood) = 129 MSPs.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex09-20',
    examNumber: 9,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt:
      'Which of the following matters is NOT devolved to the Scottish Parliament and remains decided by the UK Parliament at Westminster?',
    options: [
      'Education and school policy',
      'Immigration and nationality law',
      'Health services in Scotland',
      'Planning and local civil law',
    ],
    correctIndices: [1],
    explanation:
      'Immigration, defence, foreign affairs, and social security remain reserved to the central UK Parliament at Westminster, while Scotland legislates on health, education, planning, and Scots civil and criminal law.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex09-21',
    examNumber: 9,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt: 'When is a parliamentary "by-election" held in the UK?',
    options: [
      'Every autumn when local councils update the electoral register',
      'Whenever the House of Lords amends a government bill',
      'If an MP dies or resigns between General Elections, to choose a new MP for that constituency',
      'Whenever two parties form a coalition government',
    ],
    correctIndices: [2],
    explanation:
      'If a Member of Parliament (MP) dies or resigns during a parliamentary term, a fresh election called a by-election is held solely in their constituency to elect a replacement MP.',
    memoryHook:
      'Wordplay: When an MP says "bye-bye" mid-term (dies or resigns), that constituency holds a "by-election".',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex09-22',
    examNumber: 9,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'At what time of year is the UK electoral register updated annually, when local councils contact every household?',
    options: [
      'Every January after New Year’s Day',
      'Every April at the start of the tax year',
      'Every July before Parliament’s summer recess',
      'Every autumn (September/October)',
    ],
    correctIndices: [3],
    explanation:
      'To vote in a parliamentary or local election you must be on the electoral register, which is updated every year in September/October (autumn) by local council electoral registration offices.',
    memoryHook:
      'Admin-calendar trap: The tax year starts in April, but household voter registration forms go out every autumn (September/October).',
  },
  {
    id: 'q-ex09-23',
    examNumber: 9,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt:
      'Which UK law incorporated the principles of the European Convention on Human Rights directly into British domestic law?',
    options: [
      'The Habeas Corpus Act 1679',
      'The Bill of Rights 1689',
      'The Great Reform Act 1832',
      'The Human Rights Act 1998',
    ],
    correctIndices: [3],
    explanation:
      'Britain helped draft the Council of Europe’s European Convention on Human Rights, and the Human Rights Act 1998 incorporated its protections into domestic UK law so public bodies and courts must respect Convention rights.',
    memoryHook:
      'Rights-laws timeline: 1679 Habeas Corpus (court hearing for prisoners) -> 1689 Bill of Rights (limited monarch) -> 1998 Human Rights Act (ECHR in UK law).',
  },
  {
    id: 'q-ex09-24',
    examNumber: 9,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Which TWO features distinguish a serious criminal jury trial in Scotland from a Crown Court jury trial in England and Wales? (Choose TWO)',
    options: [
      'A Scottish criminal jury has 15 members instead of 12',
      'Scottish juries are selected only from retired police officers',
      'A Scottish jury can return a third verdict of "not proven" alongside "guilty" and "not guilty"',
      'Defendants in Scotland are not allowed legal representation',
    ],
    correctIndices: [0, 2],
    explanation:
      'In England, Wales, and Northern Ireland, a criminal jury has 12 members and two verdicts (guilty or not guilty). In Scotland, a jury has 15 members and three possible verdicts: guilty, not guilty, and "not proven".',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 10 (q-ex10-01 .. q-ex10-24)
  // ============================================================================
  {
    id: 'q-ex10-01',
    examNumber: 10,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'boolean',
    prompt:
      'In the UK, domestic violence between married partners inside their own home is treated by police as a private family dispute rather than a criminal offence.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'Brutality and violence in the home are serious crimes in the UK. Anyone who is violent towards their partner, whether they are a man or a woman, married or living together, can be prosecuted.',
  },
  {
    id: 'q-ex10-02',
    examNumber: 10,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'To whom do new British citizens swear or affirm their Oath (or Affirmation) of Allegiance during a citizenship ceremony?',
    options: [
      'The Prime Minister and the Cabinet',
      'The Speaker of the House of Commons',
      'His Majesty King Charles the Third, His Heirs and Successors',
      'The Lord Chief Justice of England and Wales',
    ],
    correctIndices: [2],
    explanation:
      'During a UK citizenship ceremony, new citizens swear or affirm that on becoming a British citizen they will be faithful and bear true allegiance to His Majesty King Charles the Third, His Heirs and Successors, according to law.',
    memoryHook:
      'Ceremony split: The Oath/Affirmation pledges allegiance to the Monarch (King Charles III); the Pledge promises loyalty to the UK, its democracy, and its laws.',
  },
  {
    id: 'q-ex10-03',
    examNumber: 10,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'multiple',
    prompt:
      'Which TWO of the following places are British Overseas Territories linked to the UK rather than part of it? (Choose TWO)',
    options: [
      'Gibraltar',
      'Jersey',
      'St Helena',
      'Anglesey',
    ],
    correctIndices: [0, 2],
    explanation:
      'Gibraltar (at the southern tip of Spain) and St Helena (in the South Atlantic) are British Overseas Territories. Jersey is a Crown Dependency, and Anglesey is an island county in Wales.',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex10-04',
    examNumber: 10,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt: 'Derry/Londonderry and Lisburn are major cities in which part of the United Kingdom?',
    options: [
      'Scotland',
      'Northern Ireland',
      'Wales',
      'England',
    ],
    correctIndices: [1],
    explanation:
      'Alongside the capital Belfast, Derry/Londonderry and Lisburn are major cities in Northern Ireland.',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex10-05',
    examNumber: 10,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt: 'Why does the official Union Flag NOT contain the Red Dragon of Wales?',
    options: [
      'Wales voted in a 1999 referendum to remove the dragon from the Union Flag',
      'Only patron saint crosses painted in blue are permitted on UK flags',
      'The Principality of Wales was already united with England when the first Union Flag was created in 1606',
      'The Red Dragon is reserved solely for the personal standard of the Prime Minister',
    ],
    correctIndices: [2],
    explanation:
      'When the first Union Flag was created in 1606 from the flags of Scotland and England, the Principality of Wales was already united with England; therefore the Welsh dragon does not appear on the Union Flag.',
    visualId: 'union-jack',
  },
  {
    id: 'q-ex10-06',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'William Shakespeare was born in Stratford-upon-Avon in England. Which famous London theatre is closely associated with the performance of his plays?',
    options: [
      'The Royal Albert Hall',
      'The Palladium',
      'The Old Bailey',
      'The Globe Theatre',
    ],
    correctIndices: [3],
    explanation:
      'Born in Stratford-upon-Avon in 1564, William Shakespeare worked in London as an actor and playwright, where many of his plays were performed at the open-air Globe Theatre (a modern reconstruction stands near the original site today).',
    memoryHook:
      'Quote link: "All the world’s a stage" points straight to Shakespeare’s Globe ("world") Theatre.',
  },
  {
    id: 'q-ex10-07',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'What lasting religious achievement was commissioned by King James VI and I in the early 17th century?',
    options: [
      'A new English translation of the Bible known as the "King James Version" or "Authorised Version"',
      'The construction of Canterbury Cathedral after the Viking raids',
      'The Act of Toleration granting votes to Quakers and Catholics',
      'The founding of the Salvation Army in East London',
    ],
    correctIndices: [0],
    explanation:
      'One major achievement of King James’s reign was a new translation of the Bible into English, known as the "King James Version" or "Authorised Version": notable as a Protestant translation rather than a Roman Catholic one, and still used in many Protestant churches today.',
  },
  {
    id: 'q-ex10-08',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'King Charles I believed in the "Divine Right of Kings". How did this belief shape his relationship with Parliament before the English Civil War?',
    options: [
      'He invited MPs to elect a new Prime Minister every two years',
      'He believed he was appointed directly by God and tried to rule and raise money for 11 years without Parliament’s approval',
      'He handed control of the Royal Navy and taxation voluntarily to the House of Commons',
      'He merged the English Parliament with the French National Assembly',
    ],
    correctIndices: [1],
    explanation:
      'Charles I believed kings were appointed directly by God ("Divine Right of Kings") and should be able to act without seeking Parliament’s approval; when Parliament challenged his religious and foreign policies, he ruled for 11 years without calling Parliament.',
  },
  {
    id: 'q-ex10-09',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'multiple',
    prompt:
      'At which TWO decisive battles during the English Civil War was King Charles I’s army defeated by Parliament’s forces? (Choose TWO)',
    options: [
      'Marston Moor',
      'Agincourt',
      'Naseby',
      'Waterloo',
    ],
    correctIndices: [0, 2],
    explanation:
      'King Charles I’s Cavalier army was defeated by Parliament’s Roundhead army at the Battles of Marston Moor (1644) and Naseby (1645); by 1646 it was clear that Parliament had won the war.',
    memoryHook:
      'Alphabetical and chronological pair M -> N: Marston Moor (1644) followed by Naseby (1645).',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex10-10',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Just before Queen Victoria came to the throne, father and son George and Robert Stephenson pioneered the railway engine. What was their famous steam locomotive called?',
    options: [
      'The Golden Hind',
      'The Spitfire',
      'The Rocket',
      'HMS Victory',
    ],
    correctIndices: [2],
    explanation:
      'George and Robert Stephenson pioneered the steam railway locomotive, most famously Stephenson’s Rocket, ushering in a major expansion of railway building across the Victorian Empire.',
  },
  {
    id: 'q-ex10-11',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'multiple',
    prompt:
      'Engineer Isambard Kingdom Brunel, originally from Portsmouth, was responsible for which TWO famous Victorian engineering landmarks? (Choose TWO)',
    options: [
      'The Clifton Suspension Bridge spanning the Avon Gorge at Bristol',
      'Hadrian’s Wall across northern England',
      'The Great Western Railway (running from Paddington to the south-west and Wales)',
      'The Thames Barrier at Woolwich',
    ],
    correctIndices: [0, 2],
    explanation:
      'Isambard Kingdom Brunel built tunnels, bridges, railway lines, and ships, including the Great Western Railway (from London Paddington to the south-west and Wales) and the iconic Clifton Suspension Bridge in Bristol.',
    memoryHook:
      'B for Brunel = Bristol and West Country engineering: Great Western Railway, Bristol’s Clifton Suspension Bridge, and the SS Great Britain (in Bristol).',
  },
  {
    id: 'q-ex10-12',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Which Christian group set up the first formal anti-slavery organisations in Britain in the late 1700s and petitioned Parliament to ban the slave trade?',
    options: [
      'The Cavaliers',
      'The Quakers',
      'The Jacobites',
      'The Suffragettes',
    ],
    correctIndices: [1],
    explanation:
      'Although slavery was illegal within Britain itself, British ships and overseas colonies relied heavily on enslaved labour until the Quakers set up the first formal anti-slavery groups in the late 1700s, campaigning alongside Olaudah Equiano and William Wilberforce.',
  },
  {
    id: 'q-ex10-13',
    examNumber: 10,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'boolean',
    prompt:
      'In 1776, 13 British colonies in North America declared their independence, stating that people had a right to establish their own governments after clashing with Britain over taxation.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'By the 1760s–1770s, substantial British colonies in North America objected to being taxed by the British Parliament without representation; 13 colonies declared independence in 1776 and defeated the British army by 1783.',
  },
  {
    id: 'q-ex10-14',
    examNumber: 10,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'What does the Muslim festival of Eid ul Adha remember?',
    options: [
      'The end of the month-long fast of Ramadan',
      'That the prophet Ibrahim was willing to sacrifice his son when God ordered him to',
      'An ancient Celtic harvest marking the start of winter',
      'The translation of religious texts in 1611',
    ],
    correctIndices: [1],
    explanation:
      'Eid ul Adha remembers that the prophet Ibrahim was willing to sacrifice his son when God ordered him to, reminding Muslims of their own commitment to God.',
    memoryHook:
      'Letter link for the two Eids: A in Adha = Abraham/Ibrahim’s willingness to sacrifice; F in Fitr = Fasting Finishes (end of Ramadan).',
  },
  {
    id: 'q-ex10-15',
    examNumber: 10,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'In Scotland, what is 31 December (New Year’s Eve) traditionally called?',
    options: [
      'Vaisakhi',
      'Eisteddfod',
      'Burns Night',
      'Hogmanay',
    ],
    correctIndices: [3],
    explanation:
      'New Year’s Eve on 31 December is called Hogmanay in Scotland, where New Year is often an even bigger celebration than Christmas, and 2 January is also a public bank holiday in Scotland.',
    memoryHook:
      'Scottish winter dates: 31 December = Hogmanay (New Year’s Eve); 25 January = Burns Night (haggis and Robert Burns’s poetry).',
  },
  {
    id: 'q-ex10-16',
    examNumber: 10,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt: 'Which Scottish athlete won six gold and one silver Olympic medals in track cycling?',
    options: [
      'Sir Chris Hoy',
      'Sir Andy Murray',
      'Sir Jackie Stewart',
      'Damon Hill',
    ],
    correctIndices: [0],
    explanation:
      'Sir Chris Hoy is a Scottish track cyclist who won six Olympic gold medals and one silver medal across the 2000, 2004, 2008, and 2012 Olympic Games.',
    memoryHook:
      'Scottish sports trio: Chris Hoy = track cycling (6 Olympic golds); Andy Murray = tennis; Jackie Stewart = Formula 1.',
  },
  {
    id: 'q-ex10-17',
    examNumber: 10,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Dame Jessica Ennis-Hill was one of the stars of the 2012 London Olympics, winning the gold medal in which athletics event?',
    options: [
      'The women’s marathon',
      'The 10,000 metres track final',
      'The heptathlon (seven different track and field events)',
      'Single sculls rowing',
    ],
    correctIndices: [2],
    explanation:
      'Dame Jessica Ennis-Hill won the Olympic gold medal at London 2012 in the heptathlon, an all-round athletics competition comprising seven different track and field events.',
    memoryHook:
      'Letter count: J-E-S-S-I-C-A has 7 letters and Hill starts with H, matching the Heptathlon (7 events).',
  },
  {
    id: 'q-ex10-18',
    examNumber: 10,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Scots around the world celebrate Burns Night on 25 January by eating haggis and reading poems by Robert Burns ("The Bard"). Which famous New Year song did Robert Burns write?',
    options: [
      'Land of Hope and Glory',
      'Rule, Britannia!',
      'Jerusalem',
      'Auld Lang Syne',
    ],
    correctIndices: [3],
    explanation:
      'Scottish poet Robert Burns (1759–1796), known in Scotland as "The Bard", wrote in Scots and English with Scots words; his best-known work is the song Auld Lang Syne, sung as the clock strikes midnight at New Year.',
  },
  {
    id: 'q-ex10-19',
    examNumber: 10,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt:
      'How are ministerial offices allocated in the Northern Ireland Assembly, and what happens if local political leaders cannot agree to work together?',
    options: [
      'Only the single largest party holds all ministries, and the UN takes over if talks fail',
      'Ministerial offices are distributed on a power-sharing basis among the main parties, and the UK Government has the power to suspend the Assembly',
      'Ministers are chosen by lottery from jurors in Belfast for one-year terms',
      'The Irish President in Dublin appoints the Northern Ireland Cabinet directly',
    ],
    correctIndices: [1],
    explanation:
      'Established after the 1998 Belfast (Good Friday) Agreement, the Northern Ireland Assembly operates with a power-sharing executive distributing ministerial posts among the main parties; the UK Government can suspend the Assembly if leaders no longer work together.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex10-20',
    examNumber: 10,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'What legal authority does the Commonwealth have over its 56 independent member countries?',
    options: [
      'It sets income tax rates across all member countries every five years',
      'It has no power over its members, although it can suspend membership',
      'Its courts can strike down Acts passed by the Westminster Parliament',
      'It commands a permanent standing army stationed in London',
    ],
    correctIndices: [1],
    explanation:
      'The Commonwealth is based on core values of democracy, good government, and rule of law, but it has no legal power over its member states, although it can suspend a country’s membership for serious violations.',
  },
  {
    id: 'q-ex10-21',
    examNumber: 10,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'multiple',
    prompt:
      'Alongside UK citizens aged 18 or over on the electoral register, which TWO other groups resident in the UK have the right to vote in all UK parliamentary General Elections? (Choose TWO)',
    options: [
      'Citizens of the Republic of Ireland resident in the UK',
      'Short-stay tourists visiting on a six-month visitor visa',
      'Qualifying Commonwealth citizens resident in the UK',
      'Any adult living anywhere in North or South America',
    ],
    correctIndices: [0, 2],
    explanation:
      'Adult British citizens, together with qualifying citizens of the Commonwealth and citizens of the Republic of Ireland who are resident in the UK and aged 18 or over on the electoral register, can vote in all public UK elections.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex10-22',
    examNumber: 10,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'boolean',
    prompt:
      'When His Majesty King Charles III opens a new parliamentary session with the King’s Speech, he writes the speech personally to announce his own political policies.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'In the UK’s constitutional monarchy, the King opens each parliamentary session and delivers the King’s Speech, which outlines the legislative plans written by the elected Government, not personal political policies of the Monarch.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex10-23',
    examNumber: 10,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'What is the main purpose of the North Atlantic Treaty Organization (NATO), of which the UK is a member?',
    options: [
      'Organising international football and Olympic tournaments',
      'Managing a shared currency across Europe and North America',
      'A group of European and North American countries that have agreed to help each other if they come under attack',
      'Issuing passports to Crown Dependencies in the English Channel',
    ],
    correctIndices: [2],
    explanation:
      'NATO is a group of European and North American countries that have agreed to help defend each other if any member comes under armed attack, aiming to maintain peace between all members.',
  },
  {
    id: 'q-ex10-24',
    examNumber: 10,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'You live in England and need to recover £3,500 owed to you for faulty building work without hiring an expensive lawyer. Up to what claim value can the informal Small Claims Procedure normally be used in England and Wales?',
    options: [
      'Up to £1,000',
      'Up to £5,000',
      'Up to £10,000',
      'Up to £50,000',
    ],
    correctIndices: [2],
    explanation:
      'The Small Claims Procedure is an informal way of helping people settle minor civil disputes without spending a lot of time and money using a lawyer: it covers claims under £10,000 in England and Wales (and £5,000 in Scotland and Northern Ireland).',
    memoryHook:
      'Number trick: England and Wales share a 2-nation jurisdiction = £10,000 (2 x £5k); Scotland (1 nation) = £5,000; Northern Ireland (1 nation) = £5,000.',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 11 (q-ex11-01 .. q-ex11-24)
  // ============================================================================
  {
    id: 'q-ex11-01',
    examNumber: 11,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'single',
    prompt:
      'A resident repeatedly dumps household rubbish in a local woodland and damages public park benches. Which core UK resident responsibility are they failing to uphold?',
    options: [
      'Standing for election as a local councillor',
      'Looking after the area in which you live and the environment',
      'Serving on a 15-person Scottish jury',
      'Attending weekly Prime Minister’s Questions',
    ],
    correctIndices: [1],
    explanation:
      'Everyone living in the UK has a shared responsibility to look after the area in which they live and the environment, including disposing of litter responsibly and respecting public spaces.',
  },
  {
    id: 'q-ex11-02',
    examNumber: 11,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'multiple',
    prompt:
      'In the Citizenship Pledge spoken at a UK citizenship ceremony, which TWO commitments does a new citizen promise? (Choose TWO)',
    options: [
      'To uphold the UK’s democratic values',
      'To vote for the governing political party in every General Election',
      'To observe the UK’s laws faithfully and fulfil their duties and obligations as a British citizen',
      'To surrender any foreign university qualifications',
    ],
    correctIndices: [0, 2],
    explanation:
      'The Citizenship Pledge states: "I will give my loyalty to the United Kingdom and respect its rights and freedoms. I will uphold its democratic values. I will observe its laws faithfully and fulfil my duties and obligations as a British citizen."',
  },
  {
    id: 'q-ex11-03',
    examNumber: 11,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'single',
    prompt: 'Which option lists ALL four standard banknote denominations of Pound Sterling (£) in the UK?',
    options: [
      '£1, £5, £10, and £20',
      '£5, £10, £20, and £50',
      '£5, £10, £25, and £100',
      '£2, £5, £20, and £50',
    ],
    correctIndices: [1],
    explanation:
      'Standard UK banknotes are issued in denominations of £5, £10, £20, and £50, while £1 and £2 are coins (though some Scottish/NI banks also print £1 or £100 notes locally, the four standard UK denominations are £5, £10, £20, and £50).',
    memoryHook:
      'US-expat trap: Unlike the $1 bill, £1 and £2 are coins in the UK; standard banknotes start at £5 (£5, £10, £20, £50).',
  },
  {
    id: 'q-ex11-04',
    examNumber: 11,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt: 'Roughly what is the widest distance across Great Britain from the east coast to the west coast?',
    options: [
      'About 90 miles',
      'About 300 miles',
      'About 620 miles',
      'About 870 miles',
    ],
    correctIndices: [1],
    explanation:
      'While Great Britain is about 870 miles long from John O’Groats to Land’s End, its widest distance from the east coast to the west coast is about 300 miles.',
    memoryHook:
      'Visual trick: Turn the W in "Wide" on its side and it looks like a 3 -> about 300 miles wide.',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex11-05',
    examNumber: 11,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'multiple',
    prompt:
      'All four nations of the UK celebrate patron saints’ days, but in which TWO nations is the patron saint’s day an official public (bank) holiday? (Choose TWO)',
    options: [
      'England (St George’s Day, 23 April)',
      'Scotland (St Andrew’s Day, 30 November)',
      'Wales (St David’s Day, 1 March)',
      'Northern Ireland (St Patrick’s Day, 17 March)',
    ],
    correctIndices: [1, 3],
    explanation:
      'Only Scotland (30 November, St Andrew’s Day) and Northern Ireland (17 March, St Patrick’s Day) have official public holidays for their patron saints’ days (though in Scotland not all businesses close).',
    memoryHook:
      'North vs South rule: Only the two northern nations, Northern Ireland (17 Mar) and Scotland (30 Nov), have official bank holidays for their patron saints; England and Wales do not.',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex11-06',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'What happened to Catholic monarch Mary, Queen of Scots, after she fled Scotland to England during the reign of her Protestant cousin, Queen Elizabeth I?',
    options: [
      'She married Francis Drake and settled peacefully in Plymouth',
      'Elizabeth gave her an army to reconquer Edinburgh immediately',
      'She was kept prisoner for 20 years and eventually executed after being suspected of plotting against Elizabeth I',
      'She sailed to North America to found the colony of Virginia',
    ],
    correctIndices: [2],
    explanation:
      'Mary Stuart ("Mary, Queen of Scots") fled to England giving her throne to her infant son James VI; Elizabeth I saw Mary as a Catholic rival to the English throne, kept her prisoner for 20 years, and had her executed in 1587 for treasonous plotting.',
    memoryHook:
      'Two-Marys trap: Mary I ("Bloody Mary") was Henry VIII’s daughter who ruled England; Mary, Queen of Scots (Mary Stuart) was Elizabeth I’s cousin, imprisoned 20 years and executed in 1587.',
  },
  {
    id: 'q-ex11-07',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'After King Charles I was executed in 1649 and England was declared a republic called the Commonwealth, what title was given to Oliver Cromwell as leader of the republic?',
    options: [
      'First Prime Minister',
      'Speaker of the Estates',
      'Lord Protector',
      'Supreme Governor',
    ],
    correctIndices: [2],
    explanation:
      'Following Charles I’s execution in 1649 and Cromwell’s military campaigns in Ireland and Scotland, Oliver Cromwell was given the title of Lord Protector in the 1650s and ruled until his death in 1658.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex11-08',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'In May 1660, Parliament invited which exiled monarch back from the Netherlands to reclaim the throne in the event known as "The Restoration"?',
    options: [
      'King Charles II',
      'King William III',
      'Bonnie Prince Charlie',
      'King Henry VII',
    ],
    correctIndices: [0],
    explanation:
      'After Oliver Cromwell died and his son Richard failed to provide clear leadership, Parliament invited the executed king’s son, Charles II (who had famously hidden in an oak tree after the Battle of Worcester in 1651), back from exile in 1660.',
    memoryHook:
      'Netherlands trap: 1660 Restoration = exiled King Charles II invited back; 1688 Glorious Revolution = Dutch Prince William III of Orange invited over to replace James II.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex11-09',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'After the Great Fire of London in 1666 destroyed much of the city, which famous architect designed the rebuilt St Paul’s Cathedral?',
    options: [
      'Sir Edwin Lutyens',
      'Charles Barry',
      'Robert Adam',
      'Sir Christopher Wren',
    ],
    correctIndices: [3],
    explanation:
      'In 1665 London suffered the Great Plague, and in 1666 a great fire destroyed much of the city, including the original St Paul’s Cathedral. London was rebuilt with a magnificent new St Paul’s designed by Sir Christopher Wren.',
    memoryHook:
      'Picture a wren (bird) perched atop St Paul’s dome: Christopher Wren rebuilt St Paul’s after 1666 (Barry = Parliament, Lutyens = Cenotaph).',
  },
  {
    id: 'q-ex11-10',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt: 'Why was the Habeas Corpus Act of 1679 a vital milestone in British legal history?',
    options: [
      'It gave every landowner the right to print banknotes',
      'It guaranteed that no person could be held prisoner unlawfully and every prisoner has a right to a court hearing',
      'It introduced trial by 15 jurors in England and Wales',
      'It abolished the death penalty for all offences',
    ],
    correctIndices: [1],
    explanation:
      'Habeas corpus is Latin for "you must present the person in court". Passed in 1679 during Charles II’s reign, the Act ensured no one could be locked up unlawfully without being brought before a judge.',
    memoryHook:
      'Latin root: "Corpus" means body (like corpse). Habeas Corpus literally means "present the body in court" so no one can be locked up unlawfully.',
  },
  {
    id: 'q-ex11-11',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Which evangelical Christian and Member of Parliament played a leading part in turning public and parliamentary opinion against the slave trade in the late 18th and early 19th centuries?',
    options: [
      'William Wilberforce',
      'Richard Arkwright',
      'Sir Robert Walpole',
      'Aneurin Bevan',
    ],
    correctIndices: [0],
    explanation:
      'William Wilberforce was an evangelical Christian and MP who worked tirelessly alongside abolitionists and the Quakers to pass the 1807 Slave Trade Act and pave the way for the 1833 Emancipation Act.',
  },
  {
    id: 'q-ex11-12',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Who commanded the British fleet to victory against combined French and Spanish fleets at the Battle of Trafalgar in 1805 aboard HMS Victory?',
    options: [
      'The Duke of Wellington',
      'Sir Francis Drake',
      'Admiral Horatio Nelson',
      'Lord Louis Mountbatten',
    ],
    correctIndices: [2],
    explanation:
      'In 1805, Admiral Nelson led the Royal Navy to victory over the combined French and Spanish fleets at the Battle of Trafalgar (where he was killed in action). Nelson’s Column stands in Trafalgar Square, and HMS Victory can be visited in Portsmouth.',
    memoryHook:
      'Napoleonic pair (10 years apart): 1805 Trafalgar at SEA = Admiral Nelson (Navy); 1815 Waterloo on LAND = Duke of Wellington.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex11-13',
    examNumber: 11,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'boolean',
    prompt:
      'Under the 1707 Act of Union with England, Scotland abolished its own legal system, education system, and Presbyterian Church.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'Although Scotland was no longer an independent country with a separate parliament after the 1707 Act of Union, it expressly kept its own distinct legal and education systems and its Presbyterian Church of Scotland.',
  },
  {
    id: 'q-ex11-14',
    examNumber: 11,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'single',
    prompt: 'When is Mothering Sunday (Mother’s Day) celebrated each year in the UK?',
    options: [
      'The second Sunday in May',
      'The Sunday three weeks before Easter',
      'The third Sunday in June',
      'Always on 14 February',
    ],
    correctIndices: [1],
    explanation:
      'In the UK, Mothering Sunday is celebrated on the Sunday three weeks before Easter (unlike in the US, where Mother’s Day is in May). Father’s Day in the UK is the third Sunday in June.',
    memoryHook:
      'Halfway through 6-week Lent = 3 weeks before Easter (don’t pick the US May date!).',
  },
  {
    id: 'q-ex11-15',
    examNumber: 11,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO poets from the late 18th and early 19th centuries wrote The Tyger ("Tyger! Tyger! burning bright") and She Walks in Beauty respectively? (Choose TWO)',
    options: [
      'William Blake',
      'Wilfred Owen',
      'Lord Byron',
      'Dylan Thomas',
    ],
    correctIndices: [0, 2],
    explanation:
      'Artist and poet William Blake wrote The Tyger (and the lines that became the hymn Jerusalem), while Romantic poet Lord Byron wrote She Walks in Beauty and Childe Harold’s Pilgrimage.',
    memoryHook:
      'Double-B Romantic poets: Blake ("Tyger, Tyger, Burning bright") and Byron ("She Walks in Beauty").',
  },
  {
    id: 'q-ex11-16',
    examNumber: 11,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'single',
    prompt:
      'Why did Scottish tennis player Sir Andy Murray make British sporting history in 2012 and 2013?',
    options: [
      'He invented modern grass-court lawn tennis rules at Wimbledon',
      'He became the first British man since 1936 to win a Men’s Singles Grand Slam tournament (2012 US Open, followed by Wimbledon)',
      'He won five consecutive Olympic doubles titles between 1984 and 2000',
      'He coached both Oxford and Cambridge in the Thames Boat Race',
    ],
    correctIndices: [1],
    explanation:
      'Sir Andy Murray won the Men’s Singles at the 2012 US Open, becoming the first British man since 1936 to win a Grand Slam singles title, won Olympic gold and silver in 2012, and went on to win Wimbledon Men’s Singles in 2013 and 2016.',
  },
  {
    id: 'q-ex11-17',
    examNumber: 11,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'multiple',
    prompt:
      'Which TWO athletes are celebrated British Paralympic multi-gold medallists, one in wheelchair track/marathon racing and the other in Paralympic swimming? (Choose TWO)',
    options: [
      'David Weir',
      'Lewis Hamilton',
      'Ellie Simmonds',
      'Jayne Torvill',
    ],
    correctIndices: [0, 2],
    explanation:
      'David Weir won six gold medals across two Paralympic Games (including four at London 2012) and won the London Marathon six times; Ellie Simmonds is a Paralympian swimmer who won gold medals at the 2008, 2012, and 2016 Games (becoming the youngest Briton to win gold in 2008).',
    memoryHook:
      'Alliteration pair: W for Weir = Wheelchair racing; S for Simmonds = Swimming.',
  },
  {
    id: 'q-ex11-18',
    examNumber: 11,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which 20th-century British novelist wrote satirical novels including Decline and Fall and Brideshead Revisited?',
    options: [
      'Evelyn Waugh',
      'Robert Louis Stevenson',
      'Charles Dickens',
      'Sir Arthur Conan Doyle',
    ],
    correctIndices: [0],
    explanation:
      'Evelyn Waugh (1903–1966) wrote satirical novels about upper-class society and faith, including Decline and Fall and his best-known novel, Brideshead Revisited.',
    memoryHook:
      'Surname link: Evelyn Waugh (a man, surname pronounced "War") wrote Decline and Fall and WWII-framed Brideshead Revisited.',
  },
  {
    id: 'q-ex11-19',
    examNumber: 11,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'boolean',
    prompt:
      'Since 2011, Senedd Cymru (the Welsh Parliament) has been able to pass laws on devolved Welsh matters, such as education, health, and the Welsh language, without needing prior agreement from the UK Parliament.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Following a referendum in March 2011, the Welsh legislature gained primary law-making powers in 21 devolved areas (such as education, health, transport, and the Welsh language) without needing agreement from Westminster.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex11-20',
    examNumber: 11,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'When was the United Nations (UN) established, and what is its primary aim?',
    options: [
      'In 1815 after Waterloo, to regulate European coal tariffs',
      'After the Second World War, with over 190 member countries working to prevent war and promote international peace and security',
      'In 1973 in Brussels, to create a single European currency',
      'In 1999 in Edinburgh, to coordinate devolved parliaments',
    ],
    correctIndices: [1],
    explanation:
      'The UK is part of the United Nations (UN), an international organisation with more than 190 countries set up after the Second World War to prevent war and promote international peace and security.',
  },
  {
    id: 'q-ex11-21',
    examNumber: 11,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'boolean',
    prompt:
      'In Great Britain, eligible voters register to vote using an individual registration system, meaning each eligible adult in a household is responsible for registering themselves.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Under individual electoral registration, every person in a household who is eligible to vote registers individually (providing personal identifiers such as date of birth and National Insurance number) rather than one "head of household" registering everyone.',
  },
  {
    id: 'q-ex11-22',
    examNumber: 11,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'multiple',
    prompt:
      'Most UK, Irish, or qualifying Commonwealth citizens aged 18 or over can stand for election as an MP, EXCEPT for certain groups. Which TWO groups are disqualified from standing as an MP? (Choose TWO)',
    options: [
      'Members of the armed forces',
      'Primary school teachers',
      'Civil servants',
      'Shop owners and company directors',
    ],
    correctIndices: [0, 2],
    explanation:
      'Members of the armed forces, civil servants, and people found guilty of certain criminal offences (as well as peers sitting in the House of Lords and certain judges/police officers) cannot stand for election as an MP in the House of Commons.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex11-23',
    examNumber: 11,
    chapterId: 'ch5',
    subtopicId: 'ch5-democracy-constitution',
    type: 'single',
    prompt: 'Why is the British constitution described as "unwritten"?',
    options: [
      'Because UK laws are passed orally and never printed on paper',
      'Because its constitutional rules, Acts of Parliament, common law, and conventions have never been collected into one single formal document',
      'Because only the Monarch is allowed to read the secret constitution scroll',
      'Because every General Election automatically cancels all previous laws',
    ],
    correctIndices: [1],
    explanation:
      'Unlike the USA or France, the UK does not have one single written constitutional document; instead, its "unwritten" (uncodified) constitution is formed by Acts of Parliament, court judgments, treaties, and long-standing conventions.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex11-24',
    examNumber: 11,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In England and Wales, what is the role of directly elected Police and Crime Commissioners (PCCs)?',
    options: [
      'Acting as prosecution barristers in Crown Court murder trials',
      'Setting local police priorities and the local policing budget',
      'Personally arresting suspects during 999 emergency calls',
      'Appointing judges to the UK Supreme Court',
    ],
    correctIndices: [1],
    explanation:
      'Voters in England and Wales directly elect Police and Crime Commissioners (PCCs) to hold the police accountable, set local police priorities, and set the local policing budget, while operational policing remains independent under the Chief Constable.',
    memoryHook:
      'Acronym PCC = Priorities and Cash Control (sets local police priorities and budget, while the Chief Constable runs daily operations).',
    visualId: 'parliament-courts',
  },

  // ============================================================================
  // MOCK EXAM 12 (q-ex12-01 .. q-ex12-24)
  // ============================================================================
  {
    id: 'q-ex12-01',
    examNumber: 12,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'single',
    prompt:
      'An employer refuses to interview a well-qualified job applicant solely because of her religion and marital status. Which fundamental guarantee offered by the UK to its residents does this violate?',
    options: [
      'Freedom from unfair discrimination',
      'The right to stand as a hereditary peer',
      'Exemption from paying Income Tax',
      'Compulsory membership of a trade union',
    ],
    correctIndices: [0],
    explanation:
      'In return for residents respecting laws and shared responsibilities, the UK offers freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, and a right to join in electing a government. UK equality law prohibits unfair discrimination based on age, disability, sex, marital status, pregnancy, race, religion, or sexual orientation.',
  },
  {
    id: 'q-ex12-02',
    examNumber: 12,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'Unless exempt, what minimum level of English speaking and listening on the Common European Framework of Reference (CEFR) is required to apply for UK settlement or naturalisation?',
    options: [
      'Level A1',
      'Level B1',
      'Level C2',
      'No English test is required if you pass the Life in the UK Test',
    ],
    correctIndices: [1],
    explanation:
      'Alongside passing the Life in the UK Test, applicants for permanent residence (settlement) or citizenship must normally demonstrate English speaking and listening skills at CEFR level B1 (intermediate) or higher.',
    memoryHook:
      'Pun: Want to "BE ONE" with the UK? You need English Level B1 (not A1 or C2).',
  },
  {
    id: 'q-ex12-03',
    examNumber: 12,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'boolean',
    prompt:
      'Residents of Jersey and Guernsey in the Channel Islands elect Members of Parliament (MPs) to represent them in the Westminster House of Commons.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'Jersey and Guernsey are self-governing Crown Dependencies with their own island legislatures and tax systems; because they are not part of the UK, they do not elect MPs to the Westminster House of Commons.',
  },
  {
    id: 'q-ex12-04',
    examNumber: 12,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt: 'Which of the following UK cities is NOT located in England?',
    options: [
      'Plymouth',
      'Norwich',
      'Swansea',
      'Southampton',
    ],
    correctIndices: [2],
    explanation:
      'Plymouth, Norwich, and Southampton are all cities in England, whereas Swansea is a major coastal city in south Wales.',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex12-05',
    examNumber: 12,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'single',
    prompt:
      'Which cross was added to the crosses of St George and St Andrew in 1801 to create the modern design of the Union Flag?',
    options: [
      'The yellow cross of St David on a black ground',
      'The diagonal red cross of St Patrick on a white ground',
      'The white cross of St Columba on a green ground',
      'The gold cross of St Augustine on a purple ground',
    ],
    correctIndices: [1],
    explanation:
      'Following the Act of Union with Ireland taking effect in 1801, the Irish cross of St Patrick (a diagonal red cross on a white ground) was combined with the crosses of St George (England) and St Andrew (Scotland) to form today’s Union Flag.',
    visualId: 'union-jack',
  },
  {
    id: 'q-ex12-06',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'Born in Lincolnshire, which famous member of the Royal Society discovered gravity, showed how white light is made of rainbow colours, and published Philosophiae Naturalis Principia Mathematica?',
    options: [
      'Sir Isaac Newton',
      'Sir Edmund Halley',
      'Francis Crick',
      'Ernest Rutherford',
    ],
    correctIndices: [0],
    explanation:
      'Sir Isaac Newton (1643–1727) was a towering figure in science and the Royal Society; his Principia Mathematica showed how gravity applies across the whole universe, and he also discovered that white light is composed of the colours of the rainbow.',
  },
  {
    id: 'q-ex12-07',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'Why was the event of 1688, when Protestant ruler William of Orange took the throne from Catholic King James II, called the "Glorious Revolution"?',
    options: [
      'Because William conquered Paris and Madrid in the same summer',
      'Because there was no fighting in England and the revolution guaranteed the power of Parliament',
      'Because gold was discovered beneath the Tower of London',
      'Because every adult man and woman was immediately given the right to vote',
    ],
    correctIndices: [1],
    explanation:
      'In 1688, important Protestants in England invited William of Orange (married to James II’s Protestant daughter Mary) to proclaim himself king. James II fled to France; because there was no fighting in England and it permanently guaranteed Parliament’s power, it was called the "Glorious Revolution".',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex12-08',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'boolean',
    prompt:
      'The Bill of Rights of 1689 confirmed the rights of Parliament, placed limits on the King’s power, and stated that the monarch must be a Protestant.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'At the coronation of William III and Mary II, the Declaration of Rights was read and confirmed by the Bill of Rights 1689, ending any claim that a monarch could rule or raise taxes/an army without Parliament and requiring the sovereign to be Protestant.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex12-09',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-tudors-stuarts',
    type: 'single',
    prompt:
      'Which 17th-century Englishman wrote a famous diary describing everyday life in London during the 1665 Great Plague and the 1666 Great Fire?',
    options: [
      'Geoffrey Chaucer',
      'William Caxton',
      'Samuel Pepys',
      'Rudyard Kipling',
    ],
    correctIndices: [2],
    explanation:
      'Naval administrator Samuel Pepys wrote an eyewitness diary of 1660s Restoration London, vividly recording both the Great Plague of 1665 and the Great Fire of London in 1666, which is still read today.',
    memoryHook:
      'Pronunciation trick: Pepys is pronounced "Peeps". Samuel Pepys "peeped" at 1660s London (1665 Plague and 1666 Fire) in his eyewitness diary.',
  },
  {
    id: 'q-ex12-10',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Who defeated Emperor Napoleon at the Battle of Waterloo in 1815, became known as the "Iron Duke", and later served as Prime Minister?',
    options: [
      'The Duke of Wellington',
      'Admiral Horatio Nelson',
      'Oliver Cromwell',
      'Sir Winston Churchill',
    ],
    correctIndices: [0],
    explanation:
      'In 1815, the French Wars ended with the defeat of Emperor Napoleon by the Duke of Wellington at the Battle of Waterloo. Wellington was known as the "Iron Duke" and later became Prime Minister.',
    memoryHook:
      'Alliteration W-W: Waterloo (1815 land battle) = Wellington; N-N: Navy at Trafalgar (1805 sea battle) = Nelson.',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex12-11',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt: 'What major political change did the Great Reform Act of 1832 introduce?',
    options: [
      'It gave all women aged 21 and over the right to vote',
      'It abolished old "pocket" and "rotten" boroughs, gave more parliamentary seats to industrial cities, and increased the number of men eligible to vote',
      'It created the Scottish Parliament and Welsh Assembly',
      'It replaced First Past the Post with proportional representation',
    ],
    correctIndices: [1],
    explanation:
      'The Reform Act of 1832 greatly increased the number of (property-owning) male voters and abolished old pocket and rotten boroughs with tiny electorates, shifting more parliamentary seats to fast-growing industrial towns and cities.',
    memoryHook:
      'Voting-reform dates: 1832 abolished rotten boroughs and expanded male voting; 1918 gave votes to women 30+; 1928 equalised women at 21+.',
  },
  {
    id: 'q-ex12-12',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt: 'What were the "Highland Clearances" in Scotland following the 1745–1746 Jacobite rebellion?',
    options: [
      'The demolition of Roman forts along Hadrian’s Wall',
      'A process in which Scottish landlords took away individual small farms (crofts) to make space for large flocks of sheep and cattle, leading many Scots to emigrate to North America',
      'A government campaign to plant oak forests across Orkney',
      'The transfer of the Crown Jewels from Edinburgh to Cardiff',
    ],
    correctIndices: [1],
    explanation:
      'After the Battle of Culloden (1746), Scottish chieftains became landlords if they had the favour of the English king, and clansmen became tenants. In the "Highland Clearances", landlords evicted crofters to make room for sheep and cattle, prompting huge Scottish emigration to North America.',
  },
  {
    id: 'q-ex12-13',
    examNumber: 12,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'boolean',
    prompt:
      'Victorian engineer Isambard Kingdom Brunel designed the SS Great Britain, a pioneering iron-hulled steamship that is preserved in Bristol today.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Alongside bridges and railways, Isambard Kingdom Brunel revolutionised ocean transport with iron steamships such as the SS Great Britain, launched in 1843 and still open to visitors in Bristol.',
  },
  {
    id: 'q-ex12-14',
    examNumber: 12,
    chapterId: 'ch4',
    subtopicId: 'ch4-religion-customs',
    type: 'multiple',
    prompt:
      'Which TWO statements accurately match a traditional celebration in the UK with its correct calendar date? (Choose TWO)',
    options: [
      'Halloween is celebrated on 31 October, when people carve pumpkin lanterns and dress up for "trick or treat"',
      'Valentine’s Day is celebrated on 14 March',
      'Boxing Day is a public holiday celebrated on 26 December, the day after Christmas Day',
      'Bonfire Night is celebrated on 11 November with a two-minute silence',
    ],
    correctIndices: [0, 2],
    explanation:
      'Halloween falls on 31 October and Boxing Day is on 26 December. Valentine’s Day is on 14 February (not March), and Bonfire Night is on 5 November (11 November is Remembrance Day).',
  },
  {
    id: 'q-ex12-15',
    examNumber: 12,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'single',
    prompt:
      'On Remembrance Day (11 November), people wear red poppies and observe a two-minute silence at 11:00 am. Which Whitehall monument, designed by Sir Edwin Lutyens, is the centrepiece of the ceremony in London?',
    options: [
      'Nelson’s Column',
      'The Cenotaph',
      'The Angel of the North',
      'Marble Arch',
    ],
    correctIndices: [1],
    explanation:
      'Remembrance Day (11 November) commemorates those who died fighting for the UK and its allies. Wreaths are laid at the Cenotaph in Whitehall, London, designed by architect Sir Edwin Lutyens and unveiled in 1920.',
    memoryHook:
      'Word root: "Cenotaph" means "empty tomb", matching Lutyens’s Whitehall memorial to fallen soldiers buried abroad.',
  },
  {
    id: 'q-ex12-16',
    examNumber: 12,
    chapterId: 'ch4',
    subtopicId: 'ch4-sports',
    type: 'multiple',
    prompt:
      'Motor-car racing has a proud history in the UK. Which TWO British racing drivers listed below have won the Formula 1 World Championship? (Choose TWO)',
    options: [
      'Damon Hill',
      'Sir Bradley Wiggins',
      'Lewis Hamilton',
      'Bobby Moore',
    ],
    correctIndices: [0, 2],
    explanation:
      'Recent British winners of the Formula 1 World Championship include Damon Hill, Lewis Hamilton, and Jenson Button (following earlier three-time champion Sir Jackie Stewart). Wiggins is a cyclist and Moore captained the 1966 England football team.',
  },
  {
    id: 'q-ex12-17',
    examNumber: 12,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO authors created two of Britain’s most famous modern fictional characters, secret agent James Bond and young wizard Harry Potter? (Choose TWO)',
    options: [
      'Ian Fleming',
      'Thomas Hardy',
      'J.K. Rowling',
      'John Constable',
    ],
    correctIndices: [0, 2],
    explanation:
      'Ian Fleming introduced James Bond ("007") in 1952/1953, while J.K. Rowling wrote the hugely successful Harry Potter series of books for children and adults.',
  },
  {
    id: 'q-ex12-18',
    examNumber: 12,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO of the following figures are celebrated 20th-century British novelists highlighted in the Life in the UK handbook? (Choose TWO)',
    options: [
      'Kingsley Amis',
      'Lancelot "Capability" Brown',
      'Graham Greene',
      'Sir Frank Whittle',
    ],
    correctIndices: [0, 2],
    explanation:
      'Kingsley Amis (author of Lucky Jim) and Graham Greene (whose thrillers and novels such as Brighton Rock and The Heart of the Matter were often influenced by his religious and moral discoveries) are major 20th-century British novelists. Capability Brown was an 18th-century garden designer, and Frank Whittle invented the jet engine.',
    memoryHook:
      'Acronym WAG for the handbook’s 20th-century novelist trio: Evelyn Waugh, Kingsley Amis, and Graham Greene.',
  },
  {
    id: 'q-ex12-19',
    examNumber: 12,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'multiple',
    prompt:
      'Which TWO matters can the Scottish Parliament in Edinburgh pass legislation on? (Choose TWO)',
    options: [
      'Civil and criminal law in Scotland',
      'UK military defence and NATO treaties',
      'Education and health services in Scotland',
      'UK immigration and asylum borders',
    ],
    correctIndices: [0, 2],
    explanation:
      'The Scottish Parliament can legislate on anything not specifically reserved to the UK Parliament, including civil and criminal law, health, education, planning, and additional tax-raising powers, while defence and immigration are reserved to Westminster.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex12-20',
    examNumber: 12,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt:
      'Which of the following is NOT one of the fundamental protections contained in the European Convention on Human Rights?',
    options: [
      'Right to life and prohibition of torture',
      'Prohibition of slavery and forced labour',
      'Right to free university tuition in any European country',
      'Freedom of thought, conscience and religion, and freedom of expression',
    ],
    correctIndices: [2],
    explanation:
      'Among the core rights in the European Convention on Human Rights are the right to life, prohibition of torture, prohibition of slavery and forced labour, right to liberty and security, right to a fair trial, and freedoms of thought, religion, and expression, not free university tuition.',
  },
  {
    id: 'q-ex12-21',
    examNumber: 12,
    chapterId: 'ch5',
    subtopicId: 'ch5-parliament-elections',
    type: 'single',
    prompt:
      'You want to meet your local Member of Parliament (MP) in person in your local area to ask for help with a community or public-service issue. What are these regular local drop-in or appointment sessions held by MPs called?',
    options: [
      'Constituency "surgeries"',
      'Select committees',
      'By-elections',
      'Royal Assent hearings',
    ],
    correctIndices: [0],
    explanation:
      'Residents can contact MPs by letter, phone, or email at Westminster or their constituency office, and many MPs hold regular local sessions called "surgeries", where constituents can go in person to talk about issues of concern.',
    memoryHook:
      'British English link: Just as you visit a local GP’s "surgery" for a consultation, you visit your MP’s local "surgery" for one-to-one help.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex12-22',
    examNumber: 12,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'boolean',
    prompt:
      'The modern Scottish Parliament, Welsh Assembly (now Senedd), and Northern Ireland Assembly were established in 1998 and 1999 following referendums.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Following devolution referendums under the Labour government elected in 1997, the Northern Ireland Assembly was formed after the 1998 Belfast (Good Friday) Agreement, and the Welsh Assembly and Scottish Parliament opened in 1999.',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex12-23',
    examNumber: 12,
    chapterId: 'ch5',
    subtopicId: 'ch5-devolution',
    type: 'single',
    prompt: 'What is true about the Council of Europe?',
    options: [
      'It is the executive cabinet of the European Union in Brussels',
      'It is separate from the EU, has no power to make laws, and draws up charters and conventions such as the European Convention on Human Rights',
      'It sets UK interest rates and prints Euro banknotes',
      'Only the five permanent members of the UN Security Council belong to it',
    ],
    correctIndices: [1],
    explanation:
      'The Council of Europe (of which the UK is a member alongside around 46 European states) is separate from the EU; it has no power to make binding laws directly, but draws up conventions and charters, most famously the European Convention on Human Rights.',
  },
  {
    id: 'q-ex12-24',
    examNumber: 12,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'How can local residents aged 18 or over volunteer to help set the strategic direction of a local state school, ensure accountability, and monitor financial performance in England?',
    options: [
      'By applying to become a school governor (or member of a Parent Council in Scotland)',
      'By joining the Shadow Cabinet',
      'By registering as a parliamentary Whip',
      'By applying to the Crown Prosecution Service',
    ],
    correctIndices: [0],
    explanation:
      'People aged 18 or over can apply to serve as unpaid school governors (or on school boards / Parent Councils in Scotland), playing a vital community role in raising school standards: setting strategic direction, ensuring accountability, and monitoring financial performance.',
  },
];
