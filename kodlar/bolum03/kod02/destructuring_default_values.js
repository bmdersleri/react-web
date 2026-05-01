function formatProfileBadge({ name = "Misafir Kullanıcı", role = "Öğrenci", online = false } = {}) {
  const statusText = online ? "Çevrim içi" : "Çevrim dışı";
  return `${name} | ${role} | ${statusText}`;
}

console.log(formatProfileBadge({ name: "Ayşe KAYA", role: "Öğrenci", online: true }));
console.log(formatProfileBadge());
