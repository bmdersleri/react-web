---
title: "Bölüm 6 Girdi Promptu: State — Değişen Verinin Yönetimi"
chapter_id: "chapter_06"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
output_target: "workspace/react/chapters/chapter_06_state_yonetimi.md"
---

# Bölüm 6 Girdi Promptu: State — Değişen Verinin Yönetimi

## Bölüm kimliği

- Bölüm ID: `chapter_06`
- Bölüm no: `6`
- Dosya adı: `chapter_06_state_yonetimi.md`
- Hedef yol: `workspace/react/chapters/chapter_06_state_yonetimi.md`
- Kitap: `React ile Web Uygulama Geliştirme`
- Ana proje: `KampüsHub`

## Bölüm başlığı

```text
Bölüm 6: State — Değişen Verinin Yönetimi
```

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 5’te ele alınan `props` ve tek yönlü veri akışı bilgisini değişen veri yönetimiyle tamamlar. Bölüm 5’te bileşenlerin dışarıdan gelen veriyi aldığı gösterilmişti. Bölüm 6’da ise bir bileşenin zaman içinde değişen kendi verisini `state` ile nasıl yönettiği ele alınacaktır. Bu bölüm, Bölüm 7’deki `useEffect` ve yan etkiler konusuna geçiş için zorunlu temel oluşturur.

## Ön koşullar

Öğrenci aşağıdaki konuları başlangıç düzeyinde bilmelidir:

- Modern web, SPA, React, bileşen, Node.js, npm ve Vite geliştirme akışı
- `npm create vite@latest`, `npm install`, `npm run dev`, HMR, React DevTools, `package.json`, `index.html`, `main.jsx`, `App.jsx`
- Modern JavaScript: `const`, `let`, arrow function, object, array, destructuring, template literal, `map`, spread syntax
- HTML/CSS ve JSX temel farkları
- Fonksiyon bileşeni, `className`, fragment, tek kök yapı ve JSX ifade kullanımı
- `props`, parent-child veri akışı, liste render etme ve `key`

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. React’te `state` kavramını değişen arayüz verisi bağlamında açıklar.
2. `props` ile `state` arasındaki temel farkı örnek üzerinden ayırt eder.
3. `useState` Hook’unu kullanarak başlangıç değeri ve güncelleme fonksiyonu tanımlar.
4. Kullanıcı olaylarıyla state güncellemesi arasındaki ilişkiyi açıklar.
5. Sayaç, seçim, filtreleme ve görünürlük gibi basit UI durumlarını yönetir.
6. State güncellemelerinde doğrudan mutasyon yerine immutable yaklaşımı uygular.
7. Dizi ve nesne state güncellemelerinde spread syntax kullanımını açıklar.
8. Güncelleme önceki state değerine bağlıysa fonksiyonel güncelleme biçimini kullanır.
9. KampüsHub modüllerinde seçili modül, okunmamış duyuru ve favori etkinlik gibi yerel durumları yönetir.
10. State’in ne zaman parent bileşene taşınması gerektiğini başlangıç düzeyinde tartışır.

## Ana kavramlar

- `state`
- `useState`
- Hook
- Başlangıç state değeri
- State setter fonksiyonu
- Event handler
- Re-render
- Immutable update
- Functional update
- Local state
- Derived value
- Controlled input başlangıcı
- State lifting hazırlığı

## KampüsHub bağlantısı

Bu bölümde KampüsHub arayüzü ilk kez kullanıcı etkileşimine yanıt verecektir. Öğrenci statik modül kartları ve props ile beslenen arayüzden, değişen durumlara sahip etkileşimli arayüze geçecektir. Örnek senaryolar şunlardır:

- Seçili modül kartının vurgulanması
- Duyuruların okunmuş/okunmamış durumunun yönetilmesi
- Etkinlik favoriye alma durumunun değiştirilmesi
- Profil panelinin açılıp kapatılması
- Arama kutusu veya filtre metniyle modül listesinin süzülmesi

## Kullanılacak teknik kapsam

Bölüm içinde şu konular işlenmelidir:

- State ihtiyacının arayüz problemi üzerinden tanımlanması
- `props` ve `state` ayrımı
- `useState` import etme
- Başlangıç değeri verme
- Setter fonksiyonu ile güncelleme
- Event handler yazma
- `onClick` ve `onChange` temel kullanımı
- Boolean, number, string, object ve array state
- Immutable update yaklaşımı
- Fonksiyonel state güncellemesi
- Liste elemanını güncelleme ve filtreleme
- KampüsHub içinde yerel state tasarımı

## Kapsam dışı konular

Ana akışta şu konulara girilmemelidir:

- `useEffect`
- React Router
- Context API
- Redux Toolkit
- Zustand
- TanStack Query
- Backend API entegrasyonu
- Veritabanı bağlantısı
- Kimlik doğrulama
- Test kütüphaneleriyle ayrıntılı test yazımı
- Performans optimizasyonu ve memoization

Bu konular yalnızca ilerleyen bölümlere köprü kurmak için kısa şekilde anılabilir.

## Kod örneği politikası

- Çalıştırılabilir kodlar saf JavaScript olmalı ve Node.js üzerinde test edilebilmelidir.
- JSX örnekleri öğretici amaçla verilebilir; ancak mevcut test hattı JSX’i doğrudan derlemeyecekse `CODE_META` ile işaretlenmemelidir.
- State mantığını göstermek için saf fonksiyonlar, immutable güncelleme yardımcıları ve küçük veri dönüşümleri kullanılmalıdır.
- Kod örnekleri kısa, okunabilir ve KampüsHub bağlamına bağlı olmalıdır.
- Değişken adları `camelCase`, bileşen adları `PascalCase` olmalıdır.
- Kod blokları içinde `// CODE_META` yazılmamalıdır.

## CODE_META gereksinimleri

Bölümde en az 5 test edilebilir `CODE_META` örneği bulunmalıdır:

1. `react_ch06_code01`: başlangıç dashboard state’i ve özet üretimi
2. `react_ch06_code02`: selectedModule değerini immutable mantıkla değiştirme
3. `react_ch06_code03`: okunmamış duyuru sayısını fonksiyonel güncelleme mantığıyla azaltma
4. `react_ch06_code04`: etkinlik favori durumunu dizi içinde immutable güncelleme
5. `react_ch06_code05`: filtre metnine göre modül listesini türetme

Her `CODE_META` bloğu şu alanları içermelidir:

```yaml
id:
chapter_id: chapter_06
language: javascript
kind: example
file:
extract: true
test: compile_run_assert
expected_stdout_contains:
timeout_sec: 5
github: true
qr: dual
```

## Screenshot planı

Bölümde en az 3 screenshot marker bulunmalıdır:

```text
[SCREENSHOT:b06_01_state_sayac_ve_secim]
[SCREENSHOT:b06_02_kampushub_state_modul_secimi]
[SCREENSHOT:b06_03_duyuru_favori_filtre]
```

Her screenshot için `SCREENSHOT_META` kullanılmalı ve şu alanlar bulunmalıdır:

- `id`
- `chapter_id`
- `title_key`
- `route`
- `waitFor`
- `actions`
- `output`
- `manual_path`
- `final_path`
- `manual_override`

Önerilen route’lar:

```text
/__book__/chapter-06/state-sayac-ve-secim
/__book__/chapter-06/kampushub-state-modul-secimi
/__book__/chapter-06/duyuru-favori-filtre
```

## Pedagojik akış

Bölüm şu akışla yazılmalıdır:

1. Props ile gösterilen verinin neden yeterli olmadığının tanıtılması
2. State ihtiyacının KampüsHub senaryolarıyla gerekçelendirilmesi
3. `props` ve `state` farkının tablo veya karşılaştırmalı açıklamayla verilmesi
4. `useState` temel sözdizimi
5. Event handler ve re-render ilişkisi
6. Boolean, number ve string state örnekleri
7. Nesne ve dizi state güncellemelerinde immutable yaklaşım
8. Fonksiyonel güncelleme ihtiyacı
9. KampüsHub modül seçimi, duyuru okuma, favori etkinlik ve filtre örnekleri
10. Sık hatalar, hata ayıklama egzersizi ve laboratuvar görevi
11. Bölüm 7’deki `useEffect` konusuna köprü

## Mini alıştırmalar

- `selectedModule` state’i ile seçilen kartı vurgulat.
- `unreadCount` state’i ile duyuru sayısını azaltan bir buton yazdır.
- `isProfileOpen` state’i ile profil panelini açıp kapattır.
- `favoriteEvents` benzeri bir dizi state’inde favori durumunu değiştir.
- `searchText` state’i ile modül listesini filtrelet.

## Laboratuvar görevi

Öğrenci KampüsHub ana ekranında aşağıdaki state tabanlı etkileşimleri gerçekleştirmelidir:

- Modül kartına tıklandığında seçili kartın görünümünün değişmesi
- Duyuru kartındaki okunmamış sayacın kullanıcı etkileşimiyle azalması
- Etkinliğin favoriye eklenip çıkarılması
- Profil panelinin açılıp kapatılması
- Arama metnine göre modül kartlarının filtrelenmesi

Teslimde `App.jsx`, ilgili bileşen dosyaları, ekran görüntüsü ve kısa karar gerekçesi istenmelidir.

## Kalite kontrol ölçütleri

Tam metinde aşağıdaki ölçütler sağlanmalıdır:

- YAML front matter bulunmalı.
- Dosyada yalnızca bir H1 olmalı.
- H1 `Bölüm 6:` ile başlamalı.
- Başlık hiyerarşisi tutarlı olmalı.
- `CODE_META` blokları kod bloklarından önce HTML yorum bloğu olarak yer almalı.
- Kod bloğu içinde `// CODE_META` bulunmamalı.
- En az 5 çalıştırılabilir JavaScript örneği bulunmalı.
- En az 3 screenshot marker bulunmalı.
- Markdown Pandoc uyumlu olmalı.
- Bölüm 1’den gelen temel proje kavramları kısaca korunmalı: modern web, SPA, React, bileşen, Node.js, npm, Vite, HMR, React DevTools, `package.json`, `index.html`, `main.jsx`, `App.jsx`, KampüsHub.

## Tam metin üretim talimatı

Tam metni akademik ama sade Türkçe ile üret. Bölüm; öğrenme çıktıları, kavramsal açıklama, KampüsHub senaryosu, test edilebilir kod örnekleri, programatik ekran çıktısı planı, hata ayıklama, alıştırmalar, haftalık laboratuvar ve sonraki bölüme köprü içermelidir. Gereksiz ileri konu yüklemesi yapma; `state` konusunu yerel UI durumu ve temel `useState` kullanımıyla sınırlandır.
