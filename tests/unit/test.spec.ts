import * as schema from "./schema.json";
import * as config from "./config.json";
import json_compiler from "../../src/index";
import { expect } from "chai";

type TConfig = {
    number: number
    object: {
        [key: string]: string
    }
}

describe("Jtomler", function() {   

    it("parsing empty objects", function() {

        const json_body = json_compiler({}, {});

        expect(json_body).to.be.an("object");

    });

    it("parsing full objects (env parsing = true)", function() {

        process.env["NUMBER"] = "455"
        process.env["EMPTY"] = "88"
        process.env["OBJECT_EMPTY"] = "881"
        process.env["OBJECT_ARRAY"] = "[\"880\"]"
        process.env["OBJECT_OBJECT_EMPTY"] = "851"

        const json_body = <TConfig>json_compiler(JSON.parse(JSON.stringify(config)), schema);

        expect(json_body).to.be.an("object");

        expect(json_body.number).to.be.an("number");
        expect(json_body.number).equal(455);

        expect(json_body.object.empty).to.be.an("number");
        expect(json_body.object.empty).equal(881);

    });

    it("parsing full objects (env parsing = false)", function() {

        process.env["NUMBER"] = "455"
        process.env["EMPTY"] = "88"
        process.env["OBJECT_EMPTY"] = "881"
        process.env["OBJECT_ARRAY"] = "[\"880\"]"
        process.env["OBJECT_OBJECT_EMPTY"] = "851"

        const json_body = <TConfig>json_compiler(JSON.parse(JSON.stringify(config)), schema, false);

        expect(json_body).to.be.an("object");

        expect(json_body.number).to.be.an("number");
        expect(json_body.number).equal(4.3);

    });

});