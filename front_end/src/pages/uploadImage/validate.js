const validateuploadImageFormData = (data) => {
  const errors = {};
  if (!data.imageName) errors.imageName = "Image Name is required";

  if (!data.image) errors.image = "Please select an image";

  return Object.keys(errors).length ? errors : false;
};

export default validateuploadImageFormData;
