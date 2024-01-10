import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import data from "../data/data.json";
import TextedContacts from "./TextedContacts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileSearchContacts = () => {
  //setting the searchString
  const [searchContactInput, setSearchContactInput] = useState("");

  //getting the profile from redux
  const getProfile = useSelector((state) => state.profile);

  const [profile, setProfile] = useState("");

  //setting the friends to be displayed
  const [displayFriends, setDisplayFriends] = useState([]);

  useEffect(() => {
    setProfile(getProfile);
    setDisplayFriends(getProfile.friends);
    console.log(profile.friends);
  }, [getProfile]);

  const handleSearchContactSubmit = (e) => {
    e.preventDefault();
    if (searchContactInput == "") {
      setDisplayFriends(profile.friends);
      return;
    }
    let filteredFriends = profile.friends.filter((friend) =>
      friend.name.toLowerCase().includes(searchContactInput.toLowerCase())
    );
    setDisplayFriends(filteredFriends);
  };

  return (
    <div id="left-pane">
      <div id="profile">
        <div id="profile-picture" className="profile-components">
          <img src={profile.picture}></img>
        </div>
        <div id="profile-name" className="profile-components">
          {profile.name}
        </div>
        <div id="start-new-convo" className="profile-components">
          <Link to="/newChat">
            <span id="start-new-convo-button">
              <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
            </span>
          </Link>
        </div>
      </div>
      <div id="search-convo-profiles">
        <form id="searchContacts" onSubmit={handleSearchContactSubmit}>
          <input
            type="text"
            id="search-contact"
            placeholder="Search.."
            value={searchContactInput}
            onChange={(e) => setSearchContactInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" id="search-contact-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div id="chat-profiles">
        {displayFriends?.map((chat) => (
          <Link
            to={`/${chat.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            key={chat.id}
          >
            <TextedContacts contact={chat} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileSearchContacts;
