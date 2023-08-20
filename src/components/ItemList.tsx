import React, { useEffect, useRef } from 'react';
import ItemDisplay from './ItemDisplay';
import { Item } from '../model/Item';

type ItemListProps = {
  items: Item[],
  currentIndex: number,
  setIndex: (index: number) => void,
}

function ItemList({ items, currentIndex, setIndex } : ItemListProps) {
  const currentElement = useRef(null);
  useEffect(() => {
    currentElement.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, [currentIndex])

  return (
    <div className="scrollable">
      <ul className="lists">
        { items.map((item, index) => (
          <ItemDisplay
            key={item.name}
            item={item}
            selected={item === items[currentIndex]}
            onClick={() => {setIndex(index)}}
            innerRef={item === items[currentIndex] ? currentElement : null}
            />
        ))}
      </ul>
    </div>
  );
}

export default ItemList;