import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { IObjectViewerProps } from './ObjectViewer.config';
import ReactJson from 'react-json-view';

const ObjectViewer: FC<IObjectViewerProps> = ({
  theme,
  indentWidth,
  collapsed,
  iconStyle,
  collapseStringsAfterLength,
  groupArraysAfterLength,
  displayDataTypes,
  displayObjectSize,
  sortKeys,
  name,
  enableClipboard,
  quotesOnKeys,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<object>({});
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<object>();
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
      <ReactJson
        src={value}
        theme={theme}
        collapsed={collapsed}
        indentWidth={indentWidth}
        iconStyle={iconStyle}
        collapseStringsAfterLength={collapseStringsAfterLength}
        groupArraysAfterLength={groupArraysAfterLength}
        displayDataTypes={displayDataTypes}
        displayObjectSize={displayObjectSize}
        sortKeys={sortKeys}
        name={name}
        enableClipboard={enableClipboard}
        quotesOnKeys={quotesOnKeys}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      />
    </div>
  );
};

export default ObjectViewer;
