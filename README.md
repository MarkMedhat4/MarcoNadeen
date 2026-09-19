# Marco Atif & Nadeen Assem — Wedding Invitation Website

> A luxury, cinematic, interactive wedding invitation — built to feel like
> opening a real physical invitation, not browsing a website.

## 1. Project Overview

This is the wedding website for **Marco Atif & Nadeen Assem**, celebrating
on **October 11, 2026** at **El Qasr Hall**. It opens with the couple's own
photographed invitation card — deep burgundy card stock, an olive satin
bow, an antique gold frame — presented as a sealed cover. The guest taps it,
and it opens from its own printed center seam, like a real invitation being
opened by hand, before the full site reveals itself underneath.

Everything past that opening continues the same visual language: deep
burgundy, muted olive, and antique gold, carried through a countdown, an
editorial gallery, a couple portrait section, a dress code card, and a
WhatsApp-based RSVP — all in one cohesive, restrained, non-templated design.

**Technology stack:** plain HTML5, CSS3, and vanilla JavaScript. No
frameworks, no build step, no bundler, no npm install, no dependencies of
any kind. Open `index.html` and it runs.

**At a glance:**
| | |
|---|---|
| 💍 Couple | Marco Atif & Nadeen Assem |
| 📅 Date | October 11, 2026 |
| 📍 Venue | El Qasr Hall |
| 🎬 Signature moment | The invitation opens from its center seam on tap |
| 🎨 Palette | Deep burgundy, muted olive, antique gold, warm ivory |
| 📱 RSVP | WhatsApp, pre-filled, accept or decline |

## 2. Design System

### Colors

Three anchor colors define the entire palette:

| | Name | Hex |
|---|---|---|
| 🍷 | Deep Burgundy | `#6E1735` |
| 🫒 | Muted Olive Green | `#6B6F59` |
| ✨ | Antique Gold | `#9A8A4A` |

Every other color in the project — deeper shades for dark panels, soft
tints for light washes, warm off-white grounds — is derived from these
three, so the palette always reads as one family rather than unrelated
colors bolted together. All of it lives in `css/tokens.css`:

```css
--burgundy:        #6E1735;
--burgundy-deep:   #451022;
--burgundy-shadow: #2A0A15;
--olive:           #6B6F59;
--olive-deep:      #4A4D3D;
--ivory:           #FAF6F0;   /* warm off-white, not pure white */
--cream:           #F3ECE5;   /* second warm off-white, for variety */
--beige:           #D8C9BC;
--gold:            #9A8A4A;
--gold-soft:       #C2B378;
--gold-dark:       #6E6136;
--ink:             #241B1D;   /* body text — warm near-black, not pure black */
```

*(Note: the variable **names** kept the project's original naming — e.g.
`--burgundy` rather than `--color-burgundy` — since renaming every reference
across the CSS would have meant touching working code for no functional
gain. The **values** are the exact hexes above.)*

No section repeats the same background as its neighbor, but every section
pulls from this one palette — that's what keeps ten different sections
feeling like one invitation instead of a patchwork of templates:

| Section | Background |
|---|---|
| Opening invitation | The photograph itself (burgundy/gold/olive) |
| Hero | Burgundy → olive gradient, ivory type, gold accents |
| The Couple | Warm ivory, burgundy headings, gold rule, olive accents |
| Wedding Day | Burgundy/olive/ivory blended wash |
| Venue | Deep burgundy, ivory type, olive button |
| Memories (gallery) | Warm cream |
| Dress Code | Near-black elegant card, gold typography |
| Countdown | Deep burgundy → olive gradient |
| RSVP | Warm ivory |
| Footer | Olive → deep burgundy gradient |

### Typography

- **Display / headings / names:** Cormorant Garamond (falls back to Playfair
  Display, then serif)
- **Body / labels / buttons:** Jost (falls back to Inter, then sans-serif)

Both load from Google Fonts with only the weights actually used.

### Spacing

A single spacing scale (`--space-2xs` through `--space-2xl` in
`css/tokens.css`, from `0.4rem` to `9.5rem`) drives section padding,
card gaps, and heading margins everywhere, so vertical rhythm stays
consistent from the hero down to the footer instead of each section
inventing its own numbers. The type scale works the same way
(`--step--1` through `--step-5`, all `clamp()`-based so they scale
smoothly between mobile and desktop rather than jumping at breakpoints).

### Animation Philosophy


Restraint over spectacle. There is **one** signature animation — the
invitation opening from its center seam — and everything else (scroll
reveals, hover states, the countdown) is short, quiet, and secondary. This
was a deliberate choice after early iterations over-animated the opening;
see the closing note at the bottom of this file for the reasoning.

## 3. Features

- Interactive invitation opening (center-seam split, 3D `rotateY`)
- Live countdown to the wedding date (Africa/Cairo timezone-aware)
- Editorial couple portraits (rectangular frames, no cropped faces)
- Asymmetric photo gallery with a custom lightbox (keyboard + click support)
- Wedding Dress Code section — dark elegant card, gold typography, with
  minimal gold line-art (a bow tie, a gown silhouette), no cartoon icons
  or emoji
- WhatsApp RSVP — both **Accept** and **Decline**, each with its own
  pre-filled message
- Google Maps venue link, hidden automatically if not configured
- Background music, gated behind the opening interaction, with a floating
  play/pause control
- Desktop-only custom cursor (disabled on touch devices and under reduced
  motion)
- Strategic scroll-reveal on section headers and a few key blocks (not
  applied to every element)
- Fully responsive, 320px through large desktop
- Keyboard-accessible throughout; `prefers-reduced-motion` respected

## 4. Project Structure

```
wedding/
├── index.html
├── README.md
├── css/
│   ├── tokens.css        → color/type/spacing variables
│   ├── base.css          → reset, buttons, nav, toast, cursor, music button
│   ├── invitation.css    → the opening cover + center-split animation
│   ├── sections.css      → hero, couple, details, gallery, dress code, etc.
│   └── responsive.css    → mobile-specific rules, safe-area insets
├── js/
│   ├── data.js            → single config — edit names/date/venue here
│   ├── toast.js           → small on-screen confirmations
│   ├── main.js             → fills text from data.js; WhatsApp + copy button
│   ├── invitation.js      → the click/tap-to-open logic
│   ├── navigation.js      → sticky nav, mobile menu, active-link highlight
│   ├── countdown.js       → live countdown
│   ├── gallery.js         → lightbox
│   ├── music.js           → background music controller
│   ├── cursor.js          → desktop custom cursor
│   └── scroll-reveal.js   → IntersectionObserver reveal (used sparingly)
└── assets/
    ├── images/            → invitation-cover.jpg + couple/gallery photos
    ├── music/             → ambient.mp3
    └── icons/             → favicon.svg
```

*(This keeps the project's existing modular file layout rather than
collapsing everything into a single `style.css` / `script.js` — the
functional requirement, one clean config object and one clear place per
concern, is already met, and splitting by concern makes the ~2,500 lines of
CSS/JS far easier to navigate than one giant file of each.)*

## 5. Run Locally

Simplest option — just open `index.html` directly in a browser. Everything
is relative paths and works from `file://`.

If you'd rather use a local server (needed for some browsers' clipboard API
in the "Copy Details" button):

```bash
# Python (built into macOS/Linux, and Windows if Python is installed)
cd Marco-Atif-Nadeen-Wedding-Invitation
python3 -m http.server 8000
# then open http://localhost:8000
```

Or in VS Code: install the **Live Server** extension, right-click
`index.html`, and choose **Open with Live Server**.

## 6. Image Management

| Image | Path | Notes |
|---|---|---|
| Opening cover | `assets/images/invitation-cover.jpg` | Portrait, ~2:3 ratio. This photo *is* the opening screen — it's split down its own center by CSS, so a photo with a visible center seam (like the current one) reads most naturally. |
| Groom portrait | `assets/images/groom-solo.jpg` | Portrait orientation. Pre-cropped to trim empty headroom above the subject — if you replace it, crop similarly so the frame isn't mostly wall/background |
| Bride portrait | `assets/images/bride-solo.jpg` | Portrait orientation |
| Couple ("together") photo | `assets/images/couple-formal.jpg` | Portrait |
| Venue photo | `assets/images/couple-church.jpg` | Currently a couple photo at the venue — swap for a dedicated venue shot if you have one |
| Gallery photos | `assets/images/*.jpg` (six currently) | Any aspect ratio; the grid adapts |

**Recommendations:** JPG for photos (not PNG — smaller file size for the
same visual quality); keep the long edge under ~1800px (already done for
every image in this project, bringing multi-MB originals down to
100–260KB each); use `object-position` in the CSS if a specific photo's
subject sits off-center after cropping.

To replace a photo, just overwrite the file at the same path (same
filename), or update both the `<img src="...">` in `index.html` and the
matching entry in `js/data.js`'s `galleryPhotos` array if you rename it.

## 7. Audio

Path: `assets/music/ambient.mp3` (currently a trimmed, 2-minute, 112kbps
loop — the original supplied track was 15 minutes and 14MB, which would
have slowed the first load considerably).

To replace it, drop a new MP3 at that path and update `musicPath` in
`js/data.js` if you rename it. Keep it short (1–3 minutes) since it loops.

**Autoplay:** browsers block audio with sound from playing before a user
gesture. The site respects this by design — music only attempts to play
once the guest has opened the invitation (a genuine user interaction). If
playback is still blocked for any reason, it fails silently; the floating
music button lets the guest start it manually.

## 8. Wedding Information

Everything guest-facing lives in **`js/data.js`** — edit values there and
they propagate everywhere via `data-field` attributes:

```js
window.weddingData = {
  groom: "Marco Atif",
  bride: "Nadeen Assem",
  monogram: "M & N",
  weddingDateISO: "2026-10-11T19:00:00+03:00",
  weddingDateDisplay: "October 11, 2026",
  ceremonyTime: "7:00 PM",
  ceremonyLabel: "Church Ceremony",
  receptionTime: "8:00 PM",
  receptionLabel: "Reception",
  venue: "El Qasr Hall",
  locationUrl: "https://maps.google.com/?q=El+Qasr+Hall",
  whatsappNumber: "201551553557",
  whatsappMessage: "…",
  whatsappDeclineMessage: "…",
  musicPath: "assets/music/ambient.mp3",
  couplePhotos: { ... },
  galleryPhotos: [ ... ]
};
```

The Dress Code text (Gentlemen: All Black / Ladies: All Shiny) is directly
in `index.html` under `id="dress-code"` — edit it there, since it's
prose rather than a repeated field.

## 9. Google Maps

`locationUrl` in `js/data.js` currently points to a Google Maps **search**
for "El Qasr Hall" by name — not a fabricated address or coordinates. If you
have the venue's actual Google Maps share link, paste it in as
`locationUrl` for a more precise pin.

**If you leave `locationUrl` empty (`""`)**, the "View Location" button on
the Venue section hides itself automatically — the site never invents a
fake location.

## 10. WhatsApp RSVP

Two buttons, both under `id="rsvp"` in `index.html`:

- **Accept Invitation** → `whatsappMessage` in `data.js`
- **Decline Invitation** → `whatsappDeclineMessage` in `data.js`

Both build their `https://wa.me/<number>?text=<message>` URL via
`encodeURIComponent()` in `js/main.js`, so line breaks and punctuation
(including the heart emoji) always encode correctly. Neither button sends
anything automatically — WhatsApp opens with the message pre-filled, and
the guest still has to press Send.

## 11. Countdown

- **Target:** `weddingDateISO` in `js/data.js`, currently
  `2026-10-11T19:00:00+03:00`
- **Timezone:** the `+03:00` is Africa/Cairo. Egypt observes DST (EEST,
  UTC+3) from late April to late October, so the wedding date falls inside
  that window — verified against the current Egyptian DST schedule rather
  than assumed. If Egypt's DST rules change before the wedding, update this
  offset.
- Updates every second; never shows negative numbers.
- After the target passes, the four number blocks hide and "The Day Has
  Arrived" appears in their place — no page reload needed, this is checked
  every tick.

## 12. Navigation

**Home · Couple · Details · Venue · Memories · Dress Code · RSVP**

The old "Our Story" section (and its nav link) has been **intentionally
and completely removed** — HTML, CSS, and any JavaScript that referenced
it. There is no hidden or commented-out remnant of it anywhere in the
project.

Before the invitation is opened, no navigation is shown — it fades in only
once the cover has finished opening, so it never competes with that first
moment.

## 13. Responsive Design

Tested at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px. No
horizontal overflow at any width. The opening cover sizes itself to ~92vw
on small screens (capped at a sensible max-width on desktop) and the 3D
opening effect remains — it isn't swapped for a simpler fallback except
under `prefers-reduced-motion`.

## 14. Accessibility

- Semantic HTML throughout (`<nav>`, `<main>`, `<section>`, headings in
  order)
- The invitation cover is a real `<button>` with `aria-label="Open wedding
  invitation"`, reachable by Tab and activatable with Enter or Space
- Visible focus states on every interactive element
- `alt` text on all meaningful images; decorative elements are
  `aria-hidden`
- `prefers-reduced-motion` is respected globally: the center-opening
  animation collapses to near-instant, the custom cursor is disabled, and
  scroll-reveal shows content immediately instead of animating it in

## 15. Performance

- All photos re-encoded and capped at ~1800px on the long side
  (100–260KB each, down from multi-MB originals)
- Background music trimmed to a 2-minute loop at 112kbps (~1.6MB, down
  from a 14MB source file)
- `loading="lazy"` on every image outside the opening cover and hero
- No JavaScript framework, no animation library, no icon font — every
  script in `js/` is small and single-purpose
- Animations use `transform` and `opacity` only (no layout-triggering
  properties), so they stay on the compositor thread

## 16. Deployment

**GitHub Pages**
```bash
cd wedding
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```
Then: repo → **Settings → Pages** → Source: `main` branch, `/ (root)`
folder → Save. Live in a minute or two at
`https://<you>.github.io/<repo>/`.

**Netlify** — drag the whole `wedding` folder onto
app.netlify.com/drop, or connect the GitHub repo for automatic redeploys on
push. No build command needed — it's a static site.

**Vercel** — `vercel` CLI or the dashboard's "Import Project" from GitHub.
Framework preset: **Other** (static). No build command needed.

## 17. Custom Domain

After deploying to any of the above:
1. Add the domain in that host's dashboard (GitHub Pages: repo Settings →
   Pages → Custom domain; Netlify/Vercel: Domain settings).
2. At your domain registrar, add the DNS records the host gives you
   (usually a `CNAME` record pointing at the host, or `A` records for GitHub
   Pages' IPs).
3. DNS propagation can take a few minutes to 24 hours. Most hosts issue a
   free HTTPS certificate automatically once the domain resolves.

## 18. Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Images not appearing | Confirm the file exists at the exact path/case used in `index.html` — hosts are often case-sensitive even if your local machine isn't |
| Audio not playing | Expected before the invitation opens (autoplay is blocked by design). If it doesn't play *after* opening, tap the floating music button — some browsers require a second, more deliberate interaction |
| Google Maps not opening | Check `locationUrl` isn't empty in `js/data.js`; if empty, the button hides itself intentionally |
| WhatsApp not opening | Confirm `whatsappNumber` has no `+`, spaces, or dashes — digits only, with country code |
| Animations not working / feel instant | Check your OS's "reduce motion" accessibility setting — the site respects it deliberately |
| Fonts not loading | Requires an internet connection (Google Fonts CDN); falls back to system serif/sans-serif otherwise, so the site stays usable offline |
| Mobile layout issues | Hard-refresh (clear cache) — a stale cached CSS file is the most common cause after an update |

## 19. QA Checklist

- [ ] Opening: cover image loads, splits open on click and on
      Enter/Space, hero appears, nav fades in, music attempts to play
- [ ] Countdown updates every second and shows the correct day count
- [ ] Gallery lightbox: click to open, arrow keys and buttons to
      navigate, Escape and click-outside to close
- [ ] Dress Code section displays correctly (dark card, gold type, line-art
      icons), text matches spec
- [ ] RSVP: both Accept and Decline open WhatsApp with the correct,
      correctly-encoded message
- [ ] Venue button opens the configured map link (or is hidden if none
      configured)
- [ ] Navigation scrolls to the correct section for every link, on both
      desktop and the mobile hamburger menu
- [ ] No "Our Story" section, nav link, or reference anywhere
- [ ] Desktop custom cursor appears and expands on hover over
      links/buttons/gallery items; absent on touch devices
- [ ] Tested at 320/375/390/430/768/1024/1280/1440/1920px — no horizontal
      scroll, no clipped text, no overlapping elements
- [ ] Keyboard-only pass: every interactive element reachable and
      operable, with a visible focus ring
- [ ] `prefers-reduced-motion` enabled: opening is near-instant, cursor
      and scroll-reveal are disabled, site remains fully usable
- [ ] Zero console errors on load and through a full scroll

## 20. Production Checklist

- [ ] Confirm the wedding date, time, and venue one final time in
      `js/data.js`
- [ ] Confirm the WhatsApp number is correct and reachable
- [ ] Add the real Google Maps link if you have one (or leave empty)
- [ ] Swap in any updated photos
- [ ] Test the "Accept Invitation" and "Decline Invitation" buttons on an
      actual phone with WhatsApp installed
- [ ] Test on the couple's own phones (iOS Safari + Android Chrome)
      before sending invitations
- [ ] Re-check this README's image/audio paths still match what's in
      `assets/` if anything was renamed

---

### A note on the opening animation

An earlier version of this project used a hand-built CSS/SVG bow and
ribbon for the opening cover. It was replaced with the couple's actual
photographed invitation because CSS/SVG gradients have a real ceiling —
they can approach "very good illustration" but not "indistinguishable
from a photograph," and the brief called for the latter. Using the
photograph itself, combined with a single center-opening animation, was
the more honest way to hit "photorealistic" than continuing to chase it in
code. If a fully custom, non-photographic opening is wanted later, that's
a legitimate direction too — just a different one from what's built now.
