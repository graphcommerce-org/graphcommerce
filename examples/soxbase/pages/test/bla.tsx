import { Slider } from '@material-ui/core'
import {
  m,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'

const sum = (num: number) => (v: number) => v + num
const min = (num: number) => (v: number) => Math.max(num, v)
const useT = useTransform

export default function Bla() {
  const value = useMotionValue(0)

  const spring = useT(useSpring(value, { damping: 2 }), min(40))

  return (
    <>
      <div style={{ maxWidth: 400, padding: 20 }}>
        <Slider
          onChangeCommitted={(_, v) => {
            value.set(v as number)
          }}
        />
        <m.svg
          version='1.1'
          baseProfile='full'
          width='300'
          height='200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <m.rect width='100%' height='100%' fill='red' />

          <m.circle cx='150' cy='100' r='80' fill='green' />

          <m.path
            d={useMotionTemplate`
                M 18 3
                l 28 0
                L 46 ${spring}
                L 61 ${spring}
                L 32 ${useT(spring, sum(28))}
                L 3 ${spring}
                L 18 ${spring}
                Z
            `}
            fill='none'
            strokeWidth='4'
            stroke='#000'
            strokeLinecap='round'
            strokeLinejoin='round'
          />

          <m.text x='150' y='125' fontSize='60' textAnchor='middle' fill='white'>
            SVG
          </m.text>
        </m.svg>
      </div>
    </>
  )
}
