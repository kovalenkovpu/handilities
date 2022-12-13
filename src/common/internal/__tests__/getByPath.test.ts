import { getByPath } from "../getByPath";
import { nestedObject } from "../../__mocks__/nestedObject";

describe("getByPath", () => {
  test.each([
    [[""], undefined],
    [["g"], undefined],
    [["a"], nestedObject.a],
    [["b"], nestedObject.b],
    [["b", "c"], nestedObject.b.c],
    [["b", "d", "e"], nestedObject.b.d.e],
    [["b", "d", "a"], nestedObject.b.d.a],
    ["a", nestedObject.a],
    ["b", nestedObject.b],
    ["c", undefined],
  ])('Returns correct value by a given path for the path: "%s"', (path, result) => {
    expect(getByPath(path, nestedObject)).toEqual(result);
  });
});
