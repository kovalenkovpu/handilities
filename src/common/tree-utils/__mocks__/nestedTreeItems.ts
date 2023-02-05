interface ITreeItem {
  id: string;
  value: string;
  children?: ITreeItem[];
}

const nestedItem = {
  id: "1-1",
  value: "v-1-1",
  children: [],
};

const nestedItemDeep = {
  id: "1-2-1",
  value: "v-1-2-1",
};

const nestedTreeItems: ITreeItem[] = [
  {
    id: "0",
    value: "v-0",
  },
  {
    id: "1",
    value: "v-1",
    children: [
      nestedItem,
      {
        id: "1-2",
        value: "v-1-2",
        children: [nestedItemDeep],
      },
    ],
  },
  {
    id: "2",
    value: "v-2",
  },
];

export { nestedTreeItems, nestedItem, nestedItemDeep };
