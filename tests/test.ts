import * as schema from "./schema.json";
import json_compiler from "../index";

const config = json_compiler({}, schema);

console.log(config);

process.env["NUMBER"] = "455"
process.env["EMPTY"] = "88"
process.env["OBJECT_EMPTY"] = "881"
process.env["OBJECT_OBJECT_EMPTY"] = "851"

const config_env = json_compiler({}, schema);

console.log(config_env);