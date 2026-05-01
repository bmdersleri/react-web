const appName = "KampüsHub";
const activeAnnouncementCount = 3;

function createDashboardMessage(name, count) {
  return `${name}: ${count} aktif duyuru`;
}

console.log(createDashboardMessage(appName, activeAnnouncementCount));
