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
                ... factory.otherThings()
            }
        )
    }

    otherThings() {
        return {
            hidden: true
        }
    }
    /*
    FOR LATER USE
    model.attributes.filter(attribute => [
        'password', 'remember_token'
    ].includes(attribute)),    

    return this.horisontalStringList(
        model.attributes.filter(attribute => ![
            'id', 'updated_at', 'created_at', 'remember_token', 'email_verified_at'
        ].includes(attribute)),
        "//" // default value
    )    
    */
}