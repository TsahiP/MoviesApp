import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  closeFilterModalDisplay,
  toggleFilter,
  openFilterModalDisplay,
  selectFilterModalDisplayFlag,
  setFilterFormData,
} from "../features/filterSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import { CiFilter } from "react-icons/ci";
import { TextField } from "@mui/material";

export default function FilterModal() {
  const [year, setYear] = React.useState("");
  const [adult, setAdult] = React.useState("");
  //   get redux state
  const dispatch = useAppDispatch();
  const modalDisplay = useSelector(selectFilterModalDisplayFlag);

  const handleClickOpen = () => {
    dispatch(openFilterModalDisplay());
  };

  const handleClose = () => {
    dispatch(closeFilterModalDisplay());
  };
  const handleClear = () => {
    dispatch(toggleFilter());
    setYear("");
    setAdult("");
  };

  //   filter click handler
  const handleFilterClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formYear = e.currentTarget.year.value;
    const formAdult = e.currentTarget.adult.value;
    const searchInputValue = "&year=" + formYear + "&adult=" + formAdult;

    dispatch(
      setFilterFormData({
        yearFilterVal: formYear,
        adultFilterVal: formAdult,
        searchInputValue: searchInputValue,
        isOpen: modalDisplay,
        filterQuery: searchInputValue,
      })
    );
  };

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="hover:bg-red-500 cursor-pointer text-2xl p-4 bg-slate-800 rounded-md transition-colors duration-300"
      >
        <CiFilter color="#fff" />
      </div>

      <Dialog
        open={modalDisplay}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="bg-[#c00b0bd6]">
          <form onSubmit={handleFilterClick}>
            <div className="flex flex-col gap-4 ">
              <h1 className="font-semibold text-xl text-white">Filters</h1>
              {/* year select */}
              <div className="flex gap-4">
                <TextField
                  id="year-input"
                  label="Year"
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  {Array.from(new Array(50), (_v, i) => (
                    <option key={i} value={2023 - i}>
                      {2023 - i}
                    </option>
                  ))}
                </TextField>
                <TextField
                  className="w-[160px]"
                  id="adult-input"
                  label="Adult 18+"
                  name="adult"
                  value={adult}
                  onChange={(e) => setAdult(e.target.value)}
                  select
                  variant="outlined"
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value=""></option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </TextField>
              </div>
              <div></div>
            </div>
            <DialogActions className="bg-[c00b0bd6]">
              <Button
                style={{ textTransform: "none", backgroundColor: "black" }}
                variant="contained"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                style={{ textTransform: "none", backgroundColor: "black" }}
                variant="contained"
                onClick={handleClear}
              >
                Clear Filters
              </Button>
              <Button
                style={{ textTransform: "none", backgroundColor: "black" }}
                variant="contained"
                onClick={(_e) => handleFilterClick}
                autoFocus
                type="submit"
              >
                Agree
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
