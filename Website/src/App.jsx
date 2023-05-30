import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Docs from './components/Docs';
import Dataset from './components/Dataset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datasets" element={<Dataset/>} />
        <Route path="/docs" element={<Docs/>} />
      </Routes>
    </Router>
  );
}
export default App
