/**
 * Curated datasets for Offline Arcade Mini-Games:
 * 1. Timeline Sort (chronological British milestones)
 * 2. Fact Match (UK icons, saints, authors, inventions, landmarks & numbers)
 */

export interface TimelineEventItem {
  readonly id: string;
  readonly year: number;
  readonly yearLabel: string;
  readonly title: string;
}

export const TIMELINE_EVENTS: readonly TimelineEventItem[] = [
  { id: 'tl-caesar', year: -55, yearLabel: '55 BC', title: 'Julius Caesar leads first Roman invasion' },
  { id: 'tl-claudius', year: 43, yearLabel: 'AD 43', title: 'Emperor Claudius conquers Britain' },
  { id: 'tl-romans-leave', year: 410, yearLabel: 'AD 410', title: 'Roman army leaves Britain' },
  { id: 'tl-augustine', year: 597, yearLabel: 'AD 597', title: 'St Augustine becomes 1st Archbishop of Canterbury' },
  { id: 'tl-vikings', year: 789, yearLabel: 'AD 789', title: 'Vikings first raid Britain' },
  { id: 'tl-hastings', year: 1066, yearLabel: '1066', title: 'William the Conqueror wins Battle of Hastings' },
  { id: 'tl-magna', year: 1215, yearLabel: '1215', title: 'King John seals the Magna Carta' },
  { id: 'tl-rhuddlan', year: 1284, yearLabel: '1284', title: 'Statute of Rhuddlan annexes Wales' },
  { id: 'tl-bannockburn', year: 1314, yearLabel: '1314', title: 'Robert the Bruce wins Battle of Bannockburn' },
  { id: 'tl-plague', year: 1348, yearLabel: '1348', title: 'Black Death arrives in Britain' },
  { id: 'tl-agincourt', year: 1415, yearLabel: '1415', title: 'Henry V wins Battle of Agincourt' },
  { id: 'tl-bosworth', year: 1485, yearLabel: '1485', title: 'Henry Tudor wins Battle of Bosworth Field' },
  { id: 'tl-armada', year: 1588, yearLabel: '1588', title: 'Elizabeth I defeats the Spanish Armada' },
  { id: 'tl-crowns', year: 1603, yearLabel: '1603', title: 'James VI of Scotland becomes James I of England' },
  { id: 'tl-gunpowder', year: 1605, yearLabel: '1605', title: 'Guy Fawkes Gunpowder Plot foiled' },
  { id: 'tl-civil-war', year: 1642, yearLabel: '1642', title: 'English Civil War begins (Cavaliers vs Roundheads)' },
  { id: 'tl-restoration', year: 1660, yearLabel: '1660', title: 'The Restoration of King Charles II' },
  { id: 'tl-fire', year: 1666, yearLabel: '1666', title: 'Great Fire of London destroys medieval city' },
  { id: 'tl-glorious', year: 1688, yearLabel: '1688', title: 'Glorious Revolution brings William of Orange' },
  { id: 'tl-union-gb', year: 1707, yearLabel: '1707', title: 'Act of Union creates Kingdom of Great Britain' },
  { id: 'tl-culloden', year: 1746, yearLabel: '1746', title: 'Bonnie Prince Charlie defeated at Culloden' },
  { id: 'tl-union-uk', year: 1801, yearLabel: '1801', title: 'Ireland unites with Great Britain' },
  { id: 'tl-trafalgar', year: 1805, yearLabel: '1805', title: 'Admiral Nelson wins Battle of Trafalgar' },
  { id: 'tl-waterloo', year: 1815, yearLabel: '1815', title: 'Duke of Wellington wins Battle of Waterloo' },
  { id: 'tl-emancipation', year: 1833, yearLabel: '1833', title: 'Emancipation Act abolishes slavery across Empire' },
  { id: 'tl-exhibition', year: 1851, yearLabel: '1851', title: 'Great Exhibition opens in Crystal Palace' },
  { id: 'tl-somme', year: 1916, yearLabel: '1916', title: 'Battle of the Somme & Dublin Easter Rising' },
  { id: 'tl-equal-vote', year: 1928, yearLabel: '1928', title: 'Women gain equal voting rights at age 21 & Penicillin found' },
  { id: 'tl-dunkirk', year: 1940, yearLabel: '1940', title: 'Dunkirk evacuation & Battle of Britain' },
  { id: 'tl-dday', year: 1944, yearLabel: '1944', title: 'Allied D-Day landings in Normandy' },
  { id: 'tl-nhs', year: 1948, yearLabel: '1948', title: 'NHS founded by Aneurin Bevan & Windrush arrives' },
  { id: 'tl-worldcup', year: 1966, yearLabel: '1966', title: 'Bobby Moore captains England to World Cup win' },
  { id: 'tl-eec', year: 1973, yearLabel: '1973', title: 'UK joins the European Economic Community (EEC)' },
  { id: 'tl-goodfriday', year: 1998, yearLabel: '1998', title: 'Good Friday Peace Agreement signed in Northern Ireland' },
  { id: 'tl-brexit', year: 2020, yearLabel: '2020', title: 'UK officially leaves the European Union' },
];

export interface FactMatchPair {
  readonly id: string;
  readonly left: string;
  readonly right: string;
}

export const FACT_MATCH_PAIRS: readonly FactMatchPair[] = [
  { id: 'fm-1', left: 'St David’s Day (Wales)', right: '1 March • Daffodil' },
  { id: 'fm-2', left: 'St Patrick’s Day (NI)', right: '17 March • Shamrock' },
  { id: 'fm-3', left: 'St George’s Day (England)', right: '23 April • Rose' },
  { id: 'fm-4', left: 'St Andrew’s Day (Scotland)', right: '30 November • Thistle' },
  { id: 'fm-5', left: 'House of Commons', right: '650 Elected MPs' },
  { id: 'fm-6', left: 'Scottish Parliament', right: '129 MSPs (Edinburgh)' },
  { id: 'fm-7', left: 'Senedd Cymru', right: '60 MSs (Cardiff)' },
  { id: 'fm-8', left: 'NI Assembly', right: '90 MLAs (Stormont)' },
  { id: 'fm-9', left: 'Sir Frank Whittle', right: 'Invented the Jet Engine' },
  { id: 'fm-10', left: 'Sir Tim Berners-Lee', right: 'Invented World Wide Web' },
  { id: 'fm-11', left: 'Sir Robert Watson-Watt', right: 'Developed Radar' },
  { id: 'fm-12', left: 'John Logie Baird', right: 'Developed Television' },
  { id: 'fm-13', left: 'Sir Christopher Cockerell', right: 'Invented the Hovercraft' },
  { id: 'fm-14', left: 'Alexander Fleming', right: 'Discovered Penicillin (1928)' },
  { id: 'fm-15', left: 'Aneurin (Nye) Bevan', right: 'Founded the NHS (1948)' },
  { id: 'fm-16', left: 'Sir Robert Walpole', right: 'First Prime Minister (1721)' },
  { id: 'fm-17', left: 'William Wilberforce', right: 'Anti-Slavery Campaigner' },
  { id: 'fm-18', left: 'Emmeline Pankhurst', right: 'Founded WSPU Suffragettes' },
  { id: 'fm-19', left: 'Florence Nightingale', right: 'Founder of Modern Nursing' },
  { id: 'fm-20', left: 'Isambard Kingdom Brunel', right: 'Clifton Bridge & GWR' },
  { id: 'fm-21', left: 'Sir Roger Bannister', right: 'First Sub-4-Minute Mile' },
  { id: 'fm-22', left: 'Baroness Tanni Grey-Thompson', right: '11 Paralympic Golds' },
  { id: 'fm-23', left: 'Sir Steve Redgrave', right: '5 Olympic Rowing Golds' },
  { id: 'fm-24', left: 'Sir Chris Hoy', right: '6 Olympic Cycling Golds' },
  { id: 'fm-25', left: 'Geoffrey Chaucer', right: 'The Canterbury Tales' },
  { id: 'fm-26', left: 'Robert Burns', right: 'Auld Lang Syne (25 Jan)' },
  { id: 'fm-27', left: 'Dylan Thomas', right: 'Under Milk Wood' },
  { id: 'fm-28', left: 'Jane Austen', right: 'Pride and Prejudice' },
  { id: 'fm-29', left: 'Booker Prize', right: 'Awarded for Fiction' },
  { id: 'fm-30', left: 'Turner Prize', right: 'Contemporary Visual Art' },
  { id: 'fm-31', left: 'Laurence Olivier Awards', right: 'British Theatre Excellence' },
  { id: 'fm-32', left: 'Eden Project', right: 'Biomes in Cornwall' },
  { id: 'fm-33', left: 'Giant’s Causeway', right: 'Basalt Columns in NI' },
  { id: 'fm-34', left: 'Skara Brae', right: 'Prehistoric Village in Orkney' },
  { id: 'fm-35', left: 'Small Claims Limit', right: '£10k E&W / £5k Scot & NI' },
  { id: 'fm-36', left: 'Scottish Criminal Jury', right: '15 Jurors (+ Not Proven)' },
];
