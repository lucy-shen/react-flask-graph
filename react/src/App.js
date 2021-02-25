import React, { useState, useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { ArrowForward } from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import axios from 'axios';

import SearchBar from "material-ui-search-bar";

import NetworkGraph from './Graph';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' '}
      {/* <Link color="inherit" href="">
        Back to website
      </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function App() {

  const classes = useStyles();
  const [value, setValue] = useState('');
  const [sentence, setSentence] = useState('Johnson');

  const myRef = useRef(null)

  const executeScroll = () => myRef.current.scrollIntoView({ behavior: "smooth" });

  var ip = window.location.host;

  let example1 = 'Eisenhower';
  let example2 = 'Reagan';
  let example3 = 'American involvement';
  let example4 = 'Kennedy';

  console.log(example1);
  console.log(example2);
  console.log(example3);


  function display(value) {
    setSentence(value);
    executeScroll();
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Knowledge Graph
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Knowledge Graph
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Visualizer for relationships extracted from various entities from Wikipedia articles.
            </Typography>
            <div className={classes.heroButtons}>
              <SearchBar
                value={value}
                onChange={(newValue) => setValue(newValue)}
                onRequestSearch={() => display(value)}
                searchIcon={<ArrowForward color="action" />}
                placeholder='Enter argument here ...'
              />
            </div>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Examples
            </Typography>
            <MenuList>
              <MenuItem onClick={(event) => display(example1)}>{example1}</MenuItem>
              <MenuItem onClick={(event) => display(example2)}>{example2}</MenuItem>
              <MenuItem onClick={(event) => display(example3)}>{example3}</MenuItem>
              <MenuItem onClick={(event) => display(example4)}>{example4}</MenuItem>
            </MenuList>
      
          </Container>
        </div>
        <Container ref={myRef} className={classes.cardGrid} maxWidth="lg">
          <NetworkGraph sentence={sentence} />
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}