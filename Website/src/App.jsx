// Main App component
// Import necessary components and libraries
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Docs from './components/Docs';
import ShowDataset from './components/ShowDataset';
import Error from './components/Error';
import Dataset from './components/Dataset';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

/**
 * @function App
 * @description This component is the main App component of the website.
 * @returns App component
*/
function App() {
  // Using useEffect to initialize Google Analytics
  useEffect(() => {
    ReactGA.initialize('G-HHN11Y3807');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname })
  }, []);
  // To check if the page is under construction
  const underConstruction = false;
  // Return the App component
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datasets" element={<Dataset/>} />
        <Route path="/datasets/*" element={<ShowDataset/>} />
        <Route  path="/docs" element={underConstruction ? <Docs/> : <Error/>} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  );
}
export default App
