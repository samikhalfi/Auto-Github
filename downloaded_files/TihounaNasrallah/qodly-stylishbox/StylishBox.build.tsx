import { selectResolver, useEnhancedEditor, useEnhancedNode } from '@ws-ui/webform-editor';
import { Element } from '@ws-ui/craftjs-core';
import cn from 'classnames';
import { CSSProperties, FC } from 'react';
import { chain } from 'lodash';

import { IStylishBoxProps } from './StylishBox.config';

const StylishBox: FC<IStylishBoxProps> = ({ parameters, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const { resolver } = useEnhancedEditor(selectResolver);

  const transformedObject: Record<string, string> = chain(parameters)
    .keyBy('name')
    .mapValues('source')
    .value();

  const style = transformedObject as CSSProperties;

  return (
    <div
      ref={connect}
      style={{ ...style, width: '100%' }}
      className={(cn(className, classNames), 'p-2')}
    >
      <Element id="container" is={resolver.StyleBox} canvas />
    </div>
  );
};

export default StylishBox;
