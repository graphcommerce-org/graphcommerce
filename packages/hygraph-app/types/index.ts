export type ProductProperty = {
  label: string
  id: string
  type?: string
}

export type Condition = {
  property?: string
  value?: string | number
  type: 'ConditionText' | 'ConditionNumber' | 'ConditionAnd'
  operator?: string
  conditions?: Condition[]
  id?: string
}

export type ConditionAnd = {
  type: 'ConditionAnd'
  conditions: Condition[]
  id: string
}
