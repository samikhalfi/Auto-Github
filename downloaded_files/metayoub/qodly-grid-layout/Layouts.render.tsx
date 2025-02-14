import { useRenderer, useSources, useEnhancedNode } from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useEffect, useRef, useState, useMemo } from 'react';
import { useEnhancedEditor, selectResolver } from '@ws-ui/webform-editor';
import { ICards, ILayoutsProps } from './Layouts.config';
import { WidthProvider, Responsive } from 'react-grid-layout';
import LayoutElement from './LayoutElement';
import LayoutFilter from './LayoutFilter';

const Layouts: FC<ILayoutsProps> = ({
  filterMode,
  saveInStorage,
  cards = [],
  marginX,
  marginY,
  rowHeight = 30,
  preventCollision = true,
  style,
  className,
  classNames = [],
}) => {
  const { connect } = useRenderer();
  const { id } = useEnhancedNode();
  const gridLayoutRef = useRef(null);
  const [value, setValue] = useState(cards.map((card) => ({ ...card, i: card.title })));
  const [layoutData, setLayoutData] = useState<ICards[]>([]);
  const [isDragDone, setIsDragDone] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const {
    sources: { datasource: ds },
  } = useSources();

  const { resolver } = useEnhancedEditor(selectResolver);

  const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

  useEffect(() => {
    if (!ds) return;
    const listener = async (/* event */) => {
      if (!ds) return;
      // If we have a datasource, then local Storage should be disabled
      const updatedCards = (await ds.getValue()) || [];
      const updatedLayout = value.map((oldCard) => {
        const matchingNewCard = updatedCards.find((newCard: any) => newCard.i === oldCard.i);
        return matchingNewCard ? { ...oldCard, ...matchingNewCard } : oldCard;
      });

      const filteredValue =
        updatedCards.length > 0
          ? value
              .filter((item) => updatedCards.some((newCard: any) => newCard.i === item.i))
              .map((oldCard) => {
                const matchingNewCard = updatedCards.find(
                  (newCard: any) => newCard.i === oldCard.i,
                );
                return matchingNewCard ? { ...oldCard, ...matchingNewCard } : oldCard;
              })
          : updatedLayout;
      setValue(updatedLayout);
      setLayoutData(filteredValue);
    };

    listener();

    ds.addListener('changed', listener);

    return () => {
      ds.removeListener('changed', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ds]);

  useEffect(() => {
    const storedLayout = localStorage.getItem(`updatedCards_${id}`);
    if (!ds && saveInStorage && storedLayout) {
      const parsedLayout = JSON.parse(storedLayout);
      if (parsedLayout.length > 0) {
        const filteredValue = value
          .filter((item) => parsedLayout.some((newCard: any) => newCard.i === item.i))
          .map((oldCard) => {
            const matchingNewCard = parsedLayout.find((newCard: any) => newCard.i === oldCard.i);
            return matchingNewCard ? { ...oldCard, ...matchingNewCard } : oldCard;
          });
        const updatedLayout = value.map((oldCard) => {
          const matchingNewCard = parsedLayout.find((newCard: any) => newCard.i === oldCard.i);
          return matchingNewCard ? { ...oldCard, ...matchingNewCard } : oldCard;
        });
        setValue(updatedLayout);
        setLayoutData(filteredValue);
      }
    }

    return () => {
      gridLayoutRef.current = null;
    };
  }, []);

  useEffect(() => {
    // not filtred & not saved anywhere
    if ((!ds && !saveInStorage) || !filterMode) {
      setLayoutData(value);
    }
  }, []);

  const onLayoutChange = (newLayout: any) => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    if (saveInStorage && filterMode && !ds && isDragDone) {
      localStorage.setItem(`updatedCards_${id}`, JSON.stringify(newLayout));
    }
    if (ds && !isFirstLoad) {
      ds.setValue(null, newLayout);
    }
  };

  const filteringCards = (fitleredData: any) => {
    //used in to filter
    if (saveInStorage && filterMode && !ds) {
      localStorage.setItem(`updatedCards_${id}`, JSON.stringify(fitleredData));
    }
    setLayoutData(fitleredData);
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {filterMode && (
        <LayoutFilter cards={value} selectedCards={layoutData} onFilter={filteringCards} />
      )}
      <ResponsiveReactGridLayout
        ref={gridLayoutRef}
        className="layout"
        margin={[marginX, marginY]}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        preventCollision={preventCollision}
        onDragStop={() => {
          setIsDragDone(true);
        }}
        draggableCancel="[class^='fd-']:not(.fd-stylebox)"
      >
        {layoutData.map((card) => (
          <div
            key={card.title}
            data-grid={{
              ...card,
              isDraggable: !card.static || card.isDraggable,
              isResizable: !card.static || card.isResizable,
            }}
          >
            <LayoutElement resolver={resolver} id={card.id} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default Layouts;
