import { findByPrimaryKey } from "../findByPrimaryKey";
import {
  INodeItem,
  nestedNodeItem,
  nestedNodeItemDeep,
  nestedNodeItems,
  nodeItem,
} from "../__mocks__";

describe("findByPrimaryKey", () => {
  const primaryKey = "id";
  const secondaryKey = "children";

  test("finds object by a given primary key in a plain structure", () => {
    expect(findByPrimaryKey(primaryKey, secondaryKey)([nodeItem], "0")).toBe(nodeItem);
  });

  test("finds object by a given primary key in a nested structure (nesting level 1)", () => {
    expect(findByPrimaryKey(primaryKey, secondaryKey)(nestedNodeItems, "1-1")).toBe(nestedNodeItem);
  });

  test("finds object by a given primary key in a nested structure (nesting level 2)", () => {
    expect(findByPrimaryKey(primaryKey, secondaryKey)(nestedNodeItems, "1-2-1")).toBe(
      nestedNodeItemDeep,
    );
  });

  test("returns 'null' if value by a given primary key doesn't exist", () => {
    expect(findByPrimaryKey(primaryKey, secondaryKey)(nestedNodeItems, "1-2-3")).toBeNull();
  });

  test("calls a mutation callback (if provided) on a found node", () => {
    const mutation = (node: INodeItem) => (node.value = `${node.value}-mutated`);
    const nodeWithMutation = findByPrimaryKey(primaryKey, secondaryKey)(
      nestedNodeItems,
      "1-1",
      mutation,
    );

    expect(nodeWithMutation?.value).toBe("v-1-1-mutated");
  });
});
