import React, { useCallback, useEffect, useReducer } from 'react';
import Layout from '../components/main-layout';
import getArticleApi from '../api/getArticleApi';

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

const IndexPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
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

  return (
    <Layout>
      <div>Index Page</div>
    </Layout>
  );
};

export default IndexPage;
