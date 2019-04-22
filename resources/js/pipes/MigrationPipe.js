import Template from '../Template'
import BasePipe from './BasePipe'
import F from '../Formatter.js'

export default class MigrationPipe extends BasePipe {
    calculateFiles(omc = ObjectModelCollection) {
        return omc.inOptimalMigrationOrder().map((entity, index) => {
            return {
                path: "database/migrations/" + this.migrationTimeStamp(index) +"_create_" + entity.className() + "_table.php",
                content: Template.for('Migration').replace({
                    ___TABLE___: F.pluralize(entity.heading),
                    ___COLUMNS_BLOCK___: this.columns(entity),
                })
            }
        }).toArray()
    }

    columns(entity) {
        return entity.attributes.map(attribute => {
            return this.statementsFor(attribute)
        }).reduce((allStatements, statements) => allStatements.concat(statements), []).join("\n")
    }

    statementsFor(attribute) {
        let statements = [
            //this.overridden(name), /* not implemented */
            this.reserved(attribute),
            this.ruled(attribute),
            this.default(attribute)
        ].find((filter) => filter);

        return Array.isArray(statements) ? statements.join('\n') : [statements]
    }

    reserved(name) {
        var reservedNames = {
            "id": "$table->increments();",
            "timestamps": "$table->timestamps();",
            "timestamps()": "$table->timestamps();",
            "rememberToken": "$table->rememberToken();",
            "rememberToken()": "$table->rememberToken();",
            "created_at": "$table->timestamp('created_at')->nullable();",
            "email": "$table->string('email')->unique();",
        }
        if(reservedNames.hasOwnProperty(name)) {
            return reservedNames[name];
        }

        return false;        
    }
    
    ruled(name) {
        var matchedRuleKey = Object.keys(this.rules()).find((rule) => (new RegExp(rule)).test(name));
        if(typeof matchedRuleKey !== "undefined") {
            return this.rules()[matchedRuleKey](name);
        }

        return false;
    }

    rules() { 
        return {
            // One to Many explicit
            "_id$": function(name) {
                var snakeCaseSingular = name.slice(0, name.length-3).replace(/_/g,"");
                var plural = F.pluralize(snakeCaseSingular);
                return [
                    "$table->unsignedInteger('" + name + "');",
                    "$table->foreign('" + name + "')->references('id')->on('" + plural + "')->onDelete('cascade');"
                ]
            },            
            // Time columns
            "(time|date|_at)$": function(name) {
                return "$table->timestamp('" + name + "');";
            },
            // Boolean
            "^(has_|is_|got_)": function(name) {
                return "$table->boolean('" + name + "')->default(false);";
            },
        };                        
    }    

    default(name) {
        return "$table->string('" + name + "');"
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



