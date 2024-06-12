import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";

import { Books } from "./books";
import { ReadingList } from "./reading-list";
import { SearchBar } from "./search-bar";
import { SearchResults } from "./search-results";
import { Book, useGetBooks } from "../hooks/useGetBooks";

export const Hero = () => {
  const { loading, error, data } = useGetBooks();
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [activeComponent, setActiveComponent] = useState<
    "Books" | "ReadingList" | "All"
  >("All");

  if (!data) {
    return null;
  }

  const handleSearch = (query: string) => {
    if (data && data.books) {
      const results = data.books.filter(
        (book: Book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center px-3">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl mb-6">Find Books:</h1>
        <div className="flex flex-col w-full gap-4 mb-6 mt-6 items-center justify-center">
          <h4 className="text-md">Pick a selection below:</h4>
          <div className="sm:flex-row flex-col gap-3 flex w-full items-center sm:justify-center">
            <Button
              onClick={() => {
                setActiveComponent("All");
                setIsDisplayed(false);
              }}
              variant={activeComponent === "All" ? "contained" : "outlined"}
              color="primary"
              className={`${activeComponent === "All" && "!text-white"}`}
            >
              All
            </Button>
            <Button
              onClick={() => {
                setActiveComponent("Books");
                setIsDisplayed(false);
              }}
              variant={activeComponent === "Books" ? "contained" : "outlined"}
              color="primary"
              className={`${activeComponent === "Books" && "!text-white"}`}
            >
              Books
            </Button>
            <Button
              onClick={() => {
                setActiveComponent("ReadingList");
                setIsDisplayed(false);
              }}
              variant={
                activeComponent === "ReadingList" ? "contained" : "outlined"
              }
              color="primary"
              className={`${
                activeComponent === "ReadingList" && "!text-white"
              }`}
            >
              Reading List
            </Button>
          </div>
        </div>
      </div>
      {activeComponent !== "ReadingList" && (
        <SearchBar
          onSearch={handleSearch}
          books={data.books}
          setIsDisplayed={setIsDisplayed}
        />
      )}
      {isDisplayed && <SearchResults books={searchResults} setActiveComponent={setActiveComponent}/>}
      <div>
        {!isDisplayed && (
          <>
            {activeComponent === "Books" && <Books />}
            {activeComponent === "ReadingList" && <ReadingList setActiveComponent={setActiveComponent} />}
            {activeComponent === "All" && (
              <>
                <ReadingList setActiveComponent={setActiveComponent} />
                <Books />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
