import fs from 'fs';
import { loadConfig } from '@graphcommerce/next-config';
import dotenv from 'dotenv';
import prompts from 'prompts';
import { SimpleFieldType, VisibilityTypes, RelationalFieldType, Client } from '@hygraph/management-sdk';
import { gql, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import gql$1 from 'graphql-tag';
import { LocalState } from '@apollo/client/local-state';

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
const graphcommerceLog = (message, type) => {
  const color = {
    error: "\x1B[31m\x1B[1m%s\x1B[0m",
    warning: "\x1B[33m\x1B[1m%s\x1B[0m",
    info: "\x1B[36m\x1B[1m%s\x1B[0m"
  };
  console.log(type ? color[type] : "", `${message}`);
};

dotenv.config({ quiet: true });
function migrationActionFactory(schema, client) {
  const actionMap = client ? {
    create: {
      model: (innerprops) => client.createModel(innerprops),
      component: (innerprops) => client.createComponent(innerprops),
      enumeration: (innerprops) => client.createEnumeration(innerprops),
      simpleField: (innerprops) => client.createSimpleField(innerprops),
      enumerableField: (innerprops) => client.createEnumerableField(innerprops),
      componentField: (innerprops) => client.createComponentField(innerprops),
      relationalField: (innerprops) => client.createRelationalField(innerprops),
      unionField: (innerprops) => client.createUnionField(innerprops),
      componentUnionField: (innerprops) => client.createComponentUnionField(innerprops)
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
      componentUnionField: (innerprops) => client.updateComponentUnionField(innerprops)
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
      componentUnionField: (innerprops) => client.deleteField(innerprops)
    }
  } : void 0;
  const migrationAction = (_schema, type, action, props, parentApiId, parentType) => {
    const alreadyExists = () => {
      if (action !== "create") {
        return false;
      }
      switch (type) {
        case "model":
          return schema.models.some((model) => model.apiId === props.apiId);
        case "component":
          return schema.components.some((component) => component.apiId === props.apiId);
        case "enumeration":
          return schema.enumerations.some((enumeration) => enumeration.apiId === props.apiId);
        case "simpleField":
        case "enumerableField":
        case "relationalField":
        case "unionField":
        case "componentUnionField": {
          let parent;
          switch (parentType) {
            case "model": {
              parent = schema.models.find((model) => model.apiId === parentApiId);
              break;
            }
            case "component": {
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
        graphcommerceLog(`${capitalize(action)} ${type} with apiId ${props.apiId}...`);
        actionFunc(props);
      } else {
        graphcommerceLog(`Action ${action} is not supported for ${type}`, "error");
      }
    } else {
      graphcommerceLog(
        `${capitalize(type)} with apiId ${props.apiId} on ${parentApiId} already exists`,
        "warning"
      );
    }
  };
  return {
    migrationAction
  };
}

const graphcommerce5to6 = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client);
  migrationAction(schema, "enumeration", "create", {
    displayName: "Row Links Variants",
    apiId: "RowLinksVariants",
    values: [
      { displayName: "Inline", apiId: "Inline" },
      { displayName: "Image Label Swiper", apiId: "ImageLabelSwiper" },
      { displayName: "Logo Swiper", apiId: "LogoSwiper" },
      { displayName: "USPS", apiId: "Usps" }
    ]
  });
  migrationAction(schema, "model", "create", {
    apiId: "RowLinks",
    apiIdPlural: "RowLinksMultiple",
    displayName: "Row Links",
    description: "Row Links is a Row of PageLinks with different variants"
  });
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Identity",
      apiId: "identity",
      description: "Only used for internal reference",
      type: SimpleFieldType.String,
      isTitle: true,
      isRequired: true,
      isUnique: true,
      modelApiId: "RowLinks"
    },
    "RowLinks",
    "model"
  );
  migrationAction(
    schema,
    "enumerableField",
    "create",
    {
      displayName: "Variant",
      apiId: "linksVariant",
      parentApiId: "RowLinks",
      enumerationApiId: "RowLinksVariants",
      description: "Different variants for Row Links"
    },
    "RowLinks",
    "model"
  );
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Title",
      apiId: "title",
      type: SimpleFieldType.String,
      isRequired: true,
      modelApiId: "RowLinks",
      isLocalized: true
    },
    "RowLinks",
    "model"
  );
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Copy",
      apiId: "rowLinksCopy",
      type: SimpleFieldType.Richtext,
      isLocalized: true,
      modelApiId: "RowLinks"
    },
    "RowLinks",
    "model"
  );
  migrationAction(
    schema,
    "relationalField",
    "create",
    {
      displayName: "Links",
      apiId: "pageLinks",
      modelApiId: "RowLinks",
      type: RelationalFieldType.Relation,
      reverseField: {
        apiId: "rowLinks",
        modelApiId: "PageLink",
        displayName: "RowLinks",
        visibility: VisibilityTypes.Hidden,
        isList: true
      },
      visibility: VisibilityTypes.ReadWrite,
      isList: true
    },
    "RowLinks",
    "model"
  );
  migrationAction(
    schema,
    "unionField",
    "update",
    {
      apiId: "content",
      displayName: "Content",
      modelApiId: "Page",
      reverseField: {
        modelApiIds: [
          "RowLinks",
          "RowServiceOptions",
          "RowSpecialBanner",
          "RowQuote",
          "RowProduct",
          "RowColumnOne",
          "RowColumnTwo",
          "RowColumnThree",
          "RowHeroBanner",
          "RowBlogContent",
          "RowButtonList",
          "RowContentLinks",
          "RowButtonLinkList"
        ]
        // visibility: VisibilityTypes.Hidden, => Currently not supported for updateUnionField | https://github.com/hygraph/management-sdk/issues/34
      }
    },
    "Page",
    "model"
  );
  return client.run(true);
};

const graphcommerce6to7 = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client);
  migrationAction(schema, "enumeration", "create", {
    displayName: "Row Column One Variants",
    apiId: "RowColumnOneVariants",
    values: [
      { displayName: "Default", apiId: "Default" },
      { displayName: "Message", apiId: "Message" }
    ]
  });
  migrationAction(schema, "enumeration", "create", {
    displayName: "Dynamic Row Condition Number Operator",
    apiId: "DynamicRowConditionNumberOperator",
    values: [
      { displayName: "Greater than or equal to", apiId: "GTE" },
      { displayName: "Less than or equal to", apiId: "LTE" },
      { displayName: "Equal to", apiId: "EQUAL" }
    ]
  });
  migrationAction(schema, "enumeration", "create", {
    displayName: "Dynamic Row Placement",
    apiId: "DynamicRowPlacement",
    values: [
      { displayName: "Before", apiId: "BEFORE" },
      { displayName: "After", apiId: "AFTER" },
      { displayName: "Replace", apiId: "REPLACE" }
    ]
  });
  migrationAction(schema, "component", "create", {
    displayName: "Text",
    apiId: "ConditionText",
    apiIdPlural: "ConditionTexts"
  });
  migrationAction(schema, "component", "create", {
    displayName: "Number",
    apiId: "ConditionNumber",
    apiIdPlural: "ConditionNumbers"
  });
  migrationAction(schema, "component", "create", {
    displayName: "AND",
    apiId: "ConditionAnd",
    apiIdPlural: "ConditionAnds",
    description: "All of these conditions must match"
  });
  migrationAction(schema, "component", "create", {
    displayName: "OR",
    apiId: "ConditionOr",
    apiIdPlural: "ConditionOrs",
    description: "One of these conditions must match"
  });
  migrationAction(
    schema,
    "componentUnionField",
    "create",
    {
      displayName: "Conditions",
      apiId: "conditions",
      parentApiId: "ConditionAnd",
      componentApiIds: ["ConditionOr", "ConditionText", "ConditionNumber"],
      isList: true
    },
    "ConditionAnd",
    "component"
  );
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Property",
      apiId: "property",
      type: SimpleFieldType.String,
      parentApiId: "ConditionText",
      description: "Path to the value of the object being evaluated.\n\nFor products: url_key, category, sku",
      isRequired: true,
      validations: {
        String: {
          matches: {
            flags: ["i", "s"],
            regex: "^[a-z0-9-_.]+$",
            errorMessage: "Only letters, numbers, dashes (-), underscores (_) or dots allowed (.)"
          }
        }
      }
    },
    "ConditionText",
    "component"
  );
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Value",
      apiId: "value",
      type: SimpleFieldType.String,
      parentApiId: "ConditionText",
      isRequired: true
    },
    "ConditionText",
    "component"
  );
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Property",
      apiId: "property",
      type: SimpleFieldType.String,
      parentApiId: "ConditionNumber",
      isRequired: true,
      validations: {
        String: {
          matches: {
            flags: ["i", "s"],
            regex: "^[a-z0-9-_.]+$",
            errorMessage: "Only letters, numbers, dashes (-), underscores (_) or dots allowed (.)"
          }
        }
      }
    },
    "ConditionNumber",
    "component"
  );
  migrationAction(
    schema,
    "enumerableField",
    "create",
    {
      displayName: "Operator",
      apiId: "operator",
      parentApiId: "ConditionNumber",
      enumerationApiId: "DynamicRowConditionNumberOperator",
      isRequired: true
    },
    "ConditionNumber",
    "component"
  );
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Value",
      apiId: "value",
      type: SimpleFieldType.Float,
      parentApiId: "ConditionNumber",
      isRequired: true
    },
    "ConditionNumber",
    "component"
  );
  migrationAction(schema, "model", "create", {
    displayName: "Dynamic Row",
    apiId: "DynamicRow",
    apiIdPlural: "DynamicRows",
    description: "Dynamic rows allow you to add specific Row models to pages based on the properties of the page"
  });
  migrationAction(
    schema,
    "simpleField",
    "create",
    {
      displayName: "Internal name",
      apiId: "internalName",
      description: "Only used for internal reference",
      type: SimpleFieldType.String,
      isTitle: true,
      isRequired: true,
      isUnique: true,
      modelApiId: "DynamicRow"
    },
    "DynamicRow",
    "model"
  );
  migrationAction(
    schema,
    "unionField",
    "create",
    {
      displayName: "Row",
      apiId: "row",
      reverseField: {
        modelApiIds: ["RowQuote", "RowLinks", "RowColumnOne"],
        apiId: "dynamicRow",
        displayName: "DynamicRows",
        visibility: VisibilityTypes.Hidden,
        isList: true
      },
      parentApiId: "DynamicRow"
    },
    "DynamicRow",
    "model"
  );
  migrationAction(
    schema,
    "enumerableField",
    "create",
    {
      displayName: "Placement",
      apiId: "placement",
      parentApiId: "DynamicRow",
      enumerationApiId: "DynamicRowPlacement",
      description: "Where will the row be placed relative to the target",
      isRequired: true
    },
    "DynamicRow",
    "model"
  );
  migrationAction(
    schema,
    "unionField",
    "create",
    {
      displayName: "Placement target",
      apiId: "target",
      description: "Optional: When the target is left blank it will place the Dynamic Row on the start or end.",
      reverseField: {
        modelApiIds: [
          "RowQuote",
          "RowLinks",
          "RowColumnOne",
          "RowColumnTwo",
          "RowColumnThree",
          "RowServiceOptions",
          "RowContentLinks",
          "RowButtonLinkList",
          "RowProduct",
          "RowSpecialBanner",
          "RowHeroBanner",
          "RowBlogContent"
        ],
        apiId: "dynamicRowsTarget",
        displayName: "DynamicRowsTarget",
        visibility: VisibilityTypes.Hidden,
        isList: true
      },
      parentApiId: "DynamicRow"
    },
    "DynamicRow",
    "model"
  );
  migrationAction(
    schema,
    "componentUnionField",
    "create",
    {
      displayName: "Conditions (OR)",
      apiId: "conditions",
      parentApiId: "DynamicRow",
      description: "One of these conditions must match",
      componentApiIds: ["ConditionAnd", "ConditionText", "ConditionNumber"],
      isList: true
    },
    "DynamicRow",
    "model"
  );
  migrationAction(
    schema,
    "enumerableField",
    "create",
    {
      displayName: "Variant",
      apiId: "rowColumnOneVariant",
      enumerationApiId: "RowColumnOneVariants",
      parentApiId: "RowColumnOne"
    },
    "RowColumnOne",
    "model"
  );
  migrationAction(
    schema,
    "componentUnionField",
    "create",
    {
      displayName: "Conditions",
      apiId: "conditions",
      parentApiId: "ConditionOr",
      componentApiIds: ["ConditionText", "ConditionNumber"],
      isList: true
    },
    "ConditionOr",
    "component"
  );
  return client.run(true);
};

const graphcommerce7to8 = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client);
  const hasRow = schema.models.find((m) => m.apiId === "DynamicRow")?.fields.some((f) => f.apiId === "row");
  if (hasRow) {
    migrationAction(schema, "unionField", "update", {
      apiId: "row",
      displayName: "Row Deprecated",
      parentApiId: "DynamicRow",
      description: "This field is deprecated. Use Rows instead."
    });
  }
  migrationAction(
    schema,
    "unionField",
    "create",
    {
      displayName: "Rows",
      apiId: "rows",
      isList: true,
      reverseField: {
        modelApiIds: ["RowQuote", "RowLinks", "RowColumnOne"],
        apiId: "dynamicRows",
        displayName: "Dynamic Rows",
        visibility: VisibilityTypes.Hidden,
        isList: true
      },
      parentApiId: "DynamicRow"
    },
    "DynamicRow",
    "model"
  );
  migrationAction(
    schema,
    "componentUnionField",
    "create",
    {
      displayName: "Conditions",
      apiId: "conditions",
      parentApiId: "ConditionOr",
      componentApiIds: ["ConditionText", "ConditionNumber"],
      isList: true
    },
    "ConditionOr",
    "component"
  );
  return client.run(true);
};

const graphcommerce8to9 = async (schema, client) => {
  const { migrationAction } = migrationActionFactory(schema, client);
  const hasRow = schema.models.find((m) => m.apiId === "DynamicRow")?.fields.some((f) => f.apiId === "row");
  if (hasRow) {
    migrationAction(schema, "simpleField", "delete", {
      apiId: "row",
      parentApiId: "DynamicRow"
    });
  }
  const hasRowCategory = schema.models.some((m) => m.apiId === "RowCategory");
  if (!hasRowCategory) {
    migrationAction(schema, "model", "create", {
      apiId: "RowCategory",
      displayName: "Row Category",
      apiIdPlural: "RowProductLists",
      description: "A model that displays a category"
    });
    migrationAction(
      schema,
      "simpleField",
      "create",
      {
        position: 1,
        type: SimpleFieldType.String,
        formConfig: { renderer: "GCMS_SLUG", config: { isLowercase: true } },
        validations: {
          String: {
            matches: {
              regex: "^[a-z0-9]+(?:[-/][a-z0-9]+)*$",
              errorMessage: "The category URL must be a valid slug"
            }
          }
        },
        parentApiId: "RowCategory",
        displayName: "Category URL",
        apiId: "categoryUrl",
        description: "The URL of the category, may include slashes",
        isTitle: true,
        isLocalized: true,
        isRequired: true,
        visibility: VisibilityTypes.ReadWrite
      },
      "RowCategory",
      "model"
    );
    migrationAction(schema, "enumeration", "create", {
      displayName: "Row Category Variant",
      apiId: "RowCategoryVariant",
      values: [
        { displayName: "Backstory", apiId: "Backstory" },
        { displayName: "Grid", apiId: "Grid" },
        { displayName: "Swipeable", apiId: "Swipeable" }
      ]
    });
    migrationAction(
      schema,
      "enumerableField",
      "create",
      {
        displayName: "Variant",
        apiId: "variant",
        parentApiId: "RowCategory",
        enumerationApiId: "RowCategoryVariant",
        description: "As what variant wil the RowCategory be displayed",
        isRequired: true
      },
      "RowCategory",
      "model"
    );
  }
  return client.run(true);
};

const availableMigrations = [
  graphcommerce5to6,
  graphcommerce6to7,
  graphcommerce7to8,
  graphcommerce8to9
];

const readSchema = async (managementClient, projectId) => {
  const { data } = await managementClient.query({
    query: gql`
      query getSchema($projectId: ID!) {
        viewer {
          project(id: $projectId) {
            environment(name: "master") {
              contentModel {
                locales {
                  id
                  apiId
                }
                stages {
                  id
                  apiId
                }
                models {
                  apiId
                  apiIdPlural
                  fields {
                    apiId
                  }
                }
                components {
                  apiId
                  apiIdPlural
                  fields {
                    apiId
                  }
                }
                enumerations {
                  apiId
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      projectId
    }
  });
  return data;
};

class UpsertClient extends Client {
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
    return exists ? this.createSimpleField(data) : this.updateSimpleField({ ...data, embeddableModels: void 0 });
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

function getConfig(config) {
  let {
    hygraphProjectId: projectId,
    hygraphWriteAccessToken: authToken,
    hygraphManagementApi: uri,
    hygraphEndpoint
  } = config;
  if (!authToken) {
    throw new Error("Please provide GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file.");
  }
  if (!projectId) {
    projectId = new URL(hygraphEndpoint).pathname.split("/")?.[1];
  }
  if (!uri) {
    const endpoint = new URL(hygraphEndpoint);
    endpoint.hostname = `management-${endpoint.hostname}`.replace(".cdn", "");
    endpoint.pathname = "graphql";
    uri = endpoint.toString();
  }
  return { projectId, authToken, uri };
}

async function getEnvironment(client, config) {
  const endpoints = await client.query({
    query: gql$1`
      query Environments($projectId: ID!) {
        viewer {
          id
          project(id: $projectId) {
            environments {
              name
              endpoint
              migrations {
                name
                status
              }
            }
          }
        }
      }
    `,
    variables: { projectId: config.projectId },
    errorPolicy: "all"
  });
  if (endpoints.errors) {
    const isBadInput = endpoints.errors.some((e) => e.extensions?.code === "BAD_USER_INPUT");
    if (isBadInput) {
      throw Error(`
        Could not find environment for projectId ${config.projectId}. 
        Please check your GC_HYGRAPH_PROJECT_ID in your env file.
      `);
    }
    throw new Error(`An error occurred: ${endpoints.errors.map((e) => e.message).join("\n")}`);
  }
  const environment = endpoints.data.viewer.project.environments.find((env) => env.name === "master") ?? endpoints.data.viewer.project.environments?.[0];
  return environment;
}

function getManagementClient(config) {
  const { authToken: accessToken, uri } = config;
  return new ApolloClient({
    link: new HttpLink({
      uri,
      fetch,
      headers: { Authorization: `Bearer ${accessToken}` }
    }),
    cache: new InMemoryCache(),
    localState: new LocalState({})
  });
}

dotenv.config({ quiet: true });
async function migrateHygraphCli() {
  const hygraphConfig = getConfig(loadConfig(process.cwd()));
  const packageJson = fs.readFileSync("package.json", "utf8");
  const packageData = JSON.parse(packageJson);
  const graphcommerceVersion = packageData.dependencies["@graphcommerce/next-ui"];
  graphcommerceLog(`Graphcommerce version: ${graphcommerceVersion}`, "info");
  const mangementClient = getManagementClient(hygraphConfig);
  const schemaViewer = await readSchema(mangementClient, hygraphConfig.projectId);
  const schema = schemaViewer.viewer.project.environment.contentModel;
  const possibleMigrations = Object.entries(availableMigrations);
  const selectMigrationInput = {
    type: "select",
    name: "selectedMigration",
    message: "\x1B[36m\x1B[1m[]: Select migration",
    choices: possibleMigrations.map(([name, migration]) => ({
      title: name,
      value: { name, migration }
    }))
  };
  try {
    graphcommerceLog("Available migrations: ", "info");
    const selectMigrationOutput = await prompts(selectMigrationInput);
    let { migration, name } = selectMigrationOutput.selectedMigration;
    graphcommerceLog(
      `You have selected the ${selectMigrationOutput.selectedMigration.name} migration`,
      "info"
    );
    try {
      const { endpoint, migrations } = await getEnvironment(mangementClient, hygraphConfig);
      const migrationExists = migrations.find(
        (m) => m.name?.startsWith(name) && m.status === "SUCCESS"
      );
      if (migrationExists) {
        if (!process.argv.includes("--force")) {
          graphcommerceLog(
            `Migration ${name} as ${migrationExists.name} already exists in Hygraph with the status SUCCESS. To rerun this migration use the --force option. Exiting now..`,
            "info"
          );
          process.exit(1);
        } else {
          graphcommerceLog(
            `Migration ${name} as ${migrationExists.name} already exists in Hygraph with the status SUCCESS. Using --force, rerunning migration..`,
            "warning"
          );
        }
        name = `${name}-${Date.now()}`;
      }
      const result = await migration(
        schema,
        new UpsertClient({ authToken: hygraphConfig.authToken, endpoint, name }, schema)
      );
      graphcommerceLog(`Migration result: ${JSON.stringify(result)}`, "info");
      if (!result) {
        graphcommerceLog(
          "No migration client found. Please make sure your GC_HYGRAPH_WRITE_ACCESS_TOKEN in your env file is correct."
        );
        process.exit(1);
      }
      if (result.status !== "SUCCESS") {
        graphcommerceLog(`Migration not successful: ${result.status} ${name}:
${result.errors}`);
        process.exit(1);
      }
      graphcommerceLog(`Migration successful: ${name}`, "info");
    } catch (err) {
      if (err instanceof Error) {
        const garbledErrorIndex = err.message.indexOf(': {"');
        const msg = garbledErrorIndex > 0 ? err.message.slice(0, garbledErrorIndex) : err.message;
        graphcommerceLog(`${msg}`, "error");
      }
    }
  } catch (error) {
    graphcommerceLog(`An error occurred: ${error}`, "error");
  }
}

export { migrateHygraphCli as migrateHygraph };
