import { configureStore } from "@reduxjs/toolkit";

import profilieSlice from "../reduxReducers/profilieSlice";
import chatLogSlice from "../reduxReducers/chatLogSlice";
import allFriendsSlice from "../reduxReducers/allFriendsSlice";

const store = configureStore({
  reducer: {
    profile: profilieSlice,
    chatLogs: chatLogSlice,
    allFriends: allFriendsSlice,
  },
});

export default store;
