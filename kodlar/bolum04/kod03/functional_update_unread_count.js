function markOneAnnouncementAsRead(previousCount) {
  return Math.max(previousCount - 1, 0);
}

let unreadCount = 2;
console.log(`start: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after first: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after second: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after third: ${unreadCount}`);
