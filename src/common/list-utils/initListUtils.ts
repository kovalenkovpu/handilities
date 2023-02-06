import { findByPrimaryKey } from "./findByPrimaryKey";

interface IInitListUtilsOptions<PK, SK> {
  primaryKey: PK;
  childrenKey: SK;
}

/**
 * Creates a bag of useful traversing utilities for going over, finding and mutating nodes within
 * some nested objects structures.
 * For now, contains following methods:
 * - findByPrimaryKey - finds a node by it's primary identifier and invokes provided callback to mutate the node.
 */
function initListUtils<PK extends string, SK extends string>(
  options: IInitListUtilsOptions<PK, SK>,
) {
  const { primaryKey, childrenKey } = options;

  return {
    findByPrimaryKey: findByPrimaryKey(primaryKey, childrenKey),
  };
}

export type { IInitListUtilsOptions };

export { initListUtils };
