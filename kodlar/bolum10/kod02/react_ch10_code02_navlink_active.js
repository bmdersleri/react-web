function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function isRouteActive(currentPath, targetPath, options = {}) {
  const current = normalizePath(currentPath);
  const target = normalizePath(targetPath);

  if (options.end) {
    return current === target;
  }

  return current === target || current.startsWith(`${target}/`);
}

const currentPath = "/announcements/42";
const active = isRouteActive(currentPath, "/announcements") ? "announcements" : "none";

console.log(
  `active=${active};home=${isRouteActive(currentPath, "/", { end: true })};profile=${isRouteActive(currentPath, "/profile")}`
);
