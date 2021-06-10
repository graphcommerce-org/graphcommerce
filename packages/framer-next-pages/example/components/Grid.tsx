import { usePageRouter } from '@reachdigital/framer-next-pages'
import Link from 'next/link'
import styles from './styles.module.css'

export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function usePostcardClass(asPath: string) {
  const router = usePageRouter()
  return `${styles.postCard} ${asPath === router.asPath && styles.postCardActive}`
}

export default function PostCardGrid() {
  const pageRouter = usePageRouter()
  return (
    <div className={styles.postCardGridWrapper}>
      <div className={styles.postCardGrid}>
        <Link href='/'>
          <a className={usePostcardClass('/')}>Index Page</a>
        </Link>
        <Link href='/second'>
          <a className={usePostcardClass('/second')}>Second Page</a>
        </Link>
        <Link href='/third'>
          <a className={usePostcardClass('/third')}>Third Page</a>
        </Link>
      </div>

      <h2>Framer-sheet</h2>
      <div className={styles.postCardGrid}>
        <Link href='/bottom-sheet/bottom'>
          <a className={usePostcardClass('/bottom-sheet/bottom')}>Bottom Sheet</a>
        </Link>
        <Link href='/bottom-sheet/left'>
          <a className={usePostcardClass('/bottom-sheet/left')}>Left Sheet</a>
        </Link>
        <Link href='/bottom-sheet/right'>
          <a className={usePostcardClass('/bottom-sheet/right')}>Right Sheet</a>
        </Link>
        <Link href='/bottom-sheet/top'>
          <a className={usePostcardClass('/bottom-sheet/top')}>Top Sheet</a>
        </Link>
      </div>

      <h2>Overlay</h2>
      <div className={styles.postCardGrid}>
        {data.map((id) => (
          <Link key={id} href={`/single-stack/${id}`}>
            <a className={usePostcardClass(`/single-stack/${id}`)}>{id}</a>
          </Link>
        ))}
      </div>

      <h2>Stacking multiple overlays on top of each other</h2>
      <div className={styles.postCardGrid}>
        {data.map((id) => (
          <Link key={id} href={`/multi-stack/${id}`}>
            <a className={usePostcardClass(`/multi-stack/${id}`)}>{id}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}
