import React from "react";
import { MovieResult } from "../types/movie";
import { GoStar } from "react-icons/go";
import { useAppDispatch } from "../app/hooks";
import { openMovieModal } from "../features/modalSlice";

interface MovieCardProps {
  movie: MovieResult;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  // const [dialogFlag, setDialogFlag] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
        <div
        onClick={() => {dispatch(openMovieModal(movie))}}
          key={movie.id}
          className="mr-auto ml-auto w-[80%] md:w-[85%] lg:w-[70%] bg-gray-800 rounded-lg "
        >
          {/* <div className="w-full h-[150px]"></div> */}
          <div className="flex flex-col gap-3 ">
            <div className="  md:h-[250px]">
              <img
                // width={"100%"}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-t-lg w-full h-full "
              />
              
            </div>
            <div className="text-white font-semibold overflow-hidden whitespace-nowrap text-overflow-ellipsis">
              {movie.title}
            </div>
            <div className="text-gray-400 overflow-hidden whitespace-nowrap text-overflow-ellipsis">
              {movie.release_date}
            </div>
            <div className="flex text-center justify-center items-center gap-2">
              <span className="text-gray-400 overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                {movie.vote_average.toFixed(1)}
              </span>
              <GoStar color="yellow" />
            </div>
          </div>
        </div>
    </>
  );
};

export default MovieCard;
