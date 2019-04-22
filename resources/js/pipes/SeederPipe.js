import Template from '../Template'
import ModelPipe from './ModelPipe';

export default class SeederPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsIncludingUser().map(model => {
            return {
                path: "database/seeds/" + model.className() + "Seeder.php",
                content: Template.for('Seeder').replace({
                    ___HIDDEN___: this.hiddenAttributes(model),
                    ___FILLABLE___: this.fillableAttributes(model),
                    ___CASTS___: this.casts(model),
                    ___RELATIONSHIP_METHODS_BLOCK___: this.relationshipMethods(model),
                })
            }
        }).toArray()
    }
}