import collect from './Collection.js'

export default class ObjectModelCollection {
    constructor(entities, modelDefinition = "LaravelModel") {
        this.entities = collect(entities)
        this.Model = modelDefinition
    }

    static fromEntities(entities) {
        return new this(entities)
    }

    hasUserModel() {
        return this.userModel().count() > 0
    }

    userModel() {
        return this.entities.filter(entitiy => entitiy.isUserEntity())
    }

    models() {
        return this.entities.filter(entitiy => entitiy.isModelEntity())
    }

    modelsExceptUser() {
        return this.models().filter(model => !model.isUserEntity())
    }

    map(callback) {
        return this.entities.map(callback)
    }

    filter(callback) {
        return this.entities.filter(callback)
    }
    
    find(callback) {
        return this.entities.find(callback)
    }

    all() {
        return this.entities
    }
    
    
}