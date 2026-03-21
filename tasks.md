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
- [x] **Product Page Top Margin Removed (`assets/product.css`, `assets/patches_productpatch.css`):** Removed top padding from `.product` class: `padding: 38px 0 0` → `padding: 0` on desktop; `padding-top: 19px` → `padding-top: 0` on mobile (≤768px).
    - Speed Win: Eliminated dead whitespace at top of all product pages.
- [x] **Related Products — Section Order (`templates/product.*.liquid`):** Moved `{% section 'product-recommendations' %}` above `{% section 'product-image-section' %}` / `{% section 'calmex-image-section' %}` in 6 product templates (calm-relax, pain-relief-patches, pain-roll, pain-relief-patches-gold, pain-relief-cream, pain-relief-cream-sample). `div.related.container` now renders above `div#cachet` site-wide.
    - Speed Win: No code change — structural reorder only; no layout shift impact.
- [x] **Related Products — Mobile Swiper (`sections/product-recommendations.liquid`, `assets/product.css`, `assets/patches_productpatch.css`):** Added Swiper 5.x markup to `product-recommendations.liquid`: `.related__products` gains `swiper-container` class + id, products wrapped in `.swiper-wrapper`, each card gets `swiper-slide`. On desktop: `.related__products .swiper-wrapper { display: contents }` preserves existing CSS Grid layout. On mobile (≤768px): `.related__products` switches to `display: block; overflow: hidden`, `.swiper-wrapper` re-enabled as `display: flex`, each `.related__product` set to `width/max-width/min-width: 100%` (full-width slide). Swiper init runs only when `window.innerWidth <= 768` via inline IIFE.
    - Speed Win: Zero new library weight (Swiper already global); mobile users get swipeable full-width product cards; desktop layout unchanged.

## Phase 9: Cross-Device Responsive Fixes (All Product Pages)
- [x] **Yotpo Star Ratings Widget Missing — pain-relief-cream-sample (`sections/product-cream-sample.liquid`):** Added `data-yotpo-instance-id="1267418"` widget inside `div.product__info-prices` after the `save_text` paragraph. Root cause: cream-sample only had the full reviews widget (`1267419`) but lacked the star ratings widget (`1267418`) present on all other product pages.
- [x] **Gallery Centering — Tablet 768-1000px (calm-relax, pain-relief-cream, pain-relief-cream-sample, pain-roll + cream.css pages) (`assets/cream.css`):** Added `@media (min-width: 768px) and (max-width: 1000px)` block: `aspect-ratio: 1/1; overflow: hidden` on `.product__galery__bigImage`; `width: 100%; height: 100%; object-fit: contain; display: block` on `__bigImage_image`; `justify-content: center` on `__smallImages`. Root cause: patches pages had these rules in `patches_productpatch.css` but cream-loading pages had no equivalent.
- [x] **Gallery Image 20% Size Reduction — Tablet 768-1000px — All Product Pages (`assets/product.css`):** Added `@media (min-width: 768px) and (max-width: 1000px)` block: `width: 80%; margin: 0 auto` on `.product__galery__bigImage`. Replaces `transform: scale(0.8)` approach which left whitespace due to aspect-ratio container retaining full layout size.
- [x] **Pain-Roll Product Image Not Rendering — Tablet 768-1000px & Desktop 1001-1630px (`assets/roll.css`):** Root cause: `product.css` rule `@media (max-width: 1642px) { .cream__top--man { display: none; } }` hid the image across the range. Fixed in `roll.css` scoped to `.roll__top .cream__top--man`: `display: block` at 1001-1630px; `display: flex; position: relative; left: 0; justify-content: center` at 768-1000px with `img { width: 100% }`.
- [x] **Pain-Roll `div.cream__top__box--left` Pushing Content Right — Tablet 768-1000px (`assets/roll.css`):** Root cause: `.cream__top__box__contant` uses `grid-template-columns: 40% 60%` — empty `box--left` occupied 40% and pushed all 4 `box--li` items right. Fixed by adding `.roll__top .cream__top__box--left { display: none }` and `.roll__top .cream__top__box__contant { grid-template-columns: 1fr }` scoped to tablet.
- [x] **Right-Side Bleed — 1001-1284px — All Product Pages (`assets/product.css`):** Multi-iteration fix for elements overflowing past the right edge of `.product__info` at tablet/narrow-desktop widths:
  - Root cause: `grid-template-columns: 44% 10% 27%` = 81% explicit columns. Items using `grid-area: X/span 4` in a 3-column grid created an implicit 4th column with an extra `column-gap: 10px`, causing ~10px overflow plus `min-width: auto` on grid items allowing content to expand past track boundaries.
  - Final fix: `grid-template-columns: 44% 10% 1fr` (3rd column fills remaining space); `grid-column: 1/-1` on `__changer`, `--sub_box`, `__wrapper` (spans to last explicit line only — no implicit column, no extra gap); `min-width: 0` on same items; `flex-wrap: wrap` on `__viewType`; `overflow: hidden` on `__viewArea`; `max-width: 100%; height: auto` on `#video iframe`.
  - Range: `min-width: 1001px` to `max-width: 1284px` (covers iPad Pro 1024px through 1280px; at 1284px+ button sizes already reduce to 136px and fit naturally).
- [x] **Product Catalog — Removed Prices (`sections/collection-custom.liquid`):** Removed `div.related__product__price` block and its two CSS rules (`.related__product__price` and `.related__product__price span`). Prices no longer render on the product catalog page.

## Phase 10: Tablet Responsive Polish (769–1024px — All Product Pages)
- [x] **`patches_productpatch.css` — Added to Missing Templates:** File was only loaded on 4 of 11 product templates. Added `<link rel="stylesheet">` to 7 missing templates: `calm-relax`, `pain-roll`, `mobility-chew`, `zoomie-sticks`, `cream-sample`, `pain-relief-cream`, `pain-relief-cream-sample`.
  - Speed Win: All tablet CSS fixes now apply universally across every product page.
- [x] **Structural Bug Fix (`sections/calm-relax.liquid`):** Closing `</div>` for `product__info__wrapper__viewType` was commented out, making `viewArea` a nested child of `viewType`. Restored closing tag — correct DOM structure re-established.
- [x] **Video iframe Overflow (`sections/product-patches.liquid`):** Changed hardcoded `width="560" height="315"` HTML attributes to `width="100%"` (no height attribute). Combined with `aspect-ratio: 16/9; height: unset` in tablet CSS block, iframe now scales responsively.
- [x] **Yotpo Horizontal Scroll Eliminated (769–1024px, all product pages):** Added `@media (min-width: 769px) and (max-width: 1024px)` block to `patches_productpatch.css`:
  - `overflow-x: hidden` on `.product__info__wrapper__viewArea`, `.product__info--sub_box`, `#video`, `.product__info__wrapper`.
  - `overflow-x: visible` on `.commentlist` (prevents inner clipping context that was cutting Yotpo left panel).
  - `max-width: 100%; box-sizing: border-box` on `.yotpo-bottom-line` (no forced `width: 100%` — Yotpo's internal `margin-right: 40px` + centering caused left-shift when width was forced).
- [x] **Yotpo Review Left Panel — `min-width: 200px` Override (769–1024px):** Yotpo's own stylesheet hardcodes `min-width: 200px` on `.yotpo-review-left-panel`, forcing the reviewer name column to be too wide and crowding the review content. Added overrides: `min-width: 0; flex: 0 0 110px; max-width: 110px` on left panel; `flex: 1 1 0; min-width: 0` on center panel; `min-width: 0; flex-shrink: 0` on right panel.
  - Speed Win: Reviewer name, date, and review content now display in correct proportions at tablet — matching desktop layout.
- [x] **Yotpo Date Format — `white-space: nowrap` (769–1024px):** Prevents date from wrapping mid-string.
- [x] **Yotpo Bottom-Line Left-Clip Fix (`padding-left` reduction):** Root cause: `.product__info.cream_prod` had `padding-left: 30px` (from base grid CSS). Yotpo's `yotpo-layout-header-wrapper` centers the `yotpo-bottom-line` which also has Yotpo's internal `margin-right: 40px`. At tablet, the centering math of `width + margin-right` inside the reduced container shifted the bottom-line left, clipping the aggregate score (e.g. "4.8") against the viewArea's `overflow-x: hidden`. Reduced `padding-left` from `30px` → `10px` at tablet.
  - Speed Win: 20px of horizontal real estate recovered for the product info column; Yotpo aggregate score no longer clips.
- [x] **Package Button 3+1 Layout — Tablet (769–1024px, all product pages):** Broadened button wrap rules from `.product__info.cream_prod .product__info__changer` to all `.product__info__changer` elements. Root cause of wrap failure: `flex: 0 0 100%` + `max-width: 136px` is clamped by the CSS flex algorithm to 136px for line-fitting — `max-width` overrides `flex-basis` in the hypothetical main size calculation, so items never wrapped. Fix: `::after` pseudo-element on `.product__info__changer` with `flex-basis: 100%; order: 0; height: 0` acts as an invisible full-width line break. 4th+ buttons get `order: 1` so they always slot after the `::after` separator onto a new row. `margin: 0 auto` centers the 4th button on its own line.
  - Speed Win: 3+1 centered button layout now works at all container widths in the 769–1024px range without needing a specific container width threshold.
- [x] **Package Button Row Excess Space Removed — All Product Pages:** Root cause: inline `<style>` blocks in all 10 product section files and `patches_productpatch.css` had `grid-template-rows: 0 0 auto auto 390px auto auto auto 2fr !important` — the `390px` fixed row was reserving a full 390px even when only 3 buttons occupied ~50px of height. Changed to `auto` in all 10 sections (calm-relax, mobility-chew, product-cream, product-cream-sample, product-immuniz, product-movability, product-pain-roll, product-patches-gold, product-patches, zoomie) and in both `@media` blocks in `patches_productpatch.css`. Row now collapses to content height; adding a 4th button wraps naturally and expands the row.
  - Speed Win: Eliminated ~340px of dead grid whitespace above/below the package buttons on all product pages at tablet+.
- [x] **Sub_box Right Border Restored (1001–1024px) (`assets/patches_productpatch.css`):** Added scoped `@media (min-width: 1001px) and (max-width: 1024px)` block with `.product__info.cream_prod { column-gap: 0 !important }`. Root cause: the 4-column grid (44%+10%+27%+19%=100%) plus 3×10px `column-gap` produced 30px overflow at these widths, pushing `div#product__info--sub_box` off-screen and losing its right border. Setting `column-gap: 0` at this range only restores the border without affecting the 3-column layout at 769–1000px.
  - Speed Win: No layout shift — pixel-perfect fix scoped to the 23px-wide problem range.
- [x] **Tab Row Nowrap — Tablet (769–1024px) (`assets/patches_productpatch.css`):** Added `flex-wrap: nowrap !important; overflow-x: auto !important` to `.product__info__wrapper__viewType` and `font-size: 12.6px !important` to `.product__info__wrapper--active` in the tablet media block. Prevents the "Video" tab from wrapping to a 2nd line at smaller resolutions; text reduced 10% from default.
  - Speed Win: All product info tabs remain on a single scrollable row at all tablet widths.
- [x] **Yotpo Bottom-Line Left-Clip — `star-distribution` + `summary-section` Padding Trim (769–1024px) (`assets/patches_productpatch.css`):** Reduced total `yotpo-bottom-line` child width by tightening: `padding-left: 15px; padding-right: 0` on `.yotpo-star-distribution` and `padding-left: 0; padding-right: 10px` on `.yotpo-summary-section`. Fixes the centering math so the aggregate score (e.g. "4.8") no longer clips left at iPad Pro 1024px. Grey divider line re-centered visually.
  - Speed Win: Yotpo star aggregate now fully visible at all tablet resolutions without breaking Yotpo's dynamically injected layout.
- [x] **Yotpo "Customer Reviews" Headline — Font + Margin Polish (`assets/patches_productpatch.css`):** Added `@media (min-width: 769px)` block: `.yotpo-headline { font-size: 30px !important }` and `.yotpo-head { margin-top: 28px !important; margin-bottom: 22px !important }` (25% reduction from Yotpo defaults). Applies to all tablet and desktop resolutions.
  - Speed Win: Consistent headline sizing and tighter spacing in the reviews section across all non-mobile viewports.
- [x] **Related Products Not Clickable — All Product Pages (`sections/product-recommendations.liquid`, `assets/product.css`):** Root cause: `data-link` + `$('body *').click()` JS handler is fragile — it binds only to DOM elements that exist at script execution time. Since `product-recommendations` renders after each product section's inline script runs, the recommendation `img` elements are not in scope when the handler is bound. Whether clicks work depends on whether a shared ancestor (e.g. `<main>`) happens to have the handler, which varies by page layout — hence calm-relax failed but patches worked. Fix: replaced `<div class="related__product__img related__product__img--active">` with `<a href="{{recom.url}}">` using the same classes. Removed `data-link` attribute from `<img>` and added `alt="{{ recom.title | escape }}"`. Added `text-decoration: none; display: block` to `.related__product__img` in `product.css`. Native `<a>` tag navigation requires zero JS and works unconditionally on all product pages.
- [x] **Metafield-Driven Gallery — pain-relief-cream (`sections/product-cream.liquid`):** Gallery was fully hardcoded with stale CDN URLs — `src`/`data-src` mismatches caused wrong images to load on thumbnail click. Replaced entire gallery block with patches gold-standard pattern: `gallery_images = product.metafields.product.images_set.value`; main image uses first gallery image (fallback `product.featured_image`) with `image_url` filter + srcset (600/900/1200w WebP) + `fetchpriority="high"`; thumbnails loop `gallery_images` with `image_url: width: 100, height: 100, crop: 'center', format: 'webp'` for src and `image_url: width: 1200` for data-src; fallback loops `product.images` if metafield is blank.
  - Speed Win: Images now served via Shopify CDN at correct sizes in WebP format; LCP image prioritized with fetchpriority; thumbnails lazy-loaded; gallery controlled from Shopify Admin without code deploys.
- [x] **`div.product__info-prices` Layout Shift at ≥1245px — pain-relief-cream & pain-relief-cream-sample (`sections/product-cream.liquid`, `sections/product-cream-sample.liquid`):** Root cause: `patches_productpatch.css` overrides `grid-template-rows` to all-`auto` rows only within `(min-width: 636px) and (max-width: 1244px)`. At ≥1245px the override drops, reverting to base `.1fr` fractional rows. Cream/cream-sample had an extra `div.product__info__review.review.onlyDescTop` in grid row 2 that `product-patches.liquid` does not have — at ≥1245px this `.1fr` row with SPR badge content caused a visible layout shift. The SPR `shopify-product-reviews-badge` is irrelevant on cream pages (Yotpo is used via `data-yotpo-instance-id` in `product__info-prices`). Removed the review div from both sections — row 2 is now empty, matching the patches grid structure exactly.
  - Speed Win: Prices section is stable and shift-free at all viewport widths; redundant SPR markup removed from cream and cream-sample pages.
- [x] **`div.product__info-prices` Overlapping `h2.product__info__head` at ≥1245px — pain-relief-cream & pain-relief-cream-sample (`assets/patches_productpatch.css`):** Root cause: `cream.css` sets `.product__info { grid-template-rows: 80px ... }` at `min-width: 1000px` (row 1 = 80px), but `patches_productpatch.css` global `.product__info` rule (loaded after, same specificity 0,1,0) overrides it back to 40px everywhere. The cream_prod override in `patches_productpatch.css` only covered `(min-width: 636px) and (max-width: 1244px)` — at ≥1245px the 80px row 1 dropped and reverted to 40px. The cream title ("Hot + Cool Hemp Relief Cream") wraps to 2 lines at font-size: 34px / line-height: 36px (72px > 40px), visually overflowing row 1 into the prices area. Patches title fits on one line (36px < 40px) — no overflow on patches. Fix: removed `max-width: 1244px` from the cream_prod rows media query in `patches_productpatch.css`, changing `@media (min-width: 636px) and (max-width: 1244px)` to `@media (min-width: 636px)`. Row 1 is now 80px at all widths ≥636px — h2 no longer overflows into the prices area.
  - Speed Win: Zero visual overlap at any desktop/wide viewport width; single character removed from a media query condition — no new rules added.
- [x] **Gallery Size Reduction 25% at 769–1000px — All Product Pages (`assets/product.css`):** Updated existing `@media screen and (min-width: 768px) and (max-width: 1000px)` block (corrected to `min-width: 769px`). Changed `.product__galery__bigImage { width: 80% }` → `width: 60%` (80% × 0.75 = 60%). Added `.product__galery__smallImages { width: 75%; margin: 0 auto }` (100% × 0.75 = 75%). Applies to all product pages via `product.css` — cream pages inherit via same selector.
  - Speed Win: Gallery footprint reduced 25% on tablet landscape viewports; no layout shift since aspect-ratio is preserved by the existing `patches_productpatch.css` `aspect-ratio: 1/1` rule on the container.
- [x] **Header Help Text — 2-Line Max on Mobile (`assets/newstyle.css`):** Inside `@media screen and (max-width: 670px)`: reduced `.header_info__text { font-size }` from `16px` → `11px`; added `.site_nav_sticky .item_menu:last-child { padding-left: 0 }` (specificity 0,2,1 overrides inline header style's 0,2,0). At 320px (narrowest real phone): text area = 102px; "Need Help? Call or" (91px) fits line 1, "Text (970) 718-2801" (94px) fits line 2 — guaranteed 2 lines with no HTML change. No `!important` required.
  - Speed Win: Zero 3-line wrapping from 305px–670px; no markup changes; mobile-only via media query.
- [x] **Homepage Product Card Equal Sizing at ≥768px (`assets/theme.css`):** Root cause: `.main__products__center` is `display: flex; flex-wrap: wrap` with no explicit `width` on `.main__products__item` — each card sized to its own image/title content, causing unequal card widths. The pain-relief-patches card is the largest, hitting the `max-width: 260px` cap on `main__products__item-img`. Fix: added `width: 260px` to the global `.main__products__center .main__products__item` rule. Total box = 260px content + 35px × 2 padding = 330px. The existing `@media (max-width: 767px)` rule's `width: 45%` has equal specificity and loads after → overrides at mobile. Row-mate items already equalize in height via `align-items: stretch` (flex default).
  - Speed Win: One property added; all product cards are now uniform 330px wide at ≥768px with no layout change at mobile.
- [x] **Homepage Product Card Image Overflow Fix — All Resolutions (`assets/main.css.liquid`, `assets/main.css`, `assets/theme.css`):** Root cause: Shopify compiles and serves `main.css.liquid`, not `main.css` — prior fix applied to `main.css` had no effect. `main.css.liquid` retained `.main__products__item-img { max-width: 260px }` — a fixed pixel value equal to the content-box, causing overflow from intrinsic-size variance and fully breaking mobile after the `theme.css` `max-width: 100%` override was removed as "redundant." Fixed in `main.css.liquid` and synced to `main.css`: `max-width: 100%; height: auto; display: block; margin: 0 auto`. Image is now always bounded by the parent 260px content-box at all resolutions; `display: block` removes descender gap; `margin: 0 auto` centers smaller images.
  - Speed Win: Overflow eliminated at all resolutions by fixing the actual compiled file Shopify serves; mobile coverage restored.

- [x] **Homepage Product Name — Removed Bold + Bottom Margin (`assets/main.css`, `assets/main.css.liquid`, `assets/theme.css`):** Removed `font-weight: 900` and `margin-bottom: 20px` from global `.main__products__item-text` rule in `main.css` + `main.css.liquid`. Removed `margin-bottom: 26px` media query override in `theme.css` and deleted the resulting empty rule block. Product names on the homepage are now normal weight with no bottom margin at all resolutions.
- [x] **Hardcoded Price Placeholder — pain-relief-cream-sample (`sections/product-cream-sample.liquid`):** Changed `<span class="current_price">$39.73</span>` → `$12.95`. This is the pre-JS placeholder; the runtime price is still driven by `_prod_array_base[0].price` from `collections["sample"]`.
- [x] **`percentDiscount` Metafield Sync — pain-relief-cream-sample (`sections/product-cream-sample.liquid`):** Root cause: cream-sample had `const percentDiscount = [15,43,49]` — a hardcoded JS array — while patches reads the same value from `product.metafields.discount.discount`. The hardcoded values are static and decouple from Shopify Admin; any discount change requires a code deploy. Fix: replaced with `const percentDiscount = {{product.metafields.discount.discount}}`, matching patches exactly. Also removed: 2x `console.log` debug statements, `<!-- qwer -->` orphan comment, `<!-- price_details -->` commented-out HTML in two locations, dead `.price_details` JS calls targeting the now-removed element, orphaned Omnisend `{% comment %}` block, and 2x structural `<!-- product selection -->` label comments.
  - Speed Win: Discount percentages now live in Shopify Admin; all comments and dead code purged — zero NO COMMENTS violations remain.
- [x] **Homepage Product Card Yotpo Star Ratings (`sections/main__products.liquid`):** Root cause: `.stars` div contained `<span class="shopify-product-reviews-badge">` — SPR widget format. SPR is not installed; Yotpo is. Span never rendered. Replaced with `yotpo-widget-instance` div using `data-yotpo-instance-id="1267418"` (star ratings widget, same as all product pages) with full per-product data attributes sourced from `block.settings.product` in the Liquid loop. Yotpo's app embed JS is injected globally by Shopify and initializes any `yotpo-widget-instance` elements it finds, including on the homepage. Also removed HTML comment on line 2, JS comment on line 20, and `console.log(button)` debug statement.
  - Speed Win: Aggregate star scores now visible on all homepage product cards; dead SPR markup eliminated.

- [x] **Gallery Thumbnail Stretch Fix — All Product Pages (`assets/product.css`, 6 section files):** Root cause: `.product__galery__smallImages_image` had `width: 100%; max-width: 126px` but no `height`, `aspect-ratio`, or `object-fit` above 768px. `object-fit: cover` only existed in the mobile (≤768px) flex block. Sections using deprecated `img_url: 'small'` (no crop) served non-square images; the browser forced them into a 1:1 display box defined by HTML `width="100" height="100"` → visible stretching. Patches worked because `image_url: width: 100, height: 100, crop: 'center'` serves a true square image. Two-part fix: (1) Added `aspect-ratio: 1/1; object-fit: cover` to global `.product__galery__smallImages_image` in `product.css` — enforces square crop display on all pages at all resolutions above 768px. (2) Updated thumbnail `src` and `data-src` in 6 sections from deprecated `img_url` (no crop) to `image_url: width: 100, height: 100, crop: 'center', format: 'webp'` (src) and `image_url: width: 1200, format: 'webp'` (data-src): `calm-relax.liquid`, `mobility-chew.liquid`, `product-pain-roll.liquid`, `zoomie.liquid`, `product-patches-gold.liquid`, `product-cream-sample.liquid`.
  - Speed Win: Shopify now delivers pre-cropped square WebP thumbnails instead of proportional images; eliminates both visual distortion and browser-side stretch; deprecated filter calls removed from 6 files.

- [x] **`h2.product__info__head` Overlap Fix at ≤1000px — All Product Pages (`assets/product.css`):** Root cause: `h2.product__info__head.onlyDescTop` sits in row 1 of `.product__info` CSS grid. At ≤1000px, the inline `<style>` in every section sets that row to `0px` height. No `display: none` existed on `onlyDescTop`, so with `overflow: visible` the 34px h2 text bled into row 2 (prices) → visible overlap on all product pages. Compounding bug: `@media (max-width: 1000px) .notDescTop { display: none }` was incorrect — the `.notDescTop` backup title (inside `.product__galery`) was hidden at BOTH desktop AND mobile, leaving no title at all at ≤1000px. Three CSS changes to `product.css`: (1) Fixed `@media (max-width: 1000px) .notDescTop { display: block }` — restores the gallery-level h2. (2) Added `order: 1` to `.notDescTop` at ≤1000px — pushes it after `.product__galery__bigImage` and `.product__galery__smallImages` (both default `order: 0`), placing the title below the thumbnails. (3) Added `display: flex; flex-direction: column` to `.product__galery` at ≤1000px — enables `order` to work. (4) Added `display: none` to `.product__info__head.onlyDescTop` at ≤1000px — eliminates the overflow. Zero HTML changes across any section files.
  - Speed Win: Title now renders cleanly between gallery thumbnails and prices section on all product pages at tablet/mobile; overlap fully eliminated.

## Completed Tasks
*None. Ready for Phase 1 Audit.*