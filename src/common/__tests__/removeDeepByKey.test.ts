import { removeDeepByKey } from "../removeDeepByKey";
import {
  nestedObject,
  nestedObjectForDeepRemoval,
  anotherObjectForDeepRemoval,
} from "../__mocks__/nestedObject";

describe("removeDeepByKey", () => {
  test.each([
    [["a"], { b: nestedObjectForDeepRemoval.b }],

    [["b"], { a: nestedObjectForDeepRemoval.a }],

    [["b", "c"], { a: nestedObjectForDeepRemoval.a }],

    [["b", "c", "d"], { a: nestedObjectForDeepRemoval.a }],
  ])(
    "Simple nested object: returns correct value by a given path for the path: '%s'",
    (path, result) => {
      expect(removeDeepByKey(path, nestedObjectForDeepRemoval)).toEqual(result);
    },
  );

  test.each([
    [["a"], { b: nestedObject.b }],

    [
      ["b", "d", "a"],
      {
        a: "A",
        b: {
          c: "C",
          d: {
            e: "E",
          },
          f: "F",
        },
      },
    ],
  ])(
    "More complex nested object: returns correct value by a given path for the path: '%s'",
    (path, result) => {
      expect(removeDeepByKey(path, nestedObject)).toEqual(result);
    },
  );

  test.each([
    {
      path: ["b", "c", "d"],
      description: "most inner value is deleted",
      target: anotherObjectForDeepRemoval,
      result: {},
    },
    {
      path: [],
      description: "when no path is provided",
      target: anotherObjectForDeepRemoval,
      result: anotherObjectForDeepRemoval,
    },
    {
      path: ["g"],
      description: "non-existent key is provided",
      target: anotherObjectForDeepRemoval,
      result: anotherObjectForDeepRemoval,
    },
    {
      path: [""],
      description: "empty key is provided",
      target: anotherObjectForDeepRemoval,
      result: anotherObjectForDeepRemoval,
    },
    {
      path: ["", ""],
      description: "empty keys are provided",
      target: anotherObjectForDeepRemoval,
      result: anotherObjectForDeepRemoval,
    },
    {
      path: ["a"],
      description: "empty empty target object is provided",
      target: {},
      result: {},
    },
  ])("Corner cases: returns correct result when $description", ({ path, result, target }) => {
    expect(removeDeepByKey(path, target)).toEqual(result);
  });

  test("If the path is not resolved, returns the same provided object", () => {
    expect(removeDeepByKey(["abc"], nestedObject)).toBe(nestedObject);
  });
});
