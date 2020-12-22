import React from 'react'

export type ExpensiveComponentProps = {
  someField: string
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = ({ children, someField }) => (
  <div>
    {children} {someField}
  </div>
)

export default ExpensiveComponent
