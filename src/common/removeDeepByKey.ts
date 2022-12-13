import { getByPath, removeByKey } from "./internal";

export interface IRemoveDeepByKey {
  (path: string[], target: Record<string, any>): Record<string, any>;
}

/**
 * Removes key-value pair in the object by a provided "path", and then checks if the outer value became empty.
 * If so, removes it and proceeds to outer keys of the object.
 * @param path array containing path to the given key of the object, e.g. ['a', 'b']
 * @param target object to remove the key-value pair from, e.g. { a: { b: 'some value' } }
 * @returns new object with deleted key-value pair, e.g. { }
 */
export const removeDeepByKey: IRemoveDeepByKey = (path, target) => {
  const pathCopy = [...path];
  const result = removeByKey(pathCopy, target);

  pathCopy.splice(-1);

  const valueByUpdatedPath = getByPath(pathCopy, result);

  if (!pathCopy.length || !valueByUpdatedPath || Object.keys(valueByUpdatedPath).length) {
    return result;
  }

  return removeDeepByKey(pathCopy, result);
};
