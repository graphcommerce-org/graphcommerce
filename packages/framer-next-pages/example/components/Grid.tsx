import { Link } from '@mui/material'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

export const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function usePostcardClass(asPath: string) {
  const router = useRouter()
  return `${styles.postCard} ${asPath === router.asPath && styles.postCardActive}`
}

export function Grid() {
  return (
    <div className={styles.postCardGridWrapper}>
      <div className={styles.postCardGrid}>
        <Link href='/' className={usePostcardClass('/')}>
          Index Page
        </Link>
        <Link href='/second' className={usePostcardClass('/second')}>
          Second Page
        </Link>
        <Link href='/third' className={usePostcardClass('/third')}>
          Third Page
        </Link>
      </div>

      <h2>Framer-sheet, using a single overlay</h2>
      <div className={styles.postCardGrid}>
        <Link href='/single-stack/bottom' className={usePostcardClass('/bottom-sheet/bottom')}>
          Bottom Sheet
        </Link>
        <Link href='/single-stack/left' className={usePostcardClass('/bottom-sheet/left')}>
          Left Sheet
        </Link>
        <Link href='/single-stack/right' className={usePostcardClass('/bottom-sheet/right')}>
          Right Sheet
        </Link>
        <Link href='/single-stack/top' className={usePostcardClass('/bottom-sheet/top')}>
          Top Sheet
        </Link>
      </div>

      <h2>Framer-sheet, using a multiple stacked overlays</h2>
      <div className={styles.postCardGrid}>
        <Link href='/multi-stack/bottom' className={usePostcardClass('/bottom-sheet/bottom')}>
          Bottom Sheet
        </Link>
        <Link href='/multi-stack/left' className={usePostcardClass('/bottom-sheet/left')}>
          Left Sheet
        </Link>
        <Link href='/multi-stack/right' className={usePostcardClass('/bottom-sheet/right')}>
          Right Sheet
        </Link>
        <Link href='/multi-stack/top' className={usePostcardClass('/bottom-sheet/top')}>
          Top Sheet
        </Link>
      </div>
    </div>
  )
}
