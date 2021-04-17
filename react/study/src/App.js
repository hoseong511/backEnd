import logo from './logo.svg';
import './App.css';

const data = [
  {
    title: 'Node',
    value: 0
  },
  {
    title: 'React',
    value: 1
  },
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          {
            data.map(_ => (
              <>
                <p key={_.value}>{_.title}, {_.value}</p> 
              </>
            ))
          }
        
        <p>
          amazing <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
