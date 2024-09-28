import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
// import { Movie } from "../types/movie";
import { useSelector } from "react-redux";
import {
  closeMovieModal,
  selectData,
  selectIsOpen,
} from "../features/modalSlice";
import { useAppDispatch } from "../app/hooks";
import { GoStar } from "react-icons/go";
import { useGetMovieDataQuery } from "../features/moviesSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DataDialog = () => {
  const dispatch = useAppDispatch();
  const modalDisplay = useSelector(selectIsOpen);
  const modalData = useSelector(selectData);

  const { data: movie } = useGetMovieDataQuery(modalData?.id ?? -1);

  const handleClose = () => {
    dispatch(closeMovieModal());
  };

  return (
    <React.Fragment>
      <Dialog
        open={modalDisplay}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "#1f2937",
            width: "800px",
            maxWidth: "80%",
          },
        }}
      >
        <div className="md:flex  ">
          <img
            className="w-full md:w-[300px] lg:w-[50%] h-[500px]"
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt={movie?.title}
          />
          <div>
            <DialogTitle className="text-xl text-white">
              {modalData?.title}
            </DialogTitle>
            <DialogContent className="flex flex-col gap-4">
              <DialogContentText className="flex gap-4 ">
                <strong className="flex text-xs text-white gap-1 items-center">
                  Rating: {movie?.vote_average.toFixed(1)}{" "}
                  <GoStar color="yellow" />
                </strong>
                <strong className="text-xs text-white">
                  Year: {movie?.release_date}
                </strong>
              </DialogContentText>
              <DialogContentText id="alert-dialog-slide-description">
                <strong className="text-white">Description:</strong>{" "}
                <span className="text-white  ">{movie?.overview}</span>
              </DialogContentText>
              <DialogContentText>
                <strong className="text-white">Genre:</strong>
                <span className="text-white">
                  {movie?.genres?.map((i: any) => i.name).join(", ")}
                </span>
              </DialogContentText>

              <DialogContentText className="flex gap-4 ">
                <strong className="text-white">Language:</strong>
                <span className="text-white"> {movie?.original_language}</span>
              </DialogContentText>

              {movie?.adult === true ? (
                <div className="text-red-500">
                  <img
                    src="/plus18movie2.png"
                    alt="18+"
                    width={20}
                    height={20}
                  />
                </div>
              ) : null}

              <DialogContentText className="flex gap-4 ">
                {/* companies images */}
                <div className="flex gap-4 flex-col bg-gray-300 p-4 rounded-md">
                  <strong className="text-#1f2937">
                    Production Companies:
                  </strong>
                  <div className="grid grid-cols-4 gap-4 ">
                    {movie?.production_companies?.map((i: any) => (
                      <img
                        key={i.id}
                        src={`https://image.tmdb.org/t/p/w500${i.logo_path}`}
                        alt={i.name}
                        width={70}
                        height={10}
                      />
                    ))}
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </div>
        </div>
        <DialogActions>
          <div className="w-full flex  justify-center items-center">
            <Button
              style={{ textTransform: "none" }}
              color="error"
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
