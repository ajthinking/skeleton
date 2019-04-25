import Attribute from './Attribute'
import Preference from './Preference'

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
                ... factory.property("dataType"),
                ... factory.property("fillable"),
                ... factory.property("hidden"),
            }
        )
    }

    /* If there is a preference available use that, else refer to best guess */
    property(key) {
        let template = {}
        template[key] = this.hasPreference(key) ? this.getPreference(key) : this[key]()
        return template
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
        return Preference.has(setting)
    }

    getPreference(setting) {
        return Preference.get(        [
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