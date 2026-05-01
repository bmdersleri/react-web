function fetchAnnouncementsMock() {
  const announcements = [
    { id: 1, title: "Vize takvimi güncellendi" },
    { id: 2, title: "React laboratuvarı Cuma günü" },
    { id: 3, title: "Kampüs etkinliği başvuruları açıldı" }
  ];

  return Promise.resolve(announcements);
}

async function loadAnnouncements() {
  console.log("Yükleme başladı");
  const result = await fetchAnnouncementsMock();
  console.log(`Duyuru sayısı: ${result.length}`);
  console.log("Yükleme tamamlandı");
}

loadAnnouncements();
