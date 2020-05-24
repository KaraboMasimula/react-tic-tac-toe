import React from "react";

import "./Moves.css";

const Moves = (props) => {
  return (
    <ul className='moves-list'>
      {props.moves.map((move, i) => {
        return (
          <li className='move-item' key={i}>
            <strong>
              Player <span className={`move-${move === "X" ? "blue" : "yellow"}`}>{move} </span> moved
            </strong>
          </li>
        );
      })}
    </ul>
  );
};

export default Moves;
