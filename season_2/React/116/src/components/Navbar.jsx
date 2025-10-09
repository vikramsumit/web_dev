import React, { useContext } from 'react'
import Button from './Button'
import { counterContext } from '../context/context'

const Navbar = () => {
  const {count} = useContext(counterContext)
  return (
    <>
    <div>
      Navbar
    </div>
    <Button count={count}/>
    </>
  )
}

export default Navbar