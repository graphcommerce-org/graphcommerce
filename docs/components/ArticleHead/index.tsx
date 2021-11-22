export const ArticleHead = ({ meta }) => (
  <>
    <h1>{meta.title}</h1>
    <div className='details'>
      <p>{meta.description}</p>
      <span>Last modified: {meta.dateModified}</span>
    </div>
  </>
)
