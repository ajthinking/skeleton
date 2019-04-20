export default class ObjectModelEntity {
    constructor(chunk) {
        this.parts = chunk.split('\n')
        this.heading = this.parts[0]
        this.attributes = this.parts.slice(1)
    }

    static fromText(chunk) {
        return new this(chunk)
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
}