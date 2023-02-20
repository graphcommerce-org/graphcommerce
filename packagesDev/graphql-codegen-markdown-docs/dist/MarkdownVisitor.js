"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownVisitor = void 0;
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-template */
const typescript_1 = require("@graphql-codegen/typescript");
const visitor_plugin_common_1 = require("@graphql-codegen/visitor-plugin-common");
const graphql_1 = require("./graphql");
const importZod = `import { z } from 'zod'`;
const anySchema = `definedNonNullAnySchema`;
const MarkdownVisitor = (schema, config) => {
    const tsVisitor = new typescript_1.TsVisitor(schema, config);
    const importTypes = [];
    return {
        buildImports: () => 
        // if (config.importFrom && importTypes.length > 0) {
        //   return [importZod, `import { ${importTypes.join(', ')} } from '${config.importFrom}'`]
        // }
        [importZod],
        initialEmit: () => '\n' +
            [
                new visitor_plugin_common_1.DeclarationBlock({})
                    .asKind('type')
                    .withName('Properties<T>')
                    .withContent(['Required<{', '  [K in keyof T]: z.ZodType<T[K], any, T[K]>;', '}>'].join('\n')).string,
                // Unfortunately, zod doesn’t provide non-null defined any schema.
                // This is a temporary hack until it is fixed.
                // see: https://github.com/colinhacks/zod/issues/884
                new visitor_plugin_common_1.DeclarationBlock({}).asKind('type').withName('definedNonNullAny').withContent('{}')
                    .string,
                new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('const')
                    .withName(`isDefinedNonNullAny`)
                    .withContent(`(v: any): v is definedNonNullAny => v !== undefined && v !== null`).string,
                new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('const')
                    .withName(`${anySchema}`)
                    .withContent(`z.any().refine((v) => isDefinedNonNullAny(v))`).string,
            ].join('\n'),
        InputObjectTypeDefinition: (node) => {
            const name = tsVisitor.convertName(node.name.value);
            importTypes.push(name);
            const shape = node.fields
                ?.map((field) => generateFieldZodSchema(config, tsVisitor, schema, field, 2))
                .join(',\n');
            return new visitor_plugin_common_1.DeclarationBlock({})
                .export()
                .asKind('function')
                .withName(`${name}Schema(): z.ZodObject<Properties<${name}>>`)
                .withBlock([(0, visitor_plugin_common_1.indent)(`return z.object<Properties<${name}>>({`), shape, (0, visitor_plugin_common_1.indent)('})')].join('\n')).string;
        },
        ObjectTypeDefinition: ObjectTypeDefinitionBuilder(true, (node) => {
            const name = tsVisitor.convertName(node.name.value);
            importTypes.push(name);
            const shape = node.fields
                ?.map((field) => generateFieldZodSchema(config, tsVisitor, schema, field, 2))
                .join(',\n');
            return new visitor_plugin_common_1.DeclarationBlock({})
                .export()
                .asKind('function')
                .withName(`${name}Schema(): z.ZodObject<Properties<${name}>>`)
                .withBlock([
                (0, visitor_plugin_common_1.indent)(`return z.object<Properties<${name}>>({`),
                (0, visitor_plugin_common_1.indent)(`__typename: z.literal('${node.name.value}').optional(),`, 2),
                shape,
                (0, visitor_plugin_common_1.indent)('})'),
            ].join('\n')).string;
        }),
        EnumTypeDefinition: (node) => {
            const enumname = tsVisitor.convertName(node.name.value);
            importTypes.push(enumname);
            if (config.enumsAsTypes) {
                return new visitor_plugin_common_1.DeclarationBlock({})
                    .export()
                    .asKind('const')
                    .withName(`${enumname}Schema`)
                    .withContent(`z.enum([${node.values
                    ?.map((enumOption) => `'${enumOption.name.value}'`)
                    .join(', ')}])`).string;
            }
            return new visitor_plugin_common_1.DeclarationBlock({})
                .export()
                .asKind('const')
                .withName(`${enumname}Schema`)
                .withContent(`z.nativeEnum(${enumname})`).string;
        },
        UnionTypeDefinition: (node) => {
            if (!node.types)
                return undefined;
            const unionName = tsVisitor.convertName(node.name.value);
            const unionElements = node.types
                .map((t) => `${tsVisitor.convertName(t.name.value)}Schema()`)
                .join(', ');
            const unionElementsCount = node.types.length ?? 0;
            const union = unionElementsCount > 1
                ? (0, visitor_plugin_common_1.indent)(`return z.union([${unionElements}])`)
                : (0, visitor_plugin_common_1.indent)(`return ${unionElements}`);
            return new visitor_plugin_common_1.DeclarationBlock({})
                .export()
                .asKind('function')
                .withName(`${unionName}Schema()`)
                .withBlock(union).string;
        },
    };
};
exports.MarkdownVisitor = MarkdownVisitor;
const generateFieldZodSchema = (config, tsVisitor, schema, field, indentCount) => {
    const gen = generateFieldTypeZodSchema(config, tsVisitor, schema, field, field.type);
    return (0, visitor_plugin_common_1.indent)(`${field.name.value}: ${maybeLazy(field.type, gen)}`, indentCount);
};
const generateFieldTypeZodSchema = (config, tsVisitor, schema, field, type, parentType) => {
    if ((0, graphql_1.isListType)(type)) {
        const gen = generateFieldTypeZodSchema(config, tsVisitor, schema, field, type.type, type);
        if (!(0, graphql_1.isNonNullType)(parentType)) {
            const arrayGen = `z.array(${maybeLazy(type.type, gen)})`;
            const maybeLazyGen = applyDirectives(config, field, arrayGen);
            return `${maybeLazyGen}.nullish()`;
        }
        return `z.array(${maybeLazy(type.type, gen)})`;
    }
    if ((0, graphql_1.isNonNullType)(type)) {
        const gen = generateFieldTypeZodSchema(config, tsVisitor, schema, field, type.type, type);
        return maybeLazy(type.type, gen);
    }
    if ((0, graphql_1.isNamedType)(type)) {
        const gen = generateNameNodeZodSchema(config, tsVisitor, schema, type.name);
        if ((0, graphql_1.isListType)(parentType)) {
            return `${gen}.nullable()`;
        }
        const appliedDirectivesGen = applyDirectives(config, field, gen);
        if ((0, graphql_1.isNonNullType)(parentType)) {
            // if (config.notAllowEmptyString === true) {
            //   const tsType = tsVisitor.scalars[type.name.value]
            //   if (tsType === 'string') return `${appliedDirectivesGen}.min(1)`
            // }
            return appliedDirectivesGen;
        }
        if ((0, graphql_1.isListType)(parentType)) {
            return `${appliedDirectivesGen}.nullable()`;
        }
        return `${appliedDirectivesGen}.nullish()`;
    }
    console.warn('unhandled type:', type);
    return '';
};
const applyDirectives = (config, field, gen) => 
// if (config.directives && field.directives) {
//   const formatted = formatDirectiveConfig(config.directives)
//   return gen + buildApi(formatted, field.directives)
// }
gen;
const generateNameNodeZodSchema = (config, tsVisitor, schema, node) => {
    const typ = schema.getType(node.value);
    if (typ?.astNode?.kind === 'InputObjectTypeDefinition') {
        const enumName = tsVisitor.convertName(typ.astNode.name.value);
        return `${enumName}Schema()`;
    }
    if (typ?.astNode?.kind === 'ObjectTypeDefinition') {
        const enumName = tsVisitor.convertName(typ.astNode.name.value);
        return `${enumName}Schema()`;
    }
    if (typ?.astNode?.kind === 'EnumTypeDefinition') {
        const enumName = tsVisitor.convertName(typ.astNode.name.value);
        return `${enumName}Schema`;
    }
    if (typ?.astNode?.kind === 'UnionTypeDefinition') {
        const enumName = tsVisitor.convertName(typ.astNode.name.value);
        return `${enumName}Schema()`;
    }
    return zod4Scalar(config, tsVisitor, node.value);
};
const maybeLazy = (type, schema) => {
    if ((0, graphql_1.isNamedType)(type) && (0, graphql_1.isInput)(type.name.value)) {
        return `z.lazy(() => ${schema})`;
    }
    return schema;
};
const zod4Scalar = (config, tsVisitor, scalarName) => {
    const tsType = tsVisitor.scalars[scalarName];
    switch (tsType) {
        case 'string':
            return `z.string()`;
        case 'number':
            return `z.number()`;
        case 'boolean':
            return `z.boolean()`;
    }
    console.warn('unhandled scalar name:', scalarName);
    return anySchema;
};
