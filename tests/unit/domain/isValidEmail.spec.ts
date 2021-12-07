import { isValidEmail } from "@/domain/isValidEmail";

describe("isValidEmail", () => {
  it("email should be valid", () => {
    const isValid = isValidEmail("mail@mail.com");
    expect(isValid).toBe(true);
  });
  it("test@server is not valid email", () => {
    const isValid = isValidEmail("zorinj@gmail");
    expect(isValid).toBe(false);
  });
  it("test@gmail@test.ru is not valid email", () => {
    const isValid = isValidEmail("test@gmail@test.ru");
    expect(isValid).toBe(false);
  });
});
