import collect from './Collection.js'
import F from './Formatter'

export default class ObjectModelCollection {
    constructor(entities) {
        this.entities = collect(entities)
        this.attachRelationships()
        /*
            this.attachIntelligentAttributes() ???

            an IntelligentAttribute has:
                name // color, user_id    
                datatype // string, unsignedInteger
                flaggor // nullable(), default(v), hidden, fillable, casts
            
            Do that info really belong there? Or should it be created in the pipes?
            Is it generic enough to describe a objectModelCollection implementable by any framework?
        */

        /*
            Another approach: do a special treatment check for table users and password_resets
            to manage them induvidually?
        */
    }

    isManyToMany(candidate) {
        var models = this.modelsIncludingUser().map((item) => {
            return F.snakeCase(item.heading).toLowerCase();
        }).toArray().join("|");
        var manyToManyRegExp = new RegExp("^(" + models + ")_(" + models + ")$");        
        var matches = manyToManyRegExp.exec(candidate.heading);
        
        if(matches) {
            return [matches[1], matches[2]];
        }

        return !!matches
    }
    
    manyToManyAssociatedModels(manyToManyEntity) {
        var models = this.modelsIncludingUser().map((item) => {
            return F.snakeCase(item.heading).toLowerCase();
        }).toArray().join("|");
        var manyToManyRegExp = new RegExp("^(" + models + ")_(" + models + ")$");        
        var matches = manyToManyRegExp.exec(manyToManyEntity.heading);
        return [matches[1], matches[2]];
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

    tablesOnly() {
        return this.entities.filter(entity => entity.heading == entity.heading.toLowerCase())
    }
    
    manyToManys() {
        return this.tablesOnly().filter(entitiy => this.isManyToMany(entitiy))
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

    inOptimalMigrationOrder() {
        return this.entities.sortBy((entity) => {
            if(entity.isTableEntity() && this.isManyToMany(entity)) {
                return 2
            }
            return entity.belongsToRelationships.length
        })
    }
    
    attachRelationships() {
        this.entities.mapWithRemaining((model, remaining) => {
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
            
            //BelongsToMany
            model.belongsToManyRelationships = remaining.filter(candidate => {
                return this.manyToManys().filter(manyToManyEntity => {
                    let parts = this.manyToManyAssociatedModels(manyToManyEntity)
                    return parts.includes(
                            F.snakeCase(model.heading)
                        ) && parts.includes(
                            F.snakeCase(candidate.heading)
                        )
                }).items.length > 0 
            })            
        })
    }    
}