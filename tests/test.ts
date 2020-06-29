import * as schema from "./schema.json";
import json_compiler from "../index";

const config = json_compiler({}, schema);

console.log(config);