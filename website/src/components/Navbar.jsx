import { Link, useLocation } from "react-router-dom";
import useTheme from "../hooks/useTheme";

function Navbar() {
    const location = useLocation();
    const isActiveRoute = (route) => {
        return location.pathname === route;
    };

    const [nextTheme, setTheme] = useTheme()

    return (
        <div>
            <nav className="flex items-center justify-between flex-wrap fixed top-0 lg:h-24 z-40 w-full backdrop-blur flex-none transition-colors duration-500 bg-blur bg-customGray text-white border-b border-gray-700  ">
                <div className="mx-8 flex flex-rows ">
                    <div className={`lg:p-3 p-2 border-amber-500 hover:scale-105  duration-100 mx-2 rounded-lg ${isActiveRoute('/') ? 'bg-amber-500    duration-100 ' : 'hover:shadow-lg hover:shadow-amber-500'}`}>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 " >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                    </div>
                    <div className={`lg:p-3 p-2  border-amber-500 hover:scale-105  duration-100 mx-2 rounded-lg ${isActiveRoute('/datasets') ? 'bg-amber-500    duration-100 ' : 'hover:shadow-lg hover:shadow-amber-500'}`}>
                        <Link to="/datasets">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                            </svg>

                        </Link>
                    </div>
                    <div className={`lg:p-3 p-2 border-amber-500 hover:scale-105 duration-100 mx-2 rounded-lg ${isActiveRoute('/docs') ? 'bg-amber-500 duration-100' : 'hover:shadow-lg hover:shadow-amber-500'}`}>
                        <div className="group">
                            <Link to="/docs" onClick={(e) => e.preventDefault()} className="pointer-events-none hover:">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                            </Link>
                            <div className="dark:bg-gray-600/70 items-center rounded-lg shadow-md p-2 text-sm absolute top-full hidden group-hover:block dark:text-white/80">
                                <p className="whitespace-nowrap">Coming Soon...</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-r border-white mx-2 my-1" />
                    <div className={`p-3  border-amber-500 hover:scale-105 duration-100 mx-2 rounded-lg hover:shadow-lg hover:shadow-amber-500 }`}>
                        <Link to="https://github.com/neokd/DataBucket" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        </Link>
                    </div>
                    <div className="border border-r border-white mx-2 my-1" />
                    <div className='lg:p-3 p-2  border-gray-500  duration-100 mx-2 rounded-lg border  flex '>

                        <button onClick={nextTheme === 'light' ? () => setTheme(nextTheme) : null} className={`${nextTheme === 'dark' ? 'text-amber-400' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        </button>
                        <div className="border border-r border-white mx-3 my-1" />
                        <button onClick={nextTheme === 'dark' ? () => setTheme(nextTheme) : null} className={`${nextTheme === 'light' ? 'text-yellow-500' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="border-amber-500 flex-rows mx-8 duration-100 rounded-lg hover:shadow-lg hover:shadow-amber-500 hover:scale-105">
                    <button disabled className="border border-gray-600 rounded-lg p-3">
                        Fork Count: 1
                    </button>
                </div>

            </nav>
        </div>
    );
}
export default Navbar;

