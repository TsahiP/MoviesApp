import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import {
  useGetMoviesQuery,
  useSearchMoviesQuery,
} from "./features/moviesSlice";
import { DataDialog } from "./components/DataDialog";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IMovie, MovieResult } from "./types/movie";
import FilterModal from "./components/filterModal";
import { useAppDispatch } from "./app/hooks";
import { selectSearchInput, setSearchInputValue, selectFilterQuery } from "./features/filterSlice";
import { useSelector } from "react-redux";
function App() {
  // dispacher
  const dispatch = useAppDispatch();
  // get selector
  const searchInputValue = useSelector(selectSearchInput);
  const filterQuery = useSelector(selectFilterQuery);


  const [page, setPage] = useState(1);
  const { data: movies, isError, isLoading } = useGetMoviesQuery(page);
  const { data: searchMovies } = useSearchMoviesQuery(
    searchInputValue + "&page=" + page + filterQuery
  );

  // console.log("🚀 ~ App ~ searchMovies:", searchMovies);

  // handle search input change

  const handleInputeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(e.target.value);
    dispatch(setSearchInputValue(e.target.value))
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <div className="mt-8">
        {/* header */}
        <div className=" ">
          <div className=" p-4 lg:text-9xl md:text-7xl text-6xl text-white font-serif font-bold">
            Movies
          </div>
          {/* input */}
          <div className="flex justify-center gap-4">
            <input
              type="text"
              value={searchInputValue}
              onChange={handleInputeChange}
              placeholder="Search for movies"
              className="w-[80%] md:w-[60%] lg:w-[40%] p-2 rounded-lg bg-gray-800 text-white"
            />

            {/* filters */}
            <FilterModal />
          </div>
        </div>
        {/* content */}
        <DataDialog />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mr-10 ml-10 mt-10">
          {/* <MoovieCard movies={movies} /> */}

          {searchInputValue === ""
            ? movies?.results?.map((movie: MovieResult) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            : searchMovies?.results?.map((movie: MovieResult) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
        </div>
        {/* pagination */}
        <div className="flex justify-center  mt-[40px]">
          {/* <Pagination /> */}
          <ThemeProvider theme={theme}>
            <Stack spacing={2}>
              <Pagination
                onChange={handlePageChange}
                count={
                  searchInputValue === ""
                    ? movies?.total_pages
                    : searchMovies?.total_pages
                }
                color="primary"
              />
            </Stack>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default App;

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Custom primary color
    },
    secondary: {
      main: "#ff4081", // Custom secondary color
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          "&.MuiPaginationItem-root": {
            backgroundColor: "#ffffffb0", // Normal background color for pagination item
            "&.Mui-selected": {
              backgroundColor: "#d2192e7a", // Custom color for selected pagination item
              color: "#fff", // Text color for selected item
            },
            "&:hover": {
              backgroundColor: "#e5e7eb", // Hover effect for pagination item
            },
          },
        },
      },
    },
  },
});
