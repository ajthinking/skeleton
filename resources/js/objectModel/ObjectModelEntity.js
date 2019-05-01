import F from '../utilities/Formatter'
import Attribute from './Attribute.js';
import AttributeFactory from './AttributeFactory.js';
import Preference from '../utilities/Preference'

export default class ObjectModelEntity {
    constructor(segment) {
        this.heading = segment.heading
        // Sort and only keep unique attributes
        let attributeRows = [
            ... new Set([
                ... this.injectColumns(['id']),
                ... segment.attributes,
                ... this.injectColumns(['created_at', 'updated_at']),
            ])
        ]
        this.attributes = attributeRows.map(name => AttributeFactory.make(name, this))
    }

    attributeNames() {
        return this.attributes.map(attribute => attribute.name)
    }

    injectColumns(columns) {
        return columns.filter(column => {
            let path = ['objectModel', this.heading, column]
            // Check if it is excluded in preferences
            return !(Preference.has(path) && (Preference.get(path) === false))
        })
    }

    className() {
        return this.heading
    }

    isUserEntity() {
        return this.constructor.name == "UserEntity"
    }

    isModelEntity() {
        return this.constructor.name == "ModelEntity"
    }
    
    isTableEntity() {
        return this.constructor.name == "TableEntity"
    }
    
    asForeignKey() {
        return F.snakeCase(this.heading) + "_id";       
    }

    serialize() {
        return this.attributes.reduce((result, attribute) => {
            return {
                ... result,
                [attribute.name]: attribute.serialize()
            }
        }, {})
    }
}