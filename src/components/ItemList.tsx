import React, { useEffect, useRef } from 'react';
import ItemDisplay from './ItemDisplay';
import { Item, ItemState } from '../model/Item';

type ItemListProps = {
  items: Item[],
  currentIndex: number,
  setIndex: (index: number) => void,
  hidePacked: boolean,
  hideDontNeed: boolean
}

function ItemList({ items, currentIndex, setIndex, hidePacked, hideDontNeed } : ItemListProps) {
  const currentElement = useRef(null);
  useEffect(() => {
    currentElement.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, [currentIndex]);

  return (
    <div className="scrollable">
      <ul className="lists">
        { items
            .filter((item) => {
              if (item.state === ItemState.ToDo) return true;
              if (item.state === ItemState.Packed) return !hidePacked;
              if (item.state === ItemState.Unneeded) return !hideDontNeed;
              return true;
            })
            .map((item, index) => (
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