function getPageTitle(path) {
  const cleanPath = path.split("?")[0];
  const titles = {
    "/": "Ana Sayfa",
    "/announcements": "Duyurular",
    "/events": "Etkinlikler",
    "/notes": "Not Paylaşımı",
    "/profile": "Profil"
  };

  if (/^\/announcements\/[^/]+$/.test(cleanPath)) {
    return "Duyuru Detayı";
  }

  return titles[cleanPath] ?? "Sayfa Bulunamadı";
}

console.log(
  `notesTitle=${getPageTitle("/notes?tag=react")};detailTitle=${getPageTitle("/announcements/42")};unknownTitle=${getPageTitle("/missing")}`
);
