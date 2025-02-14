import { TreeNode } from './';
import TreeNodeData from './TreeNodeData';
interface TreeNodeComponentProps {
  treeData?: TreeNodeData[];
  onLastItemClick?: (node: TreeNodeData) => void;
  expand?: boolean;
}

function TreeNodeComponent({ treeData, onLastItemClick, expand }: TreeNodeComponentProps) {
  return (
    <ul>
      {treeData?.map((node, index) => (
        <TreeNode
          node={node}
          key={node.key}
          isLast={index === treeData.length - 1}
          onLastItemClick={onLastItemClick}
          expand={expand}
        />
      ))}
    </ul>
  );
}

export default TreeNodeComponent;
