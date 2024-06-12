import { Dispatch, SetStateAction } from "react";
import { Button } from "@mui/material";

import { Book } from "../hooks/useGetBooks";
import { BookCard } from "./book-card";
import { ReadingList } from "./reading-list";


interface SearchResultsProps {
  books: Book[];
  setActiveComponent: Dispatch<SetStateAction<"Books" | "ReadingList" | "All">>;
}

export const SearchResults = ({ books, setActiveComponent }: SearchResultsProps) => {
  if (books.length === 0)
    return (
      <div className="flex items-center justify-center mt-20">
        No record found
      </div>
    );

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-3xl text-center my-7">Search Results:</h2>
      <Button href="/" variant="outlined">
        Go Back
      </Button>
      <ul className="flex flex-wrap justify-center gap-5 mb-7">
        {books.map((book: Book) => (
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
      <ReadingList setActiveComponent={setActiveComponent} />
    </div>
  );
};
