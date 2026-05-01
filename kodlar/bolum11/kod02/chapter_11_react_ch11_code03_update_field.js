function updateFormField(formState, fieldName, fieldValue) {
  return {
    ...formState,
    [fieldName]: fieldValue
  };
}

const originalForm = {
  title: "",
  course: "Web Programlama",
  visibility: "campus"
};

const nextForm = updateFormField(originalForm, "title", "React Notları");

console.log(`${nextForm.title} / original:${originalForm.title}`);
