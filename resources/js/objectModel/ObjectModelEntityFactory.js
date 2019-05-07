import UserEntity from './entities/UserEntity'
import ModelEntity from './entities/ModelEntity'
import TableEntity from './entities/TableEntity'
import PivotTableEntity from './entities/PivotTableEntity'
const EntityTypes = { UserEntity, ModelEntity, TableEntity, PivotTableEntity};


import F from '../utilities/Formatter'

export default class ObjectModelEntityFactory {
    constructor() {

    }

    static fromSegments(segments) {
        let factory = new this()
        factory.segments = segments
        factory.entities = factory.buildEntities()
        factory.attachRelationships()
        return factory.entities
    }

    static fromSchema(schema) {
        let factory = new this()

        factory.entities = Object.keys(schema).map(key => {
            let schemaEntity = schema[key]
            return EntityTypes[schemaEntity.type].deserialize(schemaEntity)
        })

        factory.entities = factory.entities.map(entity => {
            // Object.keys(entity.relationships).forEach(key => {
            //     entity.relationships[key] = entity.relationships[key].map(targetName => {
            //         return factory.entities.find(candidate => {
            //             return candidate.heading == targetName
            //         })
            //     })
            // })
            entity.relationships.hasOne = entity.relationships.hasOne.map(targetName => {
                return factory.entities.find(candidate => {
                    return candidate.heading == targetName
                })
            })
            entity.relationships.hasMany = entity.relationships.hasMany.map(targetName => {
                return factory.entities.find(candidate => {
                    return candidate.heading == targetName
                })
            })

            entity.relationships.belongsTo = entity.relationships.belongsTo.map(targetName => {
                return factory.entities.find(candidate => {
                    return candidate.heading == targetName
                })
            })

            entity.relationships.belongsToMany = entity.relationships.belongsToMany.map(targetName => {
                return factory.entities.find(candidate => {
                    return candidate.heading == targetName
                })
            })

            return entity
        })

        return factory.entities
    }    

    buildEntities() {
        return this.segments.map(segment => {
            if(segment.hasUserModel()) return UserEntity.fromSegment(segment)
            if(segment.hasModel()) return ModelEntity.fromSegment(segment)
            if(this.isPivotTableEntity(segment)) return PivotTableEntity.fromSegment(segment)

            // default
            return TableEntity.fromSegment(segment)
        })
    }

    isPivotTableEntity(segment) {
        return !!this.pivotTableHeadingsPair(segment)        
    }

    pivotTableHeadingsPair(segment) {
        let tableNameParts = this.segments.filter(segment => segment.hasModel())
            .map((segment) => {
                return F.snakeCase(segment.heading).toLowerCase();
        }).join("|");
        let manyToManyRegExp = new RegExp("^(" + tableNameParts + ")_(" + tableNameParts + ")$");        
        let matches = manyToManyRegExp.exec(segment.heading);
        
        return matches ? [
            matches[1],
            matches[2]
        ] : false;
    }

    attachRelationships() {
        // Prepare this in order to prevent geometric growth
        let manyToManys_ = this.entities.filter(entity => this.isPivotTableEntity(entity))
        let manyToManyAssociatedModels_ = {}
        manyToManys_.forEach(entity => {
            manyToManyAssociatedModels_[entity.heading] = this.pivotTableHeadingsPair(entity)
        })

        this.entities.mapWithRemaining((model, remaining) => {
            // HasOne/HasMany -------- HasOneOrMany
            model.relationships.hasMany = remaining.filter(candidate => {
                return candidate.attributeNames().includes(model.asForeignKey())
                    && !model.attributeNames().includes(candidate.asForeignKey())
            })

            // BelongsTo
            model.relationships.belongsTo = remaining.filter(candidate => {
                return !candidate.attributeNames().includes(model.asForeignKey())
                    && model.attributeNames().includes(candidate.asForeignKey())
            })
            
            // BelongsToMany
            model.relationships.belongsToMany = remaining.filter(candidate => {
                return manyToManys_.filter(manyToManyEntity => {
                    let parts = manyToManyAssociatedModels_[manyToManyEntity.heading]
                    return parts.includes(
                            F.snakeCase(model.heading)
                        ) && parts.includes(
                            F.snakeCase(candidate.heading)
                        )
                }).length > 0 
            })            
        })
    }    
}