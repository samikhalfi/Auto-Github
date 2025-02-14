import { FC } from 'react';
import cn from 'classnames';
import {
  IteratorProvider,
  selectResolver,
  useEnhancedEditor,
  useEnhancedNode,
} from '@ws-ui/webform-editor';
import { Element } from '@ws-ui/craftjs-core';
import { BsFillInfoCircleFill } from 'react-icons/bs';
import { ITimelineProps } from './Timeline.config';

const Timeline: FC<ITimelineProps> = ({
  datasource,
  orientation,
  variant,
  style,
  className,
  classNames = [],
}) => {
  const { resolver } = useEnhancedEditor(selectResolver);
  const {
    //linkedNodes,
    connectors: { connect },
  } = useEnhancedNode((node) => {
    return { linkedNodes: node.data.linkedNodes };
  });

  return (
    <>
      <div ref={connect} style={style} className={cn(className, classNames)}>
        {datasource ? (
          <div>
            {(variant === 'value1' || variant === '') && orientation === 'Vertical' ? (
              <div className="flex items-center mb-8 relative">
                <div className="w-3 h-3 bg-gray-400 rounded-full "></div>
                <div className="h-8 w-0.5 bg-gray-400 absolute top-5  ml-0.5 left-0.5"></div>
                <div className="text-gray-700 px-2 py-1 rounded-md text-sm">
                  <IteratorProvider>
                    <Element
                      id="item"
                      className="h-full w-full"
                      role="item"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </IteratorProvider>
                </div>
              </div>
            ) : (
              variant === 'value1' &&
              orientation === 'Horizontal' && (
                <div className="relative flex items-end top-12">
                  <div className="absolute text-sm mb-2 ml-3">
                    <IteratorProvider>
                      <Element
                        id="item"
                        className="h-full w-full"
                        role="item"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </IteratorProvider>
                  </div>
                  <div className="flex w-40 bg-gray-200 relative left-3 h-0.5 dark:bg-gray-400"></div>
                  <div className="mt-3 sm:pe-8">
                    <div className="absolute top-1 left-1.5 z-10 flex items-center border-gray-200  border-2 shadow-2xl justify-center w-4 h-4 bg-gray-400  rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 "></div>
                  </div>
                </div>
              )
            )}

            {variant == 'value2' && orientation == 'Vertical' && (
              <div className="flex flex-col items-start">
                <div className="flex items-center mb-8 relative">
                  <div className=" text-gray-700 px-2 py-1 rounded-md text-sm">
                    <IteratorProvider>
                      <Element
                        id="item1"
                        className="h-full w-full"
                        role="item1"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </IteratorProvider>
                  </div>
                  <div className="flex-grow flex justify-center">
                    <div className=" w-3 h-3 bg-gray-400 rounded-full flex items-center justify-center mb-2"></div>
                    <div className="h-8 w-0.5 bg-gray-400 absolute top-5  "></div>
                  </div>
                  <div className=" text-gray-700 px-2 py-1 rounded-md text-sm">
                    <IteratorProvider>
                      <Element
                        id="item2"
                        className="h-full w-full"
                        role="item2"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </IteratorProvider>
                  </div>
                </div>
              </div>
            )}
            {variant == 'value2' && orientation == 'Horizontal' && (
              <div className="relative flex items-end top-12">
                <div className="absolute text-sm mb-2 ml-3">
                  <IteratorProvider>
                    <Element
                      id="item1"
                      className="h-full w-full"
                      role="item1"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </IteratorProvider>
                </div>
                <div className="absolute text-sm top-4 ml-3">
                  <IteratorProvider>
                    <Element
                      id="item2"
                      className="h-full w-full"
                      role="item2"
                      is={resolver.StyleBox}
                      deletable={false}
                      canvas
                    />
                  </IteratorProvider>
                </div>
                <div className="flex w-40 bg-gray-200 relative left-3 h-0.5 dark:bg-gray-400"></div>
                <div className="mt-3 sm:pe-8">
                  <div className="absolute top-1 left-2.5 z-10 flex items-center justify-center border-gray-200 border-2 shadow-2xl w-4 h-4 bg-gray-400  rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 "></div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
            <BsFillInfoCircleFill className="mb-1 h-8 w-8" />
            <p>Please attach a datasource</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Timeline;
