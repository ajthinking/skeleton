import F from '../utilities/Formatter'
import Attribute from './Attribute.js';
import AttributeFactory from './AttributeFactory.js';
import Preference from '../utilities/Preference'

export default class ObjectModelEntity {
    constructor() {
        this.relationships = {}
    }

    static fromSegment(segment) {
        let entity = new this()
        entity.heading = segment.heading
        // Sort and only keep unique attributes
        let attributeRows = [
            ... new Set([
                ... entity.injectColumns(['id']),
                ... segment.attributes,
                ... entity.injectColumns(['created_at', 'updated_at']),
            ])
        ]
        entity.attributes = attributeRows.map(name => AttributeFactory.make(name, entity))        
        return entity
    }

    static deserialize(data) {
        let entity = new this()
        entity.heading = data.name
        entity.attributes = data.attributes.map(attributeData => new Attribute(attributeData))
        entity.relationships = data.relationships
        return entity        
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
        const serialize_results = {
            name: this.heading,
            type: this.constructor.name,
            attributes: this.attributes.map(attribute => attribute.serialize()),
            relationships: {
                hasOne: [].map(target => target.heading),
                hasMany: this.relationships.hasMany.map(target => target.heading),
                belongsTo: this.relationships.belongsTo.map(target => target.heading),
                belongsToMany: this.relationships.belongsToMany.map(target => target.heading)
            }
        }
        
        return  serialize_results; 
    }
}