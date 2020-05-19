import React from 'react'
import AsyncComponent from '..'
import { ExpensiveComponentProps } from './ExpensiveComponent'

const ExpensiveComponentLoader: React.FC<ExpensiveComponentProps> = (props) => {
  return (
    <AsyncComponent
      // Provide a callback with the dynamic import
      loader={() => import('./ExpensiveComponent')}
      // Create the skeleton and pass the ref to an element
      // Use something like @material-ui/lab/Skeleton to create a nice looking skeleton
      skeleton={(ref) => <div ref={ref}>Loadinggggin</div>}
      {...props}
    />
  )
}

export default ExpensiveComponentLoader
