const componentTree = {
  name: "App",
  children: [
    { name: "Header", children: [] },
    { name: "HeroSection", children: [] },
    {
      name: "DashboardPreview",
      children: [
        { name: "ModuleCard", children: [] },
        { name: "ModuleCard", children: [] },
      ],
    },
    { name: "Footer", children: [] },
  ],
};

function flattenTree(node, parentPath = "") {
  const currentPath = parentPath ? `${parentPath} > ${node.name}` : node.name;
  const childPaths = node.children.flatMap((child) => flattenTree(child, currentPath));
  return [currentPath, ...childPaths];
}

const paths = flattenTree(componentTree);
console.log(paths.join("\n"));
console.log(`Toplam bileşen: ${paths.length}`);
