import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

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
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const data: object = {
    data1: [
      {
        Property1: 'test',
        Property2: 'test',
      },
      {
        Property1: 'test',
        Property2: 'test',
      },
    ],
    data2: [
      {
        Property1: 'test',
        Property2: 'test',
      },
      {
        Property1: 'test',
        Property2: 'test',
      },
      {
        Property1: 'test',
        Property2: 'test',
      },
    ],
    data3: [
      {
        Property1: 'test',
        Property2: 'test',
      },
    ],
    data4: [],
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <ReactJson
        src={data}
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
