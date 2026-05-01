# Bölüm 13 Girdi Promptu — REST API Entegrasyonu

## Bölüm kimliği

- Kitap: React ile Web Uygulama Geliştirme
- Alt başlık: KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme
- Bölüm ID: `chapter_13`
- Bölüm no: `13`
- Hedef bölüm dosyası: `workspace/react/chapters/chapter_13_rest_api.md`
- Hedef girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_13_input.md`

## Bölüm başlığı

Bölüm 13: REST API Entegrasyonu

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 10’da kurulan sayfa yönetimi, Bölüm 11’de geliştirilen form yönetimi ve Bölüm 12’de tanıtılan global state düşüncesi üzerine inşa edilir. Öğrenci artık KampüsHub uygulamasındaki statik verileri dış sistemlerden gelen dinamik verilere dönüştürmeye hazırlanır.

## Ön koşullar

- JavaScript `Promise`, `async/await` ve hata yakalama temelleri
- React `useState` ve `useEffect` bilgisi
- React Router ile sayfa bileşenleri
- Form gönderimi ve payload üretimi
- Redux Toolkit bölümünden state/payload/selector sezgisi

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. REST API kavramını front-end geliştirme bağlamında açıklar.
2. HTTP metotlarını KampüsHub kullanım senaryolarıyla ilişkilendirir.
3. `fetch` ile temel GET ve POST isteklerinin nasıl kurulduğunu açıklar.
4. Loading, error ve success durumlarını ayrı ayrı modelleyebilir.
5. API yanıtını doğrudan arayüze bağlamak yerine normalize etme ihtiyacını kavrar.
6. Duyuru, etkinlik ve not paylaşımı verileri için endpoint taslağı oluşturabilir.
7. `useEffect` içinde veri çekmenin temel akışını ve sınırlılıklarını açıklar.
8. TanStack Query’nin hangi problemi çözmek için ilerleyen bölümlerde gündeme geleceğini kavrar.

## Ana kavramlar

- REST
- Endpoint
- HTTP method
- GET / POST / PUT / PATCH / DELETE
- Request / Response
- Status code
- JSON
- Header
- Body
- Loading state
- Error state
- Data normalization
- Stale response
- Client-side cache

## KampüsHub bağlantısı

Bölümde KampüsHub için aşağıdaki API senaryoları kullanılmalıdır:

- Duyuru listesini API’den alma
- Tekil duyuru detayını alma
- Etkinlik listesini filtreli alma
- Not paylaşımı formundan POST isteği için payload hazırlama
- Profil tercihlerini güncelleme düşüncesi
- API hatalarında kullanıcıya sade geri bildirim verme

Önerilen endpoint haritası:

```text
GET    /api/announcements
GET    /api/announcements/:announcementId
GET    /api/events?category=...
POST   /api/notes
PATCH  /api/profile/preferences
```

## Kullanılacak teknik kapsam

- Fetch API temel mantığı
- JSON yanıtı okuma
- HTTP status kontrolü
- `async/await` ile veri çekme
- `useEffect` içinde veri çekmeye kavramsal giriş
- Loading/error/success durumları
- Basit API service fonksiyonu tasarımı
- Mock API verileriyle test edilebilir saf fonksiyonlar
- TanStack Query’ye yalnızca motivasyon düzeyinde köprü

## Kapsam dışı konular

- Backend geliştirme
- Express/NestJS/FastAPI ayrıntıları
- Authentication token yönetimi
- Refresh token stratejileri
- Role-based authorization
- GraphQL
- WebSocket / SSE
- Offline-first mimari
- İleri cache invalidation stratejileri
- TanStack Query ayrıntılı kullanımı
- SSR / Next.js veri çekme modelleri

## Kod örneği politikası

- Kod örnekleri kısa, test edilebilir ve KampüsHub senaryosuna bağlı olmalıdır.
- Çalıştırılabilir her kod bloğundan önce `CODE_META` HTML yorum bloğu bulunmalıdır.
- Node ortamında gerçek internete çıkılmamalı; API çağrıları mock fonksiyonlarla temsil edilmelidir.
- JSX/React Router/TanStack Query kodları yalnızca kavramsal açıklama düzeyinde tutulmalı; test edilemeyecekse CODE_META içinde `test: skip` kullanılmalıdır.
- Bu bölümde tercih edilen yaklaşım: çoğu örneği saf JavaScript fonksiyonu olarak yazıp Node ile test etmek.

## CODE_META gereksinimleri

Bölüm 13’te en az 4, tercihen 6 CODE_META örneği bulunmalıdır. Önerilen örnekler:

1. `react_ch13_code01_endpoint_builder`: KampüsHub endpoint ve query string üretimi.
2. `react_ch13_code02_response_normalizer`: API duyuru yanıtını normalize etme.
3. `react_ch13_code03_http_status_guard`: HTTP status kontrolü ve hata mesajı üretimi.
4. `react_ch13_code04_loading_state_reducer`: Loading/error/success state geçişlerini modelleme.
5. `react_ch13_code05_stale_response_guard`: Eski yanıtın arayüzü ezmesini engelleme mantığı.
6. `react_ch13_code06_post_note_request`: Not paylaşımı için POST request taslağı üretme.

## Screenshot planı

En az 2, tercihen 3 screenshot marker kullanılmalıdır:

```text
[SCREENSHOT:b13_01_duyuru_api_loading_success]
[SCREENSHOT:b13_02_api_hata_durumu]
[SCREENSHOT:b13_03_not_paylasimi_post_akis]
```

Her marker için `SCREENSHOT_META` tanımlanmalıdır. Route yaklaşımı:

```text
/__book__/chapter-13/duyuru-api-loading-success
/__book__/chapter-13/api-hata-durumu
/__book__/chapter-13/not-paylasimi-post-akis
```

## Pedagojik akış

1. Statik veri ile API verisi arasındaki farkı açıklayın.
2. REST ve endpoint kavramlarını KampüsHub üzerinden anlatın.
3. HTTP metotlarını tablo ve senaryolarla ilişkilendirin.
4. Fetch API’nin promise tabanlı çalışma modelini açıklayın.
5. Loading/error/success durumlarını ayrı ayrı modelleyin.
6. API yanıtını normalize etmenin önemini gösterin.
7. POST isteği için payload ve request taslağı üretin.
8. `useEffect` ile veri çekmenin mümkün olduğunu ama manuel sorumluluklar doğurduğunu açıklayın.
9. TanStack Query’ye bir sonraki mimari adım olarak köprü kurun.

## Mini alıştırmalar

- Duyuru API endpoint listesini tasarlama
- Etkinlik filtre query string’i üretme
- API hata mesajlarını kullanıcı dostu hâle getirme
- Loading state diyagramı çizme
- Not paylaşımı POST payload’ını doğrulama

## Laboratuvar görevi

Öğrenci KampüsHub uygulamasında duyurular ve etkinlikler için mock API service katmanı oluşturmalı; duyuru listesini loading/error/success durumlarıyla göstermeli; not paylaşımı formunun gönderim çıktısını POST request taslağına dönüştürmelidir.

## Kalite kontrol ölçütleri

- Tek H1 bulunmalı.
- Başlık hiyerarşisi tutarlı olmalı.
- `chapter_id` tüm CODE_META bloklarında `chapter_13` olmalı.
- En az 4 CODE_META örneği bulunmalı.
- Kod blokları içinde `CODE_META` yer almamalı.
- En az 2 screenshot marker ve karşılık gelen SCREENSHOT_META bulunmalı.
- Kapsam dışı konular açıkça belirtilmeli.
- KampüsHub sürekliliği korunmalı.
- Bölüm sonunda sorular, alıştırmalar ve laboratuvar görevi bulunmalı.

## Tam metin üretim talimatı

Pandoc uyumlu Markdown üret. Akademik fakat sade Türkçe kullan. Bölümü ders kitabı üslubuyla yaz. Her kavramı önce açıklayıp sonra KampüsHub örneğine bağla. İleri konuları gereğinden fazla açma; TanStack Query, authentication ve backend konularını yalnızca sonraki bölümlere köprü olarak an.
