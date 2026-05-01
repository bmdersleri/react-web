const campusRoutes = [
  { path: "/", label: "Ana Sayfa", page: "HomePage" },
  { path: "/announcements", label: "Duyurular", page: "AnnouncementsPage" },
  { path: "/announcements/:announcementId", label: "Duyuru Detayı", page: "AnnouncementDetailPage" },
  { path: "/events", label: "Etkinlikler", page: "EventsPage" },
  { path: "/notes", label: "Not Paylaşımı", page: "NotesPage" },
  { path: "/profile", label: "Profil", page: "ProfilePage" }
];

const detailRoute = campusRoutes.find((route) => route.path.includes(":"));
const hasProfile = campusRoutes.some((route) => route.path === "/profile");

console.log(`routeCount=${campusRoutes.length};detailRoute=${detailRoute.path};hasProfile=${hasProfile}`);
