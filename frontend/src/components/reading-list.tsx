import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Button } from "@mui/material";

import { useReadingList } from "../hooks/useReadingList";
import { BookCard } from "./book-card";

interface ReadingListProps {
  setActiveComponent: Dispatch<SetStateAction<"Books" | "ReadingList" | "All">>;
}

export const ReadingList = ({ setActiveComponent }: ReadingListProps) => {
  const { readingList } = useReadingList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = useMemo(
    () => Math.ceil(readingList.length / itemsPerPage),
    [readingList.length, itemsPerPage]
  );

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = readingList.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-3xl text-center my-7 font-bold">Reading List:</h2>
      {readingList.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="sm:text-2xl text-xl text-center mb-10">(Add Books to View)</p>

          <Button
            onClick={() => {
              setActiveComponent("All");
            }}
            color="secondary"
            variant="outlined"
            className="!text-lg !font-bold"
          >
            ADD NOW
          </Button>
        </div>
      )}
      <ul className="flex flex-wrap justify-center sm:gap-5 gap-3 sm:px-4">
        {paginatedBooks.map((book) => (
          <li
            key={book.uniqueKey}
            className="xl:w-[22%] md:w-[30%] sm:w-[45%] xxs:w-[45%] w-[80%] items-stretch flex"
          >
            <BookCard
              title={book.title}
              author={book.author}
              readingLevel={book.readingLevel}
              coverPhotoURL={book.coverPhotoURL}
              uniqueKey={book.uniqueKey}
            />
          </li>
        ))}
      </ul>
      {readingList.length > 4 && (
        <div className="flex xs:flex-row flex-col justify-center mt-10 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="mx-2 px-4 py-2 bg-[#53C2C2] text-white hover:bg-[#5ACCCC] dark:bg-[#335C6E] dark:hover:bg-[#4AA088] rounded-md"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="mx-2 px-4 py-2 bg-[#53C2C2] text-white hover:bg-[#5ACCCC] dark:bg-[#335C6E] dark:hover:bg-[#4AA088] rounded-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
