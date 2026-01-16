
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import ReadingTest from './pages/ReadingTest';
import AudioTest from './pages/AudioTest';
import HandwritingTest from './pages/HandwritingTest';
import Scorecard from './pages/Scorecard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test/reading" element={<ReadingTest />} />
          <Route path="/test/audio" element={<AudioTest />} />
          <Route path="/test/handwriting" element={<HandwritingTest />} />
          <Route path="/scorecard" element={<Scorecard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
