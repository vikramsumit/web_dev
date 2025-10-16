// app/not-found.js
export default function NotFound() {
  return (
    <div style={{
      backgroundColor: '#121212',
      color: '#fff',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '80px' }}>404</h1>
      <p style={{ fontSize: '20px' }}>This page is lost in the dark.</p>
      <a href="/" style={{ color: '#61dafb', marginTop: '20px', textDecoration: 'underline' }}>
        Back to Safety
      </a>
    </div>
  );
}
