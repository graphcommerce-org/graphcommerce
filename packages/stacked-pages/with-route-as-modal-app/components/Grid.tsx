import Link from 'next/link'
import styles from './styles.module.css'

export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function PostCardGrid() {
  return (
    <div className={styles.postCardGridWrapper}>
      <h2>Single stack overlays</h2>
      <div className={styles.postCardGrid}>
        {data.map((id) => (
          <Link key={id} href={`/single-stack/${id}`}>
            <a className={styles.postCard}>{id}</a>
          </Link>
        ))}
      </div>

      <h2>Multi stack overlays</h2>
      <div className={styles.postCardGrid}>
        {data.map((id) => (
          <Link key={id} href={`/multi-stack/${id}`}>
            <a className={styles.postCard}>{id}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}
