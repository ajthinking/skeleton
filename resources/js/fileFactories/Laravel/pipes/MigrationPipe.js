import Template from '../../../utilities/Template'
import BasePipe from './BasePipe'
import F from '../../../utilities/Formatter'

export default class MigrationPipe extends BasePipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.inOptimalMigrationOrder().map((entity, index) => {
            return {
                path: this.migrationFilePath(entity, index),
                content: Template.for('Migration').replace({
                    ___CLASS_NAME___: this.className(entity),
                    ___TABLE___: this.tableName(entity),
                    ___COLUMNS_BLOCK___: this.columns(entity),
                })
            }
        }).toArray()
    }

    migrationFilePath(entity, index) {
        return "database/migrations/" + this.migrationTimeStamp(index) +"_create_" + this.tableName(entity) + "_table.php"
    }

    className(entity) {
        return "Create" + F.pascalCase(this.tableName(entity)) + "Table"
    }

    tableName(entity) {
        if(entity.isTableEntity()) {
            return entity.heading
        }

        return F.snakeCase(F.pluralize(entity.heading))
    }

    columns(entity) {
        return entity.attributes.map(attribute => {
            return this.statementsFor(attribute)
        }).reduce((allStatements, statements) => allStatements.concat(statements), []).join("\n")
    }

    statementsFor(attribute) {
        return [
            `$table->${attribute.dataType}('${attribute.name}')${this.chainings(attribute)};` 
        ].join("\n")
    }

    chainings(attribute) {
        let chainings = ""
        if(attribute.index) chainings += "->index()";
        if(attribute.nullable) chainings += "->nullable()";
        if(attribute.unique) chainings += "->uniqe()";
        return chainings
        
    }
    
    migrationTimeStamp(index) {
        let current_datetime = new Date()
        return current_datetime.getFullYear() + "_"
            + (current_datetime.getMonth() + 1 < 10 ? "0" + (current_datetime.getMonth() + 1) : current_datetime.getMonth() + 1)
            + "_" + current_datetime.getDate()
            + "_" + current_datetime.getHours()
            + (current_datetime.getMinutes() < 10 ? "0" + current_datetime.getMinutes() : current_datetime.getMinutes())
            + (index < 10 ? "0" + index : index)

    }
}



