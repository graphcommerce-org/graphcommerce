import { GetServerSideProps } from 'next'

export default function Empty() {}

export const getServerSideProps: GetServerSideProps = async ({ req, res, resolvedUrl }) => {
  res.setHeader('Content-Type', 'application/json')
  res.write(
    JSON.stringify({
      web_apps: [
        {
          web_app_identity: 'https://graphcommerce.vercel.app/',
        },
      ],
    }),
  )
  res.end()
  return {
    props: {},
  }
}
