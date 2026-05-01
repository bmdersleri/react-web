---
title: "Bölüm 8: İleri Hooks — useRef, useContext, useMemo, useCallback"
chapter_id: "chapter_08"
content_language: "tr-TR"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
numbering_policy: "manual_visible_for_current_pipeline"
automation_profile: "parametric_computer_book_factory_v2_0"
code_policy: "CODE_META blocks precede executable JavaScript fences"
screenshot_policy: "SCREENSHOT_META plus [SCREENSHOT:*] markers"
---

# Bölüm 8: İleri Hooks — useRef, useContext, useMemo, useCallback

## 8.1 Bölümün yol haritası

Önceki bölümde React uygulamalarında yan etkilerin `useEffect` ile nasıl yönetildiği incelendi. KampüsHub örneğinde tarayıcı başlığını güncelleme, sahte duyuru verisi yükleme, zamanlayıcı başlatma ve cleanup fonksiyonu ile kaynak temizleme gibi işlemler ele alındı. Böylece render çıktısı ile dış dünya arasındaki ayrım görünür hâle geldi. Bu bölümde ise React’in daha ileri Hook’ları üzerinden bileşenlerin yalnızca state ve effect ile değil, referans, ortak bağlam, türetilmiş veri ve fonksiyon kimliği kavramlarıyla da nasıl düzenlenebileceği açıklanacaktır.

Bu bölümün merkezinde dört Hook bulunur: `useRef`, `useContext`, `useMemo` ve `useCallback`. Bu Hook’lar çoğu zaman “ileri” başlığı altında birlikte anılır; ancak her biri farklı bir probleme yanıt verir. `useRef`, render tetiklemeden kalıcı bir değer tutmak veya DOM elementine erişmek için kullanılır. `useContext`, çok sayıda alt bileşene aynı değeri props zinciriyle taşımadan ulaştırmak için kullanılır. `useMemo`, pahalı hesaplamaları her render’da yeniden yapmamak için seçici biçimde devreye girer. `useCallback` ise özellikle alt bileşenlere fonksiyon geçirildiğinde fonksiyon referansının gereksiz yere değişmesini azaltabilir.

Bölüm boyunca amaç bu Hook’ları ezberletmek değildir. Asıl amaç, öğrencinin şu soruları sistematik biçimde sorabilmesidir:

- Bu değer değiştiğinde ekran yeniden çizilmeli mi, yoksa yalnızca bileşen içinde kalıcı olarak saklanması mı gerekiyor?
- Bu bilgi gerçekten birçok bileşenin ortak ihtiyacı mı, yoksa props ile geçirmek daha açık mı?
- Bu hesaplama gerçekten pahalı mı, yoksa `useMemo` eklemek kodu gereksiz karmaşık mı yapıyor?
- Bu fonksiyonun referans kararlılığı önemli mi, yoksa `useCallback` kullanmadan sade kalmak daha doğru mu?
- KampüsHub’da arama odağı, tema, kullanıcı özeti ve modül filtreleme gibi durumlar hangi Hook ile daha anlaşılır yönetilir?

Bu bölümün sonunda KampüsHub uygulaması, yalnızca state ve effect kullanan temel bir arayüz olmaktan çıkar; arama kutusuna programatik odak verebilen, tema ve kullanıcı bilgisini ortak bağlamda paylaşabilen, filtrelenmiş modül listesini kontrollü hesaplayabilen ve alt bileşenlere daha kararlı olay işleyicileri gönderebilen bir yapıya yaklaşır. Böylece ilerleyen bölümlerde özel hook’lar, sayfa yönetimi, form yönetimi ve global state yönetimi gibi konular için güçlü bir zemin hazırlanır.

## 8.2 Bölümün konumu

Bölüm 1’de modern web, SPA yaklaşımı, React ekosistemi, Node.js, npm, Vite, `npm create vite@latest`, `npm install`, `npm run dev`, HMR, React DevTools, `package.json`, `index.html`, `main.jsx` ve `App.jsx` kavramları üzerinden geliştirme ortamı kuruldu. Bölüm 2’de React kodunu okuyabilmek için gerekli JavaScript ES6+ altyapısı ele alındı. Bölüm 3’te HTML ve CSS bilgisinden bileşen düşüncesine geçildi. Bölüm 4’te JSX ve bileşen anatomisi incelendi. Bölüm 5’te props ile bileşenler arası tek yönlü veri akışı kuruldu. Bölüm 6’da `useState` ile değişen verinin yönetimi öğrenildi. Bölüm 7’de ise `useEffect` ile yan etkiler ve cleanup davranışı açıklığa kavuşturuldu.

Bölüm 8, bu öğrenme zincirinde ara bir derinleşme bölümüdür. Çünkü gerçek bir React uygulamasında her problem `useState` ve `useEffect` ile çözülmez. Bazı değerlerin değişmesi ekranı yeniden üretmeyi gerektirmez. Bazı bilgiler çok sayıda bileşen tarafından ortak kullanılmalıdır. Bazı hesaplamalar büyüyen listelerde tekrarlandığında performans maliyeti doğurabilir. Bazı alt bileşenler ise gereksiz yeniden render durumlarından etkilenebilir. Bu bölüm, öğrencinin bu problemleri erken fark etmesini ve doğru Hook’u doğru gerekçeyle kullanmasını hedefler.

KampüsHub tarafında Bölüm 8’in rolü özellikle önemlidir. Uygulamada artık modül kartları, duyurular, etkinlikler, not paylaşımı ve profil alanı gibi birden çok alt bileşen vardır. Tema, aktif kullanıcı, arama metni, seçili modül ve modül istatistikleri gibi bilgiler bu bileşenler arasında dolaşmaya başlamıştır. Basit bir örnekte bu değerleri tek tek props ile geçirmek anlaşılır olabilir; fakat bileşen ağacı derinleştikçe “prop drilling” adı verilen gereksiz taşıma problemi ortaya çıkabilir. Ayrıca modül listesi büyüdükçe filtreleme ve özet hesaplama gibi işlemler daha dikkatli ele alınmalıdır.

Bu bölümde öğreneceğiniz Hook’lar, ileride Bölüm 9’da özel hook yazma pratiğine doğrudan bağlanacaktır. Çünkü özel hook yazabilmek için önce temel hook’ların hangi problemi çözdüğünü kavramak gerekir. `useRef`, `useContext`, `useMemo` ve `useCallback` bilinmeden yazılan özel hook’lar çoğu zaman gereksiz soyutlamaya dönüşür. Bu nedenle Bölüm 8, ileri konulara geçmeden önce düşünme biçimini güçlendiren bir geçiş basamağıdır.

## 8.3 Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. `useRef` Hook’unun state’ten farkını açıklar.
2. Ref değerinin değişmesinin otomatik render tetiklemediğini yorumlar.
3. DOM elementine odaklanma gibi kontrollü durumlarda `useRef` kullanımını gösterir.
4. `useContext` ile ortak değer paylaşımının temel mantığını açıklar.
5. Prop drilling problemini örnek üzerinden tanır.
6. Context kullanımının her state problemini çözmek için varsayılan araç olmadığını tartışır.
7. `useMemo` ile türetilmiş verinin ne zaman memoize edilebileceğini açıklar.
8. `useCallback` ile fonksiyon referansı kararlılığının alt bileşenler açısından neden anlamlı olabileceğini yorumlar.
9. `useMemo` ve `useCallback` kullanımında aşırı optimizasyon riskini değerlendirir.
10. KampüsHub’da tema, kullanıcı özeti, arama odağı ve filtrelenmiş modül kartları için uygun Hook seçimi yapar.
11. Hook kurallarını ileri Hook örnekleri üzerinde uygular.
12. Bölüm 9’da ele alınacak özel hook tasarımına hazırlık yapar.

Bu çıktılar özellikle kavramsal ayrımı vurgular. Bir React öğrencisi için `useRef`, `useContext`, `useMemo` ve `useCallback` isimlerini bilmek yeterli değildir. Önemli olan, bu Hook’ların ne zaman gereksiz, ne zaman yararlı ve ne zaman yanlış kullanılabileceğini ayırt edebilmektir.

## 8.4 Ön bilgi

Bu bölüme başlamadan önce öğrencinin JSX, bileşen, props, state ve effect kavramlarını kullanabiliyor olması beklenir. Özellikle aşağıdaki örüntüler artık tanıdık olmalıdır:

```jsx
function ModuleCard({ title, description, onSelect }) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onSelect}>Aç</button>
    </article>
  );
}
```

Bu örnekte `ModuleCard` bir fonksiyon bileşenidir. `title`, `description` ve `onSelect` değerleri props olarak alınır. Butona tıklanınca üst bileşenden gelen fonksiyon çağrılır. Önceki bölümlerde bu akış, React’in tek yönlü veri akışını açıklamak için kullanılmıştı. Bölüm 8’de aynı akış daha ileri bir noktaya taşınacaktır: üst bileşenden gelen fonksiyonun referansı her render’da değişirse ne olur, ortak tema bilgisini her karta tek tek geçirmek gerekir mi, arama filtresi değişmediği hâlde filtreleme hesaplamasını tekrar yapmak gerekli midir?

Ayrıca öğrencinin `useEffect` bağımlılık dizisi mantığını temel düzeyde anlaması gerekir. Çünkü `useMemo` ve `useCallback` da bağımlılık dizisi fikrini kullanır. Bir değerin hangi girdilere bağlı olarak yeniden hesaplanacağını belirtmek, React Hook’larının ortak düşünme biçimlerinden biridir. Yanlış bağımlılık dizisi, eski değerle çalışma veya gereksiz yeniden hesaplama gibi sorunlara yol açabilir.

Bu bölümde gerçek React JSX örnekleri verilecektir; ancak otomatik test edilebilir `CODE_META` örnekleri saf JavaScript biçiminde hazırlanacaktır. Bunun nedeni, Node.js ortamında tarayıcıya veya React DOM’a ihtiyaç duymadan temel mantığı doğrulayabilmektir. Bu yaklaşım önceki bölümlerde kullanılan kalite kontrol ve kod doğrulama hattıyla uyumludur.

## 8.5 Hook kurallarının kısa tekrarı

React Hook’ları yalnızca fonksiyon bileşenlerinin veya özel hook’ların en üst düzeyinde çağrılmalıdır. Hook çağrıları döngü, koşul, iç fonksiyon veya erken dönüşlerden sonra düzensiz biçimde yerleştirilmemelidir. Bu kural, React’in her render’da Hook çağrı sırasını aynı biçimde takip edebilmesi için gereklidir.

Doğru kullanım şu şekildedir:

```jsx
function Dashboard() {
  const searchInputRef = useRef(null);
  const { themeName } = useContext(AppPreferencesContext);
  const visibleModules = useMemo(() => filterModules(modules), [modules]);

  return <main className={themeName}>...</main>;
}
```

Hatalı kullanım ise şu biçimde olabilir:

```jsx
function Dashboard({ isReady }) {
  if (isReady) {
    const searchInputRef = useRef(null);
  }

  return <main>...</main>;
}
```

İkinci örnekte Hook çağrısı koşul içinde yapılmıştır. `isReady` değeri değiştiğinde Hook çağrı sırası değişebilir. Bu durum React’in bileşen durumlarını doğru eşleştirmesini engeller. Aynı kural `useContext`, `useMemo` ve `useCallback` için de geçerlidir.

Bölüm 8’deki dört Hook’un ortak noktası, render süreciyle ilişkili olmalarıdır. `useRef` renderlar arasında değer saklar. `useContext` render sırasında en yakın Provider değerini okur. `useMemo` render sırasında hesaplanan değeri bağımlılıklara göre yeniden üretir. `useCallback` render sırasında oluşturulan fonksiyon referansını bağımlılıklara göre korur. Bu nedenle bu Hook’ların hepsi, bileşenin render davranışını daha kontrollü hâle getirmek için kullanılır; fakat her biri farklı bir amaç taşır.

## 8.6 useRef: render tetiklemeden kalıcı değer tutmak

`useRef`, React’te iki temel amaçla kullanılır. Birincisi, renderlar arasında değişebilen fakat değiştiğinde ekranın yeniden çizilmesini gerektirmeyen bir değer tutmaktır. İkincisi, DOM elementine referans almak ve örneğin bir input alanına programatik olarak odaklanmaktır.

`useRef` çağrısı genellikle şu biçimde yapılır:

```jsx
const searchInputRef = useRef(null);
```

Bu çağrı, içinde `current` adlı alan bulunan bir nesne döndürür. `searchInputRef.current` değeri değiştirilebilir. Ancak bu değişiklik `useState` gibi yeni bir render başlatmaz. Bu özellik, `useRef`i state’ten ayıran en önemli farktır.

KampüsHub’da kullanıcı “Duyuru ara” butonuna bastığında arama kutusuna odaklanmak isteyebiliriz. Bu durumda arama kutusunun güncel DOM referansını saklamak için `useRef` kullanılabilir:

```jsx
import { useRef } from "react";

function CampusSearchBox() {
  const searchInputRef = useRef(null);

  function focusSearchInput() {
    searchInputRef.current?.focus();
  }

  return (
    <section className="campus-search" data-book-shot="ref-search-focus">
      <label htmlFor="campus-search-input">KampüsHub arama</label>
      <input
        id="campus-search-input"
        ref={searchInputRef}
        placeholder="Duyuru, etkinlik veya not ara"
      />
      <button onClick={focusSearchInput}>Arama kutusuna odaklan</button>
    </section>
  );
}
```

Burada `ref={searchInputRef}` ifadesi, input elementinin referansını `searchInputRef.current` içine yerleştirir. Butona tıklandığında `focusSearchInput` fonksiyonu çalışır ve input alanına odaklanır. Bu işlem bir DOM etkileşimidir; fakat input referansının tutulması için state kullanmak doğru değildir. Çünkü input referansı değiştiğinde ekranda gösterilecek yeni bir JSX çıktısı hesaplanması gerekmez.

<!-- CODE_META
id: react_ch08_code01
chapter_id: chapter_08
language: javascript
kind: example
title_key: "ref_box_without_render"
file: "ref_box_without_render.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "current:3"
  - "renders:1"
  - "ref-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function createRefBox(initialValue) {
  return { current: initialValue };
}

function simulateRefUpdates() {
  const counterRef = createRefBox(0);
  let renderCount = 1;

  counterRef.current += 1;
  counterRef.current += 1;
  counterRef.current += 1;

  return {
    current: counterRef.current,
    renderCount
  };
}

const result = simulateRefUpdates();
console.log(`current:${result.current}`);
console.log(`renders:${result.renderCount}`);
console.log("ref-ok");
```

Bu saf JavaScript örneği, `useRef`in temel sezgisini gösterir. `current` değeri değişebilir; ancak bu değişiklik kendi başına yeni render anlamına gelmez. React bileşeninde `useRef` ile tutulan değer değiştiğinde ekranda değişiklik bekleniyorsa, bu yanlış bir tasarım işareti olabilir. Ekranda görünmesi gereken değişken veri çoğunlukla state olmalıdır.

### SCREENSHOT_META

```yaml
id: b08_01_ref_search_focus
chapter: chapter_08
figure: "Şekil 8.1"
title: "useRef ile KampüsHub arama kutusuna odaklanma"
route: "/__book__/chapter-08/ref-search-focus"
waitFor: "[data-book-shot='ref-search-focus']"
actions:
  - "Arama kutusuna odaklan düğmesine tıkla"
  - "input alanında odak halkasını gözlemle"
output: "assets/auto/chapter_08/b08_01_ref_search_focus.png"
caption: "Şekil 8.1. useRef ile DOM referansı alınan KampüsHub arama kutusuna programatik olarak odaklanma."
markdownTarget: "[SCREENSHOT:b08_01_ref_search_focus]"
```

[SCREENSHOT:b08_01_ref_search_focus]

## 8.7 Ref ve state farkı

`useRef` ve `useState` bazen karıştırılır. İkisi de renderlar arasında değer saklayabilir. Fakat temel fark şudur: state değiştiğinde React bileşeni yeniden render eder; ref değiştiğinde ise render otomatik olarak tetiklenmez. Bu nedenle `useRef`, ekranda görünmesi gerekmeyen, fakat bileşen içinde hatırlanması gereken değerler için uygundur.

KampüsHub’da aşağıdaki bilgiler state olmalıdır:

- Seçili modül
- Arama metni
- Tema seçimi kullanıcıya gösteriliyorsa aktif tema adı
- Açık/kapalı profil paneli
- Duyuru yükleme durumu

Aşağıdaki bilgiler ise ref adayı olabilir:

- Arama input elementinin DOM referansı
- Son tıklama zamanını tutan teknik değer
- Zamanlayıcı kimliği
- Önceki render’dan kalan fakat ekranda doğrudan gösterilmeyen yardımcı değer
- Kullanıcının kısa süreli etkileşim izini tutan ölçüm amaçlı değer

Örneğin kullanıcı arama kutusuna metin yazdığında bu metin ekranda filtre sonucunu değiştirecekse state olmalıdır. Buna karşılık “arama kutusuna odaklanmak için input elementini hatırla” ihtiyacı state gerektirmez. Çünkü DOM referansının değişmesi kullanıcıya gösterilen veri değildir.

Bu ayrım, gereksiz renderları önlemenin yanında kodun niyetini de açık hâle getirir. `useState` gördüğünüzde “bu değer değişince ekran etkilenir” beklentisi oluşur. `useRef` gördüğünüzde ise “bu değer bileşen içinde hatırlanır, fakat değişimi tek başına arayüzü güncellemez” sezgisi oluşmalıdır.

## 8.8 useContext: ortak değeri bileşen ağacında paylaşmak

Bölüm 5’te props ile tek yönlü veri akışı öğrenildi. Props, React’in temel iletişim biçimidir ve çoğu durumda en açık çözümdür. Ancak bazı değerler uygulama ağacında birçok alt bileşen tarafından ihtiyaç duyulabilir. Tema adı, aktif kullanıcı özeti, dil tercihi veya oturum görünürlüğü gibi bilgiler buna örnek verilebilir.

Bu tür değerleri her ara bileşenden yalnızca aşağı taşımak bazen gereksiz kalabalık oluşturur. Örneğin `App`, `DashboardLayout`, `Sidebar`, `ModuleList`, `ModuleCard` zincirinde yalnızca en alttaki `ModuleCard` tema adına ihtiyaç duyuyorsa, aradaki tüm bileşenlerin `themeName` prop’unu taşıması gerekebilir. Bu durum prop drilling olarak adlandırılır.

`useContext`, en yakın Provider tarafından sağlanan değeri doğrudan okumayı sağlar. Basit bir tema bağlamı şu şekilde kurulabilir:

```jsx
import { createContext, useContext } from "react";

const AppPreferencesContext = createContext(null);

function AppPreferencesProvider({ children }) {
  const value = {
    themeName: "academic-light",
    currentUser: "İsmail Kırbaş"
  };

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

function CampusHeader() {
  const preferences = useContext(AppPreferencesContext);

  return (
    <header data-book-shot="context-theme-provider">
      <strong>KampüsHub</strong>
      <span>Tema: {preferences.themeName}</span>
      <span>Kullanıcı: {preferences.currentUser}</span>
    </header>
  );
}
```

Bu örnekte `CampusHeader`, aradaki bileşenlerden props almak zorunda kalmadan `AppPreferencesContext` içindeki değeri okuyabilir. Ancak Context, dikkatli kullanılmalıdır. Her değeri Context içine taşımak uygulamayı daha iyi yapmaz. Yerel ve yalnızca bir bileşeni ilgilendiren state, ilgili bileşende kalmalıdır. Context özellikle geniş paylaşımlı ve nispeten kararlı değerler için uygundur.

<!-- CODE_META
id: react_ch08_code02
chapter_id: chapter_08
language: javascript
kind: example
title_key: "context_value_snapshot"
file: "context_value_snapshot.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "theme:academic-light"
  - "user:demo-student"
  - "context-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function createContextSnapshot(value) {
  return {
    read(key) {
      return value[key];
    },
    keys() {
      return Object.keys(value);
    }
  };
}

const appPreferences = createContextSnapshot({
  themeName: "academic-light",
  currentUser: "demo-student",
  compactMode: false
});

console.log(`theme:${appPreferences.read("themeName")}`);
console.log(`user:${appPreferences.read("currentUser")}`);
console.log(`keys:${appPreferences.keys().join(",")}`);
console.log("context-ok");
```

Bu örnek gerçek React Context API’sinin yerine geçmez; fakat ortak değer paylaşımı sezgisini sadeleştirir. Context, üst düzeyde sağlanan bir değerin alt katmanlardan okunmasını sağlar. React uygulamasında bu iş `createContext`, Provider ve `useContext` ile yapılır.

### SCREENSHOT_META

```yaml
id: b08_02_context_theme_provider
chapter: chapter_08
figure: "Şekil 8.2"
title: "KampüsHub tema ve kullanıcı bilgisini Context ile paylaşma"
route: "/__book__/chapter-08/context-theme-provider"
waitFor: "[data-book-shot='context-theme-provider']"
actions:
  - "Tema sağlayıcısı ile sarmalanmış KampüsHub üst bilgisini görüntüle"
output: "assets/auto/chapter_08/b08_02_context_theme_provider.png"
caption: "Şekil 8.2. Tema ve kullanıcı özetinin prop drilling yerine Context Provider üzerinden alt bileşenlere ulaştırılması."
markdownTarget: "[SCREENSHOT:b08_02_context_theme_provider]"
```

[SCREENSHOT:b08_02_context_theme_provider]

## 8.9 KampüsHub ortak bağlamı: tema, kullanıcı ve arayüz tercihi

KampüsHub uygulamasında Context için uygun bir başlangıç senaryosu tema ve kullanıcı özetidir. Çünkü bu bilgi yalnızca tek bir kartı değil, üst bilgi, yan menü, profil özeti ve bazı modül kartlarını ilgilendirir. Buna karşılık bir duyuru kartının kendi açık/kapalı ayrıntı durumu Context için uygun değildir; bu bilgi yerel bileşen state’i olarak kalabilir.

Basitleştirilmiş bir uygulama bağlamı şöyle tasarlanabilir:

```jsx
import { createContext, useContext, useState } from "react";

const CampusHubContext = createContext(null);

export function CampusHubProvider({ children }) {
  const [themeName, setThemeName] = useState("academic-light");

  const value = {
    themeName,
    setThemeName,
    currentUser: {
      name: "Demo Öğrenci",
      role: "student"
    }
  };

  return (
    <CampusHubContext.Provider value={value}>
      {children}
    </CampusHubContext.Provider>
  );
}

export function useCampusHubContext() {
  const context = useContext(CampusHubContext);

  if (!context) {
    throw new Error("useCampusHubContext must be used inside CampusHubProvider");
  }

  return context;
}
```

Bu örnekte küçük bir özel hook da görülmektedir: `useCampusHubContext`. Bölüm 9’da özel hook’lar ayrıntılı incelenecektir. Şimdilik bu fonksiyonun amacı, Context’in Provider dışında yanlış kullanılmasını daha anlaşılır bir hata mesajıyla yakalamaktır.

Context değerinin içine fonksiyon koymak mümkündür; örneğin `setThemeName`. Ancak Provider değeri her render’da yeni bir nesne olarak oluşturuluyorsa, bu değeri tüketen bileşenlerin yeniden render davranışı dikkatle izlenmelidir. Büyük uygulamalarda Context’i gereksiz sık değişen değerlerle doldurmak performans sorunlarına yol açabilir. Bu bölümde Context yalnızca temel düzeyde kullanılacaktır; daha ileri state mimarisi ilerleyen bölümlerde ele alınacaktır.

KampüsHub’da bağlam tasarlarken şu pratik ayrım kullanılabilir:

| Bilgi türü | Uygun yer | Gerekçe |
|---|---|---|
| Aktif tema | Context | Birden çok bileşen aynı bilgiye ihtiyaç duyar. |
| Aktif kullanıcı özeti | Context | Üst bilgi, profil ve bazı modüller tarafından okunur. |
| Arama metni | State | Kullanıcının bulunduğu ekranla yakından ilişkilidir. |
| Input DOM referansı | Ref | Ekranda gösterilen veri değildir. |
| Seçili modül | State veya daha sonra global yapı | Uygulama akışına göre genişleyebilir. |
| Kart hover durumu | Yerel state veya CSS | Küçük ve yerel bir arayüz ayrıntısıdır. |

Bu tablo, Context kullanımını sınırlı ve gerekçeli tutmaya yardımcı olur. React’te iyi tasarım, her şeyi tek bir ortak torbaya koymak değil, veriyi ihtiyaç duyulduğu yere en yakın ve en anlaşılır biçimde yerleştirmektir.

## 8.10 Sık yapılan hatalar ve useMemo: türetilmiş veriyi kontrollü hesaplamak

İleri Hook öğrenilirken sık yapılan ilk hata, her hesaplamayı otomatik olarak `useMemo` içine taşımaktır. Bu yaklaşım çoğu zaman performans artışı sağlamaz; aksine kodu daha zor okunur hâle getirebilir. Bu nedenle bu başlıkta `useMemo` önce hangi problemi çözdüğüyle ele alınacak, ardından hangi durumlarda gereksiz olabileceği açıkça gösterilecektir.

React bileşenleri render sırasında JavaScript ifadeleri çalıştırır. Bir diziyi filtrelemek, istatistik hesaplamak veya sıralamak çoğu zaman doğrudan render içinde yapılabilir. Ancak veri büyüdükçe veya hesaplama pahalılaştıkça aynı işlemi her render’da tekrarlamak gereksiz maliyet oluşturabilir. `useMemo`, bağımlılıkları değişmediği sürece bir hesaplama sonucunu yeniden kullanmak için kullanılır.

Temel kullanım şöyledir:

```jsx
const visibleModules = useMemo(() => {
  return modules.filter((module) =>
    module.title.toLowerCase().includes(searchText.toLowerCase())
  );
}, [modules, searchText]);
```

Bu örnekte `visibleModules`, `modules` veya `searchText` değişmediği sürece yeniden hesaplanmaz. Ancak burada dikkatli olunmalıdır: küçük bir diziyi filtrelemek çoğu zaman `useMemo` gerektirmez. `useMemo`, otomatik bir performans sihri değildir. Yanlış kullanıldığında kodu daha karmaşık hâle getirir ve gerçek fayda sağlamayabilir.

KampüsHub’da `useMemo` için anlamlı bir örnek, modül kartlarının hem filtrelenmesi hem de istatistiklerinin hesaplanmasıdır. Diyelim ki uygulamada duyurular, etkinlikler, not paylaşımı, profil, akademik takvim ve kulüp etkinlikleri gibi çok sayıda modül vardır. Kullanıcı arama metni yazdığında yalnızca eşleşen modüller gösterilir ve aynı anda görünür modül sayısı hesaplanır. Bu işlem büyüyen veriyle birlikte memoization adayı olabilir.

```jsx
const moduleSummary = useMemo(() => {
  const normalizedSearch = searchText.trim().toLowerCase();

  const visibleModules = modules.filter((module) => {
    return module.title.toLowerCase().includes(normalizedSearch);
  });

  return {
    visibleModules,
    visibleCount: visibleModules.length,
    totalCount: modules.length
  };
}, [modules, searchText]);
```

Bu yapı yalnızca görünür modülleri değil, aynı zamanda özet bilgiyi de üretir. Böylece render içinde aynı filtreleme işlemini birden fazla yerde tekrar etmek gerekmez.

<!-- CODE_META
id: react_ch08_code03
chapter_id: chapter_08
language: javascript
kind: example
title_key: "memoized_module_summary"
file: "memoized_module_summary.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "visible:2"
  - "total:4"
  - "cached:true"
  - "memo-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function createMemoizedModuleSummary() {
  let previousModules = null;
  let previousSearchText = null;
  let previousResult = null;

  return function getModuleSummary(modules, searchText) {
    if (previousModules === modules && previousSearchText === searchText) {
      return previousResult;
    }

    const normalizedSearch = searchText.trim().toLowerCase();
    const visibleModules = modules.filter((module) =>
      module.title.toLowerCase().includes(normalizedSearch)
    );

    previousModules = modules;
    previousSearchText = searchText;
    previousResult = {
      visibleModules,
      visibleCount: visibleModules.length,
      totalCount: modules.length
    };

    return previousResult;
  };
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const getModuleSummary = createMemoizedModuleSummary();
const first = getModuleSummary(modules, "i");
const second = getModuleSummary(modules, "i");

console.log(`visible:${first.visibleCount}`);
console.log(`total:${first.totalCount}`);
console.log(`cached:${first === second}`);
console.log("memo-ok");
```

Bu örnek, `useMemo`nun sezgisel davranışını saf JavaScript ile gösterir. Aynı girdi referansları ve aynı arama metni kullanıldığında önceki sonuç yeniden kullanılabilir. React’te bu işi `useMemo` yapar. Ancak bağımlılıklardan biri değişirse hesaplama yeniden yapılmalıdır.

### SCREENSHOT_META

```yaml
id: b08_03_memoized_module_dashboard
chapter: chapter_08
figure: "Şekil 8.3"
title: "useMemo ile filtrelenmiş KampüsHub modül panosu"
route: "/__book__/chapter-08/memoized-module-dashboard"
waitFor: "[data-book-shot='memoized-module-dashboard']"
actions:
  - "Arama alanına i harfi yaz"
  - "Görünür modül sayısı ve kart listesini gözlemle"
output: "assets/auto/chapter_08/b08_03_memoized_module_dashboard.png"
caption: "Şekil 8.3. useMemo ile arama metnine bağlı filtrelenmiş modül listesi ve özet istatistiklerinin gösterilmesi."
markdownTarget: "[SCREENSHOT:b08_03_memoized_module_dashboard]"
```

[SCREENSHOT:b08_03_memoized_module_dashboard]

## 8.11 Hata ayıklama egzersizi ve useCallback: fonksiyon referansını kararlı tutmak

Bu başlık aynı zamanda küçük bir hata ayıklama egzersizi olarak düşünülmelidir. Öğrenci, alt bileşene gönderilen fonksiyonun her render’da neden yeniden oluştuğunu, bunun hangi durumda sorun sayılabileceğini ve `useCallback` bağımlılık dizisinin nasıl kurulacağını izlemelidir.

React bileşeni her render edildiğinde, bileşen gövdesinde tanımlanan fonksiyonlar yeniden oluşturulur. Çoğu durumda bu bir sorun değildir. Ancak bu fonksiyonlar memoize edilmiş alt bileşenlere props olarak gönderiliyorsa veya bir effect bağımlılığı olarak kullanılıyorsa, fonksiyon referansının her render’da değişmesi gereksiz çalışmalara neden olabilir.

`useCallback`, bir fonksiyonun referansını bağımlılıkları değişmediği sürece korumak için kullanılır. Temel kullanım şöyledir:

```jsx
const handleSelectModule = useCallback((moduleId) => {
  setSelectedModuleId(moduleId);
}, []);
```

Bu örnekte `handleSelectModule` fonksiyonu bağımlılığı olmadığı sürece aynı referansı korur. Ancak fonksiyon içinde dışarıdan bir değer kullanılıyorsa, bu değer bağımlılık dizisine eklenmelidir.

```jsx
const handleSelectModule = useCallback((moduleId) => {
  trackModuleSelection(currentUser.id, moduleId);
  setSelectedModuleId(moduleId);
}, [currentUser.id]);
```

Burada `currentUser.id` değişirse fonksiyonun yeniden oluşturulması gerekir. Aksi hâlde fonksiyon eski kullanıcı değeriyle çalışabilir.

`useCallback` da `useMemo` gibi gereksiz yere kullanılmamalıdır. Her fonksiyonu `useCallback` ile sarmalamak kodu daha iyi yapmaz. Bunun anlamlı olabilmesi için fonksiyon referansının gerçekten önemli olduğu bir durum bulunmalıdır. Örneğin `React.memo` ile sarmalanmış alt bileşenlere fonksiyon gönderiliyorsa veya bu fonksiyon başka Hook bağımlılıklarında kullanılıyorsa `useCallback` düşünülebilir.

<!-- CODE_META
id: react_ch08_code04
chapter_id: chapter_08
language: javascript
kind: example
title_key: "callback_identity_by_dependency"
file: "callback_identity_by_dependency.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "same:true"
  - "changed:true"
  - "callback-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function createCallbackCache() {
  let previousDependency = undefined;
  let previousCallback = undefined;

  return function getCallback(dependency) {
    if (previousCallback && Object.is(previousDependency, dependency)) {
      return previousCallback;
    }

    previousDependency = dependency;
    previousCallback = function selectModule(moduleId) {
      return `${dependency}:${moduleId}`;
    };

    return previousCallback;
  };
}

const getCallback = createCallbackCache();
const first = getCallback("student-1");
const second = getCallback("student-1");
const third = getCallback("student-2");

console.log(`same:${first === second}`);
console.log(`changed:${first !== third}`);
console.log(first("events"));
console.log(third("events"));
console.log("callback-ok");
```

Bu örnek, `useCallback`un bağımlılık fikrini basitleştirir. Bağımlılık aynı kaldığında fonksiyon referansı korunabilir; bağımlılık değiştiğinde yeni fonksiyon gerekir. React’te bu davranış, alt bileşenlere gönderilen olay işleyicilerinin gereksiz değişimini azaltmak için kullanılabilir.

## 8.12 Bölüm özeti ve Terim sözlüğü

Bu bölümde React’in dört ileri Hook’u, her birinin çözdüğü problem üzerinden ele alındı. `useRef`, render tetiklemeden kalıcı değer veya DOM referansı tutmak için kullanıldı. KampüsHub arama kutusuna odaklanma örneği, ref kullanımının pratik ve anlaşılır bir uygulamasını gösterdi. Ref ve state arasındaki fark özellikle vurgulandı: ekranda görünmesi gereken değişken veri state, yalnızca bileşen içinde hatırlanması gereken teknik değer ref adayıdır.

`useContext`, ortak değer paylaşımı için incelendi. Tema ve aktif kullanıcı özeti gibi uygulamanın birçok noktasında ihtiyaç duyulan değerler Context ile paylaşılabilir. Ancak Context’in her state problemini çözmek için kullanılmaması gerektiği belirtildi. Yerel ve küçük arayüz durumları, mümkün olduğunca ilgili bileşene yakın tutulmalıdır.

`useMemo`, türetilmiş veri ve pahalı hesaplama bağlamında açıklandı. KampüsHub modül listesinde arama metnine bağlı filtreleme ve özet istatistikleri, memoization için uygun bir örnek olarak kullanıldı. `useCallback` ise fonksiyon referansı kararlılığı üzerinden anlatıldı. Alt bileşenlere gönderilen fonksiyonların her render’da değişmesi bazı durumlarda gereksiz yeniden renderlara yol açabileceği için, bağımlılıkları doğru verilmiş `useCallback` kullanımı yararlı olabilir.

Bu bölümün en önemli ilkesi şudur: ileri Hook kullanmak, daha ileri seviye kod yazmak anlamına gelmez. İyi React kodu, problemi sade biçimde çözen koddur. `useRef`, `useContext`, `useMemo` ve `useCallback` yalnızca gerçek ihtiyaç olduğunda kullanılmalıdır.

Terim sözlüğü:

| Terim | Açıklama |
|---|---|
| `useRef` | Render tetiklemeden kalıcı değer veya DOM referansı tutan Hook. |
| Ref | `current` alanı üzerinden değiştirilebilen referans nesnesi. |
| DOM referansı | Tarayıcıdaki gerçek HTML elementine erişmek için kullanılan referans. |
| `useContext` | En yakın Context Provider değerini okuyan Hook. |
| Provider | Context değerini alt bileşen ağacına sağlayan yapı. |
| Prop drilling | Bir değerin yalnızca daha alt bileşene ulaşması için birçok ara bileşenden props olarak geçirilmesi. |
| `useMemo` | Bağımlılıkları değişmediği sürece hesaplama sonucunu yeniden kullanan Hook. |
| Memoization | Aynı girdiler için önceki hesaplama sonucunu saklama yaklaşımı. |
| `useCallback` | Bağımlılıkları değişmediği sürece fonksiyon referansını koruyan Hook. |
| Fonksiyon referansı | Bir fonksiyon nesnesinin bellekteki kimliğini ifade eden kavram. |
| Aşırı optimizasyon | Ölçülmemiş veya gerekçelendirilmemiş performans iyileştirme çabası. |

## 8.13 Kavramsal sorular

1. `useRef` ile `useState` arasındaki temel fark nedir? KampüsHub’dan birer örnek veriniz.
2. Arama kutusuna odaklanma işlemi için neden state yerine ref kullanılır?
3. Context kullanmak prop drilling problemini nasıl azaltır?
4. Context’in her ortak veri için otomatik çözüm olarak kullanılmasının sakıncaları nelerdir?
5. `useMemo` hangi durumda yararlı olabilir? Küçük bir diziyi filtrelemek için her zaman gerekli midir?
6. `useCallback` ile `useMemo` arasındaki ilişki nedir?
7. Bir fonksiyonun referansının değişmesi hangi durumlarda önem kazanır?
8. `useMemo` bağımlılık dizisinde eksik değer bırakmak hangi probleme yol açabilir?
9. KampüsHub’da tema bilgisi Context için uygunken, kart hover durumu neden yerel kalmalıdır?
10. “İleri Hook kullanmak her zaman daha iyi kod anlamına gelir” ifadesini tartışınız.

## 8.14 Programlama alıştırmaları

1. KampüsHub arama kutusu için `useRef` kullanan bir `SearchFocusPanel` bileşeni yazınız. Bir butona tıklandığında input alanı odaklansın.
2. `CampusHubPreferencesContext` adlı bir Context oluşturunuz. İçinde `themeName`, `currentUser` ve `compactMode` değerleri bulunsun.
3. Tema bilgisini `CampusHeader`, `Sidebar` ve `ModuleCard` bileşenlerinde `useContext` ile okuyunuz.
4. Modül listesini arama metnine göre filtreleyen bir `useMemo` örneği yazınız. Sonuç nesnesinde `visibleModules`, `visibleCount` ve `totalCount` bulunsun.
5. Modül kartına gönderilen `onSelectModule` fonksiyonunu `useCallback` ile oluşturunuz. Bağımlılık dizisini gerekçesiyle açıklayınız.
6. `useMemo` kullanmadan ve kullanarak aynı filtreleme işlemini iki ayrı örnekte yazınız. Hangisinin daha okunabilir olduğunu tartışınız.
7. Context içine çok sık değişen `searchText` değerini koyduğunuzda olası sonuçları açıklayınız.
8. `useRef` ile zamanlayıcı kimliği tutan küçük bir sayaç bileşeni yazınız. Bileşen kapanırken zamanlayıcı temizlensin.

<!-- CODE_META
id: react_ch08_code05
chapter_id: chapter_08
language: javascript
kind: exercise
title_key: "campushub_dashboard_view_model"
file: "campushub_dashboard_view_model.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "theme:academic-light"
  - "visibleModules:2"
  - "selected:events"
  - "view-model-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function buildCampusHubViewModel({ modules, searchText, themeName, selectedModuleId }) {
  const normalizedSearch = searchText.trim().toLowerCase();
  const visibleModules = modules.filter((module) =>
    module.title.toLowerCase().includes(normalizedSearch)
  );
  const selectedModule = modules.find((module) => module.id === selectedModuleId) ?? null;

  return {
    themeName,
    visibleModules,
    selectedModule,
    summaryText: `${visibleModules.length}/${modules.length} modül gösteriliyor`
  };
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const viewModel = buildCampusHubViewModel({
  modules,
  searchText: "i",
  themeName: "academic-light",
  selectedModuleId: "events"
});

console.log(`theme:${viewModel.themeName}`);
console.log(`visibleModules:${viewModel.visibleModules.length}`);
console.log(`selected:${viewModel.selectedModule.id}`);
console.log(viewModel.summaryText);
console.log("view-model-ok");
```

Bu alıştırma, Bölüm 8’in bütün kavramlarını tek bir düşünme modelinde birleştirir. Tema bilgisi Context adayıdır, arama metni state olarak tutulabilir, filtrelenmiş modül listesi `useMemo` ile türetilebilir ve seçme fonksiyonu `useCallback` ile kararlı hâle getirilebilir. Saf JavaScript fonksiyonu ise bu modelin test edilebilir çekirdeğini gösterir.

## 8.15 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub ana ekranını ileri Hook’larla yeniden düzenlemektir. Öğrenciden beklenen çıktı, çalışan küçük bir React uygulama parçası ve kısa bir teknik açıklama raporudur.

Görev adımları:

1. `CampusHubProvider` adlı bir Context Provider oluşturunuz.
2. Provider içinde `themeName`, `currentUser` ve `compactMode` değerlerini sağlayınız.
3. `CampusHeader` ve `ModuleDashboard` bileşenlerinde `useContext` ile bu değerleri okuyunuz.
4. `SearchFocusPanel` bileşeninde `useRef` ile input alanına odaklanma özelliği ekleyiniz.
5. `ModuleDashboard` bileşeninde modül listesini `searchText` değerine göre filtreleyiniz.
6. Filtreleme ve özet hesaplamasını `useMemo` ile düzenleyiniz.
7. Modül seçme fonksiyonunu `useCallback` ile oluşturunuz.
8. En az bir örnekte, `useMemo` veya `useCallback` kullanmadan önce ve kullandıktan sonra kod okunabilirliğini tartışınız.
9. React DevTools ile bileşen ağacını inceleyiniz.
10. Ekran çıktısı marker’larına uygun üç görünüm üretmeye hazır rota veya bileşen düzeni oluşturunuz.

Değerlendirme kontrol listesi:

- [ ] `useRef` doğru amaçla kullanıldı.
- [ ] Context Provider ve `useContext` yapısı çalışıyor.
- [ ] Context içine gereksiz yerel state doldurulmadı.
- [ ] `useMemo` bağımlılık dizisi doğru kuruldu.
- [ ] `useCallback` bağımlılık dizisi gerekçelendirildi.
- [ ] Kodda Hook kuralları ihlal edilmedi.
- [ ] KampüsHub bileşen adları PascalCase ile yazıldı.
- [ ] Değişken ve fonksiyon adları camelCase ile yazıldı.
- [ ] Arayüz çıktısı sade ve anlaşılır.
- [ ] Öğrenci kısa teknik raporda hangi Hook’un hangi problemi çözdüğünü açıkladı.

<!-- CODE_META
id: react_ch08_code06
chapter_id: chapter_08
language: javascript
kind: exercise
title_key: "timer_ref_cleanup_simulation"
file: "timer_ref_cleanup_simulation.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "timer:active"
  - "timer:cleaned"
  - "cleanup-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function createTimerRef() {
  return { current: null };
}

function startTimer(timerRef, id) {
  timerRef.current = id;
  return "timer:active";
}

function cleanupTimer(timerRef) {
  if (timerRef.current !== null) {
    timerRef.current = null;
    return "timer:cleaned";
  }
  return "timer:empty";
}

const timerRef = createTimerRef();
console.log(startTimer(timerRef, 42));
console.log(cleanupTimer(timerRef));
console.log(`current:${timerRef.current}`);
console.log("cleanup-ok");
```

Bu örnek, `useRef` ile zamanlayıcı kimliği tutma fikrini basitleştirir. Gerçek React bileşeninde zamanlayıcı `useEffect` içinde başlatılır, kimliği ref içinde saklanır ve cleanup fonksiyonunda temizlenir. Böylece bileşen ekrandan ayrıldığında açık kaynak bırakılmaz.

## 8.16 İleri okuma ve Bir sonraki bölüme geçiş

Bu bölüm, React’in ileri Hook’larını temel ama sistematik bir çerçevede ele aldı. `useRef`, `useContext`, `useMemo` ve `useCallback` artık KampüsHub uygulamasındaki somut ihtiyaçlarla ilişkilendirildi. Bu Hook’lar özellikle büyüyen bileşen ağacında, ortak değer paylaşımında, DOM referansı yönetiminde, türetilmiş veri hesaplamalarında ve fonksiyon referansı kararlılığında önemli araçlardır.

İleri okuma için öğrencinin şu başlıklara yönelmesi önerilir:

- React resmi dokümantasyonunda `useRef` açıklamaları
- React resmi dokümantasyonunda `useContext` ve Context Provider örnekleri
- React resmi dokümantasyonunda `useMemo` ve `useCallback` kullanım notları
- React DevTools ile render davranışını gözlemleme
- Ölçüme dayalı performans değerlendirme yaklaşımı

Bir sonraki bölüme geçiş açısından en önemli fikir şudur: Hook’lar yalnızca React tarafından verilen hazır fonksiyonlardan ibaret değildir. Geliştirici, tekrar eden state, effect, ref veya memoization mantığını kendi özel hook’u içine taşıyabilir. Bölüm 9’da bu nedenle özel hook’lar ele alınacaktır. KampüsHub’da modül filtreleme, tarayıcı depolamasından tercih okuma, pencere boyutu izleme veya duyuru yükleme gibi tekrar eden davranışlar özel hook tasarımı için uygun örneklere dönüşecektir. Bu geçişte Bölüm 8’de öğrenilen ileri Hook’lar, özel hook’ların iç yapısını kurmak için kullanılacaktır.
