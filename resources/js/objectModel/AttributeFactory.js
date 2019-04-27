import Attribute from './Attribute'
import Preference from '../utilities/Preference'
import F from '../utilities/Formatter'
import getDataType from './propertyGetters/getDataType'

export default class AttributeFactory {
    constructor(name, parent) {
        this.name = name
        this.parent = parent
    }

    static make(name, parent) {
        let factory = new this(name, parent)

        return new Attribute(
            {
                name: factory.name,
                parent: factory.parent,
                //... factory.property("cast"),
                ... factory.property("dataType"),
                //... factory.property("fillable"),
                //... factory.property("hidden"),
                //... factory.property("index"),
                //... factory.property("unique"),
            }
        )
    }

    /* If there is a preference available use that, else refer to dedicated get method */
    property(key) {
        return {
            [key]: this.hasPreference(key) ? this.getPreference(key) : this[F.camelCase(`get_${key}`)]()
        }
    }

    /* GETTERS ***************************************************************/

    getCast() {
        return null
    }

    getDataType() {
        return getDataType(this.name)
    }

    getIndex() {
        return false
    }

    getUnique() {
        return false
    }    

    getHidden() {
        return this.hasPreference('hidden') ? this.getPreference('hidden') :
            ['password', 'remember_token'].includes(this.name)
    }

    getFillable() {
        return {
            fillable: ![
                'id',
                'updated_at',
                'created_at',
                'remember_token',
                'email_verified_at'
            ].includes(this.name)
        }
    }

    /* ATTRIBUTE PREFERENCES ***************************************************************/

    hasPreference(setting) {
        return Preference.has([
            'objectModel',
            this.parent.heading,
            this.name,            
            setting
        ])
    }

    /* Exception from the get<Key> pattern! */
    getPreference(setting) {
        return Preference.get([
            'objectModel',
            this.parent.heading,
            this.name,
            setting
        ])
    }
}