import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';
import { IColorInputProps } from './ColorInput.config';

const ColorInput: FC<IColorInputProps> = ({ defaultColor, style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState(() => defaultColor);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v || defaultColor);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  const changeColor = (color: string) => {
    ds ? ds.setValue<string>(null, color) : setValue(color);
  };

  return (
    <div ref={connect} className={cn('w-fit h-fit', className, classNames)}>
      <HexAlphaColorPicker color={value} style={style} onChange={changeColor} />
    </div>
  );
};

export default ColorInput;
