import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import TreeNodeComponent from './components/TreeNodeComponent';
import TreeNodeData from './components/TreeNodeData';
import { ITreeProps } from './Tree.config';

const Tree: FC<ITreeProps> = ({ expand, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<TreeNodeData[]>([]);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;
    const listener = async (/* event */) => {
      const v = await ds.getValue<TreeNodeData[]>();
      setValue(v);
    };
    listener();
    ds.addListener('changed', listener);
    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <TreeNodeComponent treeData={value} expand={expand} />
    </div>
  );
};

export default Tree;
