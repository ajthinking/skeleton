import Template from '../Template'
import ModelPipe from './ModelPipe'

import F from '../Formatter'

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
                    ___MODEL___: model.className(),
                    ___TABLE___: F.camelCase(F.pluralize(model.className())),
                    ___COLUMNS_BLOCK___: this.columnsBlock(model),
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

    columnsBlock(model) {
        return model.attributes.filter(attribute => {
            return !['id', 'created_at', 'updated_at'].includes(attribute)
        }).map(attribute => {
            return "'" + attribute + "' => $faker->sentence()";
        }).join("\n")
    }
}