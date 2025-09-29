import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setfirst] = useState("Raju")
  const [form, setForm] = useState({email: "", phone: ""})

  const handleclick = () => {
    alert("Button Clicked")
  }

  const handleMouseOver = () => {
    alert("Mouse Over Event Triggered")
  }

  const handleChange = (event) => {
    // setfirst(event.target.value)
    setForm({...form, [event.target.name]: event.target.value})
    console.log(form);
  }


  return (
    <>
    <div className="button">
      <button onClick={handleclick}>Button</button>
    </div>

    {/* <div className="red" onMouseOver={handleMouseOver}>
      I am a Red Div
    </div> */}

    {/* <input type="text" value={name} onChange={handleChange}/> */}
    <input type="text" name='email' value={form.name} onChange={handleChange}/>
    <input type="text" name='phone' value={form.phone} onChange={handleChange}/>

    </>
  )
}

export default App
