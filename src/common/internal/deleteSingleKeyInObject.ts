export function deleteSingleKeyInObject<T extends Record<string, any>, K extends keyof T>(
  key: K,
  target: T,
): Omit<T, K> {
  const { [key]: toOmit, ...rest } = target;

  return rest;
}
