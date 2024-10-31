import { useCallback, useRef, useState } from "react";

import { ItemType } from "../types";
import itemList, { getAllTypes } from "../data/itemList";
import TypeColumn from "./TypeColumn";

const Solution = () => {
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const [mainList, setMainList] = useState<ItemType[]>(itemList);
  const [typeColumns, setTypeColumns] = useState<{ [key: string]: ItemType[] }>(
    getAllTypes().reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as { [key: string]: ItemType[] })
  );

  // Move item to its type column
  const handleSelectItem = useCallback((item: ItemType) => {
    setMainList((prev) => prev.filter((todo) => todo.name !== item.name));
    setTypeColumns((prev) => ({
      ...prev,
      [item.type]: [...(prev[item.type] || []), item],
    }));

    // Set timer to move the item back after 5 seconds
    const timerId = setTimeout(() => {
      setTypeColumns((prev) => ({
        ...prev,
        [item.type]: prev[item.type].filter((todo) => todo.name !== item.name),
      }));
      setMainList((prev) => [...prev, item]);
      timers.current.delete(item.name);
    }, 5000);

    timers.current.set(item.name, timerId);
  }, []);

  // Move item back to main list immediatly
  // Using useCallback because this function will be passed as a prop to TypeColumn which use memo
  // and we don't want to re-create the function on every render which will trigger memo
  const handleDeselectItem = useCallback((item: ItemType) => {
    // Remove time out registered for the item
    clearTimeout(timers.current.get(item.name));
    timers.current.delete(item.name);

    // Remove item from its type column and add it to main list
    setTypeColumns((prev) => ({
      ...prev,
      [item.type]: prev[item.type].filter((todo) => todo.name !== item.name),
    }));
    setMainList((prev) => [...prev, item]);
  }, []);

  return (
    <div className="flex gap-x-7 gap-y-5 flex-wrap justify-center">
      <div className="w-[250px]">
        <ul>
          {mainList.map((item) => (
            <li key={item.name} className="py-1">
              <button
                className="item-card"
                onClick={() => handleSelectItem(item)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {Object.keys(typeColumns).map((type) => (
          <TypeColumn
            key={type}
            type={type}
            items={typeColumns[type]}
            onItemDeselect={handleDeselectItem}
          />
        ))}
      </div>
    </div>
  );
};

export default Solution;
