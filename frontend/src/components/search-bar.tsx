import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

import { Book } from "../hooks/useGetBooks";

interface SearchBarProps {
  onSearch: (query: string) => void;
  books: Book[];
  setIsDisplayed: Dispatch<SetStateAction<boolean>>;
}

const MAX_RECENT_SEARCHES = 5;
const LOCAL_STORAGE_KEY = "recentSearches";

export const SearchBar = ({
  onSearch,
  books,
  setIsDisplayed,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const searchResults = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBooks(searchResults);
    } else {
      setFilteredBooks([]);
    }
  }, [searchQuery, books]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    setIsDisplayed(true);
    setIsFocused(false);
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      const updatedSearches = [
        searchQuery,
        ...recentSearches.filter((search) => search !== searchQuery),
      ];
      if (updatedSearches.length > MAX_RECENT_SEARCHES) {
        updatedSearches.pop();
      }
      setRecentSearches(updatedSearches);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSearches));
      onSearch(searchQuery);
    }
  };

  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query);
    setIsFocused(false);
    onSearch(query);
    setIsDisplayed(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClearSearch = () => {
    setIsFocused(false);
    setSearchQuery("");
    setFilteredBooks([]);
    setIsDisplayed(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFocused) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, filteredBooks.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        const selectedBook = filteredBooks[selectedIndex];
        if (selectedBook) {
          handleRecentSearchClick(selectedBook.title);
        }
      }
    }
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      <form
        onSubmit={handleSearch}
        className="flex items-center dark:text-black gap-4 justify-center sm:flex-row flex-col w-full relative"
      >
        <TextField
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#757575",
              fontFamily: "Arial",
              fontWeight: "bold",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#757575",
                borderWidth: "1px",
              },
              "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "secondary.main",
                  borderWidth: "2px",
                },
              },
              "&:hover:not(.Mui-focused)": {
                " .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#4AA088",
                  borderWidth: "1px",
                },
              },
            },
          }}
          placeholder="Search..."
          className="w-full dark:!outline-[#CFFAFA]"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchQuery && (
                  <IconButton onClick={handleClearSearch} color="primary">
                    <Clear />
                  </IconButton>
                )}
                <IconButton type="submit" disabled={searchQuery.length < 1}>
                  <Search color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
      {isFocused && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#172830] border border-gray-300 dark:border-white mt-1 rounded-md shadow-lg z-10">
          <ul className="list-none p-2 max-h-[400px] overflow-y-scroll shadow-lg">
            {searchQuery === "" ? (
              recentSearches.map((search, index) => (
                <li
                  key={index}
                  className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md ${
                    selectedIndex === index && "bg-gray-200 dark:bg-gray-600"
                  }`}
                  onClick={() => handleRecentSearchClick(search)}
                >
                  {search}
                </li>
              ))
            ) : filteredBooks.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400 p-2">
                No results found
              </li>
            ) : (
              filteredBooks.map((book, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-md ${
                    selectedIndex === index && "bg-gray-200 dark:bg-gray-600"
                  }`}
                  onClick={() => handleRecentSearchClick(book.title)}
                >
                  <img
                    src={require(`../${book.coverPhotoURL}`)}
                    alt={book.title}
                    className="max-w-[50px] max-h-[50px] object-cover"
                  />
                  <div>
                    <h2 className="font-semibold">{book.title}</h2>
                    <h2>
                      By:{" "}
                      <span className="dark:text-[#CFFAFA] text-[#4AA088]">
                        {book.author}
                      </span>
                    </h2>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
