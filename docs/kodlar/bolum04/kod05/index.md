---
title: "component_tree_summary"
code_id: "react_ch04_code05"
language: "javascript"
test_status: "passed"
---

# component_tree_summary

**Kod kimliği:** `react_ch04_code05`  
**Bölüm kimliği:** `chapter_04`  
**Dosya:** `component_tree_summary.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum04/kod05/component_tree_summary.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum04/kod05
- Repository yolu: `kodlar/bolum04/kod05/component_tree_summary.js`

## Kaynak kod

```javascript
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
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
