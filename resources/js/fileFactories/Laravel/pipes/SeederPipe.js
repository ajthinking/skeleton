import Template from '../../../utilities/Template'
import ModelPipe from './ModelPipe'
import ModelEntity from '../../../objectModel/entities/ModelEntity'

import F from '../../../utilities/Formatter'

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
                    ___COLUMNS_BLOCK___: this.columnsBlock(model),
                })
            }
        })
    }

    databaseSeeder() {
        return this.omc.hasModels() ? [{
            path: "database/seeds/DatabaseSeeder.php",
            content: Template.for('DatabaseSeeder').replace({
                ___DATABASE_SEEDERS_BLOCK___: this.databaseSeedersBlock()
            })
        }] : []
    }

    databaseSeedersBlock() {
        return this.omc.inOptimalMigrationOrder().filter(entity => (entity instanceof ModelEntity)).map(model => {
            return "$this->call(" + model.className() + "Seeder::class);"
        }).join("\n")        
    }

    columnsBlock(model) {
        return model.attributes.filter(attribute => {
            return !['id', 'created_at', 'updated_at'].includes(attribute.name)
        }).map(attribute => {
            return F.singleQuotePad(attribute.name) + " => " + this.seedStatement(attribute)
        }).join("\n")
    }

    typeMap(dataType) {
        return {
            string: "$faker->sentence()",
            timestamp: "Carbon::now()->format('Y-m-d H:i:s')"
        }[dataType]
    }

    seedStatement(attribute) {
        return this.typeMap(attribute.dataType)
    }

}