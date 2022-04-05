import React, { useReducer, useEffect, useCallback, useState } from 'react';
import Layout from '../components/main-layout';
import getArticleApi from '../api/getArticleApi';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Skeleton,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AnimatePresence, motion } from 'framer-motion';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const initialState = {
  isLoading: false,
  article: null,
  articleError: null,
};

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const FETCH_ARTICLE = 'FETCH_ARTICLE';
const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        article: action.payload,
      };
    case FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        articleError: 'Unable to get data, please try again later!',
      };
    default:
      return;
  }
};

const useStyles = makeStyles({
  containerWrapper: {
    marginTop: '175px',
    marginBottom: 'calc(150px - 89px)',
    minHeight: 'calc(100vh - 64px - 236px)',
  },
  boxContainer: {
    minHeight: 'calc(100vh - 64px - 236px)',
  },
  skeleton: {
    minHeight: 'calc(100vh - 64px - 236px)',
  },
  ulComponent: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  liComponent: {
    wordBreak: 'break-word',
    fontFamily: 'GuardianTextEgyptian,Guardian Text Egyptian Web,Georgia,serif',
    fontSize: '1.0625rem',
    lineHeight: 1.5,
    fontWeight: 400,
    marginTop: '1rem !important',
  },
  redirectPostWrapper: {
    display: 'flex',
    alignItems: 'center',
    wordBreak: 'break-word',
    fontFamily: 'GuardianTextEgyptian,Guardian Text Egyptian Web,Georgia,serif',
    fontSize: '1.0625rem',
    lineHeight: 1.5,
    fontWeight: 400,
  },
});

const ArticlePage = ({ getArticlesError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hiddenButton, setHiddenButton] = useState(true);
  const { isLoading, article, articleError } = state;
  const location = useLocation();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticlesEndpoint = async () => {
      dispatch({ type: FETCH_ARTICLE });
      try {
        const url = location.pathname.split('/')[2];
        const payload = await getArticleApi.getSingleArticle(url);
        dispatch({ type: FETCH_ARTICLE_SUCCESS, payload });
      } catch (err) {
        dispatch({ type: FETCH_ARTICLE_FAILURE });
      }
    };

    fetchArticlesEndpoint();
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset !== 0) {
        setHiddenButton(false);
      } else {
        setHiddenButton(true);
      }
    };
  }, []);

  useEffect(() => {
    getArticlesError(articleError);
  }, [articleError]);

  const renderContent = useCallback(() => {
    if (!article) return;
    return article.contentSection.map((item, i) => {
      return (
        <Typography
          variant="li"
          component="li"
          key={i}
          className={classes.liComponent}
        >
          {item}
        </Typography>
      );
    });
  }, [article]);

  return (
    <Layout>
      <Container className={classes.containerWrapper} maxWidth="md">
        <Button
          variant="contained"
          sx={{ marginBottom: '1rem' }}
          onClick={() => navigate('/')}
        >
          <ArrowBackIcon color="common.white" />
        </Button>
        {isLoading && !article && (
          <Box className={classes.boxContainer}>
            <Skeleton
              className={classes.skeleton}
              variant="rectangular"
              width="100%"
              animation="wave"
            />
          </Box>
        )}
        {!isLoading && articleError && (
          <Box className={classes.boxContainer}>
            <Typography variant="h5" component="p" textAlign="center">
              Unable to Crawl Data of this Post, please try anothers!
            </Typography>
          </Box>
        )}
        {!isLoading && article && (
          <AnimatePresence exitBeforeEnter>
            <motion.div
              variants={animations}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1 }}
            >
              <Box>
                <Typography variant="h4" component="h4">
                  {article.title}
                </Typography>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{ margin: '1rem 0' }}
                >
                  {article.subTitle}
                </Typography>
                <Box width="100">
                  <img src={article.img} width="100%" alt="thumbnail" />
                </Box>
                <Box display="flex" alignItems="center">
                  <CameraAltIcon sx={{ marginRight: '0.2em' }} />
                  <Typography variant="small" component="p" color="inherit">
                    {article.imageQuote}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="ul"
                    component="ul"
                    className={classes.ulComponent}
                  >
                    {renderContent()}
                  </Typography>
                </Box>
                <Box
                  sx={{ marginTop: '1rem' }}
                  className={classes.redirectPostWrapper}
                >
                  <Typography variant="p" component="p">
                    Click here to read full post:
                  </Typography>
                  <Link
                    href={article.externalLink}
                    target="_blank"
                    sx={{ marginLeft: '0.2em', fontWeight: 'bold' }}
                  >
                    Link
                  </Link>
                </Box>
              </Box>
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
                      sx={{ position: 'fixed', right: '10%', bottom: '10%' }}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <ArrowUpwardIcon color="common.white" />
                    </Button>
                  </motion.div>
                </AnimatePresence>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </Container>
    </Layout>
  );
};

export default ArticlePage;
