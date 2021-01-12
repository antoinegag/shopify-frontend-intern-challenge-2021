import React from "react";
import ticket from "./ticket.svg";

const NominationBlankState = () => {
  return (
    <div>
      <h2>Search movies and nominate them, they'll show up here!</h2>
      <img
        src={ticket}
        style={{ maxWidth: "200px" }}
        alt="Person holding a movie ticket"
      />
    </div>
  );
};

export default NominationBlankState;
