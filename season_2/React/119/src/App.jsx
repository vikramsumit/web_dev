import { useForm } from "react-hook-form"
import { useState } from 'react'
import './App.css'

const onSubmit = (data) => console.log(data)

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    await delay(2) // simulating network delay
    console.log(data)
    if (data.username !== "raju" || data.password !== "raju") {
      setError("myform", { type: "generic", message: "Username or password is incorrect" })
    } else {
      alert("You are logged in")
    }
  }

  return (
    <>
    {isSubmitting && <div style={{color:'green', fontSize: '12px'}}>Loading......</div>}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="username" {...register("username", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min length should be 3" }, maxLength: { value: 8, message: "Max length should be 8" } })} type="text" />
          {errors.username && <div style={{ color: 'red', fontSize: '12px' }}>{errors.username.message}</div>}
          {/* {errors.username &&  <div>There is some error in username</div>}  */}
          <br />
          <input placeholder="password" {...register("password", { required: { value: true, message: "This field is required" } })} type="password" />
          {errors.password && <div style={{ color: 'red', fontSize: '12px' }}>{errors.password.message}</div>} <br />
          <input disabled={isSubmitting} type="submit" value="submit" />
          {errors.myform && <div style={{ color: 'red', fontSize: '12px' }}>{errors.myform.message}</div>}
        </form>
      </div>

    </>
  )
}

export default App
