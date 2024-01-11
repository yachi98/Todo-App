import React from "react";

const SearchBar = ({
  inputRef,
  handleTask,
  handleInputFocus,
  handleInputBlur,
}) => {
  return (
    <input
      className="px-4 min-w-[30rem] my-5 rounded-2xl text-sm outline-none bg-black bg-opacity-50 backdrop-blur-10 text-blue-400"
      placeholder="Search"
      ref={inputRef}
      onChange={handleTask}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
    />
  );
};

export default SearchBar;
