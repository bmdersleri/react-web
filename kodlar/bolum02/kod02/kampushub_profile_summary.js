const studentProfile = {
  fullName: "Elif",
  department: "Bilgisayar Mühendisliği",
  year: 2,
  role: "student"
};

function createProfileSummary(profile) {
  const { fullName, department, year } = profile;
  return `${fullName} | ${department} | ${year}. sınıf`;
}

console.log(createProfileSummary(studentProfile));
