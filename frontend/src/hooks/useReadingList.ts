import { useReactiveVar } from "@apollo/client";

import { readingListVar } from "../config/cache";

export const useReadingList = () => {
  const readingList = useReactiveVar(readingListVar);
  return { readingList };
};
