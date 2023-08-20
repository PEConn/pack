import React, { MutableRefObject } from 'react';
import { Item, ItemState } from '../model/Item';

type ItemProps = {
  item: Item,
  selected: boolean,
  onClick: () => void,
  innerRef: MutableRefObject<any>
}

function ItemDisplay({ item, selected, onClick, innerRef }: ItemProps) {
  let style = "";

  if (selected) {
    style = "currently-focused";
  }

  if (item.state === ItemState.Packed) {
    style += " packed";
  } else if (item.state === ItemState.Unneeded) {
    style += " dont-need";
  } else if (item.state === ItemState.ToDo) {
    style += " undecided";
  }

  return (
    <li onClick={onClick} className={style} ref={innerRef}>
      {item.name}
    </li>
  );
}

export default ItemDisplay;