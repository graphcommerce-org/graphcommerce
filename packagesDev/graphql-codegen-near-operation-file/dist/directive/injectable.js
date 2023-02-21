"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectableDirective = void 0;
const graphql_1 = require("graphql");
function isFragment(document) {
    let is = false;
    (0, graphql_1.visit)(document, {
        FragmentDefinition: () => {
            is = true;
        },
    });
    return is;
}
function hasInjectableDirective(document) {
    let is = false;
    (0, graphql_1.visit)(document, {
        Directive: (node) => {
            if (!is && node.name.value === 'injectable')
                is = true;
        },
    });
    return is && isFragment;
}
function hasInjectDirective(document) {
    let is = false;
    (0, graphql_1.visit)(document, {
        Directive: (node) => {
            if (!is && node.name.value === 'inject')
                is = true;
        },
    });
    return is && isFragment;
}
function throwInjectError(conf, message) {
    const val = conf.into?.map((v) => `"${v}"`);
    throw Error(`${message}
  fragment ${conf.fragment?.name.value} on ${conf.fragment?.typeCondition.name.value} @inject(into: [${val}]) { ... }`);
}
function assertValidInject(injectVal) {
    const { into, fragment } = injectVal;
    if (!fragment || into?.length === 0)
        throwInjectError(injectVal, 'Invalid inject');
}
function getInjectConf(document) {
    if (!hasInjectDirective(document))
        throw Error('');
    const conf = { into: [] };
    (0, graphql_1.visit)(document, {
        Directive: (node) => {
            if (node.name.value !== 'inject')
                return false;
            (0, graphql_1.visit)(node, {
                Argument: (arg) => {
                    if (arg.name.value !== 'into')
                        return false;
                    (0, graphql_1.visit)(arg, {
                        ListValue: (list) => {
                            list.values.forEach((value) => {
                                (0, graphql_1.visit)(value, {
                                    StringValue: (string) => {
                                        conf.into?.push(string.value);
                                    },
                                });
                            });
                        },
                    });
                    return undefined;
                },
            });
            return null;
        },
        FragmentDefinition: (node) => {
            conf.fragment = node;
        },
    });
    assertValidInject(conf);
    return conf;
}
function injectInjectable(injectables, injector) {
    const injectVal = getInjectConf(injector);
    const { into, fragment } = injectVal;
    into.forEach((target) => {
        let found = false;
        injectables.forEach((injectable) => {
            (0, graphql_1.visit)(injectable, {
                FragmentDefinition: (frag) => {
                    if (frag.name.value === target) {
                        found = true;
                        const spread = {
                            kind: graphql_1.Kind.FRAGMENT_SPREAD,
                            name: { kind: graphql_1.Kind.NAME, value: fragment.name.value },
                        };
                        frag.selectionSet.selections = [...frag.selectionSet.selections, spread];
                    }
                },
            });
        });
        if (!found)
            throwInjectError(injectVal, `fragment ${target} @injectable { ... } can not be found or isn't injectable`);
    });
}
function injectableDirective(documentFiles) {
    const documents = documentFiles
        .map(({ document }) => document)
        .filter((doc) => doc);
    const injectables = documents.filter((d) => isFragment(d) && hasInjectableDirective(d));
    const injectors = documents.filter((d) => isFragment(d) && hasInjectDirective(d));
    injectors.forEach((d) => injectInjectable(injectables, d));
    return documentFiles;
}
exports.injectableDirective = injectableDirective;
