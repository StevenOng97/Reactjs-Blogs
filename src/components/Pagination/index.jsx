import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
  },
});

const PaginationBar = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const classes = useStyles();

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Stack spacing={2}>
      <Pagination
        className={classes.root}
        count={pageNumbers.length}
        onChange={(e, value) => paginate(value)}
        page={currentPage}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationBar;
