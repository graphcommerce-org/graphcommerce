// theme.config.js
export default {
  github: 'https://github.com/ho-nl/m2-pwa', // link of the project repo
  siteGithub: 'https://github.com/ho-nl/m2-pwa', // link of the docs repo path
  titleSuffix: ' – Soxbase Commerce',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // <- customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: 'Soxbase Commerce © Reach Digital 2021',
  footerEditOnGitHubLink: false, // will link to the docs repo
  logo: (
    <>
      <span className='mr-2 font-extrabold hidden md:inline'>Soxbase Commerce</span>
      <span className='text-gray-600 font-normal hidden md:inline'>
        Reach Digital PWA Framework
      </span>
    </>
  ),
  head: (
    <>
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='Content-Language' content='en' />
      <meta name='description' content='Soxbase Commerce' />
      <meta name='apple-mobile-web-app-title' content='Soxbase Commerce' />
    </>
  ),
}
