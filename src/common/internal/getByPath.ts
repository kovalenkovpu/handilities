interface IGetByPath {
  (path: string | string[], target: Record<string, any>): any;
}

export const getByPath: IGetByPath = (path, target) => {
  if (!path.length) {
    return target;
  }

  if (target === undefined || target === null) {
    return target;
  }

  if (Array.isArray(path)) {
    const pathCopy = [...path];
    const [currentKey] = pathCopy;

    return getByPath(pathCopy.splice(1), target[currentKey] as Record<string, any>);
  } else {
    return target[path];
  }
};
