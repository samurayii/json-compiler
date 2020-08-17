"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (entity, schema) => {
    if (typeof entity !== 'object' || Array.isArray(entity)) {
        throw new Error(`Entity must be json object.`);
    }
    if (typeof schema !== 'object' || Array.isArray(schema)) {
        throw new Error(`Schema must be json.`);
    }
    entity = praseSchemaEntity(entity, schema);
    return entity;
};
const praseSchemaEntity = (entity, schema) => {
    if (schema.type === 'object') {
        if (schema.properties !== undefined && typeof schema.properties === 'object' && !Array.isArray(schema.properties)) {
            for (let key in schema.properties) {
                if (entity[key] === undefined && schema.properties[key].env !== undefined) {
                    const env_prefix_key = schema.properties[key].env;
                    if (process.env[env_prefix_key] !== undefined) {
                        const env_key_value = process.env[env_prefix_key];
                        if (schema.properties[key].type === "integer" || schema.properties[key].type === "number") {
                            entity[key] = parseFloat(env_key_value);
                        }
                        if (schema.properties[key].type === "boolean") {
                            console.log(env_key_value);
                            if (env_key_value === "true") {
                                entity[key] = true;
                            }
                            else {
                                entity[key] = false;
                            }
                        }
                        if (schema.properties[key].type === "string") {
                            entity[key] = env_key_value;
                        }
                        if (schema.properties[key].type === "array") {
                            entity[key] = JSON.parse(env_key_value);
                        }
                    }
                }
                if (entity[key] === undefined && schema.properties[key].default !== undefined) {
                    entity[key] = schema.properties[key].default;
                }
            }
            for (let key in entity) {
                if (schema.properties[key] !== undefined) {
                    entity = parseEntityKey(key, entity, schema.properties[key]);
                }
            }
        }
    }
    return entity;
};
const parseEntityKey = (key_name, entity, schema) => {
    if (schema.type === 'object' && schema.properties !== undefined) {
        for (let key in schema.properties) {
            if (entity[key_name][key] === undefined && schema.properties[key].env !== undefined) {
                const env_prefix_key = schema.properties[key].env;
                if (process.env[env_prefix_key] !== undefined) {
                    const env_key_value = process.env[env_prefix_key];
                    if (schema.properties[key].type === "integer" || schema.type === "number") {
                        entity[key_name][key] = parseFloat(env_key_value);
                    }
                    if (schema.properties[key].type === "boolean") {
                        if (env_key_value === "true") {
                            entity[key_name][key] = true;
                        }
                        else {
                            entity[key_name][key] = false;
                        }
                    }
                    if (schema.properties[key].type === "string") {
                        entity[key_name][key] = env_key_value;
                    }
                    if (schema.properties[key].type === "array") {
                        entity[key_name][key] = JSON.parse(env_key_value);
                    }
                }
            }
            if (entity[key_name][key] === undefined && schema.properties[key].default !== undefined) {
                entity[key_name][key] = schema.properties[key].default;
            }
        }
        for (let key in entity[key_name]) {
            if (schema.properties[key] !== undefined) {
                entity[key_name] = parseEntityKey(key, entity[key_name], schema.properties[key]);
            }
        }
    }
    else {
        if (entity[key_name] === undefined && schema.default !== undefined) {
            entity[key_name] = schema.default;
        }
    }
    return entity;
};
