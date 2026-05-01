# Bölüm 10 Girdi Promptu — React Router ile Sayfa Yönetimi

## Bölüm kimliği

- Kitap: **React ile Web Uygulama Geliştirme**
- Alt başlık: **KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme**
- Ana proje: **KampüsHub**
- Bölüm ID: `chapter_10`
- Bölüm dosyası: `workspace/react/chapters/chapter_10_react_router.md`
- Girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_10_input.md`
- Manifest başlığı: **Bölüm 10: React Router ile Sayfa Yönetimi**

## Bölüm başlığı

**Bölüm 10: React Router ile Sayfa Yönetimi**

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 1’de kurulan modern web ve SPA zihinsel modelini, Bölüm 4–9 arasında geliştirilen bileşen, props, state, effect, ileri Hook ve özel Hook kazanımlarıyla birleştirir. Öğrenci artık tek bir ekranda bileşen üretmekten, KampüsHub uygulamasını birden fazla sayfadan oluşan ancak tarayıcıda tek React uygulaması olarak çalışan bir yapıya taşır.

Bölüm 10, Bölüm 11’deki form yönetimi ve Bölüm 12–14 arasındaki global state/API yönetimi için mimari zemin hazırlar. Route haritası, sayfa bileşenleri ve gezinme menüsü doğru kurulmadan form, profil, duyuru detayı ve veri entegrasyonu sürdürülebilir biçimde geliştirilemez.

## Ön koşullar

Öğrencinin şu konuları bildiği varsayılmalıdır:

- Modern web, SPA ve istemci taraflı uygulama mantığı
- Vite tabanlı React geliştirme akışı
- `npm create vite@latest`, `npm install`, `npm run dev` komutları
- `package.json`, `index.html`, `main.jsx`, `App.jsx` dosyalarının rolleri
- JSX, fonksiyon bileşenleri, props ve state
- `useEffect`, özel Hook ve test edilebilir saf JavaScript çekirdeği yazma
- `map`, `filter`, `find`, string işleme ve temel URL okuryazarlığı

## Öğrenme çıktıları

Bölüm sonunda öğrenci:

1. SPA, çok sayfalı uygulama ve client-side routing farkını açıklar.
2. React Router’ın React bileşen ağacı ile tarayıcı URL’si arasındaki ilişkiyi nasıl kurduğunu kavrar.
3. `BrowserRouter`, `Routes`, `Route`, `Link` ve `NavLink` yapılarını ayırt eder.
4. KampüsHub için temel route haritası tasarlar.
5. Navbar üzerinden aktif bağlantı durumunu kullanıcıya anlaşılır biçimde gösterir.
6. Dinamik route parametresinin ne işe yaradığını örnek üzerinden açıklar.
7. Bilinmeyen route için 404 / NotFound yaklaşımı kurar.
8. Route tasarımını props, state, effect ve özel Hook kullanımıyla ilişkilendirir.
9. Korumalı route, nested route, query string ve lazy loading kavramlarını ileri ayrıntıya girmeden tanır.

## Ana kavramlar

- Tek sayfa uygulama
- İstemci taraflı yönlendirme
- Route haritası
- `BrowserRouter`
- `Routes`
- `Route`
- `Link`
- `NavLink`
- Aktif bağlantı
- Dinamik segment
- `useParams`
- Query string
- Nested route
- Protected route
- 404 / NotFound
- Programatik gezinme
- Sayfa bileşeni

## KampüsHub bağlantısı

KampüsHub tarafında bu bölümde şu route iskeleti hedeflenmelidir:

```text
/                -> Ana sayfa
/announcements   -> Duyurular
/events          -> Etkinlikler
/notes           -> Not Paylaşımı
/profile         -> Profil
/announcements/:announcementId -> Duyuru detayı hazırlığı
*                -> Sayfa bulunamadı
```

Bölüm sonunda öğrenci, KampüsHub için `HomePage`, `AnnouncementsPage`, `EventsPage`, `NotesPage`, `ProfilePage`, `AnnouncementDetailPage` ve `NotFoundPage` bileşenlerini route düzeyinde düşünmeye başlamalıdır.

## Kullanılacak teknik kapsam

Ana akışta şu konular işlenmelidir:

- SPA ve client-side routing kavramı
- React Router v7 Declarative Mode yaklaşımı
- `BrowserRouter`, `Routes`, `Route`
- `Link` ve `NavLink`
- Route haritası ve sayfa bileşenleri
- Dinamik route parametrelerine giriş
- Query string kavramına kısa hazırlık
- Nested route kavramına kısa hazırlık
- Protected route kavramına kısa hazırlık
- 404 / NotFound route’u
- KampüsHub Navbar yapısı
- Test edilebilir saf JavaScript route yardımcıları

## Kapsam dışı konular

Bu bölümde aşağıdaki konular ana akışa alınmamalıdır:

- Sunucu taraflı render mimarileri
- React Router Data/Framework Mode ayrıntıları
- Loader/action API ayrıntıları
- Tam rol tabanlı yetkilendirme
- Büyük ölçekli lazy loading ve code splitting stratejileri
- Backend API entegrasyonu
- Redux Toolkit ayrıntıları
- Zustand ayrıntıları
- React Hook Form ayrıntıları

Bu konular yalnızca ilerleyen bölümlere köprü kuracak ölçüde kısa anılabilir.

## Kod örneği politikası

- React Router JSX örnekleri kısa ve öğretici tutulmalıdır.
- Otomatik test edilecek örnekler saf JavaScript ile yazılmalıdır.
- Her çalıştırılabilir kod bloğundan önce HTML yorum biçiminde `CODE_META` bulunmalıdır.
- `CODE_META` kod bloğunun içine yazılmamalıdır.
- Değişken ve fonksiyon adları İngilizce, açıklama metinleri Türkçe olmalıdır.
- Kodlar `node --check` ve Node çalıştırmasıyla test edilebilir olmalıdır.

## CODE_META gereksinimleri

Bölüm 10’da en az 6 CODE_META örneği bulunmalıdır:

- `react_ch10_code01`: KampüsHub route listesini saf JavaScript dizisiyle doğrulama
- `react_ch10_code02`: `NavLink` aktiflik mantığını saf fonksiyonla simüle etme
- `react_ch10_code03`: Dinamik duyuru detay route parametresini ayrıştırma
- `react_ch10_code04`: Bilinmeyen route için NotFound eşleştirmesi
- `react_ch10_code05`: KampüsHub sayfa başlığı üretme yardımcı fonksiyonu
- `react_ch10_code06`: Query string ve route erişim kararını sade biçimde modelleme

## Screenshot planı

Bölümde en az 3 screenshot marker bulunmalıdır:

```text
[SCREENSHOT:b10_01_kampushub_ana_sayfa_router]
[SCREENSHOT:b10_02_aktif_navlink_gorunumu]
[SCREENSHOT:b10_03_notfound_sayfasi]
```

Her marker için `SCREENSHOT_META` alanları eksiksiz verilmelidir:

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
/__book__/chapter-10/kampushub-ana-sayfa-router
/__book__/chapter-10/aktif-navlink-gorunumu
/__book__/chapter-10/notfound-sayfasi
```

## Pedagojik akış

1. Önceki bölümlerdeki tek ekranlı bileşen yapısından çok sayfalı uygulama düşüncesine geçiş yapılır.
2. SPA ile klasik çok sayfalı uygulama farkı açıklanır.
3. React Router’ın URL ile bileşen ağacı arasında eşleme yaptığı vurgulanır.
4. KampüsHub route haritası tabloyla gösterilir.
5. `BrowserRouter`, `Routes`, `Route` üçlüsü anlatılır.
6. `Link` ve `NavLink` farkı örneklenir.
7. Dinamik route parametresi, duyuru detayı senaryosuyla tanıtılır.
8. NotFound sayfası ve güvenli yönlendirme düşüncesi açıklanır.
9. Test edilebilir route yardımcı fonksiyonları CODE_META örnekleriyle verilir.
10. Laboratuvar görevinde KampüsHub sayfa iskeleti tamamlatılır.

## Mini alıştırmalar

- KampüsHub için `/clubs` route’u eklenirse route haritasında hangi yeni sayfa bileşenleri gerekir?
- `/announcements/:announcementId` adresinde `announcementId` değerinin neyi temsil ettiğini açıklayın.
- `Link` ile `NavLink` arasında kullanıcı deneyimi açısından nasıl bir fark vardır?
- Bilinmeyen bir URL’de kullanıcıya yalnızca boş ekran göstermek neden hatalıdır?
- `profile` sayfasının ileride protected route olmasının gerekçesini yazın.

## Laboratuvar görevi

KampüsHub uygulamasına React Router tabanlı sayfa yönetimi ekleyin. Teslimde şu dosyaların bulunması beklenir:

- `src/main.jsx`
- `src/App.jsx`
- `src/layouts/AppLayout.jsx`
- `src/components/Navbar.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/AnnouncementsPage.jsx`
- `src/pages/AnnouncementDetailPage.jsx`
- `src/pages/EventsPage.jsx`
- `src/pages/NotesPage.jsx`
- `src/pages/ProfilePage.jsx`
- `src/pages/NotFoundPage.jsx`

## Kalite kontrol ölçütleri

- Bölüm metni Pandoc uyumlu Markdown olmalıdır.
- Tek H1 bulunmalıdır.
- CODE_META blokları kod bloğundan hemen önce olmalıdır.
- En az 6 CODE_META örneği yer almalıdır.
- Kod testlerinde kritik hata olmamalıdır.
- En az 3 screenshot marker ve SCREENSHOT_META bloğu bulunmalıdır.
- React Router v7 Declarative Mode sınırı korunmalıdır.
- Kapsam dışı ileri konular ana akışa taşınmamalıdır.
- Bölüm sonunda kavramsal sorular, programlama alıştırmaları ve laboratuvar görevi bulunmalıdır.

## Tam metin üretim talimatı

Tam metin, ders kitabı üslubunda, akademik ama sade Türkçe ile yazılmalıdır. KampüsHub örneği bölüm boyunca kümülatif bağlam olarak kullanılmalıdır. Kodlar kısa, açıklanabilir ve test edilebilir olmalıdır. JSX gerektiren örnekler öğretici bağlamda verilebilir; otomatik test gerektiren örnekler saf JavaScript çekirdeği olarak kurulmalıdır.
