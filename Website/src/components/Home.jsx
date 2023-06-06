import Navbar from './Navbar';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Footer from './Footer';

function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleOnClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.keyCode === 75 && event.metaKey) {
                if(showModal){
                    setShowModal(false);
                }
                else {
                    setShowModal(true);
                }
            }
            if (event.keyCode === 27) {
                setShowModal(false);
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [showModal]);

    const handleInputClick = () => {
        setShowModal(true);
    };

    return (
        <div className='scroll-smooth min-h-screen  dark:bg-customGray'>
            <Navbar />
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute top-36 bg-amber-500 left-56"></div>
                <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute top-36 bg-white left-48"></div>
                <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute bottom-28 bg-amber-500 right-28"></div>
                <div className="w-16 h-16 blur rounded-full animate-blob transition delay-500 absolute bottom-24 bg-white right-24"></div>
                <h1 className="dark:text-white text-7xl font-bold roboto ">
                   <span className=''>Data</span><span className="text-amber-500">Bucket</span>
                </h1>
                <button className='mt-4' onClick={handleInputClick}>
                    <div className="relative w-72 lg:w-[23rem] ">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </div>
                        <input type="text"  className="bg-gray-50   h-12 w-full border border-black-300 text-gray-900 text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-amber-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-amber-500" placeholder="Quick Search..." disabled />
                        <div className="absolute inset-y-0 right-3 flex dark:text-white/70 items-center pl-3 pointer-events-none">
                            &#8984; K
                        </div>
                    </div>
                </button>
                <span className="dark:text-white text-xl py-4 nunito font-semibold w-96">
                    A open-source project that aims to create a collaborative platform for gathering and sharing a wide variety of datasets.
                </span>
            </div>
            <Footer/>
            {showModal && <Searchbar onClose={handleOnClose} visible={showModal} />}
        </div>
    );
}

export default Home;
