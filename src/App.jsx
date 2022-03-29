import './main.scss';
// import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import IndexPage from './modules/IndexPage';
import ArticlePage from './modules/ArticlePage';
import { AnimatePresence } from 'framer-motion';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/articles/:url" element={<ArticlePage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
