function createComponentDescription(componentName, role) {
  const startsWithUppercase = /^[A-Z]/.test(componentName);
  const namingRule = startsWithUppercase ? "PascalCase" : "küçük harfle başlamış";

  return `${componentName} bileşeni ${role}. Adlandırma: ${namingRule}`;
}

console.log(createComponentDescription("Header", "uygulama başlığını temsil eder"));
