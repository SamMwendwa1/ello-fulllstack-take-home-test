import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";

interface BookFilterProps {
  authors: string[];
  readingLevels: string[];
  authorFilter: string;
  setAuthorFilter: (author: string) => void;
  readingLevelFilter: string;
  setReadingLevelFilter: (level: string) => void;
}

export const BookFilter = ({
  authors,
  readingLevels,
  authorFilter,
  setAuthorFilter,
  readingLevelFilter,
  setReadingLevelFilter,
}: BookFilterProps) => {
  const theme = useTheme();

  return (
    <div className="flex justify-center gap-5 mb-5 items-center sm:flex-row flex-col">
      <h2>Sort By:</h2>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel
          sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}
        >
          Authors
        </InputLabel>
        <Select
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value as string)}
          label="All Authors"
          sx={{
            color: theme.palette.mode === "dark" ? "white" : "inherit",
            "& .MuiSvgIcon-root": {
              color: theme.palette.mode === "dark" ? "white" : "inherit",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === "dark" ? "white" : "inherit",
              color: theme.palette.mode === "dark" ? "white" : "inherit",
            },
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4AA088",
              },
            },
          }}
        >
          <MenuItem value="">
            <em>All Authors</em>
          </MenuItem>
          {authors.map((author) => (
            <MenuItem key={author} value={author}>
              {author}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 200 }}>
        <InputLabel
          sx={{ color: theme.palette.mode === "dark" ? "white" : "inherit" }}
        >
          Reading Levels
        </InputLabel>
        <Select
          value={readingLevelFilter}
          onChange={(e) => setReadingLevelFilter(e.target.value as string)}
          label="All Reading Levels"
          sx={{
            color: theme.palette.mode === "dark" ? "white" : "inherit",
            "& .MuiSvgIcon-root": {
              color: theme.palette.mode === "dark" ? "white" : "inherit",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.mode === "dark" ? "white" : "inherit",
              color: theme.palette.mode === "dark" ? "white" : "inherit",
            },
            "&:hover:not(.Mui-focused)": {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4AA088",
              },
            },
          }}
        >
          <MenuItem value="">
            <em>All Reading Levels</em>
          </MenuItem>
          {readingLevels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
