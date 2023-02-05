interface ITreeItem {
  id: string;
  value: string;
  children?: ITreeItem[];
}

const treeItem: ITreeItem = {
  id: "0",
  value: "0",
};

export { treeItem };
