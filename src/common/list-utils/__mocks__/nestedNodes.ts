interface INodeItem {
  id: string;
  value: string;
  children?: INodeItem[];
}

const nestedNodeItem: INodeItem = {
  id: "1-1",
  value: "v-1-1",
  children: [],
};

const nestedNodeItemDeep: INodeItem = {
  id: "1-2-1",
  value: "v-1-2-1",
};

const nestedNodeItems: INodeItem[] = [
  {
    id: "0",
    value: "v-0",
  },
  {
    id: "1",
    value: "v-1",
    children: [
      nestedNodeItem,
      {
        id: "1-2",
        value: "v-1-2",
        children: [nestedNodeItemDeep],
      },
    ],
  },
  {
    id: "2",
    value: "v-2",
  },
];

export type { INodeItem };

export { nestedNodeItems, nestedNodeItem, nestedNodeItemDeep };
