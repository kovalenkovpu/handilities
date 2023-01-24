import { deleteKeyInObjectByPath, deleteSingleKeyInObject, objectHasKeysByPath } from "./internal";

type TPath = string | string[];

interface IRemoveByKey {
  (path: TPath, target: Record<string, unknown>): Record<string, unknown>;
}

/**
 * Removes key-value pair in the object by a provided "path"
 * @param path array containing path to the given key of the object, e.g. ['a', 'b']
 * @param target object to remove the key-value pair from, e.g. { a: { b: 'some value' } }
 * @returns new object with deleted key-value pair, e.g. { a: { } }
 */
const removeByKey: IRemoveByKey = (path, target) => {
  if (!path.length) {
    return target;
  }

  if (Array.isArray(path)) {
    if (objectHasKeysByPath(path, target)) {
      return deleteKeyInObjectByPath(path, target);
    }

    return target;
  }

  return deleteSingleKeyInObject(path, target);
};

export type { IRemoveByKey };
export { removeByKey };
