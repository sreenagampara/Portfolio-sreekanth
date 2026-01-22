import { ProjectProvider } from './context/ProjectContext'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageProjects from './components/admin/ManageProjects';
import ManageSkills from './components/admin/ManageSkills';
import ManageAbout from './components/admin/ManageAbout';
import ViewMessages from './components/admin/ViewMessages';
import AdminSettings from './components/admin/AdminSettings';
import ScrollToTop from './components/ScrollToTop';

const MainSite = () => (
    <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
    </div>
);

function App() {
    return (
        <AuthProvider>
            <ProjectProvider>
                <div className="bg-gray-900 min-h-screen">
                    <ScrollToTop />
                    <Routes>
                        {/* Public Route */}
                        <Route path="/" element={<MainSite />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* Protected Admin Routes */}
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route index element={<Navigate to="/admin/dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="projects" element={<ManageProjects />} />
                            <Route path="skills" element={<ManageSkills />} />
                            <Route path="about" element={<ManageAbout />} />
                            <Route path="messages" element={<ViewMessages />} />
                            <Route path="settings" element={<AdminSettings />} />
                        </Route>
                    </Routes>
                </div>
            </ProjectProvider>
        </AuthProvider>
    )
}

export default App
