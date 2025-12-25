import React, { useEffect, useState } from "react";

function useDebounce(searchInput, delay) {
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  });
  return {
    debouncedSearchInput,
  }
}

export default useDebounce;
