"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrateHygraph = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const management_sdk_1 = require("@hygraph/management-sdk");
const migrationDynamicRows = async (name) => {
    const client = new management_sdk_1.Client({
        authToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODE5ODc0NDYsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuaHlncmFwaC5jb20vdjIvY2toeDd4YWR5YTZ4czAxeXhkdWp0OGk4MC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzg4ZTk4NGItOTg1Mi00MGRmLTk1MjktZmU0ZjQ4MGNkOGUwIiwianRpIjoiY2xnb3p3YzV0NzBiMzAxdWcwNzk5MGJ3dSJ9.s2pV27ZmkXH5SwuFnQjYZBd-Ij2ldrWNkfUQT2sFQ2ybXfEoFYNevFJRNljSELE48HZLD30yy9zqsFUnhRRgypfhuSKzhXUEQa0agi1bBdxhpJX1D8UEGlca_CCmbHAfOTAFPaNklJRXD_vatNpYbDDnuP2E7uog5wmquEPoX2oJxRxrJFwmsUyKHz4gZGUaLJmJv5ZiPCxb7P8SAyz252g47bZunOXGR9RxPWu9BtLnqc1XUxnv8Ji_xshgWigCSJkiJ8cOZTylWdyC40kXMlEtBKeSWjXuhGZS6XaUtEfwx95Bi9EBrmoHmm1dLogWV_8fBEPRMVd2pF2dH6qOmi1ZBdfwx2EPSH_L4IC7NBhEyWXwBEy_NqknD4h7w2V8bt_GYMax_H1j2bZSuMYxH9JgIbSaA2NPobZh0ObuE9O1c_OGqAdKLaDmJmcjnkwu5ScB87eoB5AKj1kw5Xl3XX8hXne1cJUKUIMYIsZpjH233xH21LN9y1SsZJmfHrS6EsywtdPHqLwIFgviULhVikLFAmA_k3qnUHvH9FnSG_uOoGSmd2wvCdf997tqoGa7GtMRckAk1hIxCXuqkWUq0jAm12aXA-dTROWsu_VlbuQASVbB6TS49VLtq6ID13ZrwymQca_3nEBByP1qakNtE-ZWyZ4ltcGHTH1kIYYQhVo',
        endpoint: 'https://api-eu-central-1.hygraph.com/v2/ckhx7xadya6xs01yxdujt8i80/master',
        name,
    });
    client.createModel({
        apiId: 'TestDynamicRow',
        apiIdPlural: 'TestDynamicRows',
        displayName: 'Test Dynamic Row',
        description: 'Dynamic rows allow you to add specific Row models to pages based on the properties of the page',
    });
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
    const changes = client.dryRun();
    console.log(changes);
    const result = await client.run(true);
    return result;
};
async function migrateHygraph() {
    const forceRun = true;
    const possibleMigrations = [
        ['migrationDynamicRows_fake2', migrationDynamicRows],
    ];
    for (const [name, migration] of possibleMigrations) {
        try {
            // eslint-disable-next-line no-await-in-loop
            const result = await migration(forceRun ? undefined : name);
            console.log(result);
            if (result.status !== 'SUCCESS') {
                throw new Error(`Migration not successful: ${result.status} ${name}:\n${result.errors}`);
            }
            console.log(`Migration successful: ${name}`);
        }
        catch (err) {
            if (err instanceof Error) {
                const garbledErrorIndex = err.message.indexOf(': {"');
                const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message;
                console.error(msg);
            }
        }
    }
}
exports.migrateHygraph = migrateHygraph;
