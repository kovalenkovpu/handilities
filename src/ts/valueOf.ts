import { KeyOf } from "./keyOf";

export type ValueOf<T> = T[KeyOf<T>];
