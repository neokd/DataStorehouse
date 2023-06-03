import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Docs from './components/Docs';
import ShowDataset from './components/ShowDataset';
import Error from './components/Error';
import Dataset from './components/Dataset';

function App() {
  const underConstruction = false;
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
