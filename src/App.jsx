import React, { useState, useCallback } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import IndexPage from './modules/IndexPage';
import ArticlePage from './modules/ArticlePage';
import HomePage from './modules/HomePage';
import { AnimatePresence } from 'framer-motion';
import './reset.scss';
import './main.scss';
import TransitionModal from './components/TransitionModal';

function App() {
  const location = useLocation();

  const [error, setError] = useState(null);

  const getArticlesError = useCallback((error) => {
    setError(error || null);
  }, []);

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            exact
            element={<HomePage />}
          ></Route>
          <Route
            path="/articles"
            element={<IndexPage getArticlesError={getArticlesError} />}
          />
          <Route
            path="/articles/:url"
            element={<ArticlePage getArticlesError={getArticlesError} />}
          />
        </Routes>
      </AnimatePresence>

      <TransitionModal isOpen={error ? true : false} />
    </div>
  );
}

export default App;
