function fetchAnnouncementsMock() {
  return Promise.resolve([
    { id: 1, title: "ES6+ çalışma notları yayınlandı" },
    { id: 2, title: "KampüsHub veri modeli hazırlanacak" }
  ]);
}

async function printAnnouncementCount() {
  const announcements = await fetchAnnouncementsMock();
  console.log(`Yüklenen duyuru sayısı: ${announcements.length}`);
}

printAnnouncementCount();
