import { useEffect } from "react";
import {  useSelector } from "react-redux";
import {
  loadCountries,
} from "./countries-slice";
import { selectControls } from "features/controls/controls-selectors";
import { selectCountriesInfo, selectVisibleCountries } from "./countries-selectors";
import { RootState, useAppDispatch } from "store";
import { Country } from "../../../types";

export const useCountries = () :[Country[], ReturnType<typeof selectCountriesInfo>] => {
  const dispatch = useAppDispatch();
  const { status, error, qty } = useSelector(selectCountriesInfo);
  const controls = useSelector(selectControls);
  const countries = useSelector((state: RootState) =>
    selectVisibleCountries(state, controls)
  );

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};
