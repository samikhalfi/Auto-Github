import { FC, useEffect } from 'react';
import cn from 'classnames';
import {
  useSources,
  useEnhancedEditor,
  selectResolver,
  useEnhancedNode,
  useDataLoader,
  unsubscribeFromDatasource,
  EntityProvider,
} from '@ws-ui/webform-editor';
import { Element } from '@ws-ui/craftjs-core';
interface IHorizontalTimelineProps extends webforms.ComponentProps {
  variant?: string;
}

const HorizontalTimeline: FC<IHorizontalTimelineProps> = ({
  iterator,
  variant,
  style,
  className,
  classNames = [],
}) => {
  const { resolver } = useEnhancedEditor(selectResolver);
  const {
    connectors: { connect },
  } = useEnhancedNode((node) => {
    return { linkedNodes: node.data.linkedNodes };
  });
  const {
    sources: { datasource: ds, currentElement: currentDs },
  } = useSources();
  const { entities, fetchIndex } = useDataLoader({ source: ds });

  useEffect(() => {
    fetchIndex(0);
  }, []);

  useEffect(() => {
    if (!ds) {
      return;
    }

    const cb = () => {
      ds.getValue('length').then((_length) => {
        fetchIndex(0);
      });
    };

    ds.addListener('changed', cb);

    return () => {
      unsubscribeFromDatasource(ds, cb);
    };
  }, [ds, fetchIndex]);

  return (
    <>
      <div ref={connect} style={style} className={cn(className, classNames)}>
        <div className="flex ">
          {variant == 'value1' &&
            entities.map((item, index) => (
              <div className="relative flex items-end " key={item.__KEY}>
                <div className="absolute text-sm mb-2 ml-3">
                  <EntityProvider
                    index={index}
                    selection={ds}
                    current={currentDs?.id}
                    iterator={iterator}
                  >
                    <Element
                      id="item"
                      className="h-full w-full"
                      role="item"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </EntityProvider>
                </div>

                {index !== entities.length - 1 && (
                  <div className="flex w-40 bg-gray-200 relative left-3 h-0.5 dark:bg-gray-400"></div>
                )}
                <div className="mt-3 sm:pe-8">
                  <div className="absolute top-1 left-1.5 z-10 flex items-center border-gray-200  border-2 shadow-2xl justify-center w-4 h-4 bg-gray-400  rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 "></div>
                </div>
              </div>
            ))}
          {variant == 'value2' &&
            entities.map((item, index) => (
              <div className="relative flex items-end top-12" key={item.__KEY}>
                <div className="absolute text-sm mb-2 ml-3">
                  <EntityProvider
                    index={index}
                    selection={ds}
                    current={currentDs?.id}
                    iterator={iterator}
                  >
                    <Element
                      id="item1"
                      className="h-full w-full"
                      role="item1"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </EntityProvider>
                </div>
                <div className="absolute text-sm top-4 ml-3">
                  <EntityProvider
                    index={index}
                    selection={ds}
                    current={currentDs?.id}
                    iterator={iterator}
                  >
                    <Element
                      id="item2"
                      className="h-full w-full"
                      role="item2"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </EntityProvider>
                </div>
                {index !== entities.length - 1 && (
                  <div className="flex w-40 bg-gray-200 relative left-3 h-0.5 dark:bg-gray-400" ></div>
                )}
                <div className="mt-3 sm:pe-8">
                  <div className="absolute top-1 left-2.5 z-10 flex items-center justify-center border-gray-200 border-2 shadow-2xl w-4 h-4 bg-gray-400  rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 "></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HorizontalTimeline;
