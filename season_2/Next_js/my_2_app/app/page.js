// "use client"
// import { useState, useEffect} from 'react';
import Navbar from '@/component/Navbar';
import fs from 'fs/promises';
// import Image from "next/image";

export default function Home() {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   console.log("Count has changed:", count);
  // }, [count]);

  console.log("Reading directory contents...");
  let a = fs.readFile(".gitignore", "utf-8")

  a.then(e=>{console.log(e.toString())})

  return (
    <div>
      <Navbar />
      <h1>Hello, Next.js!</h1>
      <p>This is a simple Next.js application.</p>
    </div>

    // <div>I am a component {count} <br />
    //   <button onClick={()=> setCount(count + 1)}>Click me</button>
    // </div>
  );
}
