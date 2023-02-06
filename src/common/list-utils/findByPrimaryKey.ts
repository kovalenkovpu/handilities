type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

interface IFindByPrimaryKeyMutation<T extends Record<string, unknown>> {
  (node: T): void;
}

/**
 * @param primaryKey primary key name which is a unique identifier for each object within the given list.
 * @param childrenKey secondary key name which is used as an identifier for nested nodes list within a current one.
 * @returns function that accepts:
 *  1) list to traverse over;
 *  2) value of a primary key to match;
 *  3) callback to be called on a found node.
 *
 * Say, our list is something like that:
 *
 * const list = [{ id: 0, value: '0', children: [{ id: 1, value: '1' }] }];
 *
 * Then, we can find an object with id === 1 doing the following:
 *
 * const node = findByPrimaryKey('id', 'children')(list, 1);
 * @returns if target node exists - the link to that node itself, otherwise - null
 */
const findByPrimaryKey =
  <PK extends string, SK extends string>(primaryKey: PK, childrenKey: SK) =>
  <T extends Record<PK, T[PK]> & PartialRecord<SK, T[]>>(
    items: T[],
    value: T[PK],
    cb?: IFindByPrimaryKeyMutation<T>,
  ) => {
    let foundItem: T | null = null;

    const find = (children: T[]) => {
      for (let i = 0; i < children.length; i++) {
        const current = children[i];

        if (current[primaryKey] === value) {
          foundItem = current;
          break;
        }

        const next = current[childrenKey];

        if (next && Array.isArray(next)) {
          find(next);
        }
      }

      return foundItem;
    };

    const result = find(items);

    if (cb && result) {
      cb(result);
    }

    return result;
  };

export type { IFindByPrimaryKeyMutation };

export { findByPrimaryKey };
