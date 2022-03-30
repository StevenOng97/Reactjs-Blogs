import React from 'react';
import {
  Typography,
  Box,
  AppBar,
  Container,
  Toolbar,
  Link,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { makeStyles } from '@mui/styles';

const url = 'https://www.theguardian.com/uk';
const linkedInUrl = 'https://www.linkedin.com/in/gianguyenong';
const facebookUrl = 'https://www.facebook.com/nguyen.ong2211';
const instagramUrl = 'https://www.instagram.com/lies97';

const useStyles = makeStyles({
  iconWrapper: {
    marginRight: '0.2em',
    cursor: 'pointer',
    transition: 'all 0.5s !important',
    '&:hover': { color: '#1976d2' },
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2f2e2e' }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography component="h6" variant="h6">
              Author: Nguyen Ong
            </Typography>
            <Box sx={{ display: 'flex' }}>
              <Typography
                component="p"
                variant="p"
                sx={{ marginRight: '0.4em' }}
              >
                Crawled Contents:
              </Typography>
              <Link href={url} variant="body2" sx={{ fontWeight: 'bold' }}>
                {url}
              </Link>
            </Box>
            <Typography variant="p" component="div">
              <FacebookIcon
                className={classes.iconWrapper}
                onClick={() => window.open(facebookUrl)}
              />
              <InstagramIcon
                className={classes.iconWrapper}
                onClick={() => window.open(instagramUrl)}
              />
              <LinkedInIcon
                className={classes.iconWrapper}
                onClick={() => window.open(linkedInUrl)}
              />
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Footer;
