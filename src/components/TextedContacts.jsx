import React from "react";

const TextedContacts = ({ contact }) => {
  return (
    <div className="texted-contact-list" key={contact.id}>
      <div className="texted-contact-picture">
        <img src={contact.picture} />
      </div>
      <div className="texted-contact-name-chat">
        <div className="texted-contact-name">{contact.name}</div>
        <div className="texted-contact-chat">{contact.lastChat}</div>
      </div>
      <div className="texted-contact-lasttexted">
        {contact.latest_timestamp}
      </div>
    </div>
  );
};

export default TextedContacts;
