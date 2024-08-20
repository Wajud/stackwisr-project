import React from "react";

const Search = () => {
  return (
    <form>
      <input
        type="text"
        placeholder="Search name or email..."
        className="block w-full mx-auto py-2 px-2 rounded-md border border-gray-50 outline-none focus:outline-none"
      />
    </form>
  );
};

export default Search;
