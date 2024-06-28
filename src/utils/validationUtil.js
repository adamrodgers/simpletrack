export const validateForm = (formData) => {
  const errors = {};
  if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) errors.name = "Name can only contain letters.";
  if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid.";
  if (formData.phone && !/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) errors.phone = "Phone number is invalid.";
  if (formData.statusDate && new Date(formData.statusDate) > new Date()) errors.statusDate = "Status date cannot be in the future.";
  return errors;
};
