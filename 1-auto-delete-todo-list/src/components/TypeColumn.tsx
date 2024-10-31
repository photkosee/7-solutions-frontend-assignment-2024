import { memo } from "react";

import { ItemType } from "../types";

type TypeColumnProps = {
  type: string;
  items: ItemType[];
  onItemDeselect: (item: ItemType) => void;
};

// Prevent re-rendering when other column types are changed but not this one
const TypeColumn = memo(({ type, items, onItemDeselect }: TypeColumnProps) => (
  <div className="border-2 border-gray-100 w-[250px] h-[650px]">
    <div className="bg-gray-100 p-1.5 text-lg font-semibold">
      <h3>{type}</h3>
    </div>

    <ul className="p-1.5">
      {items.map((item) => (
        <li key={item.name} className="py-1">
          <button onClick={() => onItemDeselect(item)} className="item-card">
            {item.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
));

export default TypeColumn;
