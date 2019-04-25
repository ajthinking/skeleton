import UserEntity from './entities/UserEntity'
import ModelEntity from './entities/ModelEntity'
import TableEntity from './entities/TableEntity'

export default class ObjectModelEntityFactory {
    constructor(chunk) {
        this.heading = chunk.split('\n')[0]
    }

    static fromText(chunk) {
        let factory = new this(chunk)
        if(factory.isUserModel()) return new UserEntity(chunk)
        if(factory.hasModel()) return new ModelEntity(chunk)
        return new TableEntity(chunk)        
    }

    hasModel() {
        // a Model is indicated by capital first letter
        return this.heading[0] == this.heading[0].toUpperCase()
    }

    isUserModel() {
        return this.heading == "User"
    }
}