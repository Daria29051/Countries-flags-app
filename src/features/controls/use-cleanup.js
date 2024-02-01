import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearControls } from "./controls-slice";

export const useCleanup = () => {
  const cleanUp = () => {
    dispatch(clearControls());
    const navigate = useNavigate();
    navigate("/");
  };

  const dispatch = useDispatch();
  return () => dispatch(cleanUp());
};
