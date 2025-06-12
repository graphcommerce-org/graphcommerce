import { px } from 'framer-motion'

export const numberToPx = (value: number) => px.transform(Math.round(value * 100) / 100)
