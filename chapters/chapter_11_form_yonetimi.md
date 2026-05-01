---
title: "Bölüm 11: Form Yönetimi"
chapter_id: "chapter_11"
book_title: "React ile Web Uygulama Geliştirme"
subtitle: "KampüsHub Projesi Üzerinden Modern Front-End Uygulama Geliştirme"
author: "Prof. Dr. İsmail KIRBAŞ"
language: "tr-TR"
year: "2026"
status: "draft"
---

# Bölüm 11: Form Yönetimi

## 11.1 Bölümün yol haritası

Bölüm 10’da KampüsHub uygulamasını sayfalara ayırdık ve React Router ile ana gezinme iskeletini kurduk. Bu bölümde o sayfaların içine kullanıcıdan veri alan, veriyi doğrulayan ve gönderime hazırlayan form bileşenleri yerleştirilecektir. Profil düzenleme, not paylaşımı, etkinlik arama ve duyuru filtreleme gibi ekranlar, gerçek bir kampüs uygulamasında kullanıcı etkileşiminin merkezinde yer alır.

Bu bölümde form yönetimi yalnızca birkaç `<input>` alanını ekrana koymak olarak ele alınmayacaktır. Bir formun değeri, hata durumu, ziyaret edilmiş alan bilgisi, değişmiş alan bilgisi, gönderim davranışı ve API’ye gönderilmeye hazır payload nesnesi vardır. Bu nedenle form yönetimi, React’te bileşen state’i, olay işleyiciler, doğrulama fonksiyonları ve kullanıcı deneyimi tasarımının kesiştiği bir konudur.

Bölümün ana ekseni KampüsHub’daki profil düzenleme ve not paylaşımı formlarıdır. Önce HTML form davranışı hatırlatılacak, ardından React’te kontrollü ve kontrolsüz form elemanları karşılaştırılacaktır. Daha sonra `onChange`, `onSubmit`, `preventDefault`, `value`, `checked`, `defaultValue`, hata mesajı üretimi ve payload hazırlama gibi kavramlar adım adım işlenecektir. Bölüm sonunda React Hook Form’a kısa bir köprü kurulacak; ancak ileri düzey kütüphane ayrıntıları sonraki geliştirmelere bırakılacaktır.

## 11.2 Bölümün konumu

Önceki bölümlerde React bileşenlerinin nasıl yazıldığını, props ile nasıl veri aldığını, state ile nasıl değiştiğini, `useEffect` ile dış dünya etkilerinin nasıl yönetildiğini ve özel Hook’larla tekrar eden mantıkların nasıl ayrıştırıldığını gördük. Bölüm 10’da bu bileşenler route mantığıyla sayfalara yerleştirildi.

Form yönetimi bu bilgilerin doğal devamıdır. Çünkü form alanları çoğu zaman doğrudan kullanıcı tarafından değiştirilir. Kullanıcının her tuş vuruşu, seçim değişikliği veya checkbox işareti bileşenin durumunu etkiler. Bu nedenle form yönetimi, React’te state kavramını günlük uygulama ihtiyacına bağlayan en somut alanlardan biridir.

KampüsHub açısından bakıldığında Bölüm 11 üç sonraki bölüm için zemin hazırlar. Bölüm 12’de global state yönetimine geçildiğinde bazı form sonuçları uygulama geneline aktarılabilecektir. Bölüm 13’te REST API entegrasyonu yapılırken bu bölümde hazırlanan payload nesneleri sunucuya gönderilecektir. Bölüm 14 ve sonrasında test, dağıtım ve kalite kontrollerinde form davranışları kullanıcı senaryolarının önemli parçası olacaktır.

## 11.3 Öğrenme çıktıları

Bu bölüm tamamlandığında öğrencinin aşağıdaki kazanımlara ulaşması beklenir:

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

## 11.4 Ön bilgiler

Bu bölümü izleyebilmek için öğrencinin HTML form elemanlarını ve temel React state kullanımını hatırlaması gerekir. Klasik HTML’de bir form gönderildiğinde tarayıcı çoğu zaman sayfayı yeniler veya formun `action` adresine veri gönderir. React tabanlı tek sayfa uygulamalarda ise bu davranış genellikle doğrudan kullanılmaz. Çünkü sayfanın yenilenmesi uygulama state’ini sıfırlayabilir ve SPA deneyimini bozabilir.

React’te form alanları iki temel yaklaşımla ele alınabilir. Birinci yaklaşım kontrollü form elemanıdır. Bu yaklaşımda alanın güncel değeri React state içinde tutulur ve ekrandaki değer state’ten beslenir. İkinci yaklaşım kontrolsüz form elemanıdır. Bu yaklaşımda alanın güncel değeri DOM üzerinde kalır; React genellikle başlangıç değeri verir veya gönderim anında değeri okur. Başlangıç düzeyinde kontrollü yaklaşım, veri akışını daha açık gösterdiği için öğretim açısından oldukça faydalıdır.

Bu bölümde kullanılan örneklerin önemli bir kısmı saf JavaScript fonksiyonlarından oluşur. Bunun nedeni, form yönetiminde doğrulama ve payload hazırlama gibi mantıkların React bileşeninden bağımsız test edilebilmesidir. Öğrenci, arayüz ile iş kuralı mantığını birbirinden ayırmayı bu bölümde daha somut biçimde görecektir.

## 11.5 Form yönetimi neden ayrı bir konudur?

Bir form, kullanıcıdan veri alan basit bir arayüz gibi görünebilir; fakat gerçek uygulamalarda form yönetimi birden fazla soruyu birlikte yanıtlamayı gerektirir:

- Alanın anlık değeri nedir?
- Alan boş bırakılırsa ne olur?
- Kullanıcı alanı değiştirdi mi?
- Kullanıcı alanı ziyaret etti mi?
- Hata mesajı hemen mi, yoksa gönderimden sonra mı gösterilecek?
- Form gönderilebilir durumda mı?
- Gönderim sırasında buton devre dışı bırakılmalı mı?
- Kullanıcıya hangi geri bildirim verilmeli?
- API’ye gönderilecek veri ekrandaki veriden farklı biçimde mi hazırlanmalı?

KampüsHub profil düzenleme formunu düşünelim. Kullanıcı adını, e-posta adresini, bölümünü ve bildirim tercihini düzenler. E-posta boş veya geçersizse kayıt işlemi yapılmamalıdır. Ad alanı yalnızca boşluklardan oluşuyorsa geçerli kabul edilmemelidir. Kullanıcı bildirim tercihini kapattığında bu bilgi boolean olarak saklanmalıdır. Bu tür kurallar, form yönetimini yalnızca görsel tasarım değil, aynı zamanda veri bütünlüğü meselesi haline getirir.

## 11.6 HTML form davranışı ve React yaklaşımı

HTML’de `<form>` elemanı kendi varsayılan davranışına sahiptir. Bir `submit` butonuna basıldığında tarayıcı formu göndermeye çalışır. Geleneksel çok sayfalı uygulamalarda bu davranış doğal kabul edilir; tarayıcı yeni bir sayfaya gider veya aynı sayfayı yeniden yükler.

React SPA uygulamalarında ise çoğu zaman form gönderimini JavaScript ile yakalarız. Bunun için `onSubmit` olayını kullanır ve olay nesnesi üzerinde `preventDefault()` çağırırız. Böylece tarayıcının sayfayı yenilemesi engellenir. Ardından form değerleri state’ten veya `FormData` aracılığıyla okunur.

Aşağıdaki küçük JSX örneği, React tarafındaki temel submit düşüncesini gösterir. Bu blok doğrudan test hattı için değil, kavramsal okuma için verilmiştir.

```jsx
function SearchForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query");
    console.log("Arama:", query);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="query">Duyuru ara</label>
      <input id="query" name="query" />
      <button type="submit">Ara</button>
    </form>
  );
}
```

Bu örnekte `name` niteliği önemlidir. `FormData` form içindeki alanları `name` değerleri üzerinden okur. Kontrollü bileşen yaklaşımında değerler zaten React state içinde tutulur; ancak `name` kullanımı yine de erişilebilirlik, test edilebilirlik ve form semantiği açısından faydalıdır.

## 11.7 Kontrollü form elemanları

Kontrollü form elemanında alanın değeri React state tarafından belirlenir. Kullanıcı yazdığında `onChange` çalışır, state güncellenir ve güncellenen state tekrar alanın `value` veya `checked` değerine yansır. Bu döngü React’in tek yönlü veri akışıyla uyumludur.

Metin kutusu için temel düşünce şöyledir:

```jsx
function ProfileNameInput() {
  const [fullName, setFullName] = React.useState("");

  return (
    <label>
      Ad Soyad
      <input
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
      />
    </label>
  );
}
```

Bu örnekte `input` alanı artık kendi başına bağımsız hareket etmez. Ekranda görünen değer `fullName` state değişkenidir. Kullanıcı yazdıkça `setFullName` çağrılır. Eğer `onChange` yazılmazsa alan değerini değiştirmek mümkün olmayabilir veya React uyarı verebilir.

Kontrollü yaklaşımın avantajı, alan değerinin her an React tarafından bilinmesidir. Bu sayede anlık doğrulama, karakter sayacı, önizleme, dinamik buton durumu ve koşullu mesaj gösterimi kolaylaşır. Dezavantajı ise büyük formlarda her değişikliğin render döngüsü oluşturabilmesidir. Başlangıç düzeyinde bu dezavantaj genellikle yönetilebilir düzeydedir.

## 11.8 Kontrolsüz form elemanları

Kontrolsüz form elemanlarında alanın değeri DOM tarafından tutulur. React yalnızca başlangıç değeri verir veya gönderim anında değeri okur. Bu yaklaşım küçük, basit veya dış kütüphanelerle entegre edilen formlarda yararlı olabilir. Örneğin bir alana başlangıç değeri vermek için `defaultValue` kullanılabilir.

```jsx
function SimpleFeedbackForm() {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="message" defaultValue="KampüsHub geri bildirimi" />
      <button type="submit">Gönder</button>
    </form>
  );
}
```

Kontrollü ve kontrolsüz yaklaşım aynı alan üzerinde karıştırılmamalıdır. Bir input için hem `value` hem de `defaultValue` ile uzun süreli karma bir model kurmak hatalı tasarıma yol açabilir. Eğer alanın değeri React state ile yönetilecekse kontrollü yaklaşım; yalnızca başlangıç değeri verilip submit anında okunacaksa kontrolsüz yaklaşım tercih edilmelidir.

## 11.9 KampüsHub profil formu state modeli

KampüsHub’da profil sayfası, kullanıcının kişisel bilgilerini düzenlediği ekrandır. Bu formda ad soyad, e-posta, bölüm, sınıf ve bildirim tercihi gibi alanlar bulunabilir. Tek tek `useState` kullanmak mümkündür; ancak alan sayısı arttıkça nesne tabanlı state modeli daha okunabilir hale gelir.

Aşağıdaki örnek, profil formundan gelen veriyi normalize eden saf JavaScript fonksiyonunu gösterir. Normalize etmek; gereksiz boşlukları temizlemek, e-posta adresini küçük harfe çevirmek ve sınıf bilgisini standart biçime getirmek anlamına gelir.

<!-- CODE_META
id: react_ch11_code01
chapter_id: chapter_11
language: javascript
kind: example
title: "Profil form verisini normalize etme"
file: "chapter_11/react_ch11_code01_normalize_profile.js"
extract: true
test: compile_run_assert
expected_stdout: "Ayşe Yılmaz | ayse@kampus.edu.tr | 2"
-->

```javascript
function normalizeProfileForm(values) {
  return {
    fullName: values.fullName.trim().replace(/\s+/g, " "),
    email: values.email.trim().toLowerCase(),
    department: values.department.trim(),
    classYear: String(values.classYear).trim(),
    wantsNotifications: Boolean(values.wantsNotifications)
  };
}

const normalized = normalizeProfileForm({
  fullName: "  Ayşe   Yılmaz  ",
  email: " AYSE@KAMPUS.EDU.TR ",
  department: "Bilgisayar Mühendisliği",
  classYear: " 2 ",
  wantsNotifications: true
});

console.log(`${normalized.fullName} | ${normalized.email} | ${normalized.classYear}`);
```

Bu fonksiyon React bileşenine bağlı değildir. Bu nedenle Node ortamında test edilebilir. Bileşen içinde ise submit anında çağrılabilir. Böylece arayüz kodu ile veri hazırlama mantığı birbirinden ayrılmış olur.

## 11.10 Çok alanlı formda genel `handleChange` yaklaşımı

Form alanları arttığında her alan için ayrı bir `onChange` fonksiyonu yazmak tekrar oluşturur. Bunun yerine alanların `name` niteliği kullanılarak genel bir güncelleme fonksiyonu yazılabilir. Metin alanlarında `event.target.value`, checkbox alanlarında ise `event.target.checked` okunur.

```jsx
function ProfileForm() {
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    department: "",
    classYear: "1",
    wantsNotifications: true
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <form>
      <input name="fullName" value={form.fullName} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <input
        type="checkbox"
        name="wantsNotifications"
        checked={form.wantsNotifications}
        onChange={handleChange}
      />
    </form>
  );
}
```

Aşağıdaki saf JavaScript örneği, bu genel güncelleme mantığının React’ten bağımsız çekirdeğini gösterir.

<!-- CODE_META
id: react_ch11_code03
chapter_id: chapter_11
language: javascript
kind: example
title: "name/value yaklaşımıyla form alanı güncelleme"
file: "chapter_11/react_ch11_code03_update_field.js"
extract: true
test: compile_run_assert
expected_stdout: "React Notları / original:"
-->

```javascript
function updateFormField(formState, fieldName, fieldValue) {
  return {
    ...formState,
    [fieldName]: fieldValue
  };
}

const originalForm = {
  title: "",
  course: "Web Programlama",
  visibility: "campus"
};

const nextForm = updateFormField(originalForm, "title", "React Notları");

console.log(`${nextForm.title} / original:${originalForm.title}`);
```

Bu örnekte `originalForm` değişmeden kalır. React state güncellemelerinde bu yaklaşım önemlidir. Nesneyi doğrudan değiştirmek yerine yeni bir nesne üretmek, React’in değişikliği algılamasını ve bileşenin doğru render edilmesini kolaylaştırır.

## 11.11 Input, textarea, select ve checkbox farkları

Form elemanları benzer görünse de değer okuma biçimleri her zaman aynı değildir. Metin kutuları için `value`, çok satırlı metin alanı için yine `value`, seçim kutusu için `value`, checkbox için ise `checked` kullanılır.

KampüsHub not paylaşımı formunda bu farklar birlikte görülebilir:

```jsx
function NoteShareForm() {
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    course: "react",
    allowComments: true
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <form>
      <input name="title" value={form.title} onChange={handleChange} />
      <textarea name="description" value={form.description} onChange={handleChange} />
      <select name="course" value={form.course} onChange={handleChange}>
        <option value="react">React</option>
        <option value="database">Veritabanı</option>
        <option value="ai">Yapay Zekâ</option>
      </select>
      <label>
        <input
          type="checkbox"
          name="allowComments"
          checked={form.allowComments}
          onChange={handleChange}
        />
        Yorumlara izin ver
      </label>
    </form>
  );
}
```

Öğrencilerin sık yaptığı hata, checkbox değerini `event.target.value` ile okumaktır. Checkbox için doğru değer `event.target.checked` olmalıdır. `select` için ise seçilen seçenek `event.target.value` ile alınır. `textarea` React’te HTML’den biraz farklı düşünülür; metin içeriği çocuk metin olarak değil, genellikle `value` veya `defaultValue` ile verilir.

## 11.12 Form gönderimi ve payload hazırlama

Form gönderimi, kullanıcının arayüzdeki değerleri uygulamanın iş mantığına aktardığı andır. Bu noktada yalnızca ekrandaki state’i almak yeterli olmayabilir. Verinin boşluklardan temizlenmesi, etiketlerin diziye dönüştürülmesi, görünürlük bilgisinin standart hale getirilmesi ve API’ye gönderilecek alan adlarının belirlenmesi gerekir.

KampüsHub not paylaşımı formu için kullanıcı “react, hooks, frontend” gibi virgülle ayrılmış etiketler yazabilir. Arayüz açısından bu bir metin alanıdır; fakat API’ye gönderilecek payload açısından etiketler bir dizi olabilir.

<!-- CODE_META
id: react_ch11_code05
chapter_id: chapter_11
language: javascript
kind: example
title: "Not paylaşımı formundan payload üretme"
file: "chapter_11/react_ch11_code05_note_payload.js"
extract: true
test: compile_run_assert
expected_stdout: {"title":"React Hooks","tags":["react","hooks"],"visibility":"campus"}
-->

```javascript
function buildNotePayload(values) {
  const tags = values.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    course: values.course,
    tags,
    visibility: values.visibility || "campus",
    allowComments: Boolean(values.allowComments)
  };
}

const payload = buildNotePayload({
  title: " React Hooks ",
  description: " useState ve useEffect notları ",
  course: "react",
  tags: "React, hooks,  ",
  visibility: "campus",
  allowComments: true
});

console.log(JSON.stringify({
  title: payload.title,
  tags: payload.tags,
  visibility: payload.visibility
}));
```

Payload üretimi bileşenden ayrıldığında test etmek kolaylaşır. Form bileşeni yalnızca kullanıcı etkileşimini yönetir; veri hazırlama mantığı ayrı bir fonksiyonda tutulur. Bu yaklaşım ileride REST API entegrasyonunda büyük kolaylık sağlayacaktır.

## 11.13 Basit doğrulama kuralları

Doğrulama, form verisinin beklenen kurallara uyup uymadığını kontrol etme sürecidir. Başlangıç düzeyinde doğrulama için karmaşık kütüphaneler kullanmak zorunlu değildir. Basit JavaScript fonksiyonları ile zorunlu alan, e-posta biçimi, minimum uzunluk, maksimum uzunluk ve seçim zorunluluğu gibi kurallar yazılabilir.

KampüsHub profil formu için örnek kurallar şunlar olabilir:

- Ad soyad boş olamaz.
- E-posta geçerli bir biçimde olmalıdır.
- Bölüm seçilmelidir.
- Sınıf bilgisi 1, 2, 3, 4 veya mezun seçeneklerinden biri olmalıdır.

<!-- CODE_META
id: react_ch11_code02
chapter_id: chapter_11
language: javascript
kind: example
title: "Profil formu doğrulama hatalarını üretme"
file: "chapter_11/react_ch11_code02_validate_profile.js"
extract: true
test: compile_run_assert
expected_stdout: "email, fullName"
-->

```javascript
function validateProfileForm(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = "Ad soyad en az iki karakter olmalıdır.";
  }

  const email = values.email || "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    errors.email = "Geçerli bir e-posta adresi giriniz.";
  }

  if (!values.department || values.department.trim() === "") {
    errors.department = "Bölüm bilgisi seçilmelidir.";
  }

  return errors;
}

const errors = validateProfileForm({
  fullName: " ",
  email: "ogrenci-at-kampus",
  department: "Bilgisayar Mühendisliği"
});

console.log(Object.keys(errors).sort().join(", "));
```

Doğrulama fonksiyonları nesne döndürebilir. Bu nesnede anahtarlar alan adlarını, değerler ise kullanıcıya gösterilecek hata mesajlarını temsil eder. Böylece bileşen, `errors.email` varsa e-posta alanının altında mesaj gösterebilir.

## 11.14 Hata mesajı ne zaman gösterilmeli?

Bir formda hata mesajının var olması ile mesajın kullanıcıya gösterilmesi aynı şey değildir. Kullanıcı sayfayı ilk açtığında tüm alanlar boş olabilir. Bu durumda hemen bütün hataları göstermek kullanıcı deneyimini bozabilir. Bunun yerine iki yaygın strateji kullanılır:

1. Hata mesajı, kullanıcı alanı ziyaret edip çıktıktan sonra gösterilir.
2. Hata mesajı, kullanıcı formu göndermeye çalıştıktan sonra gösterilir.

Bu davranış için `touched` ve `submitted` bilgileri tutulabilir. `touched`, kullanıcının ilgili alanla etkileşime geçtiğini; `submitted`, kullanıcının formu göndermeye çalıştığını ifade eder.

<!-- CODE_META
id: react_ch11_code06
chapter_id: chapter_11
language: javascript
kind: example
title: "Touched/submitted durumuna göre hata mesajı gösterme"
file: "chapter_11/react_ch11_code06_field_feedback.js"
extract: true
test: compile_run_assert
expected_stdout: "email:error:Geçerli e-posta giriniz. | title:idle"
-->

```javascript
function getFieldFeedback(fieldName, errors, touched, submitted) {
  const shouldShowError = Boolean(errors[fieldName]) && (touched[fieldName] || submitted);

  if (!shouldShowError) {
    return {
      field: fieldName,
      status: "idle",
      message: ""
    };
  }

  return {
    field: fieldName,
    status: "error",
    message: errors[fieldName]
  };
}

const errors = {
  email: "Geçerli e-posta giriniz.",
  title: "Başlık zorunludur."
};

const touched = {
  email: true,
  title: false
};

const emailFeedback = getFieldFeedback("email", errors, touched, false);
const titleFeedback = getFieldFeedback("title", errors, touched, false);

console.log(
  `email:${emailFeedback.status}:${emailFeedback.message} | title:${titleFeedback.status}`
);
```

Bu küçük fonksiyon, kullanıcı deneyimi kararını açık hale getirir. Bileşenin içinde karmaşık koşul yazmak yerine bu tür yardımcı fonksiyonlar kullanılabilir. Böylece hata gösterim davranışı daha kolay test edilir ve değiştirilebilir.

## 11.15 Dirty alan mantığı

Dirty alan, başlangıç değerinden farklı hale gelmiş alandır. Bu bilgi birçok durumda yararlıdır. Örneğin profil formunda kullanıcı hiçbir değişiklik yapmadıysa “Kaydet” butonu devre dışı bırakılabilir. Sadece değişen alanları API’ye göndermek istenirse dirty alan listesi kullanılabilir.

<!-- CODE_META
id: react_ch11_code04
chapter_id: chapter_11
language: javascript
kind: example
title: "Dirty alanları tespit etme"
file: "chapter_11/react_ch11_code04_dirty_fields.js"
extract: true
test: compile_run_assert
expected_stdout: "bio, email"
-->

```javascript
function getDirtyFields(initialValues, currentValues) {
  return Object.keys(currentValues)
    .filter((fieldName) => currentValues[fieldName] !== initialValues[fieldName])
    .sort();
}

const initialProfile = {
  fullName: "Mehmet Demir",
  email: "mehmet@kampus.edu.tr",
  bio: "",
  wantsNotifications: true
};

const currentProfile = {
  fullName: "Mehmet Demir",
  email: "m.demir@kampus.edu.tr",
  bio: "React öğreniyorum.",
  wantsNotifications: true
};

console.log(getDirtyFields(initialProfile, currentProfile).join(", "));
```

Dirty alan tespiti her durumda bu kadar basit olmayabilir. İç içe nesneler, diziler veya tarih alanları olduğunda daha dikkatli karşılaştırma gerekir. Ancak başlangıç düzeyindeki formlarda düz nesnelerle çalışmak yeterlidir.

## 11.16 Submit butonu, yüklenme ve güvenli tekrar gönderim

Form gönderimi sırasında kullanıcı aynı butona birden fazla kez basabilir. Gerçek API entegrasyonu olduğunda bu durum aynı kaydın iki kez oluşturulmasına veya gereksiz isteklerin gönderilmesine neden olabilir. Bu bölümde gerçek API çağrısı yapılmayacaktır; fakat submit durumunu yönetme fikri şimdiden kurulmalıdır.

Temel yaklaşım şudur:

- Form geçersizse submit butonu devre dışı bırakılabilir.
- Gönderim sürerken buton devre dışı bırakılabilir.
- Gönderim sürerken buton metni “Kaydediliyor...” gibi değiştirilebilir.
- Gönderimden sonra başarı veya hata mesajı gösterilebilir.

Bu davranışlar için `isSubmitting`, `isValid`, `errors` ve `dirtyFields` gibi bilgiler kullanılabilir. Bu bilgiler başlangıçta yerel state ile tutulabilir. Uygulama büyüdükçe React Hook Form veya benzeri kütüphaneler bu işi daha sistematik hale getirir.

## 11.17 Erişilebilirlik ve form semantiği

Form yönetimi yalnızca JavaScript kodu değildir. İyi bir form, ekran okuyucular ve klavye kullanıcıları için de anlaşılır olmalıdır. Bu nedenle her alan için anlamlı bir `label` kullanılmalıdır. `label` ile alan ilişkisi `htmlFor` ve `id` üzerinden kurulabilir. Hata mesajları kısa, açıklayıcı ve alanla ilişkili olmalıdır.

Örnek:

```jsx
<label htmlFor="email">E-posta</label>
<input
  id="email"
  name="email"
  type="email"
  value={form.email}
  onChange={handleChange}
  aria-invalid={Boolean(errors.email)}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email}
  </p>
)}
```

Bu örnekte `aria-invalid`, alanın hata durumunu yardımcı teknolojilere bildirir. `aria-describedby` ise hata mesajını alanla ilişkilendirir. Başlangıç düzeyinde her ayrıntının mükemmel uygulanması beklenmeyebilir; ancak form tasarımında erişilebilirlik alışkanlığı erken kazanılmalıdır.

## 11.18 Programatik ekran çıktısı planı

Bu bölümdeki ekran görüntüleri, KampüsHub form ekranlarının tutarlı biçimde belgelenmesi için programatik olarak üretilebilir. Her ekran görüntüsü, Vite geliştirme sunucusunda özel kitap rotası üzerinden açılacak şekilde planlanmıştır.

<!-- SCREENSHOT_META
id: b11_01_profil_duzenleme_formu
chapter: chapter_11
figure: "Şekil 11.1"
title: "KampüsHub profil düzenleme formu"
route: "/__book__/chapter-11/profil-duzenleme-formu"
waitFor: "[data-book-shot='b11_01_profil_duzenleme_formu']"
actions: []
output: "assets/auto/chapter_11/b11_01_profil_duzenleme_formu.png"
caption: "KampüsHub profil sayfasında kontrollü form elemanlarıyla oluşturulan profil düzenleme ekranı."
markdownTarget: "[SCREENSHOT:b11_01_profil_duzenleme_formu]"
-->

[SCREENSHOT:b11_01_profil_duzenleme_formu]

<!-- SCREENSHOT_META
id: b11_02_not_paylasimi_form_validasyonu
chapter: chapter_11
figure: "Şekil 11.2"
title: "Not paylaşımı formunda doğrulama"
route: "/__book__/chapter-11/not-paylasimi-form-validasyonu"
waitFor: "[data-book-shot='b11_02_not_paylasimi_form_validasyonu']"
actions:
  - "type: [name='title'], value: ''"
  - "click: [data-action='submit-note-form']"
output: "assets/auto/chapter_11/b11_02_not_paylasimi_form_validasyonu.png"
caption: "KampüsHub not paylaşımı formunda zorunlu alan doğrulama mesajlarının gösterilmesi."
markdownTarget: "[SCREENSHOT:b11_02_not_paylasimi_form_validasyonu]"
-->

[SCREENSHOT:b11_02_not_paylasimi_form_validasyonu]

<!-- SCREENSHOT_META
id: b11_03_form_hata_durumlari
chapter: chapter_11
figure: "Şekil 11.3"
title: "Form hata durumları ve kullanıcı geri bildirimi"
route: "/__book__/chapter-11/form-hata-durumlari"
waitFor: "[data-book-shot='b11_03_form_hata_durumlari']"
actions: []
output: "assets/auto/chapter_11/b11_03_form_hata_durumlari.png"
caption: "Touched ve submitted durumlarına göre hata mesajı gösteren örnek form görünümü."
markdownTarget: "[SCREENSHOT:b11_03_form_hata_durumlari]"
-->

[SCREENSHOT:b11_03_form_hata_durumlari]

Bu plan, kitap üretim hattında görsel eksikliğini azaltmak için önemlidir. Ekran görüntüleri manuel ekran yakalama yerine route, bekleme seçici ve çıktı dosyası bilgileriyle üretildiğinde aynı bölüm farklı bilgisayarlarda daha tutarlı şekilde yeniden oluşturulabilir.

## 11.19 React Hook Form’a kavramsal giriş

Kontrollü bileşen yaklaşımı öğretim açısından açık ve anlaşılırdır. Ancak büyük formlarda her alan için state, error, touched ve dirty bilgisini elle yönetmek kodu büyütebilir. React Hook Form gibi kütüphaneler, form kayıt işlemi, doğrulama, hata yönetimi ve performans konularında yardımcı olur.

React Hook Form’un temel fikri, form alanlarını `register` ederek takip etmek ve gönderimi `handleSubmit` üzerinden yönetmektir. Bu bölümde ayrıntılı kütüphane öğretimi yapılmayacaktır; fakat öğrencinin neden böyle bir kütüphaneye ihtiyaç duyulabileceğini görmesi önemlidir.

```jsx
import { useForm } from "react-hook-form";

function ProfileFormWithHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: "E-posta zorunludur."
        })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Kaydet</button>
    </form>
  );
}
```

Bu örnekte `register`, alanı form sistemine tanıtır. `handleSubmit`, form geçerli olduğunda `onSubmit` fonksiyonunu çağırır. İleri konularda şema doğrulama, özel bileşenlerle entegrasyon ve dinamik alan listeleri ele alınabilir; ancak bu bölümde amaç temel kavramı tanımaktır.

## 11.20 CODE_META ve test edilebilir kod örnekleri

Bu bölümdeki CODE_META örnekleri, form yönetiminde arayüzden bağımsız test edilebilecek mantıklara odaklanır. Profil verisini normalize etme, doğrulama hatalarını üretme, alan güncelleme, dirty alan tespit etme, not paylaşımı payload nesnesi oluşturma ve hata mesajı gösterim kararını verme işlemleri Node ortamında çalıştırılabilir.

Bu yaklaşım pedagojik açıdan iki nedenle önemlidir. Birincisi, öğrenci React bileşeninin yalnızca JSX’ten ibaret olmadığını; arka planda test edilebilir iş kuralları bulunduğunu görür. İkincisi, ileride otomatik kalite hattı bu kod parçalarını çalıştırarak kitap içindeki örneklerin gerçekten çalışıp çalışmadığını denetleyebilir.

## 11.21 Sık yapılan hatalar ve yanlış sezgiler

Form yönetiminde başlangıç öğrencileri çoğunlukla benzer hataları yapar. Bu hataların erken fark edilmesi, ileride daha karmaşık formlarda karşılaşılacak sorunları azaltır.

Birinci hata, kontrollü input yazıp `onChange` eklememektir. `value` verilen bir input, state tarafından kontrol edilir. Kullanıcı yazdığında state güncellenmezse alan değişmiyormuş gibi görünür.

İkinci hata, checkbox değerini `value` ile okumaktır. Checkbox için doğru alan `checked` değeridir. `value` çoğu zaman `"on"` gibi beklenmeyen bir sonuç verebilir.

Üçüncü hata, form submit edildiğinde `preventDefault()` çağırmamaktır. Bu durumda tarayıcı sayfayı yenileyebilir ve React state sıfırlanabilir.

Dördüncü hata, doğrulama mantığını doğrudan JSX içine gömmektir. Küçük formlarda bu çalışır; ancak form büyüdüğünde JSX okunamaz hale gelir. Doğrulama fonksiyonları ayrı yazılmalıdır.

Beşinci hata, hata mesajlarını form ilk açıldığında hemen göstermektir. Kullanıcı henüz hiçbir şey yapmadan tüm alanları kırmızı görmek olumsuz bir deneyim oluşturabilir. Bunun yerine touched veya submitted mantığı kullanılmalıdır.

Altıncı hata, API’ye ekrandaki state’i ham biçimde göndermektir. Form state’i kullanıcı deneyimine göre tutulmuş olabilir; API ise daha temiz, normalize edilmiş ve standart alan adlarıyla hazırlanmış bir payload bekleyebilir.

## 11.22 Hata ayıklama egzersizi

Aşağıdaki örnekte birden fazla hata vardır. Öğrenciden bu hataları bulması ve düzeltmesi istenir.

```jsx
function BrokenProfileForm() {
  const [email, setEmail] = React.useState();

  function handleSubmit(event) {
    console.log(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} />
      <button>Kaydet</button>
    </form>
  );
}
```

Bu kodda şu sorunlar vardır:

1. `email` başlangıçta `undefined` değerindedir. Kontrollü input için başlangıç değeri genellikle boş string olmalıdır.
2. `input` alanında `onChange` yoktur. Bu nedenle kullanıcı değeri güncelleyemez.
3. `handleSubmit` içinde `event.preventDefault()` çağrılmamıştır.
4. Butonun tipi açıkça belirtilmemiştir. Form içinde varsayılan olarak submit davranışı gösterebilir. Bu örnekte submit isteniyor olsa da açıkça `type="submit"` yazmak daha okunabilirdir.
5. `label` kullanılmamıştır. Erişilebilirlik ve form semantiği zayıftır.

Düzeltilmiş temel sürüm şöyle olabilir:

```jsx
function FixedProfileForm() {
  const [email, setEmail] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(email.trim().toLowerCase());
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">E-posta</label>
      <input
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit">Kaydet</button>
    </form>
  );
}
```

Bu düzeltme, kontrollü input mantığını, submit davranışını ve erişilebilirlik temelini aynı anda iyileştirir.

## 11.23 Bölüm özeti ve terim sözlüğü

Bu bölümde React form yönetiminin temel bileşenleri ele alındı. Formların yalnızca veri giriş alanlarından ibaret olmadığı; state, doğrulama, hata mesajı, dirty/touched bilgisi, submit davranışı ve payload hazırlama süreçlerini birlikte içerdiği gösterildi. KampüsHub örnekleri üzerinden profil düzenleme ve not paylaşımı formlarının temel mantığı kuruldu.

**Controlled component:** Değeri React state tarafından belirlenen form elemanıdır.

**Uncontrolled component:** Güncel değeri DOM tarafından tutulan, React’in genellikle başlangıç değeri verdiği veya submit anında okuduğu form elemanıdır.

**`value`:** Metin, textarea ve select gibi alanlarda kontrollü değeri belirtir.

**`checked`:** Checkbox ve radio alanlarında seçili olma durumunu belirtir.

**`defaultValue`:** Kontrolsüz alanın başlangıç değerini belirtir.

**`onChange`:** Kullanıcı alan değerini değiştirdiğinde çalışan olay işleyicidir.

**`onSubmit`:** Form gönderildiğinde çalışan olay işleyicidir.

**`preventDefault`:** Tarayıcının varsayılan form gönderim davranışını engeller.

**Validation:** Form verisinin kurallara uygunluğunu kontrol etme sürecidir.

**Touched field:** Kullanıcının ziyaret ettiği veya etkileşimde bulunduğu alan bilgisidir.

**Dirty field:** Başlangıç değerinden farklı hale gelmiş alan bilgisidir.

**Payload:** API’ye veya uygulama mantığına gönderilmeye hazır veri nesnesidir.

## 11.24 Kavramsal sorular

1. Kontrollü form elemanı ile kontrolsüz form elemanı arasındaki temel fark nedir?
2. Bir input alanına `value` verildiğinde neden `onChange` de yazılmalıdır?
3. Checkbox alanında neden `event.target.value` yerine `event.target.checked` kullanılır?
4. Form gönderiminde `event.preventDefault()` çağrılmazsa ne olabilir?
5. Form doğrulama mantığını JSX içinde yazmak yerine ayrı fonksiyona taşımak neden faydalıdır?
6. `touched` ve `dirty` kavramları aynı şeyi mi ifade eder? Farklarını açıklayınız.
7. KampüsHub not paylaşımı formunda etiket alanı neden payload üretiminde diziye dönüştürülebilir?
8. Hata mesajlarını form ilk açıldığında göstermek hangi kullanıcı deneyimi sorunlarına yol açabilir?
9. React Hook Form gibi bir kütüphane hangi tür tekrarları azaltabilir?
10. Profil düzenleme formundaki veriler API’ye gönderilmeden önce neden normalize edilmelidir?

## 11.25 Programlama alıştırmaları

1. Profil formuna `phoneNumber` alanı ekleyiniz. Boş bırakılabilir olsun; ancak doluysa en az 10 karakter içermesini doğrulayınız.
2. Not paylaşımı formunda `tags` alanını virgülle ayrılmış metinden diziye dönüştüren fonksiyonu geliştiriniz. Tekrarlayan etiketleri kaldırınız.
3. `getDirtyFields` fonksiyonunu, yalnızca değişen alan adlarını değil, eski ve yeni değerleri de döndürecek şekilde değiştiriniz.
4. `validateProfileForm` fonksiyonuna sınıf bilgisi için `1`, `2`, `3`, `4`, `graduate` seçeneklerinden biri olma kuralı ekleyiniz.
5. `getFieldFeedback` fonksiyonunu `success` durumunu da döndürecek şekilde genişletiniz.
6. KampüsHub etkinlik arama formu için `query`, `category` ve `dateRange` alanlarını içeren bir state modeli tasarlayınız.
7. Submit butonunun devre dışı olup olmayacağını belirleyen `canSubmitForm(errors, dirtyFields, isSubmitting)` fonksiyonunu yazınız.
8. Profil formundaki `department` alanını `select` elemanıyla temsil eden JSX parçasını oluşturunuz.
9. Not paylaşımı formunda açıklama alanı için 300 karakter sınırı ve canlı karakter sayacı ekleyiniz.
10. Form gönderiminden sonra kullanıcıya başarı mesajı gösteren basit bir `submitStatus` state modeli tasarlayınız.

## 11.26 Haftalık laboratuvar / proje görevi

Bu haftaki laboratuvar görevi, KampüsHub uygulamasındaki iki sayfaya form eklemektir. Öğrenciler Bölüm 10’da oluşturulan route yapısını kullanarak `/profile` ve `/notes` sayfalarını geliştirmelidir.

**Görev 1: Profil düzenleme formu**

`/profile` sayfasında aşağıdaki alanlara sahip kontrollü bir form oluşturunuz:

- Ad soyad
- E-posta
- Bölüm
- Sınıf
- Bildirim almak istiyorum checkbox alanı
- Kısa biyografi

Form şu kuralları sağlamalıdır:

- Ad soyad boş olamaz.
- E-posta geçerli biçimde olmalıdır.
- Bölüm seçilmelidir.
- Biyografi 160 karakteri geçmemelidir.
- Kaydet butonu form geçersizken devre dışı kalmalıdır.
- Gönderim anında normalize edilmiş payload ekranda JSON önizleme olarak gösterilmelidir.

**Görev 2: Not paylaşımı formu**

`/notes` sayfasında aşağıdaki alanlara sahip bir not paylaşımı formu oluşturunuz:

- Not başlığı
- Ders
- Açıklama
- Etiketler
- Görünürlük seçimi
- Yorumlara izin ver checkbox alanı

Form şu kuralları sağlamalıdır:

- Başlık en az 3 karakter olmalıdır.
- Ders seçilmelidir.
- Etiketler virgülle ayrılmış metin olarak alınmalı, payload içinde diziye dönüştürülmelidir.
- Açıklama boş olmamalıdır.
- Submit sonrası payload konsola yazdırılmalı veya sayfa üzerinde gösterilmelidir.

**Teslim ölçütleri**

- Her iki form da kontrollü bileşen yaklaşımıyla yazılmış olmalıdır.
- En az üç doğrulama kuralı bulunmalıdır.
- En az iki hata mesajı kullanıcıya görünür biçimde gösterilmelidir.
- `label` ve `id` ilişkisi kullanılmalıdır.
- Veri hazırlama mantığının en az bir kısmı saf JavaScript fonksiyonuna ayrılmalıdır.
- Kod, sonraki hafta API entegrasyonuna uygun şekilde düzenlenmelidir.

## 11.27 İleri okuma ve bir sonraki bölüme köprü

Bu bölümde form yönetiminin temel mantığı kuruldu. Öğrenci artık kullanıcıdan veri almayı, bu veriyi state içinde tutmayı, doğrulamayı, hata mesajı üretmeyi ve gönderime hazır payload nesnesine dönüştürmeyi biliyor. Bu beceriler KampüsHub’ın profil, not paylaşımı, duyuru arama ve etkinlik filtreleme gibi modüllerinde doğrudan kullanılacaktır.

Bir sonraki bölümde uygulama büyüdükçe yalnızca yerel state ile çalışmanın sınırları tartışılacak ve global state yönetimine geçilecektir. Redux Toolkit, KampüsHub’da kullanıcı oturumu, tema tercihi, bildirim listesi veya uygulama genelindeki bazı ortak verilerin daha düzenli yönetilmesini sağlayacaktır. Form yönetiminde öğrendiğimiz veri akışı disiplini, global state konusunu anlamak için güçlü bir temel oluşturur.
