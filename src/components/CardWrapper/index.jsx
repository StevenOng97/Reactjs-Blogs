import React, { useCallback } from 'react';
import {
  Card,
  Grid,
  Typography,
  Skeleton,
  CardMedia,
  Box,
} from '@mui/material';
const skeCardNumber = 3;

const CardWrapper = ({ data, isLoading }) => {
  const renderSkeCards = useCallback(() => {
    return [...new Array(skeCardNumber)].map((_, i) => {
      return (
        <Grid item xs={2} lg={4}>
          <Card variant="outlined">
            <CardMedia>
              <Box key={i} width="100%">
                <Skeleton variant="rectangular" height={200} animation="wave" />
              </Box>
            </CardMedia>

            <Box sx={{ pt: 0.5 }}>
              <Skeleton animation="wave" />
              <Skeleton width="60%" animation="wave" />
            </Box>
          </Card>
        </Grid>
      );
    });
  }, []);

  return (
    <Grid container spacing={2} mt={2}>
      {renderSkeCards()}
    </Grid>
  );
};

export default CardWrapper;
