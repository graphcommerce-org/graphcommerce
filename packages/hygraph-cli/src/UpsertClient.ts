import type {
  BatchMigrationCreateComponentFieldInput,
  BatchMigrationCreateComponentInput,
  BatchMigrationCreateComponentUnionFieldInput,
  BatchMigrationCreateEnumerableFieldInput,
  BatchMigrationCreateEnumerationInput,
  BatchMigrationCreateLocaleInput,
  BatchMigrationCreateModelInput,
  BatchMigrationCreateRelationalFieldInput,
  BatchMigrationCreateSimpleFieldInput,
  BatchMigrationCreateStageInput,
  BatchMigrationCreateUnionFieldInput,
} from '@hygraph/management-sdk'
import { Client } from '@hygraph/management-sdk'
import type { Schema } from './types'

interface MigrationParams {
  name?: string
  endpoint: string
  authToken: string
}

export class UpsertClient extends Client {
  constructor(
    params: MigrationParams,
    private schema: Schema,
  ) {
    super(params)
  }

  /** @public */
  upsertModel(data: BatchMigrationCreateModelInput) {
    const exists = this.schema.models.some((m) => m.apiId === data.apiId)
    return exists ? this.createModel(data) : this.updateModel(data)
  }

  /** @public */
  upsertComponent(data: BatchMigrationCreateComponentInput) {
    const exists = this.schema.models.some((m) => m.apiId === data.apiId)
    return exists ? this.createComponent(data) : this.updateComponent(data)
  }

  /** @public */
  upsertSimpleField(data: BatchMigrationCreateSimpleFieldInput) {
    const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    const exists = model?.fields.some((f) => f.apiId === data.apiId)
    return exists
      ? this.createSimpleField(data)
      : this.updateSimpleField({ ...data, embeddableModels: undefined })
  }

  // upsertRemoteField(data: BatchMigrationCreateRemoteFieldInput) {
  //   const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
  //   const exists = model?.fields.some((f) => f.apiId === data.apiId)
  //   return exists ? this.createRemoteField(data) : this.updateRemoteField(data)
  // }

  /** @public */
  upsertRelationalField(data: BatchMigrationCreateRelationalFieldInput) {
    const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    const exists = model?.fields.some((f) => f.apiId === data.apiId)
    return exists ? this.createRelationalField(data) : this.updateRelationalField(data)
  }

  /** @public */
  upsertUnionField(data: BatchMigrationCreateUnionFieldInput) {
    const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    const exists = model?.fields.some((f) => f.apiId === data.apiId)
    return exists ? this.createUnionField(data) : this.updateUnionField(data)
  }

  /** @public */
  upsertComponentField(data: BatchMigrationCreateComponentFieldInput) {
    const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    const exists = model?.fields.some((f) => f.apiId === data.apiId)
    return exists ? this.createComponentField(data) : this.updateComponentField(data)
  }

  /** @public */
  upsertComponentUnionField(data: BatchMigrationCreateComponentUnionFieldInput) {
    const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    const exists = model?.fields.some((f) => f.apiId === data.apiId)
    return exists ? this.createComponentUnionField(data) : this.updateComponentUnionField(data)
  }

  /** @public */
  upsertEnumeration(data: BatchMigrationCreateEnumerationInput) {
    const exists = this.schema.enumerations.some((e) => e.apiId === data.apiId)
    return exists ? this.createEnumeration(data) : this.updateEnumeration(data)
  }

  /** @public */
  upsertEnumerableField(data: BatchMigrationCreateEnumerableFieldInput) {
    const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    const exists = model?.fields.some((f) => f.apiId === data.apiId)
    return exists ? this.createEnumerableField(data) : this.updateEnumerableField(data)
  }

  /** @public */
  upsertStage(data: BatchMigrationCreateStageInput) {
    const exists = this.schema.stages.some((m) => m.apiId === data.apiId)
    return exists ? this.createStage(data) : this.updateStage(data)
  }

  /** @public */
  upsertLocale(data: BatchMigrationCreateLocaleInput) {
    const exists = this.schema.locales.some((m) => m.apiId === data.apiId)
    return exists ? this.createLocale(data) : this.updateLocale(data)
  }
}
