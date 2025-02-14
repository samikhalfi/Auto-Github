interface TreeNodeData {
  key: string;
  label: string;
  icon?: string;
  url?: string;
  webform?: string;
  target?: string;
  children?: TreeNodeData[];
}

export default TreeNodeData;
