const announcement = {
  id: 7,
  title: "Laboratuvar saati duyurusu",
  courseCode: "BMU204",
  isPinned: false
};

function updateAnnouncementTitle(item, newTitle) {
  return {
    ...item,
    title: newTitle
  };
}

const updatedAnnouncement = updateAnnouncementTitle(
  announcement,
  "Laboratuvar saati değişti"
);

console.log(`Eski başlık: ${announcement.title}`);
console.log(`Güncel başlık: ${updatedAnnouncement.title}`);
