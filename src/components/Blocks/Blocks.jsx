import React, { useEffect } from "react";
import Block from "../Block/Block";
import "./Blocks.css";
import { useState } from "react";

const Blocks = (props) => {
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

  useEffect(() => {
    checkWinner();
  }, [items]);

  const handleClick = (id) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, player: props.player, disabled: true } : item
    );
    updateItem(newItems);
    props.changePlayer();
  };

  const checkDraw = () => {
    let blocksFilled = 0;

    for (let i = 0; i < items.length; i++) {
      if (items[i].player !== "") blocksFilled++;
    }

    if (blocksFilled === 9) props.changeDraw();
  };

  const checkWinner = () => {
    let player = "";

    if (props.player === "X") player = "O";

    if (props.player === "O") player = "X";

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
