const fonts: Array<{
  font: string
  fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  fontStyle: 'normal' | 'italic'
  preload?: true
}> = [
  { font: 'Graphik-Thin', fontWeight: 100, fontStyle: 'normal' },
  { font: 'Graphik-ThinItalic', fontWeight: 100, fontStyle: 'italic' },
  { font: 'Graphik-Extralight', fontWeight: 200, fontStyle: 'normal' },
  { font: 'Graphik-ExtralightItalic', fontWeight: 200, fontStyle: 'italic' },
  { font: 'Graphik-Light', fontWeight: 300, fontStyle: 'normal' },
  { font: 'Graphik-LightItalic', fontWeight: 300, fontStyle: 'italic' },
  { font: 'Graphik-Regular', fontWeight: 400, fontStyle: 'normal', preload: true },
  { font: 'Graphik-RegularItalic', fontWeight: 400, fontStyle: 'italic', preload: true },
  { font: 'Graphik-Medium', fontWeight: 500, fontStyle: 'normal', preload: true },
  { font: 'Graphik-MediumItalic', fontWeight: 500, fontStyle: 'italic' },
  { font: 'Graphik-Semibold', fontWeight: 600, fontStyle: 'normal', preload: true },
  { font: 'Graphik-SemiboldItalic', fontWeight: 600, fontStyle: 'italic', preload: true },
  { font: 'Graphik-Bold', fontWeight: 700, fontStyle: 'normal' },
  { font: 'Graphik-BoldItalic', fontWeight: 700, fontStyle: 'italic' },
  { font: 'Graphik-Black', fontWeight: 800, fontStyle: 'normal' },
  { font: 'Graphik-BlackItalic', fontWeight: 800, fontStyle: 'italic' },
  { font: 'Graphik-Super', fontWeight: 900, fontStyle: 'normal' },
  { font: 'Graphik-SuperItalic', fontWeight: 900, fontStyle: 'italic' },
]

export default fonts
