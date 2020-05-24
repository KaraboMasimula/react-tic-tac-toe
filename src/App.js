import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Blocks from "./components/Blocks/Blocks";
import Moves from "./components/Moves/Moves";
import Modal from "react-modal";

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
  let [player, setPlayer] = useState("X");
  let [previousPlayer, setPrevious] = useState("X");
  let [moves, setMoves] = useState([]);
  let [winner, setWinner] = useState(false);
  let [draw, setDraw] = useState(false);

  let [xAudio] = useState(new Audio(`/audio/X.mp3`));
  let [oAudio] = useState(new Audio(`/audio/O.mp3`));
  let [bgAudio] = useState(new Audio(`/audio/bg.mp3`));
  let [winAudio] = useState(new Audio(`/audio/win.mp3`));
  let [drawAudio] = useState(new Audio(`/audio/draw.mp3`));

  useEffect(() => {
    bgAudio.play();
  });

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

  const addMoves = (player) => {
    setMoves((currentMoves) => {
      return [...currentMoves, `${player}`];
    });
  };

  const changeWinner = () => {
    bgAudio.pause();
    winAudio.play();
    setWinner(true);
  };

  const changeDraw = () => {
    bgAudio.pause();
    drawAudio.play();
    setDraw(true);
  };

  const closeWinModal = () => {
    setWinner(false);
  };

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
