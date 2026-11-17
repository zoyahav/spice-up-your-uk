import { describe, expect, it } from 'vitest';
import {
  buildGoogleCalendarReminderUrl,
  generatePracticeReminderIcs,
} from '../reminders';

describe('Configurable Phone Practice Reminders', () => {
  const sampleSettings = {
    enabled: true,
    timeHHMM: '08:15',
    daysOfWeek: [1, 3, 5],
    browserNotificationsEnabled: false,
    streakRescueEmailOptIn: false,
  };

  it('generates valid RFC-5545 .ics calendar alarm with weekly BYDAY recurrence', () => {
    const ics = generatePracticeReminderIcs(
      sampleSettings,
      'https://example.github.io/spice/',
      new Date('2026-11-17T07:00:00'),
    );
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR');
    expect(ics).toContain('BEGIN:VALARM');
    expect(ics).toContain('Spice Up Your UK');
  });

  it('generates a Google Calendar recurring template deep link', () => {
    const gcal = buildGoogleCalendarReminderUrl(
      sampleSettings,
      'https://example.github.io/spice/',
      new Date('2026-11-17T07:00:00'),
    );
    expect(gcal).toContain('https://calendar.google.com/calendar/render?');
    expect(gcal).toContain('BYDAY%3DMO%2CWE%2CFR');
  });
});
