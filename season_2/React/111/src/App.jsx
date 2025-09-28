import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Posts</h1>
        <div className="card-container">
          {posts.map((post) => (
            <div className="card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className="meta">
                <span>User ID: {post.userId}</span>
                <span>Post ID: {post.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

    </>
  )
}

export default App
