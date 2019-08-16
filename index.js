import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const useMouse = (initialValue = { x: 0, y: 0 }) => {
  const [position, setPosition] = useState(initialValue);
  const handleMouseMove = e => {
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  return [position, handleMouseMove];
};

function App() {
  const [yOffset, setYOffset] = useState(300);
  const [xOffset, setXOffset] = useState(350);
  const [isFollowing, setIsFollowing] = useState(false);
  const [position, handleMouseMove] = useMouse();

  const moveBox = e => {
    const { name } = e.target;
    return {
      up: () => setYOffset(yOffset - 50),
      down: () => setYOffset(yOffset + 50),
      left: () => setXOffset(xOffset - 50),
      right: () => setXOffset(xOffset + 50)
    }[name]();
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const styles = {
    box: {
      backgroundColor: "#cc0303",
      height: "100px",
      width: "100px",
      position: "absolute",
      left: isFollowing ? position.x : xOffset,
      top: isFollowing ? position.y : yOffset
    }
  };

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <h1>Move the Box!</h1>

      <button name="left" onClick={moveBox}>
        Move Left
      </button>
      <button name="right" onClick={moveBox}>
        Move Right
      </button>
      <button name="up" onClick={moveBox}>
        Move Up
      </button>
      <button name="down" onClick={moveBox}>
        Move Down
      </button>
      <button name="mouse" onClick={toggleFollow}>
        Follow Mouse
      </button>

      <div className="box" style={styles.box} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
