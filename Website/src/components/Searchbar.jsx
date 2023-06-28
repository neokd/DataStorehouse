// Import necessary components and libraries
import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { Link, useNavigate } from 'react-router-dom';

/**
 * @function Searchbar
 * @description This component is the searchbar component of the website.
 * @param {Object} visible - The visible object
 * @param {Object} onClose - The onClose object
 * @returns Searchbar component
 */

function Searchbar({ visible, onClose }) {
    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');
    // State to hold the search results
    const [searchResults, setSearchResults] = useState([]);
    // State to hold the recent searches
    const [recentSearches, setRecentSearches] = useState([]);
    // State to hold the recommendations
    const [recommendations, setRecommendations] = useState([]);
    // State to hold the error message
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    // State to hold the datasets
    const [datasets, setDatasets] = useState([]);
    // State to hold the selected result index
    const [selectedResultIndex, setSelectedResultIndex] = useState(0);
    // Navigate hook for redirection
    const navigateTo = useNavigate();

    // let storedSearches = localStorage.getItem('recentSearches');
    // if (storedSearches === null) {
    //     storedSearches = '[]';
    // }

    // fetch the datasets from the json file
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

    // Variable to hold the title of the dataset i.e the topic from the datasets json file
    const topics = datasets.flatMap((dataset) =>
        dataset.datasets.map((data) => data.title)
    );
    // Variable to hold the abbreviation mapping
    const abbreviationMapping = generateAbbreviationMapping(topics);
    // Fuse options for the search functionality includes the score, threshold and keys to be searched.
    const fuseOptions = {
        includeScore: true,
        threshold: 0.4,
        keys: ['title', 'tag', 'description', 'contributor', 'domain'],
    };

    // Fuse object to search the topics using the fuse options and the topics array
    const fuse = new Fuse(
        datasets.flatMap((dataset) =>
            dataset.datasets.map((data) => ({
                title: data.title,
                tag: data.tag,
                description: data.description,
                contributor: data.contributor,
                domain: dataset.domain,
            }))
        ),
        fuseOptions
    );
    // Reference to the search input
    const searchInputRef = useRef(null);
    // Reference to the search results amd get recent searches   
    useEffect(() => {
        const storedSearches = getRecentSearches();
        setRecentSearches(storedSearches);
    }, []);
    // focus on the search input when the searchbar is visible
    useEffect(() => {
        if (visible && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [visible]);
    //Use emoji 
    /** 
     * List of functions to implement 📝 :
     *  - handleSearchQueryChange
     * - handleSearch
     * - redirectToDataset
     * - searchTopics
     * - getRecentSearches
     * - handleRecentSearchClick
     * - handleRecommendationClick
     * - getRecommendations
     * - generateAbbreviationMapping
     * - handleKeyDown
     */

    // Function to handle the search query change from the search input and update the search results, recommendations and error message
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
    // Function to handle the search and update the recent searches and recommendations
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
            localStorage.setItem(
                'recentSearches',
                JSON.stringify(updatedRecentSearches)
            );
        }

        if (searchResults.length > 0) {
            const selectedResult = searchResults[selectedResultIndex];
            const dataset = datasets
                .flatMap((domain) => domain.datasets)
                .find((data) => data.title === selectedResult);
            if (dataset && dataset.id) {
                redirectToDataset(dataset.domain, dataset.id);
                onClose();
            }
        }
    };

    // Function to redirect to the dataset based on the domain and dataset id
    const redirectToDataset = (domain, datasetId) => {
        const dataset = datasets.find((data) =>
            data.datasets.some((dataset) => dataset.id === datasetId)
        );
        if (dataset) {
            navigateTo(`/datasets/${dataset.domain}#${datasetId}`);
            onClose()
        } else {
            console.error('Dataset not found');
        }
    };
    
    // Function to search the topics based on the query and return the filtered topics
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

    // Function to get the recent searches from the local storage
    const getRecentSearches = () => {
        const storedSearches = localStorage.getItem('recentSearches');
        return storedSearches ? JSON.parse(storedSearches) : [];
    };

    // Function to handle the click on the recent search and update the search query, search results and recommendations
    const handleRecentSearchClick = (search) => {
        setSearchQuery(search);
        setSearchResults(searchTopics(search));
        const updatedRecommendations = getRecommendations(recentSearches, search);
        setRecommendations(updatedRecommendations);
    };

    // Function to handle the click on the recommendation and update the search query, search results and recommendations
    const handleRecommendationClick = (recommendation) => {
        setSearchQuery(recommendation);
        setSearchResults(searchTopics(recommendation));
        const updatedRecommendations = getRecommendations(
            recentSearches,
            recommendation
        );
        setRecommendations(updatedRecommendations);
    };

    // Function to get the recommendations based on the recent searches and query
    const getRecommendations = (searches, query) => {
        const recommendations = datasets
            .flatMap((domain) => domain.datasets.map((dataset) => dataset.title))
            .filter((topic) => topic.toLowerCase().includes(query.toLowerCase()));
        return recommendations.slice(0, 3);
    };

    // Function to generate the abbreviation mapping for the topics using the first letter of each word 
    // Example: "Covid-19" -> "C19"
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

    // Function to handle the key down event on the search input and update the selected result index
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSelectedResultIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
            );
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setSelectedResultIndex((prevIndex) =>
                prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
            );
        }
    };

    // Render the JSX Component
    return (
        <div className='fixed inset-0 -top-[32rem] z-10 dark:bg-opacity-10 bg-opacity-30 backdrop-blur-md flex justify-center items-center'>
            <div className='flex flex-row fixed'>
                <div className='relative  lg:w-[42rem] '>
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
                        className='md:w-full h-12 px-12 py-2 text-lg text-gray-900 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-amber-500'
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

                <div className='absolute mt-12 lg:w-[42rem]'>
                    {searchResults.length > 0 ? (
                        searchResults.map((result, index) => {
                            const isSelected = index === selectedResultIndex;

                            const dataset = datasets
                                .flatMap((domain) => domain.datasets)
                                .find((data) => data.title === result);
                            if (dataset) {
                                return (
                                    <li
                                        key={dataset.id}
                                        className={`first:mt-2 list-none dark:text-gray-100 divide-y divide-gray-300 px-4 py-2 rounded-lg cursor-pointer ${isSelected ? 'bg-amber-500 dark:bg-amber-500' : 'bg-gray-200 dark:bg-gray-800 '
                                            }`}
                                        onClick={() => redirectToDataset(result, dataset.id)}
                                        onKeyDown={() => redirectToDataset(result, dataset.id)}
                                    >
                                        {result}
                                    </li>
                                );
                            }

                            return null;
                        })
                    ) : showErrorMessage ? (
                        <div className='mt-2 list-none bg-amber-500 dark:text-gray-100 divide-y divide-gray-300 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer'>
                            <Link
                                to='https://github.com/neokd/DataBucket'
                                target='_blank'
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
