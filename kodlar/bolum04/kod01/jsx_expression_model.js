const appName = "KampüsHub";
const activeModule = "Duyurular";

function renderTitle(name, moduleName) {
  return `${name} | Aktif modül: ${moduleName}`;
}

console.log(renderTitle(appName, activeModule));
