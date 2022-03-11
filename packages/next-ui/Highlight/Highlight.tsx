export function Highlight(props: { text: string; highlight: string }) {
  const { text, highlight } = props
  const start = text.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase())

  if (start < 0) return <>{text}</>

  return (
    <>
      {text.slice(0, start)}
      <strong>{text.slice(start, highlight.length + start)}</strong>
      {text.slice(start + highlight.length)}
    </>
  )
}
