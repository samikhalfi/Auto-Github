import { FC, useRef, useState } from 'react';
import { ICards } from './Layouts.config';
import cn from 'classnames';

interface ILayoutFilterProps {
  cards: ICards[];
  selectedCards?: ICards[];
  onFilter?: (filteredData: ICards[]) => void;
}

const LayoutFilter: FC<ILayoutFilterProps> = ({
  cards,
  selectedCards = [],
  onFilter = () => {},
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const inputRefs: { [key: string]: React.RefObject<HTMLInputElement> } = {};

  cards.forEach((item) => {
    //used to set the checkbox with refs equal to the item.i value
    inputRefs[item.i] = useRef<HTMLInputElement>(null);
  });

  const toggleCheckbox = (value: string) => {
    const selectedItems = selectedCards.map((item) => item.i);
    const updatedSelection = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];

    const filteredData = cards.filter((item) => updatedSelection.includes(item.i));
    onFilter(filteredData);
  };
  //used to manage the checkbox visibility
  const handleClick = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className={cn('filter-box', 'p-2 flex flex-col items-end relative')}>
      <div
        className={cn(
          'filter-select-multi',
          'p-2 h-fit w-36 border-2 border-gray-300 cursor-pointer rounded-md',
        )}
      >
        <div className={cn('filter-text', 'text-gray-500')} onClick={handleClick}>
          Filter by cards:
        </div>
      </div>
      {cards.length > 0 && (
        <div
          className={cn(
            'filter-check',
            'absolute top-14 z-10 bg-white flex flex-col p-2 h-fit w-36 border-2 border-gray-300 rounded-md',
            { hidden: !isVisible },
          )}
          onMouseLeave={() => handleMouseLeave()}
        >
          <div className="relative">
            {cards.map((item) => (
              <div key={item.i} className={cn('filter-select-item', 'flex p-2 justify-between')}>
                <label>{item.i}</label>
                <input
                  className={cn('filter-select-checkbox', 'cursor-pointer')}
                  ref={inputRefs[item.i]}
                  type="checkbox"
                  checked={!!selectedCards.find((elemnt) => elemnt.i === item.i)}
                  onChange={() => toggleCheckbox(item.i)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutFilter;
