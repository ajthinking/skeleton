export default class Storage {
    static get(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    static set(name, value) {
        localStorage.setItem(name, JSON.stringify(value));
    }    
}