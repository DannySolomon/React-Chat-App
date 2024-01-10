import { createSlice } from "@reduxjs/toolkit";

import data from "../data/data.json";

//this is an array
const initialState = data.friends;

const chatLogSlice = createSlice({
  name: "chatLogs",
  initialState,
  reducers: {
    appendChatToLog(state, action) {
      //payload - {id,time,text}
      let index = state.findIndex((obj) => obj.id === action.payload.id);
      let date = new Date(action.payload.time);
      let twelveHourFormatTime = date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      let chatLogObj = {
        text: action.payload.text,
        timestamp: twelveHourFormatTime,
        side: "right",
        message_id: Date.now(),
      };
      state[index].chatlog.push(chatLogObj);
    },
    addNewFriendToChatLog(state, action) {
      //payload - {id,name,picture,time,text}

      let date = new Date(action.payload.time);
      let twelveHourFormatTime = date.toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      let chatLogObj = {
        text: action.payload.text,
        timestamp: twelveHourFormatTime,
        side: "right",
        message_id: Date.now(),
      };

      let newFriendInChatLog = {
        id: action.payload.id,
        name: action.payload.name,
        picture: action.payload.picture,
        chatlog: [chatLogObj],
      };

      state.push(newFriendInChatLog);
    },
  },
});

export const { appendChatToLog, addNewFriendToChatLog } = chatLogSlice.actions;

export default chatLogSlice.reducer;
