import Config from '../Config'

let defaultSchema = Config.FileFactory.defaultSchema()

let preferences = {
    ...defaultSchema
}


export default class Preference {
    static has(path) {
        return !!this.get(path)
    }

    static get(path) {
        try {
            return path.reduce((data, key) => {
                if(typeof data === 'object' && key in data) return data[key];
                throw new ReferenceError("No such key combination")
            }, preferences)

        } catch {
            return false
        }
    }
    
    static set() {

    }
}