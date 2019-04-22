import Template from '../Template'
import ModelPipe from './ModelPipe';

export default class APIControllerPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsIncludingUser().map(model => {
            return {
                path: "app/Http/Controllers/" + model.className() + "APIController.php",
                content: Template.for('APIController').replace({
                    ___HIDDEN___: this.hiddenAttributes(model),
                    ___FILLABLE___: this.fillableAttributes(model),
                    ___CASTS___: this.casts(model),
                    ___RELATIONSHIP_METHODS_BLOCK___: this.relationshipMethods(model),
                })
            }
        }).toArray()
    }
}