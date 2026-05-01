# Bölüm 12 Girdi Promptu — Global State Yönetimi — Redux Toolkit

## Bölüm kimliği

- Kitap: **React ile Web Uygulama Geliştirme**
- Alt başlık: **KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme**
- Ana proje: **KampüsHub**
- Bölüm ID: `chapter_12`
- Bölüm dosyası: `workspace/react/chapters/chapter_12_redux_toolkit.md`
- Girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_12_input.md`
- Manifest başlığı: **Bölüm 12: Global State Yönetimi — Redux Toolkit**

## Bölüm başlığı

**Bölüm 12: Global State Yönetimi — Redux Toolkit**

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 11’de ele alınan form verisi, hata durumu ve kullanıcı etkileşimlerinin uygulama geneline nasıl taşınacağını açıklar. Bölüm 10’da KampüsHub sayfaları React Router ile ayrılmış, Bölüm 11’de bu sayfalara form mantığı eklenmiştir. Bölüm 12’de ise uygulama genelinde ortak kullanılan veriler için Redux Toolkit tabanlı global state yönetimi kurulacaktır.

KampüsHub açısından bu bölüm; kullanıcı tercihleri, okunmamış duyuru sayısı, sabitlenmiş duyurular, not paylaşımı sayaçları, tema tercihi ve sayfalar arası ortak bildirim durumu gibi birden fazla bileşen tarafından kullanılan verilerin yönetimini hedefler. Bölüm 13’te REST API entegrasyonuna geçileceği için bu bölümde client tarafındaki state mimarisi sade ve test edilebilir biçimde hazırlanmalıdır.

## Ön koşullar

Öğrencinin şu konuları bildiği varsayılmalıdır:

- JSX ve fonksiyon bileşenleri
- Props ve state kullanımı
- `useState`, `useEffect`, `useContext` ve özel Hook mantığı
- React Router ile sayfa bileşenlerine geçiş
- Form verisini normalize etme, doğrulama ve payload üretme
- Saf JavaScript fonksiyonlarıyla test edilebilir iş mantığı yazma
- Temel modül kullanımı: `import` / `export`

## Öğrenme çıktıları

Bölüm sonunda öğrenci:

1. Yerel state, Context ve global state arasındaki farkı açıklar.
2. Props drilling problemini KampüsHub senaryosu üzerinden yorumlar.
3. Redux Toolkit’in Redux kullanımını neden sadeleştirdiğini açıklar.
4. Store, slice, reducer, action, dispatch ve selector kavramlarını ayırt eder.
5. `configureStore` ile temel store kurulumunu kavramsal olarak açıklar.
6. `createSlice` ile reducer ve action üretim mantığını açıklar.
7. React Redux `Provider`, `useSelector` ve `useDispatch` kullanım yerlerini ayırt eder.
8. KampüsHub için duyuru, not ve kullanıcı tercihleri slice’larını tasarlar.
9. Global state içinde tutulması gereken ve tutulmaması gereken verileri ayırır.
10. Redux mantığının saf reducer/selector parçalarını test edilebilir biçimde yazar.

## Ana kavramlar

- Local state
- Global state
- Props drilling
- Store
- Slice
- Reducer
- Action
- Payload
- Dispatch
- Selector
- Provider
- `configureStore`
- `createSlice`
- Immer mantığı
- React Redux Hook’ları
- State ownership
- Derived state
- Normalizasyon
- Debugging / Redux DevTools

## KampüsHub bağlantısı

Bölüm 12’de KampüsHub projesinde şu ilerleme hedeflenmelidir:

- Kullanıcı tercihleri için `preferencesSlice` tasarımı
- Tema, bildirim ve kompakt görünüm tercihlerinin global state olarak modellenmesi
- Duyurular için okunmuş/okunmamış ve sabitlenmiş duyuru durumunun modellenmesi
- Not paylaşımı için yerel form state ile global kayıt listesinin ayrılması
- Header/Navbar üzerinde okunmamış duyuru sayısının gösterilmesi
- Profil sayfası, duyuru sayfası ve ana sayfa arasında ortak state kullanımının açıklanması
- Bölüm 13 REST API entegrasyonuna hazırlık olarak state sınırlarının netleştirilmesi

## Kullanılacak teknik kapsam

Bu bölümde şu konular işlenmelidir:

- State sahipliği ve state kapsamı
- Props drilling ve global state ihtiyacı
- Redux Toolkit’e kavramsal giriş
- Store, slice, reducer ve action kavramları
- `configureStore` ile store kurulumu
- `createSlice` ile state güncelleme mantığı
- React Redux `Provider`, `useSelector`, `useDispatch`
- Selector fonksiyonlarının amacı
- Dispatch ve payload tasarımı
- KampüsHub kullanıcı tercihleri slice’ı
- KampüsHub duyuru slice’ı
- Global state içinde tutulmaması gereken geçici form alanları
- Saf reducer/selector mantığının test edilmesi

## Kapsam dışı konular

Bu bölümde aşağıdaki konular ana kapsam dışı tutulmalıdır:

- Redux Toolkit Query ayrıntıları
- Async thunk ve gelişmiş yan etki yönetimi
- Middleware yazımı
- Entity adapter ayrıntıları
- Normalizasyonun ileri veri tabanı benzeri tasarımları
- Server state ve cache yönetiminin TanStack Query ile ayrıntılı karşılaştırması
- Persisted store / localStorage senkronizasyonu
- Role-based authorization
- Büyük ölçekli domain-driven Redux mimarileri
- TypeScript ileri tip çıkarımı

Bu konular yalnızca sonraki bölümlere köprü kurmak için kısa şekilde anılabilir.

## Kod örneği politikası

Kod örnekleri kısa, öğretici ve test edilebilir olmalıdır. Redux Toolkit kurulumu ve React bileşeni bağlantısı JSX/JavaScript parçalarıyla gösterilebilir; ancak CODE_META ile işaretlenen ana örneklerin çoğu Node ortamında çalışabilecek saf JavaScript mantığından oluşmalıdır. Böylece post-production test hattı reducer, selector, payload ve state sahipliği kararlarını otomatik doğrulayabilir.

Değişken ve fonksiyon adları İngilizce, `camelCase`; slice ve store dosyaları açık adlandırılmış olmalıdır. Açıklama metinleri Türkçe yazılmalıdır.

## CODE_META gereksinimleri

Bölüm 12’de en az 4, tercihen 6 CODE_META bloğu bulunmalıdır. Her çalıştırılabilir kod bloğundan hemen önce HTML yorum biçiminde CODE_META yer almalıdır. CODE_META kesinlikle kod bloğunun içine yazılmamalıdır.

Önerilen örnekler:

1. `react_ch12_code01`: Global state adaylarını kapsamına göre sınıflandırma.
2. `react_ch12_code02`: Kullanıcı tercihleri reducer mantığı.
3. `react_ch12_code03`: Duyuru okunma/sabitlenme reducer mantığı.
4. `react_ch12_code04`: Selector ile okunmamış ve sabitlenmiş duyuruları seçme.
5. `react_ch12_code05`: Dispatch edilecek action payload nesnesini hazırlama.
6. `react_ch12_code06`: KampüsHub global state snapshot özetini üretme.

## Screenshot planı

Bölüm 12’de en az 2, tercihen 3 screenshot marker bulunmalıdır:

- `[SCREENSHOT:b12_01_kampushub_global_state_paneli]`
- `[SCREENSHOT:b12_02_duyuru_state_gorunumu]`
- `[SCREENSHOT:b12_03_tercihler_paneli]`

Her marker için `SCREENSHOT_META` bloğu tanımlanmalıdır. Route yaklaşımı `/__book__/chapter-12/...` biçiminde sürdürülmelidir.

## Pedagojik akış

Bölüm şu öğretim sırasını izlemelidir:

1. Yerel state ile çözülebilen durumların hatırlatılması.
2. Props drilling probleminin KampüsHub örneğiyle açıklanması.
3. Global state’in ne zaman gerekli olduğunun tartışılması.
4. Redux Toolkit’in klasik Redux karmaşıklığını nasıl azalttığının açıklanması.
5. Store, slice, reducer, action ve selector kavramlarının ayrıştırılması.
6. KampüsHub için kullanıcı tercihleri ve duyuru slice’larının modellenmesi.
7. React bileşenlerinin `Provider`, `useSelector` ve `useDispatch` ile bağlanması.
8. CODE_META örnekleriyle reducer/selector mantığının test edilmesi.
9. Sık hatalar, alıştırmalar ve laboratuvar göreviyle bölümün pekiştirilmesi.

## Mini alıştırmalar

- KampüsHub’da hangi bilgilerin local state, hangilerinin global state olması gerektiğini tablo halinde sınıflandırın.
- Duyuru kartları için okunmuş/okunmamış durumunu yöneten bir reducer tasarlayın.
- Kullanıcı tema tercihini değiştiren action payload yapısını önerin.
- Navbar üzerinde okunmamış duyuru sayısını göstermek için selector yazın.
- Geçici arama kutusu değerinin neden global state olmaması gerektiğini tartışın.

## Laboratuvar görevi

Öğrenciden KampüsHub için Redux Toolkit tabanlı küçük bir global state katmanı tasarlaması beklenir. Laboratuvar sonunda aşağıdaki dosyalar kavramsal olarak oluşturulmalıdır:

- `src/store/store.js`
- `src/store/preferencesSlice.js`
- `src/store/announcementsSlice.js`
- `src/components/AppProvider.jsx`
- `src/components/Header.jsx`
- `src/pages/ProfilePage.jsx`
- `src/pages/AnnouncementsPage.jsx`

Laboratuvarın başarı ölçütleri: store kurulumu anlaşılır olmalı, en az iki slice bulunmalı, Header okunmamış duyuru sayısını selector ile okuyabilmeli, profil sayfası tema tercihini dispatch ile değiştirebilmeli ve geçici form alanları gereksiz yere global store’a taşınmamalıdır.

## Kalite kontrol ölçütleri

- Tek H1 kullanılmalıdır.
- Başlık hiyerarşisi tutarlı olmalıdır.
- Markdown Pandoc uyumlu olmalıdır.
- CODE_META blokları kod bloğunun dışında ve koddan hemen önce olmalıdır.
- CODE_META id’leri benzersiz olmalıdır.
- `chapter_id` değeri `chapter_12` olmalıdır.
- En az 4 CODE_META örneği bulunmalıdır.
- Test edilebilir örneklerin beklenen çıktıları tanımlanmalıdır.
- Screenshot marker’ları ve SCREENSHOT_META alanları eksiksiz olmalıdır.
- Redux Toolkit kapsamı başlangıç düzeyinde kalmalı; async thunk, RTK Query ve middleware ayrıntılarına girilmemelidir.
- Türkçe akademik ama sade ders kitabı üslubu korunmalıdır.

## Tam metin üretim talimatı

Bölüm 12 tam metni Pandoc uyumlu Markdown olarak üretilecektir. İçerik tek H1 ile başlamalı, YAML front matter içermeli, KampüsHub kümülatif projesini merkeze almalı ve Bölüm 13 REST API entegrasyonuna köprü kurmalıdır. Kod örnekleri öğretici, kısa ve test edilebilir olmalı; React/Redux Toolkit bileşen bağlantıları gerekli yerlerde açıklayıcı örnek olarak verilmelidir. Bölüm sonunda kavramsal sorular, programlama alıştırmaları, hata ayıklama egzersizi ve haftalık laboratuvar/proje görevi yer almalıdır.
