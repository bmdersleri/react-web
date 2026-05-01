function getFieldFeedback(fieldName, errors, touched, submitted) {
  const shouldShowError = Boolean(errors[fieldName]) && (touched[fieldName] || submitted);

  if (!shouldShowError) {
    return {
      field: fieldName,
      status: "idle",
      message: ""
    };
  }

  return {
    field: fieldName,
    status: "error",
    message: errors[fieldName]
  };
}

const errors = {
  email: "Geçerli e-posta giriniz.",
  title: "Başlık zorunludur."
};

const touched = {
  email: true,
  title: false
};

const emailFeedback = getFieldFeedback("email", errors, touched, false);
const titleFeedback = getFieldFeedback("title", errors, touched, false);

console.log(
  `email:${emailFeedback.status}:${emailFeedback.message} | title:${titleFeedback.status}`
);
