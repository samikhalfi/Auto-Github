import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { IQrCodeProps } from './QrCode.config';

const QrCode: FC<IQrCodeProps> = ({
  link,
  level,
  style,
  className,
  classNames = [],
  QrfgColor,
  QrbgColor,
  Qrsize,
  includeMargin,
  src,
  heightImage,
  widthImage,
  excavate,
}) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState(() => link);
  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async (/* event */) => {
      const v = await ds.getValue<string>();
      setValue(v || link);
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
      <QRCodeSVG value={value}
      imageSettings={{
        src: `${src}`,
        x: undefined,
        y: undefined,
        height: heightImage,
        width: widthImage,
        excavate: excavate,
      }}
      level={level} fgColor={QrfgColor} bgColor={QrbgColor} size={Qrsize} includeMargin={includeMargin}/>
    </div>
  );
};

export default QrCode;
