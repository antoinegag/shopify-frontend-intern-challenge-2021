import React from "react";
import ticket from "./ticket.svg";
import styles from "./NominationBlankState.module.scss";

const NominationBlankState = () => {
  return (
    <div>
      <h2>Search movies and nominate them, they'll show up here!</h2>
      <img src={ticket} style={{ maxWidth: "200px" }} />
    </div>
  );
};

export default NominationBlankState;
