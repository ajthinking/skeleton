import F from '../utilities/Formatter'
import Attribute from './Attribute'

export default class ObjectModelCollection {
    constructor() {
        //this.attachRelationships()
        //this.attachPivotAttributes()
    }

    static fromEntities(entities) {
        let omc = new this
        omc.entities = entities
        return omc
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

    hasUserModel() {
        return this.userModels().items.length > 0
    }

    hasModels() {
        return this.modelsIncludingUser().items.length > 0
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
        // Prepare this in order to prevent geometric growth
        let manyToManys_ = this.manyToManys()
        let manyToManyAssociatedModels_ = {}
        manyToManys_.each(entity => {
            manyToManyAssociatedModels_[entity.heading] = this.manyToManyAssociatedModels(entity)
        })

        this.entities.mapWithRemaining((model, remaining) => {
            // HasOne/HasMany
            model.hasManyRelationships = remaining.filter(candidate => {
                return candidate.attributeNames().includes(model.asForeignKey())
                    && !model.attributeNames().includes(candidate.asForeignKey())
            })

            // BelongsTo
            model.belongsToRelationships = remaining.filter(candidate => {
                return !candidate.attributeNames().includes(model.asForeignKey())
                    && model.attributeNames().includes(candidate.asForeignKey())
            })
            
            // BelongsToMany
            model.belongsToManyRelationships = remaining.filter(candidate => {
                return manyToManys_.filter(manyToManyEntity => {
                    let parts = manyToManyAssociatedModels_[manyToManyEntity.heading]
                    return parts.includes(
                            F.snakeCase(model.heading)
                        ) && parts.includes(
                            F.snakeCase(candidate.heading)
                        )
                }).items.length > 0 
            })            
        })
    }

    attachPivotAttributes() {
        this.manyToManys().each(entity => {
            this.manyToManyAssociatedModels(entity).forEach(modelName => {
                entity.attributes.push(
                    new Attribute(
                        {
                            name: F.snakeCase(modelName) + "_id",
                            parent: entity,
                            dataType: "unsignedInteger",
                            fillable: false,
                            hidden: false,
                            nullable: false,
                        }
                    )                
                )
            })
        })
    }

    serializeSchema() {
        return this.entities.map(entity => entity.serialize())
    }   
}