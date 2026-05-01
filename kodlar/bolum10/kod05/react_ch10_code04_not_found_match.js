const routeTable = new Map([
  ["/", "HomePage"],
  ["/announcements", "AnnouncementsPage"],
  ["/events", "EventsPage"],
  ["/notes", "NotesPage"],
  ["/profile", "ProfilePage"]
]);

function resolvePage(path) {
  if (/^\/announcements\/[^/]+$/.test(path)) {
    return "AnnouncementDetailPage";
  }
  return routeTable.get(path) ?? "NotFoundPage";
}

console.log(`known=${resolvePage("/events")};unknown=${resolvePage("/clubs")}`);
