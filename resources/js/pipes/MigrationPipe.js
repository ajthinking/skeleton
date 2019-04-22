import Template from '../Template'
import BasePipe from './BasePipe'
import pluralize from 'pluralize'

export default class MigrationPipe extends BasePipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.all().map(entity => {
            return {
                path: "database/migrations/2019_12_12_1212_create_" + entity.className() + "_table.php",
                content: Template.for('Migration').replace({
                    ___TABLE___: pluralize(entity.heading),
                    ___COLUMNS_BLOCK___: this.columns(entity),
                })
            }
        }).toArray()
    }

    columns(entity) {
        return entity.attributes.map(attribute => {
            return ["$table->string('" + attribute + "');"]
        }).reduce((allStatements, statements) => allStatements.concat(statements), []).join("\n")
    }
}



