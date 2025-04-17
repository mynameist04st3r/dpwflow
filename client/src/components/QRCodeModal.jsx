import React, { useRef } from "react";
import QRCode from "react-qr-code";

const QRCodeModal = ({ state, base, building, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=600,height=600");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 20px;
            }
            .qr-info {
              margin-bottom: 16px;
              font-size: 1.1rem;
            }
            .qr-container {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>QR Code for Building {building}</h3>
        <div ref={printRef}>
          <div className="qr-info">
            <p><strong>State:</strong> {state}</p>
            <p><strong>Base:</strong> {base}</p>
            <p><strong>Building:</strong> {building}</p>
          </div>
          <div className="qr-container">
            <QRCode
              value={`http://localhost:5173/maintenance-request?state=${encodeURIComponent(
                state
              )}&base=${encodeURIComponent(base)}&building=${encodeURIComponent(
                building
              )}`}
              size={180}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handlePrint}>Print</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
