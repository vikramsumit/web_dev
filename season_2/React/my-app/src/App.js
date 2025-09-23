import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue(value + 1);
  };

  const decrement = () => {
    setValue(value - 1);
  };

  return (
    <div className="App">
      <Navbar title="Demo react website" />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Counter: {value}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </header>
      <Footer />
    </div>
  );
}

export default App;
