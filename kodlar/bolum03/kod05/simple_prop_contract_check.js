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
