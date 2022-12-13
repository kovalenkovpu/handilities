export function objectHasKeysByPath(path: string[], target: Record<string, any>): boolean {
  let objectHasKeys = true;
  let targetByKey = target;

  for (let i = 0; i < path.length; i++) {
    const pathKey = path[i];

    if (!targetByKey.hasOwnProperty(pathKey)) {
      objectHasKeys = false;

      break;
    }

    targetByKey = targetByKey[pathKey];
  }

  return objectHasKeys;
}
