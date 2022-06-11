import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";

const MovieReview = ({ item }) => {
  return (
    <>
      <div className="user">
        <span>
          <FontAwesomeIcon icon={faUser} />
        </span>
        <div className="name">{item.author}</div>
      </div>
      <div className="content">{item.content}</div>
      <div className="write">{new Date(item.created_at).toLocaleString()}</div>
    </>
  );
};

export default MovieReview;
