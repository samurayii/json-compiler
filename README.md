# Json-from-default-schema

Create json from a schema.

## Example

```js
const json_from_schema = require('json-from-default-schema');

const config = `
{
    "message": "hello world"
}
`
const schema = `
{
    "type": "object",
    "properties": {
        "number": {
            "type": "number",
            "env": "NUMBER",
            "default": 4.3
        },
        "integer": {
            "type": "integer",
            "default": 7
        },
        "empty": {
            "type": "integer",
            "env": "EMPTY"
        },
        "object": {
            "type": "object",
            "default": {},
            "properties": {
                "array": {
                    "type": "array",
                    "env": "OBJECT_ARRAY",
                    "default": []
                },
                "number": {
                    "type": "number",
                    "default": 14.3
                },
                "integer": {
                    "type": "integer",
                    "default": 17
                },
                "empty": {
                    "type": "integer",
                    "env": "OBJECT_EMPTY"
                },
                "object": {
                    "type": "object",
                    "default": {},
                    "properties": {
                        "number": {
                            "type": "number",
                            "default": 14.3
                        },
                        "integer": {
                            "type": "integer",
                            "default": 17
                        },
                        "empty": {
                            "type": "integer",
                            "env": "OBJECT_OBJECT_EMPTY"
                        }
                    }
                }
            }
        }
    }
}
`

process.env["NUMBER"] = "455"
process.env["EMPTY"] = "88"
process.env["OBJECT_EMPTY"] = "881"
process.env["OBJECT_ARRAY"] = "[\"880\"]"
process.env["OBJECT_OBJECT_EMPTY"] = "851"

const result_config = json_from_schema(config, schema);

console.log(result_config);
/*
{
    message: 'hello world',
    number: 455,
    integer: 7,
    empty: 88,
    object: {
        array: [ '880' ],
        number: 14.3,
        integer: 17,
        empty: 881,
        object: { 
            number: 14.3, 
            integer: 17, 
            empty: 851 
        }
    }
}
*/
```

## fn(entity: any, schema: any, env_flag: boolean = true) → Object

Create json from a schema.

params:

- **entity** - source json object
- **schema** - json schema
- **env_flag** - Flag for parsing environment keys from "env" key
