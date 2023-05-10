import type {Pingable} from "./interfaces/pingable.interface";

export class Sonar implements Pingable {
    ping() {
        console.log("ping!");
    }
}