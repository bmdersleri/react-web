function renderModuleCard(props) {
  return `${props.appName}: ${props.title} - ${props.description} (${props.status})`;
}

const announcementModule = {
  appName: "KampüsHub",
  title: "Duyurular",
  description: "Ders ve bölüm duyurularını takip edin.",
  status: "3 yeni duyuru"
};

console.log(renderModuleCard(announcementModule));
