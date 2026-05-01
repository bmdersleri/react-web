# Bölüm 8 Girdi Promptu — İleri Hooks: useRef, useContext, useMemo, useCallback

## Bölüm kimliği

- Kitap: **React ile Web Uygulama Geliştirme**
- Ana proje: **KampüsHub**
- Bölüm ID: `chapter_08`
- Bölüm dosyası: `workspace/react/chapters/chapter_08_ileri_hooks.md`
- Girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_08_input.md`

## Bölüm başlığı

**Bölüm 8: İleri Hooks — useRef, useContext, useMemo, useCallback**

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 6’da öğrenilen `useState` ve Bölüm 7’de öğrenilen `useEffect` kavramlarının üzerine kurulur. Öğrenciler artık bileşen state’i, props akışı, JSX ve yan etki yönetimi hakkında temel sezgiye sahiptir. Bölüm 8’in amacı, React uygulamalarında sık kullanılan dört ileri Hook’u başlangıç-orta düzeyde öğretmek ve bu Hook’ların hangi problemi çözdüğünü KampüsHub üzerinden göstermek olmalıdır.

## Ön koşullar

Öğrencinin şu konuları bildiği varsayılmalıdır:

- Modern web, SPA, React, Vite ve `npm run dev` geliştirme akışı
- JSX ve fonksiyon bileşenleri
- Props ve tek yönlü veri akışı
- `useState` ile değişen veri yönetimi
- `useEffect` ile yan etki, bağımlılık dizisi ve cleanup mantığı
- Temel JavaScript ES6+ sözdizimi

## Öğrenme çıktıları

Bölüm sonunda öğrenci:

1. `useRef` ile render tetiklemeden kalıcı değer ve DOM referansı yönetimini açıklar.
2. `useContext` ile prop drilling probleminin ne zaman azaltılabileceğini yorumlar.
3. Context kullanımının global state yönetimiyle aynı şey olmadığını ayırt eder.
4. `useMemo` ile pahalı hesaplamaların gereksiz tekrarını azaltma fikrini açıklar.
5. `useCallback` ile fonksiyon referansı kararlılığının neden önemli olabileceğini açıklar.
6. Performans optimizasyonunun varsayılan refleks değil, ölçüm ve gerekçeyle yapılması gerektiğini tartışır.
7. KampüsHub’da tema, kullanıcı özeti, arama filtresi ve modül istatistiklerini ileri Hook’larla düzenler.

## Ana kavramlar

- Hook kuralları
- Referans ve state farkı
- DOM referansı
- Değer referansı
- Prop drilling
- Context Provider
- Context Consumer
- Türetilmiş veri
- Memoization
- Fonksiyon referansı
- Gereksiz yeniden render
- Ölçüme dayalı optimizasyon

## KampüsHub bağlantısı

KampüsHub tarafında bölüm boyunca şu geliştirmeler yapılmalıdır:

- Arama kutusuna odaklanmak için `useRef` örneği
- Tema ve oturum özeti için `useContext` örneği
- Modül kartlarını filtreleyen ve istatistik hesaplayan `useMemo` örneği
- Alt bileşene gönderilen olay işleyicisini kararlı tutan `useCallback` örneği
- Duyuru, etkinlik, not ve profil modüllerinde ortak tercih bilgisini paylaşan basit Context yapısı

## Kullanılacak teknik kapsam

Ana akışa alınacak konular:

- `useRef` temel kullanımı
- Ref değerinin render tetiklememesi
- DOM elementine odaklama örneği
- `createContext` ve `useContext` temel kullanımı
- Provider ile ortak değer paylaşımı
- `useMemo` bağımlılık dizisi
- `useCallback` bağımlılık dizisi
- Performans optimizasyonunda yanlış sezgiler
- KampüsHub bileşenlerine uygulanabilir küçük örnekler

## Kapsam dışı konular

Bu bölümde aşağıdaki konular ana akışa alınmamalıdır:

- Redux Toolkit
- Zustand
- TanStack Query
- React Router ayrıntıları
- REST API entegrasyonu
- Sunucu tarafı render
- Büyük ölçekli state mimarisi
- TypeScript generics ayrıntıları
- Test kütüphaneleri

Bu konular yalnızca ilerleyen bölümlere köprü kurmak için kısa biçimde anılabilir.

## Kod örneği politikası

- React JSX örnekleri öğretici ve kısa olmalıdır.
- Otomatik test edilecek örnekler saf JavaScript ile kurulmalıdır.
- Kod blokları Pandoc uyumlu fenced code biçiminde verilmelidir.
- Değişken ve fonksiyon adları İngilizce olmalıdır.
- Açıklamalar Türkçe olmalıdır.
- Her test edilebilir kod bloğu öncesinde HTML yorum biçiminde `CODE_META` bulunmalıdır.

## CODE_META gereksinimleri

Bölüm 8’de en az 5 CODE_META örneği bulunmalıdır. Önerilen örnekler:

- `react_ch08_code01`: `useRef` sezgisini saf JavaScript referans kutusu ile açıklayan örnek
- `react_ch08_code02`: Context benzetimi ile ortak değer paylaşımı
- `react_ch08_code03`: Memoization ile modül filtreleme ve istatistik hesaplama
- `react_ch08_code04`: Callback referansı ve bağımlılık anahtarı benzetimi
- `react_ch08_code05`: KampüsHub görünüm modelini birlikte üreten örnek
- `react_ch08_code06`: Ref tabanlı zamanlayıcı kimliği ve cleanup benzetimi

Her CODE_META bloğu kod bloğunun içine değil, kod bloğundan hemen önce HTML yorum bloğu olarak yazılmalıdır.

## Screenshot planı

Bölümde en az 3 screenshot marker bulunmalıdır:

```text
[SCREENSHOT:b08_01_ref_search_focus]
[SCREENSHOT:b08_02_context_theme_provider]
[SCREENSHOT:b08_03_memoized_module_dashboard]
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
/__book__/chapter-08/ref-search-focus
/__book__/chapter-08/context-theme-provider
/__book__/chapter-08/memoized-module-dashboard
```

## Pedagojik akış

1. Bölüm 7’den kısa geçiş: yan etkiler ve cleanup hatırlatması
2. Hook kurallarının kısa tekrarı
3. `useRef`: state olmayan kalıcı değer ve DOM referansı
4. `useContext`: prop drilling problemini azaltma
5. `useMemo`: pahalı hesaplamaları kontrollü yeniden üretme
6. `useCallback`: fonksiyon referansını kararlı tutma
7. Optimizasyon hataları ve yanlış sezgiler
8. KampüsHub’da tema, arama odağı, filtreleme ve olay işleyici örnekleri
9. Hata ayıklama, bölüm sonu soruları ve laboratuvar görevi

## Mini alıştırmalar

- Arama kutusunu `useRef` ile odaklayan küçük bileşen yazdır.
- Tema bilgisini üç alt bileşene props ile geçmek yerine Context ile paylaş.
- Modül listesinde arama filtresi değişmediğinde istatistiğin tekrar hesaplanmamasını `useMemo` ile göster.
- Liste kartına gönderilen `onSelectModule` fonksiyonunu `useCallback` ile kararlı hâle getir.

## Laboratuvar görevi

KampüsHub ana ekranında arama kutusu, tema sağlayıcı, modül filtreleme ve modül seçim fonksiyonunu birlikte kullanan küçük bir uygulama parçası geliştirilsin. Öğrenci çıktı ekranını gözlemlemeli, React DevTools ile props/state akışını incelemeli ve hangi Hook’un hangi problemi çözdüğünü kısa bir raporla açıklamalıdır.

## Kalite kontrol ölçütleri

Tam metin üretildiğinde:

- Dosyada yalnızca bir H1 bulunmalıdır.
- Standart bölüm başlıkları korunmalıdır.
- En az 5 CODE_META bloğu bulunmalıdır.
- `// CODE_META` biçiminde hatalı kullanım olmamalıdır.
- Screenshot marker adları `b08_XX_aciklayici_ad` standardına uymalıdır.
- Kod örnekleri Node.js ortamında test edilebilir olmalıdır.
- Markdown Pandoc uyumlu olmalıdır.
- Bölüm sonu yapısı eksiksiz olmalıdır.

## Tam metin üretim talimatı

Bölüm metni akademik ama sade Türkçe ile yazılmalıdır. Hedef kitle React’e yeni başlayan bilgisayar ve bilişim öğrencileridir. Anlatım ezberci değil, problem odaklı olmalıdır: her Hook önce hangi sorunu çözdüğüyle açıklanmalı, ardından KampüsHub senaryosuna bağlanmalıdır. Performans optimizasyonu konularında aşırı kullanım uyarısı yapılmalı; `useMemo` ve `useCallback` her yere eklenmesi gereken kalıplar gibi sunulmamalıdır.
