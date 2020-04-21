import ContentRenderer, { Renderers } from './ContentRenderer'
import { registerGetStaticProps, registerRenderers } from './defaultRenderer'

registerRenderers()
registerGetStaticProps()

export default ContentRenderer
export type { Renderers }
