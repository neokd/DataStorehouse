import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { DataSetsData } from './DataSetData';

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState(null);
  const datasets = DataSetsData();

  const handleOnClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.keyCode === 75 && event.metaKey) {
        if (showModal) {
          setShowModal(false);
        } else {
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

  const toggleDropDown = (id) => {
    if (activeDropDown === id) {
      setActiveDropDown(null);
    } else {
      setActiveDropDown(id);
    }
  };
  
  return (
    <div>
      <aside id="logo-sidebar" className="fixed top-20 left-0 shadow-lg shadow-amber-600  w-72 h-screen  transition-transform -translate-x-full  sm:translate-x-0 border-r border-r-gray-600">
        <div className="h-full px-3 pt-4 inset-0 bg-customGray">
          <button className="mt-4 w-64" onClick={handleInputClick}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-gray-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 h-12 w-full border border-black-300 text-gray-900 text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block  pl-10 p-2.5  dark:bg-gray-700 dark:border-amber-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="Quick Search..." disabled />
              <div className="absolute inset-y-0 right-3 flex dark:text-white/70 items-center pl-3 pointer-events-none">
                &#8984; K
              </div>
            </div>
          </button>

          <div className="mt-4 text-white/80 ml-2">
            {datasets.map((domain) => (
              <div key={domain.domain}>
                <div className="border-l-2 text-white border-amber-500/75">
                  <button className="" onClick={() => toggleDropDown(domain.domain)}>
                    <span className="mx-4">{domain.domain}</span>
                  </button>
                </div>
                {activeDropDown === domain.domain && (
                  <div className="mx-4 my-2">
                    {domain.datasets.map((dataset) => (
                      <div key={dataset.id}>{dataset.title}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>



        </div>
      </aside>

      {showModal && <Searchbar onClose={handleOnClose} visible={showModal} />}
    </div>
  );
}

export default Sidebar;
