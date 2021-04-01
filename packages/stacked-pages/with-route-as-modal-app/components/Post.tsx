import styles from './styles.module.css'

const Post = ({ id, pathname }) => (
  <div className={styles.post}>
    I am the post {id}; my pathname is: {pathname}
  </div>
)

export default Post
