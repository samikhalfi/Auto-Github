import { useEnhancedNode, useEnhancedEditor, selectResolver } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import LayoutElement from './LayoutElement';
import { ILayoutsProps } from './Layouts.config';
import LayoutFilter from './LayoutFilter';

const Layouts: FC<ILayoutsProps> = ({
  filterMode,
  cards = [],
  marginX = 10,
  marginY = 10,
  rowHeight = 30,
  style,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode();
  const { resolver } = useEnhancedEditor(selectResolver);
  const [numCols, setNumCols] = useState(12);
  const [gridWidth, setGridWidth] = useState(1200);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setNumCols(12);
        setGridWidth(1200);
      } else {
        setNumCols(10);
        setGridWidth(996);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {filterMode && <LayoutFilter cards={[]} />}
      <GridLayout
        className="layout"
        margin={[marginX, marginY]}
        layout={cards}
        cols={numCols}
        rowHeight={rowHeight}
        width={gridWidth}
      >
        {cards.map((card) => (
          <div key={card.id} data-grid={{ ...card, isDraggable: false, isResizable: false }}>
            <LayoutElement resolver={resolver} id={card.id} />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Layouts;
