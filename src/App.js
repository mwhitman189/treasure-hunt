import Board from './components/Board';
import './App.css';
import { ThemeProvider } from 'styled-components';


const theme = {
  colors: {
    main: [ '#e94a54', '#fffffd' ],
    secondary: [ '#0b91e5', '#fdfef9' ],
    text: '#fff'
  }
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Board />
      </ThemeProvider>
    </div>
  );
}

export default App;
