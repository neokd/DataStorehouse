// Import necessary components and libraries
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * @function PageNavigation
 * @description This component is the page navigation component of the website.
 * @returns PageNavigation component
 * */
function PageNavigation() {
  // To get the current location
  const location = useLocation();
  // State to hold the datasets
  const [datasets, setDatasets] = useState([]);
  // Using useEffect to fetch the datasets from the database
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
  // To get the current domain from the URL
  const currentDomain = location.pathname.split('/')[2]?.replace(/%20/g, ' ');
  // To get the index of the current domain
  const currentDomainIndex = datasets.findIndex(dataset => currentDomain !== undefined ? dataset.domain.toLowerCase() === currentDomain.toLowerCase() : 0);
  // To get the previous and next domain
  const previousDomain = datasets[currentDomainIndex - 1]?.domain;
  // To get the next domain
  const nextDomain = currentDomainIndex === -1 ?  datasets[currentDomainIndex + 2]?.domain : datasets[currentDomainIndex + 1]?.domain
  // Return the JSX component
  return (
    <div className="my-16">
      <div className="flex text-white justify-between mx-4">
        {previousDomain && (
          <Link
            to={currentDomainIndex === 1 ? '/datasets' : `/datasets/${previousDomain}`}
            rel="noopener noreferrer"
            className="dark:bg-amber-500 border-2 lg:text-lg border-amber-500 text-gray-900 font-bold py-3 px-3 lg:px-6 mr-4 lg:mr-0 rounded-full hover:scale-105 duration-300 shadow-lg inline-flex">
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
            className="dark:bg-amber-500 border-2 lg:text-lg border-amber-500 text-gray-900 font-bold py-3 px-3 lg:px-6 rounded-full hover:scale-105 duration-300 shadow-lg inline-flex">
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
