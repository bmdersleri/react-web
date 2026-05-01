const stateCandidates = [
  { name: "theme", usedBy: ["Header", "Profile", "Dashboard"], changesOften: false },
  { name: "unreadAnnouncementCount", usedBy: ["Header", "Announcements"], changesOften: true },
  { name: "noteDraftTitle", usedBy: ["NoteForm"], changesOften: true },
  { name: "isProfileModalOpen", usedBy: ["ProfilePage"], changesOften: true },
  { name: "notificationEnabled", usedBy: ["Profile", "Settings", "Header"], changesOften: false },
];

function decideScope(candidate) {
  return candidate.usedBy.length > 1 ? "global" : "local";
}

const summary = stateCandidates.reduce(
  (acc, item) => {
    acc[decideScope(item)] += 1;
    return acc;
  },
  { global: 0, local: 0 }
);

console.log(`global: ${summary.global} | local: ${summary.local}`);
