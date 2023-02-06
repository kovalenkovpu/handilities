interface INodeItem {
  id: string;
  value: string;
  children?: INodeItem[];
}

const nodeItem: INodeItem = {
  id: "0",
  value: "0",
};

export { nodeItem };
