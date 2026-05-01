---
title: "Bölüm 10: React Router ile Sayfa Yönetimi"
chapter_id: "chapter_10"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
year: "2026"
status: "draft"
---

# Bölüm 10: React Router ile Sayfa Yönetimi

## 10.1 Bölümün yol haritası

Bu bölümde KampüsHub uygulaması, tek ekranlı örnekler toplamı olmaktan çıkarılıp sayfa mantığına sahip bir React uygulamasına dönüştürülür. Önce sayfa yönetiminin neden gerekli olduğu açıklanacak, ardından SPA yaklaşımı ile klasik çok sayfalı uygulama modeli karşılaştırılacaktır. Daha sonra React Router’ın tarayıcı URL’si, React bileşen ağacı ve kullanıcı gezinmesi arasındaki ilişkiyi nasıl düzenlediği ele alınacaktır.

Bölümün uygulama ekseni KampüsHub’dır. Ana sayfa, duyurular, etkinlikler, not paylaşımı, profil, duyuru detayı ve bulunamayan sayfa senaryoları için bir route haritası kurulacaktır. Bu harita, ilerleyen bölümlerde form yönetimi, global state, API entegrasyonu ve dağıtım adımlarında kullanılacak ana iskeleti oluşturur.

Bu bölümde öğrenilecek temel yapı taşları şunlardır: `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, dinamik route segmentleri, query string düşüncesi, nested route farkındalığı, protected route fikri ve 404 / NotFound yaklaşımı. İleri veri yükleme, sunucu taraflı render ve büyük ölçekli yetkilendirme ayrıntıları bu bölümün ana konusu değildir.

## 10.2 Bölümün konumu

Önceki bölümlerde React uygulamasının temel yapı taşları adım adım kuruldu. JSX ile arayüz tanımlandı, props ile bileşenler arası veri akışı sağlandı, state ile değişen veri yönetildi, `useEffect` ile yan etkiler ele alındı, ileri Hook’lar ve özel Hook’lar ile tekrar eden mantıklar ayrıştırıldı. Bu noktaya kadar KampüsHub daha çok tek bir ekran üzerinde büyüyen bir uygulama gibi düşünüldü.

Gerçek bir web uygulamasında kullanıcı yalnızca tek bir panelle etkileşmez. Duyurulara bakar, bir etkinliği inceler, not paylaşımına geçer, profilini düzenlemek ister ve yanlış bir adrese gittiğinde anlamlı bir geri bildirim bekler. Bu nedenle route tasarımı, arayüz mimarisinin temel parçalarından biridir. Route tasarımı iyi yapılmadığında bileşenler büyür, menü davranışı karmaşıklaşır, geri/ileri tarayıcı düğmeleri beklenmedik çalışır ve kullanıcı hangi ekranda olduğunu anlamakta zorlanır.

Bölüm 10, Bölüm 11’deki form yönetimi için de hazırlık sağlar. Örneğin profil sayfası ileride formlar içerecek, duyuru detayı sayfası ileride URL parametresine göre veri gösterecek, not paylaşımı sayfası ise API ve global state konularıyla ilişkilenecektir. Bu bölümde route iskeleti doğru kurulduğunda sonraki geliştirmeler daha düzenli ilerler.

## 10.3 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

1. SPA, klasik çok sayfalı uygulama ve client-side routing kavramlarını ayırt eder.
2. React Router’ın React uygulamasında neden gerekli olduğunu açıklar.
3. `BrowserRouter`, `Routes`, `Route`, `Link` ve `NavLink` yapılarını temel düzeyde kullanır.
4. KampüsHub için ana route haritası tasarlar.
5. Navbar içinde aktif bağlantı durumunu kullanıcıya anlaşılır biçimde gösterir.
6. `/announcements/:announcementId` gibi dinamik route segmentlerinin amacını açıklar.
7. Bilinmeyen route için 404 / NotFound sayfası oluşturur.
8. Query string, nested route, protected route ve lazy loading kavramlarını ileri ayrıntıya girmeden tanır.
9. Route yardımcı fonksiyonlarını saf JavaScript çekirdeği olarak test edilebilir biçimde yazar.
10. Route tasarımını props, state, `useEffect` ve özel Hook’larla ilişkilendirir.

## 10.4 Ön bilgi

Bu bölümü izleyebilmek için öğrencinin modern web uygulamalarının temel çalışma modelini hatırlaması gerekir. Modern web uygulamalarında tarayıcı, HTML, CSS ve JavaScript dosyalarını yükler; React ise arayüzü bileşenlerden oluşan bir ağaç olarak üretir. KampüsHub gibi bir SPA uygulamasında sayfa değişimi her zaman sunucudan yeni bir HTML belgesi almak anlamına gelmez. Bunun yerine URL değişir, React Router bu URL’yi okur ve uygun bileşeni ekrana getirir.

Vite ile oluşturulan bir React projesinde `package.json`, bağımlılıkları ve komutları taşır; `index.html`, geliştirme ve üretim sürecinde giriş belgesi rolünü üstlenir; `main.jsx`, React uygulamasını tarayıcıdaki kök elemana bağlar; `App.jsx`, uygulamanın ana bileşen düzenini temsil eder. Başlangıçta kullanılan komut akışı hâlâ geçerlidir: `npm create vite@latest` ile proje oluşturulur, `npm install` ile bağımlılıklar kurulur ve `npm run dev` ile geliştirme sunucusu başlatılır. Vite geliştirme ortamında HMR desteği sayesinde birçok değişiklik tarayıcıyı tamamen yenilemeden görülebilir.

Bu bölümde Node.js ve npm yalnızca geliştirme aracının çalışma zemini olarak kullanılır. React DevTools ise route değiştiğinde hangi bileşenlerin render edildiğini gözlemlemek için yararlıdır. Öğrencinin bileşen, props, state ve özel Hook bilgisi bu bölümde tekrar kullanılacaktır. Örneğin Navbar bileşeni props alabilir, aktif menü görünümü state yerine URL’den türetilebilir, duyuru detayı sayfası ileride `useEffect` veya özel Hook yardımıyla veri çekebilir.

## 10.5 Sayfa yönetimi neden gerekir?

Küçük bir örnek uygulamada tüm içerik tek bir `App` bileşeninde gösterilebilir. Ancak KampüsHub büyüdükçe bu yaklaşım sürdürülebilir olmaktan çıkar. Ana sayfada özet kartları, duyurular sayfasında filtrelenebilir liste, etkinlikler sayfasında takvim benzeri görünüm, not paylaşımı sayfasında içerik akışı ve profil sayfasında kullanıcı bilgileri bulunacaktır. Bu ekranların hepsini tek bileşende koşullu olarak göstermek kodun okunabilirliğini azaltır.

Sayfa yönetimi üç temel ihtiyaca cevap verir. Birincisi, her ekranın anlamlı bir URL’ye sahip olmasıdır. Kullanıcı `/events` adresine gittiğinde etkinlikler sayfasını görmelidir. İkincisi, tarayıcının geri ve ileri düğmelerinin beklenen şekilde çalışmasıdır. Üçüncüsü, uygulama içindeki bağlantıların erişilebilir ve paylaşılabilir olmasıdır. Bir duyuru detayı yalnızca bellekte tutulan geçici bir seçim olmamalı; `/announcements/42` gibi doğrudan açılabilen bir adresle temsil edilebilmelidir.

Route tasarımı aynı zamanda ekip içi geliştirme için de düzen sağlar. Bir geliştirici `src/pages/AnnouncementsPage.jsx` üzerinde çalışırken başka bir geliştirici `src/pages/ProfilePage.jsx` üzerinde çalışabilir. Ortak Navbar, sayfa düzeni ve route haritası ise uygulamanın bütünlüğünü korur.

## 10.6 Tek sayfa uygulama mantığı

SPA, yani tek sayfa uygulama, kullanıcının uygulama içinde gezinirken çoğu durumda yeni bir tam HTML belgesi yüklemediği uygulama modelidir. İlk yüklemede temel HTML belgesi, JavaScript paketleri ve stil dosyaları gelir. Daha sonra kullanıcı bağlantılara tıkladığında React uygulaması URL değişimini yakalar ve ilgili bileşeni ekrana yerleştirir.

Klasik çok sayfalı uygulamada `/events` adresine gidildiğinde sunucu genellikle yeni bir HTML belgesi üretir veya gönderir. SPA modelinde ise tarayıcıdaki React uygulaması aynı kalır; yalnızca gösterilen bileşen değişir. Bu yaklaşım hızlı ve akıcı bir kullanıcı deneyimi sağlayabilir, fakat doğru route yönetimi yapılmazsa erişilebilirlik, geri düğmesi davranışı ve bulunamayan sayfa yönetimi sorunlu hâle gelebilir.

React Router bu noktada devreye girer. Görevi yalnızca “menüye tıklayınca bileşen değiştirmek” değildir. Daha doğru ifade şudur: React Router, URL ile React bileşen ağacı arasında tutarlı bir eşleme kurar. Bu sayede kullanıcı URL yazarak sayfaya gidebilir, bağlantı paylaşabilir, geri düğmesini kullanabilir ve aktif sayfa bilgisi arayüzde gösterilebilir.

## 10.7 React Router’a kavramsal giriş

React Router, React uygulamalarında istemci taraflı yönlendirme için kullanılan temel kütüphanelerden biridir. Bu kitapta başlangıç düzeyi ve Vite tabanlı KampüsHub projesi için React Router v7 Declarative Mode yaklaşımı esas alınır. Bu yaklaşımda route’lar JSX içinde `Routes` ve `Route` bileşenleriyle tanımlanır. Resmî dokümantasyonda Declarative Mode’un temel routing, gezinme ve aktif durum ihtiyaçları için uygun olduğu belirtilir; `Link`, `NavLink`, `useNavigate` ve `useLocation` gibi API’ler bu modda kullanılabilir.

Declarative Mode, öğrencinin bileşen düşüncesinden kopmadan route kavramını öğrenmesini sağlar. `BrowserRouter`, tarayıcının History API davranışını kullanarak URL değişimlerini React uygulamasına bağlar. `Routes`, mevcut URL’ye en uygun `Route` tanımını seçer. `Route`, belirli bir path ile belirli bir React elementini eşleştirir. `Link`, sayfa yenilemeden uygulama içinde gezinmeyi sağlar. `NavLink`, `Link` davranışına ek olarak aktif bağlantı durumunu yönetmeyi kolaylaştırır.

Bu bölümde React Router’ın veri yükleme, route modülü, framework entegrasyonu veya sunucu taraflı özellikleri ana akışa alınmaz. KampüsHub için hedef, öğrencinin sayfa iskeletini güvenli ve anlaşılır biçimde kurabilmesidir.

## 10.8 BrowserRouter, Routes ve Route

React Router ile en temel kurulum, uygulamayı `BrowserRouter` içine almak ve `Routes` içinde path-element eşleşmelerini tanımlamaktır. KampüsHub için yalın bir route yapısı şu şekilde düşünülebilir:

```jsx
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AnnouncementDetailPage from "./pages/AnnouncementDetailPage";
import EventsPage from "./pages/EventsPage";
import NotesPage from "./pages/NotesPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/:announcementId" element={<AnnouncementDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Bu kodda `/` ana sayfayı, `/announcements` duyurular listesini, `/announcements/:announcementId` ise tekil duyuru detayına hazırlık route’unu temsil eder. `*` path’i, bilinen route’larla eşleşmeyen adresler için kullanılır. Gerçek projede çoğu zaman ortak Header ve Navbar bileşeni bir layout içinde tutulur. Başlangıç için önemli olan, route haritasını tek bir yerde okunabilir biçimde görebilmektir.

Aşağıdaki örnek, KampüsHub route listesini saf JavaScript dizisi olarak temsil eder. Bu tür bir çekirdek, otomatik test hattında çalıştırılabilir ve route haritasının beklenen sayıda öğe içerdiğini doğrular.

<!-- CODE_META
id: react_ch10_code01
chapter_id: chapter_10
language: javascript
kind: example
title: "KampüsHub route listesini doğrulama"
file: "react_ch10_code01_routes.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "routeCount=6"
  - "detailRoute=/announcements/:announcementId"
  - "hasProfile=true"
timeout_sec: 5
-->
```javascript
const campusRoutes = [
  { path: "/", label: "Ana Sayfa", page: "HomePage" },
  { path: "/announcements", label: "Duyurular", page: "AnnouncementsPage" },
  { path: "/announcements/:announcementId", label: "Duyuru Detayı", page: "AnnouncementDetailPage" },
  { path: "/events", label: "Etkinlikler", page: "EventsPage" },
  { path: "/notes", label: "Not Paylaşımı", page: "NotesPage" },
  { path: "/profile", label: "Profil", page: "ProfilePage" }
];

const detailRoute = campusRoutes.find((route) => route.path.includes(":"));
const hasProfile = campusRoutes.some((route) => route.path === "/profile");

console.log(`routeCount=${campusRoutes.length};detailRoute=${detailRoute.path};hasProfile=${hasProfile}`);
```

## 10.9 KampüsHub sayfa haritası

KampüsHub için başlangıç route haritası aşağıdaki gibi düzenlenebilir:

| URL | Sayfa bileşeni | Kullanıcı amacı |
|---|---|---|
| `/` | `HomePage` | Kampüs özetini ve hızlı erişim kartlarını görmek |
| `/announcements` | `AnnouncementsPage` | Ders ve bölüm duyurularını listelemek |
| `/announcements/:announcementId` | `AnnouncementDetailPage` | Tekil duyuru detayına hazırlanmak |
| `/events` | `EventsPage` | Kampüs etkinliklerini görmek |
| `/notes` | `NotesPage` | Not paylaşımı alanına erişmek |
| `/profile` | `ProfilePage` | Kullanıcı bilgilerini ve tercihlerini görmek |
| `*` | `NotFoundPage` | Bilinmeyen adreste anlamlı geri bildirim almak |

Bu harita yalnızca teknik bir liste değildir. Aynı zamanda uygulamanın bilgi mimarisidir. Kullanıcı hangi içerik için hangi adrese gideceğini öğrenir; geliştirici hangi sayfanın hangi sorumluluğu taşıdığını görür. İyi bir route haritası, bileşenlerin adlandırmasını ve klasör yapısını da sadeleştirir.

### Link ve NavLink ile gezinme

Uygulama içinde gezinmek için klasik `<a href="...">` kullanımı her zaman ideal değildir. Çünkü bu yaklaşım çoğu durumda tarayıcının tam sayfa yenilemesine gitmesine neden olur. React Router’da `Link`, uygulama içinde sayfa yenilemeden gezinmeyi sağlar. `NavLink` ise buna ek olarak bağlantının aktif olup olmadığını anlamayı kolaylaştırır.

```jsx
import { NavLink } from "react-router";

const navItems = [
  { to: "/", label: "Ana Sayfa", end: true },
  { to: "/announcements", label: "Duyurular" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/notes", label: "Notlar" },
  { to: "/profile", label: "Profil" }
];

export default function Navbar() {
  return (
    <nav aria-label="Ana gezinme">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
```

`NavLink` aktif olduğunda erişilebilirlik açısından `aria-current="page"` davranışını da destekler. Bu, yalnızca görsel sınıf eklemekten daha önemlidir; ekran okuyucu kullanan bir kullanıcı da hangi sayfada olduğunu anlayabilir.

Aşağıdaki test edilebilir örnek, `NavLink` aktiflik mantığını saf JavaScript fonksiyonu ile sadeleştirir.

<!-- CODE_META
id: react_ch10_code02
chapter_id: chapter_10
language: javascript
kind: example
title: "NavLink aktiflik mantığını simüle etme"
file: "react_ch10_code02_navlink_active.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "active=announcements"
  - "home=false"
  - "profile=false"
timeout_sec: 5
-->
```javascript
function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function isRouteActive(currentPath, targetPath, options = {}) {
  const current = normalizePath(currentPath);
  const target = normalizePath(targetPath);

  if (options.end) {
    return current === target;
  }

  return current === target || current.startsWith(`${target}/`);
}

const currentPath = "/announcements/42";
const active = isRouteActive(currentPath, "/announcements") ? "announcements" : "none";

console.log(
  `active=${active};home=${isRouteActive(currentPath, "/", { end: true })};profile=${isRouteActive(currentPath, "/profile")}`
);
```

### Dinamik route parametrelerine giriş

Bazı sayfalar tek bir sabit adresten oluşmaz. Örneğin KampüsHub duyurular sayfası `/announcements` adresindedir; ancak tekil bir duyurunun detayına gitmek için `/announcements/42` gibi bir adrese ihtiyaç duyulabilir. Buradaki `42`, duyurunun kimliğini temsil eder. React Router’da bu tür değişken parçalar `:announcementId` gibi dinamik segmentlerle ifade edilir.

```jsx
import { useParams } from "react-router";

export default function AnnouncementDetailPage() {
  const { announcementId } = useParams();

  return (
    <main>
      <h2>Duyuru Detayı</h2>
      <p>Görüntülenen duyuru kimliği: {announcementId}</p>
    </main>
  );
}
```

Bu bölümde henüz gerçek API çağrısı yapılmaz. Ancak ilerleyen bölümlerde `announcementId` değeri, ilgili duyurunun verisini almak için kullanılacaktır. Şimdilik amaç, URL’nin yalnızca gezinme adresi değil, aynı zamanda anlamlı veri taşıyabilen bir yapı olduğunu fark etmektir.

<!-- CODE_META
id: react_ch10_code03
chapter_id: chapter_10
language: javascript
kind: example
title: "Dinamik duyuru route parametresini ayrıştırma"
file: "react_ch10_code03_dynamic_param.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "announcementId=42"
  - "matched=true"
timeout_sec: 5
-->
```javascript
function extractAnnouncementId(path) {
  const match = path.match(/^\/announcements\/([^/]+)$/);
  if (!match) {
    return { matched: false, announcementId: null };
  }
  return { matched: true, announcementId: decodeURIComponent(match[1]) };
}

const result = extractAnnouncementId("/announcements/42");
console.log(`matched=${result.matched};announcementId=${result.announcementId}`);
```

### Query string, nested route ve protected route farkındalığı

Route path’i, sayfanın ana adresini belirtir. Query string ise çoğu zaman aynı sayfa içindeki filtre, arama veya görünüm tercihlerini taşır. Örneğin `/announcements?category=exam` adresi hâlâ duyurular sayfasıdır; ancak kategori filtresi sınav duyuruları olarak yorumlanabilir. Bu bölümde query string yalnızca kavramsal hazırlık düzeyinde ele alınır.

Nested route, bir sayfanın içinde alt sayfaların yer almasıdır. Örneğin ileride profil sayfası içinde `/profile/preferences` ve `/profile/security` gibi alt route’lar tanımlanabilir. Protected route ise her kullanıcının her sayfaya erişmemesi gerektiği durumlarda kullanılır. KampüsHub’da profil sayfası ileride oturum açmış kullanıcıya özel hâle gelebilir. Bu bölümde bu kavramlar yalnızca yönlendirme tasarımına hazırlık olarak görülmelidir.

<!-- CODE_META
id: react_ch10_code06
chapter_id: chapter_10
language: javascript
kind: example
title: "Query string ve route erişim kararını modelleme"
file: "react_ch10_code06_query_access.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "category=exam"
  - "profileAccess=redirect:/login"
  - "notesAccess=allow"
timeout_sec: 5
-->
```javascript
function readCategoryFromUrl(url) {
  const parsedUrl = new URL(url, "https://kampushub.example");
  return parsedUrl.searchParams.get("category") ?? "all";
}

function decideRouteAccess(route, user) {
  const protectedRoutes = ["/profile"];
  if (protectedRoutes.includes(route) && !user.isAuthenticated) {
    return "redirect:/login";
  }
  return "allow";
}

const category = readCategoryFromUrl("/announcements?category=exam");
const profileAccess = decideRouteAccess("/profile", { isAuthenticated: false });
const notesAccess = decideRouteAccess("/notes", { isAuthenticated: false });

console.log(`category=${category};profileAccess=${profileAccess};notesAccess=${notesAccess}`);
```

### 404 sayfası ve güvenli yönlendirme düşüncesi

Kullanıcı yanlış bir adres yazabilir, eski bir bağlantıya tıklayabilir veya uygulamada henüz bulunmayan bir sayfaya gitmek isteyebilir. Bu durumda boş ekran göstermek kötü bir deneyimdir. Kullanıcıya sayfanın bulunamadığı açıkça söylenmeli ve güvenli bir dönüş yolu sunulmalıdır.

`NotFoundPage`, genellikle kısa bir açıklama, ana sayfaya dönüş bağlantısı ve gerekirse arama/yardım yönlendirmesi içerir. Bu sayfa, uygulamanın hata durumlarında da kullanıcıyla iletişimini sürdürmesini sağlar.

<!-- CODE_META
id: react_ch10_code04
chapter_id: chapter_10
language: javascript
kind: example
title: "Bilinmeyen route için NotFound eşleştirmesi"
file: "react_ch10_code04_not_found_match.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "known=EventsPage"
  - "unknown=NotFoundPage"
timeout_sec: 5
-->
```javascript
const routeTable = new Map([
  ["/", "HomePage"],
  ["/announcements", "AnnouncementsPage"],
  ["/events", "EventsPage"],
  ["/notes", "NotesPage"],
  ["/profile", "ProfilePage"]
]);

function resolvePage(path) {
  if (/^\/announcements\/[^/]+$/.test(path)) {
    return "AnnouncementDetailPage";
  }
  return routeTable.get(path) ?? "NotFoundPage";
}

console.log(`known=${resolvePage("/events")};unknown=${resolvePage("/clubs")}`);
```

### Programatik ekran çıktısı planı

Aşağıdaki ekran görüntüleri, bölümün programatik screenshot hattı için planlanmıştır.

<!-- SCREENSHOT_META
id: b10_01_kampushub_ana_sayfa_router
chapter: chapter_10
figure: "Şekil 10.1"
title: "KampüsHub ana sayfa route görünümü"
route: "/__book__/chapter-10/kampushub-ana-sayfa-router"
waitFor: "[data-book-shot='b10_01_kampushub_ana_sayfa_router']"
actions: []
output: "assets/auto/chapter_10/b10_01_kampushub_ana_sayfa_router.png"
caption: "KampüsHub uygulamasında React Router ile oluşturulan ana sayfa route görünümü."
markdownTarget: "[SCREENSHOT:b10_01_kampushub_ana_sayfa_router]"
-->

[SCREENSHOT:b10_01_kampushub_ana_sayfa_router]

<!-- SCREENSHOT_META
id: b10_02_aktif_navlink_gorunumu
chapter: chapter_10
figure: "Şekil 10.2"
title: "Aktif NavLink görünümü"
route: "/__book__/chapter-10/aktif-navlink-gorunumu"
waitFor: "[data-book-shot='b10_02_aktif_navlink_gorunumu']"
actions: []
output: "assets/auto/chapter_10/b10_02_aktif_navlink_gorunumu.png"
caption: "KampüsHub Navbar bileşeninde aktif sayfanın NavLink ile vurgulanması."
markdownTarget: "[SCREENSHOT:b10_02_aktif_navlink_gorunumu]"
-->

[SCREENSHOT:b10_02_aktif_navlink_gorunumu]

<!-- SCREENSHOT_META
id: b10_03_notfound_sayfasi
chapter: chapter_10
figure: "Şekil 10.3"
title: "NotFound sayfası"
route: "/__book__/chapter-10/notfound-sayfasi"
waitFor: "[data-book-shot='b10_03_notfound_sayfasi']"
actions: []
output: "assets/auto/chapter_10/b10_03_notfound_sayfasi.png"
caption: "Bilinmeyen route için kullanıcıya açıklama ve ana sayfaya dönüş bağlantısı sunan NotFound görünümü."
markdownTarget: "[SCREENSHOT:b10_03_notfound_sayfasi]"
-->

[SCREENSHOT:b10_03_notfound_sayfasi]

### CODE_META ve test edilebilir kod örnekleri

Bu bölümdeki CODE_META örnekleri, React Router kavramlarını saf JavaScript çekirdekleri üzerinden test edilebilir hâle getirir. Gerçek uygulamada bu çekirdekler React bileşenleri ve özel Hook’larla birleştirilebilir. Örneğin route başlığı üretme fonksiyonu Navbar, sayfa başlığı veya breadcrumb bileşenlerinde kullanılabilir.

<!-- CODE_META
id: react_ch10_code05
chapter_id: chapter_10
language: javascript
kind: example
title: "KampüsHub sayfa başlığı üretme"
file: "react_ch10_code05_page_title.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "notesTitle=Not Paylaşımı"
  - "detailTitle=Duyuru Detayı"
  - "unknownTitle=Sayfa Bulunamadı"
timeout_sec: 5
-->
```javascript
function getPageTitle(path) {
  const cleanPath = path.split("?")[0];
  const titles = {
    "/": "Ana Sayfa",
    "/announcements": "Duyurular",
    "/events": "Etkinlikler",
    "/notes": "Not Paylaşımı",
    "/profile": "Profil"
  };

  if (/^\/announcements\/[^/]+$/.test(cleanPath)) {
    return "Duyuru Detayı";
  }

  return titles[cleanPath] ?? "Sayfa Bulunamadı";
}

console.log(
  `notesTitle=${getPageTitle("/notes?tag=react")};detailTitle=${getPageTitle("/announcements/42")};unknownTitle=${getPageTitle("/missing")}`
);
```

## 10.10 Sık yapılan hatalar ve yanlış sezgiler

React Router öğrenirken sık karşılaşılan ilk hata, uygulama içi gezinmede gereksiz yere klasik bağlantı kullanmaktır. Klasik bağlantı bazı durumlarda bilinçli tercih edilebilir; ancak KampüsHub içindeki sayfa geçişlerinde `Link` veya `NavLink` kullanmak daha doğru bir başlangıçtır. Böylece React uygulaması gereksiz yere yeniden başlatılmaz.

İkinci hata, aktif menü bilgisini ayrı bir state olarak tutmaktır. Çoğu durumda aktif sayfa bilgisi URL’den türetilebilir. Eğer kullanıcı `/events` adresindeyse etkinlikler bağlantısı aktiftir. Bu bilgiyi ayrıca state içinde saklamak, URL ile arayüzün çelişmesine yol açabilir.

Üçüncü hata, 404 sayfasını ihmal etmektir. Bilinmeyen route’larda boş ekran göstermek, hem kullanıcı deneyimini hem de hata ayıklamayı zorlaştırır. NotFound sayfası, küçük projelerde bile temel kalite göstergesidir.

Dördüncü hata, dinamik route parametresini doğrulanmış veri sanmaktır. `/announcements/abc` gibi bir adres teknik olarak parametre üretebilir; ancak bu değerin gerçek bir duyuruya karşılık gelip gelmediği ayrıca kontrol edilmelidir. Bu kontrol ileride API entegrasyonu bölümünde daha ayrıntılı ele alınacaktır.

Beşinci hata, route yapısını çok erken karmaşıklaştırmaktır. Nested route, protected route ve lazy loading yararlı kavramlardır; ancak başlangıçta basit route haritasını doğru kurmak daha önemlidir.

## 10.11 Hata ayıklama egzersizi

Aşağıdaki problem senaryosunu inceleyin:

```jsx
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
```

Bu kodda `Routes` ve `Route` kullanılmıştır; ancak uygulama `BrowserRouter` ile sarılmamıştır. Bu nedenle React Router bağlamı eksik kalır. Düzeltme için `main.jsx` veya `App.jsx` içinde üst düzeyde `BrowserRouter` kullanılmalıdır.

Düzeltilmiş yaklaşım:

```jsx
import { BrowserRouter } from "react-router";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Başka bir hata senaryosu da aktif menü sınıfını elle üretirken `/` adresini her sayfada aktif saymaktır. Ana sayfa bağlantısı için `end` mantığı kullanılmadığında `/announcements` adresi de `/` ile başladığı için ana sayfa yanlışlıkla aktif görünebilir. Bu nedenle ana sayfa bağlantısı özel dikkat ister.

## 10.12 Bölüm özeti ve terim sözlüğü

Bu bölümde KampüsHub uygulamasına sayfa yönetimi bakışı kazandırıldı. SPA mantığı, klasik çok sayfalı uygulama yaklaşımıyla karşılaştırıldı. React Router’ın URL ile bileşen ağacı arasında eşleme kurduğu açıklandı. `BrowserRouter`, `Routes`, `Route`, `Link` ve `NavLink` yapıları temel düzeyde ele alındı. KampüsHub için ana sayfa, duyurular, etkinlikler, not paylaşımı, profil, duyuru detayı ve NotFound sayfasından oluşan bir route haritası kuruldu.

Terim sözlüğü:

| Terim | Açıklama |
|---|---|
| SPA | İlk yüklemeden sonra birçok gezinme işlemini tarayıcıdaki uygulama içinde yöneten tek sayfa uygulama modeli. |
| Route | Belirli bir URL deseni ile belirli bir arayüz bileşeni arasındaki eşleme. |
| `BrowserRouter` | Tarayıcı URL geçmişi ile React Router bağlamını ilişkilendiren üst düzey router bileşeni. |
| `Routes` | Mevcut URL’ye uygun route’u seçen kapsayıcı bileşen. |
| `Route` | Bir path ile bir React elementini eşleştiren tanım. |
| `Link` | Uygulama içinde sayfa yenilemeden gezinme sağlayan bağlantı bileşeni. |
| `NavLink` | Aktif bağlantı durumunu yönetmeyi kolaylaştıran bağlantı bileşeni. |
| Dinamik segment | URL içinde `:announcementId` gibi değişken değer taşıyan route parçası. |
| Query string | URL’de `?category=exam` gibi ek filtre veya görünüm bilgisi taşıyan bölüm. |
| NotFound | Bilinmeyen route’larda gösterilen sayfa bulunamadı görünümü. |

## 10.13 Kavramsal sorular

1. SPA ile klasik çok sayfalı uygulama arasında kullanıcı deneyimi açısından hangi farklar vardır?
2. React Router yalnızca bileşen değiştiren bir yardımcı yapı olarak görülürse hangi eksik anlaşılmalar ortaya çıkar?
3. `Link` ve `NavLink` arasındaki temel fark nedir?
4. Ana sayfa bağlantısında aktiflik kontrolü neden özel dikkat gerektirir?
5. `/announcements/:announcementId` route’unda `announcementId` değeri hangi amaçlarla kullanılabilir?
6. NotFound sayfası neden yalnızca teknik değil, pedagojik ve kullanıcı deneyimi açısından da önemlidir?
7. Query string ile dinamik route parametresi arasındaki farkı KampüsHub örneği üzerinden açıklayın.
8. Profil sayfası neden ileride protected route adayı olabilir?
9. Route haritası ile klasör yapısı arasında nasıl bir ilişki kurulmalıdır?
10. Route tasarımı, Bölüm 11’deki form yönetimine nasıl zemin hazırlar?

## 10.14 Programlama alıştırmaları

1. KampüsHub route listesine `/clubs` adresini ekleyin. Bu route için `ClubsPage` bileşen adını önerin ve Navbar’a nasıl ekleneceğini açıklayın.
2. `getPageTitle(path)` fonksiyonunu `/events/:eventId` benzeri bir route’u da destekleyecek biçimde genişletin.
3. `isRouteActive(currentPath, targetPath, options)` fonksiyonunda query string bulunan adresler için temizlik adımı ekleyin.
4. `resolvePage(path)` fonksiyonuna `/profile/preferences` adresi için nested route hazırlığı ekleyin.
5. `decideRouteAccess(route, user)` fonksiyonunu, profil dışındaki `/notes/new` adresini de oturum gerektiren bir route olarak değerlendirecek biçimde genişletin.
6. NotFound sayfası için kullanıcıya ana sayfa, duyurular ve etkinlikler bağlantılarını sunan kısa bir JSX taslağı yazın.
7. Navbar bileşeninde `aria-label` kullanımının ne işe yaradığını açıklayan kısa bir yorum ekleyin.
8. Duyuru detayı sayfasında parametre boş veya geçersiz olduğunda nasıl bir kullanıcı mesajı gösterileceğini tasarlayın.

## 10.15 Haftalık laboratuvar / proje görevi

Bu laboratuvar görevinin amacı, KampüsHub uygulamasına React Router tabanlı sayfa yönetimi eklemektir. Çalışma sonunda uygulama, en az altı temel sayfaya ve bir NotFound görünümüne sahip olmalıdır.

Teslim edilecek dosya iskeleti:

```text
src/main.jsx
src/App.jsx
src/layouts/AppLayout.jsx
src/components/Navbar.jsx
src/pages/HomePage.jsx
src/pages/AnnouncementsPage.jsx
src/pages/AnnouncementDetailPage.jsx
src/pages/EventsPage.jsx
src/pages/NotesPage.jsx
src/pages/ProfilePage.jsx
src/pages/NotFoundPage.jsx
```

Görev adımları:

1. Projede React Router bağımlılığının kurulu olduğundan emin olun.
2. `main.jsx` içinde uygulamayı `BrowserRouter` ile sarın veya bu işlemi `App.jsx` içinde tutarlı biçimde gerçekleştirin.
3. `App.jsx` içinde `Routes` ve `Route` tanımlarını oluşturun.
4. Ortak `AppLayout` bileşeni ile Header, Navbar ve ana içerik alanını düzenleyin.
5. Navbar’da `NavLink` kullanarak aktif sayfa görünümünü oluşturun.
6. `/announcements/:announcementId` için geçici bir detay sayfası hazırlayın.
7. `*` route’u için `NotFoundPage` oluşturun.
8. Tarayıcıda `/`, `/announcements`, `/events`, `/notes`, `/profile`, `/announcements/42` ve bilinmeyen bir adresi test edin.

Değerlendirme ölçütleri:

| Ölçüt | Beklenti |
|---|---|
| Route doğruluğu | Tüm temel URL’ler beklenen sayfayı açar. |
| Navbar | Aktif bağlantı görsel ve anlamsal olarak ayırt edilir. |
| NotFound | Bilinmeyen adreslerde boş ekran yerine açıklayıcı sayfa gösterilir. |
| Bileşen ayrımı | Sayfalar `src/pages` altında okunabilir adlarla tutulur. |
| Erişilebilirlik | Navbar için anlamlı etiket ve bağlantı metinleri kullanılır. |
| Kod sadeliği | İleri konulara gereksiz genişleme yapılmadan temel route iskeleti tamamlanır. |

## 10.16 İleri okuma ve bir sonraki bölüme geçiş

Bu bölümden sonra öğrenci, KampüsHub uygulamasında sayfalar arasında gezinebilen bir iskelete sahip olmalıdır. Bir sonraki bölümde bu sayfalardan özellikle profil, not paylaşımı ve duyuru etkileşimleri üzerinden form yönetimi ele alınacaktır. Formlar, kullanıcıdan veri almanın temel yoludur; ancak formun hangi sayfada yer aldığı, hangi route altında çalıştığı ve kullanıcıyı hangi adıma götürdüğü route tasarımıyla doğrudan ilişkilidir.

İleri okuma için React Router’ın Declarative Mode belgeleri, MDN History API ve MDN URLSearchParams kaynakları incelenebilir. Ancak bu aşamada amaç ileri routing mimarilerini öğrenmek değil, temel sayfa yönetimini doğru kavramaktır.

> **Bir sonraki bölüme geçiş:** Bölüm 11’de KampüsHub içinde kullanıcıdan veri alma, kontrollü form yaklaşımı ve React Hook Form ile daha düzenli form yönetimi ele alınacaktır. Route iskeleti artık hazır olduğu için form örnekleri ilgili sayfalar üzerinde daha gerçekçi biçimde geliştirilecektir.
