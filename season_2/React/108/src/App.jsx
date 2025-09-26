import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Case 1: Run on every render
  // useEffect(() => {
  //   alert('COUNT WAS CHANGED!')
  // })

  // Case 2: Run only on first render
  // useEffect(() => {  
  //   alert('Hey welcome to React world!')
  // }, [])

  // Case 3: Run only when count changes
  // useEffect(() => {
  //   alert('COUNT WAS CHANGED!')
  // }, [count])
  
  useEffect(() => {
    alert('Hey welcome to React world!')
  }, [])
  
  useEffect(() => {
    if (count % 2 === 1){
      alert('COUNT IS ODD!')
      // alert('COUNT WAS CHANGED!')
    }
  }, [count])


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
