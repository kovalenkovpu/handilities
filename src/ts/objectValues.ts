import { ValueOf } from "./valueOf";

export const objectValues = <T extends Record<string, unknown>>(target: T) => {
  return Object.values(target) as ValueOf<T>[];
};
