---
title: "semantic_regions_to_component_candidates"
code_id: "react_ch03_code02"
language: "javascript"
test_status: "passed"
---

# semantic_regions_to_component_candidates

**Kod kimliği:** `react_ch03_code02`  
**Bölüm kimliği:** `chapter_03`  
**Dosya:** `semantic_regions_to_component_candidates.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum03/kod02/semantic_regions_to_component_candidates.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum03/kod02
- Repository yolu: `kodlar/bolum03/kod02/semantic_regions_to_component_candidates.js`

## Kaynak kod

```javascript
const semanticRegions = [
  { tag: "header", role: "application header", repeatable: true },
  { tag: "nav", role: "main navigation", repeatable: true },
  { tag: "main", role: "main content", repeatable: false },
  { tag: "article", role: "module card", repeatable: true },
  { tag: "footer", role: "application footer", repeatable: true }
];

const componentNameByRole = {
  "application header": "Header",
  "main navigation": "MainNavigation",
  "main content": "MainContent",
  "module card": "ModuleCard",
  "application footer": "Footer"
};

function createComponentCandidateList(regions) {
  return regions
    .filter((region) => region.repeatable || region.tag === "main")
    .map((region) => componentNameByRole[region.role])
    .join(", ");
}

console.log(createComponentCandidateList(semanticRegions));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
