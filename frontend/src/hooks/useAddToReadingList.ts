import { useReactiveVar } from "@apollo/client";

import { Book } from "./useGetBooks";
import { readingListVar } from "../config/cache";

export const useAddToReadingList = () => {
  const readingList = useReactiveVar(readingListVar);

  const addToReadingList = (book: Book) => {
    if (!readingList.some((b) => b.uniqueKey === book.uniqueKey)) {
      readingListVar([...readingList, book]);
    }
  };

  return { addToReadingList };
};
