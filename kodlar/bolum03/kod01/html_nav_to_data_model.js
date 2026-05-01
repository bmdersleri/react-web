const navigationLinks = [
  { label: "Duyurular", href: "/announcements" },
  { label: "Etkinlikler", href: "/events" },
  { label: "Not Paylaşımı", href: "/notes" },
  { label: "Profil", href: "/profile" }
];

function createNavigationLabelList(links) {
  return links.map((link) => link.label).join(" | ");
}

console.log(createNavigationLabelList(navigationLinks));
