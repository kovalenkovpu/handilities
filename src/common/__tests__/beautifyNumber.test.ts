import { sameJointAndDelimiterErrorMessage, beautifyNumber } from "../beautifyNumber";

describe("beautifyNumber", () => {
  describe("beautifyNumber with no options passed", () => {
    test.each([
      [1, "1"],
      [100, "100"],
      [1000, "1 000"],
      [100000, "100 000"],
      [123456789, "123 456 789"],
    ])('converts "%s" into "%s"', (value, result) => {
      expect(beautifyNumber(value)).toBe(result);
    });
  });

  describe('beautifyNumber with the "," joint', () => {
    test.each([
      [1, "1"],
      [100, "100"],
      [1000, "1,000"],
      [100000, "100,000"],
      [123456789, "123,456,789"],
    ])('converts "%s" into "%s"', (value, result) => {
      expect(beautifyNumber(value, { joint: "," })).toBe(result);
    });
  });

  describe("beautifyNumber for floating numbers", () => {
    test.each([
      [1.12, "1.12"],
      [100.123, "100.123"],
      [1000.1234, "1 000.1234"],
      [100000.12345, "100 000.12345"],
      [123456789.0123456, "123 456 789.0123456"],
    ])('converts "%s" into "%s"', (value, result) => {
      expect(beautifyNumber(value)).toBe(result);
    });
  });

  describe('beautifyNumber for floating numbers with the "_" joint, and "," delimiter', () => {
    test.each([
      [1.12, "1,12"],
      [100.123, "100,123"],
      [1000.1234, "1_000,1234"],
      [100000.12345, "100_000,12345"],
      [123456789.0123456, "123_456_789,0123456"],
    ])('converts "%s" into "%s"', (value, result) => {
      expect(beautifyNumber(value, { joint: "_", delimiter: "," })).toBe(result);
    });
  });

  describe("beautifyNumber for negative floating numbers", () => {
    test.each([
      [-1.12, "-1.12"],
      [-100.123, "-100.123"],
      [-1000.1234, "-1 000.1234"],
      [-100000.12345, "-100 000.12345"],
      [-123456789.0123456, "-123 456 789.0123456"],
    ])('converts "%s" into "%s"', (value, result) => {
      expect(beautifyNumber(value)).toBe(result);
    });
  });

  test('works for "_" number notation', () => {
    expect(beautifyNumber(12_001_123)).toBe("12 001 123");
  });

  test("throws the error if joint and delimiter are equal", () => {
    try {
      beautifyNumber(12_001_123, { joint: "", delimiter: "" });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(error.message).toContain(sameJointAndDelimiterErrorMessage);
    }
  });
});
