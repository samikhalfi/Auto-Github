import TreeNodeData from './TreeNodeData';
import { useState } from 'react';
import { webformLoaderSubject, WebformLoaderActions } from '@ws-ui/webform-editor';
import { TreeNodeComponent } from '.';

interface TreeNodeProps {
  node: TreeNodeData;
  isLast: boolean;
  onLastItemClick?: (node: TreeNodeData) => void;
  expand?: boolean;
}
function TreeNode({ node, isLast, onLastItemClick, expand }: TreeNodeProps) {
  const { children, label, icon, url, webform, target } = node;

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

  const handleChildClick = () => {
    if (webform && target) {
      webformLoaderSubject.next({
        id: webform,
        action: WebformLoaderActions.LOAD,
        payload: { target },
      });
    }
  };

  return (
    <>
      <div onClick={handleClick} style={{ marginBottom: '10px' }}>
        <div className="flex items-center gap-1" style={{ cursor: children ? 'pointer' : '' }}>
          {children && (
            <i className={`fa-solid ${showChildren ? 'fa-angle-down' : 'fa-angle-right'} mr-2`}></i>
          )}
          {icon && <i className={`${icon} mr-1`}></i>}
          {url ? (
            <a href={url}>{label}</a>
          ) : (
            <div className={`${webform && 'cursor-pointer'}  `} onClick={handleChildClick}>
              {label}
            </div>
          )}
        </div>
      </div>
      {showChildren && children && (
        <ul style={{ paddingLeft: '10px', marginLeft: '27px' }}>
          <TreeNodeComponent treeData={children} expand={expand} />
        </ul>
      )}
    </>
  );
}

export default TreeNode;
