export default {
  github: 'https://github.com/ho-nl/m2-pwa',
  siteGithub: 'https://github.com/ho-nl/m2-pwa',
  titleSuffix: ' – GraphCommerce',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null,
  darkMode: 'class',
  footer: true,
  footerText: 'GraphCommerce © Reach Digital 2021',
  footerEditOnGitHubLink: true,
  logo: (
    <>
      <span className='mr-2 font-extrabold hidden md:inline'>GraphCommerce</span>
      <span className='text-gray-600 font-normal hidden md:inline'>
        GraphCommerce PWA framework by Reach Digital
      </span>
    </>
  ),
  head: (
    <>
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='Content-Language' content='en' />
      <meta name='description' content='GraphCommerce' />
      <meta name='apple-mobile-web-app-title' content='GraphCommerce' />
    </>
  ),
}
