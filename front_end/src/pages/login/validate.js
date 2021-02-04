import validator from "validator";

const validateLoginFormData = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Please enter a valid email";
  }

  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password should be atleast 8 characters long";
  }

  return Object.keys(errors).length ? errors : false;
};

export default validateLoginFormData;
