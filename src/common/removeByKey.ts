import { deleteKeyInObjectByPath, deleteSingleKeyInObject, objectHasKeysByPath } from "./internal";

type TPath = string | string[];

/**
 * Removes key-value pair in the object by a provided "path"
 * @param path array containing path to the given key of the object, e.g. ['a', 'b']
 * @param target object to remove the key-value pair from, e.g. { a: { b: 'some value' } }
 * @returns new object with deleted key-value pair, e.g. { a: { } }
 */
export const removeByKey = <T extends Record<string, unknown>>(path: TPath, target: T) => {
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
