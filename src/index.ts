/**
 * Create json from a schema.
 * 
 * @param {object} entity - source json object.
 * @param {object} schema - json schema.
 * @param {boolean} [env_flag=true] - Flag for parsing environment keys from "env" key.
 * @return {object} result object
*/
export default (entity: any, schema: any, env_flag: boolean = true): object => {

    if (typeof entity !== 'object' || Array.isArray(entity)) {
        throw new Error(`Entity must be json object.`);
    }

    if (typeof schema !== 'object' || Array.isArray(schema)) {
        throw new Error(`Schema must be json.`);
    }

    entity = parseSchemaEntity(entity, schema, env_flag);

    return entity;
}

const parseKeyEntity = (entity_value: any, schema: any, env_flag: boolean = true): any => {

    if (schema.env !== undefined && env_flag === true) {

        const env_prefix_key = schema.env;

        if (process.env[env_prefix_key] !== undefined) {

            const env_key_value = process.env[env_prefix_key];

            if (schema.type === "integer" || schema.type === "number") {
                return parseFloat(env_key_value);
            }

            if (schema.type === "boolean") {
                if (env_key_value === "true") {
                    return true;
                } else {
                    return false;
                }
            }

            if (schema.type === "string") {
                return env_key_value;
            }

            if (schema.type === "object" || schema.type === "array") {
                return JSON.parse(env_key_value);
            }

            return env_key_value;

        }

    }

    if (schema.default !== undefined && entity_value === undefined) {
        return schema.default;
    }

    return entity_value;

}

const parseSchemaEntity = (entity: any, schema: any, env_flag: boolean = true): object => {

    if (schema.type === 'object') {
        
        if (schema.properties !== undefined && typeof schema.properties === 'object' && !Array.isArray(schema.properties)) {

            for (let key in schema.properties) {

                const key_result = parseKeyEntity(entity[key], schema.properties[key], env_flag);

                if (key_result !== undefined) {

                    entity[key] = key_result;

                    if (schema.properties[key].type === "object" && entity[key] !== undefined) {

                        const object_result = parseSchemaEntity(entity[key], schema.properties[key], env_flag);

                        if (object_result !== undefined) {
                            entity[key] = object_result;
                        }

                    }

                }
                
            }

        }

    }

    return entity;

}