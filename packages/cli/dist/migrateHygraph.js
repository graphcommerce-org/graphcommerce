'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.migrateHygraph = void 0
/* eslint-disable import/no-extraneous-dependencies */
const management_sdk_1 = require('@hygraph/management-sdk')
const migrationDynamicRows = async (name) => {
  const client = new management_sdk_1.Client({
    authToken: '',
    endpoint: 'https://api-eu-central-1.hygraph.com/v2/ckhx7xadya6xs01yxdujt8i80/master',
    name,
  })
  client.createModel({
    apiId: 'TestDynamicRow',
    apiIdPlural: 'TestDynamicRows',
    displayName: 'Test Dynamic Row',
    description:
      'Dynamic rows allow you to add specific Row models to pages based on the properties of the page',
  })
  // client.createSimpleField({
  //   displayName: 'Internal name',
  //   apiId: 'internalName',
  //   description: 'Only used for internal reference',
  //   type: SimpleFieldType.String,
  //   parentApiId: 'TestDynamicRow',
  //   isTitle: true,
  //   isRequired: true,
  //   isUnique: true,
  // })
  // client.createRelationalField({
  //   displayName: 'Row',
  //   apiId: 'row',
  //   type: RelationalFieldType.Relation,
  //   parentApiId: 'TestDynamicRow',
  //   reverseField: {
  //     apiId: 'RowQuote',
  //     displayName: 'Row Quote',
  //     modelApiId: 'RowQuote',
  //     isUnidirectional: true,
  //   },
  // })
  // // ? Components incomplete
  // client.createComponent({
  //   displayName: 'AND',
  //   apiId: 'ConditionAnd',
  //   apiIdPlural: 'ConditionAnds',
  //   description: 'All of these conditions must match',
  // })
  // client.createComponentField({
  //   componentApiId: 'ConditionAnd',
  //   parentApiId: 'ConditionAnd',
  //   apiId: 'conditions',
  //   displayName: 'Conditions',
  // })
  // client.createComponent({
  //   displayName: 'OR',
  //   apiId: 'ConditionOr',
  //   apiIdPlural: 'ConditionOrs',
  //   description: 'One of these conditions must match',
  // })
  // client.createComponentField({
  //   componentApiId: 'ConditionOr',
  //   parentApiId: 'ConditionOr',
  //   apiId: 'conditions',
  //   displayName: 'Conditions',
  // })
  // client.createComponent({
  //   displayName: 'Number',
  //   apiId: 'ConditionNumber',
  //   apiIdPlural: 'ConditionNumbers',
  // })
  // client.createComponent({
  //   displayName: 'Text',
  //   apiId: 'ConditionText',
  //   apiIdPlural: 'ConditionTexts',
  // })
  // ? Enums incomplete
  const changes = client.dryRun()
  console.log(changes)
  const result = await client.run(true)
  return result
}
async function migrateHygraph() {
  const forceRun = true
  const possibleMigrations = [['migrationDynamicRows_fake2', migrationDynamicRows]]
  for (const [name, migration] of possibleMigrations) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await migration(forceRun ? undefined : name)
      console.log(result)
      if (result.status !== 'SUCCESS') {
        throw new Error(`Migration not successful: ${result.status} ${name}:\n${result.errors}`)
      }
      console.log(`Migration successful: ${name}`)
    } catch (err) {
      if (err instanceof Error) {
        const garbledErrorIndex = err.message.indexOf(': {"')
        const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message
        console.error(msg)
      }
    }
  }
}
exports.migrateHygraph = migrateHygraph
