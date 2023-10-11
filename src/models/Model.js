import { Base } from "./Base";
import { generateId } from "../helpers/random";
export class EtModel extends Base {
    guid;
    constructor() {
        super();
        this.guid = generateId(40, "model");
    }
}
