function extractAnnouncementId(path) {
  const match = path.match(/^\/announcements\/([^/]+)$/);
  if (!match) {
    return { matched: false, announcementId: null };
  }
  return { matched: true, announcementId: decodeURIComponent(match[1]) };
}

const result = extractAnnouncementId("/announcements/42");
console.log(`matched=${result.matched};announcementId=${result.announcementId}`);
