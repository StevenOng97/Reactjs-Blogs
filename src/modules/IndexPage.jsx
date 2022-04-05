import React, { useEffect, useReducer, useState } from 'react';
import Layout from '../components/main-layout';
import getArticleApi from '../api/getArticleApi';
import CardWrapper from '../components/CardWrapper';
import Pagination from '../components/Pagination';

import { Container, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { motion, AnimatePresence } from 'framer-motion';

const initialState = {
  isLoading: false,
  articles: [],
  articlesError: null,
};

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const FETCH_ARTICLES = 'FETCH_ARTICLES';
const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        articlesError: 'Unable to get data, please try again later!',
      };
    default:
      return;
  }
};

const useStyles = makeStyles({
  containerWrapper: {
    marginTop: '150px',
    marginBottom: 'calc(150px - 64px)',
    minHeight: 'calc(100vh - 64px - 236px)',
  },
});

const IndexPage = ({ getArticlesError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, articles, articlesError } = state;

  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9);

  useEffect(() => {
    const fetchArticlesEndpoint = async () => {
      dispatch({ type: FETCH_ARTICLES });
      try {
        const payload = await getArticleApi.getMultipleArticles();
        dispatch({ type: FETCH_ARTICLES_SUCCESS, payload });
      } catch (err) {
        dispatch({ type: FETCH_ARTICLES_FAILURE });
      }
    };

    fetchArticlesEndpoint();
  }, []);

  useEffect(() => {
    getArticlesError(articlesError);
  }, [articlesError]);

  const [hiddenButton, setHiddenButton] = useState(true);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset !== 0) {
        setHiddenButton(false);
      } else {
        setHiddenButton(true);
      }
    };
  }, []);

  const classes = useStyles();

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <Container className={classes.containerWrapper}>
        <Typography component="div" variant="h6" sx={{ textAlign: 'center' }}>
          The Application is built for practicing Reactjs and Nodejs Purpose.
        </Typography>
        <CardWrapper data={currentArticles} isLoading={isLoading} />
        {articles.length > 0 && !isLoading && (
          <Pagination
            postsPerPage={articlesPerPage}
            totalPosts={articles.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
        {!hiddenButton && (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              variants={animations}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1 }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ position: 'fixed', right: '10%', bottom: '3%' }}
                onClick={() => window.scrollTo(0, 0)}
              >
                <ArrowUpwardIcon color="common.white" />
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </Container>
    </Layout>
  );
};

export default IndexPage;
