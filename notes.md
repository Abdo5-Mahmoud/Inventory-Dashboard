# Design System Gap Analysis & Implementation Plan

## The Goal

Bring the existing Next.js dashboard into full compliance with the **"Neutral Premium"** design system defined in `DESIGN.md`.

---

## Gap Analysis: DESIGN.md vs. Current Codebase

### 🎨 Colors — **CRITICAL MISMATCH**

| Design Spec                                          | Current Code                                        | Status     |
| ---------------------------------------------------- | --------------------------------------------------- | ---------- |
| Surface: `#fcf8fa` (warm off-white)                  | `oklch(1 0 0)` (pure white)                         | ❌ Wrong   |
| On-surface: `#1b1b1d` (near-black)                   | `oklch(0.145 0 0)` (near-black)                     | ✅ Close   |
| Accent Blue (for CTAs, active states)                | No blue accent defined — sidebar uses `bg-gray-300` | ❌ Missing |
| Semantic: Emerald success, Rose error, Amber warning | No semantic colors defined                          | ❌ Missing |
| Secondary container: `#d0e1fb` (soft blue)           | Not present                                         | ❌ Missing |
| Dark mode: Deep Midnight Blue-Gray                   | `oklch(0.145 0 0)` (pure dark, not blue-gray)       | ❌ Wrong   |

**`globals.css` uses a completely grayscale OKLCH palette — the DESIGN.md warm neutrals and accent blue are entirely absent.**

---

### 🔤 Typography — **CRITICAL MISMATCH**

| Design Spec                           | Current Code                | Status        |
| ------------------------------------- | --------------------------- | ------------- |
| Font: **Inter** (sole typeface)       | **Geist Sans + Geist Mono** | ❌ Wrong font |
| H1: 30px, semi-bold, -0.02em tracking | Not defined in globals      | ❌ Missing    |
| H2: 24px, semi-bold, -0.01em tracking | Not defined                 | ❌ Missing    |
| Body-md: 16px, 400, 24px line-height  | Browser default             | ❌ Missing    |
| Label: 14px, 500 weight               | Not defined                 | ❌ Missing    |

---

### 📐 Layout & Spacing — **PARTIAL MISMATCH**

| Design Spec                | Current Code                        | Status     |
| -------------------------- | ----------------------------------- | ---------- |
| 1440px max container       | No max-width set                    | ❌ Missing |
| 24px gutters (1.5rem)      | Sidebar: `p-2`, Content: no padding | ❌ Wrong   |
| 20px card internal padding | `w-52` cards with ad-hoc padding    | ❌ Wrong   |
| Section gap 48px+          | Not systematized                    | ❌ Missing |

---

### 🎴 Cards — **CRITICAL MISMATCH**

| Design Spec                                      | Current Code                             | Status     |
| ------------------------------------------------ | ---------------------------------------- | ---------- |
| White bg, 1px border, soft multi-layer shadow    | shadcn `Card` with default styles        | ⚠️ Partial |
| 20px (1.25rem) internal padding                  | Inconsistent ad-hoc padding              | ❌ Wrong   |
| 16px (1rem) border-radius                        | `rounded-md` (~0.375rem)                 | ❌ Wrong   |
| Hover: shadow lift + 2px Y shift, 200ms ease-out | `hover:shadow-lg hover:-translate-y-0.5` | ⚠️ Partial |
| Footer: subtle top border + different hue        | Not implemented                          | ❌ Missing |

---

### 🔘 Buttons — **MISMATCH**

| Design Spec                               | Current Code                                       | Status     |
| ----------------------------------------- | -------------------------------------------------- | ---------- |
| Primary: Accent Blue bg, white text       | ShoppingCart icon: `bg-[#bccee6]` (pale blue-gray) | ❌ Wrong   |
| Secondary: transparent bg + subtle border | Not implemented                                    | ❌ Missing |
| Min height 40px                           | No height constraint                               | ❌ Missing |
| 12px border-radius                        | Not applied                                        | ❌ Missing |

---

### 💀 Skeletons — **MISMATCH**

| Design Spec                                       | Current Code                       | Status   |
| ------------------------------------------------- | ---------------------------------- | -------- |
| Linear gradient shimmer (L→R), ghost of actual UI | Flat `bg-gray-200` pulse animation | ❌ Wrong |
| Matches actual card layout                        | Different layout from product grid | ❌ Wrong |

---

### 🧭 Sidebar — **MISMATCH**

| Design Spec                              | Current Code                                    | Status   |
| ---------------------------------------- | ----------------------------------------------- | -------- |
| Premium dark sidebar with tonal layering | `bg-gray-100 border-gray-300` (flat light gray) | ❌ Wrong |
| Accent Blue for active state             | `bg-gray-300` for active                        | ❌ Wrong |
| Inter font, label-md (14px, 500)         | Default Geist                                   | ❌ Wrong |

---

### 🏷️ Status Chips — **MISSING**

No status chips exist. Products have an `availabilityStatus` field but it's shown as plain text or hidden.

---

## Open Questions

> [!IMPORTANT]
> **Dark Mode strategy:** The DESIGN.md dark mode uses a "Midnight Blue-Gray" (not pure black). Should we implement a full dark mode toggle, or focus on light mode first and add dark later?

> [!IMPORTANT]
> **Accent Blue:** DESIGN.md says "vibrant, accessible blue" but doesn't give a specific hex. The `secondary-container: #d0e1fb` and `secondary: #505f76` suggest a cool blue. Should we use `#2563EB` (Tailwind Blue-600) as the CTA accent?

---

## Proposed Changes

### 1. Design Tokens — `globals.css`

**[MODIFY]** [globals.css](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/app/globals.css)

- Replace Geist font references with **Inter** from Google Fonts
- Replace all OKLCH grayscale colors with the exact DESIGN.md hex values:
  - `--background: #fcf8fa`, `--surface: #f6f3f5`, etc.
  - `--accent-blue: #2563EB` for CTAs
  - Dark mode: blue-gray midnight palette
- Add CSS custom properties for all DESIGN.md tokens (spacing, radius, shadows)
- Add shimmer keyframe animation for skeletons

---

### 2. Font — `layout.tsx`

**[MODIFY]** [layout.tsx](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/app/layout.tsx)

- Replace `Geist`/`Geist_Mono` with **Inter** from `next/font/google`

---

### 3. Sidebar — `Sidebar.tsx`

**[MODIFY]** [Sidebar.tsx](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/components/Sidebar.tsx)

- Change from flat light gray to a premium sidebar:
  - Light mode: `surface-container-low` bg (#f6f3f5), subtle right border
  - Active item: Accent Blue background pill, white icon + text
  - Hover: soft tinted background
  - Add brand logo/name at the top
  - Fixed width of `240px` (not `w-[20%]`)
  - Label-md typography (14px, 500 weight)

---

### 4. Product Cards — `ProductsClient.tsx`

**[MODIFY]** [ProductsClient.tsx](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/features/products/components/ProductsClient.tsx)

- Fix grid layout: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` with consistent `gap-5`
- Cards: 16px radius, 20px padding, 1px border + multi-layer ambient shadow
- Hover: `translateY(-2px)` + increased shadow, `200ms ease-out`
- Primary CTA button: Accent Blue bg, white text, min-h-40px, 12px radius
- `availabilityStatus` → Status Chip (pill, semantic color tint)
- `isFetching` → `opacity-50` transition on grid, no inline text
- Remove broken grid class (missing `lg:grid-cols-` number)

---

### 5. Skeleton — `ProductCardSkeleton.tsx`

**[MODIFY]** [ProductCardSkeleton.tsx](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/features/products/components/ProductCardSkeleton.tsx)

- Replace flat gray blocks with **shimmer gradient** animation
- Match exact card structure: image placeholder → category/rating row → title → price/CTA footer
- Match grid container layout exactly

---

### 6. Pagination — `PaginationUi.tsx`

**[MODIFY]** [PaginationUi.tsx](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/components/pagination/PaginationUi.tsx)

- Replace plain text links with proper Button components
- Use Accent Blue for active page indicator
- Secondary button style (border, transparent bg)
- ARIA labels for accessibility
- Min height 40px

---

### 7. Home Page — `page.tsx`

**[MODIFY]** [page.tsx](file:///c:/Users/A5/Desktop/Apps-Programming/dashboard/app/page.tsx)

- Build a proper Dashboard Overview with:
  - KPI cards (Total Products, Categories, Avg Price, Avg Rating)
  - Uses real data from dummyjson API

---

## Verification Plan

### Automated

- `npm run build` — ensure no TypeScript errors after changes

### Visual Checks

- Sidebar: Inter font, correct active/hover states, accent blue
- Product cards: correct padding (20px), radius (16px), shadow, hover lift
- Skeletons: shimmer animation, matches card structure
- Color: warm off-white background (#fcf8fa), not pure white
- Buttons: Accent Blue CTAs, 40px height

---

## Implementation Order

1. `globals.css` — design tokens, Inter font, shimmer animation
2. `layout.tsx` — swap to Inter font
3. `Sidebar.tsx` — full redesign
4. `ProductCardSkeleton.tsx` — shimmer skeleton matching card
5. `ProductsClient.tsx` — card redesign + grid fix + status chips
6. `PaginationUi.tsx` — styled buttons + ARIA
7. `app/page.tsx` — dashboard home with KPI cards
