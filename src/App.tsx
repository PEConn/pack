import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { produce } from "immer";
import './App.css';

import ControlPanel from "./components/ControlPanel";
import ItemList from './components/ItemList';

import { mergeLists, defaultSelection } from "./model/Lists";
import { ItemState, Item } from "./model/Item";
import ListPicker from './components/ListPicker';

const TWO_DAYS_MS = 1000 * 60 * 60 * 24 * 2;

function updateItem(items: Item[], index: number, state: ItemState): Item[] {
  return produce(items, draftState => {
    // Allow undoing an item press.
    let newState = state;
    if (items[index].state === state) {
      newState = ItemState.ToDo;
    }

    draftState[index] = new Item(items[index].name, newState);
  })
}

function App() {
  const [lists, setListsInner] = useState(defaultSelection);
  const [items, setItemsInner] = useState(mergeLists(defaultSelection));

  const [hasLoadedData, setHasLoadedData] = useState(false);

  const storage = window.localStorage;

  const save = (key: string, value: string) => {
    if (!hasLoadedData) {
      console.log("Attempting to save data before loading previous data.");
      return;
    }

    storage.setItem("lastUpdate", JSON.stringify(new Date().getTime()))
    storage.setItem(key, value);
    console.log("Saving " + key);
  }

  // Read the saved state.
  useEffect(() => {
    setHasLoadedData(true);

    const savedLists = storage.getItem("lists");
    const savedItems = storage.getItem("items");
    const lastUpdate = storage.getItem("lastUpdate");

    if (!savedLists || !savedItems || !lastUpdate) {
      console.log("No saved data.");
      return;
    }

    try {
      const parsedLastUpdate = Number(lastUpdate);

      const now = new Date().getTime();
      if (now - parsedLastUpdate > TWO_DAYS_MS) {
        console.log("Stale saved data.");
        // Don't bother loading data more than 2 days old.
        return;
      }

      setListsInner(JSON.parse(savedLists));
      setItemsInner(JSON.parse(savedItems));

      console.log("Reloaded");
    } catch (e) {
      console.log(e);
    }
  }, []);

  const setLists = (lists) => {
    const items = mergeLists(lists);

    setListsInner(lists);
    setItemsInner(items);

    save("lists", JSON.stringify(lists));
    save("items", JSON.stringify(items));
  }

  const setItems = (items) => {
    setItemsInner(items);
    save("items", JSON.stringify(items));
  }

  const base = import.meta.env.BASE_URL;

  return (
    <>
      <Router basename={base}>
        <Routes>
          <Route path="/"
            element={
              <ListPicker selected={lists} setSelected={setLists} />
            } />

          <Route path="/check"
            element={
              <CheckList selected={lists} items={items} setItems={setItems}/>
          } />
        </Routes>
      </Router>
    </>
  );
}

function CheckList({ selected, items, setItems }) {
  const [index, setIndex] = useState(0);
  const [hidePacked, setHidePacked] = useState(false);
  const [hideDontNeed, setHideDontNeed] = useState(false);

  const nextItem = () => {
    for (let i = 1; i < items.length; i++) {
      const item = (index + i) % items.length;
      if (items[item].state === ItemState.ToDo) {
        setIndex(item);
        break;
      }
    }
  }
  const prevItem = () => {
    for (let i = 1; i < items.length; i++) {
      const item = (index - i + items.length) % items.length;
      if (items[item].state === ItemState.ToDo) {
        setIndex(item);
        break;
      }
    }
  }
  const markPacked = () => {
    setItems(updateItem(items, index, ItemState.Packed));

    nextItem();
  }
  const markUnneeded = () => {
    setItems(updateItem(items, index, ItemState.Unneeded));

    nextItem();
  }

  const togglePacked = () => { setHidePacked(!hidePacked); }
  const toggleDontNeed = () => { setHideDontNeed(!hideDontNeed); }

  return (
    <>
      <ItemList
        items={items}
        currentIndex={index}
        setIndex={setIndex}
        hidePacked={hidePacked}
        hideDontNeed={hideDontNeed}
        />
      <ControlPanel
        currentName={items[index].name}
        next={nextItem}
        prev={prevItem}
        markPacked={markPacked}
        markUnneeded={markUnneeded}
        togglePacked={togglePacked}
        toggleDontNeed={toggleDontNeed}
        />
    </>
  );
}

export default App;
