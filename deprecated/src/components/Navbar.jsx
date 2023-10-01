// Import necessary components and libraries
import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import Searchbar from "./Searchbar";
import { useState, useEffect } from "react";

/**
 * @function Navbar
 * @description This component is the navbar of the website. 🚀
 * @returns Navbar component
*/
function Navbar() {
    // Function to check if the current route is active ✨
    const isActiveRoute = (route) => {
        const regex = new RegExp(`^${route}(\/.*)?$`);
        return regex.test(window.location.pathname);
    };

    // Custom hook to get and set theme 🌞🌙
    const [nextTheme, setTheme] = useTheme();

    // State for modal visibility 🔍
    const [showModal, setShowModal] = useState(false);

    // State for mobile view 📱
    const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

    // State to get fork count from GitHub API 🍴
    const [forkCount, setForkCount] = useState(0);

    // State to get star count from GitHub API ⭐
    const [starCount, setStarCount] = useState(0);

    // Function to handle closing the modal
    const handleOnClose = () => {
        setShowModal(false);
    };

    // Function to handle input click and open the modal based on window size 🔍
    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Function to get fork count and star count from GitHub API 🍴
    useEffect(() => {
        fetch('https://api.github.com/repos/neokd/DataStorehouse')
            .then(response => response.json())
            .then(data => {
                setForkCount(data.forks_count);
                setStarCount(data.stargazers_count);
            });
    }, []);

    // Render the JSX component 
    return (
        <div>
            <nav className="flex items-center md:justify-between flex-wrap lg:fixed top-0 lg:h-24 z-40 w-full backdrop-blur flex-none bg-blur py-4 drop-shadow-lg dark:bg-customGray/80 dark:text-white border-b border-gray-700 text-black ">
                <div className="lg:mx-8 md:mx-4 flex flex-rows mx-2">
                    <div className={`lg:p-3 p-2 dark:border-amber-500 hover:scale-105  duration-100 mx-2 rounded-lg ${isActiveRoute('/') ? 'bg-amber-500    duration-100 ' : 'hover:shadow-lg hover:shadow-amber-500'}`}>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 " >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`lg:p-3 p-2  dark:border-amber-500 hover:scale-105  duration-100 mx-2 rounded-lg ${isActiveRoute('/datasets') ? 'bg-amber-500    duration-100 ' : 'hover:shadow-lg hover:shadow-amber-500'}`}>
                        <Link to="/datasets">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`lg:p-3 p-2 border-amber-500 hover:scale-105 duration-100 mx-2 rounded-lg ${isActiveRoute('/docs') ? 'bg-amber-500 duration-100' : 'hover:shadow-lg hover:shadow-amber-500'}`}>
                        <div className="group">
                            <Link to="/docs" onClick={(e) => e.preventDefault()} className="pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </Link>
                            <div className="dark:bg-gray-600/70 bg-gray-600 items-center rounded-lg shadow-md p-2 text-sm absolute top-full hidden group-hover:block text-white/80">
                                <p className="whitespace-nowrap">Coming Soon...</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-r border-black dark:border-white mx-2 my-1" />

                    <div className={`p-3  border-amber-500 hover:scale-105 duration-100 mx-2 rounded-lg hover:shadow-lg hover:shadow-amber-500`}>
                        <Link to="https://github.com/neokd/DataStorehouse" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        </Link>

                    </div>
                    <div className="border border-r border-black dark:border-white mx-2 my-1" />
                    <div className='lg:p-3 p-2  border-gray-500  duration-100 mx-2 rounded-lg border  flex '>

                        <button onClick={nextTheme === 'light' ? () => setTheme(nextTheme) : null} className={`${nextTheme === 'dark' ? 'text-amber-400 animate-spin-slow' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 stroke-2 dark:stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        </button>
                        <div className="border border-r border-black dark:border-white mx-3 my-1" />
                        <button onClick={nextTheme === 'dark' ? () => setTheme(nextTheme) : null} className={`${nextTheme === 'light' ? 'text-yellow-500 animate-move-up' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="border-amber-500 hidden md:block flex-rows mx-8 ">
                    <button className="border mx-2 border-gray-600 rounded-lg p-3 duration-100 hover:shadow-lg hover:shadow-amber-500  lg:visible hover:scale-105">
                        <Link to="https://github.com/neokd/DataStorehouse/forks">
                            Fork Count: {forkCount}
                        </Link>
                    </button>
                    <button className="border mx-2 border-gray-600 p-3 duration-100 rounded-lg hover:shadow-lg hover:shadow-amber-500  lg:visible hover:scale-105">
                        <Link to="https://github.com/neokd/DataStorehouse/stargazers">
                            Star Count: {starCount}
                        </Link>
                    </button>
                </div>

            </nav>
            {isMobileView && showModal && <Searchbar onClose={handleOnClose} visible={showModal} />}
        </div>
    );
}
export default Navbar;

