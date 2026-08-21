# Brothers Pest Control v5 — "The Authority Standard" — QA Report

**Reviewed:** `/home/claude/brothers-v5/site/` (6 pages + styles.css + script.js + assets)
**Against:** `/home/claude/brothers-v5/content/creative-brief.md` and `/home/claude/brotherspest/existing/brotherspestcontrolllc-main/src/App.jsx`
**Method:** grep/diff fact-checking, static structural review, Playwright headless Chromium (console/pageerror capture, 3 viewports, screenshots, actual-pixel contrast sampling), hand-verified WCAG contrast math.

**Overall: PASS with 2 real bugs to fix before this ships** — one high-priority (mobile nav is unreachable at common phone widths) and one accessibility fix (testimonial star icons fail contrast). Everything else — all fact-accuracy, all honesty checks, structure, palette/fonts — is clean.

---

## 1. Fact-Accuracy — ALL PASS

Diffed every real fact against `App.jsx` across all 6 pages.

| Fact | Result |
|---|---|
| Phone (803) 200-2033 / tel:8032002033 | PASS — present, correct format, on every page |
| Email office@brotherspestcontrol.net | PASS — every page |
| GorillaDesk booking URL (full tracking params) | PASS — diffed character-for-character, byte-identical on all 6 pages (hero, services, contact, FAQ CTAs) |
| Instagram (URL + @brothers_pest handle) | PASS — every page |
| 9 locations, exact spelling + state tags, source order | PASS — Home preview and Contact page chip lists reproduce the source array in exact order (Aiken, GA -> Martinez, GA -> Thomson, GA -> Graniteville, SC -> Evans, SC -> Grovetown, GA -> North Augusta, SC -> Hephzibah, GA -> Augusta, GA). Service Area page and FAQ Q4 use a prose/grouped-card format instead of the literal "City, ST" string, but correctly group Aiken under **Georgia** in every instance — the flagged "Aiken, GA" discrepancy was preserved verbatim everywhere, never silently "corrected" to SC. |
| 6 service names (exact) | PASS — Ant Control, Roach Prevention, Spider & Web Removal, Termite Treatment, Wildlife Control, Preventative Pest Plans, all present on Home, Services, and footer nav |
| 3 testimonials, verbatim + attribution | PASS — all 3 quotes exact on Home carousel; David L. quote reused verbatim in footer pull-quote on every page |
| Discount line (10% Military & First Responder) | PASS — hero, quick-link card, Services callout, FAQ Q6, footer trust bar |
| Licensing line (Licensed and Insured in GA & SC) | PASS — About page, footer legal line, trust bar (case varies Insured/insured between contexts, which is fine — not a fact deviation) |
| Copyright line | PASS — `&copy; 2026 Brothers Pest Control. All rights reserved.` on every page |
| Family-owned/faith-driven line, verbatim | PASS — matches source exactly on Home and About |

No fact deviations found anywhere.

---

## 2. Honesty Check — ALL PASS

Scanned all 6 pages for fabricated credentials/claims. Grepped for the red-flag term list (`guarantee|warranty|certified|award|24/7|years of|financing|BBB|accredited|partner`) — **zero matches**.

- No fabricated years-in-business claim — PASS
- No fake association memberships/badges — PASS
- No invented financing language — PASS
- "Our Commitment" section stays philosophy-level, no formal warranty/re-treatment terms invented — PASS (text: "We don't disappear after the first visit... we'd rather earn your trust the long way than oversell you on something we can't back up.")
- No invented review-count/star-aggregate (e.g. "4.9 stars, 200+ reviews") — PASS, only the 3 real testimonials appear
- No fabricated regional pest statistics — PASS, Service Area climate copy stays general and ties only to the real 6-service list
- No 24/7 / emergency-service claim — PASS
- No invented staff bios/named team beyond the real content — PASS
- No invented pricing tiers — PASS (site has no pricing table, consistent with source)
- Review Gold used only for star icons on real testimonials, never as a fake award/badge color — PASS

This variant's honesty premise holds up under a real adversarial read, not just a boilerplate check.

---

## 3. Structural Completeness — PASS

- All 6 pages exist: index, services, service-area, about, faq, contact.html — PASS
- Global nav identical (same 6 links, same order) on all 6 pages, verified via extraction — PASS
- All nav links resolve; Playwright confirmed zero same-origin 4xx/5xx across all 6 pages x 3 viewports — PASS
- Services page anchor IDs (ant-control, roach-prevention, spider-web-removal, termite-treatment, wildlife-control, preventative-pest-plans) exactly match the services.html#id hrefs used in every footer/sidebar link — PASS
- Home's #testimonials anchor exists and resolves — PASS
- Footer present and consistent (trust bar + 3 columns + legal line) on all 6 pages — PASS
- No placeholder/lorem/TODO/TBD text found anywhere — PASS
- Logo image (assets/logo-badge.jpg) resolves with 200 on every page — PASS
- Contact form has all 5 required fields (name, email, phone, address, message) + submit button — PASS
- Page titles and meta descriptions are unique and relevant per page, not copy-pasted — PASS
- script.js reviewed: mobile nav toggle, single-open FAQ accordion, and contact form client-side validation + success-state UI are all correctly wired, no backend assumed (consistent with brief) — PASS

---

## 4. Visual / Brand Check — PASS

- Palette matches brief exactly — verified via CSS custom properties: --authority-green:#0B7A4B; --deep-field-green:#0A5236; --charcoal-ink:#15191C; --pure-white:#FFFFFF; --emblem-navy:#1F3864; --review-gold:#D9A441; --fog-gray:#F4F6F5; --slate-gray:#5B6670
- Emblem Navy used only for trust-badge/credential elements (Service Area state headers + pin icons, Licensed & Insured callout) — PASS, not used as a generic accent
- Fonts: --font-heading: "Archivo", --font-body: "Source Sans 3", loaded via Google Fonts CDN link — matches brief exactly
- Visually distinct from sibling variants' rustic-green/charcoal(v1)/heritage(v2)/tech(v3)/cartoon(v4) treatments — confirmed via desktop screenshot review, no bleed-through
- Reads as comprehensive/professional per the brief's core concept — hero, why-choose-us grid, process strip, service area preview, testimonials, and FAQ preview all present on Home exactly as spec'd; logo badge renders as a clean white circular unit on the dark header/footer per brief section 6

---

## 5. Accessibility — WCAG AA Contrast (computed from actual rendered pixels via Playwright, not eyeballed)

I sampled real rendered background pixels behind key text (not just the CSS-declared background, since several of these sit on gradients/translucent overlays) and computed contrast against the actual color: value.

| Pair | Measured ratio | Required | Result |
|---|---|---|---|
| Review Gold star-rating text (.stars) on Pure White — Home testimonial cards | 2.25:1 | 4.5:1 (normal text) | FAIL |
| Review Gold star-rating text (.stars-mini) on Deep Field Green — footer trust-bar pull-quote (every page) | 4.11:1 | 4.5:1 (normal text, 0.85rem/not bold) | Borderline FAIL (close, but under threshold) |
| Review Gold .eyebrow chip on interior page-header gradient (sampled on services.html) | 5.62:1 | 4.5:1 | PASS (initial static gradient-math estimate suggested a possible fail near the gradient's 0% stop; live-rendered pixel sample at actual chip position passes comfortably) |
| Review Gold discount-callout on hero gradient (sampled on index.html) | 5.56:1 | 4.5:1 | PASS |
| Authority Green .eyebrow text on Pure White | 5.39:1 | 4.5:1 | PASS |
| Authority Green FAQ "+" icon on Fog Gray | 4.96:1 | 3:1 (icon/UI) | PASS |
| White on Authority Green (buttons) | 5.39:1 | 4.5:1 | PASS |
| White on Deep Field Green (hero/header) | 9.24:1 | 4.5:1 | PASS |
| Charcoal Ink on Pure White / Fog Gray (body text) | 17.68:1 / 16.29:1 | 4.5:1 | PASS |
| Slate Gray on Pure White / Fog Gray (muted text, FAQ answers, form notes) | 5.87:1 / 5.41:1 | 4.5:1 | PASS |
| Emblem Navy on Pure White (Service Area state headers) | 11.62:1 | 4.5:1 | PASS |
| White on Emblem Navy (Licensed & Insured callout) | 11.62:1 | 4.5:1 | PASS |

**Bottom line:** the pre-build risk flag on Review Gold as a text color was correct — it fails outright on white testimonial cards (2.25:1, less than half the required ratio) and sits just under threshold in the footer trust-bar pull-quote star rating (4.11:1 vs. 4.5:1 required). Every other palette pairing, including Authority Green as text, passes AA comfortably. Recommend: darken Review Gold when used as text/icon color on light backgrounds (e.g., a darker gold variant, or switch .stars/.stars-mini to a darker gold or add a dark icon backing), or restrict Review Gold text-usage to dark backgrounds only per the brief's original intent ("Review Gold used only for star icons... never as a badge color") — the dark-background instances all pass.

---

## 6. Responsive Behavior + Console/JS Errors — 1 REAL BUG FOUND

Ran Playwright headless Chromium across all 6 pages x 3 viewports (1440x900 desktop, 768x1024 tablet, 375x812 mobile), capturing console errors, page errors, failed network responses, and horizontal-overflow checks. Screenshots captured for all combinations plus mobile-nav-open states.

**Console/JS errors:** Zero pageerror events (no script exceptions) on any page at any viewport. One console error per page load, which turned out to be net::ERR_TUNNEL_CONNECTION_FAILED on the Google Fonts CDN request (fonts.googleapis.com/css2?family=Archivo...) — this is this sandbox's outbound-network restriction blocking the headless browser from reaching an external CDN, not a defect in the built site. The link tag and font-family CSS are implemented correctly per the brief; this will load normally for real users. Noting this so it isn't mistaken for a code bug.

**Horizontal overflow — REAL BUG, all 6 pages, mobile width (375px):**
document.documentElement.scrollWidth (480px) exceeds clientWidth (375px) on every page at mobile viewport. Root cause isolated: in the shared header, .header-cta contains the phone link, the "Schedule Service" button, and the hamburger .nav-toggle. At max-width:980px the CSS hides .header-phone and shows .nav-toggle, but the "Schedule Service" .btn.btn-primary is never hidden, shrunk, or wrapped — it keeps its full desktop padding/text at 375px width. Net effect, confirmed via a cropped mobile-viewport screenshot: the hamburger menu button is pushed entirely off-screen and is not visible/tappable on a 375px-wide phone, so mobile visitors on common phone widths cannot open the nav menu at all — only "Schedule Service" is reachable. This is more than a cosmetic scrollbar issue; it breaks primary navigation on mobile.

Fix suggestion: at the max-width:980px (or a tighter max-width:640px) breakpoint, either shrink/hide the "Schedule Service" button text (icon-only) or move it out of the sticky header row on small screens, so .nav-toggle has room and stays on-screen.

**Everything else responsive:** at tablet and desktop widths, no overflow detected on any page. Footer columns, grids, and form rows all correctly collapse to single-column per the @media (max-width:640px) rules once the header issue above is fixed. FAQ accordion and contact-form JS both fired correctly in the Playwright interaction pass (accordion opened on click, form's checkValidity/success-state logic present and correctly wired).

---

## 7. FAQ Content Honesty Check — PASS

Re-read all 6 FAQ answers against the honesty standard:

- Q1 (safety): hedged correctly — "applied the way they're labeled and intended," no blanket "100% safe" claim — PASS
- Q2 (scheduling speed): no same-day/24-7 promise, matches brief's "we'll work with you to find a time" framing — PASS
- Q3 (what's included): stays general ("depends on what you're dealing with"), no invented fixed checklist — PASS
- Q4 (service area): matches the 9 verified locations exactly, correctly preserves "Aiken" under Georgia — PASS
- Q5 (still see pests): stays philosophy-level, no specific re-treatment/refund policy invented — PASS
- Q6 (discounts): matches the real 10% military/first-responder discount only, no invented extra discount categories — PASS
- All 6 FAQs present; Home's FAQ preview correctly shows exactly the 3 specified questions (safety, frequency, what's included) linking to the full FAQ page — PASS

---

## Summary for Fix List

1. **[High priority]** Mobile header overflow / hamburger menu unreachable at <=375px width, all 6 pages — the "Schedule Service" button needs responsive handling in the header so .nav-toggle stays on-screen.
2. **[Accessibility fix]** Review Gold star icons on white testimonial cards (2.25:1) fail WCAG AA outright; footer trust-bar star rating on Deep Field Green (4.11:1) is a narrow miss. Recommend a darker gold for text/icon use on light backgrounds, or restrict Review Gold text usage to dark backgrounds only.

Everything else — every fact, every honesty check, all structure, palette, fonts, and FAQ content — passes clean.

---

## Update — Both Bugs Independently Re-Verified as Fixed

Frontend Dev reported both fix-list items resolved. I independently re-ran verification (did not just take the report at face value):

1. **Mobile nav overflow — CONFIRMED FIXED.** Re-tested all 6 pages at 320/375/414/640/768/980/1280px via Playwright: zero horizontal overflow at any width/page combination, and the `.nav-toggle` hamburger stays fully on-screen whenever visible. Went further than a static check — actually clicked the toggle at 375px on index.html and confirmed `.site-header` gains `nav-open` and `.main-nav` becomes visible (menu genuinely opens, not just visually present). Fix approach: header padding/gaps tighten and the CTA button swaps to a compact "Book" label under 640px, with `aria-label="Schedule Service"` preserved on the anchor and `.short-label`/`.full-label` toggled via CSS with `aria-hidden` on the short label — accessible name is preserved for screen readers.

2. **Review Gold contrast — CONFIRMED FIXED.** Re-sampled actual rendered pixel colors via Playwright: testimonial `.stars` now measures **5.64:1** (was 2.25:1) using new `--review-gold-on-light: #826227`; footer `.stars-mini` now measures **5.42:1** (was 4.11:1) using new `--review-gold-on-dark: #F9BC4A`. Both clear the 4.5:1 AA threshold with margin. Decorative-only gold usages (badge rings, card border accents) were correctly left on the original `--review-gold` since those aren't text-contrast concerns.

**Regression sweep:** re-checked booking URL (still 1 byte-identical string across all 6 pages), phone/email counts, honesty red-flag terms (still zero matches), and placeholder text (still zero matches) — no regressions introduced by the fix.

**Status: both items closed. No further QA blockers on this build.**
