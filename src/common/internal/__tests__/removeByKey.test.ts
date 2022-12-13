import { removeByKey } from "../../removeByKey";
import { nestedObject } from "../../__mocks__/nestedObject";

describe("removeByKey", () => {
  test.each([
    [[""], nestedObject],

    [["g"], nestedObject],

    [
      ["a"],
      {
        b: {
          c: "C",
          d: {
            e: "E",
            a: "A",
          },
          f: "F",
        },
      },
    ],

    [["b"], { a: "A" }],

    [
      ["b", "c"],
      {
        a: "A",
        b: {
          d: {
            e: "E",
            a: "A",
          },
          f: "F",
        },
      },
    ],

    [
      ["b", "d"],
      {
        a: "A",
        b: {
          c: "C",
          f: "F",
        },
      },
    ],

    [
      ["b", "d", "e"],
      {
        a: "A",
        b: {
          c: "C",
          d: {
            a: "A",
          },
          f: "F",
        },
      },
    ],

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

    [
      "a",
      {
        b: {
          c: "C",
          d: {
            e: "E",
            a: "A",
          },
          f: "F",
        },
      },
    ],

    ["b", { a: "A" }],

    ["c", nestedObject],
  ])("Returns correct value by a given path for the path: '%s'", (path, result) => {
    expect(removeByKey(path, nestedObject)).toEqual(result);
  });
});
