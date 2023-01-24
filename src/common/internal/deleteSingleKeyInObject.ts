function deleteSingleKeyInObject<T extends Record<string, unknown>, K extends keyof T>(
  key: K,
  target: T,
): Omit<T, K> {
  const { [key]: _, ...rest } = target;

  return rest;
}

export { deleteSingleKeyInObject };
