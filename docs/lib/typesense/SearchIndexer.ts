import { ConditionalExcept, Get } from 'type-fest'
import { CollectionFieldSchema } from 'typesense/lib/Typesense/Collection'
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections'
import { Leaves } from './typescript-helpers'

type FieldValues = Record<string, any>

type SchemaType<
  TFieldValues extends FieldValues,
  TFieldPath extends Leaves<TFieldValues>,
  T = Get<TFieldValues, TFieldPath>,
> = T extends object
  ? never
  : T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T

type OptionalType<
  TFieldValues extends FieldValues,
  TFieldPath extends Leaves<TFieldValues>,
  T = Get<TFieldValues, TFieldPath>,
> = T extends undefined ? true : never

export type BaseDocument = {
  id: string
}

export type CreateSchema<Schema extends BaseDocument> = Omit<CollectionCreateSchema, 'fields'> & {
  fields: {
    [K in Leaves<Schema>]: ConditionalExcept<
      {
        type: SchemaType<Schema, K>
        optional: OptionalType<Schema, K>
      } & Omit<CollectionFieldSchema, 'type' | 'optional' | 'name'>,
      never
    >
  }
}

export abstract class SearchIndexer<T extends BaseDocument> {
  name: string

  schema: CollectionCreateSchema

  constructor(schema: CreateSchema<T>) {
    this.name = schema.name

    const fields = Object.entries(schema.fields).map(
      ([name, field]) =>
        ({
          name,
          ...(field as Omit<CollectionFieldSchema, 'name'>),
        } as CollectionFieldSchema),
    )

    this.schema = { ...schema, fields }
  }

  abstract all(): AsyncGenerator<T>
}
