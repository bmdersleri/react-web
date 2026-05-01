---
title: "Bölüm 7 Girdi Promptu: useEffect ve Yan Etkiler"
chapter_id: "chapter_07"
book_title: "React ile Web Uygulama Geliştirme"
main_project: "KampüsHub"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
status: "chapter_input_prompt"
---

# Bölüm 7 Girdi Promptu: useEffect ve Yan Etkiler

## Bölüm kimliği

- **Bölüm ID:** `chapter_07`
- **Bölüm no:** `7`
- **Bölüm başlığı:** `Bölüm 7: useEffect ve Yan Etkiler`
- **Hedef dosya:** `workspace/react/chapters/chapter_07_useeffect_yan_etkiler.md`
- **Kitap:** `React ile Web Uygulama Geliştirme`
- **Ana proje:** `KampüsHub`

## Bölümün kitap içindeki yeri

Bu bölüm, önceki bölümde öğrenilen `state` ve `useState` bilgisinin üzerine kurulur. Öğrenci artık kullanıcı etkileşimiyle değişen veriyi bileşen içinde yönetebilmektedir. Bölüm 7’de bu değişen verinin dış dünya ile ilişkisi ele alınacaktır. Dış dünya kavramı; tarayıcı başlığı, zamanlayıcı, olay dinleyici, ağ isteği benzetimi, yerel depolama ve bileşenin ekrana bağlanma/ekrandan ayrılma süreçlerini kapsar.

Bölüm 7, ilerideki özel hook, React Router, REST API entegrasyonu ve global state bölümleri için kritik bir hazırlık bölümüdür. Bu bölümde amaç `useEffect` kullanımını ezberletmek değil; render işlemi ile yan etki arasındaki sınırı doğru kurdurmaktır.

## Ön koşullar

Öğrencinin aşağıdaki konuları bilmesi beklenir:

- Vite tabanlı React projesi oluşturma ve `npm run dev` ile çalıştırma.
- `App.jsx`, `main.jsx`, `index.html`, `package.json` ve `src` klasörünün görevleri.
- JSX, `className`, JavaScript ifadeleri ve fonksiyon bileşeni.
- Props ile bileşenler arası veri aktarımı.
- `useState` ile yerel state yönetimi.
- JavaScript dizileri, nesneleri, arrow function, destructuring ve `map` / `filter` gibi temel ES6+ kullanımları.

## Öğrenme çıktıları

Bölüm sonunda öğrenci:

1. Yan etki kavramını React render sürecinden ayırır.
2. `useEffect` Hook’unun temel sözdizimini açıklar.
3. Bağımlılık dizisi verilmediğinde, boş verildiğinde ve değerlerle verildiğinde davranış farkını yorumlar.
4. Component mount, update ve unmount kavramlarını başlangıç düzeyinde ilişkilendirir.
5. `useEffect` içinde temizlik fonksiyonunun neden gerekli olduğunu açıklar.
6. Zamanlayıcı ve event listener gibi kaynakları cleanup ile güvenli biçimde sonlandırır.
7. Asenkron veri getirme mantığını `useEffect` içinde güvenli bir örüntüyle kurgular.
8. KampüsHub’da duyuru yükleme, belge başlığı güncelleme, filtre kalıcılığı ve canlı sayaç gibi yan etkileri planlar.
9. Sonsuz render döngüsü, eksik bağımlılık ve cleanup unutma gibi yaygın hataları tanır.
10. React StrictMode geliştirme davranışını başlangıç düzeyinde yorumlar.

## Ana kavramlar

- `useEffect`
- Yan etki / side effect
- Render safiyeti
- Dependency array / bağımlılık dizisi
- Mount, update, unmount
- Cleanup function
- Timer / interval
- Event listener
- Async effect pattern
- Fake API / mock data
- Local storage benzetimi
- StrictMode geliştirme davranışı

## KampüsHub bağlantısı

Bu bölümde KampüsHub uygulaması statik ve etkileşimli bileşenlerin ötesine geçer. Aşağıdaki davranışlar bölümün örnek senaryoları olarak ele alınmalıdır:

- Sayfa başlığını seçili KampüsHub modülüne göre güncelleme.
- Duyuru listesini sahte bir servis fonksiyonundan yükleme.
- Etkinlik geri sayımı veya canlı sayaç için zamanlayıcı kullanma.
- Arama/filtre tercihini tarayıcı depolamasına yazma ve geri okuma.
- Bileşen ekrandan ayrıldığında zamanlayıcı veya aboneliği temizleme.

## Kullanılacak teknik kapsam

Bölümde işlenecek konular:

- `import { useEffect, useState } from "react";`
- Temel `useEffect(() => { ... });` kullanımı.
- Boş bağımlılık dizisi: `useEffect(() => { ... }, []);`
- Değere bağlı etki: `useEffect(() => { ... }, [selectedModuleId]);`
- Cleanup: `return () => { ... };`
- Asenkron veri getirme için effect içinde iç fonksiyon tanımlama.
- `document.title` gibi tarayıcı yan etkileri.
- `setInterval` / `clearInterval` örüntüsü.
- `localStorage` mantığının kavramsal kullanımı.
- StrictMode nedeniyle geliştirme ortamında effect’in iki kez çalışabilmesi.

## Kapsam dışı konular

Bu bölümde ana akışa alınmayacak konular:

- React Router ayrıntıları
- Global state yönetimi
- Redux Toolkit
- Zustand
- TanStack Query
- Gerçek REST API mimarisi
- Kimlik doğrulama
- Backend, veritabanı ve dağıtım
- Server-side rendering
- Class component yaşam döngüsü ayrıntıları

Bu konular yalnızca ilerleyen bölümlere köprü kurmak amacıyla kısa not olarak anılabilir.

## Kod örneği politikası

Kod örnekleri kısa, öğretici ve test edilebilir olmalıdır. React bileşeni içeren JSX parçaları pedagojik amaçla verilebilir; ancak otomatik test hattında güvenilir çalışması istenen örnekler saf JavaScript olarak hazırlanmalıdır. Böylece `node --check` ve `node` çalıştırmasıyla doğrulama yapılabilir.

Kodlarda İngilizce değişken/fonksiyon adları kullanılmalıdır. Açıklamalar Türkçe olabilir. React bileşen adları PascalCase, JavaScript fonksiyon ve değişkenleri camelCase olmalıdır.

## CODE_META gereksinimleri

Her çalıştırılabilir kod bloğundan önce HTML yorum bloğu biçiminde `CODE_META` bulunmalıdır. `// CODE_META` biçimi kullanılmamalıdır.

Bölüm 7’de en az 5 test edilebilir `CODE_META` örneği önerilir:

1. `react_ch07_code01`: Yan etki adaylarını sınıflandıran saf JavaScript örneği.
2. `react_ch07_code02`: Sahte duyuru servisiyle asenkron yükleme simülasyonu.
3. `react_ch07_code03`: Bağımlılık dizisi karşılaştırmasını açıklayan örnek.
4. `react_ch07_code04`: Abonelik/zamanlayıcı cleanup mantığını gösteren örnek.
5. `react_ch07_code05`: Arayüz tercihlerini sahte depolama alanına yazıp okuma örneği.

Örnek metadata biçimi:

```markdown
<!-- CODE_META
id: react_ch07_code01
chapter_id: chapter_07
language: javascript
kind: example
title_key: "effect_candidates"
file: "effect_candidates.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "effect"
timeout_sec: 5
github: true
qr: dual
-->
```

## Screenshot planı

Bölüm 7’de en az 3 screenshot marker kullanılmalıdır:

- `[SCREENSHOT:b07_01_document_title_effect]`
- `[SCREENSHOT:b07_02_announcement_loading_effect]`
- `[SCREENSHOT:b07_03_cleanup_timer_effect]`

Her screenshot için `SCREENSHOT_META` mantığı metin içinde korunmalıdır. Route önerileri:

- `/__book__/chapter-07/document-title-effect`
- `/__book__/chapter-07/announcement-loading-effect`
- `/__book__/chapter-07/cleanup-timer-effect`

## Pedagojik akış

Önerilen akış:

1. State sonrası yeni problem: değişen veri dış dünya ile nasıl ilişkilendirilir?
2. Render’ın saf olması gerektiği fikri.
3. Yan etki kavramı.
4. `useEffect` temel sözdizimi.
5. Bağımlılık dizisi davranışları.
6. KampüsHub’da sayfa başlığı güncelleme.
7. Sahte duyuru servisiyle veri yükleme.
8. Cleanup fonksiyonu.
9. Zamanlayıcı ve event listener örüntüleri.
10. Yaygın hatalar, hata ayıklama ve laboratuvar görevi.

## Mini alıştırmalar

- Seçili modül değiştiğinde tarayıcı başlığını güncelleyen bir effect yazdır.
- Duyuru listesini mock fonksiyondan yükleyen bir bileşen tasarlat.
- `setInterval` kullanan bir canlı sayaçta cleanup eksikliğinin neye yol açacağını tartıştır.
- Bağımlılık dizisi boş bırakıldığında, hiç verilmediğinde ve state değeri içerdiğinde farkı örneklet.

## Laboratuvar görevi

Öğrenci KampüsHub ana ekranına aşağıdaki davranışları eklemelidir:

- Seçili modüle göre `document.title` güncellensin.
- Duyurular sahte servis fonksiyonundan yüklensin.
- Yükleme, hata ve boş liste durumları arayüzde ayrı gösterilsin.
- Etkinlik geri sayımı veya canlı sayaç için interval kullanılsın.
- Bileşen ekrandan ayrıldığında interval cleanup ile temizlensin.

## Kalite kontrol ölçütleri

- Dosyada yalnızca bir H1 bulunmalıdır.
- YAML front matter dosya başında yer almalıdır.
- Bölüm başlıkları `7.1`, `7.2`, ... numaralandırma düzenini izlemelidir.
- En az 5 `CODE_META` bloğu bulunmalıdır.
- `CODE_META` blokları çalıştırılabilir kod bloğundan önce HTML yorum bloğu olarak verilmelidir.
- Kod bloğu içinde `// CODE_META` bulunmamalıdır.
- En az 3 screenshot marker bulunmalıdır.
- Markdown Pandoc uyumlu olmalıdır.
- Kapsam dışı ileri konular bölümün ana akışını ele geçirmemelidir.

## Tam metin üretim talimatı

Tam metin aşağıdaki hedef dosya için üretilmelidir:

```text
workspace/react/chapters/chapter_07_useeffect_yan_etkiler.md
```

Bölüm dili akademik ama sade Türkçe olmalıdır. Hedef kitle React’e yeni başlayan bilgisayar/bilişim öğrencileridir. KampüsHub örneği bölüm boyunca kümülatif olarak sürdürülmelidir.
