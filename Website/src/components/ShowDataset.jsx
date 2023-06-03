import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ScrollToTopButton from './ScrollToTopButton';
import Footer from './Footer';

function ShowDataset() {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/datasets.json');
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

  const getCurrentDomain = () => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/');
    const domain = pathSegments.length >= 3 ? pathSegments[2].replace(/-/g, ' ') : '';

    return domain;
  };
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  const filteredData = data.filter(
    (domain) => domain.domain.toLowerCase() === getCurrentDomain().toLowerCase()
  );

  return (
    <div>
      <div className='dark:bg-customGray flex flex-col min-h-screen lg:overflow-x-clip '>
        <Navbar />
        <div className='container lg:mx-24 relative lg:ml-84'>
          <Sidebar />
          <div className='dark:text-white pt-28 lg:pt-36 nunito w-full mx-4 lg:w-[56rem]  '>

            <nav>
              <ol className="inline-flex items-center text-lg ">
                {pathSegments.map((segment, index) => (
                  <li key={index}>
                    <span className=" ">
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      {index !== pathSegments.length - 1 && <span className="mx-1">/</span>}
                    </span>
                  </li>
                ))}
              </ol>
            </nav>

            {filteredData.map((domain) => (
              <div key={domain.domain}>
                <div>
                  <h2 className='text-4xl font-semibold my-6'>{domain.domain}</h2>
                  {domain.datasets.map((item) => (
                    <div
                      key={item.id}
                      id={item.id}
                      data-aos='fade-up'
                      data-aos-easing='linear'
                      data-aos-duration='400'
                    >
                      <div
                        className={`bg-gray-300/80 dark:bg-white/10 my-4 hover:border-amber-200 rounded-2xl p-8 leading-10 ${location.hash.substr(1) === item.id ? 'shadow-sm dark:shadow-amber-500' : ''
                          }`}
                      >
                        <Link to={`${item.githubPath}`} target='_blank'>
                          <h1 className='dark:text-white/90 text-3xl font-semibold'>{item.title}</h1>
                        </Link>
                        <p className='pb-2'>Contributor: {item.contributor}</p>
                        <p className='text-lg line-clamp-2'>{item.description}</p>
                        <p className='text-md'>File Type: {Array.isArray(item.fileType) ? item.fileType.join(', ') : item.fileType}</p>
                        <p className='text-md'>Size: {item.size}</p>
                        <span className='flex justify-between'>
                          <span className='justify-start'>
                            {item.tag.map((tag) => (
                              <span
                                key={tag}
                                className='text-sm font-semibold bg-amber-500 rounded-full text-white/90 px-2 py-1 mr-2'
                              >
                                {tag}
                              </span>
                            ))}
                          </span>
                          <button>
                            <Link to={item.githubPath} className='bg-amber-500 ' target='_blank'>
                              <div className='p-3 border-amber-500 rounded-full bg-amber-500 '>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  stroke='currentColor'
                                  strokeWidth='2'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  className='w-6 h-6'
                                >
                                  <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                                  <path d='M9 18c-4.51 2-5-2-7-2'></path>
                                </svg>
                              </div>
                            </Link>
                          </button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <ScrollToTopButton />
          </div>
        </div>
        <Footer />
      </div>

    </div>
  );
}

export default ShowDataset;
