"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrationActionFactory = migrationActionFactory;
const dotenv_1 = __importDefault(require("dotenv"));
const graphCommerceLog_1 = require("./utils/graphCommerceLog");
dotenv_1.default.config();
function migrationActionFactory(schema, client) {
    /**
     * This constant is used to assign the right action of the management SDK to the migratioAction
     * function
     */
    const actionMap = client
        ? {
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
        }
        : undefined;
    /**
     * This function is our variation on the client.migrationAction functions from the hygraph
     * management sdk.
     *
     * MigrationAction() is better suited because it is a single function for all actions. More
     * importantly, if the action fails, because a field with the apiID already exists for instance. it
     * will skip this action but still continue the whole migration, while the management sdk function
     * will bail.
     *
     * It takes the schema as argument, which is always the same.
     *
     * Then it takes the type of schema entity you want to do an action upon, and the action you want to
     * do.
     *
     * The fourth arguments are the props that belong to the action you want to do. For instance, if you
     * want to create a model, you need to pass the props that belong to a model.
     *
     * The last two arguments are optional. If you want to create a field, you need to pass the apiId of
     * the model or component you want to create the field on. If you want to create a field on a
     * component, you also need to pass the parentType, which is either 'model' or 'component'.
     */
    const migrationAction = (_schema, type, action, props, parentApiId, parentType) => {
        /**
         * Check if the entity already exists.
         * If an update or deletion is made, it does not matter if the entity already exists
         */
        const alreadyExists = () => {
            if (action !== 'create') {
                return false;
            }
            switch (type) {
                case 'model':
                    return schema.models.some((model) => model.apiId === props.apiId);
                case 'component':
                    return schema.components.some((component) => component.apiId === props.apiId);
                case 'enumeration':
                    return schema.enumerations.some((enumeration) => enumeration.apiId === props.apiId);
                case 'simpleField':
                case 'enumerableField':
                case 'relationalField':
                case 'unionField':
                case 'componentUnionField': {
                    let parent;
                    switch (parentType) {
                        case 'model': {
                            parent = schema.models.find((model) => model.apiId === parentApiId);
                            break;
                        }
                        case 'component': {
                            parent = schema.components.find((component) => component.apiId === parentApiId);
                            break;
                        }
                        default:
                            return false;
                    }
                    return parent?.fields.some((field) => field.apiId === props.apiId);
                }
                default: {
                    return false;
                }
            }
        };
        const actionFunc = actionMap && actionMap[action] && actionMap[action][type];
        if (!alreadyExists()) {
            if (actionFunc) {
                (0, graphCommerceLog_1.graphcommerceLog)(`${(0, graphCommerceLog_1.capitalize)(action)} ${type} with apiId ${props.apiId}...`);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore | This error is a loss on typescript autocomplete, but the function is called correctly
                actionFunc(props);
            }
            else {
                (0, graphCommerceLog_1.graphcommerceLog)(`Action ${action} is not supported for ${type}`, 'error');
            }
        }
        else {
            (0, graphCommerceLog_1.graphcommerceLog)(`${(0, graphCommerceLog_1.capitalize)(type)} with apiId ${props.apiId} on ${parentApiId} already exists`, 'warning');
        }
    };
    return {
        migrationAction,
    };
}
