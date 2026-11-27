export const FLAGS_COOKIE_KEY = 'gc-flags'

export function getCssFlagsInitScript() {
  return (
    <script
      id='init-gc-flags'
      key='mui-color-scheme-init'
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  var m = document.cookie.match(/(^|; )${FLAGS_COOKIE_KEY}=([^;]*)/)
  if (!m) return
  var flags = JSON.parse(decodeURIComponent(m[2]))
  Object.entries(flags).forEach(([key, val]) => {
    document.documentElement.setAttribute('data-' +key, typeof val === 'boolean' ? '' : val)
  })
} catch(e){}})();`,
      }}
    />
  )
}
