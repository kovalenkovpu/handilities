import { ValueOf } from "./valueOf";

const objectValues = <T extends Record<string, unknown>>(target: T) => {
  return Object.values(target) as ValueOf<T>[];
};

export { objectValues };
