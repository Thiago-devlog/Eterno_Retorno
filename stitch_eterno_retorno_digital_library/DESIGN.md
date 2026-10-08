---
name: Eterno Retorno
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#45464d'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#885125'
  on-secondary: '#ffffff'
  secondary-container: '#ffb782'
  on-secondary-container: '#79461a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#321300'
  on-tertiary-container: '#b87348'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#ffb782'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#6b3a0f'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68b'
  on-tertiary-fixed: '#321300'
  on-tertiary-fixed-variant: '#6e3812'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
  title-md:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Merriweather
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 32px
  body-md:
    fontFamily: Merriweather
    fontSize: 15px
    fontWeight: '300'
    lineHeight: 26px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  margin-tablet: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the tactile elegance of rare book archives, high-end editorial curation, and nineteenth-century Brazilian literary mastery (from Machado de Assis to Clarice Lispector). It bridges classical typographic tradition with contemporary digital restraint.

The design movement combines **Minimalism** with **Tactile Editorial Craft**: generous breathing room, layered paper tones, subtle physical bookbindery cues, fine hairline rules, and archival warmth. 

The emotional response evoked is contemplative, intellectually reverent, and calm. Readers interact not with a fleeting utility app, but with an enduring sanctuary of letters. Visual weight relies strictly on serif proportion, precise baseline rhythm, and warm tactile contrast rather than intrusive graphical ornaments.

## Colors

The palette reproduces the chromatic chemistry of vintage rag paper, deep printer's ink, and hand-bound leather foil accents:

- **Surface & Canvas (`#FDFBF7`)**: A warm, luminous rag-paper off-white designed to reduce eye strain over prolonged reading sessions while retaining archival authenticity.
- **Ink & Core Typography (`#0F172A`)**: A rich slate charcoal replacing sterile pure blacks. It delivers crisp contrast with a velvety, ink-pressed quality.
- **Terracotta Accent (`#C28251`)**: Used for primary action indicators, active reading milestones, progress fills, and selected states.
- **Deep Terracotta / Umber (`#9A5B32`)**: Used for focus rings, hover transitions, author taglines, and archival seal markers.

Subordinate surfaces rely on natural warm shifts: pure parchment white (`#FFFFFF`) for elevated cards, muted vellum (`#F4EFE6`) for sidebars and container backgrounds, and delicate stone ink (`#475569`) for metadata and catalog citations.

## Typography

The typographic hierarchy establishes clear structural distinctions between three operational layers:

1. **Editorial & Display (`Playfair Display`)**: Governs primary book titles, edition headings, canonical author names, and introductory quotes. Characterized by transitional serifs and generous proportions.
2. **Literary Immersion (`Merriweather`)**: Reserved for narrative reading viewports, excerpts, editorial reviews, and chapter openings. The wide x-height and sturdy serifs guarantee fluid legibility across varied display densities.
3. **App Architecture & Controls (`Plus Jakarta Sans`)**: Delivers high-clarity navigation, search filters, pagination stats, reading time meters, buttons, and archival metadata tags.

`label-caps` must always be rendered in full uppercase with expanded letter-spacing to emulate archival catalogue classification stamps.

## Layout & Spacing

This design system uses a 12-column responsive fluid grid on desktop viewports, condensing to 8 columns on tablet and 4 columns on mobile. 

The layout philosophy emphasizes generous, asymmetric whitespace reminiscent of wide-margin letterpress editions:
- **Desktop (>= 1024px)**: Fixed max-width container at `1280px` for discovery grids, with reading passages constrained strictly to an optimal reading column between `640px` and `720px` to maintain 65–75 characters per line. Outer canvas margin is `margin` (`3rem`).
- **Tablet (768px – 1023px)**: Margins scale down to `margin-tablet` (`2rem`) with a `1.25rem` column gutter. Side navigation docks switch into persistent slide-out drawers.
- **Mobile (< 768px)**: Canvas margins adjust to `margin-mobile` (`1.25rem`) with compact `gutter-mobile` (`1rem`). Reader views transition to full edge-to-edge layouts with dedicated top/bottom safe areas.

## Elevation & Depth

Visual hierarchy abandons artificial high-contrast drops and neon glows in favor of **Tonal Layers** paired with soft, **Ambient Diffused Shadows** inspired by physical paper stock:

- **Level 0 (Base Canvas)**: Raw unbleached surface (`#FDFBF7`).
- **Level 1 (Paper Folio / Cards)**: Pure warm white (`#FFFFFF`) with a subtle hairline edge (`1px solid rgba(15, 23, 42, 0.06)`) and an ultra-soft amber-tinted shadow: `0 2px 10px -2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(194, 130, 81, 0.06)`.
- **Level 2 (Active Book Cover / Floating Controls)**: Raised elevation simulating physical open books, using `0 12px 32px -6px rgba(15, 23, 42, 0.10), 0 4px 12px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals / Archival Overlays)**: Centered display surfaces layered over a dim scrim (`rgba(15, 23, 42, 0.45)` with `4px` blur), framed by a fine border (`1px solid rgba(194, 130, 81, 0.20)`).

## Shapes

The design system maintains a **Soft** geometry (`roundedness: 1`), honoring the structured edges of book cloth, binding spines, and classical stationery:

- Standard controls, inputs, and list modules utilize `0.25rem` (4px) corner radii.
- Book spine containers, cards, and modal sheets scale to `rounded-lg` (`0.5rem` / 8px).
- Archival stamp badges and author portrait frames may use circular cutouts (`rounded-full`), evoking ex-libris wax seals and cameo medallions.

## Components

### Buttons
- **Primary**: Slate ink background (`#0F172A`), off-white label (`#FDFBF7`), subtle `0.25rem` radius, hover state shifts subtly with a terracotta glow (`box-shadow: 0 4px 14px rgba(194, 130, 81, 0.25)`).
- **Secondary / Archival**: Transparent background with a `1px` border in slate charcoal (`#0F172A`), active states transition to terracotta border and text (`#C28251`).
- **Ghost**: Unbordered text button with `label-lg` typography and an underline that animates from the left upon hover.

### Inputs & Search
- Field backgrounds use parchment tone (`#FFFFFF`) with a hairline border (`rgba(15, 23, 42, 0.12)`).
- Focus states apply a crisp terracotta outline (`#C28251`) without heavy halo spreads.
- Placeholders use italicized `Playfair Display` or muted `Plus Jakarta Sans` (`#64748B`).

### Cards & Book Presentation
- **Edition Card**: Features standard book aspect ratios (2:3) with a spine shadow gradient on the left edge (`inset 4px 0 6px -2px rgba(0,0,0,0.2)`).
- Below the cover: Title set in `title-md`, author formatted in `label-md` uppercase muted slate, and year or genre rendered as a subtle metadata chip.

### Chips & Archival Badges
- Compact capsules with `space-xs` vertical and `space-sm` horizontal padding.
- Bordered in `1px solid rgba(194, 130, 81, 0.3)` with muted umber typography (`#9A5B32`).

### Reading Progress & Quotation Blocks
- **Blockquote**: Inset margin with a `2px` solid terracotta left accent rule, set in `body-lg` italic serif.
- **Reading Progress**: Ultra-thin 2px track in warm gray (`#E2DCD5`), filled with rich terracotta (`#C28251`).