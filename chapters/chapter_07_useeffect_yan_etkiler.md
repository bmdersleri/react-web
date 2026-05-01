---
title: "Bölüm 7: useEffect ve Yan Etkiler"
chapter_id: "chapter_07"
content_language: "tr-TR"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
numbering_policy: "manual_visible_for_current_pipeline"
automation_profile: "parametric_computer_book_factory_v2_0"
code_policy: "CODE_META blocks precede executable JavaScript fences"
screenshot_policy: "SCREENSHOT_META plus [SCREENSHOT:*] markers"
---

# Bölüm 7: useEffect ve Yan Etkiler

## 7.1 Bölümün yol haritası

Önceki bölümde React uygulamalarında değişen verinin `state` ile nasıl yönetildiği ele alındı. KampüsHub ana ekranında seçili modül, okunmamış duyuru sayısı, profil panelinin açık/kapalı durumu ve arama metni gibi arayüz durumları `useState` ile temsil edildi. Bu noktaya kadar uygulama, kullanıcı etkileşimine tepki verebilen bir yapıya kavuştu. Ancak modern web uygulamalarında her değişim yalnızca ekrandaki JSX çıktısını yeniden hesaplamakla sınırlı değildir. Bazen bir state değiştiğinde tarayıcı sekme başlığını güncellemek, dış bir kaynaktan veri almak, zamanlayıcı başlatmak, klavye olayını dinlemek, tarayıcı depolama alanına tercih yazmak veya bileşen ekrandan ayrılırken başlatılmış bir işlemi temizlemek gerekir. React’te bu tür işlemler genel olarak **yan etki** olarak adlandırılır.

Bu bölümde `useEffect` Hook’u üzerinden yan etkilerin nasıl yönetileceği incelenecektir. Önce render işleminin neden mümkün olduğunca saf kalması gerektiği açıklanacak, ardından `useEffect` sözdizimi, bağımlılık dizisi, cleanup fonksiyonu ve asenkron veri yükleme örüntüleri KampüsHub senaryolarıyla gösterilecektir. Bölüm boyunca amaç, öğrencinin `useEffect` yazabilmesi kadar, hangi işlemin effect içinde yapılması gerektiğini ve hangi işlemin doğrudan render sırasında hesaplanabileceğini ayırt edebilmesidir.

Bu bölümün temel soruları şunlardır:

- React’te yan etki ne anlama gelir?
- Render sırasında hangi işlemler yapılmalı, hangileri `useEffect` içine taşınmalıdır?
- `useEffect` bağımlılık dizisi verilmediğinde, boş verildiğinde veya değerlerle verildiğinde nasıl davranır?
- Bileşen ekrana geldiğinde, güncellendiğinde ve ekrandan ayrıldığında effect nasıl çalışır?
- Cleanup fonksiyonu neden gereklidir?
- Zamanlayıcılar, event listener’lar ve abonelikler güvenli biçimde nasıl temizlenir?
- Asenkron veri getirme işlemi `useEffect` içinde nasıl kurgulanmalıdır?
- KampüsHub’da duyuru yükleme, sekme başlığı güncelleme ve kullanıcı tercihlerini saklama nasıl modellenebilir?

Bölüm sonunda KampüsHub uygulaması yalnızca state’e tepki veren bir arayüz olmaktan çıkacak; seçili modüle göre dış dünyayı güncelleyen, sahte veri kaynağından duyuru yükleyen, zamanlayıcıları güvenli yöneten ve bileşen yaşam döngüsüne duyarlı davranan bir yapıya doğru ilerleyecektir.

## 7.2 Bölümün konumu

Bölüm 1’de modern web, SPA yaklaşımı, React ekosistemi, Node.js, npm, Vite, HMR, React DevTools, `package.json`, `index.html`, `main.jsx` ve `App.jsx` gibi geliştirme ortamı kavramları tanıtıldı. Bölüm 2’de React kodlarını okuyabilmek için gerekli JavaScript ES6+ altyapısı kuruldu. Bölüm 3’te HTML ve CSS yapısından bileşen düşüncesine geçildi. Bölüm 4’te JSX ve fonksiyon bileşenlerinin anatomisi incelendi. Bölüm 5’te props ile tek yönlü veri akışı kuruldu. Bölüm 6’da ise `state` ve `useState` ile değişen arayüz verisi yönetildi.

Bölüm 7, bu birikimin doğal devamıdır. Çünkü state değiştiğinde çoğu zaman başka bir işlem de tetiklenmek istenir. Kullanıcı KampüsHub’da “Duyurular” modülünü seçtiğinde ekranda duyuru bileşeni görünür; bu render sonucudur. Ancak aynı anda tarayıcı sekme başlığının “KampüsHub | Duyurular” olması, dış dünyaya yapılan bir güncellemedir. Benzer biçimde duyuruların bir servis fonksiyonundan yüklenmesi, belirli aralıklarla etkinlik geri sayımının güncellenmesi veya filtre tercihinin tarayıcı depolamasına yazılması render işleminin doğal parçası değil, render sonrasında yürütülmesi gereken yan etkilerdir.

Bu bölüm, ileride işlenecek özel hook’lar, React Router, REST API entegrasyonu ve global state yönetimi konularının temelini güçlendirir. Özellikle veri yükleme, cleanup ve bağımlılık dizisi sezgisi yerleşmeden daha ileri veri yönetimi konularına geçmek, öğrencinin hatalı örüntüler geliştirmesine neden olabilir. Bu nedenle Bölüm 7, kısa bir Hook tanıtımı değil, React’te yan etki düşüncesinin sistematik olarak kurulduğu merkezi bir bölümdür.

## 7.3 Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. React’te yan etki kavramını render çıktısından ayırır.
2. `useEffect` Hook’unun temel sözdizimini açıklar.
3. Bağımlılık dizisi verilmemesi, boş bağımlılık dizisi ve değer içeren bağımlılık dizisi arasındaki farkı yorumlar.
4. Component mount, update ve unmount kavramlarını `useEffect` davranışıyla ilişkilendirir.
5. Cleanup fonksiyonunun zamanlayıcı, event listener ve aboneliklerdeki önemini açıklar.
6. `document.title` gibi tarayıcı ortamı güncellemelerini effect içinde konumlandırır.
7. Asenkron veri yükleme işlemini effect içinde güvenli bir örüntüyle tasarlar.
8. Sonsuz render döngüsü oluşturan hatalı effect kullanımını tanır.
9. Eksik veya gereksiz bağımlılıkların sonuçlarını tartışır.
10. React StrictMode geliştirme davranışını başlangıç düzeyinde yorumlar.
11. KampüsHub’da duyuru yükleme, sekme başlığı güncelleme, filtre kalıcılığı ve canlı sayaç gibi yan etkileri uygular.
12. Hangi verinin state, hangi işlemin effect, hangi değerin render sırasında türetilebilir olduğunu ayırt eder.

Bu öğrenme çıktıları, yalnızca `useEffect` satırını ezberlemeye değil, bileşenin dış dünya ile ilişkisinin disiplinli biçimde kurulmasına yöneliktir. Etkili React kodu, değişen veriyi yönetirken render safiyetini, yan etki zamanlamasını ve kaynak temizliğini birlikte düşünür.

## 7.4 Ön bilgi

Bu bölümde öğrencinin `useState` kullanımını bildiği varsayılır. Özellikle aşağıdaki yapıların anlaşılmış olması gerekir:

```jsx
const [selectedModuleId, setSelectedModuleId] = useState(null);
const [searchText, setSearchText] = useState("");
const [isProfileOpen, setIsProfileOpen] = useState(false);
```

Ayrıca öğrenci JSX içinde olay bağlama, örneğin `onClick`, `onChange` ve koşullu render gibi temel React örüntülerini kullanabilmelidir. Bölüm 5’te öğrenilen props bilgisi de önemlidir; çünkü yan etkilerin çoğu yalnızca yerel state’e değil, parent bileşenden gelen prop değerlerine de bağlı olabilir. Bir `ModuleDetail` bileşeni `selectedModule` prop’u aldığında, seçili modül değiştikçe bir effect çalıştırılması gerekebilir.

JavaScript tarafında arrow function, dizi ve nesne işlemleri, `Promise`, `async` / `await`, `setTimeout`, `setInterval`, `clearInterval` ve basit koşul ifadeleri bu bölüm için yeterlidir. Bu bölümde gerçek REST API çağrıları yapılmayacak; veri yükleme mantığı sahte servis fonksiyonlarıyla gösterilecektir. Böylece öğrencinin odağı ağ, kimlik doğrulama veya backend ayrıntılarına değil, React’te yan etkinin doğru konumlandırılmasına yönelir.

Geliştirme ortamı olarak Bölüm 1’de kurulan Vite tabanlı React projesi kullanılacaktır. Proje `npm create vite@latest` ile oluşturulmuş, `npm install` ile bağımlılıkları yüklenmiş ve `npm run dev` ile çalıştırılmış olmalıdır. HMR sayesinde effect davranışlarını gözlemlemek kolaylaşır; React DevTools ise bileşen ağacını, props ve state değerlerini incelemek için kullanılabilir. `App.jsx`, KampüsHub ana uygulama bileşeni olarak geliştirilmeye devam edecektir.

Bu bölümde bazı JSX örnekleri verilecek; ancak otomatik test hattı için kullanılan `CODE_META` örnekleri saf JavaScript biçiminde hazırlanacaktır. Bunun nedeni, Node.js ortamında React DOM veya tarayıcı API’lerine ihtiyaç duymadan kavramsal davranışları test edilebilir hâle getirmektir.

## 7.5 Yan etki kavramı: render safiyeti ve dış dünya

React’te bir fonksiyon bileşeni temelde şunu yapar: kendisine verilen props ve mevcut state değerlerine bakar, ekranda ne gösterileceğini hesaplar. Bu hesaplama mümkün olduğunca saf olmalıdır. Saf hesaplama, aynı girdiyle aynı çıktıyı üretir ve dış dünyayı değiştirmez. Örneğin `modules.filter(...)` ile görünür modülleri hesaplamak render sırasında yapılabilir; çünkü bu işlem yalnızca veri hesaplar. Buna karşılık `document.title = "KampüsHub"` yazmak, tarayıcı sekmesini değiştirir. Bu artık yalnızca hesaplama değildir; dış dünyaya müdahaledir.

Yan etki; render sonucunu hesaplamanın ötesine geçen, bileşen dışındaki bir sistemi etkileyen veya dış sistemden bilgi alan işlemdir. Tarayıcı başlığını değiştirmek, veri istemek, zamanlayıcı başlatmak, klavye olayını dinlemek, depolama alanına yazmak, abonelik kurmak veya log göndermek yan etki örnekleridir.

KampüsHub özelinde aşağıdaki işlemler yan etki adayıdır:

- Seçili modül değiştiğinde tarayıcı sekme başlığını güncellemek.
- Duyurular ekranı açıldığında duyuru listesini sahte servisten yüklemek.
- Etkinlik geri sayımı için belirli aralıklarla zamanlayıcı çalıştırmak.
- Arama filtresini tarayıcı depolamasına kaydetmek.
- Bileşen ekrandan ayrıldığında açık zamanlayıcıyı temizlemek.
- Pencere boyutu değiştiğinde yerleşim bilgisini güncellemek.

Buna karşılık aşağıdaki işlemler doğrudan render sırasında hesaplanabilir:

- Modül listesinden aktif modülü bulmak.
- Duyuru sayısını dizi uzunluğundan hesaplamak.
- Arama metnine göre görünür kart listesini filtrelemek.
- Bir kartın CSS sınıfını state değerine göre belirlemek.
- Boş liste durumunda hangi metnin gösterileceğine karar vermek.

Bu ayrım önemlidir. Her hesaplamayı `useEffect` içine taşımak React kodunu gereksiz karmaşık hâle getirir. Her yan etkiyi render sırasında yapmak ise beklenmeyen tekrar çalışmalara, sonsuz döngülere ve kaynak sızıntılarına yol açabilir. Doğru React sezgisi, “Bu işlem yalnızca görüntüyü hesaplıyor mu, yoksa dış dünyayı değiştiriyor mu?” sorusuyla başlar.

<!-- CODE_META
id: react_ch07_code01
chapter_id: chapter_07
language: javascript
kind: example
title_key: "effect_candidate_classifier"
file: "effect_candidate_classifier.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "documentTitle: effect"
  - "visibleModules: render"
  - "timer: effect"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
const tasks = [
  { name: "documentTitle", touchesExternalSystem: true },
  { name: "visibleModules", touchesExternalSystem: false },
  { name: "timer", touchesExternalSystem: true },
  { name: "activeCssClass", touchesExternalSystem: false }
];

function classifyTask(task) {
  return task.touchesExternalSystem ? "effect" : "render";
}

for (const task of tasks) {
  console.log(`${task.name}: ${classifyTask(task)}`);
}
```

Bu örnekte `visibleModules` ve `activeCssClass` yalnızca render çıktısını hesaplayan işlerdir. `documentTitle` ve `timer` ise dış sistemle ilişkilidir; bu nedenle React bileşeninde `useEffect` içinde konumlandırılmalıdır.

## 7.6 useEffect temel sözdizimi

`useEffect`, React fonksiyon bileşenlerinde yan etkileri yönetmek için kullanılan Hook’tur. En temel kullanım biçimi şöyledir:

```jsx
import { useEffect } from "react";

function CampusHubTitle() {
  useEffect(() => {
    document.title = "KampüsHub";
  });

  return <h2>KampüsHub ana ekranı</h2>;
}
```

Bu örnekte effect fonksiyonu bileşen render edildikten sonra çalışır. Tarayıcı sekme başlığını değiştirme işlemi doğrudan render sırasında değil, render tamamlandıktan sonra yürütülür. Böylece bileşenin JSX hesaplama aşaması dış dünyayı doğrudan değiştirmez.

`useEffect` iki ana parçadan oluşur:

```jsx
useEffect(() => {
  // Yan etki burada çalışır.
}, [/* bağımlılıklar */]);
```

Birinci argüman effect fonksiyonudur. İkinci argüman ise bağımlılık dizisidir. Bağımlılık dizisi, effect’in hangi değerler değiştiğinde yeniden çalışacağını belirler. Bu dizi, `useEffect` öğrenimindeki en kritik konulardan biridir. Çünkü yanlış bağımlılık dizisi, ya gereksiz tekrar çalışmaya ya da güncel olmayan veriyle işlem yapmaya neden olur.

KampüsHub’da seçili modüle göre başlık güncellemek için tipik kullanım şöyledir:

```jsx
import { useEffect, useState } from "react";

function App() {
  const [selectedModuleId, setSelectedModuleId] = useState("announcements");

  useEffect(() => {
    document.title = `KampüsHub | ${selectedModuleId}`;
  }, [selectedModuleId]);

  return (
    <main>
      <button onClick={() => setSelectedModuleId("announcements")}>Duyurular</button>
      <button onClick={() => setSelectedModuleId("events")}>Etkinlikler</button>
    </main>
  );
}
```

Burada effect yalnızca `selectedModuleId` değiştiğinde yeniden çalışır. Kullanıcı “Etkinlikler” düğmesine tıkladığında state güncellenir, bileşen yeniden render edilir ve effect yeni seçili modül bilgisiyle tarayıcı başlığını günceller.

Önemli nokta şudur: Effect, JSX döndürmez. Bir effect fonksiyonu ekranda ne gösterileceğini değil, render sonrası yapılacak işi tanımlar. Ekran çıktısı hâlâ `return` içindeki JSX ile belirlenir.

## 7.7 Bağımlılık dizisi: ne zaman çalışmalı?

`useEffect` davranışını belirleyen en önemli parça bağımlılık dizisidir. Üç temel kullanım biçimi vardır.

Birinci biçimde bağımlılık dizisi hiç verilmez:

```jsx
useEffect(() => {
  console.log("Her render sonrası çalışır.");
});
```

Bu kullanımda effect, her render sonrasında çalışır. Küçük ve zararsız log örneklerinde anlaşılabilir görünse de çoğu uygulama kodunda dikkatli kullanılmalıdır. Çünkü effect içinde state güncellemesi varsa kolayca sonsuz render döngüsü oluşabilir.

İkinci biçimde boş bağımlılık dizisi verilir:

```jsx
useEffect(() => {
  console.log("Bileşen ekrana ilk geldiğinde çalışır.");
}, []);
```

Bu kullanım, bileşen ilk kez ekrana bağlandığında çalışması gereken işlemler için uygundur. Örneğin KampüsHub duyurularını ilk yükleme işlemi bu gruba girebilir. Ancak effect içinde kullanılan dış değerler varsa boş dizi her zaman doğru değildir. Effect’in kullandığı ve zamanla değişebilen değerler bağımlılık dizisine eklenmelidir.

Üçüncü biçimde bağımlılık dizisi belirli değerleri içerir:

```jsx
useEffect(() => {
  document.title = `KampüsHub | ${selectedModuleId}`;
}, [selectedModuleId]);
```

Bu kullanımda effect ilk render sonrasında çalışır; daha sonra yalnızca `selectedModuleId` değiştiğinde yeniden çalışır. KampüsHub’da seçili modül değiştiğinde başlığı güncelleme, filtre metni değiştiğinde depolama alanına yazma veya kullanıcı kimliği değiştiğinde profil bilgisi yükleme gibi işlemler bu örüntüye uygundur.

Bağımlılık dizisini bir “ne zaman çalışmalı?” listesi olarak düşünmek faydalıdır. Effect içinde kullanılan ve değiştiğinde effect’in yeniden çalışması gereken her değer bu listeye dahil edilmelidir. Gereksiz değerler eklendiğinde effect fazla çalışır; gerekli değerler eksik bırakıldığında effect eski veriyle çalışabilir.

<!-- CODE_META
id: react_ch07_code02
chapter_id: chapter_07
language: javascript
kind: example
title_key: "dependency_array_decision"
file: "dependency_array_decision.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "noArray: every-render"
  - "emptyArray: mount-only"
  - "selectedModuleId: when-value-changes"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
const effectPatterns = [
  { dependencyArray: undefined, label: "noArray" },
  { dependencyArray: [], label: "emptyArray" },
  { dependencyArray: ["selectedModuleId"], label: "selectedModuleId" }
];

function describePattern(pattern) {
  if (pattern.dependencyArray === undefined) return "every-render";
  if (pattern.dependencyArray.length === 0) return "mount-only";
  return "when-value-changes";
}

for (const pattern of effectPatterns) {
  console.log(`${pattern.label}: ${describePattern(pattern)}`);
}
```

Bu örnek gerçek React çalıştırmaz; ancak bağımlılık dizisi sezgisini test edilebilir bir karar modeliyle gösterir. React kodunda aynı ayrım effect’in ne sıklıkla çalışacağını belirler.

## 7.8 KampüsHub’da document.title güncelleme

KampüsHub gibi çok bölümlü bir uygulamada kullanıcı farklı modüller arasında gezindikçe tarayıcı sekme başlığının değişmesi iyi bir kullanıcı deneyimi sağlar. Örneğin kullanıcı duyurular modülündeyken sekme başlığı “KampüsHub | Duyurular”, etkinlikler modülündeyken “KampüsHub | Etkinlikler” olabilir.

Bu davranış render çıktısının parçası değildir. JSX içinde hangi başlığın ekranda görüneceğini belirlemek başka, tarayıcının sekme başlığını değiştirmek başka bir iştir. Bu nedenle `document.title` güncellemesi effect içinde yapılmalıdır.

```jsx
import { useEffect, useState } from "react";

const moduleLabels = {
  announcements: "Duyurular",
  events: "Etkinlikler",
  notes: "Not Paylaşımı",
  profile: "Profil"
};

function App() {
  const [selectedModuleId, setSelectedModuleId] = useState("announcements");

  useEffect(() => {
    const label = moduleLabels[selectedModuleId] ?? "Ana Sayfa";
    document.title = `KampüsHub | ${label}`;
  }, [selectedModuleId]);

  return (
    <section>
      <h2>{moduleLabels[selectedModuleId]}</h2>
      <button onClick={() => setSelectedModuleId("events")}>Etkinliklere geç</button>
    </section>
  );
}
```

Bu kodda `selectedModuleId` değiştiğinde bileşen yeniden render edilir. Render sonucunda ekrandaki başlık güncellenir. Render tamamlandıktan sonra effect çalışır ve tarayıcı sekme başlığını yeni seçili modüle göre ayarlar.

Bu örnek küçük görünse de güçlü bir ilkeyi gösterir: UI hesaplaması ile dış sistem güncellemesini ayırmak. Ekranda görünen `<h2>` doğrudan render çıktısıdır. `document.title` ise tarayıcı ortamına yapılan yan etkidir. Bu ayrım büyüyen uygulamalarda kodun okunabilirliğini artırır.

### SCREENSHOT_META

```yaml
id: b07_01_document_title_effect
chapter: chapter_07
figure: "Şekil 7.1"
title: "Seçili KampüsHub modülüne göre tarayıcı başlığı güncelleme"
route: "/__book__/chapter-07/document-title-effect"
waitFor: "[data-book-shot='document-title-effect']"
actions:
  - "events modülüne geçiş düğmesine tıkla"
output: "assets/auto/chapter_07/b07_01_document_title_effect.png"
caption: "Şekil 7.1. useEffect ile seçili modül değişimine bağlı olarak document.title değerinin güncellenmesi."
markdownTarget: "[SCREENSHOT:b07_01_document_title_effect]"
```

[SCREENSHOT:b07_01_document_title_effect]

## 7.9 KampüsHub veri yükleme senaryosu

React uygulamalarında `useEffect` için en yaygın kullanım alanlarından biri veri yüklemedir. KampüsHub’da duyuru listesi başlangıçta boş olabilir; bileşen ekrana geldiğinde duyurular bir servis fonksiyonundan alınabilir. Bu bölümde gerçek ağ isteği yerine sahte bir servis fonksiyonu kullanılacaktır. Böylece veri yükleme mantığı dış sistem karmaşıklığından arındırılmış biçimde incelenebilir.

Temel fikir şudur: Bileşen ekrana geldiğinde bir effect çalışır, yükleme durumu başlatılır, veri geldikten sonra state güncellenir. Eğer hata oluşursa hata state’i ayarlanır. Bu örüntü ileride gerçek REST API entegrasyonu yapılırken de kullanılacaktır.

```jsx
import { useEffect, useState } from "react";

function AnnouncementsPanel() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        setIsLoading(true);
        const result = await fetchAnnouncements();
        setAnnouncements(result);
      } catch (error) {
        setErrorMessage("Duyurular yüklenemedi.");
      } finally {
        setIsLoading(false);
      }
    }

    loadAnnouncements();
  }, []);

  if (isLoading) return <p>Duyurular yükleniyor...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (announcements.length === 0) return <p>Henüz duyuru yok.</p>;

  return (
    <ul>
      {announcements.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

Bu örnekte `useEffect` içine doğrudan `async` fonksiyon verilmemiştir. Bunun yerine effect içinde `loadAnnouncements` adlı bir async fonksiyon tanımlanmış ve çağrılmıştır. Bunun nedeni, effect fonksiyonunun dönüş değerinin ya hiçbir şey ya da cleanup fonksiyonu olması gerektiğidir. Doğrudan `async` effect yazıldığında fonksiyon Promise döndürür; bu React’in cleanup beklentisiyle uyumlu değildir.

Veri yükleme sürecinde üç farklı arayüz durumu ayrı ele alınmalıdır: yükleniyor, hata ve başarılı veri. Bu ayrım kullanıcı deneyimi açısından önemlidir. Öğrenci yalnızca `setAnnouncements` kullanmaya odaklanmamalı; yükleme ve hata state’lerinin de arayüzün gerçekçi davranışı için gerekli olduğunu görmelidir.

<!-- CODE_META
id: react_ch07_code03
chapter_id: chapter_07
language: javascript
kind: example
title_key: "fake_announcements_loader"
file: "fake_announcements_loader.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "Yükleme başladı"
  - "Duyuru sayısı: 3"
  - "Yükleme tamamlandı"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function fetchAnnouncementsMock() {
  const announcements = [
    { id: 1, title: "Vize takvimi güncellendi" },
    { id: 2, title: "React laboratuvarı Cuma günü" },
    { id: 3, title: "Kampüs etkinliği başvuruları açıldı" }
  ];

  return Promise.resolve(announcements);
}

async function loadAnnouncements() {
  console.log("Yükleme başladı");
  const result = await fetchAnnouncementsMock();
  console.log(`Duyuru sayısı: ${result.length}`);
  console.log("Yükleme tamamlandı");
}

loadAnnouncements();
```

Bu saf JavaScript örneği, React bileşeninde effect içinde yapılacak veri yükleme işinin temel akışını test edilebilir biçimde gösterir. Gerçek bileşende bu akış `setIsLoading`, `setAnnouncements` ve `setErrorMessage` gibi state güncellemeleriyle birleştirilir.

### SCREENSHOT_META

```yaml
id: b07_02_announcement_loading_effect
chapter: chapter_07
figure: "Şekil 7.2"
title: "Duyuru yükleme effect'i ve yükleniyor durumu"
route: "/__book__/chapter-07/announcement-loading-effect"
waitFor: "[data-book-shot='announcement-loading-effect']"
actions:
  - "duyuru panelinin yüklenmesini bekle"
output: "assets/auto/chapter_07/b07_02_announcement_loading_effect.png"
caption: "Şekil 7.2. useEffect içinde sahte veri kaynağından duyuru yükleme, yükleniyor ve sonuç durumlarının gösterilmesi."
markdownTarget: "[SCREENSHOT:b07_02_announcement_loading_effect]"
```

[SCREENSHOT:b07_02_announcement_loading_effect]

## 7.10 Sık yapılan hatalar

`useEffect` öğrenilirken en sık karşılaşılan hata, effect içinde state güncelleyip bağımlılık dizisini yanlış kurmaktır. Örneğin aşağıdaki örüntü tehlikelidir:

```jsx
useEffect(() => {
  setCount(count + 1);
});
```

Bağımlılık dizisi verilmediği için effect her render sonrasında çalışır. Effect çalışınca `setCount` çağrılır, state değişir, bileşen yeniden render edilir, effect tekrar çalışır. Bu döngü devam eder. Bu tür hatalar sonsuz render döngüsüne veya uygulamanın kilitlenmesine yol açabilir.

İkinci yaygın hata, effect içinde kullanılan değerleri bağımlılık dizisine eklememektir:

```jsx
useEffect(() => {
  document.title = `KampüsHub | ${selectedModuleId}`;
}, []);
```

Burada `selectedModuleId` effect içinde kullanılmasına rağmen bağımlılık dizisinde yoktur. Bu durumda effect yalnızca ilk render sonrasında çalışır; seçili modül değiştiğinde tarayıcı başlığı güncellenmeyebilir. Doğru kullanım:

```jsx
useEffect(() => {
  document.title = `KampüsHub | ${selectedModuleId}`;
}, [selectedModuleId]);
```

Üçüncü hata, türetilebilir veriyi gereksiz state ve effect ile yönetmektir. Örneğin `announcements.length` değerini ayrı bir `announcementCount` state’i olarak tutmak çoğu durumda gereksizdir. Duyuru sayısı doğrudan render sırasında hesaplanabilir:

```jsx
const announcementCount = announcements.length;
```

Bu tür basit türetmeler için effect kullanmak kodu karmaşıklaştırır ve tutarsızlık riskini artırır. Eğer bir değer başka state veya props değerlerinden doğrudan hesaplanabiliyorsa, çoğu durumda ayrı state ve effect gerektirmez.

Dördüncü hata cleanup fonksiyonunu unutmaktır. `setInterval`, `addEventListener` veya abonelik başlatan bir effect, bileşen ekrandan ayrıldığında bu kaynağı temizlemelidir. Aksi hâlde görünmeyen bileşenler arka planda işlem yapmaya devam edebilir. Bu durum bellek sızıntısı, gereksiz işlem yükü veya beklenmeyen state güncellemeleri oluşturabilir.

Beşinci hata, StrictMode davranışını yanlış yorumlamaktır. Geliştirme ortamında React bazı effect’leri iki kez çalıştırıyor gibi görünebilir. Bu durum, cleanup mantığını test etmeye yardımcı olan bir geliştirme davranışıdır. Üretim davranışıyla birebir aynı algılanmamalıdır. Öğrenci bu durumu “React bozuk” şeklinde değil, “effect kodum cleanup açısından güvenli mi?” sorusuyla değerlendirmelidir.

## 7.11 Hata ayıklama

`useEffect` hatalarını ayıklamak için önce effect’in ne zaman çalıştığını görünür hâle getirmek gerekir. Başlangıç düzeyinde `console.log` kullanmak faydalıdır:

```jsx
useEffect(() => {
  console.log("selectedModuleId değişti:", selectedModuleId);
}, [selectedModuleId]);
```

Bu log, effect’in hangi state değişiminde çalıştığını gösterir. Eğer log beklenenden çok çalışıyorsa bağımlılık dizisi incelenmelidir. Eğer hiç çalışmıyorsa effect’in bulunduğu bileşenin gerçekten render edilip edilmediği ve bağımlılık değerinin değişip değişmediği kontrol edilmelidir.

İkinci adım, effect içinde state güncellemesi varsa bu güncellemenin gerçekten gerekli olup olmadığını sorgulamaktır. Her state güncellemesi yeni render demektir. Effect içinde yapılan gereksiz state güncellemesi, render sayısını artırır. Eğer değer render sırasında hesaplanabiliyorsa effect kaldırılmalıdır.

Üçüncü adım, cleanup kontrolüdür. Bir effect `setInterval`, `setTimeout`, `addEventListener` veya abonelik başlatıyorsa dönüşte cleanup fonksiyonu bulunmalıdır:

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("geri sayım güncellendi");
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

Dördüncü adım, React DevTools ile bileşen ağacını incelemektir. Effect’in bulunduğu bileşen beklenenden sık mount/unmount oluyorsa, sorun effect’in kendisinden çok parent bileşendeki koşullu render yapısından kaynaklanabilir. Örneğin KampüsHub’da seçili modül değiştikçe `AnnouncementsPanel` tamamen ekrandan kaldırılıp yeniden oluşturuluyorsa, boş bağımlılık dizisine sahip effect her yeniden oluşturma sırasında tekrar çalışacaktır.

Beşinci adım, bağımlılık dizisini metin olarak okumaktır. Effect içinde kullanılan her değişken için şu soru sorulmalıdır: “Bu değer değiştiğinde effect’in yeniden çalışması gerekir mi?” Cevap evetse değer diziye eklenmelidir. Cevap hayırsa o değerin effect içinde kullanımı yeniden tasarlanmalıdır.

<!-- CODE_META
id: react_ch07_code04
chapter_id: chapter_07
language: javascript
kind: example
title_key: "dependency_change_checker"
file: "dependency_change_checker.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "sameDeps:false"
  - "changedDeps:true"
  - "missingDeps:true"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function shouldRunEffect(previousDeps, nextDeps) {
  if (previousDeps === undefined || nextDeps === undefined) return true;
  if (previousDeps.length !== nextDeps.length) return true;

  return nextDeps.some((value, index) => !Object.is(value, previousDeps[index]));
}

const previous = ["announcements", 4];
const same = ["announcements", 4];
const changed = ["events", 4];
const missing = ["announcements"];

console.log(`sameDeps:${shouldRunEffect(previous, same)}`);
console.log(`changedDeps:${shouldRunEffect(previous, changed)}`);
console.log(`missingDeps:${shouldRunEffect(previous, missing)}`);
```

Bu örnek React’in iç algoritmasını tüm ayrıntılarıyla yeniden üretmez; fakat bağımlılık dizisi mantığını sezgisel olarak gösterir. Değer değiştiğinde effect yeniden çalışmalıdır. Bağımlılık sayısının değişmesi de sorunlu bir tasarıma işaret eder.

## 7.12 Bölüm özeti

Bu bölümde React’te yan etki kavramı `useEffect` Hook’u üzerinden ele alındı. Render işleminin temel görevinin JSX çıktısını hesaplamak olduğu, dış sistemlerle iletişim kuran işlemlerin ise effect içinde konumlandırılması gerektiği vurgulandı. KampüsHub örnekleri üzerinden `document.title` güncelleme, sahte duyuru servisiyle veri yükleme, bağımlılık dizisi, cleanup fonksiyonu ve hata ayıklama stratejileri açıklandı.

Öğrenilen en önemli ilke şudur: `useEffect`, her durumda başvurulacak genel amaçlı bir hesaplama aracı değildir. Bir değer props veya state’ten doğrudan hesaplanabiliyorsa render sırasında türetilebilir. Effect, dış dünya ile ilişki kurulduğunda, zamanlayıcı başlatıldığında, veri yüklendiğinde, abonelik oluşturulduğunda veya tarayıcı ortamı değiştirildiğinde kullanılmalıdır.

Bağımlılık dizisi, effect’in ne zaman yeniden çalışacağını belirler. Dizi verilmezse effect her render sonrasında çalışır. Boş dizi verilirse bileşenin ekrana bağlanma anında çalışır. Değer içeren dizi verilirse effect ilk render sonrasında ve bu değerlerden biri değiştiğinde çalışır. Effect içinde kullanılan ve değiştiğinde effect sonucunu etkilemesi gereken değerler bağımlılık dizisine eklenmelidir.

Cleanup fonksiyonu, effect’in başlattığı kaynakları temizlemek için kullanılır. Zamanlayıcı, event listener ve abonelik gibi işlemler cleanup olmadan bırakılırsa görünmeyen bileşenler arka planda çalışmaya devam edebilir. Bu durum bellek sızıntısı ve beklenmeyen davranışlar üretir.

KampüsHub tarafında bu bölüm, uygulamanın dış dünya ile kontrollü biçimde ilişki kurmasını sağlamıştır. Artık seçili modüle göre tarayıcı başlığı güncellenebilir, duyurular sahte servis fonksiyonundan yüklenebilir, zamanlayıcılar güvenli biçimde başlatılıp temizlenebilir ve kullanıcı tercihleri depolama mantığıyla ilişkilendirilebilir.

### Terim sözlüğü

| Terim | Açıklama |
|---|---|
| Yan etki | Render çıktısını hesaplamanın ötesinde dış sistemle ilişki kuran işlem. |
| `useEffect` | Fonksiyon bileşenlerinde yan etkileri yönetmek için kullanılan React Hook’u. |
| Bağımlılık dizisi | Effect’in hangi değerler değiştiğinde yeniden çalışacağını belirleyen dizi. |
| Cleanup | Effect’in başlattığı kaynakları temizleyen dönüş fonksiyonu. |
| Mount | Bileşenin ekrana ilk kez bağlanması. |
| Update | Props veya state değişimiyle bileşenin yeniden render edilmesi. |
| Unmount | Bileşenin ekrandan ayrılması. |
| Timer | `setTimeout` veya `setInterval` ile kurulan zaman tabanlı işlem. |
| Async effect pattern | Effect içinde async fonksiyon tanımlayıp çağırarak veri yükleme örüntüsü. |
| StrictMode | Geliştirme ortamında potansiyel yan etki hatalarını görünür kılmaya yardımcı React denetim davranışı. |

## 7.13 Kavramsal sorular

1. React’te render işlemi neden mümkün olduğunca saf tutulmalıdır?
2. `document.title` güncellemesi neden doğrudan JSX içinde yapılmamalıdır?
3. Bağımlılık dizisi verilmediğinde `useEffect` ne zaman çalışır?
4. Boş bağımlılık dizisi hangi tür işlemler için uygundur?
5. Effect içinde kullanılan bir state değerinin bağımlılık dizisine eklenmemesi hangi soruna yol açabilir?
6. Cleanup fonksiyonu hangi tür işlemler için gereklidir?
7. `setInterval` kullanılan bir effect cleanup içermiyorsa ne tür sorunlar oluşabilir?
8. Bir değer başka state değerlerinden doğrudan hesaplanabiliyorsa onu ayrı state olarak tutmak neden sakıncalı olabilir?
9. Geliştirme ortamında StrictMode nedeniyle effect’in beklenenden fazla çalışması nasıl yorumlanmalıdır?
10. KampüsHub’da duyuru yükleme işlemi için hangi state değerleri gerekebilir?
11. `useEffect` içinde doğrudan `async` fonksiyon yazmak neden önerilmez?
12. Bir effect’in gereksiz çalıştığını nasıl tespit edersiniz?

## 7.14 Programlama alıştırmaları

1. KampüsHub’da seçili modül değiştiğinde tarayıcı başlığını güncelleyen bir `useEffect` yazın. Başlık biçimi `KampüsHub | Modül Adı` olsun.
2. `AnnouncementsPanel` adlı bir bileşen tasarlayın. Bileşen ilk açıldığında sahte bir servis fonksiyonundan üç duyuru yüklesin. Yükleniyor, hata ve boş liste durumlarını ayrı gösterin.
3. `EventCountdown` adlı bir bileşen yazın. Bileşen her saniye bir sayaç değerini azaltsın ve cleanup ile interval’i temizlesin.
4. Arama metni değiştiğinde bu metni `localStorage` alanına yazan bir effect tasarlayın. İlk açılışta varsa kayıtlı değeri başlangıç state’i olarak kullanın.
5. Aşağıdaki hatalı effect’i düzeltin:

```jsx
useEffect(() => {
  setFilteredModules(modules.filter((item) => item.title.includes(searchText)));
});
```

6. `window.addEventListener("resize", ...)` kullanan bir effect yazın. Cleanup içinde listener’ı kaldırın.
7. Bir effect’in yalnızca `selectedModuleId` değiştiğinde çalışması için gerekli bağımlılık dizisini yazın.
8. Bir bileşende `announcements.length` değerini ayrı state olarak tutmak yerine render sırasında hesaplayan örnek kod yazın.

<!-- CODE_META
id: react_ch07_code05
chapter_id: chapter_07
language: javascript
kind: example
title_key: "cleanup_subscription_registry"
file: "cleanup_subscription_registry.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "activeBeforeCleanup:2"
  - "activeAfterCleanup:0"
  - "cleanup-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
class SubscriptionRegistry {
  constructor() {
    this.active = new Set();
  }

  subscribe(name) {
    this.active.add(name);
    return () => this.active.delete(name);
  }

  count() {
    return this.active.size;
  }
}

const registry = new SubscriptionRegistry();
const cleanupTimer = registry.subscribe("event-countdown-timer");
const cleanupResize = registry.subscribe("window-resize-listener");

console.log(`activeBeforeCleanup:${registry.count()}`);
cleanupTimer();
cleanupResize();
console.log(`activeAfterCleanup:${registry.count()}`);
console.log(registry.count() === 0 ? "cleanup-ok" : "cleanup-missing");
```

Bu örnek, React dışı bir modelle cleanup fikrini gösterir. Gerçek bileşende `subscribe` yerine `setInterval`, `addEventListener` veya benzeri bir kaynak başlatılır; effect’in dönüş fonksiyonunda bu kaynak temizlenir.

## 7.15 Haftalık laboratuvar

Bu haftanın laboratuvar görevi, KampüsHub uygulamasına kontrollü yan etkiler eklemektir. Öğrenci, Bölüm 6’da oluşturduğu state tabanlı arayüzü koruyarak aşağıdaki davranışları uygulamalıdır.

İlk görev, seçili modül değiştiğinde tarayıcı sekme başlığını güncellemektir. `selectedModuleId` state’i kullanılmalı ve `useEffect` bağımlılık dizisinde bu değer yer almalıdır. Başlık biçimi `KampüsHub | Duyurular`, `KampüsHub | Etkinlikler`, `KampüsHub | Not Paylaşımı` ve `KampüsHub | Profil` biçiminde olmalıdır.

İkinci görev, duyuru paneli için sahte veri yükleme akışı kurmaktır. `fetchAnnouncementsMock` adlı bir fonksiyon üç duyuru döndürmelidir. `AnnouncementsPanel` bileşeni `isLoading`, `errorMessage` ve `announcements` state’lerini kullanmalıdır. Bileşen ilk açıldığında effect çalışmalı ve duyurular yüklenmelidir.

Üçüncü görev, etkinlik panelinde canlı sayaç veya geri sayım oluşturmaktır. `setInterval` ile her saniye sayaç güncellenmeli ve cleanup içinde `clearInterval` çağrılmalıdır. Öğrenci cleanup satırını geçici olarak kaldırıp konsol davranışını inceleyebilir; ardından doğru sürümü geri yüklemelidir.

Dördüncü görev, arama filtresini kalıcı hâle getirmektir. Öğrenci `searchText` state’ini tarayıcı depolamasıyla ilişkilendirmelidir. İlk açılışta kayıtlı değer okunmalı, değer değiştikçe kaydedilmelidir. Gerçek tarayıcı ortamında `localStorage` kullanılabilir; test amaçlı düşünsel modelde sahte depolama nesnesi kullanılabilir.

Beşinci görev, kısa bir hata ayıklama raporu yazmaktır. Öğrenci raporda en az üç gözlem belirtmelidir: effect ne zaman çalıştı, cleanup ne zaman çalıştı, bağımlılık dizisi değiştirildiğinde davranış nasıl değişti?

### Laboratuvar kontrol listesi

- [ ] `useEffect` import edildi.
- [ ] `document.title` güncellemesi effect içinde yapıldı.
- [ ] Seçili modül değeri bağımlılık dizisine eklendi.
- [ ] Duyuru yükleme işlemi effect içinde başlatıldı.
- [ ] Yükleniyor, hata ve boş liste durumları ayrı gösterildi.
- [ ] Zamanlayıcı cleanup ile temizlendi.
- [ ] Gereksiz state ve effect kullanımı azaltıldı.
- [ ] React DevTools ve konsol çıktılarıyla davranış doğrulandı.

### SCREENSHOT_META

```yaml
id: b07_03_cleanup_timer_effect
chapter: chapter_07
figure: "Şekil 7.3"
title: "Zamanlayıcı effect'i ve cleanup davranışı"
route: "/__book__/chapter-07/cleanup-timer-effect"
waitFor: "[data-book-shot='cleanup-timer-effect']"
actions:
  - "geri sayım panelini aç"
  - "paneli kapat ve cleanup log çıktısını gözlemle"
output: "assets/auto/chapter_07/b07_03_cleanup_timer_effect.png"
caption: "Şekil 7.3. setInterval ile başlatılan zamanlayıcının bileşen ekrandan ayrılırken cleanup fonksiyonu ile temizlenmesi."
markdownTarget: "[SCREENSHOT:b07_03_cleanup_timer_effect]"
```

[SCREENSHOT:b07_03_cleanup_timer_effect]

<!-- CODE_META
id: react_ch07_code06
chapter_id: chapter_07
language: javascript
kind: exercise
title_key: "fake_storage_preferences"
file: "fake_storage_preferences.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "theme:dark"
  - "selectedModule:events"
  - "storage-ok"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function createMemoryStorage() {
  const data = new Map();

  return {
    setItem(key, value) {
      data.set(key, String(value));
    },
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    }
  };
}

const storage = createMemoryStorage();

function savePreference(key, value) {
  storage.setItem(`kampushub:${key}`, value);
}

function readPreference(key, fallbackValue) {
  return storage.getItem(`kampushub:${key}`) ?? fallbackValue;
}

savePreference("theme", "dark");
savePreference("selectedModule", "events");

console.log(`theme:${readPreference("theme", "light")}`);
console.log(`selectedModule:${readPreference("selectedModule", "announcements")}`);
console.log(readPreference("theme", "light") === "dark" ? "storage-ok" : "storage-failed");
```

Bu örnek, tarayıcıdaki `localStorage` davranışını Node.js içinde basit bir bellek depolamasıyla taklit eder. React bileşeninde aynı fikir, kullanıcı tercihlerinin effect ile kaydedilmesi ve başlangıç state’i için geri okunması şeklinde uygulanabilir.

## 7.16 İleri okuma

Bu bölümde `useEffect` temel düzeyde ele alındı; ancak React’te yan etki yönetimi büyük uygulamalarda daha geniş bir tasarım alanına dönüşür. İlerleyen bölümlerde bazı effect örüntülerinin özel hook’lara taşınması, sayfa yönetimiyle ilişkilendirilmesi, gerçek REST API istekleriyle birleştirilmesi ve global state yaklaşımıyla birlikte değerlendirilmesi gerekecektir.

Öğrenci bu bölümden sonra özellikle şu sorular üzerinde düşünmelidir: Bir effect birden fazla sorumluluk taşıyor mu? Aynı effect içinde hem veri yükleme hem başlık güncelleme hem de zamanlayıcı başlatma yapılıyor mu? Böyle durumlarda effect’leri sorumluluklarına göre ayırmak daha okunabilir bir yapı sağlayabilir. React’te iyi effect yazımı çoğu zaman az effect yazmak, effect’leri doğru bağımlılıklarla sınırlamak ve cleanup gerektiren kaynakları açık biçimde temizlemek anlamına gelir.

Bir sonraki bölümde `useRef`, `useContext`, `useMemo` ve `useCallback` gibi ileri Hook’lar ele alınacaktır. Bu Hook’lar, bileşenler arası veri paylaşımı, DOM referansı, pahalı hesaplamaların önbelleğe alınması ve fonksiyon referanslarının kararlı tutulması gibi daha ileri konulara geçiş sağlar. Bölüm 7’de kazanılan bağımlılık dizisi ve render/yan etki ayrımı bilgisi, özellikle `useMemo` ve `useCallback` konularını anlamak için güçlü bir temel oluşturacaktır.

### Bir sonraki bölüme geçiş

Bölüm 8’de KampüsHub uygulamasında bazı durumların yalnızca tek bileşende tutulmasının yetersiz kaldığı örnekler incelenecektir. Tema seçimi, oturum benzetimi, ortak kullanıcı bilgisi ve arayüz tercihi gibi verilerin farklı bileşenler tarafından paylaşılması gerektiğinde `useContext` gündeme gelir. Ayrıca DOM üzerinde odak yönetimi için `useRef`, pahalı filtreleme hesaplamaları için `useMemo` ve gereksiz yeniden render durumlarını azaltmak için `useCallback` başlangıç düzeyinde ele alınacaktır. Bu geçişte Bölüm 7’nin temel ilkesi korunacaktır: Render neyi gösterir, effect dış dünyayla ne zaman konuşur, Hook’lar bu ayrımı nasıl düzenler?
