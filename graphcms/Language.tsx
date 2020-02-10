import { GraphCmsPage, isPageNlHasEn, isPageEnHasNl } from './GraphCmsPage'
import { Link } from './Link'

const Language: React.FC<GraphCmsPage> = ({ page }) => (
  <>
    {isPageNlHasEn(page) && (
      <Link metaRobots={page.metaRobots} href={page.urlEN!}>
        Read in English
      </Link>
    )}
    {isPageEnHasNl(page) && (
      <Link metaRobots={page.metaRobots} href={page.urlNL!}>
        Read in Dutch
      </Link>
    )}
  </>
)

export { Language }
