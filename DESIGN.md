---
name: Neutral Premium
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  h1-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 1.5rem
  margin-page: 2rem
  section-gap: 3rem
  component-padding: 1.25rem
  stack-sm: 0.5rem
  stack-md: 1rem
---

## Brand & Style
This design system is engineered for high-performance e-commerce management, prioritizing clarity, speed, and a premium aesthetic. The brand personality is "Silent Sophistication"—it steps back to let the merchant's product data and analytics take center stage. 

The style utilizes a **Minimalist-Modern** hybrid approach. It leverages heavy whitespace and a strictly neutral foundation to reduce cognitive load, while employing "micro-luxuries" like ultra-soft shadows and high-precision typography to signal quality. The goal is to evoke a sense of calm control and institutional reliability, ensuring that even complex inventory or logistics data feels manageable and elegant.

## Colors
The palette is rooted in a meticulously calibrated range of neutral grays. In **Light Mode**, the interface uses a pristine white background with subtle "Slate" surfaces to define hierarchy. In **Dark Mode**, it shifts to a deep "Midnight Blue-Gray" to maintain depth and readability without pure black fatigue.

- **Primary:** Used for high-level branding and primary navigation elements.
- **Accent:** A vibrant, accessible blue reserved exclusively for call-to-action buttons, active states, and critical interactive indicators.
- **Neutrals:** A scale from Slate-50 to Slate-950 handles all structural borders, secondary text, and background layering.
- **Semantic:** Success (Emerald), Destructive (Rose), and Warning (Amber) are used sparingly and desaturated to fit the premium aesthetic.

## Typography
Inter is the sole typeface, utilized for its exceptional legibility in data-dense environments. The type scale relies on weight and subtle tracking adjustments rather than drastic size changes to establish hierarchy.

- **Headlines:** Use semi-bold weights with slight negative letter-spacing to create a "compact" premium feel.
- **Body:** Standardized at 16px for optimal long-form reading, with 14px used for secondary dashboard metadata.
- **Labels:** Uppercase is avoided except for very small status tags; instead, medium weights are used to differentiate labels from input text.

## Layout & Spacing
The system follows a **12-column fixed-fluid hybrid grid**. On desktop, content is centered within a 1440px container. On smaller viewports, it transitions to a fluid model with 24px side margins.

A "Generous Hierarchy" principle is applied: vertical spacing between unrelated sections is large (48px+), while related data points within cards are grouped tightly (8px - 12px). This creates "islands of information" that prevent the dashboard from feeling cluttered despite high data density. Use 16px as the base unit for most layout increments.

## Elevation & Depth
Depth is communicated through **Ambient Shadows** and **Tonal Layering**. Surfaces do not "float" aggressively; they sit closely to the background to maintain a grounded, professional feel.

- **Level 0 (Background):** Base page color.
- **Level 1 (Cards/Sheets):** White (Light) or Slate-900 (Dark) with a 1px border and a very soft, multi-layered shadow (0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)).
- **Level 2 (Dropdowns/Modals):** Increased shadow spread and a slightly more prominent border to indicate temporary overlay.
- **Transitions:** Hovering over cards should trigger a subtle lift—achieved by increasing the shadow blur and a minute Y-axis shift (2px), paired with a 200ms ease-out curve.

## Shapes
The geometry is defined by "Rounded-XL" containers. A base radius of 12px (0.75rem) is used for standard components like input fields and buttons, while large layout containers and dashboard cards use 16px (1rem). 

This soft rounding offsets the clinical nature of the neutral palette, making the software feel approachable and modern. Interactive elements like checkboxes and radio buttons maintain a smaller 4px radius to feel precise.

## Components
- **Buttons:** Primary buttons use the Accent Blue with white text. Secondary buttons use a transparent background with a subtle border. All buttons have a minimum height of 40px for touch targets.
- **Cards:** The workhorse of the dashboard. They must include a consistent 20px internal padding. Footers within cards should have a subtle top border and a slightly different background hue.
- **Input Fields:** Use a subtle Slate-100 fill in Light mode that clears to white on focus. The focus state is a 2px ring of the Accent Blue with a 2px offset.
- **Skeletons:** Avoid flat gray blocks. Use a linear gradient shimmer that moves from left to right, utilizing the `surface` and `border` colors to create a "ghost" of the actual UI structure.
- **Status Chips:** Use "Pill" shapes with low-opacity background tints of the semantic colors (e.g., 10% green background with 100% green text) for a soft, premium look.
- **Data Tables:** Row hover states are essential. Use a very pale neutral tint instead of a border to highlight the active row.