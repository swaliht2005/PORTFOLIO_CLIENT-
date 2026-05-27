import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import MoreProjects from './components/MoreProjects';
import ContactPage from './pages/ContactPage';
import Gallery from './pages/Gallery';
import UploadProject from './pages/UploadProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<MoreProjects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contactpage" element={<ContactPage />} />
        <Route path="/upload-project" element={<UploadProject />} />
      </Routes>
    </Router>
  );
}

export default App;