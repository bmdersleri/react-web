---
title: "Bölüm 14: Hafif State Yönetimi — Zustand"
chapter_id: "chapter_14"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
year: "2026"
status: "draft"
---

# Bölüm 14: Hafif State Yönetimi — Zustand

## 14.1 Bölümün yol haritası

Önceki bölümlerde KampüsHub uygulamasının state yönetimi giderek genişledi. Bölüm 6’da bileşen içi state, Bölüm 8’de `useContext`, Bölüm 9’da özel hook’lar, Bölüm 11’de form state’i, Bölüm 12’de Redux Toolkit ile merkezi global state ve Bölüm 13’te API’den gelen veri durumları ele alındı. Bu bölümde aynı soruya daha hafif bir açıdan yaklaşacağız: Uygulama genelinde paylaşılması gereken her state için Redux Toolkit gibi kapsamlı bir yapı kurmak gerekir mi?

Bu sorunun yanıtı çoğu projede “hayır”dır. Bazı state türleri uygulama genelinde paylaşılmalıdır; fakat karmaşık reducer yapıları, action tipleri, geniş middleware zinciri veya ayrıntılı domain modellemesi gerektirmez. Tema tercihi, bildirim açık/kapalı bilgisi, kompakt görünüm ayarı, duyuru filtresi, mobil menünün açık olup olmadığı veya aktif arayüz paneli bu tür state’lere örnektir. Bu durumlar local state için fazla yaygın, Redux Toolkit için ise kimi zaman fazla hafif kalabilir.

Zustand bu ara bölgede kullanışlı bir alternatif sunar. Hook tabanlı bir store üretir, state ve action alanlarını aynı yerde tanımlamaya izin verir ve selector kullanımıyla bileşenin yalnızca ihtiyaç duyduğu state parçasını okumasını sağlar. Bu bölümde Zustand’ı KampüsHub uygulamasındaki kullanıcı tercihleri ve arayüz durumları üzerinden inceleyeceğiz.

Bu bölümün amacı Redux Toolkit’i değersizleştirmek değildir. Redux Toolkit; büyük, kurumsal, izlenebilir ve karmaşık state akışlarında hâlâ güçlü bir seçenektir. Buradaki amaç, öğrenciye farklı state problemleri için farklı araçlar seçme becerisi kazandırmaktır.

## 14.2 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

1. Local state, hafif global state ve kapsamlı global state ayrımını açıklar.
2. Zustand store mantığını React hook yaklaşımıyla ilişkilendirir.
3. State ve action alanlarını aynı store içinde sade biçimde düzenleyebilir.
4. Selector kullanarak bileşenin yalnızca ihtiyaç duyduğu state parçasını okumasını tasarlar.
5. Store güncellemelerinde doğrudan mutasyon yerine yeni nesne üretme yaklaşımını uygular.
6. KampüsHub için tema, bildirim, kompakt görünüm ve duyuru filtresi store’u kurgular.
7. `persist` mantığını kullanıcı tercihlerini saklama bağlamında açıklar.
8. Redux Toolkit, Zustand, Context ve local state arasında seçim yaparken ölçüt kullanır.
9. API verisi ile UI tercihi state’inin aynı şey olmadığını ayırt eder.
10. Küçük state problemlerini gereğinden fazla mimariyle ağırlaştırmamayı öğrenir.

## 14.3 Ön bilgiler

Bu bölümü takip edebilmek için öğrencinin React bileşenleri, props, `useState`, özel hook kavramı ve global state ihtiyacı hakkında temel bilgiye sahip olması gerekir. Bölüm 12’deki Redux Toolkit bölümü özellikle önemlidir; çünkü Zustand’ın daha hafif bir alternatif olarak nerede konumlandığını anlayabilmek için önce daha yapılandırılmış global state modelini tanımış olmak gerekir.

Bölüm 13’te API’den gelen veri ile arayüz state’i arasındaki fark vurgulanmıştı. Bu ayrım bu bölümde de önemlidir. Duyuru listesi gibi sunucudan gelen veriler çoğu zaman veri senkronizasyonu meselesidir. Tema tercihi veya mobil menü açık/kapalı durumu ise daha çok istemci tarafı arayüz state’idir. Zustand, özellikle bu ikinci gruptaki state’lerde sade ve okunabilir bir çözüm sağlayabilir.

Bu bölümdeki çalıştırılabilir örneklerin çoğu gerçek `zustand` paketine bağımlı değildir. Bunun nedeni, kitap üretim hattında kodların Node ortamında kolayca test edilebilmesini sağlamaktır. Gerçek React uygulamasında kullanılacak Zustand kodları ayrıca kavramsal şablon olarak verilecektir.

## 14.4 State problemini doğru sınıflandırmak

React uygulamalarında state yönetimi çoğu zaman araç seçimiyle değil, problemin doğru sınıflandırılmasıyla başlar. Bir state yalnızca tek bileşeni ilgilendiriyorsa local state yeterlidir. Birkaç alt bileşene veri taşınacaksa props veya özel hook uygun olabilir. Uygulama genelinde erişilecek fakat karmaşık iş akışı gerektirmeyen küçük state’ler için hafif global store düşünülebilir. Çok sayıda sayfa, karmaşık güncelleme, yoğun debug ihtiyacı ve ekip standardı varsa Redux Toolkit gibi daha yapılandırılmış çözümler öne çıkar.

KampüsHub için bu ayrımı tabloyla gösterebiliriz:

| State türü | Örnek | Uygun yaklaşım | Gerekçe |
|---|---|---|---|
| Tek bileşen state’i | Arama kutusuna yazılan geçici metin | `useState` | Sadece ilgili bileşeni ilgilendirir. |
| Alt bileşenlere taşınan state | Profil formu alanları | Props / özel hook / form kütüphanesi | Form bağlamına aittir. |
| Hafif global UI state | Tema, mobil menü, duyuru filtresi | Zustand | Uygulama genelinde gerekir, fakat karmaşık değildir. |
| Karmaşık domain state | Çok adımlı yetki, rol, akademik süreç akışı | Redux Toolkit | İzlenebilirlik ve standart reducer yapısı faydalıdır. |
| Sunucu verisi | Duyuru listesi, etkinlik takvimi | API service / TanStack Query | Güncellik, cache ve yeniden deneme davranışı gerekir. |

Bu sınıflandırma, gereksiz mimari yükü azaltır. Bir menü açık/kapalı bilgisi için kapsamlı reducer yapısı kurmak öğrenciyi araç ayrıntılarına boğabilir. Buna karşılık, çok sayıda domain kuralı içeren akademik kayıt akışını yalnızca küçük bir UI store’a sıkıştırmak da sürdürülebilir değildir.

## 14.5 Zustand’a kavramsal giriş

Zustand, React uygulamalarında küçük ve orta ölçekli global state ihtiyaçlarını karşılamak için kullanılan hafif bir state yönetimi kütüphanesidir. Temel fikir, bir store içinde hem state değerlerini hem de bu değerleri değiştiren action fonksiyonlarını tanımlamaktır. React tarafında bu store genellikle bir hook gibi kullanılır.

Kavramsal olarak bir Zustand store şu sorulara cevap verir:

- Başlangıç state’i nedir?
- Bu state hangi action fonksiyonlarıyla değişir?
- Bileşenler store’un hangi parçasını okuyacak?
- Hangi state alanları kalıcı saklanmalıdır?
- Store hangi sorumlulukları üstlenmemelidir?

KampüsHub için kullanıcı tercihleri store’u şu alanları içerebilir:

```text
theme: "light" | "dark"
notificationsEnabled: true | false
compactMode: true | false
announcementCategory: "all" | "academic" | "career" | "social"
sidebarOpen: true | false
```

Bu alanlar uygulamanın birçok yerinde kullanılabilir. Header tema ikonunu, profil sayfası tercih panelini, duyuru sayfası filtreyi ve mobil görünüm yan menüyü bu store üzerinden okuyabilir.

## 14.6 KampüsHub tercih store modelini kurma

Gerçek Zustand kullanımında store `create` fonksiyonu ile oluşturulur. Bu kitapta önce mantığı saf JavaScript modeliyle göstereceğiz. Böylece store’un ne tuttuğu ve hangi action’larla değiştiği açık biçimde görülebilir.

<!-- CODE_META
id: react_ch14_code01
chapter_id: chapter_14
language: javascript
kind: example
title: "KampüsHub tercih store başlangıç modeli"
file: "chapter_14/react_ch14_code01_create_preference_store.js"
extract: true
test: compile_run_assert
expected_stdout: "theme=light | notifications=true | category=all"
-->

```javascript
function createInitialPreferenceStore() {
  return {
    preferences: {
      theme: "light",
      notificationsEnabled: true,
      compactMode: false,
    },
    announcementFilter: {
      category: "all",
      onlyPinned: false,
    },
    ui: {
      sidebarOpen: false,
      activePanel: "home",
    },
  };
}

const store = createInitialPreferenceStore();
console.log(
  `theme=${store.preferences.theme} | ` +
    `notifications=${store.preferences.notificationsEnabled} | ` +
    `category=${store.announcementFilter.category}`
);
```

Bu örnek gerçek Zustand kodu değildir; fakat store tasarımının zihinsel modelini verir. State alanları üç gruba ayrılmıştır: kullanıcı tercihleri, duyuru filtresi ve arayüz durumu. Bu ayrım, store’un zamanla karmaşıklaşmasını engeller.

Gerçek uygulamada benzer yapı şöyle kurulabilir:

```jsx
import { create } from "zustand";

export const useCampusHubUiStore = create((set) => ({
  theme: "light",
  notificationsEnabled: true,
  compactMode: false,
  setTheme: (theme) => set({ theme }),
  toggleNotifications: () =>
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  toggleCompactMode: () =>
    set((state) => ({ compactMode: !state.compactMode })),
}));
```

Bu kodda `useCampusHubUiStore` bir hook gibi kullanılabilir. Bir bileşen yalnızca tema bilgisini okumak istiyorsa selector ile `state.theme` alanını seçebilir. Böylece bileşen store’un tamamıyla gereksiz bağ kurmaz.

## 14.7 State ve action ayrımı

Zustand’da state ve action alanları aynı store içinde yer alabilir. Bu durum yeni başlayanlar için oldukça okunabilir bir yapı sağlar. Ancak store içinde her şeyi toplamak doğru değildir. Action fonksiyonları ilgili state’i güncelleyen küçük ve açık sorumluluklara sahip olmalıdır.

KampüsHub tercihleri için bazı action örnekleri şunlardır:

- `setTheme(theme)`
- `toggleNotifications()`
- `setAnnouncementCategory(category)`
- `toggleOnlyPinned()`
- `openSidebar()`
- `closeSidebar()`

Bu action adları, bileşenlerde doğrudan state değiştirmek yerine anlamlı niyetler kullanılmasını sağlar. Örneğin `setTheme("dark")` ifadesi, `preferences.theme = "dark"` gibi doğrudan mutasyondan daha güvenli ve izlenebilir bir tasarım sunar.

<!-- CODE_META
id: react_ch14_code02
chapter_id: chapter_14
language: javascript
kind: example
title: "KampüsHub tercihlerini immutable güncelleme"
file: "chapter_14/react_ch14_code02_update_preferences.js"
extract: true
test: compile_run_assert
expected_stdout: "old=light | new=dark | sameObject=false"
-->

```javascript
const initialStore = {
  preferences: {
    theme: "light",
    notificationsEnabled: true,
    compactMode: false,
  },
};

function updatePreferences(store, updates) {
  return {
    ...store,
    preferences: {
      ...store.preferences,
      ...updates,
    },
  };
}

const nextStore = updatePreferences(initialStore, {
  theme: "dark",
  compactMode: true,
});

console.log(
  `old=${initialStore.preferences.theme} | ` +
    `new=${nextStore.preferences.theme} | ` +
    `sameObject=${initialStore === nextStore}`
);
```

Burada eski store nesnesi değiştirilmemiş, yeni bir store nesnesi üretilmiştir. React ekosisteminde bu yaklaşım önemlidir; çünkü değişimin doğru algılanması çoğu zaman referans değişimine bağlıdır. Zustand `set` fonksiyonu içinde de aynı zihinsel model korunmalıdır: mevcut state okunur, yeni state nesnesi üretilir ve store güncellenir.

## 14.8 Selector kullanımı

Global store kullanmanın risklerinden biri, bileşenlerin gereksiz yere store’un tamamına bağımlı hâle gelmesidir. Bir bileşen yalnızca `theme` alanını kullanıyorsa bütün store’u okumamalıdır. Selector bu noktada devreye girer. Selector, store’dan yalnızca gereken parçayı seçen küçük fonksiyondur.

Örneğin Header bileşeni yalnızca tema bilgisini kullanabilir. Duyurular sayfası kategori filtresini ve sabitlenmiş duyuruları göstermek isteyebilir. Profil sayfası ise bildirim ve kompakt görünüm tercihleriyle ilgilenir.

Zustand kullanımında selector şu şekilde düşünülebilir:

```jsx
const theme = useCampusHubUiStore((state) => state.theme);
const setTheme = useCampusHubUiStore((state) => state.setTheme);
```

Bu yaklaşım bileşenin store ile ilişkisini daha dar ve anlaşılır hâle getirir. Aşağıdaki saf JavaScript örneği, duyuru filtresinin selector mantığıyla nasıl hesaplanabileceğini gösterir.

<!-- CODE_META
id: react_ch14_code03
chapter_id: chapter_14
language: javascript
kind: example
title: "Duyuru filtresi için selector mantığı"
file: "chapter_14/react_ch14_code03_announcement_selector.js"
extract: true
test: compile_run_assert
expected_stdout: "filtered=1 | first=Vize takvimi"
-->

```javascript
const announcements = [
  { id: "a1", title: "Vize takvimi", category: "academic", pinned: true },
  { id: "a2", title: "Kariyer günü", category: "career", pinned: false },
  { id: "a3", title: "Kulüp buluşması", category: "social", pinned: true },
];

const store = {
  announcementFilter: {
    category: "academic",
    onlyPinned: true,
  },
};

function selectVisibleAnnouncements(state, list) {
  const { category, onlyPinned } = state.announcementFilter;
  return list.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const pinnedMatch = !onlyPinned || item.pinned;
    return categoryMatch && pinnedMatch;
  });
}

const visible = selectVisibleAnnouncements(store, announcements);
console.log(`filtered=${visible.length} | first=${visible[0].title}`);
```

Selector yaklaşımı, bileşen kodunu sadeleştirir. Bileşen yalnızca `visibleAnnouncements` sonucuyla ilgilenir; filtre koşullarının ayrıntısı selector fonksiyonunda kalır. Bu durum test edilebilirliği de artırır.

## 14.9 Seçici abonelik düşüncesi

Global state yönetiminde yalnızca state’i okumak değil, state değiştiğinde hangi parçaların güncelleneceğini belirlemek de önemlidir. Bir bileşen sadece tema değiştiğinde güncellenmeliyse duyuru filtresindeki değişimler bu bileşeni ilgilendirmemelidir. Zustand bu konuda selector kullanımını teşvik eder.

Aşağıdaki örnek, seçici abonelik mantığını saf JavaScript ile simüle eder. Gerçek Zustand kodu değildir; fakat değişen state parçası ile ilgili listener’ın nasıl çalışması gerektiğini gösterir.

<!-- CODE_META
id: react_ch14_code04
chapter_id: chapter_14
language: javascript
kind: example
title: "Seçici abonelik ve değişim bildirimi simülasyonu"
file: "chapter_14/react_ch14_code04_subscription_simulation.js"
extract: true
test: compile_run_assert
expected_stdout: "theme changes: 1 | category changes: 1"
-->

```javascript
function createSubscriptionTracker(initialState) {
  let state = initialState;
  const subscriptions = [];

  return {
    subscribe(selector, listener) {
      subscriptions.push({
        selector,
        listener,
        previousValue: selector(state),
      });
    },
    setState(updater) {
      state = updater(state);
      subscriptions.forEach((subscription) => {
        const nextValue = subscription.selector(state);
        if (!Object.is(nextValue, subscription.previousValue)) {
          subscription.listener(nextValue, subscription.previousValue);
          subscription.previousValue = nextValue;
        }
      });
    },
  };
}

let themeChanges = 0;
let categoryChanges = 0;

const tracker = createSubscriptionTracker({
  theme: "light",
  category: "all",
});

tracker.subscribe((state) => state.theme, () => {
  themeChanges += 1;
});

tracker.subscribe((state) => state.category, () => {
  categoryChanges += 1;
});

tracker.setState((state) => ({ ...state, theme: "dark" }));
tracker.setState((state) => ({ ...state, category: "academic" }));
tracker.setState((state) => ({ ...state, theme: "dark" }));

console.log(`theme changes: ${themeChanges} | category changes: ${categoryChanges}`);
```

Bu örnekte tema aynı değere tekrar ayarlandığında yeni bir değişim bildirimi oluşmaz. Bu davranış, gereksiz render ve gereksiz yan etki üretimini azaltma düşüncesi açısından önemlidir.

## 14.10 Persist: tercihleri kalıcı saklama

Bazı state alanları sayfa yenilendiğinde kaybolmamalıdır. Kullanıcının tema tercihi, bildirim ayarı veya kompakt görünüm seçimi buna örnektir. Buna karşılık mobil menünün açık olup olmadığı gibi geçici UI state’leri çoğu zaman kalıcı saklanmamalıdır.

Zustand ekosisteminde `persist` middleware’i store verisinin belirli parçalarını tarayıcı saklama alanına kaydetmek için kullanılabilir. Bu noktada dikkat edilmesi gereken en önemli konu, her state alanını kalıcı hâle getirmemektir. Kalıcı saklama kararı veri gizliliği, kullanıcı deneyimi, güncellik ve güvenlik açısından düşünülmelidir.

KampüsHub için kalıcı saklanabilecek alanlar:

- Tema tercihi
- Bildirim açık/kapalı tercihi
- Kompakt görünüm tercihi

Kalıcı saklanmaması gereken veya dikkatli ele alınması gereken alanlar:

- Geçici form girdileri
- Hata mesajları
- Loading state’i
- Token veya hassas oturum bilgileri
- Sunucudan gelen ve güncelliği kritik veri

<!-- CODE_META
id: react_ch14_code05
chapter_id: chapter_14
language: javascript
kind: example
title: "Yalnızca kalıcı tercihleri serileştirme"
file: "chapter_14/react_ch14_code05_persist_partial_state.js"
extract: true
test: compile_run_assert
expected_stdout: "persisted keys: compactMode,notificationsEnabled,theme"
-->

```javascript
const campusHubStore = {
  preferences: {
    theme: "dark",
    notificationsEnabled: false,
    compactMode: true,
  },
  ui: {
    sidebarOpen: true,
    activePanel: "announcements",
  },
  api: {
    loading: false,
    lastError: null,
  },
};

function selectPersistedPreferences(store) {
  return {
    theme: store.preferences.theme,
    notificationsEnabled: store.preferences.notificationsEnabled,
    compactMode: store.preferences.compactMode,
  };
}

const persisted = selectPersistedPreferences(campusHubStore);
console.log(`persisted keys: ${Object.keys(persisted).sort().join(",")}`);
```

Bu örnek, persist edilecek alanları açıkça seçer. Store’un tamamını olduğu gibi saklamak kolay görünse de uzun vadede sorun yaratabilir. Örneğin `lastError` bilgisinin sayfa yenilendiğinde geri dönmesi kullanıcı açısından anlamsızdır. Benzer şekilde `loading` durumunun kalıcı saklanması uygulamanın yanlış durumda açılmasına neden olabilir.

## 14.11 Redux Toolkit ve Zustand karşılaştırması

Redux Toolkit ve Zustand aynı probleme farklı ağırlıkta çözümler sunar. Redux Toolkit daha yapılandırılmış, ekip standartlarına daha uygun, debug araçları güçlü ve karmaşık state geçişlerini açık modellemeye elverişli bir çözümdür. Zustand ise daha az kalıpla, daha doğrudan ve daha küçük global state problemleri için pratik bir seçenek olabilir.

Karşılaştırmayı tek bir “hangisi daha iyi?” sorusuna indirgemek doğru değildir. Doğru soru şudur: Bu state problemi hangi düzeyde mimari gerektiriyor?

| Ölçüt | Zustand daha uygun olabilir | Redux Toolkit daha uygun olabilir |
|---|---|---|
| State boyutu | Küçük / orta | Orta / büyük |
| Güncelleme akışı | Basit action fonksiyonları | Karmaşık reducer ve async akışlar |
| Ekip standardı | Esnek küçük ekip | Büyük ekip, sıkı standart ihtiyacı |
| Debug ihtiyacı | Sınırlı | Yüksek |
| Domain karmaşıklığı | UI tercihleri ve filtreler | İş kuralları ve çok adımlı süreçler |
| Boilerplate toleransı | Düşük | Kabul edilebilir |

KampüsHub’da tema ve bildirim tercihleri Zustand ile yönetilebilir. Ancak akademik kayıt, rol tabanlı yetki veya çok adımlı onay süreçleri gibi daha karmaşık domain state’leri Redux Toolkit veya daha kapsamlı bir mimari gerektirebilir.

<!-- CODE_META
id: react_ch14_code06
chapter_id: chapter_14
language: javascript
kind: example
title: "State yönetimi aracı için karar yardımcısı"
file: "chapter_14/react_ch14_code06_state_tool_decision.js"
extract: true
test: compile_run_assert
expected_stdout: "theme=zustand | wizard=redux-toolkit | input=local-state"
-->

```javascript
function chooseStateTool({ scope, complexity, source }) {
  if (scope === "single-component") {
    return "local-state";
  }

  if (source === "server") {
    return "query-layer";
  }

  if (scope === "global" && complexity === "low") {
    return "zustand";
  }

  if (scope === "global" && complexity === "high") {
    return "redux-toolkit";
  }

  return "custom-hook";
}

const theme = chooseStateTool({ scope: "global", complexity: "low", source: "client" });
const wizard = chooseStateTool({ scope: "global", complexity: "high", source: "client" });
const input = chooseStateTool({ scope: "single-component", complexity: "low", source: "client" });

console.log(`theme=${theme} | wizard=${wizard} | input=${input}`);
```

Bu karar fonksiyonu elbette gerçek bir mimari kural motoru değildir. Ancak öğrenciye araç seçimini sistematik düşünme alışkanlığı kazandırır. Bir state’in kapsamı, karmaşıklığı ve kaynağı bilinmeden araç seçmek çoğu zaman yanlış mimari kararlarla sonuçlanır.

## 14.12 Store sınırlarını belirleme

Hafif store kullanırken en sık yapılan hatalardan biri store’u zamanla her şeyin konulduğu büyük bir nesneye dönüştürmektir. Başlangıçta yalnızca tema tercihi için açılan store’a zamanla API verileri, form taslakları, hata mesajları, kullanıcı oturumu, yetki bilgileri ve sayfa geçişleri eklenirse Zustand’ın sadeliği kaybolur.

KampüsHub’da `useCampusHubUiStore` yalnızca UI tercihleri ve hafif filtrelerle sınırlı tutulabilir. API verileri için ayrı service katmanı veya ileride TanStack Query; karmaşık domain state için Redux Toolkit; tek bileşen state’i için `useState` kullanılabilir. Bu ayrım, kod tabanının büyüdüğü aşamada bakım kolaylığı sağlar.

Sağlıklı bir store sınırı belirlemek için şu sorular sorulabilir:

- Bu state birden fazla sayfada gerçekten gerekiyor mu?
- Bu state sunucudan mı geliyor, yoksa istemci tercihinden mi oluşuyor?
- Sayfa yenilendiğinde kalmalı mı?
- Bu state değiştiğinde kaç bileşen etkileniyor?
- Güncelleme kuralları basit mi, yoksa iş akışı içeriyor mu?
- Bu bilgiyi store’a koymak test edilebilirliği artırıyor mu, azaltıyor mu?

Bu sorulara verilen cevaplar store’un gereksiz genişlemesini engeller.

## 14.13 Programatik ekran çıktısı planı

Bu bölüm için ekran çıktıları, KampüsHub uygulamasında Zustand ile yönetilen kullanıcı tercihleri ve filtre akışını görünür kılmalıdır. Üretilecek görseller yalnızca dekoratif değil, öğrencinin state değişiminin arayüze etkisini takip edebilmesini sağlayacak öğretici nitelikte olmalıdır.

<!-- SCREENSHOT_META
id: b14_01_tercih_paneli_zustand
chapter: chapter_14
figure: "Şekil 14.1"
title: "KampüsHub tercih paneli ve Zustand store ilişkisi"
route: "/__book__/chapter-14/tercih-paneli-zustand"
waitFor: "[data-book-shot='b14_01_tercih_paneli_zustand']"
actions: []
output: "assets/auto/chapter_14/b14_01_tercih_paneli_zustand.png"
caption: "KampüsHub tercih panelinde tema, bildirim ve kompakt görünüm ayarlarının hafif global store üzerinden yönetilmesi."
markdownTarget: "[SCREENSHOT:b14_01_tercih_paneli_zustand]"
-->

[SCREENSHOT:b14_01_tercih_paneli_zustand]

<!-- SCREENSHOT_META
id: b14_02_duyuru_filtre_store
chapter: chapter_14
figure: "Şekil 14.2"
title: "Duyuru filtresinin Zustand store üzerinden okunması"
route: "/__book__/chapter-14/duyuru-filtre-store"
waitFor: "[data-book-shot='b14_02_duyuru_filtre_store']"
actions: ["select:category=academic", "toggle:onlyPinned"]
output: "assets/auto/chapter_14/b14_02_duyuru_filtre_store.png"
caption: "Duyuru kategorisi ve sabitlenmiş duyuru filtresinin farklı bileşenlerde ortak state olarak kullanılması."
markdownTarget: "[SCREENSHOT:b14_02_duyuru_filtre_store]"
-->

[SCREENSHOT:b14_02_duyuru_filtre_store]

<!-- SCREENSHOT_META
id: b14_03_persist_tema_tercihi
chapter: chapter_14
figure: "Şekil 14.3"
title: "Tema tercihinin kalıcı saklanması"
route: "/__book__/chapter-14/persist-tema-tercihi"
waitFor: "[data-book-shot='b14_03_persist_tema_tercihi']"
actions: ["click:themeToggle", "reload"]
output: "assets/auto/chapter_14/b14_03_persist_tema_tercihi.png"
caption: "Kullanıcının tema tercihinin sayfa yenilendikten sonra da korunması için persist yaklaşımının görselleştirilmesi."
markdownTarget: "[SCREENSHOT:b14_03_persist_tema_tercihi]"
-->

[SCREENSHOT:b14_03_persist_tema_tercihi]

## 14.14 CODE_META ve test edilebilir kod örnekleri

Bu bölümdeki CODE_META blokları özellikle saf JavaScript örnekleri olarak düzenlenmiştir. Bunun nedeni, store tasarımı ve selector mantığının React bileşeni çalıştırmadan da test edilebilmesidir. Gerçek uygulamada `zustand` paketiyle yazılacak store kodları aynı mantığın React hook tabanlı biçimidir.

Kod örnekleri üç beceriye odaklanır. İlk olarak öğrenci store’un hangi alanları tutacağını modellemeyi öğrenir. İkinci olarak action ve selector fonksiyonlarıyla state okuma/güncelleme ayrımını kavrar. Üçüncü olarak hangi alanların kalıcı saklanacağına karar verir. Bu beceriler, KampüsHub’ın nihai mimarisinde gereksiz karmaşıklığı azaltır.

## 14.15 Sık yapılan hatalar ve yanlış sezgiler

Yeni başlayan öğrenciler Zustand gibi hafif kütüphaneleri gördüğünde bazen tüm state’i tek bir store içinde toplamaya eğilim gösterebilir. Bu yaklaşım kısa vadede pratik görünür; ancak uzun vadede store’un belirsiz ve zor test edilen bir yapıya dönüşmesine neden olur. Hafif araç kullanmak, sınırsız state biriktirmek anlamına gelmez.

Bir diğer hata, API’den gelen verilerle kullanıcı tercihlerini aynı kategoride değerlendirmektir. Duyuru listesi sunucu kaynaklıdır; güncellik, cache ve hata yönetimi gerektirir. Tema tercihi ise istemci tarafı tercihtir. Bu iki state türü aynı store içinde tutulduğunda veri senkronizasyonu ile UI tercihi birbirine karışabilir.

Üçüncü hata, selector kullanmadan store’un tamamını bileşenlerde okumaktır. Bileşenin yalnızca `theme` bilgisine ihtiyacı varsa bütün store’u okumak hem zihinsel bağımlılığı artırır hem de gereksiz güncellemelere yol açabilir. Selector, hafif global store’un disiplinli kullanılmasını sağlar.

Dördüncü hata, persist mekanizmasını her state için güvenli sanmaktır. Kalıcı saklama kullanıcı deneyimini iyileştirebilir; fakat hassas veriler, geçici hata durumları veya loading bilgisi kalıcı saklanmamalıdır. Persist kararı her zaman veri türüne göre verilmelidir.

## 14.16 Hata ayıklama egzersizi

Aşağıdaki senaryoyu inceleyin:

```jsx
const useCampusHubStore = create((set) => ({
  theme: "light",
  loading: false,
  announcements: [],
  lastError: null,
  draftNoteTitle: "",
  token: "...",
  setEverything: (nextState) => set(nextState),
}));
```

Bu store ilk bakışta kullanışlı görünebilir; çünkü uygulamadaki pek çok veri tek yerde toplanmıştır. Ancak tasarım açısından ciddi sorunlar içerir. Tema tercihi, API loading durumu, duyuru listesi, hata mesajı, form taslağı ve token aynı store içinde yer almaktadır. Ayrıca `setEverything` gibi çok geniş yetkili bir action, state’in kontrolsüz güncellenmesine neden olabilir.

Bu store’u düzeltmek için şu adımlar önerilebilir:

1. Tema ve kompakt görünüm gibi tercihler `usePreferencesStore` içinde tutulur.
2. Duyuru listesi API service veya ileride TanStack Query tarafından yönetilir.
3. Form taslakları ilgili form bileşeni veya form kütüphanesi içinde kalır.
4. Token gibi hassas bilgiler bu bölümün kapsamı dışında güvenli oturum mimarisiyle ele alınır.
5. `setEverything` yerine anlamlı ve sınırlı action fonksiyonları yazılır.

Bu egzersizin amacı, hafif state aracını doğru sınırlarla kullanma alışkanlığı kazandırmaktır.

## 14.17 Bölüm özeti ve terim sözlüğü

Bu bölümde Zustand, React uygulamalarında hafif global state ihtiyaçlarını karşılayan bir araç olarak incelendi. Local state, hafif global state, kapsamlı global state ve sunucu verisi ayrımı yapıldı. KampüsHub uygulamasında tema tercihi, bildirim ayarı, kompakt görünüm, duyuru filtresi ve yan panel durumu gibi küçük fakat uygulama genelinde paylaşılan state’lerin Zustand için uygun adaylar olduğu gösterildi.

Redux Toolkit ile Zustand karşılaştırması yapılırken araçların birbirinin mutlak alternatifi olmadığı vurgulandı. Redux Toolkit daha yapılandırılmış ve karmaşık domain state’leri için uygundur. Zustand ise daha az kalıpla, daha doğrudan ve küçük global UI state’leri için pratik bir çözüm sunar. Selector, immutable update ve persist kavramları bölümün temel teknik eksenini oluşturdu.

Terim sözlüğü:

| Terim | Açıklama |
|---|---|
| Store | Uygulama state’inin ve bu state’i değiştiren action’ların tutulduğu yapı. |
| Action | Store’daki state’i değiştiren anlamlı fonksiyon. |
| Selector | Store’dan yalnızca gerekli state parçasını seçen fonksiyon. |
| Lightweight state | Karmaşık domain mantığı içermeyen, küçük ama paylaşılması gereken state. |
| Persist | State’in belirli parçalarını sayfa yenilendikten sonra da saklama yaklaşımı. |
| Immutable update | Mevcut nesneyi doğrudan değiştirmek yerine yeni nesne üretme yaklaşımı. |
| Store boundary | Bir store’un hangi sorumlulukları üstlenip hangilerini üstlenmeyeceğini belirleyen sınır. |

## 14.18 Kavramsal sorular

1. Tema tercihi neden local state yerine hafif global store için uygun olabilir?
2. Duyuru listesi ile duyuru kategorisi filtresi arasında state türü açısından nasıl bir fark vardır?
3. Selector kullanmadan store’un tamamını okumak neden sakıncalı olabilir?
4. Redux Toolkit hangi durumlarda Zustand’a göre daha uygun bir tercih olabilir?
5. Persist mekanizması hangi state alanları için kullanılmamalıdır?
6. Store sınırını genişletmek kısa vadede hangi kolaylığı, uzun vadede hangi riski doğurur?
7. KampüsHub profil tercihleri için hangi alanlar kalıcı saklanmalı, hangileri saklanmamalıdır?
8. Bir state’in sunucudan gelmesi araç seçimini nasıl etkiler?

## 14.19 Programlama alıştırmaları

1. KampüsHub için `preferences` alanını içeren bir store modeli tasarlayın. Store’da `theme`, `notificationsEnabled` ve `compactMode` alanları bulunsun.
2. Duyuru filtresi için `category` ve `onlyPinned` alanlarını kullanan bir selector fonksiyonu yazın.
3. Bir state nesnesini doğrudan değiştiren hatalı güncelleme kodunu immutable update yaklaşımıyla düzeltin.
4. Hangi state alanlarının persist edileceğini belirleyen `selectPersistedState` fonksiyonu yazın.
5. `chooseStateTool` fonksiyonunu genişleterek `context`, `zustand`, `redux-toolkit`, `query-layer` ve `local-state` seçeneklerini döndürmesini sağlayın.
6. Mobil menü durumunu yöneten `openSidebar`, `closeSidebar` ve `toggleSidebar` action’larını tasarlayın.

## 14.20 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub uygulamasına kullanıcı tercihleri için hafif global state katmanı eklemektir. Öğrenci öncelikle tema, bildirim ve kompakt görünüm tercihlerini içeren bir store tasarlamalıdır. Ardından bu store’u Header, Profil ve Duyurular sayfası gibi en az üç farklı bileşenle ilişkilendirmelidir.

Görev adımları:

1. `src/stores/useCampusHubPreferencesStore.js` dosyasını oluşturun.
2. Store içinde `theme`, `notificationsEnabled`, `compactMode` alanlarını tanımlayın.
3. `setTheme`, `toggleNotifications` ve `toggleCompactMode` action’larını yazın.
4. Header bileşeninde tema bilgisini selector ile okuyun.
5. Profil sayfasında tercihleri değiştiren basit bir panel oluşturun.
6. Duyurular sayfasında `announcementCategory` filtresini store üzerinden okuyun.
7. Hangi alanların persist edileceğini raporlayın.
8. Redux Toolkit yerine Zustand seçme gerekçenizi kısa bir paragrafla açıklayın.

Beklenen çıktı yalnızca çalışan kod değildir. Öğrenci ayrıca store sınırını neden bu şekilde belirlediğini açıklamalıdır. Bu açıklama, mimari düşünme becerisinin gelişmesi açısından kod kadar önemlidir.

## 14.21 İleri okuma ve bir sonraki bölüme köprü

Bu bölümde istemci tarafı hafif global state konusu işlendi. Bir sonraki bölümde KampüsHub uygulamasının performans, test ve dağıtım aşamalarına geçilecektir. Bu geçişte state yönetimi yine önemini korur; çünkü performans problemlerinin bir bölümü gereksiz render, yanlış selector kullanımı veya gereksiz global state bağımlılıklarından kaynaklanabilir.

İleri okuma için Zustand dokümantasyonunda `create`, selector kullanımı, `persist` middleware’i ve shallow comparison başlıkları incelenebilir. Ancak öğrencinin bu aşamada odaklanması gereken temel nokta şudur: Araç seçimi popülerliğe göre değil, state probleminin kapsamına ve karmaşıklığına göre yapılmalıdır. KampüsHub büyüdükçe bazı state’ler local kalacak, bazıları Zustand ile yönetilecek, bazıları Redux Toolkit veya veri senkronizasyon katmanına taşınacaktır.
