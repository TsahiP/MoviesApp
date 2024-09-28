import type { PayloadAction } from "@reduxjs/toolkit"; // Importing PayloadAction type from Redux Toolkit
import { createAppSlice } from "../app/createAppSlice"; // Importing a custom createAppSlice function

// Defining the interface for the filter modal state
export interface IFilterModal {
    isOpen: boolean;
    yearFilterVal: string;
    adultFilterVal: boolean;
    searchInputValue: string;
    filterQuery: string;
}

// Initial state for the filter modal
const initialState: IFilterModal = {
    isOpen: false,
    yearFilterVal: "",
    adultFilterVal: false,
    searchInputValue: "",
    filterQuery: "",
};

// Creating a slice for the filter modal using createAppSlice
export const filterSlice = createAppSlice({
    name: "filter", // Name of the slice
    initialState, // Initial state
    reducers: {
        // Reducer to open the filter modal
        openFilterModalDisplay: (state: IFilterModal) => {
            state.isOpen = true;
        },
        // Reducer to close the filter modal
        closeFilterModalDisplay: (state: IFilterModal) => {
            state.isOpen = false;
        },
        // Reducer to set the search input value
        setSearchInputValue: (
            state: IFilterModal,
            action: PayloadAction<string>
        ) => {
            state.searchInputValue = action.payload;
        },
        // Reducer to set the filter form data
        setFilterFormData: (
            state: IFilterModal,
            action: PayloadAction<IFilterModal>
        ) => {
            state.yearFilterVal = action.payload.yearFilterVal;
            state.adultFilterVal = action.payload.adultFilterVal;
            let url: string = `&include_adult=${state.adultFilterVal}&language=en-US`;
            if (state.yearFilterVal) {
                url += `&year=${state.yearFilterVal}`;
            }
            state.filterQuery = url;
        },
        // Reducer to toggle the filter (currently resets year and adult filter values)
        toggleFilter: (state: IFilterModal) => {
            state.yearFilterVal = "";
            state.adultFilterVal = false;
        },
    },
    selectors: {
        // Selector to get the filter modal display flag
        selectFilterModalDisplayFlag: (state: IFilterModal) => state.isOpen,
        // Selector to get the search input value
        selectSearchInput: (state: IFilterModal) => state.searchInputValue,
        // Selector to get the filter query
        selectFilterQuery: (state: IFilterModal) => state.filterQuery,
    },
});

// Exporting the reducers
export const {
    openFilterModalDisplay,
    closeFilterModalDisplay,
    toggleFilter,
    setFilterFormData,
    setSearchInputValue
} = filterSlice.actions;

// Exporting the selectors
export const { selectFilterModalDisplayFlag, selectSearchInput, selectFilterQuery } = filterSlice.selectors;
