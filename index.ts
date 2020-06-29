export default (entity: any, schema: any): object => {

    if (typeof entity !== 'object' || Array.isArray(entity)) {
        throw new Error(`Entity must be json object.`);
    }

    if (typeof schema !== 'object' || Array.isArray(schema)) {
        throw new Error(`Schema must be json.`);
    }

    entity = praseSchemaEntity(entity, schema);

    return entity;
}

const praseSchemaEntity = (entity: any, schema: any): object => {

    if (schema.type === 'object') {
        
        if (schema.properties !== undefined && typeof schema.properties === 'object' && !Array.isArray(schema.properties)) {

            for (let key in schema.properties) {

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

}

const parseEntityKey = (key_name: any, entity: any, schema: any): object  => {

    if (schema.type === 'object' && schema.properties !== undefined) {

        for (let key in schema.properties) {

            if (entity[key_name][key] === undefined && schema.properties[key].default !== undefined) {
                entity[key_name][key] = schema.properties[key].default;
            }

        }

        for (let key in entity[key_name]) {
            if (schema.properties[key] !== undefined) {
                entity[key_name] = parseEntityKey(key, entity[key_name], schema.properties[key]);
            }
        }

    } else {
        if (entity[key_name] === undefined && schema.default !== undefined) {
            entity[key_name] = schema.default;
        }
    }

    return entity;
}