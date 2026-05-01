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
