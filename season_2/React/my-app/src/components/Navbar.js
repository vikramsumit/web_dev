import React from 'react'

const Navbar = (props) => {
  return (
    <div>
      <ul>
        <li>{props.title}</li>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Profile</li>
        <li>Login</li>
        <li>SignUp</li>
      </ul>
    </div>
  )
}

export default Navbar;

// we can pass props also
// const Navbar = (props) => {
//   return (
//     <div>
//       <ul>
//         <li>{props.title}</li>
//         <li>About</li>
//         <li>Contact</li>
//         <li>Profile</li>
//         <li>Login</li>
//         <li>SignUp</li>
//       </ul>
//     </div>
//   )
// }
