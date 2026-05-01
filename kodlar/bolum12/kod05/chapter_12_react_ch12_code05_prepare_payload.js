function prepareAddNoteAction(formValues) {
  const tags = formValues.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return {
    type: "notes/addNote",
    payload: {
      title: formValues.title.trim(),
      course: formValues.course.trim(),
      tags,
    },
  };
}

const action = prepareAddNoteAction({
  title: "  Redux Toolkit ",
  course: " React ",
  tags: "Redux, State,  ",
});

console.log(JSON.stringify(action));
