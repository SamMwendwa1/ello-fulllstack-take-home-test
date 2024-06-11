import { useReactiveVar } from "@apollo/client";

import { readingListVar } from "../config/cache";

export const useRemoveFromReadingList = () => {
  const readingList = useReactiveVar(readingListVar);

  const removeFromReadingList = (uniqueKey: string) => {
    readingListVar(readingList.filter((book) => book.uniqueKey !== uniqueKey));
  };

  return { removeFromReadingList };
};
