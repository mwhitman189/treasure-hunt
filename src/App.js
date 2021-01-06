import Board from './components/Board';
import './App.css';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import mars from './static/images/mars.jpg';
import neptune from './static/images/neptune.jpg';


const theme = {
  colors: {
    main: [ '#e94a54', '#fffffd' ],
    secondary: [ '#0b91e5', '#fdfef9' ],
    text: '#fff'
  }
};

const Container = styled.div`
  background-color: black;
  border: 1px solid black;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${mars}), url(${neptune});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position:
    top left,
    bottom right;
`;

const Title = styled.h1`
    color: #fff;
`;

const SpecialText = styled.span`
    text-transform: uppercase;
`;

function App() {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Title>Koya's Adventures
                {' '}<SpecialText>in Space!</SpecialText>
        </Title>
        <Board />
      </ThemeProvider>
    </Container>
  );
}

export default App;
