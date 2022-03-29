import React, { useEffect, useReducer } from 'react';
import Layout from '../components/main-layout';
import getArticleApi from '../api/getArticleApi';
import CardWrapper from '../components/CardWrapper';
import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const initialState = {
  isLoading: false,
  articles: [],
  articlesError: null,
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
        data: action.payload,
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
  }
})

const IndexPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, articles, articlesError } = state;
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

    // fetchArticlesEndpoint();
  }, []);

  const classes = useStyles();

  return (
    <Layout>
      <Container className={classes.containerWrapper}>
        <Typography component="div" variant="h6" sx={{ textAlign: 'center' }}>
          The Application is built for practicing Reactjs and Nodejs Purpose.
        </Typography>
        <CardWrapper data={articles} isLoading={isLoading} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
