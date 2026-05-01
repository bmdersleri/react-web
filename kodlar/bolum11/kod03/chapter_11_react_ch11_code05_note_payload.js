function buildNotePayload(values) {
  const tags = values.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    course: values.course,
    tags,
    visibility: values.visibility || "campus",
    allowComments: Boolean(values.allowComments)
  };
}

const payload = buildNotePayload({
  title: " React Hooks ",
  description: " useState ve useEffect notları ",
  course: "react",
  tags: "React, hooks,  ",
  visibility: "campus",
  allowComments: true
});

console.log(JSON.stringify({
  title: payload.title,
  tags: payload.tags,
  visibility: payload.visibility
}));
