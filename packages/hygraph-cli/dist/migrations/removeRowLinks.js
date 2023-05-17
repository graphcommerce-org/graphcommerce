"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeRowLinks = void 0;
const client_1 = require("../client");
const removeRowLinks = async (name) => {
    const client = (0, client_1.initClient)(name);
    client.deleteEnumeration({ apiId: 'RowLinksVariants' });
    client.deleteModel({ apiId: 'RowLinks' });
    return client.run(true);
};
exports.removeRowLinks = removeRowLinks;
