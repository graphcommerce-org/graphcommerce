export default function App({ Component, pageProps }) {
  return (
    <>
      <style
        // We're setting the global this way so that they are applied with JS disabled in development mode.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          body {
            font-family: SF Pro Text, 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
            padding: 20px;
            margin: 0;
          }

          details {
            margin-bottom: 1em;
          }

          summary :is(h2, h3) {
            display: inline;
          }
        `,
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
