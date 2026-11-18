/**
 * Curated Community Links, Official GOV.UK Checklist & Reddit Study Strategies
 * (sourced from r/ukvisa, r/ilruk, and r/SkilledWorkerVisaUK discussions).
 * Stored locally so tips and checklists work 100% offline on the Tube!
 */

export interface CommunityResource {
  readonly id: string;
  readonly category: 'official' | 'mock-sites' | 'reddit';
  readonly title: string;
  readonly url: string;
  readonly badge: string;
  readonly summary: string;
  readonly spiceTip: string;
}

export const COMMUNITY_RESOURCES: readonly CommunityResource[] = [
  {
    id: 'gov-uk-booking',
    category: 'official',
    title: 'GOV.UK, Book the Official Life in the UK Test (£50)',
    url: 'https://www.gov.uk/life-in-the-uk-test',
    badge: 'Official Only',
    summary:
      'The ONLY official site to book your £50 test (24 questions, 45 minutes, 18/24 = 75% to pass). Never pay third-party booking middlemen!',
    spiceTip:
      'Using an eVisa? Generate a fresh UKVI share code before test day and bring the EXACT physical ID you booked with!',
  },
  {
    id: 'lituk-web-17-exams',
    category: 'mock-sites',
    title: 'Life in the UK Test Web ("The 17 Exams")',
    url: 'https://lifeintheuktestweb.co.uk/exams/',
    badge: 'Reddit #1 Pick',
    summary:
      'Repeatedly cited across r/ukvisa, r/ilruk & r/SkilledWorkerVisaUK: drill "Exams 1–17" specifically (distinct from the harder "Tests" tab).',
    spiceTip:
      'Our built-in Exams 1–17 in Spice Up Your UK give you 408 offline questions right here, and double-check King Charles III & age-18 Lottery on older web banks!',
  },
  {
    id: 'britizen-uk',
    category: 'mock-sites',
    title: 'Britizen.uk, Free Chapter Summaries & Practice',
    url: 'https://britizen.uk/',
    badge: 'Free Web Prep',
    summary:
      'Clean chapter-weighted practice tests and digestible chapter overviews frequently recommended by ILR applicants.',
    spiceTip:
      'Great extra online cross-check once you are consistently hitting 21+/24 offline here.',
  },
  {
    id: 'pass-the-uk-test',
    category: 'mock-sites',
    title: 'PassTheUKTest.co.uk, Chapter-Weighted Mocks',
    url: 'https://passtheuktest.co.uk/',
    badge: 'Free Web Mocks',
    summary:
      'Free practice exams weighted toward high-yield History (Ch 3) and Government & Law (Ch 5).',
    spiceTip:
      'Remember: History + Government/Law make up over half of the exam, focus your SRS reviews there!',
  },
  {
    id: 'reddit-ukvisa',
    category: 'reddit',
    title: 'r/ukvisa, Life in the UK Pass Reports & Tips',
    url: 'https://www.reddit.com/r/ukvisa/search/?q=life+in+the+uk&restrict_sr=1',
    badge: 'Community',
    summary:
      'Thousands of firsthand test-centre reports, ID/eVisa reminders, and recent exam experiences.',
    spiceTip:
      'Good news: your pass notification letter/reference number NEVER expires, take it early before your ILR window!',
  },
  {
    id: 'reddit-skilledworker',
    category: 'reddit',
    title: 'r/SkilledWorkerVisaUK, Settlement & Test Prep Threads',
    url: 'https://www.reddit.com/r/SkilledWorkerVisaUK/search/?q=life+in+the+uk&restrict_sr=1',
    badge: 'Community',
    summary:
      'Timeline advice for Skilled Worker → ILR applicants preparing alongside dependant applications.',
    spiceTip:
      'Every adult applicant needs their own Life in the UK pass reference number for ILR, hence our shared 2-player mode!',
  },
  {
    id: 'reddit-ilruk',
    category: 'reddit',
    title: 'r/ilruk, Indefinite Leave to Remain Checklist Discussions',
    url: 'https://www.reddit.com/r/ilruk/',
    badge: 'Community',
    summary:
      'Dedicated community covering ILR document prep, absences, English requirement, and Life in the UK test readiness.',
    spiceTip:
      'Keep your exact name spelling & address matching your UKVI account so test-centre check-in takes 60 seconds.',
  },
];

export const TEST_DAY_CHECKLIST: readonly string[] = [
  'Book ONLY on gov.uk/life-in-the-uk-test (£50 fee, at least 3 days in advance).',
  'Check that your UKVI account name, date of birth, and ID number match 100%.',
  'If using an eVisa, generate a valid UKVI share code before heading to the centre.',
  'Bring the EXACT original physical ID document (e.g. valid Passport) used at booking + proof of address if requested.',
  'Arrive 15–30 minutes early for security locker storage & photo verification.',
  'Take your time: you get 45 minutes for 24 questions (most prepared test-takers finish in 4–8 minutes!).',
  'Save your unique Pass Reference Number safely: you will enter it on your ILR and Citizenship forms (it never expires!).',
];
