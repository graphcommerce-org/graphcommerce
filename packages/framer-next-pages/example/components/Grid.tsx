import Link from 'next/link'
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

      <h2>Framer-sheet, using a single overlay</h2>
      <div className={styles.postCardGrid}>
        <Link href='/single-stack/bottom'>
          <a className={usePostcardClass('/bottom-sheet/bottom')}>Bottom Sheet</a>
        </Link>
        <Link href='/single-stack/left'>
          <a className={usePostcardClass('/bottom-sheet/left')}>Left Sheet</a>
        </Link>
        <Link href='/single-stack/right'>
          <a className={usePostcardClass('/bottom-sheet/right')}>Right Sheet</a>
        </Link>
        <Link href='/single-stack/top'>
          <a className={usePostcardClass('/bottom-sheet/top')}>Top Sheet</a>
        </Link>
      </div>

      <h2>Framer-sheet, using a multiple stacked overlays</h2>
      <div className={styles.postCardGrid}>
        <Link href='/multi-stack/bottom'>
          <a className={usePostcardClass('/bottom-sheet/bottom')}>Bottom Sheet</a>
        </Link>
        <Link href='/multi-stack/left'>
          <a className={usePostcardClass('/bottom-sheet/left')}>Left Sheet</a>
        </Link>
        <Link href='/multi-stack/right'>
          <a className={usePostcardClass('/bottom-sheet/right')}>Right Sheet</a>
        </Link>
        <Link href='/multi-stack/top'>
          <a className={usePostcardClass('/bottom-sheet/top')}>Top Sheet</a>
        </Link>
      </div>
    </div>
  )
}
