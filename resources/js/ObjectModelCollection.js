import collect from './Collection.js'
import F from './Formatter'

export default class ObjectModelCollection {
    constructor(entities) {
        this.entities = collect(entities)
        this.findRelationships()
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
    
    findRelationships() {
        this.modelsIncludingUser().mapWithRemaining((model, remaining) => {
            //HasOne/HasMany
            model.hasManyRelationships = remaining.filter(candidate => {
                return candidate.attributes.includes(model.asForeignKey())
                    && !model.attributes.includes(candidate.asForeignKey())
            })

            //BelongsTo
            model.belongsToRelationships = remaining.filter(candidate => {
                return !candidate.attributes.includes(model.asForeignKey())
                    && model.attributes.includes(candidate.asForeignKey())
            })            
        })
    }    
}