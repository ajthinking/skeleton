import Template from '../Template'
import ModelPipe from './ModelPipe';

import F from '../Formatter'

export default class APIControllerPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.modelsIncludingUser().map(model => {
            return {
                path: "app/Http/Controllers/" + model.className() + "APIController.php",
                content: Template.for('APIController').replace({
                    ___MODEL___: model.className(),
                    ___MODEL_INSTANCE___: F.camelCase(model.className()),
                    ___WITH_RELATIONSHIPS___: ""
                })
            }
        }).toArray()
    }
}