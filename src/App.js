import '@fontsource/roboto/500.css';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';
import React, { useState, useEffect } from 'react';
import { Box, CssBaseline,Fade } from '@mui/material';
import backgrounds from './images/backgrounds';
import SearchBar from './components/SearchBar.jsx';
import Info from './components/Info.jsx';

function App() {
  const [theme, setTheme] = useState(lightTheme);
  const [background, setBackground] = useState('');
  const [fadeInPage, setFadeInPage] = useState(false);
  const [searchedItem, setSearchedItem] = useState(undefined);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setBackground(backgrounds[randomIndex]);
    setTimeout(() => {
      setFadeInPage(true);
    }, 100);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <Fade in={fadeInPage} timeout={2000}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh',gap:'10%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${background})`,
              // background blur
              position: 'fixed',
              width: '100%',
              zIndex: -1,
              filter: 'blur(10px)',
            }}
          />
          <SearchBar setSearchedItem={setSearchedItem}/>
          <Info searchedItem={searchedItem}/>
        </Box>
        </Fade>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
