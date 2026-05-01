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
