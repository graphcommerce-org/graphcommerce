import React from 'react'

if (React.createContext) {
  console.log('React.createContext')
} else {
  console.log('React.createContext not found')
}

export * from './server/storefrontContext'
export * from './server/urlFromParams'
