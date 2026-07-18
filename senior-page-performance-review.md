# مراجعة الأداء وإتاحة الوصول — لوحة DashCommerce

> **نوع المراجعة:** Static code review وفق `.agents/skills/senior-performance-review.md`  
> **تاريخ المراجعة:** 17 يوليو 2026  
> **ملاحظة مهمة:** الدرجات التالية مبنية على الكود الحالي، وليست نتائج Lighthouse فعلية. لا يوجد تقرير Lighthouse أو Chrome trace في المشروع، لذلك لا توجد أرقام مؤكدة لـ LCP أو INP أو CLS أو TBT.

---

## لوحة التقييم العامة

| المعيار | الدرجة | الحالة |
| :-- | --: | :-- |
| الأداء | **5.5 / 10** | 🟠 يحتاج معالجة قبل الإنتاج |
| إتاحة الوصول | **6.0 / 10** | 🟡 أساس جيد مع فجوات مهمة |
| جودة جاهزية الإنتاج | **4.5 / 10** | 🔴 توجد مشكلات release blockers |
| **الإجمالي** | **5.8 / 10** | 🟠 متوسط |

### أهم ثلاث مشاكل

1. **تكرار جلب products وcarts** بين Server Components وReact Query على العميل.
2. **أدوات التطوير** (`ReactQueryDevtools` و`RechartsDevtools`) موجودة في مسار الإنتاج.
3. **أولوية تحميل صور المنتجات معكوسة**: الصور المتأخرة في القائمة تُحمّل eager/high-priority.

---

## خريطة الأولويات

| الأولوية | المطلوب | الأثر المتوقع |
| :-- | :-- | :-- |
| 🔴 P0 | إصلاح أخطاء lint وإزالة devtools من production | نجاح release وتقليل JavaScript غير الضروري |
| 🔴 P0 | توحيد مصدر بيانات dashboard/orders ومنع duplicate requests | تقليل انتظار الشبكة وتحسن اكتمال الصفحة |
| 🟠 P1 | إصلاح eager/high-priority images | تقليل منافسة الصور على الموارد المهمة |
| 🟠 P1 | loading states لمسارات dashboard/orders/details | انتقالات أوضح واحتمال CLS أقل |
| 🟡 P2 | إصلاح search URL/debounce وmodal semantics | تفاعل أسرع ودعم أفضل للكيبورد |

---

## الصفحات

### 📁 `app/(dashboard)/page.tsx` — الصفحة الرئيسية `/`

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **5 / 10** | **7 / 10** | 🟠 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| تكرار تحميل البيانات | Performance | `MatricCards` يجلب على السيرفر، و`DashboardWidgets` و`DashboardChart` يجلبان products/carts ثانيةً | اجلب البيانات مرة واحدة في page، ثم hydrate نفس React Query keys أو مرّر البيانات للـ widgets | chart وwidgets قد تنتظران طلبًا جديدًا بعد أن ظهرت metrics بالفعل |
| chart client-only | Performance | `DashboardChart.client.tsx` يستخدم `ssr: false` | حضّر بيانات chart على السيرفر، hydrate لها، وأبقِ الرسم التفاعلي dynamic | منطقة التحليلات لا تصبح مفيدة قبل تنزيل chunk وhydration |
| لا يوجد route loading | Performance / UX | لا يوجد `loading.tsx` للصفحة | أضف skeleton يطابق header + metrics + chart | التنقل البطيء يبدو كأنه توقف |
| عنوان رئيسي غير صحيح | a11y | “Overview Dashboard” هو `h2` | استخدم `h1` | يحسن تسلسل العناوين لقارئات الشاشة |

#### 🎓 للتعلم

- Server Components + React Query hydration.
- الفرق بين عرض الصفحة بسرعة وظهور المحتوى المفيد بسرعة.

---

### 📁 `app/(dashboard)/inventory/page.tsx` — المنتجات `/inventory`

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **6 / 10** | **6 / 10** | 🟡 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| طلب carts غير مستخدم | Performance | `MatricCards` يجلب carts حتى عند عرض metrics المنتجات | اجعل data loader يجلب المصادر المطلوبة فقط | طلب شبكة وسيرفر بلا فائدة لهذه الصفحة |
| categories تُجلب مرتين | Performance | server metric ثم `useCategoryList` في العميل | hydrate categories query أو اجلبها من مكان واحد | تقليل API request مكرر |
| category تلغي pagination/sort | Performance / Correctness | `getProducts` يغير endpoint عند وجود category | مرّر limit/skip/sort أو وضّح أن endpoint لا يدعمها | القائمة والـ pagination قد تعرض نتائج غير متطابقة |
| search يحدث navigation أثناء الكتابة | Performance / INP | `router.replace` داخل `handleInput` يستخدم `debouncedValue` القديم | حدّث URL بعد debounce أو عند submit فقط | يقل route work ويحسن استجابة الكتابة |

#### 🎓 للتعلم

- مطابقة query keys بين prefetch وHydrationBoundary.
- فصل input state عن URL state.

---

### 📁 `app/(dashboard)/inventory/[id]/page.tsx` — تفاصيل المنتج

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **6 / 10** | **6 / 10** | 🟡 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| لا توجد cache policy | Performance | `getProductById` بلا revalidation صريح | أضف revalidation/cache contract واضح | كل زيارة تعتمد على API خارجي بلا سياسة freshness |
| لا يوجد loading state | Performance / UX | لا يوجد `loading.tsx` للمسار الديناميكي | أضف product-detail skeleton | تجربة انتظار أوضح وأقل قفزًا بصريًا |
| الصورة الرئيسية lazy دائمًا | Performance / LCP | `ActiveImgComponent` يضع `loading="lazy"` للصورة الكبيرة | قس LCP أولًا؛ استخدم priority فقط إذا كانت LCP فعلًا | قد يؤخر أكبر عنصر مرئي في الصفحة |
| 404 ليست واضحة | Reliability | لا يوجد `notFound()` | تعامل مع 404 باستخدام `notFound()` | يعطي صفحة مفهومة بدل error عام |
| نص الحذف مضلل | UX | يقول “permanently delete” رغم DummyJSON | أوضح أن الحذف simulated | لا تعد المستخدم بعملية دائمة غير موجودة |

#### 🎓 للتعلم

- استخدام `next/image` priority بعد قياس LCP فقط.
- `notFound()` مقابل error boundary.

---

### 📁 `app/(dashboard)/orders/page.tsx` — الطلبات `/orders`

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **4 / 10** | **6 / 10** | 🟠 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| carts تُجلب مرتين | Performance | `MatricCards` على السيرفر ثم `OrdersClient/useOrders` في العميل | hydrate orders query أو اختر مصدرًا واحدًا للبيانات | الجدول قد ينتظر طلبًا جديدًا رغم أن الصفحة جلبت orders |
| products/categories غير مستخدمة | Performance | `MatricCards` يجلب كل المصادر | اجلب carts فقط هنا | latency وتكلفة API غير ضروريين |
| لا يوجد loading route | Performance / UX | لا يوجد `orders/loading.tsx` | أضف skeleton للـ table والـ metrics | انتقال أكثر سلاسة |
| error غير معروض | Reliability | `OrdersClient` يستخرج `error` ولا يستخدمه | أظهر `ErrorState` مع retry | لا يظهر سبب تعذر تحميل الجدول |
| عنوان `h2` | a11y | “Order Management” | حوّله إلى `h1` | heading hierarchy صحيح |

#### 🎓 للتعلم

- كيف تمنع server/client duplicate fetching.
- تصميم table loading/error states.

---

### 📁 `app/(dashboard)/orders/[id]/page.tsx` — تفاصيل الطلب

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **5 / 10** | **7 / 10** | 🟠 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| تاريخ عشوائي أثناء render | Performance / Correctness | `Date.now()` و`Math.random()` | استخدم تاريخ API أو قيمة demo ثابتة | المحتوى غير مستقر وهو سبب مباشر لفشل lint |
| cache غير محدد | Performance | `getCartById` و`getUserByid` | عرّف revalidation policy | يعتمد المسار على API خارجي في كل زيارة |
| لا يوجد loading state | Performance / UX | لا يوجد `loading.tsx` | أضف skeleton لتفاصيل الطلب | يحسن perceived performance |
| لا يوجد `notFound()` | Reliability | فشل الطلب يتحول إلى error عام | عالج 404 بشكل صريح | صفحة أكثر وضوحًا للمستخدم |
| عنوان `h2` | a11y | “Order #{id}” | استخدم `h1` | تسلسل دلالي صحيح |

#### 🎓 للتعلم

- React render purity.
- cache/revalidation للـ dynamic routes.

---

### 📁 `app/(dashboard)/settings/page.tsx` — الإعدادات `/settings`

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **6 / 10** | **6 / 10** | 🟡 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| analytics ضمن صفحة settings | Performance | `MatricCards` يجلب products/carts/categories | اجعل metrics section مستقلة أو defer تحميلها | نموذج الإعدادات لا يجب أن يتأخر بسبب analytics |
| النموذج لا يحفظ | Reliability | `SettingsForm` يطبع في console فقط | أضف server action/API وحالات pending/error/success | المستخدم يتوقع حفظ التعديلات |
| لا يوجد loading route | Performance / UX | لا يوجد `settings/loading.tsx` | أضف skeleton إذا بقيت metrics server-side | تجربة انتقال أوضح |
| عنوان `h3` | a11y | “General Settings” | استخدم `h1` | hierarchy صحيح |

#### 🎓 للتعلم

- فصل data requirements للصفحات.
- lifecycle الخاص بالنماذج وحالات الحفظ.

---

### 📁 `app/(auth)/login/page.tsx` — تسجيل الدخول `/login`

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **7 / 10** | **6 / 10** | 🟡 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| لا يوجد `h1` | a11y | اسم المنتج مستخدم `h2` | استخدم `h1` | دخول مستقل يحتاج عنوانًا رئيسيًا |
| بيانات دخول افتراضية | Security / UX | username/password في `defaultValues` | أزل password الافتراضي خارج demo mode | يقلل الالتباس والخطر في production |
| زر الدخول بلا pending state | UX | لا يعتمد على `isSubmitting` | عطّل الزر وأظهر “Signing in…” | يمنع submit المتكرر |
| toast بعد redirect | Reliability | `router.replace` قبل toast | اعرض الرسالة قبل redirect أو استخدم redirect state | قد لا يرى المستخدم النجاح |

#### 🎓 للتعلم

- accessible authentication forms.
- pending states في React Hook Form.

---

### 📁 `app/(dashboard)/inventory/loading.tsx`

#### 📊 التقييم السريع

| Performance | Accessibility | الحالة |
| --: | --: | :-- |
| **6 / 10** | **7 / 10** | 🟡 |

| المشكلة | النوع | أين تظهر | الإصلاح المقترح | لماذا يهم المستخدم؟ |
| :-- | :-- | :-- | :-- | :-- |
| spinner لا يشبه الصفحة النهائية | Performance / CLS | `h-screen` + spinner عام | استخدم skeleton يطابق header/cards/product grid | يقلل القفزة البصرية عند اكتمال التحميل |
| لا توجد loading semantics | a11y | النص فقط “Loading ...” | أضف `role="status"` و`aria-live="polite"` | قارئ الشاشة يعرف أن الصفحة تتحمل |

---

## مكونات مشتركة تؤثر على جميع الصفحات

### 📁 `app/providers.tsx`

| المشكلة | النوع | الإصلاح |
| :-- | :-- | :-- |
| `ReactQueryDevtools` يعمل دائمًا | Performance | اعرضه فقط في development، ويفضل dynamic import |

### 📁 `features/dashboard/Components/Chart.tsx`

| المشكلة | النوع | الإصلاح |
| :-- | :-- | :-- |
| `RechartsDevtools` في runtime الإنتاج | Performance | development-only أو إزالة الحزمة من production path |
| chart يعتمد على client queries | Performance | hydrate بياناته من server page قبل تشغيل الرسم |

### 📁 `features/products/components/CardComponent.tsx`

| المشكلة | النوع | الإصلاح |
| :-- | :-- | :-- |
| الصور بعد index 3 تستخدم eager وhigh priority | Performance / LCP | احذف الشرط؛ اجعل الصور البعيدة lazy وحدد LCP image بعد القياس فقط |

### 📁 `features/dashboard/Components/DashboardWidgets.tsx`

| المشكلة | النوع | الإصلاح |
| :-- | :-- | :-- |
| يستخدم `<img>` | Performance | استخدم `next/image` مع dimensions و`sizes` |
| الرابط `/products/:id` غير موجود | Reliability | استخدم `/inventory/:id` |

### 📁 `components/CompoundModal.tsx` و`components/DropDownModal.tsx`

| المشكلة | النوع | الإصلاح |
| :-- | :-- | :-- |
| `div onClick` بدل button وfocus management غير مكتمل | a11y | استخدم `<button>` وRadix Dialog/Menu أو أضف focus trap/return وسلوك keyboard كامل |

---

## خطة الإصلاح العملية

### 🔴 P0 — قبل الإنتاج

1. إصلاح أخطاء lint الثلاثة، خصوصًا `Date.now()` و`Math.random()` في تفاصيل الطلب.
2. جعل `ReactQueryDevtools` و`RechartsDevtools` development-only.
3. توحيد data ownership في dashboard وorders لمنع duplicate products/carts requests.
4. تفعيل proxy الصحيح باسم `proxy.ts` بدل `proxy.txt` مع عدم وضع API validation بطيء داخله.

### 🟠 P1 — أعلى عائد مباشر

1. حذف eager/high priority من الصور المتأخرة في product grid.
2. إضافة loading states متطابقة بصريًا لمسارات dashboard/orders/details/settings.
3. إصلاح search debounce وURL update sequencing.
4. إضافة error states و`notFound()` لمسارات التفاصيل.

### 🟡 P2 — جودة وتجربة استخدام

1. تصحيح كل page title ليبدأ بـ `h1`.
2. نقل widget image إلى `next/image` وتصحيح روابط التفاصيل.
3. استبدال custom modal/dropdown بسلوك دلالي كامل للكيبورد والتركيز.
4. إضافة bundle analyzer وLighthouse CI results كـ baseline.

---

## الحكم النهائي

أساس المشروع جيد: App Router، `next/font`، استخدام واسع لـ `next/image`، وHydrationBoundary صحيحة في صفحة inventory. لكن التطبيق ليس جاهزًا بعد لاستهداف درجة Lighthouse حقيقية 90+ لأن القياس غير موجود، ولأن duplicate data loading وproduction devtools وأولوية الصور الخاطئة ستؤثر على تجربة المستخدم خصوصًا على الشبكات والأجهزة الضعيفة.

بعد تنفيذ P0 وP1، شغّل production build ثم Lighthouse على `/`, `/inventory`, `/orders`, و`/login` لتحديد عنصر LCP الحقيقي وقياس التحسن بدل الاعتماد على تقديرات الكود.
