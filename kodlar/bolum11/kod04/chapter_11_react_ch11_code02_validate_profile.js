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
