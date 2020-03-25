import { renderers } from './ContentRenderer'
import { registerDefaultRenderer } from './defaultRenderer'

export * from './ContentRenderer'

registerDefaultRenderer(renderers)
