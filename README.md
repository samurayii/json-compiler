# Json-compiler

Create json from a schema.

### Example

```js
const config = require('./config');
const schema = require('./schema');
const json_compiler = require('json-compiler');

const result_config = json_compiler(config, schema);

```

## fn(config:Object, schema:Object) → Object

Synchronously create json from schema.