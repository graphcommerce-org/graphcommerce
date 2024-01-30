import { Box, SxProps, Theme } from '@mui/material'

export type TextProps = {
  textContent?: string
}

type TextRendererProps = TextProps & {
  sx?: SxProps<Theme>
}

export function TextRenderer(props: TextRendererProps) {
  const { textContent, sx = [] } = props

  // const clickHandler = (event) => {
  //   event.prventDefault()
  //   console.log('handleclick')
  // }

  if (!textContent) return null

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          wordWrap: 'break-word',
          typography: 'body1',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      dangerouslySetInnerHTML={{ __html: textContent }}
      // onClick={clickHandler}
      // onKeyDown={clickHandler}
      role='presentation'
    />
  )
}
