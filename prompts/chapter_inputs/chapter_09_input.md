# Bölüm 9 Girdi Promptu — Özel Hook’lar

## Bölüm kimliği

- Kitap: **React ile Web Uygulama Geliştirme**
- Ana proje: **KampüsHub**
- Bölüm ID: `chapter_09`
- Bölüm dosyası: `workspace/react/chapters/chapter_09_custom_hooks.md`
- Girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_09_input.md`

## Bölüm başlığı

**Bölüm 9: Özel Hook’lar**

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 6’da öğrenilen `useState`, Bölüm 7’de öğrenilen `useEffect` ve Bölüm 8’de öğrenilen `useRef`, `useContext`, `useMemo`, `useCallback` kavramlarının doğal devamıdır. Öğrenci artık React uygulamalarında state, yan etki, türetilmiş veri, ortak bağlam ve referans kararlılığı gibi kavramları görmüştür. Bölüm 9’un amacı, bu bilgileri tekrar kullanılabilir özel Hook yapıları hâline getirmeyi öğretmektir.

## Ön koşullar

Öğrencinin şu konuları bildiği varsayılmalıdır:

- Modern web, SPA ve React uygulama mantığı
- Vite tabanlı geliştirme akışı: `npm create vite@latest`, `npm install`, `npm run dev`
- `package.json`, `index.html`, `main.jsx`, `App.jsx` dosyalarının rolleri
- JSX, fonksiyon bileşenleri ve props
- `useState`, `useEffect`, dependency array ve cleanup mantığı
- `useRef`, `useContext`, `useMemo`, `useCallback` temel kullanımı
- Temel JavaScript ES6+ sözdizimi

## Öğrenme çıktıları

Bölüm sonunda öğrenci:

1. Özel Hook kavramını, fonksiyon bileşeni ve sıradan yardımcı fonksiyondan ayırt eder.
2. Bir fonksiyonun neden `use` ön ekiyle adlandırılması gerektiğini açıklar.
3. Hook kurallarının özel Hook’lar için de geçerli olduğunu bilir.
4. Bileşen içinde tekrar eden state/effect mantığını özel Hook’a çıkarır.
5. Özel Hook’un dönüş değerini nesne, dizi veya sade değer olarak tasarlayabilir.
6. KampüsHub’da modül listesi, tercih yönetimi, duyuru filtreleme ve asenkron veri durumunu özel Hook mantığıyla düzenler.
7. Özel Hook tasarımında aşırı genelleme, gizli yan etki ve belirsiz isimlendirme hatalarını ayırt eder.

## Ana kavramlar

- Özel Hook
- `use` ön eki
- Hook kuralları
- Tek sorumluluk ilkesi
- Tekrar eden mantığın çıkarılması
- State/effect kapsülleme
- Dönüş değeri tasarımı
- Hook kompozisyonu
- Test edilebilir çekirdek mantık
- Kümülatif proje mimarisi

## KampüsHub bağlantısı

KampüsHub tarafında bölüm boyunca şu geliştirmeler yapılmalıdır:

- Ana ekran modüllerini filtreleyen `useCampusModules` mantığı
- Tema ve görünüm tercihini yöneten `useLocalPreference` mantığı
- Duyuruları kategori ve arama metnine göre süzen `useAnnouncementFilter` mantığı
- Asenkron veri durumunu `loading`, `success`, `error` ayrımıyla yöneten `useAsyncResource` mantığı
- Bölüm sonunda bu özel Hook’ların KampüsHub ekranında birlikte kullanılacağı küçük bir mimari plan

## Kullanılacak teknik kapsam

Ana akışa alınacak konular:

- Özel Hook nedir?
- Özel Hook ile yardımcı fonksiyon farkı
- `use` ön eki ve React Hook kuralları
- Bileşenden mantık çıkarma
- State ve effect kullanan özel Hook yapısı
- Dönüş değeri tasarımı
- Hook kompozisyonu
- Test edilebilir saf JavaScript çekirdeği yazma
- KampüsHub özel Hook tasarım örnekleri

## Kapsam dışı konular

Bu bölümde aşağıdaki konular ana akışa alınmamalıdır:

- React Router ayrıntıları
- React Hook Form ayrıntıları
- Redux Toolkit
- Zustand
- TanStack Query
- REST API entegrasyonu
- Sunucu tarafı render
- Kimlik doğrulama
- Büyük ölçekli mimari desenler
- TypeScript generic ayrıntıları

Bu konular yalnızca ilerleyen bölümlere köprü kurmak için kısa biçimde anılabilir.

## Kod örneği politikası

- React JSX örnekleri öğretici, kısa ve doğrudan konuya bağlı olmalıdır.
- Otomatik test edilecek örnekler saf JavaScript ile kurulmalıdır.
- Kod blokları Pandoc uyumlu fenced code biçiminde verilmelidir.
- Değişken, fonksiyon ve dosya adları İngilizce kullanılmalıdır.
- Açıklamalar Türkçe olabilir.
- Her test edilebilir kod bloğundan önce HTML yorum biçiminde `CODE_META` bulunmalıdır.
- `CODE_META` kesinlikle kod bloğu içine `// CODE_META` biçiminde yazılmamalıdır.

## CODE_META gereksinimleri

Bölüm 9’da en az 5 CODE_META örneği bulunmalıdır. Önerilen örnekler:

- `react_ch09_code01`: Modül filtreleme çekirdeği
- `react_ch09_code02`: Yerel tercih saklama çekirdeği
- `react_ch09_code03`: Duyuru filtreleme ve boş sonuç modeli
- `react_ch09_code04`: Asenkron kaynak durum makinesi benzetimi
- `react_ch09_code05`: Hook kompozisyonu ile KampüsHub görünüm modeli
- `react_ch09_code06`: Özel Hook isimlendirme ve tasarım kontrol listesi

Her CODE_META bloğu kod bloğunun içine değil, kod bloğundan hemen önce HTML yorum bloğu olarak yazılmalıdır.

## Screenshot planı

Bölümde en az 3 screenshot marker bulunmalıdır:

```text
[SCREENSHOT:b09_01_usecampusmodules_dashboard]
[SCREENSHOT:b09_02_usepreference_theme_panel]
[SCREENSHOT:b09_03_custom_hook_debug_flow]
```

Her screenshot için `SCREENSHOT_META` alanları şu mantıkla verilmelidir:

- `id`
- `chapter`
- `figure`
- `title`
- `route`
- `waitFor`
- `actions`
- `output`
- `caption`
- `markdownTarget`

Önerilen route yapısı:

```text
/__book__/chapter-09/usecampusmodules-dashboard
/__book__/chapter-09/usepreference-theme-panel
/__book__/chapter-09/custom-hook-debug-flow
```

## Pedagojik akış

1. Bölüm 8’den geçiş: ileri Hook’ları öğrenmekten tekrar kullanılabilir Hook tasarlamaya geçiş
2. Özel Hook kavramının sezgisel açıklaması
3. Hook kurallarının özel Hook’lara yansıması
4. Bileşen içinde tekrar eden mantığı belirleme
5. İlk özel Hook tasarım adımları
6. Dönüş değeri tasarımı: nesne mi, dizi mi?
7. KampüsHub örnekleri: modül listesi, tercih, duyuru filtresi, asenkron veri durumu
8. Test edilebilir çekirdek mantık ve React’e bağlama stratejisi
9. Sık yapılan hatalar, hata ayıklama ve laboratuvar görevi

## Mini alıştırmalar

- Aynı filtreleme mantığını iki bileşende tekrar eden küçük bir örnek ver ve bunu `useCampusModules` yapısına dönüştür.
- Tema tercihi için basit bir `useLocalPreference` özel Hook’u tasarla.
- Duyuru listesini kategori ve arama metnine göre süzen bir Hook dönüş modeli öner.
- `loading`, `success`, `error` durumlarını temsil eden sade bir asenkron kaynak modeli kur.

## Laboratuvar görevi

KampüsHub ana ekranı için üç özel Hook tasarlansın: `useCampusModules`, `useLocalPreference` ve `useAnnouncementFilter`. Öğrenci bu Hook’ları küçük bir `DashboardPage` bileşeninde kullansın, ekran görüntüsü marker’larına karşılık gelen arayüz durumlarını üretsin ve hangi mantığın bileşenden Hook’a taşındığını kısa bir raporla açıklasın.

## Kalite kontrol ölçütleri

Tam metin üretildiğinde:

- Dosyada yalnızca bir H1 bulunmalıdır.
- Standart bölüm başlıkları korunmalıdır.
- En az 5 CODE_META bloğu bulunmalıdır.
- `// CODE_META` biçiminde hatalı kullanım olmamalıdır.
- En az 3 screenshot marker bulunmalıdır.
- CODE_META id’leri benzersiz olmalıdır.
- Kod örnekleri Node ortamında çalıştırılabilir saf JavaScript çekirdeğine sahip olmalıdır.
- Markdown Pandoc uyumlu olmalıdır.

## Tam metin üretim talimatı

Bu girdi promptuna dayanarak `workspace/react/chapters/chapter_09_custom_hooks.md` dosyasını üret. Metin akademik ama sade Türkçe ile yazılmalıdır. Bölüm, React’e yeni başlayan bilgisayar/bilişim öğrencilerine uygun olmalı; ancak özel Hook tasarımının mimari önemini de açıkça göstermelidir. KampüsHub kümülatif projesiyle bağlantı kurulmalı, gereksiz ileri konu yüklemesi yapılmamalı ve bölüm sonunda öğrencinin doğrudan uygulayabileceği laboratuvar görevi bulunmalıdır.
