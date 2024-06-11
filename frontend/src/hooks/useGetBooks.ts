import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

export interface Book {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
  uniqueKey: string;
}

export const useGetBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return { loading: true };
  if (error) return { error: `Error ${error.message}` };

  const books = data.books.map((book: Omit<Book, "uniqueKey">) => ({
    ...book,
    uniqueKey: `${book.title}-${book.readingLevel}`,
  }));

  return { data: { books } };
};
