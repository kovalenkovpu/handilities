interface IInitTraverseUtilsOptions<PK, SK> {
  primaryKey: PK;
  childrenKey: SK;
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

function initTreeUtils<PK extends string, SK extends string>(
  options: IInitTraverseUtilsOptions<PK, SK>,
) {
  const { primaryKey, childrenKey } = options;

  const _findByPrimaryKey =
    (primaryKey: PK, childrenKey: SK) =>
    <T extends Record<PK, T[PK]> & PartialRecord<SK, T[]>>(items: T[], value: T[PK]) => {
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

      return find(items);
    };

  return {
    findByPrimaryKey: _findByPrimaryKey(primaryKey, childrenKey),
  };
}

export type { IInitTraverseUtilsOptions };

export { initTreeUtils };
