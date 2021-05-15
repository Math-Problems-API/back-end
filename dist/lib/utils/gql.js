"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_graphql_1 = require("express-graphql");
const index_1 = __importDefault(require("../graphql/schema/index"));
const index_2 = __importDefault(require("../graphql/resolvers/index"));
exports.default = express_graphql_1.graphqlHTTP({ schema: index_1.default, rootValue: index_2.default, graphiql: true });
//# sourceMappingURL=gql.js.map