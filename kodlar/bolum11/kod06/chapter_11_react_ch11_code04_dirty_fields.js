function getDirtyFields(initialValues, currentValues) {
  return Object.keys(currentValues)
    .filter((fieldName) => currentValues[fieldName] !== initialValues[fieldName])
    .sort();
}

const initialProfile = {
  fullName: "Mehmet Demir",
  email: "mehmet@kampus.edu.tr",
  bio: "",
  wantsNotifications: true
};

const currentProfile = {
  fullName: "Mehmet Demir",
  email: "m.demir@kampus.edu.tr",
  bio: "React öğreniyorum.",
  wantsNotifications: true
};

console.log(getDirtyFields(initialProfile, currentProfile).join(", "));
