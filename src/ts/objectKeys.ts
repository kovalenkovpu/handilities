import { KeyOf } from "./keyOf";

const objectKeys = <T extends Record<string, unknown>>(target: T) => {
  return Object.keys(target) as KeyOf<T>[];
};

export { objectKeys };
