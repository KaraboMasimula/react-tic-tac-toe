import React, { useEffect } from "react";
import Block from "../Block/Block";
import "./Blocks.css";
import { useState } from "react";

const Blocks = (props) => {
  //Initialise items state for the Blocks
  const [items, updateItem] = useState([
    { id: 1, player: "", disabled: false },
    { id: 2, player: "", disabled: false },
    { id: 3, player: "", disabled: false },
    { id: 4, player: "", disabled: false },
    { id: 5, player: "", disabled: false },
    { id: 6, player: "", disabled: false },
    { id: 7, player: "", disabled: false },
    { id: 8, player: "", disabled: false },
    { id: 9, player: "", disabled: false },
  ]);

  //Check Winner Everytim state changes
  useEffect(() => {
    checkWinner();
  }, [items]);

  // Handle On Click Method From Block Component
  const handleClick = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, player: props.player, disabled: true } : item
    ); // Create new updated Items
    updateItem(newItems); // Update Items State
    props.changePlayer(); // Switch the current player (X-O)
  };

  // Checks If there is a Draw
  const checkDraw = () => {
    let blocksFilled = 0; // int counting number of blocks clicked

    for (let i = 0; i < items.length; i++) {
      if (items[i].player !== "") blocksFilled++;
    }

    if (blocksFilled === 9) props.changeDraw(); // If all blocks are clicked and there's still no winner then it's a draw
  };

  // Checks If there is a Winner
  const checkWinner = () => {
    let player = "";

    /* Switch current player to opposite - because we trying to compare the previous move */
    if (props.player === "X") player = "O";

    if (props.player === "O") player = "X";

    /* Check Every Individual Row to see if there's straight 3 Block row matching */
    if (
      items[0].player === player &&
      items[1].player === player &&
      items[2].player === player
    )
      props.changeWinner();
    else if (
      items[3].player === player &&
      items[4].player === player &&
      items[5].player === player
    )
      props.changeWinner();
    else if (
      items[6].player === player &&
      items[7].player === player &&
      items[8].player === player
    )
      props.changeWinner();
    else if (
      items[0].player === player &&
      items[3].player === player &&
      items[6].player === player
    )
      props.changeWinner();
    else if (
      items[1].player === player &&
      items[4].player === player &&
      items[7].player === player
    )
      props.changeWinner();
    else if (
      items[2].player === player &&
      items[5].player === player &&
      items[8].player === player
    )
      props.changeWinner();
    else if (
      items[0].player === player &&
      items[4].player === player &&
      items[8].player === player
    )
      props.changeWinner();
    else if (
      items[2].player === player &&
      items[4].player === player &&
      items[6].player === player
    )
      props.changeWinner();
    else checkDraw();
  };

  return (
    <div className='row'>
      {items.map((item, i) => (
        <Block
          key={item.id}
          id={item.id}
          disabled={item.disabled}
          player={item.player}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Blocks;
