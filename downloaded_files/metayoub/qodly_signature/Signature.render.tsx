import { useRenderer, useSources } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useCallback } from 'react';
import SignaturePad from 'signature_pad';
import { MdClose } from 'react-icons/md';

import { ISignatureProps } from './Signature.config';

const Signature: FC<ISignatureProps> = ({
  penColor,
  backgroundColor,
  clear,
  sizeButton,
  positionButton,
  style,
  className,
  classNames = [],
}) => {
  const { connect, emit } = useRenderer();
  const {
    sources: { datasource: ds },
  } = useSources();

  const isMountedRef = useRef<boolean>(true); // Ref to track mount state

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  const resizeCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        context.scale(ratio, ratio);
        signaturePadRef.current?.clear(); // Clear the signature pad after resizing
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true; // Set to true when component mounts

    if (canvasRef.current) {
      // Initialize the signature pad
      const canvas = canvasRef.current;
      const signaturePad = new SignaturePad(canvas, {
        backgroundColor,
        penColor,
      });
      // signaturePad.penColor = penColor;
      signaturePadRef.current = signaturePad;

      // Resize the canvas when the window is resized
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();

      // Cleanup function to destroy the signature pad when the component unmounts
      return () => {
        isMountedRef.current = false; // Set to false when component unmounts

        if (signaturePadRef.current && isMountedRef.current) {
          // Check if the component is still mounted before updating state
          signaturePadRef.current.off(); // Remove event listeners
          signaturePadRef.current.clear(); // Clear the signature pad
          window.removeEventListener('resize', resizeCanvas);
        }
      };
    }
  }, []);

  const MouseLeave = useCallback(async () => {
    if (!signaturePadRef.current?.isEmpty()) {
      try {
        if (ds) {
          await ds.setValue<any>(null, signaturePadRef.current?.toDataURL('image/jpeg'));
        }
      } catch (error) {
        console.error(error);
      }
      emit!('onchange');
    }
  }, []);
  return (
    <div ref={connect} style={style} className={cn('relative', className, classNames)}>
      <canvas
        ref={canvasRef}
        style={style}
        width={style?.width}
        height={style?.height}
        onMouseLeave={MouseLeave}
        onTouchEnd={MouseLeave}
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
