import { Base } from "./Base";
import { generateId } from "../helpers/random";

export class EtModel extends Base {
    guid: string;
    [propertyName: string]: any;

    constructor() {
        super();
        this.guid = generateId(40, "model");
    }
}
