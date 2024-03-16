import React, { useState, useRef } from "react";
import styles from "./Roulette.module.css";

const winningValues = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27] as const;

const Roulette: React.FC = () => {
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  const spinWheel = () => {
    if (!isSpinning && wheelRef.current) {
      setIsSpinning(true);

      // Randomize winning number
      const winningIndex = Math.floor(Math.random() * winningValues.length);
      const winningAngle = (360 / winningValues.length) * winningIndex;

      // Calculate rotation: Ensure it spins a few times before landing on the winning number
      const spins = 360 * 5; // Spin 5 full rotations for drama
      const totalRotation = spins + (360 - winningAngle); // Adjust so it ends on the winning number

      // Apply funky spin animation via JavaScript
      wheelRef.current.style.transition = "transform 5s "; // Modify for funky effect
      wheelRef.current.style.transform = `rotate(-${totalRotation}deg)`;

      setTimeout(() => {
        setIsSpinning(false);
        // Reset for next spin
        if (wheelRef.current) {
          wheelRef.current.style.transition = "";
          wheelRef.current.style.transform = "";
        }
      }, 5000); // Match timeout to animation duration
    }
  };

  return (
    <div className="relative">
      <div className="roulette-wheel w-64 h-64 rounded-full border-8 border-white flex items-center justify-center">
        <div
          className={`roulette-inner w-56 h-56 rounded-full bg-green-500 relative ${styles["roulette-inner"]}`}
          ref={wheelRef}
        >
          {winningValues.map((value, index) => {
            const angle = index * (360 / winningValues.length);
            return (
              <div
                key={index}
                className="roulette-section"
                style={{
                  transform: `
          translate(-50%, 0) /* Center the section horizontally */
          translate(0, -28rem) /* Move out to the edge of the wheel */
          rotate(${angle}deg) /* Rotate to the correct position around the circle */
          translate(0, 50px) /* Adjust so the text is not on the very edge */
          rotate(${-angle}deg) /* Counteract the rotation so the text is upright */
        `,
                  transformOrigin: "50% 50%" /* Set origin for the rotations */,
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>
      <button
        onClick={spinWheel}
        className="spin-button mt-4 px-4 py-2 bg-white text-gray-900 rounded-md"
      >
        Spin
      </button>
    </div>
  );
};

export default Roulette;
