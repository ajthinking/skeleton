import Template from './Template'
import Templates from './Templates';

export default class UserPipe {
    constructor() {

    }

    static make() {
        return new UserPipe()
    }
    
    name() {
        return this.constructor.name
    }

    accepts() {
        return "userModel"
    }

    calculateFiles(omc = ObjectModelCollection) {
        //console.log(omc, omc.hasUserModel())
        if(!omc.hasUserModel()) return ["WHAAAAT"];
        
        omc.userModel()
        // get fillable, hidden
        // relationships etc here
        // for now just fake it and return a User
        
        return [{
            path: "app/User.php",
            content: Template.for('User').replace({
                FILLABLE: "'name', 'email'",
                HIDDEN: "'password', 'token'",
                RELATIONSHIP_METHODS_BLOCK: Templates.SOME_RELATIONSHIP
            })
        }]
    }
}