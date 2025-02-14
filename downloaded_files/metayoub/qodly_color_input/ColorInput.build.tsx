import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
import { IColorInputProps } from './ColorInput.config';
import { HexAlphaColorPicker } from 'react-colorful';
const ColorInput: FC<IColorInputProps> = ({ defaultColor, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <div ref={connect} className={cn('w-fit h-fit', className, classNames)}>
      <HexAlphaColorPicker color={defaultColor} style={style} />
    </div>
  );
};

export default ColorInput;
