import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const MoreProjects = lazy(() => import('./components/MoreProjects'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Gallery = lazy(() => import('./pages/Gallery'));
const UploadProject = lazy(() => import('./pages/UploadProject'));

function App() {
  return (
    <ReactLenis root>
      <Router>
        <Suspense fallback={<div className="min-h-screen bg-[#050505]" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/projects" element={<MoreProjects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contactpage" element={<ContactPage />} />
            <Route path="/upload-project" element={<UploadProject />} />
          </Routes>
        </Suspense>
      </Router>
    </ReactLenis>
  );
}

export default App;
