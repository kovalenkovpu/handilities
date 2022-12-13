import { ValueOf } from "./valueOf";

export const objectValues = <T extends {}>(target: T) => {
  return Object.values(target) as ValueOf<T>[];
};
