import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import './main.scss';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#658660',
      main: '#3a5936',
      dark: '#112f10',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff9758',
      main: '#ff652a',
      dark: '#c43200',
      contrastText: '#000'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </MuiThemeProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
