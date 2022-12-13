import { KeyOf } from "./keyOf";

export const objectKeys = <T extends {}>(target: T) => {
  return Object.keys(target) as KeyOf<T>[];
};
