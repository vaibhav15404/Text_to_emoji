import React, { useRef, useState, useEffect, useReducer } from "react";
import "./App.css";
import Btn_component from "./components/Btn_component";

const App = () => {
  const encryption = useRef(null);
  const decryption = useRef(null);
  const arr = useRef(null);
  const enctxt = useRef(null);
  const result = useRef(null);
  const password = useRef(null);
  const dectxt = useRef(null);
  const decinput = useRef(null);
  const decresult = useRef(null);
  const encopeneye = useRef(null);
  const enccloseeye = useRef(null);
  const decopeneye = useRef(null);
  const deccloseeye = useRef(null);

  const [encBtnColor, setEncBtnColor] = useState("initialColor");
  const [decBtnColor, setDecBtnColor] = useState("initialColor");
  useEffect(() => {
    setEncBtnColor("#F8C453"); // Change the color when Encryption button is clicked
    setDecBtnColor("white");
  }, []);
  function enclick() {
    console.log("hello ");
    encryption.current.style.display = "block";
    decryption.current.style.display = "none";
    arr.current.style.transform = "rotate(0deg)";
    setEncBtnColor("#F8C453"); // Change the color when Encryption button is clicked
    setDecBtnColor("white"); // Reset the color for Decryption button
  }

  function declick() {
    console.log("hello ");
    encryption.current.style.display = "none";
    decryption.current.style.display = "block";
    arr.current.style.transform = "rotate(180deg)";
    setEncBtnColor("white"); // Reset the color for Encryption button
    setDecBtnColor("#F8C453"); // Change the color when Decryption button is clicked
  }

  function encsub() {
    result.current.style.display = "block";
    let val = enctxt.current.value;
    let pass = password.current.value;
    let array = val.split("");
    let clutter = "";
    array.forEach((element) => {
      clutter += `&#128${element.charCodeAt()}`;
    });
    console.log(clutter);
    result.current.innerHTML = `<h2>${clutter}<h2/>`;

    localStorage.setItem(
      val,
      JSON.stringify({ password: pass, clutter: clutter })
    );

    // let storedData = localStorage.getItem("vaibhav");
    // storedData = JSON.parse(storedData);
    // console.log(storedData.password);
  }

  function decsub() {
    decresult.current.style.display = "block";
    let val = dectxt.current.value;
    let pass = decinput.current.value;

    if (localStorage.getItem(val)) {
      let storedData = localStorage.getItem(val);
      storedData = JSON.parse(storedData);
      if (pass === storedData.password) {
        decresult.current.innerHTML = `<h2>${storedData.clutter}<h2/>`;
      } else {
        decresult.current.style.color = "red";
        decresult.current.innerHTML = `<h4>Password is incorrect<h4/>`;
        decresult.current.style.color = "black";
      } 
    } else {
      decresult.current.style.color = "green";
      decresult.current.innerHTML = `<h4>First encrypt this data then only you are able to decrypt<h4/>`;
      decresult.current.style.color = "black";
    }
  }

  function encopen() {
    encopeneye.current.style.display = "none";
    enccloseeye.current.style.display = "block";
    password.current.type = "text";
    //  decinput.current.type="text"
  }

  function encclose() {
    encopeneye.current.style.display = "block";
    enccloseeye.current.style.display = "none";
    password.current.type = "password";
    // decinput.current.type="password"
  }

  function decopen() {
    decopeneye.current.style.display = "none";
    deccloseeye.current.style.display = "block";
    decinput.current.type = "text";
    //  decinput.current.type="text"
  }

  function decclose() {
    decopeneye.current.style.display = "block";
    deccloseeye.current.style.display = "none";
    decinput.current.type = "password";
    // decinput.current.type="password"
  }

  return (
    <>
      <div id="main">
        <div className="heading">
          Text
          <span className="arrow">
            <img src="./arrow.png" alt="" ref={arr} />
          </span>
          Emoji
        </div>

        <div className="endec">
          <Btn_component
            id="encbtn"
            className="enc-btn"
            image="./lock.png"
            content="Encryption"
            onClick={enclick}
            style={{ backgroundColor: encBtnColor }}
          />

          <Btn_component
            className="dec-btn"
            image="./unlock.png"
            content="Decryption"
            onClick={declick}
            style={{ backgroundColor: decBtnColor }}
          />
        </div>

        <div id="enc" className="encryption" ref={encryption}>
          <h5>1. Type a message</h5>
          <textarea
            // placeholder="Type your message to encrypt"
            id="text"
            cols="30"
            rows="10"
            ref={enctxt}
          ></textarea>
          <h5>2. Password</h5>
          <div className="inp">
            <input type="password" ref={password} />
            <span className="openeye">
              {" "}
              <img
                src="./open_eye.png"
                alt=""
                onClick={encopen}
                ref={encopeneye}
              />
            </span>
            <span className="closeeye">
              {" "}
              <img
                src="./close_eye.png"
                alt=""
                onClick={encclose}
                ref={enccloseeye}
              />
            </span>
          </div>

          <Btn_component
            image="./lock.png"
            content="Encrypt the message"
            onClick={encsub}
          />

          <div id="result" ref={result}></div>
        </div>

        <div id="dec" className="decryption" ref={decryption}>
          <h5>1. Type a message</h5>
          <textarea
            // placeholder="Type your message to encrypt"
            id="text"
            cols="30"
            rows="10"
            ref={dectxt}
          ></textarea>
          <h5>2. Password</h5>
          <div className="inp">
            <input type="password" ref={decinput} />
            <span className="openeye">
              {" "}
              <img
                src="./open_eye.png"
                alt=""
                onClick={decopen}
                ref={decopeneye}
              />
            </span>
            <span className="closeeye">
              {" "}
              <img
                src="./close_eye.png"
                alt=""
                onClick={decclose}
                ref={deccloseeye}
              />
            </span>
          </div>

          <Btn_component
            image="./unlock.png"
            content="Decrypt the message"
            onClick={decsub}
          />
          <div id="decresult" ref={decresult}></div>
        </div>
      </div>
    </>
  );
};

export default App;
