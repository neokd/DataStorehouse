// Import necessary components and libraries
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * @function Sidebar
 * @description This component is the sidebar component of the website.
 * @returns Sidebar component
*/

function Sidebar() {
  // To show or hide the modal
  const [showModal, setShowModal] = useState(false);
  // Visibility of the sidebar on mobile devices
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // State to hold the active dropdown items for the domain
  const [activeDropDown, setActiveDropDown] = useState([]);
  // State to hold the active domain
  const [activeDomain, setActiveDomain] = useState('');
  // State to hold the datasets
  const [datasets, setDatasets] = useState([]);
  // Navigate hook for redirection
  const navigateTo = useNavigate();
  // State to hold the active sidebar element
  const [sidebarElement, setSidebarElement] = useState(0);
  // To use the current location of the page
  const activeId = useLocation().hash.substr(1);
  // To get the id from the URL
  const getIdFromUrl = location.hash.startsWith('#') ? location.hash.substring(1) : '';
  
  // AOS library for animations on scroll
  useEffect(() => {
    AOS.init();
  }, []);

  // Using useEffect to fetch the data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/database/datasets.json');
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

  // Using useffect to handle keyboard shortcuts
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

  // using useeffect to store to store the active dropdown items for the domain
  useEffect(() => {
    if (activeId) {
      const domain = datasets.find((domain) =>
        domain.datasets.some((dataset) => dataset.id === activeId)
      );
      if (domain) {
        setActiveDropDown((activeDropDown) => [...activeDropDown, domain.domain]);
      }
    }
  }, [activeId, datasets]);

  // Navigate to the active domain
  useEffect(() => {
    if (activeDomain && !sidebarElement) {
      navigateTo(`/datasets/${activeDomain}`);
    }
  }, [activeDomain, sidebarElement, navigateTo]);

  // To set the active sidebar element from id 
  useEffect(() => {
    setSidebarElement(activeId);
    const domain = datasets.find((domain) =>
      domain.datasets.some((dataset) => dataset.id === activeId)
    );
    if (domain) {
      setActiveDropDown([domain.domain]);
    }
    if (activeId === getIdFromUrl) {
      setSidebarElement(getIdFromUrl);
    } else {
      setActiveDropDown([]);
    }
  }, [activeId, datasets, getIdFromUrl]);

  // To scroll to the active element 
  useEffect(() => {
    if (location.hash.startsWith('#')) {
      const element = document.getElementById(location.hash.substr(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  })

  // To show or hide the sidebar on mobile devices
  useEffect(() => {
    showSideBarMobileView();
    window.addEventListener('resize', showSideBarMobileView);
    return () => {
      window.removeEventListener('resize', showSideBarMobileView);
    };
  }, []);

  /**
   * List of functions to implement
   *  - toggleDomain
   * - handleInputClick
   * - toggleDropDown
   * - showSideBarMobileView
   * - handleOnClose
   */

  // Function to toggle the domain and navigate to the domain
  const toggleDomain = (domain, id) => {
    const domainUrl = domain.replace(/\s+/g, ' ').toLowerCase();
    if (id === null && domainUrl) {
      navigateTo(`/datasets/${domainUrl}`);
    } else if (id !== undefined) {
      navigateTo(`/datasets/${domainUrl}#${id}`);
      if (window.innerWidth < 768) {
        setSidebarVisible(false);
      }
    }
    setSidebarElement(id);
    setShowModal(false);
  };

  // Function to handle the input click
  const handleInputClick = () => {
    setShowModal(true);
    if (window.innerHeight < 768) {
      setSidebarVisible(false);
    }
  };
 
  // Function to toggle the dropdown
  const toggleDropDown = (id) => {
    if (activeDropDown.includes(id)) {
      setActiveDropDown(activeDropDown.filter((dropDownId) => dropDownId !== id));
    } else {
      setActiveDropDown([...activeDropDown, id]);
    }
    setActiveDomain();
  };

  // Function to show the sidebar on mobile devices
  const showSideBarMobileView = () => {
    if (window.innerWidth > 768) {
      setSidebarVisible(true);
      return;
    }
  };

  // Function to handle the close of the modal
  const handleOnClose = () => {
    setShowModal(false);
  };

  // Render the JSX Component
  return (
    <div className='flex'>
      {
        sidebarVisible && (
          <aside
            id="logo-sidebar"
            className="fixed inset-0 lg:top-20 left-0 pb-8  transition-all duration-300 lg:translate-x-0 dark:bg-opacity-10 bg-opacity-30 backdrop-blur-md z-10 bg-white/30 dark:bg-customGray/80 drop-shadow-lg dark:shadow-lg dark:lg:shadow-amber-500 lg:w-72 md:min-w-fit max-h-screen border-r border-r-gray-600"
          >

            <div className="h-full px-3  pt-4 inset-0 dark:bg-customGray/80 overflow-y-auto overflow-x-hidden ">
              <div className='flex flex-row'>

                <button className="lg:mt-4 w-full ml-4 lg:w-64" onClick={handleInputClick}>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 dark:stroke-gray-200"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-300 duration-300 h-12 w-full border border-black-300 placeholder-gray-900 text-lg rounded-lg focus:ring-amber-500 focus:border-amber-500 block  pl-10 p-2.5  dark:bg-gray-800 dark:border-amber-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                      placeholder="Quick Search..."
                      disabled
                    />
                    <div className="absolute  inset-y-0 right-3 flex dark:text-white/70 items-center pl-3 pointer-events-none">
                      &#8984; K
                    </div>
                  </div>
                </button>
                <button className="lg:hidden right-0 mx-4 lg:mt-2 bg-transparent backdrop-blur-lg rounded-lg p-2 lg:top-28 md:left-[18.5rem] z-10" onClick={() => setSidebarVisible(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2 dark:stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4 ml-2 text-gray-500 dark:text-white/70 ">
                {datasets.map((domain, index) => (
                  <div className="" key={domain.domain}>
                    <div className={`text-left text-gray-700 dark:text-white/80 my-1 text-lg`}>
                      {
                        index === 0 && (
                          <Link to='/datasets'>
                            <button className='mx-2 text-xl my-1 py-1 w-full text-left rounded-lg hover:text-amber-500 inline-flex justify-between transistion duration-200'>{domain.domain}</button>

                          </Link>
                        )
                      }
                      {index !== 0 && domain.datasets.length !== 0 && (
                        <button
                          className="mx-2 py-1 w-full text-left rounded-lg hover:text-amber-500 inline-flex justify-between transistion duration-200"
                          onClick={() => {
                            toggleDropDown(domain.domain);
                            toggleDomain(domain.domain, null);
                          }}
                        >
                          <span className="text-xl my-1 w-52 truncate ">{domain.domain}</span>
                          {activeDropDown.includes(domain.domain) ||
                            (sidebarElement || activeId) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-4 mr-6"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-4 mr-6"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    {activeDropDown.includes(domain.domain) && (
                      <div
                        className="mx-4 my-2 text-lg "
                      // data-aos="fade"
                      // data-aos-easing="linear"
                      // data-aos-duration="400"
                      >
                        {domain.datasets.map((dataset) => (
                          <div key={dataset.id} >
                            <button
                              className={`border-l-2 hover:text-amber-500 dark:hover:text-white my-1 text-start truncate w-52 ${dataset.id ===
                                sidebarElement || dataset.id === activeId
                                ? ' dark:text-white text-black  border-l-2 border-amber-500  py-2 '
                                : 'border-gray-500/75'
                                }`}
                              onClick={() => {
                                toggleDomain(domain.domain, dataset.id);
                              }}
                            >
                              <span className="mx-4 w-52 truncate">{dataset.title}</span>
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
        )
      }

      <div className='block '>
        {!sidebarVisible && (
          <div className='fixed  flex flex-col  top-[4rem] bg-transparent backdrop-blur-lg rounded-lg lg:top-28 z-10'>
            <button className="p-1" onClick={() => setSidebarVisible(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-2 dark:stroke-white"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
            <button className="p-1" onClick={handleInputClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-white stroke-2 mt-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

            </button>
          </div>
        )}
      </div>
      {showModal && <Searchbar onClose={handleOnClose} visible={showModal} />}
    </div >
  );
}

export default Sidebar;
