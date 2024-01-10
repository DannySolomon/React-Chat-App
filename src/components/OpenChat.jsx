import React, { useEffect, useRef, useState } from "react";
import Chats from "./Chats";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFriendToChatLog,
  appendChatToLog,
} from "../reduxReducers/chatLogSlice";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { saveLastChat, saveNewFriend } from "../reduxReducers/profilieSlice";

const OpenChat = () => {
  //get the id from url
  const friendIdString = useParams();
  const friendId = Number(friendIdString.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //get all chatlogs from redux
  const textedFriends = useSelector((state) => state.chatLogs);

  //get allFriends
  const allFriends = useSelector((state) => state.allFriends);

  //set particular friend to be shown
  const [friend, setFriend] = useState({});

  const [isNewChat, setNewChat] = useState(false);
  const [message, setMessage] = useState("");

  //scrolling to the bottom of the  chat when new message is typed
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      // behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  //get the friends list
  useEffect(() => {
    //need to check in texted friends and also allFriends -- yet to do
    const foundFriend = textedFriends.find((obj) => obj.id === friendId);
    const foundAllFriends = allFriends.find((obj) => obj.id === friendId);
    if (foundFriend) {
      setFriend(foundFriend);
    } else if (foundAllFriends) {
      setFriend(foundAllFriends);
      setNewChat(true);
    } else {
      navigate("/");
    }
    scrollToBottom();
  }, [friendId, textedFriends, friend]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    if (isNewChat) {
      let obj = {
        id: friend.id,
        name: friend.name,
        picture: friend.picture,
        time: Date.now(),
        text: message,
      };
      dispatch(addNewFriendToChatLog(obj));
      dispatch(saveNewFriend(obj));
      setNewChat(false);
    } else {
      let obj = { id: friendId, time: Date.now(), text: message };
      dispatch(appendChatToLog(obj));
      dispatch(saveLastChat(obj));
    }
    setMessage("");
  };

  return (
    <div id="friendRightPane">
      <div id="friendTitleBar">
        <div id="friendProfilePicture">
          <img src={friend.picture}></img>
        </div>
        <div id="friendName">{friend.name}</div>
      </div>
      <div id="friendChat">
        {friend.chatlog?.map((chat) => (
          <Chats chat={chat} key={chat.message_id} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div id="sendChat">
        <form id="sendMessageForm" onSubmit={handleSendMessage}>
          <input
            type="text"
            id="sendMessageInput"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" id="sendMessageButton">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default OpenChat;
