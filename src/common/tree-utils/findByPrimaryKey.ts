const findByPrimaryKey =
  <T extends Record<string, unknown>, K extends keyof T>(key: K) =>
  (list: T[], value: T[K]) => {
    return list.find((item) => item[key] === value);
  };

export { findByPrimaryKey };
