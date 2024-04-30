import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country, Status, Extra } from "../../../types";

export const loadCountries = createAsyncThunk<
{data: Country[]},
undefined,
{extra: Extra}
>(
  "@@countries/load-countries",
  (_, { extra: { client, api } }) => {
    return client.get(api.ALL_COUNTRIES);
  }
);

type CountrySlice = {
  status: Status,
  error: string | null,
  list: Country[];

}

const initialState: CountrySlice = {
  status: "idle",
  error: null,
  list: [],
};

const countrySlice = createSlice({
  name: "@@country",
  initialState,
  reducers: {
    getCountries: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loadCountries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || 'Cannot load data';
      })

      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "received";
        state.list = action.payload.data;
      });
  },
});

export const countryReducer = countrySlice.reducer;

