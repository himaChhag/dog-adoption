import React from "react";

import { PaginationProps } from "../types";

const Pagination: React.FC<PaginationProps> = ({ onNext, onPrev, allowPrev, allowNext }) => {
  return (
    <div className="pagination">
      {allowPrev && (
        <button onClick={onPrev} aria-label="Previous page">
          Previous
        </button>
      )}
      {allowNext && (
        <button onClick={onNext} aria-label="Next page">
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;