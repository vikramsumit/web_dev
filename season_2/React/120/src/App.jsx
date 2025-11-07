import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { useSelector, useDispatch } from 'react-redux'
// import { increment, decrement, multiply, division } from './redux/counter/counterSlice.js'


function App() {
  // const [count, setCount] = useState(0)
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  console.log(count)

  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => dispatch({ type: 'counter/decrementByAmount', payload: 6 })}>Subtract 6</button>
        <br />
        <button onClick={() => dispatch({ type: 'counter/decrement' })}>-</button>
        current count is {count}
        <button onClick={() => dispatch({ type: 'counter/increment' })}>+</button> <br />
        <button onClick={() => dispatch({ type: 'counter/incrementByAmount', payload: 5 })}>Add 5</button> <br />
        <button onClick={() => dispatch({type: 'counter/multiply', payload: 2 })}>Multiply by 2</button>
        <br />
        <button onClick={() => dispatch({type : 'counter/division', payload: 2})}>Divide by 2</button>

      </div>
    </>
  )
}

export default App
