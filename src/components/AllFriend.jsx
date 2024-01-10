import React from "react";

const AllFriend = ({ friend }) => {
  return (
    <div className="allFriendsListItems" key={friend.id}>
      <div className="allFriends-contact-picture">
        <img src={friend.picture} />
      </div>
      <div className="allFriends-contact-name">{friend.name}</div>
    </div>
  );
};

export default AllFriend;
