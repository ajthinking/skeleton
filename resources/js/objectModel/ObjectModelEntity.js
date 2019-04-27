import F from '../utilities/Formatter'
import Attribute from './Attribute.js';
import AttributeFactory from './AttributeFactory.js';

export default class ObjectModelEntity {
    constructor(chunk) {
        this.parts = chunk.split('\n')
        this.heading = this.parts[0]
        this.rows = [
            ... this.parts.slice(1),
            ... this.defaultColumns()
        ]
        this.attributes = this.rows.map(name => AttributeFactory.make(name, this))
    }

    static fromText(chunk) {
        return new this(chunk)
    }

    attributeNames() {
        return this.attributes.map(attribute => attribute.name)
    }

    defaultColumns() {
        return ['id', 'created_at', 'updated_at']
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
}