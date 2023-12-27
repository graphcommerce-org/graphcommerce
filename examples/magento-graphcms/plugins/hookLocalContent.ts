import type { MethodPlugin } from '@graphcommerce/next-config'
import { pageContent } from '@graphcommerce/next-ui'
import { homepageContent } from '../content/homepage'

export const func = 'pageContent'
export const exported = '@graphcommerce/next-ui/Page/pageContent'

const hookLocalContent: MethodPlugin<typeof pageContent> = async (prev, url) => {
  // const parsedContent = parseContent(homepageContent)
  const prevData = await prev(url)

  console.log(54321, 'hookLocalContent')

  if (url === 'test/abstractions-testt' || url === 'page/home') {
    return {
      data: {
        ...prevData.data,
        pages: [{ ...prevData.data.pages[0], content: homepageContent }],
      },
    }
  }

  return prev(url)
}

export const plugin = hookLocalContent
