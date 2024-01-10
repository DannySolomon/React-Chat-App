import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";
import { text } from "@fortawesome/fontawesome-svg-core";

const initialState = {
  id: data.profile.id,
  name: data.profile.name,
  picture: data.profile.picture,
  status: data.profile.status,
  friends: [...data.profile.friends], // friends is an array
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveLastChat(state, action) {
      const newFriends = [...state.friends];
      //payload - {id, time, text}
      const index = newFriends.findIndex((obj) => obj.id === action.payload.id);

      if (index !== -1) {
        const removedObj = newFriends.splice(index, 1)[0];
        let date = new Date(action.payload.time);
        let twelveHourFormatTime = date.toLocaleString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        removedObj.latest_timestamp = twelveHourFormatTime;
        removedObj.lastChat = action.payload.text;

        newFriends.unshift(removedObj);

        //state = { ...state, friends: newFriends }; //did not work properly
        state.friends = newFriends;
      }
    },
    saveNewFriend(state, action) {
      //payload - {id,name,picture,time,text}
      let date = new Date(action.payload.time);
      let twelveHourFormatTime = date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newFriendObj = {
        id: action.payload.id,
        name: action.payload.name,
        picture: action.payload.picture,
        latest_timestamp: twelveHourFormatTime,
        lastChat: action.payload.text,
      };

      state.friends.unshift(newFriendObj);
    },
  },
});

export const { saveLastChat, saveNewFriend } = profileSlice.actions;

export default profileSlice.reducer;
