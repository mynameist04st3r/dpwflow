import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ state, base, building }) => {
  const url = `http://localhost:5173/maintenance-request?state=${encodeURIComponent(
    state
  )}&base=${encodeURIComponent(base)}&building=${encodeURIComponent(building)}`;

  return (
    <div className="qr-generator">
      <h4>QR Code for Building {building}</h4>
      <QRCode value={url} size={128} />
      <p style={{ fontSize: "0.9rem" }}>{url}</p>
    </div>
  );
};

export default QRCodeGenerator;