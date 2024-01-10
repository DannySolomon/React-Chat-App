import React, { useState } from "react";
import { useSelector } from "react-redux";
import AllFriend from "./AllFriend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NewChat = () => {
  const allFriends = useSelector((state) => state.allFriends);

  const [searchInput, setSearchInput] = useState("");

  const [searchedFriends, setSearchedFriends] = useState(allFriends);

  const handleSearchAllFriendsSubmit = (e) => {
    e.preventDefault();
    if (searchInput == "") {
      setSearchedFriends(allFriends);
      return;
    }
    let filteredFriends = allFriends.filter((friend) =>
      friend.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchedFriends(filteredFriends);
  };

  return (
    <div id="right-pane">
      <div id="searchAllFriends">
        <form id="searchAllFriendsForm" onSubmit={handleSearchAllFriendsSubmit}>
          <input
            type="text"
            id="searchBarAllFriends"
            placeholder="Search.."
            onChange={(e) => setSearchInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" id="search-contact-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div id="allFriendsList">
        {searchedFriends.map((friend) => (
          <Link
            to={`/${friend.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={friend.id}
          >
            <AllFriend friend={friend} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NewChat;
