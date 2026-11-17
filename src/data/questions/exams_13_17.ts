/**
 * Mock Exams 13–17 (120 unique Official-Style Practice Questions).
 * Focuses deeply on 19th–21st Century History, British Inventions, Visual Arts/Music/Awards/Landmarks,
 * Courts/Police/Legal Ages/Tax/Community Role, and high-yield Life in the UK exam traps.
 */

import type { PracticeQuestion } from '../../types/domain';

export const QUESTIONS_EXAMS_13_17: readonly PracticeQuestion[] = [
  // ============================================================================
  // MOCK EXAM 13 (q-ex13-01 .. q-ex13-24)
  // ============================================================================
  {
    id: 'q-ex13-01',
    examNumber: 13,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'boolean',
    prompt:
      'Can a person in the UK be prosecuted for violence towards their husband, wife, or partner inside marriage?',
    options: ['Yes', 'No'],
    correctIndices: [0],
    explanation:
      'Domestic violence and abuse are serious crimes in the UK. Anyone who is violent towards their spouse or partner: whether they are married or living together, can be prosecuted under criminal law.',
    memoryHook:
      '🌶️ Spice Hook: "Stop right now!" A wedding ring is NEVER a legal shield, domestic violence is a crime inside or outside marriage!',
  },
  {
    id: 'q-ex13-02',
    examNumber: 13,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'How does the Life in the UK Test differ if you apply for settlement or citizenship in the Channel Islands or the Isle of Man?',
    options: [
      'Some UK questions are replaced by questions specific to that island',
      'You are exempt from taking any test altogether',
      'The test takes 90 minutes and has 50 questions',
      'The test is conducted orally in French or Manx Gaelic',
    ],
    correctIndices: [0],
    explanation:
      'Although the Channel Islands and the Isle of Man use the Life in the UK Test framework for settlement and citizenship, applicants there sit a version containing local questions specific to their island alongside core UK material.',
    memoryHook:
      '🌶️ Spice Hook: Island life = Island slice! Jersey, Guernsey & Isle of Man swap in local island questions!',
  },
  {
    id: 'q-ex13-03',
    examNumber: 13,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'multiple',
    prompt:
      'Which TWO parts of the United Kingdom have an official public bank holiday on their patron saint’s day? (Choose TWO)',
    options: ['Scotland', 'Northern Ireland', 'England', 'Wales'],
    correctIndices: [0, 1],
    explanation:
      'Although all four nations celebrate their patron saints, only Scotland (St Andrew’s Day on 30 November) and Northern Ireland (St Patrick’s Day on 17 March) have an official bank holiday for the occasion (though not every business closes in Scotland). England (St George’s Day) and Wales (St David’s Day) do not.',
    memoryHook:
      '🌶️ Spice Hook: Classic exam trap! Only the TWO northern/western neighbours, Scotland (St Andrew) & Northern Ireland (St Patrick): get an official patron saint bank holiday!',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex13-04',
    examNumber: 13,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt:
      'Which is the longest river in the United Kingdom, flowing for about 220 miles (354 km) through Wales and England?',
    options: [
      'The River Thames',
      'The River Clyde',
      'The River Trent',
      'The River Severn',
    ],
    correctIndices: [3],
    explanation:
      'The River Severn (220 miles / 354 km) rises in Wales and flows through western England to the Bristol Channel, making it the UK’s longest river. The River Thames (215 miles) is the longest river entirely within England, but second overall in the UK!',
    memoryHook:
      '🌶️ Spice Hook: Trap alert! Thames is famous in London, but "Severn = Seven letters of #1 length" (220 miles across Wales + England)!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex13-05',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Which British admiral commanded HMS Victory and defeated the combined French and Spanish fleets at the Battle of Trafalgar in 1805, losing his life in action?',
    options: [
      'Sir Francis Drake',
      'Admiral Horatio Nelson',
      'The Duke of Wellington',
      'Sir Walter Raleigh',
    ],
    correctIndices: [1],
    explanation:
      'Admiral Horatio Nelson led the Royal Navy victory against the combined French and Spanish fleets at Trafalgar in 1805 and was killed during the battle. Nelson’s Column in Trafalgar Square honours him, and his flagship HMS Victory can still be visited in Portsmouth.',
    memoryHook:
      '🌶️ Spice Hook: "1805, Nelson’s Dive!" Nelson won Trafalgar on HMS Victory (Portsmouth) and stands tall in Trafalgar Square!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex13-06',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Who led the British and allied army that finally defeated Emperor Napoleon at the Battle of Waterloo in 1815?',
    options: [
      'Sir Robert Walpole',
      'Oliver Cromwell',
      'The Duke of Wellington',
      'Lord Palmerston',
    ],
    correctIndices: [2],
    explanation:
      'In 1815, the French Wars ended when Emperor Napoleon was defeated by the Duke of Wellington at the Battle of Waterloo. Known as the "Iron Duke", Wellington later served as Prime Minister.',
    memoryHook:
      '🌶️ Spice Hook: "Water-loo needs Wellingtons (boots)!" 1815 = Duke of Wellington splashed Napoleon at Waterloo!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex13-07',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'boolean',
    prompt:
      'True or False: In 1846, Parliament repealed the Corn Laws, which had previously prevented the import of cheap grain into Britain.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'During the Victorian era, Britain promoted free trade by abolishing taxes on imported goods. A landmark moment was the repeal of the Corn Laws in 1846, allowing cheaper imported grain and helping factory workers and manufacturers.',
    memoryHook:
      '🌶️ Spice Hook: "1846, Corn Laws thrown in the mix!" Repealing them let cheap grain flow into Victorian Britain!',
  },
  {
    id: 'q-ex13-08',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'Which event on 28 June 1914 set off the chain of events that led directly to the outbreak of the First World War?',
    options: [
      'The assassination of Archduke Franz Ferdinand of Austria',
      'Germany’s invasion of Poland',
      'The sinking of the RMS Titanic',
      'The signing of the Treaty of Versailles',
    ],
    correctIndices: [0],
    explanation:
      'Although rising nationalism, militarism, and rival alliances created deep tension across Europe, the immediate trigger for the First World War in 1914 was the assassination of Archduke Franz Ferdinand of Austria on 28 June 1914.',
    memoryHook:
      '🌶️ Spice Hook: "1914 spark = Franz Ferdinand!" (Don’t confuse with Poland, Hitler invading Poland started WWII in 1939!)',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex13-09',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'In which First World War offensive did British forces suffer around 60,000 casualties on the very first day, 1 July 1916?',
    options: [
      'The Battle of Waterloo',
      'The Battle of Britain',
      'The Battle of Culloden',
      'The Battle of the Somme',
    ],
    correctIndices: [3],
    explanation:
      'The British attack on the Somme in July 1916 resulted in about 60,000 British casualties on the first day alone (1 July 1916). Over the whole First World War, there were more than 2 million British casualties (killed or wounded).',
    memoryHook:
      '🌶️ Spice Hook: "Somme = Sixty thousand on 1 July 1916", both S-sounds remind you of the tragic Day-One toll!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex13-10',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'Which Scottish doctor discovered penicillin in 1928 while researching influenza, transforming modern medicine?',
    options: [
      'John Macleod',
      'Sir Alexander Fleming',
      'Sir Ian Wilmut',
      'Joseph Lister',
    ],
    correctIndices: [1],
    explanation:
      'Born in Scotland, Alexander Fleming moved to London and discovered penicillin in 1928. Scientists Howard Florey and Ernst Chain later developed it into a mass-produced antibiotic drug, and Fleming won the Nobel Prize in Medicine in 1945.',
    memoryHook:
      '🌶️ Spice Hook: "1928: Fleming found the mould that healed the cold (bacterial infections)!" Penicillin = Alexander Fleming!',
  },
  {
    id: 'q-ex13-11',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'multiple',
    prompt:
      'Which TWO of the following were among the "Five Giant Evils" identified in William Beveridge’s famous 1942 report on welfare reform? (Choose TWO)',
    options: ['Want', 'Inflation', 'Squalor', 'Taxation'],
    correctIndices: [0, 2],
    explanation:
      'Economist William Beveridge’s 1942 report (Social Insurance and Allied Services) recommended that the government fight Five Giant Evils: Want, Disease, Ignorance, Squalor, and Idleness. It became the blueprint for Britain’s post-1945 welfare state.',
    memoryHook:
      '🌶️ Spice Hook: Beveridge’s 5 Giants = "W-D-I-S-I" (Want, Disease, Ignorance, Squalor, Idleness): Want & Squalor are in, Inflation & Taxation are impostors!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex13-12',
    examNumber: 13,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'boolean',
    prompt:
      'Did the United Kingdom join the European Economic Community (EEC) when it was first established in 1957?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'When West Germany, France, Belgium, Italy, Luxembourg, and the Netherlands formed the EEC in 1957, the UK chose not to join at first. The UK eventually joined the EEC in 1973 (alongside Denmark and the Republic of Ireland).',
    memoryHook:
      '🌶️ Spice Hook: "57 = Six founders without Britain; 73 = UK finally walked in!"',
  },
  {
    id: 'q-ex13-13',
    examNumber: 13,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which British Royal Air Force engineer developed the jet engine in the 1930s?',
    options: [
      'Sir Robert Watson-Watt',
      'Sir Christopher Cockerell',
      'Sir Frank Whittle',
      'Alan Turing',
    ],
    correctIndices: [2],
    explanation:
      'Born in Coventry, RAF officer Sir Frank Whittle (1907–1996) invented and tested the turbojet engine in the 1930s, transforming global aviation.',
    memoryHook:
      '🌶️ Spice Hook: "Whittle made the jet engine WHISTLE through the sky!"',
  },
  {
    id: 'q-ex13-14',
    examNumber: 13,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which Scottish physicist developed radar in the 1930s, using radio waves to detect approaching enemy aircraft before they could be seen?',
    options: [
      'Sir Robert Watson-Watt',
      'John Logie Baird',
      'Sir Peter Mansfield',
      'James Watt',
    ],
    correctIndices: [0],
    explanation:
      'Sir Robert Watson-Watt (1892–1973) proposed using radio reflections to detect aircraft and conducted the first successful radar test in 1935, giving Britain a crucial defensive edge in the 1940 Battle of Britain.',
    memoryHook:
      '🌶️ Spice Hook: "Watson-WATT = Radio-WAVE!" Two W’s scanning the skies with Radar!',
  },
  {
    id: 'q-ex13-15',
    examNumber: 13,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which English artist (1776–1837) is famous for landscape paintings of Dedham Vale on the Suffolk–Essex border, including The Hay Wain?',
    options: ['Hans Holbein', 'David Allan', 'David Hockney', 'John Constable'],
    correctIndices: [3],
    explanation:
      'John Constable (1776–1837) was one of Britain’s greatest landscape painters, celebrated for scenes of Dedham Vale ("Constable Country") such as The Hay Wain (1821). By contrast, Joseph Turner painted dramatic seascapes/light, Thomas Gainsborough painted portraits in landscapes, and David Allan ("the Scottish Hogarth") painted Scottish domestic scenes.',
    memoryHook:
      '🌶️ Spice Hook: "Constable in the Country!" John Constable patrolled Dedham Vale and painted The Hay Wain!',
  },
  {
    id: 'q-ex13-16',
    examNumber: 13,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO famous musical works were composed by German-born British citizen George Frideric Handel? (Choose TWO)',
    options: [
      'Water Music',
      'The Planets',
      'Pomp and Circumstance Marches',
      'Messiah',
    ],
    correctIndices: [0, 3],
    explanation:
      'George Frideric Handel (1695–1759) settled in Britain, became a British citizen in 1727, and wrote Water Music for King George I, Music for the Royal Fireworks for George II, and the choral masterpiece Messiah. (Gustav Holst wrote The Planets, and Sir Edward Elgar wrote the Pomp and Circumstance Marches.)',
    memoryHook:
      '🌶️ Spice Hook: "Handel had a handle on Water (Water Music) and Heaven (Messiah)!"',
  },
  {
    id: 'q-ex13-17',
    examNumber: 13,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt: 'What is the prestigious Booker Prize awarded for every year?',
    options: [
      'The best British classical music album',
      'The best eligible novel in fiction',
      'The best contemporary visual artwork displayed at Tate Britain',
      'The best West End theatre direction',
    ],
    correctIndices: [1],
    explanation:
      'Awarded annually since 1969, the Booker Prize recognises the best fiction novel (past winners include Salman Rushdie, Ian McEwan, and Hilary Mantel). Contemporary art is honoured by the Turner Prize, theatre by the Laurence Olivier Awards, and music by the BRIT Awards and Mercury Prize.',
    memoryHook:
      '🌶️ Spice Hook: Easy win, "BOOK-er Prize = BOOKS (fiction novels)!"',
  },
  {
    id: 'q-ex13-18',
    examNumber: 13,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'single',
    prompt:
      'How many National Parks are there across England, Wales, and Scotland?',
    options: ['8', '12', '15', '24'],
    correctIndices: [2],
    explanation:
      'There are 15 National Parks in England, Wales, and Scotland: protected areas of natural countryside where people live, work, and visit (including the Lake District, Snowdonia in North Wales, and Loch Lomond and the Trossachs in Scotland).',
    memoryHook:
      '🌶️ Spice Hook: "15 National Parks = same number as a 15-player Rugby Union team or a 15-person Scottish jury!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex13-19',
    examNumber: 13,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In England, Wales, and Northern Ireland, in which court are most minor criminal offences heard?',
    options: [
      'A Crown Court',
      'A Sheriff Court',
      'A Magistrates’ Court',
      'The High Court',
    ],
    correctIndices: [2],
    explanation:
      'In England, Wales, and Northern Ireland, most minor criminal cases are heard in a Magistrates’ Court by unpaid volunteer Justices of the Peace (magistrates) or a paid legally qualified District Judge, without a jury.',
    memoryHook:
      '🌶️ Spice Hook: "M for Minor = M for Magistrates’ Court!" (Serious crimes go up to the Crown Court!)',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex13-20',
    examNumber: 13,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'How many people sit on a jury in a Scottish criminal trial, compared with 12 in England, Wales, and Northern Ireland?',
    options: ['9', '12', '15', '18'],
    correctIndices: [2],
    explanation:
      'In Scotland, serious criminal offences tried before a jury (in a Sheriff Court or the High Court of Justiciary) have a jury of 15 members, whereas juries in England, Wales, and Northern Ireland have 12 members.',
    memoryHook:
      '🌶️ Spice Hook: "12 south & west, 15 in the Scottish nest!" Scotland adds 3 extra jurors (and a 3rd verdict: Not Proven)!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex13-21',
    examNumber: 13,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'What is the maximum limit for using the informal small claims procedure in England and Wales (compared with £5,000 in Scotland and Northern Ireland)?',
    options: ['£2,500', '£5,000', '£10,000', '£25,000'],
    correctIndices: [2],
    explanation:
      'The small claims procedure helps people settle minor civil disputes (such as unpaid money or faulty goods) informally without high legal costs. It applies to claims under £10,000 in England and Wales, and £5,000 in Scotland and Northern Ireland.',
    memoryHook:
      '🌶️ Spice Hook: "Double in E&W!" £10,000 in England & Wales vs £5,000 in Scotland & Northern Ireland!',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex13-22',
    examNumber: 13,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'What is the minimum legal age to buy a National Lottery ticket or scratchcard in the UK?',
    options: ['16', '17', '18', '21'],
    correctIndices: [2],
    explanation:
      'People under 18 are not allowed to participate in the National Lottery (including Lotto draws and scratchcards); the minimum age was raised from 16 to 18 in 2021.',
    memoryHook:
      '🌶️ Spice Hook: Updated exam trap! Lottery used to be 16, now it’s 18, "Vote, Booze, Smoke & Lotto all unlock at 18!"',
  },
  {
    id: 'q-ex13-23',
    examNumber: 13,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'For most salaried employees in the UK, which TWO payments are automatically deducted from wages by their employer through the PAYE (Pay As You Earn) system? (Choose TWO)',
    options: [
      'Council Tax',
      'Income Tax',
      'National Insurance contributions',
      'Vehicle Excise Duty (road tax)',
    ],
    correctIndices: [1, 2],
    explanation:
      'Under PAYE (Pay As You Earn), employers automatically deduct Income Tax and National Insurance contributions from employees’ pay and send them directly to HM Revenue & Customs (HMRC). Self-employed people pay via Self Assessment.',
    memoryHook:
      '🌶️ Spice Hook: "PAYE = Pay Check Pair (Income Tax + National Insurance)!" Council Tax & road tax are paid separately by households/drivers.',
  },
  {
    id: 'q-ex13-24',
    examNumber: 13,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'True or False: People summoned for jury service in the UK are selected at random from the electoral register.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'Anyone who is on the electoral register (register of electors) and within the eligible age range can be randomly selected to serve on a jury. Unless exempt or excused for good reason, you must attend.',
    memoryHook:
      '🌶️ Spice Hook: "Register to vote → Ready for the jury boat!" Random pick straight off the electoral register!',
  },

  // ============================================================================
  // MOCK EXAM 14 (q-ex14-01 .. q-ex14-24)
  // ============================================================================
  {
    id: 'q-ex14-01',
    examNumber: 14,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'multiple',
    prompt:
      'Which TWO of the following practices are serious criminal offences in the United Kingdom? (Choose TWO)',
    options: [
      'An arranged marriage where both adults freely consent',
      'Forced marriage, where one or both parties do not or cannot consent',
      'Making a non-religious affirmation in court',
      'Female genital mutilation (FGM)',
    ],
    correctIndices: [1, 3],
    explanation:
      'Forced marriage (forcing someone to marry against their will, distinguishable from a consensual arranged marriage) and female genital mutilation (FGM: or taking someone abroad for FGM) are severe criminal offences carrying prison sentences in the UK.',
    memoryHook:
      '🌶️ Spice Hook: Consent is Queen! Consensual arranged marriage = legal; Forced marriage & FGM = strictly criminal!',
  },
  {
    id: 'q-ex14-02',
    examNumber: 14,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'boolean',
    prompt:
      'Do applicants without religious beliefs have to swear a religious oath on a holy book at a UK citizenship ceremony?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No. Reflecting freedom of religion and belief in the UK, those who do not wish to swear a religious oath ("I swear by Almighty God...") may make a solemn, non-religious affirmation ("I do solemnly, sincerely and truly declare and affirm...") instead.',
    memoryHook:
      '🌶️ Spice Hook: "Swear if religious, Affirm if secular!" Nobody is forced onto a holy book!',
  },
  {
    id: 'q-ex14-03',
    examNumber: 14,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'boolean',
    prompt:
      'True or False: The Channel Islands and the Isle of Man are part of the United Kingdom and are represented by MPs at Westminster.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'False! The Channel Islands (such as Jersey and Guernsey) and the Isle of Man are Crown Dependencies: closely linked to the Crown, but NOT part of the UK. They have their own governments and tax systems and do not elect MPs to Westminster.',
    memoryHook:
      '🌶️ Spice Hook: #1 Geography Trap! "Crown Dependencies (Channel Islands + Isle of Man) are cousins of the Crown, NOT inside the UK!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex14-04',
    examNumber: 14,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt:
      'Which mountain in the Scottish Highlands is the highest peak in the entire United Kingdom?',
    options: [
      'Ben Nevis',
      'Snowdon (Yr Wyddfa)',
      'Scafell Pike',
      'Slieve Donard',
    ],
    correctIndices: [0],
    explanation:
      'Ben Nevis in Scotland (1,345m / 4,413 ft) is the highest mountain in both Scotland and the whole UK. For comparison, Snowdon is highest in Wales, Scafell Pike is highest in England, and Slieve Donard is highest in Northern Ireland.',
    memoryHook:
      '🌶️ Spice Hook: "Big Ben Nevis is Boss of Britain’s peaks!" (Ben Nevis = UK/Scotland #1, Snowdon = Wales, Scafell Pike = England, Slieve Donard = NI).',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex14-05',
    examNumber: 14,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'multiple',
    prompt:
      'Which TWO of the following are British Overseas Territories rather than Crown Dependencies? (Choose TWO)',
    options: ['The Isle of Man', 'Guernsey', 'St Helena', 'Gibraltar'],
    correctIndices: [2, 3],
    explanation:
      'St Helena (in the South Atlantic), Gibraltar (at the southern tip of Spain), and the Falkland Islands are British Overseas Territories linked to the UK, whereas the Isle of Man and Guernsey (Channel Islands) are Crown Dependencies.',
    memoryHook:
      '🌶️ Spice Hook: "Far across the sea = Overseas Territory (St Helena, Gibraltar, Falklands); right by Britain = Crown Dependency (Man, Jersey, Guernsey)!"',
    visualId: 'national-emblems',
  },
  {
    id: 'q-ex14-06',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Where in London was the Great Exhibition of 1851 held to showcase exhibits from across the world and Britain’s industrial leadership?',
    options: [
      'The Royal Albert Hall in Kensington',
      'The Millennium Dome in Greenwich',
      'Somerset House on the Strand',
      'The Crystal Palace in Hyde Park',
    ],
    correctIndices: [3],
    explanation:
      'Organised largely by Prince Albert, the Great Exhibition opened in 1851 in Hyde Park inside the Crystal Palace: a huge building constructed cleanly out of iron and glass.',
    memoryHook:
      '🌶️ Spice Hook: "1851 shone bright in the sun, Crystal Palace of glass & iron in Hyde Park!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex14-07',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'multiple',
    prompt:
      'Which TWO statements are true about the Crimean War (1853–1856), in which Britain fought with Turkey and France against Russia? (Choose TWO)',
    options: [
      'It was the first war to be extensively covered by the media through news stories and photographs',
      'Queen Victoria introduced the Victoria Cross medal to honour acts of valour by soldiers',
      'It resulted in the immediate independence of India in 1856',
      'It was the first war in which RAF Spitfire fighter aircraft were used',
    ],
    correctIndices: [0, 1],
    explanation:
      'The Crimean War (1853–56) was the first war extensively documented by newspaper correspondents and photographers, and during it Queen Victoria instituted the Victoria Cross (still Britain’s highest military honour for valour).',
    memoryHook:
      '🌶️ Spice Hook: Crimea = "Cameras & Crosses!" First media/photo war + Queen Victoria’s Victoria Cross!',
  },
  {
    id: 'q-ex14-08',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'boolean',
    prompt:
      'True or False: Florence Nightingale, who pioneered modern nursing at the military hospital in Scutari during the Crimean War, was born in Italy.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! Florence Nightingale (1820–1910) was born in Italy (and named after the city of Florence) to English parents. In 1854 she went to Turkey to improve sanitation at the Scutari hospital, dramatically cutting mortality rates, and in 1860 established the Nightingale Training School for nurses at St Thomas’ Hospital in London.',
    memoryHook:
      '🌶️ Spice Hook: Clue is in her first name! "Florence Nightingale was born in Florence, Italy, healed soldiers at Scutari, and trained nurses at St Thomas’!"',
  },
  {
    id: 'q-ex14-09',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'At what time and date did fighting in the First World War officially end?',
    options: [
      '12.00 noon on 1 July 1916',
      '11.00 am on 11 November 1918',
      '9.00 am on 3 September 1939',
      '6.00 am on 6 June 1944',
    ],
    correctIndices: [1],
    explanation:
      'The First World War ended with the Armistice at 11.00 am on 11 November 1918 ("the eleventh hour of the eleventh day of the eleventh month") after Allied victory and more than 2 million British casualties.',
    memoryHook:
      '🌶️ Spice Hook: Triple Eleven! "11 am, 11th day, 11th month (Nov) 1918", why we hold a 2-minute silence on Remembrance Day!',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex14-10',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'What name is given to the armed uprising by Irish nationalists in Dublin in April 1916 against British rule?',
    options: [
      'The Jacobite Rising',
      'The Easter Rising',
      'The Glorious Revolution',
      'The Peasants’ Revolt',
    ],
    correctIndices: [1],
    explanation:
      'In April 1916, Irish nationalists staged the Easter Rising in Dublin and proclaimed an Irish Republic. Nationalist leaders were executed, and a guerrilla war against the British army and police followed until the 1921 Peace Treaty.',
    memoryHook:
      '🌶️ Spice Hook: "April 1916 in Dublin = Easter Rising" (which led to the 1921 Treaty and 1922 partition of Ireland)!',
  },
  {
    id: 'q-ex14-11',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'multiple',
    prompt:
      'Which TWO fighter aircraft flown by the Royal Air Force were decisive in winning the aerial Battle of Britain in the summer of 1940? (Choose TWO)',
    options: [
      'The Spitfire',
      'Concorde',
      'The Hurricane',
      'The Harrier Jump Jet',
    ],
    correctIndices: [0, 2],
    explanation:
      'In the crucial aerial battle against the German Luftwaffe in the summer of 1940: the Battle of Britain, the Royal Air Force prevented a German invasion using British-built fighter planes: the Hawker Hurricane and the Supermarine Spitfire.',
    memoryHook:
      '🌶️ Spice Hook: 1940 RAF Dream Team = "Fire & Wind, Spitfire & Hurricane!" ("Never... was so much owed by so many to so few!")',
  },
  {
    id: 'q-ex14-12',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'Who became Prime Minister in 1945 when the Labour Party won a landslide general election victory at the end of the Second World War in Europe?',
    options: [
      'Winston Churchill',
      'Harold Macmillan',
      'Clement Attlee',
      'Neville Chamberlain',
    ],
    correctIndices: [2],
    explanation:
      'Although Winston Churchill led Britain through WWII, voters seeking post-war social reform elected a Labour government in 1945 led by Clement Attlee (who had been Churchill’s wartime Deputy PM). Attlee’s government nationalised major industries and created the NHS and modern social security system.',
    memoryHook:
      '🌶️ Spice Hook: Surprise exam twist! "Churchill won the War, Clement Attlee won the 1945 Election!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex14-13',
    examNumber: 14,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'Which famous ship arrived in Britain in 1948 carrying hundreds of people from the West Indies invited to come and help rebuild the post-war economy?',
    options: [
      'HMT Empire Windrush',
      'HMS Victory',
      'SS Great Britain',
      'The Golden Hind',
    ],
    correctIndices: [0],
    explanation:
      'Faced with severe labour shortages after WWII, Britain encouraged workers from the West Indies, India, Pakistan, and later Bangladesh to work in transport, the NHS, and textiles. The arrival of HMT Empire Windrush in 1948 became a lasting symbol of the "Windrush generation".',
    memoryHook:
      '🌶️ Spice Hook: "1948 = NHS born + Empire Windrush docked!" Many Windrush arrivals helped staff the brand-new NHS & buses!',
  },
  {
    id: 'q-ex14-14',
    examNumber: 14,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which Scottish inventor developed television in the 1920s and made the first transatlantic television broadcast between London and New York in 1928?',
    options: [
      'Sir Tim Berners-Lee',
      'Alexander Graham Bell',
      'Guglielmo Marconi',
      'John Logie Baird',
    ],
    correctIndices: [3],
    explanation:
      'Scottish engineer John Logie Baird (1888–1946) demonstrated the first working television system in the 1920s and in 1932 made the first outdoor broadcast (showing the Derby horse race).',
    memoryHook:
      '🌶️ Spice Hook: "Baird put Broadcasts on the Box!" John Logie Baird = 1920s TV pioneer!',
  },
  {
    id: 'q-ex14-15',
    examNumber: 14,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which British inventor experimented with tin cans and a vacuum-cleaner motor before inventing the hovercraft in the 1950s?',
    options: [
      'Sir Frank Whittle',
      'Sir Christopher Cockerell',
      'Sir Clive Sinclair',
      'Trevor Baylis',
    ],
    correctIndices: [1],
    explanation:
      'Sir Christopher Cockerell (1910–1999) invented the hovercraft in the 1950s, enabling passenger and vehicle craft to glide smoothly on a cushion of air over water and land.',
    memoryHook:
      '🌶️ Spice Hook: "Cockerell flew low over the Channel!" Cockerell = Cushion-of-air Hovercraft!',
  },
  {
    id: 'q-ex14-16',
    examNumber: 14,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which two British inventors are credited with pioneering the automatic teller machine (ATM) or cash dispenser in the late 1960s?',
    options: [
      'Patrick Steptoe and Robert Edwards',
      'Sir Ian Wilmut and Keith Campbell',
      'James Goodfellow and John Shepherd-Barron',
      'Charles Barry and Augustus Pugin',
    ],
    correctIndices: [2],
    explanation:
      'Scottish inventor James Goodfellow (who patented PIN-based cash machine technology in 1966) and John Shepherd-Barron (whose first cash dispenser was installed by Barclays Bank in Enfield, north London, in 1967) pioneered the ATM.',
    memoryHook:
      '🌶️ Spice Hook: Getting cash out makes you a "Good-fellow" with a "Barron’s" wallet, Goodfellow & Shepherd-Barron = ATM!',
  },
  {
    id: 'q-ex14-17',
    examNumber: 14,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'In the 19th century, which TWO figures collaborated on the Gothic Revival rebuilding of the Houses of Parliament (Palace of Westminster), designing its exterior architecture and ornate interiors? (Choose TWO)',
    options: [
      'Sir Charles Barry',
      'Sir Christopher Wren',
      'Robert Adam',
      'Augustus Pugin',
    ],
    correctIndices: [0, 3],
    explanation:
      'In the 19th century, medieval Gothic style revived ("Gothic Revival"). Architect Sir Charles Barry won the competition to rebuild the Houses of Parliament after the 1834 fire, while Augustus Pugin designed its famous Gothic interiors, wallpaper, furniture, and the Elizabeth Tower clock face. (Wren built St Paul’s; Robert Adam was 18th-century neoclassical.)',
    memoryHook:
      '🌶️ Spice Hook: "Barry built the Building, Pugin polished the Pointed Gothic insides!" Barry + Pugin = Houses of Parliament!',
  },
  {
    id: 'q-ex14-18',
    examNumber: 14,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'single',
    prompt:
      'Which is England’s largest National Park, home to Windermere and to Wastwater (voted Britain’s favourite view in 2007)?',
    options: ['The Lake District', 'Snowdonia', 'The Peak District', 'Dartmoor'],
    correctIndices: [0],
    explanation:
      'Covering 885 square miles (2,292 sq km) in north-west England, the Lake District is England’s largest National Park, famous for its lakes and mountains and inspiring poets like William Wordsworth and author Beatrix Potter. In 2007, viewers voted Wastwater in the Lake District Britain’s favourite view.',
    memoryHook:
      '🌶️ Spice Hook: "Wastwater = Lake District!" Largest park in England, overflowing with Lakes!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex14-19',
    examNumber: 14,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In Scotland, a criminal jury can return "guilty" or "not guilty", as well as which unique third verdict?',
    options: ['Adjourned', 'No contest', 'Unlawful', 'Not proven'],
    correctIndices: [3],
    explanation:
      'Unlike courts in England, Wales, and Northern Ireland (which only have "guilty" and "not guilty"), a 15-person Scottish jury has a third possible verdict: "not proven" (which acquits the accused with the same legal effect as not guilty).',
    memoryHook:
      '🌶️ Spice Hook: Scotland’s Rule of 3s, "15 jurors (divisible by 3) & 3 verdicts: Guilty, Not Guilty, NOT PROVEN!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex14-20',
    examNumber: 14,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In Scotland, minor criminal offences are handled in which court (while more serious cases go to a Sheriff Court or the High Court)?',
    options: [
      'A Crown Court',
      'A Justice of the Peace Court',
      'A County Court',
      'A Coroners’ Court',
    ],
    correctIndices: [1],
    explanation:
      'In Scotland, minor criminal offences go to a Justice of the Peace Court. Serious cases in Scotland are heard in a Sheriff Court (with either a sheriff alone or a sheriff plus a 15-person jury) or, for the most serious crimes such as murder, the High Court of Justiciary.',
    memoryHook:
      '🌶️ Spice Hook: Scottish Criminal Ladder = "JP Court (minor) → Sheriff Court (serious) → High Court (most serious)!" (Crown Court is E/W/NI only!)',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex14-21',
    examNumber: 14,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Which telephone number should you dial in the UK to contact the police when reporting a non-emergency crime (for example, a stolen bicycle with no immediate danger)?',
    options: ['999', '112', '101', '111'],
    correctIndices: [2],
    explanation:
      'You should dial 999 or 112 ONLY in genuine emergencies requiring immediate police, fire, ambulance, or coastguard assistance. For non-emergency police matters across the UK, dial 101 (whereas 111 is for non-emergency NHS medical advice).',
    memoryHook:
      '🌶️ Spice Hook: "999 / 112 = Blue lights flashing! 101 = Police non-emergency! 111 = NHS tummy ache!"',
  },
  {
    id: 'q-ex14-22',
    examNumber: 14,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'Can a 16- or 17-year-old legally drink wine, beer, or cider with a meal in a hotel or restaurant in the UK if accompanied by someone aged 18 or over?',
    options: ['Yes', 'No'],
    correctIndices: [0],
    explanation:
      'Yes! Although it is a criminal offence anywhere in the UK to sell alcohol to anyone under 18, there is one narrow exception: people aged 16 or 17 may drink wine, beer, or cider (not spirits!) with a table meal in a hotel or restaurant when accompanied by an adult who buys it.',
    memoryHook:
      '🌶️ Spice Hook: Classic Legal Age Trap! "Under 18 can’t BUY booze, but 16–17s CAN sip wine/beer/cider with a restaurant meal + adult!"',
  },
  {
    id: 'q-ex14-23',
    examNumber: 14,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Once a car reaches what age must it pass an annual MOT (Ministry of Transport) test to remain legal on UK public roads?',
    options: ['One year old', 'Two years old', 'Three years old', 'Five years old'],
    correctIndices: [2],
    explanation:
      'If your vehicle is over three years old, you must take it for a Ministry of Transport (MOT) test every year to verify roadworthiness and exhaust emissions. It is an offence to drive without a valid driving licence, motor insurance, road tax, or required MOT certificate.',
    memoryHook:
      '🌶️ Spice Hook: Count the letters in "M-O-T" = 3 letters → required at 3 years old!',
  },
  {
    id: 'q-ex14-24',
    examNumber: 14,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Which tax, based on the valuation band of a residential property, is collected by local authorities to help pay for local services such as libraries, street lighting, and rubbish collection?',
    options: [
      'Council Tax',
      'Value Added Tax (VAT)',
      'Corporation Tax',
      'National Insurance',
    ],
    correctIndices: [0],
    explanation:
      'Local authorities are funded by money from central government and by Council Tax, paid by households based on property value (with discounts or exemptions available, such as for single occupants or full-time students). Note: Northern Ireland uses a domestic rates system for the same purpose.',
    memoryHook:
      '🌶️ Spice Hook: "Local Council bins & lights = Council Tax!"',
  },

  // ============================================================================
  // MOCK EXAM 15 (q-ex15-01 .. q-ex15-24)
  // ============================================================================
  {
    id: 'q-ex15-01',
    examNumber: 15,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'single',
    prompt:
      'What is the core purpose of UK equality and anti-discrimination laws (consolidated in Great Britain under the Equality Act)?',
    options: [
      'To guarantee identical salaries for all jobs regardless of skill or hours worked',
      'To require every private business to employ an equal number of people from all four UK nations',
      'To abolish competitive job interviews in the civil service',
      'To ensure nobody is treated unfairly because of characteristics such as age, disability, sex, race, religion, marital status, or sexual orientation',
    ],
    correctIndices: [3],
    explanation:
      'UK laws protect citizens and residents from unfair discrimination in work, housing, and public services on grounds including age, disability, sex, pregnancy/maternity, race, religion or belief, marital/civil partnership status, gender reassignment, and sexual orientation.',
    memoryHook:
      '🌶️ Spice Hook: Equal Opportunity ≠ identical paychecks, it means fair treatment with ZERO unfair discrimination!',
  },
  {
    id: 'q-ex15-02',
    examNumber: 15,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'multiple',
    prompt:
      'Besides passing the Life in the UK Test, settlement/citizenship applicants usually need B1-level speaking and listening in English, Welsh, or Scottish Gaelic. Which TWO groups are exempt from taking a separate English test? (Choose TWO)',
    options: [
      'Anyone who has visited London as a tourist three times',
      'Applicants aged 65 or over',
      'Citizens of recognised majority English-speaking countries (or holders of a recognised degree taught in English)',
      'Anyone who holds a full UK driving licence',
    ],
    correctIndices: [1, 2],
    explanation:
      'Applicants usually demonstrate English at CEFR level B1 (ESOL Entry Level 3), unless exempt: notably applicants aged 65+ (or with a qualifying long-term physical/mental condition), nationals of majority English-speaking countries, or those holding an approved academic degree taught or researched in English.',
    memoryHook:
      '🌶️ Spice Hook: B1 English Pass-Card = "65+ seniors, English-taught degree grads, or majority English-speaking nationals!" (Driving licences don’t count!)',
  },
  {
    id: 'q-ex15-03',
    examNumber: 15,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'boolean',
    prompt: 'Does the name "Great Britain" include Northern Ireland?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No! "Great Britain" refers ONLY to England, Scotland, and Wales (the largest island). The official name of the sovereign country including Northern Ireland is "The United Kingdom of Great Britain and Northern Ireland".',
    memoryHook:
      '🌶️ Spice Hook: Classic Trap! Notice the official title says "Great Britain AND Northern Ireland": proving NI is NOT inside Great Britain!',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex15-04',
    examNumber: 15,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'single',
    prompt:
      'Where is Tynwald, which has met continuously for over 1,000 years and is often called the oldest continuous parliament in the world?',
    options: ['Jersey', 'The Isle of Man', 'Orkney', 'Gibraltar'],
    correctIndices: [1],
    explanation:
      'The Isle of Man (a Crown Dependency in the Irish Sea) has its own parliament called Tynwald, which has Norse origins and is the world’s oldest continuous parliamentary body.',
    memoryHook:
      '🌶️ Spice Hook: "Tynwald = Tin Man = Isle of MAN!" World’s oldest continuous parliament!',
  },
  {
    id: 'q-ex15-05',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'multiple',
    prompt:
      'Which TWO famous Victorian engineering projects were built by Isambard Kingdom Brunel (originally from Portsmouth)? (Choose TWO)',
    options: [
      'St Paul’s Cathedral in London',
      'The Great Western Railway (running from Paddington to the south-west and Wales)',
      'The Cenotaph on Whitehall',
      'The Clifton Suspension Bridge spanning the Avon Gorge in Bristol',
    ],
    correctIndices: [1, 3],
    explanation:
      'Isambard Kingdom Brunel (1806–1859) engineered tunnels, bridges, ships (such as the iron-hulled SS Great Britain), the Great Western Railway, and the iconic Clifton Suspension Bridge across the Avon Gorge in Bristol.',
    memoryHook:
      '🌶️ Spice Hook: "Brunel = Bridges, Boats & Broad-gauge Trains!" (Great Western Railway + Clifton Suspension Bridge + SS Great Britain!)',
  },
  {
    id: 'q-ex15-06',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Which author and poet was born in India in 1865, won the Nobel Prize in Literature in 1907, and wrote The Jungle Book and the poem If?',
    options: [
      'Thomas Hardy',
      'Robert Louis Stevenson',
      'Rudyard Kipling',
      'Graham Greene',
    ],
    correctIndices: [2],
    explanation:
      'Rudyard Kipling (1865–1936) was born in India and lived in India, the UK, and the USA. Reflecting the idea that the British Empire was a force for good, his works include The Jungle Book, Just So Stories, and the beloved poem If.',
    memoryHook:
      '🌶️ Spice Hook: "IF you read The Jungle Book, you’re reading Rudyard Kipling (born in India, 1865)!"',
  },
  {
    id: 'q-ex15-07',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'In the Boer War of 1899 to 1902 in South Africa, with whom did the British go to war?',
    options: [
      'Settlers from the Netherlands called the Boers',
      'French colonial troops from Algeria',
      'Spanish naval forces from Cuba',
      'Russian imperial regiments',
    ],
    correctIndices: [0],
    explanation:
      'The Boer War (1899–1902) took place in South Africa against settlers originally from the Netherlands known as the Boers. Lasting over three years with heavy casualties from fighting and disease, it sparked public questioning about the future of the Empire.',
    memoryHook:
      '🌶️ Spice Hook: "1899–1902 Boer War = Dutch-descended Boer farmers in South Africa!"',
  },
  {
    id: 'q-ex15-08',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'What happened in Ireland in 1922 as a result of the 1921 Peace Treaty signed with the British government?',
    options: [
      'The whole island of Ireland became an independent republic immediately',
      'Northern Ireland joined Scotland under a shared parliament in Edinburgh',
      'Ireland first joined the United Kingdom under a new Act of Union',
      'Ireland was divided into two: six mainly Protestant northern counties remained in the UK as Northern Ireland, and the rest became the Irish Free State',
    ],
    correctIndices: [3],
    explanation:
      'In 1921 a peace treaty was signed and in 1922 Ireland split into two countries: the six northern, mainly Protestant counties remained part of the UK under the name Northern Ireland (with a devolved parliament at Stormont), while the rest became the Irish Free State (which became a republic in 1949).',
    memoryHook:
      '🌶️ Spice Hook: "1921 Treaty → 1922 Two!" Six northern counties stayed UK (Northern Ireland); the rest became the Irish Free State (Republic in 1949)!',
  },
  {
    id: 'q-ex15-09',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'boolean',
    prompt:
      'True or False: In 1936, the British Broadcasting Corporation (BBC) began the world’s first regular public television service.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! Following the start of radio broadcasts in 1922, the BBC launched the world’s first regular high-definition public television service from Alexandra Palace in London in 1936.',
    memoryHook:
      '🌶️ Spice Hook: "1920s Baird invented TV → 1936 BBC broadcast the world’s first regular TV service!"',
  },
  {
    id: 'q-ex15-10',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'What aggressive act by Adolf Hitler caused Britain and France to declare war on Germany in September 1939?',
    options: [
      'The bombing of Pearl Harbor',
      'The invasion of Poland',
      'The occupation of the Rhineland in 1936',
      'The sinking of HMS Hood',
    ],
    correctIndices: [1],
    explanation:
      'After Nazi Germany occupied Austria and invaded Czechoslovakia, Adolf Hitler invaded Poland on 1 September 1939. Honouring their guarantee to Poland, Britain and France declared war on Germany on 3 September 1939.',
    memoryHook:
      '🌶️ Spice Hook: "Sept 1939: Hitler invaded Poland → Britain & France declared WWII!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex15-11',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'Which Minister of Health led the establishment of the National Health Service (NHS) in 1948?',
    options: [
      'William Beveridge',
      'R. A. Butler',
      'Aneurin ("Nye") Bevan',
      'Anthony Eden',
    ],
    correctIndices: [2],
    explanation:
      'In 1948, Welsh Labour Minister of Health Aneurin ("Nye") Bevan led the creation of the National Health Service (NHS), guaranteeing a minimum standard of healthcare for all, free at the point of use. (Watch the classic trap: Beveridge wrote the 1942 report; Butler passed the 1944 Education Act; Bevan launched the 1948 NHS!)',
    memoryHook:
      '🌶️ Spice Hook: Triple-B Decoder! "Beveridge = 1942 Blueprint, Butler = 1944 Books (Schools), Nye BEVAN = 1948 Bedside (NHS)!"',
  },
  {
    id: 'q-ex15-12',
    examNumber: 15,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'Who became the United Kingdom’s first woman Prime Minister in 1979 and led the country during the 1982 Falklands War?',
    options: [
      'Margaret Thatcher',
      'Emmeline Pankhurst',
      'Theresa May',
      'Barbara Castle',
    ],
    correctIndices: [0],
    explanation:
      'Conservative leader Margaret Thatcher became the UK’s first female Prime Minister in 1979 and served until 1990 (the longest-serving PM of the 20th century). Her government privatised nationalised industries, deregulated London’s financial markets, and sent a taskforce to recover the Falkland Islands after Argentina invaded in 1982.',
    memoryHook:
      '🌶️ Spice Hook: "1979 Thatcher = UK’s First Female PM; 1982 = Falklands Taskforce!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex15-13',
    examNumber: 15,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which British computer scientist invented the World Wide Web, successfully transferring information via the web for the first time on 25 December 1990?',
    options: [
      'Alan Turing',
      'Sir Clive Sinclair',
      'James Dyson',
      'Sir Tim Berners-Lee',
    ],
    correctIndices: [3],
    explanation:
      'British scientist Sir Tim Berners-Lee (born 1955) invented the World Wide Web (HTTP, HTML, and URLs), putting the first webpage live and transferring data via the web on Christmas Day 1990.',
    memoryHook:
      '🌶️ Spice Hook: "WWW = World Wide Web = Sir Tim Berners-Lee’s 1990 Christmas gift to the world!"',
  },
  {
    id: 'q-ex15-14',
    examNumber: 15,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which British mathematician developed the theoretical "Turing machine" in the 1930s and played a key role in cracking German wartime codes at Bletchley Park?',
    options: [
      'Sir Peter Mansfield',
      'Alan Turing',
      'Francis Crick',
      'Stephen Hawking',
    ],
    correctIndices: [1],
    explanation:
      'Alan Turing (1912–1954) proposed the "Turing machine": a mathematical model of computation foundational to modern computer science: and worked at Bletchley Park breaking German Enigma ciphers during WWII. His portrait now appears on the Bank of England £50 note.',
    memoryHook:
      '🌶️ Spice Hook: "Turing = Turing Machine + Enigma Codebreaker!" Father of modern computer science!',
  },
  {
    id: 'q-ex15-15',
    examNumber: 15,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which 20th-century English artist from Yorkshire is best known for large, abstract cast-bronze sculptures featuring reclining figures and hollowed-out spaces?',
    options: [
      'David Hockney',
      'John Petts',
      'Henry Moore',
      'Thomas Gainsborough',
    ],
    correctIndices: [2],
    explanation:
      'Henry Moore (1898–1986) gained international fame for monumental abstract bronze and stone sculptures inspired by the human figure and landscape. (David Hockney was a major Pop art figure; John Petts was a Welsh engraver and stained-glass artist.)',
    memoryHook:
      '🌶️ Spice Hook: "Less solid, MOORE hollow curves!" Henry Moore = giant abstract bronze sculptures!',
  },
  {
    id: 'q-ex15-16',
    examNumber: 15,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which London venue hosts the main concerts (including the famous "Last Night") of the BBC Proms, an eight-week summer season of daily orchestral classical music?',
    options: [
      'The Royal Albert Hall',
      'The Globe Theatre',
      'Wembley Stadium',
      'Tate Modern',
    ],
    correctIndices: [0],
    explanation:
      'Organised by the BBC since 1927, The Proms ("Promenade Concerts") is an eight-week summer festival of more than 70 concerts held in various venues across the UK, centred on the Royal Albert Hall in London.',
    memoryHook:
      '🌶️ Spice Hook: "8 weeks of Proms under the Royal Albert Hall dome!"',
  },
  {
    id: 'q-ex15-17',
    examNumber: 15,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which British animator has won four Oscars for animated films, including three featuring Wallace and Gromit?',
    options: [
      'Sir Ridley Scott',
      'Sir Alfred Hitchcock',
      'Sir David Lean',
      'Nick Park',
    ],
    correctIndices: [3],
    explanation:
      'Britain remains a powerhouse in animation and special effects: Nick Park won four Academy Awards for stop-motion animations, including three starring eccentric inventor Wallace and his loyal dog Gromit. (Hitchcock, Lean, and Ridley Scott are celebrated live-action British film directors.)',
    memoryHook:
      '🌶️ Spice Hook: "Take Gromit for a walk in Nick PARK!" Nick Park = Wallace & Gromit!',
  },
  {
    id: 'q-ex15-18',
    examNumber: 15,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'single',
    prompt:
      'In which English county is the Eden Project located, famous for its giant bubble-like biomes housing plants from around the world?',
    options: ['Cumbria', 'Cornwall', 'Kent', 'Northumberland'],
    correctIndices: [1],
    explanation:
      'The Eden Project is located in Cornwall, in the south-west of England. Its giant rainforest and Mediterranean biomes are also a charity running environmental and social projects internationally.',
    memoryHook:
      '🌶️ Spice Hook: "Warm tropical biomes down in sunny south-west CORNWALL = Eden Project!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex15-19',
    examNumber: 15,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'True or False: In England, Wales, and Northern Ireland, members of the general public are freely allowed inside Youth Courts to watch cases involving 10- to 17-year-olds.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'False! Youth Courts hear cases for young people aged 10 to 17 (presided over by up to three specially trained magistrates or a District Judge). Members of the public are NOT allowed in Youth Courts, and the accused young person’s name or photograph cannot normally be published in the media.',
    memoryHook:
      '🌶️ Spice Hook: "Youth Court (10–17) = Closed doors & no press photos!" (Most serious crimes by youths can go to Crown Court.)',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex15-20',
    examNumber: 15,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In Scotland, which specialised system deals with children and young people who have committed an offence or are in need of care and protection?',
    options: [
      'The Coroners’ Bench',
      'The Privy Council Panel',
      'The Children’s Hearings System',
      'The Small Claims Tribunal',
    ],
    correctIndices: [2],
    explanation:
      'Instead of Youth Courts (used in England, Wales, and Northern Ireland), Scotland uses a welfare-focused system called the Children’s Hearings System when children or young people commit offences or require protection.',
    memoryHook:
      '🌶️ Spice Hook: "E/W/NI = Youth Court; Scotland = Children’s Hearings System!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex15-21',
    examNumber: 15,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'Do directly elected Police and Crime Commissioners (PCCs) in England and Wales instruct the police on whom to arrest in day-to-day operational policing?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No! The police service is operationally independent of government and politicians. Elected Police and Crime Commissioners (PCCs) in England and Wales set local police priorities, agree the local policing budget, and appoint (or dismiss) the Chief Constable, but cannot interfere in individual arrests or investigations.',
    memoryHook:
      '🌶️ Spice Hook: "PCCs set Priorities & Purse-strings, NEVER who gets put in handcuffs!"',
  },
  {
    id: 'q-ex15-22',
    examNumber: 15,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Which TWO of the following are examples of civil law matters rather than criminal law offences? (Choose TWO)',
    options: [
      'Carrying a concealed weapon in a public street',
      'Selling tobacco or alcohol to someone under 18',
      'Disputes between landlords and tenants over a housing lease',
      'Claims of unfair dismissal or discrimination in the workplace',
    ],
    correctIndices: [2, 3],
    explanation:
      'Civil law settles disputes between individuals or groups: including housing law (landlord/tenant disputes), consumer rights, employment law (unfair dismissal), debt, and family law. Carrying weapons and underage sales of tobacco/alcohol are criminal offences prosecuted by the state.',
    memoryHook:
      '🌶️ Spice Hook: "Civil = Citizen vs Citizen (housing, debt, jobs, faulty toaster); Criminal = Crime against society!"',
  },
  {
    id: 'q-ex15-23',
    examNumber: 15,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'In which TWO situations are you required by law to hold a valid TV Licence in the UK (unless covered by an exemption such as aged 75+ receiving Pension Credit)? (Choose TWO)',
    options: [
      'Watching or recording live television programmes on any channel or device',
      'Downloading or watching any programme on BBC iPlayer',
      'Listening exclusively to FM or digital radio stations in your car',
      'Playing offline video games on a television monitor',
    ],
    correctIndices: [0, 1],
    explanation:
      'By law, a household needs a TV Licence (which funds the BBC) to watch or record programmes as they are being shown live on TV or an online TV service on any device (TV, laptop, phone), OR to download/watch any content on BBC iPlayer. Watching without a licence is a criminal offence carrying a fine up to £1,000.',
    memoryHook:
      '🌶️ Spice Hook: TV Licence Rule = "ANY live TV broadcast + ANY BBC iPlayer!" (Radio & offline gaming are free!)',
  },
  {
    id: 'q-ex15-24',
    examNumber: 15,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'While most young people born or raised in the UK are sent a National Insurance (NI) number just before their 16th birthday, whom must a new adult resident with permission to work contact to apply for one?',
    options: [
      'The Department for Work and Pensions (DWP)',
      'The Driver and Vehicle Licensing Agency (DVLA)',
      'Their local County Court',
      'The Electoral Commission',
    ],
    correctIndices: [0],
    explanation:
      'A National Insurance number ensures your tax and NI contributions are properly recorded against your name. Anyone with permission to work in the UK who does not already have an NI number applies for one through the Department for Work and Pensions (DWP) / Jobcentre Plus (or gov.uk). (Note: having an NI number alone does NOT prove the right to work!)',
    memoryHook:
      '🌶️ Spice Hook: "Need an NI number for Work & Pension? Call the Department for Work and Pensions (DWP)!"',
  },

  // ============================================================================
  // MOCK EXAM 16 (q-ex16-01 .. q-ex16-24)
  // ============================================================================
  {
    id: 'q-ex16-01',
    examNumber: 16,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'boolean',
    prompt:
      'True or False: Looking after the area in which you live and protecting the environment is one of the shared responsibilities of everyone living in the UK.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! Alongside obeying the law, respecting others’ rights and opinions, treating others fairly, and looking after yourself and your family, everyone in the UK shares the responsibility to look after their local area and the environment.',
    memoryHook:
      '🌶️ Spice Hook: "Spice Up Your Street, don’t litter your feet!" Caring for your neighbourhood & environment is an official UK responsibility!',
  },
  {
    id: 'q-ex16-02',
    examNumber: 16,
    chapterId: 'ch1',
    subtopicId: 'ch1-citizenship',
    type: 'single',
    prompt:
      'At a UK Citizenship Ceremony, to whom do new citizens swear or affirm faithful allegiance in the Oath (or Affirmation) of Allegiance?',
    options: [
      'The Prime Minister and the Cabinet',
      'The Speaker of the House of Commons',
      'The Supreme Court of the United Kingdom',
      'His Majesty King Charles III, His Heirs and Successors',
    ],
    correctIndices: [3],
    explanation:
      'New adult British citizens swear (or affirm) faithful allegiance to His Majesty King Charles III, His Heirs and Successors according to law, followed by a Pledge of loyalty to the United Kingdom and its democratic rights, freedoms, and laws.',
    memoryHook:
      '🌶️ Spice Hook: Two-Step Ceremony = "Oath to the Crown (King Charles III), Pledge to the Country (UK Democracy & Laws)!"',
  },
  {
    id: 'q-ex16-03',
    examNumber: 16,
    chapterId: 'ch2',
    subtopicId: 'ch2-symbols',
    type: 'boolean',
    prompt:
      'True or False: The Welsh red dragon appears at the centre of the official Union Flag alongside the crosses of St George, St Andrew, and St Patrick.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'False! The official Union Flag combines ONLY three crosses (St George for England, St Andrew for Scotland, and St Patrick for Ireland). Because the Principality of Wales was already united with England when the first Union Flag was created in 1606, the Welsh dragon does not appear on it.',
    memoryHook:
      '🌶️ Spice Hook: Geri’s Union Jack dress check, NO dragon! Wales was already united with England before 1606!',
    visualId: 'union-jack',
  },
  {
    id: 'q-ex16-04',
    examNumber: 16,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt:
      'Which peak in the Mourne Mountains is the highest mountain in Northern Ireland?',
    options: ['Ben Nevis', 'Slieve Donard', 'Snowdon', 'Scafell Pike'],
    correctIndices: [1],
    explanation:
      'Slieve Donard (850m / 2,789 ft) in the Mourne Mountains, County Down, is the highest peak in Northern Ireland. (Ben Nevis is highest in Scotland/UK, Snowdon in Wales, and Scafell Pike in England.)',
    memoryHook:
      '🌶️ Spice Hook: Four-Nation Peak Match, "Ben Nevis (Scot), Snowdon (Wales), Scafell Pike (Eng), Slieve Donard (NI)!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex16-05',
    examNumber: 16,
    chapterId: 'ch2',
    subtopicId: 'ch2-territories',
    type: 'boolean',
    prompt:
      'True or False: Banknotes issued by designated banks in Scotland and Northern Ireland are valid currency across the UK, even though shops are not legally obliged to accept them.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! Both Northern Ireland and Scotland have their own banknotes (£5, £10, £20, £50, etc.) which are valid currency everywhere in the UK; however, shops and businesses have legal discretion over whether to accept them.',
    memoryHook:
      '🌶️ Spice Hook: "Scottish & NI notes are 100% real £ Sterling, valid UK-wide, though picky shops can say no!"',
  },
  {
    id: 'q-ex16-06',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Who was born in Manchester in 1858 and founded the Women’s Social and Political Union (WSPU) in 1903 to campaign for women’s right to vote?',
    options: [
      'Florence Nightingale',
      'Mary Seacole',
      'Emmeline Pankhurst',
      'Octavia Hill',
    ],
    correctIndices: [2],
    explanation:
      'Emmeline Pankhurst (1858–1928), born in Manchester, set up the Women’s Franchise League in 1889 and founded the WSPU in 1903. Its members: called "suffragettes", used civil disobedience, chaining themselves to railings, smashing windows, and going on hunger strike for women’s suffrage.',
    memoryHook:
      '🌶️ Spice Hook: Original Girl Power Icon! "Manchester 1858 → WSPU 1903 = Emmeline Pankhurst & the Suffragettes!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex16-07',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'How were women granted the right to vote in UK parliamentary elections across the 1918 and 1928 Acts?',
    options: [
      'Women aged 30+ (meeting property rules) gained the vote in 1918, and in 1928 the voting age was lowered to 21 on equal terms with men',
      'All women aged 18+ won the vote in 1903, lowered to 16 in 1928',
      'Women aged 25+ gained the vote in 1914, and men lost property requirements in 1945',
      'Women first gained the right to vote in 1948 alongside the creation of the NHS',
    ],
    correctIndices: [0],
    explanation:
      'In 1918, in recognition of women’s vital contribution to the First World War effort, women over 30 who were householders (or married to householders) gained the vote and the right to stand for Parliament. In 1928: shortly before Emmeline Pankhurst died, women were given the vote at age 21, equal to men.',
    memoryHook:
      '🌶️ Spice Hook: Two-Step Suffrage = "1918: 30+ women in the door; 1928: 21 equal score!" (Voting lowered from 21 to 18 later in 1969!)',
  },
  {
    id: 'q-ex16-08',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'What major nine-day industrial conflict took place in Britain in May 1926 when transport and industrial workers walked out in support of coal miners facing wage cuts?',
    options: [
      'The Winter of Discontent',
      'The Tolpuddle Protest',
      'The Chartist March',
      'The General Strike',
    ],
    correctIndices: [3],
    explanation:
      'In 1926, disagreement between coal mine owners and miners over pay and working conditions led the Trades Union Congress (TUC) to call the General Strike, bringing much of British transport and heavy industry to a standstill.',
    memoryHook:
      '🌶️ Spice Hook: "1926 = The General Strike!" Millions walked out for the coal miners!',
  },
  {
    id: 'q-ex16-09',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'Who replaced Neville Chamberlain as Prime Minister in May 1940 and inspired Britain during WWII with lines such as "I have nothing to offer but blood, toil, tears and sweat"?',
    options: [
      'David Lloyd George',
      'Winston Churchill',
      'Clement Attlee',
      'Anthony Eden',
    ],
    correctIndices: [1],
    explanation:
      'When Germany invaded France, Belgium, and the Netherlands in May 1940, Winston Churchill (1874–1965) became Prime Minister of a cross-party wartime coalition. In 2002, he was voted the Greatest Briton of all time by the public.',
    memoryHook:
      '🌶️ Spice Hook: "May 1940: Chamberlain out, Churchill in, We shall fight on the beaches!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex16-10',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'Roughly how many British and Allied troops were rescued from the beaches of Dunkirk in France in late May and early June 1940 with the help of Royal Navy warships and small civilian boats?',
    options: [
      'Around 25,000 men',
      'Around 60,000 men',
      'More than 300,000 men',
      'More than 2 million men',
    ],
    correctIndices: [2],
    explanation:
      'During the Evacuation of Dunkirk in 1940, hundreds of volunteer civilian pleasure boats and fishing vessels crossed the Channel alongside the Royal Navy under heavy fire, rescuing more than 300,000 British and French soldiers and giving rise to the phrase "the Dunkirk spirit".',
    memoryHook:
      '🌶️ Spice Hook: Number Check! "60k = Somme Day 1 casualties; 300k+ = Dunkirk miracle rescue; 2M+ = Total WWI British casualties!"',
  },
  {
    id: 'q-ex16-11',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'What major reform did Conservative Minister R. A. Butler introduce through the Education Act 1944 (often called "the Butler Act")?',
    options: [
      'Free university tuition for all overseas students',
      'Compulsory Latin examinations for all civil servants',
      'Free secondary education in England and Wales and a clear split between primary and secondary schools',
      'The abolition of all independent fee-paying schools',
    ],
    correctIndices: [2],
    explanation:
      'Even before WWII ended, R. A. Butler oversaw the Education Act 1944 ("the Butler Act"), introducing free secondary education for all pupils in England and Wales and establishing a clear division between primary and secondary schooling (usually at age 11).',
    memoryHook:
      '🌶️ Spice Hook: "1944 Butler Act served up FREE Secondary School!"',
  },
  {
    id: 'q-ex16-12',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'multiple',
    prompt:
      'In 1947, independence was granted to nine colonies/territories: most famously including which TWO new independent South Asian nations? (Choose TWO)',
    options: ['India', 'Australia', 'Pakistan', 'Canada'],
    correctIndices: [0, 2],
    explanation:
      'Under Clement Attlee’s post-war government, decolonisation accelerated: in 1947 independence was granted to India and Pakistan (with Ceylon, now Sri Lanka: following in 1948), beginning a peaceful transition from Empire to Commonwealth.',
    memoryHook:
      '🌶️ Spice Hook: "1947 Partition & Freedom = India & Pakistan!"',
  },
  {
    id: 'q-ex16-13',
    examNumber: 16,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'Building on peace talks begun under Prime Minister John Major, which historic 1998 accord signed under Tony Blair’s Labour government established a power-sharing Northern Ireland Assembly?',
    options: [
      'The Good Friday (Belfast) Agreement',
      'The Treaty of Runnymede',
      'The Statute of Rhuddlan',
      'The Maastricht Treaty',
    ],
    correctIndices: [0],
    explanation:
      'Elected in 1997, Tony Blair’s government built on the Northern Ireland peace process started by Conservative PM John Major, concluding the Good Friday Agreement (Belfast Agreement) in 1998 and delivering devolved parliaments/assemblies to Scotland, Wales, and Northern Ireland.',
    memoryHook:
      '🌶️ Spice Hook: "Major started the talks, Blair sealed the deal, 1998 Good Friday Agreement = Peace in Northern Ireland!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex16-14',
    examNumber: 16,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO pioneering reproductive and genetic breakthroughs were achieved in Britain in 1978 and 1996 respectively? (Choose TWO)',
    options: [
      'The birth of the world’s first "test-tube baby" via in-vitro fertilisation (IVF), pioneered by Patrick Steptoe and Sir Robert Edwards',
      'Performing the world’s first vaccination against smallpox by Edward Jenner',
      'Discovering the circulation of blood by William Harvey',
      'Cloning the first mammal from an adult cell: Dolly the sheep, led by Sir Ian Wilmut and Keith Campbell',
    ],
    correctIndices: [0, 3],
    explanation:
      'Gynaecologist Patrick Steptoe and physiologist Sir Robert Edwards pioneered IVF therapy, leading to the world’s first "test-tube baby" (Louise Brown) in Oldham in 1978. In 1996 at the Roslin Institute in Scotland, Sir Ian Wilmut and Keith Campbell cloned Dolly the sheep, the first mammal cloned from an adult somatic cell.',
    memoryHook:
      '🌶️ Spice Hook: "1978 Steptoe & Edwards = First IVF Baby; 1996 Wilmut & Campbell = Dolly the Cloned Sheep!"',
  },
  {
    id: 'q-ex16-15',
    examNumber: 16,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which British scientist co-invented the MRI (magnetic resonance imaging) scanner, enabling doctors to obtain detailed internal images of the human body without surgery or X-rays?',
    options: [
      'Sir Christopher Cockerell',
      'John Logie Baird',
      'Sir Frank Whittle',
      'Sir Peter Mansfield',
    ],
    correctIndices: [3],
    explanation:
      'Physicist Sir Peter Mansfield (1933–2017) of the University of Nottingham co-invented the MRI scanner, earning the 2003 Nobel Prize in Physiology or Medicine for transforming modern medical imaging.',
    memoryHook:
      '🌶️ Spice Hook: "MRI scans inside a MAN’S-FIELD of organs!" Mansfield = MRI scanner!',
  },
  {
    id: 'q-ex16-16',
    examNumber: 16,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which 20th-century British architect designed war memorials across the world: including the Cenotaph on Whitehall in London, as well as New Delhi for the British government in India?',
    options: [
      'Robert Adam',
      'Sir Edwin Lutyens',
      'Sir Norman Foster',
      'Dame Zaha Hadid',
    ],
    correctIndices: [1],
    explanation:
      'Sir Edwin Lutyens (1869–1944) designed New Delhi and after WWI created the Cenotaph in Whitehall, the centrepiece of Britain’s annual Remembrance Day ceremony. (Robert Adam was 18th-century neoclassical; Norman Foster, Richard Rogers, and Zaha Hadid are renowned contemporary British architects.)',
    memoryHook:
      '🌶️ Spice Hook: "Lutyens = London’s Cenotaph + Lutyens’ Delhi!"',
  },
  {
    id: 'q-ex16-17',
    examNumber: 16,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO major annual UK prizes recognise contemporary visual art (hosted at Tate Britain) and excellence in London theatre, respectively? (Choose TWO)',
    options: [
      'The Mercury Prize',
      'The Turner Prize',
      'The Laurence Olivier Awards',
      'The BAFTA Awards',
    ],
    correctIndices: [1, 2],
    explanation:
      'Established in 1984 and named after painter Joseph Turner, the Turner Prize celebrates contemporary art (shortlisted works exhibited at Tate Britain). Named after legendary actor Lord Olivier, the Laurence Olivier Awards honour professional London/West End theatre. (Mercury & BRITs are for music; BAFTAs are for film and TV.)',
    memoryHook:
      '🌶️ Spice Hook: "Turner painted → Turner Prize (Art); Olivier acted on stage → Olivier Awards (Theatre)!"',
  },
  {
    id: 'q-ex16-18',
    examNumber: 16,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'boolean',
    prompt:
      'True or False: "Big Ben" is officially the name of the clock tower at the Houses of Parliament, rather than the great bell inside it.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'False! "Big Ben" is actually the nickname for the great bell of the striking clock (over 150 years old). The clock tower itself: once simply called the Clock Tower, was officially renamed "Elizabeth Tower" in 2012 to mark Queen Elizabeth II’s Diamond Jubilee! Nearby London icons include the 443-foot (135m) London Eye and the Tower of London (where Yeoman Warders, or "Beefeaters", guard the Crown Jewels).',
    memoryHook:
      '🌶️ Spice Hook: Classic Landmark Trap! "Big Ben is the BELL that goes BONG; Elizabeth Tower is the tall stone home!"',
  },
  {
    id: 'q-ex16-19',
    examNumber: 16,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Established in October 2009 to replace the judicial role of the House of Lords, what is the final and highest court of appeal in the United Kingdom?',
    options: [
      'The Crown Court',
      'The High Court of Justice',
      'The Supreme Court of the UK',
      'The Privy Magistrates’ Chamber',
    ],
    correctIndices: [2],
    explanation:
      'The Supreme Court of the UK sits in Parliament Square, London, and serves as the final court of appeal for all UK civil cases and for criminal cases from England, Wales, and Northern Ireland (Scottish criminal appeals stop at the High Court of Justiciary in Edinburgh except on devolution/human-rights points).',
    memoryHook:
      '🌶️ Spice Hook: "Top of the legal pyramid since 2009 = The UK Supreme Court!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex16-20',
    examNumber: 16,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In England, Wales, and Northern Ireland, where are serious criminal offences (such as robbery or murder) tried before a judge and a 12-person jury?',
    options: [
      'A Crown Court',
      'A Magistrates’ Court',
      'A County Court',
      'A Small Claims Court',
    ],
    correctIndices: [0],
    explanation:
      'In England, Wales, and Northern Ireland, serious ("indictable") criminal cases are tried in a Crown Court with a professional judge and a jury of 12 members of the public chosen randomly from the electoral register.',
    memoryHook:
      '🌶️ Spice Hook: "Minor = Magistrates (no jury); Major crime = Crown Court (Judge + 12 Jury)!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex16-21',
    examNumber: 16,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Which well-known independent charity provides free, confidential information and advice across the UK to help people with legal, debt, consumer, and housing problems (and can help find a solicitor)?',
    options: [
      'The National Trust',
      'Hansard',
      'The Crown Prosecution Service',
      'Citizens Advice',
    ],
    correctIndices: [3],
    explanation:
      'Citizens Advice (formerly Citizens Advice Bureau) offers free, impartial practical guidance online and in local offices on consumer, housing, employment, benefits, and legal issues, and can point you toward qualified solicitors (trained lawyers who advise clients, prepare documents, and negotiate settlements).',
    memoryHook:
      '🌶️ Spice Hook: "Citizen needs Advice? Go to Citizens Advice, and hire a Solicitor for legal paperwork!"',
  },
  {
    id: 'q-ex16-22',
    examNumber: 16,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In the UK, what are the minimum ages at which you can legally ride a moped (up to 50cc) and drive a car on public roads, respectively?',
    options: [
      '15 for a moped and 16 for a car',
      '16 for a moped and 17 for a car',
      '17 for a moped and 18 for a car',
      '18 for both a moped and a car',
    ],
    correctIndices: [1],
    explanation:
      'To apply for a provisional licence and ride a moped (maximum engine size 50cc, top speed 28 mph / 45 km/h), you must be at least 16. To drive a car, you must be at least 17 (or 16 if receiving the higher/enhanced mobility rate of disability benefit) and pass both a computer theory test and practical driving test.',
    memoryHook:
      '🌶️ Spice Hook: Stepping-Stone Ages, "16 = Moped (50cc), 17 = Car, 18 = Vote / Alcohol / Tobacco / Lottery!"',
  },
  {
    id: 'q-ex16-23',
    examNumber: 16,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Almost everybody in the UK in paid work pays National Insurance contributions. Which TWO state services and benefits does National Insurance help pay for? (Choose TWO)',
    options: [
      'Local rubbish collection and council libraries',
      'The State Retirement Pension (and contributory benefits such as maternity allowance)',
      'BBC television channels via the TV Licence',
      'The National Health Service (NHS)',
    ],
    correctIndices: [1, 3],
    explanation:
      'Money raised from National Insurance contributions pays for contributory state benefits: notably the State Pension, jobseeker/sickness/maternity support, and helps fund the National Health Service (NHS).',
    memoryHook:
      '🌶️ Spice Hook: "National Insurance = NHS + Nest-egg State Pension!"',
  },
  {
    id: 'q-ex16-24',
    examNumber: 16,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Which TWO voluntary bodies give parents and local community members a formal role in setting strategic direction, accountability, and support for local state schools across the UK? (Choose TWO)',
    options: [
      'Parliamentary Whips',
      'Police and Crime Commissioners',
      'School governors (in England, Wales, and Northern Ireland)',
      'Parent Councils / school boards (in Scotland)',
    ],
    correctIndices: [2, 3],
    explanation:
      'Volunteering in local schools is a vital form of community participation: people aged 18+ can serve as school governors (raising standards, setting strategic direction, holding the headteacher to account) in England, Wales, and Northern Ireland, or join Parent Councils in Scotland.',
    memoryHook:
      '🌶️ Spice Hook: "Governors in E/W/NI + Parent Councils in Scotland = Community voices in schools!"',
  },

  // ============================================================================
  // MOCK EXAM 17 (q-ex17-01 .. q-ex17-24)
  // ============================================================================
  {
    id: 'q-ex17-01',
    examNumber: 17,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'multiple',
    prompt:
      'In return for respecting UK laws and shared responsibilities, which TWO fundamental freedoms does the United Kingdom offer to its residents and citizens? (Choose TWO)',
    options: [
      'A right to a fair trial',
      'Freedom from unfair discrimination',
      'Exemption from paying Income Tax for the first five years',
      'Guaranteed election as a Member of Parliament',
    ],
    correctIndices: [0, 1],
    explanation:
      'The official handbook highlights five core freedoms offered by the UK: freedom of belief and religion, freedom of speech, freedom from unfair discrimination, a right to a fair trial, and a right to join in the election of a government.',
    memoryHook:
      '🌶️ Spice Hook: Five UK Freedoms = "Belief, Speech, No unfair discrimination, Fair trial, Vote!"',
  },
  {
    id: 'q-ex17-02',
    examNumber: 17,
    chapterId: 'ch1',
    subtopicId: 'ch1-principles',
    type: 'boolean',
    prompt:
      'Is it legal in the UK to take a girl or woman abroad for female genital mutilation (FGM) if the practice is permitted in that destination country?',
    options: ['Yes', 'No'],
    correctIndices: [1],
    explanation:
      'No! Practising FGM in the UK OR taking a girl or woman abroad for FGM is a serious criminal offence under UK law, regardless of local customs abroad.',
    memoryHook:
      '🌶️ Spice Hook: Zero loopholes! FGM at home OR taking someone abroad for FGM = 100% criminal offence!',
  },
  {
    id: 'q-ex17-03',
    examNumber: 17,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'single',
    prompt:
      'Roughly what is the longest distance on the mainland from John O’Groats on the north coast of Scotland to Land’s End in the south-west corner of England?',
    options: [
      'About 300 miles (480 km)',
      'About 550 miles (885 km)',
      'About 870 miles (1,400 km)',
      'About 1,500 miles (2,400 km)',
    ],
    correctIndices: [2],
    explanation:
      'The longest mainland distance from John O’Groats (north coast of Scotland) to Land’s End (south-west tip of Cornwall, England) is about 870 miles (approximately 1,400 km). Most parts of Britain are no more than 75 miles from the sea, and at its widest Great Britain is about 300 miles across.',
    memoryHook:
      '🌶️ Spice Hook: "8-7-0 miles top to toe (John O’Groats to Land’s End); 300 miles side to side!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex17-04',
    examNumber: 17,
    chapterId: 'ch2',
    subtopicId: 'ch2-nations',
    type: 'multiple',
    prompt:
      'Alongside the capital city Cardiff, which TWO of the following cities are located in Wales? (Choose TWO)',
    options: ['Swansea', 'Aberdeen', 'Newport', 'Lisburn'],
    correctIndices: [0, 2],
    explanation:
      'Cardiff, Swansea, and Newport (along with Wrexham, Bangor, St Davids, and St Asaph) are cities in Wales. Aberdeen is in Scotland, and Lisburn is in Northern Ireland.',
    memoryHook:
      '🌶️ Spice Hook: South Wales Trio along the M4 = "Cardiff, Swansea & Newport!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex17-05',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-empire-industry',
    type: 'single',
    prompt:
      'Which monarch became queen in 1837 at the age of 18 and reigned for almost 64 years until 1901, presiding over the height of Britain’s industrial power and vast global Empire?',
    options: ['Queen Anne', 'Queen Victoria', 'Queen Elizabeth I', 'Queen Mary II'],
    correctIndices: [1],
    explanation:
      'Queen Victoria reigned from 1837 to 1901 (almost 64 years: the Victorian Age). During her reign, the British Empire grew to cover up to 400 million people worldwide, trade boomed, and major social, railway, and public-health reforms transformed Britain.',
    memoryHook:
      '🌶️ Spice Hook: Posh Spice’s royal namesake! "1837–1901 = Queen Victoria (almost 64 years of the Victorian Age)!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex17-06',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'boolean',
    prompt:
      'True or False: During the Great Depression of the 1930s, parts of the UK suffered mass unemployment in traditional heavy industries such as shipbuilding, while new light industries including car manufacturing and aviation grew.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! The 1929 global downturn led to the Great Depression of the 1930s: coal, steel, and shipbuilding regions (especially in Scotland, Wales, Northern Ireland, and northern England) suffered severe unemployment, yet falling prices meant those in work had more disposable income, fuelling house-building and new car and aviation industries in the Midlands and South.',
    memoryHook:
      '🌶️ Spice Hook: 1930s Two-Speed Britain = "Ships & coal slumped; Cars, planes & suburbs jumped!"',
  },
  {
    id: 'q-ex17-07',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'multiple',
    prompt:
      'During "the Blitz" in 1940–1941, German bombers mounted sustained night-time raids on British cities. Which TWO cities are specifically highlighted in the handbook for suffering massive destruction (including the near-total destruction of one city’s cathedral)? (Choose TWO)',
    options: ['London', 'St Andrews', 'Inverness', 'Coventry'],
    correctIndices: [0, 3],
    explanation:
      'After losing the daylight Battle of Britain, the Luftwaffe bombed British cities by night ("the Blitz"). London suffered massive damage (especially the East End Docks), and Coventry was almost totally destroyed in a single devastating raid in November 1940, including its medieval cathedral.',
    memoryHook:
      '🌶️ Spice Hook: Blitz Twin Symbols of Resilience = "London (East End / St Paul’s standing) & Coventry (Cathedral bombed)!"',
  },
  {
    id: 'q-ex17-08',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'Where did British, American, Canadian, and Allied forces land on 6 June 1944 ("D-Day") to open the liberation of Western Europe from Nazi occupation?',
    options: [
      'The beaches of Dunkirk',
      'The Rock of Gibraltar',
      'The beaches of Normandy',
      'The coast of Sicily',
    ],
    correctIndices: [2],
    explanation:
      'On 6 June 1944 ("D-Day"), Allied forces landed in Normandy in northern France, winning a decisive foothold and pressing on through France and into Germany until Allied victory in Europe (VE Day) in May 1945.',
    memoryHook:
      '🌶️ Spice Hook: Don’t swap the French beaches! "1940 Dunkirk = Evacuation OUT; 6 June 1944 Normandy = D-Day Invasion IN!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex17-09',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-world-wars',
    type: 'single',
    prompt:
      'Which New Zealand-born scientist working at Manchester and then Cambridge University led the team that was the first in the world to "split the atom"?',
    options: [
      'Ernest Rutherford',
      'Isaac Newton',
      'Francis Crick',
      'Stephen Hawking',
    ],
    correctIndices: [0],
    explanation:
      'Ernest Rutherford (1871–1937), working in Britain at Manchester and Cambridge universities, led the scientists who first "split the atom" (artificial nuclear reaction): foundational physics later involved in the Manhattan Project.',
    memoryHook:
      '🌶️ Spice Hook: "Rutherford ripped the atom apart!" First team in the world to split the atom!',
  },
  {
    id: 'q-ex17-10',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'multiple',
    prompt:
      'Following Prime Minister Harold Macmillan’s "wind of change" era, the 1960s became known as "the Swinging Sixties": a boom in British pop music (The Beatles, The Rolling Stones), fashion, and technology. Which TWO achievements belong to this era? (Choose TWO)',
    options: [
      'Opening the Great Exhibition inside Hyde Park’s Crystal Palace',
      'Fashion designer Mary Quant popularising bold new styles such as the miniskirt',
      'Britain and France jointly developing Concorde, the world’s only commercial supersonic passenger airliner (alongside Germany in wider aerospace)',
      'Introducing the penny black postage stamp under Rowland Hill',
    ],
    correctIndices: [1, 2],
    explanation:
      'The 1960s saw vibrant social and technological change: fashion icons like Mary Quant transformed style, British bands conquered the globe, social laws on divorce and abortion were liberalised, and Britain and France jointly developed Concorde (which first flew in 1969 and entered commercial passenger service in 1976).',
    memoryHook:
      '🌶️ Spice Hook: Swinging Sixties Icons = "Beatles tunes + Mary Quant miniskirts + supersonic Concorde!"',
  },
  {
    id: 'q-ex17-11',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'After the 2010 Conservative–Liberal Democrat coalition, the 2012 London Olympics, and the June 2016 referendum vote to leave, on what date did the UK officially leave the European Union?',
    options: [
      '23 June 2016',
      '29 March 2018',
      '31 January 2020',
      '1 January 2022',
    ],
    correctIndices: [2],
    explanation:
      'In the referendum held on 23 June 2016, the UK public voted (51.9% to 48.1%) to leave the European Union. Following parliamentary negotiations, the United Kingdom officially left the EU on 31 January 2020.',
    memoryHook:
      '🌶️ Spice Hook: Trap Alert! "23 June 2016 = Referendum VOTE; 31 January 2020 = Official EXIT!"',
    visualId: 'history-timeline',
  },
  {
    id: 'q-ex17-12',
    examNumber: 17,
    chapterId: 'ch3',
    subtopicId: 'ch3-modern-britain',
    type: 'single',
    prompt:
      'Which historic Jubilee did Queen Elizabeth II celebrate in 2022 (marking 70 years on the throne as Britain’s longest-reigning monarch) before being succeeded later that year by His Majesty King Charles III?',
    options: [
      'Silver Jubilee',
      'Golden Jubilee',
      'Diamond Jubilee',
      'Platinum Jubilee',
    ],
    correctIndices: [3],
    explanation:
      'Queen Elizabeth II reigned from 1952 to September 2022, celebrating her Silver (1977, 25 yrs), Golden (2002, 50 yrs), Diamond (2012, 60 yrs), and unprecedented Platinum Jubilee (2022, 70 yrs). Upon her passing in September 2022, her eldest son became King Charles III.',
    memoryHook:
      '🌶️ Spice Hook: Jubilee Metals = "25 Silver, 50 Gold, 60 Diamond (2012), 70 PLATINUM (2022) → King Charles III!"',
  },
  {
    id: 'q-ex17-13',
    examNumber: 17,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'multiple',
    prompt:
      'Which TWO Nobel Prize-winning life-science breakthroughs involved British scientist Francis Crick (in 1953) and Scottish researcher John Macleod (in 1921), respectively? (Choose TWO)',
    options: [
      'Developing radar waves to track enemy bombers',
      'Co-discovering the double-helix structure of the DNA molecule',
      'Inventing the hovercraft cushion-of-air skirt',
      'Co-discovering insulin to treat diabetes',
    ],
    correctIndices: [1, 3],
    explanation:
      'In 1953, British biophysicist Francis Crick (working at Cambridge with James Watson, alongside Maurice Wilkins and Rosalind Franklin at King’s College London) discovered the double-helix structure of DNA. Earlier, Scottish physiologist John Macleod (1876–1935) co-discovered insulin, saving millions of lives from diabetes.',
    memoryHook:
      '🌶️ Spice Hook: "Crick cracked the DNA helix (1953); Macleod mastered Insulin!"',
  },
  {
    id: 'q-ex17-14',
    examNumber: 17,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which pair of celebrated British designers are renowned for shaping sweeping 18th-century country landscapes and colourful 19th/20th-century country cottage gardens, respectively?',
    options: [
      'Hans Holbein and Anthony van Dyck',
      'Dante Gabriel Rossetti and John Everett Millais',
      'Sir Norman Foster and Richard Rogers',
      'Lancelot "Capability" Brown and Gertrude Jekyll',
    ],
    correctIndices: [3],
    explanation:
      'In the 18th century, Lancelot "Capability" Brown designed natural-looking grass, lake, and woodland estates around country houses (saying grounds had "great capabilities"). Later, Gertrude Jekyll (1843–1932) often collaborated with architect Edwin Lutyens to create iconic colourful country gardens. (Holbein & Van Dyck were royal portraitists; Rossetti & Millais were Pre-Raphaelites; Foster & Rogers are modern architects.)',
    memoryHook:
      '🌶️ Spice Hook: Garden Royalty = "Capability Brown (sweeping lawns) & Gertrude Jekyll (vibrant flower borders)!"',
  },
  {
    id: 'q-ex17-15',
    examNumber: 17,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which 19th-century duo wrote comic operas full of wit and memorable melodies: including HMS Pinafore, The Pirates of Penzance, and The Mikado, paving the way for modern musicals like Andrew Lloyd Webber’s Cats and The Phantom of the Opera?',
    options: [
      'Torvill and Dean',
      'Gilbert and Sullivan',
      'Elgar and Vaughan Williams',
      'Purcell and Britten',
    ],
    correctIndices: [1],
    explanation:
      'Librettist W. S. Gilbert and composer Sir Arthur Sullivan wrote wildly popular Victorian comic ("Savoy") operas including HMS Pinafore, The Pirates of Penzance, and The Mikado. Later, Lord Andrew Lloyd Webber composed global musical theatre hits including Jesus Christ Superstar, Evita, Cats, and The Phantom of the Opera.',
    memoryHook:
      '🌶️ Spice Hook: "Gilbert & Sullivan = Victorian Pirates & Pinafores; Lloyd Webber = West End Cats & Phantoms!"',
  },
  {
    id: 'q-ex17-16',
    examNumber: 17,
    chapterId: 'ch4',
    subtopicId: 'ch4-arts-culture',
    type: 'single',
    prompt:
      'Which major annual cultural festival in Wales celebrates literature, music, and performance largely in the Welsh language, including prestigious poetry competitions?',
    options: [
      'The Edinburgh Festival Fringe',
      'The Glastonbury Festival',
      'The National Eisteddfod of Wales',
      'Hogmanay',
    ],
    correctIndices: [2],
    explanation:
      'The National Eisteddfod of Wales is an annual festival held each August celebrating Welsh music, literature, drama, and poetry in the Welsh language. (Glastonbury in Somerset is a famous contemporary music festival; the Edinburgh Festival Fringe is the world’s largest showcase of theatre and comedy.)',
    memoryHook:
      '🌶️ Spice Hook: Festival Trio, "Eisteddfod = Welsh bards & music; Fringe = Edinburgh comedy/theatre; Glastonbury = muddy Somerset rock!"',
  },
  {
    id: 'q-ex17-17',
    examNumber: 17,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'single',
    prompt:
      'Located on the north-east coast of Northern Ireland, what is the Giant’s Causeway famous for?',
    options: [
      'Columns of interlocking volcanic basalt lava formed about 50 million years ago',
      'A prehistoric circle of standing sandstone blocks',
      'A Roman defensive wall stretching coast to coast',
      'Glass domes housing tropical rainforest trees',
    ],
    correctIndices: [0],
    explanation:
      'The Giant’s Causeway on the County Antrim coast of Northern Ireland is a dramatic land formation of about 40,000 interlocking hexagonal columns made from volcanic lava roughly 50 million years ago (and steeped in legend of the giant Finn MacCool).',
    memoryHook:
      '🌶️ Spice Hook: "Giant’s Causeway = Northern Ireland’s 50-million-year-old volcanic stepping stones!"',
    visualId: 'uk-map',
  },
  {
    id: 'q-ex17-18',
    examNumber: 17,
    chapterId: 'ch4',
    subtopicId: 'ch4-landmarks',
    type: 'boolean',
    prompt:
      'True or False: The National Trust was founded in 1895 by three volunteers to preserve important historic buildings, coastline, and countryside across England, Wales, and Northern Ireland.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! Founded in 1895 by Octavia Hill, Sir Robert Hunter, and Canon Hardwicke Rawnsley, the National Trust (alongside the separate National Trust for Scotland, founded in 1931) is a charity supported by millions of members and volunteers keeping historic houses, gardens, and coastlines open for everyone.',
    memoryHook:
      '🌶️ Spice Hook: "1895 = 3 volunteers launched the National Trust to save Britain’s castles, coasts & country homes!"',
  },
  {
    id: 'q-ex17-19',
    examNumber: 17,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'True or False: Under the UK system of government, Cabinet ministers have the legal authority to instruct judges on how to decide individual court cases.',
    options: ['True', 'False'],
    correctIndices: [1],
    explanation:
      'False! The judiciary (judges) is strictly independent of the government and Parliament. Judges interpret the law fairly without political interference, and can even rule that a government action is unlawful through judicial review.',
    memoryHook:
      '🌶️ Spice Hook: Rule of Law Golden Rule, "Politicians make laws in Parliament, NEVER verdicts in court!"',
    visualId: 'parliament-courts',
  },
  {
    id: 'q-ex17-20',
    examNumber: 17,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'multiple',
    prompt:
      'Which TWO telephone numbers can be dialled free of charge from any phone in the UK to reach emergency services (police, fire, ambulance, or coastguard)? (Choose TWO)',
    options: ['999', '101', '112', '118'],
    correctIndices: [0, 2],
    explanation:
      'Both 999 (the traditional UK emergency number) and 112 (the pan-European/international emergency number) work free of charge anywhere in the UK to reach emergency services immediately. (101 is for non-emergency police calls.)',
    memoryHook:
      '🌶️ Spice Hook: Emergency Duo = "999 & 112 both bring sirens to the rescue!"',
  },
  {
    id: 'q-ex17-21',
    examNumber: 17,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Anyone can make a complaint about the police to the Chief Constable or to an independent oversight body. Which independent body investigates serious police complaints in England and Wales (alongside the PIRC in Scotland and the Police Ombudsman in Northern Ireland)?',
    options: [
      'The Privy Council',
      'The Electoral Commission',
      'The National Trust',
      'The Independent Office for Police Conduct (IOPC)',
    ],
    correctIndices: [3],
    explanation:
      'Serious complaints against police conduct are handled independently by the Independent Office for Police Conduct (IOPC, successor to the IPCC) in England and Wales, the Police Investigations & Review Commissioner (PIRC) in Scotland, and the Police Ombudsman for Northern Ireland.',
    memoryHook:
      '🌶️ Spice Hook: Police Watchdogs = "IOPC (E&W), PIRC (Scotland), Police Ombudsman (NI)!"',
  },
  {
    id: 'q-ex17-22',
    examNumber: 17,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'In the UK: where smoking is banned in nearly all enclosed public places and workplaces: what is the minimum legal age to buy tobacco products?',
    options: ['16', '17', '18', '21'],
    correctIndices: [2],
    explanation:
      'It is against the law across the UK to sell tobacco products (such as cigarettes, cigars, or rolling tobacco) to anyone under the age of 18, and smoking in enclosed public places, workplaces, and cars carrying under-18s is illegal.',
    memoryHook:
      '🌶️ Spice Hook: "No tobacco sales under 18, and no puffing in enclosed pubs, offices, or trains!"',
  },
  {
    id: 'q-ex17-23',
    examNumber: 17,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'boolean',
    prompt:
      'True or False: Organ donation across the UK now operates on an "opt-out" (deemed consent) system, meaning eligible adults are considered willing to donate organs after death unless they have recorded a decision to opt out.',
    options: ['True', 'False'],
    correctIndices: [0],
    explanation:
      'True! Wales, England, Scotland, and Northern Ireland have all adopted an opt-out organ donation system (though families are still consulted and anyone can register their decision to opt in or opt out on the NHS Organ Donor Register; living volunteers can also register to donate blood).',
    memoryHook:
      '🌶️ Spice Hook: Updated Civic Rule! "UK Organ Donation = Opt-Out by default (giving the gift of life unless you opt out)!"',
  },
  {
    id: 'q-ex17-24',
    examNumber: 17,
    chapterId: 'ch5',
    subtopicId: 'ch5-courts-police-role',
    type: 'single',
    prompt:
      'Which voluntary UK programme gives 16- and 17-year-olds the chance to take part in outdoor challenges, live away from home, build life skills, and deliver a local community project?',
    options: [
      'The Hansard Fellowship',
      'The National Citizen Service (NCS)',
      'The Shadow Cabinet Scheme',
      'The Jurors’ Reserve Corps',
    ],
    correctIndices: [1],
    explanation:
      'The National Citizen Service (NCS) is a voluntary personal and social development programme for 16- and 17-year-olds, helping young people gain confidence, outdoor teamwork skills, and hands-on experience helping their local community.',
    memoryHook:
      '🌶️ Spice Hook: "16 & 17 teen adventure + community action = National Citizen Service (NCS)!"',
  },
];
