import { FC, useState, useEffect } from 'react';
import cn from 'classnames';
import { IPdfViewerProps } from './PdfViewer.config';
import { useRenderer, useSources } from '@ws-ui/webform-editor';

const PdfViewer: FC<IPdfViewerProps> = ({ style, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const [value, setValue] = useState<any>(null);
  const [pdfSource, setPdfSource] = useState<any>(null);

  const {
    sources: { datasource: ds },
  } = useSources();

  useEffect(() => {
    if (!ds) return;

    const listener = async () => {
      const v = await ds.getValue<any>();
      setValue(v);
    };
    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
  }, [ds]);

  useEffect(() => {
    const getPdf = async () => {
      if (!value) return;

      let url = null;

      try {
        const val = JSON.parse(value);

        const resp = await fetch(val.__deferred.uri);
        const arrayBuffer = await resp.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        url = URL.createObjectURL(blob);

        setPdfSource(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    getPdf();
  }, [value]);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <div className="w-full h-full border border-gray-300">
        {pdfSource ? (
          <iframe src={pdfSource} width="100%" height="100%" />
        ) : value ? (
          <iframe src={value} width="100%" height="100%" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No files to display...
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
