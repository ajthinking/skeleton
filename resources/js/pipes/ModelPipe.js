import Template from '../Template'
import BasePipe from './BasePipe'
import F from '../Formatter'

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
                    ___RELATIONSHIP_METHODS_BLOCK___: this.relationshipMethods(model),                
                })
            }
        }).toArray()
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
                'id', 'updated_at', 'created_at', 'remember_token', 'email_verified_at'
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
    
    relationshipMethods(model) {
        return [
            model.hasManyRelationships.map(target => {
                return Template.for('HasManyRelationship').replace({
                    ___TARGET_CLASS___: target.className(),                    
                    ___TARGET_CLASS_PLURAL___: F.pluralize(target.className()),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.pluralize(
                        F.camelCase(
                            target.className()
                        )
                    ),

                })
            }).join("\n"),

            model.belongsToRelationships.map(target => {
                return Template.for('BelongsToRelationship').replace({
                    ___TARGET_CLASS___: target.className(),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.camelCase(target.className()),
                })
            }).join("/n"),

            model.belongsToManyRelationships.map(target => {
                console.log("inne här")
                return Template.for('BelongsToManyRelationship').replace({
                    ___TARGET_CLASS___: target.className(),                    
                    ___TARGET_CLASS_PLURAL___: F.pluralize(target.className()),
                    ___THIS_CLASS___: model.className(),
                    ___METHOD_NAME___: F.pluralize(
                        F.camelCase(
                            target.className()
                        )
                    ),

                })
            }).join("\n"),

        ].filter(candidate => (candidate != "")).join("\n\n")
    }
}