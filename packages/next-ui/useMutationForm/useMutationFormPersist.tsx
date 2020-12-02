import { TypedDocumentNode } from '@apollo/client'
import { DocumentNode } from 'graphql'
import { useState, useEffect } from 'react'
import { UseFormOptions, OnCompleteFn, useMutationForm } from '.'

function useDocumentHash(document: DocumentNode) {
  const [hash, setHash] = useState<string>()

  useEffect(() => {
    const string = JSON.stringify(document).replace(/\s+/g, '')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const hashBuffer = await window.crypto.subtle.digest('SHA-1', Buffer.from(string, 'binary'))
      const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
      setHash(hashHex)
    })()
  }, [document])

  return hash
}

/**
 * todo(paales): ability to not store sensitive data
 */
export default function useMutationFormPersist<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormOptions<V> & {
    onBeforeSubmit?: (variables: V) => V | Promise<V>
    onComplete?: OnCompleteFn<Q>
  } = {},
) {
  const mutationForm = useMutationForm<Q, V>(document, options)
  const { watch, reset } = mutationForm

  // Retrieve stored data
  const name = useDocumentHash(document)
  useEffect(() => {
    if (typeof window === 'undefined' || !name) return

    try {
      const storedFormStr = window.sessionStorage[name]
      if (!storedFormStr) return
      reset(JSON.parse(storedFormStr))
    } finally {
      // corrupt data or sessionStorage not available
    }
  }, [name, reset])

  // Watch for changes
  useEffect(() => {
    if (typeof window === 'undefined' || !name) return
    try {
      window.sessionStorage[name] = JSON.stringify(watch())
    } finally {
      // sessionStorage not available
    }
  }, [name, watch])

  return mutationForm
}
