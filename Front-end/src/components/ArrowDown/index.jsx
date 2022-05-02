import React from "react";
import "./style.css";

const ArrowDown = () => {
  return (
    <div className="arrowDown">
      <svg
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
        className="arrowDown__svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.8 23C9.5 23 9.3 22.9 9.1 22.7L0.799998 14.4C0.199998 13.8 -1.75834e-06 13 0.399998 12.2C0.799998 11.4 1.4 11 2.2 11H5.8C6.3 4.8 11.5 0 17.8 0H21.8C22.3 0 22.7 0.4 22.8 0.9C22.9 1.4 22.5 1.9 22 2H21.8C17.4 3 14.3 6.6 13.8 11H17.3C18.1 11 18.8 11.5 19.1 12.2C19.4 12.9 19.2 13.8 18.7 14.4L10.4 22.7C10.3 22.9 10 23 9.8 23Z"
          fill="#F3F3F3"
        />
      </svg>
    </div>
  );
};

export default ArrowDown;
