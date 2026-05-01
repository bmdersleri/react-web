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
