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

process.env["CONFIG_NUMBER"] = "452"
process.env["CONFIG_EMPTY"] = "82"
process.env["CONFIG_OBJECT_EMPTY"] = "882"
process.env["CONFIG_OBJECT_OBJECT_EMPTY"] = "852"

const config_env2 = json_compiler({}, schema, "config");

console.log(config_env2);