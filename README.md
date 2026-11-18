# Spice Up Your UK

A mobile-friendly Progressive Web App for two people studying together for the Life in the UK Test.

## What is included

- **Offline study and storage**: Precaches the app, study guides, visual diagrams, spaced-repetition questions, and practice exams with a Service Worker and local IndexedDB storage so it works without signal and syncs when back online.
- **Beginner-friendly 5-chapter study guide & 4-way choice practice**: 20 structured topic lessons for all five official handbook chapters with inline 4-way multiple-choice quizzes, SM-2 spaced-repetition 4-choice practice, 18 standard practice exams auto-cached offline on install (435 questions), and 17 extra bonus mock exams (408 questions), with explanations and targeted mnemonics on tricky dates and numbers.
- **Inline SVG diagrams**: Offline interactive diagrams for the Union Flag, UK nations and Crown Dependencies map, patron saints and national flowers, Parliament and courts, and the full 10-era British history timeline from the Stone Age to today.
- **Locked per-phone profiles and daily streak tracking**: Each phone locks to its own player profile while clearly showing whether each player has practiced today, a 7-day activity grid, personal and shared daily streaks, head-to-head quizzes, and three quick mini-games (*Tube Blitz*, *Timeline Sort* with touch drag-and-drop, and *Fact Match*). A confirmation-gated device reset in the **Us** tab lets you wipe local settings and restart setup if needed.
- **Private Google Sheet sync**: Syncs progress between two phones through a Google Sheet and Google Apps Script endpoint that you host in your own Google account. No personal details, URLs, or credentials are stored in this repository.

## Google Sheet sync setup

You can set up sync once on a laptop and pair both phones by scanning QR codes, without typing URLs on mobile:

1. Create a new Google Sheet in Google Drive and share it with your partner with **Editor** access.
2. Open **Extensions -> Apps Script**, replace the default code with [`apps-script/Code.gs`](./apps-script/Code.gs), and save.
3. In Apps Script **Project Settings -> Script Properties**, add:
   - `SYNC_PASSCODE`: a secret passphrase of your choice
   - `APP_PUBLIC_URL` *(optional)*: your hosted app URL, used only if you enable daily email reminders
4. Click **Deploy -> New deployment -> Web app**:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` (requests are checked against your `SYNC_PASSCODE`)
5. Open the hosted app on your laptop, go to the **Us** tab, enter both nicknames, the `/exec` Web App URL, and `SYNC_PASSCODE`, then click **QR Codes (Player 1 & 2)**.
6. Scan the **Player 1** QR code with the first phone's camera, switch to **Player 2**, and scan with the second phone's camera. Each browser saves the sync config into local IndexedDB and removes the `#pair=...` hash from the address bar.
7. To install on your home screen, open the browser menu on each phone and select **Add to Home screen** or **Install app**.

## Importing extra question packs

In the **Us** tab under **Import External Pack**, you can fetch a raw HTTPS JSON URL (`exams.json`) or paste JSON/CSV/TSV content. Imported questions and flashcards are stored in IndexedDB, synced to both phones via the `Custom_Content` sheet tab, and kept out of git (`private-packs/` is gitignored locally).

## Local development

```bash
npm install
npm test          # Run Vitest unit and curriculum checks
npm run dev       # Start local dev server
npm run build     # Typecheck and build production bundle into dist/
npm run deploy    # Build and publish dist/ to the gh-pages branch
```
