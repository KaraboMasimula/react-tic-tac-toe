import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Blocks from "./components/Blocks/Blocks";
import Moves from "./components/Moves/Moves";
import Modal from "react-modal";

// Custom Syling for the modal
const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(3, 3, 3, 0.65)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "700px",
    height: "500px",
    bottom: "auto",
    marginRight: "-50%",
    color: "white",
    backgroundColor: "rgb(5, 190, 214)",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  //States
  let [player, setPlayer] = useState("X"); // State for current player
  let [previousPlayer, setPrevious] = useState("X"); // State to store previous player
  let [moves, setMoves] = useState([]); // State to store history of moves
  let [winner, setWinner] = useState(false); // Bool state for if there's a winner
  let [draw, setDraw] = useState(false); // Bool state for if there's a draw

  //Audio States
  let [xAudio] = useState(new Audio(`/audio/X.mp3`));
  let [oAudio] = useState(new Audio(`/audio/O.mp3`));
  let [bgAudio] = useState(new Audio(`/audio/bg.mp3`));
  let [winAudio] = useState(new Audio(`/audio/win.mp3`));
  let [drawAudio] = useState(new Audio(`/audio/draw.mp3`));

  // Play Bacground Audio when app starts
  useEffect(() => {
    bgAudio.play();
  });

  // Change Player
  const changePlayer = () => {
    if (player === "X") {
      xAudio.play();
      setPrevious(player);
      setPlayer("O");
      addMoves("X");
    } else if (player === "O") {
      oAudio.play();
      setPrevious(player);
      setPlayer("X");
      addMoves("O");
    }
  };

  // Add to list of moves
  const addMoves = (player) => {
    setMoves((currentMoves) => {
      return [...currentMoves, `${player}`];
    });
  };

  // Set Winner
  const changeWinner = () => {
    bgAudio.pause();
    winAudio.play();
    setWinner(true);
  };

  //Set A Draw
  const changeDraw = () => {
    bgAudio.pause();
    drawAudio.play();
    setDraw(true);
  };

  // Close Winner Modal
  const closeWinModal = () => {
    setWinner(false);
  };

  // Close Draw Moda
  const closeDrawModal = () => {
    setDraw(false);
  };

  return (
    <div className='row App'>
      <div className='col-7'>
        <Blocks
          player={player}
          changePlayer={changePlayer}
          changeWinner={changeWinner}
          changeDraw={changeDraw}
        />
      </div>
      <div className='col-3 station'>
        <h1>
          <img src={logo} className='App-logo' alt='logo' />
          Tic-Tac-Toe
          <img src={logo} className='App-logo' alt='logo' />
        </h1>

        <h4>
          Current Player :{" "}
          <strong className={`move-${player === "X" ? "blue" : "yellow"}`}>
            {player}
          </strong>
        </h4>

        <hr />

        <Moves moves={moves} />
      </div>

      <Modal
        isOpen={winner}
        onRequestClose={closeWinModal}
        style={customStyles}
        contentLabel='Example Modal'
        ariaHideApp={false}>
        <div className='text-center'>
          <h1>Winner</h1>

          <hr />

          <span className='winner'>
            <strong>{previousPlayer}</strong>
          </span>
        </div>
      </Modal>

      <Modal
        isOpen={draw}
        onRequestClose={closeDrawModal}
        style={customStyles}
        contentLabel='Example Modal'
        ariaHideApp={false}>
        <div className='text-center'>
          <h1>Draw</h1>

          <hr />

          <span
            style={{
              color: "red",
              fontSize: "100px",
              animation: "shake2 0.5s infinite",
            }}>
            <strong>!!No Winner!!</strong>
          </span>
        </div>
      </Modal>
    </div>
  );
}

export default App;
