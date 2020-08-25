"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entity, schema) => {
    if (typeof entity !== 'object' || Array.isArray(entity)) {
        throw new Error(`Entity must be json object.`);
    }
    if (typeof schema !== 'object' || Array.isArray(schema)) {
        throw new Error(`Schema must be json.`);
    }
    entity = parseSchemaEntity(entity, schema);
    return entity;
};
const parseKeyEntity = (entity_value, schema) => {
    if (schema.env !== undefined) {
        const env_prefix_key = schema.env;
        if (process.env[env_prefix_key] !== undefined) {
            const env_key_value = process.env[env_prefix_key];
            if (schema.type === "integer" || schema.type === "number") {
                return parseFloat(env_key_value);
            }
            if (schema.type === "boolean") {
                if (env_key_value === "true") {
                    return true;
                }
                else {
                    return false;
                }
            }
            if (schema.type === "string") {
                return env_key_value;
            }
            if (schema.type === "object" || schema.type === "array") {
                return JSON.parse(env_key_value);
            }
        }
    }
    if (schema.default !== undefined && entity_value === undefined) {
        return schema.default;
    }
    return entity_value;
};
const parseSchemaEntity = (entity, schema) => {
    if (schema.type === 'object') {
        if (schema.properties !== undefined && typeof schema.properties === 'object' && !Array.isArray(schema.properties)) {
            for (let key in schema.properties) {
                const key_result = parseKeyEntity(entity[key], schema.properties[key]);
                if (key_result !== undefined) {
                    entity[key] = key_result;
                    if (schema.properties[key].type === "object" && entity[key] !== undefined) {
                        const object_result = parseSchemaEntity(entity[key], schema.properties[key]);
                        if (object_result !== undefined) {
                            entity[key] = object_result;
                        }
                    }
                }
            }
        }
    }
    return entity;
};
