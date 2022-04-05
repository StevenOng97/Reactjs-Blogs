import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

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
    flexGrow: 0.45,
    display: 'flex',
    margin: '15px 0',
  },

  linkWrapper: {
    cursor: 'pointer',
    transition: 'all 1s',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'underline 0.15em rgba(255, 255, 255, 0) !important',
    '&:hover': { textDecorationColor: 'rgba(255, 255, 255, 1) !important' },
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className={classes.headerWrapper}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{ paddingLeft: '0 !important', paddingRight: '0 !important' }}
          >
            <Box
              className={classes.imageWrapper}
            >
              <img
                src={logo}
                alt="logo"
                width="150"
                onClick={() => navigate('/articles')}
                style={{ cursor: 'pointer ' }}
              />
            </Box>
            <Typography
              variant="p"
              component="div"
              className={classes.iconWrapper}
            >
              <Link color="common.white" className={classes.linkWrapper}>
                <HomeIcon sx={{ marginRight: '0.2em' }} />
                Home
              </Link>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
