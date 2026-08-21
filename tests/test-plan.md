# Brothers Pest Control v5 — "The Authority Standard" — QA Test Plan

**Status:** Written pre-build, before Frontend Dev starts. This is the checklist I will run once the site exists.

**Source of truth for facts:** `/home/claude/brotherspest/existing/brotherspestcontrolllc-main/src/App.jsx`
**Spec of truth for structure/design:** `/home/claude/brothers-v5/content/creative-brief.md`
**Build root (expected):** `/home/claude/brothers-v5/` — 6 pages: `index.html`, `services.html`, `service-area.html`, `about.html`, `faq.html`, `contact.html`

Environment note: Playwright + Chromium is confirmed available and launches in this environment (verified via a local headless launch test), so section 6 below will run as real headless-browser checks, not a static-only fallback.

---

## 1. Fact-Accuracy Check (diff against App.jsx)

For every real-world fact below, grep it directly out of `App.jsx` and grep/diff the same string out of each built HTML page. Any mismatch (including whitespace, punctuation, or case differences) is a FAIL, not a nitpick — this variant's entire premise is zero-fabrication.

| Fact | Verify against source | Method |
|---|---|---|
| Phone | `(803) 200-2033` and `tel:8032002033` | grep both formats in App.jsx, grep same in every page's header/footer/CTAs/contact page |
| Email | `office@brotherspestcontrol.net` | grep App.jsx vs. footer + contact page (and any `mailto:` href) |
| Booking URL | full GorillaDesk URL incl. every tracking param, byte-for-byte | grep the full string out of App.jsx, diff character-for-character against every `href` that should point to booking (hero CTA, services CTA, contact page, FAQ CTA) — a single dropped/altered char in `fbclid`/`aem` params is a FAIL |
| Instagram | `https://www.instagram.com/brothers_pest` and `@brothers_pest` handle text | grep App.jsx vs. footer (every page) + contact page |
| 9 locations + state tags | exact spelling and state letter, exact source order where order is implied | extract source array, diff line-by-line against Home preview list, full Service Area grid, FAQ Q4 answer, Contact page confirmation note, footer (if listed) — confirm "Aiken, GA" appears verbatim everywhere (not silently "corrected" to SC) per brief §7 |
| 6 services (exact names) | Ant Control · Roach Prevention · Spider & Web Removal · Termite Treatment · Wildlife Control · Preventative Pest Plans | diff against Home preview grid, full Services page cards, footer Company column |
| 3 testimonials (verbatim) | full quote text + attribution name, character-for-character | diff App.jsx quotes against Home carousel and footer pull-quote (David L.) |
| Discount line | "10% Military & First Responder Discount" / "10% off" phrasing | grep across hero, quick-link card, Services callout, FAQ Q6, footer trust bar |
| Licensing line | "Licensed and Insured in Georgia and South Carolina" | grep across About page, footer legal line, trust bar |
| Copyright line | "© 2026 Brothers Pest Control. All rights reserved." | grep footer on every page |
| Family-owned/faith-driven line | "Faith-driven values guide everything we do. We treat your home like our own, with integrity and care." | grep App.jsx vs. About page story + Why Choose Us pillar 1 |

**Deliverable for this section:** a table in the report with PASS/FAIL per row, plus the exact grep/diff output or line quoted for any FAIL.

---

## 2. Honesty Check (variant-specific — this is a real check, not boilerplate)

The whole premise of "The Authority Standard" is big-company *structure* filled with small-company *honesty* — so I will actively scan for fabricated content that a "make it look more comprehensive" impulse could introduce. Specifically confirm NONE of the following appear anywhere in the built site:

- [ ] No fabricated years-in-business / "X years of experience" claim not present in source (App.jsx has no such figure — any specific number is invented)
- [ ] No fake association memberships, certifications, or badge logos (e.g., BBB, NPMA, Angi/HomeAdvisor elite badges) beyond the real "Licensed & Insured in Georgia and South Carolina" fact
- [ ] No invented financing partners or "financing available" claims
- [ ] No formal warranty/guarantee program with specific re-treatment terms, day counts, or money-back language — the brief explicitly requires "Our Commitment" to stay philosophy-level ("we'd rather earn your trust the long way..."), not a structured guarantee
- [ ] No invented review count/star-rating aggregate (e.g., "4.9 stars from 200+ reviews") — only the 3 real verbatim testimonials exist as proof
- [ ] No fabricated regional pest data/statistics (e.g., invented "% of CSRA homes affected by termites") beyond the brief's honest, general climate framing
- [ ] No emergency/24-7 service claim — source and brief do not establish 24/7 availability
- [ ] No fake team headshots/bios/named staff beyond what's real (source has no named staff bios — check About page doesn't invent any)
- [ ] No invented service categories beyond the real 6, and no invented pricing/tiers (source has no pricing table)
- [ ] Review Gold (`#D9A441`) used only for star icons on the 3 real testimonials — not repurposed as a fake "award" or "top-rated" badge color

**Method:** full read-through of all 6 pages' rendered text (not just grep, since fabrication is semantic, not a string match) plus a targeted grep for red-flag terms: `guarantee`, `warranty`, `certified`, `award`, `24/7`, `years`, `financing`, `BBB`, `accredited`, `partner`.

---

## 3. Structural Completeness

- [ ] All 6 pages exist at expected paths: `index.html`, `services.html`, `service-area.html`, `about.html`, `faq.html`, `contact.html`
- [ ] Global nav present and identical (same links, same order) on all 6 pages
- [ ] Every nav link resolves to an existing file (no 404s / dead relative paths)
- [ ] Every internal anchor (e.g., Home's `#testimonials` link from the quick-link card) resolves to an actual `id` on the target page
- [ ] Every cross-page link mentioned in the brief resolves: Home → services.html, service-area.html, contact.html; Services → booking URL; Service Area → tel: CTA; About → (nav only); FAQ → Contact Us link; Contact → booking URL
- [ ] Footer present and consistent on all 6 pages (trust bar, 3 footer columns, legal line)
- [ ] No placeholder/lorem-ipsum text anywhere ("Lorem ipsum", "TODO", "TBD", "coming soon", `#` as a real href with no destination)
- [ ] All images referenced (logo badge, any icons) resolve to files that exist in `assets/` — no broken `<img>` src
- [ ] Contact form has all 5 required fields (Name, Email, Phone, Address/City, Message) plus a Send button, and a defined submit behavior (booking link or `mailto:` fallback, since brief specifies this is a static template with no backend)
- [ ] Page `<title>` and meta description present and distinct per page (not copy-pasted identically across all 6)

**Method:** static file check (grep for hrefs/ids, cross-reference existence) plus Playwright navigation pass — click every nav link and every in-page CTA/anchor, assert no 404 and no console errors (see §6).

---

## 4. Visual / Brand Check

- [ ] Palette matches brief exactly: Authority Green `#0B7A4B`, Deep Field Green `#0A5236`, Charcoal Ink `#15191C`, Pure White `#FFFFFF`, Emblem Navy `#1F3864`, Review Gold `#D9A441`, Fog Gray `#F4F6F5`, Slate Gray `#5B6670` — grep CSS custom properties / hex values used against this list; flag any off-palette color introduced
- [ ] Emblem Navy used only for trust-badge/credential elements (Licensed & Insured callout, footer trust bar) — not used generically as a link/accent color elsewhere
- [ ] Review Gold used only for star icons on testimonials — not elsewhere
- [ ] Headings render in Archivo (bold weights), body text in Source Sans 3 — check `<link>`/`@font-face`/font-family CSS rules, and spot-check computed font-family on a heading and a paragraph
- [ ] Site is visually distinguishable from the other 4 sibling variants (v1 muted rustic Pine Green/Barn Red + Fraunces/Inter; v2 heritage/emblem concept + Libre Caslon Display/Work Sans; v3 tech/defense + Chakra Petch/IBM Plex Sans; v4 friendly cartoon-warm + Baloo 2/Nunito Sans) — confirm no accidental hex/font bleed-through from a shared template base
- [ ] Overall impression reads as "comprehensive, professional, corporate-confident" per the brief's core concept — logo badge (white circular unit) sits cleanly on dark green/charcoal header and footer per brief §6, not awkwardly cropped or recolored

**Method:** read compiled CSS for the hex values and font-family declarations; visual screenshot pass via Playwright on all 6 pages at desktop width for a human-style eyeball check alongside the mechanical checks above.

---

## 5. Accessibility — WCAG AA Contrast (computed, not eyeballed)

This is flagged as a recurring real bug class on sibling variants, so every text/background color pairing actually used in the site gets a computed contrast ratio, not a visual guess.

**Method:** extract every distinct (text-color, background-color) pair actually rendered (via computed styles in a Playwright pass, or by enumerating CSS rules against the palette table) and run each through the WCAG contrast formula. Record the actual ratio, not just pass/fail.

Required minimums:
- Normal body text: ≥ 4.5:1
- Large text (≥ 24px, or ≥ 18.66px bold): ≥ 3:1
- UI components / graphical objects (button borders, form field borders, icons conveying info): ≥ 3:1

Pairs to check with particular scrutiny (per task instructions — Authority Green and Review Gold as text colors are the likely failure points):
- [ ] Authority Green (`#0B7A4B`) text on Pure White / Fog Gray — compute ratio, likely borderline for normal-size text
- [ ] Authority Green text/buttons on Charcoal Ink or Deep Field Green backgrounds (green-on-green risk)
- [ ] Review Gold (`#D9A441`) star icons/text on Pure White and on Fog Gray — gold-on-light is a classic AA failure, compute exactly
- [ ] Review Gold on Charcoal Ink / Deep Field Green (dark backgrounds) — likely passes but verify
- [ ] White text on Authority Green and on Deep Field Green (hero, CTA buttons, header) — verify green is dark/saturated enough
- [ ] Charcoal Ink text on Fog Gray and Pure White (body copy) — should pass easily, confirm anyway
- [ ] Slate Gray (`#5B6670`) as muted/secondary text on white and Fog Gray — muted text is the other classic near-miss
- [ ] Emblem Navy (`#1F3864`) text/icons on white and on green backgrounds
- [ ] Any placeholder text color inside the contact form fields
- [ ] Link colors in body copy vs. surrounding text (need both contrast against background AND sufficient differentiation from body text)

**Deliverable:** a table of every pair checked, computed ratio, required minimum, and PASS/FAIL — not a general "looks fine."

---

## 6. Responsive Behavior + Console/JS Errors (headless browser)

Environment check result: Playwright with Chromium **is available** in this environment (launch test succeeded), so this section runs as live headless-browser checks, not the static fallback.

For each of the 6 pages:
- [ ] Load in Chromium headless at desktop (1440×900), tablet (768×1024), and mobile (375×812) viewports
- [ ] Capture `console` and `pageerror` events during load and after interacting with nav toggle / form fields / carousel (if any) — zero JS errors is the bar
- [ ] Capture `response` events for any 4xx/5xx on same-origin requests (broken asset/link check, cross-verifies §3)
- [ ] At mobile width: confirm nav collapses to a usable mobile menu (not overlapping/clipped), hero CTA buttons stack and remain tappable, service/pricing-style grids reflow to single/double column without horizontal overflow, footer columns stack legibly
- [ ] Take a screenshot per page per viewport for the visual record attached to the report
- [ ] Confirm no horizontal scrollbar / content overflow at any of the 3 widths

**Fallback (not expected to be needed):** if Playwright launch fails at review time, fall back to static review — read HTML/CSS for responsive patterns (media queries, flex/grid wrap rules, viewport meta tag) and note in the report that this section is downgraded from verified to inferred.

---

## 7. FAQ Content Honesty Check

Beyond the general honesty check in §2, specifically re-read all 6 FAQ answers against what the real source site actually implies, since FAQ copy is an easy place for confident-sounding but unsupported claims to creep in:

- [ ] Q1 (safety for kids/pets): confirms products are "applied the way they're labeled and intended" — does NOT claim a specific certification or "100% safe" — check built copy matches this hedged, honest framing
- [ ] Q2 (scheduling/how fast): does NOT imply guaranteed same-day or 24/7 emergency response — brief's answer only says "we'll work with you to find a time that fits your schedule," no speed promise
- [ ] Q3 (what's included in a visit): stays general ("depends on what you're dealing with") — does NOT invent a fixed checklist or fixed visit duration not in source
- [ ] Q4 (service area): location list matches the 9 verified locations exactly (cross-ref with §1) — does NOT silently correct the "Aiken, GA" flagged discrepancy
- [ ] Q5 (still see pests after treatment): stays philosophy-level ("give us a call... we want to hear about it") — does NOT commit to a specific free re-treatment policy, timeframe, or refund, which would cross into inventing a warranty (ties to §2)
- [ ] Q6 (discounts): matches the real 10% military/first-responder discount exactly — no additional invented discount categories (e.g., senior, referral, seasonal) not present in source
- [ ] All 6 FAQ questions from the brief are present (not fewer, not extra invented ones) and the Home page FAQ preview shows exactly the 3 specified (safety, frequency, what's included) linking through to the full FAQ page

---

## Reporting

Once Frontend Dev messages "frontend complete" with the file list, I will:
1. Run all checks above against the actual built files.
2. Write the full pass/fail report with evidence (grep output, computed contrast ratios, screenshots, console log excerpts) to `/home/claude/brothers-v5/tests/report.md`.
3. Message the team lead with a summary (overall pass/fail count, and call out any FAIL in the Honesty Check or Accuracy Check sections as blocking, since those two are non-negotiable for this variant).
