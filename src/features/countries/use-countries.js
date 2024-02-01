import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCountriesInfo,
  selectVisibleCountries,
  loadCountries,
} from "./countries-slice";
import { selectControls } from "../controls/controls-slice";

export const useCountries = () => {
  const dispatch = useDispatch();
  const { status, error, qty } = useSelector(selectCountriesInfo);
  const controls = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, controls)
  );

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};
