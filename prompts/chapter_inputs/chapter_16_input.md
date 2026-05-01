# Bölüm 16 Girdi Promptu — KampüsHub — Tam Yığın Uygulama Tamamlama

## Bölüm kimliği

- Kitap: React ile Web Uygulama Geliştirme
- Alt başlık: KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme
- Bölüm ID: `chapter_16`
- Bölüm no: `16`
- Hedef bölüm dosyası: `workspace/react/chapters/chapter_16_kampushub_final.md`
- Hedef girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_16_input.md`

## Bölüm başlığı

Bölüm 16: KampüsHub — Tam Yığın Uygulama Tamamlama

## Bölümün kitap içindeki yeri

Bu bölüm kitabın uygulama tamamlama ve bütünleştirme bölümüdür. Önceki bölümlerde KampüsHub uygulamasının bileşen, props, state, effect, özel hook, routing, form, Redux Toolkit, REST API, Zustand, performans, test ve dağıtım katmanları ayrı ayrı kuruldu. Bölüm 16, bu parçaları tek bir final uygulama mimarisi altında birleştirir.

Bu bölümde “tam yığın” ifadesi, kapsamı aşan bir backend geliştirme anlatımı anlamına gelmez. Amaç, React tabanlı istemci uygulamasının route, form, global state, hafif tercih state’i, API sınırı, test ve dağıtım kapılarıyla birlikte uçtan uca tamamlanmasıdır. Backend, gerçek üretim ortamında ayrı bir servis olarak düşünülebilir; bölümde yalnızca istemcinin bu servisle güvenli ve sürdürülebilir şekilde konuşacak mimari sınırları ele alınmalıdır.

## Ön koşullar

- React bileşenleri, props, state ve effect bilgisi
- Özel hook, React Router, form yönetimi, Redux Toolkit ve Zustand bölümleri
- REST API entegrasyonu ve yükleniyor/hata/başarılı durumları
- Test ve dağıtım bölümündeki kalite kapısı yaklaşımı
- Vite tabanlı React geliştirme ortamı

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. KampüsHub uygulamasını modül, route, state ve API sınırı açısından bütüncül olarak açıklar.
2. Ana uygulama iskeletini route tablosu, layout ve sayfa bileşenleriyle ilişkilendirir.
3. Form, global state, API ve tercih state’inin hangi sorumlulukları taşıdığını ayırt eder.
4. Final uygulama için eksik modül, eksik route ve eksik kalite kontrol listesini çıkarır.
5. Dağıtım öncesi smoke test, erişilebilirlik, çevresel değişken ve yönlendirme kontrolünü planlar.
6. KampüsHub için son sprint, sürüm kapısı ve bakım planı oluşturur.
7. Öğrenci projesini değerlendirilebilir bir final teslim paketine dönüştürür.

## Ana kavramlar

- Final integration
- Application shell
- Route coverage
- Feature map
- State ownership
- API boundary
- Smoke test
- Release gate
- Environment checklist
- Deployment readiness
- Maintenance backlog
- Final project rubric

## KampüsHub bağlantısı

Bölümde KampüsHub için şu modüller bütünleştirilmelidir:

- Ana sayfa ve uygulama kabuğu
- Duyurular ve duyuru detayı
- Etkinlikler
- Not paylaşımı
- Profil ve kullanıcı tercihleri
- Arama/filtreleme formları
- API veri okuma/yazma sınırı
- Global bildirim ve hata yönetimi
- Tema/kompakt görünüm gibi hafif tercih state’i
- Dağıtım ve final teslim kontrol listesi

## Kullanılacak teknik kapsam

- React uygulama mimarisi
- React Router ile route tablosu
- Form state ve doğrulama akışı
- Redux Toolkit ile uygulama geneli durumlar
- Zustand ile hafif kullanıcı tercihleri
- REST API istemci sınırı
- TanStack Query’ye köprü niteliğinde cache/invalidation mantığı
- Vitest yaklaşımıyla test edilebilir saf fonksiyonlar
- Vite production build ve dağıtım çıktısı
- Erişilebilirlik ve smoke test kontrol listesi

## Kapsam dışı konular

- Backend servis geliştirme
- Veritabanı tasarımı
- Kimlik doğrulama sunucusu
- Role-based authorization ayrıntıları
- Next.js App Router
- Server-side rendering
- Server Components
- Gerçek ödeme, mesajlaşma veya canlı bildirim altyapısı
- CI/CD platformlarının ileri düzey yapılandırılması

Bu konular yalnızca ileride geliştirilebilecek alanlar olarak kısa şekilde anılabilir.

## Kod örneği politikası

- Bölümdeki çalıştırılabilir örnekler saf JavaScript fonksiyonları olarak verilmelidir.
- React/JSX örnekleri öğretici iskelet olarak kısa tutulmalı; doğrudan Node ile çalışmayacaksa `test: skip` kullanılmalıdır.
- CODE_META blokları kod çitinin dışında ve koddan hemen önce yer almalıdır.
- Kod örnekleri KampüsHub final teslim akışına hizmet etmelidir.
- Dosya yolları `chapter_16/...` standardını izlemelidir.

## CODE_META gereksinimleri

En az 4, tercihen 6 CODE_META örneği üret. Önerilen örnekler:

- `react_ch16_code01`: KampüsHub modül hazırlık durumunu hesaplama
- `react_ch16_code02`: Route kapsamını doğrulama
- `react_ch16_code03`: Dashboard veri kaynaklarını özetleme
- `react_ch16_code04`: State sahipliği karar tablosu üretme
- `react_ch16_code05`: Dağıtım çevresel değişkenlerini doğrulama
- `react_ch16_code06`: Final release gate sonucunu hesaplama

## Screenshot planı

Bölüm 16’da en az 3 screenshot marker bulunmalıdır:

- `[SCREENSHOT:b16_01_final_kampushub_dashboard]`
- `[SCREENSHOT:b16_02_final_route_haritasi]`
- `[SCREENSHOT:b16_03_release_checklist]`

Her marker için SCREENSHOT_META tanımlanmalıdır. Route yaklaşımı:

- `/__book__/chapter-16/final-kampushub-dashboard`
- `/__book__/chapter-16/final-route-haritasi`
- `/__book__/chapter-16/release-checklist`

## Pedagojik akış

1. Önceki bölümlerin final projeye nasıl bağlandığını açıkla.
2. KampüsHub modül haritasını çıkar.
3. Route, state, form ve API sorumluluklarını ayır.
4. Test ve dağıtım kapılarını final teslim ölçütüne dönüştür.
5. Öğrenciye uygulanabilir bir laboratuvar görevi ver.

## Mini alıştırmalar

- Route kapsam tablosu çıkarma
- Eksik modül analizi yapma
- Final release checklist hazırlama
- API sınırı ve state sahipliği kararlarını gerekçelendirme
- Smoke test senaryosu yazma

## Laboratuvar görevi

Öğrenci, KampüsHub final sürümünü hazırlamalıdır. Teslim paketi; route tablosu, çalışan sayfalar, formlar, API sınırı, state yönetimi, test planı, dağıtım kontrol listesi ve kısa teknik rapor içermelidir.

## Kalite kontrol ölçütleri

- Tek H1 bulunmalı.
- YAML front matter yer almalı.
- CODE_META blokları kod dışında olmalı.
- CODE_META id değerleri benzersiz olmalı.
- `chapter_id` değeri `chapter_16` olmalı.
- En az 3 screenshot marker ve 3 SCREENSHOT_META bulunmalı.
- Bölüm sonunda kavramsal sorular, programlama alıştırmaları ve laboratuvar görevi bulunmalı.
- Bölüm dili Türkçe, sade ve akademik ders kitabı üslubunda olmalı.

## Tam metin üretim talimatı

Bölüm 16 tam metnini Pandoc uyumlu Markdown olarak üret. KampüsHub final projesini kitap boyunca biriken tüm konularla bağla. Backend ayrıntılarına girmeden, React istemci uygulamasını tamamlanmış bir proje olarak teslim etmeye odaklan. Kod örneklerini test edilebilir saf JavaScript mantığıyla tasarla.
