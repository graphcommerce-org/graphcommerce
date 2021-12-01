import { MotionValue } from 'framer-motion'
import layoutContext from '../context/layoutContext'

export type LayoutProviderProps = {
  children: React.ReactNode
  scroll: MotionValue<number>
}

export default function LayoutProvider(props: LayoutProviderProps) {
  const { children, scroll } = props
  return <layoutContext.Provider value={{ scroll }}>{children}</layoutContext.Provider>
}
