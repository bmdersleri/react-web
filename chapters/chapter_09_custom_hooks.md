---
title: "Bölüm 9: Özel Hook’lar"
chapter_id: "chapter_09"
content_language: "tr-TR"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
numbering_policy: "manual_visible_for_current_pipeline"
automation_profile: "parametric_computer_book_factory_v2_0"
code_policy: "CODE_META blocks precede executable JavaScript fences"
screenshot_policy: "SCREENSHOT_META plus [SCREENSHOT:*] markers"
---

# Bölüm 9: Özel Hook’lar

## 9.1 Bölümün yol haritası

Önceki bölümlerde React uygulamalarını adım adım kurmak için gereken temel yapı taşları incelendi. Bölüm 1’de modern web, SPA yaklaşımı, React ekosistemi, Node.js, npm, Vite, `npm create vite@latest`, `npm install`, `npm run dev`, HMR, React DevTools, `package.json`, `index.html`, `main.jsx` ve `App.jsx` gibi geliştirme ortamı kavramları yerleştirildi. Bölüm 2’de JavaScript ES6+ söz dizimi, Bölüm 3’te HTML ve CSS bilgisinden bileşen düşüncesine geçiş, Bölüm 4’te JSX ve bileşen anatomisi, Bölüm 5’te props ile tek yönlü veri akışı, Bölüm 6’da `useState`, Bölüm 7’de `useEffect`, Bölüm 8’de ise `useRef`, `useContext`, `useMemo` ve `useCallback` ele alındı.

Bu bölümde odak noktası tek tek Hook kullanmak değil, Hook tabanlı mantığı yeniden kullanılabilir hâle getirmektir. React uygulamaları büyüdükçe bazı kod parçaları birden fazla bileşende tekrar etmeye başlar. Örneğin bir modül listesini arama metnine göre filtrelemek, tema tercihini tarayıcıda saklamak, duyuruları kategoriye göre ayırmak veya bir veri yükleme durumunu `loading`, `success`, `error` şeklinde izlemek yalnızca bir bileşenin problemi olmayabilir. Bu tekrarlar doğrudan bileşen içinde bırakıldığında kod okunabilirliği azalır; yardımcı fonksiyona taşındığında ise bazen state ve effect ihtiyacı karşılanamaz. Özel Hook’lar bu iki uç arasında React’e özgü bir düzenleme imkânı sunar.

Bölüm boyunca şu temel sorulara yanıt aranacaktır:

- Bir mantık ne zaman sıradan yardımcı fonksiyon olarak kalmalı, ne zaman özel Hook’a dönüşmelidir?
- Özel Hook adının neden `use` ön ekiyle başlaması gerekir?
- Hook kuralları özel Hook içinde de neden geçerlidir?
- State, effect, ref, context ve memoization kullanan bir mantık bileşenden nasıl ayrılır?
- Özel Hook’un dönüş değeri nasıl tasarlanmalıdır?
- KampüsHub uygulamasında modül listesi, duyuru filtresi, kullanıcı tercihi ve asenkron veri durumu nasıl özel Hook’lara ayrılabilir?

Bu bölümün sonunda öğrenci, React bileşenlerini yalnızca görsel çıktı üreten fonksiyonlar olarak değil, davranış mantığı özel Hook’larla desteklenen daha düzenli arayüz birimleri olarak görmeye başlayacaktır. Bu yaklaşım, ilerleyen bölümlerde React Router, form yönetimi, global state, REST API entegrasyonu, Zustand, test ve dağıtım konularına geçerken daha sürdürülebilir bir kod tabanı sağlayacaktır.

## 9.2 Bölümün konumu

Özel Hook’lar, React öğrenme sürecinde kritik bir eşiği temsil eder. İlk aşamada öğrenci bileşen yazmayı öğrenir; ikinci aşamada bileşene veri göndermeyi ve bileşen içinde değişen veriyi yönetmeyi öğrenir; üçüncü aşamada ise bileşenlerin içinde biriken davranış mantığını daha temiz yapılara ayırmayı öğrenir. Bölüm 9 bu üçüncü aşamaya geçiştir.

Bölüm 8’de öğrenilen ileri Hook’lar, özel Hook tasarımının ham malzemesi gibidir. `useRef`, kalıcı ama render tetiklemeyen değerler için; `useContext`, ortak bağlamı okumak için; `useMemo`, türetilmiş veriyi kontrollü hesaplamak için; `useCallback`, fonksiyon referansını kararlı tutmak için kullanılmıştı. Özel Hook’lar bu Hook’ları tek bir problem etrafında bir araya getirebilir. Örneğin `useCampusModules`, modül listesini filtrelemek için `useMemo` kullanabilir; `useLocalPreference`, tarayıcı saklama alanı ile etkileşmek için `useEffect` kullanabilir; `useAnnouncementFilter`, arama metni ve kategori seçimine göre türetilmiş duyuru listesini döndürebilir.

Bu bölüm, KampüsHub projesinde bileşenlerin sorumluluklarını sadeleştirmeye hizmet eder. Önceki bölümlerde ana ekran, modül kartları, duyuru listesi ve tema/tercih alanları parça parça kurulmuştu. Artık bu parçaların içinde tekrar eden mantıklar belirlenebilir. Böylece `DashboardPage` gibi bir sayfa bileşeni hem görsel düzeni okuyabilir hem de davranış ayrıntılarını özel Hook’lara devredebilir. Bu, büyük projelerde yalnızca teknik bir iyileştirme değil, ekip içi okunabilirlik ve bakım kolaylığı açısından da önemli bir adımdır.

Bölüm 9’da React Router ayrıntıları, form kütüphaneleri, Redux Toolkit, Zustand, TanStack Query veya REST API entegrasyonu ana akışa alınmayacaktır. Bunlar ilerleyen bölümlerde ele alınacak konulardır. Buradaki amaç, öğrencinin kendi küçük ama doğru özel Hook’larını yazabilmesi ve hangi mantığın Hook’a taşınmasının anlamlı olduğunu değerlendirebilmesidir.

## 9.3 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

1. Özel Hook kavramını, React bileşeni ve sıradan yardımcı fonksiyondan ayırt eder.
2. `use` ön ekiyle adlandırmanın yalnızca gelenek değil, React Hook kurallarının izlenebilirliği açısından zorunlu bir işaret olduğunu açıklar.
3. Özel Hook içinde `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef` ve `useContext` kullanımının aynı Hook kurallarına bağlı olduğunu bilir.
4. Bileşen içinde tekrar eden davranış mantığını tanır ve bu mantığı özel Hook’a taşımak için adım adım refaktör yapar.
5. Özel Hook dönüş değerini nesne, dizi veya sade değer olarak tasarlarken okunabilirlik ve kullanım bağlamını dikkate alır.
6. KampüsHub modül listesi için `useCampusModules` benzeri bir filtreleme Hook’u tasarlar.
7. Kullanıcı tercihleri için `useLocalPreference` benzeri bir Hook tasarımını açıklar.
8. Duyuru filtresi, kategori seçimi ve boş sonuç durumunu özel Hook mantığıyla ifade eder.
9. Asenkron veri durumlarında `idle`, `loading`, `success`, `error` gibi durumları ayrıştırmanın önemini yorumlar.
10. Özel Hook tasarımında aşırı genelleme, belirsiz isimlendirme, gizli yan etki ve koşullu Hook çağrısı hatalarını ayırt eder.

## 9.4 Ön bilgi

Bu bölümü rahat izleyebilmek için öğrencinin React’in temel zihinsel modelini hatırlaması gerekir. React uygulamasında bileşen, props alır ve JSX çıktısı üretir. State, bileşenin zaman içinde değişen verisini temsil eder. Effect, render sonucunun dış dünya ile etkileşmesini sağlar. Props tek yönlü akar; yani üst bileşenden alt bileşene doğru veri gönderilir. Bu temel model özel Hook’larda değişmez. Özel Hook, bileşen yerine geçen bir yapı değildir; bileşenin kullandığı davranış mantığını paketleyen bir fonksiyondur.

Özel Hook kavramını anlamak için üç ayrımı netleştirmek gerekir. Birincisi, özel Hook ile yardımcı fonksiyon aynı şey değildir. Yardımcı fonksiyon genellikle saf bir girdi-çıktı dönüşümü yapar; örneğin bir metni biçimlendirir veya bir listeyi filtreler. Özel Hook ise React Hook’larını kullanabilir; yani state, effect, ref veya context gibi React mekanizmalarına bağlanabilir. İkincisi, özel Hook bileşen değildir. JSX döndürmek zorunda değildir ve çoğu zaman doğrudan ekrana bir şey çizmez. Üçüncüsü, özel Hook servis katmanı değildir. Veriyi alma, saklama veya dönüştürme ayrıntılarını kapsayabilir; ancak amacı React bileşenlerinin davranış mantığını daha okunabilir ve tekrar kullanılabilir hâle getirmektir.

Bir özel Hook’un adı `use` ile başlamalıdır: `useCampusModules`, `useLocalPreference`, `useAnnouncementFilter` gibi. Bu adlandırma, React ve lint araçları için önemlidir. Çünkü Hook kuralları yalnızca React’in yerleşik Hook’ları için değil, özel Hook’lar için de geçerlidir. Hook’lar döngü, koşul veya iç fonksiyon içinde çağrılmamalıdır. Her render’da aynı sırada çağrılmaları gerekir. Aksi durumda React, hangi state’in hangi Hook çağrısına ait olduğunu güvenilir biçimde izleyemez.

Bu bölümdeki test edilebilir kod örnekleri saf JavaScript çekirdekleri olarak verilecektir. Bunun nedeni, gerçek React Hook’larının tarayıcı ve React çalışma zamanı bağlamında değerlendirilmesidir. Ancak iyi bir özel Hook tasarımında çoğu karar mantığı saf fonksiyonlara ayrılabilir. Örneğin modül filtreleme, duyuru arama veya durum makinesi geçişleri Node ortamında test edilebilir. Ardından bu saf çekirdekler React özel Hook’u içinde kullanılabilir. Bu yaklaşım BookFactory üretim hattında CODE_META testlerini kolaylaştırdığı gibi, gerçek projelerde de birim test yazmayı basitleştirir.

## 9.5 Özel Hook nedir?

Özel Hook, React Hook’larını ve ilgili davranış mantığını bir araya getiren, adı `use` ile başlayan JavaScript fonksiyonudur. Bir özel Hook genellikle şu amaçlardan biri için yazılır:

- Bileşen içinde tekrar eden state yönetimini ortaklaştırmak
- Effect ve cleanup mantığını tek bir yerde toplamak
- Türetilmiş veriyi hesaplayan kodu bileşenden ayırmak
- Context veya ref kullanımını daha okunabilir bir API arkasına almak
- Birden fazla bileşenin aynı davranışı paylaşmasını sağlamak

Örneğin KampüsHub’da duyuru listesini arama metnine göre filtrelemek için önce şu tür bir bileşen içi kod yazılmış olabilir:

```jsx
function AnnouncementsPanel({ announcements, searchText }) {
  const visibleAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <section>
      {visibleAnnouncements.map((announcement) => (
        <article key={announcement.id}>{announcement.title}</article>
      ))}
    </section>
  );
}
```

Bu örnek küçükken anlaşılırdır. Ancak aynı filtreleme mantığı ana sayfada, duyuru sayfasında ve arama sonuçları bileşeninde tekrar etmeye başlarsa kod dağılır. Ayrıca kategori filtresi, boş sonuç mesajı, sayaç ve sıralama eklendiğinde bileşenin görsel sorumluluğu ile veri hazırlama sorumluluğu birbirine karışır. Bu durumda mantığı `useAnnouncementFilter` adlı bir özel Hook’a taşımak daha okunabilir olabilir:

```jsx
function useAnnouncementFilter(announcements, filters) {
  const normalizedSearch = filters.searchText.trim().toLowerCase();

  const visibleAnnouncements = announcements.filter((announcement) => {
    const matchesSearch = announcement.title.toLowerCase().includes(normalizedSearch);
    const matchesCategory =
      filters.category === "all" || announcement.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  return {
    visibleAnnouncements,
    totalCount: announcements.length,
    visibleCount: visibleAnnouncements.length,
    isEmpty: visibleAnnouncements.length === 0
  };
}
```

Bu örnek henüz yerleşik React Hook’u kullanmasa bile özel Hook tasarımına hazırlanır. Eğer içine `useMemo`, `useState` veya `useEffect` eklenecekse adlandırmanın `use` ile başlaması gerekir. Buradaki temel ilke şudur: Bileşen ne göstereceğine odaklanmalı, özel Hook ise gösterilecek verinin nasıl hazırlanacağına odaklanmalıdır.

Aşağıdaki test edilebilir örnek, KampüsHub modüllerini filtreleyen saf çekirdek mantığı gösterir. Gerçek React özel Hook’u bu fonksiyonu `useMemo` içinde çağırabilir.

<!-- CODE_META
id: react_ch09_code01
chapter_id: chapter_09
language: javascript
kind: example
title: "KampüsHub modül filtreleme çekirdeği"
file: "react_ch09_code01_module_filter.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "filtered=2"
  - "empty=false"
  - "labels=Duyuru|Etkinlik"
timeout_sec: 5
-->
```javascript
const modules = [
  { id: 1, label: "Duyuru", area: "academic", pinned: true },
  { id: 2, label: "Etkinlik", area: "social", pinned: true },
  { id: 3, label: "Not Paylaşımı", area: "academic", pinned: false },
  { id: 4, label: "Profil", area: "user", pinned: false }
];

function filterCampusModules(items, filter) {
  const query = filter.query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesQuery = item.label.toLowerCase().includes(query);
    const matchesPinned = filter.onlyPinned ? item.pinned : true;
    return matchesQuery && matchesPinned;
  });
}

const visibleModules = filterCampusModules(modules, {
  query: "",
  onlyPinned: true
});

console.log(
  `filtered=${visibleModules.length};empty=${visibleModules.length === 0};labels=${visibleModules.map((item) => item.label).join("|")}`
);
```

Bu kod bir React Hook değildir; ancak özel Hook’un test edilebilir çekirdeğini temsil eder. İyi bir tasarımda React’e bağlı olmayan karar mantığı böyle ayrılır. Sonrasında `useCampusModules` içinde bu fonksiyon kullanılabilir:

```jsx
import { useMemo } from "react";

function useCampusModules(modules, filter) {
  const visibleModules = useMemo(() => {
    return filterCampusModules(modules, filter);
  }, [modules, filter.query, filter.onlyPinned]);

  return {
    visibleModules,
    visibleCount: visibleModules.length,
    isEmpty: visibleModules.length === 0
  };
}
```

Burada `useCampusModules` bileşenin görsel düzenini sadeleştirir. Bileşen artık filtreleme ayrıntısına değil, `visibleModules`, `visibleCount` ve `isEmpty` çıktılarının nasıl gösterileceğine odaklanır.

## 9.6 Özel Hook tasarım ilkeleri

Özel Hook yazarken en önemli ilke tek sorumluluktur. Bir özel Hook tek bir davranış problemini çözmelidir. `useCampusModules` modül listesini filtreleyip özetleyebilir; ancak aynı anda kullanıcı oturumunu doğrulama, tema değiştirme, bildirim gönderme ve form doğrulama sorumluluklarını üstlenmemelidir. Hook adı, çözdüğü problemi açıkça ifade etmelidir.

İkinci ilke, dönüş değerinin okunabilir olmasıdır. Eğer Hook yalnızca iki değer döndürüyorsa dizi dönüşü kabul edilebilir. `useState` bu nedenle `[value, setValue]` biçiminde döner. Ancak Hook çok sayıda anlamlı çıktı döndürüyorsa nesne dönüşü daha açık olabilir:

```jsx
const {
  visibleModules,
  visibleCount,
  isEmpty,
  selectedArea
} = useCampusModules(modules, filter);
```

Bu kullanımda her değerin adı doğrudan görünür. Özellikle ders kitabı ve ekip çalışması bağlamında nesne dönüşü, yeni başlayan öğrenciler için daha okunabilir olabilir.

Üçüncü ilke, Hook’un girdilerini açık tutmaktır. Bir Hook dışarıdan aldığı verileri parametre olarak açıkça göstermelidir. Gizli global değişkenlere, belirsiz tarayıcı durumlarına veya yan etkili yardımcı fonksiyonlara aşırı bağımlı Hook’lar test edilmeyi zorlaştırır. Örneğin `useAnnouncementFilter(announcements, filters)` ifadesi, Hook’un hangi veriyle çalıştığını açıkça gösterir.

Dördüncü ilke, gereksiz genellemeden kaçınmaktır. Her tekrar eden kod hemen genel amaçlı bir Hook’a dönüştürülmemelidir. İki yerde görülen benzerlik bazen geçici olabilir. Önce problemi anlamak, sonra Hook’a çıkarmak daha doğrudur. Özellikle “her şeyi yöneten” büyük Hook’lar, bileşen karmaşasını yalnızca başka bir dosyaya taşır.

Beşinci ilke, React’e bağlı ve React’ten bağımsız mantığı ayırmaktır. Filtreleme, sıralama, doğrulama ve durum geçişi gibi saf işlemler ayrı fonksiyonlarda tutulabilir. Özel Hook bu fonksiyonları `useMemo`, `useEffect` veya `useState` ile bağlar. Bu ayrım hem test kolaylığı sağlar hem de bölüm sonu CODE_META örneklerinde olduğu gibi Node ortamında doğrulanabilir çekirdekler üretir.

Aşağıdaki örnek, tercih yönetiminin React’ten bağımsız çekirdeğini gösterir. Gerçek projede bu mantık `useLocalPreference` Hook’u içinde `useState` ve `useEffect` ile bağlanabilir.

<!-- CODE_META
id: react_ch09_code02
chapter_id: chapter_09
language: javascript
kind: example
title: "Yerel tercih saklama çekirdeği"
file: "react_ch09_code02_preference_store.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "theme=dark"
  - "density=compact"
  - "keys=campushub.density,campushub.theme"
timeout_sec: 5
-->
```javascript
function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    keys() {
      return Array.from(data.keys()).sort();
    }
  };
}

function createPreferenceStore(storage, namespace) {
  return {
    getPreference(name, fallbackValue) {
      const stored = storage.getItem(`${namespace}.${name}`);
      return stored === null ? fallbackValue : stored;
    },
    setPreference(name, value) {
      storage.setItem(`${namespace}.${name}`, value);
      return value;
    }
  };
}

const storage = createMemoryStorage();
const preferences = createPreferenceStore(storage, "campushub");

preferences.setPreference("theme", "dark");
preferences.setPreference("density", "compact");

console.log(
  `theme=${preferences.getPreference("theme", "light")};density=${preferences.getPreference("density", "comfortable")};keys=${storage.keys().join(",")}`
);
```

Bu çekirdek tasarımın React özel Hook karşılığı şu biçimde düşünülebilir:

```jsx
import { useEffect, useState } from "react";

function useLocalPreference(key, initialValue) {
  const storageKey = `campushub.${key}`;

  const [value, setValue] = useState(() => {
    return window.localStorage.getItem(storageKey) ?? initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
}
```

Bu örnek, özel Hook’un state ve effect kullandığını gösterir. Ancak yerel saklama çekirdeği ayrı düşünüldüğünde test edilebilirlik artar. Ayrıca Hook’un adı davranışı açıkça anlatır: yerel tercih okur ve günceller.

## 9.7 Bileşenden özel Hook’a refaktör

Özel Hook yazmanın en doğal yolu, sıfırdan soyutlama tasarlamak değil, var olan bir bileşende tekrar eden mantığı fark edip onu adım adım dışarı almaktır. Bu süreç refaktör olarak düşünülebilir: uygulamanın davranışı değişmez, fakat kodun örgütlenme biçimi iyileşir.

Bir bileşeni incelerken şu sorular sorulabilir:

- Bileşenin içinde görsel JSX dışında uzun veri hazırlama kodları var mı?
- Aynı filtreleme, sıralama veya doğrulama mantığı başka bileşende de var mı?
- State ve effect kodları bileşenin ana amacını okumayı zorlaştırıyor mu?
- Bu mantık ayrı bir fonksiyonla test edilebilir mi?
- Bu mantık React Hook’larına ihtiyaç duyuyor mu?

Eğer cevaplar özel Hook yönünde işaret veriyorsa izlenecek yol basittir. Önce saf çekirdek fonksiyonları ayırılır. Sonra React’e bağlı state/effect/memoization kodu `use` ön ekli özel Hook içine taşınır. En sonunda bileşen, Hook’un döndürdüğü değerleri kullanarak daha sade bir JSX üretir.

KampüsHub duyuru paneli üzerinden düşünelim. Başlangıçta bileşenin içinde kategori filtresi, arama filtresi, boş sonuç kontrolü ve sayaç hesaplaması olabilir. Bu mantık büyüdükçe `AnnouncementsPanel` bileşeni iki farklı sorumluluğu aynı anda taşır: hem veriyi hazırlar hem de ekrana çizer. Daha iyi bir düzenlemede `useAnnouncementFilter` veriyi hazırlar, `AnnouncementsPanel` ise sonucu gösterir.

Aşağıdaki test edilebilir çekirdek, bu ayrımı modellemektedir.

<!-- CODE_META
id: react_ch09_code03
chapter_id: chapter_09
language: javascript
kind: example
title: "Duyuru filtreleme ve boş sonuç modeli"
file: "react_ch09_code03_announcement_filter.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "visible=1"
  - "empty=false"
  - "message=1 duyuru listeleniyor"
timeout_sec: 5
-->
```javascript
const announcements = [
  { id: 1, title: "Final sınav takvimi açıklandı", category: "academic" },
  { id: 2, title: "Bahar şenliği başlıyor", category: "social" },
  { id: 3, title: "Kütüphane çalışma saatleri güncellendi", category: "campus" }
];

function buildAnnouncementFilterModel(items, filter) {
  const query = filter.query.trim().toLowerCase();
  const visible = items.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query);
    const matchesCategory = filter.category === "all" || item.category === filter.category;
    return matchesQuery && matchesCategory;
  });

  return {
    visible,
    isEmpty: visible.length === 0,
    message: visible.length === 0 ? "Uygun duyuru bulunamadı" : `${visible.length} duyuru listeleniyor`
  };
}

const model = buildAnnouncementFilterModel(announcements, {
  query: "final",
  category: "academic"
});

console.log(`visible=${model.visible.length};empty=${model.isEmpty};message=${model.message}`);
```

Bu fonksiyon doğrudan React’e bağlı değildir. Özel Hook içinde şu şekilde kullanılabilir:

```jsx
import { useMemo } from "react";

function useAnnouncementFilter(announcements, filter) {
  return useMemo(() => {
    return buildAnnouncementFilterModel(announcements, filter);
  }, [announcements, filter.query, filter.category]);
}
```

Bu kullanım bileşeni sadeleştirir:

```jsx
function AnnouncementsPanel({ announcements, filter }) {
  const { visible, isEmpty, message } = useAnnouncementFilter(announcements, filter);

  return (
    <section className="announcements-panel">
      <p>{message}</p>
      {isEmpty ? (
        <p>Arama ölçütlerini değiştirerek tekrar deneyin.</p>
      ) : (
        visible.map((announcement) => (
          <article key={announcement.id}>{announcement.title}</article>
        ))
      )}
    </section>
  );
}
```

Burada bileşenin görevi daha okunur hâle gelir: mesajı göster, boş durum varsa açıklama yaz, sonuç varsa listele. Filtreleme ayrıntısı ise özel Hook’un sorumluluğundadır.

## 9.8 Dönüş değeri, durum modeli ve test edilebilirlik

Özel Hook tasarımında en çok ihmal edilen konulardan biri dönüş değeridir. Hook’un ne döndürdüğü, onu kullanan bileşenlerin okunabilirliğini doğrudan etkiler. Dönüş değeri belirsizse, Hook başarılı olsa bile kullanım karmaşıklaşır.

Dizi dönüşü genellikle iki değerli, sıralaması güçlü biçimde bilinen durumlarda uygundur. `useState` bunun klasik örneğidir. Nesne dönüşü ise birden çok anlamlı alan olduğunda daha okunabilirdir. KampüsHub gibi öğretici bir projede nesne dönüşü çoğu zaman tercih edilebilir:

```jsx
const {
  visibleModules,
  selectedArea,
  isEmpty,
  summaryText
} = useCampusModules(modules, filter);
```

Bu kullanımda her alanın adı, bileşen kodunda kendi açıklamasını taşır. Ayrıca ilerleyen bölümlerde yeni alanlar eklemek daha kolaydır. Örneğin `pinnedCount` veya `hasSearchQuery` gibi alanlar eklendiğinde, dizi sırası bozulmaz.

Özel Hook’larda durum modeli de açık olmalıdır. Özellikle asenkron işlemlerde yalnızca `data` ve `error` tutmak yetersiz kalabilir. Bir veri kaynağı henüz başlatılmamış, yükleniyor, başarıyla tamamlanmış veya hata almış olabilir. Bu nedenle `status` alanı çoğu zaman daha anlaşılır bir yapı sağlar:

- `idle`: işlem henüz başlatılmadı
- `loading`: işlem devam ediyor
- `success`: veri başarıyla alındı
- `error`: işlem hata ile sonuçlandı

Aşağıdaki örnek, asenkron kaynak durumunu saf JavaScript durum makinesi olarak modeller. Gerçek React özel Hook’u bu geçişleri `useState`, `useEffect` ve olay işleyicileri ile bağlayabilir.

<!-- CODE_META
id: react_ch09_code04
chapter_id: chapter_09
language: javascript
kind: example
title: "Asenkron kaynak durum modeli"
file: "react_ch09_code04_async_resource.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "status=success"
  - "count=3"
  - "error=none"
timeout_sec: 5
-->
```javascript
function createAsyncResourceState() {
  return {
    status: "idle",
    data: [],
    error: null
  };
}

function asyncResourceReducer(state, action) {
  switch (action.type) {
    case "start":
      return { status: "loading", data: [], error: null };
    case "success":
      return { status: "success", data: action.payload, error: null };
    case "error":
      return { status: "error", data: [], error: action.message };
    default:
      return state;
  }
}

let state = createAsyncResourceState();
state = asyncResourceReducer(state, { type: "start" });
state = asyncResourceReducer(state, {
  type: "success",
  payload: ["Duyuru", "Etkinlik", "Not Paylaşımı"]
});

console.log(`status=${state.status};count=${state.data.length};error=${state.error ?? "none"}`);
```

Bu çekirdek, ileride `useAsyncResource` adlı özel Hook’a dönüşebilir:

```jsx
function useAsyncResource(loader) {
  const [resource, setResource] = useState({
    status: "idle",
    data: [],
    error: null
  });

  useEffect(() => {
    let ignore = false;
    setResource({ status: "loading", data: [], error: null });

    loader()
      .then((data) => {
        if (!ignore) {
          setResource({ status: "success", data, error: null });
        }
      })
      .catch((error) => {
        if (!ignore) {
          setResource({ status: "error", data: [], error: error.message });
        }
      });

    return () => {
      ignore = true;
    };
  }, [loader]);

  return resource;
}
```

Bu örnek, Bölüm 7’de öğrenilen cleanup mantığını özel Hook içine taşır. Bileşen artık asenkron işlemin ayrıntısını bilmek zorunda kalmaz; yalnızca `status`, `data` ve `error` alanlarına göre ekran üretir.

Test edilebilirlik açısından en iyi strateji, özel Hook’un karmaşık karar mantığını saf fonksiyonlara ayırmaktır. React çalışma zamanı gerektiren kısım küçük kaldığında hem hata ayıklama kolaylaşır hem de kod üretim hattında otomatik doğrulama yapılabilir.

## 9.9 KampüsHub’da özel Hook tasarımı

KampüsHub projesinde özel Hook’lar, ana ekranın davranış mantığını düzenlemek için kullanılabilir. Bu bölümde üç ana Hook planlanacaktır:

1. `useCampusModules`: Modül listesi, arama metni, sabitlenmiş kartlar ve boş durum mesajını yönetir.
2. `useLocalPreference`: Tema, yoğunluk veya görünüm tercihini tarayıcıda saklar.
3. `useAnnouncementFilter`: Duyuru listesini kategori ve arama metnine göre hazırlar.

Bunlara ek olarak ilerleyen bölümlerde `useAsyncResource` benzeri bir yapı REST API entegrasyonuna hazırlık sağlayabilir. Ancak bu bölümde gerçek uzak sunucu çağrısı yapılmayacak; yalnızca durum modeli ve tasarım mantığı açıklanacaktır.

KampüsHub ana ekranında özel Hook’ların birlikte kullanımı şu şekilde düşünülebilir:

```jsx
function DashboardPage({ modules, announcements }) {
  const [theme, setTheme] = useLocalPreference("theme", "light");
  const [moduleQuery, setModuleQuery] = useState("");

  const moduleModel = useCampusModules(modules, {
    query: moduleQuery,
    onlyPinned: false
  });

  const announcementModel = useAnnouncementFilter(announcements, {
    query: moduleQuery,
    category: "all"
  });

  return (
    <main className={`dashboard dashboard--${theme}`}>
      <DashboardHeader theme={theme} onThemeChange={setTheme} />
      <ModuleSearch value={moduleQuery} onChange={setModuleQuery} />
      <ModuleGrid modules={moduleModel.visibleModules} />
      <AnnouncementsPanel model={announcementModel} />
    </main>
  );
}
```

Bu örnekte `DashboardPage` hâlâ sayfanın ana bileşenidir; ancak filtreleme ve tercih ayrıntılarını kendi içinde taşımamaktadır. Böylece JSX yapısı daha okunur hâle gelir. Özel Hook’lar, bileşenin “ne gösterdiğini” daha net bırakır; “bu veriyi nasıl hazırladığını” ise kendi içinde düzenler.

[SCREENSHOT:b09_01_usecampusmodules_dashboard]

```yaml
SCREENSHOT_META:
  - id: b09_01_usecampusmodules_dashboard
    chapter: chapter_09
    figure: "Şekil 9.1"
    title: "useCampusModules ile filtrelenen KampüsHub modül paneli"
    route: "/__book__/chapter-09/usecampusmodules-dashboard"
    waitFor: ".module-grid"
    actions:
      - "Arama kutusuna 'duyuru' yaz"
      - "Sabitlenmiş modüller filtresini aç"
    output: "assets/auto/chapter_09/b09_01_usecampusmodules_dashboard.png"
    caption: "KampüsHub ana ekranında özel Hook ile hazırlanan modül görünüm modeli."
    markdownTarget: "[SCREENSHOT:b09_01_usecampusmodules_dashboard]"
```

[SCREENSHOT:b09_02_usepreference_theme_panel]

```yaml
SCREENSHOT_META:
  - id: b09_02_usepreference_theme_panel
    chapter: chapter_09
    figure: "Şekil 9.2"
    title: "useLocalPreference ile tema tercihi paneli"
    route: "/__book__/chapter-09/usepreference-theme-panel"
    waitFor: ".preference-panel"
    actions:
      - "Tema seçimini dark değerine getir"
      - "Sayfayı yenile ve tercihin korunduğunu göster"
    output: "assets/auto/chapter_09/b09_02_usepreference_theme_panel.png"
    caption: "Tema tercihinin özel Hook aracılığıyla okunup güncellendiği arayüz durumu."
    markdownTarget: "[SCREENSHOT:b09_02_usepreference_theme_panel]"
```

[SCREENSHOT:b09_03_custom_hook_debug_flow]

```yaml
SCREENSHOT_META:
  - id: b09_03_custom_hook_debug_flow
    chapter: chapter_09
    figure: "Şekil 9.3"
    title: "Özel Hook hata ayıklama akışı"
    route: "/__book__/chapter-09/custom-hook-debug-flow"
    waitFor: ".debug-flow"
    actions:
      - "Duyuru filtresinde boş sonuç oluştur"
      - "Debug panelinde Hook çıktısını görüntüle"
    output: "assets/auto/chapter_09/b09_03_custom_hook_debug_flow.png"
    caption: "Özel Hook dönüş değerlerinin bileşen hata ayıklamasında görünür hâle getirilmesi."
    markdownTarget: "[SCREENSHOT:b09_03_custom_hook_debug_flow]"
```

Aşağıdaki test edilebilir örnek, birden fazla çekirdek mantığın birlikte kullanılmasıyla KampüsHub görünüm modeli üretir. Bu örnek, özel Hook kompozisyonunun React dışı çekirdek düzeyinde nasıl modellenebileceğini gösterir.

<!-- CODE_META
id: react_ch09_code05
chapter_id: chapter_09
language: javascript
kind: example
title: "Hook kompozisyonu ile KampüsHub görünüm modeli"
file: "react_ch09_code05_dashboard_model.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "visibleModules=2"
  - "theme=dark"
  - "hasPinned=true"
  - "announcementMessage=2 duyuru listeleniyor"
timeout_sec: 5
-->
```javascript
function buildModulesModel(modules, filter) {
  const visibleModules = modules.filter((module) => {
    const matchesArea = filter.area === "all" || module.area === filter.area;
    return matchesArea;
  });

  return {
    visibleModules,
    hasPinned: visibleModules.some((module) => module.pinned)
  };
}

function buildAnnouncementsModel(announcements, category) {
  const visible = announcements.filter((announcement) => {
    return category === "all" || announcement.category === category;
  });

  return {
    visible,
    message: `${visible.length} duyuru listeleniyor`
  };
}

function buildDashboardModel(input) {
  const moduleModel = buildModulesModel(input.modules, input.moduleFilter);
  const announcementModel = buildAnnouncementsModel(input.announcements, input.announcementCategory);

  return {
    theme: input.preferences.theme,
    visibleModules: moduleModel.visibleModules,
    hasPinned: moduleModel.hasPinned,
    announcementMessage: announcementModel.message
  };
}

const dashboard = buildDashboardModel({
  preferences: { theme: "dark" },
  moduleFilter: { area: "academic" },
  announcementCategory: "academic",
  modules: [
    { label: "Duyuru", area: "academic", pinned: true },
    { label: "Not Paylaşımı", area: "academic", pinned: false },
    { label: "Etkinlik", area: "social", pinned: true }
  ],
  announcements: [
    { title: "Final takvimi", category: "academic" },
    { title: "Danışmanlık saatleri", category: "academic" },
    { title: "Konser duyurusu", category: "social" }
  ]
});

console.log(
  `visibleModules=${dashboard.visibleModules.length};theme=${dashboard.theme};hasPinned=${dashboard.hasPinned};announcementMessage=${dashboard.announcementMessage}`
);
```

Bu örnek, özel Hook kompozisyonunu kavramsal düzeyde gösterir. Gerçek React kodunda `buildModulesModel` ve `buildAnnouncementsModel` fonksiyonları `useCampusModules` ve `useAnnouncementFilter` içinde kullanılabilir. `DashboardPage` ise bu iki Hook’un çıktısını birleştirerek kullanıcıya anlamlı bir ekran sunar.

## 9.10 Sık yapılan hatalar

Özel Hook yazarken yapılan hataların önemli bir kısmı, Hook kurallarını yalnızca yerleşik Hook’lar için geçerli sanmaktan kaynaklanır. Oysa `useState`, `useEffect` veya `useMemo` özel Hook içinde kullanıldığında da aynı kurallar geçerlidir. Hook’lar koşullu çağrılmamalı, döngü içinde çağrılmamalı ve her render’da aynı sırayı korumalıdır.

Yaygın hatalardan biri, özel Hook’u sıradan yardımcı fonksiyon gibi adlandırmaktır. Örneğin içinde `useState` kullanan bir fonksiyonun adı `createPreference` olursa React ekosistemi bu fonksiyonun Hook olduğunu anlayamaz. Doğru adlandırma `usePreference` veya daha bağlamsal olarak `useLocalPreference` olmalıdır. Bu yalnızca biçimsel bir tercih değildir; statik analiz, okunabilirlik ve ekip içi anlaşma açısından önemlidir.

İkinci hata, Hook içine çok fazla sorumluluk yüklemektir. `useDashboardEverything` gibi bir yapı kısa vadede cazip görünebilir; fakat zamanla bileşen karmaşasını tek bir büyük Hook dosyasına taşır. Daha iyi yaklaşım, `useCampusModules`, `useAnnouncementFilter`, `useLocalPreference` gibi küçük ve adlandırılmış Hook’lar üretmektir.

Üçüncü hata, Hook’un dönüş değerini belirsiz tasarlamaktır. Çok uzun diziler döndürmek, değerlerin sırasına bağımlı kodlar üretir. Öğrenci şu tür bir kullanımı gördüğünde dikkatli olmalıdır:

```jsx
const [a, b, c, d, e] = useDashboardData();
```

Bu yapı kısa vadede çalışsa bile anlamı açık değildir. Nesne dönüşü çoğu zaman daha güvenlidir:

```jsx
const {
  visibleModules,
  selectedModule,
  loading,
  error,
  refresh
} = useDashboardData();
```

Dördüncü hata, özel Hook içinde gizli yan etkiler oluşturmaktır. Bir Hook çağrılır çağrılmaz kullanıcı tercihini silmemeli, beklenmedik şekilde yönlendirme yapmamalı veya dış sistemlere belirsiz istekler göndermemelidir. Yan etkiler açık, izlenebilir ve gerekirse cleanup mantığıyla desteklenmiş olmalıdır.

Beşinci hata, özel Hook’u erken soyutlamaktır. Kod yalnızca bir yerde kullanılıyorsa ve hâlâ değişim yönü belirsizse, hemen genel amaçlı Hook yazmak gereksiz olabilir. Önce problemi iki veya üç kullanım bağlamında gözlemek, ardından ortak davranışı Hook’a çıkarmak daha sağlıklıdır.

Aşağıdaki test edilebilir örnek, özel Hook tasarımı için küçük bir kontrol listesi üretir. Bu tür kontrol listeleri laboratuvar teslimlerinde öğrencinin kendi kodunu değerlendirmesine yardımcı olabilir.

<!-- CODE_META
id: react_ch09_code06
chapter_id: chapter_09
language: javascript
kind: example
title: "Özel Hook tasarım kontrol listesi"
file: "react_ch09_code06_hook_checklist.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "score=4/4"
  - "ready=true"
  - "name=useCampusModules"
timeout_sec: 5
-->
```javascript
function evaluateHookDesign(candidate) {
  const checks = [
    candidate.name.startsWith("use"),
    candidate.hasSingleResponsibility,
    candidate.hasExplicitInputs,
    candidate.hasTestableCore
  ];

  const score = checks.filter(Boolean).length;
  return {
    score,
    total: checks.length,
    ready: score === checks.length
  };
}

const result = evaluateHookDesign({
  name: "useCampusModules",
  hasSingleResponsibility: true,
  hasExplicitInputs: true,
  hasTestableCore: true
});

console.log(`name=useCampusModules;score=${result.score}/${result.total};ready=${result.ready}`);
```

Bu kontrol listesi gerçek projedeki tüm kalite kriterlerini kapsamaz; ancak başlangıç düzeyinde güçlü bir sezgi verir. Bir özel Hook’un adı doğru olmalı, tek bir sorumluluğu bulunmalı, girdileri açık olmalı ve mümkün olduğunca test edilebilir çekirdeğe sahip olmalıdır.

## 9.11 Hata ayıklama egzersizi

Bu bölümün hata ayıklama egzersizinde öğrenciden özel Hook kurallarını ihlal eden ve dönüş değeri belirsiz olan bir kodu düzeltmesi istenir. Aşağıdaki hatalı örneği inceleyin:

```jsx
function getModulesIfNeeded(enabled, modules) {
  if (enabled) {
    const [query, setQuery] = useState("");
    const visibleModules = modules.filter((module) => module.label.includes(query));
    return [visibleModules, query, setQuery];
  }

  return [modules, "", () => {}];
}
```

Bu kodda birkaç problem vardır. Fonksiyon adı `use` ile başlamaz; ancak içinde `useState` kullanır. `useState` koşul içinde çağrılır. Dönüş değeri dizi biçimindedir ve alanların anlamı dışarıdan yeterince açık değildir. Ayrıca `includes` araması büyük/küçük harf duyarlılığı nedeniyle beklenmeyen sonuçlar üretebilir.

Daha doğru bir yaklaşım şöyle olabilir:

```jsx
function useCampusModules(modules, options) {
  const [query, setQuery] = useState(options.initialQuery ?? "");

  const visibleModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return modules.filter((module) => {
      return module.label.toLowerCase().includes(normalizedQuery);
    });
  }, [modules, query]);

  return {
    query,
    setQuery,
    visibleModules,
    isEmpty: visibleModules.length === 0
  };
}
```

Bu düzeltmede Hook adı `use` ile başlar, Hook çağrısı koşul dışında ve en üst düzeydedir, dönüş değeri açıklayıcı nesne biçimindedir ve filtreleme mantığı normalize edilmiştir. Öğrenciden bu örneği kendi KampüsHub koduna uyarlaması, ardından React DevTools ile state değişimini gözlemlemesi beklenir.

Hata ayıklama için önerilen adımlar şunlardır:

1. Hook adının `use` ile başlayıp başlamadığını kontrol edin.
2. Hook çağrılarının koşul, döngü veya iç fonksiyon içinde olup olmadığını inceleyin.
3. Hook’un hangi girdilere bağlı olduğunu yazın.
4. Dönüş değerindeki her alanın bileşen tarafından nasıl kullanıldığını belirleyin.
5. React’e bağlı olmayan karar mantığını saf fonksiyona ayırmayı deneyin.
6. Boş sonuç, hata durumu ve başlangıç durumu gibi uç durumları test edin.

Bu egzersizin amacı yalnızca çalışan kod yazmak değildir. Amaç, özel Hook tasarımında okunabilirlik, kural uyumu ve test edilebilirlik arasında denge kurmaktır.

## 9.12 Bölüm özeti ve terim sözlüğü

Bu bölümde özel Hook kavramı, React uygulamalarında davranış mantığını düzenlemenin temel araçlarından biri olarak ele alındı. Özel Hook’un bileşen olmadığı, fakat bileşenlerin kullandığı state, effect, ref, context veya memoization mantığını kapsülleyebildiği vurgulandı. `use` ön ekinin yalnızca adlandırma geleneği değil, React Hook kurallarının izlenebilirliği açısından önemli bir işaret olduğu açıklandı.

KampüsHub projesinde özel Hook’ların özellikle modül filtreleme, duyuru arama, tema tercihi ve asenkron veri durumu gibi tekrar eden davranışlarda yararlı olduğu gösterildi. Saf JavaScript çekirdekleri ile React’e bağlı Hook katmanını ayırmanın test edilebilirlik açısından önemli olduğu vurgulandı. CODE_META örnekleri, bu çekirdek mantıkların Node ortamında doğrulanabileceğini gösterdi.

Bölümün ana mesajı şudur: Özel Hook, karmaşık kodu gizlemek için değil, iyi tanımlanmış bir davranışı açık ve tekrar kullanılabilir bir API hâline getirmek için yazılmalıdır. İyi bir özel Hook küçük, adlandırması açık, girdileri belirgin, dönüş değeri okunabilir ve mümkün olduğunca test edilebilir olmalıdır.

Terim sözlüğü:

- **Özel Hook:** Adı `use` ile başlayan ve React Hook’larını kullanabilen tekrar kullanılabilir fonksiyon.
- **Hook kuralları:** Hook’ların en üst düzeyde ve her render’da aynı sırada çağrılması gerektiğini belirten kurallar.
- **Tek sorumluluk:** Bir fonksiyonun veya Hook’un tek bir davranış problemini çözmesi ilkesi.
- **Saf çekirdek:** React çalışma zamanına bağlı olmayan, girdi alıp çıktı üreten test edilebilir mantık parçası.
- **Dönüş değeri tasarımı:** Hook’un bileşenlere hangi veri ve fonksiyonları nasıl sunacağını belirleme süreci.
- **Hook kompozisyonu:** Birden fazla Hook veya çekirdek mantığın daha büyük bir davranış modeli oluşturmak için birlikte kullanılması.
- **Yan etki:** Render çıktısı dışında gerçekleşen veri alma, saklama, zamanlayıcı veya dış sistem etkileşimi.
- **Boş durum:** Filtreleme veya arama sonucunda gösterilecek veri bulunmadığında kullanıcıya sunulan özel arayüz durumu.

## 9.13 Kavramsal sorular

1. Özel Hook ile sıradan yardımcı fonksiyon arasındaki temel fark nedir?
2. Bir fonksiyon içinde `useState` kullanılıyorsa bu fonksiyonun adının neden `use` ile başlaması gerekir?
3. Özel Hook içinde Hook çağrılarının koşul altında yapılması neden hatalıdır?
4. `useCampusModules` gibi bir Hook’un nesne döndürmesi hangi durumlarda dizi döndürmesinden daha okunabilir olabilir?
5. Bileşen içinde tekrar eden filtreleme mantığını özel Hook’a taşımadan önce hangi sorular sorulmalıdır?
6. Saf çekirdek fonksiyon ile React özel Hook katmanı arasındaki ayrım test edilebilirliği nasıl etkiler?
7. `useLocalPreference` Hook’u hangi yan etkilere sahip olabilir ve bu yan etkiler nasıl kontrol edilebilir?
8. Aşırı genelleştirilmiş bir özel Hook’un bakım açısından doğurabileceği sorunlar nelerdir?
9. KampüsHub’da duyuru filtreleme mantığı hangi bileşenlerde tekrar edebilir?
10. Özel Hook tasarımında boş sonuç, hata durumu ve yüklenme durumu neden ayrı ayrı düşünülmelidir?

## 9.14 Programlama alıştırmaları

1. KampüsHub modüllerini `area`, `query` ve `onlyPinned` alanlarına göre filtreleyen saf bir `buildModulesModel` fonksiyonu yazın. Fonksiyon `visibleModules`, `visibleCount` ve `isEmpty` alanlarını döndürmelidir.
2. Bir tema tercihini bellek tabanlı saklama nesnesinde tutan `createPreferenceStore` fonksiyonunu genişletin. Varsayılan değer, güncelleme ve tüm anahtarları listeleme işlevlerini ekleyin.
3. `useAnnouncementFilter` için önce saf bir `buildAnnouncementFilterModel` fonksiyonu yazın. Ardından bu fonksiyonun `useMemo` içinde nasıl kullanılacağını gösteren kısa React kodu üretin.
4. `idle`, `loading`, `success`, `error` durumlarını destekleyen bir asenkron kaynak reducer yapısı geliştirin. Hata durumunda önceki verinin korunup korunmaması gerektiğini tartışın.
5. Aşağıdaki dönüş değerlerinden hangisinin daha okunabilir olduğunu değerlendirin ve gerekçenizi yazın:

```jsx
const [items, count, empty, refresh] = useDashboardData();
```

```jsx
const { items, count, isEmpty, refresh } = useDashboardData();
```

6. `useCampusModules` Hook’u için en az üç uç durum belirleyin: boş liste, eşleşmeyen arama metni ve yalnızca sabitlenmiş modüller gibi.
7. Bileşen içinde yer alan bir filtreleme kodunu özel Hook’a dönüştürürken uygulanacak refaktör adımlarını maddeler hâlinde yazın.
8. KampüsHub için `useUserSummary` adlı bir özel Hook tasarlayın. Bu Hook’un hangi girdileri alacağını ve hangi çıktıları döndüreceğini belirtin.

## 9.15 Haftalık laboratuvar

Bu haftaki laboratuvar görevi, KampüsHub ana ekranında özel Hook tabanlı bir düzenleme yapmaktır. Öğrenci aşağıdaki üç özel Hook’u tasarlamalı ve küçük bir `DashboardPage` bileşeninde kullanmalıdır:

1. `useCampusModules(modules, filter)`: Modül listesini arama metni, alan ve sabitlenmiş durumuna göre hazırlar.
2. `useLocalPreference(key, initialValue)`: Tema veya görünüm yoğunluğu tercihini saklar.
3. `useAnnouncementFilter(announcements, filter)`: Duyuruları kategori ve arama metnine göre listeler.

Laboratuvar tesliminde aşağıdaki unsurlar bulunmalıdır:

- En az üç özel Hook dosyası
- Her Hook için kısa kullanım örneği
- En az bir saf çekirdek fonksiyon ve küçük bir Node testi
- KampüsHub ana ekranında Hook çıktılarının kullanıldığı JSX parçası
- `b09_01`, `b09_02` ve `b09_03` screenshot marker’larına karşılık gelen ekran durumları
- Kısa bir teknik not: “Hangi mantığı bileşenden Hook’a taşıdım ve neden?”

Önerilen klasör yapısı:

```text
src/
  hooks/
    useCampusModules.js
    useLocalPreference.js
    useAnnouncementFilter.js
  utils/
    campusModuleModel.js
    announcementFilterModel.js
  components/
    DashboardPage.jsx
    ModuleGrid.jsx
    AnnouncementsPanel.jsx
```

Değerlendirme ölçütleri:

- Hook adları `use` ile başlamalıdır.
- Hook çağrıları koşul veya döngü içinde olmamalıdır.
- Dönüş değerleri açık ve bileşen tarafından kolay okunabilir olmalıdır.
- React’e bağlı olmayan mantığın en az bir bölümü saf fonksiyona ayrılmalıdır.
- Boş sonuç ve başlangıç durumu kullanıcıya anlaşılır biçimde gösterilmelidir.
- Kodlar KampüsHub’un önceki bölüm yapısıyla uyumlu olmalıdır.

## 9.16 İleri okuma ve bir sonraki bölüme geçiş

Bu bölümde özel Hook’lar aracılığıyla bileşen mantığını daha düzenli, tekrar kullanılabilir ve test edilebilir hâle getirmeyi öğrendiniz. Bu bilgi, React uygulamalarında büyüme eşiğini yönetmek açısından önemlidir. Küçük örneklerde özel Hook yazmak her zaman gerekli olmayabilir; ancak bir proje büyüdükçe ortak davranışların açık API’lere dönüştürülmesi bakım maliyetini azaltır.

İleri okuma için şu konular önerilir:

- React resmi dokümantasyonunda “Reusing Logic with Custom Hooks” başlığı
- Hook kuralları ve lint denetimleri
- Saf fonksiyonlarla test edilebilir React mantığı tasarlama
- UI bileşeni ve davranış Hook’u ayrımı
- Küçük Hook’ların proje klasör yapısında düzenlenmesi

Bir sonraki bölüme geçişte odak React Router ile sayfa yönetimi olacaktır. Şu ana kadar KampüsHub daha çok tek sayfalı bir ana ekran gibi düşünülmüştü. Bölüm 10’da bu ekran duyurular, etkinlikler, not paylaşımı ve profil gibi ayrı sayfa görünümlerine ayrılacaktır. Bu bölümde tasarlanan özel Hook’lar, sayfalar arasında tekrar eden mantığı taşımak için güçlü bir zemin sağlayacaktır.
