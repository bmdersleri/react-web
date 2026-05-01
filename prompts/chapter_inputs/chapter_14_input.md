# Bölüm 14 Girdi Promptu — Hafif State Yönetimi — Zustand

## Bölüm kimliği

- Kitap: React ile Web Uygulama Geliştirme
- Alt başlık: KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme
- Bölüm ID: `chapter_14`
- Bölüm no: `14`
- Hedef bölüm dosyası: `workspace/react/chapters/chapter_14_zustand.md`
- Hedef girdi promptu dosyası: `workspace/react/prompts/chapter_inputs/chapter_14_input.md`

## Bölüm başlığı

Bölüm 14: Hafif State Yönetimi — Zustand

## Bölümün kitap içindeki yeri

Bu bölüm, Bölüm 12’de görülen Redux Toolkit yaklaşımı ile Bölüm 13’te başlayan API verisi yönetimi arasında daha hafif bir global state alternatifi sunar. Öğrenci, her global state probleminin Redux Toolkit gerektirmediğini; tema, kullanıcı tercihleri, arayüz panelleri, filtreler ve geçici istemci tarafı durumları için Zustand gibi küçük ve doğrudan kütüphanelerin daha sade bir çözüm sağlayabileceğini öğrenir.

## Ön koşullar

- React bileşenleri, props ve state bilgisi
- `useState`, `useEffect`, özel hook ve selector sezgisi
- React Router ile KampüsHub sayfa yapısı
- Form yönetimi ve kullanıcı tercihleri akışı
- Redux Toolkit bölümünden action/reducer/store kavramlarına giriş düzeyinde aşinalık
- REST API bölümünden istemci tarafı veri ve arayüz state ayrımı

## Öğrenme çıktıları

Bu bölüm sonunda öğrenci:

1. Hafif global state ihtiyacını Redux Toolkit gerektiren senaryolardan ayırır.
2. Zustand store mantığını ve hook tabanlı kullanım modelini açıklar.
3. State ve action alanlarını aynı store içinde sade biçimde düzenleyebilir.
4. Selector kullanarak bileşenin yalnızca ihtiyaç duyduğu state parçasını okumasını tasarlar.
5. KampüsHub için tema, bildirim tercihi, duyuru filtresi ve arayüz paneli store’u kurgular.
6. Store güncellemelerinde doğrudan mutasyon yerine yeni nesne üretme yaklaşımını uygular.
7. `persist` mantığını yerel tercihlerin saklanması bağlamında yorumlar.
8. Zustand ile Redux Toolkit arasında seçim yaparken pedagojik ve mimari ölçütler kullanır.

## Ana kavramlar

- Lightweight global state
- Store
- Action
- Selector
- Derived state
- Subscription
- Immutable update
- Persisted preference
- Local UI state
- Client-side preference
- Store boundary
- Redux Toolkit / Zustand karşılaştırması

## KampüsHub bağlantısı

Bölümde KampüsHub için aşağıdaki senaryolar kullanılmalıdır:

- Tema tercihini uygulama genelinde paylaşma
- Bildirim açık/kapalı tercihini saklama
- Duyuru kategorisi filtresini farklı bileşenlerde kullanma
- Mobil menü veya yan panel açık/kapalı durumunu yönetme
- Profil tercihlerini yerel state, global store ve API state açısından sınıflandırma
- Redux Toolkit’in gereksiz kalabileceği küçük arayüz durumlarını ayırt etme

Önerilen KampüsHub store alanları:

```text
preferences: { theme, notificationsEnabled, compactMode }
announcementFilter: { category, onlyPinned }
ui: { sidebarOpen, activePanel }
```

## Kullanılacak teknik kapsam

- Zustand’ın kavramsal store yaklaşımı
- `create` ile hook tabanlı store üretme
- State + action modelleme
- Selector kullanımı
- Basit derived state mantığı
- Immutable update örüntüleri
- `persist` middleware’ine giriş
- Redux Toolkit ile karşılaştırmalı karar ölçütleri
- Node ortamında test edilebilir saf JavaScript store simülasyonları

## Kapsam dışı konular

- Redux Toolkit’in ileri async thunk ve RTK Query ayrıntıları
- Zustand middleware zincirlerinin ileri bileşimi
- Immer entegrasyonu
- SSR / Next.js hydration problemleri
- Authentication store ve token güvenliği
- Offline-first veri senkronizasyonu
- TanStack Query cache mimarisi
- Büyük ölçekli domain store tasarımı
- Mikro front-end state paylaşımı

## Kod örneği politikası

- Kod örnekleri kısa, test edilebilir ve KampüsHub senaryosuna bağlı olmalıdır.
- Çalıştırılabilir her kod bloğundan önce `CODE_META` HTML yorum bloğu bulunmalıdır.
- Kod bloklarının içinde `CODE_META` yer almamalıdır.
- Node ortamında harici paket kurulumuna ihtiyaç duymayan saf JavaScript örnekleri öncelenmelidir.
- Gerçek Zustand/React kodları öğretici amaçla verilecekse test hattı açısından `test: skip` kullanılabilir; fakat bu bölümde ana örnekler saf fonksiyonlarla test edilebilir kurulmalıdır.

## CODE_META gereksinimleri

Bölüm 14’te en az 4, tercihen 6 CODE_META örneği bulunmalıdır. Önerilen örnekler:

1. `react_ch14_code01_create_preference_store`: KampüsHub tercih store başlangıç modeli.
2. `react_ch14_code02_update_preferences`: Tema ve bildirim tercihlerini immutable güncelleme.
3. `react_ch14_code03_announcement_selector`: Duyuru filtresi için selector mantığı.
4. `react_ch14_code04_subscription_simulation`: Seçici abonelik ve değişim bildirimi simülasyonu.
5. `react_ch14_code05_persist_partial_state`: Yalnızca kalıcı tercihleri serileştirme.
6. `react_ch14_code06_state_tool_decision`: Redux Toolkit / Zustand / local state karar yardımcısı.

## Screenshot planı

En az 2, tercihen 3 screenshot marker kullanılmalıdır:

```text
[SCREENSHOT:b14_01_tercih_paneli_zustand]
[SCREENSHOT:b14_02_duyuru_filtre_store]
[SCREENSHOT:b14_03_persist_tema_tercihi]
```

Her marker için `SCREENSHOT_META` tanımlanmalıdır. Route yaklaşımı:

```text
/__book__/chapter-14/tercih-paneli-zustand
/__book__/chapter-14/duyuru-filtre-store
/__book__/chapter-14/persist-tema-tercihi
```

## Pedagojik akış

1. Redux Toolkit bölümünü hatırlatarak her state probleminin aynı ağırlıkta olmadığını açıklayın.
2. Local state, hafif global state ve kurumsal global state ayrımını tabloyla gösterin.
3. Zustand store kavramını action ve selector kavramlarıyla tanıtın.
4. KampüsHub tercihleri üzerinden küçük bir store tasarlayın.
5. Duyuru filtresi ve arayüz paneli gibi durumların neden hafif store için uygun olduğunu tartışın.
6. Selector kullanımının yeniden render ve bağımlılık yönetimi açısından önemini anlatın.
7. Persist yaklaşımını tema tercihi üzerinden açıklayın.
8. Redux Toolkit ile Zustand arasında karar verme matrisi oluşturun.
9. Bölümü TanStack Query ve nihai KampüsHub mimarisine köprüyle bitirin.

## Mini alıştırmalar

- KampüsHub tema tercihi için store alanlarını belirleme
- Duyuru filtresini selector ile hesaplama
- Bildirim tercihlerini kalıcı ve geçici state olarak sınıflandırma
- Redux Toolkit yerine Zustand seçilebilecek üç senaryo yazma
- Store sınırını yanlış genişleten örneği düzeltme

## Laboratuvar görevi

Öğrenci KampüsHub uygulamasında kullanıcı tercihleri için hafif bir Zustand store tasarlamalı; tema, bildirim ve kompakt görünüm tercihlerini güncelleyebilmeli; duyuru kategorisi filtresini store üzerinden yönetmeli; tercihlerin hangilerinin kalıcı saklanacağını gerekçelendirmelidir.

## Kalite kontrol ölçütleri

- Tek H1 bulunmalı.
- Başlık hiyerarşisi tutarlı olmalı.
- `chapter_id` tüm CODE_META bloklarında `chapter_14` olmalı.
- En az 4 CODE_META örneği bulunmalı.
- Kod blokları içinde `CODE_META` yer almamalı.
- En az 2 screenshot marker ve karşılık gelen SCREENSHOT_META bulunmalı.
- Redux Toolkit ile karşılaştırma dengeli ve kapsam dışı konulara taşmadan yapılmalı.
- KampüsHub sürekliliği korunmalı.
- Bölüm sonunda sorular, alıştırmalar ve laboratuvar görevi bulunmalı.

## Tam metin üretim talimatı

Pandoc uyumlu Markdown üret. Akademik fakat sade Türkçe kullan. Bölümü ders kitabı üslubuyla yaz. Her kavramı önce açıklayıp sonra KampüsHub örneğine bağla. Zustand’ı Redux Toolkit’in yerine geçen mutlak bir çözüm gibi değil, belirli hafif istemci tarafı state problemleri için uygun bir araç olarak konumlandır. İleri konuları gereğinden fazla açma; SSR, authentication, TanStack Query ve middleware zincirlerini yalnızca sonraki bölümlere köprü olarak an.
