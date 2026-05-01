---
title: "Bölüm 6: State — Değişen Verinin Yönetimi"
chapter_id: "chapter_06"
content_language: "tr-TR"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
numbering_policy: "manual_visible_for_current_pipeline"
automation_profile: "parametric_computer_book_factory_v2_0"
code_policy: "CODE_META blocks precede executable JavaScript fences"
screenshot_policy: "SCREENSHOT_META plus [SCREENSHOT:*] markers"
---

# Bölüm 6: State — Değişen Verinin Yönetimi

## 6.1 Bölümün yol haritası

Bu bölümde React uygulamalarında zaman içinde değişen verinin nasıl yönetildiği ele alınacaktır. Önceki bölümlerde KampüsHub arayüzü önce HTML ve CSS temelli sayfa yapısından bileşen düşüncesine taşındı; ardından JSX, fonksiyon bileşeni ve props kullanımıyla daha düzenli ve yeniden kullanılabilir bir yapıya dönüştürüldü. Ancak props ile oluşturulan arayüz hâlâ büyük ölçüde dışarıdan verilen veriyi gösterir. Kullanıcı bir modül kartına tıkladığında seçili kartın değişmesi, profil panelinin açılıp kapanması, duyuru sayacının azalması veya arama kutusundaki metne göre listenin süzülmesi için başka bir kavrama ihtiyaç vardır. Bu kavram `state` olarak adlandırılır.

React’te `state`, bir bileşenin zaman içinde değişebilen yerel verisini ifade eder. Kullanıcı etkileşimi, form girdisi, seçim, sayaç, görünürlük, açılır panel, aktif sekme veya geçici filtre gibi arayüz durumları state ile temsil edilir. State değiştiğinde React ilgili bileşeni yeniden render eder ve ekranın güncel veriyle uyumlu kalmasını sağlar. Bu mekanizma modern web uygulamalarının etkileşimli karakterini mümkün kılar.

Bu bölümün temel soruları şunlardır:

- Props ile gösterilen veri hangi noktada yetersiz kalır?
- State nedir ve hangi tür veriler state olarak tutulmalıdır?
- `useState` Hook’u nasıl kullanılır?
- State güncellendiğinde bileşen neden yeniden render edilir?
- Event handler ile state güncellemesi arasındaki ilişki nedir?
- Boolean, number, string, object ve array state nasıl yönetilir?
- State güncellemelerinde doğrudan mutasyon neden sakıncalıdır?
- Fonksiyonel güncelleme biçimi ne zaman tercih edilmelidir?
- KampüsHub’da seçili modül, okunmamış duyuru, favori etkinlik ve arama filtresi nasıl yönetilir?

Bu bölümün amacı, öğrencinin yalnızca `useState` sözdizimini ezberlemesi değildir. Asıl amaç, arayüzde değişen veriyi tanımlayabilmesi, bu veriyi doğru bileşende konumlandırabilmesi ve güncelleme işlemini React’in beklediği biçimde yapabilmesidir. Bölüm sonunda öğrenci KampüsHub ana ekranında statik görünümden etkileşimli bir arayüze geçiş yapacaktır.

## 6.2 Bölümün konumu ve pedagojik rolü

Bölüm 1’de modern web uygulamalarının SPA yaklaşımı, React ekosistemi, Node.js, npm, Vite, HMR, React DevTools, `package.json`, `index.html`, `main.jsx` ve `App.jsx` gibi temel kavramları tanıtıldı. Aynı bölümde `npm create vite@latest`, `npm install` ve `npm run dev` komutlarının geliştirme döngüsündeki rolü gösterildi. Bölüm 2’de React kodlarını okuyabilmek için gerekli modern JavaScript ES6+ kavramları işlendi. Bölüm 3’te HTML ve CSS sayfa yapısından bileşen düşüncesine geçiş yapıldı. Bölüm 4’te JSX ve bileşen anatomisi ele alındı. Bölüm 5’te ise props ile bileşenler arası tek yönlü veri akışı kuruldu.

Bölüm 6, bu hazırlıkların üzerine etkileşimli arayüz davranışını ekler. Props, parent bileşenden child bileşene veri aktarmak için kullanılır. State ise bir bileşenin kendi içinde takip ettiği değişen bilgidir. KampüsHub örneği üzerinden düşünürsek `ModuleCard` bileşenine `title`, `description` ve `status` gibi değerleri props olarak vermek yeterlidir; fakat kullanıcı hangi modülü seçtiyse bunu takip etmek için state gerekir. Benzer biçimde bir profil panelinin açık mı kapalı mı olduğunu, duyuru sayacının kaç olduğunu veya arama kutusuna ne yazıldığını takip etmek için de state kullanılır.

Bu bölüm, Bölüm 7’de işlenecek `useEffect` konusuna doğrudan hazırlık yapar. Çünkü yan etkiler çoğu zaman state değişimleriyle ilişkilidir. Ancak bu bölümde yan etki yönetimi ayrıntısına girilmeyecektir. Odak, yerel UI durumlarının `useState` ile doğru ve anlaşılır biçimde yönetilmesidir.

## 6.3 Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. React’te `state` kavramını değişen arayüz verisi olarak tanımlar.
2. `props` ile `state` arasındaki farkı KampüsHub örnekleri üzerinden açıklar.
3. `useState` Hook’unu import eder ve temel sözdizimiyle kullanır.
4. Başlangıç state değeri ile güncelleme fonksiyonunun rollerini ayırt eder.
5. Kullanıcı olaylarını event handler fonksiyonlarıyla karşılar.
6. State değişiminin re-render süreciyle ilişkisini açıklar.
7. Boolean state ile görünürlük ve seçim gibi durumları yönetir.
8. Number state ile sayaç ve miktar gibi değerleri günceller.
9. String state ile arama metni veya kısa form girdisi gibi değerleri takip eder.
10. Object ve array state güncellemelerinde immutable yaklaşımı uygular.
11. Önceki state değerine bağlı güncellemelerde fonksiyonel güncelleme biçimini kullanır.
12. KampüsHub ana ekranında seçili modül, okunmamış duyuru sayısı, favori etkinlik ve filtre metni gibi durumları yönetir.
13. State’in ne zaman child bileşende, ne zaman parent bileşende tutulması gerektiğini başlangıç düzeyinde tartışır.
14. Yaygın state hatalarını tanır ve düzeltme stratejisi geliştirir.

Bu çıktılar yalnızca kısa kod yazma becerisiyle sınırlı değildir. Öğrenciden beklenen asıl kazanım, arayüzdeki değişken bilgiyi veri modeli olarak düşünebilmesidir. Bir bileşenin ekranda nasıl göründüğü ile hangi state değerlerine bağlı olduğu arasındaki ilişki açık kurulduğunda React kodu daha okunabilir ve sürdürülebilir hâle gelir.

## 6.4 Ön bilgi ve başlangıç varsayımları

Bu bölümde öğrencinin JSX ile fonksiyon bileşeni yazabildiği, bileşenlerin PascalCase adlandırıldığını, JSX içinde `className` kullanıldığını, JavaScript ifadelerinin `{}` içinde gösterildiğini ve props ile veri aktarabildiğini bildiği varsayılır. Ayrıca `map` ile liste render etme ve `key` kullanımının temel gerekçesi önceki bölümde ele alınmış olmalıdır.

Modern JavaScript tarafında özellikle nesne, dizi, destructuring, spread syntax ve arrow function bilgisi gereklidir. State güncellemelerinin önemli kısmı, var olan nesne veya dizi üzerinde doğrudan değişiklik yapmak yerine yeni bir değer üretmeye dayanır. Bu nedenle aşağıdaki örüntü bu bölümde sık karşılaşılacak bir yapıdır:

```javascript
const updatedModule = {
  ...module,
  isSelected: true
};
```

Burada `module` nesnesi doğrudan değiştirilmez. Önce var olan alanlar kopyalanır, ardından değişmesi gereken alan yeni değerle yazılır. React’te state güncellemelerini güvenilir kılan temel sezgi budur: önceki değeri bozma, yeni değeri üret.

Geliştirme ortamı açısından Bölüm 1’de kurulan Vite tabanlı React projesi kullanılacaktır. Proje `npm create vite@latest` ile başlatılmış, `npm install` ile bağımlılıkları kurulmuş ve `npm run dev` ile geliştirme sunucusu çalıştırılmış olmalıdır. `index.html` dosyası uygulamanın HTML giriş noktasıdır; `main.jsx` React uygulamasını DOM’a bağlar; `App.jsx` ise KampüsHub ana bileşeninin geliştirildiği başlangıç noktasıdır. HMR sayesinde dosya kaydedildiğinde tarayıcı hızlı biçimde güncellenir. React DevTools ile bileşen ağacı ve prop değerleri incelenebilir; state davranışını anlamak için de tarayıcı çıktısı ve bileşen hiyerarşisi birlikte izlenmelidir.

Bu bölümde `useEffect`, React Router, global state yönetimi veya sunucu tarafı veri alma konularına girilmeyecektir. Odak, tek bileşen veya sınırlı parent-child yapısı içinde yönetilen yerel arayüz durumudur.

## 6.5 State ihtiyacı: statik görünümden etkileşimli arayüze

Bölüm 5’te `ModuleCard` bileşeni props alarak farklı modül kartlarını gösterebilir hâle getirildi. Örneğin KampüsHub ana ekranında duyurular, etkinlikler, not paylaşımı ve profil modülleri aynı kart bileşeniyle üretilebilir:

```jsx
<ModuleCard title="Duyurular" description="Ders duyurularını takip edin." />
<ModuleCard title="Etkinlikler" description="Kampüs etkinliklerini inceleyin." />
```

Bu kullanım veri tekrarı sorununu azaltır. Ancak kullanıcı duyurular kartına tıkladığında kartın seçili görünmesi istenirse props tek başına yeterli olmaz. Çünkü seçili kart bilgisi zaman içinde değişir. Başlangıçta hiçbir kart seçili olmayabilir; kullanıcı duyurulara tıkladığında seçili değer `announcements` olur; etkinliklere tıkladığında `events` olur. Bu tür değişen bilgi state olarak tutulmalıdır.

Benzer biçimde aşağıdaki KampüsHub durumları da state örneğidir:

- Profil paneli açık mı kapalı mı?
- Okunmamış duyuru sayısı kaç?
- Kullanıcı hangi modül kartını seçti?
- Etkinlik favoriye eklenmiş mi?
- Arama kutusuna hangi metin yazıldı?
- Filtrelenmiş modül listesinde hangi kartlar görünmeli?

Bu soruların ortak özelliği, cevabın kullanıcı etkileşimine veya zaman içinde değişen arayüz koşullarına bağlı olmasıdır. React’te state bu cevabı bellekte tutar ve değer değiştiğinde ekranın yeniden hesaplanmasını sağlar.

State’i gereksiz yere her veri için kullanmak doğru değildir. Sabit metinler, dışarıdan props olarak gelen bilgiler veya yalnızca başka state değerlerinden hesaplanabilen türetilmiş değerler her zaman ayrı state olmak zorunda değildir. Örneğin `modules` dizisi sabit bir listeyse dosya içinde normal bir sabit olarak tutulabilir. Ancak `selectedModuleId` kullanıcı tıklamasına göre değişiyorsa state olmalıdır.

<!-- CODE_META
id: react_ch06_code01
chapter_id: chapter_06
language: javascript
kind: example
title_key: "initial_dashboard_state_summary"
file: "initial_dashboard_state_summary.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "KampüsHub"
  - "selectedModule: none"
  - "unread: 4"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
const dashboardState = {
  appName: "KampüsHub",
  selectedModuleId: null,
  unreadAnnouncementCount: 4,
  isProfileOpen: false
};

function summarizeDashboardState(state) {
  const selected = state.selectedModuleId ?? "none";
  return `${state.appName} | selectedModule: ${selected} | unread: ${state.unreadAnnouncementCount}`;
}

console.log(summarizeDashboardState(dashboardState));
```

Bu saf JavaScript örneği React state mantığını basitleştirilmiş biçimde gösterir. `dashboardState` nesnesi KampüsHub ekranındaki değişebilen bilgileri temsil eder. React bileşeninde aynı veri `useState` ile tutulduğunda, değer değiştikçe arayüz de güncellenir.

## 6.6 Props ve state farkı

`props` ve `state` React öğrenen öğrencilerin sık karıştırdığı iki kavramdır. İkisi de bileşenin ne göstereceğini etkiler; ancak kaynakları ve yönetim biçimleri farklıdır. Props dışarıdan gelir, state bileşenin kendi içinde yönetilir. Props genellikle parent bileşenin child bileşene verdiği bilgidir. State ise kullanıcı etkileşimi veya arayüz davranışı nedeniyle değişebilen yerel bilgidir.

Aşağıdaki karşılaştırma temel farkı özetler:

| Özellik | Props | State |
|---|---|---|
| Kaynak | Parent bileşenden gelir | Bileşenin içinde tanımlanır |
| Değiştirme yetkisi | Child doğrudan değiştirmez | Setter fonksiyonu ile güncellenir |
| Kullanım amacı | Veri aktarmak | Değişen UI durumunu tutmak |
| Örnek | `title`, `description`, `status` | `selectedModuleId`, `isOpen`, `count` |
| Veri akışı | Parent → child | Tanımlandığı bileşen ve alt bileşenler |

KampüsHub örneğinde `ModuleCard` bileşenine verilen `title` prop olabilir. Çünkü kart başlığı parent bileşen tarafından belirlenir. Buna karşılık seçili kart bilgisini `ModuleGrid` veya `App` bileşeninde state olarak tutmak daha uygundur. Çünkü seçili kart kullanıcı tıklamasına göre değişir ve birden fazla kartın görünümünü etkileyebilir.

Önemli bir tasarım sorusu şudur: “Bu veri değişiyor mu?” Eğer cevap hayırsa state olmayabilir. İkinci soru şudur: “Bu değişim hangi bileşenleri etkiliyor?” Eğer yalnızca tek bileşeni etkiliyorsa state o bileşende tutulabilir. Birden fazla kardeş bileşeni etkiliyorsa state ortak parent bileşene taşınmalıdır. Bu ilke ilerleyen bölümlerde daha ayrıntılı ele alınacak state lifting konusunun başlangıç sezgisidir.

## 6.7 useState temel sözdizimi

React’te fonksiyon bileşeni içinde state tanımlamak için en temel araç `useState` Hook’udur. Hook, React’in fonksiyon bileşenlerine durum ve yaşam döngüsüyle ilişkili yetenekler kazandıran özel fonksiyon ailesidir. `useState` kullanmak için önce React paketinden import edilir:

```jsx
import { useState } from "react";
```

Ardından bileşen içinde başlangıç değeriyle birlikte çağrılır:

```jsx
function CounterPanel() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Tıklama sayısı: {count}
    </button>
  );
}
```

Bu örnekte `count` mevcut state değeridir. `setCount` ise bu değeri güncellemek için kullanılan setter fonksiyonudur. `useState(0)` ifadesindeki `0`, başlangıç değeridir. Kullanıcı butona tıkladığında `setCount(count + 1)` çalışır. React state değerinin değiştiğini görür ve bileşeni yeniden render eder. Böylece ekrandaki sayı güncellenir.

`useState` kullanımında değişken adlandırması önemlidir. Yaygın örüntü şu şekildedir:

```jsx
const [value, setValue] = useState(initialValue);
```

Örneğin:

```jsx
const [selectedModuleId, setSelectedModuleId] = useState(null);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const [searchText, setSearchText] = useState("");
```

Bu adlandırma, state değerini ve güncelleme fonksiyonunu birlikte okunabilir kılar. `selectedModuleId` neyin tutulduğunu, `setSelectedModuleId` ise hangi fonksiyonun bu değeri güncellediğini açıkça gösterir.

State güncellemesi doğrudan değişkene atama yapılarak gerçekleştirilmez. Aşağıdaki kullanım hatalıdır:

```jsx
selectedModuleId = "announcements";
```

Doğru kullanım setter fonksiyonunu çağırmaktır:

```jsx
setSelectedModuleId("announcements");
```

React’in ekrandaki değişimi algılaması için setter fonksiyonunun kullanılması gerekir. Doğrudan atama, React’in render sürecini tetiklemez ve beklenen güncelleme ekrana yansımaz.

## 6.8 Event handler ve re-render ilişkisi

State çoğu zaman kullanıcı olaylarıyla değişir. Butona tıklama, giriş alanına yazı yazma, kart seçme veya panel kapatma gibi işlemler event handler fonksiyonlarıyla karşılanır. React’te olay adları camelCase yazılır. Örneğin HTML’de `onclick` olarak görülen olay React JSX içinde `onClick` biçiminde yazılır.

KampüsHub’da bir modül kartına tıklandığında seçili modül state’i güncellenebilir:

```jsx
function ModuleGrid({ modules }) {
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  return (
    <section className="module-grid">
      {modules.map((module) => (
        <button
          key={module.id}
          className={module.id === selectedModuleId ? "module-card selected" : "module-card"}
          onClick={() => setSelectedModuleId(module.id)}
        >
          {module.title}
        </button>
      ))}
    </section>
  );
}
```

Bu örnekte kullanıcı bir karta tıkladığında `setSelectedModuleId(module.id)` çalışır. State değeri değiştiğinde React bileşeni yeniden render eder. Yeniden render sırasında her kartın `className` değeri tekrar hesaplanır. Seçili kart için `module-card selected`, diğerleri için `module-card` sınıfı kullanılır.

Re-render kavramı “tüm sayfa baştan yüklenir” anlamına gelmez. React, bileşenin yeni çıktısını hesaplar ve DOM üzerinde gerekli güncellemeleri yapar. Bu nedenle state değişimi, SPA yaklaşımında sayfa yenilemeden arayüzün güncellenmesini sağlar.

Event handler yazarken dikkat edilmesi gereken önemli bir ayrım vardır. Aşağıdaki kullanım, fonksiyonu tıklama anında değil render sırasında çağırır:

```jsx
<button onClick={setSelectedModuleId("announcements")}>Duyurular</button>
```

Doğru kullanım, tıklama gerçekleştiğinde çalışacak bir fonksiyon vermektir:

```jsx
<button onClick={() => setSelectedModuleId("announcements")}>Duyurular</button>
```

İlk kullanım, yeni başlayanların sık yaptığı bir hatadır. `onClick` içine fonksiyon sonucu değil, fonksiyonun kendisi verilmelidir.

<!-- CODE_META
id: react_ch06_code02
chapter_id: chapter_06
language: javascript
kind: example
title_key: "selected_module_state_transition"
file: "selected_module_state_transition.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "before: none"
  - "after: events"
  - "changed: true"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function selectModule(previousState, moduleId) {
  return {
    ...previousState,
    selectedModuleId: moduleId
  };
}

const beforeState = {
  selectedModuleId: null,
  unreadAnnouncementCount: 4
};

const afterState = selectModule(beforeState, "events");

console.log(`before: ${beforeState.selectedModuleId ?? "none"}`);
console.log(`after: ${afterState.selectedModuleId}`);
console.log(`changed: ${beforeState !== afterState}`);
```

Bu örnek seçili modül bilgisinin yeni bir state nesnesi üretilerek değiştirildiğini gösterir. `beforeState` doğrudan değiştirilmez. `selectModule` fonksiyonu önceki state’i temel alır ve yeni state nesnesi döndürür.

## 6.9 KampüsHub: yerel state tasarımı

KampüsHub ana ekranında state tasarımı yaparken önce hangi verilerin değiştiğini belirlemek gerekir. Her veri state olmak zorunda değildir. Örneğin modül listesi sabitse normal bir dizi olarak tanımlanabilir:

```jsx
const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];
```

Buna karşılık aşağıdaki değerler kullanıcı etkileşimiyle değişebilir:

```jsx
const [selectedModuleId, setSelectedModuleId] = useState(null);
const [unreadAnnouncementCount, setUnreadAnnouncementCount] = useState(4);
const [isProfileOpen, setIsProfileOpen] = useState(false);
const [searchText, setSearchText] = useState("");
```

Bu state değerlerinin her biri arayüzün farklı kısmını etkiler. `selectedModuleId` kart vurgusunu, `unreadAnnouncementCount` duyuru rozetini, `isProfileOpen` profil panelinin görünürlüğünü, `searchText` ise filtrelenmiş modül listesini belirler.

KampüsHub bileşen yapısında state’in nerede tutulacağı önemlidir. Eğer seçili modül bilgisi yalnızca `ModuleGrid` bileşeni içinde kullanılacaksa state bu bileşende tutulabilir. Ancak seçili modül bilgisi üstteki özet panelini, sağdaki detay alanını ve modül kartlarını birlikte etkiliyorsa state `App` gibi ortak parent bileşene taşınmalıdır.

Bu yaklaşım React’in tek yönlü veri akışıyla uyumludur. State parent bileşende tutulur; child bileşenlere props olarak aktarılır; child bileşenler kullanıcı olayını haber vermek için parent’tan gelen handler fonksiyonlarını çağırır. Örneğin `ModuleCard`, kendi içinde seçili modül state’ini tutmak yerine `isSelected` prop’unu alabilir ve tıklanınca `onSelect` fonksiyonunu çağırabilir.

```jsx
function ModuleCard({ module, isSelected, onSelect }) {
  return (
    <button
      className={isSelected ? "module-card selected" : "module-card"}
      onClick={() => onSelect(module.id)}
    >
      <span>{module.title}</span>
    </button>
  );
}
```

Bu örüntü önemlidir: child bileşen state’i doğrudan yönetmez; kendi rolünü oynar ve gerekli olayı parent bileşene bildirir. Parent bileşen state’i günceller. Bu yapı büyüyen React uygulamalarında veri akışının izlenebilir kalmasını sağlar.

## 6.10 Sık yapılan hatalar ve yanlış sezgiler

State öğrenirken en sık yapılan hata, state değerini doğrudan değiştirmeye çalışmaktır. Örneğin bir nesne state’i üzerinde şu tür bir işlem yapılmamalıdır:

```jsx
dashboardState.selectedModuleId = "events";
setDashboardState(dashboardState);
```

Bu kullanım önceki nesneyi mutasyona uğratır. React bazen değişimi beklenen şekilde algılamayabilir; ayrıca kodun izlenebilirliği bozulur. Doğru yaklaşım yeni bir nesne üretmektir:

```jsx
setDashboardState({
  ...dashboardState,
  selectedModuleId: "events"
});
```

Dizi state için de aynı ilke geçerlidir. Bir etkinliği favoriye almak için var olan diziyi doğrudan değiştirmek yerine `map` ile yeni dizi üretmek daha güvenlidir:

```jsx
setEvents(events.map((event) =>
  event.id === selectedId
    ? { ...event, isFavorite: !event.isFavorite }
    : event
));
```

İkinci yaygın hata, önceki state değerine bağlı güncellemelerde güncel olmayan değere güvenmektir. Örneğin sayaç artırma işlemi önceki değere bağlıdır. Bu durumda fonksiyonel güncelleme biçimi daha güvenilir kabul edilir:

```jsx
setCount((previousCount) => previousCount + 1);
```

Üçüncü hata, her hesaplanabilir değeri ayrı state olarak tutmaktır. Örneğin `searchText` state ise `filteredModules` çoğu zaman ayrıca state olmak zorunda değildir. Render sırasında şu şekilde türetilebilir:

```jsx
const filteredModules = modules.filter((module) =>
  module.title.toLowerCase().includes(searchText.toLowerCase())
);
```

Bu yaklaşım gereksiz state çoğalmasını önler. Gereksiz state, birbiriyle tutarsız değerlerin oluşmasına yol açabilir. React’te iyi state tasarımı, en az ama yeterli sayıda değişken bilgi tutmayı gerektirir.

Dördüncü hata, event handler fonksiyonunu render sırasında çağırmaktır. `onClick={setOpen(true)}` gibi bir kullanım hatalıdır; `onClick={() => setOpen(true)}` biçimi tercih edilmelidir. Çünkü event prop’una çalıştırılmış sonuç değil, olay gerçekleştiğinde çalışacak fonksiyon verilmelidir.

## 6.11 Hata ayıklama egzersizi

Aşağıdaki örnekte amaç, KampüsHub duyuru sayacını bir azaltmaktır. Ancak kodda hem mutasyon hem de yanlış state güncelleme sezgisi bulunmaktadır:

```jsx
function AnnouncementBadge() {
  const [summary, setSummary] = useState({ unread: 4 });

  function markOneAsRead() {
    summary.unread = summary.unread - 1;
    setSummary(summary);
  }

  return (
    <button onClick={markOneAsRead}>
      Okunmamış duyuru: {summary.unread}
    </button>
  );
}
```

Bu kod ilk bakışta mantıklı görünebilir; fakat `summary` nesnesi doğrudan değiştirilmektedir. Daha güvenli çözüm yeni bir nesne üretmektir:

```jsx
function AnnouncementBadge() {
  const [summary, setSummary] = useState({ unread: 4 });

  function markOneAsRead() {
    setSummary((previousSummary) => ({
      ...previousSummary,
      unread: Math.max(previousSummary.unread - 1, 0)
    }));
  }

  return (
    <button onClick={markOneAsRead}>
      Okunmamış duyuru: {summary.unread}
    </button>
  );
}
```

Bu düzeltmede iki iyileştirme vardır. Birincisi, önceki nesne doğrudan değiştirilmez; yeni nesne üretilir. İkincisi, güncelleme önceki state değerine bağlı olduğu için fonksiyonel güncelleme biçimi kullanılır. Ayrıca `Math.max` ile sayaç değerinin sıfırın altına düşmesi engellenir.

<!-- CODE_META
id: react_ch06_code03
chapter_id: chapter_06
language: javascript
kind: example
title_key: "functional_update_unread_count"
file: "functional_update_unread_count.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "start: 2"
  - "after first: 1"
  - "after second: 0"
  - "after third: 0"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function markOneAnnouncementAsRead(previousCount) {
  return Math.max(previousCount - 1, 0);
}

let unreadCount = 2;
console.log(`start: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after first: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after second: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after third: ${unreadCount}`);
```

Bu örnek `setCount((previous) => ...)` biçimindeki fonksiyonel güncelleme düşüncesini saf JavaScript ile modellemektedir. Değer önceki sayaca bağlıdır; bu nedenle güncelleme fonksiyonunun önceki değeri açıkça alması güvenli bir tasarım sağlar.

## 6.12 Bölüm özeti ve terim sözlüğü

Bu bölümde React’te değişen verinin `state` ile yönetildiği görüldü. Props dışarıdan gelen veriyi temsil ederken, state bileşenin kendi içinde takip ettiği ve zaman içinde değişebilen arayüz bilgisidir. Kullanıcı etkileşimiyle değişen seçim, sayaç, görünürlük, filtre ve giriş metni gibi bilgiler state için tipik örneklerdir.

`useState` Hook’u, fonksiyon bileşeni içinde state tanımlamanın temel yoludur. `const [value, setValue] = useState(initialValue)` örüntüsünde ilk değer mevcut state’i, ikinci değer ise state’i güncelleyen fonksiyonu temsil eder. State güncellendiğinde React bileşeni yeniden render eder ve arayüz yeni değere göre hesaplanır.

Nesne ve dizi state güncellemelerinde doğrudan mutasyon yerine yeni değer üretmek gerekir. Spread syntax, `map`, `filter` ve fonksiyonel güncelleme biçimi bu yaklaşımın temel araçlarıdır. Özellikle önceki state değerine bağlı güncellemelerde `setCount((previousCount) => previousCount + 1)` gibi fonksiyonel yazım tercih edilmelidir.

Terim sözlüğü:

| Terim | Açıklama |
|---|---|
| State | Bileşenin zaman içinde değişebilen yerel verisi |
| `useState` | Fonksiyon bileşeninde state tanımlamak için kullanılan React Hook’u |
| Setter fonksiyonu | State değerini güncellemek için kullanılan fonksiyon |
| Event handler | Kullanıcı olayına yanıt veren fonksiyon |
| Re-render | State veya props değiştiğinde bileşenin çıktısının yeniden hesaplanması |
| Immutable update | Var olan değeri doğrudan değiştirmeden yeni değer üretme yaklaşımı |
| Functional update | Setter fonksiyonuna önceki state’i alan bir fonksiyon verme biçimi |
| Local state | Belirli bir bileşen veya küçük bileşen grubu içinde yönetilen durum |
| Derived value | State’ten hesaplanabilen ve ayrıca state olarak tutulması gerekmeyen değer |

<!-- CODE_META
id: react_ch06_code04
chapter_id: chapter_06
language: javascript
kind: example
title_key: "immutable_favorite_event_update"
file: "immutable_favorite_event_update.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "Bahar Şenliği: favorite"
  - "Kariyer Günü: normal"
  - "same array: false"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function toggleFavoriteEvent(events, selectedEventId) {
  return events.map((event) => {
    if (event.id !== selectedEventId) {
      return event;
    }

    return {
      ...event,
      isFavorite: !event.isFavorite
    };
  });
}

const events = [
  { id: "spring", title: "Bahar Şenliği", isFavorite: false },
  { id: "career", title: "Kariyer Günü", isFavorite: false }
];

const updatedEvents = toggleFavoriteEvent(events, "spring");

for (const event of updatedEvents) {
  const label = event.isFavorite ? "favorite" : "normal";
  console.log(`${event.title}: ${label}`);
}

console.log(`same array: ${events === updatedEvents}`);
```

Bu örnekte dizi doğrudan değiştirilmez. `map` yeni bir dizi üretir. Yalnızca seçilen etkinlik nesnesi yeni değerle kopyalanır; diğer nesneler olduğu gibi korunur. Bu, React dizi state güncellemelerinde sık kullanılan temel örüntüdür.

## 6.13 Kavramsal sorular

1. React’te state neden doğrudan değişken atamasıyla güncellenmez?
2. Props ve state arasındaki farkı KampüsHub modül kartları üzerinden açıklayınız.
3. Bir verinin state olup olmayacağına karar verirken hangi sorular sorulmalıdır?
4. `useState` tarafından döndürülen iki elemanın rolleri nedir?
5. State değiştiğinde React’in bileşeni yeniden render etmesi ne anlama gelir?
6. `onClick={setOpen(true)}` kullanımının problemi nedir?
7. Nesne state güncellerken spread syntax neden kullanılır?
8. Dizi state güncellerken `map` ve `filter` hangi tür problemlerde tercih edilir?
9. Fonksiyonel güncelleme biçimi hangi durumlarda daha güvenlidir?
10. `searchText` state iken `filteredModules` neden çoğu zaman ayrı bir state olmak zorunda değildir?
11. State’in child bileşende değil parent bileşende tutulması gereken bir KampüsHub senaryosu veriniz.
12. Gereksiz state çoğalmasının sürdürülebilirlik açısından riskleri nelerdir?

## 6.14 Programlama alıştırmaları

1. KampüsHub ana ekranında `selectedModuleId` adlı bir state tanımlayınız. Her modül kartına tıklandığında bu değeri ilgili modülün `id` değeriyle güncelleyiniz.
2. `isProfileOpen` adlı boolean state kullanarak profil panelini açıp kapatan bir buton yazınız.
3. `unreadAnnouncementCount` adlı number state tanımlayınız. “Bir duyuru okundu” butonuna tıklandığında sayaç değerini bir azaltınız; değerin sıfırın altına düşmesini engelleyiniz.
4. `searchText` adlı string state ile bir arama kutusu oluşturunuz. Kullanıcı yazdıkça modül kartlarını başlığa göre filtreleyiniz.
5. Etkinlikler için `isFavorite` alanı içeren bir dizi oluşturunuz. Kullanıcı bir etkinlikteki favori butonuna tıkladığında yalnızca ilgili etkinliğin favori durumunu değiştiriniz.
6. Bir `ModuleFilter` bileşeni yazınız. Bu bileşen `searchText` ve `onSearchTextChange` prop’larını alsın. State’i parent bileşende tutunuz.
7. Hatalı olarak doğrudan dizi mutasyonu yapan bir örnek yazınız ve daha sonra bunu immutable yaklaşımla düzeltiniz.
8. `selectedModuleId` değerine göre ekranın sağ tarafında seçili modül açıklamasını gösteren bir detay paneli oluşturunuz.
9. `showOnlyFavorites` adlı boolean state ile yalnızca favori etkinlikleri gösteren bir filtre ekleyiniz.
10. Kodunuzda hangi değerlerin state, hangi değerlerin props ve hangi değerlerin türetilmiş değer olduğunu kısa bir yorum bloğunda açıklayınız.

<!-- CODE_META
id: react_ch06_code05
chapter_id: chapter_06
language: javascript
kind: example
title_key: "filter_modules_by_search_text"
file: "filter_modules_by_search_text.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "query: du"
  - "Duyurular"
  - "count: 1"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function filterModulesBySearchText(modules, searchText) {
  const normalizedSearchText = searchText.trim().toLocaleLowerCase("tr-TR");

  return modules.filter((module) => {
    const normalizedTitle = module.title.toLocaleLowerCase("tr-TR");
    return normalizedTitle.includes(normalizedSearchText);
  });
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const query = "du";
const filteredModules = filterModulesBySearchText(modules, query);

console.log(`query: ${query}`);
console.log(filteredModules.map((module) => module.title).join(", "));
console.log(`count: ${filteredModules.length}`);
```

Bu örnek `searchText` state’inden türetilebilecek bir değeri gösterir. React bileşeninde `searchText` state olarak tutulabilir; `filteredModules` ise render sırasında hesaplanabilir. Böylece aynı bilginin iki ayrı state değerinde tutulmasından kaynaklanabilecek tutarsızlık önlenir.

## 6.15 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub ana ekranını state tabanlı etkileşimlerle geliştirmektir. Öğrenci, Bölüm 5’te props ile veri alan modül kartlarını koruyacak; ancak bu kartları artık kullanıcı etkileşimine yanıt veren bir yapıya dönüştürecektir.

Görev kapsamı:

1. `App.jsx` içinde veya uygun bir parent bileşende `selectedModuleId` state’i tanımlayınız.
2. Modül kartlarından birine tıklandığında ilgili kartı seçili hâle getiriniz.
3. Seçili kart için CSS sınıfını değiştiriniz ve kullanıcıya görsel geri bildirim sağlayınız.
4. `unreadAnnouncementCount` state’i ile duyuru kartında okunmamış duyuru sayısını gösteriniz.
5. Bir buton yardımıyla okunmamış duyuru sayısını azaltınız; değer sıfırın altına düşmemelidir.
6. `isProfileOpen` state’i ile profil panelini açıp kapatınız.
7. `searchText` state’i ile modül kartlarını filtreleyen bir arama alanı ekleyiniz.
8. En az bir etkinlik için favori durumunu dizi state içinde immutable biçimde güncelleyiniz.

Teslim dosyaları:

- `src/App.jsx`
- Kullanılıyorsa `src/components/ModuleCard.jsx`
- Kullanılıyorsa `src/components/ProfilePanel.jsx`
- Kullanılıyorsa `src/components/SearchBox.jsx`
- `src/App.css` veya ilgili stil dosyası
- Çalışan ekran görüntüsü
- Kısa teknik açıklama: hangi değerleri state olarak seçtiniz ve neden?

Değerlendirme ölçütleri:

| Ölçüt | Beklenti |
|---|---|
| State kullanımı | En az dört anlamlı state değeri tanımlanmış olmalı |
| Event handler | Tıklama ve giriş değişimi olayları doğru yönetilmeli |
| Immutable update | Nesne ve dizi güncellemelerinde doğrudan mutasyon yapılmamalı |
| Props-state ayrımı | Child bileşenlere gerekli değerler props olarak aktarılmalı |
| Kullanıcı deneyimi | Seçim, sayaç, panel ve filtre davranışları ekranda anlaşılır olmalı |
| Kod okunabilirliği | Adlandırmalar tutarlı, bileşen sorumlulukları ayrılmış olmalı |

## 6.16 İleri okuma ve bir sonraki bölüme geçiş

Bu bölümde KampüsHub arayüzünün yerel state ile nasıl etkileşimli hâle getirileceği ele alındı. Artık kullanıcı eylemleri ekrandaki veriyi değiştirebilmekte, React de bu değişime göre bileşenleri yeniden render edebilmektedir. Bu bilgi, modern web ve SPA yaklaşımının React içindeki pratik karşılığıdır: sayfa tamamen yenilenmeden arayüz güncellenir.

Bir sonraki bölümde `useEffect` ve yan etkiler konusu işlenecektir. State değişimi yalnızca ekrandaki metni veya sınıf adını değiştirmekle sınırlı değildir. Bazen state değiştiğinde dış dünyayla etkileşim gerekir: tarayıcı başlığını güncellemek, local storage kullanmak, zamanlayıcı başlatmak veya bir dış kaynaktan veri almak gibi işlemler yan etki kapsamına girer. Ancak yan etkileri doğru anlayabilmek için önce state’in ne olduğu, ne zaman değiştiği ve değiştiğinde bileşenin nasıl yeniden render edildiği açık biçimde kavranmalıdır.

İleri okuma için öğrencinin kendi KampüsHub kodunda şu soruları yanıtlaması önerilir:

- Hangi değerler gerçekten state olarak tutuluyor?
- Hangi değerler props olarak child bileşenlere aktarılıyor?
- Hangi değerler state’ten türetilebiliyor?
- Hangi güncellemelerde fonksiyonel setter kullanmak daha güvenli olur?
- State hangi bileşende tutulduğunda veri akışı daha anlaşılır kalıyor?

Bu sorulara verilecek yanıtlar, Bölüm 7’de `useEffect` kullanırken karşılaşılacak bağımlılık, güncelleme ve yan etki problemlerini daha anlaşılır hâle getirecektir.

## Programatik ekran çıktısı planı

<!-- SCREENSHOT_META
id: b06_01_state_sayac_ve_secim
chapter_id: chapter_06
title_key: "state_sayac_ve_secim"
route: "/__book__/chapter-06/state-sayac-ve-secim"
waitFor: ".counter-panel"
actions:
  - "click:[data-testid='increment-count']"
  - "click:[data-testid='select-events']"
output: "assets/auto/chapter_06/b06_01_state_sayac_ve_secim.png"
manual_path: "assets/manual/chapter_06/b06_01_state_sayac_ve_secim.png"
final_path: "assets/final/chapter_06/b06_01_state_sayac_ve_secim.png"
manual_override: true
caption: "State değişimiyle sayaç ve seçili modül görünümünün güncellenmesi."
-->
[SCREENSHOT:b06_01_state_sayac_ve_secim]

<!-- SCREENSHOT_META
id: b06_02_kampushub_state_modul_secimi
chapter_id: chapter_06
title_key: "kampushub_state_modul_secimi"
route: "/__book__/chapter-06/kampushub-state-modul-secimi"
waitFor: ".module-grid"
actions:
  - "click:[data-module-id='announcements']"
  - "click:[data-module-id='events']"
output: "assets/auto/chapter_06/b06_02_kampushub_state_modul_secimi.png"
manual_path: "assets/manual/chapter_06/b06_02_kampushub_state_modul_secimi.png"
final_path: "assets/final/chapter_06/b06_02_kampushub_state_modul_secimi.png"
manual_override: true
caption: "KampüsHub modül kartlarında seçili kart state’inin görsel karşılığı."
-->
[SCREENSHOT:b06_02_kampushub_state_modul_secimi]

<!-- SCREENSHOT_META
id: b06_03_duyuru_favori_filtre
chapter_id: chapter_06
title_key: "duyuru_favori_filtre"
route: "/__book__/chapter-06/duyuru-favori-filtre"
waitFor: ".dashboard-filters"
actions:
  - "fill:[data-testid='module-search']=>du"
  - "click:[data-testid='mark-announcement-read']"
  - "click:[data-testid='toggle-favorite-event']"
output: "assets/auto/chapter_06/b06_03_duyuru_favori_filtre.png"
manual_path: "assets/manual/chapter_06/b06_03_duyuru_favori_filtre.png"
final_path: "assets/final/chapter_06/b06_03_duyuru_favori_filtre.png"
manual_override: true
caption: "Duyuru sayacı, favori etkinlik ve arama filtresinin state ile birlikte çalışması."
-->
[SCREENSHOT:b06_03_duyuru_favori_filtre]
