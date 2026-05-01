# React ile Web Uygulama Geliştirme

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-active-success)](https://bmdersleri.github.io/react-web/)
[![Language](https://img.shields.io/badge/language-JavaScript-yellow)](./kodlar)
[![Book](https://img.shields.io/badge/book-React%20ile%20Web%20Uygulama%20Geliştirme-blue)](./manifests/book_manifest.yaml)
[![Code Examples](https://img.shields.io/badge/code%20examples-88-brightgreen)](./kodlar)

Bu depo, **React ile Web Uygulama Geliştirme: KampüsHub Projesiyle Adım Adım React** kitabı için hazırlanmış eşlik deposudur. Depoda kitap bölümleri, bölüm bazlı JavaScript/React kod örnekleri, BookFactory manifest dosyaları, GitHub Pages dokümantasyon sayfaları ve üretim sürecini destekleyen yardımcı yapılandırmalar yer alır.

Kitap, modern web geliştirmeye girişten başlayarak React bileşen mantığı, JSX, props, state, hooks, routing, form yönetimi, REST API kullanımı, TanStack Query, Redux Toolkit, Zustand, test, performans ve dağıtım konularını **KampüsHub** adlı öğretim amaçlı kümülatif uygulama üzerinden ele alır.

---

## İçerik Özeti

| Özellik | Açıklama |
|---|---|
| Kitap adı | React ile Web Uygulama Geliştirme |
| Alt başlık | KampüsHub Projesiyle Adım Adım React |
| Yazar | Prof. Dr. İsmail KIRBAŞ |
| Dil | Türkçe |
| Bölüm sayısı | 16 |
| Kod örneği sayısı | 88 |
| Ana teknoloji | JavaScript, React, Vite |
| Yayın/dokümantasyon | GitHub Pages |
| Üretim yaklaşımı | BookFactory manifest tabanlı kitap üretim hattı |

---

## Kitabın Hedefi

Bu çalışma, React öğrenen öğrenciler ve öğretim elemanları için yalnızca kavram anlatımı sunan bir kaynak değildir. Her bölümde kavramlar, küçük ve test edilebilir kod örnekleriyle ilişkilendirilir; ilerleyen bölümlerde ise bu örnekler KampüsHub uygulaması etrafında bütünleşik bir yapıya dönüşür.

Depodaki içerikler şu amaçlarla kullanılabilir:

- Kitaptaki bölümleri Markdown formatında incelemek.
- Bölüm bazlı kod örneklerine doğrudan erişmek.
- QR kod veya GitHub Pages bağlantıları üzerinden kodları görüntülemek.
- Kod örneklerini ders, laboratuvar veya bireysel çalışma materyali olarak kullanmak.
- BookFactory tabanlı kitap üretim sürecini izlemek ve geliştirmek.

---

## Teknoloji Kapsamı

Kitap ve depo ağırlıklı olarak aşağıdaki teknolojilere odaklanır:

- **React 19**
- **Vite**
- **React Router v7**
- **TanStack Query**
- **Redux Toolkit**
- **Zustand**
- **React Hook Form**
- **Vitest**
- **React Testing Library**
- **user-event**
- **MSW**
- **GitHub Pages**
- **Jekyll tabanlı dokümantasyon**

Kapsam dışında tutulan başlıca konular:

- Next.js, SSR ve SSG
- React Native
- GraphQL / Apollo
- Backend, ORM ve veritabanı geliştirme
- Sınıf bileşenleri merkezli eski React yaklaşımı

---

## Depo Yapısı

```text
react-web/
├── .github/
│   └── workflows/
│       └── pages.yml              # GitHub Pages dağıtım iş akışı
├── assets/
│   └── final/                     # Nihai görsel/çıktı varlıkları
├── chapters/                      # Kitabın bölüm Markdown dosyaları
├── configs/                       # Yapılandırma dosyaları
├── docs/                          # GitHub Pages dokümantasyon sitesi
│   ├── index.md
│   ├── kodlar/
│   ├── Gemfile
│   └── _config.yml
├── kodlar/                        # Bölüm bazlı kod örnekleri
│   ├── bolum01/
│   ├── bolum02/
│   ├── ...
│   └── bolum16/
├── manifests/
│   └── book_manifest.yaml         # Kitap için temel manifest dosyası
├── pandoc/                        # Dönüştürme / yayınlama yardımcıları
├── prompts/
│   └── chapter_inputs/            # Bölüm üretim promptları
├── .bookfactory                   # BookFactory işaret/ayar dosyası
└── README.md
```

---

## Bölümler

| No | Bölüm |
|---:|---|
| 1 | Modern Web'e Giriş |
| 2 | JavaScript ES6+ ve React |
| 3 | HTML/CSS ve Bileşen Düşüncesi |
| 4 | JSX ve Bileşen Anatomisi |
| 5 | Props ve Veri Akışı |
| 6 | State Yönetimi |
| 7 | useEffect ve Yan Etkiler |
| 8 | İleri Hooks |
| 9 | Custom Hooks |
| 10 | React Router |
| 11 | Form Yönetimi |
| 12 | Redux Toolkit |
| 13 | REST API |
| 14 | Zustand |
| 15 | Performans, Test ve Dağıtım |
| 16 | KampüsHub Final |

Bölüm metinleri `chapters/` klasöründe, ilgili kod örnekleri ise `kodlar/bolumXX/` klasörlerinde yer alır.

---

## Kod Örneklerine Erişim

Kod örnekleri bölüm bazlı klasörlerde tutulur:

```text
kodlar/
├── bolum01/
│   ├── kod01/
│   ├── kod02/
│   └── kod03/
├── bolum02/
│   ├── kod01/
│   ├── kod02/
│   └── ...
└── bolum16/
```

Kod indeksine şu dosyadan ulaşılabilir:

```text
kodlar/README.md
```

GitHub Pages üzerinden kod örnekleri daha okunabilir bir biçimde görüntülenebilir:

```text
https://bmdersleri.github.io/react-web/
```

---

## Yerel Kullanım

Depoyu bilgisayarınıza klonlamak için:

```bash
git clone https://github.com/bmdersleri/react-web.git
cd react-web
```

Bölüm metinlerini incelemek için:

```bash
ls chapters
```

Kod örneklerini incelemek için:

```bash
ls kodlar
```

Belirli bir bölümün kodlarına gitmek için:

```bash
cd kodlar/bolum01
```

---

## GitHub Pages Sitesini Yerelde Çalıştırma

Dokümantasyon sitesi `docs/` klasörü altında Jekyll ile yapılandırılmıştır. Yerelde çalıştırmak için Ruby ve Bundler kurulu olmalıdır.

```bash
cd docs
bundle install
bundle exec jekyll serve
```

Ardından tarayıcıdan genellikle şu adrese gidilebilir:

```text
http://localhost:4000
```

GitHub Actions iş akışı, `main` dalına yapılan gönderimlerden sonra `docs/` klasörünü GitHub Pages olarak derleyip dağıtacak şekilde yapılandırılmıştır.

---

## BookFactory Manifesti

Kitap üretim sürecinin ana yapılandırma dosyası:

```text
manifests/book_manifest.yaml
```

Bu dosya aşağıdaki bilgileri merkezi olarak yönetir:

- Kitap başlığı, alt başlığı, yazar ve sürüm bilgisi
- Dil ve çıktı ayarları
- Bölüm listesi ve dosya adları
- Kullanılan teknoloji yığını
- Kapsam dışı bırakılan konular
- Kalite kontrol ve üretim kapıları
- Kod çıkarma, test ve dokümantasyon üretimi ayarları

Manifest dosyası, kitap üretim sürecinde **tek doğruluk kaynağı** olarak düşünülmelidir.

---

## Önerilen Çalışma Akışı

Yeni bir bölüm veya kod örneği eklerken önerilen sıra:

1. İlgili bölüm metnini `chapters/` klasöründe güncelleyin.
2. Bölümdeki kod bloklarını `kodlar/bolumXX/kodYY/` yapısına uygun biçimde ekleyin.
3. Gerekirse `kodlar/README.md` kod indeksini güncelleyin.
4. GitHub Pages dokümantasyonunu `docs/` altında kontrol edin.
5. Manifestte bölüm adı, dosya adı veya durum değişikliği varsa `manifests/book_manifest.yaml` dosyasını güncelleyin.
6. Değişiklikleri commit edip `main` dalına gönderin.
7. GitHub Pages dağıtımının başarıyla tamamlandığını Actions sekmesinden kontrol edin.

---

## Kalite Kontrol İlkeleri

Bu depo ders kitabı eşlik deposu olarak kullanılacağı için aşağıdaki kalite ilkeleri önerilir:

- Her kod örneği bağımsız, okunabilir ve çalıştırılabilir olmalıdır.
- Kod dosyası adları açıklayıcı olmalıdır.
- Bölüm metni ile kod örneği arasında doğrudan ilişki kurulmalıdır.
- Kod örnekleri mümkün olduğunca küçük, öğretici ve test edilebilir tutulmalıdır.
- Erişilebilirlik, okunabilirlik ve modern React idiomları gözetilmelidir.
- Üretim hattı çıktıları manuel olarak değil, mümkün olduğunca otomasyonla güncellenmelidir.

---

## GitHub Pages Dağıtımı

Depoda `.github/workflows/pages.yml` dosyası ile GitHub Pages dağıtımı tanımlanmıştır. İş akışı özetle şu işlemleri yapar:

1. Depoyu checkout eder.
2. Ruby ortamını hazırlar.
3. `docs/` klasöründeki Jekyll sitesini derler.
4. Oluşan siteyi GitHub Pages ortamına yükler.
5. Yayını GitHub Pages üzerinden erişilebilir hâle getirir.

Yayın adresi:

```text
https://bmdersleri.github.io/react-web/
```

---

## Katkı ve Geliştirme Notları

Bu depo öncelikle kitap üretim ve öğretim materyali deposu olarak düzenlenmiştir. Katkı yaparken şu kurallara dikkat edilmesi önerilir:

- Bölüm dosyaları Markdown biçimini korumalıdır.
- Kod örnekleri bölüm/kod hiyerarşisine uygun eklenmelidir.
- Dosya adlarında Türkçe karakter, boşluk ve özel karakter kullanımından kaçınılmalıdır.
- Kodlar mümkünse test edilmiş ve yalın tutulmalıdır.
- Büyük yapısal değişikliklerde önce manifest dosyası güncellenmelidir.
- GitHub Pages çıktısı bozulmamalıdır.

---

## Lisans

Bu depoda henüz açık bir `LICENSE` dosyası görünmüyorsa, içeriğin yeniden kullanımı, dağıtımı ve türetilmiş çalışmalar için bir lisans dosyası eklenmesi önerilir.

Önerilebilecek seçenekler:

- Kitap metni için: Creative Commons lisansları
- Kod örnekleri için: MIT License veya benzeri açık kaynak lisansları

Lisans seçimi yapılmadan önce kitap metni, kod örnekleri ve görsel varlıklar için ayrı kullanım politikaları belirlenmelidir.

---

## Kaynak Bağlantılar

- GitHub deposu: <https://github.com/bmdersleri/react-web>
- GitHub Pages sitesi: <https://bmdersleri.github.io/react-web/>
- Kitap manifesti: [`manifests/book_manifest.yaml`](./manifests/book_manifest.yaml)
- Bölümler: [`chapters/`](./chapters)
- Kod örnekleri: [`kodlar/`](./kodlar)
- Dokümantasyon sitesi: [`docs/`](./docs)

---

## Kısa Tanım

**React ile Web Uygulama Geliştirme**, modern React ekosistemini KampüsHub adlı öğretim amaçlı uygulama üzerinden adım adım öğreten, bölüm bazlı kod örnekleri ve GitHub Pages destekli açık erişimli bir kitap eşlik deposudur.
