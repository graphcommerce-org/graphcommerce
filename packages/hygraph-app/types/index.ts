export type ProductProperty = {
  label: string
  id: string
  type?: string
}

export type Interface = {
  __type: __Type
}

export type __Type = {
  kind?: __TypeKind
  name?: string
  description?: string
  fields: __Field[]
  ofType?: { name?: string; fields: __Field[] }
}

export type __TypeKind =
  | 'SCALAR'
  | 'OBJECT'
  | 'INTERFACE'
  | 'UNION'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL'

export type __Field = {
  name: string
  description?: string
  type: __Type
}

export type Option = { id: string; label: string }

export type Options = { text: Option[]; number: Option[] }

export type ObjectType = Record<string, unknown>
