
export function getCssFlagsInitScript() {
  return (
    <script
      id='init-gc-flags'
      key='mui-color-scheme-init'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  const flags = JSON.parse(localStorage.getItem('${FLAGS_STORAGE_KEY}') || '{}')
  Object.entries(flags).forEach(([key, val]) => {
    document.documentElement.setAttribute('data-' +key, typeof val === 'boolean' ? '' : val)
  })
} catch(e){}})();`,
      }}
    />
  )
}
