import React, { useState } from "react";

import "./Block.css";

const Block = (props) => {
  const clicked = () => {
    if (!props.disabled) props.onClick(props.id);
  };

  return (
    <div className='col-4'>
      <button
        className={`btn btn-blck ${props.won ? " won" : ""} `}
        onClick={() => clicked()}
        disabled={props.disabled}>
        {props.player !== "" ? (
          <span
            className={`player-span  ${
              props.player === "X" ? " blue" : " yellow"
            } `}>
            {props.player}
          </span>
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default Block;
