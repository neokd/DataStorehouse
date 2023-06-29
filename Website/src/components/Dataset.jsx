// Import necessary components and libraries
import Footer from './Footer';
import Navbar from './Navbar';
import PageNavigation from './PageNavigation';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

/**
 * @function Dataset
 * @description This component is the dataset/intial page of the website.
 * @returns Dataset component
 */
function Dataset() {
  // Data for features section
  const data = [
    {
      feature: "Contributing",
      icon: "✅",
      description: "Easily contribute your own datasets to the DataStoreHouse repository.",
    },
    {
      feature: "Discover",
      icon: "🔍🌐",
      description: "Explore a wide range of datasets across different domains.",
    },
    {
      feature: "Collaborate",
      icon: "🤝💡",
      description: "Connect with other users and collaborate on dataset projects.",
    },
    {
      feature: "Search",
      icon: "🔎",
      description: "Quickly find datasets using the powerful search functionality.",
    },
    {
      feature: "Tagging",
      icon: "🏷️",
      description: "Categorize and organize datasets using tags.",
    },
  ];

  // Render the JSX element
  return (
    <div>
      <div className="dark:bg-customGray flex flex-col min-h-screen overflow-x-clip">
        <Navbar />
        <Sidebar />
        <div className="container dark:text-white lg:mx-24 relative  md:pt-28 lg:pt-36 nunito mx-4 w-11/12 lg:w-8/12 lg:ml-84">
          <div className='mx-4'>
            <h2 className="text-4xl lg:text-5xl font-bold my-6">
              Getting <span className="text-amber-500">Started</span> 🚀
            </h2>
            <div className="h-[1px] mb-8 bg-white"></div>
            <p className="text-2xl">
              DataStoreHouse is an open-source project that aims to create a collaborative platform for gathering and sharing a wide variety of datasets. It provides a centralized repository where individuals and organizations can contribute, discover, and collaborate on diverse datasets for various domains.
            </p>
            <h2 className="text-4xl font-bold my-6">Features</h2>
            <ul className="text-xl ml-4">
              {data.map((item) => (
                <li className="py-2 flex items-center" key={item.feature}>
                  <span className="text-xl pr-4">{item.icon}</span>
                  <span className="text-2xl">
                    <span className="dark:text-white font-bold border-b-2 border-amber-500">{item.feature}</span> : {item.description}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <h2 className="text-4xl font-bold my-6">Want to Contribute?</h2>
              <div className="flex items-start justify-start">
                <div className="flex flex-cols">
                  <a
                    href="https://github.com/neokd/DataStoreHouse/blob/main/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 text-white font-bold py-3 px-6 rounded-full shadow-lg"
                  >
                    Go to Github
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-4xl font-bold my-6">License</h2>
              <p className="text-2xl">
                DataStoreHouse is released under the <Link className='border-b-2 border-amber-500' target='_blank' to="https://github.com/neokd/DataStoreHouse/blob/Website/LICENSE.md">MIT license.</Link>
              </p>
            </div>
            <div>
              <PageNavigation />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Dataset;
