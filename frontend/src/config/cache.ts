import { makeVar } from "@apollo/client";

import { Book } from "../hooks/useGetBooks";

export const readingListVar = makeVar<Book[]>([]);