/**
 * Configurable phone practice reminders:
 * 1. RFC-5545 .ics recurring calendar file generator (reliable offline on mobile).
 * 2. Google Calendar 1-tap template URL builder.
 * 3. Browser / Service Worker Notification helper.
 */

import type { ReminderSettings } from '../types/domain';

const ICS_DAY_CODES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'] as const;

export function buildDaysRruleCodes(daysOfWeek: readonly number[]): string {
  const valid = Array.from(new Set(daysOfWeek))
    .filter((d) => d >= 0 && d <= 6)
    .sort((a, b) => a - b);
  const chosen = valid.length > 0 ? valid : [1, 2, 3, 4, 5];
  return chosen.map((d) => ICS_DAY_CODES[d]!).join(',');
}

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function formatIcsLocalDateTime(dt: Date): string {
  return (
    `${dt.getFullYear()}${pad2(dt.getMonth() + 1)}${pad2(dt.getDate())}` +
    `T${pad2(dt.getHours())}${pad2(dt.getMinutes())}00`
  );
}

/**
 * Generates an RFC-5545 `.ics` string for a recurring practice alarm on mobile / Google Calendar.
 */
export function generatePracticeReminderIcs(
  settings: ReminderSettings,
  appUrl: string,
  referenceDate: Date = new Date(),
): string {
  const [hhRaw, mmRaw] = settings.timeHHMM.split(':');
  const hours = Math.min(23, Math.max(0, Number(hhRaw) || 8));
  const minutes = Math.min(59, Math.max(0, Number(mmRaw) || 15));

  const start = new Date(referenceDate);
  start.setHours(hours, minutes, 0, 0);
  if (start.getTime() <= referenceDate.getTime()) {
    start.setDate(start.getDate() + 1);
  }

  const end = new Date(start.getTime() + 15 * 60 * 1000);
  const byDay = buildDaysRruleCodes(settings.daysOfWeek);
  const stamp = formatIcsLocalDateTime(referenceDate) + 'Z';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SpiceUpYourUK//StudyReminder//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:spice-up-your-uk-reminder@local`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${formatIcsLocalDateTime(start)}`,
    `DTEND:${formatIcsLocalDateTime(end)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
    'SUMMARY:🌶️ Spice Up Your UK: Daily Practice!',
    `DESCRIPTION:Keep your streak alive! Knock out 10 flashcards or a quick Tube Blitz: ${appUrl}`,
    `URL:${appUrl}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT0M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Time to Spice Up Your UK!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return lines.join('\r\n');
}

/**
 * Builds a 1-tap Google Calendar event creation URL with recurring `RRULE`.
 */
export function buildGoogleCalendarReminderUrl(
  settings: ReminderSettings,
  appUrl: string,
  referenceDate: Date = new Date(),
): string {
  const [hhRaw, mmRaw] = settings.timeHHMM.split(':');
  const hours = Math.min(23, Math.max(0, Number(hhRaw) || 8));
  const minutes = Math.min(59, Math.max(0, Number(mmRaw) || 15));

  const start = new Date(referenceDate);
  start.setHours(hours, minutes, 0, 0);
  if (start.getTime() <= referenceDate.getTime()) {
    start.setDate(start.getDate() + 1);
  }
  const end = new Date(start.getTime() + 15 * 60 * 1000);

  const datesParam = `${formatIcsLocalDateTime(start)}/${formatIcsLocalDateTime(end)}`;
  const rrule = `RRULE:FREQ=WEEKLY;BYDAY=${buildDaysRruleCodes(settings.daysOfWeek)}`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: '🌶️ Spice Up Your UK: Daily Study Streak',
    details: `Stop right now, thank you very much: time for 5 mins of Life in the UK practice!\n\nOpen app: ${appUrl}`,
    dates: datesParam,
    recur: rrule,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadReminderIcsFile(settings: ReminderSettings, appUrl: string): void {
  const ics = generatePracticeReminderIcs(settings, appUrl);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'spice-up-your-uk-reminder.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function requestAndTestBrowserNotification(): Promise<
  'granted' | 'denied' | 'unsupported'
> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    const title = '🌶️ Spice Up Your UK!';
    const options: NotificationOptions = {
      body: "Zig-A-Zig-Ah! Notifications are active. Don't forget to add the Calendar alarm for offline Tube commutes!",
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
    };

    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && 'showNotification' in reg) {
        await reg.showNotification(title, options);
        return 'granted';
      }
    }
    new Notification(title, options);
    return 'granted';
  }

  return 'denied';
}
