---
title: "Bölüm 5: Props — Bileşenler Arası Veri Akışı"
chapter_id: "chapter_05"
content_language: "tr-TR"
book_title: "React ile Web Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
main_project: "KampüsHub"
numbering_policy: "manual_visible_for_current_pipeline"
automation_profile: "parametric_computer_book_factory_v2_0"
code_policy: "CODE_META blocks precede executable JavaScript fences"
screenshot_policy: "SCREENSHOT_META plus [SCREENSHOT:*] markers"
---

# Bölüm 5: Props — Bileşenler Arası Veri Akışı

## 5.1 Bölümün yol haritası

Bu bölümde React bileşenlerinin dışarıdan veri alarak nasıl yeniden kullanılabilir hâle geldiği ele alınacaktır. Önceki bölümde KampüsHub arayüzü `Header`, `HeroSection`, `DashboardPreview`, `ModuleCard` ve `Footer` gibi bileşenlere ayrılmıştı. Bu ayrım ilk bakışta düzenli görünür; ancak statik yazılmış bir `ModuleCard` bileşeni her yerde aynı başlığı, aynı açıklamayı ve aynı durumu gösteriyorsa gerçek anlamda yeniden kullanılabilir değildir. React’te bu problemi çözen temel mekanizma `props` yapısıdır.

`props`, bir bileşene dışarıdan aktarılan verileri ifade eder. Parent bileşen, child bileşene hangi veriyi göstereceğini söyler; child bileşen ise aldığı veriye göre arayüz üretir. Bu model, React’in tek yönlü veri akışı yaklaşımının ilk somut örneğidir. Verinin nereden geldiği ve hangi bileşene aktarıldığı açık kaldığında uygulama büyüse bile arayüzün davranışı daha kolay izlenir.

Bölümün temel soruları şunlardır:

- Statik bileşen neden kısa sürede yetersiz kalır?
- `props` nedir ve bir bileşene nasıl aktarılır?
- Parent ve child bileşenler arasındaki veri akışı nasıl okunur?
- String, number, boolean, array, object ve function türündeki değerler prop olarak nasıl verilir?
- Destructuring ile prop okuma neden daha okunabilir bir kod sağlar?
- Liste verisi `map` ile bileşenlere nasıl dönüştürülür?
- `key` değeri neden gereklidir?
- KampüsHub modül kartları veriyle beslenen esnek bir yapıya nasıl dönüştürülür?

Bu bölümde amaç, öğrencinin `props` sözdizimini ezberlemesi değildir. Asıl amaç, bileşenler arası veri akışını okuyabilmesi, bileşenin hangi bilgiyi dışarıdan aldığını anlayabilmesi ve bir bileşenin sözleşmesini tasarlayabilmesidir. Bu beceri Bölüm 6’da ele alınacak `state` konusuna geçiş için zorunludur. Çünkü React’te değişen veri yönetimi anlaşılmadan önce, dışarıdan gelen verinin nasıl gösterildiği açık biçimde kavranmalıdır.

## 5.2 Bölümün konumu ve pedagojik rolü

Bölüm 1’de modern web uygulamalarının SPA yaklaşımı, React ekosistemi, Node.js, npm, Vite, HMR, React DevTools, `package.json`, `index.html`, `main.jsx` ve `App.jsx` gibi temel kavramları tanıtıldı. Aynı bölümde `npm create vite@latest`, `npm install` ve `npm run dev` komutlarının geliştirme döngüsündeki rolü gösterildi. Bölüm 2’de React kodlarını okuyabilmek için gerekli modern JavaScript ES6+ kavramları işlendi. Bölüm 3’te HTML ve CSS sayfa yapısından bileşen düşüncesine geçiş yapıldı. Bölüm 4’te ise JSX ve fonksiyon bileşeni anatomisi ayrıntılı biçimde incelendi.

Bölüm 5, bu dört hazırlığı veri akışı kavramıyla birleştirir. Artık öğrenci bir bileşenin yalnızca ekrana sabit bir yapı basan fonksiyon olmadığını; dışarıdan aldığı değerlere göre farklı çıktılar üreten bir arayüz birimi olduğunu görmelidir. Bu nedenle `props` konusu React öğreniminde önemli bir eşiği temsil eder. Öğrenci bu bölümden sonra “bir bileşeni nasıl yazarım?” sorusuna ek olarak “bu bileşen hangi verileri dışarıdan almalı?” sorusunu da sormaya başlar.

Pedagojik açıdan bu bölümde üç dikkat noktası vardır. Birincisi, `props` konusu `state` ile karıştırılmamalıdır. Bu bölümde veri dışarıdan gelir ve child bileşen bu veriyi doğrudan değiştirmeye çalışmaz. İkincisi, `props` yalnızca metin aktarmak için kullanılan basit bir etiket niteliği gibi sunulmamalıdır. Sayı, boolean, nesne, dizi ve fonksiyon da prop olarak aktarılabilir. Üçüncüsü, liste render etme konusu `map` ile birlikte verilmeli; ancak karmaşık veri yönetimi bu bölümün dışına taşırılmamalıdır.

KampüsHub açısından bu bölüm, statik ekran iskeletinin veriyle beslenmeye başladığı ilk adımdır. Duyuru kartı, etkinlik kartı, not paylaşım kartı ve profil kartı aynı `ModuleCard` bileşeniyle üretilebilecek duruma gelir. Böylece kitap boyunca geliştirilecek ana proje daha sürdürülebilir bir bileşen düzenine kavuşur.

## 5.3 Öğrenme çıktıları

Bu bölümü tamamlayan bir öğrenci aşağıdaki yeterlikleri kazanmış olmalıdır:

1. `props` kavramını bileşenler arası veri aktarımı bağlamında tanımlar.
2. Parent bileşen ve child bileşen rollerini örnek üzerinden ayırt eder.
3. JSX içinde string ve JavaScript ifadesi olarak prop aktarma farkını açıklar.
4. String, number, boolean, array ve object türündeki değerleri prop olarak kullanır.
5. Destructuring ile prop okuma biçimini uygular.
6. Eksik veri durumunda varsayılan değer kullanır.
7. Liste verisini `map` ile bileşen listesine dönüştürür.
8. `key` kullanımının liste render sürecindeki rolünü açıklar.
9. KampüsHub `ModuleCard` bileşenini dışarıdan veri alan yeniden kullanılabilir bir bileşene dönüştürür.
10. `props` ile `state` arasındaki başlangıç düzeyi farkı açıklar.
11. Prop sözleşmesi kavramını kullanarak bir bileşenin hangi verileri beklediğini belirtir.
12. Hatalı prop adlandırma, eksik prop, yanlış tür ve gereksiz veri taşıma gibi yaygın sorunları tanır.

Bu öğrenme çıktıları yalnızca kısa kod parçalarını çalıştırma becerisiyle sınırlı değildir. Öğrencinin beklenen kazanımı, bileşen tasarımı yaparken veri sınırlarını düşünmesidir. Bir bileşen hangi bilgiyi kendi içinde sabit tutmalı, hangi bilgiyi dışarıdan almalı ve hangi bilgiyi üst bileşene bırakmalıdır? Bu sorular React uygulama mimarisinin temelini oluşturur.

## 5.4 Ön bilgi ve başlangıç varsayımları

Bu bölümde öğrencinin JSX ile fonksiyon bileşeni yazabildiği varsayılır. Öğrenci `function App() { return (...) }` yapısını, bileşen adlarının PascalCase yazıldığını, JSX içinde `className` kullanıldığını ve JavaScript ifadelerinin `{}` içinde gösterildiğini bilmelidir. Ayrıca önceki bölümde kullanılan `ModuleCard` benzeri bileşenlerin statik olarak nasıl yazıldığını görmüş olmalıdır.

Modern JavaScript tarafında özellikle nesne, dizi, destructuring, template literal ve `map` metodu önemlidir. `props` konusu çoğu zaman JavaScript nesnelerini doğru okumayla ilişkilidir. Çünkü React bir bileşene aktarılan prop’ları temelde bir nesne olarak düşünür. Aşağıdaki iki kullanım bu nedenle aynı zihinsel modele bağlanır:

```jsx
<ModuleCard title="Duyurular" count={3} />
```

```javascript
const props = {
  title: "Duyurular",
  count: 3
};
```

İlk örnek JSX içinde bir bileşene prop aktarmayı gösterir. İkinci örnek aynı verinin JavaScript nesnesi olarak nasıl düşünülebileceğini gösterir. Öğrenci bu bağlantıyı kurduğunda `props` konusu daha az soyut hâle gelir.

Geliştirme ortamı açısından Bölüm 1’de kurulan akış geçerlidir. Proje Vite ile oluşturulmuş, `npm install` ile bağımlılıkları kurulmuş ve `npm run dev` ile geliştirme sunucusu başlatılmış olmalıdır. HMR sayesinde dosya kaydedildiğinde tarayıcıdaki KampüsHub ekranı hızlı biçimde güncellenir. React DevTools ise parent-child bileşen ilişkisini ve prop değerlerini incelemek için yararlıdır.

Bu bölümde `useState` kullanılmayacaktır. Çünkü `props` dışarıdan gelen veriyi temsil eder; `state` ise bileşenin zaman içinde değişebilen kendi verisiyle ilişkilidir. Bölümün sonunda bu ayrım kısa biçimde açıklanacak ve Bölüm 6’ya köprü kurulacaktır.

## 5.5 Statik bileşenden veri alan bileşene geçiş

Bölüm 4’te yazılan basit `ModuleCard` bileşeni şu şekilde düşünülebilir:

```jsx
function ModuleCard() {
  return (
    <article className="module-card">
      <h3>Duyurular</h3>
      <p>Ders ve bölüm duyurularını takip edin.</p>
      <span>3 yeni duyuru</span>
    </article>
  );
}
```

Bu bileşen ekranda anlamlı bir kart üretir; fakat önemli bir sınırlılığı vardır: her çağrıldığında aynı içeriği gösterir. KampüsHub’da yalnızca duyuru kartı yoktur. Etkinlik takvimi, not paylaşımı ve kullanıcı profili gibi farklı modüller de vardır. Her modül için ayrı ayrı `AnnouncementCard`, `EventCard`, `NotesCard` ve `ProfileCard` yazmak başlangıçta kolay görünebilir; ancak bu yaklaşım kısa sürede tekrar üretir.

Daha iyi yaklaşım, kartın genel görünümünü tek bir bileşende tutmak; değişen başlık, açıklama, durum ve sayaç bilgisini dışarıdan aktarmaktır. Böylece `ModuleCard` bileşeni bir kalıp gibi davranır. Hangi modülü göstereceği ise aldığı prop değerlerine bağlıdır.

```jsx
function ModuleCard({ title, description, status }) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </article>
  );
}
```

Bu yeni sürümde bileşen sabit veri üretmez. `title`, `description` ve `status` dışarıdan gelir. Aynı bileşen farklı verilerle çağrıldığında farklı kartlar oluşur.

```jsx
<ModuleCard
  title="Duyurular"
  description="Ders ve bölüm duyurularını takip edin."
  status="3 yeni duyuru"
/>

<ModuleCard
  title="Etkinlikler"
  description="Kampüs etkinliklerini takvime göre inceleyin."
  status="2 yaklaşan etkinlik"
/>
```

Bu dönüşüm React’te yeniden kullanılabilirliğin temelidir. Bir bileşen, görünüm kalıbını korurken veriyi dışarıdan alıyorsa farklı bağlamlarda tekrar kullanılabilir. Bu ilke yalnızca kartlar için değil, başlık alanları, profil rozetleri, liste satırları, butonlar ve form alanları için de geçerlidir.

<!-- CODE_META
id: react_ch05_code01
chapter_id: chapter_05
language: javascript
kind: example
title_key: "props_like_object_to_card_text"
file: "props_like_object_to_card_text.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "Duyurular"
  - "3 yeni duyuru"
  - "KampüsHub"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function renderModuleCard(props) {
  return `${props.appName}: ${props.title} - ${props.description} (${props.status})`;
}

const announcementModule = {
  appName: "KampüsHub",
  title: "Duyurular",
  description: "Ders ve bölüm duyurularını takip edin.",
  status: "3 yeni duyuru"
};

console.log(renderModuleCard(announcementModule));
```

Bu örnek saf JavaScript ile yazılmıştır; çünkü otomatik test hattı Node.js üzerinde çalışır. Yine de model React’teki `props` kavramıyla aynıdır. `renderModuleCard` fonksiyonu dışarıdan bir nesne alır ve sonucunu bu nesneye göre üretir. React bileşeninde de benzer biçimde dışarıdan gelen prop değerleri arayüz çıktısını belirler.

## 5.6 Props nedir?

`props`, “properties” kelimesinin kısaltmasıdır. React bileşenlerine dışarıdan aktarılan değerleri ifade eder. Bir bileşenin prop alması, o bileşenin kendi içinde sabit yazılmış değerler yerine üst bileşenden gelen değerlerle çalışması anlamına gelir. Bu durum bileşenleri daha esnek ve yeniden kullanılabilir hâle getirir.

Bir parent bileşen child bileşene veri verirken JSX içinde etiket niteliğine benzeyen bir sözdizimi kullanır:

```jsx
<ModuleCard title="Duyurular" status="3 yeni duyuru" />
```

Bu örnekte `ModuleCard` child bileşendir. `title` ve `status` ise child bileşene aktarılan prop’lardır. Child bileşen bu değerleri fonksiyon parametresi üzerinden okuyabilir:

```jsx
function ModuleCard(props) {
  return (
    <article className="module-card">
      <h3>{props.title}</h3>
      <span>{props.status}</span>
    </article>
  );
}
```

Burada `props` bir nesne gibi düşünülebilir. `props.title` başlık değerine, `props.status` durum metnine erişir. Bu biçim başlangıç için açıklayıcıdır; ancak bileşende çok sayıda prop varsa sürekli `props.` yazmak kodu kalabalıklaştırabilir. Bu nedenle React kodlarında destructuring sık kullanılır:

```jsx
function ModuleCard({ title, status }) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <span>{status}</span>
    </article>
  );
}
```

Destructuring, prop nesnesinden gerekli alanları doğrudan değişken gibi almamızı sağlar. Bu kullanım özellikle bileşen sözleşmesini görünür kılar. Fonksiyon imzasına bakan biri, `ModuleCard` bileşeninin `title` ve `status` beklediğini hemen anlayabilir.

`props` hakkında unutulmaması gereken temel ilke şudur: child bileşen aldığı prop değerlerini doğrudan değiştirmeye çalışmamalıdır. Parent bileşen veriyi verir; child bileşen bu veriye göre arayüz üretir. Bu tek yönlü veri akışı React uygulamalarının izlenebilirliğini artırır.

## 5.7 JSX içinde prop verme biçimleri

JSX içinde prop aktarırken iki temel yazım biçimi vardır. String değerler tırnak içinde verilebilir:

```jsx
<ModuleCard title="Duyurular" />
```

JavaScript ifadesi olarak aktarılan değerler ise süslü parantez içinde yazılır:

```jsx
<ModuleCard count={3} isActive={true} />
```

Bu fark önemlidir. Çünkü `count="3"` yazıldığında değer string olur; `count={3}` yazıldığında değer number olur. Benzer şekilde `isActive="true"` string bir değer üretir; `isActive={true}` boolean değer üretir. Yeni başlayanların en sık yaptığı hatalardan biri, tüm prop değerlerini tırnak içinde yazmaktır. Bu hata ilk anda görünmeyebilir; fakat koşullu görünüm ve sayısal işlem gerektiren durumlarda beklenmeyen sonuçlara yol açabilir.

Aşağıdaki örnek, farklı prop türlerini gösterir:

```jsx
<ModuleCard
  title="Duyurular"
  count={3}
  isActive={true}
  tags={["ders", "sınav", "bölüm"]}
  owner={{ name: "Akademik Birim", role: "Yönetici" }}
/>
```

Burada `title` string, `count` number, `isActive` boolean, `tags` array ve `owner` object türündedir. JSX içinde JavaScript ifadesi kullanıldığı için dizi ve nesne değerleri de prop olarak aktarılabilir.

Boolean prop’larda kısa yazım da mümkündür:

```jsx
<ModuleCard title="Duyurular" highlighted />
```

Bu kullanım `highlighted={true}` anlamına gelir. Ancak başlangıç düzeyinde öğrencilerin önce açık yazımı kullanması daha öğreticidir. Açık yazım veri türünü daha görünür hâle getirir.

Fonksiyonlar da prop olarak aktarılabilir; ancak bu bölümde fonksiyon prop’ları yalnızca kavramsal düzeyde tanıtılacaktır. Örneğin bir butona tıklandığında çalışacak işlem parent bileşenden child bileşene verilebilir. Ayrıntılı etkileşim ve değişen veri yönetimi Bölüm 6’da ele alınacaktır.

## 5.8 Destructuring, varsayılan değerler ve okunabilirlik

Bir bileşene aktarılan prop sayısı arttığında bileşen gövdesinde `props.title`, `props.description`, `props.status` gibi tekrarlar oluşur. Destructuring bu tekrarları azaltır ve bileşenin beklediği verileri görünür kılar.

```jsx
function ModuleCard({ title, description, status }) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </article>
  );
}
```

Bu yazımda fonksiyon parametresine bakarak bileşenin hangi prop’ları beklediği anlaşılır. Eğer bir prop gelmezse değer `undefined` olur. Bazı durumlarda eksik veri için varsayılan değer vermek daha güvenlidir:

```jsx
function ModuleCard({
  title = "Başlıksız modül",
  description = "Açıklama henüz eklenmedi.",
  status = "Durum bilgisi yok"
}) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </article>
  );
}
```

Varsayılan değerler, özellikle içerik henüz tamamlanmamışken arayüzün tamamen bozulmasını önler. Fakat varsayılan değerler hataları gizlemek için kullanılmamalıdır. Eğer bir bileşen için `title` gerçekten zorunluysa, geliştirme sırasında bu eksiklik fark edilmelidir. Bu nedenle varsayılan değer kararı bileşenin amacına göre verilmelidir.

<!-- CODE_META
id: react_ch05_code02
chapter_id: chapter_05
language: javascript
kind: example
title_key: "destructuring_default_values"
file: "destructuring_default_values.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "Ayşe KAYA"
  - "Misafir Kullanıcı"
  - "Çevrim dışı"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function formatProfileBadge({ name = "Misafir Kullanıcı", role = "Öğrenci", online = false } = {}) {
  const statusText = online ? "Çevrim içi" : "Çevrim dışı";
  return `${name} | ${role} | ${statusText}`;
}

console.log(formatProfileBadge({ name: "Ayşe KAYA", role: "Öğrenci", online: true }));
console.log(formatProfileBadge());
```

Bu örnekte `formatProfileBadge` fonksiyonu destructuring ve varsayılan değerleri birlikte kullanır. React bileşeninde aynı yaklaşım, profil rozeti gibi küçük arayüz parçalarını güvenli biçimde üretmek için kullanılabilir.

## 5.9 KampüsHub: modül kartlarını props ile tasarlamak

KampüsHub ana ekranında dört temel modül bulunduğunu varsayalım: duyurular, etkinlikler, not paylaşımı ve profil. Bu modüllerin her biri başlık, açıklama, durum ve vurgu bilgisine sahip olabilir. Statik bileşen yaklaşımında her modül için ayrı JSX yazılır. `props` yaklaşımında ise veri bir dizi içinde tutulur ve aynı `ModuleCard` bileşenine aktarılır.

Önce veri yapısını düşünelim:

```javascript
const modules = [
  {
    id: "announcements",
    title: "Duyurular",
    description: "Ders ve bölüm duyurularını takip edin.",
    status: "3 yeni duyuru",
    highlighted: true
  },
  {
    id: "events",
    title: "Etkinlikler",
    description: "Kampüs etkinliklerini takvime göre inceleyin.",
    status: "2 yaklaşan etkinlik",
    highlighted: false
  }
];
```

Bu veri `App.jsx` içinde veya ilerleyen bölümlerde ayrı bir veri dosyasında tutulabilir. Bu bölümde amaç, veriyi nerede saklayacağımızdan çok, verinin bileşenlere nasıl aktarılacağını kavramaktır.

`ModuleCard` bileşeni şu şekilde yazılabilir:

```jsx
function ModuleCard({ title, description, status, highlighted }) {
  const cardClassName = highlighted ? "module-card module-card-featured" : "module-card";

  return (
    <article className={cardClassName}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </article>
  );
}
```

Burada `highlighted` boolean bir prop’tur. Değeri `true` olduğunda ek CSS sınıfı uygulanır. Değeri `false` olduğunda normal kart sınıfı kullanılır. Bu örnek, prop değerlerinin yalnızca metin göstermek için değil, görünüm kararlarını belirlemek için de kullanılabileceğini gösterir.

Parent bileşen ise listeyi `map` ile kartlara dönüştürür:

```jsx
function ModuleGrid({ modules }) {
  return (
    <section className="module-grid">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          title={module.title}
          description={module.description}
          status={module.status}
          highlighted={module.highlighted}
        />
      ))}
    </section>
  );
}
```

Bu kodda `ModuleGrid` parent rolündedir. `ModuleCard` child rolündedir. `modules` dizisindeki her nesne, bir `ModuleCard` bileşenine veri olarak aktarılır. `key={module.id}` ifadesi ise React’in liste elemanlarını tutarlı biçimde izlemesine yardımcı olur.

<!-- CODE_META
id: react_ch05_code03
chapter_id: chapter_05
language: javascript
kind: example
title_key: "map_modules_to_card_summaries"
file: "map_modules_to_card_summaries.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "Duyurular -> 3 yeni duyuru"
  - "Etkinlikler -> 2 yaklaşan etkinlik"
  - "Toplam modül: 4"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
const modules = [
  { id: "announcements", title: "Duyurular", status: "3 yeni duyuru" },
  { id: "events", title: "Etkinlikler", status: "2 yaklaşan etkinlik" },
  { id: "notes", title: "Not Paylaşımı", status: "5 yeni not" },
  { id: "profile", title: "Profil", status: "Profil %80 tamamlandı" }
];

const summaries = modules.map((module) => `${module.title} -> ${module.status}`);

console.log(summaries.join("\n"));
console.log(`Toplam modül: ${modules.length}`);
```

Bu örnek, React’teki liste render etme mantığını saf JavaScript ile gösterir. `map`, her veri nesnesinden yeni bir çıktı üretir. JSX içinde de aynı mantıkla her veri nesnesinden bir bileşen çıktısı üretilir.

## 5.10 Sık yapılan hatalar ve yanlış sezgiler

`props` konusu basit görünmesine rağmen yeni başlayan öğrenciler için bazı tipik hatalar üretir. Bu hataların çoğu, veri türleri ve veri akışı modelinin tam oturmamasından kaynaklanır.

İlk yaygın hata, sayı ve boolean değerleri string olarak aktarmaktır. `count="3"` yazıldığında değer sayı değil string olur. Bu değer ekranda yalnızca gösterilecekse fark edilmeyebilir; ancak karşılaştırma veya hesaplama yapılacaksa sorun ortaya çıkar. Bu nedenle JavaScript değeri aktarırken `{}` kullanılmalıdır.

İkinci hata, child bileşenin prop değerini değiştirmeye çalışmasıdır. React modelinde prop dışarıdan gelir ve child bileşen bu değeri doğrudan değiştirmemelidir. Child bileşenin görevi aldığı veriyi kullanarak arayüz üretmektir. Değişen veri ihtiyacı varsa bu konu `state` ile ele alınır.

Üçüncü hata, prop adlarının parent ve child tarafında tutarsız yazılmasıdır. Parent `moduleTitle` gönderirken child `title` okumaya çalışırsa değer `undefined` olur. Bu tür hatalar özellikle büyük dosyalarda zor fark edilir. Bileşen sözleşmesini açık tutmak ve adlandırmayı tutarlı yapmak önemlidir.

Dördüncü hata, liste render ederken `key` vermemek veya index değerini bilinçsiz biçimde key olarak kullanmaktır. `key`, React’in liste elemanlarını ayırt etmesine yardım eder. Liste elemanlarının benzersiz `id` değeri varsa genellikle bu değer kullanılmalıdır.

Beşinci hata, bir bileşene gereğinden fazla prop göndermektir. Bir bileşen yalnızca gerçekten ihtiyaç duyduğu verileri almalıdır. Gereksiz prop taşımak bileşen sözleşmesini bulanıklaştırır ve bakım maliyetini artırır.

Altıncı hata, tüm veriyi tek bir büyük nesne olarak child bileşene geçirmek ve child bileşenin bu nesnenin içinden her şeyi seçmesini beklemektir. Bazı durumlarda nesne prop’u doğrudur; fakat başlangıç düzeyinde bileşenin hangi alanları kullandığını görünür tutmak daha öğreticidir.

## 5.11 Hata ayıklama egzersizi

Aşağıdaki örnekte KampüsHub modül kartı beklenen değerleri göstermemektedir:

```jsx
function ModuleCard({ title, count }) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <p>{count + 1} bildirim</p>
    </article>
  );
}

function App() {
  return <ModuleCard moduleTitle="Duyurular" count="3" />;
}
```

Bu kodda iki temel sorun vardır. Birincisi, parent bileşen `moduleTitle` prop’u göndermekte; child bileşen ise `title` okumaktadır. Bu nedenle başlık `undefined` olur. İkincisi, `count` değeri tırnak içinde gönderildiği için string olur. JavaScript’te string ile sayı toplandığında sayısal toplama yerine metin birleştirme gerçekleşebilir. Bu nedenle `count + 1` beklenen sonucu vermeyebilir.

Düzeltilmiş sürüm şu şekilde yazılabilir:

```jsx
function ModuleCard({ title, count }) {
  return (
    <article className="module-card">
      <h3>{title}</h3>
      <p>{count + 1} bildirim</p>
    </article>
  );
}

function App() {
  return <ModuleCard title="Duyurular" count={3} />;
}
```

Bu örnek, prop adlandırma ve veri türü kontrolünün önemini gösterir. React DevTools kullanılarak `ModuleCard` bileşenine hangi prop’ların geldiği incelenebilir. Böylece hata yalnızca ekrandaki sonuca bakarak değil, bileşen ağacındaki veri akışı izlenerek de bulunabilir.

Aşağıdaki saf JavaScript örneği parent-child veri akışını fonksiyonlar üzerinden modellemektedir:

<!-- CODE_META
id: react_ch05_code04
chapter_id: chapter_05
language: javascript
kind: example
title_key: "parent_child_data_flow"
file: "parent_child_data_flow.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "App -> ModuleCard"
  - "Duyurular"
  - "Child çıktı üretti"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function ModuleCard(props) {
  return `Child çıktı üretti: ${props.title} (${props.status})`;
}

function App() {
  const moduleProps = {
    title: "Duyurular",
    status: "3 yeni duyuru"
  };

  return `App -> ModuleCard\n${ModuleCard(moduleProps)}`;
}

console.log(App());
```

Bu modelde `App` parent bileşen gibi davranır. `ModuleCard` ise child bileşen gibi davranır. Veri yukarıdan aşağıya aktarılır ve child fonksiyon bu veriye göre çıktı üretir.

## 5.12 Bölüm özeti ve terim sözlüğü

Bu bölümde `props` kavramı, React bileşenlerinin dışarıdan veri almasını sağlayan temel mekanizma olarak ele alındı. Statik bir bileşenin neden sınırlı olduğu KampüsHub `ModuleCard` örneği üzerinden gösterildi. Ardından parent-child veri akışı, JSX içinde prop aktarma biçimleri, destructuring, varsayılan değerler, liste render etme ve `key` kullanımı açıklandı.

Bölümün en önemli sonucu şudur: Bir bileşen yalnızca görünüm parçası değildir; aynı zamanda belirli verileri bekleyen bir arayüz sözleşmesidir. Parent bileşen bu sözleşmeye uygun veri gönderdiğinde child bileşen beklenen çıktıyı üretir. Prop adları, veri türleri ve varsayılan değerler bu sözleşmenin okunabilirliğini belirler.

### Terim sözlüğü

| Terim | Açıklama |
|---|---|
| `props` | Bir React bileşenine dışarıdan aktarılan değerlerdir. |
| Parent bileşen | Child bileşene veri gönderen üst bileşendir. |
| Child bileşen | Parent bileşenden veri alan ve bu veriye göre arayüz üreten bileşendir. |
| Tek yönlü veri akışı | Verinin parent bileşenden child bileşene doğru izlenebilir biçimde aktarılmasıdır. |
| Destructuring | Nesne veya diziden değerleri kısa ve okunabilir biçimde alma yöntemidir. |
| Varsayılan değer | Prop gelmediğinde kullanılacak yedek değerdir. |
| Liste render etme | Dizi verisinden birden fazla bileşen üretme işlemidir. |
| `key` | Liste elemanlarını ayırt etmek için kullanılan özel React değeridir. |
| Bileşen sözleşmesi | Bir bileşenin hangi prop’ları beklediğini ve bu prop’larla ne yaptığını ifade eden tasarım bilgisidir. |

<!-- CODE_META
id: react_ch05_code05
chapter_id: chapter_05
language: javascript
kind: example
title_key: "simple_prop_contract_check"
file: "simple_prop_contract_check.js"
extract: true
test: compile_run_assert
expected_stdout_contains:
  - "Sözleşme geçerli"
  - "Eksik alan: title"
  - "Eksik alan: status"
timeout_sec: 5
github: true
qr: dual
-->
```javascript
function validateModuleProps(props) {
  const requiredFields = ["title", "status"];
  const missingFields = requiredFields.filter((field) => !props[field]);

  if (missingFields.length === 0) {
    return "Sözleşme geçerli";
  }

  return missingFields.map((field) => `Eksik alan: ${field}`).join("\n");
}

console.log(validateModuleProps({ title: "Duyurular", status: "3 yeni duyuru" }));
console.log(validateModuleProps({ description: "Eksik veri örneği" }));
```

Bu örnek gerçek bir React doğrulama sistemi değildir. Ama bileşen sözleşmesi fikrini açıklar: Bir bileşenin beklediği alanlar vardır ve bu alanlar eksik olduğunda çıktı güvenilirliğini kaybedebilir.

## 5.13 Kavramsal sorular

1. Statik bir `ModuleCard` bileşeni ile prop alan bir `ModuleCard` bileşeni arasındaki temel fark nedir?
2. Parent bileşen ve child bileşen kavramlarını KampüsHub örneği üzerinden açıklayınız.
3. `title="Duyurular"` ile `count={3}` yazımları arasında veri türü açısından nasıl bir fark vardır?
4. Bir bileşende destructuring kullanmanın okunabilirliğe katkısı nedir?
5. Varsayılan prop değeri hangi durumlarda yararlıdır? Hangi durumlarda hatayı gizleyebilir?
6. Liste render ederken `key` vermek neden gereklidir?
7. Bir bileşene gereğinden fazla prop göndermek neden bakım sorununa dönüşebilir?
8. `props` ile `state` arasındaki farkı başlangıç düzeyinde nasıl açıklarsınız?
9. React DevTools, prop kaynaklı hataları bulmada nasıl kullanılabilir?
10. KampüsHub `ProfileBadge` bileşeni hangi prop’ları almalıdır? Gerekçenizle açıklayınız.

## 5.14 Programlama alıştırmaları

### Alıştırma 1: SectionTitle bileşeni

`SectionTitle` adlı bir bileşen yazınız. Bu bileşen `title` ve `subtitle` prop’ları alsın. `subtitle` gönderilmezse `Bu bölüm için açıklama eklenmedi.` varsayılan metni gösterilsin.

Beklenen kullanım:

```jsx
<SectionTitle
  title="KampüsHub Modülleri"
  subtitle="Ders yaşamını kolaylaştıran temel alanlar"
/>
```

### Alıştırma 2: ModuleCard bileşeni

`ModuleCard` bileşenini `title`, `description`, `status` ve `highlighted` prop’larını alacak şekilde yazınız. `highlighted` değeri true olduğunda karta ek CSS sınıfı veriniz.

### Alıştırma 3: ModuleGrid bileşeni

Aşağıdaki veri dizisini `map` ile `ModuleCard` bileşenlerine dönüştürünüz:

```javascript
const modules = [
  { id: "announcements", title: "Duyurular", status: "3 yeni duyuru" },
  { id: "events", title: "Etkinlikler", status: "2 yaklaşan etkinlik" },
  { id: "notes", title: "Not Paylaşımı", status: "5 yeni not" }
];
```

Her kartta `key` olarak `id` alanını kullanınız.

### Alıştırma 4: ProfileBadge bileşeni

`ProfileBadge` bileşeni `name`, `department`, `role` ve `online` prop’larını alsın. `online` true ise `Çevrim içi`, false ise `Çevrim dışı` metni gösterilsin.

### Alıştırma 5: Hatalı prop düzeltme

Aşağıdaki kullanımda hataları bulunuz ve düzeltiniz:

```jsx
<ModuleCard moduleTitle="Duyurular" count="3" active="true" />
```

Düzeltmede prop adlarını, sayı değerini ve boolean değeri gözden geçiriniz.

## 5.15 Haftalık laboratuvar / proje görevi

Bu haftanın laboratuvar görevi, KampüsHub ana ekranındaki statik kartları prop tabanlı bileşenlere dönüştürmektir. Çalışma sonunda aynı `ModuleCard` bileşeni farklı modüller için tekrar kullanılabilir olmalıdır.

### Görev 1: Proje hazırlığı

Vite ile oluşturulmuş KampüsHub projesini açınız. Geliştirme sunucusunu çalıştırınız ve tarayıcıda ekranın açıldığını doğrulayınız. React DevTools yüklüyse bileşen ağacını inceleyiniz.

### Görev 2: Veri dizisi oluşturma

`App.jsx` içinde veya `src/data/modules.js` dosyasında KampüsHub modüllerini temsil eden bir dizi oluşturunuz. Her modül en az şu alanlara sahip olmalıdır:

- `id`
- `title`
- `description`
- `status`
- `highlighted`

### Görev 3: ModuleCard bileşenini güncelleme

`ModuleCard` bileşenini dışarıdan prop alacak şekilde düzenleyiniz. Bileşenin içinde sabit başlık veya sabit açıklama kalmamalıdır. Kart görünümü prop değerlerine göre oluşmalıdır.

### Görev 4: ModuleGrid bileşeni oluşturma

`ModuleGrid` bileşeni `modules` prop’u alsın. Bu prop üzerinden `map` çalıştırarak her modül için bir `ModuleCard` oluştursun. `key` değeri olarak modülün `id` alanını kullanınız.

### Görev 5: ProfileBadge bileşeni ekleme

Ana ekrana küçük bir `ProfileBadge` bileşeni ekleyiniz. Bu bileşen `name`, `department`, `role` ve `online` prop’ları alsın. Böylece yalnızca kartlar değil, kullanıcı bilgisi gibi küçük arayüz parçalarının da prop ile yönetilebildiği gösterilsin.

### Görev 6: Kontrol listesi

Teslimden önce şu maddeleri kontrol ediniz:

- `ModuleCard` içinde sabit modül verisi kaldı mı?
- Parent bileşen child bileşene gerekli prop’ları gönderiyor mu?
- Prop adları parent ve child tarafında tutarlı mı?
- Sayı ve boolean değerler `{}` içinde mi aktarılıyor?
- Liste render edilirken benzersiz `key` kullanılıyor mu?
- React DevTools içinde prop değerleri izlenebiliyor mu?
- KampüsHub ekranında en az dört farklı modül kartı görünüyor mu?

### Teslim formatı

Öğrenci şu çıktıları teslim etmelidir:

1. `App.jsx` dosyası
2. `ModuleCard.jsx` dosyası
3. `ModuleGrid.jsx` dosyası
4. Varsa `src/data/modules.js` dosyası
5. Uygulama ekran görüntüsü
6. Kısa açıklama: “Bu bileşenlerde hangi prop’ları neden kullandım?”

## 5.16 İleri okuma ve bir sonraki bölüme geçiş

Bu bölümden sonra öğrencinin React belgelerinde özellikle passing props to a component, rendering lists ve conditional rendering başlıklarını incelemesi yararlı olacaktır. Ayrıca JavaScript tarafında object destructuring, array `map` ve truthy/falsy değerler tekrar edilmelidir.

Bu bölümde KampüsHub bileşenleri dışarıdan gelen veriye göre farklı içerikler gösterebilir hâle geldi. Ancak veri hâlâ sabittir. Kullanıcı bir butona bastığında sayaç değişmiyor, kartın durumu güncellenmiyor, profil bilgisi ekrandayken kullanıcı tarafından düzenlenemiyor. Bu ihtiyaçlar bizi Bölüm 6’ya götürür.

Bir sonraki bölümde `state` konusu ele alınacaktır. `props` ile gelen veri parent tarafından sağlanırken, `state` bileşenin zaman içinde değişebilen kendi verisini temsil eder. Bu ayrım React öğreniminde kritik bir dönüm noktasıdır. Bölüm 6’da KampüsHub üzerinde değişen bildirim sayısı, seçili modül, açılır/kapanır paneller ve basit kullanıcı etkileşimleri üzerinden state yönetimi incelenecektir.

### Programatik ekran çıktısı planı

Aşağıdaki ekran çıktıları, bölümün görsel doğrulama ve otomatik üretim hattı için planlanmıştır.

<!-- SCREENSHOT_META
id: b05_01_props_veri_akisi
chapter_id: chapter_05
title_key: "props_veri_akisi"
route: /__book__/chapter-05/props-veri-akisi
waitFor: ".props-flow-demo"
actions: []
output: assets/auto/screenshots/b05_01_props_veri_akisi.png
manual_path: assets/manual/screenshots/b05_01_props_veri_akisi.png
final_path: assets/final/screenshots/b05_01_props_veri_akisi.png
manual_override: true
-->
[SCREENSHOT:b05_01_props_veri_akisi]

Bu ekran çıktısı, parent bileşenden child bileşene doğru veri akışını gösteren basit bir KampüsHub şemasını belgelemek için kullanılacaktır.

<!-- SCREENSHOT_META
id: b05_02_kampushub_modul_kartlari_props
chapter_id: chapter_05
title_key: "kampushub_modul_kartlari_props"
route: /__book__/chapter-05/kampushub-modul-kartlari-props
waitFor: ".module-grid.props-demo"
actions: []
output: assets/auto/screenshots/b05_02_kampushub_modul_kartlari_props.png
manual_path: assets/manual/screenshots/b05_02_kampushub_modul_kartlari_props.png
final_path: assets/final/screenshots/b05_02_kampushub_modul_kartlari_props.png
manual_override: true
-->
[SCREENSHOT:b05_02_kampushub_modul_kartlari_props]

Bu ekran çıktısı, aynı `ModuleCard` bileşeninin farklı prop değerleriyle birden fazla KampüsHub modülünü göstermesini belgelemek için kullanılacaktır.

<!-- SCREENSHOT_META
id: b05_03_liste_render_key
chapter_id: chapter_05
title_key: "liste_render_key"
route: /__book__/chapter-05/liste-render-key
waitFor: ".list-key-demo"
actions: []
output: assets/auto/screenshots/b05_03_liste_render_key.png
manual_path: assets/manual/screenshots/b05_03_liste_render_key.png
final_path: assets/final/screenshots/b05_03_liste_render_key.png
manual_override: true
-->
[SCREENSHOT:b05_03_liste_render_key]

Bu ekran çıktısı, `modules.map(...)` yapısı ve `key` kullanımının görsel karşılığını açıklayan liste render demosu için planlanmıştır.

### Bölüm sonu kontrol listesi

- `props` kavramı parent-child veri akışıyla açıklanabiliyor.
- String, number, boolean, array ve object prop ayrımı yapılabiliyor.
- Destructuring ve varsayılan değer kullanımı uygulanabiliyor.
- KampüsHub `ModuleCard` bileşeni veriyle beslenebiliyor.
- Liste verisi `map` ile bileşenlere dönüştürülebiliyor.
- `key` kullanımı gerekçelendirilebiliyor.
- Bölüm 6’daki `state` konusu için gerekli ayrım kurulabiliyor.
