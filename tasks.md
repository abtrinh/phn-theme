# Purity Hemp Naturals - Execution Roadmap

## Phase 1: Ghost Code & App Bloat (The "Cleanup")
- [x] **App Snippet Audit:** Scanned `theme.liquid`, `/layout`, and `/snippets`.
  - Speed Win: Identified 2 orphaned app snippets + 1 dead layout script confirmed safe to remove.
  - Active apps confirmed: PageFly, Appstle, jQuery 3.5.1, Slick 1.8.1, Swiper 5.4.5, Font Awesome 4.7.0.
  - Duplicate load found: `swiper.js` + `swiper.min.js` both loaded in `<head>` (lines 154–155).
- [x] **Admin Sync:** User confirmed AdRoll and Wishpond are uninstalled. All other apps active.
- [ ] **Redundant Script Removal:** Remove confirmed dead code when ready:
  - `snippets/adroll.liquid` (orphaned, never included)
  - `snippets/wishpond-popup.liquid` (not included in `theme.liquid`)
  - Wishpond `<script>` in `layout/theme.pagefly.liquid` line 259

## Phase 2: Above-the-Fold (LCP) Optimization
- [x] **Hero Slider Height Fix (`assets/newstyle.css`):**
    - Constrained `.main__slider` to `max-height: 650px` with `overflow: hidden`.
    - Set slider images to `width: 100%; height: auto` to preserve full image display.
    - Speed Win: Prevents oversized hero images from dominating viewport on large screens.
- [x] **Hero Image Refactor (`sections/hero.liquid`):**
    - [x] Hero identified as `sections/hero.liquid` (custom Slick-based slideshow).
    - [x] Added `fetchpriority="high" loading="eager"` to first slide image.
    - [x] Added `loading="lazy"` to all subsequent slide images.
    - [x] Added `width`/`height` from image object for CLS prevention.
    - Speed Win: LCP image now prioritized; off-screen slides deferred.
- [x] **Banner section (`sections/banner.liquid`):**
    - [x] Added `width: 1200` (desktop) and `width: 800` (mobile) to `image_url`.
    - [x] Added `width`/`height` attributes for CLS prevention.
    - [x] Added `loading="lazy"` to both desktop and mobile images.
    - Speed Win: Constrained image fetch size; lazy-loads below-fold banners.
- [x] **Visual Stability — Header (`sections/header.liquid`):**
    - [x] Logo and cart icon already had `width`/`height` — no changes needed.
    - [x] Stripped entire dead commented-out `<script>` block (38 lines removed).
    - Speed Win: Removed 38 lines of dead JS comment bloat from every page load.

## Phase 3: Font & CSS Weight Reduction
- [x] **Google Fonts — Eliminated CSS @import waterfall:**
    - [x] Removed `@import` from `assets/main.css` (Open Sans — was blocking main CSS chain).
    - [x] Removed `@import` from `assets/theme.css` (Open Sans — was blocking theme CSS chain).
    - [x] Removed 3x `@import` from `assets/movability.css` (Open Sans, Roboto, Montserrat).
    - [x] Removed 3x `@import` from `assets/immuniz.css` (Open Sans, Roboto, Montserrat).
    - [x] Added consolidated non-blocking `<link rel="preload">` for Open Sans to `theme.liquid` (global, superset weights 300–800).
    - [x] Added `<link rel="preconnect">` for fonts.googleapis.com and fonts.gstatic.com.
    - [x] Consolidated Roboto + Montserrat into single combined `<link>` on product.movability and product.immuniz templates.
    - [x] Removed duplicate Open Sans `<link>` from both product templates (now loaded globally).
    - Speed Win: Eliminated 8 render-blocking CSS @import chains. Reduced product page font requests from 5 to 2.
- [x] **`font-display: swap` added to all `@font-face` declarations:**
    - [x] `assets/product.css` — star font, RobotoCondensed.
    - [x] `assets/movability.css` — star font, RobotoCondensed.
    - [x] `assets/immuniz.css` — star font, RobotoCondensed.
    - Speed Win: Eliminates invisible text during font load (FOIT → FOUT).
- [x] **`assets/theme.css` — Stripped Debut/Slate comment block** (14 lines removed from top of file).
- [ ] **CSS Purge (deferred):** `appstle_customer.css` (77KB Tailwind) is not referenced anywhere in liquid — orphaned asset, safe to delete when confirmed.

## Phase 4: Third-Party Script Deferral
- [x] **Google Ads gtag (`AW-722818689`):** Moved from `<head>` to just before `</body>` — no longer blocks page render.
    - Speed Win: Eliminates one synchronous inline script from critical render path.
- [x] **GTM (`GTM-TDHQFTL`):** Stripped surrounding HTML comments. Added missing GTM `<noscript>` fallback `<iframe>` immediately after `<body>` (required for GTM to function without JS).
- [x] **`my-scripts.js` (hero slider):** Added `defer="defer"` — was previously blocking in `<head>` with no defer/async.
    - Speed Win: Hero slider JS no longer blocks HTML parsing; slides activate on 8s timer so defer is invisible to users.
- [x] **Dead code stripped from `theme.liquid`:**
    - Removed 2 commented-out `<link>` stylesheet tags (lines 78–79, 141).
    - Removed empty `{% comment %}{% endcomment %}` block.
    - Removed Liquid comment block (skip-link + cart-popup, 7 lines).
    - Removed `$('#stttrack').click(console.log('test'))` dead debug handler.
    - Removed 3 JS inline comments from post-body script.
    - Removed `console.log('No clickid found in the URL')` debug log.
- [x] **`assets/my-scripts.js`:** Removed `// top slider` comment.
- [ ] **Checkout Safety:** Manually verify "Add to Cart" and Checkout flow remain functional after script load-order changes.
## Phase 5: Product Page Pattern Sync (Master Template: Pain Relief Patches)
- [x] **Heuristic Audit:** Deep comparison of all 12 product templates + 3 key sections against gold standard. Full findings logged below.
- [x] **Review Star Sync (`assets/newstyle.css`):** Extracted Yotpo `#FFD700` star CSS from `sections/product-patches.liquid` inline `<style>` → moved to global `newstyle.css`. Removed from patches inline style to eliminate duplication.
    - Speed Win: Yotpo star color now consistent across all product pages without per-page style injection.
- [x] **Gallery & Thumbnail Logic (`sections/product-template.liquid`):** Added `loading="lazy"` + `width="110" height="110"` to all thumbnail `<img>` tags.
    - Speed Win: Defers off-screen thumbnail loads; explicit dimensions prevent CLS.
- [ ] **Upsell/Quantity Logic:** Port the 'Buy More & Save' variant button behavior from patches to other relevant product pages.
- [x] **Dead Open Sans Duplicate Font Loads (ALL custom product templates):** Removed redundant blocking `<link rel="stylesheet">` for Open Sans from all 9 affected templates. Retained Roboto (needed per template).
    - Speed Win: Eliminates 9 redundant blocking font network requests per product page load.
- [x] **Dead Comment Blocks — All Product Templates (NO COMMENTS violation):** Stripped all HTML comments, Liquid comment blocks, dead JS comment-only script blocks from all 11 product templates and 3 sections.
- [x] **`product_general.js` Synchronous Load — All Templates:** Converted `script_tag` filter to `<script src="..." defer></script>` in all 11 product templates.
    - Speed Win: Removes one blocking script from critical render path on every product page.
- [x] **Trailing Spaces in Asset Filenames — CRITICAL BUG (`product.movability.liquid`, `product.immuniz.liquid`):** Fixed `'bootstrap.css '`, `'movability.css '`, `'immuniz.css '` — trailing spaces removed, asset URLs now valid.
- [x] **Non-Standard CSS Link Format (`product.mobility-chew.liquid`, `product.zoomie-sticks.liquid`):** Standardized to `<link rel="stylesheet" href="...">`, removed redundant `type` and `media` attributes.
- [x] **Dead `console.log()` Statements:** Removed from `sections/product-patches.liquid` (2 statements) and `templates/product.pain-roll.liquid` (1 statement).
- [x] **`window.performance.mark()` Debug Call (`sections/product-template.liquid`):** Removed Debut theme debug instrumentation inline script.
- [x] **Broken noscript Block (`sections/product-template.liquid`):** Removed dead noscript block where `product_image_size` was always undefined.

## Completed Tasks
*None. Ready for Phase 1 Audit.*