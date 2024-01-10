import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

//this is an array
const initialState = data.allFriends;

const allFriendsSlice = createSlice({
  name: "allFriends",
  initialState,
  reducers: {},
});

export default allFriendsSlice.reducer;
