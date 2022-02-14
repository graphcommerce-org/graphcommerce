export default process.env.NODE_ENV !== 'production'
  ? (await import('./mesh.development')).default
  : (await import('./mesh.production')).default
