import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PageNavigation() {
    const [datasets, setDatasets] = useState([]);
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
    const currentDomain = window.location.pathname.split('/')[2];
    const currentDomainIndex = datasets.findIndex((dataset) => dataset.domain === currentDomain);
    const previousDomain = datasets[currentDomainIndex - 1]?.domain;
    const nextDomain = datasets[currentDomainIndex + 1]?.domain;

    return (

        <div className="my-16 ">
            <div className="flex text-white justify-between lg:flex-cols flex-row">
                {
                    previousDomain && (
                        <Link to={currentDomainIndex === 1 ? '/datasets' : `/datasets/${previousDomain}`}
                            rel="noopener noreferrer"
                            className="bg-amber-500 text-white font-bold py-3 p-1 lg:px-6 rounded-full hover:scale-105 duration-300 shadow-lg inline-flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                            {previousDomain}
                        </Link>
                    )
                }
                {
                    nextDomain && (
                        <Link to={`/datasets/${nextDomain}`}
                            rel="noopener noreferrer"
                            className="bg-amber-500 text-white font-bold py-3 lg:px-6 p-1 rounded-full inline-flex shadow-lg">
                            {nextDomain} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 stroke-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>

                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default PageNavigation;
