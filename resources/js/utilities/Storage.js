export default class Storage {
    static get(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    static getWithStack(stack) {
        
    }

    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }

    static setWithStack(stack, value) {
        //
    }

    static mergeJSON(name, data) {
        //
    }    
}