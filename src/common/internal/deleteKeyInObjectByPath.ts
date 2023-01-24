import { deleteSingleKeyInObject } from "./deleteSingleKeyInObject";

function deleteKeyInObjectByPath<T extends Record<string, unknown>, K extends keyof T>(
  path: [K],
  target: T,
): Omit<T, K>;

function deleteKeyInObjectByPath<R extends Record<string, unknown>>(
  path: string[],
  target: Record<string, unknown>,
): R;

function deleteKeyInObjectByPath<R extends Record<string, unknown>>(
  path: string[],
  target: Record<string, unknown>,
): typeof target | R {
  if (!path.length) {
    return target;
  }

  const [key, ...rest] = path;

  if (path.length === 1) {
    return deleteSingleKeyInObject(key, target);
  }

  const newTarget = target[key] as Record<string, unknown>;

  return {
    ...target,
    [key]: deleteKeyInObjectByPath(rest, newTarget),
  };
}

export { deleteKeyInObjectByPath };
