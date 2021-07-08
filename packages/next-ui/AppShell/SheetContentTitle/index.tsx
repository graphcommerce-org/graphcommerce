import useContentHeaderContext from '../ContentHeader/useContentHeaderContext'

type SheetContentTitleProps = {
  children: React.ReactNode
}

export default function SheetContentTitle(props: SheetContentTitleProps) {
  const { children } = props
  const { titleRef } = useContentHeaderContext()

  return <div ref={titleRef}>{children}</div>
}
