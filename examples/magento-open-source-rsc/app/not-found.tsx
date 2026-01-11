import Link from 'next/link'

/** Not found page for the App Router */
export default function NotFound() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 700, marginBottom: '1rem' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', color: '#666', marginBottom: '1rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
        <Link
          href='/'
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 500,
          }}
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}
