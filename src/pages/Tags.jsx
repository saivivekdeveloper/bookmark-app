import React, { useContext } from "react";
import { ApplicationContext } from "../components/context";

function Tags({ tagName, tagCount }) {
  const {
    handleCheckbox,
    state: { tagsChecked },
  } = useContext(ApplicationContext);

  return (
    <div className="flex w-full justify-between items-center mb-2">
      <div className="flex gap-2 items-center ">
        <input
          type="checkbox"
          name={tagName}
          onChange={handleCheckbox}
          checked={tagsChecked[tagName] || false}
          className="w-4 h-4 cursor-pointer accent-teal-700 text-white rounded-lg transition-all duration-600"
        />
        <label className="text-sm  font-medium  text-neutral-800">
          {tagName}
        </label>
      </div>

      <div className="py-0.5 px-2 bg-[#e8f0ef] rounded-full border border-neutral-0 text-xs font-medium text-neutral-800">
        <span>{tagCount[tagName]}</span>
      </div>
    </div>
  );
}

export default Tags;
