import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { allLists } from '../model/Lists';
import { Button } from './Button';

function getClassName(listName: string, selected: string[]): string {
  if (selected.includes(listName)) {
    return "selected";
  } else {
    return "unselected";
  }
}

function ListPicker({ selected, setSelected }) {
  const navigate = useNavigate();

  const toggle = (listName: string) => {
    if (selected.includes(listName)) {
      setSelected(selected.filter(item => item !== listName));
    } else {
      setSelected([listName, ...selected]);
    }
  }

  const done = () => {
    navigate("/check");
  }

  return (
    <>
      <div className='scrollable'>
        <ul className="lists">
          { allLists.map((listName: string) => (
            <li className={ getClassName(listName, selected) }
              key={listName}
              onClick={() => { toggle(listName); }}>
              {listName}
            </li>
          )) }
        </ul>
      </div>
      <div className="center-content">
        <Button
          label="Done"
          action={done} />
      </div>
    </>
  );
}

export default ListPicker;