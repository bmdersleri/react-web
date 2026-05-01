---
title: "Bölüm 12: Global State Yönetimi — Redux Toolkit"
chapter_id: "chapter_12"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
year: "2026"
status: "draft"
---

# Bölüm 12: Global State Yönetimi — Redux Toolkit

## 12.1 Bölümün yol haritası

Bölüm 10’da KampüsHub uygulamasının sayfa iskeleti React Router ile kurulmuştu. Bölüm 11’de bu sayfalara profil düzenleme, not paylaşımı ve arama gibi form davranışları eklenmişti. Bu bölümde artık tek tek bileşenlerin içinde saklanan bazı bilgilerin uygulamanın geneline nasıl taşınacağını inceleyeceğiz.

KampüsHub büyüdükçe bazı veriler yalnızca bir bileşenin konusu olmaktan çıkar. Örneğin tema tercihi profil sayfasında değiştirilebilir; fakat ana sayfa, duyuru sayfası, navbar ve not paylaşımı ekranı bu tercihten etkilenir. Benzer şekilde okunmamış duyuru sayısı duyurular sayfasında hesaplanabilir; fakat Header bileşeninde küçük bir rozet olarak gösterilmek istenebilir. Bu durumda veriyi yalnızca en yakın bileşende tutmak yetersiz kalır.

Bu bölümün ana amacı, öğrencinin global state ihtiyacını doğru yerde fark etmesini ve Redux Toolkit ile başlangıç düzeyinde sürdürülebilir bir state katmanı kurabilmesini sağlamaktır. Redux Toolkit; klasik Redux kullanımında görülen tekrar eden kodları azaltır, store kurulumunu sadeleştirir ve reducer yazımını daha okunabilir hale getirir. Ancak bu bölümde amaç yalnızca kütüphane API’sini ezberletmek değildir. Asıl hedef, hangi verinin global state’e taşınması gerektiğini, hangi verinin bileşen içinde kalmasının daha doğru olduğunu ve reducer/selector mantığının nasıl test edilebileceğini göstermektir.

## 12.2 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

1. Yerel state, Context ve global state arasındaki farkı açıklar.
2. Props drilling problemini KampüsHub senaryosu üzerinden yorumlar.
3. Redux Toolkit’in Redux kullanımını neden sadeleştirdiğini açıklar.
4. Store, slice, reducer, action, dispatch ve selector kavramlarını ayırt eder.
5. `configureStore` ile temel store kurulumunu kavramsal olarak açıklar.
6. `createSlice` ile reducer ve action üretim mantığını açıklar.
7. React Redux `Provider`, `useSelector` ve `useDispatch` kullanım yerlerini ayırt eder.
8. KampüsHub için duyuru, not ve kullanıcı tercihleri slice’larını tasarlar.
9. Global state içinde tutulması gereken ve tutulmaması gereken verileri ayırır.
10. Redux mantığının saf reducer/selector parçalarını test edilebilir biçimde yazar.

## 12.3 Ön bilgiler

Bu bölüme gelmeden önce öğrencinin `useState` ile yerel state yönetimini, props ile bileşenler arası veri aktarımını, `useContext` ile ağaç genelinde değer paylaşımını ve React Router ile sayfa bileşenleri arasındaki ilişkiyi kavramış olması beklenir. Bölüm 11’de görülen form payload üretimi de bu bölüm için önemlidir; çünkü formdan çıkan bazı sonuçlar yerel kalırken bazıları global store’a aktarılabilir.

Global state konusunu anlamak için önce şu ayrımı yapmak gerekir: Her paylaşılan veri global state olmak zorunda değildir. Bir input alanının anlık değeri, çoğu zaman yalnızca ilgili form bileşenini ilgilendirir. Buna karşılık kullanıcının tema tercihi, oturum özeti, okunmamış duyuru sayısı veya uygulama genelinde gösterilecek bildirim mesajı birden fazla bileşeni ilgilendirebilir. Redux Toolkit bu ikinci tür veriler için merkezi, öngörülebilir ve test edilebilir bir yapı sunar.

## 12.4 Yerel state, Context ve global state farkı

React’te state yönetimi tek bir araçla çözülmesi gereken bir problem değildir. Küçük bir açılır menünün açık/kapalı durumu için `useState` yeterlidir. Bir tema değeri veya dil tercihi için `useContext` makul olabilir. Ancak uygulama büyüdükçe verinin hangi bileşenden değiştirildiği, hangi bileşenden okunduğu ve değişikliklerin nasıl izleneceği daha önemli hale gelir.

Yerel state, verinin en yakın bileşende tutulduğu modeldir. Örneğin not paylaşımı formundaki başlık alanı kullanıcı yazarken sürekli değişir. Bu değer gönderim anına kadar global store’a taşınmak zorunda değildir. Çünkü uygulamanın başka bir yerinde bu anlık değere ihtiyaç yoktur.

Context, özellikle tema, dil veya oturum gibi sık okunan ama her zaman karmaşık güncelleme mantığı gerektirmeyen değerler için kullanılabilir. Ancak Context içindeki değer sık değişiyorsa veya farklı alt alanlar üzerinde karmaşık güncellemeler yapılıyorsa gereksiz render davranışları ve karmaşık provider yapıları ortaya çıkabilir.

Global state yönetimi ise birden fazla bileşen tarafından okunan, farklı yerlerden güncellenen ve uygulama davranışını etkileyen veriler için daha sistematik bir çözüm sunar. Redux Toolkit bu noktada store, slice, reducer, action ve selector kavramlarıyla uygulamanın veri akışını görünür hale getirir.

## 12.5 Props drilling problemi

Props drilling, bir verinin yalnızca alt seviyedeki bir bileşene ulaşması için aradaki birçok bileşenden props olarak geçirilmesi durumudur. Bu durum başlangıçta zararsız görünür; fakat bileşen ağacı büyüdükçe aradaki bileşenler aslında kullanmadıkları verileri taşımak zorunda kalır.

KampüsHub’da tema tercihini düşünelim. Kullanıcı profil sayfasında koyu temayı seçtiğinde Header, Sidebar, duyuru kartları ve not paylaşımı bileşenleri bu tercihten etkilenebilir. Tema değeri yalnızca `App` bileşeninde tutulursa, aradaki birçok bileşene `theme` ve `setTheme` props olarak geçilebilir. Bu yaklaşım küçük örnekte çalışır; ancak proje büyüdükçe bileşenlerin sorumlulukları karışır.

Benzer bir problem okunmamış duyuru sayısında görülür. Duyuru listesi bileşeni duyuruları işaretleyebilir, Header bileşeni ise okunmamış sayısını göstermek ister. Bu iki bileşen doğrudan ebeveyn-çocuk ilişkisi içinde olmayabilir. Bu durumda ortak bir store üzerinden veri okumak ve güncellemek daha anlaşılır hale gelir.

## 12.6 Global state’e ne taşınmalı?

Global state’e taşınacak veri seçilirken temel soru şudur: Bu bilgi birden fazla bağımsız bileşen tarafından okunuyor veya güncelleniyor mu? Cevap evet ise global state adayı olabilir. Ancak bu karar otomatik verilmemelidir. Gereksiz global state, uygulamanın anlaşılmasını zorlaştırır.

KampüsHub için global state adayı olabilecek veriler şunlardır:

- Kullanıcı tema tercihi
- Bildirim aç/kapat tercihi
- Kompakt görünüm tercihi
- Okunmamış duyuru sayısı
- Sabitlenmiş duyurular
- Uygulama genelinde gösterilen başarı/hata bildirimi
- Kullanıcının kısa profil özeti

Buna karşılık aşağıdaki veriler çoğu durumda yerel state olarak kalmalıdır:

- Bir arama kutusunun anlık yazım değeri
- Henüz gönderilmemiş form alanları
- Bir modal penceresinin yalnızca tek bileşende kullanılan açık/kapalı durumu
- Geçici hover/focus bilgisi
- Yalnızca tek sayfada kullanılan filtre taslağı

Bu ayrım, Redux Toolkit kullanırken en önemli mimari kararlardan biridir. Kütüphanenin güçlü olması, tüm state’in store’a taşınması gerektiği anlamına gelmez.

<!-- CODE_META
id: react_ch12_code01
chapter_id: chapter_12
language: javascript
kind: example
title: "KampüsHub state adaylarını kapsamına göre sınıflandırma"
file: "chapter_12/react_ch12_code01_state_scope.js"
extract: true
test: compile_run_assert
expected_stdout: "global: 3 | local: 2"
-->

```javascript
const stateCandidates = [
  { name: "theme", usedBy: ["Header", "Profile", "Dashboard"], changesOften: false },
  { name: "unreadAnnouncementCount", usedBy: ["Header", "Announcements"], changesOften: true },
  { name: "noteDraftTitle", usedBy: ["NoteForm"], changesOften: true },
  { name: "isProfileModalOpen", usedBy: ["ProfilePage"], changesOften: true },
  { name: "notificationEnabled", usedBy: ["Profile", "Settings", "Header"], changesOften: false },
];

function decideScope(candidate) {
  return candidate.usedBy.length > 1 ? "global" : "local";
}

const summary = stateCandidates.reduce(
  (acc, item) => {
    acc[decideScope(item)] += 1;
    return acc;
  },
  { global: 0, local: 0 }
);

console.log(`global: ${summary.global} | local: ${summary.local}`);
```

Bu örnekte sınıflandırma bilinçli olarak sade tutulmuştur. Gerçek projede verinin kalıcılığı, API ile ilişkisi, güncellenme sıklığı ve performans etkisi de değerlendirilir. Ancak başlangıç için “kaç bağımsız bileşen bu veriye ihtiyaç duyuyor?” sorusu iyi bir ilk filtredir.

## 12.7 Redux Toolkit’e kavramsal giriş

Redux, uygulama state’ini merkezi bir store içinde tutan ve değişiklikleri action adı verilen olay nesneleriyle yöneten bir yaklaşımdır. Klasik Redux kullanımında action type sabitleri, action creator fonksiyonları, reducer fonksiyonları ve store yapılandırması için çok sayıda tekrar eden kod yazılırdı. Redux Toolkit bu tekrarları azaltmak için geliştirilmiş modern standart yaklaşımdır.

Redux Toolkit kullanırken genellikle şu parçalarla çalışırız:

- **Store:** Uygulama state’inin merkezi deposudur.
- **Slice:** State’in belirli bir alanını ve o alanı değiştiren reducer’ları birlikte tanımlar.
- **Reducer:** Mevcut state ve action bilgisine göre yeni state’i üretir.
- **Action:** “Ne oldu?” sorusunun nesne biçimindeki cevabıdır.
- **Payload:** Action ile birlikte taşınan ek veridir.
- **Dispatch:** Bir action’ı store’a göndermeyi sağlar.
- **Selector:** Store içinden bileşenin ihtiyaç duyduğu veriyi seçer.

Redux Toolkit’in `createSlice` yaklaşımı, slice adı, başlangıç state’i ve reducer fonksiyonlarını tek yerde tanımlamaya olanak verir. Bu yapıdan hem reducer hem de action creator’lar üretilir. Ayrıca reducer içinde sanki state doğrudan değiştiriliyormuş gibi görünen yazımlar kullanılabilir; bu yazımlar arka planda immutable güncellemelere dönüştürülür. Bu özellik, başlangıç öğrencileri için reducer kodunu daha okunabilir hale getirir.

## 12.8 Store, slice, reducer ve action ilişkisi

KampüsHub için `preferencesSlice` adında bir slice tasarladığımızı düşünelim. Bu slice; tema, bildirim tercihi ve kompakt görünüm gibi ayarları tutabilir. Kullanıcı profil sayfasında tema seçimini değiştirdiğinde `setTheme` benzeri bir action dispatch edilir. Reducer bu action’ı alır ve state’in ilgili alanını günceller. Header veya Layout bileşeni ise `useSelector` ile güncel tema değerini okuyabilir.

Bu akış aşağıdaki gibi özetlenebilir:

1. Kullanıcı arayüzde bir işlem yapar.
2. Bileşen bir action dispatch eder.
3. Reducer action’a göre state’i günceller.
4. Store güncellenir.
5. Selector kullanan bileşenler yeni değeri okur.
6. React gerekli bileşenleri yeniden render eder.

Bu modelin önemli avantajı, veri akışının tahmin edilebilir olmasıdır. State herhangi bir yerden rastgele değiştirilmez; action ve reducer hattı üzerinden güncellenir.

## 12.9 `configureStore` ile store kurulum fikri

Redux Toolkit’te store kurulumunun standart yolu `configureStore` fonksiyonudur. Bu fonksiyon, reducer’ları birleştirme, geliştirme ortamı kontrolleri, thunk middleware ve Redux DevTools bağlantısı gibi birçok varsayılanı daha az kodla yapılandırır. Başlangıç düzeyinde öğrencinin bilmesi gereken temel nokta şudur: Store, uygulamanın global state haritasını ve bu haritanın hangi reducer’larla yönetileceğini tanımlar.

Örnek store dosyası kavramsal olarak şöyle görünebilir:

```javascript
import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./preferencesSlice";
import announcementsReducer from "./announcementsSlice";

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    announcements: announcementsReducer,
  },
});
```

Bu dosyada `preferences` ve `announcements`, store içindeki iki ana alan adıdır. Bir bileşen tema değerini okuyacaksa `state.preferences.theme` yolunu kullanabilir. Duyuru sayısını okuyacaksa `state.announcements.items` üzerinden hesaplanan bir selector kullanabilir.

## 12.10 `createSlice` ile kullanıcı tercihleri

KampüsHub kullanıcı tercihleri için başlangıç state’i şu alanları içerebilir:

- `theme`: `"light"` veya `"dark"`
- `notificationsEnabled`: `true` veya `false`
- `compactMode`: `true` veya `false`

Redux Toolkit ile bu yapı `createSlice` içinde tanımlanır. Aşağıdaki öğretici örnek, gerçek `createSlice` koduna benzer bir reducer mantığını saf JavaScript ile gösterir. Test hattında kütüphane bağımlılığı olmadan çalışabilmesi için reducer fonksiyonu elle yazılmıştır.

<!-- CODE_META
id: react_ch12_code02
chapter_id: chapter_12
language: javascript
kind: example
title: "Kullanıcı tercihleri reducer mantığı"
file: "chapter_12/react_ch12_code02_preferences_reducer.js"
extract: true
test: compile_run_assert
expected_stdout: "dark | closed"
-->

```javascript
const initialPreferences = {
  theme: "light",
  notificationsEnabled: true,
  compactMode: false,
};

function preferencesReducer(state = initialPreferences, action) {
  switch (action.type) {
    case "preferences/setTheme":
      return { ...state, theme: action.payload };
    case "preferences/toggleNotifications":
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    default:
      return state;
  }
}

const afterTheme = preferencesReducer(initialPreferences, {
  type: "preferences/setTheme",
  payload: "dark",
});

const afterToggle = preferencesReducer(afterTheme, {
  type: "preferences/toggleNotifications",
});

const notificationLabel = afterToggle.notificationsEnabled ? "open" : "closed";
console.log(`${afterToggle.theme} | ${notificationLabel}`);
```

Redux Toolkit ile aynı mantık daha kısa yazılır. `createSlice`, action type adlarını ve action creator fonksiyonlarını otomatik üretir. Öğrenci açısından önemli olan, her reducer’ın belirli bir kullanıcı niyetini temsil etmesidir: tema ayarla, bildirimleri aç/kapat, kompakt görünümü değiştir.

```javascript
import { createSlice } from "@reduxjs/toolkit";

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    theme: "light",
    notificationsEnabled: true,
    compactMode: false,
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleNotifications(state) {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
  },
});

export const { setTheme, toggleNotifications } = preferencesSlice.actions;
export default preferencesSlice.reducer;
```

Bu kodda `state.theme = action.payload` satırı klasik JavaScript açısından doğrudan mutasyon gibi görünür. Redux Toolkit bu yazımı güvenli immutable güncellemeye dönüştürür. Bu nedenle reducer daha kısa ve okunabilir hale gelir.

## 12.11 Duyuru slice’ı: okunmuş ve sabitlenmiş durum

KampüsHub’da duyurular yalnızca liste halinde gösterilmez. Kullanıcı bazı duyuruları okundu olarak işaretleyebilir, bazılarını sabitleyebilir ve Header üzerinde okunmamış duyuru sayısını görebilir. Bu tür bilgi birden fazla bileşen tarafından kullanıldığı için global state adayıdır.

Duyuru state’i şu alanlardan oluşabilir:

- `items`: Duyuru nesnelerinin listesi
- `readIds`: Okunmuş duyuru id’leri
- `pinnedIds`: Sabitlenmiş duyuru id’leri

Aşağıdaki örnek saf reducer yaklaşımıyla okunmuş ve sabitlenmiş duyuru güncellemesini gösterir.

<!-- CODE_META
id: react_ch12_code03
chapter_id: chapter_12
language: javascript
kind: example
title: "Duyuru okunma ve sabitleme reducer mantığı"
file: "chapter_12/react_ch12_code03_announcements_reducer.js"
extract: true
test: compile_run_assert
expected_stdout: "unread: 2 | pinned: 1"
-->

```javascript
const initialAnnouncements = {
  items: [
    { id: "a1", title: "Vize takvimi yayımlandı" },
    { id: "a2", title: "Kariyer günü başvuruları" },
    { id: "a3", title: "Kütüphane çalışma saatleri" },
  ],
  readIds: [],
  pinnedIds: [],
};

function uniqueAdd(list, id) {
  return list.includes(id) ? list : [...list, id];
}

function announcementsReducer(state = initialAnnouncements, action) {
  switch (action.type) {
    case "announcements/markAsRead":
      return { ...state, readIds: uniqueAdd(state.readIds, action.payload) };
    case "announcements/pin":
      return { ...state, pinnedIds: uniqueAdd(state.pinnedIds, action.payload) };
    default:
      return state;
  }
}

const afterRead = announcementsReducer(initialAnnouncements, {
  type: "announcements/markAsRead",
  payload: "a1",
});

const afterPin = announcementsReducer(afterRead, {
  type: "announcements/pin",
  payload: "a3",
});

const unreadCount = afterPin.items.length - afterPin.readIds.length;
console.log(`unread: ${unreadCount} | pinned: ${afterPin.pinnedIds.length}`);
```

Bu örnekte `readIds` ve `pinnedIds` ayrı listeler olarak tutulmuştur. Böylece duyuru nesnesinin kendisi ile kullanıcının etkileşim durumu ayrıştırılmış olur. İleride duyurular API’den geldiğinde, okundu bilgisi ayrı bir kullanıcı tercihi olarak ele alınabilir.

## 12.12 Selector tasarımı

Selector, store içindeki ham veriden bileşenin ihtiyaç duyduğu değeri seçen fonksiyondur. Selector yazmak, bileşenleri store yapısına gereğinden fazla bağımlı hale getirmemek açısından önemlidir. Örneğin Header bileşeninin bütün duyuru listesini bilmesine gerek yoktur; yalnızca okunmamış duyuru sayısına ihtiyaç duyar.

KampüsHub için bazı selector örnekleri şunlardır:

- `selectTheme(state)`
- `selectUnreadAnnouncementCount(state)`
- `selectPinnedAnnouncements(state)`
- `selectNotificationsEnabled(state)`
- `selectNoteCount(state)`

Selector fonksiyonları mümkün olduğunca saf olmalıdır. Aynı state verildiğinde aynı sonucu üretmelidir. Bu özellik, selector’ları test etmeyi kolaylaştırır.

<!-- CODE_META
id: react_ch12_code04
chapter_id: chapter_12
language: javascript
kind: example
title: "Selector ile sabitlenmiş okunmamış duyuruları seçme"
file: "chapter_12/react_ch12_code04_selectors.js"
extract: true
test: compile_run_assert
expected_stdout: "a3:Kütüphane çalışma saatleri"
-->

```javascript
const state = {
  announcements: {
    items: [
      { id: "a1", title: "Vize takvimi yayımlandı" },
      { id: "a2", title: "Kariyer günü başvuruları" },
      { id: "a3", title: "Kütüphane çalışma saatleri" },
    ],
    readIds: ["a1"],
    pinnedIds: ["a3"],
  },
};

function selectPinnedUnreadAnnouncements(appState) {
  const { items, readIds, pinnedIds } = appState.announcements;
  return items.filter(
    (item) => pinnedIds.includes(item.id) && !readIds.includes(item.id)
  );
}

const result = selectPinnedUnreadAnnouncements(state)
  .map((item) => `${item.id}:${item.title}`)
  .join(", ");

console.log(result);
```

Selector kullanımı bileşen kodunu da sadeleştirir. Bileşen store’un iç yapısını uzun uzun bilmek yerine yalnızca ihtiyacı olan selector’ı çağırır.

## 12.13 React Redux: Provider, useSelector ve useDispatch

Redux store’un React bileşenleri tarafından kullanılabilmesi için uygulama genellikle `Provider` bileşeni ile sarılır. `Provider`, store’u React bileşen ağacına sunar. Daha sonra bileşenler `useSelector` ile store’dan veri okur ve `useDispatch` ile action gönderir.

KampüsHub’da `main.jsx` veya `AppProvider.jsx` dosyası şu fikre dayanabilir:

```jsx
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

export function AppProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
```

Header bileşeni okunmamış duyuru sayısını şu şekilde okuyabilir:

```jsx
import { useSelector } from "react-redux";
import { selectUnreadAnnouncementCount } from "../store/announcementsSlice";

export function Header() {
  const unreadCount = useSelector(selectUnreadAnnouncementCount);

  return (
    <header>
      <strong>KampüsHub</strong>
      <span>Okunmamış duyuru: {unreadCount}</span>
    </header>
  );
}
```

Profil sayfasında tema değiştirmek için `useDispatch` kullanılabilir:

```jsx
import { useDispatch, useSelector } from "react-redux";
import { setTheme, selectTheme } from "../store/preferencesSlice";

export function ProfilePage() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <button onClick={() => dispatch(setTheme(theme === "dark" ? "light" : "dark"))}>
      Temayı değiştir
    </button>
  );
}
```

Bu örneklerde dikkat edilmesi gereken nokta, bileşenin reducer’ın iç ayrıntısını bilmemesidir. Bileşen yalnızca selector ve action creator üzerinden store ile iletişim kurar.

## 12.14 Dispatch ve payload tasarımı

Action payload, reducer’ın güncelleme yapabilmesi için gereken ek bilgidir. Payload tasarımında gereğinden fazla veri taşımamak önemlidir. Örneğin bir duyuruyu okundu işaretlemek için tüm duyuru nesnesini göndermek yerine yalnızca `announcementId` göndermek yeterli olabilir.

Benzer şekilde not paylaşımı formu gönderildiğinde, formdaki ham değerler doğrudan global store’a aktarılmamalıdır. Önce trim işlemleri, tag ayrıştırması ve görünürlük kontrolü yapılmalıdır. Sonra reducer’a daha temiz bir payload gönderilmelidir.

<!-- CODE_META
id: react_ch12_code05
chapter_id: chapter_12
language: javascript
kind: example
title: "Dispatch edilecek not payload nesnesini hazırlama"
file: "chapter_12/react_ch12_code05_prepare_payload.js"
extract: true
test: compile_run_assert
expected_stdout: "{\"type\":\"notes/addNote\",\"payload\":{\"title\":\"Redux Toolkit\",\"course\":\"React\",\"tags\":[\"redux\",\"state\"]}}"
-->

```javascript
function prepareAddNoteAction(formValues) {
  const tags = formValues.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return {
    type: "notes/addNote",
    payload: {
      title: formValues.title.trim(),
      course: formValues.course.trim(),
      tags,
    },
  };
}

const action = prepareAddNoteAction({
  title: "  Redux Toolkit ",
  course: " React ",
  tags: "Redux, State,  ",
});

console.log(JSON.stringify(action));
```

Bu örnekte form verisi önce sadeleştirilmiş, ardından action nesnesine dönüştürülmüştür. Bu yaklaşım Bölüm 11’deki form payload mantığı ile bu bölümdeki global state mantığını birbirine bağlar.

## 12.15 Global state ve form state ilişkisi

Başlangıç öğrencilerinin sık yaptığı hatalardan biri, formdaki her alanı global store’a taşımaktır. Bu çoğu zaman gereksizdir. Kullanıcı not başlığı yazarken her karakterin global store’a gitmesi, uygulama genelinde ihtiyaç duyulmayan bir verinin merkezi yapıya taşınması anlamına gelir.

Daha sağlıklı yaklaşım şudur:

1. Form alanlarının anlık değerleri form bileşeni içinde tutulur.
2. Doğrulama ve normalize işlemleri form gönderiminde yapılır.
3. Gönderime hazır payload üretilir.
4. Eğer veri uygulama genelinde kullanılacaksa dispatch edilir.
5. Eğer veri sunucuya gönderilecekse API katmanına aktarılır.

Örneğin not paylaşımı formundaki başlık ve açıklama yazılırken yerel state’te tutulabilir. Form başarıyla gönderildiğinde yeni not global listeye eklenebilir veya Bölüm 13’te görüleceği gibi API’ye gönderildikten sonra store güncellenebilir.

## 12.16 KampüsHub global state haritası

KampüsHub’ın başlangıç düzeyindeki global state haritası aşağıdaki gibi düşünülebilir:

```text
store
├── preferences
│   ├── theme
│   ├── notificationsEnabled
│   └── compactMode
├── announcements
│   ├── items
│   ├── readIds
│   └── pinnedIds
└── notes
    ├── items
    └── lastCreatedId
```

Bu harita tüm uygulama verisini kapsamak zorunda değildir. Aksine, yalnızca birden fazla bileşeni ilgilendiren ve uygulama davranışını etkileyen alanları içerir. Arama kutusu metni, form taslakları ve tek bileşene ait görsel durumlar bu haritanın dışında kalabilir.

<!-- CODE_META
id: react_ch12_code06
chapter_id: chapter_12
language: javascript
kind: example
title: "KampüsHub global state snapshot özetini üretme"
file: "chapter_12/react_ch12_code06_state_snapshot.js"
extract: true
test: compile_run_assert
expected_stdout: "announcements: 2 | theme: dark | notes: 1"
-->

```javascript
const appState = {
  preferences: {
    theme: "dark",
    notificationsEnabled: true,
    compactMode: false,
  },
  announcements: {
    items: [
      { id: "a1", title: "Vize takvimi" },
      { id: "a2", title: "Seminer duyurusu" },
    ],
    readIds: ["a1"],
    pinnedIds: [],
  },
  notes: {
    items: [{ id: "n1", title: "React Router özeti" }],
  },
};

function summarizeState(state) {
  return [
    `announcements: ${state.announcements.items.length}`,
    `theme: ${state.preferences.theme}`,
    `notes: ${state.notes.items.length}`,
  ].join(" | ");
}

console.log(summarizeState(appState));
```

Bu tür snapshot özetleri test ve hata ayıklama sırasında yararlı olabilir. Uygulama beklenmeyen davranış gösterdiğinde önce store’un hangi alanlarının değiştiğine bakmak gerekir.

## 12.17 Programatik ekran çıktısı planı

Bu bölümde ekran görüntüleri, Redux Toolkit kavramlarını görsel olarak desteklemek için kullanılmalıdır. Görsellerin amacı yalnızca arayüz göstermek değil, global state’in farklı bileşenlerde nasıl karşılık bulduğunu görünür kılmaktır.

<!-- SCREENSHOT_META
id: b12_01_kampushub_global_state_paneli
chapter: chapter_12
figure: "Şekil 12.1"
title: "KampüsHub global state paneli"
route: "/__book__/chapter-12/kampushub-global-state-paneli"
waitFor: "[data-book-shot='b12_01_kampushub_global_state_paneli']"
actions: []
output: "assets/auto/chapter_12/b12_01_kampushub_global_state_paneli.png"
caption: "KampüsHub uygulamasında tema, duyuru ve not bilgilerinin global state panelinde birlikte gösterimi."
markdownTarget: "[SCREENSHOT:b12_01_kampushub_global_state_paneli]"
-->

[SCREENSHOT:b12_01_kampushub_global_state_paneli]

<!-- SCREENSHOT_META
id: b12_02_duyuru_state_gorunumu
chapter: chapter_12
figure: "Şekil 12.2"
title: "Duyuru state görünümü"
route: "/__book__/chapter-12/duyuru-state-gorunumu"
waitFor: "[data-book-shot='b12_02_duyuru_state_gorunumu']"
actions: []
output: "assets/auto/chapter_12/b12_02_duyuru_state_gorunumu.png"
caption: "Okunmuş, okunmamış ve sabitlenmiş duyuru durumlarının arayüzde ayrıştırılması."
markdownTarget: "[SCREENSHOT:b12_02_duyuru_state_gorunumu]"
-->

[SCREENSHOT:b12_02_duyuru_state_gorunumu]

<!-- SCREENSHOT_META
id: b12_03_tercihler_paneli
chapter: chapter_12
figure: "Şekil 12.3"
title: "Kullanıcı tercihleri paneli"
route: "/__book__/chapter-12/tercihler-paneli"
waitFor: "[data-book-shot='b12_03_tercihler_paneli']"
actions: []
output: "assets/auto/chapter_12/b12_03_tercihler_paneli.png"
caption: "Tema, bildirim ve kompakt görünüm tercihlerinin Redux store üzerinden yönetildiği örnek panel."
markdownTarget: "[SCREENSHOT:b12_03_tercihler_paneli]"
-->

[SCREENSHOT:b12_03_tercihler_paneli]

## 12.18 CODE_META ve test edilebilir kod örnekleri

Bu bölümdeki CODE_META örnekleri, Redux Toolkit’in kavramsal parçalarını Node ortamında test edilebilir saf JavaScript mantığına indirger. Gerçek uygulamada `createSlice`, `configureStore`, `Provider`, `useSelector` ve `useDispatch` kullanılacaktır. Ancak reducer ve selector mantığının test edilebilir olması için iş kuralları sade fonksiyonlarla da ifade edilebilir.

Test edilebilir örneklerin amacı şudur:

- Global state adaylarını sınıflandırmak
- Reducer güncelleme mantığını görmek
- Selector fonksiyonlarını saf biçimde yazmak
- Dispatch payload tasarımını doğrulamak
- Store snapshot özetini yorumlamak

Bu yaklaşım, öğrencinin Redux Toolkit’i yalnızca ezberlenen bir kütüphane olarak değil, test edilebilir veri akışı modeli olarak kavramasına yardımcı olur.

## 12.19 Sık yapılan hatalar ve yanlış sezgiler

Redux Toolkit öğrenirken sık karşılaşılan ilk hata, tüm state’i global store’a taşımaktır. Bu yaklaşım başlangıçta düzenli gibi görünse de proje büyüdükçe store’un gereksiz ayrıntılarla dolmasına neden olur. Form inputlarının anlık değerleri, hover bilgisi veya yalnızca tek bileşende kullanılan açılır menü durumu genellikle yerel state olarak kalmalıdır.

İkinci hata, selector yazmadan doğrudan derin state yollarını bileşenlere yaymaktır. Örneğin birçok bileşende `state.announcements.items.filter(...)` benzeri tekrarlar varsa, bu mantık bir selector’a taşınmalıdır. Böylece store yapısı değiştiğinde yalnızca selector güncellenir.

Üçüncü hata, action payload içine gereğinden fazla veri koymaktır. Bir duyuruyu okundu işaretlemek için tüm duyuru nesnesini göndermek yerine duyuru id’si yeterlidir. Payload küçük, anlamlı ve reducer’ın ihtiyaç duyduğu kadar bilgi içermelidir.

Dördüncü hata, reducer içinde tarih üretme, rastgele sayı oluşturma veya ağ isteği yapma gibi yan etkiler gerçekleştirmektir. Reducer mümkün olduğunca saf kalmalıdır. Yan etkiler daha sonra async thunk, middleware veya API katmanı içinde ele alınabilir.

## 12.20 Hata ayıklama egzersizi

Aşağıdaki senaryoyu düşünün: KampüsHub Header bileşenindeki okunmamış duyuru rozeti yanlış sayı göstermektedir. Duyuru sayfasında bir duyuru okundu olarak işaretlenmiş görünür; fakat Header hâlâ eski sayıyı göstermektedir.

Bu durumda şu adımlarla hata ayıklama yapılabilir:

1. `markAsRead` action’ı gerçekten dispatch ediliyor mu?
2. Action payload içinde doğru `announcementId` var mı?
3. Reducer `readIds` listesini doğru güncelliyor mu?
4. Selector okunmamış sayıyı `items.length - readIds.length` gibi doğru bir mantıkla mı hesaplıyor?
5. Header `useSelector` ile doğru selector’ı mı kullanıyor?
6. Aynı duyuru id’si `readIds` listesine birden fazla kez ekleniyor mu?

Bu egzersiz, Redux tabanlı uygulamalarda hatanın çoğu zaman bileşen, action, reducer veya selector hattının bir noktasında aranması gerektiğini gösterir.

## 12.21 Bölüm özeti ve terim sözlüğü

Bu bölümde KampüsHub uygulamasında global state yönetimine neden ihtiyaç duyulduğu ve Redux Toolkit’in bu ihtiyacı nasıl karşıladığı incelendi. Yerel state, Context ve global state arasındaki farklar açıklandı. Props drilling problemi KampüsHub senaryosu üzerinden ele alındı. Store, slice, reducer, action, dispatch ve selector kavramları ayrıştırıldı. Kullanıcı tercihleri, duyuru durumu ve not listesi üzerinden başlangıç düzeyinde bir global state haritası tasarlandı.

**Store:** Uygulamanın global state deposudur.

**Slice:** Store’un belirli bir alanını, başlangıç state’ini ve reducer fonksiyonlarını birlikte tanımlayan yapıdır.

**Reducer:** Mevcut state ve action bilgisine göre yeni state’i üreten fonksiyondur.

**Action:** Uygulamada gerçekleşen olayı temsil eden nesnedir.

**Payload:** Action ile birlikte taşınan ek veridir.

**Dispatch:** Action’ı store’a gönderen işlemdir.

**Selector:** Store içinden bileşenin ihtiyaç duyduğu değeri seçen fonksiyondur.

**Props drilling:** Verinin aradaki bileşenler tarafından kullanılmadığı halde alt bileşenlere props olarak taşınmasıdır.

**Derived state:** Ham state’ten hesaplanarak elde edilen türetilmiş değerdir.

## 12.22 Kavramsal sorular

1. Her paylaşılan veri neden otomatik olarak global state’e taşınmamalıdır?
2. KampüsHub’da tema tercihi neden global state adayıdır?
3. Not paylaşımı formundaki anlık başlık değeri neden genellikle local state olarak kalmalıdır?
4. `dispatch` ve `selector` kavramları arasındaki fark nedir?
5. Reducer fonksiyonlarının mümkün olduğunca saf olması neden önemlidir?
6. Props drilling problemi hangi durumlarda sürdürülebilirliği azaltır?
7. `createSlice` klasik Redux kodundaki hangi tekrarları azaltır?
8. Header bileşeni okunmamış duyuru sayısını neden doğrudan liste üzerinde hesaplamak yerine selector kullanmalıdır?
9. Action payload tasarımında “yeterli ama gereksiz olmayan veri” ilkesi ne anlama gelir?
10. Redux Toolkit ile Context API arasında seçim yaparken hangi ölçütler dikkate alınmalıdır?

## 12.23 Programlama alıştırmaları

1. KampüsHub için `preferences` state modeline `fontSize` alanı ekleyin. Bu alan için `small`, `medium`, `large` değerlerini kabul eden bir reducer tasarlayın.
2. Duyuru state’i içinde `archivedIds` alanı oluşturun. Bir duyuruyu arşivleyen saf reducer fonksiyonu yazın.
3. `selectUnreadAnnouncementCount` adlı bir selector yazın ve farklı state örnekleriyle test edin.
4. Not paylaşımı formundan gelen ham veriyi `notes/addNote` action payload’una dönüştüren bir yardımcı fonksiyon yazın.
5. KampüsHub state haritasında hangi verilerin local, Context veya Redux store içinde tutulacağını tabloyla sınıflandırın.
6. `compactMode` değerine göre kart başına gösterilecek maksimum açıklama uzunluğunu hesaplayan bir selector yazın.
7. Aynı duyuru id’sinin `readIds` listesine iki kez eklenmesini engelleyen bir yardımcı fonksiyon yazın.
8. Header bileşeni için okunmamış duyuru rozeti gösteren basit bir JSX taslağı hazırlayın.

## 12.24 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub uygulamasına başlangıç düzeyinde Redux Toolkit katmanı eklemektir. Öğrenci aşağıdaki yapıyı oluşturmalıdır:

```text
src/
├── store/
│   ├── store.js
│   ├── preferencesSlice.js
│   ├── announcementsSlice.js
│   └── selectors.js
├── components/
│   ├── AppProvider.jsx
│   └── Header.jsx
└── pages/
    ├── ProfilePage.jsx
    └── AnnouncementsPage.jsx
```

Laboratuvar adımları:

1. `preferencesSlice` içinde tema, bildirim ve kompakt görünüm alanlarını tanımlayın.
2. `announcementsSlice` içinde duyuru listesi, okunmuş id’ler ve sabitlenmiş id’ler için başlangıç state’i oluşturun.
3. `configureStore` ile `preferences` ve `announcements` reducer’larını store’a bağlayın.
4. Uygulamayı `Provider` ile sarın.
5. Header bileşeninde okunmamış duyuru sayısını selector ile gösterin.
6. Profil sayfasında tema değiştiren bir buton ekleyin.
7. Duyurular sayfasında bir duyuruyu okundu işaretleyen dispatch işlemi tasarlayın.
8. Geçici form alanlarını global store’a taşımamaya dikkat edin.

Başarı ölçütü: Uygulamada en az iki slice bulunmalı, Header global state’ten veri okuyabilmeli, Profil sayfası global state’i güncelleyebilmeli ve selector/reducer mantığı ayrı dosyalarda okunabilir biçimde düzenlenmelidir.

## 12.25 İleri okuma ve bir sonraki bölüme köprü

Bu bölümde global client state yönetimine odaklandık. RTK Query ayrıntıları bu bölümün kapsamı dışındadır; burada yalnızca client state için temel Redux Toolkit düşüncesi ele alınmıştır. Ancak gerçek uygulamalarda verinin önemli bir kısmı sunucudan gelir. Duyurular, etkinlikler, kullanıcı profili ve not paylaşımları çoğu zaman REST API üzerinden alınır veya gönderilir. Bu nedenle her veriyi Redux store’da kalıcı olarak tutmak doğru olmayabilir. Bölüm 13’te REST API entegrasyonuna geçilecek ve client state ile server state arasındaki fark daha görünür hale gelecektir.

Bir sonraki bölümde KampüsHub uygulaması dış veri kaynaklarıyla iletişim kuracak; `fetch`, HTTP durum kodları, yükleniyor/hata/başarı durumları ve API’den gelen verinin bileşenlere aktarılması ele alınacaktır. Redux Toolkit bu noktada uygulama içi tercih ve etkileşim durumları için zemin sağlamış olacaktır.
