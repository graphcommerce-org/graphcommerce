import React, { useRef } from 'react'
import AsyncComponent from '..'
import { ExpensiveComponentProps } from './ExpensiveComponent'

const ExpensiveComponentLoader: React.FC<ExpensiveComponentProps> = (props) => {
  // Create a ref for the element that will be checked for visibility.
  const ref = useRef<HTMLDivElement>(null)
  return (
    <AsyncComponent
      // Provide a callback with the dynamic import
      loader={() => import('./ExpensiveComponent')}
      // Pass down the ref that is to be watched for visibility
      measureRef={ref}
      // Create the skeleton and pass the ref to an element
      // Use something like @material-ui/lab/Skeleton to create a nice looking skeleton
      skeleton={<div ref={ref}>Loadinggggin</div>}
      {...props}
    />
  )
}

export default ExpensiveComponentLoader
