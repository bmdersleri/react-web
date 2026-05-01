const components = [
  { name: "AnnouncementCard", risks: ["title", "category"] },
  { name: "ProfileSummary", risks: ["empty-user"] },
  { name: "NoteFilter", risks: ["query", "empty-result"] }
];

function createTestMatrix(items) {
  return items.flatMap((component) =>
    component.risks.map((risk) => ({
      component: component.name,
      scenario: `${component.name}:${risk}`,
      critical: risk.includes("empty") || risk === "query"
    }))
  );
}

const matrix = createTestMatrix(components);
const criticalCount = matrix.filter((test) => test.critical).length;
console.log(`tests=${matrix.length} | critical=${criticalCount}`);
