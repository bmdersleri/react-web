---
title: "Bölüm 15: Performans, Test ve Dağıtım"
chapter_id: "chapter_15"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
year: "2026"
status: "draft"
---

# Bölüm 15: Performans, Test ve Dağıtım

## 15.1 Bölümün yol haritası

Önceki bölümlerde KampüsHub uygulamasının temel yapı taşları adım adım oluşturuldu. Bileşenler, props, state, yan etkiler, özel hook’lar, sayfa yönetimi, form yönetimi, global state, API entegrasyonu ve hafif state yönetimi artık uygulama mimarisinin parçası hâline geldi. Bu noktada öğrenci genellikle şu soruyu sormaya başlar: “Uygulamam çalışıyor; şimdi ne yapmalıyım?”

Bu bölümün yanıtı üç ana başlıktan oluşur: performans, test ve dağıtım. Çalışan bir uygulama dersin ilk hedefidir; fakat güvenilir, sürdürülebilir ve kullanıcıya ulaştırılabilir bir uygulama için yalnızca çalışıyor olması yeterli değildir. Kullanıcı etkileşimi gereksiz yere yavaşlamamalı, kritik davranışlar testlerle güvence altına alınmalı ve üretim derlemesi dağıtıma hazır hâle getirilmelidir.

Bölüm boyunca KampüsHub uygulamasını bir ürün adayı olarak ele alacağız. Duyuru listesi çok büyüdüğünde ne olur? Not arama kutusu her tuş vuruşunda pahalı bir hesaplama yaparsa ne hissedilir? Profil kartı, kullanıcı bilgisi boş olduğunda doğru mesajı gösteriyor mu? API hata verdiğinde testimiz bunu yakalıyor mu? Vite ile production build alındığında hangi klasör dağıtılır? Bu sorular Bölüm 15’in öğretim omurgasını oluşturur.

Bu bölümde amaç öğrenciyi karmaşık profiling araçları, uçtan uca test altyapıları veya profesyonel DevOps ayrıntılarıyla boğmak değildir. Amaç; React uygulamalarında kaliteyi sistematik düşünmeye başlatmak, ölçmeden optimizasyon yapmama alışkanlığı kazandırmak, testleri kullanıcı davranışıyla ilişkilendirmek ve dağıtım öncesi kontrol listesi hazırlamaktır.

## 15.2 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

1. React uygulamalarında performans problemini render, hesaplama, ağ ve paket boyutu eksenlerinde sınıflandırır.
2. Gereksiz optimizasyon ile ölçüme dayalı iyileştirme arasındaki farkı açıklar.
3. `memo`, `useMemo` ve `useCallback` kavramlarının hangi durumda anlamlı olabileceğini yorumlar.
4. KampüsHub için basit bir performans bütçesi tanımlar.
5. Unit test, component test ve entegrasyon testini örneklerle ayırt eder.
6. Vitest’in Vite ekosistemindeki yerini açıklar.
7. React Testing Library yaklaşımını kullanıcı davranışı üzerinden test yazma mantığıyla ilişkilendirir.
8. API yükleniyor, hata ve başarılı veri durumlarını test kapsamına dönüştürür.
9. Vite production build ve preview akışını açıklar.
10. Dağıtım öncesi kalite kapısı checklist’i oluşturur.
11. Bölüm 16’da tamamlanacak KampüsHub final uygulaması için test ve dağıtım hazırlığı yapar.

## 15.3 Ön bilgiler

Bu bölümü verimli takip edebilmek için öğrencinin önceki bölümlerdeki ana kavramlara hâkim olması gerekir. Özellikle bileşenlerin yeniden render edilmesi, state değişimi, props aktarımı, `useEffect` ile veri çekme, React Router ile sayfa yönetimi, form state’i, Redux Toolkit ve Zustand ile state paylaşımı bu bölümün doğrudan ön koşullarıdır.

Performans başlığında öğrencinin bilmesi gereken en önemli nokta şudur: React’te render olmak tek başına hata değildir. Bir bileşenin yeniden render edilmesi çoğu zaman beklenen ve doğal bir davranıştır. Sorun, bu render sürecinin kullanıcı deneyimini bozacak kadar pahalı hâle gelmesi veya gereksiz hesaplamaların sık tekrar edilmesidir.

Test başlığında ise amaç her satırı test etmek değildir. Ders kitabı düzeyinde hedef; kritik kullanıcı davranışlarını, veri dönüşümlerini ve hata durumlarını test edilebilir parçalara ayırmaktır. Bu nedenle bölümde hem saf JavaScript fonksiyonları hem de React bileşenleri için test düşüncesi ele alınır.

Dağıtım başlığında öğrencinin Vite tabanlı bir projede `npm run build` komutunun üretim çıktısı ürettiğini, `dist` klasörünün statik barındırma ortamlarına gönderilebilecek temel çıktı olduğunu ve `npm run preview` komutunun üretim derlemesini yerel olarak kontrol etmek için kullanıldığını anlaması beklenir.

## 15.4 Çalışan uygulamadan kaliteli uygulamaya geçiş

Bir React uygulaması ekranda doğru içerikleri gösterdiğinde “çalışıyor” denebilir. Fakat gerçek dünyada kalite bundan daha geniştir. Kullanıcı hızlı tepki bekler. Form hataları anlaşılır olmalıdır. API başarısız olduğunda uygulama sessizce bozulmamalıdır. Yeni bir özellik eklendiğinde önceki davranışların kırılmadığından emin olunmalıdır. Uygulama geliştirme ortamında değil, production build ile de doğru çalışmalıdır.

KampüsHub bağlamında kaliteyi şu üç soruyla düşünmek yararlıdır:

1. Kullanıcı uygulamayı akıcı kullanabiliyor mu?
2. Kritik davranışların bozulmadığını testlerle görebiliyor muyuz?
3. Uygulama build alınıp dağıtıma gönderildiğinde beklenen şekilde çalışıyor mu?

Bu üç soru Bölüm 15’in performans, test ve dağıtım başlıklarına karşılık gelir. Bu başlıklar birbirinden ayrı gibi görünse de pratikte birbirini tamamlar. Örneğin performans için yaptığınız bir optimizasyon, testlerle korunmuyorsa ileride yanlışlıkla bozulabilir. Dağıtıma çıkmadan önce testlerin geçmesi, build’in alınması ve temel yönlendirmelerin kontrol edilmesi gerekir. Bu nedenle Bölüm 15, KampüsHub projesinin ürünleşme eşiğidir.

## 15.5 Performans problemine doğru bakmak

Performans denildiğinde öğrenciler çoğu zaman ilk olarak `useMemo`, `useCallback` veya `memo` kullanmayı düşünür. Oysa iyi bir performans yaklaşımı önce problemi tanımlar. Problem gerçekten render maliyeti mi? Hesaplama mı pahalı? API yavaş mı? Paket boyutu mu büyük? Görsel dosyalar mı ağır? Kullanıcı gereksiz yere çok fazla veri mi görüyor?

KampüsHub’da performans problemleri aşağıdaki örneklerde ortaya çıkabilir:

- Duyuru listesi yüzlerce öğeye ulaştığında her tuş vuruşunda filtreleme pahalı hâle gelir.
- Etkinlik takvimi her render sırasında tarihleri yeniden gruplar.
- Profil sayfası her küçük state değişiminde büyük alt bileşenleri yeniden hesaplar.
- Not paylaşımı sayfasında arama, kategori ve sıralama işlemleri aynı anda pahalılaşır.
- Uygulama ilk açılışta gereğinden fazla JavaScript indirir.
- API yüklenirken kullanıcıya geri bildirim verilmez ve uygulama donmuş gibi algılanır.

Bu örneklerde çözüm tek bir araç değildir. Bazı durumlarda hesaplamayı basitleştirmek yeterlidir. Bazı durumlarda listeyi sayfalara bölmek gerekir. Bazı durumlarda `useMemo` işe yarayabilir. Bazı durumlarda ise asıl sorun istemci tarafında değil, API yanıt süresi veya gereğinden büyük veridir.

Bu bölümün temel ilkesi şudur: Performans iyileştirmesi ölçüm, gözlem ve gerekçeye dayanmalıdır.

## 15.6 Render, hesaplama ve paket boyutu ayrımı

React performansı üç farklı düzeyde düşünülebilir. Birincisi render davranışıdır. State veya props değiştiğinde bileşen fonksiyonu yeniden çalışır. Bu, React’in normal çalışma modelidir. İkincisi hesaplama maliyetidir. Render sırasında büyük liste filtreleme, sıralama, gruplama veya karmaşık veri dönüştürme yapılıyorsa bu hesaplama pahalı olabilir. Üçüncüsü paket boyutudur. Kullanıcı uygulamayı açarken indirilen JavaScript ve CSS dosyaları fazla büyükse ilk yüklenme gecikebilir.

KampüsHub örneğinde duyuru kartlarının yeniden render edilmesi tek başına sorun değildir. Fakat her render sırasında tüm duyuruların yeniden filtrelenmesi, tarihe göre gruplanması, öncelik hesabı yapılması ve büyük bir grafik veri seti üretilmesi sorun olabilir. Bu nedenle performans analizinde “ne yeniden render oldu?” sorusu kadar “render sırasında ne kadar iş yapıldı?” sorusu da önemlidir.

Paket boyutu ise farklı bir katmandır. Uygulama içinde hiç kullanılmayan büyük bir kütüphane eklemek veya tüm sayfaları ilk açılışta yüklemek başlangıç performansını etkileyebilir. Bu bölümde code splitting ayrıntılarına girilmeyecek; ancak öğrencinin build çıktısını ve performans bütçesini düşünmesi sağlanacaktır.

## 15.7 `memo`, `useMemo` ve `useCallback` ne zaman düşünülmeli?

React’te `memo`, props değişmediğinde bir bileşenin yeniden render edilmesini atlamaya yardımcı olabilir. `useMemo`, pahalı bir hesaplamanın sonucunu bağımlılıklar değişmediği sürece saklamak için kullanılır. `useCallback` ise bir fonksiyon referansını bağımlılıklar değişmediği sürece sabit tutmaya yardımcı olur.

Bu araçlar güçlüdür; ancak her yere eklenmeleri gerekmez. Hatta gereksiz kullanıldıklarında kod okunabilirliğini azaltabilirler. Örneğin iki elemanlı bir dizi üzerinde yapılan basit filtreleme için `useMemo` kullanmak çoğu zaman anlamlı değildir. Buna karşılık yüzlerce duyuru veya not üzerinde yapılan pahalı bir filtreleme, aynı bağımlılıklarla tekrar tekrar çalışıyorsa `useMemo` düşünülebilir.

KampüsHub’da örnek bir değerlendirme şöyle yapılabilir:

- Duyuru listesi küçükse doğrudan hesaplama yeterlidir.
- Liste büyüyorsa ve filtreleme sık yapılıyorsa hesaplama maliyeti ölçülmelidir.
- Aynı liste ve aynı filtreyle gereksiz hesaplama tekrarlanıyorsa `useMemo` düşünülebilir.
- Çocuk bileşene fonksiyon prop’u aktarılıyor ve bu prop gereksiz render tetikliyorsa `useCallback` değerlendirilebilir.
- Profil kartı gibi küçük ve ucuz bileşenlerde memoizasyon genellikle öncelikli değildir.

Aşağıdaki örnek, KampüsHub duyuru listesi için memoizasyon kararını saf JavaScript düzeyinde modellemektedir. Amaç React kodunu taklit etmek değil, karar mantığını test edilebilir hâle getirmektir.

<!-- CODE_META
id: react_ch15_code01
chapter_id: chapter_15
language: javascript
kind: example
title: "KampüsHub liste filtresi için memoizasyon kararı"
file: "chapter_15/react_ch15_code01_memo_decision.js"
extract: true
test: compile_run_assert
expected_stdout: "visible=3 | strategy=memoize | reason=large-list-stable-query"
-->

```javascript
const announcements = [
  { id: 1, title: "Vize takvimi", category: "Ders" },
  { id: 2, title: "React atölyesi", category: "Etkinlik" },
  { id: 3, title: "Final duyurusu", category: "Ders" },
  { id: 4, title: "Kütüphane saatleri", category: "Kampüs" },
  { id: 5, title: "Proje teslimi", category: "Ders" },
  { id: 6, title: "Spor turnuvası", category: "Etkinlik" }
];

function filterAnnouncements(items, category) {
  return items.filter((item) => item.category === category);
}

function chooseMemoStrategy({ listSize, queryChanged, calculationMs }) {
  if (listSize >= 5 && !queryChanged && calculationMs >= 4) {
    return {
      strategy: "memoize",
      reason: "large-list-stable-query"
    };
  }
  return {
    strategy: "direct",
    reason: "cheap-or-changing"
  };
}

const visible = filterAnnouncements(announcements, "Ders");
const decision = chooseMemoStrategy({
  listSize: announcements.length,
  queryChanged: false,
  calculationMs: 6
});

console.log(`visible=${visible.length} | strategy=${decision.strategy} | reason=${decision.reason}`);
```

## 15.8 KampüsHub için performans bütçesi

Performans bütçesi, uygulamanın kabul edilebilir sınırlarını önceden tanımlama yaklaşımıdır. Bu bütçe yalnızca milisaniye değerlerinden ibaret olmak zorunda değildir. Ders kitabı düzeyinde basit ve anlaşılır ölçütler kullanılabilir:

- Ana JavaScript dosyası belirli bir boyutu aşmamalıdır.
- Kritik sayfalar gereksiz büyük veriyle açılmamalıdır.
- Liste filtreleme belirli büyüklükten sonra optimize edilmelidir.
- Kullanıcı her API isteğinde loading/hata geri bildirimi görmelidir.
- Dağıtım öncesi build uyarıları incelenmelidir.

KampüsHub için başlangıç düzeyinde bir performans bütçesi şöyle tanımlanabilir:

| Alan | Basit hedef | Gerekçe |
|---|---:|---|
| Ana JS paketi | 250 KB uyarı sınırı | İlk yükleme algısını korumak |
| Duyuru listesi | 100+ öğede filtreleme stratejisini gözden geçir | Arama ve kategori filtresini akıcı tutmak |
| API geri bildirimi | Her istek için loading/error/success | Kullanıcı belirsizliğini azaltmak |
| Büyük görsel | Gereksiz yüksek çözünürlükten kaçın | Ağ ve render maliyetini azaltmak |
| Build uyarıları | Dağıtım öncesi incelenmeli | Üretim hatalarını erken yakalamak |

Bu tablo katı bir endüstri standardı değil, öğrenciye kalite eşiği düşüncesi kazandırmak için kullanılan pedagojik bir başlangıçtır. Gerçek projelerde hedefler kullanıcı kitlesi, cihaz profili, ağ koşulları ve ürün gereksinimlerine göre değişir.

<!-- CODE_META
id: react_ch15_code02
chapter_id: chapter_15
language: javascript
kind: example
title: "KampüsHub performans bütçesi denetleyicisi"
file: "chapter_15/react_ch15_code02_performance_budget.js"
extract: true
test: compile_run_assert
expected_stdout: "budget=warn | over=main.js"
-->

```javascript
const assets = [
  { name: "main.js", sizeKb: 310 },
  { name: "vendor.js", sizeKb: 240 },
  { name: "style.css", sizeKb: 48 }
];

function checkPerformanceBudget(files, maxKb) {
  const overBudget = files.filter((file) => file.sizeKb > maxKb).map((file) => file.name);
  return {
    status: overBudget.length === 0 ? "pass" : "warn",
    overBudget
  };
}

const result = checkPerformanceBudget(assets, 250);
console.log(`budget=${result.status} | over=${result.overBudget.join(",") || "none"}`);
```

## 15.9 Test neden gereklidir?

Test, kodun doğru çalıştığını kanıtlamaz; ancak beklenen davranışların bozulmasını erken fark etmeye yardımcı olur. Bir uygulama büyüdükçe elle kontrol yeterli olmamaya başlar. KampüsHub’da duyuru kartı, profil özet alanı, not filtreleme, API hata mesajı, route yönlendirmesi ve form doğrulama gibi pek çok davranış vardır. Her değişiklikten sonra tüm bu davranışları manuel denetlemek zamanla sürdürülemez.

Test yazmanın üç temel katkısı vardır. Birincisi güven verir. Öğrenci bir fonksiyonu değiştirdiğinde, beklenen çıktının hâlâ üretildiğini görebilir. İkincisi tasarımı iyileştirir. Test edilebilir kod genellikle daha küçük, daha açık ve daha az bağımlı modüllerden oluşur. Üçüncüsü belge işlevi görür. İyi yazılmış testler, sistemin hangi davranışı vaat ettiğini gösterir.

KampüsHub’da test edilecek davranışlar şu şekilde sınıflandırılabilir:

- Saf veri dönüştürme fonksiyonları
- Form doğrulama yardımcıları
- API durumlarını yorumlayan yardımcılar
- Bileşenlerin kullanıcıya gösterdiği metinler
- Buton, bağlantı ve form etkileşimleri
- Hata ve boş veri durumları
- Dağıtım öncesi kalite kontrol scriptleri

## 15.10 Unit test, component test ve entegrasyon testi

Unit test, küçük ve izole bir fonksiyonun beklenen çıktıyı üretip üretmediğini kontrol eder. Örneğin duyuru filtreleme fonksiyonuna “Ders” kategorisi verildiğinde yalnızca ders duyurularını döndürmesi bir unit test senaryosudur.

Component test, React bileşeninin kullanıcıya ne gösterdiğini ve belirli bir etkileşime nasıl yanıt verdiğini kontrol eder. Örneğin `AnnouncementCard` bileşeninin duyuru başlığını göstermesi veya `ProfileSummary` bileşeninin kullanıcı bilgisi yokken “Profil bilgisi bulunamadı” mesajını göstermesi component test kapsamına girer.

Entegrasyon testi ise birden fazla parçanın birlikte çalışmasını kontrol eder. Örneğin duyuru arama kutusu, kategori filtresi ve liste bileşeninin birlikte doğru sonucu göstermesi bir entegrasyon testi olarak düşünülebilir. Bu kitapta uçtan uca test ayrıntılarına girilmeyecek; ancak entegrasyon düşüncesi bileşenler arası davranışları anlamak için kullanılacaktır.

## 15.11 Vitest ve React Testing Library’ye giriş

Vitest, Vite ekosistemiyle uyumlu hızlı bir test aracıdır. React projelerinde saf JavaScript yardımcı fonksiyonlarını, hook mantığını ve bileşen davranışlarını test etmek için kullanılabilir. React Testing Library ise bileşenleri kullanıcının gördüğü ve etkileştiği biçimde test etmeyi teşvik eder. Bu yaklaşım, bileşenin iç implementasyon ayrıntıları yerine ekrandaki davranışa odaklanır.

Örneğin bir profil kartı testinde “component state’i şu değere eşit mi?” sorusundan çok “kullanıcı adını ekranda görebiliyor muyum?” sorusu daha anlamlıdır. Benzer şekilde bir hata durumunda “error değişkeni true oldu mu?” yerine “kullanıcıya hata mesajı gösteriliyor mu?” sorusu tercih edilir.

Bileşen testleri genellikle tarayıcı benzeri bir DOM ortamı gerektirir. Vitest tarafında `jsdom` veya `happy-dom` gibi ortamlar bu amaçla kullanılabilir. Bu bölümde ayrıntılı kurulum komutları yerine kavramsal akış üzerinde durulacaktır: test ortamı hazırlanır, bileşen render edilir, kullanıcıya görünen metin veya etkileşim sorgulanır ve beklenen sonuç doğrulanır.

Aşağıdaki örnek, gerçek bir React test dosyası değil; KampüsHub bileşenleri için test matrisi üretme yardımcı fonksiyonudur. Böylece test tasarımı Node ortamında da doğrulanabilir.

<!-- CODE_META
id: react_ch15_code03
chapter_id: chapter_15
language: javascript
kind: example
title: "KampüsHub bileşen test matrisi üretme"
file: "chapter_15/react_ch15_code03_test_matrix.js"
extract: true
test: compile_run_assert
expected_stdout: "tests=5 | critical=3"
-->

```javascript
const components = [
  { name: "AnnouncementCard", risks: ["title", "category"] },
  { name: "ProfileSummary", risks: ["empty-user"] },
  { name: "NoteFilter", risks: ["query", "empty-result"] }
];

function createTestMatrix(items) {
  return items.flatMap((component) =>
    component.risks.map((risk) => ({
      component: component.name,
      scenario: `${component.name}:${risk}`,
      critical: risk.includes("empty") || risk === "query"
    }))
  );
}

const matrix = createTestMatrix(components);
const criticalCount = matrix.filter((test) => test.critical).length;
console.log(`tests=${matrix.length} | critical=${criticalCount}`);
```

## 15.12 Kullanıcı odaklı test senaryosu yazmak

Kullanıcı odaklı test senaryosu, bileşenin iç değişkenlerinden çok kullanıcının gözlemlediği davranışa odaklanır. Örneğin duyuru kartı için kötü bir test hedefi “component içinde `announcement.title` değişkeni kullanılmış mı?” sorusudur. Daha iyi bir hedef “duyuru başlığı ekranda görünüyor mu?” sorusudur.

KampüsHub için örnek test senaryoları:

| Bileşen | Kullanıcı davranışı | Beklenen sonuç |
|---|---|---|
| Duyuru kartı | Duyuru listesi açılır | Başlık, kategori ve tarih görünür |
| Not filtresi | Arama kutusuna “React” yazılır | React ile ilgili notlar listelenir |
| Profil özeti | Kullanıcı bilgisi boş gelir | Anlaşılır boş durum mesajı görünür |
| API duyuru paneli | Sunucu hata döndürür | Hata mesajı ve tekrar dene aksiyonu görünür |
| Navbar | Profil bağlantısına tıklanır | Profil sayfası aktif olur |

Bu tür senaryolar, testin teknik ayrıntısından önce davranışın netleşmesini sağlar. İyi bir test çoğu zaman iyi tanımlanmış bir kullanıcı beklentisiyle başlar.

## 15.13 API durumlarının test edilmesi

Bölüm 13’te REST API entegrasyonu sırasında loading, error ve success durumlarının ayrı ayrı ele alınması gerektiğini görmüştük. Bölüm 15’te bu durumların test kapsamına dönüştürülmesi gerekir. Kullanıcı açısından üç durum da anlamlıdır:

- Veri yüklenirken bekleme mesajı veya iskelet görünüm olmalıdır.
- Hata oluştuğunda sessiz başarısızlık yerine açıklayıcı mesaj gösterilmelidir.
- Veri başarıyla geldiğinde doğru sayı, içerik veya liste görünmelidir.

Bu yaklaşım, API entegrasyonunu yalnızca veri çekme işlemi olmaktan çıkarır ve kullanıcı deneyiminin test edilebilir parçası hâline getirir. Aşağıdaki örnek, API durumlarını test iddialarına dönüştürür.

<!-- CODE_META
id: react_ch15_code04
chapter_id: chapter_15
language: javascript
kind: example
title: "API durumlarını test kapsamına dönüştürme"
file: "chapter_15/react_ch15_code04_api_state_tests.js"
extract: true
test: compile_run_assert
expected_stdout: "states=loading,error,success | assertions=3"
-->

```javascript
const apiStates = {
  loading: { visibleText: "Duyurular yükleniyor..." },
  error: { visibleText: "Duyurular alınamadı." },
  success: { visibleText: "3 duyuru listelendi." }
};

function mapApiStatesToAssertions(states) {
  return Object.entries(states).map(([state, config]) => ({
    state,
    assertion: `screen shows: ${config.visibleText}`
  }));
}

const assertions = mapApiStatesToAssertions(apiStates);
console.log(`states=${assertions.map((item) => item.state).join(",")} | assertions=${assertions.length}`);
```

## 15.14 Vite ile production build mantığı

Geliştirme sırasında Vite dev server hızlı geri bildirim sağlar. Fakat dağıtıma çıkmadan önce uygulamanın production build çıktısı alınmalıdır. Production build; kaynak dosyaların optimize edilmiş, paketlenmiş ve statik olarak servis edilebilir hâle getirilmiş sürümüdür.

Vite tabanlı tipik bir projede build komutu `vite build`, yerel üretim önizleme komutu ise `vite preview` biçimindedir. Build işlemi varsayılan olarak `dist` klasörü üretir. Bu klasör statik hosting ortamlarına dağıtılabilecek temel çıktıdır. Preview komutu ise bu `dist` çıktısını yerel olarak kontrol etmeye yarar; gerçek production sunucusu yerine geçmez.

KampüsHub için dağıtım öncesi temel adımlar şöyle düşünülmelidir:

1. Bağımlılıkların kurulu olduğundan emin ol.
2. Testleri çalıştır.
3. Production build al.
4. Build uyarılarını incele.
5. Preview ile route ve kritik sayfaları kontrol et.
6. Çevresel değişkenlerin doğru yapılandırıldığını doğrula.
7. Statik hosting ortamına `dist` çıktısını gönder.

Bu akış, öğrencinin geliştirme ortamında çalışan uygulama ile üretim çıktısı arasındaki farkı anlamasını sağlar.

<!-- CODE_META
id: react_ch15_code05
chapter_id: chapter_15
language: javascript
kind: example
title: "Vite dağıtım scriptlerini doğrulama"
file: "chapter_15/react_ch15_code05_vite_scripts.js"
extract: true
test: compile_run_assert
expected_stdout: "scripts=ok | build=vite build | preview=vite preview"
-->

```javascript
const packageJson = {
  scripts: {
    dev: "vite",
    test: "vitest",
    build: "vite build",
    preview: "vite preview"
  }
};

function validateDeploymentScripts(config) {
  const scripts = config.scripts || {};
  const required = ["build", "preview", "test"];
  const missing = required.filter((name) => !scripts[name]);
  return {
    ok: missing.length === 0,
    missing,
    build: scripts.build,
    preview: scripts.preview
  };
}

const result = validateDeploymentScripts(packageJson);
console.log(`scripts=${result.ok ? "ok" : "missing"} | build=${result.build} | preview=${result.preview}`);
```

## 15.15 Dağıtım öncesi kalite kapısı

Dağıtım öncesi kalite kapısı, uygulamanın yayına gönderilmeden önce geçmesi gereken minimum kontrolleri tanımlar. Profesyonel projelerde bu kontroller CI/CD pipeline içinde otomatik yürütülür. Ders kitabı düzeyinde ise amaç öğrencinin kontrol listesini sistematik biçimde oluşturmasıdır.

KampüsHub için örnek kalite kapısı şu maddeleri içerebilir:

- Testler geçiyor mu?
- Production build başarıyla alınıyor mu?
- Ana route, duyurular, etkinlikler, notlar ve profil sayfaları açılıyor mu?
- Bilinmeyen route için 404 sayfası çalışıyor mu?
- API hata durumunda kullanıcıya mesaj gösteriliyor mu?
- Form validasyonları temel senaryolarda çalışıyor mu?
- Erişilebilirlik açısından temel etiketler ve buton metinleri anlaşılır mı?
- Ortam değişkenleri production için doğru mu?
- Kullanıcıya gösterilmemesi gereken debug çıktıları kaldırılmış mı?
- Screenshot üretim marker’ları ve kitap görsel planı bozulmamış mı?

Aşağıdaki örnek, kalite kapısının basit bir rapora dönüştürülmesini gösterir.

<!-- CODE_META
id: react_ch15_code06
chapter_id: chapter_15
language: javascript
kind: example
title: "Dağıtım öncesi kalite kapısı raporu"
file: "chapter_15/react_ch15_code06_release_gate.js"
extract: true
test: compile_run_assert
expected_stdout: "release=blocked | failed=accessibility,env"
-->

```javascript
const checks = [
  { name: "tests", passed: true },
  { name: "build", passed: true },
  { name: "accessibility", passed: false },
  { name: "routing", passed: true },
  { name: "env", passed: false }
];

function summarizeReleaseGate(items) {
  const failed = items.filter((item) => !item.passed).map((item) => item.name);
  return {
    release: failed.length === 0 ? "ready" : "blocked",
    failed
  };
}

const summary = summarizeReleaseGate(checks);
console.log(`release=${summary.release} | failed=${summary.failed.join(",") || "none"}`);
```

## 15.16 Programatik ekran çıktısı planı

Bu bölümde ekran çıktıları, performans ve dağıtım gibi soyut konuları somutlaştırmak için kullanılmalıdır. Ekran çıktıları gerçek production ölçüm aracı olmak zorunda değildir; ders kitabı için amaç, öğrencinin kalite göstergelerini görsel olarak okuyabilmesidir.

<!-- SCREENSHOT_META
id: b15_01_kampushub_performans_paneli
chapter: chapter_15
figure: "Şekil 15.1"
title: "KampüsHub performans değerlendirme paneli"
route: "/__book__/chapter-15/kampushub-performans-paneli"
waitFor: "[data-book-shot='b15_01_kampushub_performans_paneli']"
actions: []
output: "assets/auto/chapter_15/b15_01_kampushub_performans_paneli.png"
caption: "KampüsHub uygulamasında liste boyutu, hesaplama maliyeti ve paket bütçesi göstergelerinin birlikte değerlendirildiği performans paneli."
markdownTarget: "[SCREENSHOT:b15_01_kampushub_performans_paneli]"
-->

[SCREENSHOT:b15_01_kampushub_performans_paneli]

<!-- SCREENSHOT_META
id: b15_02_test_sonuclari_paneli
chapter: chapter_15
figure: "Şekil 15.2"
title: "KampüsHub test sonuçları paneli"
route: "/__book__/chapter-15/test-sonuclari-paneli"
waitFor: "[data-book-shot='b15_02_test_sonuclari_paneli']"
actions: []
output: "assets/auto/chapter_15/b15_02_test_sonuclari_paneli.png"
caption: "Vitest ve React Testing Library yaklaşımıyla tasarlanan KampüsHub test kapsamının özetlendiği örnek panel."
markdownTarget: "[SCREENSHOT:b15_02_test_sonuclari_paneli]"
-->

[SCREENSHOT:b15_02_test_sonuclari_paneli]

<!-- SCREENSHOT_META
id: b15_03_dagitim_onizleme
chapter: chapter_15
figure: "Şekil 15.3"
title: "KampüsHub dağıtım önizleme ekranı"
route: "/__book__/chapter-15/dagitim-onizleme"
waitFor: "[data-book-shot='b15_03_dagitim_onizleme']"
actions: []
output: "assets/auto/chapter_15/b15_03_dagitim_onizleme.png"
caption: "Production build sonrasında KampüsHub uygulamasının yerel önizleme ve dağıtım kontrol ekranı."
markdownTarget: "[SCREENSHOT:b15_03_dagitim_onizleme]"
-->

[SCREENSHOT:b15_03_dagitim_onizleme]

Bu üç ekran çıktısı Bölüm 15’in üç ana eksenini temsil eder. İlk görsel performans bütçesi ve liste maliyeti gibi kavramları, ikinci görsel test kapsamı ve test sonuçlarını, üçüncü görsel ise production build sonrası dağıtım önizleme mantığını somutlaştırır.

## 15.17 CODE_META ve test edilebilir kod örnekleri

Bu bölümdeki CODE_META örnekleri doğrudan React bileşeni çalıştırmak yerine KampüsHub kalite kararlarını test edilebilir saf JavaScript yardımcılarına dönüştürür. Bunun iki nedeni vardır. Birincisi, Node ortamında otomatik test edilebilirlik kitap üretim hattı için daha kararlıdır. İkincisi, performans bütçesi, test matrisi ve dağıtım checklist’i gibi kararlar React bileşenlerinden bağımsız olarak da modellenebilir.

Bölümde kullanılan altı örnek şu öğrenme hedeflerini destekler:

| Kod ID | Amaç | Test yaklaşımı |
|---|---|---|
| `react_ch15_code01` | Memoizasyon karar mantığı | Beklenen strateji ve görünür öğe sayısı |
| `react_ch15_code02` | Performans bütçesi kontrolü | Bütçe aşımı var mı? |
| `react_ch15_code03` | Test matrisi üretimi | Senaryo ve kritik test sayısı |
| `react_ch15_code04` | API durum testleri | Loading/error/success kapsamı |
| `react_ch15_code05` | Vite script kontrolü | Build/preview/test var mı? |
| `react_ch15_code06` | Release gate özeti | Dağıtım hazır mı, bloklayan kontroller neler? |

Bu örnekler, öğrencinin kaliteyi yalnızca sezgisel değil, kodla doğrulanabilir bir süreç olarak görmesine yardımcı olur.

## 15.18 Sık yapılan hatalar ve yanlış sezgiler

React performansı, test ve dağıtım konularında başlangıç düzeyinde sık görülen hatalar vardır.

Birinci hata, her şeyi memoize etmektir. `useMemo` ve `useCallback` performans araçlarıdır; doğruluk aracı değildir. Kod bu araçlar olmadan yanlış çalışıyorsa önce temel mantık düzeltilmelidir. Memoizasyon daha sonra, ölçülebilir bir performans problemi varsa eklenmelidir.

İkinci hata, testleri implementasyon ayrıntılarına bağlamaktır. Kullanıcı açısından önemli olan ekranda ne göründüğü ve etkileşimin nasıl sonuçlandığıdır. Bileşenin iç değişken adını test etmek, küçük refactor işlemlerinde gereksiz test kırılmalarına yol açar.

Üçüncü hata, yalnızca başarılı senaryoyu test etmektir. API entegrasyonlarında loading ve error durumları en az success kadar önemlidir. KampüsHub duyuruları alınamadığında kullanıcıya ne gösterileceği test edilmelidir.

Dördüncü hata, development server’da çalışan uygulamayı dağıtıma hazır sanmaktır. Dev server ile production build aynı şey değildir. Build alınmalı, preview ile kontrol edilmeli ve dağıtım ortamındaki route davranışı incelenmelidir.

Beşinci hata, performans sorunlarını yalnızca React tarafında aramaktır. Bazen asıl problem büyük görseller, gereksiz veri, yavaş API, yanlış cache stratejisi veya gereksiz kütüphane kullanımı olabilir.

## 15.19 Hata ayıklama egzersizi

Aşağıdaki senaryoyu inceleyin:

KampüsHub not paylaşımı sayfasında kullanıcı arama kutusuna her harf yazdığında uygulama kısa süreli takılıyor. Öğrenci ilk çözüm olarak tüm alt bileşenleri `memo` ile sarmalıyor ve her fonksiyonu `useCallback` içine alıyor. Fakat sorun büyük ölçüde devam ediyor. Ayrıca kod okunması zor hâle geliyor.

Bu durumda beklenen analiz şu adımları içermelidir:

1. Takılmanın gerçekten render kaynaklı mı, hesaplama kaynaklı mı olduğu incelenmelidir.
2. Arama sırasında kaç not üzerinde filtreleme yapıldığı kontrol edilmelidir.
3. Filtreleme, sıralama ve gruplama işlemlerinin aynı render içinde tekrar tekrar yapılıp yapılmadığına bakılmalıdır.
4. Liste küçükse memoizasyon yerine sade kod tercih edilmelidir.
5. Liste büyükse hesaplama sonucu `useMemo` ile değerlendirilebilir.
6. Kullanıcı her tuşa bastığında filtreleme yapılması yerine debounce gibi ileri teknikler ilerleyen aşamada düşünülebilir.
7. Testler, arama sonucunun doğru notları gösterdiğini garanti etmelidir.
8. Performans iyileştirmesi sonrasında davranışın bozulmadığı testlerle doğrulanmalıdır.

Bu egzersizin ana fikri, optimizasyonun araç seçmekten önce problem tanımlamak olduğudur.

## 15.20 Bölüm özeti ve terim sözlüğü

Bu bölümde KampüsHub uygulaması çalışan bir React projesinden kalite odaklı bir ürün adayına doğru ilerletildi. Performans bölümünde render, hesaplama ve paket boyutu ayrımı yapıldı. Memoizasyonun her durumda gerekli olmadığı; `memo`, `useMemo` ve `useCallback` araçlarının ölçülebilir ihtiyaçla kullanılmasının daha doğru olduğu vurgulandı. KampüsHub için basit performans bütçesi oluşturuldu.

Test bölümünde unit test, component test ve entegrasyon testi ayrımı yapıldı. Vitest ve React Testing Library yaklaşımı kullanıcı davranışı odaklı test düşüncesiyle ilişkilendirildi. API loading, error ve success durumlarının test kapsamına alınması gerektiği gösterildi.

Dağıtım bölümünde Vite production build, `dist` çıktısı, preview ve dağıtım öncesi kalite kapısı ele alındı. Öğrenci, Bölüm 16’da final KampüsHub uygulamasını tamamlarken yalnızca özellik eklemeye değil, test ve dağıtım hazırlığına da dikkat etmelidir.

Terim sözlüğü:

| Terim | Açıklama |
|---|---|
| Performans bütçesi | Uygulamanın kabul edilebilir hız, boyut veya maliyet sınırlarını tanımlayan ölçütler |
| Render | React bileşen fonksiyonunun UI çıktısını üretmek üzere çalışması |
| Memoizasyon | Bir hesaplama sonucunu veya fonksiyon referansını tekrar kullanmak üzere saklama yaklaşımı |
| Unit test | Küçük ve izole bir fonksiyonun beklenen çıktısını test etme |
| Component test | React bileşeninin kullanıcıya gösterdiği davranışı test etme |
| Entegrasyon testi | Birden fazla parçanın birlikte çalışmasını test etme |
| jsdom | Node ortamında tarayıcı benzeri DOM sağlayan test ortamı |
| Production build | Uygulamanın dağıtıma uygun optimize edilmiş çıktısı |
| Preview | Production build çıktısını yerelde kontrol etme süreci |
| Release gate | Dağıtım öncesi geçilmesi gereken kalite kontrol listesi |

## 15.21 Kavramsal sorular

1. React’te bir bileşenin yeniden render edilmesi neden her zaman performans hatası değildir?
2. `useMemo` hangi tür hesaplamalarda daha anlamlıdır?
3. `useCallback` ile `useMemo` arasındaki temel fark nedir?
4. Bir uygulamada performans bütçesi belirlemek neden yararlıdır?
5. KampüsHub duyuru listesinde performans sorunu olup olmadığını nasıl anlarsınız?
6. Unit test ile component test arasındaki farkı KampüsHub örneğiyle açıklayın.
7. React Testing Library neden kullanıcı davranışına odaklanmayı teşvik eder?
8. API hata durumunun test edilmemesi hangi kullanıcı deneyimi risklerine yol açar?
9. Vite `build` ve `preview` komutları arasında nasıl bir fark vardır?
10. Dağıtım öncesi kalite kapısında hangi kontroller mutlaka yer almalıdır?

## 15.22 Programlama alıştırmaları

1. KampüsHub duyuru listesi için kategori ve arama metnine göre filtreleme yapan saf bir JavaScript fonksiyonu yazın. Bu fonksiyon için üç farklı test senaryosu tasarlayın.
2. Not paylaşımı sayfası için basit bir performans bütçesi nesnesi oluşturun. Liste boyutu, filtreleme süresi ve paket boyutu alanlarını değerlendiren bir kontrol fonksiyonu yazın.
3. Profil özet bileşeni için kullanıcı bilgisi dolu ve boş olduğunda beklenen ekran metinlerini içeren test senaryosu matrisi hazırlayın.
4. API loading, error ve success durumlarını temsil eden bir nesne tasarlayın. Bu nesneyi kullanıcıya gösterilecek mesajlara dönüştüren yardımcı fonksiyonu yazın.
5. `package.json` içindeki `build`, `preview` ve `test` scriptlerini kontrol eden bir doğrulama fonksiyonu geliştirin.
6. Dağıtım öncesi kalite kapısı için en az sekiz kontrol maddesi içeren bir liste oluşturun ve başarısız maddeleri raporlayan fonksiyonu yazın.
7. Bir bileşende gereksiz `useMemo` kullanımı olduğunu düşündüğünüz bir örnek tasarlayın. Bu kullanımın neden gereksiz olduğunu açıklayın.
8. KampüsHub final uygulamasına geçmeden önce çalıştırılması gereken yerel kontrol komutlarını ve beklenen sonuçları listeleyin.

## 15.23 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi KampüsHub uygulamasını Bölüm 16’daki final entegrasyona hazırlamaktır. Öğrenciden beklenenler şunlardır:

1. Duyuru, etkinlik, not veya profil modüllerinden birini seçin.
2. Seçilen modül için en az üç performans riski belirleyin.
3. Bu risklerden biri için ölçülebilir bir performans bütçesi tanımlayın.
4. En az iki saf JavaScript yardımcı fonksiyon için test senaryosu yazın.
5. En az bir React bileşeni için kullanıcı odaklı component test taslağı hazırlayın.
6. API loading, error ve success durumlarını kapsayan test planı oluşturun.
7. `npm run build` ve `npm run preview` akışını belgeleyen kısa bir dağıtım öncesi rapor hazırlayın.
8. Final teslim için release gate checklist’i oluşturun.

Teslim dosyasında şu başlıklar bulunmalıdır:

- Modül adı
- Performans riskleri
- Performans bütçesi
- Test senaryoları
- API durum kapsamı
- Build/preview notları
- Dağıtım öncesi checklist
- Kısa öz değerlendirme

## 15.24 İleri okuma ve bir sonraki bölüme köprü

Bu bölüm, performans, test ve dağıtım konularına giriş düzeyinde sistematik bir çerçeve sundu. İleri aşamada React Profiler, Web Vitals, code splitting, lazy loading, uçtan uca test araçları, CI/CD pipeline, statik hosting yapılandırmaları ve production izleme sistemleri ayrıntılı biçimde incelenebilir. Ancak bu kitapta odak, başlangıç düzeyindeki öğrencinin güvenilir bir React uygulamasını tamamlamasıdır.

Bir sonraki bölümde KampüsHub final uygulaması ele alınacaktır. Bölüm 16’da önceki tüm kazanımlar bir araya getirilecek; sayfa yapısı, formlar, state yönetimi, API entegrasyonu, kullanıcı tercihleri, test hazırlığı ve dağıtım kontrol listesi tek bir tamamlanmış proje akışı içinde değerlendirilecektir. Bölüm 15’te hazırlanan performans bütçesi, test matrisi ve release gate checklist’i Bölüm 16’nın kalite omurgasını oluşturacaktır.
