---
title: "Bölüm 13: REST API Entegrasyonu"
chapter_id: "chapter_13"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
year: "2026"
status: "draft"
---

# Bölüm 13: REST API Entegrasyonu

## 13.1 Bölümün yol haritası

Önceki bölümlerde KampüsHub uygulamasının temel istemci tarafı mimarisi kuruldu. Bölüm 10’da sayfalar arası geçişler React Router ile düzenlendi. Bölüm 11’de kullanıcıdan veri alma, form doğrulama ve gönderim akışı ele alındı. Bölüm 12’de ise uygulama genelinde paylaşılması gereken state’in Redux Toolkit ile nasıl daha öngörülebilir hâle getirilebileceği tartışıldı. Bu bölümde uygulamanın yalnızca tarayıcı içinde çalışan statik bir arayüz olmaktan çıkıp dış sistemlerle konuşabilen bir front-end uygulamasına dönüşmesi hedeflenir.

KampüsHub açısından bu geçiş oldukça önemlidir. Duyurular artık yalnızca dosya içinde tanımlanmış bir dizi olmayabilir; öğrenci işleri sistemi, bölüm sekreterliği ya da kulüp yönetim paneli tarafından yayınlanan veriler API üzerinden gelebilir. Etkinlikler bir takvim servisinden alınabilir. Not paylaşımı formu yalnızca ekranda gösterilmekle kalmayıp sunucuya gönderilebilir. Profil tercihleri ise farklı cihazlarda korunmak üzere bir backend servisine kaydedilebilir.

Bu bölümün amacı backend geliştirmek değildir. Amaç, React uygulamasının REST API ile nasıl konuştuğunu, veri çekme sürecinde hangi durumların yönetilmesi gerektiğini ve API yanıtlarının arayüze doğrudan bağlanmadan önce neden düzenlenmesi gerektiğini öğretmektir. Böylece öğrenci, gerçek bir web uygulamasında front-end kodunun yalnızca bileşenlerden değil; aynı zamanda veri alma, hata yönetimi, durum geçişleri ve kullanıcı geri bildirimi katmanlarından oluştuğunu görür.

## 13.2 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

1. REST API kavramını modern front-end geliştirme bağlamında açıklar.
2. Endpoint, HTTP method, request, response, status code, header ve body kavramlarını ayırt eder.
3. `fetch` ile temel GET ve POST isteklerinin nasıl kurulduğunu açıklar.
4. API yanıtlarını kullanıcı arayüzünde göstermeden önce normalize etme ihtiyacını kavrar.
5. Loading, error ve success durumlarını ayrı state alanları olarak modelleyebilir.
6. KampüsHub için duyuru, etkinlik, not ve profil tercihleri endpoint taslağı oluşturabilir.
7. `useEffect` içinde veri çekmenin temel akışını ve sınırlılıklarını açıklar.
8. Eski API yanıtlarının güncel arayüz durumunu ezmemesi için basit koruma stratejilerini yorumlar.
9. Form verisinin POST isteğine dönüştürülme adımlarını açıklar.
10. TanStack Query gibi veri senkronizasyon kütüphanelerine neden ihtiyaç duyulabileceğini kavrar.

## 13.3 Ön bilgiler

Bu bölümü verimli takip edebilmek için öğrencinin JavaScript tarafında `Promise`, `async/await`, `try/catch`, dizi nesne işlemleri ve JSON kavramlarına aşina olması gerekir. React tarafında ise `useState`, `useEffect`, props, özel hook mantığı, React Router ile sayfa bileşenleri ve form gönderimi bilgisi önemlidir. Bölüm 12’de görülen global state düşüncesi de bu bölümde dolaylı olarak kullanılır; çünkü API’den alınan bazı veriler bileşen içinde kalırken bazıları global state veya özel veri yönetim katmanına taşınabilir.

Bu bölümde gerçek bir backend servisi kurmayacağız. Bunun yerine KampüsHub için gerçekçi endpoint adları ve mock veri yapıları kullanacağız. Böylece öğrencinin dikkati sunucu kurulumuna değil, front-end tarafındaki veri akışına odaklanır. Kod örneklerinin çoğu Node ortamında test edilebilen saf JavaScript fonksiyonlarıdır. Bu tercih, kod doğrulama hattının çalışmasını kolaylaştırır ve öğrencinin API mantığını React bileşenlerinden bağımsız olarak kavramasına yardımcı olur.

## 13.4 Statik veri ile API verisi arasındaki fark

React öğrenirken ilk örneklerde veri genellikle dosya içindeki sabit dizilerden gelir. Örneğin KampüsHub duyuruları şu şekilde tanımlanabilir:

```text
announcements = [
  { id: "a1", title: "Vize takvimi yayınlandı" },
  { id: "a2", title: "Kariyer günleri başlıyor" }
]
```

Bu yaklaşım öğrenme aşamasında faydalıdır. Öğrenci bileşenleri, props akışını, listelemeyi ve koşullu render mantığını rahatça deneyebilir. Ancak gerçek uygulamada duyuruların kod dosyası içine yazılması sürdürülebilir değildir. Duyuru eklemek için uygulama kodunun yeniden derlenmesi ve dağıtılması gerekmez; bu verinin bir yönetim panelinden girilip API aracılığıyla front-end uygulamasına ulaşması beklenir.

API verisi, zamanla değişen ve genellikle dış sistemlerden gelen veridir. Bu nedenle statik veriden farklı olarak gecikme, hata, boş yanıt, yetki problemi, ağ kesintisi, farklı veri biçimleri ve güncellik sorunu gibi durumları beraberinde getirir. Front-end geliştirici bu durumları kullanıcı deneyimini bozmayacak şekilde yönetmelidir.

KampüsHub örneğinde duyurular sayfası açıldığında kullanıcıya önce bir yükleniyor durumu gösterilebilir. Veri başarılı gelirse duyuru kartları listelenir. Hata oluşursa teknik hata mesajı yerine “Duyurular şu anda yüklenemedi” gibi anlaşılır bir geri bildirim verilir. Veri boş gelirse de bu durum hata gibi değil, “Henüz duyuru bulunmuyor” gibi ayrı bir durum olarak ele alınır.

## 13.5 REST API nedir?

REST API, istemci ile sunucu arasında kaynak odaklı bir iletişim modeli kurar. Burada kaynak, uygulamada üzerinde işlem yapılan anlamlı varlıktır. KampüsHub için duyurular, etkinlikler, notlar ve profil tercihleri birer kaynak olarak düşünülebilir. Bu kaynaklara URL biçimindeki endpoint’ler üzerinden erişilir.

Örneğin `/api/announcements` endpoint’i duyuru koleksiyonunu temsil edebilir. `/api/announcements/a1` ise belirli bir duyuruyu temsil eder. Bu endpoint’ler üzerinde hangi işlemin yapılacağını HTTP method belirler. `GET` veri almak, `POST` yeni veri oluşturmak, `PATCH` kısmi güncelleme yapmak ve `DELETE` veri silmek için kullanılabilir.

REST yaklaşımında front-end tarafı genellikle şu sorulara cevap arar:

- Hangi kaynağa erişeceğim?
- Bu kaynak için hangi endpoint kullanılacak?
- Veri almak mı, yeni veri göndermek mi, güncellemek mi istiyorum?
- İstek gövdesinde hangi veri gönderilecek?
- Sunucudan gelen status code ne anlama geliyor?
- Yanıt JSON biçiminde mi, başka bir biçimde mi?
- Hata oluşursa kullanıcıya ne gösterilecek?

Bu sorulara sistematik cevap verebilmek, React uygulamasının veri katmanını daha düzenli hâle getirir.

## 13.6 KampüsHub API haritası

KampüsHub için başlangıç düzeyinde aşağıdaki endpoint haritası yeterlidir:

| Senaryo | HTTP method | Endpoint | Açıklama |
|---|---:|---|---|
| Duyuru listesini alma | GET | `/api/announcements` | Duyuru kartları için liste verisi döner. |
| Tekil duyuru detayı | GET | `/api/announcements/:announcementId` | React Router parametresiyle ilişkilidir. |
| Etkinlikleri filtreleme | GET | `/api/events?category=...` | Kulüp, akademik veya sosyal etkinlik filtresi uygulanabilir. |
| Not paylaşımı | POST | `/api/notes` | Formdan gelen veri sunucuya gönderilir. |
| Profil tercihlerini güncelleme | PATCH | `/api/profile/preferences` | Tema ve bildirim tercihleri güncellenir. |

Bu tablo, backend sözleşmesinin front-end açısından nasıl okunacağını gösterir. React geliştiricisi her endpoint’in hangi veriyi beklediğini ve hangi veriyi döndürdüğünü bilmelidir. Büyük projelerde bu bilgiler OpenAPI/Swagger dokümantasyonu, API sözleşme dosyaları veya ekip içi teknik dokümanlar üzerinden takip edilir. Bu kitapta ise kavramsal öğrenmeyi desteklemek için sade endpoint adları kullanılacaktır.

<!-- CODE_META
id: react_ch13_code01
chapter_id: chapter_13
language: javascript
kind: example
title: "KampüsHub endpoint ve query string üretimi"
file: "chapter_13/react_ch13_code01_endpoint_builder.js"
extract: true
test: compile_run_assert
expected_stdout: "/api/events?category=academic&limit=5"
-->

```javascript
function buildEndpoint(resource, params = {}) {
  const basePaths = {
    announcements: "/api/announcements",
    events: "/api/events",
    notes: "/api/notes",
    preferences: "/api/profile/preferences",
  };

  const basePath = basePaths[resource];
  if (!basePath) {
    throw new Error(`Unknown resource: ${resource}`);
  }

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

console.log(buildEndpoint("events", { category: "academic", limit: 5 }));
```

Bu örnekte endpoint üretimi React bileşeninin içine gömülmemiştir. Ayrı bir yardımcı fonksiyon olarak yazıldığı için test edilebilir, yeniden kullanılabilir ve hata ayıklaması daha kolaydır. Öğrencinin burada fark etmesi gereken nokta şudur: API iletişimi büyüdükçe URL oluşturma, request hazırlama ve yanıt dönüştürme kodlarının bileşenlerden ayrılması mimari kaliteyi artırır.

## 13.7 HTTP metotları ve kullanım senaryoları

HTTP metotları, istemcinin sunucudan ne yapmak istediğini ifade eder. Front-end tarafında en sık karşılaşılan metotlar `GET`, `POST`, `PUT`, `PATCH` ve `DELETE` biçimindedir. Her metodun anlamı farklıdır.

`GET`, veri almak için kullanılır. KampüsHub duyuru listesi veya etkinlik takvimi bu yolla alınabilir. `GET` isteğinde genellikle request body kullanılmaz; filtreler URL query string üzerinden gönderilir. Örneğin `/api/events?category=social` sosyal etkinlikleri listeleyebilir.

`POST`, yeni bir kaynak oluşturmak için kullanılır. Not paylaşımı formu gönderildiğinde `/api/notes` endpoint’ine `POST` isteği yapılabilir. Bu isteğin body bölümünde not başlığı, ders adı, açıklama ve etiketler gibi bilgiler bulunur.

`PUT`, bir kaynağın tamamını güncellemek için kullanılır. `PATCH` ise genellikle kısmi güncelleme anlamına gelir. Profil tercihleri örneğinde yalnızca tema bilgisini değiştirmek istiyorsak `PATCH /api/profile/preferences` daha uygun bir model olabilir.

`DELETE`, var olan bir kaynağı silmek için kullanılır. Bu bölümde silme işlemini ayrıntılı ele almayacağız; çünkü yetki, onay ve geri alma gibi ek kullanıcı deneyimi kararları gerektirir.

## 13.8 Fetch API’ye giriş

Tarayıcı ortamında HTTP isteği yapmak için en temel modern araçlardan biri Fetch API’dir. `fetch()` fonksiyonu bir URL veya Request nesnesi alır ve bir `Promise` döndürür. Bu promise, sunucudan yanıt başlıkları geldiğinde `Response` nesnesiyle çözülür. Yanıtın JSON gövdesini okumak için genellikle `response.json()` kullanılır.

Temel bir GET isteği kavramsal olarak şöyle düşünülür:

```text
1. Endpoint belirlenir.
2. fetch(endpoint) çağrılır.
3. Response status kontrol edilir.
4. JSON gövdesi okunur.
5. Veri arayüz state’ine aktarılır.
6. Hata varsa kullanıcıya uygun mesaj gösterilir.
```

Burada önemli bir ayrıntı vardır: `fetch()` teknik olarak sunucudan bir yanıt aldığında promise’i çözebilir; HTTP status değeri 404 veya 500 olsa bile bu durum otomatik olarak JavaScript hatası fırlatmak zorunda değildir. Bu nedenle front-end kodunda `response.ok` veya status code kontrolü yapılmalıdır. Aksi hâlde başarısız bir API yanıtı yanlışlıkla başarılı veri gibi ele alınabilir.

## 13.9 API yanıtını normalize etme

API’den gelen veri her zaman arayüzün doğrudan kullanmak istediği biçimde olmayabilir. Backend alan adları farklı olabilir, tarih alanları ham ISO formatında gelebilir veya bazı alanlar eksik olabilir. Front-end tarafında bu veriyi bileşenlerin beklediği sade modele dönüştürmek çoğu zaman daha sağlıklıdır.

KampüsHub duyuru kartı şu alanlara ihtiyaç duyabilir:

- `id`
- `title`
- `summary`
- `category`
- `isPinned`
- `publishedLabel`

Backend ise tarihi `published_at`, sabitleme bilgisini `pinned` ve açıklamayı `description` adıyla gönderebilir. Bu durumda bileşenin her yerde backend alan adlarını bilmesi yerine, service katmanında normalize edilmiş bir model üretmek daha temizdir.

<!-- CODE_META
id: react_ch13_code02
chapter_id: chapter_13
language: javascript
kind: example
title: "API duyuru yanıtını KampüsHub kart modeline dönüştürme"
file: "chapter_13/react_ch13_code02_response_normalizer.js"
extract: true
test: compile_run_assert
expected_stdout: "2 duyuru | ilk: Vize takvimi yayınlandı | pinned: true"
-->

```javascript
const apiResponse = {
  data: [
    {
      announcement_id: "a1",
      heading: "Vize takvimi yayınlandı",
      description: "Bilgisayar mühendisliği vize takvimi güncellendi.",
      category: "academic",
      pinned: true,
      published_at: "2026-04-20T09:00:00Z",
    },
    {
      announcement_id: "a2",
      heading: "Kariyer günleri başlıyor",
      description: "Sektör temsilcileri öğrencilerle buluşacak.",
      category: "career",
      pinned: false,
      published_at: "2026-04-22T12:30:00Z",
    },
  ],
};

function normalizeAnnouncement(item) {
  return {
    id: item.announcement_id,
    title: item.heading,
    summary: item.description,
    category: item.category,
    isPinned: Boolean(item.pinned),
    publishedLabel: item.published_at.slice(0, 10),
  };
}

const announcements = apiResponse.data.map(normalizeAnnouncement);
console.log(
  `${announcements.length} duyuru | ilk: ${announcements[0].title} | pinned: ${announcements[0].isPinned}`
);
```

Bu örnek küçük görünse de gerçek projelerde önemli bir mimari alışkanlığı temsil eder. Bileşenler mümkün olduğunca backend’in ham veri biçimine bağımlı olmamalıdır. Böylece backend alan adı değişse bile güncelleme tek bir dönüşüm fonksiyonunda yapılabilir.

## 13.10 HTTP status kontrolü ve hata mesajı

API entegrasyonunda hata yönetimi yalnızca `try/catch` yazmaktan ibaret değildir. Hatanın kaynağı ağ kesintisi, sunucu hatası, yetkisiz erişim, bulunamayan kaynak veya geçersiz form verisi olabilir. Kullanıcıya gösterilecek mesaj ise teknik ayrıntıları değil, yapılabilir bir eylemi içermelidir.

Örneğin `500 Internal Server Error` mesajını doğrudan göstermek yerine “Duyurular şu anda yüklenemedi. Birkaç dakika sonra tekrar deneyin.” ifadesi daha uygundur. `404` durumunda “Aradığınız duyuru bulunamadı.” denebilir. `401` için ise oturum bağlamı gerekir; bu bölümde kimlik doğrulama ayrıntılarına girmiyoruz.

<!-- CODE_META
id: react_ch13_code03
chapter_id: chapter_13
language: javascript
kind: example
title: "HTTP status değerinden kullanıcı dostu hata mesajı üretme"
file: "chapter_13/react_ch13_code03_http_status_guard.js"
extract: true
test: compile_run_assert
expected_stdout: "404: Aradığınız duyuru bulunamadı."
-->

```javascript
function getApiErrorMessage(status, resourceName) {
  if (status === 400) return `${resourceName} isteği geçersiz görünüyor.`;
  if (status === 401) return "Bu işlem için oturum açmanız gerekiyor.";
  if (status === 403) return "Bu işlem için yetkiniz bulunmuyor.";
  if (status === 404) return `Aradığınız ${resourceName.toLowerCase()} bulunamadı.`;
  if (status >= 500) return "Sunucu tarafında geçici bir sorun oluştu.";
  return "Beklenmeyen bir API hatası oluştu.";
}

const status = 404;
const message = getApiErrorMessage(status, "Duyuru");
console.log(`${status}: ${message}`);
```

Bu tür küçük yardımcı fonksiyonlar, kullanıcı deneyimini tutarlı hâle getirir. Aynı hata durumunun farklı sayfalarda farklı kelimelerle gösterilmesi yerine merkezi bir hata mesajı politikası oluşturulabilir.

## 13.11 Loading, error ve success durumları

API isteği asenkron olduğu için arayüzde tek bir “veri var” durumu yeterli değildir. En az üç temel durum düşünülmelidir: yükleniyor, hata ve başarı. Bazı senaryolarda boş veri, yeniden deneme, güncelleniyor veya arka planda yenileniyor gibi ek durumlar da gerekir. Ancak başlangıç için loading/error/success ayrımı yeterlidir.

KampüsHub duyurular sayfası için state modeli şöyle olabilir:

```text
status: "idle" | "loading" | "success" | "error"
data: []
errorMessage: ""
```

`idle`, isteğin henüz başlamadığını gösterir. `loading`, veri çekme sürecini temsil eder. `success`, verinin başarıyla alındığını belirtir. `error`, kullanıcıya bir hata mesajı gösterilmesi gerektiğini ifade eder.

<!-- CODE_META
id: react_ch13_code04
chapter_id: chapter_13
language: javascript
kind: example
title: "Loading/error/success state geçişlerini modelleme"
file: "chapter_13/react_ch13_code04_loading_state_reducer.js"
extract: true
test: compile_run_assert
expected_stdout: "success | data: 2 | error: yok"
-->

```javascript
const initialState = {
  status: "idle",
  data: [],
  errorMessage: "",
};

function apiStateReducer(state, action) {
  switch (action.type) {
    case "requestStarted":
      return { ...state, status: "loading", errorMessage: "" };
    case "requestSucceeded":
      return { ...state, status: "success", data: action.payload, errorMessage: "" };
    case "requestFailed":
      return { ...state, status: "error", errorMessage: action.payload };
    default:
      return state;
  }
}

let state = initialState;
state = apiStateReducer(state, { type: "requestStarted" });
state = apiStateReducer(state, {
  type: "requestSucceeded",
  payload: ["Vize takvimi", "Kariyer günleri"],
});

console.log(`${state.status} | data: ${state.data.length} | error: ${state.errorMessage || "yok"}`);
```

Bu örnek Redux Toolkit kullanmadan da state geçişlerinin nasıl düşünülebileceğini gösterir. Asıl amaç, API isteğinin görsel karşılıklarının açık şekilde modellenmesidir. Kullanıcı boş ekranda beklememeli, hata oluştuğunda ne olduğunu anlayabilmeli ve veri geldiğinde arayüz kararlı biçimde güncellenmelidir.

## 13.12 `useEffect` ile veri çekme mantığı

React bileşenlerinde veri çekme işlemi genellikle bileşen ekrana geldiğinde başlatılır. Bu davranış için `useEffect` kullanılabilir. Örneğin duyurular sayfası mount olduğunda `/api/announcements` endpoint’inden veri istenebilir. Ancak bu yaklaşımın manuel sorumlulukları vardır: loading state ayarlanmalı, hata yakalanmalı, bileşen unmount olduğunda eski isteğin sonucu dikkatle ele alınmalı ve gereksiz tekrar istekleri engellenmelidir.

Kavramsal akış şu şekildedir:

```text
1. Bileşen ilk render edilir.
2. useEffect çalışır.
3. Loading state true yapılır.
4. API isteği gönderilir.
5. Yanıt başarılıysa veri state’e aktarılır.
6. Hata varsa error state güncellenir.
7. Loading state false yapılır.
```

Bu akış basit uygulamalarda yeterli olabilir. Ancak büyük uygulamalarda cache, yeniden deneme, arka planda güncelleme, stale data, pagination ve invalidation gibi ihtiyaçlar ortaya çıkar. Bu nedenle ilerleyen aşamalarda TanStack Query gibi veri senkronizasyon kütüphaneleri gündeme gelir.

Bu bölümde `useEffect` içindeki veri çekme kodunu ayrıntılı JSX örneğine dönüştürmek yerine, mantığı test edilebilir parçalara ayırmayı tercih ediyoruz. Öğrenci önce request durumu, endpoint üretimi, yanıt dönüştürme ve hata mesajı üretme gibi alt problemleri çözmelidir. Daha sonra bu parçalar React bileşenine bağlanabilir.

## 13.13 Eski yanıt problemi ve güncellik

API entegrasyonunda sık görülen sorunlardan biri, eski bir isteğin yeni arayüz durumunu ezmesidir. Örneğin kullanıcı etkinlik kategorisini hızlıca “akademik”ten “sosyal”e değiştirsin. İlk istek daha geç dönerse sosyal etkinlikler seçiliyken ekranda akademik sonuçlar görünebilir. Bu durum stale response yani güncelliğini yitirmiş yanıt problemi olarak düşünülebilir.

Gerçek projelerde bu problem `AbortController`, istek iptali, request id takibi veya veri senkronizasyon kütüphaneleriyle yönetilebilir. Başlangıç düzeyinde en anlaşılır model, her isteğe artan bir kimlik verip yalnızca en yeni isteğin sonucunu kabul etmektir.

<!-- CODE_META
id: react_ch13_code05
chapter_id: chapter_13
language: javascript
kind: example
title: "Eski API yanıtının güncel sonucu ezmesini engelleme"
file: "chapter_13/react_ch13_code05_stale_response_guard.js"
extract: true
test: compile_run_assert
expected_stdout: "accepted: social | ignored: academic"
-->

```javascript
const responses = [
  { requestId: 1, category: "academic", items: ["Seminer"] },
  { requestId: 2, category: "social", items: ["Kulüp buluşması"] },
];

function decideResponseUsage(response, latestRequestId) {
  return response.requestId === latestRequestId ? "accepted" : "ignored";
}

const latestRequestId = 2;
const academicUsage = decideResponseUsage(responses[0], latestRequestId);
const socialUsage = decideResponseUsage(responses[1], latestRequestId);

console.log(`${socialUsage}: ${responses[1].category} | ${academicUsage}: ${responses[0].category}`);
```

Bu örnek, gerçek ağ isteğini iptal etmez; yalnızca geç gelen yanıtın arayüz state’ini güncellemesini engeller. Büyük projelerde bu yaklaşım daha gelişmiş araçlarla desteklenir. Yine de başlangıç öğrencisi için önemli olan nokta, asenkron işlemlerde “en son kullanıcı niyeti” ile “en son tamamlanan istek” kavramlarının her zaman aynı olmayabileceğini fark etmektir.

## 13.14 POST isteği ve form verisi

Bölüm 11’de formlardan veri toplamayı öğrenmiştik. Bu bölümde aynı verinin API isteğine nasıl dönüştürüleceğini ele alıyoruz. Not paylaşımı senaryosunda kullanıcı başlık, ders adı, açıklama ve etiketler girer. Form gönderildiğinde bu veri bir payload nesnesine dönüştürülür ve `POST /api/notes` endpoint’ine gönderilir.

POST isteğinde genellikle şu bilgiler bulunur:

- `method: "POST"`
- `headers: { "Content-Type": "application/json" }`
- `body: JSON.stringify(payload)`

Burada `Content-Type` başlığı, sunucuya gönderilen gövdenin JSON olduğunu belirtir. `body` alanı ise JavaScript nesnesinin string hâline getirilmiş biçimidir. Front-end geliştirici payload içeriğini göndermeden önce en azından temel doğrulamalardan geçirmelidir.

<!-- CODE_META
id: react_ch13_code06
chapter_id: chapter_13
language: javascript
kind: example
title: "Not paylaşımı için POST request taslağı üretme"
file: "chapter_13/react_ch13_code06_post_note_request.js"
extract: true
test: compile_run_assert
expected_stdout: "POST /api/notes | bodyTitle: React API Notları | valid: true"
-->

```javascript
function createNotePayload(formValues) {
  return {
    title: formValues.title.trim(),
    course: formValues.course.trim(),
    description: formValues.description.trim(),
    tags: formValues.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

function isValidNotePayload(payload) {
  return payload.title.length >= 3 && payload.course.length >= 2 && payload.description.length >= 10;
}

function createPostRequest(endpoint, payload) {
  return {
    url: endpoint,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  };
}

const payload = createNotePayload({
  title: " React API Notları ",
  course: " React ",
  description: "REST API entegrasyonu için özet not.",
  tags: "api, fetch, react",
});

const request = createPostRequest("/api/notes", payload);
const body = JSON.parse(request.options.body);
console.log(`${request.options.method} ${request.url} | bodyTitle: ${body.title} | valid: ${isValidNotePayload(payload)}`);
```

Bu örnekte gerçek HTTP isteği yapılmaz. Bunun yerine request nesnesinin nasıl hazırlanacağı gösterilir. Bu yaklaşım test için uygundur; çünkü internet bağlantısına veya gerçek backend servisine ihtiyaç duymaz. Gerçek uygulamada bu nesne `fetch(request.url, request.options)` çağrısıyla kullanılabilir.

## 13.15 API service katmanı tasarlama

React bileşenleri doğrudan `fetch` ayrıntılarıyla dolduğunda okunabilirlik azalır. Bu nedenle API isteklerini ayrı bir service katmanına taşımak iyi bir alışkanlıktır. Örneğin `src/services/announcementService.js` dosyasında `getAnnouncements`, `getAnnouncementById` ve `getEvents` gibi fonksiyonlar bulunabilir. Bileşen ise bu fonksiyonları çağırır ve yalnızca arayüz state’iyle ilgilenir.

KampüsHub için başlangıç düzeyinde şu klasörleme düşünülebilir:

```text
src/
  services/
    apiClient.js
    announcementService.js
    eventService.js
    noteService.js
  pages/
    AnnouncementsPage.jsx
    EventsPage.jsx
    NotesPage.jsx
```

`apiClient.js`, ortak `fetch` ayarlarını, status kontrolünü ve JSON okuma mantığını içerebilir. Service dosyaları ise belirli kaynaklara ait endpoint fonksiyonlarını barındırır. Bu ayrım, ileride backend URL’si değiştiğinde veya ortak header eklemek gerektiğinde bakım kolaylığı sağlar.

Service katmanı tasarlarken aşırı soyutlama yapmamak gerekir. Başlangıç düzeyindeki amaç, her bileşenin içine karmaşık `fetch` kodu yazmayı engellemek ve tekrar eden kodları makul ölçüde toplamaktır. Çok erken soyutlama, öğrenme sürecini zorlaştırabilir.

## 13.16 Veri çekme ve global state ilişkisi

API’den gelen her veri global state’e taşınmak zorunda değildir. Bu karar, Bölüm 12’deki global state ölçütleriyle birlikte düşünülmelidir. Bir sayfanın yalnızca kendi içinde kullandığı kısa ömürlü veri, ilgili sayfa bileşeninde kalabilir. Uygulamanın farklı yerlerinde kullanılan, güncelliği önemli olan veya kullanıcı deneyimini genel olarak etkileyen veri ise global state ya da veri senkronizasyon katmanına taşınabilir.

Örneğin duyuru detay sayfasındaki tekil duyuru verisi yalnızca o sayfada gösteriliyorsa yerel state yeterli olabilir. Ancak Header bileşeninde okunmamış duyuru sayısı gösterilecekse bu sayı global store’dan veya merkezi bir query cache’inden okunabilir. Benzer şekilde profil tercihleri hem profil sayfasını hem tema sistemini hem de navbar görünümünü etkiliyorsa global state adayıdır.

Bu bölümde API verisini doğrudan Redux Toolkit’e bağlamıyoruz. Çünkü önce HTTP iletişiminin temel modelinin anlaşılması gerekir. Daha sonraki mimari adımlarda API verisinin global state, özel hook veya TanStack Query ile nasıl daha düzenli yönetileceği tartışılabilir.

## 13.17 TanStack Query’ye köprü

Manuel `fetch` ve `useEffect` yaklaşımı öğretici olsa da büyük uygulamalarda tekrarlı kod üretir. Her sayfada loading state, error state, yeniden deneme, cache, stale data ve invalidation gibi konular tekrar tekrar ele alınır. TanStack Query, React uygulamalarında sunucu state’ini yönetmek için bu problemleri daha sistematik şekilde çözmeyi amaçlar.

Bu bölümde TanStack Query’nin ayrıntılı kullanımına girmiyoruz. Ancak öğrencinin şu ayrımı fark etmesi önemlidir: Redux Toolkit daha çok istemci tarafı uygulama state’i için kullanılırken, TanStack Query sunucudan gelen ve yeniden senkronize edilmesi gereken server state için güçlü bir araçtır. Örneğin tema tercihi, açık modal bilgisi veya seçili sekme istemci state’i olarak düşünülebilir. Duyuru listesi, etkinlik takvimi veya notlar ise sunucu state’i niteliği taşıyabilir.

Bir sonraki aşamalarda KampüsHub uygulamasında bu ayrım daha belirgin hâle gelecektir. Bu bölümün görevi, öğrenciyi doğrudan ileri kütüphane API’lerine boğmadan veri çekme probleminin doğasını anlamaya hazırlamaktır.

## 13.18 Programatik ekran çıktısı planı

Bu bölümde ekran görüntüleri, API durumlarının arayüzde nasıl temsil edildiğini göstermek için kullanılacaktır. Amaç, yalnızca güzel bir ekran üretmek değil; loading, success ve error durumlarının öğrencinin zihninde somutlaşmasını sağlamaktır.

<!-- SCREENSHOT_META
id: b13_01_duyuru_api_loading_success
chapter: chapter_13
figure: "Şekil 13.1"
title: "Duyuru API loading ve success görünümü"
route: "/__book__/chapter-13/duyuru-api-loading-success"
waitFor: "[data-book-shot='b13_01_duyuru_api_loading_success']"
actions: []
output: "assets/auto/chapter_13/b13_01_duyuru_api_loading_success.png"
caption: "KampüsHub duyurular sayfasında API verisi yüklenirken ve başarıyla geldikten sonra gösterilen arayüz durumları."
markdownTarget: "[SCREENSHOT:b13_01_duyuru_api_loading_success]"
-->

[SCREENSHOT:b13_01_duyuru_api_loading_success]

<!-- SCREENSHOT_META
id: b13_02_api_hata_durumu
chapter: chapter_13
figure: "Şekil 13.2"
title: "API hata durumu görünümü"
route: "/__book__/chapter-13/api-hata-durumu"
waitFor: "[data-book-shot='b13_02_api_hata_durumu']"
actions: []
output: "assets/auto/chapter_13/b13_02_api_hata_durumu.png"
caption: "API isteği başarısız olduğunda kullanıcıya teknik ayrıntı yerine sade ve eyleme dönük hata mesajı gösterilmesi."
markdownTarget: "[SCREENSHOT:b13_02_api_hata_durumu]"
-->

[SCREENSHOT:b13_02_api_hata_durumu]

<!-- SCREENSHOT_META
id: b13_03_not_paylasimi_post_akis
chapter: chapter_13
figure: "Şekil 13.3"
title: "Not paylaşımı POST akışı"
route: "/__book__/chapter-13/not-paylasimi-post-akis"
waitFor: "[data-book-shot='b13_03_not_paylasimi_post_akis']"
actions: []
output: "assets/auto/chapter_13/b13_03_not_paylasimi_post_akis.png"
caption: "Not paylaşımı formundan elde edilen verinin POST request payload nesnesine dönüştürülmesi."
markdownTarget: "[SCREENSHOT:b13_03_not_paylasimi_post_akis]"
-->

[SCREENSHOT:b13_03_not_paylasimi_post_akis]

## 13.19 CODE_META ve test edilebilir kod örnekleri

Bu bölümdeki kod örnekleri gerçek internete çıkmadan test edilebilecek şekilde tasarlanmıştır. Bunun iki nedeni vardır. Birincisi, kitap üretim hattındaki test otomasyonunun kararlı çalışması gerekir. İkincisi, öğrencinin önce API mantığını bağımsız parçalara ayırarak öğrenmesi daha sağlıklıdır. Endpoint üretimi, response normalization, status kontrolü ve payload hazırlama gibi işlemler React bileşeni olmadan da test edilebilir.

Bölümde toplam altı CODE_META örneği yer almaktadır. Bu örnekler şunları kapsar:

1. Endpoint ve query string üretimi
2. API yanıtını arayüz modeline dönüştürme
3. HTTP status değerinden kullanıcı dostu hata mesajı üretme
4. Loading/error/success state geçişlerini modelleme
5. Eski yanıtın güncel arayüz durumunu ezmesini engelleme
6. Not paylaşımı için POST request taslağı üretme

Bu örneklerin tamamı Node ortamında çalışacak biçimde saf JavaScript olarak yazılmıştır. Gerçek React bileşenlerine bağlama aşaması laboratuvar görevi içinde yapılacaktır.

## 13.20 Sık yapılan hatalar ve yanlış sezgiler

API entegrasyonunda en yaygın hata, verinin her zaman hızlı ve başarılı geleceğini varsaymaktır. Gerçek kullanıcı ortamında ağ gecikmesi, mobil bağlantı, sunucu yoğunluğu veya geçici servis kesintisi yaşanabilir. Bu nedenle loading ve error durumları arayüz tasarımının sonradan eklenen ayrıntıları değil, temel parçalarıdır.

İkinci hata, API’den gelen veriyi hiç dönüştürmeden bileşenlere dağıtmaktır. Başlangıçta bu kolay görünür; ancak backend alan adları değiştiğinde uygulamanın birçok bileşeni etkilenir. Normalize edilmiş model kullanmak, bileşenlerin daha kararlı ve anlaşılır kalmasını sağlar.

Üçüncü hata, tüm API verisini global state’e taşımaktır. Sunucudan gelen her veri global store’a alınırsa store kısa sürede karmaşıklaşır. Hangi verinin yerel state, hangi verinin global state, hangi verinin query cache içinde tutulacağı ayrı ayrı değerlendirilmelidir.

Dördüncü hata, teknik hata mesajlarını doğrudan kullanıcıya göstermektir. Kullanıcı “TypeError: Failed to fetch” mesajından ne yapacağını anlamaz. Bunun yerine kısa, anlaşılır ve gerekirse yeniden denemeye yönlendiren mesajlar tercih edilmelidir.

Beşinci hata, `useEffect` bağımlılık dizisini yanlış yönetmektir. Gereksiz bağımlılıklar sonsuz istek döngülerine neden olabilir; eksik bağımlılıklar ise eski değerlerle çalışan istekler oluşturabilir. Bu nedenle veri çekme mantığı büyüdükçe özel hook veya veri senkronizasyon kütüphanesi kullanmak daha sürdürülebilir hâle gelir.

## 13.21 Hata ayıklama egzersizi

Aşağıdaki senaryoda KampüsHub duyurular sayfası bazen yanlış kategori sonuçlarını göstermektedir. Kullanıcı önce “akademik” kategorisini, hemen ardından “sosyal” kategorisini seçmektedir. Ağ gecikmesi nedeniyle akademik isteği sosyal isteğinden daha geç tamamlanmakta ve ekranı ezmektedir.

Öğrenciden beklenenler:

1. Problemin nedenini asenkron yanıt sırası açısından açıklayın.
2. Bu problemi “en son tamamlanan istek” ve “en son kullanıcı niyeti” kavramlarıyla yorumlayın.
3. Request id takibiyle nasıl çözülebileceğini sözde kodla gösterin.
4. Alternatif olarak `AbortController` veya veri senkronizasyon kütüphanesi kullanımının hangi noktada gündeme gelebileceğini açıklayın.

Bu egzersizde amaç çalışan bir React bileşeni yazmak değil, API entegrasyonunda zamanlama problemini doğru teşhis etmektir.

## 13.22 Bölüm özeti ve terim sözlüğü

Bu bölümde KampüsHub uygulamasının dış sistemlerden veri alabilmesi için REST API entegrasyonunun temel kavramları ele alındı. Endpoint, HTTP method, request, response, status code, JSON, loading state, error state ve response normalization kavramları KampüsHub senaryoları üzerinden açıklandı. `fetch` ile veri çekmenin temel modeli anlatıldı; ancak büyük uygulamalarda manuel `useEffect` tabanlı yaklaşımın sınırlılıkları da vurgulandı.

**REST API:** Kaynak odaklı istemci-sunucu iletişim modeli.

**Endpoint:** Belirli bir kaynağa veya işleme karşılık gelen API URL’i.

**HTTP method:** İsteğin amacını belirten yöntem. Örneğin `GET`, `POST`, `PATCH`.

**Request:** İstemcinin sunucuya gönderdiği istek.

**Response:** Sunucunun istemciye döndürdüğü yanıt.

**Status code:** HTTP yanıtının başarı veya hata durumunu gösteren sayısal kod.

**JSON:** Front-end ve backend arasında sık kullanılan veri değişim biçimi.

**Loading state:** API isteği sürerken arayüzün bekleme durumunu temsil eden state.

**Error state:** API isteği başarısız olduğunda kullanıcıya geri bildirim vermeyi sağlayan state.

**Normalization:** API’den gelen ham veriyi arayüzün beklediği modele dönüştürme işlemi.

**Stale response:** Güncelliğini yitirmiş, artık kullanıcının son niyetini temsil etmeyen API yanıtı.

## 13.23 Kavramsal sorular

1. Statik veri ile API’den gelen veri arasında kullanıcı deneyimi açısından hangi farklar vardır?
2. `GET` ve `POST` metotlarını KampüsHub senaryoları üzerinden karşılaştırınız.
3. `fetch()` çağrısından sonra neden HTTP status kontrolü yapılmalıdır?
4. API’den gelen veriyi bileşenlerde doğrudan kullanmak hangi bakım problemlerine yol açabilir?
5. Loading, error ve success durumları neden ayrı ayrı modellenmelidir?
6. Eski bir API yanıtı güncel arayüz durumunu nasıl bozabilir?
7. API verisi ne zaman yerel state’te, ne zaman global state’te tutulmalıdır?
8. TanStack Query gibi kütüphaneler manuel `useEffect` yaklaşımının hangi sınırlılıklarını azaltabilir?

## 13.24 Programlama alıştırmaları

1. KampüsHub için `/api/courses`, `/api/clubs` ve `/api/messages` endpoint’lerini içeren bir endpoint haritası tasarlayın.
2. Etkinlikleri tarih ve kategoriye göre filtreleyen bir query string üretme fonksiyonu yazın.
3. API’den gelen `snake_case` alan adlarını React bileşeninin kullanacağı `camelCase` modele dönüştüren bir normalization fonksiyonu yazın.
4. `404`, `500` ve `403` durumları için kullanıcı dostu hata mesajları üreten bir yardımcı fonksiyon geliştirin.
5. Not paylaşımı formundan gelen veriyi POST payload’ına dönüştürüp temel doğrulama yapan bir fonksiyon yazın.
6. Request id takibiyle eski API yanıtlarını yok sayan küçük bir simülasyon hazırlayın.

## 13.25 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub uygulamasında mock API service katmanı oluşturmaktır. Öğrenci gerçek backend kurmadan, promise döndüren fonksiyonlarla API davranışını taklit edecektir. Görevin amacı React bileşenlerini doğrudan statik dizilere bağlamak yerine service fonksiyonları üzerinden veri almaktır.

Laboratuvar adımları:

1. `src/services/announcementService.js` dosyasını oluşturun.
2. `getAnnouncements()` fonksiyonunu promise döndürecek şekilde yazın.
3. Fonksiyona bilinçli gecikme ekleyerek loading durumunu görünür hâle getirin.
4. `AnnouncementsPage` bileşeninde loading, error ve success durumlarını ayrı ayrı gösterin.
5. Hata senaryosunu test etmek için service fonksiyonuna isteğe bağlı `shouldFail` parametresi ekleyin.
6. Not paylaşımı formundaki veriyi `createNoteRequest()` fonksiyonu ile POST request taslağına dönüştürün.
7. Ekran çıktısı planına uygun olarak loading/success, error ve POST akışı görünümlerini hazırlayın.

Teslimde beklenenler:

- Service dosyalarının ekran görüntüsü veya kod çıktısı
- Duyurular sayfasında loading ve success görünümü
- Hata durumunda kullanıcı dostu mesaj
- Not paylaşımı için üretilen POST payload örneği
- Kısa değerlendirme: Hangi veriler yerel state’te kaldı, hangileri global state adayıdır?

## 13.26 İleri okuma ve bir sonraki bölüme köprü

Bu bölüm, API entegrasyonunun temel mantığını öğretmek için manuel `fetch` ve test edilebilir saf fonksiyonlar üzerine kuruldu. Ancak gerçek projelerde API verisinin cache’lenmesi, yeniden denenmesi, arka planda güncellenmesi ve stale data durumlarının yönetilmesi daha gelişmiş araçlar gerektirebilir. Bu nedenle TanStack Query gibi kütüphaneler modern React uygulamalarında önemli bir yer tutar.

Bir sonraki bölümde KampüsHub uygulamasının daha hafif istemci tarafı state ihtiyaçları ele alınacaktır. Redux Toolkit’in daha merkezi ve kurallı yaklaşımından sonra Zustand ile daha az kodla state yönetimi yapmanın hangi durumlarda avantaj sağlayabileceği tartışılacaktır. Böylece öğrenci, her state problemi için aynı aracı kullanmak yerine problem türüne göre araç seçmeyi öğrenmeye devam edecektir.
