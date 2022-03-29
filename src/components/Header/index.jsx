import React from 'react';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/logo.jpg';

const useStyles = makeStyles({
  headerWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
  },

  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  imageWrapper: {
    flexGrow: 0.5,
    display: 'flex',
    margin: '15px 0',
  },
});

const Header = () => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={classes.headerWrapper}>
        <Container maxWidth="lg">
          <Toolbar>
            <Box className={classes.imageWrapper}>
              <img src={logo} alt="logo" width="150" />
            </Box>
            <Typography
              variant="p"
              component="div"
              className={classes.iconWrapper}
            >
              <HomeIcon sx={{ marginRight: '0.2em' }} />
              Home
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
