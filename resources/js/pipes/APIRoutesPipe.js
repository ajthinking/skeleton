import Template from '../Template'
import BasePipe from './BasePipe'
import F from '../Formatter.js'

export default class MigrationPipe extends BasePipe {
    calculateFiles() {        
        return [{
            path: "routes/api.php",
            content: Template.for('api').replace({
                ___API_ROUTES_BLOCK___: this.apiRoutes(),
            })
        }]
    }

    apiRoutes() {
        return this.omc.modelsIncludingUser().map(model => {
            return Template.for('APIRoute').replace({
                ___RESOURCE_NAME___: F.camelCase(F.pluralize(model.className())),
                ___MODEL_NAME___: model.className(),
            })
        }).toArray().join("\n\n")
    }
}