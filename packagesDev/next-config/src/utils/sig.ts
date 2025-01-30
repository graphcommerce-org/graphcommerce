// import necessary modules
import crypto from 'crypto'

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var gcl: string[] | undefined
}

// Function to generate a license key based on input data
export function g(data: string[]) {
  const iv = crypto.randomBytes(16) // Initialization vector
  const cipher = crypto.createCipheriv('aes-256-cbc', 'BbcFEkUydGw3nE9ZPm7gbxTIIBQ9IiKN', iv)
  let encrypted = cipher.update(JSON.stringify(data), 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  // Return the IV and the encrypted data as a single string, encoded in base64
  return Buffer.from(`${iv.toString('hex')}:${encrypted}`).toString()
}

// Function to validate and decode the license key
export function sig() {
  const l = process.env[atob('R0NfTElDRU5TRQ==')]
  if (!l) return

  if (!globalThis.gcl)
    try {
      const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        'BbcFEkUydGw3nE9ZPm7gbxTIIBQ9IiKN',
        Buffer.from(l.split(':')[0], 'hex'),
      )
      let decrypted = decipher.update(l.split(':')[1], 'hex', 'utf-8')
      decrypted += decipher.final('utf-8')
      globalThis.gcl = JSON.parse(decrypted) // Parse and return the decoded data
    } catch (error) {
      // Silent
    }
}
