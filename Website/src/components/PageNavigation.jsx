import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function PageNavigation() {
  const location = useLocation();
  const [datasets, setDatasets] = useState([]);

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
  
  const currentDomain = location.pathname.split('/')[2]?.replace(/%20/g, ' ');
  const currentDomainIndex = datasets.findIndex(dataset => currentDomain !== undefined ? dataset.domain.toLowerCase() === currentDomain.toLowerCase() : 0);
  const previousDomain = datasets[currentDomainIndex - 1]?.domain;
  const nextDomain = currentDomainIndex === -1 ?  datasets[currentDomainIndex + 2]?.domain : datasets[currentDomainIndex + 1]?.domain
  
  return (
    <div className="my-16">
      <div className="flex text-white justify-between">
        {previousDomain && (
          <Link
            to={currentDomainIndex === 1 ? '/datasets' : `/datasets/${previousDomain}`}
            rel="noopener noreferrer"
            className="bg-amber-500 text-white font-bold py-3 px-6 mr-4 lg:mr-0 rounded-full hover:scale-105 duration-300 shadow-lg inline-flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {previousDomain}
          </Link>
        )}
        {nextDomain && (
          <Link
            to={`/datasets/${nextDomain}`}
            rel="noopener noreferrer"
            className="bg-amber-500 text-white font-bold py-3 px-6 rounded-full hover:scale-105 duration-300 shadow-lg inline-flex">
            {nextDomain}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}

export default PageNavigation;
