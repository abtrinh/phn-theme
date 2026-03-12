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
## Phase 6: Global Gallery & Thumbnail Standardization
- [x] **Audit complete:** `snippets/media.liquid` + `sections/product-template.liquid` fully reviewed.
- [x] **Featured gallery image — native LCP load (`snippets/media.liquid`):**
    - Featured image switched from lazysizes `data-src` to native `src` + `srcset` with `fetchpriority="high"`.
    - `srcset` serves 400/600/800/1000/1200w via `image_url` filter — no manual uploads required.
    - `sizes="(min-width: 990px) 50vw, 100vw"` matches actual rendered column widths.
    - Verified: no `.lazyload` opacity CSS applies to `feature-row__image` — safe to remove lazyload class.
    - Speed Win: Browser can fetch LCP product image in parallel with HTML parse, without waiting for lazysizes JS.
- [x] **Non-featured gallery images — lazysizes widths capped (`snippets/media.liquid`):**
    - `data-widths` trimmed from `[180,360,540,720,900,1080,1296,1512,1728,2048]` to `[180,360,540,720,900,1080,1200]`.
    - Zoom uses separate 1024x1024@2x URL — display cap at 1200 does not affect zoom quality.
    - Speed Win: Eliminates potential 1296–2048px image requests for off-screen gallery slides.
- [x] **Thumbnail sizing (`sections/product-template.liquid`):** Already at `110x110` @2x with `width`/`height` + `loading="lazy"` — no changes needed.
- [x] **Aspect-ratio CLS:** `padding-top` percentage trick already in place per image's real aspect ratio — zero layout shift.
- [x] **Dead comment blocks stripped (`snippets/media.liquid`):** Removed 21-line Liquid comment block + 3-line inline comment.
- [x] **`window.performance.mark()` debug call removed (`snippets/media.liquid`):** Debut theme instrumentation eliminated.
## Phase 7: Metafield-Driven Gallery Logic
- [x] **Metafield identified:** `product.metafields.product.images_set` (namespace: `product`, key: `images_set`, type: `list.image_reference`).
- [x] **Hardcoded main image replaced (`sections/product-patches.liquid`):**
    - Removed hardcoded CDN URL (`cbd_path120_front_jpeg...`) from `<div class="product__galery__bigImage">`.
    - Replaced with `main_gallery_image = gallery_images.first | default: product.featured_image`.
    - Main image now uses `image_url: width: 800, format: 'webp'` with full `srcset` (400/600/800w) and `fetchpriority="high"`.
    - `width`/`height` attributes pulled from image object — prevents CLS.
    - Speed Win: LCP image now served at correct size via Shopify CDN, not a hardcoded master URL.
- [x] **Duplicate metafield assignment removed:** `{% assign gallery_images %}` was called twice (inside each sub-div). Consolidated to one assignment at top of gallery block.
- [x] **Thumbnail `data-src` upgraded:** `width: 500` → `width: 800` — matches Phase 6 display standard; prevents blurry image on variant switch.
- [x] **Fallback implemented:** If `images_set` metafield is blank, thumbnails loop over `product.images` and main image falls back to `product.featured_image`. Gallery is never empty.
- [x] **Phase 7 Regression Fix (`sections/product-patches.liquid`):** Replaced `gallery_images.first` with `for img in gallery_images limit: 1` loop — `.first` on Shopify metafield arrays produces incompatible object type for `image_url` filter; loop variable is proven compatible (same mechanism as working thumbnail loop). `product.featured_image` fallback retained.
- [ ] **Variant button `data-src` (deferred):** The 4 variant buttons (120mg/240mg/480mg/960mg) still use hardcoded CDN URLs for image swap on click. Requires a per-variant image metafield mapping — out of Phase 7 scope.
## Phase 8: Multi-Device & Responsive Polish (Pain-Relief-Patches — 8mg first)
- [x] **Autoship Box Visibility (`sections/product-patches.liquid`):** Changed `overflow: hidden !important` → `overflow: visible !important` in inline `<style>` at `max-width: 1000px`. Root cause was the grid container clipping the sub_box when rows overflowed.
    - Speed Win: Autoship/subscription widget is now fully visible on tablet and mobile without layout shift.
- [x] **Package Button 3+1 Layout (`assets/patches_productpatch.css`):** Added `flex: 0 0 calc(33.33% - 6px)` to `.product__info--button` at `max-width: 768px` inside `.product__info.cream_prod`. With `justify-content: center` on the changer, the 4th button wraps and centers automatically.
    - Speed Win: Buttons now display 3 on top row + 1 centered below on all mobile phones.
- [x] **Qty + Add to Cart Side-by-Side (`assets/patches_productpatch.css`):** Switched `.product__info.cream_prod` to `grid-template-columns: 1fr 1fr` at `max-width: 768px`. All siblings set to `grid-column: 1 / -1` via `> *` override. Qty pinned to col 1, ATC to col 2, `margin-left: 0`.
    - Speed Win: Qty selector and Add to Cart button are now properly side-by-side and centered on mobile.
- [x] **Trust Seals on Own Line (`assets/patches_productpatch.css`):** Forced `.product__info__seals` to `grid-row: 8; grid-column: 1 / -1; justify-self: center` at `max-width: 768px`, moving it below the Qty/ATC row.
    - Speed Win: Trust badge image now appears on its own centered line below Add to Cart.
- [x] **No-Comments Compliance (`assets/patches_productpatch.css`):** Removed all illegal CSS comments from the file during mobile refactor.
- [x] **Gallery Thumbnail Single-Row Swipe (`assets/patches_productpatch.css`):** Converted `.product__galery__smallImages` from CSS Grid to `display: flex; flex-wrap: nowrap; overflow-x: auto` at `max-width: 768px`. Added `justify-content: safe center` (centers when items fit, scrolls from start when overflow). Hidden scrollbar via `scrollbar-width: none` + `::-webkit-scrollbar`. Items are `flex: 0 0 74px` — no 2nd row possible.
    - Speed Win: Thumbnails now display on a single centered scrollable row; excess thumbnails accessible by horizontal swipe without reflow.
- [x] **Main Gallery Image Swipe (`sections/product-patches.liquid`):** Added vanilla JS IIFE touch handler on `#full_image`. Tracks `touchstart` X, on `touchend` detects swipe direction (50px threshold), navigates active thumbnail index ±1, updates main image `srcset`, scrolls new active thumbnail into view via `scrollIntoView`.
    - Speed Win: Zero-library swipe implementation (~20 lines); synced with existing thumbnail active-class system; no DOM restructure required.
- [ ] **Apply Responsive Fixes to All Other Product Pages:** Once 8mg patch page is verified in production, replicate the 3+1 button, 2-col qty/ATC, seals row, and autoship visibility fixes to all other `cream_prod` product pages.
- [ ] **Viewport Audit:** Verify `theme.liquid` has correct `<meta name="viewport" content="width=device-width, initial-scale=1">` tag.
- [ ] **Horizontal Scroll Scan:** Audit CSS for `width: 100vw` or hard-coded `px` widths causing off-screen overflow on 375px viewports.
- [ ] **Responsive Integrity Test:** Manually verify no text or icons overlap when scaling from 1440px down to 320px across all product templates.
- [ ] **Hamburger Menu Check:** Confirm mobile nav menu does not push page content off-center when active.
- [x] **Yotpo Reviews Widget — Mobile Layout Fix (`assets/patches_productpatch.css`):** Yotpo's injected fixed-width CSS was causing horizontal overflow and scroll on mobile. Added `@media (max-width: 768px)` overrides: `overflow-x: hidden` on commentlist wrapper + Yotpo root; `max-width: 100%; box-sizing: border-box` on all `.yotpo *` elements; `flex-direction: column; align-items: flex-start` on header container to stack star distribution and Write A Review button vertically; `white-space: nowrap; font-size: 30px` on `.yotpo-headline` to keep "Customer Reviews" single-line left-aligned; Write A Review button left-aligned via `display: block; margin: 0`.
    - Speed Win: Eliminated horizontal overflow in reviews section; all elements now stack correctly on mobile without horizontal scroll.
- [x] **Price Section Spacing Fix — Pain Relief Patches (`sections/product-patches.liquid`):** Root cause: inline `<style>` block had `grid-template-rows: 0 0 140px auto 390px...` with `!important` at `max-width: 1000px`. Row 3 (prices) was fixed at 140px — taller than actual content — leaving dead whitespace above "Buy More and Save". Changed `140px` → `auto` so the row collapses to content height. Also removed stale `min-height: 24px; margin-top: 6px` Yotpo wrapper div (replaced with plain `<span>` matching gold page structure). Upgraded `patches_productpatch.css` mobile margin overrides to `.product__info.cream_prod` specificity (0-3-0) to prevent future regressions.
    - Speed Win: Eliminated ~50px of dead grid whitespace on mobile; prices section now sizes to content.
- [x] **Cart Icon Size — Mobile Header (`assets/main.css.liquid`, `sections/header.liquid`):** Root cause: Shopify serves `main.css.liquid`, not `main.css` — all prior edits were going to the wrong file. Fixed in `main.css.liquid`: global rule sets `width: 30px; height: 30px` (desktop). Mobile ≤768px media query sets `width: 48px; height: 48px` on `.header__menu .header__svg`. Badge (`.header__menu_count`) repositioned from `left: 9px; top: 3px` → `right: 0; bottom: 0` to anchor to bottom-right corner of enlarged icon. `main.css` synced to match.
    - Speed Win: Cart icon now renders at correct size on mobile without affecting desktop; badge stays anchored to icon corner at all sizes.

## Completed Tasks
*None. Ready for Phase 1 Audit.*