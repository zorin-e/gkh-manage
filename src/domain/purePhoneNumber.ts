export const purePhoneNumber = (phone: string) => {
  if (!phone) return "";
  return phone.replace(/\D/g, "");
};

export const isPhoneLength = (value: string) => value.length === 11;
