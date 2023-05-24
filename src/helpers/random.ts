export const randomString = (len:number = 10):string => {
    const result = [];
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let randomString = '';
    try {
        function dec2hex(dec:number):string {
            return dec.toString(16).padStart(2, '0');
        }

        const arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr);
        randomString = Array.from(arr, dec2hex).join('')
    } catch (e) {
    }

    for (let i = randomString.length; i < len; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }

    return randomString + result.join('');
}

export const generateId = (len:number = 15, namespace:string=''):string => {
    return 'ET_' + (namespace ? namespace + '_' : '') + randomString(len);
}