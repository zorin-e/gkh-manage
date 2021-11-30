import { purePhoneNumber, isPhoneLength } from "@/domain/purePhoneNumber";

describe("purePhoneNumber", () => {
  const expectedPhone = "79859352020";
  it(`should be equal to ${expectedPhone}`, () => {
    const phone = purePhoneNumber("+7(985) 935-20-20");
    expect(phone).toBe(expectedPhone);
  });
  it(`should be equal to empty string`, () => {
    const phone = purePhoneNumber("");
    expect(phone).toBe("");
  });

  it(`should be equal to empty string`, () => {
    const phone = purePhoneNumber("");
    expect(phone).toBe("");
  });
});

describe("isPhoneLength", () => {
  it(`phone length should be true`, () => {
    const phone = isPhoneLength(purePhoneNumber("+7(985) 935-20-20"));
    expect(phone).toBe(true);
  });
  it(`phone length should be false`, () => {
    const phone = isPhoneLength("+7(985) 935-20-20");
    expect(phone).toBe(false);
  });
});
