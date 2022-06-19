import logo from './logo.svg';
import './App.css';
import Eightball from './Eightball'
import answers_default from './Answers'

function App() {
  return (
    <div className="App">
      <Eightball answers={answers_default}/>
    </div>
  );
}

export default App;
