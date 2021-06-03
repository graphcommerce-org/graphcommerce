import { usePageRouter } from '@reachdigital/framer-next-pages'
import Link from 'next/link'
import styles from './styles.module.css'

export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function PostCardGrid() {
  const pageRouter = usePageRouter()
  return (
    <div className={styles.postCardGridWrapper}>
      <Link href='/'>
        <a className={styles.postCard}>Index Page</a>
      </Link>

      <h2>Overlay</h2>
      <div className={styles.postCardGrid}>
        {data.map((id) => (
          <Link key={id} href={`/single-stack/${id}`}>
            <a
              className={`${styles.postCard} ${
                pageRouter.asPath === `/single-stack/${id}` && styles.postCardActive
              }`}
            >
              {id}
            </a>
          </Link>
        ))}
      </div>

      <h2>Stacking multiple overlays on top of each other</h2>
      <div className={styles.postCardGrid}>
        {data.map((id) => (
          <Link key={id} href={`/multi-stack/${id}`}>
            <a
              className={`${styles.postCard} ${
                pageRouter.asPath === `/multi-stack/${id}` && styles.postCardActive
              }`}
            >
              {id}
            </a>
          </Link>
        ))}
      </div>

      <h2>Framer-sheet</h2>
      <div className={styles.postCardGrid}>
        <Link href='/bottom-sheet/bottom'>
          <a
            className={`${styles.postCard} ${
              pageRouter.asPath === `/bottom-sheet/1` && styles.postCardActive
            }`}
          >
            Bottom Sheet
          </a>
        </Link>
        <Link href='/bottom-sheet/left'>
          <a
            className={`${styles.postCard} ${
              pageRouter.asPath === `/bottom-sheet/1` && styles.postCardActive
            }`}
          >
            Left Sheet
          </a>
        </Link>
        <Link href='/bottom-sheet/right'>
          <a
            className={`${styles.postCard} ${
              pageRouter.asPath === `/bottom-sheet/1` && styles.postCardActive
            }`}
          >
            Right Sheet
          </a>
        </Link>
        <Link href='/bottom-sheet/top'>
          <a
            className={`${styles.postCard} ${
              pageRouter.asPath === `/bottom-sheet/1` && styles.postCardActive
            }`}
          >
            Top Sheet
          </a>
        </Link>
      </div>
    </div>
  )
}
