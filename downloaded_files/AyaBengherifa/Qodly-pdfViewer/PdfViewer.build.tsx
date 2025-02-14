import { FC } from 'react';
import cn from 'classnames';
import { IPdfViewerProps } from './PdfViewer.config';
import { useEnhancedNode } from '@ws-ui/webform-editor';
import { FaFilePdf, FaRegFilePdf } from 'react-icons/fa';

const PdfViewer: FC<IPdfViewerProps> = ({ datasource, style, className, classNames = [] }) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();

  return (
    <div ref={connect} style={style} className={cn(className, classNames,'flex items-center justify-center border-dashed border border-gray-400 h-10')}>
      {datasource ? (
        <div className="flex items-center">
          <FaFilePdf className="mr-2" /> PDF File...
        </div>
      ) : (
        <div className="flex items-center">
          <FaRegFilePdf className="mr-2" /> No files to display...
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
