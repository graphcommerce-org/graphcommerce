import { GetServerSidePropsContext } from 'next'

type Stringifyable = boolean | string | number | null | undefined

/**
 * Tagged template literal for robots.txt that will automatically stringify values and indent them correctly.
 * https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#syntax
 */
export function robotsTxt(strings: TemplateStringsArray, ...values: Stringifyable[]) {
  return strings
    .reduce((acc, str, i) => {
      let value = values[i]

      if (Array.isArray(value)) {
        const [conditional, val] = value
        value = conditional ? val : null
      }
      if (!value) value = ''
      if (typeof value === 'boolean') value = value ? 'true' : 'false'
      if (typeof value === 'number') value = String(value)

      return acc + str + value
    }, '')
    .split('\n')
    .map((v) => v.trim())
    .join('\n')
    .trim()
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function getServerSidePropsRobotsTxt(
  context: GetServerSidePropsContext,
  robots: string,
) {
  context.res.setHeader('Content-Type', 'text/plain')
  context.res.write(robots)
  context.res.end()
  context.res.setHeader('Cache-Control', `public, s-maxage=${60 * 60 * 2}`)

  return { props: {} }
}
