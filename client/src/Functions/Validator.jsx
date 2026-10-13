const ValidateUsername = (username) => {
  if (!username) {
    return "Username is required !";
  } else if (username.length < 3) {
    return "Username must be at least 3 characters long.";
  } else if (username.length > 30) {
    return "Username must be less than 30 characters.";
  } else return null;
};
const ValidateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required !";
  } else if (!regex.test(email)) {
    return "Invalid email address.";
  } else return null;
};
const ValidatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_])[A-Za-z\d!@#$%^&*(),.?":{}|<>_]{8,}$/;
  if (!password) {
    return "Password is required !";
  } else if (!regex.test(password)) {
    return "Password must contain 8 characters including at least one Uppercase, Lowercase, Digit and Special character.";
  } else return null;
};

const ValidateProject = (project) => {
  if (!project || !project.name) {
    return "Project name is required!";
  } else if (project.name.length > 50) {
    return "Project name must be less than 50 characters.";
  } else if (project.description && project.description.length > 200) {
    return "Description must be less than 200 characters.";
  } else {
    return null;
  }
};

export { ValidatePassword, ValidateEmail, ValidateUsername, ValidateProject };
