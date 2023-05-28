import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { DataSetsData } from './DataSetData';
import { Link, useNavigate } from 'react-router-dom';

function Searchbar({ visible, onClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const datasets = DataSetsData();
    const navigateTo = useNavigate();

    // let storedSearches = localStorage.getItem('recentSearches');
    // if (storedSearches === null) {
    //     storedSearches = '[]';
    // }

    const topics = datasets.flatMap((dataset) =>
        dataset.datasets.map((data) => data.title)
    );
    const abbreviationMapping = generateAbbreviationMapping(topics);

    const fuseOptions = {
        includeScore: true,
        threshold: 0.4,
        keys: ['title'],
    };

    const fuse = new Fuse(
        datasets.flatMap((dataset) => dataset.datasets),
        fuseOptions
    );

    const searchInputRef = useRef(null);

    useEffect(() => {
        const storedSearches = getRecentSearches();
        setRecentSearches(storedSearches);
    }, []);

    useEffect(() => {
        if (visible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [visible]);

    const handleSearchQueryChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const results = searchTopics(query);
        setSearchResults(results);
        const updatedRecommendations = getRecommendations(recentSearches, query);
        setRecommendations(updatedRecommendations);
        if (query.length !== 0 && results.length === 0) {
            setShowErrorMessage(true);
        }
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (!recentSearches.includes(searchQuery)) {
          const updatedRecentSearches = [
            searchQuery,
            ...recentSearches.filter((s) => s !== searchQuery).slice(0, 4),
          ];
          setRecentSearches(updatedRecentSearches);
          const updatedRecommendations = getRecommendations(
            updatedRecentSearches,
            searchQuery
          );
          setRecommendations(updatedRecommendations);
          localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
        }
      
        if (searchResults.length > 0) {
          const dataset = datasets
            .flatMap((domain) => domain.datasets)
            .find((data) => data.title === searchResults[0]);
          if (dataset && dataset.id) {
            redirectToDataset(dataset.id);
            onClose();
          }
        }
      };
      
    const searchTopics = (query) => {
        if (!query) return [];
        const fullForm = abbreviationMapping[query.toUpperCase()];
        if (fullForm) {
            return [fullForm];
        }
        const searchResults = fuse.search(query);
        const filteredTopics = searchResults.map((result) => result.item.title);
        setShowErrorMessage(filteredTopics.length === 0 && query.length !== 0);
        return filteredTopics.slice(0, 10);
    };

    const getRecentSearches = () => {
        const storedSearches = localStorage.getItem('recentSearches');
        return storedSearches ? JSON.parse(storedSearches) : [];
    };

    const handleRecentSearchClick = (search) => {
        setSearchQuery(search);
        setSearchResults(searchTopics(search));
        const updatedRecommendations = getRecommendations(recentSearches, search);
        setRecommendations(updatedRecommendations);
    };

    const handleRecommendationClick = (recommendation) => {
        setSearchQuery(recommendation);
        setSearchResults(searchTopics(recommendation));
        const updatedRecommendations = getRecommendations(
            recentSearches,
            recommendation
        );
        setRecommendations(updatedRecommendations);
    };

    const getRecommendations = (searches, query) => {
        const recommendations = datasets
            .flatMap((domain) => domain.datasets.map((dataset) => dataset.title))
            .filter((topic) => topic.toLowerCase().includes(query.toLowerCase()));
        return recommendations.slice(0, 3);
    };

    function generateAbbreviationMapping(topics) {
        const mapping = {};
        topics.forEach((topic) => {
            const words = topic.split(' ');
            let abbreviation = '';
            words.forEach((word) => {
                abbreviation += word.charAt(0);
            });
            abbreviation = abbreviation.toUpperCase();
            mapping[abbreviation] = topic;
        });
        return mapping;
    }

    const redirectToDataset = (dataset) => {
        navigateTo(`/datasets#${dataset}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='fixed inset-0 -top-[32rem] bg-opacity-10 backdrop-blur-md flex justify-center items-center'>
            <div className='flex flex-row fixed'>
                <div className='relative w-[42rem] '>
                    <div className='absolute  dark:text-white inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                            />
                        </svg>
                    </div>
                    <input
                        type='text'
                        className='w-full h-12 px-10 py-2 text-lg text-gray-900 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-amber-500'
                        placeholder='Search Dataset'
                        value={searchQuery}
                        ref={searchInputRef}
                        onChange={handleSearchQueryChange}
                        onKeyDown={handleKeyDown}
                        required
                    />
                </div>
                <button
                    onClick={onClose}
                    className='p-2.5 h-12 ml-2 text-md font-bold text-white/90 bg-amber-500 rounded-lg'
                >
                    esc
                </button>

                <div className='absolute mt-12 w-[42rem]'>
                    { searchResults.length>0 ? (
                        searchResults.map((result) => {
                            
                            const dataset = datasets
                                .flatMap((domain) => domain.datasets)
                                .find((data) => data.title === result);
                            if (dataset) {
                                return (
                                    <li
                                        key={dataset.id}
                                        className='first:mt-2 list-none bg-gray-200 dark:bg-gray-800 dark:text-gray-100 divide-y divide-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer'
                                        onClick={() => redirectToDataset(dataset.id)}
                                    >
                                        {result}
                                    </li>
                                );
                            }

                            return null;
                        })
                    ) : showErrorMessage ? (
                        <div className='mt-2 list-none bg-gray-200 dark:bg-gray-800 dark:text-gray-100 divide-y divide-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
                            <Link
                                to='https://github.com/neokd/DataBucket'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Oops! Dataset not found, would you like to contribute? ❤️
                            </Link>
                        </div>
                    ) : null}

                    {recentSearches.length > 0 && (
                        <div className='mt-4 mx-2'>
                            <h3 className='text-lg dark:text-gray-100 font-bold mb-2'>
                                Recent Searches
                            </h3>
                            <ul className='flex flex-wrap gap-2'>
                                {recentSearches.map((search) => (
                                    <li
                                        key={search}
                                        className='px-3 py-1 font-semibold dark:bg-amber-500 dark:text-white/90 text-black bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300'
                                        onClick={() => handleRecentSearchClick(search)}
                                    >
                                        {search}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {recommendations.length > 0 && (
                        <div className='mt-4 mx-2'>
                            <h3 className='text-lg dark:text-gray-100 font-bold mb-2'>
                                Recommendations
                            </h3>
                            <ul className='flex flex-wrap gap-2'>
                                {recommendations.map((recommendation) => (
                                    <li
                                        key={recommendation}
                                        className='px-3 py-1 font-semibold dark:bg-amber-500 dark:text-white/90 text-black bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300'
                                        onClick={() => handleRecommendationClick(recommendation)}
                                    >
                                        {recommendation}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Searchbar;
