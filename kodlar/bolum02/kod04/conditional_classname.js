function getAnnouncementClassName(isUrgent) {
  const baseClass = "announcement-card";
  return isUrgent ? `${baseClass} ${baseClass}--urgent` : baseClass;
}

console.log(getAnnouncementClassName(true));
console.log(getAnnouncementClassName(false));
