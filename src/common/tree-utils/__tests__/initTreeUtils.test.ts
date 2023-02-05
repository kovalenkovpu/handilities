import { initTreeUtils } from "../initTreeUtils";
import { nestedItem, nestedItemDeep, nestedTreeItems, treeItem } from "../__mocks__";

describe("initTreeUtils", () => {
  const treeUtils = initTreeUtils({ primaryKey: "id", childrenKey: "children" });

  describe("findByPrimaryKey", () => {
    test("finds object by a given primary key in a plain structure", () => {
      expect(treeUtils.findByPrimaryKey([treeItem], "0")).toBe(treeItem);
    });

    test("finds object by a given primary key in a nested structure", () => {
      expect(treeUtils.findByPrimaryKey(nestedTreeItems, "1-1")).toBe(nestedItem);
    });

    test("finds object by a given primary key in a deep nested structure", () => {
      expect(treeUtils.findByPrimaryKey(nestedTreeItems, "1-2-1")).toBe(nestedItemDeep);
    });

    test("returns 'null' if value by a given primary keydoesn not exist", () => {
      expect(treeUtils.findByPrimaryKey(nestedTreeItems, "1-2-3")).toBeNull();
    });
  });
});
