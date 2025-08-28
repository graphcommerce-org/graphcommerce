import dotenv from 'dotenv'
import { findDotOriginalFiles, restoreOriginalFile } from '../interceptors/writeInterceptors'

dotenv.config()

export async function cleanupInterceptors(cwd: string = process.cwd()) {
  console.info('🧹 Starting interceptor cleanup...')

  let restoredCount = 0
  let removedCount = 0

  const originalFiles = await findDotOriginalFiles(cwd)
  console.info(`📂 Found ${originalFiles.length} .original files to restore`)

  for (const originalFile of originalFiles) {
    try {
      await restoreOriginalFile(originalFile)
      removedCount++
    } catch (error) {
      console.error(`❌ Failed to restore ${originalFile}:`, error)
    }
  }

  console.info('✅ Interceptor cleanup completed!')
  console.info(`📊 ${restoredCount} files restored from .original`)
}
