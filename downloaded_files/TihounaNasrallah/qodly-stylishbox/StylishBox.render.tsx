import {
  selectResolver,
  useEnhancedEditor,
  useEntity,
  useRenderer,
  useSources,
} from '@ws-ui/webform-editor';
import cn from 'classnames';
import { CSSProperties, FC, useCallback, useEffect, useState } from 'react';
import { Element } from '@ws-ui/craftjs-core';
import { IParameters, IStylishBoxProps } from './StylishBox.config';

const StylishBox: FC<IStylishBoxProps> = ({ parameters, className, classNames = [] }) => {
  const { connect } = useRenderer();
  const { resolver } = useEnhancedEditor(selectResolver);
  const [transformedObject, setTransformedObject] = useState<CSSProperties>({});
  const {
    actions: { getDatasource },
  } = useSources();

  const entity = useEntity();

  const processArray = useCallback(
    async (arr: IParameters[]): Promise<void> => {
      const transformed: CSSProperties = {};
      for (const obj of arr) {
        const ds = getDatasource(obj.source, obj.source.startsWith('$'));
        if (ds) {
          const value = await ds.getValue();
          const propertyName = `--${obj.name}`;
          const tempObj: CSSProperties = {
            [propertyName]: value ? value : obj.defaultValue,
          };
          Object.assign(transformed, tempObj);
        }
      }
      setTransformedObject(transformed);
    },
    [parameters],
  );

  useEffect(() => {
    const main = async () => {
      await processArray(parameters);
      for (const obj of parameters) {
        const ds = getDatasource(obj.source, obj.source.startsWith('$'));
        if (ds) {
          ds.addListener('changed', () => {
            processArray(parameters);
          });
        }
      }
    };
    main();

    return () => {
      parameters.forEach((obj) => {
        const ds = getDatasource(obj.source, obj.source.startsWith('$'));
        if (ds) {
          ds.removeListener('changed', () => processArray(parameters));
        }
      });
    };
  }, [parameters, entity]);

  return (
    <div
      ref={connect}
      style={{ width: '100%', ...transformedObject }}
      className={cn(className, classNames)}
    >
      <Element
        id="container"
        style={{ width: '100%', height: '100%' }}
        is={resolver.StyleBox}
        canvas
      />
    </div>
  );
};

export default StylishBox;
