# Bölüm 11 Girdi Promptu — Form Yönetimi

## Bölüm kimliği

- Kitap: **React ile Web Uygulama Geliştirme**
- Alt başlık: **KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme**
- Ana proje: **KampüsHub**
- Bölüm ID: `chapter_11`
- Bölüm dosyası: `workspace/react/chapters/chapter_11_form_yonetimi.md`
- Girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_11_input.md`
- Manifest başlığı: **Bölüm 11: Form Yönetimi**

## Bölüm başlığı

**Bölüm 11: Form Yönetimi**

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 10’da kurulan React Router sayfa iskeleti üzerine KampüsHub uygulamasının veri giriş ekranlarını yerleştirir. Profil düzenleme, not paylaşımı, duyuru/etkinlik arama ve basit geri bildirim formları artık yalnızca görsel alanlar değil, doğrulanan, kullanıcıya geri bildirim veren ve gönderime hazırlanan arayüz parçaları olarak ele alınır.

Bölüm 11, Bölüm 12’deki global state yönetimi ve Bölüm 13’teki REST API entegrasyonu için doğrudan hazırlık niteliğindedir. Bu nedenle form verisinin nasıl tutulduğu, nasıl doğrulandığı, nasıl sade bir payload nesnesine dönüştürüldüğü ve hata durumlarının kullanıcıya nasıl gösterildiği özellikle vurgulanmalıdır.

## Ön koşullar

Öğrencinin şu konuları bildiği varsayılmalıdır:

- JSX ve fonksiyon bileşenleri
- Props ve state kullanımı
- `useState` ile yerel bileşen durumu yönetimi
- Olay işleyiciler: `onClick`, `onChange`, `onSubmit`
- React Router ile sayfa bileşenlerine geçiş
- Saf JavaScript fonksiyonlarıyla test edilebilir yardımcı mantık yazma
- Temel HTML form elemanları: `form`, `input`, `textarea`, `select`, `button`, `label`

## Öğrenme çıktıları

Bölüm sonunda öğrenci:

1. HTML form davranışı ile React form yönetimi arasındaki farkı açıklar.
2. Kontrollü ve kontrolsüz form elemanlarını ayırt eder.
3. `value`, `checked`, `defaultValue`, `onChange` ve `onSubmit` ilişkisini temel düzeyde kullanır.
4. Metin kutusu, çok satırlı metin alanı, seçim kutusu ve onay kutusu için doğru state modelini kurar.
5. Form gönderiminde varsayılan tarayıcı yenilemesini neden engellemesi gerektiğini açıklar.
6. KampüsHub profil ve not paylaşımı formları için basit doğrulama kuralları tanımlar.
7. Hata mesajı, touched/dirty alan ve gönderim durumu gibi kullanıcı geri bildirimi kavramlarını kullanır.
8. Form verisini API’ye gönderilmeye uygun sade payload nesnesine dönüştürür.
9. React Hook Form’un hangi probleme çözüm getirdiğini temel düzeyde açıklar.
10. Form mantığının hangi kısımlarının saf JavaScript ile test edilebileceğini ayırt eder.

## Ana kavramlar

- Form state
- Controlled component
- Uncontrolled component
- `value` / `checked`
- `defaultValue` / `defaultChecked`
- `onChange`
- `onSubmit`
- `preventDefault`
- `FormData`
- Validation
- Error message
- Touched field
- Dirty field
- Submit state
- Payload
- React Hook Form
- Accessibility / erişilebilirlik

## KampüsHub bağlantısı

Bölüm 11’de KampüsHub projesinde şu ilerleme hedeflenmelidir:

- Profil düzenleme formunun temel state modeli
- Not paylaşımı formunun başlık, açıklama, ders, etiket ve görünürlük alanları
- Etkinlik/duyuru arama formu için basit filtre alanları
- Hata mesajlarının ve zorunlu alan kontrollerinin kullanıcıya gösterilmesi
- Form gönderiminden önce verinin sadeleştirilmesi
- İleride API entegrasyonuna aktarılacak payload nesnesinin hazırlanması

## Kullanılacak teknik kapsam

Bu bölümde şu konular işlenmelidir:

- HTML form davranışının React’te nasıl ele alındığı
- Kontrollü form elemanları
- Kontrolsüz form elemanlarına kısa bakış
- Tek alanlı ve çok alanlı form state yönetimi
- `name` tabanlı genel `handleChange` yaklaşımı
- Checkbox ve select alanlarının özel durumları
- `textarea` kullanımı
- `onSubmit` ve `event.preventDefault()`
- Basit doğrulama fonksiyonları
- Hata mesajı ve touched/dirty mantığı
- Form gönderimi için payload hazırlama
- React Hook Form’a kavramsal giriş
- KampüsHub profil ve not paylaşımı formlarına uygulama

## Kapsam dışı konular

Bu bölümde aşağıdaki konular ana kapsam dışı tutulmalıdır:

- Backend API entegrasyonu
- Gerçek kimlik doğrulama ve yetkilendirme
- Çok adımlı wizard form mimarisi
- Zod/Yup gibi şema doğrulama kütüphanelerinin ayrıntıları
- React Hook Form `Controller`, `useFieldArray` ve ileri validasyon kalıpları
- Server Actions / progressive enhancement ayrıntıları
- Dosya yükleme ve büyük medya formları
- Redux Toolkit ile global form state
- Uluslararasılaştırma ve gelişmiş erişilebilirlik denetimleri

Bu konular yalnızca sonraki bölümlere köprü kurmak için kısa notlarla anılabilir.

## Kod örneği politikası

Kod örnekleri kısa, öğretici ve test edilebilir olmalıdır. React bileşeni gerektiren kavramlar metin ve küçük JSX parçalarıyla açıklanabilir; ancak CODE_META ile işaretlenen ana örneklerin çoğu Node ortamında çalışabilecek saf JavaScript fonksiyonları olmalıdır. Böylece post-production test hattı, form mantığının doğrulama, payload üretimi, dirty alan tespiti ve hata gösterim kararlarını otomatik test edebilir.

Değişken ve fonksiyon adları İngilizce, `camelCase`; bileşen adları `PascalCase` olmalıdır. Açıklama metinleri Türkçe yazılmalıdır.

## CODE_META gereksinimleri

Bölüm 11’de en az 4, tercihen 6 test edilebilir CODE_META örneği bulunmalıdır. Önerilen örnekler:

1. `react_ch11_code01`: Profil form verisini normalize etme.
2. `react_ch11_code02`: Profil formu doğrulama hatalarını üretme.
3. `react_ch11_code03`: `name/value` yaklaşımıyla form alanı güncelleme.
4. `react_ch11_code04`: Dirty alanları tespit etme.
5. `react_ch11_code05`: Not paylaşımı formundan payload üretme.
6. `react_ch11_code06`: Touched/submitted durumuna göre hata mesajı gösterme kararı.

Her çalıştırılabilir kod bloğundan önce CODE_META HTML yorum bloğu kullanılmalıdır. CODE_META kod bloğunun içine yazılmamalıdır.

## Screenshot planı

Bölüm 11’de en az 2, tercihen 3 screenshot marker bulunmalıdır:

- `[SCREENSHOT:b11_01_profil_duzenleme_formu]`
- `[SCREENSHOT:b11_02_not_paylasimi_form_validasyonu]`
- `[SCREENSHOT:b11_03_form_hata_durumlari]`

Her marker için `SCREENSHOT_META` alanları eksiksiz tanımlanmalıdır. Önerilen route yaklaşımı:

- `/__book__/chapter-11/profil-duzenleme-formu`
- `/__book__/chapter-11/not-paylasimi-form-validasyonu`
- `/__book__/chapter-11/form-hata-durumlari`

## Pedagojik akış

1. Form yönetiminin neden ayrı bir tasarım konusu olduğu açıklanır.
2. HTML form davranışı ile React state ilişkisi karşılaştırılır.
3. Kontrollü ve kontrolsüz bileşen ayrımı örneklenir.
4. KampüsHub profil formu üzerinden çok alanlı state modeli kurulur.
5. Checkbox, select ve textarea gibi alanların özel durumları açıklanır.
6. Submit davranışı, `preventDefault` ve payload hazırlama ele alınır.
7. Doğrulama ve hata mesajı üretimi saf fonksiyonlarla test edilebilir hale getirilir.
8. React Hook Form’a kısa giriş yapılır.
9. Bölüm sonu soruları, mini alıştırmalar ve laboratuvar görevi verilir.

## Mini alıştırmalar

- Profil formuna “telefon numarası” alanı ekleyiniz ve basit doğrulama yazınız.
- Not paylaşımı formunda boş etiketleri payload’dan çıkarınız.
- `dirtyFields` mantığını yalnızca değişen alan adlarını döndürecek şekilde geliştiriniz.
- Zorunlu alan hatasını yalnızca alan ziyaret edildikten sonra gösteriniz.
- `select` alanında ders kategorisi seçilmediğinde hata üretiniz.

## Laboratuvar görevi

KampüsHub içinde `/profile` sayfasında profil düzenleme formu, `/notes` sayfasında not paylaşımı formu oluşturulmalıdır. Formlar kontrollü bileşen yaklaşımıyla yönetilmeli, en az üç doğrulama kuralı içermeli ve gönderim anında API’ye gönderilmeye hazır bir payload nesnesi üretmelidir. Gerçek backend çağrısı yapılmayacak; payload konsola yazdırılacak veya sayfada önizleme olarak gösterilecektir.

## Kalite kontrol ölçütleri

- Tek H1 kullanılmalı.
- YAML front matter bulunmalı.
- Bölüm başlığı manifest ile uyumlu olmalı.
- CODE_META blokları koddan hemen önce yer almalı.
- `chapter_id` değeri `chapter_11` olmalı.
- En az 4 CODE_META örneği bulunmalı.
- Kod örneklerinin çoğu Node ortamında test edilebilir olmalı.
- En az 2 screenshot marker ve bunlara karşılık gelen SCREENSHOT_META bloğu bulunmalı.
- Markdown Pandoc uyumlu olmalı.
- Sık yapılan hatalar, hata ayıklama egzersizi, kavramsal sorular, programlama alıştırmaları ve laboratuvar görevi bulunmalı.
- Kapsam dışı ileri konular ana anlatımı gölgelememeli.

## Tam metin üretim talimatı

Bölüm 11 tam metni ders kitabı üslubunda, Türkçe, akıcı ve akademik fakat sade bir dille yazılmalıdır. Anlatım, KampüsHub projesi üzerinden kümülatif ilerlemeli; örnekler öğrencinin yerel Vite + React projesinde deneyebileceği biçimde sunulmalıdır. Tam metin, kod doğrulama hattına uygun CODE_META örneklerini, programatik ekran çıktısı planını ve bölüm sonu değerlendirme bileşenlerini içermelidir.
