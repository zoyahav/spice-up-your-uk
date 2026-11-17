# 🌶️ Spice Up Your UK — Life in the UK Study Companion PWA

An offline-first, mobile-optimized **Progressive Web App (PWA)** for two study partners preparing together for the **Life in the UK Test**.

- **100% Commute-Ready Offline Mode**: Precaches the entire app, inline SVG visual aids, 5-chapter study guides, 265 SM-2 spaced-repetition flashcards, and 17 full-length 24-question mock exams (408 questions) in IndexedDB + Service Worker.
- **Fun Memory Hooks Everywhere**: Every study section, flashcard, and exam question includes a playful mnemonic / memory hook (plus inline SVG diagrams for the Union Flag, UK Map, Patron Saints, Parliament & Courts, and History Timeline).
- **Separate Subject & Exam Tracking ("2 Become 1")**: Track mastery across all 5 official chapters independently while building a shared Couple Streak, sending head-to-head question challenges, and playing 3 offline Arcade mini-games (*60s Tube Blitz*, *Timeline Sort*, *Fact Match*).
- **Zero-Server Private Google Sheet Sync**: Syncs both devices through your own private **Google Sheet + Google Apps Script Web App**. Zero personal details, URLs, or credentials are stored in this repository.

---

## 💻 Laptop-First QR-Only Setup (Zero Typing on Either Phone!)

1. **Create & Share One Google Sheet**:
   - Create a new Google Sheet in Google Drive and **share it with your study partner with Editor access** (so you can both view/edit the raw tabs anytime).
2. **Add the Sync Script**:
   - In the Sheet, open **Extensions → Apps Script**, replace the default code with [`apps-script/Code.gs`](./apps-script/Code.gs), and click **Save**.
3. **Set Your Private Passcode**:
   - In Apps Script **Project Settings (⚙️) → Script Properties**, add:
     - `SYNC_PASSCODE` = `<your-private-secret-passphrase>`
     - *(Optional)* `APP_PUBLIC_URL` = `<your-https-pwa-url>` (for optional daily Streak Rescue emails)
4. **Deploy as a Web App**:
   - Click **Deploy → New deployment → Web app**:
     - **Execute as**: `Me`
     - **Who has access**: `Anyone` *(all requests require your private `SYNC_PASSCODE`)*
5. **Generate QR Codes on Your Laptop for Both Phones**:
   - Open your hosted **Spice Up Your UK** GitHub Pages URL on your laptop → go to the **Us** tab → enter both nicknames, the Apps Script `/exec` URL, and `SYNC_PASSCODE` → click **QR Codes (Phone A & B)**.
   - Scan **Phone A QR** with the first phone’s camera, then toggle to **Phone B QR** and scan with the second phone’s camera!
   - Each device automatically opens the browser, stores your private sync credentials in local IndexedDB, scrubs the `#pair=...` token from the URL bar, and syncs!
6. **Install on Mobile Home Screens**:
   - In Chrome / Safari on each phone, open the browser menu → **Add to Home screen** / **Install app**.

---

## 📦 Importing Extra Online Mock Packs (Kept Off GitHub)

In the **Us** tab → **Import External Pack**, paste any HTTPS raw JSON URL (`exams.json`) or CSV/TSV deck once on your laptop or either phone. It parses locally, syncs via your private Google Sheet (`Custom_Content` tab) to both devices, and unlocks the **Custom** exam tab inside **Exams**—keeping external packs completely out of your public GitHub repository (`private-packs/` is also gitignored locally).

---

## 🛠️ Local Development & Deployment

```bash
npm install
npm test          # Run Vitest unit & curriculum integrity suite
npm run dev       # Start local dev server
npm run build     # Typecheck + build production PWA bundle into dist/
```
