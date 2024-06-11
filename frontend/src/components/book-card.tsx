import React from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

import { Book } from "../hooks/useGetBooks";
import { useAddToReadingList } from "../hooks/useAddToReadingList";
import { useRemoveFromReadingList } from "../hooks/useRemoveFromReadingList";
import { useReadingList } from "../hooks/useReadingList";

export const BookCard: React.FC<Book> = (book) => {
  const { addToReadingList } = useAddToReadingList();
  const { removeFromReadingList } = useRemoveFromReadingList();
  const { readingList } = useReadingList();

  const isInReadingList = readingList.some(
    (b) => b.uniqueKey === book.uniqueKey
  );

  const handleAddClick = () => {
    toast.success("Successfully added to Reading List!");
    addToReadingList(book);
  };

  const handleRemoveClick = () => {
    toast.success("Successfully removed from Reading List!");
    removeFromReadingList(book.uniqueKey);
  };

  return (
    <div className="flex flex-col shadow-xl dark:shadow-md bg-[#FFE6DC]/60 dark:bg-[#335C6E]/40 p-4 justify-between">
      <img src={require(`../${book.coverPhotoURL}`)} alt={book.title} />
      <div className="p-2 flex flex-col mt-4 gap-2 mb-3">
        <h1 className="font-semibold">
          <span className="capitalize text-gray-700 dark:text-[#CFFAFA] font-normal">
            Title:{" "}
          </span>{" "}
          {book.title}
        </h1>
        <h1 className="font-semibold">
          <span className="capitalize text-gray-700 dark:text-[#CFFAFA] font-normal">
            Author:{" "}
          </span>{" "}
          {book.author}
        </h1>
        <h1 className="font-semibold">
          <span className="capitalize text-gray-700 dark:text-[#CFFAFA] font-normal">
            Reading Level:{" "}
          </span>{" "}
          {book.readingLevel}
        </h1>
      </div>

      {isInReadingList ? (
        <Button
          className="!bg-[#F76434] hover:!bg-red-600 dark:!bg-red-700 dark:hover:!bg-red-800 !text-white"
          onClick={handleRemoveClick}
        >
          Remove from List
        </Button>
      ) : (
        <Button
          className="!bg-[#53C2C2] hover:!bg-[#5ACCCC] dark:!bg-[#335C6E] dark:hover:!bg-[#4AA088] !text-white"
          onClick={handleAddClick}
        >
          Add to List
        </Button>
      )}
    </div>
  );
};
