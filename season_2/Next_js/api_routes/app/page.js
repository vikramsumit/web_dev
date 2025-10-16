"use client"
import Image from "next/image";

export default function Home() {

  const handleClick = async () => {
    let data = {
      name: "raju",
      role: "admin",
      age: 420
    };

    let a = await fetch('/api/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    let res = await a.json();
    console.log(res);
    console.log("Button clicked!");
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Welcome to the Home Page</h1>
      <button onClick={handleClick} className="hover:cursor-pointer">Click me</button>
    </div>
  );
}
