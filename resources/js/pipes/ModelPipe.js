import Template from '../Template'
import Templates from '../Templates'

export default class ModelPipe {

    static make() {
        return new ModelPipe()
    }
    
    name() {
        return this.constructor.name
    }

    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsExceptUser().map(model => {
            return {
                path: "app/" + model.className() + ".php",
                content: Template.for('Model').replace({
                    ___CLASS_NAME___: model.className(),
                    ___HIDDEN___: this.hidden(model),
                    ___RELATIONSHIP_METHODS_BLOCK___: "" //this.relationshipMethods(),                
                })
            }
        }).toArray()
    }

    relationshipMethods() {
        return Templates.MULTIPLE_RELATIONSHIPS
    }

    hasManyRelationships(omc) {
        let items = omc.segments.mapWithRemaining((item, remainging) => {
            item.candidates = remainging
            return item
        })

        console.log(omc)
    }

    hidden(model) {
        return model.attributes.map(attribute => {
            return "'" + attribute + "'"
        }).join(", ")
    }
}