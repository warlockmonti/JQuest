import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { RPGPage } from './pages/RPGPage';

const RedirectToHomeOnLoad = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Force redirect to landing page on every fresh load/refresh
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []);

  return null;
};

function App() {
  return (
    <Router>
      <RedirectToHomeOnLoad />
      <Routes>
        <Route path="/rpg" element={<RPGPage />} />
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
