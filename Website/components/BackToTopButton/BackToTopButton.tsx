"use client"



// ==================================   IMPORTANT NOTE!!!   ===================================
// WHERE EVER THIS COMPONENT IS USED, MAKE SURE THAT YOU WRITE "use client" AT TOP OF THAT PAGE.




import React from "react";
import { useEffect, useState } from "react";
import {BiSolidToTop} from "react-icons/bi"
function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <button
          onClick={scrollUp}
          className="fixed bottom-12 right-12 w-12 h-12 text-5xl text-white-500 rounded-xl shadow-lg"
        >
          {/* <FontAwesomeIcon icon={faChevronUp} size="2xs" /> */}
          <BiSolidToTop/>
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;
