import collect from './Collection.js'

export default class ObjectModelCollection {
    constructor(entities) {
        this.entities = collect(entities)
    }

    static fromEntities(entities) {
        return new this(entities)
    }

    hasUserModel() {
        return this.userModels().items.length > 0
    }

    userModel() {
        return this.userModels().first()
    }

    userModels() {
        return this.entities.filter(entitiy => entitiy.isUserEntity())
    }

    models() {
        return this.entities.filter(entitiy => entitiy.isModelEntity())
    }

    modelsIncludingUser() {
        return collect(this.models().items.concat(this.userModels().items))
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
    
    relationships() {
        // Look for HasOne/HasMany
        this.modelsIncludingUser().mapWithRemaining((model, remaining) => {
            console.log(model.heading, remaining.length)
            // I need a attribute and class name formatter
            // to create things like CreateUsersTable, user_id, users ...
            // That potentialla is a job for a separate Attribute class ???
        })

        return ""
    }
    
}