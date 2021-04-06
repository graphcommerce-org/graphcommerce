import Link from 'next/link'
import { usePageRouter } from '../../dist'
import styles from './styles.module.css'

export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function PostCardGrid() {
  const pageRouter = usePageRouter()
  return (
    <div className={styles.postCardGridWrapper}>
      <Link href='/'>
        <a className={`${styles.postCard} ${pageRouter.asPath === `/` && styles.postCardActive}`}>
          Index Page
        </a>
      </Link>

      <h2>Single stack overlays</h2>
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

      <h2>Multi stack overlays</h2>
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
    </div>
  )
}
