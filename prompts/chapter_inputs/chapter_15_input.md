# Bölüm 15 Girdi Promptu — Performans, Test ve Dağıtım

## Bölüm kimliği

- Kitap: React ile Web Uygulama Geliştirme
- Alt başlık: KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme
- Bölüm ID: `chapter_15`
- Bölüm no: `15`
- Hedef bölüm dosyası: `workspace/react/chapters/chapter_15_performans_test_dagitim.md`
- Hedef girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_15_input.md`

## Bölüm başlığı

Bölüm 15: Performans, Test ve Dağıtım

## Bölümün kitap içindeki yeri

Bu bölüm, KampüsHub uygulamasının geliştirme aşamasından üretime hazırlanma aşamasına geçiş bölümüdür. Önceki bölümlerde bileşenler, props, state, effect, özel hook, routing, form yönetimi, Redux Toolkit, REST API ve Zustand ile uygulama mimarisi kuruldu. Bölüm 15, bu birikimi üç temel kalite ekseninde tamamlar: performans, test ve dağıtım.

Bu bölümde amaç öğrencinin yalnızca çalışan bir React uygulaması üretmesi değil, ölçülebilir, test edilebilir ve dağıtıma hazırlanabilir bir uygulama üretmesidir.

## Ön koşullar

- React bileşenleri, props ve state bilgisi
- `useEffect`, özel hook, React Router ve form yönetimi
- Redux Toolkit, REST API ve Zustand bölümlerinde kurulan KampüsHub mimarisi
- Vite tabanlı React geliştirme ortamı
- Temel npm script bilgisi
- Basit JavaScript fonksiyonlarını test etme sezgisi

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. Performans optimizasyonunu ölçümden bağımsız ezbere yapılan bir işlem olarak değil, problem odaklı bir iyileştirme süreci olarak açıklar.
2. Gereksiz render, pahalı hesaplama, büyük paket boyutu ve yavaş ağ isteği gibi performans sorunlarını ayırt eder.
3. `memo`, `useMemo` ve `useCallback` kavramlarını hangi durumda yararlı olabilecekleri açısından yorumlar.
4. KampüsHub için basit performans bütçesi tanımlar.
5. Unit test, component test ve entegrasyon testini ayırt eder.
6. Vitest ve React Testing Library yaklaşımını temel düzeyde açıklar.
7. Test senaryosunu kullanıcı davranışı ve beklenen çıktı üzerinden yazar.
8. Vite üretim derlemesi, `dist` çıktısı ve yerel preview mantığını açıklar.
9. Dağıtım öncesi kontrol listesi oluşturur.
10. KampüsHub projesini Bölüm 16’daki final entegrasyona hazırlar.

## Ana kavramlar

- Performance budget
- Re-render
- Memoization
- `memo`
- `useMemo`
- `useCallback`
- Bundle size
- Lazy loading köprüsü
- Unit test
- Component test
- Integration test
- Vitest
- React Testing Library
- jsdom
- Production build
- Static deployment
- Preview
- Deployment checklist

## KampüsHub bağlantısı

Bölümde KampüsHub için aşağıdaki senaryolar kullanılmalıdır:

- Duyuru ve etkinlik listelerinde gereksiz yeniden hesaplamayı azaltma
- Not paylaşımı arama/filtreleme akışında performans bütçesi oluşturma
- Profil kartı ve ayar paneli gibi bileşenler için test senaryosu yazma
- API yükleniyor/hata/başarılı durumları için test planı oluşturma
- Vite production build sonrası `dist` klasörünü dağıtım çıktısı olarak yorumlama
- Dağıtım öncesi çevresel değişken, yönlendirme ve 404 kontrol listesi hazırlama
- Bölüm 16’daki final uygulama tamamlamasına hazırlık

## Kullanılacak teknik kapsam

- Performansı ölçme ve sınıflandırma
- Render maliyeti ve hesaplama maliyeti ayrımı
- `memo`, `useMemo`, `useCallback` kavramsal kullanımı
- Liste filtreleme ve arama senaryolarında performans düşüncesi
- Vite üretim derlemesi ve önizleme
- Vitest ile birim test yaklaşımı
- React Testing Library ile kullanıcı odaklı component test yaklaşımı
- jsdom/happy-dom gibi tarayıcı benzeri test ortamlarına giriş
- Dağıtım checklist’i
- Node ortamında test edilebilir saf JavaScript kalite yardımcıları

## Kapsam dışı konular

- React Compiler derinlemesine yapılandırması
- Karmaşık profiling ve flamegraph analizi
- Web Vitals ayrıntılı saha ölçümü
- Playwright/Cypress uçtan uca test ayrıntıları
- CI/CD pipeline derinlemesine otomasyonu
- Docker tabanlı production hosting
- SSR, SSG ve Next.js dağıtımı
- CDN cache invalidation stratejileri
- Service worker ve PWA offline mimarisi
- Büyük ölçekli monorepo deployment stratejileri

## Kod örneği politikası

- Kod örnekleri kısa, test edilebilir ve KampüsHub senaryolarıyla bağlantılı olmalıdır.
- Gerçek React/Vitest/RTL kodları kavramsal olarak açıklanabilir; ancak CODE_META örneklerinin çoğu Node ortamında çalışabilen saf JavaScript yardımcıları olmalıdır.
- Her çalıştırılabilir kod bloğundan hemen önce CODE_META HTML yorum bloğu yer almalıdır.
- CODE_META kesinlikle kod bloğunun içine yazılmamalıdır.
- Bölümde en az 4, tercihen 6 CODE_META örneği bulunmalıdır.
- Kod adları İngilizce ve camelCase/PascalCase uyumlu olmalıdır; açıklamalar Türkçe olabilir.

## CODE_META gereksinimleri

Önerilen örnekler:

1. `react_ch15_code01`: KampüsHub liste filtresi için memoizasyon kararı üreten saf fonksiyon.
2. `react_ch15_code02`: Basit performans bütçesi denetleyicisi.
3. `react_ch15_code03`: Test senaryosu matrisi oluşturan yardımcı fonksiyon.
4. `react_ch15_code04`: API durumlarını test kapsamına dönüştüren yardımcı fonksiyon.
5. `react_ch15_code05`: Vite dağıtım script kontrolü.
6. `react_ch15_code06`: Dağıtım öncesi kalite kapısı raporu.

Tüm örnekler Node ortamında çalıştırılabilir olmalı ve `expected_stdout` değerleri açık biçimde tanımlanmalıdır.

## Screenshot planı

Bölümde en az 3 screenshot marker kullanılmalıdır:

```text
[SCREENSHOT:b15_01_kampushub_performans_paneli]
[SCREENSHOT:b15_02_test_sonuclari_paneli]
[SCREENSHOT:b15_03_dagitim_onizleme]
```

Her marker için SCREENSHOT_META tanımlanmalıdır.

Önerilen route’lar:

```text
/__book__/chapter-15/kampushub-performans-paneli
/__book__/chapter-15/test-sonuclari-paneli
/__book__/chapter-15/dagitim-onizleme
```

## Pedagojik akış

1. Çalışan uygulamadan kaliteli uygulamaya geçiş
2. Performans problemini ölçme ve sınıflandırma
3. Gereksiz optimizasyon tehlikesi
4. KampüsHub performans bütçesi
5. Test piramidi ve test türleri
6. Vitest ve React Testing Library’ye giriş
7. Dağıtım öncesi production build ve preview
8. Dağıtım checklist’i
9. Bölüm 16 final entegrasyonuna köprü

## Mini alıştırmalar

- Bir KampüsHub bileşeni için performans risklerini listele.
- Duyuru kartı için üç test senaryosu yaz.
- Production build öncesi kontrol listesi oluştur.
- Büyük bir liste için memoizasyonun gerekli olup olmadığını gerekçelendir.

## Laboratuvar görevi

Öğrenci KampüsHub projesinde:

1. Duyuru veya not listesi için basit performans bütçesi tanımlar.
2. En az iki saf JavaScript yardımcı fonksiyon için Vitest test senaryosu yazar.
3. En az bir React bileşeni için React Testing Library ile kullanıcı odaklı test tasarlar.
4. `npm run build` ve `npm run preview` akışını belgeleyen dağıtım öncesi rapor hazırlar.
5. Bölüm 16 için final entegrasyon checklist’i oluşturur.

## Kalite kontrol ölçütleri

- Tek H1 kullanılmalıdır.
- Başlık hiyerarşisi bozulmamalıdır.
- CODE_META blokları kod bloklarının dışında ve hemen önünde olmalıdır.
- CODE_META id’leri benzersiz olmalıdır.
- `chapter_id` değeri `chapter_15` olmalıdır.
- En az 4 test edilebilir kod örneği bulunmalıdır.
- En az 3 SCREENSHOT_META girdisi bulunmalıdır.
- Markdown Pandoc uyumlu olmalıdır.
- Bölüm sonunda kavramsal sorular, programlama alıştırmaları ve laboratuvar görevi bulunmalıdır.
- Üslup akademik ama sade Türkçe olmalıdır.

## Tam metin üretim talimatı

Bölüm 15 tam metnini ders kitabı üslubuyla üret. Bölüm, performans, test ve dağıtım başlıklarını aynı anda ele aldığı için konuları yüzeysel listelemeye dönüştürme; her konuyu KampüsHub üzerinden anlamlandır. İleri konulara köprü kur, ancak öğrenciyi gereksiz ayrıntıya boğma. Kod örneklerini test edilebilir saf JavaScript yardımcıları olarak tasarla ve React/Vitest/RTL komutlarını kavramsal açıklamalarla destekle.
