import Template from '../Template'
import Templates from '../Templates'
import BasePipe from './BasePipe'

export default class ModelPipe extends BasePipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsExceptUser().map(model => {
            return {
                path: "app/" + model.className() + ".php",
                content: Template.for('Model').replace({
                    ___CLASS_NAME___: this.className(model),
                    ___HIDDEN___: this.hiddenAttributes(model),
                    ___FILLABLE___: this.fillableAttributes(model),
                    ___CASTS___: this.casts(model),
                    ___RELATIONSHIP_METHODS_BLOCK___: "" //this.relationshipMethods(),                
                })
            }
        }).toArray()
    }

    relationshipMethods() {
        return Templates.MULTIPLE_RELATIONSHIPS
    }

    hasManyRelationships(omc) {
        let items = omc.entities.mapWithRemaining((item, remainging) => {
            item.candidates = remainging
            return item
        })

        console.log(omc)
    }

    hiddenAttributes(model) {
        return this.horisontalStringList(
            model.attributes.filter(attribute => [
                'password', 'remember_token'
            ].includes(attribute)),
            "//" // default value
        )
    }

    fillableAttributes(model) {
        return this.horisontalStringList(
            model.attributes.filter(attribute => ![
                'id', 'updated_at', 'created_at'
            ].includes(attribute)),
            "//" // default value
        )        
    }

    casts(model) {
        return "//"
    }

    className(model) {
        return model.heading
    }    
}