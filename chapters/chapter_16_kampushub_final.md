---
chapter_id: chapter_16
chapter_no: 16
title: "Bölüm 16: KampüsHub — Tam Yığın Uygulama Tamamlama"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: tr-TR
status: draft
---

# Bölüm 16: KampüsHub — Tam Yığın Uygulama Tamamlama

## Bölüm yol haritası

Bu bölüm, kitabın önceki tüm teknik parçalarını tek bir final uygulama içinde birleştirir. KampüsHub artık yalnızca ayrı ayrı yazılmış bileşenlerden oluşan bir egzersiz dizisi değildir; route yapısı, sayfalar, formlar, global state, hafif kullanıcı tercihleri, API sınırı, test yaklaşımı ve dağıtım kontrol listesi olan tamamlanabilir bir React projesidir.

Bölümün temel sorusu şudur: “Bir React uygulaması ders örneği olmaktan çıkıp değerlendirilebilir, sürdürülebilir ve geliştirilebilir bir öğrenci projesine nasıl dönüşür?” Bu soruya yanıt verirken yeni ve ağır bir teknoloji eklemek yerine, önceki bölümlerde öğrenilen araçları doğru sorumluluklara yerleştireceğiz.

Bu bölümde izleyeceğimiz akış şöyledir:

1. KampüsHub final mimarisini tanımlama.
2. Uygulama kabuğu, route haritası ve sayfa sorumluluklarını netleştirme.
3. Form, API, global state ve hafif tercih state’i arasındaki sınırları belirleme.
4. Test, erişilebilirlik, performans ve dağıtım kapılarını final teslim ölçütüne dönüştürme.
5. Öğrenciye uygulanabilir final laboratuvar görevi ve değerlendirme rubriği sunma.

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

- KampüsHub uygulamasını modül, route, state ve API sınırı açısından bütüncül olarak açıklar.
- React Router ile oluşturulan sayfa yapısını final uygulama iskeletine bağlar.
- Form state, global state, sunucu verisi ve kullanıcı tercihleri arasındaki farkları gerekçelendirir.
- Final uygulama için route kapsamı, modül hazır oluş durumu ve release gate kontrolü yapar.
- Dağıtım öncesi test, erişilebilirlik, çevresel değişken ve yönlendirme kontrollerini planlar.
- KampüsHub final teslim paketini teknik rapor, kod deposu ve kontrol listesiyle birlikte hazırlar.

## Ön bilgiler

Bu bölümü verimli takip edebilmek için öğrencinin şu konuları hatırlaması gerekir:

- Bileşen, props ve state mantığı
- `useEffect`, özel hook ve veri çekme akışı
- React Router ile sayfa yönetimi
- Form yönetimi ve doğrulama yaklaşımı
- Redux Toolkit ile uygulama geneli durum yönetimi
- Zustand ile hafif kullanıcı tercihleri
- REST API istemci sınırı
- Test, performans ve dağıtım kontrol listesi

Bu bölüm yeni bir konu yığını eklemek yerine, önceki konular arasında mimari bağ kurar. Bu nedenle asıl başarı ölçütü “daha çok kod yazmak” değil, “hangi kodun hangi sorumluluğa ait olduğunu doğru belirlemek” olacaktır.

## Final uygulama düşüncesi

Bir React uygulaması küçük örneklerden büyüdükçe iki risk ortaya çıkar. İlk risk, her şeyi tek bileşene veya tek state alanına toplamaktır. İkinci risk ise her küçük ihtiyaca ayrı bir teknoloji ekleyerek uygulamayı gereksiz yere karmaşıklaştırmaktır. KampüsHub finalinde bu iki uçtan kaçınmak gerekir.

Final uygulama düşüncesi üç temel ilkeye dayanır:

- **Sorumluluk ayrımı:** Sayfa bileşenleri, form bileşenleri, veri erişim katmanı, global state ve tercih state’i birbirinden ayrılmalıdır.
- **Kapsam görünürlüğü:** Hangi modülün tamamlandığı, hangisinin eksik olduğu ve hangi route’un hangi sayfaya bağlandığı açıkça izlenmelidir.
- **Teslim edilebilirlik:** Uygulama yalnızca yerelde çalışmakla kalmamalı; test planı, dağıtım çıktısı ve bakım notlarıyla teslim edilebilir olmalıdır.

Bu bölümde “tam yığın” ifadesi backend uygulaması yazmak anlamına gelmez. Buradaki amaç, React istemci tarafını gerçek bir servisle konuşabilecek şekilde tasarlamak, ancak backend ayrıntılarına girmemektir. Başka bir deyişle KampüsHub; kullanıcı arayüzü, route akışı, istemci state’i, API sınırı ve dağıtım hazırlığı açısından tamamlanacaktır.

## KampüsHub final mimarisi

KampüsHub final mimarisi, kitap boyunca geliştirilen modüllerin bir araya gelmiş hâlidir. Bu mimariyi aşağıdaki katmanlarla düşünebiliriz:

| Katman | Sorumluluk | Örnek |
|---|---|---|
| Uygulama kabuğu | Genel layout, header, footer, ana içerik alanı | `AppShell` |
| Routing | URL ile sayfa eşleştirme | `/announcements`, `/events` |
| Sayfalar | Route’a bağlı ana ekranlar | `AnnouncementsPage`, `ProfilePage` |
| Bileşenler | Tekrarlı ve küçük UI parçaları | `Card`, `EmptyState`, `StatusBadge` |
| Formlar | Kullanıcı girdisi ve doğrulama | Not paylaşımı formu |
| API istemcisi | Sunucu ile veri alışverişi sınırı | `getAnnouncements()` |
| Global state | Uygulama geneli bildirim/seçim durumu | `notificationSlice` |
| Hafif tercih state’i | Tema ve görünüm tercihleri | Zustand preference store |
| Test ve kalite | Teslim öncesi güvence | Smoke test, release gate |

Bu tablo, final uygulamada “her şey nerede durmalı?” sorusuna yanıt verir. Örneğin tema seçimi için Redux Toolkit kullanmak çoğu başlangıç projesinde gereksiz olabilir; Zustand veya küçük bir custom hook yeterli olabilir. Buna karşılık uygulama geneli bildirim kuyruğu veya oturumla ilişkili global seçimler Redux Toolkit tarafında daha anlamlı olabilir.

## Uygulama kabuğu ve route haritası

KampüsHub’ın final route haritası önceki bölümlerde kurulan sayfa yönetiminin genişletilmiş hâlidir:

| Route | Sayfa | Amaç |
|---|---|---|
| `/` | Ana sayfa | Özet kartları ve yönlendirme |
| `/announcements` | Duyurular | Duyuru listesi ve filtreleme |
| `/announcements/:announcementId` | Duyuru detayı | Tekil duyuru ayrıntısı |
| `/events` | Etkinlikler | Etkinlik takvimi/listesi |
| `/notes` | Not paylaşımı | Not listesi ve paylaşım formu |
| `/profile` | Profil | Kullanıcı bilgileri ve tercihleri |
| `/settings` | Ayarlar | Tema, kompakt görünüm, bildirim tercihleri |
| `*` | Sayfa bulunamadı | Bilinmeyen route yönetimi |

Final uygulamada route tablosu yalnızca teknik bir liste değildir. Aynı zamanda proje kapsamının görünür hâlidir. Eğer bir modül route tablosunda varsa, o route için en azından temel bir sayfa bileşeni, boş durum görünümü, yükleniyor/hata durumu ve test senaryosu düşünülmelidir.

<!-- CODE_META
id: react_ch16_code01
chapter_id: chapter_16
language: javascript
kind: example
title: "KampüsHub final modül hazırlık durumu"
file: "chapter_16/react_ch16_code01_module_readiness.js"
extract: true
test: compile_run
expected_stdout: "modules=7/8 | missing=accessibility"
-->

```javascript
const modules = [
  { name: "routing", ready: true },
  { name: "announcements", ready: true },
  { name: "events", ready: true },
  { name: "notes", ready: true },
  { name: "profile", ready: true },
  { name: "preferences", ready: true },
  { name: "tests", ready: true },
  { name: "accessibility", ready: false },
];

const readyCount = modules.filter((module) => module.ready).length;
const missing = modules
  .filter((module) => !module.ready)
  .map((module) => module.name)
  .join(",") || "none";

console.log(`modules=${readyCount}/${modules.length} | missing=${missing}`);
```

Bu örnek, final teslimde modülleri yalnızca “var/yok” şeklinde değil, hazırlık durumu açısından izlemeyi gösterir. Gerçek projede bu listeye erişilebilirlik, test, build, route ve çevresel değişken kontrolleri de eklenmelidir.

<!-- CODE_META
id: react_ch16_code02
chapter_id: chapter_16
language: javascript
kind: example
title: "Final route kapsamını doğrulama"
file: "chapter_16/react_ch16_code02_route_coverage.js"
extract: true
test: compile_run
expected_stdout: "routes=7/7 | missing=none"
-->

```javascript
const requiredRoutes = [
  "/",
  "/announcements",
  "/announcements/:announcementId",
  "/events",
  "/notes",
  "/profile",
  "/settings",
];

const configuredRoutes = [
  "/",
  "/announcements",
  "/announcements/:announcementId",
  "/events",
  "/notes",
  "/profile",
  "/settings",
  "*",
];

const missingRoutes = requiredRoutes.filter(
  (route) => !configuredRoutes.includes(route),
);

console.log(
  `routes=${requiredRoutes.length - missingRoutes.length}/${requiredRoutes.length} | missing=${missingRoutes.join(",") || "none"}`,
);
```

Route kapsam kontrolü küçük görünse de final projede çok değerlidir. Öğrenci bir sayfa geliştirdiğini düşünürken o sayfanın route tablosuna bağlanmadığını fark etmeyebilir. Bu nedenle route kapsamı, final teslim kontrol listesine açıkça eklenmelidir.

## Sayfa bileşenleri ve uygulama kabuğu

Final KampüsHub yapısında `App` bileşeni tüm iş mantığını taşıyan büyük bir bileşen hâline gelmemelidir. Daha doğru yaklaşım, `App` bileşeninin sağlayıcıları ve route ağacını birleştiren üst seviye bir giriş noktası olmasıdır.

Örnek bir klasör düzeni şöyle düşünülebilir:

```text
src/
  app/
    App.jsx
    AppShell.jsx
    routes.jsx
    providers.jsx
  pages/
    HomePage.jsx
    AnnouncementsPage.jsx
    AnnouncementDetailPage.jsx
    EventsPage.jsx
    NotesPage.jsx
    ProfilePage.jsx
    SettingsPage.jsx
    NotFoundPage.jsx
  features/
    announcements/
    events/
    notes/
    profile/
    preferences/
  shared/
    components/
    hooks/
    api/
    utils/
```

Bu yapı zorunlu bir standart değildir; fakat başlangıç düzeyindeki bir React kitabı için anlaşılır bir ayrım sunar. `pages` klasörü route’a karşılık gelen ana ekranları, `features` klasörü iş alanına göre gruplanmış bileşen ve mantığı, `shared` klasörü ise birden çok yerde kullanılan ortak parçaları tutar.

## Form, API ve state sınırları

KampüsHub finalinde karışıklık en çok şu soruda ortaya çıkar: “Bu veri nerede tutulmalı?” Yanıt, verinin türüne göre değişir.

| Veri türü | Önerilen yer | Gerekçe |
|---|---|---|
| Form alanı | Form bileşeni / React Hook Form | Kullanıcı girişi geçicidir |
| Duyuru listesi | API katmanı / query cache | Sunucu verisidir |
| Aktif bildirim | Redux Toolkit | Uygulama geneli UI durumudur |
| Tema tercihi | Zustand veya local tercih store | Hafif ve kullanıcıya özeldir |
| Route parametresi | React Router | URL durumudur |
| Türetilmiş liste | Selector / yardımcı fonksiyon | Kaynak veriden hesaplanır |

Bu ayrım öğrencinin uygulama büyüdükçe state karmaşasına düşmesini engeller. Her şeyi Redux store’a koymak doğru olmadığı gibi, her şeyi local state içinde tutmak da sürdürülebilir değildir. State yönetimi, aracın popülerliğine göre değil, verinin yaşam süresine ve paylaşım ihtiyacına göre seçilmelidir.

<!-- CODE_META
id: react_ch16_code03
chapter_id: chapter_16
language: javascript
kind: example
title: "KampüsHub state sahipliği karar tablosu"
file: "chapter_16/react_ch16_code03_state_ownership.js"
extract: true
test: compile_run
expected_stdout: "form=local-form | theme=zustand | notifications=redux | route=router"
-->

```javascript
function decideStateOwner(stateName) {
  const owners = {
    noteForm: "local-form",
    theme: "zustand",
    notifications: "redux",
    currentRoute: "router",
    announcements: "server-cache",
  };

  return owners[stateName] ?? "component-state";
}

const summary = [
  `form=${decideStateOwner("noteForm")}`,
  `theme=${decideStateOwner("theme")}`,
  `notifications=${decideStateOwner("notifications")}`,
  `route=${decideStateOwner("currentRoute")}`,
].join(" | ");

console.log(summary);
```

Bu örnek, state sahipliği kararını açık hâle getirir. Final raporunda öğrenciden bu tabloyu kendi projesi için doldurması istenebilir. Böylece yalnızca kod değil, mimari karar da değerlendirilebilir.

## API sınırı ve veri akışı

KampüsHub finalinde API istemcisi doğrudan sayfa bileşenlerinin içine dağılmamalıdır. Daha sürdürülebilir yaklaşım, API çağrılarını küçük ve isimlendirilmiş fonksiyonlarla `shared/api` veya ilgili `features/.../api` klasöründe toplamaktır.

Örneğin:

```text
shared/api/httpClient.js
features/announcements/announcementApi.js
features/events/eventApi.js
features/notes/noteApi.js
features/profile/profileApi.js
```

Bu yapı, gerçek backend adresi değiştiğinde tüm uygulamada arama yapıp URL değiştirme ihtiyacını azaltır. Ayrıca test sırasında API çağrılarını taklit etmek daha kolay olur.

Final veri akışı şu şekilde özetlenebilir:

1. Kullanıcı bir route’a gider.
2. Sayfa bileşeni gerekli veri kaynağını çağırır.
3. API katmanı sunucu sınırına istek yapar.
4. UI yükleniyor, hata veya başarılı durumuna göre görünüm üretir.
5. Kullanıcı form gönderirse mutation/POST benzeri işlem gerçekleşir.
6. İlgili liste yeniden yüklenir veya cache geçersizleştirilir.
7. Bildirim veya hata global UI state üzerinden kullanıcıya gösterilir.

<!-- CODE_META
id: react_ch16_code04
chapter_id: chapter_16
language: javascript
kind: example
title: "Dashboard veri kaynaklarını özetleme"
file: "chapter_16/react_ch16_code04_dashboard_sources.js"
extract: true
test: compile_run
expected_stdout: "dashboard=ready | cards=3 | alerts=1"
-->

```javascript
const dashboardSources = [
  { key: "announcements", status: "success", count: 5 },
  { key: "events", status: "success", count: 2 },
  { key: "notes", status: "success", count: 8 },
  { key: "profile", status: "warning", count: 1 },
];

const cards = dashboardSources.filter((source) => source.status === "success");
const alerts = dashboardSources.filter((source) => source.status !== "success");
const dashboardStatus = cards.length >= 3 ? "ready" : "partial";

console.log(
  `dashboard=${dashboardStatus} | cards=${cards.length} | alerts=${alerts.length}`,
);
```

Bu örnek, final ana sayfasındaki özet kartlarını düşünmek için kullanılabilir. Ana sayfa yalnızca hoş bir karşılama ekranı olmamalı; uygulamanın kritik modüllerinin durumunu görünür kılmalıdır.

## Final kalite kapıları

Final proje tesliminde kalite kapısı, öğrencinin “çalışıyor” iddiasını ölçülebilir hâle getirir. Başlangıç düzeyi bir React projesinde kalite kapısı aşağıdaki başlıklardan oluşabilir:

| Kapı | Beklenen durum |
|---|---|
| Route kapsamı | Tüm ana route’lar çalışır |
| Form akışları | Giriş, doğrulama ve gönderim kontrol edilir |
| API durumları | Loading, error ve success görünür |
| Global state | Bildirim ve hata akışı tutarlıdır |
| Tercihler | Tema/kompakt görünüm korunur |
| Test | Kritik saf fonksiyonlar ve bileşen davranışları test edilir |
| Erişilebilirlik | Temel label, buton, kontrast ve klavye akışı kontrol edilir |
| Build | `vite build` başarılıdır |
| Preview | Üretim çıktısı yerelde kontrol edilir |
| 404 ve yönlendirme | Bilinmeyen route güvenli şekilde ele alınır |

Kalite kapısı, öğrencinin final raporuna da eklenmelidir. Böylece proje yalnızca görsel olarak değil, teknik süreç açısından da değerlendirilebilir.

<!-- CODE_META
id: react_ch16_code05
chapter_id: chapter_16
language: javascript
kind: example
title: "Dağıtım çevresel değişkenlerini doğrulama"
file: "chapter_16/react_ch16_code05_env_validation.js"
extract: true
test: compile_run
expected_stdout: "env=ok | apiBase=/api | mode=production"
-->

```javascript
function validatePublicEnv(env) {
  const requiredKeys = ["VITE_API_BASE_URL", "MODE"];
  const missing = requiredKeys.filter((key) => !env[key]);

  return {
    ok: missing.length === 0,
    missing,
    apiBase: env.VITE_API_BASE_URL,
    mode: env.MODE,
  };
}

const result = validatePublicEnv({
  VITE_API_BASE_URL: "/api",
  MODE: "production",
});

console.log(
  `env=${result.ok ? "ok" : "missing"} | apiBase=${result.apiBase} | mode=${result.mode}`,
);
```

Bu örnekte özellikle `VITE_` öneki vurgulanmalıdır. İstemci tarafına gömülen değişkenler gizli anahtar taşımamalıdır. API base URL gibi herkese açık yapılandırmalar uygun olabilir; fakat gizli token, veritabanı parolası veya özel servis anahtarı istemci paketine yazılmamalıdır.

<!-- CODE_META
id: react_ch16_code06
chapter_id: chapter_16
language: javascript
kind: example
title: "Final release gate sonucunu hesaplama"
file: "chapter_16/react_ch16_code06_release_gate.js"
extract: true
test: compile_run
expected_stdout: "release=blocked | failed=accessibility,smoke-test"
-->

```javascript
const gates = [
  { name: "routes", passed: true },
  { name: "forms", passed: true },
  { name: "api-states", passed: true },
  { name: "unit-tests", passed: true },
  { name: "accessibility", passed: false },
  { name: "build", passed: true },
  { name: "smoke-test", passed: false },
];

const failed = gates.filter((gate) => !gate.passed).map((gate) => gate.name);
const releaseStatus = failed.length === 0 ? "ready" : "blocked";

console.log(`release=${releaseStatus} | failed=${failed.join(",") || "none"}`);
```

Release gate örneğinin amacı projeyi cezalandırmak değildir. Aksine, final teslimden önce eksikleri görünür kılar. Öğrenci bu çıktıyı “hangi işi önce yapmalıyım?” sorusunun yanıtı olarak kullanabilir.

## Programatik ekran çıktısı planı

Bölüm 16 görsel açıdan final uygulama bütünlüğünü göstermelidir. Bu nedenle üç ana ekran çıktısı planlanır.

<!-- SCREENSHOT_META
id: b16_01_final_kampushub_dashboard
chapter: chapter_16
figure: "Şekil 16.1"
title: "KampüsHub final dashboard görünümü"
route: "/__book__/chapter-16/final-kampushub-dashboard"
waitFor: "[data-book-shot='b16_01_final_kampushub_dashboard']"
actions: []
output: "assets/auto/chapter_16/b16_01_final_kampushub_dashboard.png"
caption: "KampüsHub final sürümünde ana dashboard ekranı; duyuru, etkinlik, not ve profil özetlerini tek uygulama kabuğunda gösterir."
markdownTarget: "[SCREENSHOT:b16_01_final_kampushub_dashboard]"
-->

[SCREENSHOT:b16_01_final_kampushub_dashboard]

<!-- SCREENSHOT_META
id: b16_02_final_route_haritasi
chapter: chapter_16
figure: "Şekil 16.2"
title: "KampüsHub final route haritası"
route: "/__book__/chapter-16/final-route-haritasi"
waitFor: "[data-book-shot='b16_02_final_route_haritasi']"
actions: []
output: "assets/auto/chapter_16/b16_02_final_route_haritasi.png"
caption: "KampüsHub final uygulamasında ana route’ların sayfa bileşenleriyle eşleşmesini gösteren görsel route haritası."
markdownTarget: "[SCREENSHOT:b16_02_final_route_haritasi]"
-->

[SCREENSHOT:b16_02_final_route_haritasi]

<!-- SCREENSHOT_META
id: b16_03_release_checklist
chapter: chapter_16
figure: "Şekil 16.3"
title: "Final release checklist görünümü"
route: "/__book__/chapter-16/release-checklist"
waitFor: "[data-book-shot='b16_03_release_checklist']"
actions: []
output: "assets/auto/chapter_16/b16_03_release_checklist.png"
caption: "KampüsHub final tesliminden önce route, form, API, test, erişilebilirlik ve build kontrollerinin izlendiği release checklist ekranı."
markdownTarget: "[SCREENSHOT:b16_03_release_checklist]"
-->

[SCREENSHOT:b16_03_release_checklist]

Bu ekran çıktıları, kitap üretim hattında otomatik görsel üretimi için kullanılabilir. Her ekran çıktısı yalnızca görsel süsleme değil, ilgili teknik kavramı görünür kılan bir öğrenme nesnesi olarak tasarlanmalıdır.

## Final teslim paketi

KampüsHub final teslim paketi yalnızca kaynak koddan oluşmamalıdır. Aşağıdaki bileşenler önerilir:

| Teslim bileşeni | İçerik |
|---|---|
| Kaynak kod | Vite + React projesi |
| README | Kurulum, çalıştırma, build ve preview komutları |
| Route tablosu | URL, sayfa, açıklama |
| Mimari not | State, API ve form sorumlulukları |
| Test raporu | Çalıştırılan testler ve sonuçlar |
| Ekran görüntüleri | Ana sayfa, route haritası, release checklist |
| Dağıtım notu | Build çıktısı ve hosting yaklaşımı |
| Bilinen eksikler | Geliştirme backlog’u |

Bu teslim yapısı, projenin akademik değerlendirmeye uygun olmasını sağlar. Öğrenci yalnızca “kod yazdım” demek yerine, yaptığı mimari tercihleri ve kalite kontrollerini de belgelemelidir.

## Bakım ve geliştirme backlog’u

Final sürüm, projenin bittiği anlamına gelmez. Yazılım projelerinde final teslim genellikle bir ara sürümdür. KampüsHub için gelecekteki geliştirme alanları şunlar olabilir:

- Kullanıcı kimlik doğrulama ve yetkilendirme
- Gerçek backend ve veritabanı bağlantısı
- Bildirim sistemi
- Etkinlik takvimi için gelişmiş filtreleme
- Not paylaşımı için dosya yükleme
- Erişilebilirlik iyileştirmeleri
- Daha kapsamlı bileşen testleri
- Çok dilli arayüz
- Progressive Web App özellikleri
- Kullanıcı analitiği ve hata izleme

Bu backlog, öğrencinin final raporunda “gelecek çalışmalar” başlığı altında kullanılabilir. Önemli olan, backlog’un mevcut final teslimi gölgelememesi ve gerçekçi önceliklerle yazılmasıdır.

## Sık yapılan hatalar ve yanlış sezgiler

### Her şeyi tek seferde finalleştirmeye çalışmak

Final entegrasyon bir anda yapılmamalıdır. Önce route kapsamı, sonra sayfa görünümü, ardından veri akışı, sonra test ve dağıtım kontrolü yapılmalıdır. Parçalı ilerlemek hata ayıklamayı kolaylaştırır.

### Her state’i Redux’a taşımak

Redux Toolkit güçlü bir araçtır; fakat her veri Redux store’da durmak zorunda değildir. Form alanları, route parametreleri ve geçici UI state çoğu zaman yerel düzeyde kalmalıdır.

### API hatalarını yalnızca konsola yazmak

Kullanıcı arayüzünde hata durumu görünür değilse uygulama tamamlanmış sayılmaz. Hata mesajı, yeniden deneme seçeneği veya boş durum bileşeni düşünülmelidir.

### Build başarılıysa her şey hazır sanmak

`vite build` başarılı olabilir; fakat yanlış route yönlendirmesi, eksik çevresel değişken, erişilebilirlik sorunu veya hatalı API base URL üretimde sorun çıkarabilir. Bu nedenle build sonrasında preview ve smoke test yapılmalıdır.

### Ekran görüntülerini sonradan düşünmek

Kitap ve proje teslimlerinde ekran görüntüleri yalnızca görsel destek değildir. Öğrencinin geliştirdiği akışı belgeleyen kanıtlardır. Bu nedenle ana ekran, route haritası ve release checklist gibi görseller proje sürecinin parçası olmalıdır.

## Hata ayıklama egzersizi

Aşağıdaki senaryoyu inceleyin:

> KampüsHub final sürümünde `/announcements/3` adresi çalışıyor, fakat sayfa yenilendiğinde hosting ortamında 404 hatası alınıyor. Yerel geliştirme ortamında sorun görünmüyor.

Bu durumda aşağıdaki soruları yanıtlayın:

1. Bu problem React Router route tanımından mı, hosting yönlendirme ayarından mı kaynaklanıyor olabilir?
2. Vite build sonrası static hosting ortamında SPA fallback ayarı gerekli midir?
3. `NotFoundPage` ile hosting 404 davranışı arasındaki fark nedir?
4. Bu problemi final release checklist içinde hangi maddeyle yakalarsınız?

Beklenen akıl yürütme şudur: Client-side routing kullanan SPA’larda kullanıcı doğrudan alt route’a gittiğinde hosting servisinin isteği `index.html` dosyasına yönlendirmesi gerekir. Aksi hâlde sunucu gerçek dosya arar ve bulamaz. Bu, React kodundan çok hosting yönlendirme ayarıyla ilgilidir.

## Bölüm özeti ve terim sözlüğü

Bu bölümde KampüsHub projesinin final uygulama olarak nasıl tamamlanacağını ele aldık. Route haritası, uygulama kabuğu, form yönetimi, API sınırı, Redux Toolkit, Zustand, test ve dağıtım kontrolleri tek bir bütün içinde ilişkilendirildi. Final projenin yalnızca çalışan bir arayüz değil, belgelenmiş, test yaklaşımı olan ve dağıtıma hazırlanmış bir teslim paketi olması gerektiği vurgulandı.

| Terim | Açıklama |
|---|---|
| Application shell | Uygulamanın genel layout ve sağlayıcı iskeleti |
| Route coverage | Beklenen route’ların uygulamada tanımlı olup olmadığını kontrol etme |
| State ownership | Bir verinin hangi state katmanında tutulacağını belirleme |
| API boundary | UI ile sunucu arasındaki istemci fonksiyon sınırı |
| Release gate | Dağıtım öncesi geçilmesi gereken kalite kontrol seti |
| Smoke test | Temel kritik akışların hızlı kontrolü |
| Backlog | Gelecekte yapılacak geliştirme ve düzeltme listesi |

## Kavramsal sorular

1. KampüsHub final mimarisinde `pages`, `features` ve `shared` ayrımı neden yararlıdır?
2. Form state ile global state arasındaki temel fark nedir?
3. Tema tercihi için Redux Toolkit yerine Zustand kullanmak hangi koşullarda daha sade bir çözüm olabilir?
4. Route kapsamı neden final teslim kontrol listesine eklenmelidir?
5. API hatalarının yalnızca konsola yazılması neden yeterli değildir?
6. `vite build` başarılı olduğu hâlde üretim ortamında hangi sorunlar devam edebilir?
7. SPA routing kullanan uygulamalarda hosting fallback ayarı neden önemlidir?
8. Final proje raporunda “bilinen eksikler” bölümünün yer alması akademik değerlendirme açısından neden değerlidir?

## Programlama alıştırmaları

1. KampüsHub için en az sekiz route içeren bir route kapsam dizisi oluşturun. Eksik route’ları bulan saf JavaScript fonksiyonu yazın.
2. `noteForm`, `theme`, `notifications`, `currentRoute`, `announcements` verileri için state sahipliği tablosu üretin.
3. Final release gate için `routes`, `forms`, `api`, `tests`, `a11y`, `build`, `preview` kontrollerini içeren bir dizi oluşturun. Başarısız maddeleri ekrana yazdırın.
4. Dashboard ana sayfası için duyuru, etkinlik ve not sayılarını özetleyen bir yardımcı fonksiyon yazın.
5. `.env.production` içinde bulunması gereken herkese açık değişkenleri doğrulayan küçük bir fonksiyon geliştirin.
6. KampüsHub final README dosyası için kurulum, geliştirme, test, build ve preview komutlarını içeren bir taslak oluşturun.

## Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub final teslim paketini hazırlamaktır.

### Görev adımları

1. Route tablosunu tamamlayın.
2. Ana sayfa, duyurular, etkinlikler, not paylaşımı, profil, ayarlar ve 404 sayfalarını bağlayın.
3. En az bir form akışını doğrulama ve gönderim davranışıyla tamamlayın.
4. API veri akışı için loading, error ve success durumlarını görünür hâle getirin.
5. Global bildirim veya hata yönetimi için Redux Toolkit kullanımını gösterin.
6. Tema veya kompakt görünüm tercihi için Zustand kullanımını gösterin.
7. En az üç kritik saf fonksiyon veya bileşen davranışı için test planı yazın.
8. `vite build` ve preview kontrolünü belgeleyin.
9. Final release checklist hazırlayın.
10. Kısa teknik rapor ve ekran görüntülerini teslim paketine ekleyin.

### Değerlendirme rubriği

| Ölçüt | Puan |
|---|---:|
| Route ve sayfa bütünlüğü | 15 |
| Bileşen mimarisi ve klasör düzeni | 10 |
| Form ve doğrulama akışı | 10 |
| API durum yönetimi | 10 |
| Global state ve tercih state’i ayrımı | 10 |
| Test ve kalite kontrol planı | 15 |
| Build/preview/dağıtım hazırlığı | 10 |
| Erişilebilirlik ve kullanıcı deneyimi | 10 |
| Teknik rapor ve ekran görüntüleri | 10 |
| **Toplam** | **100** |

## İleri okuma ve kitap kapanışı

Bu kitapta React ile modern front-end uygulama geliştirmeye giriş yaptık. KampüsHub projesi, öğrencinin tek tek kavramları öğrenmesini ve bu kavramları kümülatif bir uygulamada birleştirmesini amaçladı. Kitabın sonunda elde edilen yapı, gerçek dünyadaki tüm karmaşık ihtiyaçları çözmez; fakat sürdürülebilir React uygulaması geliştirmek için gerekli temel düşünme biçimini kazandırır.

Bundan sonraki doğal ilerleme adımları şunlar olabilir:

- TypeScript ile tip güvenliği
- Daha gelişmiş TanStack Query kullanımı
- Kimlik doğrulama ve yetkilendirme
- Backend servis geliştirme
- CI/CD süreçleri
- Erişilebilirlik denetim araçları
- Gelişmiş test stratejileri
- Next.js veya benzeri framework yaklaşımları

KampüsHub finali, yeni bir başlangıç noktasıdır. Öğrenci artık yalnızca React bileşeni yazmayı değil, bir uygulamayı planlamayı, parçalara ayırmayı, test etmeyi ve teslim etmeyi öğrenmiştir.


