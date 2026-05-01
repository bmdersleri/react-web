---
title: "Bölüm 5 Girdi Promptu: Props — Bileşenler Arası Veri Akışı"
chapter_id: "chapter_05"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
output_target: "workspace/react/chapters/chapter_05_props_veri_akisi.md"
---

# Bölüm 5 Girdi Promptu: Props — Bileşenler Arası Veri Akışı

## Bölüm kimliği

- Bölüm ID: `chapter_05`
- Bölüm no: `5`
- Dosya adı: `chapter_05_props_veri_akisi.md`
- Hedef yol: `workspace/react/chapters/chapter_05_props_veri_akisi.md`
- Kitap: `React ile Web Uygulama Geliştirme`
- Ana proje: `KampüsHub`

## Bölüm başlığı

```text
Bölüm 5: Props — Bileşenler Arası Veri Akışı
```

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 4’te kurulan JSX ve bileşen anatomisi bilgisini doğrudan genişletir. Bölüm 4’te `ModuleCard` gibi bileşenler statik içerikle tanımlanmıştı. Bölüm 5’te aynı bileşenlerin dışarıdan veri alarak farklı durumları gösterebilmesi sağlanacaktır. Bu bölüm, Bölüm 6’daki `state` konusuna hazırlık niteliğindedir.

## Ön koşullar

Öğrenci aşağıdaki konuları başlangıç düzeyinde bilmelidir:

- Modern web, SPA, React, bileşen, Node.js, npm ve Vite geliştirme akışı
- `npm create vite@latest`, `npm install`, `npm run dev`, HMR, React DevTools, `package.json`, `index.html`, `main.jsx`, `App.jsx`
- Modern JavaScript: `const`, `let`, arrow function, object, array, destructuring, template literal, `map`
- HTML/CSS ve JSX temel farkları
- Fonksiyon bileşeni, `className`, fragment, tek kök yapı ve JSX ifade kullanımı

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. `props` kavramını bileşenler arası tek yönlü veri akışı bağlamında açıklar.
2. Parent ve child bileşen rollerini ayırt eder.
3. Bir bileşene string, number, boolean, array, object ve function türünde prop aktarır.
4. Destructuring ile prop okuma biçimini uygular.
5. Varsayılan prop değeri ve güvenli veri okuma ihtiyacını açıklar.
6. Liste verisini `map` ile bileşenlere dağıtır.
7. `key` kullanımının liste render mantığındaki rolünü açıklar.
8. KampüsHub `ModuleCard` bileşenini yeniden kullanılabilir hâle getirir.
9. `props` ile `state` arasındaki ayrımı Bölüm 6’ya geçiş düzeyinde kurar.

## Ana kavramlar

- `props`
- Parent bileşen
- Child bileşen
- Tek yönlü veri akışı
- Prop destructuring
- Default value
- Prop drilling başlangıç sezgisi
- Liste render etme
- `key`
- Bileşen sözleşmesi
- Yeniden kullanılabilir bileşen

## KampüsHub bağlantısı

Bu bölümde KampüsHub ana ekranındaki statik modül kartları veriyle beslenen bileşenlere dönüştürülecektir. `ModuleCard`, `NotificationSummary`, `EventSummary`, `ProfileBadge` ve `SectionTitle` gibi bileşenler dışarıdan veri alarak farklı içerikleri gösterecektir. Henüz kullanıcı etkileşimi ve değişen veri yönetimi yapılmayacaktır; bu rol Bölüm 6’daki `state` konusuna bırakılacaktır.

## Kullanılacak teknik kapsam

Bölüm içinde şu konular işlenmelidir:

- `props` tanımı ve kullanım gerekçesi
- Parent-to-child veri aktarımı
- JSX içinde prop verme biçimleri
- String prop ve `{}` ile JavaScript değeri aktarma farkı
- Destructuring ile prop okuma
- Varsayılan değer verme
- Boolean prop
- Object ve array prop
- Function prop kavramına hazırlık düzeyi
- `map` ile listeyi bileşenlere dönüştürme
- `key` kullanımı
- KampüsHub modül kartlarının veri tabanlı oluşturulması

## Kapsam dışı konular

Ana akışta şu konulara girilmemelidir:

- `useState`
- `useEffect`
- React Router
- Context API
- Redux Toolkit
- Zustand
- TanStack Query
- Backend API entegrasyonu
- Kimlik doğrulama
- Veritabanı bağlantısı
- Test kütüphaneleriyle ayrıntılı test yazımı

Bu konular yalnızca ilerleyen bölümlere köprü kurmak için çok kısa anılabilir.

## Kod örneği politikası

- Çalıştırılabilir kodlar saf JavaScript olmalı ve Node.js üzerinde test edilebilmelidir.
- JSX örnekleri öğretici amaçla verilebilir; ancak mevcut test hattı JSX’i doğrudan derlemeyecekse `CODE_META` ile işaretlenmemelidir.
- Kod örnekleri kısa, okunabilir ve KampüsHub bağlamına bağlı olmalıdır.
- Değişken adları `camelCase`, bileşen adları `PascalCase` olmalıdır.
- Kod blokları içinde `// CODE_META` yazılmamalıdır.

## CODE_META gereksinimleri

Bölümde en az 5 test edilebilir `CODE_META` örneği bulunmalıdır:

1. `react_ch05_code01`: prop benzeri nesneden kart metni üretme
2. `react_ch05_code02`: destructuring ve varsayılan değerler
3. `react_ch05_code03`: dizi verisini `map` ile kart listesine dönüştürme
4. `react_ch05_code04`: parent-child veri akışını saf fonksiyonlarla modelleme
5. `react_ch05_code05`: basit prop sözleşmesi doğrulama

Her `CODE_META` bloğu şu alanları içermelidir:

```yaml
id:
chapter_id: chapter_05
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
[SCREENSHOT:b05_01_props_veri_akisi]
[SCREENSHOT:b05_02_kampushub_modul_kartlari_props]
[SCREENSHOT:b05_03_liste_render_key]
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
/__book__/chapter-05/props-veri-akisi
/__book__/chapter-05/kampushub-modul-kartlari-props
/__book__/chapter-05/liste-render-key
```

## Pedagojik akış

Bölüm şu akışla yazılmalıdır:

1. Statik bileşen probleminin tanıtılması
2. `props` ihtiyacının KampüsHub üzerinden gerekçelendirilmesi
3. Parent-child veri akışı modeli
4. JSX içinde prop verme biçimleri
5. Destructuring ve varsayılan değerler
6. Liste render etme ve `key`
7. KampüsHub modül kartlarının veriyle beslenmesi
8. Hata ayıklama ve yanlış sezgiler
9. Alıştırmalar ve laboratuvar görevi
10. Bölüm 6’daki `state` konusuna köprü

## Mini alıştırmalar

- `ModuleCard` bileşenine `title`, `description`, `status`, `count` prop’ları eklet.
- `SectionTitle` bileşenine `title` ve `subtitle` prop’ları verdir.
- Duyuru listesini `map` ile render ettir.
- Eksik prop durumunda varsayılan metin gösterdir.
- Hatalı `key` kullanımını tartıştır.

## Laboratuvar görevi

Öğrenci KampüsHub ana ekranında aşağıdaki bileşenleri oluşturmalıdır:

- `Header`
- `SectionTitle`
- `ModuleCard`
- `ModuleGrid`
- `ProfileBadge`

Teslimde `App.jsx`, ilgili bileşen dosyaları, ekran görüntüsü ve kısa karar gerekçesi istenmelidir.

## Kalite kontrol ölçütleri

Tam metinde aşağıdaki ölçütler sağlanmalıdır:

- YAML front matter bulunmalı.
- Dosyada yalnızca bir H1 olmalı.
- H1 `Bölüm 5:` ile başlamalı.
- Başlık hiyerarşisi tutarlı olmalı.
- `CODE_META` blokları kod bloklarından önce HTML yorum bloğu olarak yer almalı.
- Kod bloğu içinde `// CODE_META` bulunmamalı.
- En az 5 çalıştırılabilir JavaScript örneği bulunmalı.
- En az 3 screenshot marker bulunmalı.
- Markdown Pandoc uyumlu olmalı.
- Bölüm sonunda kavramsal sorular, programlama alıştırmaları, haftalık laboratuvar ve ileri okuma bulunmalı.

## Tam metin üretim talimatı

Bu girdi promptuna dayanarak `workspace/react/chapters/chapter_05_props_veri_akisi.md` dosyasını üret. Metin akademik ama sade Türkçe ile yazılsın. Gereksiz ileri kavram yüklemesi yapılmasın. KampüsHub projesi üzerinden kümülatif ilerleme korunmalı. Bölüm, öğrenciyi Bölüm 6’daki `state` konusuna doğal biçimde hazırlamalıdır.
