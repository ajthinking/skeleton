import F from '../utilities/Formatter'
import Attribute from './Attribute.js';
import AttributeFactory from './AttributeFactory.js';

export default class ObjectModelEntity {
    constructor(chunk) {
        this.parts = chunk.split('\n')
        this.heading = this.parts[0]
        this.attributes = this.parts.slice(1).map(name => AttributeFactory.make(name, this))

        //this.addDefaultColumns()
    }

    static fromText(chunk) {
        return new this(chunk)
    }

    attributeNames() {
        return this.attributes.map(attribute => attribute.name)
    }

    addDefaultColumns() {
        this.attributes = ['id', 'created_at', 'updated_at']
            .filter(column => !this.attributes.includes(column))
            .concat(this.attributes)
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