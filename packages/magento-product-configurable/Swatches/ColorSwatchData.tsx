import { SwatchTypeRenderer } from '.'

const ColorSwatchData: SwatchTypeRenderer['ColorSwatchData'] = ({ value }) => {
  return (
    <div
      style={{
        backgroundColor: value ?? undefined,
        borderRadius: '50%',
        height: '18px',
        width: '18px',
      }}
    />
  )
}

export default ColorSwatchData
