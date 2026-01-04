import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import AddProject from './pages/Admin/AddProject';
import Profile from './pages/Admin/Profile';
import AllPages from './pages/Admin/AllPages';
import ProtectedRoute from './components/ProtectedRoute';
import EditProject from './pages/Admin/EditProject.jsx';
import MoreProjects from './components/MoreProjects.jsx';
import ContactPage from './pages/ContactPage.jsx'
function App() {
  return (
    <Router>
      <Routes>
        {/* Set the root path for the Home page */}
        <Route path="/" element={<Home />} />

        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/projects" element={<MoreProjects />} />

        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/add" element={
          <ProtectedRoute>
            <AddProject />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/admin/pages" element={
          <ProtectedRoute>
            <AllPages />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
       <Route path="/contactpage" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;