import { useState, useMemo, useCallback } from "react";

import { useGetBooks, Book } from "../hooks/useGetBooks";
import { BookCard } from "./book-card";
import { BookFilter } from "./book-filter";

export const Books = () => {
  const { loading, error, data } = useGetBooks();
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [readingLevelFilter, setReadingLevelFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const books = useMemo(() => data?.books ?? [], [data]);

  const filteredBooks = useMemo(
    () =>
      books.filter((book: Book) => {
        return (
          (authorFilter === "" || book.author === authorFilter) &&
          (readingLevelFilter === "" ||
            book.readingLevel === readingLevelFilter)
        );
      }),
    [books, authorFilter, readingLevelFilter]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredBooks.length / itemsPerPage),
    [filteredBooks.length, itemsPerPage]
  );

  const uniqueAuthors: string[] = useMemo(
    () => Array.from(new Set(books.map((book: Book) => book.author))),
    [books]
  );

  const uniqueReadingLevels: string[] = useMemo(
    () => Array.from(new Set(books.map((book: Book) => book.readingLevel))),
    [books]
  );

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-3xl text-center sm:my-7 my-4 font-bold">
        All Books:
      </h2>
      <BookFilter
        authors={uniqueAuthors}
        readingLevels={uniqueReadingLevels}
        authorFilter={authorFilter}
        setAuthorFilter={setAuthorFilter}
        readingLevelFilter={readingLevelFilter}
        setReadingLevelFilter={setReadingLevelFilter}
      />
      <ul className="flex flex-wrap justify-center gap-5">
        {paginatedBooks.map((book: Book) => (
          <li
            key={`${book.title}+${book.readingLevel}`}
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
      <div className="flex xs:flex-row flex-col xs:gap-0 gap-3 justify-center mt-10 items-center">
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
    </div>
  );
};
