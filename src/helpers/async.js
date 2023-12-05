import { cancelable } from "cancelable-promise";
export const wait = (ms) => {
    return cancelable(new Promise((resolve) => {
        setTimeout(resolve, ms);
    }));
};
