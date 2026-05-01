function createNotePayload(formValues) {
  return {
    title: formValues.title.trim(),
    course: formValues.course.trim(),
    description: formValues.description.trim(),
    tags: formValues.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

function isValidNotePayload(payload) {
  return payload.title.length >= 3 && payload.course.length >= 2 && payload.description.length >= 10;
}

function createPostRequest(endpoint, payload) {
  return {
    url: endpoint,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  };
}

const payload = createNotePayload({
  title: " React API Notları ",
  course: " React ",
  description: "REST API entegrasyonu için özet not.",
  tags: "api, fetch, react",
});

const request = createPostRequest("/api/notes", payload);
const body = JSON.parse(request.options.body);
console.log(`${request.options.method} ${request.url} | bodyTitle: ${body.title} | valid: ${isValidNotePayload(payload)}`);
