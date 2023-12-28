import { ButtonLinkList } from './ButtonLinkList'
import { ButtonLinkListItem } from './ButtonLinkListItem'
import { RowButtonLinkListProps } from './type'

/** @deprecated Replace with RowLinks */
export function RowButtonLinkList(props: RowButtonLinkListProps) {
  const { title, links } = props

  const isBig = links.some((link) => (link.title?.length ?? 0) > 30)
  return (
    <ButtonLinkList title={title} containsBigLinks={isBig} component='h2'>
      {links?.map((link) => (
        <ButtonLinkListItem key={link.url} url={`/${link.url}`}>
          {link.title}
        </ButtonLinkListItem>
      ))}
    </ButtonLinkList>
  )
}
