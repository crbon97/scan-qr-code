import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import "./App.css";

function App() {
  const [result, setResult] = useState("dddd");
  const qrReader1 = React.useRef(null);
  function handleScan(data) {
    if (data) {
      setResult(data);
    }
  }
  useEffect(() => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          video: true,
        },
        function (localMediaStream) {},
        function (err) {
          alert(
            "The following error occurred when trying to access the camera: " +
              err
          );
        }
      );
    } else {
      alert("Sorry, browser does not support camera access");
    }
  }, []);
  function handleError(err) {
    console.error(err);
  }
  function openImageDialog() {
    qrReader1.current.openImageDialog();
  }
  const previewStyle = {
    height: 240,
    width: 320,
  };
  return (
    <div className="App">
      <QrReader
        ref={qrReader1}
        delay={300}
        onError={handleError}
        legacyMode
        onScan={handleScan}
        style={{ width: "100%" }}
        previewStyle={previewStyle}
        facingMode={"environment"}
      />
      <input type="button" value="Submit QR Code" onClick={openImageDialog} />
      <p>{result}</p>
    </div>
  );
}

export default App;
