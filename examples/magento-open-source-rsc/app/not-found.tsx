import Link from 'next/link'

/**
 * Root 404 page for routes that don't match any store. This page doesn't have access to the store
 * layout or theme providers since the store param isn't available.
 *
 * For store-specific 404s (when notFound() is called within a page), see `[store]/not-found.tsx`.
 */
export default function NotFound() {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center',
        marginTop: '8rem',
        marginBottom: '8rem',
      }}
    >
      {/* Icon placeholder - similar to icon404 */}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='120'
        height='120'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ marginBottom: '1rem', color: '#666' }}
      >
        <circle cx='12' cy='12' r='10' />
        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
        <path d='M2 12h20' />
      </svg>

      <h1 style={{ fontSize: '1.75rem', fontWeight: 500, marginBottom: '0.5rem' }}>
        Whoops our bad...
      </h1>

      <p style={{ color: '#666', marginBottom: '2rem' }}>
        We couldn&apos;t find the page you were looking for
      </p>

      <Link
        href='/en/search'
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '1rem 1.5rem',
          border: '1px solid #ddd',
          borderRadius: '8px',
          color: '#666',
          textDecoration: 'none',
          fontSize: '1rem',
        }}
      >
        <span>Search...</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='11' cy='11' r='8' />
          <path d='m21 21-4.3-4.3' />
        </svg>
      </Link>
    </div>
  )
}
