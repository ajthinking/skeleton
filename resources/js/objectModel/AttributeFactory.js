import Attribute from './Attribute'
import Preference from '../utilities/Preference'

export default class AttributeFactory {
    constructor(name, parent) {
        this.name = name
        this.parent = parent

        this.hasPreference("email")
    }

    static make(name, parent) {
        let factory = new this(name, parent)

        return new Attribute(
            {
                name: factory.name,
                parent: factory.parent,
                ... factory.property("dataType"),
                ... factory.property("fillable"),
                ... factory.property("hidden"),
            }
        )
    }

    /* If there is a preference available use that, else refer to dedicated method */
    property(key) {
        return {
            [key]: this.hasPreference(key) ? this.getPreference(key) : this[key]()
        }
    }

    dataType() {
        return "string"
    }



    hidden() {
        return {
            hidden: this.hasPreference('hidden') ? this.getPreference('hidden') :
                ['password', 'remember_token'].includes(this.name)
        }
    }

    fillable() {
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

    hasPreference(setting) {
        return Preference.has([
            'objectModel',
            this.parent.heading,
            this.name,            
            setting
        ])
    }

    getPreference(setting) {
        return Preference.get([
            'objectModel',
            this.parent.heading,
            this.name,
            setting
        ])
    }
    /*
    {
        "User": {
            "email": {
                "hidden": true
            }
    }
    */
}