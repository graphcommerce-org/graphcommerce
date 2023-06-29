"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationAction = exports.graphcommerceLog = exports.capitalize = void 0;
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
exports.capitalize = capitalize;
const graphcommerceLog = (message, type) => {
    const color = {
        error: '\x1b[31m\x1b[1m%s\x1b[0m',
        warning: '\x1b[33m\x1b[1m%s\x1b[0m',
        info: '\x1b[36m\x1b[1m%s\x1b[0m',
    };
    // eslint-disable-next-line no-console
    console.log(type ? color[type] : '', `[GraphCommerce]: ${message}`);
};
exports.graphcommerceLog = graphcommerceLog;
const migrationAction = (client, schema, type, action, props, parentApiId, parentType) => {
    const alreadyExists = () => {
        if (type === 'model') {
            return schema.models.some((model) => model.apiId === props.apiId);
        }
        if (type === 'component') {
            return schema.components.some((component) => component.apiId === props.apiId);
        }
        if (type === 'enumeration') {
            return schema.enumerations.some((enumeration) => enumeration.apiId === props.apiId);
        }
        if (type === 'simpleField') {
            if (parentType === 'model') {
                const modelparent = schema.models.find((model) => model.apiId === parentApiId);
                return modelparent?.fields.some((field) => field.apiId === props.apiId);
            }
            if (parentType === 'component') {
                const componentparent = schema.components.find((component) => component.apiId === parentApiId);
                return componentparent?.fields.some((field) => field.apiId === props.apiId);
            }
        }
        if (type === 'componentField') {
            if (parentType === 'component') {
                const componentparent = schema.components.find((component) => component.apiId === parentApiId);
                return componentparent?.fields.some((field) => field.apiId === props.apiId);
            }
        }
        if (type === 'enumerableField') {
            if (parentType === 'model') {
                const modelparent = schema.models.find((model) => model.apiId === parentApiId);
                return modelparent?.fields.some((field) => field.apiId === props.apiId);
            }
            if (parentType === 'component') {
                const componentparent = schema.components.find((component) => component.apiId === parentApiId);
                return componentparent?.fields.some((field) => field.apiId === props.apiId);
            }
        }
        if (type === 'relationalField') {
            if (parentType === 'model') {
                const modelparent = schema.models.find((model) => model.apiId === parentApiId);
                return modelparent?.fields.some((field) => field.apiId === props.apiId);
            }
            if (parentType === 'component') {
                const componentparent = schema.components.find((component) => component.apiId === parentApiId);
                return componentparent?.fields.some((field) => field.apiId === props.apiId);
            }
        }
        if (type === 'unionField') {
            if (parentType === 'model') {
                const modelparent = schema.models.find((model) => model.apiId === parentApiId);
                return modelparent?.fields.some((field) => field.apiId === props.apiId);
            }
            if (parentType === 'component') {
                const componentparent = schema.components.find((component) => component.apiId === parentApiId);
                return componentparent?.fields.some((field) => field.apiId === props.apiId);
            }
        }
        if (type === 'componentUnionField') {
            if (parentType === 'model') {
                const modelparent = schema.models.find((model) => model.apiId === parentApiId);
                return modelparent?.fields.some((field) => field.apiId === props.apiId);
            }
            if (parentType === 'component') {
                const componentparent = schema.components.find((component) => component.apiId === parentApiId);
                return componentparent?.fields.some((field) => field.apiId === props.apiId);
            }
        }
        return true;
    };
    const validPropMap = {
        model: {
            create: 'BatchMigrationCreateModelInput',
            update: 'BatchMigrationUpdateModelInput',
            delete: 'BatchMigrationDeleteModelInput',
        },
        component: {
            create: 'BatchMigrationCreateComponentInput',
            update: 'BatchMigrationUpdateComponentInput',
            delete: 'BatchMigrationDeleteComponentInput',
        },
        enumeration: {
            create: 'BatchMigrationCreateEnumerationInput',
            update: 'BatchMigrationUpdateEnumerationInput',
            delete: 'BatchMigrationDeleteEnumerationInput',
        },
        simpleField: {
            create: 'BatchMigrationCreateSimpleFieldInput',
            update: 'BatchMigrationUpdateSimpleFieldInput',
            delete: 'BatchMigrationDeleteFieldInput',
        },
        componentField: {
            create: 'BatchMigrationCreateComponentFieldInput',
            update: 'BatchMigrationUpdateComponentFieldInput',
            delete: 'BatchMigrationDeleteFieldInput',
        },
        enumerableField: {
            create: 'BatchMigrationCreateEnumerableFieldInput',
            update: 'BatchMigrationUpdateEnumerableFieldInput',
            delete: 'BatchMigrationDeleteFieldInput',
        },
        relationalField: {
            create: 'BatchMigrationCreateRelationalFieldInput',
            update: 'BatchMigrationUpdateRelationalFieldInput',
            delete: 'BatchMigrationDeleteFieldInput',
        },
        unionField: {
            create: 'BatchMigrationCreateUnionFieldInput',
            update: 'BatchMigrationUpdateUnionFieldInput',
            delete: 'BatchMigrationDeleteFieldInput',
        },
        componentUnionField: {
            create: 'BatchMigrationCreateComponentUnionFieldInput',
            update: 'BatchMigrationUpdateComponentUnionFieldInput',
            delete: 'BatchMigrationDeleteFieldInput',
        },
    };
    const actionMap = {
        create: {
            model: (innerprops) => client.createModel(innerprops),
            component: (innerprops) => client.createComponent(innerprops),
            enumeration: (innerprops) => client.createEnumeration(innerprops),
            simpleField: (innerprops) => client.createSimpleField(innerprops),
            enumerableField: (innerprops) => client.createEnumerableField(innerprops),
            componentField: (innerprops) => client.createComponentField(innerprops),
            relationalField: (innerprops) => client.createRelationalField(innerprops),
            unionField: (innerprops) => client.createUnionField(innerprops),
            componentUnionField: (innerprops) => client.createComponentUnionField(innerprops),
        },
        update: {
            model: (innerprops) => client.updateModel(innerprops),
            component: (innerprops) => client.updateComponent(innerprops),
            enumeration: (innerprops) => client.updateEnumeration(innerprops),
            simpleField: (innerprops) => client.updateSimpleField(innerprops),
            enumerableField: (innerprops) => client.updateEnumerableField(innerprops),
            componentField: (innerprops) => client.updateComponentField(innerprops),
            relationalField: (innerprops) => client.updateRelationalField(innerprops),
            unionField: (innerprops) => client.updateUnionField(innerprops),
            componentUnionField: (innerprops) => client.updateComponentUnionField(innerprops),
        },
        delete: {
            model: (innerprops) => client.deleteModel(innerprops),
            component: (innerprops) => client.deleteComponent(innerprops),
            enumeration: (innerprops) => client.deleteEnumeration(innerprops),
            simpleField: (innerprops) => client.deleteField(innerprops),
            enumerableField: (innerprops) => client.deleteField(innerprops),
            componentField: (innerprops) => client.deleteField(innerprops),
            relationalField: (innerprops) => client.deleteField(innerprops),
            unionField: (innerprops) => client.deleteField(innerprops),
            componentUnionField: (innerprops) => client.deleteField(innerprops),
        },
    };
    const validProp = validPropMap[type] && validPropMap[type][action];
    const actionFunc = actionMap[action] && actionMap[action][type];
    if (!alreadyExists()) {
        if (validProp && actionFunc) {
            (0, exports.graphcommerceLog)(`${(0, exports.capitalize)(action)} ${type} with apiId ${props.apiId}...`);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore | This error is a loss on typescript autocomplete, but the function is called correctly
            actionFunc(props);
        }
    }
    else {
        (0, exports.graphcommerceLog)(`${(0, exports.capitalize)(type)} with apiId ${props.apiId} already exists`, 'warning');
    }
};
exports.migrationAction = migrationAction;
