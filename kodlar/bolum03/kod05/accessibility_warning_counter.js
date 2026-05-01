const accessibilityChecks = [
  { name: "Başlık hiyerarşisi", passed: true },
  { name: "Bağlantı metinleri açıklayıcı", passed: false },
  { name: "Form etiketleri", passed: true },
  { name: "Görsel alternatif metinleri", passed: false }
];

function countMissingAccessibilityItems(checks) {
  return checks.filter((check) => !check.passed).length;
}

console.log(`Eksik erişilebilirlik uyarısı: ${countMissingAccessibilityItems(accessibilityChecks)}`);
