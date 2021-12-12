import { objectParamsToString } from "@/domain/objectParamsToString";

describe("objectParamsToString", () => {
  const result = "paginate[page]=10&paginate[perpage]=20&filter[name]=moscow";
  it(`should be ${result} as result`, () => {
    const params = objectParamsToString({
      paginate: { page: 10, perpage: 20 },
      filter: { name: "moscow" },
    });
    expect(params).toBe(result);
  });
  it(`should be empty string as result`, () => {
    const params = objectParamsToString();
    expect(params).toBe("");
  });
  it(`should be relations[]=tenant as result`, () => {
    const result = "relations[]=tenant";
    const params = objectParamsToString({
      relations: {
        "": "tenant",
      },
    });
    expect(params).toBe(result);
  });
});
