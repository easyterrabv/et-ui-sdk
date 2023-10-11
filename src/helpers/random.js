export const randomString = (len = 10) => {
    const result = [];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let str = "";
    try {
        function dec2hex(dec) {
            return dec.toString(16).padStart(2, "0");
        }
        const arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        str = Array.from(arr, dec2hex).join("");
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.info("Something went wrong with generating a random hex using window.crypto", e);
    }
    for (let i = str.length; i < len; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return str + result.join("");
};
export const generateId = (len = 15, namespace = "") => {
    return "ET_" + (namespace ? namespace + "_" : "") + randomString(len);
};