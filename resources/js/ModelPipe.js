import Templates from './Templates'

export default class ModelPipe {

    static make() {
        return new ModelPipe()
    }
    
    name() {
        return this.constructor.name
    }

    calculateFiles(omc = ObjectModelCollection) {
        omc.modelsExceptUser()
        // get fillable, hidden
        // relationships etc here
        // for now just fake it and return a User
        
        return [{
            path: "app/Model.php",
            content: Templates.Controller
        }]
    }
}