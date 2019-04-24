import Template from '../Template'
import ModelPipe from './ModelPipe';

export default class SeederPipe extends ModelPipe {
    calculateFiles(omc = ObjectModelCollection) {
        return [
            ... this.seederFiles(),
            ... this.databaseSeeder()
        ]
    }

    seederFiles() {
        return this.omc.modelsIncludingUser().map(model => {
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

    databaseSeeder() {
        return [{
            path: "database/seeds/DatabaseSeeder.php",
            content: Template.for('DatabaseSeeder').replace({
                ___DATABASE_SEEDERS_BLOCK___: this.databaseSeedersBlock()
            })
        }]
    }

    databaseSeedersBlock() {
        console.log(this.omc.modelsIncludingUser().map(model => {
            return "$this->call(" + model.className() + "Seeder::class);"
        }).toArray().join("\n"))
        return this.omc.modelsIncludingUser().map(model => {
            return "$this->call(" + model.className() + "Seeder::class);"
        }).toArray().join("\n")        
    }
}