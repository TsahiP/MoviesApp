// import { IMovie } from "../features/moviesSlice";
// from collections
export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
// collections
export interface IMovies {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}
  
// by id
export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  release_date: string;
  status: string;
  title: string;
  vote_average: number;
  vote_count: number;
}