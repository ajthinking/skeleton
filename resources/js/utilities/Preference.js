import Config from '../Config'
import Storage from './Storage'
import recursiveJSONIterator from './recursiveJSONIterator'
const mergeJSON = require('deepmerge')
import store from '../store'

let defaultSchema = Config.FileFactory.defaultSchema()

export default class Preference {
    static has(path) {
        return !(this.get(path) instanceof Error)
    }

    static get(path) {
        try {
            return path.reduce((data, key) => {
                if(typeof data === 'object' && key in data) return data[key];
                throw new ReferenceError("No such key combination")
            }, this.getInitialData())

        } catch(ReferenceError) {
            return ReferenceError
        }
    }

    static getInitialData() {
        return store.getters.preferences
        
        return mergeJSON(
            defaultSchema,
            Storage.get('objectModel') ? Storage.get('objectModel') : {}
        )
    }

    /* Default driver is localstorage but could also be something like a gist */
    static persist(data) {
        Storage.set('objectModel',
            mergeJSON(
                Storage.get('objectModel') ? Storage.get('objectModel') : {},
                data
            )
        )
    }
}