/**
 * Official 5-Chapter Syllabus & 20 Subtopics for the Life in the UK Test (3rd Edition).
 */

import type { ChapterMeta } from '../types/domain';

export const CHAPTERS: readonly ChapterMeta[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'The Values and Principles of the UK',
    shortTitle: 'Values & Principles',
    spiceTagline: 'Say You’ll Be Fair, fundamental rights, duties & the citizenship pledge.',
    examWeightHint: '~2–3 questions per exam',
    accentColor: 'rose',
    subtopics: [
      {
        id: 'ch1-principles',
        chapterId: 'ch1',
        title: 'Fundamental British Principles & Responsibilities',
        summary: 'Democracy, rule of law, individual liberty, tolerance, and equal opportunity.',
      },
      {
        id: 'ch1-citizenship',
        chapterId: 'ch1',
        title: 'Becoming a Permanent Resident or Citizen',
        summary: 'Life in the UK Test rules (24 Qs, 45m, 75%), ceremonies, oath & pledge.',
      },
    ],
  },
  {
    id: 'ch2',
    number: 2,
    title: 'What is the UK?',
    shortTitle: 'What is the UK?',
    spiceTagline: 'Colours of the Union, four nations, capitals, flags & Crown Dependencies.',
    examWeightHint: '~2–3 questions per exam',
    accentColor: 'sky',
    subtopics: [
      {
        id: 'ch2-nations',
        chapterId: 'ch2',
        title: 'The Four Nations & Geography',
        summary: 'England, Scotland, Wales, Northern Ireland, Great Britain vs UK, capitals & cities.',
      },
      {
        id: 'ch2-symbols',
        chapterId: 'ch2',
        title: 'Flags, Patron Saints & National Flowers',
        summary: 'Union Flag crosses, St George, St Andrew, St David, St Patrick, flowers & dates.',
      },
      {
        id: 'ch2-territories',
        chapterId: 'ch2',
        title: 'Crown Dependencies & Overseas Territories',
        summary: 'Channel Islands, Isle of Man, Falkland Islands, Gibraltar, St Helena & currency.',
      },
    ],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'A Long and Illustrious History',
    shortTitle: 'British History',
    spiceTagline: 'Viva Forever, from Stonehenge & 1066 to Tudors, Suffragettes & Modern UK.',
    examWeightHint: '~7–9 questions per exam (High Yield!)',
    accentColor: 'amber',
    subtopics: [
      {
        id: 'ch3-early-roman',
        chapterId: 'ch3',
        title: 'Early Britain & The Romans',
        summary: 'Stone/Bronze/Iron Ages, Skara Brae, Stonehenge, Julius Caesar, Claudius, Boudicca, Hadrian’s Wall.',
      },
      {
        id: 'ch3-anglo-norman',
        chapterId: 'ch3',
        title: 'Anglo-Saxons, Vikings & The Norman Conquest',
        summary: 'Sutton Hoo, St Augustine, Alfred the Great, Danelaw, 1066 Battle of Hastings, Domesday Book.',
      },
      {
        id: 'ch3-middle-ages',
        chapterId: 'ch3',
        title: 'The Middle Ages',
        summary: '1215 Magna Carta, Parliaments, Bannockburn (1314), Black Death (1348), Hundred Years War, Wars of the Roses, Chaucer & Caxton.',
      },
      {
        id: 'ch3-tudors-stuarts',
        chapterId: 'ch3',
        title: 'Tudors, Stuarts, Civil War & Glorious Revolution',
        summary: 'Henry VIII & 6 wives, Reformation, Elizabeth I & 1588 Armada, Shakespeare, James VI/I, Gunpowder Plot, Charles I, Cromwell, 1688 William of Orange.',
      },
      {
        id: 'ch3-empire-industry',
        chapterId: 'ch3',
        title: 'Global Power, Industrial Revolution & Victorian Era',
        summary: '1707 Act of Union, Walpole (first PM), Watt, Arkwright, Brunel, Abolition (Wilberforce, 1807/1833), Trafalgar & Waterloo, Queen Victoria, Florence Nightingale, Suffragettes.',
      },
      {
        id: 'ch3-world-wars',
        chapterId: 'ch3',
        title: 'The 20th Century: World War I & World War II',
        summary: '1914–1918 Somme, 1916 Easter Rising & 1921 partition, Great Depression, 1939–1945 Churchill, Dunkirk, Battle of Britain, Blitz, D-Day, Fleming.',
      },
      {
        id: 'ch3-modern-britain',
        chapterId: 'ch3',
        title: 'Britain Since 1945 & Modern Era',
        summary: 'Attlee, 1948 NHS (Bevan) & Beveridge Report, Windrush, Roaring Sixties, Thatcher, 1998 Good Friday Agreement, Devolution, Brexit, King Charles III.',
      },
    ],
  },
  {
    id: 'ch4',
    number: 4,
    title: 'A Modern, Thriving Society',
    shortTitle: 'Culture & Society',
    spiceTagline: 'Spice Up Your Culture, holidays, Wimbledon, West End, landmarks & inventions!',
    examWeightHint: '~5–6 questions per exam',
    accentColor: 'fuchsia',
    subtopics: [
      {
        id: 'ch4-religion-customs',
        chapterId: 'ch4',
        title: 'Religion, Festivals & Traditions',
        summary: 'Church of England, Church of Scotland, Diwali, Eid, Hanukkah, Vaisakhi, Hogmanay, Bonfire Night (Nov 5), Remembrance Day (Nov 11).',
      },
      {
        id: 'ch4-sports',
        chapterId: 'ch4',
        title: 'Sports & British Sporting Legends',
        summary: '1966 World Cup (Bobby Moore), Roger Bannister, Jackie Stewart, Torvill & Dean, Mo Farah, Jessica Ennis-Hill, Andy Murray, Wimbledon, Six Nations, Grand National.',
      },
      {
        id: 'ch4-arts-culture',
        chapterId: 'ch4',
        title: 'Arts, Literature, Music, Film & Inventions',
        summary: 'Jane Austen, Dickens, Tolkien, Rowling, Turner, Constable, Henry Moore, Proms, Beatles, Turner/Booker/BRIT/Laurence Olivier prizes, Berners-Lee, Logie Baird, Turing.',
      },
      {
        id: 'ch4-landmarks',
        chapterId: 'ch4',
        title: 'UK Landmarks & Places of Interest',
        summary: 'Big Ben (Elizabeth Tower), Eden Project, Giant’s Causeway, Lake District, Snowdonia, Loch Lomond, Tower of London, Edinburgh Castle.',
      },
    ],
  },
  {
    id: 'ch5',
    number: 5,
    title: 'The UK Government, the Law and Your Role',
    shortTitle: 'Government & Law',
    spiceTagline: 'Union Power, Monarch, 650 MPs, Devolved Parliaments, Courts & Your Community.',
    examWeightHint: '~6–7 questions per exam (High Yield!)',
    accentColor: 'indigo',
    subtopics: [
      {
        id: 'ch5-democracy-constitution',
        chapterId: 'ch5',
        title: 'The British Constitution & The Monarchy',
        summary: 'Unwritten constitution, King Charles III as Head of State, ceremonial vs political roles, National Anthem, Privy Council.',
      },
      {
        id: 'ch5-parliament-elections',
        chapterId: 'ch5',
        title: 'Parliament, Cabinet, Opposition & Elections',
        summary: 'House of Commons (650 MPs, First Past the Post), House of Lords, Speaker, PM, Shadow Cabinet, voting age (18), General Elections (at least every 5 years).',
      },
      {
        id: 'ch5-devolution',
        chapterId: 'ch5',
        title: 'Devolved Administrations & International Bodies',
        summary: 'Scottish Parliament (129 MSPs, Edinburgh), Senedd Cymru (60 MSs, Cardiff), NI Assembly (90 MLAs, Stormont), Commonwealth, UN, NATO, Council of Europe.',
      },
      {
        id: 'ch5-courts-police-role',
        chapterId: 'ch5',
        title: 'Courts, Police, Laws, Taxation & Your Role',
        summary: 'Criminal vs Civil law, Magistrates/Crown/Sheriff/Youth courts, Small Claims, Police & PCCs, legal ages (Lottery 18, alcohol, smoking, driving), NI number, Jury service, school governors.',
      },
    ],
  },
];

export function getChapterById(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}
