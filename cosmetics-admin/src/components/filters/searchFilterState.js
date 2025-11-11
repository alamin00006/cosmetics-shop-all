import { useEffect, useState } from "react";

export const useSearchFilterState = (initialValue = "") => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);
  const [tags, setTags] = useState(initialValue ? initialValue.split(",") : []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    tags,
    setTags,
  };
};
