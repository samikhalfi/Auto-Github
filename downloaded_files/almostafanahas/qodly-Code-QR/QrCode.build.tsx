import { useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';
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
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <div ref={connect} style={style} className={cn(className, classNames, "w-fit")}>
      <QRCodeSVG value={link}
      imageSettings={{
        src: `${src}`,
        x: undefined,
        y: undefined,
        height: heightImage,
        width: widthImage,
        excavate: excavate,
      }}
      level={level} fgColor={QrfgColor} bgColor={QrbgColor} size={Qrsize} includeMargin={includeMargin} />
    </div>
  );
};

export default QrCode;
