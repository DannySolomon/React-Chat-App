import React from "react";

const Chats = ({ chat }) => {
  return (
    <>
      {chat.side === "right" && (
        <div className="chatMessage floatRight" key={chat.message_id}>
          {chat.text}
        </div>
      )}
      {chat.side === "left" && (
        <div className="chatMessage floatLeft" key={chat.message_id}>
          {chat.text}
        </div>
      )}
      <div className="clear"></div>
    </>
  );
};

export default Chats;
