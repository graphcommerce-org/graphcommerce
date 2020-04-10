import ContentRenderer, { renderers, Renderers } from './ContentRenderer'
import registerDefaultRenderer from './defaultRenderer'

registerDefaultRenderer(renderers)

export default ContentRenderer
export type { Renderers }
