import { deleteSingleKeyInObject } from "./deleteSingleKeyInObject";

export function deleteKeyInObjectByPath<T extends Record<string, unknown>, K extends keyof T>(
  path: [K],
  target: T,
): Omit<T, K>;

export function deleteKeyInObjectByPath<R extends Record<string, unknown>>(
  path: string[],
  target: Record<string, unknown>,
): R;

export function deleteKeyInObjectByPath<R extends Record<string, unknown>>(
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
