import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Dataset() {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/src/utils/datasets.json');
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

  useEffect(() => {
    const datasetId = location.hash.substr(1);
    if (datasetId) {
      const datasetCard = document.getElementById(datasetId);
      if (datasetCard) {
        datasetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        datasetCard.style.scrollMarginTop = '8rem';
      }
    }
  }, [location]);

  return (
    <div >
      <div className='dark:bg-customGray min-h-screen pb-24 overflow-x-hidden'>
        <Navbar />
        <div className='container lg:mx-24 relative lg:ml-84 mx-4'>
          <Sidebar />
          <div className='dark:text-white lg:pt-36 nunito lg:w-[56rem] '>
            {data.map((domain) => (
              <div key={domain.domain}>
                <h2 className='text-2xl font-semibold my-4'>{domain.domain}</h2>
                {domain.datasets.map((item) => (
                  <div key={item.id} id={item.id}>
                    <div
                      className={`bg-gray-300/80 dark:bg-black/25 my-4  hover:border-amber-200 rounded-2xl p-8 leading-10 ${location.hash.substr(1) === item.id ? 'shadow-md dark:shadow-amber-500' : ''
                        }`}
                    >
                      <Link to={`${item.githubPath}`} target='_blank'>
                        <h1 className='dark:text-white/90 text-3xl  font-semibold'>{item.title}</h1>
                      </Link>
                      <p className='pb-2'>Contributor: {item.contributor}</p>
                      <p className='text-lg'>{item.description}</p>
                      <p className='text-md'>Size: {item.size}</p>
                      <span className='flex justify-between'>
                        <span className='justify-start'>
                          {item.tag.map((tag) => (
                            <span
                              key={tag}
                              className='text-sm font-semibold bg-amber-500 rounded-full  text-white/90 px-2 py-1 mr-2'
                            >
                              {tag}
                            </span>
                          ))}
                        </span>
                        <button className='bg-amber-500 p-2 lg:visible hidden rounded-full hover:scale-105'>
                          <Link to={`${item.path}`} target='_blank' className='justify-end'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              className='w-6 h-6 '
                            >
                              <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'></path>
                              <path d='M9 18c-4.51 2-5-2-7-2'></path>
                            </svg>
                          </Link>
                        </button>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dataset;
