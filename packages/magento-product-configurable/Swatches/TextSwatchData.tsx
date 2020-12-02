import { SwatchTypeRenderer } from '.'

const TextSwatchData: SwatchTypeRenderer['TextSwatchData'] = ({ value }) => {
  return <div>{value}</div>
}

export default TextSwatchData
