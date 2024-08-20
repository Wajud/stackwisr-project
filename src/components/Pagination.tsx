import React from "react";

const Pagination = () => {
  return (
    <div className="flex gap-4 w-fit mx-auto">
      <button className="w-24 text-center py-2 font-semibold border-none outline-none bg-white rounded-md">
        Previous
      </button>
      <button className="w-24 text-center py-2 font-semibold border-none outline-none bg-white rounded-md">
        Next
      </button>
    </div>
  );
};

export default Pagination;
