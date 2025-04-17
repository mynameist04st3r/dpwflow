import { useEffect, useState } from "react";
import Konami from "konami-code-js";
import Grenade from "../assets/Grenade.png"; // Make sure this path is correct

function EasterEgg() {
    const [showSoldier, setShowSoldier] = useState(false);
  
    useEffect(() => {
      const easterEgg = new Konami(() => {
        setShowSoldier(true);
        setTimeout(() => setShowSoldier(false), 5000); // Show for 5 seconds
      });
  
      return () => easterEgg.disable();
    }, []);
  
    const frameWidth = 96; // width of each frame in px (manually estimated from image)
    const totalFrames = 16;
    const totalWidth = frameWidth * totalFrames;
  
    const styles = {
        wrapper: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(5)", // Scales the entire div 2x
          width: `${frameWidth}px`, // original frame width
          height: "128px", // original image height
          backgroundImage: `url(${Grenade})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0px",
          backgroundSize: `${totalWidth}px`, // all frames in one row
          animation: `soldier-animate 5s steps(${totalFrames}) forwards`,
          zIndex: 9999,
        },
        keyframes: `
          @keyframes soldier-animate {
            from {
              background-position: 0px;
            }
            to {
              background-position: -${totalWidth}px;
            }
          }
        `,
      };
  
    return (
      <>
        {showSoldier && (
          <>
            <style>{styles.keyframes}</style>
            <div style={styles.wrapper}></div>
          </>
        )}
      </>
    );
  }
  
  export default EasterEgg;