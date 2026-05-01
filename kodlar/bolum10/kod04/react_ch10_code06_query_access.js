function readCategoryFromUrl(url) {
  const parsedUrl = new URL(url, "https://kampushub.example");
  return parsedUrl.searchParams.get("category") ?? "all";
}

function decideRouteAccess(route, user) {
  const protectedRoutes = ["/profile"];
  if (protectedRoutes.includes(route) && !user.isAuthenticated) {
    return "redirect:/login";
  }
  return "allow";
}

const category = readCategoryFromUrl("/announcements?category=exam");
const profileAccess = decideRouteAccess("/profile", { isAuthenticated: false });
const notesAccess = decideRouteAccess("/notes", { isAuthenticated: false });

console.log(`category=${category};profileAccess=${profileAccess};notesAccess=${notesAccess}`);
