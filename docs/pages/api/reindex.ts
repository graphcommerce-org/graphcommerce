import { DocumentIndexer } from '../../lib/DocumentIndexer'
import { typesenseIndexerHandler } from '../../lib/typesense/typesenseIndexerHandler'

export default typesenseIndexerHandler([new DocumentIndexer('content')])
