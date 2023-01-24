interface IGetByPath {
  (path: string | string[], target: Record<string, unknown>): unknown;
}

const getByPath: IGetByPath = (path, target) => {
  if (!path.length) {
    return target;
  }

  if (target === undefined || target === null) {
    return target;
  }

  if (Array.isArray(path)) {
    const [currentKey] = path;

    return getByPath(path.splice(1), target[currentKey] as Record<string, unknown>);
  } else {
    return target[path];
  }
};

export { getByPath };
