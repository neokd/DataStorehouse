// Import necessary dependencies and components
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTopButton from './ScrollToTopButton';
import Footer from './Footer';
import PageNavigation from './PageNavigation';
import OnThisPage from './OnThisPage';
import ReactGA from 'react-ga4';

/**
 * Component for displaying a dataset.
 */
function ShowDataset() {
  // Initialize Google Analytics
  ReactGA.initialize('G-HHN11Y3807');
  // Get the current location using the useLocation() hook
  const location = useLocation();
  // Get the navigation function using the useNavigate() hook
  const navigateTo = useNavigate();
  // 🗃️ Store the dataset data using the useState() hook
  const [data, setData] = useState([]);
  // State for copy success of domain URL
  const [copySuccessDomain, setCopySuccessDomain] = useState(false);
  // State for copy success of title
  const [copySuccessTitle, setCopySuccessTitle] = useState(false);
  // State for the selected title
  const [selectedTitle, setSelectedTitle] = useState('');

  /**
   * 🚀 Perform initialization on component mount using the useEffect() hook.
   */

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      easing: 'ease-in-out'
    });
  }, []);

  // Scroll to the selected title
  useEffect(() => {
    if (location.hash.startsWith('#')) {
      const element = document.getElementById(location.hash.substr(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [location.hash])

  // Fetch the dataset data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/database/datasets.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /**
   * 📝 Implement the following functions:
   * - handleCopyURL
   * - handleCopyTitle
   * - handleDownload
   * - activateCard
   * - getCurrentDomain
   * - getButtonAnalytics
   **/

  // Copy the domain URL to the clipboard
  const handleCopyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL);
    setCopySuccessDomain(true);
    setTimeout(() => {
      setCopySuccessDomain(false);
    }, 2000);
  };

  // Copy the title to the clipboard
  const handleCopyTitle = (title) => {
    const currentURL = window.location.href.split('#')[0] + '#' + title;
    navigator.clipboard.writeText(currentURL);
    setSelectedTitle(title);
    setCopySuccessTitle(true);
    setTimeout(() => {
      setCopySuccessTitle(false);
    }, 2000);
  };

  // Download the large dataset from external links
  const handleDownload = async (path, title) => {
    await fetch(path)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = title;
        link.click();
        window.URL.revokeObjectURL(url);
      }).catch((error) => {
        console.log('Failed to download file');
        console.log(error);
      })
  }

  // Activate the card when the title is clicked
  const activateCard = (title, id) => {
    navigateTo(`/datasets/${title}#${id}`)
  };

  // Get the current domain from the URL
  const getCurrentDomain = () => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/');
    const domain = pathSegments.length >= 3 ? pathSegments[2].replace(/%20/g, ' ') : '';
    return domain;
  };

  // Get the button analytics
  const getButtonAnalytics = () => {
    ReactGA.event({
      category: 'Button',
      action: 'Click',
      label: 'Download Dataset'
    });
  };

  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  const getIdFromUrl = location.hash.startsWith('#') ? location.hash.substring(1) : '';
  const filteredData = data.filter(
    (domain) => domain.domain.toLowerCase() === getCurrentDomain().toLowerCase()
  );

  // Render the JSX element
  return (
    <div>
      <div className='bg-gray-100 dark:bg-customGray  min-h-screen overflow-x-clip '>
        <Navbar />
        <Sidebar />
        <div className='container flex lg:flex-row flex-col relative lg:ml-72 dark:text-white pt-8 lg:pt-36 nunito lg:mx-4'>
          <div className='mx-4 md:mx-8 lg:mx-16 xl:mx-32'>
            <nav className='hidden md:block'>
              <ol className="inline-flex items-center text-xl font-semibold">
                {pathSegments.map((segment, index) => (
                  <li key={index}>
                    <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`} className="capitalize">
                      {segment.charAt(0).toUpperCase() + segment.slice(1).replace(/%20/g, ' ')}
                    </Link>
                    {index !== pathSegments.length - 1 && <span className="mx-1">/</span>}
                  </li>
                ))}
                {filteredData.length > 0 && (
                  <li className='line-clamp-1'>
                    <span className="mx-1">/</span>
                    <span className=''>
                      {filteredData[0].datasets.find((item) =>
                        decodeURIComponent(item.id) === decodeURIComponent(location.hash.substr(1)).replace(/%20/g, ' ')
                      )?.title}
                    </span>
                  </li>
                )}
              </ol>
            </nav>
            <div className='flex flex-col lg:flex-row'>
              {filteredData.map((domain) => (
                <div key={domain.domain}>
                  <div className='inline-flex'>
                    <h2 className='text-4xl font-semibold my-6 dark:text-white lg:mr-2'>{domain.domain}</h2>
                    <button
                      className="text-black dark:hover:text-gray-500 relative"
                      onClick={handleCopyURL}
                      onMouseEnter={() => setCopySuccessDomain(false)}>
                      {copySuccessDomain ? (
                        <span className="relative">
                          <span className="absolute z-10 transform translate-x-full -top-4 right-0 items-center px-2 py-1 text-sm font-semibold leading-none bg-gray-500/25 backdrop-blur dark:text-white rounded-md shadow-lg">
                            URL Copied!
                          </span>
                          <span className='text-4xl font-semibold my-6'>#</span>
                        </span>
                      ) : (
                        <span className='text-4xl font-semibold my-6'>#</span>
                      )}
                    </button>
                  </div>
                  <div className="">
                    {domain.datasets.map((item, index) => (
                      <div onClick={() => activateCard(domain.domain, item.id)} key={item.id} id={item.id} data-aos={index > 0 ? 'fade-up' : ''} data-aos-easing='linear' data-aos-duration='250' className={`scrollspy-section w-full lg:w-84 xl:w-144 2xl:w-180 drop-shadow-lg bg-white/75 dark:drop-shadow-none  dark:bg-white/10   my-4 hover:border-amber-200 rounded-2xl p-8 leading-10 ${getIdFromUrl === item.id ? 'shadow-md shadow-amber-500' : ''}`}>
                        <div className='flex justify-between'>
                          <Link to={`${item.githubPath}`} target='_blank' className='inline-flex'>
                            <h1 className='dark:text-white/90 text-3xl font-semibold mr-2'>{item.title}</h1>
                          </Link>
                          <button className='' onClick={() => handleCopyTitle(item.id)}>
                            {
                              copySuccessTitle && selectedTitle === item.id ?
                                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-green-600">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 opacity-20 hover:opacity-100 hover:stroke-amber-500 ">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>)
                            }
                          </button>
                        </div>
                        <p>
                          <Link target='_blank' to={"https://www.github.com/" + item.contributor}>
                            Contributor: <button className='text-lg pb-2'>{item.contributor}</button>
                          </Link>
                        </p>
                        <p className='text-lg line-clamp-2'>{item.description}</p>
                        <p className='text-md'>File Type: {Array.isArray(item.fileType) ? item.fileType.join(', ') : item.fileType}</p>
                        <p className='text-md'>Size: {item.size}</p>
                        <span className='flex flex-wrap justify-end lg:justify-between'>
                        <div className='flex flex-wrap justify-start lg:justify'>
                            {item.tag.map((tag) => (
                              <span
                                key={tag}
                                className='text-md font-bold bg-amber-500 rounded-full text-gray-900 py-1 mr-5 mb-5 lg:mr-2 lg:mb-2 px-2 lg:px-4 truncate'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          {
                            item.githubPath.match(/github.com/g) ? (
                              <button onClick={getButtonAnalytics}>
                                <Link to={item.githubPath} className=' ' target='_blank'>
                                  <div className='p-3 border-amber-500 rounded-full bg-amber-500 flex items-center '>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      viewBox='0 0 24 24'
                                      fill='none'
                                      stroke='currentColor'
                                      strokeWidth='2'
                                      strokeLinecap='round'
                                      strokeLinejoin='round'
                                      className='w-6 h-6 lg:w-8 lg:h-8'
                                    >
                                      <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                                      <path d='M9 18c-4.51 2-5-2-7-2'></path>
                                    </svg>
                                  </div>
                                </Link>
                              </button>
                            ) : (
                              <button className='' onClick={() => {
                                getButtonAnalytics()
                                handleDownload(item.githubPath, item.title)
                                }}>
                                <div className='p-3 border-amber-500 rounded-full bg-amber-500 '>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>

                                </div>
                              </button>
                            )
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <PageNavigation />
            <Footer />
          </div>
          <ScrollToTopButton />
        </div>

      </div>

    </div>
  )
}

export default ShowDataset
