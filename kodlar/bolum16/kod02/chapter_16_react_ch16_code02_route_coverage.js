const requiredRoutes = [
  "/",
  "/announcements",
  "/announcements/:announcementId",
  "/events",
  "/notes",
  "/profile",
  "/settings",
];

const configuredRoutes = [
  "/",
  "/announcements",
  "/announcements/:announcementId",
  "/events",
  "/notes",
  "/profile",
  "/settings",
  "*",
];

const missingRoutes = requiredRoutes.filter(
  (route) => !configuredRoutes.includes(route),
);

console.log(
  `routes=${requiredRoutes.length - missingRoutes.length}/${requiredRoutes.length} | missing=${missingRoutes.join(",") || "none"}`,
);
