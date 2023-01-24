function objectHasKeysByPath(path: string[], target: Record<string, unknown>): boolean {
  let objectHasKeys = true;
  let targetByKey: Record<string, unknown> = target;

  for (let i = 0; i < path.length; i++) {
    const pathKey = path[i];

    if (!targetByKey[pathKey]) {
      objectHasKeys = false;

      break;
    }

    targetByKey = targetByKey[pathKey] as Record<string, unknown>;
  }

  return objectHasKeys;
}

export { objectHasKeysByPath };
