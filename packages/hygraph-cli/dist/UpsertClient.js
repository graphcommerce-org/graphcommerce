"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertClient = void 0;
const management_sdk_1 = require("@hygraph/management-sdk");
class UpsertClient extends management_sdk_1.Client {
    schema;
    constructor(params, schema) {
        super(params);
        this.schema = schema;
    }
    /** @public */
    upsertModel(data) {
        const exists = this.schema.models.some((m) => m.apiId === data.apiId);
        return exists ? this.createModel(data) : this.updateModel(data);
    }
    /** @public */
    upsertComponent(data) {
        const exists = this.schema.models.some((m) => m.apiId === data.apiId);
        return exists ? this.createComponent(data) : this.updateComponent(data);
    }
    /** @public */
    upsertSimpleField(data) {
        const model = this.schema.models.find((m) => m.apiId === data.parentApiId);
        const exists = model?.fields.some((f) => f.apiId === data.apiId);
        return exists
            ? this.createSimpleField(data)
            : this.updateSimpleField({ ...data, embeddableModels: undefined });
    }
    // upsertRemoteField(data: BatchMigrationCreateRemoteFieldInput) {
    //   const model = this.schema.models.find((m) => m.apiId === data.parentApiId)
    //   const exists = model?.fields.some((f) => f.apiId === data.apiId)
    //   return exists ? this.createRemoteField(data) : this.updateRemoteField(data)
    // }
    /** @public */
    upsertRelationalField(data) {
        const model = this.schema.models.find((m) => m.apiId === data.parentApiId);
        const exists = model?.fields.some((f) => f.apiId === data.apiId);
        return exists ? this.createRelationalField(data) : this.updateRelationalField(data);
    }
    /** @public */
    upsertUnionField(data) {
        const model = this.schema.models.find((m) => m.apiId === data.parentApiId);
        const exists = model?.fields.some((f) => f.apiId === data.apiId);
        return exists ? this.createUnionField(data) : this.updateUnionField(data);
    }
    /** @public */
    upsertComponentField(data) {
        const model = this.schema.models.find((m) => m.apiId === data.parentApiId);
        const exists = model?.fields.some((f) => f.apiId === data.apiId);
        return exists ? this.createComponentField(data) : this.updateComponentField(data);
    }
    /** @public */
    upsertComponentUnionField(data) {
        const model = this.schema.models.find((m) => m.apiId === data.parentApiId);
        const exists = model?.fields.some((f) => f.apiId === data.apiId);
        return exists ? this.createComponentUnionField(data) : this.updateComponentUnionField(data);
    }
    /** @public */
    upsertEnumeration(data) {
        const exists = this.schema.enumerations.some((e) => e.apiId === data.apiId);
        return exists ? this.createEnumeration(data) : this.updateEnumeration(data);
    }
    /** @public */
    upsertEnumerableField(data) {
        const model = this.schema.models.find((m) => m.apiId === data.parentApiId);
        const exists = model?.fields.some((f) => f.apiId === data.apiId);
        return exists ? this.createEnumerableField(data) : this.updateEnumerableField(data);
    }
    /** @public */
    upsertStage(data) {
        const exists = this.schema.stages.some((m) => m.apiId === data.apiId);
        return exists ? this.createStage(data) : this.updateStage(data);
    }
    /** @public */
    upsertLocale(data) {
        const exists = this.schema.locales.some((m) => m.apiId === data.apiId);
        return exists ? this.createLocale(data) : this.updateLocale(data);
    }
}
exports.UpsertClient = UpsertClient;
