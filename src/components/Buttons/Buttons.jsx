import React, { useState } from "react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Buttons = (props) => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (num) => {
    setSelectedButton(num);
    props.clickedBtn(num);
  };

  return (
    <>
      {numbers.map((num) => (
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            background:
              props.selectedValues === num
                ? "#1da1f2"
                : "rgba(255, 255, 255, 0.1)",
            color: selectedButton === num ? "#DEDEDE" : "grey",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: 300,
          }}
          onClick={() => handleButtonClick(num)}
          key={num}
        >
          {num}
        </button>
      ))}
    </>
  );
};

export default Buttons;
