"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Book Management API',
            version: '1.0.0',
            description: 'Task 5',
            contact: {
                name: 'Bayu dani kurniawan',
                email: 'bayu.doe@example.com',
            },
        },
    },
    apis: ['./src/routes/*.ts'], // Path untuk file route
};
exports.default = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map