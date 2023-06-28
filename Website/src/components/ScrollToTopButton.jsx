// Import necessary components and libraries
import { useState } from 'react';

/**
 * @function ScrollToTopButton
 * @description This component is the scroll to top button component of the website.
 * @returns ScrollToTopButton component
*/

const ScrollToTopButton = () => {
  // State for button visibility
  const [isVisible, setIsVisible] = useState(false);
  /* Implement the following functions: 
    * handleScroll 📜
    * scrollToTop 😉
  */

  // Function to handle scroll
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  // Add event listener to handle scroll
  window.addEventListener('scroll', handleScroll);
  // Return the button
  return (
    <button
      className={`${
        isVisible ? 'opacity-100' : 'opacity-0'
      } transition-opacity ease-in-out fixed bottom-5 right-5 duration-1000  bg-gray-800 rounded-full hover:bg-amber-500 text-white font-bold p-2 `}
      onClick={scrollToTop}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
