import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './components/App/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4FBD90',
      main: '#029b9a',
      dark: '#0B5169',
      contrastText: '#fefefe',
    },
    secondary: {
      light: '#ffff8a',
      main: '#eddb59',
      dark: '#b8aa25',
      contrastText: '#000000',
    },
    type: 'light',
  },
  overrides: {
    MuiAppBar: {
      colorDefault: '#efefef',
    }
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
