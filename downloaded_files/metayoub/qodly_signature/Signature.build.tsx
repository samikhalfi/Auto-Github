import { FC, useRef } from 'react';
import SignaturePad from 'signature_pad';
import cn from 'classnames';
import { useEnhancedNode } from '@ws-ui/webform-editor';
import { ISignatureProps } from './Signature.config';
import { MdClose } from 'react-icons/md';

const Signature: FC<ISignatureProps> = ({
  backgroundColor,
  clear,
  sizeButton,
  style,
  positionButton,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  const signaturePadRef = useRef<SignaturePad | null>(null);

  return (
    <div ref={connect} style={style} className={cn('relative', className, classNames)}>
      <canvas
        width={style?.width}
        height={style?.height}
        style={{ backgroundColor: backgroundColor }}
      />
      {clear && (
        <MdClose
          size={sizeButton}
          className={`hover:cursor-pointer absolute top-1 ${positionButton === 'left' ? 'left-1' : 'right-1'} rounded-full bg-gray-100 p-1 text-gray-600 hover:bg-gray-300`}
          onClick={() => signaturePadRef.current?.clear()}
        />
      )}
    </div>
  );
};

export default Signature;
