import React, { useCallback } from 'react';
import { makeStyles } from '@mui/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  Grid,
  Typography,
  Skeleton,
  CardMedia,
  Box,
  Button,
} from '@mui/material';

import './styles.scss';

const skeCardNumber = 9;

const animations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const useStyles = makeStyles({
  root: {
    transform: 'scale(0.9)',
    transition: '0.3s all ease-in-out !important',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    height: '100%',
    '&:hover': {
      transform: 'scale(1)',
    },
  },
});

const CardWrapper = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const renderSkeCards = useCallback(() => {
    return [...new Array(skeCardNumber)].map((_, i) => {
      return (
        <Grid item md={6} lg={4} xs={12} key={i}>
          <Card variant="outlined">
            <CardMedia>
              <Box width="100%">
                <Skeleton variant="rectangular" height={200} animation="wave" />
              </Box>
            </CardMedia>

            <Box sx={{ padding: '0 12px' }}>
              <Skeleton animation="wave" height={100} />

              <Skeleton animation="wave" height={40} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                width="30%"
                sx={{ marginLeft: 'auto', paddingRight: '12px' }}
              >
                <Skeleton animation="wave" />
              </Typography>
            </Box>
          </Card>
        </Grid>
      );
    });
  }, []);
  const classes = useStyles();

  const renderDataCards = useCallback(() => {
    return data.map((card, i) => {
      const urlToRedirect = card.url.split('/').pop();
      return (
        <Grid item md={6} lg={4} xs={12} key={i}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              variants={animations}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1 }}
            >
              <Card
                variant="outlined"
                className={classes.root}
                onClick={() => navigate(`/article/${urlToRedirect}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={card.thumbnail}
                  alt="card-data"
                />
                <Typography
                  variant="h5"
                  component="h5"
                  className="truncate title"
                  sx={{ padding: '0 12px', margin: '12px 0 8px 0' }}
                >
                  {card.title}
                </Typography>
                <Typography
                  variant="p"
                  component="p"
                  className="truncate description"
                  sx={{ padding: '0 12px', marginBottom: '18px' }}
                >
                  {card.description}
                </Typography>
                <Box
                  sx={{
                    marginBottom: '12px',
                    paddingBottom: '12px',
                    paddingRight: '12px',
                    textAlign: ' right',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/article/${urlToRedirect}`)}
                  >
                    Go To Post
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Grid>
      );
    });
  }, [data]);

  return (
    <Grid container spacing={2} mt={2} alignItems="stretch">
      {isLoading && renderSkeCards()}
      {!isLoading && renderDataCards()}
    </Grid>
  );
};

export default CardWrapper;
