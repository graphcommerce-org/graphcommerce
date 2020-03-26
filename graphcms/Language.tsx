import { GraphCmsPageProps } from './GraphCmsPage'
import { Link } from './Link'

const Language: React.FC<GraphCmsPageProps> = ({ page }) => (
  <>
    {page.localizations.map(localization => (
      <Link metaRobots={localization.metaRobots!} href={localization.url} key={localization.url}>
        Read in {localization.locale}
      </Link>
    ))}
  </>
)

export { Language }
