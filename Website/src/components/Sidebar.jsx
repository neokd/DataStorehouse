import { useState,useEffect } from 'react';
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const navigateTo = useNavigate();
  const [sidebarElement, setSidebarElement] = useState(0);

  const handleOnClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/datasets.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setDatasets(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
    setTimeout(() => {
    if (activeDropDown.includes(id)) {
      setActiveDropDown(activeDropDown.filter((dropDownId) => dropDownId !== id));
    } else {
      setActiveDropDown([...activeDropDown, id]);
    }
  },150);
  };

  const redirectToCard = (id) => {
    navigateTo(`/datasets#${id}`);
    setSidebarElement(id)
    setShowModal(false);
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
  }

  return (
    <div>
      <aside id="logo-sidebar" className="fixed top-20 left-0 shadow-lg  lg:shadow-amber-600  w-72 h-screen transition-transform -translate-x-full  lg:translate-x-0 border-r border-r-gray-600">
        <div className="h-full px-3 pt-4 inset-0 bg-customGray">
          <button className="mt-4 w-64" onClick={handleInputClick}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:stroke-gray-200">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 h-12 w-full border border-black-300 text-gray-900 text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block  pl-10 p-2.5  dark:bg-gray-800 dark:border-amber-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="Quick Search..." disabled />
              <div className="absolute inset-y-0 right-3 flex dark:text-white/70 items-center pl-3 pointer-events-none">
                &#8984; K
              </div>
            </div>
          </button>

          <div className="mt-4 text-white/70 ml-2 " >
            {datasets.map((domain) => (
              <div className='' key={domain.domain} >
                <div className={`border-l-2 text-white my-1  ${activeDropDown.includes(domain.domain) && domain.datasets.map((dataset) => {
                  dataset.id === sidebarElement
                }) ? 'font-semibold border-l-2 border-amber-500' : 'border-gray-500/75'}`}>
                  <button className='mx-2 py-1 w-full text-left rounded-lg hover:text-amber-500 inline-flex justify-between transistion duration-200' onClick={() => toggleDropDown(domain.domain)}>
                    <span className="mx-4">{domain.domain}</span>
                    {
                      activeDropDown.includes(domain.domain) && domain.datasets.map((dataset) => {
                        dataset.id === sidebarElement
                      }) ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4 mr-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-4 mr-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    }
                  </button>
                </div>
                {
                  activeDropDown.includes(domain.domain) && (
                    <div className="mx-4 my-2 ">
                      {domain.datasets.map((dataset) => (
                        <div key={dataset.id}>
                          <button className={`border-l-2  hover:text-white my-1 text-start truncate w-52 ${dataset.id === sidebarElement ? ' text-white border-l-2 border-amber-500 font-semibold py-2 ' : 'border-gray-500/75'}`} onClick={() => redirectToCard(dataset.id)}>
                            <span className="mx-4">{truncateText(dataset.title, 52)}</span>
                          </button>
                        </div>
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