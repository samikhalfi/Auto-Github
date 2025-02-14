import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState } from 'react';

import { ITreeProps } from './Tree.config';
const treeData = [
  {
    key: '1',
    icon: 'fa-regular fa-folder',
    label: 'Node 1',
    children: [
      {
        key: '2',
        label: 'Node 1.1',
        icon: 'fa-solid fa-inbox',
        children: [
          { key: '4', label: 'Node 1.1.1', icon: 'fa-regular fa-file' },
          { key: '5', label: 'Node 1.1.2', icon: 'fa-regular fa-file' },
        ],
      },
      { key: '3', icon: 'fa-regular fa-calendar-days', label: 'Node 1.2' },
    ],
  },
  { key: '4', icon: 'fa-regular fa-folder', label: 'Node 2' },
];
const Tree: FC<ITreeProps> = ({ style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <TreeNodeComponent treeData={treeData} />
    </div>
  );
};

export default Tree;

interface TreeNodeData {
  key: string;
  icon?: string;
  label: string;
  children?: TreeNodeData[];
}

interface Treetest {
  treeData?: TreeNodeData[];
  onLastItemClick?: (node: TreeNodeData) => void;
}

function TreeNodeComponent({ treeData, onLastItemClick }: Treetest) {
  return (
    <ul>
      {treeData?.map((node, index) => (
        <TreeNode
          node={node}
          key={node.key}
          isLast={index === treeData.length - 1}
          onLastItemClick={onLastItemClick}
        />
      ))}
    </ul>
  );
}

interface TreeNodeProps {
  node: TreeNodeData;
  isLast: boolean;
  onLastItemClick?: (node: TreeNodeData) => void;
  expand?: boolean;
}
function TreeNode({ node, isLast, onLastItemClick, expand }: TreeNodeProps) {
  const { children, label, icon } = node;

  const [showChildren, setShowChildren] = useState(expand || false);

  const handleClick = () => {
    if (isLast) {
      setShowChildren(!showChildren);
      if (onLastItemClick) {
        onLastItemClick(node);
      }
    } else {
      setShowChildren(!showChildren);
    }
  };
  return (
    <>
      <div onClick={handleClick} style={{ marginBottom: '10px' }}>
        <div className="flex items-center gap-1" style={{ cursor: children ? 'pointer' : '' }}>
          {children && (
            <i className={`fa-solid ${showChildren ? 'fa-angle-down' : 'fa-angle-right'} mr-2`}></i>
          )}
          {icon && <i className={` ${icon} mr-1`}></i>}

          <span>{label}</span>
        </div>
      </div>
      <ul style={{ paddingLeft: '10px', marginLeft: '27px' }}>
        {showChildren && <TreeNodeComponent treeData={children} />}
      </ul>
    </>
  );
}
