import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import NavBarSection from './components/NavBarSection';
import Footer from './components/Footer';
import ScrollToTop from './ScrollToTopSection';

function App() {
  return (
    <div className="app-container">
      <NavBarSection />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}


export default App;
