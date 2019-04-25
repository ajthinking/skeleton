import Attribute from './Attribute'

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
                ... factory.hidden(),
                ... factory.fillable()
            }
        )
    }

    hidden() {
        return {
            hidden: ['password', 'remember_token'].includes(this.name)
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
}