# Executive Summary

## Scope and evidence

Audit date: 2026-07-17. This is a static production-performance audit of the
current workspace, following `.agents/skills/Performance-Production-Auditor.md`.
It covered `app/`, `features/`, `components/`, `hooks/`, `lib/`, `layouts/`,
service modules, configuration, and installed top-level packages.

No Lighthouse HTML/JSON report, Chrome performance trace, or bundle-analyzer
output is present. `.lighthouseci/` contains only a Chrome-flags file, and
`.next/` contains development artifacts rather than a production build. As a
result, this report does **not** state Lighthouse, LCP, INP, CLS, TBT, transfer,
or bundle-size measurements as facts. Scores are code-readiness assessments,
not measured field or lab scores. The configured routes are `/`, `/inventory`,
`/orders`, and `/login` in `lighthouserc.json`.

## Performance Score

**5.4 / 10 — conditional code-readiness score; not a Lighthouse score.**

The application has a sound App Router foundation, uses `next/font`, has
server-rendered pages, explicit image dimensions in most product imagery, and
one correct server-to-client React Query hydration path on inventory. Its
largest production risks are repeated dashboard data loading across server and
client boundaries, development tooling rendered in production paths, an
unnecessary eager-image rule, and incomplete route-level loading coverage.

## Core Web Vitals Readiness

**5 / 10.** No actual Core Web Vitals can be identified without a trace or
Lighthouse result. The dashboard header is likely to appear before streamed
metric data, but the eventual largest visible element may be a metric/card,
chart, or product image depending on viewport and route. The dashboard chart
is explicitly client-only and downloads Recharts before it can render. The
inventory cards incorrectly make later images eager/high-priority.

## Production Readiness

**4 / 10.** Error and not-found boundaries exist, inventory has a route
loading UI, and images have allowed remote hosts. However, `npm run lint`
fails (three errors), dashboard/orders/settings lack equivalent route loading
boundaries, production code mounts React Query Devtools and Recharts Devtools,
and the intended auth proxy is not an active `proxy.ts` file. The latter is
primarily a security/reliability concern, but it should be fixed before a
production release.

## Estimated User Experience

On a warm, low-latency connection the dashboard should feel usable after
client hydration. On constrained devices or a slow DummyJSON response, users
will see metric/chart/widget skeletons and then repeat requests for data that
the server has already fetched. The chart is likely the most visibly delayed
interactive area. Actual timing must be measured in a production build.

---

# Detailed Scores

| Area | Score | Evidence and production interpretation |
| --- | ---: | --- |
| Core Web Vitals | 5/10 | No measured CWV evidence. Streaming is used for dashboard metrics, but client-only chart rendering and duplicated data loading threaten render/hydration delay. |
| Next.js Performance | 6/10 | App Router, route groups, `next/font`, server components, `next/image`, and one `dynamic(..., { ssr: false })` boundary are present. Several fetches are uncached by default in Next 16 and loading boundaries are incomplete. |
| React Performance | 6/10 | State is mostly local and analytics calculations use `useMemo`. The main concern is data ownership, not missing blanket memoization. |
| Bundle Optimization | 4/10 | Recharts is isolated with a dynamic import, but its devtools and React Query Devtools are rendered on production routes. No production bundle report exists to quantify bytes. |
| Images | 6/10 | Most product imagery uses `next/image` with dimensions and remote patterns. The inventory list eagerly prioritizes images after the first four, reversing desired loading priority; one widget uses raw `<img>`. |
| Network | 4/10 | `/` and `/orders` issue server fetches for data subsequently fetched again by client React Query. Products explicitly revalidate for 300 seconds; carts/categories/user/profile/search fetches lack an explicit shared server-cache policy. |
| Accessibility | 5/10 | Radix AlertDialog is sound, but custom search modal/dropdown triggers are divs and do not implement complete dialog/menu semantics or focus return. This can make core navigation/actions inaccessible. |
| Production | 4/10 | Root `error.tsx` and `not-found.tsx` exist. Lint currently fails; only inventory has `loading.tsx`; settings form logs rather than persists; proxy implementation is stored in an inactive text file. |

## Core Web Vitals assessment

### LCP — not measured

**Candidate elements, not an actual LCP claim:** the overview heading,
metric-card group, chart container, or the first inventory product image. The
dashboard metric group is a server async component within `Suspense` in
`app/(dashboard)/page.tsx`; the heading can stream first, while metrics wait
for the three requests in `components/MatricCards.tsx`. The chart uses
`next/dynamic` with `ssr: false` in
`features/dashboard/Components/DashboardChart.client.tsx`, so it cannot
contribute meaningful server-rendered chart content.

The only code-verified blockers are external API response time for uncached
fetches and client download/hydration for the chart. Determine the actual LCP
element and its phases (TTFB, resource load delay/duration, element render
delay) with a production Lighthouse trace before assigning millisecond goals.

### INP — not measured

Likely interaction hot spots are chart filter changes, global search input,
modal/dropdown opening, and product-list navigation. The chart filters
recalculate analytics from all fetched carts/products, but their current data
set is small and no trace demonstrates a long task. The stronger verified
issue is `SearchComponent`: each keystroke calls `router.replace` with the
previous debounced value, potentially adding route work while the user types.
Measure interaction latency before optimizing chart memoization or adding
`React.memo`.

### TBT — not measured

Recharts, `@recharts/devtools`, React Query Devtools, Radix UI, Toastify,
React Hook Form/Zod, and Lucide are client dependencies. The chart is split
into a dynamic client chunk, which protects initial server rendering, but
`RechartsDevtools` is still rendered inside that production chart and
`ReactQueryDevtools` is rendered by the dashboard provider. No production
chunk manifest or analyzer is available, so their byte and TBT contribution is
unknown. They are still unnecessary runtime work in a production route.

### CLS — not measured

`next/font` with `display: "swap"` and explicit image dimensions reduce two
common shift sources. However, dashboard metric skeleton geometry does not
match the four-card grid generated by `MatricCards`, and chart/widget content
appears after client data/hydration. These are plausible layout-shift risks;
only a trace can determine whether they affect CLS.

## Next.js rendering and cache assessment

- The root layout is a server component using `next/font`; dashboard layout
  adds client providers only below the dashboard shell. This is a good client
  boundary placement.
- `app/(dashboard)/inventory/page.tsx` prefetches the exact product-list query
  then uses `HydrationBoundary`. This is the best existing pattern and avoids
  a matching client refetch for that list.
- The overview and order pages do not dehydrate their server-fetched metrics
  into React Query. `MatricCards` loads products/carts/categories on the
  server, then `DashboardWidgets`, `Chart`, and `OrdersClient` request
  products/carts again on the client. React Query can deduplicate the two
  client consumers, but it cannot reuse the unhydrated server result.
- In Next 16, fetch requests are not cached by default. Only `getProducts`
  opts into `next: { revalidate: 300 }`; `getAllCarts`, category list, product
  details, cart details, user details, and search do not define an explicit
  server cache/revalidation contract. Identical fetches may be memoized during
  one server render, but this does not solve server-to-client duplication or
  cross-request caching.
- Dashboard/order/settings route segments lack `loading.tsx`. Inventory has a
  route-level spinner, while the overview uses component `Suspense` only for
  metrics. The dashboard layout awaits `cookies()` through `Navbar`, which can
  delay navigations at that layout segment.
- Metadata is minimal but valid. No static OG/image concern was found in the
  performance scope.

## React, bundle, image, network, and accessibility assessment

- The existing `useMemo` calls around product analytics are proportionate.
  There is no code evidence that general-purpose `React.memo`, additional
  `useMemo`, or additional `useCallback` would improve user timing.
- `CardComponent` uses `useMemo` for a tiny stock-status conditional; that is
  not a meaningful performance win, but it is not a priority issue.
- `CardComponent` sets `fetchPriority="high"` and `loading="eager"` when
  `index > 3`. This eagerly requests most below-the-fold images and competes
  with content that matters first. The first visible image(s), if any, are the
  candidates for priority—not later cards.
- `DashboardWidgets` uses a raw `<img>` and links to `/products/:id`, although
  implemented product detail routes are `/inventory/:id`. The route mismatch
  is functional; raw image loading forfeits Next image optimization.
- Detail-page hero image is lazy despite being likely visible above the fold.
  Do not make it priority by default; first verify the actual LCP element on
  that route. If it is LCP, priority and accurate `sizes` are appropriate.
- The custom compound modal and dropdown use non-native trigger elements.
  This is a production accessibility issue because keyboard/focus semantics
  affect the search and account controls, not a cosmetic concern.

---

# Highest Impact Findings

## 1. Dashboard and order pages load the same data on the server and again in the browser

**Issue**

The overview and order experiences duplicate products/carts transfers and
parsing across the server-rendered metric cards and client React Query widgets.

**Evidence**

`components/MatricCards.tsx` calls `getProducts`, `getAllCarts`, and
`getCategoriesList` on the server. `DashboardWidgets.tsx` and `Chart.tsx` each
call `useOrders()` and `useProducts({ limit: 0 })`; `OrdersClient.tsx` calls
`useOrders()` after the orders page renders `MatricCards`. Unlike inventory,
these routes have no `HydrationBoundary` with matching dehydrated queries.

**Root Cause**

The application mixes server-owned metric data with client-owned dashboard
data without a single route data model or hydration bridge.

**Why users notice it**

Users receive content that has already waited for an API request, then wait
again for browser requests before widgets, chart, or order table become
useful. It adds network contention and can prolong data-complete time on slow
devices/connections.

**Recommended Fix**

Choose one per route: (a) fetch once in the server page and dehydrate the
matching React Query keys used by client widgets, or (b) keep metrics/widgets
client-owned and stop server-fetching their duplicate inputs. Prefer (a) for
the dashboard: start products/carts/categories concurrently, render metrics
from the resolved data, hydrate products/carts, and pass only the necessary
data to client chart/widgets. Establish an explicit cache/revalidation policy
for carts and categories alongside the existing products policy.

**Estimated Improvement**

Eliminates at least one browser request each for products and carts on the
overview, and one carts request on orders, per cold route visit. The actual
LCP/INP/TBT improvement is unmeasured and must be verified in a production
trace.

## 2. Development diagnostics are shipped into dashboard runtime paths

**Issue**

React Query Devtools and Recharts Devtools are rendered in the application
runtime rather than gated to development.

**Evidence**

`app/providers.tsx` always renders `<ReactQueryDevtools />` and
`features/dashboard/Components/Chart.tsx` always renders `<RechartsDevtools />`.
Both packages are production dependencies in `package.json`.

**Root Cause**

Development-only observability components were left in the production render
tree.

**Why users notice it**

These components add JavaScript and potentially runtime bookkeeping to routes
that should only pay for dashboard functionality. On CPU-constrained devices,
unnecessary parsed/hydrated JavaScript increases main-thread competition.

**Recommended Fix**

Render each devtool only in development and dynamically load it there, or
remove it from production dependencies if it is not needed in deployed builds.
Verify the resulting production chunk graph with a bundle analyzer.

**Estimated Improvement**

Removes non-user-facing runtime code from dashboard routes. Exact byte and TBT
reduction cannot be estimated without a production bundle report.

## 3. Inventory image priority is inverted

**Issue**

Later product cards (`index > 3`) are marked eager and high priority.

**Evidence**

`features/products/components/CardComponent.tsx` spreads
`fetchPriority: "high"` and `loading: "eager"` onto every card after index 3.

**Root Cause**

The priority condition targets below-the-fold images instead of the earliest
visible content.

**Why users notice it**

The browser spends bandwidth and decoding time on lower-page thumbnails that
the user cannot yet see, delaying higher-value resources and increasing data
use.

**Recommended Fix**

Remove the eager/high-priority rule from repeated list cards. Let below-fold
images lazy-load. After a trace identifies an above-fold LCP image, apply
priority only to that one image and provide a layout-accurate `sizes` value.

**Estimated Improvement**

Reduces competing image requests on inventory pages by the number of cards
beyond the first visible set (up to the configured page size). LCP impact is
connection and viewport dependent, so no millisecond claim is justified.

## 4. Dashboard chart defers meaningful content to a heavy client-only dependency

**Issue**

The analytics visualization cannot render until its dynamic client chunk,
Recharts, devtools, React Query data, and hydration are ready.

**Evidence**

`DashboardChart.client.tsx` uses `dynamic(() => import("./Chart"), { ssr:
false })`; `Chart.tsx` imports Recharts and uses client queries.

**Root Cause**

The entire analytics result is client-owned rather than server-prepared with a
progressive interactive enhancement.

**Why users notice it**

The dashboard's primary analytics region remains a skeleton after the page
shell and metrics are visible, particularly on low-end devices.

**Recommended Fix**

Keep the interactive chart dynamically loaded, but server-fetch/hydrate its
small data model first and reserve stable chart dimensions. Consider a
server-rendered textual summary/table fallback so useful analytics arrive
before chart interactivity. Do not SSR Recharts blindly; compare a measured
SSR-versus-client tradeoff.

**Estimated Improvement**

Improves time-to-meaningful analytics by removing the second data wait. It
does not necessarily reduce initial JS until bundle analysis confirms the
chart chunk behavior.

## 5. Route streaming and loading coverage is inconsistent

**Issue**

Only inventory has a route-level loading UI; dashboard, orders, settings, and
detail routes rely on partial or no segment loading coverage.

**Evidence**

`app/(dashboard)/inventory/loading.tsx` exists; sibling dashboard segments do
not contain `loading.tsx`. `MatricCards` is wrapped by `Suspense` only on the
overview. The dashboard `Navbar` awaits session cookies in the shared layout.

**Root Cause**

Loading behavior was implemented at individual component level without a
route-level streaming plan.

**Why users notice it**

Transitions can appear inert while a route or layout waits on data. Skeletons
may also shift when they do not reserve the final component's dimensions.

**Recommended Fix**

Add route-specific loading states that preserve the final page geometry, and
place `Suspense` near uncached data in shared layouts if that work is allowed
to stream. Measure navigation timing before moving session data out of the
layout.

**Estimated Improvement**

Improves perceived responsiveness during slow navigation; it does not reduce
API latency by itself. CLS effect is unmeasured.

## 6. Search causes route work during typing and uses stale text

**Issue**

Global search calls `router.replace` on every input change, but writes the
previous debounced value instead of the current input value.

**Evidence**

In `components/ui/SearchComponent.tsx`, `handleInput` calls `setInputValue`
then `router.replace(...debouncedValue)`. `debouncedValue` updates after one
second; `useSearchList` is separately enabled from that debounced value.

**Root Cause**

URL state and network-query debouncing are coupled incorrectly.

**Why users notice it**

Typing triggers needless client-side navigation/state work and may produce a
URL that lags the visible input. It risks making a primary interaction feel
less responsive.

**Recommended Fix**

Keep keystrokes in local state; issue the search query only after debounce.
Update the URL from the settled value (or only on submit) and preserve other
parameters intentionally. Measure INP with the interaction trace before and
after.

**Estimated Improvement**

Reduces route updates from approximately one per keystroke to one per settled
search term. Exact INP improvement is unmeasured.

## 7. Product image and detail navigation behavior is inconsistent

**Issue**

Dashboard widget and search results route to `/products/:id`, while product
details are implemented at `/inventory/:id`; widgets also use raw `<img>`.

**Evidence**

`DashboardWidgets.tsx` and `SearchComponent.tsx` create `/products/${id}`
links. The only product detail page is
`app/(dashboard)/inventory/[id]/page.tsx`. DashboardWidgets renders `<img
src={product.thumbnail}>`.

**Root Cause**

Route ownership changed without updating all callers, and one image path
bypassed the project's image component policy.

**Why users notice it**

Clicks from dashboard/search fail to reach detail views, and widget images do
not receive Next image optimization or controlled sizing behavior.

**Recommended Fix**

Use the implemented inventory route consistently. Replace the widget image
with `next/image` with explicit dimensions and `sizes`; keep it lazy unless a
trace proves it is an LCP candidate.

**Estimated Improvement**

Restores key navigation and removes uncontrolled widget image loading. No
Core Web Vitals delta can be claimed without measurement.

---

# Performance Roadmap

## P0

1. Make the repository release-verifiable: resolve the three current ESLint
   errors, then run lint, production build, and route smoke tests. This is a
   production gate, not a score optimization.
2. Move `proxy.txt` to a valid root `proxy.ts` and redesign it as a lightweight
   redirect check. Do authoritative authorization in protected server code;
   Next 16 documentation explicitly cautions against slow data fetching in
   Proxy.
3. Remove or development-gate `ReactQueryDevtools` and `RechartsDevtools`.

## P1

1. Design a single dashboard/order data model: parallel server fetches,
   explicit revalidation, and hydration for client consumers. Confirm the
   elimination of duplicate products/carts requests in DevTools Network.
2. Correct repeated-card image loading: remove eager/high priority after the
   first four cards, then use a trace to pick a genuine LCP image if one exists.
3. Add route-level or near-data loading boundaries for overview, orders,
   settings, and detail routes. Match skeleton dimensions to final layouts.
4. Repair search URL/query sequencing and measure its interaction trace.

## P2

1. Add a production bundle analyzer and preserve a baseline report per route.
2. Replace raw widget `<img>` with `next/image`; audit `sizes` for all product
   image variants.
3. Assess whether dashboard analytics should expose server-rendered summary
   content before dynamic Recharts interaction.
4. Replace custom modal/dropdown triggers with semantic controls or a proven
   accessible primitive, focusing on keyboard/focus behavior of search and
   account actions.

## P3

1. Establish RUM for LCP, INP, CLS, and route-level API timing after release.
2. Only after a trace identifies a real long render, profile chart data
   transformation and consider a targeted optimization. Do not add general
   memoization preemptively.

---

# Learning Summary

- **Server data ownership → hydration boundaries → duplicate-request removal.**
  Server fetches and React Query caches are separate unless their data is
  deliberately dehydrated. This project demonstrates the difference between
  its well-hydrated inventory list and its duplicated dashboard/order data.
- **Resource priority → bandwidth contention → LCP.** `priority`, eager
  loading, and `fetchPriority` are reserved for genuine first-view critical
  images. The inventory condition demonstrates how an inverted rule harms the
  loading queue.
- **Code splitting → client rendering delay → progressive enhancement.** A
  client-only Recharts chunk protects initial server HTML but can postpone the
  time when analytics are useful. Split for a reason, then provide stable
  dimensions/data/fallbacks.
- **Development tooling → production bundle/runtime cost.** Diagnostics are
  valuable locally but must be gated so user routes do not carry them.
- **Perceived latency → streaming/loading geometry → user trust.** Loading UI
  does not make the network faster, but it makes transitions legible and can
  prevent layout shift when it matches final content.
- **Accessibility semantics → reachable interactions → production quality.**
  Native buttons/dialogs and focus management are necessary for searchable
  inventory and account controls to work for keyboard and assistive-tech users.

---

# Final Verdict

1. **What is slowing the application the most?**

   The dominant verified issue is repeated ownership of the same products and
   carts data: metrics fetch it on the server, then dashboard/order client
   components fetch it again. The client-only Recharts path, including devtools,
   compounds delayed analytics readiness. Their measured contribution is
   unknown because no trace/build analysis is available.

2. **Which fixes provide the biggest measurable gains?**

   Eliminate server-to-client duplicate products/carts fetches, remove
   production devtools, and stop eagerly loading later inventory thumbnails.
   Verify each with a production Network panel, bundle analyzer, and Lighthouse
   trace; the code alone can quantify removed requests but not milliseconds.

3. **Which Lighthouse findings can safely be ignored?**

   None can be classified as ignorable because no Lighthouse result exists.
   The ESLint `<img>` warning is meaningful for the dashboard widget; warnings
   about tiny memoization opportunities should not become work without a React
   profiler trace.

4. **What Lighthouse score would realistically be expected after applying the recommended fixes?**

   No defensible number can be given. A score would depend on production build
   output, DummyJSON latency/location, cache warmth, device CPU, and the actual
   LCP element. Establish a baseline first; do not use a forecast as a release
   target.

5. **If this application were reviewed by a Staff Frontend Engineer, what performance-related questions would likely be asked during the interview?**

   - Why do metrics fetch products/carts on the server while widgets and orders
     refetch them on the client, and where is the data ownership boundary?
   - What production trace identifies the dashboard LCP element and its largest
     delay phase?
   - Why are Recharts and React Query devtools in a production render path, and
     what does the route bundle graph show after removing them?
   - Why are below-the-fold product images eager/high priority, and which
     actual image—if any—deserves priority?
   - Which requests are intentionally revalidated, at what cadence, and how is
     freshness balanced against navigation latency?
   - How are keyboard users expected to open, navigate, and dismiss custom
     search and account overlays?
   - Which route transitions have loading coverage, and how was CLS measured
     for their skeleton-to-content transition?
