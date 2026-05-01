const responses = [
  { requestId: 1, category: "academic", items: ["Seminer"] },
  { requestId: 2, category: "social", items: ["Kulüp buluşması"] },
];

function decideResponseUsage(response, latestRequestId) {
  return response.requestId === latestRequestId ? "accepted" : "ignored";
}

const latestRequestId = 2;
const academicUsage = decideResponseUsage(responses[0], latestRequestId);
const socialUsage = decideResponseUsage(responses[1], latestRequestId);

console.log(`${socialUsage}: ${responses[1].category} | ${academicUsage}: ${responses[0].category}`);
