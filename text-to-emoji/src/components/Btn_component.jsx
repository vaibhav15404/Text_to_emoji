import React from "react";
import "./btn.css";
const Btn_component = (props) => {
  return (
    <div className="main" onClick={props.onClick} ref={props.ref} style={props.style}>
      <span className="image">
        <img src={props.image} alt="" />
      </span>
      {props.content}
    </div>
  );
};

export default Btn_component;
